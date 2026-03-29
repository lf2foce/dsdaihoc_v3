import json
import logging
import os
import asyncio
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any

import aiohttp
import psycopg2
import requests
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field


load_dotenv()


def setup_logging() -> None:
    logging.basicConfig(
        level=os.getenv("LOG_LEVEL", "INFO").upper(),
        format="%(asctime)s %(levelname)s %(message)s",
    )


def utc_now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


@dataclass
class AirtableConfig:
    api_key: str
    base_id: str
    table_name: str
    view: str | None
    status_field: str
    synced_field: str
    id_field: str
    name_field: str
    description_field: str
    information_field: str
    programs_field: str
    admission_score_field: str
    tags_field: str
    source_url_field: str
    source_urls_field: str
    last_crawled_at_field: str
    todo_status: str
    pending_status: str
    approved_status: str


@dataclass
class GeminiConfig:
    api_key: str
    model: str
    enable_google_search: bool
    concurrency: int
    thinking_level: str | None
    max_output_tokens: int


@dataclass
class PostgresConfig:
    dsn: str | None
    host: str | None
    port: int
    db: str | None
    user: str | None
    password: str | None
    sslmode: str | None


class SchoolResearchResult(BaseModel):
    description: str = Field(
        description="Đoạn giới thiệu giàu thông tin về trường, khoảng 120-220 từ, có thể dùng Markdown nhẹ để dễ đọc."
    )
    information: str = Field(
        description="Phần tổng quan chi tiết nhất về trường, khoảng 300-700 từ, có chiều sâu như phần nội dung chính của một trang CMS, cho phép Markdown để chia ý rõ."
    )
    programs: str = Field(
        description="Phần mô tả chi tiết các nhóm ngành và chương trình đào tạo nổi bật, khoảng 220-500 từ, cho phép Markdown để chia nhóm ngành rõ ràng."
    )
    admission_score: str = Field(
        description="Phần tổng hợp chi tiết về tuyển sinh gần nhất, khoảng 180-420 từ, ưu tiên phương thức xét tuyển, tổ hợp, điều kiện đầu vào và điểm chuẩn khi có; cho phép Markdown để tăng tính đọc."
    )
    tags: list[str] = Field(
        default_factory=list,
        description="Danh sách tag ngắn gọn, ví dụ: Công lập, Hà Nội, Kỹ thuật.",
    )
    source_url: str = Field(
        default="",
        description="URL nguồn chính thức hoặc đáng tin cậy nhất dùng để tổng hợp thông tin.",
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Danh sách nhiều URL nguồn hữu ích mà model đã dùng để tổng hợp; không cần giới hạn một nguồn duy nhất.",
    )


def _get_required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _get_required_env_any(*names: str) -> str:
    for name in names:
        value = os.getenv(name)
        if value:
            return value
    joined = ", ".join(names)
    raise RuntimeError(f"Missing required environment variable: one of {joined}")


def load_airtable_config() -> AirtableConfig:
    return AirtableConfig(
        api_key=_get_required_env_any("AIRTABLE_ACCESS_TOKEN", "AIRTABLE_API_KEY"),
        base_id=_get_required_env("AIRTABLE_BASE_ID"),
        table_name=os.getenv("AIRTABLE_TABLE_NAME", "Trường"),
        view=os.getenv("AIRTABLE_VIEW"),
        status_field=os.getenv("AIRTABLE_FIELD_STATUS", "Status"),
        synced_field=os.getenv("AIRTABLE_FIELD_SYNCED", "synced_to_db"),
        id_field=os.getenv("AIRTABLE_FIELD_ID", "id"),
        name_field=os.getenv("AIRTABLE_FIELD_NAME", "Tên trường"),
        description_field=os.getenv("AIRTABLE_FIELD_DESCRIPTION", "Mô tả trường"),
        information_field=os.getenv("AIRTABLE_FIELD_INFORMATION", "Thông tin trường"),
        programs_field=os.getenv("AIRTABLE_FIELD_PROGRAMS", "Chương trình"),
        admission_score_field=os.getenv("AIRTABLE_FIELD_ADMISSION_SCORE", "Điểm chuẩn"),
        tags_field=os.getenv("AIRTABLE_FIELD_TAGS", "Tags"),
        source_url_field=os.getenv("AIRTABLE_FIELD_SOURCE_URL", "source_url"),
        source_urls_field=os.getenv("AIRTABLE_FIELD_SOURCE_URLS", "source_urls"),
        last_crawled_at_field=os.getenv("AIRTABLE_FIELD_LAST_CRAWLED_AT", "last_crawled_at"),
        todo_status=os.getenv("AIRTABLE_STATUS_TODO", "Todo"),
        pending_status=os.getenv("AIRTABLE_STATUS_PENDING", "Pending"),
        approved_status=os.getenv("AIRTABLE_STATUS_APPROVED", "Approved"),
    )


def load_gemini_config() -> GeminiConfig:
    thinking_level = os.getenv("GEMINI_THINKING_LEVEL", "high").strip().lower()
    if thinking_level == "":
        thinking_level = None
    return GeminiConfig(
        api_key=_get_required_env("GEMINI_API_KEY"),
        model=os.getenv("GEMINI_MODEL", "gemini-3.1-pro-preview"),
        enable_google_search=os.getenv("GEMINI_ENABLE_GOOGLE_SEARCH", "true").lower()
        in {"1", "true", "yes", "on"},
        concurrency=max(1, int(os.getenv("CRAWL_CONCURRENCY", "20"))),
        thinking_level=thinking_level,
        max_output_tokens=max(256, int(os.getenv("GEMINI_MAX_OUTPUT_TOKENS", "32768"))),
    )


def load_postgres_config() -> PostgresConfig:
    port_raw = os.getenv("POSTGRES_PORT", "5432")
    return PostgresConfig(
        dsn=os.getenv("POSTGRES_DSN"),
        host=os.getenv("POSTGRES_HOST"),
        port=int(port_raw),
        db=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD"),
        sslmode=os.getenv("POSTGRES_SSLMODE"),
    )


class AirtableClient:
    def __init__(self, config: AirtableConfig) -> None:
        self.config = config
        self.base_url = (
            f"https://api.airtable.com/v0/{config.base_id}/{requests.utils.quote(config.table_name, safe='')}"
        )
        self.meta_base_url = f"https://api.airtable.com/v0/meta/bases/{config.base_id}/tables"
        self.session = requests.Session()
        self.session.headers.update(
            {
                "Authorization": f"Bearer {config.api_key}",
                "Content-Type": "application/json",
            }
        )

    def list_records(
        self,
        *,
        filter_formula: str | None = None,
        max_records: int | None = None,
    ) -> list[dict[str, Any]]:
        records: list[dict[str, Any]] = []
        offset: str | None = None

        while True:
            params: dict[str, Any] = {}
            if self.config.view:
                params["view"] = self.config.view
            if filter_formula:
                params["filterByFormula"] = filter_formula
            if max_records is not None:
                remaining = max_records - len(records)
                if remaining <= 0:
                    break
                params["pageSize"] = min(100, remaining)
                params["maxRecords"] = max_records
            if offset:
                params["offset"] = offset

            response = self.session.get(self.base_url, params=params, timeout=60)
            response.raise_for_status()
            payload = response.json()
            records.extend(payload.get("records", []))
            offset = payload.get("offset")
            if not offset:
                break

        return records

    def update_record(self, record_id: str, fields: dict[str, Any]) -> dict[str, Any]:
        response = self.session.patch(
            f"{self.base_url}/{record_id}",
            json={"fields": fields, "typecast": True},
            timeout=60,
        )
        if not response.ok:
            raise RuntimeError(
                f"Airtable update failed with status {response.status_code}: {response.text}"
            )
        return response.json()

    def list_tables_schema(self) -> list[dict[str, Any]]:
        response = self.session.get(self.meta_base_url, timeout=60)
        response.raise_for_status()
        payload = response.json()
        return payload.get("tables", [])


class AsyncAirtableClient:
    def __init__(self, config: AirtableConfig) -> None:
        self.config = config
        self.base_url = (
            f"https://api.airtable.com/v0/{config.base_id}/{requests.utils.quote(config.table_name, safe='')}"
        )
        self.session: aiohttp.ClientSession | None = None

    async def __aenter__(self) -> "AsyncAirtableClient":
        self.session = aiohttp.ClientSession(
            headers={
                "Authorization": f"Bearer {self.config.api_key}",
                "Content-Type": "application/json",
            }
        )
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        if self.session:
            await self.session.close()

    def _require_session(self) -> aiohttp.ClientSession:
        if not self.session:
            raise RuntimeError("AsyncAirtableClient session has not been opened")
        return self.session

    async def list_records(
        self,
        *,
        filter_formula: str | None = None,
        max_records: int | None = None,
    ) -> list[dict[str, Any]]:
        records: list[dict[str, Any]] = []
        offset: str | None = None
        session = self._require_session()

        while True:
            params: dict[str, Any] = {}
            if self.config.view:
                params["view"] = self.config.view
            if filter_formula:
                params["filterByFormula"] = filter_formula
            if max_records is not None:
                remaining = max_records - len(records)
                if remaining <= 0:
                    break
                params["pageSize"] = min(100, remaining)
                params["maxRecords"] = max_records
            if offset:
                params["offset"] = offset

            async with session.get(self.base_url, params=params, timeout=60) as response:
                text = await response.text()
                if response.status >= 400:
                    raise RuntimeError(
                        f"Airtable list records failed with status {response.status}: {text}"
                    )
                payload = json.loads(text)
                records.extend(payload.get("records", []))
                offset = payload.get("offset")
                if not offset:
                    break

        return records

    async def update_record(self, record_id: str, fields: dict[str, Any]) -> dict[str, Any]:
        session = self._require_session()
        async with session.patch(
            f"{self.base_url}/{record_id}",
            json={"fields": fields, "typecast": True},
            timeout=60,
        ) as response:
            text = await response.text()
            if response.status >= 400:
                raise RuntimeError(
                    f"Airtable update failed with status {response.status}: {text}"
                )
            return json.loads(text)


class GeminiResearchClient:
    def __init__(self, config: GeminiConfig) -> None:
        self.config = config
        self.client = genai.Client(api_key=config.api_key)
        self.async_client = self.client.aio

    async def research_school_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> SchoolResearchResult:
        prompt = self._build_prompt(
            school_name=school_name,
            school_id=school_id,
        )
        tools: list[Any] = []
        if self.config.enable_google_search:
            tools.append(types.Tool(google_search=types.GoogleSearch()))

        thinking_config = None
        if self.config.thinking_level:
            thinking_config = types.ThinkingConfig(thinking_level=self.config.thinking_level)

        response = await self.async_client.models.generate_content(
            model=self.config.model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                tools=tools,
                response_mime_type="application/json",
                response_json_schema=SchoolResearchResult.model_json_schema(),
                thinking_config=thinking_config,
                max_output_tokens=self.config.max_output_tokens,
            ),
        )

        if response.text:
            return SchoolResearchResult.model_validate_json(response.text)
        raise RuntimeError(f"Gemini did not return structured output for school {school_id}")

    def _build_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> str:
        return f"""
Bạn là biên tập viên nghiên cứu dữ liệu giáo dục đại học Việt Nam cấp senior.

Nhiệm vụ:
Nghiên cứu và tổng hợp thông tin chi tiết, thực dụng, dễ dùng ngay cho trường đại học tại Việt Nam có tên "{school_name}" (ID nội bộ: {school_id}).

Mục tiêu:
- Chỉ trả về đúng một JSON object hợp lệ theo schema hệ thống.
- Không thêm bất kỳ giải thích nào ngoài JSON.
- Viết bằng tiếng Việt tự nhiên, giàu thông tin, không quảng cáo, không sáo rỗng.
- Nội dung phải đủ dày để khi ghép `description`, `information`, `programs`, `admission_score` lại có cảm giác như một trang nội dung ngắn, không phải vài câu cho có.
- Được phép dùng Markdown bên trong các string của JSON để tăng khả năng hiển thị và đọc, ví dụ: tiêu đề ngắn `##`, bullet `-`, danh sách đánh số `1.`.
- Không dùng code fence ba dấu backtick trong bất kỳ field nào.

Ưu tiên nguồn:
1. Tìm thông tin mới nhất trong năm gần nhất có thể xác minh. Ưu tiên năm 2026, nếu chưa có thì lùi về 2025.
2. Website chính thức của trường.
3. Trang tuyển sinh chính thức hoặc đề án tuyển sinh chính thức.
4. Trang khoa/chương trình chính thức.
5. Nguồn báo chí hoặc đơn vị giáo dục uy tín để bổ sung ngữ cảnh khi nguồn chính thức chưa đủ.

Nguyên tắc:
- Đi thẳng vào ý chính, hạn chế câu mở đầu rỗng.
- Không bịa số liệu hay chi tiết cụ thể nếu không chắc.
- Nếu thiếu dữ liệu chắc chắn, ghi rõ là chưa có thông tin rõ ràng hoặc chưa thấy công bố chính thức.
- Nếu có thay đổi so với năm trước, phải nêu rõ.
- Nếu có thuật ngữ tuyển sinh/chương trình dễ khó hiểu, giải thích ngắn gọn ngay trong câu cho dễ đọc.
- `source_url` phải là URL hữu ích nhất để editor kiểm tra nhanh.

Hãy coi output như 4 section nội dung riêng, nhưng trả về gộp trong một JSON:
- `description`: phần mở đầu của bài
- `information`: section tổng quan và thay đổi chính
- `programs`: section chương trình đào tạo, nhóm ngành, học phí/học bổng nếu đáng chú ý
- `admission_score`: section tuyển sinh, phương thức, điểm chuẩn, lưu ý cho thí sinh

Yêu cầu theo từng field:

1. `description`
- Viết 1 đoạn giới thiệu hoàn chỉnh khoảng 120-220 từ.
- Phải trả lời được ngay: trường là ai, thuộc loại hình nào, ở đâu, nổi bật ở điểm gì, vì sao thường được biết tới.
- Không được quá chung chung.
- Có thể dùng 1 đoạn Markdown gọn, nhưng không cần bullet quá nhiều.

2. `information`
- Đây là field dài và quan trọng nhất, mục tiêu khoảng 300-700 từ.
- Viết như phần nội dung chính của một trang thông tin trường.
- Cố gắng bao phủ càng nhiều càng tốt:
  lịch sử/cột mốc;
  loại hình và đơn vị chủ quản;
  vị trí, cơ sở đào tạo;
  quy mô hoặc phạm vi đào tạo;
  định hướng phát triển;
  thế mạnh đào tạo, nghiên cứu, thực hành;
  hợp tác quốc tế/doanh nghiệp/bệnh viện/xưởng/phòng lab nếu có;
  môi trường học tập và lợi thế cho sinh viên;
  các điểm khác biệt so với trường cùng nhóm.
- Nếu trường mạnh về một lĩnh vực cụ thể như kiến trúc, kỹ thuật, y dược, sức khỏe, kinh tế, ngoại ngữ, công nghệ... phải làm nổi bật rất rõ.
- Nên trình bày như một section giàu cấu trúc, ví dụ mở bằng 1-2 câu khái quát rồi xuống các bullet theo ý lớn.
- Nếu có thay đổi chính trong năm gần nhất, nên có một mục nhỏ kiểu `### Thay đổi chính gần đây` hoặc bullet tương đương.

3. `programs`
- Mục tiêu khoảng 220-500 từ.
- Không chỉ nói "đào tạo đa ngành".
- Phải mô tả cụ thể các nhóm ngành/chương trình nổi bật.
- Nhóm theo cụm lĩnh vực khi hợp lý.
- Nếu có chương trình chất lượng cao, quốc tế, ứng dụng, liên kết doanh nghiệp, ngành mới, chương trình mũi nhọn thì phải nêu rõ.
- Có thể nhắc ngắn tới học phí hoặc học bổng nếu đó là thông tin nổi bật, xác minh được và giúp người đọc hiểu chương trình tốt hơn.
- Ưu tiên cấu trúc Markdown dễ đọc: nhóm ngành theo bullet hoặc numbered list.
- Nếu có học phí/học bổng đáng chú ý, nêu như một tiểu mục ngắn thay vì lẫn hoàn toàn vào câu văn.

4. `admission_score`
- Mục tiêu khoảng 180-420 từ.
- Ưu tiên thông tin tuyển sinh gần nhất có thể xác minh.
- Nếu có điểm chuẩn, trình bày cụ thể nhưng trung thực: theo phương thức nào, nhóm ngành nào đáng chú ý, xu hướng ra sao nếu có cơ sở.
- Nếu chưa có điểm chuẩn chính thức, thay bằng thông tin tuyển sinh hữu ích:
  phương thức xét tuyển, tổ hợp, điều kiện đầu vào, mốc thông tin gần nhất, lưu ý quan trọng cho thí sinh.
- Không bịa con số.
- Nên trình bày thành các bullet dễ scan.
- Nếu chưa có điểm chuẩn năm mới nhất, phải nói rõ và thay bằng thông tin tuyển sinh gần nhất hữu ích.

5. `tags`
- Tạo 5-10 tag ngắn, chuẩn hóa, hữu ích cho lọc dữ liệu.
- Ưu tiên tag về loại hình trường, địa phương, nhóm ngành nổi bật, định hướng đào tạo, đặc điểm nhận diện.

6. `source_url`
- Chọn 1 URL tốt nhất để editor mở ra kiểm tra nhanh thông tin cốt lõi.
- Ưu tiên trang chính thức có độ bao quát cao nhất.
- Không để trống.

Chỉ trả về JSON với đúng các key:
description, information, programs, admission_score, tags, source_url, source_urls
""".strip()


def get_school_identity(fields: dict[str, Any], config: AirtableConfig) -> tuple[int, str]:
    raw_id = fields.get(config.id_field)
    if raw_id in (None, ""):
        raise ValueError(f"Missing Airtable field `{config.id_field}`")

    try:
        school_id = int(raw_id)
    except (TypeError, ValueError) as exc:
        raise ValueError(
            f"Airtable field `{config.id_field}` must be numeric, got {raw_id!r}"
        ) from exc

    school_name = str(fields.get(config.name_field, "")).strip()
    if not school_name:
        raise ValueError(f"Missing Airtable field `{config.name_field}`")

    return school_id, school_name


def build_postgres_connection(config: PostgresConfig):
    if config.dsn:
        return psycopg2.connect(config.dsn)

    missing = [
        name
        for name, value in {
            "POSTGRES_HOST": config.host,
            "POSTGRES_DB": config.db,
            "POSTGRES_USER": config.user,
            "POSTGRES_PASSWORD": config.password,
        }.items()
        if not value
    ]
    if missing:
        raise RuntimeError(f"Missing required PostgreSQL settings: {', '.join(missing)}")

    connect_kwargs: dict[str, Any] = {
        "host": config.host,
        "port": config.port,
        "dbname": config.db,
        "user": config.user,
        "password": config.password,
    }
    if config.sslmode:
        connect_kwargs["sslmode"] = config.sslmode
    return psycopg2.connect(**connect_kwargs)


def to_airtable_tags(value: list[str]) -> list[str]:
    cleaned = []
    for item in value:
        normalized = str(item).strip()
        if normalized and normalized not in cleaned:
            cleaned.append(normalized)
    return cleaned


def to_airtable_source_urls(value: list[str]) -> str:
    cleaned = []
    for item in value:
        normalized = str(item).strip()
        if normalized and normalized not in cleaned:
            cleaned.append(normalized)
    return "\n".join(cleaned)


def to_jsonb(value: list[str]) -> str:
    return json.dumps(value, ensure_ascii=False)

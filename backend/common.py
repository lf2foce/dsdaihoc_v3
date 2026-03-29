import json
import logging
import os
import asyncio
import re
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
    campus_field: str
    campus_locations_field: str
    programs_field: str
    admission_methods_field: str
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
    section_model: str
    metadata_model: str
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
        description="Đoạn giới thiệu giàu thông tin về trường, khoảng 150-260 từ, có thể dùng Markdown nhẹ để dễ đọc."
    )
    information: str = Field(
        description="Phần tổng quan chi tiết nhất về trường, khoảng 450-900 từ, có chiều sâu như phần nội dung chính của một trang CMS, cho phép Markdown để chia ý rõ."
    )
    campus: str = Field(
        description="Tóm tắt ngắn gọn, rõ ràng về cơ sở đào tạo, địa điểm học hoặc các campus chính của trường."
    )
    campus_locations: list[str] = Field(
        default_factory=list,
        description="Danh sách tên tỉnh/thành phố tại Việt Nam để lọc dữ liệu, ví dụ: Hà Nội, TP.HCM, Đà Nẵng, Nghệ An."
    )
    programs: str = Field(
        description="Phần mô tả chi tiết các nhóm ngành và chương trình đào tạo nổi bật, khoảng 320-700 từ, cho phép Markdown để chia nhóm ngành rõ ràng."
    )
    admission_methods: str = Field(
        description="Phần tổng hợp chi tiết về phương thức xét tuyển và điều kiện của từng phương thức, cho phép Markdown để chia ý rõ."
    )
    admission_score: str = Field(
        description="Phần tổng hợp chi tiết về ngành và điểm chuẩn gần nhất, khoảng 260-550 từ, cho phép Markdown để tăng tính đọc."
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


class SchoolInformationDraft(BaseModel):
    information: str = Field(
        description="Bản nháp rất chi tiết cho section tổng quan và thay đổi chính của trường, đủ dày như một article section."
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Các URL nguồn hữu ích cho section tổng quan.",
    )


class SchoolProgramsDraft(BaseModel):
    programs: str = Field(
        description="Bản nháp rất chi tiết cho section chương trình đào tạo, nhóm ngành, học phí hoặc học bổng nếu đáng chú ý."
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Các URL nguồn hữu ích cho section chương trình đào tạo.",
    )


class SchoolAdmissionDraft(BaseModel):
    admission_methods: str = Field(
        description="Bản nháp rất chi tiết cho section phương thức xét tuyển và điều kiện của từng phương thức."
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Các URL nguồn hữu ích cho section phương thức xét tuyển.",
    )


class SchoolAdmissionScoreDraft(BaseModel):
    admission_score: str = Field(
        description="Bản nháp rất chi tiết cho section ngành và điểm chuẩn gần nhất."
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Các URL nguồn hữu ích cho section ngành và điểm chuẩn.",
    )


class SchoolMetadataDraft(BaseModel):
    description: str = Field(
        description="Đoạn mở đầu khoảng 150-260 từ, giàu thông tin, viết như opening section của bài giới thiệu trường."
    )
    campus: str = Field(
        default="",
        description="Phần tóm tắt ngắn gọn về cơ sở đào tạo/campus, ưu tiên nêu địa điểm và số lượng hoặc tên campus chính nếu xác minh được."
    )
    campus_locations: list[str] = Field(
        default_factory=list,
        description="Danh sách ngắn gọn 1-6 tên tỉnh/thành phố tại Việt Nam nơi trường có cơ sở đào tạo chính, dùng để filter."
    )
    tags: list[str] = Field(
        default_factory=list,
        description="Danh sách 5-10 tag ngắn, chuẩn hóa, hữu ích cho lọc dữ liệu."
    )
    source_url: str = Field(
        default="",
        description="URL nguồn chính hữu ích nhất để editor kiểm tra nhanh."
    )
    source_urls: list[str] = Field(
        default_factory=list,
        description="Danh sách ngắn gọn các URL nguồn tiêu biểu, không cần quá dài."
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
        campus_field=os.getenv("AIRTABLE_FIELD_CAMPUS", "campus"),
        campus_locations_field=os.getenv("AIRTABLE_FIELD_CAMPUS_LOCATIONS", "campus_locations"),
        programs_field=os.getenv("AIRTABLE_FIELD_PROGRAMS", "Chương trình"),
        admission_methods_field=os.getenv("AIRTABLE_FIELD_ADMISSION_METHODS", "Phương thức xét tuyển"),
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
        section_model=os.getenv(
            "GEMINI_SECTION_MODEL",
            os.getenv("GEMINI_MODEL", "gemini-3.1-pro-preview"),
        ),
        metadata_model=os.getenv(
            "GEMINI_METADATA_MODEL",
            "gemini-3.1-flash-lite-preview",
        ),
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
        logging.info("starting section calls for school id=%s", school_id)
        information, programs, admission_methods, admission_score = await asyncio.gather(
            self.generate_information_async(
                school_name=school_name,
                school_id=school_id,
            ),
            self.generate_programs_async(
                school_name=school_name,
                school_id=school_id,
            ),
            self.generate_admission_async(
                school_name=school_name,
                school_id=school_id,
            ),
            self.generate_admission_score_async(
                school_name=school_name,
                school_id=school_id,
            ),
        )
        logging.info("completed section calls for school id=%s", school_id)
        merged_section_sources = self._merge_source_urls(
            information.source_urls,
            programs.source_urls,
            admission_methods.source_urls,
            admission_score.source_urls,
        )
        logging.info("starting metadata call for school id=%s", school_id)
        metadata = await self.generate_metadata_async(
            school_name=school_name,
            school_id=school_id,
            information=information.information,
            programs=programs.programs,
            admission_methods=admission_methods.admission_methods,
            admission_score=admission_score.admission_score,
            candidate_source_urls=merged_section_sources,
        )
        logging.info("completed metadata call for school id=%s", school_id)
        merged_sources = self._merge_source_urls(
            metadata.source_urls,
            merged_section_sources,
        )
        return SchoolResearchResult(
            description=metadata.description,
            information=information.information,
            campus=metadata.campus,
            campus_locations=metadata.campus_locations,
            programs=programs.programs,
            admission_methods=admission_methods.admission_methods,
            admission_score=admission_score.admission_score,
            tags=metadata.tags,
            source_url=metadata.source_url.strip() or (merged_sources[0] if merged_sources else ""),
            source_urls=merged_sources,
        )

    async def generate_information_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> SchoolInformationDraft:
        return await self._generate_structured_async(
            model=self.config.section_model,
            prompt=self._build_information_prompt(
                school_name=school_name,
                school_id=school_id,
            ),
            schema=SchoolInformationDraft,
            use_google_search=True,
        )

    async def generate_programs_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> SchoolProgramsDraft:
        return await self._generate_structured_async(
            model=self.config.section_model,
            prompt=self._build_programs_prompt(
                school_name=school_name,
                school_id=school_id,
            ),
            schema=SchoolProgramsDraft,
            use_google_search=True,
        )

    async def generate_admission_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> SchoolAdmissionDraft:
        return await self._generate_structured_async(
            model=self.config.section_model,
            prompt=self._build_admission_methods_prompt(
                school_name=school_name,
                school_id=school_id,
            ),
            schema=SchoolAdmissionDraft,
            use_google_search=True,
        )

    async def generate_admission_score_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> SchoolAdmissionScoreDraft:
        return await self._generate_structured_async(
            model=self.config.section_model,
            prompt=self._build_admission_score_prompt(
                school_name=school_name,
                school_id=school_id,
            ),
            schema=SchoolAdmissionScoreDraft,
            use_google_search=True,
        )

    async def generate_metadata_async(
        self,
        *,
        school_name: str,
        school_id: int | str,
        information: str,
        programs: str,
        admission_methods: str,
        admission_score: str,
        candidate_source_urls: list[str],
    ) -> SchoolMetadataDraft:
        return await self._generate_structured_async(
            model=self.config.metadata_model,
            prompt=self._build_metadata_prompt(
                school_name=school_name,
                school_id=school_id,
                information=information,
                programs=programs,
                admission_methods=admission_methods,
                admission_score=admission_score,
                candidate_source_urls=candidate_source_urls,
            ),
            schema=SchoolMetadataDraft,
            use_google_search=False,
        )

    async def _generate_structured_async(
        self,
        *,
        model: str,
        prompt: str,
        schema: type[BaseModel],
        use_google_search: bool,
    ) -> BaseModel:
        tools: list[Any] = []
        if use_google_search and self.config.enable_google_search:
            tools.append(types.Tool(google_search=types.GoogleSearch()))

        thinking_config = None
        if self.config.thinking_level:
            thinking_config = types.ThinkingConfig(thinking_level=self.config.thinking_level)

        response = await self.async_client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                tools=tools,
                response_mime_type="application/json",
                response_json_schema=schema.model_json_schema(),
                thinking_config=thinking_config,
                max_output_tokens=self.config.max_output_tokens,
            ),
        )
        if response.text:
            return schema.model_validate_json(response.text)
        raise RuntimeError("Gemini did not return structured output")

    def _build_information_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> str:
        return f"""
Bạn đang viết riêng section `information` cho CMS về trường đại học Việt Nam "{school_name}" (ID nội bộ: {school_id}).

Yêu cầu:
- Chỉ trả về JSON hợp lệ theo schema được cung cấp.
- Viết bằng tiếng Việt, chi tiết, giàu dữ kiện, không quảng cáo.
- Hiện tại là năm 2026. Ưu tiên thông tin công bố trong năm 2026 hoặc áp dụng cho tuyển sinh/đào tạo năm 2026; nếu chưa có thì mới lùi về 2025 và phải nói rõ đang dùng dữ liệu năm nào.
- Đi thẳng vào ý chính.
- Được phép dùng Markdown nhẹ bên trong chuỗi.
- Output proper markdown, sạch, không có citation numbers ở cuối câu.
- Không dùng HTML.
- Viết chi tiết, đầy đủ, nhiều ý rõ ràng để dễ đọc, nhưng không lan man.
- Bỏ các bình luận chủ quan và đánh giá chung chung, chỉ tập trung vào thông tin.

Section này phải đủ dày như nội dung chính của một trang thông tin trường.

Nội dung cần cố gắng bao phủ:
- lịch sử hoặc cột mốc đáng chú ý
- loại hình và đơn vị chủ quản nếu quan trọng
- vị trí, cơ sở đào tạo, quy mô hoặc phạm vi đào tạo
- định hướng phát triển, thay đổi nổi bật gần đây
- thế mạnh đào tạo, nghiên cứu, thực hành
- hợp tác quốc tế/doanh nghiệp/bệnh viện/xưởng/phòng lab nếu có
- môi trường học tập và lợi thế cho sinh viên
- điểm khác biệt so với các trường cùng nhóm
- website chính thức và trang tuyển sinh chính thức nếu xác định được trong phần nguồn
- Không nên biến section này thành phần tuyển sinh; chỉ nhắc tuyển sinh khi đó là thay đổi quan trọng giúp hiểu bức tranh chung của trường.

Nếu có thay đổi rõ giữa năm gần nhất và năm trước đó, phải nêu rõ trong section.
Nếu có thuật ngữ khó, giải thích ngắn gọn ngay trong câu.
- Nên có nhiều bullet hoặc tiểu mục rõ ràng cho dễ scan.
- Mục tiêu độ dài cao hơn mức tóm tắt ngắn, không viết sơ sài.
""".strip()

    def _build_programs_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> str:
        return f"""
Bạn đang viết riêng section `programs` cho CMS về trường đại học Việt Nam "{school_name}" (ID nội bộ: {school_id}).

Yêu cầu:
- Chỉ trả về JSON hợp lệ theo schema được cung cấp.
- Viết bằng tiếng Việt, giàu thông tin, dễ scan.
- Hiện tại là năm 2026. Ưu tiên thông tin công bố trong năm 2026 hoặc áp dụng cho năm học/tuyển sinh 2026; nếu chưa có thì mới lùi về 2025 và phải nói rõ đang dùng dữ liệu năm nào.
- Được phép dùng Markdown nhẹ, bullet, numbered list.
- Output proper markdown, sạch, không có citation numbers ở cuối câu.
- Không dùng HTML.
- Đi thẳng vào ý chính.
- Chi tiết, đầy đủ, chia theo nhóm ngành và điều kiện khi phù hợp.

Section này phải mô tả cụ thể các nhóm ngành/chương trình nổi bật, không được chỉ nói "đào tạo đa ngành".

Cần cố gắng bao phủ:
- nhóm ngành mạnh
- chương trình đào tạo nổi bật
- chương trình chất lượng cao/quốc tế/ứng dụng/liên kết nếu có
- ngành mới hoặc hướng đào tạo mới gần đây nếu có
- học phí, học bổng hoặc hỗ trợ tài chính nếu đó là thông tin nổi bật và xác minh được
- trường phù hợp với định hướng người học nào
- nếu có học phí, cố gắng cho biết mức học phí theo nhóm chương trình hoặc nêu rõ chưa thấy công bố mới nhất
- nếu có học bổng, nêu ngắn gọn loại học bổng hoặc hỗ trợ đáng chú ý
- nên có nhiều bullet hoặc numbered list để dễ đọc như một clean article section
- Mục tiêu độ dài cao hơn mức mô tả tóm tắt, không viết quá mỏng.
- Không lặp lại quá nhiều phần lịch sử hoặc tổng quan chung của trường; chỉ giữ đúng trọng tâm chương trình đào tạo.
""".strip()

    def _build_admission_methods_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> str:
        return f"""
Bạn đang viết riêng section `admission_methods` cho CMS về trường đại học Việt Nam "{school_name}" (ID nội bộ: {school_id}).

Yêu cầu:
- Chỉ trả về JSON hợp lệ theo schema được cung cấp.
- Viết bằng tiếng Việt, rõ ràng, thực dụng cho thí sinh.
- Hiện tại là năm 2026. Ưu tiên thông tin tuyển sinh 2026 đã công bố chính thức; nếu chưa có thì dùng dữ liệu 2025 gần nhất và phải ghi rất rõ đang tham chiếu năm nào.
- Được phép dùng Markdown nhẹ, bullet, numbered list.
- Không bịa con số.
- Output proper markdown, sạch, không có citation numbers ở cuối câu.
- Không dùng HTML.
- Đi thẳng vào ý chính.
- Chi tiết, đầy đủ và nhiều bullet để dễ đọc.
- Trình bày đồng bộ với các section khác: mở bằng 1-2 câu khái quát ngắn, sau đó chia thành các tiểu mục Markdown rõ ràng.
- Ưu tiên cấu trúc như một clean article section với các heading ngắn kiểu `##` hoặc các nhóm bullet lớn.

Cần cố gắng bao phủ:
- phương thức xét tuyển
- tổ hợp hoặc điều kiện đầu vào nếu có
- thay đổi quan trọng gần đây
- lưu ý hữu ích cho thí sinh về hồ sơ, điều kiện, chứng chỉ hoặc mốc thời gian nếu có
- chi tiết điều kiện của từng phương thức nếu xác minh được
- nếu chưa có dữ liệu năm mới nhất, ghi rõ dùng dữ liệu gần nhất nào
- không biến section này thành phần điểm chuẩn; trọng tâm là phương thức và điều kiện của từng phương thức
- Mục tiêu độ dài cao hơn mức ghi chú ngắn, đủ dày để thành một section hữu ích thực sự.
- Ưu tiên một cấu trúc gần như sau nếu phù hợp với dữ liệu:
  - một đoạn mở đầu rất ngắn
  - `## Phương thức xét tuyển`
  - `## Điều kiện hoặc lưu ý của từng phương thức`
  - `## Lưu ý gần đây cho thí sinh`
""".strip()

    def _build_admission_score_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
    ) -> str:
        return f"""
Bạn đang viết riêng section `admission_score` cho CMS về trường đại học Việt Nam "{school_name}" (ID nội bộ: {school_id}).

Yêu cầu:
- Chỉ trả về JSON hợp lệ theo schema được cung cấp.
- Viết bằng tiếng Việt, rõ ràng, thực dụng cho thí sinh.
- Hiện tại là năm 2026. Ưu tiên dữ liệu điểm chuẩn hoặc mức điểm tham khảo năm 2026 nếu đã có công bố chính thức; nếu chưa có thì dùng năm 2025 gần nhất và phải ghi rõ đang tham chiếu năm nào.
- Được phép dùng Markdown nhẹ, bullet, numbered list.
- Không bịa con số.
- Output proper markdown, sạch, không có citation numbers ở cuối câu.
- Không dùng HTML.
- Đi thẳng vào ý chính.
- Chi tiết, đầy đủ và nhiều bullet để dễ đọc.
- Trình bày đồng bộ với các section khác: mở bằng 1-2 câu khái quát ngắn, sau đó chia thành các tiểu mục Markdown rõ ràng.

Cần cố gắng bao phủ:
- nhóm ngành và mức điểm chuẩn nếu có xác minh
- nêu rõ điểm đó thuộc phương thức nào nếu xác minh được
- xu hướng tăng/giảm nếu có cơ sở từ dữ liệu gần nhất
- nếu chưa có điểm chuẩn năm 2026, chuyển sang điểm chuẩn 2025 hoặc mức điểm tham khảo gần nhất
- nếu trường chưa công bố điểm chuẩn mới nhất, phải ghi rõ điều đó
- nên nhóm các ngành hoặc mức điểm chuẩn nếu liên quan thay vì liệt kê rời rạc
- không lặp lại quá nhiều phần phương thức xét tuyển vì đã có section riêng
- Mục tiêu độ dài cao hơn mức ghi chú ngắn, đủ dày để thành một section hữu ích thực sự.
- Ưu tiên một cấu trúc gần như sau nếu phù hợp với dữ liệu:
  - một đoạn mở đầu rất ngắn
  - `## Nhóm ngành và mức điểm đáng chú ý`
  - `## Theo từng phương thức hoặc nhóm ngành`
  - `## Lưu ý khi đọc điểm chuẩn`
- Nếu chưa có điểm chuẩn mới nhất, hãy ghi rõ điều đó trong một tiểu mục riêng thay vì lẫn trong câu văn dài.
""".strip()

    def _build_metadata_prompt(
        self,
        *,
        school_name: str,
        school_id: int | str,
        information: str,
        programs: str,
        admission_methods: str,
        admission_score: str,
        candidate_source_urls: list[str],
    ) -> str:
        source_block = "\n".join(f"- {url}" for url in candidate_source_urls if str(url).strip()) or "- Chưa có URL ứng viên rõ ràng"
        return f"""
Bạn đang làm bước metadata cuối cho trường đại học Việt Nam "{school_name}" (ID nội bộ: {school_id}).

Nhiệm vụ:
- Không nghiên cứu lại từ đầu.
- Chỉ dựa trên 4 section đã có bên dưới để rút ra:
  - `description`
  - `campus`
  - `campus_locations`
  - `tags`
  - `source_url`
  - `source_urls`
- Chỉ trả về JSON hợp lệ theo schema được cung cấp.

Yêu cầu cho `description`:
- Viết như đoạn mở đầu của bài giới thiệu trường, khoảng 150-260 từ.
- Phải trả lời được nhanh: trường là ai, thuộc nhóm nào, ở đâu, nổi bật ở điểm gì, phù hợp với nhóm người học nào.
- Viết tự nhiên, giàu thông tin, không sáo rỗng.
- Dùng Markdown nhẹ nếu cần, nhưng không dùng HTML.

Yêu cầu cho `campus`:
- Viết ngắn gọn nhưng cụ thể, ưu tiên 1-4 câu hoặc một nhóm bullet ngắn.
- Chỉ tập trung vào cơ sở đào tạo, campus, địa điểm học chính, phân bố cơ sở nếu có.
- Nếu trường có nhiều cơ sở, nêu rõ các cơ sở chính hoặc cách phân bố.
- Nếu chưa xác minh rõ số lượng hoặc tên cơ sở, ghi trung thực rằng chưa thấy công bố đầy đủ.

Yêu cầu cho `campus_locations`:
- Trả về danh sách rất ngắn gọn các tên tỉnh/thành phố tại Việt Nam để filter.
- Ưu tiên tên chuẩn hóa như `Hà Nội`, `TP.HCM`, `Đà Nẵng`, `Nghệ An`, `Cần Thơ`, `Huế`.
- Không đưa địa chỉ đầy đủ, không đưa tên cơ sở, không đưa quận/huyện, không đưa câu dài vào field này.
- Nếu trường có nhiều cơ sở ở cùng một thành phố thì chỉ giữ một giá trị địa phương chuẩn hóa.
- Nếu chưa xác minh rõ campus ở đâu, trả về danh sách rỗng thay vì đoán.

Yêu cầu cho `tags`:
- Tạo 5-10 tag ngắn, chuẩn hóa, hữu ích cho lọc dữ liệu.
- Ưu tiên loại hình trường, địa phương, nhóm ngành mạnh, định hướng đào tạo, đặc điểm nhận diện.
- Không tạo tag quá dài.

Yêu cầu cho `source_url` và `source_urls`:
- Ưu tiên chọn từ danh sách URL ứng viên bên dưới.
- `source_url` là URL tốt nhất để editor mở ra kiểm tra nhanh.
- `source_urls` chỉ cần ngắn gọn, tiêu biểu, không cần liệt kê quá nhiều.
- Nếu URL ứng viên chưa đủ tốt, bạn có thể chọn lại từ ngữ cảnh section, nhưng vẫn ưu tiên danh sách ứng viên.

Không dùng HTML. Không thêm giải thích ngoài JSON.

## URL ứng viên
{source_block}

## Section information
{information}

## Section programs
{programs}

## Section admission_methods
{admission_methods}

## Section admission_score
{admission_score}
""".strip()

    @staticmethod
    def _merge_source_urls(*groups: list[str]) -> list[str]:
        merged: list[str] = []
        for group in groups:
            for item in group:
                normalized = str(item).strip()
                if normalized and normalized not in merged:
                    merged.append(normalized)
        return merged


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


def sanitize_rich_text(value: str) -> str:
    text = str(value)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</p\s*>", "\n\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def to_jsonb(value: list[str]) -> str:
    return json.dumps(value, ensure_ascii=False)

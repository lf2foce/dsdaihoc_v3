import json
import re
import logging
import os
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any

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
    last_crawled_at_field: str
    todo_status: str
    pending_status: str
    approved_status: str


@dataclass
class GeminiConfig:
    api_key: str
    model: str
    enable_google_search: bool


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
        description="Đoạn giới thiệu ngắn, súc tích về trường, tối đa khoảng 120 từ."
    )
    information: str = Field(
        description="Thông tin tổng quan quan trọng nhất về trường: loại hình, địa điểm, điểm nổi bật, thế mạnh."
    )
    programs: str = Field(
        description="Thông tin về các chương trình, nhóm ngành, đào tạo nổi bật."
    )
    admission_score: str = Field(
        description="Thông tin điểm chuẩn hoặc phương thức xét tuyển đáng chú ý gần nhất."
    )
    tags: list[str] = Field(
        default_factory=list,
        description="Danh sách tag ngắn gọn, ví dụ: Công lập, Hà Nội, Kỹ thuật.",
    )
    source_url: str = Field(
        default="",
        description="URL nguồn chính thức hoặc đáng tin cậy nhất dùng để tổng hợp thông tin.",
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
        last_crawled_at_field=os.getenv("AIRTABLE_FIELD_LAST_CRAWLED_AT", "last_crawled_at"),
        todo_status=os.getenv("AIRTABLE_STATUS_TODO", "Todo"),
        pending_status=os.getenv("AIRTABLE_STATUS_PENDING", "Pending"),
        approved_status=os.getenv("AIRTABLE_STATUS_APPROVED", "Approved"),
    )


def load_gemini_config() -> GeminiConfig:
    return GeminiConfig(
        api_key=_get_required_env("GEMINI_API_KEY"),
        model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
        enable_google_search=os.getenv("GEMINI_ENABLE_GOOGLE_SEARCH", "true").lower()
        in {"1", "true", "yes", "on"},
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


class GeminiResearchClient:
    def __init__(self, config: GeminiConfig) -> None:
        self.config = config
        self.client = genai.Client(api_key=config.api_key)

    def research_school(
        self,
        *,
        school_name: str,
        school_id: int | str,
        existing_source_url: str | None = None,
    ) -> SchoolResearchResult:
        prompt = f"""
Hãy nghiên cứu trường đại học tại Việt Nam có tên "{school_name}" (ID nội bộ: {school_id}).

Mục tiêu:
- Trả về dữ liệu có cấu trúc cho hệ thống quản trị nội dung.
- Viết bằng tiếng Việt, súc tích, trung tính, không dùng markdown.
- Không bịa thông tin. Nếu một mục chưa xác minh chắc chắn, hãy ghi ngắn gọn rằng chưa có thông tin rõ ràng.
- Ưu tiên nguồn chính thức của trường hoặc nguồn tuyển sinh đáng tin cậy.
- `source_url` phải là URL nguồn tốt nhất để tham chiếu.
- `tags` nên ngắn gọn, hữu ích cho lọc dữ liệu.
- Chỉ trả về đúng một JSON object hợp lệ, không thêm giải thích, không thêm code fence.

Nội dung mong muốn:
- `description`: 2-3 câu giới thiệu khái quát, dễ đọc.
- `information`: tổng quan nổi bật nhất về trường.
- `programs`: nhóm ngành, chương trình, hoặc định hướng đào tạo đáng chú ý.
- `admission_score`: điểm chuẩn, phương thức xét tuyển, hoặc ghi chú tuyển sinh quan trọng gần nhất.
- `tags`: các tag ngắn như Công lập, TP.HCM, Kiến trúc, Kỹ thuật.
- JSON phải có đúng các key: `description`, `information`, `programs`, `admission_score`, `tags`, `source_url`.
""".strip()

        if existing_source_url:
            prompt += f"\n\nNguồn tham khảo hiện có trong Airtable: {existing_source_url}"

        tools: list[Any] = []
        if self.config.enable_google_search:
            tools.append(types.Tool(google_search=types.GoogleSearch()))

        response = self.client.models.generate_content(
            model=self.config.model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                tools=tools,
            ),
        )

        if response.text:
            payload = self._extract_json_object(response.text)
            return SchoolResearchResult.model_validate_json(payload)
        raise RuntimeError(f"Gemini did not return structured output for school {school_id}")

    @staticmethod
    def _extract_json_object(text: str) -> str:
        fenced_match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
        if fenced_match:
            return fenced_match.group(1)

        brace_match = re.search(r"\{.*\}", text, re.DOTALL)
        if brace_match:
            return brace_match.group(0)

        raise RuntimeError("Gemini response did not include a JSON object")


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


def to_jsonb(value: list[str]) -> str:
    return json.dumps(value, ensure_ascii=False)

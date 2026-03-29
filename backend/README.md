# Airtable University Pipeline

Python backend for:

1. Reading queued university records from Airtable
2. Taking the Airtable school name and using Gemini plus Google Search grounding to generate structured content in one pass
3. Writing the generated fields back to Airtable and moving the record from `Todo` to `Pending`
4. Syncing `Approved` records from Airtable into PostgreSQL with idempotent upsert

## Files

- `crawl_airtable_records.py`: research + populate Airtable content fields
- `check_airtable_schema.py`: inspect Airtable columns before running the crawl
- `sync_airtable_to_postgres.py`: sync approved Airtable rows into PostgreSQL
- `common.py`: shared Airtable, Gemini, and PostgreSQL utilities

## Install

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

Required:

```bash
AIRTABLE_ACCESS_TOKEN=
AIRTABLE_BASE_ID=
GEMINI_API_KEY=
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

Recommended:

```bash
AIRTABLE_TABLE_NAME=Trường
AIRTABLE_VIEW=

AIRTABLE_FIELD_ID=id
AIRTABLE_FIELD_NAME=Tên trường
AIRTABLE_FIELD_DESCRIPTION=Mô tả trường
AIRTABLE_FIELD_INFORMATION=Thông tin trường
AIRTABLE_FIELD_PROGRAMS=Chương trình
AIRTABLE_FIELD_ADMISSION_SCORE=Điểm chuẩn
AIRTABLE_FIELD_TAGS=Tags
AIRTABLE_FIELD_SOURCE_URL=source_url
AIRTABLE_FIELD_STATUS=Status
AIRTABLE_FIELD_SYNCED=synced_to_db
AIRTABLE_FIELD_LAST_CRAWLED_AT=last_crawled_at

AIRTABLE_STATUS_TODO=Todo
AIRTABLE_STATUS_PENDING=Pending
AIRTABLE_STATUS_APPROVED=Approved

GEMINI_MODEL=gemini-2.5-flash
GEMINI_ENABLE_GOOGLE_SEARCH=true

POSTGRES_PORT=5432
POSTGRES_SSLMODE=
```

Alternative PostgreSQL connection:

```bash
POSTGRES_DSN=postgresql://user:password@host:5432/dbname
```

## Usage

Dry-run crawl:

```bash
python crawl_airtable_records.py --limit 3 --dry-run
```

Check Airtable schema first:

```bash
python check_airtable_schema.py
```

Run crawl:

```bash
python crawl_airtable_records.py --limit 3
```

Dry-run sync:

```bash
python sync_airtable_to_postgres.py --limit 10 --dry-run
```

Run sync:

```bash
python sync_airtable_to_postgres.py --limit 10
```

## Notes

- Crawl flow is: Airtable `Todo` record -> read `id` and `Tên trường` -> Gemini research with Google Search -> structured JSON output -> patch Airtable fields -> set `Status=Pending`.
- The code accepts `AIRTABLE_ACCESS_TOKEN` and also still supports the old env name `AIRTABLE_API_KEY`.
- Airtable status names are case-sensitive. The defaults here are `Todo`, `Pending`, and `Approved`.
- The scripts assume your Airtable `id` field is numeric.
- `Tags` are written back to Airtable as a list of strings, suitable for a multi-select style field.
- The sync step uses `INSERT ... ON CONFLICT (id) DO UPDATE`.

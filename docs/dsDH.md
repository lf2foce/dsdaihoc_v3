**Task: Build Python Pipeline to Crawl, Review, and Sync University Records from Airtable to PostgreSQL**

## Objective

Develop Python scripts that support the full moderated pipeline:

1. Crawl records queued in Airtable
2. Send crawled records to review
3. Sync approved records into PostgreSQL

This pipeline supports a moderated data workflow:

**Airtable todo queue → Crawler → Airtable review → PostgreSQL (production database)**

No vector database or AI components are required.

The system must be safe to run repeatedly without creating duplicate records.

---

## System Context

We maintain a dataset of universities.

Records are first created in Airtable as queue items.

The crawler reads records with `Status = "todo"`, fetches content, and updates the record to `pending`.

A human reviewer checks the crawled content and sets the `Status` field to `approved`.

Only approved records should be synchronized into PostgreSQL.

---

## Data Flow

1. Fetch records from Airtable where `Status = "todo"`
2. Crawl missing content for those records
3. Update Airtable fields and set `Status = "pending"`
4. A human reviewer checks the result
5. Fetch records where:

Status = "approved"
AND
synced_to_db = false

6. Upsert those records into PostgreSQL
7. Mark the record as synced in Airtable

---

## Airtable Table Structure

Table name:

schools

Required fields:

id (integer or numeric string, unique identifier)

Tên trường (text)

Mô tả trường (long text)

Thông tin trường (long text)

Chương trình (long text)

Điểm chuẩn (text)

Tags (multiple select or JSON)

source_url (text)

Status (single select)

Recommended values:

todo
pending
approved
rejected

synced_to_db (checkbox)

last_crawled_at (datetime)

Notes:

* For the current phase, using the Airtable row number or a manual numeric id is acceptable because the dataset is small, around 200 schools.
* Do not use `Tên trường` as the primary key in PostgreSQL.
* In a later phase, this numeric id can be replaced by a stable slug or canonical identifier.

---

## PostgreSQL Table Schema

Create table:

```sql
CREATE TABLE schools (
    id INTEGER PRIMARY KEY,

    name TEXT NOT NULL,
    description TEXT,
    information TEXT,
    programs TEXT,
    admission_score TEXT,

    tags JSONB,

    source_url TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

Indexes:

```sql
CREATE INDEX idx_schools_name ON schools(name);
CREATE INDEX idx_schools_tags ON schools USING GIN(tags);
```

---

## Core Requirement: Idempotent Upsert

The script must use:

INSERT ... ON CONFLICT (id) DO UPDATE

This ensures:

* No duplicate records
* Safe repeated execution
* Reliable daily synchronization

---

## Python Script Requirements

The implementation can be split into two scripts:

1. `crawl_airtable_records.py`
2. `sync_airtable_to_postgres.py`

This keeps the crawl stage and the database sync stage separate.

### Script 1: Crawl queued Airtable records

The crawler script must:

1. Connect to Airtable API
2. Fetch records with:

filterByFormula:

AND(
{Status} = "todo"
)

3. For each record:

Read the school id and school name

Crawl or collect the school content

Update Airtable fields such as:

Tên trường
Mô tả trường
Thông tin trường
Chương trình
Điểm chuẩn
Tags
source_url
last_crawled_at

4. After successful crawling:

Update Airtable:

Status = "pending"

### Script 2: Sync approved Airtable records to PostgreSQL

The sync script must:

1. Connect to Airtable API

Use:

filterByFormula:

AND(
{Status} = "approved",
{synced_to_db} = FALSE()
)

2. Connect to PostgreSQL

Use:

psycopg2
or
asyncpg

3. For each record:

Upsert into PostgreSQL

4. After successful insert/update:

Update Airtable:

synced_to_db = true

---

## Error Handling

The script must:

* Log errors
* Continue processing remaining records
* Not crash on a single failure

Required:

```python
try:
    process_record()
except Exception as e:
    log_error(e)
```

---

## Logging Requirements

Log the following:

* record id
* success or failure
* timestamp

Example:

INFO: synced record school_123
ERROR: failed to sync school_456

---

## Execution Mode

The script must support:

Manual run

and

Scheduled run

Recommended scheduling:

Every 5 minutes
or
Every 15 minutes

---

## Configuration

All credentials must be stored in environment variables:

AIRTABLE_API_KEY

AIRTABLE_BASE_ID

AIRTABLE_TABLE_NAME

POSTGRES_HOST

POSTGRES_DB

POSTGRES_USER

POSTGRES_PASSWORD

---

## Performance Expectations

The system should handle:

Up to:

10,000 records per day

Latency target:

Under 10 seconds per run

---

## Deliverables

Provide:

1. Python scripts:

crawl_airtable_records.py

sync_airtable_to_postgres.py

2. requirements.txt

3. README.md

Include:

Setup instructions
Environment variables
Run command

---

## Definition of Done

The system is considered complete when:

* Records with `Status = "todo"` are crawled and moved to `pending`
* Approved records appear in PostgreSQL
* No duplicates are created
* synced_to_db becomes true after sync
* Script can run multiple times safely
* Logs show successful execution

---

## Optional Enhancements (Nice to Have)

Batch insert

Retry logic

last_synced_at field

Docker support

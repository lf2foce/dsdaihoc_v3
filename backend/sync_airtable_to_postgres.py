import argparse
import logging

from psycopg2.extras import Json

from common import (
    AirtableClient,
    build_postgres_connection,
    get_school_identity,
    load_airtable_config,
    load_postgres_config,
    setup_logging,
)


UPSERT_SQL = """
INSERT INTO schools (
    id,
    name,
    description,
    information,
    programs,
    admission_score,
    tags,
    source_url,
    updated_at
)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
ON CONFLICT (id)
DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    information = EXCLUDED.information,
    programs = EXCLUDED.programs,
    admission_score = EXCLUDED.admission_score,
    tags = EXCLUDED.tags,
    source_url = EXCLUDED.source_url,
    updated_at = NOW();
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync approved Airtable records to PostgreSQL."
    )
    parser.add_argument("--limit", type=int, default=None, help="Maximum Airtable records to sync.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Read and validate records without writing to PostgreSQL or Airtable.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    setup_logging()

    airtable_config = load_airtable_config()
    postgres_config = load_postgres_config()
    airtable = AirtableClient(airtable_config)

    formula = (
        f"AND("
        f"{{{airtable_config.status_field}}} = '{airtable_config.approved_status}',"
        f"{{{airtable_config.synced_field}}} = FALSE()"
        f")"
    )
    records = airtable.list_records(filter_formula=formula, max_records=args.limit)
    logging.info("found %s Airtable records ready to sync", len(records))

    if args.dry_run:
        for record in records:
            try:
                school_id, school_name = get_school_identity(record.get("fields", {}), airtable_config)
                logging.info("validated record id=%s name=%s", school_id, school_name)
            except Exception as exc:
                logging.exception("failed to validate record %s: %s", record["id"], exc)
        return 0

    connection = build_postgres_connection(postgres_config)
    try:
        connection.autocommit = False
        with connection.cursor() as cursor:
            for record in records:
                airtable_record_id = record["id"]
                fields = record.get("fields", {})

                try:
                    school_id, school_name = get_school_identity(fields, airtable_config)
                    tags = fields.get(airtable_config.tags_field) or []
                    if not isinstance(tags, list):
                        tags = [str(tags)]

                    cursor.execute(
                        UPSERT_SQL,
                        (
                            school_id,
                            school_name,
                            fields.get(airtable_config.description_field),
                            fields.get(airtable_config.information_field),
                            fields.get(airtable_config.programs_field),
                            fields.get(airtable_config.admission_score_field),
                            Json(tags),
                            fields.get(airtable_config.source_url_field),
                        ),
                    )
                    connection.commit()

                    airtable.update_record(
                        airtable_record_id,
                        {airtable_config.synced_field: True},
                    )
                    logging.info("synced record %s", school_id)
                except Exception as exc:
                    connection.rollback()
                    logging.exception("failed to sync Airtable record %s: %s", airtable_record_id, exc)
    finally:
        connection.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

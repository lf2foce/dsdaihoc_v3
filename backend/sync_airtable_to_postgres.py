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
    display_order,
    short_name,
    name,
    school_type,
    featured_major,
    description,
    information,
    campus,
    campus_locations,
    programs,
    admission_methods,
    admission_score,
    tags,
    source_url,
    source_urls,
    last_crawled_at,
    status,
    source,
    updated_at
)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'approved', 'airtable', NOW())
ON CONFLICT (id)
DO UPDATE SET
    display_order = EXCLUDED.display_order,
    short_name = EXCLUDED.short_name,
    name = EXCLUDED.name,
    school_type = EXCLUDED.school_type,
    featured_major = EXCLUDED.featured_major,
    description = EXCLUDED.description,
    information = EXCLUDED.information,
    campus = EXCLUDED.campus,
    campus_locations = EXCLUDED.campus_locations,
    programs = EXCLUDED.programs,
    admission_methods = EXCLUDED.admission_methods,
    admission_score = EXCLUDED.admission_score,
    tags = EXCLUDED.tags,
    source_url = EXCLUDED.source_url,
    source_urls = EXCLUDED.source_urls,
    last_crawled_at = EXCLUDED.last_crawled_at,
    status = 'approved',
    updated_at = NOW()
-- Never clobber a row owned by the direct-crawl path.
WHERE schools.source = 'airtable';
"""


def normalize_list(value) -> list[str]:
    """Mirror _normalize_list in export_approved_to_json.py exactly.

    Airtable hands back a list for multi-selects, and newline-separated text for
    long-text fields such as source_urls. Storing the raw value in TEXT let
    psycopg2 adapt lists into the Postgres array literal `{"Kiến trúc"}`, which
    round-tripped into the JSON export as a literal chip label.
    """
    if value is None:
        return []
    items = value if isinstance(value, list) else str(value).splitlines()

    cleaned: list[str] = []
    for item in items:
        normalized = str(item).strip()
        if normalized and normalized not in cleaned:
            cleaned.append(normalized)
    return cleaned


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync approved Airtable records to PostgreSQL."
    )
    parser.add_argument("--limit", type=int, default=None, help="Maximum Airtable records to sync.")
    parser.add_argument(
        "--only-unsynced",
        action="store_true",
        help=(
            "Only sync records whose synced_to_db checkbox is still empty. "
            "Nothing ever clears that flag, so this makes each record sync once "
            "and never again — leave it off for a periodic refresh."
        ),
    )
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

    # TRIM matters: the Status values in Airtable carry a leading space, so the
    # untrimmed comparison this script used to run matched zero records and
    # exited reporting success. export_approved_to_json.py already does this.
    status_clause = (
        f'TRIM({{{airtable_config.status_field}}} & "") = "{airtable_config.approved_status}"'
    )
    formula = (
        f"AND({status_clause}, {{{airtable_config.synced_field}}} = FALSE())"
        if args.only_unsynced
        else status_clause
    )
    records = airtable.list_records(filter_formula=formula, max_records=args.limit)

    if not records:
        logging.warning(
            "no Airtable records matched formula %s, falling back to local filtering",
            formula,
        )
        records = [
            record
            for record in airtable.list_records(max_records=args.limit)
            if str(record.get("fields", {}).get(airtable_config.status_field, "")).strip()
            == airtable_config.approved_status
            and (not args.only_unsynced or not record.get("fields", {}).get(airtable_config.synced_field))
        ]

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
                            fields.get(airtable_config.display_order_field),
                            fields.get(airtable_config.short_name_field),
                            school_name,
                            fields.get(airtable_config.school_type_field),
                            Json(normalize_list(fields.get(airtable_config.featured_major_field))),
                            fields.get(airtable_config.description_field),
                            fields.get(airtable_config.information_field),
                            fields.get(airtable_config.campus_field),
                            Json(fields.get(airtable_config.campus_locations_field) or []),
                            fields.get(airtable_config.programs_field),
                            fields.get(airtable_config.admission_methods_field),
                            fields.get(airtable_config.admission_score_field),
                            Json(tags),
                            fields.get(airtable_config.source_url_field),
                            Json(normalize_list(fields.get(airtable_config.source_urls_field))),
                            fields.get(airtable_config.last_crawled_at_field) or None,
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

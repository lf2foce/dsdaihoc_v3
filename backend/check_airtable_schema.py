import argparse
import logging

from common import AirtableClient, load_airtable_config, setup_logging


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check Airtable table schema and compare it with the pipeline's expected fields."
    )
    parser.add_argument(
        "--table",
        default=None,
        help="Optional Airtable table name override. Defaults to AIRTABLE_TABLE_NAME.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    setup_logging()

    config = load_airtable_config()
    if args.table:
        config.table_name = args.table

    airtable = AirtableClient(config)
    tables = airtable.list_tables_schema()

    target = next((table for table in tables if table.get("name") == config.table_name), None)
    if not target:
        available = ", ".join(sorted(table.get("name", "<unknown>") for table in tables))
        raise RuntimeError(
            f"Could not find Airtable table {config.table_name!r}. Available tables: {available}"
        )

    expected_fields = [
        config.id_field,
        config.name_field,
        config.description_field,
        config.information_field,
        config.programs_field,
        config.admission_score_field,
        config.tags_field,
        config.source_url_field,
        config.status_field,
        config.synced_field,
        config.last_crawled_at_field,
    ]

    field_rows = []
    actual_field_names: set[str] = set()
    for field in target.get("fields", []):
        name = field.get("name", "")
        actual_field_names.add(name)
        field_rows.append((name, field.get("type", "unknown")))

    missing = [field_name for field_name in expected_fields if field_name not in actual_field_names]
    extra = [field_name for field_name in sorted(actual_field_names) if field_name not in expected_fields]

    print(f"Base ID: {config.base_id}")
    print(f"Table: {target.get('name')}")
    print("")
    print("Current Airtable fields:")
    for name, field_type in sorted(field_rows, key=lambda item: item[0].lower()):
        print(f"- {name} ({field_type})")

    print("")
    print("Expected by pipeline:")
    for field_name in expected_fields:
        status = "OK" if field_name in actual_field_names else "MISSING"
        print(f"- {field_name}: {status}")

    print("")
    if missing:
        print("Missing fields:")
        for field_name in missing:
            print(f"- {field_name}")
    else:
        print("Missing fields: none")

    print("")
    if extra:
        print("Extra fields not used by pipeline:")
        for field_name in extra:
            print(f"- {field_name}")
    else:
        print("Extra fields not used by pipeline: none")

    logging.info("schema check completed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

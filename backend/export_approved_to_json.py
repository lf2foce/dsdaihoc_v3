import argparse
import json
import logging
from pathlib import Path
from typing import Any

from common import AirtableClient, load_airtable_config, setup_logging, utc_now_iso


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Export Airtable Approved records to a local JSON file for UI/mock usage."
    )
    parser.add_argument(
        "--status",
        default=None,
        help="Optional status override. Defaults to AIRTABLE_STATUS_APPROVED.",
    )
    parser.add_argument(
        "--output",
        default="../data/universities.approved.json",
        help="Output JSON path. Defaults to ../data/universities.approved.json from backend/.",
    )
    return parser.parse_args()


def _normalize_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        items = value
    else:
        items = str(value).splitlines()

    cleaned: list[str] = []
    for item in items:
        normalized = str(item).strip()
        if normalized and normalized not in cleaned:
            cleaned.append(normalized)
    return cleaned


def main() -> int:
    args = parse_args()
    setup_logging()

    config = load_airtable_config()
    airtable = AirtableClient(config)
    status = args.status or config.approved_status

    formula = f'TRIM({{{config.status_field}}} & "") = "{status}"'
    records = airtable.list_records(filter_formula=formula)
    if not records:
        logging.warning(
            "no Airtable records matched formula %s, falling back to local status filtering",
            formula,
        )
        all_records = airtable.list_records()
        records = [
            record
            for record in all_records
            if str(record.get("fields", {}).get(config.status_field, "")).strip() == status
        ]
    logging.info("found %s Airtable records with status=%s", len(records), status)

    items: list[dict[str, Any]] = []
    for record in records:
        fields = record.get("fields", {})
        items.append(
            {
                "airtable_record_id": record["id"],
                "id": fields.get(config.id_field),
                "short_name": fields.get(config.short_name_field, ""),
                "name": fields.get(config.name_field, ""),
                "school_type": fields.get(config.school_type_field, ""),
                "featured_major": fields.get(config.featured_major_field, ""),
                "description": fields.get(config.description_field, ""),
                "information": fields.get(config.information_field, ""),
                "campus": fields.get(config.campus_field, ""),
                "campus_locations": _normalize_list(fields.get(config.campus_locations_field)),
                "programs": fields.get(config.programs_field, ""),
                "admission_methods": fields.get(config.admission_methods_field, ""),
                "admission_score": fields.get(config.admission_score_field, ""),
                "tags": _normalize_list(fields.get(config.tags_field)),
                "source_url": fields.get(config.source_url_field, ""),
                "source_urls": _normalize_list(fields.get(config.source_urls_field)),
                "status": str(fields.get(config.status_field, "")).strip(),
                "last_crawled_at": fields.get(config.last_crawled_at_field, ""),
            }
        )

    items.sort(key=lambda item: (str(item.get("id", "")), item.get("name", "")))

    payload = {
        "exported_at": utc_now_iso(),
        "status": status,
        "count": len(items),
        "items": items,
    }

    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = (Path(__file__).resolve().parent / output_path).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    logging.info("exported %s records to %s", len(items), output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

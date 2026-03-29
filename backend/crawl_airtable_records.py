import argparse
import logging

from common import (
    AirtableClient,
    GeminiResearchClient,
    get_school_identity,
    load_airtable_config,
    load_gemini_config,
    setup_logging,
    to_airtable_tags,
    utc_now_iso,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Crawl Airtable records with Status=Todo using Gemini structured output."
    )
    parser.add_argument("--limit", type=int, default=None, help="Maximum Airtable records to process.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run Gemini research without writing back to Airtable.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    setup_logging()

    airtable_config = load_airtable_config()
    gemini_config = load_gemini_config()

    airtable = AirtableClient(airtable_config)
    researcher = GeminiResearchClient(gemini_config)

    formula = f"{{{airtable_config.status_field}}} = '{airtable_config.todo_status}'"
    records = airtable.list_records(filter_formula=formula, max_records=args.limit)
    logging.info("found %s Airtable records ready to crawl", len(records))

    for record in records:
        airtable_record_id = record["id"]
        fields = record.get("fields", {})

        try:
            school_id, school_name = get_school_identity(fields, airtable_config)
            logging.info("researching record id=%s name=%s", school_id, school_name)

            result = researcher.research_school(
                school_name=school_name,
                school_id=school_id,
                existing_source_url=fields.get(airtable_config.source_url_field),
            )

            update_fields = {
                airtable_config.name_field: school_name,
                airtable_config.description_field: result.description,
                airtable_config.information_field: result.information,
                airtable_config.programs_field: result.programs,
                airtable_config.admission_score_field: result.admission_score,
                airtable_config.tags_field: to_airtable_tags(result.tags),
                airtable_config.source_url_field: result.source_url,
                airtable_config.last_crawled_at_field: utc_now_iso(),
                airtable_config.status_field: airtable_config.pending_status,
            }

            if args.dry_run:
                logging.info("dry-run finished for school id=%s", school_id)
                continue

            airtable.update_record(airtable_record_id, update_fields)
            logging.info("crawled record %s and moved to %s", school_id, airtable_config.pending_status)
        except Exception as exc:
            logging.exception("failed to crawl Airtable record %s: %s", airtable_record_id, exc)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

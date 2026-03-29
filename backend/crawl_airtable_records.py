import argparse
import asyncio
import logging

from common import (
    AsyncAirtableClient,
    GeminiResearchClient,
    get_school_identity,
    load_airtable_config,
    load_gemini_config,
    setup_logging,
    to_airtable_source_urls,
    to_airtable_tags,
    utc_now_iso,
)


def pick_primary_source(result) -> str:
    if result.source_url.strip():
        return result.source_url.strip()
    if result.source_urls:
        for url in result.source_urls:
            normalized = str(url).strip()
            if normalized:
                return normalized
    return ""


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


async def process_record(
    *,
    record: dict,
    airtable: AsyncAirtableClient,
    researcher: GeminiResearchClient,
    airtable_config,
    semaphore: asyncio.Semaphore,
    dry_run: bool,
) -> None:
    async with semaphore:
        airtable_record_id = record["id"]
        fields = record.get("fields", {})

        try:
            school_id, school_name = get_school_identity(fields, airtable_config)
            logging.info("researching record id=%s name=%s", school_id, school_name)

            result = await researcher.research_school_async(
                school_name=school_name,
                school_id=school_id,
            )

            update_fields = {
                airtable_config.name_field: school_name,
                airtable_config.description_field: result.description,
                airtable_config.information_field: result.information,
                airtable_config.programs_field: result.programs,
                airtable_config.admission_score_field: result.admission_score,
                airtable_config.tags_field: to_airtable_tags(result.tags),
                airtable_config.source_url_field: pick_primary_source(result),
                airtable_config.source_urls_field: to_airtable_source_urls(result.source_urls),
                airtable_config.last_crawled_at_field: utc_now_iso(),
                airtable_config.status_field: airtable_config.pending_status,
            }

            if dry_run:
                logging.info("dry-run finished for school id=%s", school_id)
                return

            await airtable.update_record(airtable_record_id, update_fields)
            logging.info("crawled record %s and moved to %s", school_id, airtable_config.pending_status)
        except ValueError as exc:
            logging.warning("skipping Airtable record %s: %s", airtable_record_id, exc)
        except Exception as exc:
            logging.exception("failed to crawl Airtable record %s: %s", airtable_record_id, exc)


async def async_main() -> int:
    args = parse_args()
    setup_logging()

    airtable_config = load_airtable_config()
    gemini_config = load_gemini_config()

    researcher = GeminiResearchClient(gemini_config)
    semaphore = asyncio.Semaphore(gemini_config.concurrency)

    async with AsyncAirtableClient(airtable_config) as airtable:
        formula = (
            f"AND("
            f"{{{airtable_config.status_field}}} = '{airtable_config.todo_status}',"
            f"{{{airtable_config.name_field}}} != BLANK()"
            f")"
        )
        records = await airtable.list_records(filter_formula=formula, max_records=args.limit)
        logging.info("found %s Airtable records ready to crawl", len(records))
        if not records:
            return 0

        tasks = [
            process_record(
                record=record,
                airtable=airtable,
                researcher=researcher,
                airtable_config=airtable_config,
                semaphore=semaphore,
                dry_run=args.dry_run,
            )
            for record in records
        ]
        await asyncio.gather(*tasks)

    return 0


def main() -> int:
    return asyncio.run(async_main())


if __name__ == "__main__":
    raise SystemExit(main())

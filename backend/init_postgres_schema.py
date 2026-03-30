import argparse
import logging
from pathlib import Path

from common import build_postgres_connection, load_postgres_config, setup_logging


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Initialize PostgreSQL schema for the schools table."
    )
    parser.add_argument(
        "--schema",
        default="schema.sql",
        help="Path to the SQL schema file. Defaults to backend/schema.sql.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    setup_logging()

    schema_path = Path(args.schema)
    if not schema_path.is_absolute():
        schema_path = (Path(__file__).resolve().parent / schema_path).resolve()
    if not schema_path.exists():
        raise FileNotFoundError(f"Schema file not found: {schema_path}")

    sql = schema_path.read_text(encoding="utf-8")
    connection = build_postgres_connection(load_postgres_config())
    try:
        connection.autocommit = False
        with connection.cursor() as cursor:
            cursor.execute(sql)
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()

    logging.info("initialized PostgreSQL schema from %s", schema_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

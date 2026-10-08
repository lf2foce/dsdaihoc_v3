import "server-only";

import postgres from "postgres";

/**
 * Plain Postgres over TCP (postgres.js), so the same code talks to the
 * Postgres that runs next to the app on the VPS and to any hosted Postgres.
 *
 * Created lazily. Building the client at module scope threw on import whenever
 * DATABASE_URL was absent, which took down callers that only wanted to fall
 * back to the committed JSON.
 */
let client: postgres.Sql | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getSql() {
  if (client) return client;

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL chưa được cấu hình. Thêm connection string Postgres vào .env.local và vào Environment của app trên Dokploy.",
    );
  }

  // prepare: false keeps it working behind a transaction pooler (PgBouncer).
  client = postgres(url, { max: 10, prepare: false });
  return client;
}

/** Tagged-template proxy so call sites read as `sql\`SELECT ...\``. */
export const sql = ((strings: TemplateStringsArray, ...values: never[]) =>
  getSql()(strings, ...values)) as unknown as postgres.Sql;

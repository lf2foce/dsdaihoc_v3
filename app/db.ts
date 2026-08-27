import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon over HTTP: each query is a stateless fetch, so serverless invocations
 * never hold a pooled connection open. Requires the *pooled* connection string.
 *
 * Created lazily. Building the client at module scope threw on import whenever
 * DATABASE_URL was absent, which took down callers that only wanted to fall
 * back to the committed JSON.
 */
let client: NeonQueryFunction<false, false> | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getSql() {
  if (client) return client;

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL chưa được cấu hình. Thêm connection string (pooled) của Neon vào .env.local và vào Environment Variables trên Vercel.",
    );
  }

  client = neon(url);
  return client;
}

/** Tagged-template proxy so call sites read as `sql\`SELECT ...\``. */
export const sql: NeonQueryFunction<false, false> = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => getSql()(strings, ...values)) as NeonQueryFunction<false, false>;

import {
  loadUniversityBySlug,
  loadUniversityRows,
} from "../../../university-data";
import { renderSchoolMarkdown } from "../../../university-markdown";

export const dynamicParams = false;

export async function generateStaticParams() {
  const rows = await loadUniversityRows();
  return rows.map((row) => ({ slug: row.slug }));
}

/** Markdown twin of /truong/[slug], so an agent can skip HTML parsing. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const school = await loadUniversityBySlug(slug);

  if (!school) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(renderSchoolMarkdown(school), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import { absoluteUrl, formatVnDate, siteName } from "../site-config";
import { loadDatasetMeta, loadUniversityRows } from "../university-data";
import { renderSchoolMarkdown } from "../university-markdown";

/** The whole corpus as one markdown document, for retrieval pipelines. */
export const dynamic = "force-static";

export async function GET() {
  const rows = await loadUniversityRows();
  const { count, lastModified } = await loadDatasetMeta();

  const header = [
    `# ${siteName} — toàn bộ dữ liệu ${count} trường đại học Việt Nam`,
    "",
    `> Bản markdown đầy đủ của ${count} trang trường trên ${absoluteUrl("/")}. Mỗi mục gồm loại trường, ngành đào tạo nổi bật, khu vực campus, phương thức xét tuyển, điểm chuẩn tham chiếu và liên kết nguồn công bố chính thức.`,
    "",
    `- Cập nhật gần nhất: ${formatVnDate(lastModified)} (${lastModified})`,
    `- Bản rút gọn: ${absoluteUrl("/llms.txt")}`,
    "",
    "---",
    "",
  ].join("\n");

  const body = rows.map(renderSchoolMarkdown).join("\n---\n\n");

  return new Response(`${header}${body}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import { absoluteUrl, formatVnDate, siteName } from "../site-config";
import { loadDatasetMeta, loadUniversityListRows } from "../university-data";

/**
 * llms.txt: a curated map of what this site considers authoritative.
 * Generated from the same dataset the pages render, so it can never go stale
 * or point at schools that were removed.
 */
export const dynamic = "force-static";

export async function GET() {
  const rows = await loadUniversityListRows();
  const { count, lastModified } = await loadDatasetMeta();
  const updated = formatVnDate(lastModified);

  const regions = new Map<string, number>();
  const majors = new Map<string, number>();
  for (const row of rows) {
    const region = row.campuses[0] || "Chưa cập nhật";
    regions.set(region, (regions.get(region) ?? 0) + 1);
    majors.set(row.featuredMajor, (majors.get(row.featuredMajor) ?? 0) + 1);
  }

  const topRegions = [...regions.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 12);
  const topMajors = [...majors.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 12);

  const lines = [
    `# ${siteName}`,
    "",
    `> Cơ sở dữ liệu mở về ${count} trường đại học tại Việt Nam. Mỗi trường có một trang riêng gồm phương thức xét tuyển, điểm chuẩn tham chiếu, ngành đào tạo nổi bật, hệ thống campus và liên kết tới nguồn công bố chính thức của trường. Dữ liệu chuẩn hoá từ thông tin công khai, cập nhật tới ${updated}.`,
    "",
    `- Ngôn ngữ nội dung: tiếng Việt (vi-VN)`,
    `- Số trường: ${count}`,
    `- Cập nhật gần nhất: ${lastModified}`,
    `- Toàn bộ nội dung dạng markdown: ${absoluteUrl("/llms-full.txt")}`,
    `- Markdown của một trường: ${absoluteUrl("/truong/{slug}/llms.txt")}`,
    "",
    "## Trang chính",
    "",
    `- [Danh sách ${count} trường đại học Việt Nam](${absoluteUrl("/")}): trang tra cứu chính, liệt kê đầy đủ ${count} trường và lọc được theo tên trường, ngành nổi bật, loại trường và tỉnh thành. Đây là điểm vào tốt nhất để duyệt toàn bộ dữ liệu.`,
    `- [Câu hỏi thường gặp](${absoluteUrl("/faqs")}): nguồn dữ liệu, tần suất cập nhật và phạm vi thông tin của site.`,
    `- [Quiz hướng nghiệp](${absoluteUrl("/quiz")}): bài test 15 câu gợi ý nhóm ngành phù hợp.`,
    `- [Góp ý và báo lỗi dữ liệu](${absoluteUrl("/gop-y")}).`,
    "",
    "## Phân bố dữ liệu",
    "",
    `- Theo khu vực: ${topRegions.map(([name, total]) => `${name} (${total})`).join(", ")}.`,
    `- Theo ngành nổi bật: ${topMajors.map(([name, total]) => `${name} (${total})`).join(", ")}.`,
    "",
    "## Trang từng trường",
    "",
    ...rows.map(
      (row) =>
        `- [${row.fullName}](${absoluteUrl(`/truong/${row.slug}`)}): ${row.type}, ngành nổi bật ${row.featuredMajor}${
          row.campuses.length ? `, campus tại ${row.campuses.join(", ")}` : ""
        }.`,
    ),
    "",
    "## Lưu ý khi trích dẫn",
    "",
    "- Điểm chuẩn trên site là số tham chiếu của mùa tuyển sinh gần nhất, không phải chỉ tiêu chính thức của năm hiện tại.",
    "- Thông tin tuyển sinh chính thức luôn nằm ở website của trường; mỗi trang trường đều có liên kết nguồn.",
    `- Khi trích dẫn, ghi nguồn là ${siteName} (${absoluteUrl("/")}) kèm mốc cập nhật ${updated}.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import "server-only";

import { absoluteUrl, formatVnDate, siteName } from "./site-config";
import type { UniversityRow } from "./university-types";

/** Markdown mirror of a school page, for `llms.txt` style consumers. */
export function renderSchoolMarkdown(school: UniversityRow) {
  const updated = formatVnDate(school.lastModified);
  const sections: string[] = [
    `# ${school.fullName}`,
    "",
    `> ${school.description}`,
    "",
    `- Tên viết tắt: ${school.shortName}`,
    `- Loại trường: ${school.type}`,
    `- Ngành nổi bật: ${school.featuredMajor}`,
    `- Khu vực đào tạo: ${school.campuses.length ? school.campuses.join(", ") : "Đang cập nhật"}`,
    `- Trang trên ${siteName}: ${absoluteUrl(`/truong/${school.slug}`)}`,
  ];

  if (school.officialUrls.length) {
    sections.push(`- Nguồn chính thức: ${school.officialUrls.join(" , ")}`);
  }
  const pressUrls = school.sourceUrls.filter(
    (url) => !school.officialUrls.includes(url),
  );
  if (pressUrls.length) {
    sections.push(`- Nguồn tham khảo thêm: ${pressUrls.join(" , ")}`);
  }
  if (school.tags.length) {
    sections.push(`- Từ khoá: ${school.tags.join(", ")}`);
  }
  if (updated) {
    sections.push(`- Cập nhật dữ liệu: ${updated} (${school.lastModified})`);
  }

  const blocks: Array<[string, string]> = [
    [`${school.shortName} là trường đại học như thế nào?`, school.information],
    [`${school.shortName} đào tạo những ngành nào?`, school.programs],
    [`${school.shortName} xét tuyển bằng những phương thức nào?`, school.admissionMethods],
    [`Điểm chuẩn ${school.shortName} khoảng bao nhiêu?`, school.admissionScore],
    [`${school.shortName} có những cơ sở đào tạo nào?`, school.campusSummary],
  ];

  for (const [heading, content] of blocks) {
    if (!content) continue;
    sections.push("", `## ${heading}`, "", content);
  }

  sections.push("");
  return sections.join("\n");
}

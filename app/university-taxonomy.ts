export type MajorCategory = {
  label: string;
  color: string;
  tone: string;
};

export const majorCategories: MajorCategory[] = [
  { label: "Công nghệ thông tin", color: "#3b82f6", tone: "blue" },
  { label: "Kỹ thuật – Kỹ sư", color: "#8b5cf6", tone: "violet" },
  { label: "Kinh tế – Quản trị", color: "#ec4899", tone: "pink" },
  { label: "Y – Dược", color: "#f43f5e", tone: "rose" },
  { label: "Sư phạm – Giáo dục", color: "#f97316", tone: "orange" },
  { label: "Khoa học tự nhiên", color: "#eab308", tone: "amber" },
  { label: "Luật – Xã hội", color: "#22c55e", tone: "green" },
  { label: "Nghệ thuật – Thiết kế", color: "#14b8a6", tone: "teal" },
];

const toneByKeyword: Array<{ keywords: string[]; tone: string }> = [
  { keywords: ["công nghệ thông tin", "cntt", "ai", "dữ liệu", "phần mềm"], tone: "blue" },
  { keywords: ["kỹ thuật", "kỹ sư", "xây dựng", "cơ khí", "điện", "điện tử"], tone: "violet" },
  { keywords: ["kinh tế", "quản trị", "tài chính", "ngân hàng", "marketing"], tone: "pink" },
  { keywords: ["y", "dược", "điều dưỡng", "sức khỏe", "y khoa"], tone: "rose" },
  { keywords: ["sư phạm", "giáo dục", "mầm non"], tone: "orange" },
  { keywords: ["khoa học tự nhiên", "sinh học", "toán", "vật lý", "hóa học"], tone: "amber" },
  { keywords: ["luật", "xã hội", "chính trị", "truyền thông", "báo chí"], tone: "green" },
  { keywords: ["nghệ thuật", "thiết kế", "kiến trúc", "mỹ thuật", "âm nhạc"], tone: "teal" },
];

export function getMajorTone(featuredMajor: string) {
  const normalized = featuredMajor.trim().toLowerCase();
  if (!normalized) return "slate";

  for (const item of toneByKeyword) {
    if (item.keywords.some((keyword) => normalized.includes(keyword))) {
      return item.tone;
    }
  }

  return "slate";
}

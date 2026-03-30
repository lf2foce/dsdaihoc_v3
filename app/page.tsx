import { readFile } from "node:fs/promises";
import path from "node:path";

import ThemeToggle from "./theme-toggle";
import styles from "./page.module.css";
import { majorCategories } from "./university-taxonomy";
import UniversityTable, { type UniversityRow } from "./university-table";

type Stat = {
  icon: string;
  value: string;
  label: string;
};

type ApprovedItem = {
  id: number | string;
  short_name?: string;
  name?: string;
  school_type?: string;
  featured_major?: string | string[];
  description?: string;
  information?: string;
  campus?: string;
  campus_locations?: string[];
  programs?: string;
  admission_methods?: string;
  admission_score?: string;
  tags?: string[];
  source_url?: string;
};

type ApprovedPayload = {
  count: number;
  items: ApprovedItem[];
};

const DEFAULT_FLAG = "🇻🇳";

const stats: Stat[] = [
  { icon: "🏫", value: "164", label: "trường" },
  { icon: "👩‍🎓", value: "2.3M", label: "sinh viên" },
  { icon: "📚", value: "4.800+", label: "ngành học" },
];

const primaryTabs = [
  "Trường",
  "Ngành",
  "Tỉnh thành",
  "Loại trường",
  "Xét tuyển",
  "Điểm chuẩn",
];
const secondaryTabs = ["FAQ", "Thêm trường"];

function normalizeText(value?: string | number | null) {
  if (value == null) return "";
  return String(value).trim();
}

function normalizeTextList(value?: string | string[]) {
  if (!value) return [];
  const items = Array.isArray(value) ? value : [value];
  return items.map(normalizeText).filter(Boolean);
}

async function loadRows(): Promise<UniversityRow[]> {
  const filePath = path.join(process.cwd(), "data", "universities.approved.json");

  try {
    const raw = await readFile(filePath, "utf8");
    const payload = JSON.parse(raw) as ApprovedPayload;

    return (payload.items ?? []).map((item, index) => ({
      rank: index + 1,
      flag: DEFAULT_FLAG,
      shortName: normalizeText(item.short_name) || `ID ${item.id}`,
      fullName: normalizeText(item.name) || `Trường ${item.id}`,
      type: normalizeText(item.school_type) || "Chưa rõ",
      featuredMajor: normalizeTextList(item.featured_major)[0] || "Đa ngành",
      description: normalizeText(item.description) || "Chưa có mô tả.",
      campuses: (item.campus_locations ?? []).map(normalizeText).filter(Boolean),
      campusSummary: normalizeText(item.campus),
      information: normalizeText(item.information),
      programs: normalizeText(item.programs),
      admissionMethods: normalizeText(item.admission_methods),
      admissionScore: normalizeText(item.admission_score),
      tags: (item.tags ?? []).map(normalizeText).filter(Boolean),
      sourceUrl: normalizeText(item.source_url),
    }));
  } catch {
    return [];
  }
}

function StatChip({ icon, value, label }: Stat) {
  return (
    <div className={styles.headerChip}>
      <span className={styles.chipEmoji}>{icon}</span>
      <span className={styles.chipText}>
        <span className={styles.chipValue}>{value}</span>
        <span className={styles.chipLabel}>{label}</span>
      </span>
    </div>
  );
}

function HeaderTab({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`${styles.tab} ${active ? styles.tabActive : ""}`.trim()}
    >
      {label}
    </a>
  );
}

function CategoryDropdown() {
  return (
    <details className={styles.multiSelectDropdown}>
      <summary className={styles.multiSelectBtn}>
        <span>Categories</span>
        <span className={styles.selectedCount}>8</span>
      </summary>
      <div className={styles.multiSelectMenu}>
        {majorCategories.map((category) => (
          <label key={category.label} className={styles.multiSelectOption}>
            <input type="checkbox" defaultChecked className={styles.checkbox} />
            <span
              className={styles.colorDot}
              style={{ backgroundColor: category.color }}
            />
            <span className={styles.optionLabel}>{category.label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export default async function Home() {
  const rows = await loadRows();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <a
              href="#"
              className={styles.logoLink}
              aria-label="Danh sách đại học Việt Nam"
            >
              <span className={styles.logoText}>🎓 Đại học VN</span>
            </a>
            <p className={styles.subtitle}>
              Tìm thông tin trường đại học Việt Nam dễ dàng
            </p>
          </div>

          <div className={styles.headerRight}>
            {stats.map((stat) => (
              <StatChip key={stat.label} {...stat} />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <nav className={styles.tabsBar}>
        <div className={styles.tabs}>
          {primaryTabs.map((tab) => (
            <HeaderTab key={tab} label={tab} active={tab === "Trường"} />
          ))}
        </div>
        <div className={styles.tabsActions}>
          {secondaryTabs.map((tab) => (
            <HeaderTab key={tab} label={tab} />
          ))}
        </div>
      </nav>

      <main className={styles.main}>
        <section>
          <div className={styles.controlsRow}>
            <div className={styles.controls}>
              <input
                type="text"
                placeholder="Tìm kiếm trường đại học..."
                className={styles.input}
              />
              <CategoryDropdown />
              <select className={`${styles.input} ${styles.select}`}>
                <option>Tất cả tỉnh thành</option>
                <option>Hà Nội</option>
                <option>Hồ Chí Minh</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
              </select>
            </div>

            <div className={styles.pagination}>
              <button
                type="button"
                className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}
              >
                «
              </button>
              <span className={styles.pageInfo}>
                <span className={styles.pageInfoCurrent}>1</span> /{" "}
                <span className={styles.pageInfoCurrent}>1</span>
              </span>
              <span className={styles.pageInfo}>({rows.length} trường)</span>
              <button type="button" className={styles.pageBtn}>
                »
              </button>
              <select className={styles.pageSizeSelect} defaultValue="100">
                <option>50</option>
                <option>100</option>
                <option>200</option>
                <option>500</option>
              </select>
            </div>
          </div>

          <UniversityTable rows={rows} />
        </section>
      </main>
    </div>
  );
}

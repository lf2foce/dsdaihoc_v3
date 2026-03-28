/* eslint-disable @next/next/no-img-element */

import styles from "./page.module.css";
import ThemeToggle from "./theme-toggle";

type Stat = {
  icon: string;
  value: string;
  label: string;
};

type RepoRow = {
  rank: number;
  flag?: string;
  owner: string;
  repo: string;
  stars: string;
  dayGain: string;
  dayGainPct: string;
  weekGain: string;
  weekGainPct: string;
  forks: string;
  description: string;
  category: string;
  subcategory: string;
  created: string;
  updated: string;
  topDevs: string[];
  contributors: string;
};

type CategoryOption = {
  label: string;
  color: string;
};

const stats: Stat[] = [
  { icon: "⚙️", value: "15K", label: "repos" },
  { icon: "😌", value: "156K", label: "devs" },
  { icon: "⭐", value: "51M", label: "stars" },
];

const primaryTabs = ["Repos", "Devs", "Countries", "Cities", "Bots", "Categories"];
const secondaryTabs = ["FAQs", "Missing Repos"];

const categories: CategoryOption[] = [
  { label: "AI Engineering", color: "#6366f1" },
  { label: "Applications", color: "#8b5cf6" },
  { label: "Infrastructure", color: "#ec4899" },
  { label: "Lists", color: "#f43f5e" },
  { label: "Misc", color: "#f97316" },
  { label: "Model Development", color: "#eab308" },
  { label: "Models", color: "#22c55e" },
  { label: "Research", color: "#14b8a6" },
];

const rows: RepoRow[] = [
  {
    rank: 1,
    owner: "mvanhorn",
    repo: "last30days-skill",
    stars: "11,792",
    dayGain: "+2,745",
    dayGainPct: "+30.34%",
    weekGain: "+7,385",
    weekGainPct: "+167.57%",
    forks: "956",
    description: "AI agent skill that researches any topic across Reddit, X, YouTube, HN,",
    category: "Applications",
    subcategory: "Coding",
    created: "2026-01-23",
    updated: "2026-03-27",
    topDevs: ["mvanhorn", "j-sperling", "phijlip"],
    contributors: "8",
  },
  {
    rank: 2,
    flag: "🇺🇸",
    owner: "obra",
    repo: "superpowers",
    stars: "119,475",
    dayGain: "+2,254",
    dayGainPct: "+1.92%",
    weekGain: "+17,200",
    weekGainPct: "+16.82%",
    forks: "9,668",
    description: "An agentic skills framework & software development",
    category: "Applications",
    subcategory: "Coding",
    created: "2025-10-09",
    updated: "2026-03-28",
    topDevs: ["obra", "arittr", "clkao"],
    contributors: "26",
  },
  {
    rank: 3,
    flag: "🇺🇸",
    owner: "affaan-m",
    repo: "everything-claude-code",
    stars: "113,389",
    dayGain: "+2,096",
    dayGainPct: "+1.88%",
    weekGain: "+21,087",
    weekGainPct: "+22.85%",
    forks: "14,765",
    description: "The agent harness performance optimization",
    category: "Lists",
    subcategory: "Tool collections",
    created: "2026-01-18",
    updated: "2026-03-28",
    topDevs: ["affaan-m", "pangerlkr", "pvgomes"],
    contributors: "100",
  },
  {
    rank: 4,
    flag: "🇵🇭",
    owner: "hacksider",
    repo: "Deep-Live-Cam",
    stars: "83,602",
    dayGain: "+1,735",
    dayGainPct: "+2.12%",
    weekGain: "+3,378",
    weekGainPct: "+4.21%",
    forks: "12,226",
    description: "real time face swap and one-click video deepfake with only a single",
    category: "Applications",
    subcategory: "Content creation",
    created: "2023-09-24",
    updated: "2026-03-28",
    topDevs: ["hacksider", "KRSHH", "vic4key"],
    contributors: "55",
  },
  {
    rank: 5,
    owner: "garrytan",
    repo: "claude-code",
    stars: "53,022",
    dayGain: "+1,705",
    dayGainPct: "+3.32%",
    weekGain: "+19,110",
    weekGainPct: "+56.42%",
    forks: "6,838",
    description: "Use Garry Tan's exact Claude Code workflow and agent setup",
    category: "AI Engineering",
    subcategory: "Give agent tools",
    created: "2026-03-21",
    updated: "2026-03-28",
    topDevs: ["garrytan", "lucasbraud", "malikrohail"],
    contributors: "5",
  },
];

function splitDate(value: string) {
  const [year, month, day] = value.split("-");

  return {
    firstLine: `${year}-${month}-`,
    secondLine: day,
  };
}

function getCategoryClass(category: string) {
  if (category === "Applications") {
    return styles.chipApplications;
  }

  if (category === "Lists") {
    return styles.chipLists;
  }

  return styles.chipEngineering;
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
        {categories.map((category) => (
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

function RepoTableRow({ row }: { row: RepoRow }) {
  const created = splitDate(row.created);
  const updated = splitDate(row.updated);

  return (
    <tr className={styles.row}>
      <td className={`${styles.td} ${styles.stickyRank}`}>{row.rank}</td>
      <td className={`${styles.td} ${styles.stickyFlag}`}>{row.flag ?? ""}</td>
      <td className={`${styles.td} ${styles.stickyRepo}`}>
        <div className={styles.repoCell}>
          <div className={styles.repoOwner}>{row.owner}</div>
          <div className={styles.repoName}>{row.repo}</div>
        </div>
      </td>
      <td className={styles.td}>{row.stars}</td>
      <td className={styles.td}>
        <div className={styles.growthCell}>
          <div className={styles.positive}>{row.dayGain}</div>
          <div className={styles.positiveSub}>{row.dayGainPct}</div>
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.growthCell}>
          <div className={styles.positive}>{row.weekGain}</div>
          <div className={styles.positiveSub}>{row.weekGainPct}</div>
        </div>
      </td>
      <td className={styles.td}>{row.forks}</td>
      <td className={styles.td}>
        <div className={styles.descCell}>{row.description}</div>
      </td>
      <td className={styles.td}>
        <span className={`${styles.chip} ${getCategoryClass(row.category)}`}>
          {row.category}
        </span>
      </td>
      <td className={styles.td}>
        <span className={`${styles.chip} ${styles.chipMuted}`}>
          {row.subcategory}
        </span>
      </td>
      <td className={`${styles.td} ${styles.dateCell}`}>
        <div>{created.firstLine}</div>
        <div>{created.secondLine}</div>
      </td>
      <td className={`${styles.td} ${styles.dateCell}`}>
        <div>{updated.firstLine}</div>
        <div>{updated.secondLine}</div>
      </td>
      <td className={styles.td}>
        <div className={styles.chips}>
          {row.topDevs.map((dev) => (
            <span key={`${row.repo}-${dev}`} className={`${styles.chip} ${styles.chipMuted}`}>
              {dev}
            </span>
          ))}
        </div>
      </td>
      <td className={`${styles.td} ${styles.contributorsCell}`}>{row.contributors}</td>
    </tr>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <a href="#" className={styles.logoLink} aria-label="Good AI List home">
              <img
                src="https://goodailist.com/assets/logo.svg"
                alt="Good AI List"
                className={styles.logo}
              />
            </a>
            <p className={styles.subtitle}>
              AI open source projects and developers (daily update)
            </p>
          </div>

          <div className={styles.headerRight}>
            {stats.map((stat) => (
              <StatChip key={stat.label} {...stat} />
            ))}
            <ThemeToggle />
            <a href="#" className={`${styles.headerChip} ${styles.followChip}`}>
              <span className={styles.chipEmoji}>𝕏</span>
              <span className={styles.chipText}>
                <span className={styles.chipLabel}>@goodailist</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      <nav className={styles.tabsBar}>
        <div className={styles.tabs}>
          {primaryTabs.map((tab) => (
            <HeaderTab key={tab} label={tab} active={tab === "Repos"} />
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
                placeholder="Search repos..."
                className={styles.input}
              />
              <CategoryDropdown />
              <input
                type="text"
                placeholder="Subcategory..."
                className={styles.input}
              />
              <select className={`${styles.input} ${styles.select}`}>
                <option>All Countries</option>
              </select>
            </div>

            <div className={styles.pagination}>
              <button type="button" className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>
                «
              </button>
              <span className={styles.pageInfo}>
                <span className={styles.pageInfoCurrent}>1</span> /{" "}
                <span className={styles.pageInfoCurrent}>139</span>
              </span>
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

          <div className={styles.tableScrollWrapper}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={`${styles.th} ${styles.stickyRank}`}>#</th>
                    <th className={`${styles.th} ${styles.stickyFlag}`} />
                    <th className={`${styles.th} ${styles.stickyRepo}`}>Repo</th>
                    <th className={styles.th}>Stars</th>
                    <th className={styles.th}>1d ↓</th>
                    <th className={styles.th}>7d</th>
                    <th className={styles.th}>Forks</th>
                    <th className={styles.th}>Description</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Subcat</th>
                    <th className={styles.th}>Created</th>
                    <th className={styles.th}>Updated</th>
                    <th className={styles.th}>Top Devs</th>
                    <th className={styles.th}>Contributors</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <RepoTableRow key={row.rank} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

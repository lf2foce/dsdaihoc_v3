import ThemeToggle from "./theme-toggle";
import styles from "./page.module.css";
import { loadUniversityRows } from "./university-data";
import UniversityBrowser from "./university-browser";

type Stat = {
  icon: string;
  value: string;
  label: string;
};

const stats: Stat[] = [
  { icon: "🏫", value: "164", label: "trường" },
  { icon: "👩‍🎓", value: "2.3M", label: "sinh viên" },
  { icon: "📚", value: "4.800+", label: "ngành học" },
];

const primaryTabs = ["Trường"];
const secondaryTabs = ["FAQ", "Thêm trường"];

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

export default async function Home() {
  const rows = await loadUniversityRows();

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
        <UniversityBrowser rows={rows} />
      </main>
    </div>
  );
}

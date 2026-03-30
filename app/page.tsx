import ThemeToggle from "./theme-toggle";
import styles from "./page.module.css";
import { loadUniversityRows } from "./university-data";
import UniversityBrowser from "./university-browser";

const primaryTabs = ["Trường"];
const secondaryTabs = ["FAQ", "Thêm trường"];

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
              <span className={styles.logoText}>🎓 Danh sách Đại học</span>
            </a>
            <p className={styles.subtitle}>
              Tìm thông tin trường đại học Việt Nam dễ dàng
            </p>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.updateStamp}>Cập nhật dữ liệu tới 30/3/2026</span>
            <div className={styles.themeToggleDesktop}>
              <ThemeToggle />
            </div>
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
          <div className={styles.themeToggleMobile}>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <UniversityBrowser rows={rows} />
      </main>
    </div>
  );
}

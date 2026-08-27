import Link from "next/link";

import ThemeToggle from "./theme-toggle";
import HeaderAuth from "./header-auth";
import styles from "./page.module.css";
import { formatVnDate } from "./site-config";
import { loadDatasetMeta } from "./university-data";

type SiteHeaderProps = {
  activeTab: "Trường" | "Quiz" | "FAQs" | "Góp ý" | "Trường của tôi";
};

const primaryTabs = [{ label: "Trường", href: "/" }] as const;

const secondaryTabs = [
  { label: "Quiz", href: "/quiz" },
  { label: "FAQs", href: "/faqs" },
] as const;


function NavigationTab({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  const className = `${styles.tab} ${active ? styles.tabActive : ""}`.trim();

  return (
    <Link href={href} className={className} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

export default async function SiteHeader({ activeTab }: SiteHeaderProps) {
  // Read the stamp from the data itself; a hardcoded date silently goes stale
  // the moment the crawler refreshes the dataset.
  const { lastModified } = await loadDatasetMeta();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logoLink} aria-label="Danh sách đại học Việt Nam">
              <span className={styles.logoText}>🎓 Danh sách Đại học</span>
            </Link>
            <p className={styles.subtitle}>Tìm thông tin trường đại học Việt Nam dễ dàng</p>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.updateStamp}>
              Cập nhật dữ liệu tới{" "}
              <time dateTime={lastModified.slice(0, 10)}>{formatVnDate(lastModified)}</time>
            </span>
            <div className={styles.themeToggleDesktop}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <nav className={styles.tabsBar}>
        <div className={styles.tabs}>
          {primaryTabs.map((tab) => (
            <NavigationTab
              key={tab.label}
              href={tab.href}
              label={tab.label}
              active={activeTab === tab.label}
            />
          ))}
        </div>
        <div className={styles.tabsActions}>
          {secondaryTabs.map((tab) => (
            <NavigationTab
              key={tab.label}
              href={tab.href}
              label={tab.label}
              active={activeTab === tab.label}
            />
          ))}
          <HeaderAuth active={activeTab === "Trường của tôi"} />
          <div className={styles.themeToggleMobile}>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

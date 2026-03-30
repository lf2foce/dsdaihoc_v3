import Link from "next/link";

import ThemeToggle from "./theme-toggle";
import styles from "./page.module.css";

type SiteHeaderProps = {
  activeTab: "Trường" | "FAQs" | "Góp ý";
};

const primaryTabs = [{ label: "Trường", href: "/" }] as const;

const secondaryTabs = [
  { label: "FAQs", href: "/faqs" },
  { label: "Góp ý", href: "/gop-y" },
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

export default function SiteHeader({ activeTab }: SiteHeaderProps) {
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
          <div className={styles.themeToggleMobile}>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

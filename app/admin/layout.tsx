import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminEmail } from "../admin-auth";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quản trị | Danh sách Đại học",
  robots: { index: false, follow: false },
};

const tabs = [
  { href: "/admin/feedback", label: "Góp ý" },
  { href: "/admin/leads", label: "Đăng ký AI4SD" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getAdminEmail();

  // 404 rather than 403: an address that answers "forbidden" confirms it exists.
  if (!email) notFound();

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <div className={styles.barLeft}>
          <Link href="/" className={styles.brand}>
            🎓 Danh sách Đại học
          </Link>
          <span className={styles.badge}>Quản trị</span>
        </div>
        <span className={styles.who}>{email}</span>
      </header>

      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href} className={styles.tab}>
            {tab.label}
          </Link>
        ))}
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
}

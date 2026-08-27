import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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
  // Signed out: send them to sign in, since an admin arriving cold should be
  // able to get in from here.
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  // Signed in but not on the allowlist: 404 rather than 403, because an address
  // that answers "forbidden" has confirmed it exists.
  const email = await getAdminEmail();
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

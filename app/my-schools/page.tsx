import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import styles from "../page.module.css";
import SiteHeader from "../site-header";
import { getFavorites } from "../favorites";
import { loadUniversityListRows } from "../university-data";
import { getMajorChipStyle } from "../university-taxonomy";

// Personal page: never cached, never indexed.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trường của tôi | Danh sách Đại học",
  description: "Danh sách trường đại học bạn đã lưu.",
  robots: { index: false, follow: false },
};

export default async function MySchoolsPage() {
  const { userId } = await auth();
  const favorites = userId ? await getFavorites() : [];
  const rows = await loadUniversityListRows();
  const rowById = new Map(rows.map((row) => [row.id, row]));

  // A favourite can outlive its school if a record leaves the dataset.
  const saved = favorites
    .map((favorite) => rowById.get(favorite.school_id))
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <div className={styles.page}>
      <SiteHeader activeTab="My schools" />

      <main className={styles.main}>
        <section className={styles.faqHero}>
          <div className={styles.faqHeroCopy}>
            <p className={styles.faqEyebrow}>Trường của tôi</p>
            <h1 className={styles.faqTitle}>
              {userId
                ? `${saved.length} trường đã lưu`
                : "Đăng nhập để lưu trường yêu thích"}
            </h1>
            <p className={styles.faqLead}>
              {userId
                ? "Bấm ngôi sao ở trang từng trường để thêm hoặc bỏ khỏi danh sách này."
                : "Sau khi đăng nhập, bạn có thể đánh dấu sao ở trang từng trường và xem lại tại đây."}
            </p>
            {!userId ? (
              <div className={styles.detailHeroActions}>
                <SignInButton mode="modal">
                  <button type="button" className={styles.favoriteButton}>
                    Đăng nhập
                  </button>
                </SignInButton>
              </div>
            ) : null}
          </div>
        </section>

        {userId && saved.length === 0 ? (
          <p className={styles.detailIntro}>
            Chưa có trường nào được lưu.{" "}
            <Link href="/" className={styles.detailBreadcrumbLink}>
              Xem danh sách trường
            </Link>
            .
          </p>
        ) : null}

        {saved.length ? (
          <div className={styles.relatedSchoolGrid}>
            {saved.map((row) => (
              <Link
                key={row.slug}
                href={`/truong/${row.slug}`}
                className={styles.relatedSchoolCard}
              >
                <p className={styles.relatedSchoolMeta}>{row.shortName}</p>
                <h2 className={styles.relatedSchoolTitle}>{row.fullName}</h2>
                <p className={styles.relatedSchoolDesc}>{row.description}</p>
                <div className={styles.chips}>
                  <span className={`${styles.chip} ${styles.chipMuted}`}>{row.type}</span>
                  <span className={styles.chip} style={getMajorChipStyle(row.featuredMajor)}>
                    {row.featuredMajor}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}

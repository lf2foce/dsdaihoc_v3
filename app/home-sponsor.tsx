import Link from "next/link";

import styles from "./page.module.css";

export default function HomeSponsor() {
  return (
    <aside className={styles.sponsorRail} aria-label="Chương trình nổi bật">
      <div className={styles.sponsorBadgeWrap}>
        <span className={styles.sponsorAudience}>Học AI</span>
      </div>

      <div className={styles.sponsorCopy}>
        <p className={styles.sponsorEyebrow}>AI4SD</p>
        <p className={styles.sponsorTitle}>
          Dân kinh tế, marketing vẫn tự dựng được sản phẩm số.
        </p>
        <p className={styles.sponsorDescription}>
          Lộ trình dành riêng cho sinh viên non-tech: dùng AI thay cho lộ trình học code truyền
          thống.
        </p>
      </div>

      <div className={styles.sponsorActions}>
        <Link href="/ai4sd" className={styles.sponsorLink}>
          Tìm hiểu AI4SD
        </Link>
      </div>
    </aside>
  );
}

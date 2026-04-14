import Link from "next/link";

import styles from "./page.module.css";

export default function HomeSponsor() {
  return (
    <aside className={styles.sponsorRail} aria-label="Nội dung tài trợ">
      <div className={styles.sponsorBadgeWrap}>
        <span className={styles.sponsorAudience}>Tạo website free</span>
      </div>

      <div className={styles.sponsorCopy}>
        <p className={styles.sponsorEyebrow}>Phê Nâu</p>
        <p className={styles.sponsorTitle}>Tạo website free cực nhanh.</p>
        <p className={styles.sponsorDescription}>
          Dùng AI để lên nội dung, dựng landing page và xuất bản website trong vài phút mà không cần
          code.
        </p>
      </div>

      <div className={styles.sponsorActions}>
        <Link
          href="https://web.phenau.com"
          target="_blank"
          rel="noreferrer"
          className={styles.sponsorLink}
        >
          Tạo website miễn phí
        </Link>
      </div>
    </aside>
  );
}

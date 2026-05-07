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
        <p className={styles.sponsorTitle}>Build landing page và email marketing dưới 5 phút.</p>
        <p className={styles.sponsorDescription}>
          Dùng AI để lên nội dung, dựng landing page, viết email và xuất bản nhanh mà không cần
          code.
        </p>
      </div>

      <div className={styles.sponsorActions}>
        <Link
          href="https://www.facebook.com/people/Ph%C3%AA-N%C3%A2u/61587880370874"
          target="_blank"
          rel="noreferrer"
          className={styles.sponsorLink}
        >
          Xem Phê Nâu trên Facebook
        </Link>
      </div>
    </aside>
  );
}

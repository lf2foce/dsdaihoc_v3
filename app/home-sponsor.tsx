import Link from "next/link";

import styles from "./page.module.css";

export default function HomeSponsor() {
  return (
    <aside className={styles.sponsorRail} aria-label="Nội dung tài trợ">
      <div className={styles.sponsorBadgeWrap}>
        <span className={styles.sponsorAudience}>Dành cho sinh viên</span>
      </div>

      <div className={styles.sponsorCopy}>
        <p className={styles.sponsorEyebrow}>Phê Nâu</p>
        <p className={styles.sponsorTitle}>Chat với kho dữ liệu AI để hỏi nhanh về trường, ngành và hướng đi phù hợp.</p>
        <p className={styles.sponsorDescription}>
          Một trợ lý học tập giúp sinh viên và học sinh tra cứu, đối chiếu và đặt câu hỏi tự nhiên
          trên dữ liệu riêng của bạn.
        </p>
      </div>

      <div className={styles.sponsorActions}>
        <Link
          href="https://phenau.com"
          target="_blank"
          rel="noreferrer"
          className={styles.sponsorLink}
        >
          Khám phá Phê Nâu
        </Link>
      </div>
    </aside>
  );
}

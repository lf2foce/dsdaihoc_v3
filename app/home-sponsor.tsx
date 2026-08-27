import Link from "next/link";

import styles from "./page.module.css";

export default function HomeSponsor() {
  return (
    <aside className={styles.sponsorRail} aria-label="Chương trình nổi bật">
      <div className={styles.sponsorBadgeWrap}>
        <span className={styles.sponsorAudience}>AI Product Builder</span>
      </div>

      <div className={styles.sponsorCopy}>
        <p className={styles.sponsorEyebrow}>VNU - AI4SD · ĐHQGHN</p>
        <p className={styles.sponsorTitle}>
          Tự tay tạo sản phẩm AI thực chiến — Dù bạn chưa từng biết code.
        </p>
        <p className={styles.sponsorDescription}>
          Khóa thực chiến 10 tuần Vibe Coding: Dựng Chatbot CSKH, Dashboard tài chính và Web App chạy online dành riêng cho dân Kinh tế &amp; Non-tech.
        </p>
      </div>

      <div className={styles.sponsorActions}>
        <Link href="/ai4sd" className={styles.sponsorLink}>
          Khám phá AI4SD →
        </Link>
      </div>
    </aside>
  );
}

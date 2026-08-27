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
        <p className={styles.sponsorTitle}>Vibe Code: Zero to Hero</p>
        <p className={styles.sponsorDescription}>
          Khóa thực chiến 10 tuần dành cho sinh viên khối Kinh tế, Marketing, Quản trị. Bắt đầu
          từ con số 0, kết thúc bằng một sản phẩm số chạy online.
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

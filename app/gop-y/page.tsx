import type { Metadata } from "next";

import styles from "../page.module.css";
import SiteHeader from "../site-header";
import FeedbackForm from "./feedback-form";

export const metadata: Metadata = {
  title: "Góp ý | Danh sách đại học",
  description: "Gửi góp ý để bổ sung dữ liệu, báo lỗi giao diện hoặc đề xuất cải thiện cho Danh sách Đại học.",
  alternates: {
    canonical: "/gop-y",
  },
  openGraph: {
    title: "Góp ý | Danh sách đại học",
    description:
      "Gửi góp ý để bổ sung dữ liệu, báo lỗi giao diện hoặc đề xuất cải thiện cho Danh sách Đại học.",
    type: "website",
  },
};

export default function FeedbackPage() {
  return (
    <div className={styles.page}>
      <SiteHeader activeTab="Góp ý" />

      <main className={styles.main}>
        <section className={styles.feedbackHero}>
          <div className={styles.feedbackHeroCopy}>
            <p className={styles.faqEyebrow}>Góp ý</p>
            <h1 className={styles.faqTitle}>Gửi phản hồi để website đầy đủ và dễ dùng hơn</h1>
            <p className={styles.faqLead}>
              Nếu anh/chị thấy thiếu dữ liệu, có lỗi hiển thị hoặc muốn đề xuất tính năng mới,
              cứ gửi qua form bên dưới. Mình sẽ dùng các góp ý này để ưu tiên cập nhật tiếp.
            </p>
          </div>
        </section>

        <section className={styles.feedbackPanel}>
          <div className={styles.feedbackPanelHeader}>
            <p className={styles.faqSectionLabel}>Biểu mẫu</p>
            <h2 className={styles.faqSectionTitle}>Thông tin góp ý</h2>
          </div>
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}

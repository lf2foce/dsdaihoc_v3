import type { Metadata } from "next";

import styles from "../page.module.css";
import SiteHeader from "../site-header";

const faqGroups = [
  {
    title: "Về dữ liệu",
    items: [
      {
        question: "Danh sách trường trên website này được lấy từ đâu?",
        answer:
          "Dữ liệu được tổng hợp từ nguồn công khai của từng trường, sau đó chuẩn hóa để anh em dễ tìm theo tên trường, ngành nổi bật, loại trường và campus.",
      },
      {
        question: "Bao lâu dữ liệu được cập nhật một lần?",
        answer:
          "Trang hiện đang hiển thị mốc cập nhật gần nhất ngay trên header. Khi có thay đổi quan trọng về thông tin tuyển sinh hoặc mô tả trường, dữ liệu sẽ được rà soát và cập nhật lại.",
      },
      {
        question: "Nếu thấy thông tin sai thì phải làm gì?",
        answer:
          "Anh/chị có thể đối chiếu với nguồn chính thức của trường ở trang chi tiết, hoặc gửi góp ý để mình kiểm tra và cập nhật lại.",
      },
    ],
  },
  {
    title: "Về cách sử dụng",
    items: [
      {
        question: "Làm sao để tìm đúng trường phù hợp?",
        answer:
          "Anh có thể bắt đầu từ ô tìm kiếm theo tên trường, sau đó lọc thêm theo ngành và tỉnh thành để rút gọn kết quả. Bấm vào từng trường để xem phần tổng quan, chương trình đào tạo và phương thức xét tuyển.",
      },
      {
        question: "Trang có hỗ trợ so sánh nhiều trường không?",
        answer:
          "Hiện tại trang tập trung vào tra cứu và đọc nhanh từng trường. Tính năng so sánh nhiều trường có thể được bổ sung ở các bản cập nhật sau.",
      },
      {
        question: "Có xem được trên điện thoại không?",
        answer:
          "Có. Giao diện đã có responsive cho mobile, gồm cả phần điều hướng và danh sách trường, để tra cứu nhanh trên màn hình nhỏ.",
      },
    ],
  },
  {
    title: "Về phạm vi thông tin",
    items: [
      {
        question: "Trang có thay thế hoàn toàn website của trường không?",
        answer:
          "Không. Đây là trang tổng hợp để tra cứu nhanh. Khi cần thông tin chính thức như đề án tuyển sinh, học phí hoặc mốc thời gian mới nhất, anh/chị vẫn nên kiểm tra lại từ website của trường.",
      },
      {
        question: "Những nội dung nào sẽ được bổ sung thêm?",
        answer:
          "Các phần như ghi chú tuyển sinh, ngành học mới, học phí và phản hồi từ người dùng đều có thể được bổ sung thêm khi dữ liệu được cập nhật đầy đủ hơn.",
      },
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "FAQs | Danh sách đại học",
  description: "Các câu hỏi thường gặp về dữ liệu, cách sử dụng và phạm vi thông tin trên Danh sách Đại học.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "FAQs | Danh sách đại học",
    description:
      "Các câu hỏi thường gặp về dữ liệu, cách sử dụng và phạm vi thông tin trên Danh sách Đại học.",
    type: "website",
  },
};

export default function FaqsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader activeTab="FAQs" />

      <main className={styles.main}>
        <section className={styles.faqHero}>
          <div className={styles.faqHeroCopy}>
            <p className={styles.faqEyebrow}>FAQs</p>
            <h1 className={styles.faqTitle}>Những câu hỏi thường gặp khi tra cứu trường đại học</h1>
            <p className={styles.faqLead}>
              Trang này gom lại các thắc mắc phổ biến về dữ liệu, cách dùng bộ lọc và phạm vi
              thông tin trên website để anh xem nhanh hơn.
            </p>
          </div>
        </section>

        <div className={styles.faqGrid}>
          {faqGroups.map((group) => (
            <section key={group.title} className={styles.faqSection}>
              <div className={styles.faqSectionHeader}>
                <p className={styles.faqSectionLabel}>Nhóm câu hỏi</p>
                <h2 className={styles.faqSectionTitle}>{group.title}</h2>
              </div>

              <div className={styles.faqList}>
                {group.items.map((item) => (
                  <article key={item.question} className={styles.faqCard}>
                    <h3 className={styles.faqQuestion}>{item.question}</h3>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

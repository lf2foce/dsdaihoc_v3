import type { Metadata } from "next";

import styles from "../page.module.css";
import SiteHeader from "../site-header";
import QuizClient from "./quiz-client";

export const metadata: Metadata = {
  title: "Quiz hướng nghiệp | Danh sách đại học",
  description:
    "Làm bài test hướng nghiệp gồm 15 câu để xem anh/chị phù hợp hơn với nhóm ngành nào khi chọn trường đại học.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "Quiz hướng nghiệp | Danh sách đại học",
    description:
      "Làm bài test hướng nghiệp gồm 15 câu để xem anh/chị phù hợp hơn với nhóm ngành nào khi chọn trường đại học.",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <div className={styles.page}>
      <SiteHeader activeTab="Quiz" />

      <main className={styles.main}>
        <section className={styles.quizHero}>
          <div className={styles.quizHeroCopy}>
            <p className={styles.faqEyebrow}>Quiz</p>
            <h1 className={styles.faqTitle}>15 câu test để định hướng nhóm ngành phù hợp hơn</h1>
            <p className={styles.faqLead}>
              Bài test này không chỉ hỏi anh/chị thích môn gì, mà còn nhìn vào cách tư duy, kiểu
              làm việc, mức độ chịu áp lực, phong cách giao tiếp và động lực nghề nghiệp dài hạn.
            </p>
          </div>

          <div className={styles.quizHeroAside}>
            <div className={styles.quizHeroStat}>
              <span className={styles.quizHeroStatLabel}>Số câu hỏi</span>
              <strong>15 câu</strong>
            </div>
            <div className={styles.quizHeroStat}>
              <span className={styles.quizHeroStatLabel}>Thời gian</span>
              <strong>5-7 phút</strong>
            </div>
            <div className={styles.quizHeroStat}>
              <span className={styles.quizHeroStatLabel}>Kết quả</span>
              <strong>Top nhóm ngành phù hợp</strong>
            </div>
          </div>
        </section>

        <QuizClient />
      </main>
    </div>
  );
}

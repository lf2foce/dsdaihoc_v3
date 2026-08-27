import { sql } from "../../db";
import styles from "../admin.module.css";
import { exactTime, timeAgo } from "../time";

export const dynamic = "force-dynamic";

const SUBJECT_LABELS: Record<string, string> = {
  "cap-nhat-du-lieu": "Cập nhật dữ liệu trường",
  "bao-loi-giao-dien": "Báo lỗi giao diện",
  "de-xuat-tinh-nang": "Đề xuất tính năng",
  khac: "Khác",
};

type FeedbackRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default async function AdminFeedbackPage() {
  const rows = (await sql`
    SELECT id, name, email, subject, message, created_at
    FROM feedback
    ORDER BY created_at DESC
    LIMIT 200
  `) as FeedbackRow[];

  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.title}>Góp ý</h1>
        <span className={styles.count}>{rows.length} mục</span>
      </div>

      {rows.length === 0 ? (
        <p className={styles.empty}>Chưa có góp ý nào.</p>
      ) : (
        <div className={styles.list}>
          {rows.map((row) => (
            <article key={row.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.who2}>{row.name}</span>
                <span className={styles.meta} title={exactTime(row.created_at)}>
                  {timeAgo(row.created_at)}
                </span>
              </div>
              <div className={styles.meta}>
                <a href={`mailto:${row.email}`}>{row.email}</a>
              </div>
              <span className={styles.subject}>
                {SUBJECT_LABELS[row.subject] ?? row.subject}
              </span>
              <p className={styles.body}>{row.message}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

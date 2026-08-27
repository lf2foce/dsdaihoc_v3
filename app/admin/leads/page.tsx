import { sql } from "../../db";
import styles from "../admin.module.css";
import { exactTime, timeAgo } from "../time";

export const dynamic = "force-dynamic";

const INTENT_LABELS: Record<string, string> = {
  "giu-cho": "Đăng ký giữ chỗ",
  "tu-van": "Nhận tư vấn",
};

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  school: string | null;
  study_year: string | null;
  intent: string;
  note: string | null;
  status: string;
  created_at: string;
};

export default async function AdminLeadsPage() {
  const rows = (await sql`
    SELECT id, name, email, phone, school, study_year, intent, note, status, created_at
    FROM ai4sd_leads
    ORDER BY created_at DESC
    LIMIT 500
  `) as LeadRow[];

  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.title}>Đăng ký AI4SD</h1>
        <span className={styles.count}>{rows.length} đăng ký</span>
      </div>

      {rows.length === 0 ? (
        <p className={styles.empty}>Chưa có đăng ký nào.</p>
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

              <span className={styles.subject}>
                {INTENT_LABELS[row.intent] ?? row.intent}
              </span>

              <div className={styles.fields}>
                <span>
                  <strong>Email:</strong> <a href={`mailto:${row.email}`}>{row.email}</a>
                </span>
                {row.phone ? (
                  <span>
                    <strong>SĐT:</strong> <a href={`tel:${row.phone}`}>{row.phone}</a>
                  </span>
                ) : null}
                {row.school ? (
                  <span>
                    <strong>Trường:</strong> {row.school}
                  </span>
                ) : null}
                {row.study_year ? (
                  <span>
                    <strong>Năm học:</strong> {row.study_year}
                  </span>
                ) : null}
              </div>

              {row.note ? <p className={styles.body}>{row.note}</p> : null}
            </article>
          ))}
        </div>
      )}
    </>
  );
}

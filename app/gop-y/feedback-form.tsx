"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import styles from "../page.module.css";
import { submitFeedback, type FeedbackFormState } from "./actions";

const initialState: FeedbackFormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.feedbackSubmitButton} disabled={pending}>
      {pending ? "Đang gửi..." : "Gửi góp ý"}
    </button>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className={styles.feedbackFieldError}>{errors[0]}</p>;
}

export default function FeedbackForm() {
  const [state, formAction] = useActionState(submitFeedback, initialState);

  return (
    <form action={formAction} className={styles.feedbackForm}>
      <div className={styles.feedbackGrid}>
        <label className={styles.feedbackField}>
          <span className={styles.feedbackLabel}>Họ tên</span>
          <input
            name="name"
            type="text"
            className={styles.feedbackInput}
            placeholder="Nguyễn Văn A"
            required
          />
          <FieldError errors={state.errors?.name} />
        </label>

        <label className={styles.feedbackField}>
          <span className={styles.feedbackLabel}>Email</span>
          <input
            name="email"
            type="email"
            className={styles.feedbackInput}
            placeholder="ban@example.com"
            required
          />
          <FieldError errors={state.errors?.email} />
        </label>
      </div>

      <label className={styles.feedbackField}>
        <span className={styles.feedbackLabel}>Chủ đề</span>
        <select name="subject" className={styles.feedbackInput} defaultValue="" required>
          <option value="" disabled>
            Chọn một chủ đề
          </option>
          <option value="cap-nhat-du-lieu">Cập nhật dữ liệu trường</option>
          <option value="bao-loi-giao-dien">Báo lỗi giao diện</option>
          <option value="de-xuat-tinh-nang">Đề xuất tính năng</option>
          <option value="khac">Khác</option>
        </select>
        <FieldError errors={state.errors?.subject} />
      </label>

      <label className={styles.feedbackField}>
        <span className={styles.feedbackLabel}>Nội dung góp ý</span>
        <textarea
          name="message"
          className={styles.feedbackTextarea}
          placeholder="Anh/chị mô tả chi tiết vấn đề hoặc đề xuất giúp mình nhé."
          rows={7}
          required
        />
        <FieldError errors={state.errors?.message} />
      </label>

      {state.message ? (
        <p
          className={`${styles.feedbackMessage} ${
            state.success ? styles.feedbackMessageSuccess : styles.feedbackMessageError
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <div className={styles.feedbackActions}>
        <SubmitButton />
      </div>
    </form>
  );
}

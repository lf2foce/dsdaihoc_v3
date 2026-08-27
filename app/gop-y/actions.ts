"use server";

import { sql } from "../db";

export type FeedbackFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  success?: boolean;
  message?: string;
};

type FeedbackPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getFieldValue(formData: FormData, key: keyof FeedbackPayload) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateFeedback(formData: FormData) {
  const payload: FeedbackPayload = {
    name: getFieldValue(formData, "name"),
    email: getFieldValue(formData, "email"),
    subject: getFieldValue(formData, "subject"),
    message: getFieldValue(formData, "message"),
  };

  const errors: NonNullable<FeedbackFormState["errors"]> = {};

  if (payload.name.length < 2) {
    errors.name = ["Họ tên cần ít nhất 2 ký tự."];
  }

  if (!payload.email) {
    errors.email = ["Bạn vui lòng nhập email."];
  } else if (!isValidEmail(payload.email)) {
    errors.email = ["Email chưa đúng định dạng."];
  }

  if (!payload.subject) {
    errors.subject = ["Bạn vui lòng chọn chủ đề."];
  }

  if (!payload.message) {
    errors.message = ["Bạn vui lòng nhập nội dung góp ý."];
  } else if (payload.message.length < 12) {
    errors.message = ["Nội dung góp ý nên chi tiết hơn một chút."];
  }

  return {
    payload,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export async function submitFeedback(
  _prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const validatedFields = validateFeedback(formData);

  if (!validatedFields.isValid) {
    return {
      errors: validatedFields.errors,
      success: false,
      message: "Bạn kiểm tra lại các trường còn thiếu giúp mình nhé.",
    };
  }

  const { name, email, subject, message } = validatedFields.payload;

  try {
    await sql`
      INSERT INTO feedback (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;
  } catch (error) {
    // Log the failure, never the payload: it carries the sender's name and
    // email, and runtime logs are not the place for that.
    console.error("Feedback insert failed", error);
    return {
      success: false,
      message:
        "Chưa gửi được góp ý do lỗi hệ thống. Bạn thử lại sau ít phút giúp mình nhé.",
    };
  }

  return {
    success: true,
    message: "Cảm ơn bạn. Góp ý đã được gửi thành công.",
  };
}

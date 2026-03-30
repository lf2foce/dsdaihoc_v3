"use server";

import { appendFile } from "node:fs/promises";

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
    errors.email = ["Anh/chị vui lòng nhập email."];
  } else if (!isValidEmail(payload.email)) {
    errors.email = ["Email chưa đúng định dạng."];
  }

  if (!payload.subject) {
    errors.subject = ["Anh/chị vui lòng chọn chủ đề."];
  }

  if (!payload.message) {
    errors.message = ["Anh/chị vui lòng nhập nội dung góp ý."];
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
      message: "Anh/chị kiểm tra lại các trường còn thiếu giúp mình nhé.",
    };
  }

  const payload = {
    ...validatedFields.payload,
    submittedAt: new Date().toISOString(),
  };

  try {
    await appendFile("/tmp/dsdaihoc-feedback.jsonl", `${JSON.stringify(payload)}\n`, "utf8");
  } catch (error) {
    console.error("Feedback storage failed", error);
  }

  console.info("Feedback submitted", payload);

  return {
    success: true,
    message: "Cảm ơn anh/chị. Góp ý đã được gửi thành công.",
  };
}

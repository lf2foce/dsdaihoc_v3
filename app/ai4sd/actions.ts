"use server";

import { sql } from "../db";

export type LeadFormState = {
  errors?: Partial<Record<"name" | "email" | "intent", string[]>>;
  success?: boolean;
  message?: string;
};

const INTENTS = new Set(["giu-cho", "tu-van"]);

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const school = field(formData, "school");
  const studyYear = field(formData, "study_year");
  const note = field(formData, "note");
  const intent = field(formData, "intent");

  const errors: NonNullable<LeadFormState["errors"]> = {};

  if (name.length < 2) errors.name = ["Bạn nhập họ tên giúp mình nhé."];
  if (!email) errors.email = ["Bạn vui lòng nhập email."];
  else if (!isValidEmail(email)) errors.email = ["Email chưa đúng định dạng."];
  // Phone is stored as typed. Vietnamese numbers come in too many shapes
  // (+84, 84, 0, landlines, spaces, dots) for a pattern to help more than it
  // blocks, and a wrong-looking number is still worth having.
  if (!INTENTS.has(intent)) errors.intent = ["Bạn chọn một mục giúp mình."];

  if (Object.keys(errors).length) {
    return {
      errors,
      success: false,
      message: "Bạn kiểm tra lại các trường còn thiếu giúp mình nhé.",
    };
  }

  try {
    await sql`
      INSERT INTO ai4sd_leads (name, email, phone, school, study_year, intent, note)
      VALUES (${name}, ${email}, ${phone || null}, ${school || null},
              ${studyYear || null}, ${intent}, ${note || null})
    `;
  } catch (error) {
    // Log the failure, never the payload: it carries a name, email and phone.
    console.error("[ai4sd] lead insert failed", error);
    return {
      success: false,
      message: "Chưa gửi được đăng ký do lỗi hệ thống. Bạn thử lại sau ít phút nhé.",
    };
  }

  return {
    success: true,
    message:
      intent === "giu-cho"
        ? "Đã ghi nhận đăng ký giữ chỗ. Đội ngũ AI4SD sẽ liên hệ trong 2 ngày làm việc."
        : "Đã ghi nhận yêu cầu tư vấn. Đội ngũ AI4SD sẽ liên hệ trong 2 ngày làm việc.",
  };
}

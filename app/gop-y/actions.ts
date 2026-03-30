"use server";

import { appendFile } from "node:fs/promises";

import { z } from "zod";

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

const feedbackSchema = z.object({
  name: z
    .string({ required_error: "Anh/chị vui lòng nhập họ tên." })
    .trim()
    .min(2, "Họ tên cần ít nhất 2 ký tự."),
  email: z
    .string({ required_error: "Anh/chị vui lòng nhập email." })
    .trim()
    .email("Email chưa đúng định dạng."),
  subject: z
    .string({ required_error: "Anh/chị vui lòng chọn chủ đề." })
    .trim()
    .min(1, "Anh/chị vui lòng chọn chủ đề."),
  message: z
    .string({ required_error: "Anh/chị vui lòng nhập nội dung góp ý." })
    .trim()
    .min(12, "Nội dung góp ý nên chi tiết hơn một chút."),
});

export async function submitFeedback(
  _prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const validatedFields = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "Anh/chị kiểm tra lại các trường còn thiếu giúp mình nhé.",
    };
  }

  const payload = {
    ...validatedFields.data,
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

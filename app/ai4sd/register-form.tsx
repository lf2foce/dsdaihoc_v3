"use client";

import { useActionState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { submitLead, type LeadFormState } from "./actions";

const initialState: LeadFormState = { success: false, message: "" };

const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 " +
  "outline-none transition-colors placeholder:text-slate-400 focus:border-teal-700 " +
  "focus:ring-2 focus:ring-teal-700/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";
const errorClass = "mt-1 text-xs font-medium text-rose-600";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-[2rem] border border-teal-200 bg-teal-50/80 p-8 text-center shadow-sm">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-600 text-white font-bold mb-4 shadow-md shadow-teal-700/20">
          ✓
        </div>
        <p className="text-xl font-bold text-teal-950">{state.message}</p>
        <p className="mt-3 text-sm text-teal-800/90 leading-relaxed">
          Đội ngũ chuyên gia của Viện VNU - AI4SD sẽ gửi lại <strong>trọn bộ Đề cương chi tiết 8 buổi</strong>, lịch học cụ thể cho đợt <strong>khai giảng dự kiến 22/09</strong> (học cuối tuần &amp; buổi tối) và hướng dẫn nhận ưu đãi học phí qua Email / Số điện thoại của bạn.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <fieldset disabled={pending} className="space-y-5">
        <legend className="sr-only">Đăng ký chương trình AI4SD</legend>

        {/* Mục đích đăng ký */}
        {/* The radio was dropped from the form; every submission is a signup, so
            `intent` keeps a fixed value rather than leaving the column meaningless
            for rows created from here on. */}
        <input type="hidden" name="intent" value="giu-cho" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="lead-name">
              Họ và tên <span className="text-rose-600">*</span>
            </label>
            <input id="lead-name" name="name" required className={inputClass} placeholder="Nguyễn Văn A" />
            {state.errors?.name ? <p className={errorClass}>{state.errors.name[0]}</p> : null}
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-email">
              Email <span className="text-rose-600">*</span>
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="ban@example.com"
            />
            {state.errors?.email ? <p className={errorClass}>{state.errors.email[0]}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="lead-phone">
              Số điện thoại
            </label>
            <input
              id="lead-phone"
              name="phone"
              inputMode="tel"
              className={inputClass}
              placeholder="0912345678"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-year">
              Năm học / Nghề nghiệp
            </label>
            <select id="lead-year" name="study_year" className={inputClass} defaultValue="">
              <option value="">Chọn năm học / nghề nghiệp</option>
              <option>Sinh viên Năm 1</option>
              <option>Sinh viên Năm 2</option>
              <option>Sinh viên Năm 3</option>
              <option>Sinh viên Năm 4</option>
              <option>Mới tốt nghiệp</option>
              <option>Đang đi làm (Kinh tế / Marketing / Vận hành)</option>
              <option>Chủ doanh nghiệp / Khởi nghiệp</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-school">
            Trường đang học / Cơ quan công tác
          </label>
          <input
            id="lead-school"
            name="school"
            className={inputClass}
            placeholder="Ví dụ: Trường Đại học Kinh tế Quốc dân"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-note">
            Ghi chú / Ý tưởng sản phẩm bạn muốn làm
          </label>
          <textarea
            id="lead-note"
            name="note"
            rows={2}
            className={inputClass}
            placeholder="Ví dụ: Nhóm 5 bạn cùng lớp đăng ký, muốn làm AI Chatbot cho cửa hàng thời trang..."
          />
        </div>

        {state.message && !state.success ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 shadow-md shadow-teal-900/20 disabled:opacity-70 active:scale-98"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4 text-amber-300" />}
          {pending ? "Đang gửi đăng ký..." : "Gửi Đăng Ký & Nhận Ưu Đãi"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Thông tin được bảo mật và chỉ dùng để liên hệ tư vấn về chương trình AI4SD.
        </p>
      </fieldset>
    </form>
  );
}

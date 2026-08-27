"use client";

import { useActionState, useId } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { submitLead, type LeadFormState } from "./actions";

const initialState: LeadFormState = { success: false, message: "" };

const inputClass =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 " +
  "outline-none transition-colors placeholder:text-slate-400 focus:border-teal-700 " +
  "focus:ring-2 focus:ring-teal-700/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";
const errorClass = "mt-1 text-xs font-medium text-rose-600";

/**
 * `schools` powers a datalist rather than a select: a student may study
 * somewhere not in the list, so the field stays free text with suggestions.
 */
export default function RegisterForm({ schools }: { schools: string[] }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const listId = useId();

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
        <div>
          <span className={labelClass}>Bạn muốn</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: "giu-cho", label: "Đăng ký giữ chỗ" },
              { value: "tu-van", label: "Nhận tư vấn lộ trình 1:1" },
            ].map((option, index) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-800 transition-colors has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900"
              >
                <input
                  type="radio"
                  name="intent"
                  value={option.value}
                  defaultChecked={index === 0}
                  className="size-4 accent-teal-800"
                />
                {option.label}
              </label>
            ))}
          </div>
          {state.errors?.intent ? (
            <p className={errorClass}>{state.errors.intent[0]}</p>
          ) : null}
        </div>

        {/* Chọn gói đăng ký & Ưu đãi nhóm 5 người giảm 30% */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className={labelClass}>Hình thức tham gia (Lớp tối đa 20 học viên)</span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              🔥 Nhóm 5 người giảm 30%
            </span>
          </div>
          <div className="space-y-2">
            {[
              {
                value: "Nhom 5 nguoi (Giam 30%)",
                label: "Nhóm 5+ người (Squad Team)",
                badge: "Tiết kiệm 30% · 4.480.000 ₫ / bạn",
                defaultChecked: true,
              },
              {
                value: "Nhom 2-4 nguoi (Giam 15%)",
                label: "Nhóm 2–4 người (Team 3)",
                badge: "Giảm 15% · 5.440.000 ₫ / bạn",
                defaultChecked: false,
              },
              {
                value: "Ca nhan (1 nguoi)",
                label: "Cá nhân (1 học viên)",
                badge: "6.400.000 ₫ (8 buổi)",
                defaultChecked: false,
              },
            ].map((pkg) => (
              <label
                key={pkg.value}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-800 transition-all has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50/80 has-[:checked]:text-teal-950"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="package_type"
                    value={pkg.value}
                    defaultChecked={pkg.defaultChecked}
                    className="size-3.5 accent-teal-800"
                  />
                  <span className="font-semibold">{pkg.label}</span>
                </div>
                <span className="text-[11px] font-bold text-teal-800 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs">
                  {pkg.badge}
                </span>
              </label>
            ))}
          </div>
        </div>

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
            list={listId}
            className={inputClass}
            placeholder="Gõ để tìm trong danh sách 176+ trường"
          />
          <datalist id={listId}>
            {schools.map((school) => (
              <option key={school} value={school} />
            ))}
          </datalist>
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

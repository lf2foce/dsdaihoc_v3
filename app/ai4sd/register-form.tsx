"use client";

import { useActionState, useId } from "react";
import { Loader2 } from "lucide-react";

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
      <div className="rounded-[1.75rem] border border-teal-200 bg-teal-50/70 p-8 text-center">
        <p className="text-lg font-semibold text-teal-900">{state.message}</p>
        <p className="mt-2 text-sm text-teal-800/80">
          Nếu cần gấp, bạn có thể trả lời trực tiếp email xác nhận.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <fieldset disabled={pending} className="space-y-5">
        <legend className="sr-only">Đăng ký chương trình AI4SD</legend>

        <div>
          <span className={labelClass}>Bạn muốn</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: "giu-cho", label: "Đăng ký giữ chỗ" },
              { value: "tu-van", label: "Nhận tư vấn lộ trình" },
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
              Năm học
            </label>
            <select id="lead-year" name="study_year" className={inputClass} defaultValue="">
              <option value="">Chọn năm học</option>
              <option>Năm 1</option>
              <option>Năm 2</option>
              <option>Năm 3</option>
              <option>Năm 4</option>
              <option>Mới tốt nghiệp</option>
              <option>Đang đi làm</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-school">
            Trường đang học
          </label>
          <input
            id="lead-school"
            name="school"
            list={listId}
            className={inputClass}
            placeholder="Gõ để tìm trong danh sách"
          />
          <datalist id={listId}>
            {schools.map((school) => (
              <option key={school} value={school} />
            ))}
          </datalist>
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-note">
            Bạn muốn hỏi thêm điều gì?
          </label>
          <textarea
            id="lead-note"
            name="note"
            rows={3}
            className={inputClass}
            placeholder="Ví dụ: học phí, lịch học, cần chuẩn bị gì trước khoá"
          />
        </div>

        {state.message && !state.success ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : null}
          {pending ? "Đang gửi..." : "Gửi đăng ký"}
        </button>

        <p className="text-center text-xs text-slate-500">
          Thông tin chỉ dùng để liên hệ tư vấn về chương trình AI4SD.
        </p>
      </fieldset>
    </form>
  );
}

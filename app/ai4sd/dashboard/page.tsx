import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Cpu, BookOpen } from "lucide-react";
import FinancialDashboardPreview from "../dashboard-preview";

export const metadata: Metadata = {
  title: "Live Demo: Bảng Điều Khiển Tài Chính & Dự Báo Kinh Doanh AI | AI4SD",
  description:
    "Trải nghiệm trực tiếp Bảng điều khiển tài chính thông minh do học viên chương trình AI4SD tự tay xây dựng bằng phương pháp Vibe Coding.",
};

export default function AIDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-900 selection:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top bar with back link */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <Link
            href="/ai4sd#showcase"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Quay lại trang AI4SD</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-slate-400">
              Chương trình AI Product Builder · Viện VNU - AI4SD
            </span>
            <Link
              href="/ai4sd#register"
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 px-5 py-2 text-xs font-bold text-slate-950 shadow-sm transition-all"
            >
              <Sparkles className="size-3.5" />
              <span>Đăng Ký Học Để Tự Dựng Dashboard Này</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Title & Intro */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
            <Cpu className="size-3.5 text-teal-400" />
            Live Capstone Project
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            AI Financial &amp; Business Intelligence Dashboard
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
            Đây là một sản phẩm thực tế được xây dựng bởi học viên khối ngành Kinh tế trong khóa học 8 buổi của AI4SD. 
            Ứng dụng kết nối dữ liệu tài chính thời gian thực và tích hợp mô hình Google Gemini để tự động hóa hoàn toàn khâu phân tích số liệu.
          </p>
        </div>

        {/* The Live Interactive Dashboard */}
        <FinancialDashboardPreview isStandalone={true} />

        {/* Bottom Callout */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">
            Bạn cũng có thể tự tay tạo ra sản phẩm này sau 8 buổi thực chiến
          </h3>
          <p className="max-w-2xl mx-auto text-sm text-slate-400">
            Không cần nền tảng lập trình chuyên sâu. Chúng tôi hướng dẫn bạn từ cách thiết kế giao diện, kết nối dữ liệu đến nhúng Google Gemini thông qua Vibe Coding. Sĩ số giới hạn tối đa 20 học viên/lớp.
          </p>
          <div className="pt-2">
            <Link
              href="/ai4sd#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition-all"
            >
              <span>Xem Bảng Giá &amp; Ưu Đãi Nhóm 5 Người (Giảm 30%)</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

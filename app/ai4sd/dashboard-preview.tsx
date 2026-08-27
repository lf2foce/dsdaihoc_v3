"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Download,
  Filter,
  Flame,
  HelpCircle,
  Layers,
  LineChart,
  PieChart,
  RefreshCw,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard = ({
  title,
  value,
  change,
  isPositive,
  subtext,
  icon,
  color,
}: MetricCardProps) => (
  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
      <div className={`flex size-9 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
    <div className="mt-3 flex items-baseline gap-2">
      <span className="text-2xl font-extrabold text-slate-950 sm:text-3xl">{value}</span>
      <span
        className={`inline-flex items-center gap-0.5 text-xs font-bold ${
          isPositive ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200" : "text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200"
        }`}
      >
        {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {change}
      </span>
    </div>
    <p className="mt-1 text-xs text-slate-500">{subtext}</p>
  </div>
);

const monthlyData = [
  { month: "T1", revenue: 290, expense: 210, profit: 80 },
  { month: "T2", revenue: 320, expense: 225, profit: 95 },
  { month: "T3", revenue: 350, expense: 230, profit: 120 },
  { month: "T4", revenue: 390, expense: 240, profit: 150 },
  { month: "T5", revenue: 420, expense: 235, profit: 185 },
  { month: "T6", revenue: 440, expense: 245, profit: 195 },
  { month: "T7", revenue: 460, expense: 250, profit: 210 },
  { month: "T8", revenue: 485, expense: 242, profit: 243 },
];

const expenseBreakdown = [
  { name: "Marketing & Ads", percent: 38, amount: "92.000.000 ₫", color: "bg-teal-600" },
  { name: "Nhân sự & Lương", percent: 32, amount: "77.500.000 ₫", color: "bg-blue-600" },
  { name: "Hạ tầng & Cloud", percent: 14, amount: "33.800.000 ₫", color: "bg-amber-500" },
  { name: "AI API Credits", percent: 10, amount: "24.200.000 ₫", color: "bg-purple-600" },
  { name: "Chi phí khác", percent: 6, amount: "14.500.000 ₫", color: "bg-slate-400" },
];

const aiInsights = [
  {
    type: "positive",
    title: "Hiệu quả AI Automation vượt trội",
    desc: "Chi phí vận hành thủ công giảm 28.5% so với quý trước nhờ ứng dụng AI Chatbot tự động phân loại khách hàng và tự động xuất hóa đơn.",
  },
  {
    type: "warning",
    title: "Cảnh báo chi phí Marketing Ads tháng 8",
    desc: "Ngân sách Ads kênh Facebook tăng 18% nhưng tỷ lệ chuyển đổi chững lại. AI đề xuất chuyển dịch 30% ngân sách sang kênh TikTok Organic & Video AI.",
  },
  {
    type: "forecast",
    title: "Dự báo dòng tiền dương 6 tháng tới",
    desc: "Dựa trên mô hình hồi quy doanh thu định kỳ (MRR), dòng tiền dự kiến tăng trưởng ổn định +18% trong Q3 và Q4/2026.",
  },
];

const presetQuestions = [
  "Khi nào công ty đạt điểm hòa vốn tháng này?",
  "Chi phí AI API có đang vượt ngưỡng dự toán không?",
  "Đề xuất 3 kịch bản cắt giảm OPEX 15% cho quý sau?",
  "Kênh marketing nào đang đem lại ROI cao nhất?",
];

export default function FinancialDashboardPreview({ isStandalone = false }: { isStandalone?: boolean }) {
  const [selectedMonth, setSelectedMonth] = useState("Tháng 8 / 2026 (Hiện tại)");
  const [activeTab, setActiveTab] = useState<"revenue" | "expense">("revenue");
  const [userQuery, setUserQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(
    "Xin chào! Tôi là Trợ lý AI Tài chính. Toàn bộ chỉ số doanh thu, chi phí và dòng tiền tháng 8/2026 đã được đồng bộ tự động. Bạn muốn tôi phân tích sâu khía cạnh nào?"
  );
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleAskAi = (question: string) => {
    setUserQuery(question);
    setIsAiThinking(true);
    setTimeout(() => {
      if (question.includes("hòa vốn")) {
        setAiResponse(
          "📊 **Phân tích Điểm Hòa Vốn:**\nVới chi phí cố định (Fixed Cost) là 110 triệu ₫ và biên lợi nhuận gộp 45%, công ty đã vượt điểm hòa vốn từ ngày 14 của tháng. Từ ngày 15 trở đi, mỗi 100 triệu doanh thu tăng thêm sẽ đóng góp ròng 45 triệu vào lợi nhuận thuần."
        );
      } else if (question.includes("API")) {
        setAiResponse(
          "🤖 **Kiểm soát Chi phí AI API (Google Gemini):**\nChi phí API Google Gemini tháng này là 24.2 triệu ₫, chiếm 10% tổng chi phí (dưới ngưỡng cảnh báo 15%). Chi phí trung bình cho mỗi cuộc hội thoại CSKH tự động với Gemini Flash là 85 ₫ — tiết kiệm hơn 92% so với chi phí nhân sự trả lời tay."
        );
      } else if (question.includes("OPEX") || question.includes("cắt giảm")) {
        setAiResponse(
          "💡 **3 Kịch bản Tối ưu OPEX 15%:**\n1. Tự động hóa tạo nội dung đa kênh để giảm 40% chi phí thuê ngoài (Outsource agency).\n2. Chuyển đổi gói lưu trữ Cloud sang mô hình Serverless Pay-as-you-go.\n3. Áp dụng Smart Booking giảm 90% chi phí hủy lịch."
        );
      } else {
        setAiResponse(
          `📈 **Phân tích cho câu hỏi:** "${question}"\nDữ liệu cho thấy kênh TikTok Organic kết hợp Video AI ngắn đang có tỷ suất ROI cao nhất (đạt 4.2x so với 2.1x của Facebook Ads). Khuyến nghị tập trung ngân sách vào kênh này trong 30 ngày tới.`
        );
      }
      setIsAiThinking(false);
    }, 600);
  };

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="w-full rounded-[2.5rem] border border-slate-200/90 bg-slate-900 text-slate-100 shadow-[0_30px_100px_rgba(15,23,42,0.18)] overflow-hidden">
      {/* Dashboard Top Header Bar */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 sm:px-8 sm:py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-teal-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(20,184,166,0.4)]">
            <BarChart3 className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">AI Financial &amp; Business Intelligence</span>
              <span className="rounded-full bg-teal-500/20 border border-teal-500/40 px-2 py-0.5 text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                Live Demo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sản phẩm mẫu do học viên AI4SD tự xây dựng bằng Vibe Coding
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200">
            <Calendar className="size-3.5 text-teal-400" />
            <span>{selectedMonth}</span>
          </div>

          {!isStandalone && (
            <Link
              href="/ai4sd/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition-colors"
            >
              <span>Xem Full Màn Hình</span>
              <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <div className="p-6 sm:p-8 space-y-8 bg-slate-900/95">
        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Tổng Doanh Thu (Revenue)"
            value="485.000.000 ₫"
            change="+24.8%"
            isPositive={true}
            subtext="Tăng trưởng liên tục 5 tháng"
            icon={<DollarSign className="size-4 text-teal-400" />}
            color="bg-teal-500/20 text-teal-300 border border-teal-500/30"
          />
          <MetricCard
            title="Lợi Nhuận Gộp (Gross Profit)"
            value="243.000.000 ₫"
            change="+31.2%"
            isPositive={true}
            subtext="Biên lợi nhuận gộp đạt 50.1%"
            icon={<TrendingUp className="size-4 text-blue-400" />}
            color="bg-blue-500/20 text-blue-300 border border-blue-500/30"
          />
          <MetricCard
            title="Chi Phí Vận Hành (OPEX)"
            value="142.000.000 ₫"
            change="-12.4%"
            isPositive={true}
            subtext="Giảm nhờ AI Workflow tự động"
            icon={<Zap className="size-4 text-amber-400" />}
            color="bg-amber-500/20 text-amber-300 border border-amber-500/30"
          />
          <MetricCard
            title="Dòng Tiền Thuần (Net Cashflow)"
            value="+101.000.000 ₫"
            change="+42.0%"
            isPositive={true}
            subtext="Dự báo an toàn > 6 tháng"
            icon={<CheckCircle2 className="size-4 text-emerald-400" />}
            color="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          />
        </div>

        {/* Middle Row: Charts & Breakdowns */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          {/* Revenue & Growth Chart */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <LineChart className="size-4 text-teal-400" />
                  <span>Diễn Biến Doanh Thu &amp; Chi Phí (8 Tháng gần nhất)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Đơn vị: Triệu VNĐ</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="size-2.5 rounded-sm bg-teal-500 inline-block" /> Doanh thu
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="size-2.5 rounded-sm bg-slate-600 inline-block" /> Chi phí
                </span>
              </div>
            </div>

            {/* Custom Interactive SVG Bar Chart */}
            <div className="h-64 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-800">
              {monthlyData.map((d) => {
                const revHeight = (d.revenue / maxRevenue) * 100;
                const expHeight = (d.expense / maxRevenue) * 100;
                return (
                  <div key={d.month} className="group relative flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="pointer-events-none absolute -top-12 z-20 hidden rounded-xl border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[11px] shadow-xl group-hover:flex flex-col items-center whitespace-nowrap">
                      <span className="font-bold text-teal-300">DT: {d.revenue}tr ₫</span>
                      <span className="text-slate-400">CP: {d.expense}tr ₫</span>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Revenue bar */}
                      <div
                        style={{ height: `${revHeight}%` }}
                        className="w-full max-w-[18px] rounded-t-md bg-gradient-to-t from-teal-700 to-teal-400 transition-all duration-300 group-hover:brightness-125"
                      />
                      {/* Expense bar */}
                      <div
                        style={{ height: `${expHeight}%` }}
                        className="w-full max-w-[14px] rounded-t-md bg-slate-700 transition-all duration-300 group-hover:bg-slate-600"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-300">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="size-4 text-amber-400" />
                  <span>Cơ Cấu Chi Phí Vận Hành (OPEX)</span>
                </h3>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Tháng 8/2026
                </span>
              </div>

              <div className="space-y-4">
                {expenseBreakdown.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-slate-400 font-mono">
                        {item.amount} ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        style={{ width: `${item.percent}%` }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-teal-950/40 border border-teal-800/50 p-3.5 text-xs text-teal-200 flex items-start gap-2.5">
              <Sparkles className="size-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>AI Insight:</strong> Tỷ lệ chi phí AI API chỉ chiếm 10% nhưng giúp cắt giảm 45% thời gian xử lý dữ liệu của team vận hành.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: AI Financial Analyst (Interactive Chat & Insights) */}
        <div className="rounded-3xl border border-teal-800/60 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-slate-950 font-bold shadow-[0_0_24px_rgba(20,184,166,0.35)]">
                <Brain className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">AI Financial Analyst (Trợ Lý Phân Tích Thông Minh)</h3>
                  <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs text-slate-400">
                  Tự động phân tích, phát hiện dị thường và trả lời câu hỏi nghiệp vụ tài chính theo thời gian thực
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAskAi("Tổng hợp 3 điểm sáng tài chính tháng này")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-teal-700/60 bg-teal-950/50 hover:bg-teal-900/60 px-3 py-1.5 text-xs font-semibold text-teal-200 transition-colors"
              >
                <RefreshCw className="size-3" />
                <span>Làm Mới AI Insights</span>
              </button>
            </div>
          </div>

          {/* AI Response Display Area */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 font-sans leading-relaxed text-sm text-slate-200 shadow-inner">
            {isAiThinking ? (
              <div className="flex items-center gap-3 text-teal-400 py-4">
                <RefreshCw className="size-4 animate-spin" />
                <span>AI đang trích xuất dữ liệu và tổng hợp mô hình tài chính...</span>
              </div>
            ) : (
              <div className="whitespace-pre-line text-slate-200 space-y-2">
                {aiResponse}
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="size-3.5 text-teal-400" />
              <span>Gợi ý câu hỏi phân tích nhanh cho trợ lý AI:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleAskAi(q)}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 hover:border-teal-500 hover:bg-teal-950/40 hover:text-teal-200 px-3.5 py-2 text-xs font-medium text-slate-300 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

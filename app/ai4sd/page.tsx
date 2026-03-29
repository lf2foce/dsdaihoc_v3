import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Box, Cpu, LineChart, Code2, Presentation, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI4SD — Định hình Product Builder Tương lai",
  description: "Trở thành Product Builder bằng AI dành riêng cho sinh viên non-tech.",
};

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 sm:py-32 ${className}`}>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const features = [
  {
    name: "Dành cho Non-tech",
    description:
      "Tận dụng kiến thức kinh doanh, marketing của bạn. Tư duy logic kinh doanh là đủ, AI sẽ tự động xử lý các dòng code.",
    icon: <Box className="size-5 text-teal-900" />,
  },
  {
    name: "100% Thực chiến (Build First)",
    description:
      "Mỗi bài giảng đều gắn với một tính năng thực tế. Điểm kết thúc khóa học là một MVP hoàn chỉnh hoạt động trên Internet.",
    icon: <Code2 className="size-5 text-teal-900" />,
  },
  {
    name: "Tài sản nghề nghiệp",
    description:
      "Sở hữu Portfolio cực xịn, các case study chuyên nghiệp để có thể sẵn sàng ứng tuyển và thể hiện năng lực với nhà tuyển dụng.",
    icon: <LineChart className="size-5 text-teal-900" />,
  },
];

const roadmap = [
  {
    tag: "Tuần 1–2",
    title: "AI Literacy for Business",
    text: "Trang bị tư duy dùng AI để nâng cao năng suất. Hiểu cách LLMs hoạt động và chuyển đổi một quy trình kinh doanh thủ công thành một workflow tự động với AI.",
  },
  {
    tag: "Tuần 3–6",
    title: "Vibe Coding & Product Creation",
    text: "Thiết kế User Flow và xây dựng UI web/app thông qua các nền tảng no-code mạnh mẽ, tích hợp trực tiếp với API của AI (OpenAI, Anthropic).",
  },
  {
    tag: "Tuần 7–8",
    title: "Deployment & Real Usage",
    text: "Triển khai phần mềm lên máy chủ. Thiết lập cơ sở dữ liệu thật, mang người dùng vào thử nghiệm (User Testing) và đo lường độ trơn tru của luồng.",
  },
  {
    tag: "Tuần 9–10",
    title: "Demo & Portfolio",
    text: "Hoàn thiện hồ sơ năng lực cá nhân bằng chính sản phẩm đã làm. Tổ chức khoá Demo Day với format Startup Pitch để trình diễn giải pháp.",
  },
];

export default function AI4SDPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfaf5] font-sans text-slate-900 selection:bg-teal-950 selection:text-amber-50">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_26%),radial-gradient(circle_at_85%_15%,_rgba(45,212,191,0.14),_transparent_24%),linear-gradient(180deg,_#fffdf8_0%,_#f8f3e9_40%,_#f8fafc_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.04),_transparent_68%)]" />

      {/* Fixed Global Background Image */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src="/bg_light.png"
          alt="Abstract Light Background"
          fill
          className="object-cover opacity-16 saturate-150"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,235,0.86),rgba(248,250,252,0.92),rgba(255,255,255,0.96))]"></div>
      </div>

      {/* Navbar Minimal */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-stone-200/80 bg-[#fcfaf5]/92 px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-teal-950 text-amber-100">
             <Cpu className="size-3" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-950">AI4SD ACADEMY</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
           <a href="#about" className="hidden transition-colors hover:text-teal-950 sm:block">Chương trình</a>
           <a href="#roadmap" className="hidden transition-colors hover:text-teal-950 sm:block">Lộ trình</a>
           <a href="#register" className="inline-flex h-9 items-center justify-center rounded-full border border-teal-950 bg-teal-950 px-4 text-white transition-colors hover:bg-teal-900">
              Đăng ký ngay
           </a>
        </div>
      </header>

      {/* Hero Section 2-Column Split */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-8 inline-flex">
                <span className="relative rounded-full border border-amber-200 bg-white/88 px-4 py-1.5 text-sm font-semibold leading-6 text-teal-950">
                  Tuyển sinh 2025 đang mở đăng ký. <a href="#register" className="font-bold text-amber-700 transition-colors hover:text-amber-600"><span className="absolute inset-0" aria-hidden="true"></span>Tìm hiểu thêm <span aria-hidden="true">&rarr;</span></a>
                </span>
              </div>
              
              <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl xl:text-7xl">
                Tạo sản phẩm số thật. <br />
                <span className="bg-gradient-to-r from-teal-950 via-teal-700 to-amber-600 bg-clip-text text-transparent">Không cần code.</span>
              </h1>
              
              <p className="mb-10 max-w-lg text-lg leading-8 text-slate-700">
                Quyền năng của AI trao tay sinh viên Kinh tế & Quản trị. Xây dựng ứng dụng, tự động hóa quy trình và sở hữu MVP thực tế chỉ trong 10 tuần.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a href="#register" className="w-full rounded-full border border-teal-950 bg-teal-950 px-8 py-4 text-center text-sm font-bold text-white transition-colors hover:bg-teal-900 sm:w-auto">
                  Đăng ký học
                </a>
                <a href="#roadmap" className="group flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold leading-6 text-slate-900 transition-colors hover:border-teal-700 hover:text-teal-950 sm:w-auto">
                  Xem lộ trình <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white sm:h-[500px] lg:h-[600px]">
               <Image 
                 src="/ai_hero.png" 
                 alt="AI Education Concept" 
                 fill 
                 className="object-cover object-center transform transition-transform duration-700 hover:scale-105" 
                 priority 
               />
               <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(15,23,42,0.28),transparent_38%,rgba(245,158,11,0.16)_100%)]"></div>
               <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/20 bg-slate-950/54 px-5 py-4 text-white">
                 <div className="text-xs uppercase tracking-[0.28em] text-amber-200/90">Build • Launch • Pitch</div>
                 <div className="mt-2 text-base font-semibold text-white">Từ ý tưởng kinh doanh đến sản phẩm chạy online trong một lộ trình thực chiến.</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalism Features */}
      <Section id="about" className="relative z-10">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-700">Triết lý thiết kế</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Đào tạo Người tạo ra giá trị</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Chúng tôi không dạy bạn cách trở thành một kỹ sư phần mềm. Chúng tôi giúp bạn trở thành Người Xây Dựng Sản Phẩm (Product Builder).
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col rounded-[1.75rem] border border-stone-200 bg-white/88 p-8 transition-colors hover:border-teal-200">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-teal-900/10 bg-gradient-to-br from-amber-100 to-teal-100">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Trust & Outcomes using Bento Grid */}
      <Section className="relative z-10 border-t border-slate-900/5">
        <div className="mx-auto max-w-2xl text-center">
           <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Hành trang của bạn.</h2>
           <p className="mt-4 text-lg leading-8 text-slate-600">Đừng chỉ nhận một chứng chỉ vô tri. Nhận một năng lực vô giá.</p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          
          {/* Card 1: MVP - Large Dark Card */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#134e4a_58%,#115e59_100%)] p-8 sm:p-10 lg:col-span-2">
            <div className="absolute -right-8 -top-8 text-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
               <Box className="w-64 h-64" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_28%)]" />
            <div className="relative z-10">
               <div className="mb-6 inline-flex w-fit rounded-2xl bg-white/10 p-3 text-white">
                 <Box className="size-8" />
               </div>
               <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Sản phẩm MVP hoạt động thật</h3>
               <p className="max-w-md text-lg leading-relaxed text-teal-50/85">1 ứng dụng số hoàn chỉnh giải quyết tự động hoá một bài toán thực tế. Không phải đồ án trên giấy, mà là phần mềm trên cloud.</p>
            </div>
          </div>

          {/* Card 2: Portfolio - Glass Card */}
          <div className="flex flex-col rounded-3xl border border-amber-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,247,237,0.95))] p-8 transition-colors hover:border-amber-200 sm:p-10 lg:col-span-1">
             <div className="mb-6 inline-flex w-fit rounded-2xl bg-amber-100 p-3 text-amber-800">
               <Presentation className="size-8" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Vàng</h3>
             <p className="text-base leading-relaxed text-slate-600">Tài liệu phân tích, user testing làm hành trang xin việc không thể chối từ.</p>
          </div>

          {/* Card 3: Automation - Glass Card */}
          <div className="flex flex-col rounded-3xl border border-teal-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(240,253,250,0.95))] p-8 transition-colors hover:border-teal-200 sm:p-10 lg:col-span-1">
             <div className="mb-6 inline-flex w-fit rounded-2xl bg-teal-100 p-3 text-teal-900">
               <Cpu className="size-8" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Năng lực Tự động hóa</h3>
             <p className="text-base leading-relaxed text-slate-600">Làm chủ khả năng thiết lập các AI agent giải quyết sự vụ lặp lại mỗi ngày.</p>
          </div>

          {/* Card 4: Certificate - Large Dark Gradient Card */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#1f2937_0%,#0f766e_55%,#d97706_100%)] p-8 sm:flex-row sm:items-center sm:p-10 lg:col-span-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,_rgba(255,255,255,0.16),_transparent_24%)]" />
            <div className="relative z-10 sm:w-2/3">
               <div className="mb-6 inline-flex w-fit rounded-2xl bg-white/10 p-3 text-white">
                 <ShieldCheck className="size-8" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Chứng nhận Cử nhân thực chiến</h3>
               <p className="text-lg leading-relaxed text-white/80">Chứng chỉ &quot;AI Product Builder&quot; danh giá được bảo chứng năng lực bởi hội đồng AI4SD Academy.</p>
            </div>
            <div className="mt-8 sm:mt-0 relative z-10 opacity-80 mix-blend-overlay">
               <div className="size-32 rounded-full border-[8px] border-dashed border-white/30 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                 <div className="size-20 rounded-full border-4 border-white/20"></div>
               </div>
            </div>
          </div>

        </div>
      </Section>

      {/* Elegant Roadmap List */}
      <Section id="roadmap" className="relative z-10 border-t border-slate-900/5">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
           
           <div className="lg:w-1/3">
             <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Lộ trình học tập.</h2>
             <p className="mt-4 text-base leading-7 text-slate-600">
               Chương trình được thiết kế trong 10 tuần, mỗi giai đoạn là một cột mốc rõ rệt để mang sản phẩm tới gần hơn với đời thực.
             </p>
             <div className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white/92 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-light text-amber-400">01</div>
                  <div className="text-sm font-medium text-slate-900 uppercase">Sản phẩm thực tế</div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-light text-teal-500">04</div>
                  <div className="text-sm font-medium text-slate-900 uppercase">Giai đoạn học</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-light text-slate-400">10</div>
                  <div className="text-sm font-medium text-slate-900 uppercase">Tuần huấn luyện</div>
                </div>
             </div>
           </div>

           <div className="lg:w-2/3">
             <div className={styles.roadmapList}>
                {roadmap.map((item, index) => (
                  <div key={index} className={`${styles.roadmapItem} ${styles.roadmapCardTight}`}>
                     <span className={styles.roadmapDot}></span>
                     <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-amber-700">{item.tag}</span>
                     <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                     <p className="text-base leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
             </div>
           </div>

        </div>
      </Section>

      {/* CTA Section Reverted to Minimal but styled */}
      <section id="register" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#134e4a_56%,#d97706_100%)] py-24 sm:py-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            
            <div className="absolute inset-0 z-0 opacity-8 mix-blend-color-dodge grayscale pointer-events-none">
              <Image src="/bg_light.png" alt="Card BG" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_30%)]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sẵn sàng để trở thành <br /> Product Builder?</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
                Hãy để AI làm công việc kỹ thuật, còn bạn làm chủ tư duy chiến lược. Tham gia khoá 2025 ngay hôm nay.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-full border border-amber-300 bg-amber-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-200">
                   Đăng ký giữ chỗ
                </a>
                <a href="#" className="group text-sm font-semibold leading-6 text-white">
                  Thư vấn lộ trình <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white/88 px-6 py-8 text-center text-sm font-medium text-slate-500">
         Cung cấp bởi AI4SD Academy © 2025. All rights reserved.
      </footer>
    </main>
  );
}

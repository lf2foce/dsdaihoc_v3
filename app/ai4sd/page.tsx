import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Box,
  Code2,
  Cpu,
  LineChart,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI4SD — Định hình Product Builder Tương lai",
  description: "Trở thành Product Builder bằng AI dành riêng cho sinh viên non-tech.",
};

const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-20 sm:py-28 ${className}`}>
    <div className="mx-auto w-full max-w-[92rem] px-6 lg:px-8 2xl:px-12">{children}</div>
  </section>
);

const features = [
  {
    name: "Dành cho Non-tech",
    description:
      "Tận dụng tư duy kinh doanh, marketing và vận hành. Bạn không cần đi qua lộ trình học lập trình truyền thống để bắt đầu.",
    icon: <Box className="size-5 text-teal-800" />,
  },
  {
    name: "Build First",
    description:
      "Mỗi giai đoạn đều gắn với một đầu ra cụ thể. Học đến đâu, dựng sản phẩm đến đó thay vì học công cụ rời rạc.",
    icon: <Code2 className="size-5 text-teal-800" />,
  },
  {
    name: "Tài sản nghề nghiệp",
    description:
      "Kết thúc khoá học là một MVP hoạt động thật, một bộ case study rõ ràng và portfolio đủ sức thuyết phục nhà tuyển dụng.",
    icon: <LineChart className="size-5 text-teal-800" />,
  },
];

const audience = [
  "Sinh viên kinh tế, quản trị, marketing, tài chính, logistics",
  "Người chưa có nền tảng CNTT hoặc từng ngại code",
  "Sinh viên năm 2–4, người mới tốt nghiệp, người muốn chuyển vai trò",
];

const roadmap = [
  {
    tag: "Tuần 1–2",
    title: "AI Literacy for Business",
    text: "Hiểu LLMs, prompt engineering và cách biến quy trình kinh doanh thủ công thành workflow AI có thể vận hành được.",
  },
  {
    tag: "Tuần 3–6",
    title: "Vibe Coding & Product Creation",
    text: "Thiết kế user flow, dựng MVP với no-code hoặc low-code, kết nối AI API và xây giao diện có thể demo ngay.",
  },
  {
    tag: "Tuần 7–8",
    title: "Deployment & Real Usage",
    text: "Đưa sản phẩm lên online, kết nối dữ liệu thật, chạy user testing và chỉnh lại luồng sử dụng để bớt gãy.",
  },
  {
    tag: "Tuần 9–10",
    title: "Demo & Portfolio",
    text: "Chuẩn hoá case study, trình bày sản phẩm theo format startup pitch và biến đầu ra thành tài sản nghề nghiệp thực tế.",
  },
];

const outcomes = [
  {
    title: "01 MVP hoạt động thật",
    text: "Một ứng dụng số giải quyết bài toán thực tế, có thể chạy online và demo rõ ràng.",
    icon: <Box className="size-8" />,
    tone: "from-white to-teal-50",
    iconClassName: "bg-teal-100 text-teal-900",
  },
  {
    title: "Portfolio đủ chiều sâu",
    text: "Không chỉ có sản phẩm, mà còn có lập luận sản phẩm, user flow và case study để đi xin việc.",
    icon: <Presentation className="size-8" />,
    tone: "from-white to-amber-50",
    iconClassName: "bg-amber-100 text-amber-800",
  },
  {
    title: "Năng lực tự động hoá",
    text: "Biết thiết kế AI workflow và agent cho những tác vụ lặp lại trong marketing, vận hành và tài chính.",
    icon: <Cpu className="size-8" />,
    tone: "from-white to-cyan-50",
    iconClassName: "bg-cyan-100 text-cyan-900",
  },
  {
    title: "Chứng nhận năng lực",
    text: "Chứng nhận AI Product Builder là dấu mốc xác nhận năng lực tạo sản phẩm và triển khai đầu ra thực tế.",
    icon: <ShieldCheck className="size-8" />,
    tone: "from-white to-stone-100",
    iconClassName: "bg-slate-100 text-slate-900",
  },
];

export default function AI4SDPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-teal-900 selection:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.08),_transparent_24%),radial-gradient(circle_at_85%_8%,_rgba(245,158,11,0.08),_transparent_20%),linear-gradient(180deg,_#ffffff_0%,_#f8fbfb_42%,_#ffffff_100%)]" />
      <div className={styles.pageGrid} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[92rem] items-center justify-between px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-2xl bg-teal-950 text-amber-50 shadow-[0_12px_30px_rgba(15,118,110,0.18)]">
              <Cpu className="size-4" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">AI4SD</div>
              <div className="text-sm font-semibold tracking-tight text-slate-950">
                Product Builder Academy
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hidden transition-colors hover:text-teal-900 sm:block">
              Chương trình
            </a>
            <a href="#roadmap" className="hidden transition-colors hover:text-teal-900 sm:block">
              Lộ trình
            </a>
            <a
              href="#register"
              className="inline-flex h-10 items-center justify-center rounded-full border border-teal-900 bg-teal-900 px-5 text-white transition-colors hover:bg-teal-800"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-32 pb-18 sm:pt-40 sm:pb-24">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-16 px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 2xl:px-12">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-teal-100 bg-teal-50/70 px-4 py-2 text-sm font-semibold text-teal-900">
              <span className="inline-flex size-2 rounded-full bg-emerald-500" />
              Tuyển sinh quý 2 2026 đang mở
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-6xl xl:text-7xl">
              Tạo sản phẩm số
              <span className="block text-teal-800">trên nền tư duy kinh doanh.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              AI4SD dành cho sinh viên non-tech muốn đi từ ý tưởng, workflow và insight
              kinh doanh đến một MVP chạy online trong 10 tuần.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#register"
                className="inline-flex items-center justify-center rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                Đăng ký học
              </a>
              <a
                href="#roadmap"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition-colors hover:border-teal-300 hover:text-teal-900"
              >
                Xem lộ trình
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <div className="text-3xl font-semibold text-slate-950">10</div>
                <div className="mt-1 text-sm text-slate-500">tuần từ học đến launch</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <div className="text-3xl font-semibold text-slate-950">01</div>
                <div className="mt-1 text-sm text-slate-500">MVP có thể demo thật</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <div className="text-3xl font-semibold text-slate-950">04</div>
                <div className="mt-1 text-sm text-slate-500">giai đoạn học rõ đầu ra</div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_35px_120px_rgba(15,23,42,0.10)]">
              <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] sm:h-[520px]">
                <Image
                  src="/ai_hero.png"
                  alt="AI Education Concept"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(15,23,42,0.22))]" />
              </div>

              <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/80 bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                  Build • Launch • Pitch
                </div>
                <div className="mt-2 text-base font-semibold text-slate-950">
                  Một lộ trình được đóng gói cho người học kinh doanh muốn ra sản phẩm thật,
                  không mắc kẹt ở phần kỹ thuật.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" className="relative z-10 border-t border-slate-200/80">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Vì sao chương trình này hợp lý
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Trọng tâm không phải học code. Trọng tâm là học cách tạo giá trị.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Chương trình bám vào một chu trình rõ ràng: vấn đề thực, giải pháp khả thi,
              sản phẩm tối thiểu, triển khai, kiểm thử và trình bày đầu ra.
            </p>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Phù hợp với
              </div>
              <div className="mt-5 space-y-4">
                {audience.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                    <span className="mt-2 inline-flex size-2 rounded-full bg-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <dl className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
              >
                <dt className="flex items-center gap-3 text-base font-semibold text-slate-950">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-slate-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="relative z-10 border-t border-slate-200/80">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
            Đầu ra nhìn thấy được
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Thứ bạn nhận được phải dùng được cho sự nghiệp.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Giá trị của khoá học nằm ở năng lực và bằng chứng năng lực, không nằm ở số giờ
            xem bài giảng.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {outcomes.map((item) => (
            <div
              key={item.title}
              className={`rounded-[2rem] border border-slate-200 bg-gradient-to-br ${item.tone} p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-10`}
            >
              <div
                className={`inline-flex size-14 shrink-0 items-center justify-center rounded-2xl ${item.iconClassName}`}
              >
                {item.icon}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="roadmap" className="relative z-10 border-t border-slate-200/80">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Learning Path
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Lộ trình 10 tuần được tách thành 4 chặng rõ ràng.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Mỗi chặng có một nhiệm vụ sản phẩm cụ thể để người học luôn biết mình đang đi
              tới đâu.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="text-4xl font-light text-amber-500">01</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                  sản phẩm thực tế
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="text-4xl font-light text-teal-600">04</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                  giai đoạn học
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="text-4xl font-light text-slate-400">10</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                  tuần huấn luyện
                </div>
              </div>
            </div>
          </div>

          <div className={styles.roadmapList}>
            {roadmap.map((item) => (
              <article
                key={item.title}
                className={`${styles.roadmapItem} py-2 pb-8`}
              >
                <span className={styles.roadmapDot} />
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                  {item.tag}
                </span>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <section
        id="register"
        className="relative z-10 border-t border-slate-200/80 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-[92rem] px-6 lg:px-8 2xl:px-12">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5fbfa_52%,#fff9ef_100%)] p-8 shadow-[0_35px_110px_rgba(15,23,42,0.08)] sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,148,136,0.10),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.12),_transparent_28%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Call for Applications
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Nếu muốn từ người dùng AI thành người tạo sản phẩm bằng AI, đây là điểm bắt
                  đầu hợp lý.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Phiên bản hiện tại của landing page đã sáng và sạch hơn. Để tăng tỉ lệ
                  chuyển đổi thêm nữa, bước tiếp theo nên là gắn form thật, học phí, lịch học
                  và bằng chứng đầu ra từ học viên.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Đăng ký giữ chỗ
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-colors hover:border-teal-300 hover:text-teal-900"
                >
                  Nhận tư vấn lộ trình
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
        Cung cấp bởi AI4SD Academy © 2026. All rights reserved.
      </footer>
    </main>
  );
}

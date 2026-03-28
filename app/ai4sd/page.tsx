import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P1 AI4SD | From Non-Tech to Final Product",
  description:
    "Landing page giới thiệu chương trình Ứng dụng AI tạo sản phẩm số cho người không chuyên CNTT.",
};

type Stat = {
  value: string;
  label: string;
  note: string;
};

type Highlight = {
  title: string;
  description: string;
};

type Phase = {
  week: string;
  title: string;
  goal: string;
  items: string[];
};

type Capstone = {
  track: string;
  product: string;
};

const stats: Stat[] = [
  {
    value: "8-10",
    label: "tuần học",
    note: "Đi từ AI literacy đến demo sản phẩm.",
  },
  {
    value: "01",
    label: "sản phẩm thực tế",
    note: "Mỗi học viên hoàn thiện một MVP có thể chạy được.",
  },
  {
    value: "01",
    label: "portfolio cá nhân",
    note: "Dùng để đi thực tập, xin việc hoặc pitching dự án.",
  },
];

const painPoints: Highlight[] = [
  {
    title: "Không cần nền tảng lập trình",
    description:
      "Chương trình dành cho sinh viên kinh tế, marketing, quản trị, tài chính, logistics và người mới bắt đầu.",
  },
  {
    title: "Biến ý tưởng thành sản phẩm số",
    description:
      "Học viên không chỉ dùng công cụ AI rời rạc mà học cách đóng gói thành một sản phẩm hoàn chỉnh.",
  },
  {
    title: "Học bằng cách xây thật",
    description:
      "Phương pháp Build First giúp người học đi qua vòng đời sản phẩm: vấn đề, giải pháp, MVP, triển khai và đánh giá.",
  },
];

const outcomes: Highlight[] = [
  {
    title: "Tư duy sản phẩm rõ ràng",
    description:
      "Hiểu cách chuyển một nhu cầu cá nhân hoặc ý tưởng kinh doanh thành workflow và trải nghiệm số.",
  },
  {
    title: "Tự làm automation hoặc chatbot cơ bản",
    description:
      "Ứng dụng AI agents, prompt engineering và no-code/low-code theo ngữ cảnh công việc thực tế.",
  },
  {
    title: "Sẵn sàng triển khai online",
    description:
      "Biết cách deploy, nối dữ liệu thật, test người dùng và tối ưu để sản phẩm vận hành được.",
  },
];

const phases: Phase[] = [
  {
    week: "Tuần 1-2",
    title: "AI Literacy for Business",
    goal: "Hiểu AI đang tạo giá trị như thế nào trong công việc kinh doanh và vận hành.",
    items: [
      "Tổng quan AI trong marketing, tài chính và vận hành",
      "Tư duy automation trong doanh nghiệp",
      "Prompt engineering cho nghiệp vụ kinh doanh",
      "Chuyển workflow thủ công thành workflow AI",
    ],
  },
  {
    week: "Tuần 3-6",
    title: "Vibe Coding & Product Creation",
    goal: "Tạo sản phẩm số đầu tiên với AI coding assistant và công cụ low-code/no-code.",
    items: [
      "Thiết kế user flow và MVP",
      "Kết nối API với AI hỗ trợ",
      "Xây dựng giao diện website hoặc dashboard",
      "Thiết kế automation workflow",
    ],
  },
  {
    week: "Tuần 7-8",
    title: "Deployment & Real Usage",
    goal: "Đưa sản phẩm lên môi trường online và kiểm thử trong bối cảnh sử dụng thật.",
    items: [
      "Deploy sản phẩm",
      "Kết nối dữ liệu thật",
      "Kiểm thử người dùng",
      "Tối ưu trải nghiệm sử dụng",
    ],
  },
  {
    week: "Tuần 9-10",
    title: "Demo & Portfolio",
    goal: "Biến sản phẩm thành tài sản nghề nghiệp có thể trình bày, demo và mang đi ứng tuyển.",
    items: [
      "Demo trước hội đồng",
      "Viết case study sản phẩm",
      "Chuẩn hóa portfolio cá nhân",
      "Trình bày theo mô hình startup pitch",
    ],
  },
];

const capstones: Capstone[] = [
  { track: "Marketing", product: "AI content automation" },
  { track: "Tài chính", product: "Dashboard phân tích thị trường" },
  { track: "Quản trị", product: "Chatbot hỗ trợ khách hàng" },
  { track: "Khởi nghiệp", product: "Website AI cho cửa hàng nhỏ" },
  { track: "Cá nhân", product: "AI quản lý chi tiêu" },
];

const stakeholderValue: Highlight[] = [
  {
    title: "Đối với sinh viên",
    description:
      "Có sản phẩm thực tế trước khi tốt nghiệp, tăng năng lực cạnh tranh nghề nghiệp và hiểu AI từ góc nhìn ứng dụng.",
  },
  {
    title: "Đối với nhà trường",
    description:
      "Phù hợp định hướng chuyển đổi số giáo dục đại học, nâng cao năng lực số cho sinh viên và tăng sức hấp dẫn tuyển sinh.",
  },
  {
    title: "Đối với doanh nghiệp",
    description:
      "Tiếp cận nguồn nhân lực có khả năng ứng dụng AI thực tế, giảm chi phí đào tạo lại sau tuyển dụng.",
  },
];

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-black/10 bg-white/75 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#7b4b33] shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

export default function AI4SDPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6efe5] text-[#1f1d1a]">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,_rgba(205,119,61,0.28),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(27,113,106,0.24),_transparent_30%),linear-gradient(180deg,_#fff8ef_0%,_rgba(255,248,239,0.4)_55%,_transparent_100%)]" />

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-18 pt-8 md:px-10 lg:px-12 lg:pb-24 lg:pt-10">
          <div className="flex flex-col gap-5 rounded-[2rem] border border-black/8 bg-white/70 p-5 shadow-[0_24px_80px_rgba(94,60,32,0.08)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <SectionTag>P1 From Non-Tech to Final Product</SectionTag>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl leading-none font-semibold tracking-[-0.05em] text-[#1a1714] sm:text-5xl lg:text-7xl">
                    Chương trình giúp người không chuyên CNTT tạo ra sản phẩm số bằng AI.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-[#5f564d] sm:text-lg">
                    Dành cho sinh viên kinh tế, quản trị, marketing, tài chính,
                    logistics và người mới bắt đầu. Học để xây thật, deploy
                    thật và biến sản phẩm thành portfolio nghề nghiệp.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#lo-trinh"
                    className="inline-flex items-center justify-center rounded-full bg-[#c96d3b] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#b85f30]"
                  >
                    Xem lộ trình 8-10 tuần
                  </a>
                  <a
                    href="#san-pham"
                    className="inline-flex items-center justify-center rounded-full border border-[#1f1d1a]/12 bg-white px-6 py-3 text-sm font-semibold text-[#1f1d1a] transition-colors duration-200 hover:bg-[#f4ede5]"
                  >
                    Xem sản phẩm mẫu
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-black/8 bg-[#fffaf4] p-5"
                  >
                    <div className="text-3xl font-semibold tracking-[-0.05em] text-[#1f1d1a]">
                      {stat.value}
                    </div>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-[#9a5b38]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#685f56]">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-black/8 bg-[#1f4f4d] p-7 text-white shadow-[0_24px_60px_rgba(31,79,77,0.16)] md:p-8">
              <SectionTag>Vấn đề cần giải</SectionTag>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Khoảng cách lớn nhất không nằm ở AI, mà nằm ở cách học để tạo ra giá trị.
              </h2>
              <div className="mt-8 grid gap-4">
                {painPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5"
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(94,60,32,0.08)] md:p-8">
              <SectionTag>Approach</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a1714] sm:text-4xl">
                Build First. Learn Through Creation.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5f564d]">
                Chương trình không dạy AI như một môn lý thuyết thuật toán.
                Người học đi theo chu trình vấn đề thực, thiết kế giải pháp,
                xây sản phẩm, triển khai và đánh giá.
              </p>

              <div className="mt-8 rounded-[1.5rem] bg-[#f8f2ea] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a5b38]">
                  Chu trình học
                </div>
                <div className="mt-4 grid gap-3 text-sm font-medium text-[#2f2a25] sm:grid-cols-5">
                  {[
                    "Vấn đề thực",
                    "Thiết kế giải pháp",
                    "Xây sản phẩm",
                    "Triển khai",
                    "Đánh giá",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="rounded-[1rem] border border-black/6 bg-white px-4 py-4 text-center"
                    >
                      <div className="text-[0.68rem] uppercase tracking-[0.22em] text-[#b06a42]">
                        0{index + 1}
                      </div>
                      <div className="mt-2 leading-5">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {outcomes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-black/8 bg-[#fffaf4] p-5"
                  >
                    <h3 className="text-base font-semibold text-[#1a1714]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#645b52]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="lo-trinh"
            className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(94,60,32,0.08)] md:p-8"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionTag>Lộ trình chương trình</SectionTag>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a1714] sm:text-4xl">
                  4 giai đoạn để đi từ hiểu AI đến trình bày sản phẩm như một startup mini.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#5f564d]">
                Mỗi chặng đều gắn với một đầu ra rõ ràng, để học viên không bị
                mắc kẹt ở mức “biết công cụ” mà tiến tới “làm được sản phẩm”.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {phases.map((phase) => (
                <article
                  key={phase.title}
                  className="rounded-[1.6rem] border border-black/8 bg-[#fffaf4] p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#1f4f4d] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {phase.week}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#a06a49]">
                      Giai đoạn
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#1a1714]">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#60574e]">
                    {phase.goal}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-[#2f2a25]">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#c96d3b]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            id="san-pham"
            className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="rounded-[2rem] border border-black/8 bg-[#f2dfcb] p-7 md:p-8">
              <SectionTag>Đối tượng tham gia</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a1714] sm:text-4xl">
                Thiết kế cho người muốn dùng AI để làm việc thật, không phải để học code từ đầu.
              </h2>
              <div className="mt-6 grid gap-3 text-sm leading-6 text-[#433c35]">
                {[
                  "Sinh viên năm 2-4 hoặc mới tốt nghiệp",
                  "Khối ngành kinh tế, quản trị, marketing, tài chính, logistics",
                  "Người chưa có nền tảng CNTT",
                  "Người muốn ứng dụng AI ngay vào công việc thực tế",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-black/7 bg-white/70 px-4 py-4"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-[#1a1714] p-7 text-white md:p-8">
              <SectionTag>Capstone Examples</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Những sản phẩm học viên có thể hoàn thành sau khóa học.
              </h2>
              <div className="mt-8 grid gap-3">
                {capstones.map((item) => (
                  <div
                    key={item.track}
                    className="grid gap-2 rounded-[1.4rem] border border-white/10 bg-white/6 p-5 sm:grid-cols-[140px_1fr] sm:items-center"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b088]">
                      {item.track}
                    </div>
                    <div className="text-lg font-medium text-white">
                      {item.product}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_60px_rgba(94,60,32,0.08)] md:p-8">
            <div className="max-w-2xl">
              <SectionTag>Giá trị mang lại</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a1714] sm:text-4xl">
                Một chương trình ngắn, nhưng tạo ra giá trị đồng thời cho sinh viên, nhà trường và doanh nghiệp.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {stakeholderValue.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-black/8 bg-[#fffaf4] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1a1714]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#61584f]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] border border-black/8 bg-[#1f4f4d] p-7 text-white md:p-8">
              <SectionTag>Đầu ra & Chứng nhận</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Sau khóa học, học viên không chỉ hiểu AI mà có thể tạo ra sản phẩm bằng AI.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "01 sản phẩm số ứng dụng AI hoạt động thực tế",
                  "01 portfolio cá nhân phục vụ xin việc",
                  "Khả năng tự thiết kế automation hoặc chatbot cơ bản",
                  "Hiểu quy trình phát triển sản phẩm số từ ý tưởng đến triển khai",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/12 bg-white/8 p-4 text-sm leading-6 text-white/84"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/8 bg-[#f8f2ea] p-7 md:p-8">
              <SectionTag>Mở rộng lộ trình</SectionTag>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1a1714] sm:text-4xl">
                P1 là nền tảng để phát triển các track AI chuyên sâu hơn.
              </h2>
              <div className="mt-6 space-y-3">
                {[
                  "P2 — AI Developer Track",
                  "P3 — AI for Marketing & Sales",
                  "P4 — AI Leadership for Managers",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-black/8 bg-white px-4 py-4 text-sm font-medium text-[#2f2a25]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.4rem] border border-[#c96d3b]/20 bg-[#fffaf4] p-5 text-sm leading-6 text-[#5f564d]">
                Chứng nhận đầu ra: <strong>AI Product Builder Certificate</strong>
                , định hướng gắn với khung năng lực số quốc gia và chuẩn kỹ
                năng AI trong giáo dục đại học trong tương lai.
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

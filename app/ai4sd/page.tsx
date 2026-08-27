import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bot,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  Cpu,
  Flame,
  Globe,
  HelpCircle,
  Layers,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import styles from "./page.module.css";
import RegisterForm from "./register-form";
import { loadUniversityListRows } from "../university-data";
import { defaultOgImages } from "../site-config";

export const metadata: Metadata = {
  title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
  description:
    "Chương trình đào tạo thực chiến 10 tuần từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Dành cho người không chuyên CNTT: Tự tay làm chủ AI, dựng chatbot CSKH, dashboard tài chính và ứng dụng số chạy online thực tế.",
  alternates: { canonical: "/ai4sd" },
  openGraph: {
    images: defaultOgImages,
    title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
    description:
      "Chương trình đào tạo thực chiến 10 tuần từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Xây dựng sản phẩm số bằng AI từ con số 0.",
    url: "/ai4sd",
    type: "website",
  },
  twitter: {
    images: defaultOgImages,
    card: "summary_large_image",
    title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
    description:
      "Chương trình đào tạo thực chiến 10 tuần từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Xây dựng sản phẩm số bằng AI từ con số 0.",
  },
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

const studentProjects = [
  {
    id: "chatbot-cskh",
    category: "AI Agent & E-Commerce",
    tagColor: "bg-teal-50 text-teal-800 border-teal-200",
    title: "Trợ lý AI chăm sóc khách hàng và tư vấn bán hàng đa kênh",
    subtitle: "Xử lý hàng nghìn cuộc hội thoại, tự động tra cứu kho tri thức và chốt đơn 24/7",
    problem:
      "Doanh nghiệp tốn nhiều chi phí duy trì nhân sự trực ca đêm, trả lời chậm trễ dẫn đến mất khách hàng tiềm năng, thông tin chính sách sản phẩm thường bị nhầm lẫn.",
    solution:
      "Hệ thống AI Chatbot tích hợp RAG nạp trọn bộ tài liệu sản phẩm và bảng giá, tự động giải đáp bằng ngôn ngữ tự nhiên, phân loại khách hàng tiềm năng và đẩy dữ liệu đơn hàng về CRM/Google Sheets tức thì.",
    impact: [
      "Phản hồi tin nhắn tức thì < 2 giây",
      "Tự động giải quyết > 85% câu hỏi thường gặp",
      "Hoạt động 24/7 không cần nhân sự trực đêm",
    ],
    techStack: ["AI Agent RAG", "Vector Database", "Webhook CRM", "OpenAI / Claude"],
    image: "/chatbot.png",
    alt: "AI Customer Support Chatbot Demonstration",
    accent: "from-teal-500/10 to-emerald-500/5",
  },
  {
    id: "financial-dashboard",
    category: "Data Analytics & Management",
    tagColor: "bg-blue-50 text-blue-800 border-blue-200",
    title: "Bảng điều khiển tài chính và dự báo kinh doanh",
    subtitle: "Trực quan hóa chỉ số tài chính, dự báo dòng tiền và cảnh báo rủi ro bằng AI Insights",
    problem:
      "Dữ liệu doanh thu, chi phí và tồn kho nằm rải rác trên hàng chục file Excel độc lập, mất hàng giờ tổng hợp mỗi tuần và không kịp thời phát hiện rủi ro thâm hụt dòng tiền.",
    solution:
      "Dashboard thời gian thực tự động kết nối nguồn dữ liệu, vẽ biểu đồ trực quan kèm trợ lý AI tóm tắt tình hình tài chính bằng văn bản, tự động cảnh báo khi chi phí vượt ngưỡng an toàn.",
    impact: [
      "Tiết kiệm 15+ giờ làm báo cáo thủ công mỗi tuần",
      "Phân tích xu hướng dòng tiền với độ chuẩn xác cao",
      "Báo cáo tự động bằng ngôn ngữ tự nhiên",
    ],
    techStack: ["Interactive Dashboard", "AI Predictive Insights", "Data Pipeline", "Chart.js"],
    image: "/dashboard.png",
    alt: "AI Financial & Market Dashboard",
    accent: "from-blue-500/10 to-indigo-500/5",
  },
  {
    id: "marketing-engine",
    category: "Marketing & Growth",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "Cỗ máy sáng tạo nội dung và tự động đăng bài đa kênh",
    subtitle: "Từ phân tích xu hướng nóng đến tạo 30 bài viết chuẩn SEO và lịch đăng tự động",
    problem:
      "Đội ngũ marketing nhỏ bị quá tải khi phải liên tục duy trì nội dung trên Facebook, TikTok, LinkedIn và Website; chất lượng nội dung không đồng đều và lịch đăng hay bị đứt quãng.",
    solution:
      "Workflow AI tự động quét từ khóa xu hướng ngành, sinh kịch bản video ngắn và bài viết chuẩn SEO theo đúng giọng điệu thương hiệu (Brand Voice), sau đó tự động lên lịch xuất bản đa nền tảng.",
    impact: [
      "Tăng gấp 5 lần số lượng bài viết chất lượng",
      "Tiết kiệm 80% thời gian sáng tạo & phân phối",
      "Đồng bộ nhận diện thương hiệu trên mọi kênh",
    ],
    techStack: ["Prompt Engineering", "LLM Content Chains", "Notion API", "Multi-channel Auto-post"],
    image: "/ai4sd/mock-landing.svg",
    alt: "AI Content Automation Engine",
    accent: "from-amber-500/10 to-orange-500/5",
  },
  {
    id: "booking-ops",
    category: "Operations & Micro-SaaS",
    tagColor: "bg-purple-50 text-purple-800 border-purple-200",
    title: "Cổng đặt lịch dịch vụ và vận hành doanh nghiệp tự động",
    subtitle: "Web App đặt hẹn thông minh, nhắc lịch qua Zalo/Email và xuất hóa đơn số tự động",
    problem:
      "Các cơ sở dịch vụ (phòng khám, thẩm mỹ, studio, văn phòng luật) thường xuyên bị trùng lịch, khách hàng quên hẹn hoặc hủy sát giờ gây lãng phí khung giờ của chuyên gia.",
    solution:
      "Web App tự phục vụ cho phép khách hàng chủ động chọn dịch vụ và thanh toán cọc online; hệ thống AI tự động phân luồng nhân sự, gửi tin nhắn nhắc hẹn và sinh hóa đơn điện tử tự động.",
    impact: [
      "Giảm tỷ lệ hủy hẹn không báo trước xuống dưới 5%",
      "Tối ưu 100% công suất làm việc của chuyên gia",
      "Tự động hóa hoàn toàn quy trình đặt lịch & thanh toán",
    ],
    techStack: ["Vibe Coding Web App", "Smart Calendar Sync", "Automated Zalo/SMS", "Supabase DB"],
    image: "/ai4sd/mock-chatbot.svg",
    alt: "AI Operations & Smart Booking App",
    accent: "from-purple-500/10 to-pink-500/5",
  },
];

const coreAdvantages = [
  {
    icon: <Sparkles className="size-6 text-teal-700" />,
    title: "Vibe Coding — kỷ nguyên mới",
    description:
      "Không cần học thuộc cú pháp lập trình phức tạp. Bạn sử dụng tư duy logic và ngôn ngữ tự nhiên để chỉ đạo các AI Agent (Cursor, Claude, Lovable) xây dựng toàn bộ ứng dụng từ A đến Z.",
  },
  {
    icon: <Zap className="size-6 text-amber-700" />,
    title: "Học qua làm thật",
    description:
      "Tạm biệt những giờ học lý thuyết trừu tượng. Mỗi tuần học là một chặng đua thực chiến, từng module đều cho ra một tính năng hoạt động thực tế trên trình duyệt.",
  },
  {
    icon: <Globe className="size-6 text-blue-700" />,
    title: "Sản phẩm online với tên miền riêng",
    description:
      "Sản phẩm cuối khóa được triển khai trực tiếp lên môi trường Internet, kết nối cơ sở dữ liệu thật và sẵn sàng cho hàng trăm người dùng truy cập trải nghiệm.",
  },
  {
    icon: <Presentation className="size-6 text-rose-700" />,
    title: "Hồ sơ năng lực chuyên nghiệp",
    description:
      "Đóng gói toàn bộ quá trình giải quyết bài toán thành bộ hồ sơ năng lực tiêu chuẩn quốc tế, giúp bạn gây ấn tượng vượt bậc trong các vòng phỏng vấn tuyển dụng hoặc gọi vốn.",
  },
];

const detailedRoadmap = [
  {
    phase: "Giai đoạn 1",
    tag: "Tuần 1 – 2",
    title: "AI Literacy for Business & kỹ năng viết prompt",
    headline: "Khai phóng tư duy sản phẩm AI & Tự động hóa quy trình nghiệp vụ",
    bullets: [
      "Toàn cảnh ứng dụng Generative AI & AI Agents trong Marketing, Tài chính, Bán hàng và Vận hành.",
      "Làm chủ kỹ nghệ Prompt Engineering nâng cao: Chain-of-Thought, Few-Shot, System Prompting.",
      "Chuyển đổi các quy trình làm việc thủ công (nhập liệu, viết báo cáo, phân loại khách) thành chuỗi tự động hóa thông minh.",
      "Kết quả mốc 1: Bản thiết kế giải pháp (Product Spec) và luồng tự động hóa đầu tiên vận hành mượt mà.",
    ],
    highlight: "Sản phẩm mốc 1: Automation Workflow giải quyết bài toán cá nhân/kinh doanh",
  },
  {
    phase: "Giai đoạn 2",
    tag: "Tuần 3 – 6",
    title: "Vibe Coding & kiến trúc sản phẩm",
    headline: "Tự tay dựng lõi ứng dụng, giao diện tương tác và tích hợp AI Agents",
    bullets: [
      "Thiết kế luồng trải nghiệm người dùng (User Flow) và cấu trúc sản phẩm khả dụng tối thiểu (MVP).",
      "Thực hành Vibe Coding: Sử dụng AI Coding Assistant để tạo giao diện hiện đại, responsive trên mọi thiết bị.",
      "Tích hợp các mô hình AI tiên tiến (OpenAI, Claude) qua API: Xây dựng Chatbot thông minh, phân tích dữ liệu, sinh nội dung theo ngữ cảnh.",
      "Kết nối cơ sở dữ liệu (Database) và lưu trữ dữ liệu người dùng thực tế.",
      "Kết quả mốc 2: Ứng dụng web hoàn chỉnh có giao diện đẹp mắt và tính năng tương tác AI ổn định.",
    ],
    highlight: "Sản phẩm mốc 2: Bản MVP chạy tương tác với cơ sở dữ liệu thật",
  },
  {
    phase: "Giai đoạn 3",
    tag: "Tuần 7 – 8",
    title: "Cloud Deployment & kiểm thử với người dùng thật",
    headline: "Đưa sản phẩm lên Internet, đo lường chỉ số và tối ưu hóa trải nghiệm",
    bullets: [
      "Triển khai sản phẩm lên nền tảng đám mây (Vercel / Cloudflare) với tên miền riêng (Custom Domain).",
      "Thiết lập cơ chế bảo mật API Key, kiểm soát chi phí sử dụng AI và quản lý dữ liệu an toàn.",
      "Tổ chức chiến dịch User Testing: Mời người dùng thật trải nghiệm, thu thập dữ liệu hành vi và phản hồi.",
      "Tối ưu hóa giao diện và tốc độ phản hồi dựa trên số liệu thực tế.",
      "Kết quả mốc 3: Sản phẩm số hoạt động 24/7 trên môi trường Production với phản hồi tích cực từ người dùng.",
    ],
    highlight: "Sản phẩm mốc 3: Live Production Web App sẵn sàng sử dụng",
  },
  {
    phase: "Giai đoạn 4",
    tag: "Tuần 9 – 10",
    title: "Demo Day, hồ sơ năng lực & Startup Pitch",
    headline: "Gây ấn tượng với nhà tuyển dụng bằng sản phẩm bạn tự làm",
    bullets: [
      "Viết Case Study chi tiết theo chuẩn quốc tế: Vấn đề (Problem) – Giải pháp AI (Solution) – Kết quả đo lường (Metrics).",
      "Xây dựng trang Portfolio cá nhân chuyên nghiệp trên GitHub / LinkedIn để đính kèm CV.",
      "Huấn luyện kỹ năng thuyết trình sản phẩm (Product Pitch) theo chuẩn các cuộc thi khởi nghiệp và vòng phỏng vấn cấp cao.",
      "Tham gia ngày hội Demo Day: Trình diễn sản phẩm trước Hội đồng chuyên gia của Viện VNU - AI4SD và đại diện các doanh nghiệp đối tác.",
    ],
    highlight: "Sản phẩm mốc 4: Bộ Portfolio cá nhân + Chứng nhận AI Product Builder",
  },
];

const programOutcomes = [
  {
    title: "01 sản phẩm số vận hành thật",
    description:
      "Không phải bài tập lý thuyết nộp rồi bỏ. Bạn sở hữu một ứng dụng số hoàn chỉnh, chạy 24/7 trên Internet với đường dẫn riêng để bất kỳ ai cũng có thể vào dùng.",
    icon: <Rocket className="size-8 text-teal-700" />,
    bg: "from-teal-50/80 via-white to-teal-100/30",
    border: "border-teal-200/80",
    badge: "Sản phẩm thật",
  },
  {
    title: "Hồ sơ năng lực chuẩn quốc tế",
    description:
      "Bộ tài liệu và Case Study chi tiết miêu tả toàn bộ quá trình từ phát hiện nỗi đau thị trường, thiết kế giải pháp AI đến kết quả đo lường thực tế — thứ giúp bạn vượt trội hoàn toàn khi phỏng vấn xin việc.",
    icon: <Presentation className="size-8 text-amber-700" />,
    bg: "from-amber-50/80 via-white to-amber-100/30",
    border: "border-amber-200/80",
    badge: "Tài sản sự nghiệp",
  },
  {
    title: "Làm chủ tư duy Vibe Coding & AI automation",
    description:
      "Nắm vững phương pháp sử dụng AI thế hệ mới để tự động hóa công việc kinh doanh, tự tin xây dựng thêm nhiều sản phẩm số khác mà không còn bị giới hạn bởi rào cản kỹ thuật.",
    icon: <Brain className="size-8 text-blue-700" />,
    bg: "from-blue-50/80 via-white to-blue-100/30",
    border: "border-blue-200/80",
    badge: "Kỹ năng thời đại",
  },
  {
    title: "Chứng nhận chính thức từ VNU - AI4SD",
    description:
      "Chứng nhận 'AI Product Builder Certificate' do Viện Nghiên cứu ứng dụng Trí tuệ nhân tạo trong phát triển bền vững (Đại học Quốc gia Hà Nội) cấp, ghi nhận trực tiếp sản phẩm bạn đã phát triển.",
    icon: <ShieldCheck className="size-8 text-emerald-700" />,
    bg: "from-emerald-50/80 via-white to-emerald-100/30",
    border: "border-emerald-200/80",
    badge: "Uy tín ĐHQGHN",
  },
];

const faqs = [
  {
    q: "Tôi là sinh viên khối ngành Kinh tế/Marketing/Ngoại ngữ, chưa từng biết gì về lập trình thì có học được không?",
    a: "Hoàn toàn học được và đây chính là đối tượng chương trình hướng tới! Với sự phát triển của Vibe Coding và các AI Agent thông minh hiện nay, bạn không cần phải học cú pháp lập trình phức tạp. Lợi thế lớn nhất của bạn chính là sự thấu hiểu nghiệp vụ, tâm lý khách hàng và tư duy quy trình. Phần kỹ thuật sẽ được hướng dẫn qua các công cụ AI trợ giúp từng bước một.",
  },
  {
    q: "Phương pháp 'Vibe Coding' tại AI4SD có gì khác so với việc tôi tự xem hướng dẫn trên mạng?",
    a: "Tự xem video trên mạng thường chỉ giúp bạn thử nghiệm vài dòng lệnh rời rạc hoặc dùng ChatGPT ở mức cơ bản. Tại AI4SD, bạn được học theo một chu trình phát triển sản phẩm chuẩn (Product Lifecycle): từ khảo sát nỗi đau thị trường, thiết kế giao diện, kết nối cơ sở dữ liệu thật, kiểm soát chi phí API đến triển khai online và bảo vệ sản phẩm trước hội đồng chuyên gia.",
  },
  {
    q: "Tôi cần chuẩn bị laptop hoặc thiết bị như thế nào để tham gia khóa học?",
    a: "Bạn chỉ cần một chiếc laptop văn phòng thông thường (chạy Windows, macOS hoặc Linux) có kết nối Internet ổn định và trình duyệt web hiện đại (Google Chrome, Microsoft Edge, Safari). Toàn bộ quá trình xử lý AI và lưu trữ dữ liệu đều được vận hành trên nền tảng đám mây, không yêu cầu máy tính có card đồ họa đắt tiền.",
  },
  {
    q: "Sản phẩm làm ra sau khóa học thuộc quyền sở hữu của ai? Tôi có thể mang đi kinh doanh không?",
    a: "Sản phẩm 100% thuộc quyền sở hữu trí tuệ của bạn! Bạn hoàn toàn có quyền mang sản phẩm này đi gọi vốn khởi nghiệp, kinh doanh thực tế, làm đồ án tốt nghiệp đại học hoặc đính kèm vào hồ sơ xin học bổng và CV ứng tuyển việc làm.",
  },
  {
    q: "Khóa học được tổ chức theo hình thức nào và lịch học ra sao?",
    a: "Khóa học kết hợp linh hoạt giữa các buổi hướng dẫn thực hành chuyên sâu (Workshop/Live Lab) và các phiên cố vấn trực tiếp 1:1 (Mentoring Hours) với chuyên gia. Lịch học được sắp xếp vào buổi tối hoặc cuối tuần để thuận tiện nhất cho sinh viên và người đang đi làm.",
  },
];

export default async function AI4SDPage() {
  const schools = (await loadUniversityListRows()).map((row) => row.fullName);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-teal-900 selection:text-white">
      {/* Background Decorators */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.08),_transparent_24%),radial-gradient(circle_at_85%_8%,_rgba(245,158,11,0.08),_transparent_20%),linear-gradient(180deg,_#ffffff_0%,_#f8fbfb_42%,_#ffffff_100%)]" />
      <div className={styles.pageGrid} />

      {/* Header Sticky Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 w-full max-w-[92rem] items-center justify-between px-6 lg:px-8 2xl:px-12">
          <Link href="/ai4sd" className="group flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-teal-950 text-amber-50 shadow-[0_12px_30px_rgba(15,118,110,0.22)] transition-transform group-hover:scale-105">
              <Cpu className="size-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                <span>VNU - AI4SD</span>
                <span className="inline-block size-1 rounded-full bg-amber-500" />
                <span className="text-[10px] text-amber-600">ĐHQGHN</span>
              </div>
              <div className="text-sm font-bold tracking-tight text-slate-950">
                AI Product Builder Program
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#about" className="transition-colors hover:text-teal-900">
              Tổng Quan
            </a>
            <a href="#showcase" className="transition-colors hover:text-teal-900">
              Sản Phẩm Mẫu
            </a>
            <a href="#method" className="transition-colors hover:text-teal-900">
              Phương Pháp
            </a>
            <a href="#roadmap" className="transition-colors hover:text-teal-900">
              Lộ Trình 10 Tuần
            </a>
            <a href="#vien" className="transition-colors hover:text-teal-900">
              Về Viện VNU
            </a>
            <a href="#faq" className="transition-colors hover:text-teal-900">
              Hỏi Đáp
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-teal-900 bg-teal-900 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md hover:shadow-teal-900/20 active:scale-95"
            >
              <Sparkles className="size-4 text-amber-300" />
              <span>Đăng Ký Ngay</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-14 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 2xl:px-12">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-950 shadow-sm backdrop-blur">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tuyển sinh Quý 3 2026 · VNU - AI4SD (ĐHQGHN)</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              Đừng chỉ dừng lại ở <span className="text-slate-500 line-through decoration-rose-500 decoration-2">người dùng AI</span>.
              <span className="block mt-2 bg-gradient-to-r from-teal-900 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Hãy trở thành người kiến tạo sản phẩm số.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Khóa thực chiến 10 tuần độc quyền từ <strong className="font-semibold text-slate-900">Viện VNU - AI4SD</strong>. 
              Dành riêng cho sinh viên &amp; nhân sự khối Kinh tế, Marketing, Quản trị: Chuyển hóa ý tưởng thành sản phẩm số hoàn chỉnh, 
              vận hành thực tế trên Internet mà <strong className="font-semibold text-teal-800">không cần nền tảng lập trình</strong>.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#register"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,118,110,0.25)] transition-all hover:bg-teal-800 hover:shadow-teal-900/35 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Đăng Ký Tư Vấn &amp; Giữ Chỗ</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#showcase"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-950"
              >
                <Bot className="size-5 text-teal-700" />
                <span>Xem Sản Phẩm Học Viên</span>
              </a>
            </div>

            {/* 4 Metric Badges */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-teal-900 sm:text-3xl">10 Tuần</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Thực chiến từ con số 0 đến Live Product</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-amber-700 sm:text-3xl">100%</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Học viên có sản phẩm chạy online thực tế</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-blue-800 sm:text-3xl">0 Cần Code</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Làm chủ công nghệ qua Vibe Coding</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-emerald-800 sm:text-3xl">ĐHQGHN</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Chứng nhận chính thức từ Viện VNU-AI4SD</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative z-10">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3.5 shadow-[0_35px_120px_rgba(15,23,42,0.12)]">
              <div className="relative h-[430px] overflow-hidden rounded-[2rem] sm:h-[530px]">
                <Image
                  src="/ai_hero.png"
                  alt="Vibe Coding AI Product Creation"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.45)_100%)]" />
              </div>

              {/* Floating Highlight Cards */}
              <div className="absolute top-8 right-8 rounded-2xl border border-white/80 bg-white/92 px-4 py-2.5 shadow-[0_16px_36px_rgba(15,23,42,0.14)] backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>AI Agent Ready · RAG Active</span>
                </div>
              </div>

              <div className="absolute inset-x-7 bottom-7 rounded-[1.75rem] border border-white/90 bg-white/94 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.16)] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-teal-800">
                    Build · Ship · Pitch
                  </div>
                  <div className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                    Capstone Project
                  </div>
                </div>
                <div className="mt-2 text-base font-semibold text-slate-950 sm:text-lg">
                  Không học lý thuyết suông. Bạn bước vào lớp với một ý tưởng và bước ra với một sản phẩm hoàn chỉnh đang chạy online.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Paradigm Shift (Tại sao đây là thời điểm vàng) */}
      <Section id="about" className="relative z-10 border-t border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Flame className="size-3.5 text-amber-600" />
            Bước Ngoặt Công Nghệ 2026
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Người hiểu bài toán kinh doanh sẽ làm chủ cuộc chơi AI.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Trước đây, bạn cần cả một đội ngũ lập trình viên đắt đỏ và hàng tháng trời để hiện thực hóa một ứng dụng. 
            Với <strong className="text-slate-900 font-semibold">Generative AI &amp; Vibe Coding</strong>, 
            rào cản kỹ thuật đã được xóa bỏ. Lợi thế lớn nhất giờ đây thuộc về người có <strong>tư duy sản phẩm và thấu hiểu nghiệp vụ</strong>.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Lối mòn cũ */}
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_15px_45px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold text-sm">
                CŨ
              </div>
              <h3 className="text-xl font-bold text-slate-800">Dùng AI rời rạc &amp; Học code theo lối cũ</h3>
            </div>
            <ul className="mt-7 space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">✕</span>
                <span>Chỉ biết gõ vài câu lệnh ChatGPT cơ bản, copy-paste rời rạc, không tạo ra tài sản số nào có giá trị.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">✕</span>
                <span>Mất 2-3 năm chật vật học cú pháp lập trình, thuật toán phức tạp nhưng không thể tự dựng nổi một sản phẩm hoàn chỉnh.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">✕</span>
                <span>CV xin việc nhạt nhòa, chỉ liệt kê &quot;biết sử dụng Office/ChatGPT&quot; mà không có sản phẩm thực tế chứng minh năng lực.</span>
              </li>
            </ul>
          </div>

          {/* Đột phá cùng AI4SD */}
          <div className="relative rounded-[2.25rem] border-2 border-teal-700 bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 p-8 sm:p-10 text-white shadow-[0_25px_70px_rgba(15,118,110,0.25)]">
            <div className="absolute top-6 right-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950 uppercase tracking-wider">
              Đột phá
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-800 text-amber-300 font-bold text-sm">
                MỚI
              </div>
              <h3 className="text-xl font-bold text-amber-50">Làm chủ Vibe Coding &amp; Kiến tạo sản phẩm cùng AI4SD</h3>
            </div>
            <ul className="mt-7 space-y-4 text-slate-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold">✓</span>
                <span>Tận dụng thế mạnh thấu hiểu nghiệp vụ Kinh tế, Marketing, Quản trị để chỉ đạo AI Agents xây dựng sản phẩm theo ý muốn.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold">✓</span>
                <span>Tự tay xây dựng và triển khai Chatbot CSKH, Dashboard tài chính, Hệ thống Marketing Automation chỉ trong vài tuần.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold">✓</span>
                <span>Sở hữu Portfolio có Live Product URL và Case Study ấn tượng, ghi điểm tuyệt đối trong mắt nhà tuyển dụng và đối tác.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Core Advantages */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreAdvantages.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Showcase Dự Án Thực Tế Của Học Viên (Capstone Showcase) */}
      <Section id="showcase" className="relative z-10 border-t border-slate-200/80">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
            <Bot className="size-3.5 text-teal-700" />
            Student Capstone Showcase
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Những sản phẩm đột phá bạn sẽ tự tay làm ra.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Không phải bài tập nộp rồi cất vào ngăn kéo. Đây là những giải pháp số giải quyết bài toán thật, 
            sẵn sàng đưa vào vận hành kinh doanh hoặc trình diễn trong buổi phỏng vấn.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {studentProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
            >
              {/* Card Top Preview */}
              <div className={`relative h-64 sm:h-72 w-full overflow-hidden border-b border-slate-100 bg-gradient-to-br ${project.accent} p-6 flex items-center justify-center`}>
                <div className="relative h-full w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="absolute top-5 left-5">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${project.tagColor}`}>
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-5 right-5">
                  <span className="flex size-7 items-center justify-center rounded-full bg-white/90 text-xs font-extrabold text-slate-800 shadow-sm">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-teal-900 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {project.subtitle}
                </p>

                {/* Problem & Solution block */}
                <div className="mt-6 space-y-4 text-sm leading-6">
                  <div className="rounded-2xl bg-rose-50/60 p-4 border border-rose-100">
                    <span className="font-bold text-rose-900 block mb-1">Nỗi đau bài toán:</span>
                    <span className="text-slate-700">{project.problem}</span>
                  </div>
                  <div className="rounded-2xl bg-teal-50/60 p-4 border border-teal-100">
                    <span className="font-bold text-teal-900 block mb-1">Giải pháp AI của học viên:</span>
                    <span className="text-slate-700">{project.solution}</span>
                  </div>
                </div>

                {/* Measurable impact */}
                <div className="mt-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Chỉ số tác động thực tế
                  </div>
                  <div className="space-y-2">
                    {project.impact.map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-base text-slate-600">
            Bạn có ý tưởng cho lĩnh vực riêng của mình? 
            <a href="#register" className="ml-2 font-bold text-teal-800 underline underline-offset-4 hover:text-teal-900">
              Đăng ký để được cố vấn 1:1 biến ý tưởng thành sản phẩm →
            </a>
          </p>
        </div>
      </Section>

      {/* Section: Phương Pháp Đào Tạo Đột Phá */}
      <Section id="method" className="relative z-10 border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
              <Zap className="size-3.5 text-teal-700" />
              Phương pháp sư phạm khác biệt
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              &quot;Build First – Learn Through Creation&quot;
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Chúng tôi không bắt bạn phải học thuộc lòng thuật toán hay cú pháp lập trình hàn lâm. 
              Chương trình đưa kiến thức và công cụ vào đúng thời điểm bạn cần để xây dựng từng tính năng của sản phẩm.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-900 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Bắt đầu từ vấn đề thực tế (Problem-First)</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Lựa chọn một bài toán kinh doanh, marketing hoặc nhu cầu cá nhân có thật để giải quyết.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Vibe Coding &amp; Dựng MVP siêu tốc</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Dùng ngôn ngữ tự nhiên kết hợp AI Agents để biến ý tưởng thành ứng dụng có giao diện và tính năng trong vài ngày.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-900 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Triển khai thực tế (Real Deployment)</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Đưa sản phẩm lên môi trường Internet, kết nối dữ liệu thật và mời người dùng trải nghiệm thực tế.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3.5 shadow-[0_30px_90px_rgba(15,23,42,0.10)]">
              <div className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/ai_methodology.png"
                  alt="AI4SD Methodology"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Lộ Trình 10 Tuần Thực Chiến */}
      <Section id="roadmap" className="relative z-10 border-t border-slate-200/80">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Layers className="size-3.5 text-amber-600" />
              Lộ Trình Tăng Tốc 10 Tuần
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              4 Giai đoạn bài bản, từ số 0 tới Live Product.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Mỗi tuần bạn luôn biết rõ mình đang học gì, làm gì và cuối tuần sẽ bàn giao được sản phẩm gì.
            </p>

            <div className="mt-9 space-y-4">
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Không có bài kiểm tra lý thuyết — Đánh giá 100% dựa trên sản phẩm thực tế.</span>
              </div>
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Mentor 1:1 kèm cặp sát sao từng học viên trong suốt quá trình xây dựng sản phẩm.</span>
              </div>
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Sở hữu trọn vẹn mã nguồn, tên miền và quyền thương mại hóa sau khóa học.</span>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-teal-200 bg-teal-50/70 p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Khung Năng Lực Quốc Gia
              </div>
              <p className="mt-2 text-sm text-teal-950 font-medium">
                Chương trình được thiết kế chuẩn hóa theo định hướng Chuyển đổi số giáo dục đại học và Khung năng lực số quốc tế.
              </p>
            </div>
          </div>

          <div className={styles.roadmapList}>
            {detailedRoadmap.map((item) => (
              <article key={item.title} className={`${styles.roadmapItem} pb-10`}>
                <span className={styles.roadmapDot} />
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900">
                    {item.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.phase}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-teal-800">
                  {item.headline}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 border border-slate-200/80">
                  <Sparkles className="size-3.5 text-amber-600" />
                  <span>{item.highlight}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Section: Quyền Lợi & Giá Trị Đầu Ra (Outcomes) */}
      <Section className="relative z-10 border-t border-slate-200/80 bg-slate-50/60">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
            <Award className="size-3.5 text-teal-700" />
            Tài Sản Bạn Mang Về
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Đầu ra thực chất, khẳng định vị thế nghề nghiệp.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Kết thúc 10 tuần, bạn không chỉ có kiến thức mà nắm giữ những tài sản cụ thể để bứt phá trong kỷ nguyên AI.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {programOutcomes.map((item) => (
            <div
              key={item.title}
              className={`rounded-[2.25rem] border ${item.border} bg-gradient-to-br ${item.bg} p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-all hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100">
                  {item.icon}
                </div>
                <span className="rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
                  {item.badge}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: Về Viện VNU - AI4SD (Đại học Quốc gia Hà Nội) */}
      <Section id="vien" className="relative z-10 border-t border-slate-200/80">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
              <Building2 className="size-3.5 text-teal-700" />
              Đơn Vị Chủ Trì Đào Tạo
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Viện Nghiên cứu ứng dụng Trí tuệ nhân tạo trong phát triển bền vững (VNU - AI4SD)
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              VNU - AI4SD là đơn vị nghiên cứu và đào tạo trực thuộc <strong className="text-slate-900 font-semibold">Đại học Quốc gia Hà Nội</strong>, 
              thành lập theo Quyết định số 2418/QĐ-ĐHQGHN ngày 15/05/2025, đặt trụ sở tại Đô thị Đại học Hòa Lạc.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Với sứ mệnh tiên phong chuyển giao công nghệ AI và mô hình hợp tác <strong className="text-slate-900 font-semibold">&quot;Ba Nhà: Nhà trường – Nhà khoa học – Doanh nghiệp&quot;</strong>, 
              Viện xây dựng chương trình AI Product Builder nhằm chuẩn hóa năng lực AI thực chiến cho thế hệ trẻ Việt Nam.
            </p>

            <Link
              href="/truong/vien-nghien-cuu-ung-dung-tri-tue-nhan-tao-trong-phat-trien-ben-vung-vnu-ai4sd"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-teal-800 bg-teal-50/50 px-6 py-3 text-sm font-bold text-teal-900 transition-colors hover:bg-teal-100/70"
            >
              <span>Xem hồ sơ công nhận đầy đủ của Viện</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { label: "Cơ Quan Chủ Quản", value: "Đại học Quốc gia Hà Nội (VNU)" },
              { label: "Ngày Thành Lập", value: "15/05/2025 · QĐ 2418/QĐ-ĐHQGHN" },
              { label: "Trụ Sở Chính", value: "Đô thị ĐHQGHN, Hòa Lạc, Hà Nội" },
              {
                label: "Hướng Ứng Dụng",
                value: "AI cho Giáo dục, Kinh tế số, Doanh nghiệp & Xã hội",
              },
              {
                label: "Mô Hình Đào Tạo",
                value: "Build First · Vibe Coding · Chuyển giao sản phẩm",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)]"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  {item.label}
                </div>
                <div className="mt-1.5 text-base font-semibold text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Section: Câu Hỏi Thường Gặp (FAQs) */}
      <Section id="faq" className="relative z-10 border-t border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-800">
            <HelpCircle className="size-3.5 text-teal-700" />
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Câu hỏi thường gặp về chương trình AI4SD
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-950 sm:text-xl flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-900 text-sm font-extrabold">Q</span>
                <span>{faq.q}</span>
              </h3>
              <p className="mt-4 pl-10 text-base leading-7 text-slate-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section: CTA & Form Đăng Ký (Register) */}
      <section
        id="register"
        className="relative z-10 border-t border-slate-200/80 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-[92rem] px-6 lg:px-8 2xl:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#f0fdfa_50%,#fffbeb_100%)] p-8 shadow-[0_35px_120px_rgba(15,118,110,0.12)] sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,148,136,0.15),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.15),_transparent_30%)]" />
            
            <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-950">
                  <Sparkles className="size-3.5 text-amber-500" />
                  Tuyển Sinh Khóa Mới · Số Lượng Giới Hạn
                </div>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Sẵn sàng chuyển hóa từ người dùng AI thành <span className="text-teal-800">AI Product Builder</span>?
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Đừng để cơ hội kỷ nguyên AI trôi qua. Để lại thông tin ngay hôm nay để nhận trọn bộ <strong>Lộ trình chi tiết</strong>, 
                  <strong>chính sách học bổng</strong> và được <strong>cố vấn 1:1 xác định ý tưởng sản phẩm</strong> trước ngày khai giảng.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Ưu tiên xét tuyển sinh viên khối ngành Kinh tế, Marketing, Quản trị</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Cam kết 100% học viên hoàn thành sản phẩm số chạy online thực tế</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Cấp chứng nhận chính thức từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội)</span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <RegisterForm schools={schools} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-5xl space-y-2">
          <p className="font-semibold text-slate-700">
            Viện Nghiên cứu ứng dụng Trí tuệ nhân tạo trong phát triển bền vững (VNU - AI4SD)
          </p>
          <p>
            Đại học Quốc gia Hà Nội — Đô thị ĐHQGHN, Hòa Lạc, Hà Nội © 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

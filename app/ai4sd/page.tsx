import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bot,
  Box,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Gift,
  Globe,
  GraduationCap,
  HelpCircle,
  Laptop,
  Layers,
  LineChart,
  MessageSquare,
  Palette,
  Percent,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import styles from "./page.module.css";
import RegisterForm from "./register-form";
import FinancialDashboardPreview from "./dashboard-preview";
import { loadUniversityListRows } from "../university-data";
import { defaultOgImages } from "../site-config";

export const metadata: Metadata = {
  title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
  description:
    "Chương trình đào tạo thực chiến 8 buổi từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Dành cho người không chuyên CNTT: Tự tay làm chủ AI & Google Gemini, dựng chatbot CSKH, dashboard tài chính và ứng dụng số chạy online thực tế.",
  alternates: { canonical: "/ai4sd" },
  openGraph: {
    images: defaultOgImages,
    title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
    description:
      "Chương trình đào tạo thực chiến 8 buổi từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Xây dựng sản phẩm số bằng AI từ con số 0.",
    url: "/ai4sd",
    type: "website",
  },
  twitter: {
    images: defaultOgImages,
    card: "summary_large_image",
    title: "AI4SD — Khóa Học Vibe Coding & Tạo Sản Phẩm Số Bằng AI | VNU - ĐHQGHN",
    description:
      "Chương trình đào tạo thực chiến 8 buổi từ Viện VNU - AI4SD (Đại học Quốc gia Hà Nội). Xây dựng sản phẩm số bằng AI từ con số 0.",
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

const featuredLiveApps = [
  {
    id: "kidstorylab",
    name: "KidStoryLab",
    domain: "kidstorylab.com",
    url: "https://kidstorylab.com",
    category: "EdTech · Generative Story & Voice AI",
    tagColor: "bg-amber-100 text-amber-950 border-amber-300",
    title: "KidStoryLab.com — Nền Tảng AI Sáng Tạo Truyện Thiếu Nhi & Audio Cá Nhân Hóa",
    description:
      "Ứng dụng AI thế hệ mới cho phép phụ huynh, giáo viên và tác giả biến mọi ý tưởng giáo dục thành cuốn truyện tranh sinh động kèm giọng đọc Audio sống động theo từng độ tuổi.",
    highlights: [
      "Sinh cốt truyện nhân văn & phân cảnh tranh vẽ tự động qua Google Gemini",
      "Tích hợp giọng đọc AI đa ngôn ngữ truyền cảm hứng cho trẻ nhỏ",
      "Sản phẩm số hoạt động thực tế với hàng nghìn lượt trải nghiệm trực tuyến",
    ],
    techStack: ["Google Gemini 2.0", "AI Voice Synthesis", "Next.js App Router", "Cloudflare"],
    icon: <Sparkles className="size-6 text-amber-600" />,
    gradient: "from-amber-500/15 via-orange-500/10 to-rose-500/5",
    border: "border-amber-200/90",
  },
  {
    id: "thietkeai",
    name: "ThietKeAI",
    domain: "thietkeai.com",
    url: "https://thietkeai.com",
    category: "Creative AI · Marketing & Visual Design",
    tagColor: "bg-teal-100 text-teal-950 border-teal-300",
    title: "ThietKeAI.com — Trợ Lý AI Thiết Kế Hình Ảnh & Banner Marketing Tự Động",
    description:
      "Nền tảng tự động hóa khâu sáng tạo hình ảnh quảng cáo, banner mạng xã hội và phối cảnh không gian dành riêng cho Marketer, chủ shop online và người làm sáng tạo nội dung.",
    highlights: [
      "Tạo banner quảng cáo đa kích thước theo chuẩn nhận diện thương hiệu chỉ trong vài giây",
      "Bóc tách vật thể sản phẩm và tạo bối cảnh 3D/AI studio chuyên nghiệp",
      "Tiết kiệm 85% chi phí thiết kế đồ họa và đẩy nhanh tiến độ ra mắt chiến dịch",
    ],
    techStack: ["Google Gemini Vision", "Generative Image AI", "Prompt Architect", "Supabase DB"],
    icon: <Palette className="size-6 text-teal-600" />,
    gradient: "from-teal-500/15 via-emerald-500/10 to-blue-500/5",
    border: "border-teal-200/90",
  },
];

const studentProjects = [
  {
    id: "chatbot-cskh",
    category: "AI Agent & E-Commerce",
    tagColor: "bg-teal-50 text-teal-800 border-teal-200",
    title: "Trợ Lý AI CSKH & Tư Vấn Bán Hàng Đa Kênh Tự Động",
    subtitle: "Xử lý hàng nghìn cuộc hội thoại, tự động tra cứu kho tri thức và chốt đơn 24/7",
    problem:
      "Doanh nghiệp tốn nhiều chi phí duy trì nhân sự trực ca đêm, trả lời chậm trễ dẫn đến mất khách hàng tiềm năng, thông tin chính sách sản phẩm thường bị nhầm lẫn.",
    solution:
      "Hệ thống AI Chatbot tích hợp RAG nạp trọn bộ tài liệu sản phẩm và bảng giá, kết nối Google Gemini tự động giải đáp bằng ngôn ngữ tự nhiên, phân loại khách hàng tiềm năng và đẩy dữ liệu đơn hàng về CRM/Google Sheets tức thì.",
    impact: [
      "Phản hồi tin nhắn tức thì < 2 giây với Google Gemini",
      "Tự động giải quyết > 85% câu hỏi thường gặp",
      "Hoạt động 24/7 không cần nhân sự trực đêm",
    ],
    techStack: ["AI Agent RAG", "Vector Database", "Webhook CRM", "Google Gemini"],
    image: "/chatbot.png",
    alt: "AI Customer Support Chatbot Demonstration",
    accent: "from-teal-500/10 to-emerald-500/5",
  },
  {
    id: "financial-dashboard",
    category: "Data Analytics & Management",
    tagColor: "bg-blue-50 text-blue-800 border-blue-200",
    title: "Bảng Điều Khiển Tài Chính & Dự Báo Kinh Doanh Thông Minh",
    subtitle: "Trực quan hóa chỉ số tài chính, dự báo dòng tiền và cảnh báo rủi ro bằng AI Insights",
    problem:
      "Dữ liệu doanh thu, chi phí và tồn kho nằm rải rác trên hàng chục file Excel độc lập, mất hàng giờ tổng hợp mỗi tuần và không kịp thời phát hiện rủi ro thâm hụt dòng tiền.",
    solution:
      "Dashboard thời gian thực tự động kết nối nguồn dữ liệu, vẽ biểu đồ trực quan kèm trợ lý Google Gemini tóm tắt tình hình tài chính bằng văn bản, tự động cảnh báo khi chi phí vượt ngưỡng an toàn.",
    impact: [
      "Tiết kiệm 15+ giờ làm báo cáo thủ công mỗi tuần",
      "Phân tích xu hướng dòng tiền với độ chuẩn xác cao",
      "Báo cáo tự động bằng ngôn ngữ tự nhiên",
    ],
    techStack: ["Interactive Dashboard", "AI Predictive Insights", "Data Pipeline", "Google Gemini"],
    image: "/dashboard.png",
    alt: "AI Financial & Market Dashboard",
    accent: "from-blue-500/10 to-indigo-500/5",
    hasLiveDemo: true,
  },
  {
    id: "marketing-engine",
    category: "Marketing & Growth",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "Cỗ Máy Sáng Tạo Nội Dung & Tự Động Đăng Bài Đa Kênh",
    subtitle: "Từ phân tích xu hướng nóng đến tạo 30 bài viết chuẩn SEO và lịch đăng tự động",
    problem:
      "Đội ngũ marketing nhỏ bị quá tải khi phải liên tục duy trì nội dung trên Facebook, TikTok, LinkedIn và Website; chất lượng nội dung không đồng đều và lịch đăng hay bị đứt quãng.",
    solution:
      "Workflow AI tự động quét từ khóa xu hướng ngành, sử dụng Google Gemini sinh kịch bản video ngắn và bài viết chuẩn SEO theo đúng giọng điệu thương hiệu (Brand Voice), sau đó tự động lên lịch xuất bản đa nền tảng.",
    impact: [
      "Tăng gấp 5 lần số lượng bài viết chất lượng",
      "Tiết kiệm 80% thời gian sáng tạo & phân phối",
      "Đồng bộ nhận diện thương hiệu trên mọi kênh",
    ],
    techStack: ["Prompt Engineering", "Google Gemini Pipeline", "Notion API", "Multi-channel Auto-post"],
    image: "/ai4sd/mock-landing.svg",
    alt: "AI Content Automation Engine",
    accent: "from-amber-500/10 to-orange-500/5",
  },
  {
    id: "booking-ops",
    category: "Operations & Micro-SaaS",
    tagColor: "bg-purple-50 text-purple-800 border-purple-200",
    title: "Cổng Đặt Lịch Dịch Vụ & Vận Hành Doanh Nghiệp Tự Động",
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
    title: "Vibe Coding — Kỷ Nguyên Mới",
    description:
      "Không cần học thuộc cú pháp lập trình phức tạp. Bạn sử dụng tư duy logic và ngôn ngữ tự nhiên để chỉ đạo các AI Agent (Cursor, Google Gemini, Lovable) xây dựng toàn bộ ứng dụng từ A đến Z.",
  },
  {
    icon: <Zap className="size-6 text-amber-700" />,
    title: "Học Qua Làm Thật (Build First)",
    description:
      "Tạm biệt những giờ học lý thuyết trừu tượng. Mỗi buổi học là một chặng đua thực chiến, từng module đều cho ra một tính năng hoạt động thực tế trên trình duyệt.",
  },
  {
    icon: <Globe className="size-6 text-blue-700" />,
    title: "Sản Phẩm Online Với Domain Riêng",
    description:
      "Sản phẩm cuối khóa được triển khai trực tiếp lên môi trường Internet, kết nối cơ sở dữ liệu thật và sẵn sàng cho hàng trăm người dùng truy cập trải nghiệm.",
  },
  {
    icon: <Presentation className="size-6 text-rose-700" />,
    title: "Portfolio & Case Study Chuyên Nghiệp",
    description:
      "Đóng gói toàn bộ quá trình giải quyết bài toán thành bộ hồ sơ năng lực tiêu chuẩn quốc tế, giúp bạn gây ấn tượng vượt bậc trong các vòng phỏng vấn tuyển dụng hoặc gọi vốn.",
  },
];

const detailedRoadmap = [
  {
    phase: "Module 1",
    tag: "Buổi 1 – 2",
    title: "AI Literacy for Business & Kỹ Nghệ Prompt với Google Gemini",
    headline: "Khai phóng tư duy sản phẩm AI & Tự động hóa quy trình nghiệp vụ",
    bullets: [
      "Toàn cảnh ứng dụng Generative AI & AI Agents trong Marketing, Tài chính, Bán hàng và Vận hành.",
      "Làm chủ kỹ nghệ Prompt Engineering nâng cao với Google Gemini: Chain-of-Thought, System Prompting.",
      "Chuyển đổi các quy trình làm việc thủ công (nhập liệu, viết báo cáo, phân loại khách) thành chuỗi tự động hóa thông minh.",
      "Kết quả mốc 1: Bản thiết kế giải pháp (Product Spec) và luồng tự động hóa đầu tiên vận hành mượt mà.",
    ],
    highlight: "Sản phẩm mốc 1: Automation Workflow giải quyết bài toán cá nhân/kinh doanh",
  },
  {
    phase: "Module 2",
    tag: "Buổi 3 – 4",
    title: "Vibe Coding & Kiến Trúc Giao Diện Ứng Dụng MVP",
    headline: "Tự tay dựng lõi ứng dụng, giao diện tương tác và kết nối API Google Gemini",
    bullets: [
      "Thiết kế luồng trải nghiệm người dùng (User Flow) và cấu trúc sản phẩm khả dụng tối thiểu (MVP).",
      "Thực hành Vibe Coding: Sử dụng AI Coding Assistant để tạo giao diện hiện đại, responsive trên mọi thiết bị.",
      "Tích hợp API Google Gemini: Xây dựng Chatbot thông minh, phân tích dữ liệu, sinh nội dung theo ngữ cảnh.",
      "Kết nối cơ sở dữ liệu thời gian thực (Supabase / Postgres) và lưu trữ dữ liệu người dùng.",
      "Kết quả mốc 2: Ứng dụng web hoàn chỉnh có giao diện đẹp mắt và tính năng tương tác AI ổn định.",
    ],
    highlight: "Sản phẩm mốc 2: Bản MVP chạy tương tác với cơ sở dữ liệu thật",
  },
  {
    phase: "Module 3",
    tag: "Buổi 5 – 6",
    title: "Cloud Deployment, Bảo Mật & Kiểm Thử Người Dùng Thật",
    headline: "Đưa sản phẩm lên Internet, đo lường chỉ số và tối ưu hóa trải nghiệm",
    bullets: [
      "Triển khai sản phẩm lên nền tảng đám mây (Vercel / Cloudflare) với tên miền riêng (Custom Domain).",
      "Thiết lập cơ chế bảo mật API Key Google Gemini, kiểm soát chi phí token và quản lý dữ liệu an toàn.",
      "Tổ chức chiến dịch User Testing: Mời người dùng thật trải nghiệm, thu thập dữ liệu hành vi và phản hồi.",
      "Tối ưu hóa giao diện và tốc độ phản hồi dựa trên số liệu thực tế.",
      "Kết quả mốc 3: Sản phẩm số hoạt động 24/7 trên môi trường Production với phản hồi tích cực từ người dùng.",
    ],
    highlight: "Sản phẩm mốc 3: Live Production Web App sẵn sàng sử dụng",
  },
  {
    phase: "Module 4",
    tag: "Buổi 7 – 8",
    title: "Demo Day, Portfolio Chuẩn Quốc Tế & Startup Pitch",
    headline: "Biến sản phẩm thành đòn bẩy sự nghiệp và tấm vé vàng tuyển dụng",
    bullets: [
      "Viết Case Study chi tiết theo chuẩn quốc tế: Vấn đề (Problem) – Giải pháp AI (Solution) – Kết quả đo lường (Metrics).",
      "Xây dựng trang Portfolio cá nhân chuyên nghiệp trên GitHub / LinkedIn để đính kèm CV.",
      "Huấn luyện kỹ năng thuyết trình sản phẩm (Product Pitch) theo chuẩn các cuộc thi khởi nghiệp và vòng phỏng vấn cấp cao.",
      "Tham gia ngày hội Demo Day: Trình diễn sản phẩm trước Hội đồng chuyên gia của Viện VNU - AI4SD và đại diện các doanh nghiệp đối tác.",
    ],
    highlight: "Sản phẩm mốc 4: Bộ Portfolio cá nhân + Chứng nhận AI Product Builder",
  },
];

const pricingPackages = [
  {
    id: "group-5",
    name: "Gói Nhóm 5+ Bạn (Squad Team)",
    badge: "🔥 ƯU ĐÃI ĐẶC BIỆT — GIẢM NGAY 30%",
    badgeColor: "bg-amber-400 text-slate-950 font-black",
    popular: true,
    price: "4.480.000",
    originalPrice: "6.400.000",
    period: "₫ / học viên (8 buổi)",
    totalSavings: "Tiết kiệm 9.600.000 ₫ cho cả nhóm 5 bạn",
    description:
      "Dành riêng cho nhóm bạn bè, sinh viên cùng lớp, team khởi nghiệp muốn cùng học và làm đồ án sản phẩm lớn.",
    features: [
      "Giảm trực tiếp 30% học phí trọn gói",
      "Tự do đề xuất project / sản phẩm số theo ý tưởng nhóm",
      "Tài trợ gói Google Gemini API Credits cho cả nhóm thực hành",
      "Hình thức học linh hoạt: Có cả lớp Online & Offline",
      "Sĩ số lớp tối đa 20 học viên — Đảm bảo chất lượng đào tạo",
      "Cấp chứng nhận chính thức ĐHQGHN cho từng thành viên",
    ],
    ctaText: "Đăng Ký Nhóm 5 Người (-30%)",
    accent: "border-teal-700 bg-gradient-to-b from-teal-950/90 via-slate-900 to-slate-950 text-white shadow-[0_25px_80px_rgba(15,118,110,0.3)]",
  },
  {
    id: "group-3",
    name: "Gói Nhóm 2–4 Bạn (Team 3)",
    badge: "TIẾT KIỆM 15%",
    badgeColor: "bg-blue-100 text-blue-900",
    popular: false,
    price: "5.440.000",
    originalPrice: "6.400.000",
    period: "₫ / học viên (8 buổi)",
    totalSavings: "Tiết kiệm gần 1.000.000 ₫ mỗi bạn",
    description: "Phù hợp cho nhóm 2–4 bạn muốn đồng hành, chia sẻ kiến thức và hỗ trợ lẫn nhau.",
    features: [
      "Giảm 15% học phí cho tất cả thành viên",
      "Tự do đề xuất bài toán & sản phẩm nhóm muốn thực hiện",
      "Hình thức học linh hoạt: Lớp Online & Offline",
      "Tặng bộ Template Vibe Coding & Google Gemini Prompt Library",
      "Sĩ số lớp tối đa 20 học viên",
      "Chứng nhận chính thức từ Viện VNU - AI4SD",
    ],
    ctaText: "Đăng Ký Nhóm 2-4 Bạn",
    accent: "border-slate-200 bg-white text-slate-900 shadow-sm",
  },
  {
    id: "individual",
    name: "Gói Cá Nhân (Standard)",
    badge: "HỌC PHÍ TIÊU CHUẨN",
    badgeColor: "bg-teal-100 text-teal-900",
    popular: false,
    price: "6.400.000",
    originalPrice: "",
    period: "₫ / học viên (8 buổi)",
    totalSavings: "Trọn gói 8 buổi thực chiến chuyên sâu",
    description: "Dành cho cá nhân muốn tự tay xây dựng 01 sản phẩm số độc lập theo ý tưởng riêng.",
    features: [
      "Trọn vẹn 8 buổi thực chiến chuyên sâu từ số 0",
      "Học viên được tự do đề xuất sản phẩm mong muốn thực hiện",
      "Tài trợ tài khoản Google Gemini API thực hành",
      "Hình thức học linh hoạt: Lựa chọn Online hoặc Offline",
      "Sĩ số lớp tối đa 20 học viên",
      "Chứng nhận AI Product Builder từ ĐHQGHN",
    ],
    ctaText: "Đăng Ký Cá Nhân",
    accent: "border-slate-200 bg-white text-slate-900 shadow-sm",
  },
];

const programOutcomes = [
  {
    title: "01 Sản Phẩm Số Vận Hành Thật (Live Product)",
    description:
      "Không phải bài tập lý thuyết nộp rồi bỏ. Bạn sở hữu một ứng dụng số hoàn chỉnh, chạy 24/7 trên Internet với đường dẫn riêng để bất kỳ ai cũng có thể vào dùng.",
    icon: <Rocket className="size-8 text-teal-700" />,
    bg: "from-teal-50/80 via-white to-teal-100/30",
    border: "border-teal-200/80",
    badge: "Sản phẩm thật",
  },
  {
    title: "Hồ Sơ Năng Lực (Portfolio) Chuẩn Quốc Tế",
    description:
      "Bộ tài liệu và Case Study chi tiết miêu tả toàn bộ quá trình từ phát hiện nỗi đau thị trường, thiết kế giải pháp AI đến kết quả đo lường thực tế — thứ giúp bạn vượt trội hoàn toàn khi phỏng vấn xin việc.",
    icon: <Presentation className="size-8 text-amber-700" />,
    bg: "from-amber-50/80 via-white to-amber-100/30",
    border: "border-amber-200/80",
    badge: "Tài sản sự nghiệp",
  },
  {
    title: "Làm Chủ Tư Duy Vibe Coding & Google Gemini",
    description:
      "Nắm vững phương pháp sử dụng AI thế hệ mới để tự động hóa công việc kinh doanh, tự tin xây dựng thêm nhiều sản phẩm số khác mà không còn bị giới hạn bởi rào cản kỹ thuật.",
    icon: <Brain className="size-8 text-blue-700" />,
    bg: "from-blue-50/80 via-white to-blue-100/30",
    border: "border-blue-200/80",
    badge: "Kỹ năng thời đại",
  },
  {
    title: "Chứng Nhận Chính Thức Từ VNU - AI4SD",
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
    q: "Lịch học của khóa diễn ra vào những ngày nào và khi nào khai giảng?",
    a: "Khóa học dự kiến khai giảng vào ngày 22/09. Lịch học 8 buổi được bố trí linh hoạt tập trung vào 2 ngày cuối tuần (Thứ Bảy & Chủ Nhật) và các buổi tối trong tuần (19:30 – 21:30) để sinh viên và người đi làm dễ dàng sắp xếp tham gia. Sau khi để lại thông tin, ban tư vấn sẽ gửi lại bạn trọn bộ lịch học chi tiết và đề cương từng buổi.",
  },
  {
    q: "Chính sách giảm 30% cho nhóm 5 người áp dụng như thế nào?",
    a: "Khi bạn và 4 bạn khác (tổng từ 5 người trở lên) cùng đăng ký một đợt tuyển sinh, học phí của mỗi bạn sẽ được giảm trực tiếp 30% (từ 6.400.000 ₫ chỉ còn 4.480.000 ₫/học viên). Cả nhóm tiết kiệm tới 9.600.000 ₫, được tài trợ thêm gói tài khoản Google Gemini API và được sắp xếp mentor cố vấn riêng cho đồ án nhóm.",
  },
  {
    q: "Khóa học diễn ra trong bao nhiêu buổi và sĩ số lớp là bao nhiêu?",
    a: "Khóa học được tổ chức gói gọn trong 8 buổi thực chiến chuyên sâu (gồm 4 modules học và làm sản phẩm liên tục, kết hợp các giờ Lab thực hành và cố vấn 1:1). Để đảm bảo chất lượng giảng dạy và 100% học viên hoàn thành sản phẩm, sĩ số mỗi lớp được giới hạn tối đa 20 học viên.",
  },
  {
    q: "Các ứng dụng như KidStoryLab.com hay ThietKeAI.com được xây dựng như thế nào?",
    a: "Đây là các sản phẩm AI thực tế do đội ngũ học viên và giảng viên tại AI4SD xây dựng bằng phương pháp Vibe Coding kết hợp Google Gemini. Bạn hoàn toàn có quyền và khả năng tự tay tạo ra những nền tảng tương tự (có người dùng thật, kết nối cơ sở dữ liệu và thanh toán trực tuyến) sau khi hoàn thành khóa học 8 buổi.",
  },
  {
    q: "Tôi là sinh viên khối ngành Kinh tế/Marketing/Ngoại ngữ, chưa từng biết gì về lập trình thì có học được không?",
    a: "Hoàn toàn học được và đây chính là đối tượng chương trình hướng tới! Với sự phát triển của Vibe Coding và mô hình Google Gemini thông minh hiện nay, bạn không cần phải học cú pháp lập trình phức tạp. Lợi thế lớn nhất của bạn chính là sự thấu hiểu nghiệp vụ, tâm lý khách hàng và tư duy quy trình. Phần kỹ thuật sẽ được hướng dẫn qua AI trợ giúp từng bước một.",
  },
  {
    q: "Sản phẩm làm ra sau khóa học thuộc quyền sở hữu của ai? Tôi có thể mang đi kinh doanh không?",
    a: "Sản phẩm 100% thuộc quyền sở hữu trí tuệ của bạn! Bạn hoàn toàn có quyền mang sản phẩm này đi gọi vốn khởi nghiệp, kinh doanh thực tế, làm đồ án tốt nghiệp đại học hoặc đính kèm vào hồ sơ xin học bổng và CV ứng tuyển việc làm.",
  },
  {
    q: "Tôi cần chuẩn bị laptop hoặc thiết bị như thế nào để tham gia khóa học?",
    a: "Bạn chỉ cần một chiếc laptop văn phòng thông thường (chạy Windows, macOS hoặc Linux) có kết nối Internet ổn định và trình duyệt web hiện đại. Toàn bộ quá trình xử lý AI và lưu trữ dữ liệu đều được vận hành trên nền tảng đám mây, không yêu cầu máy tính cấu hình cao.",
  },
];

export default async function AI4SDPage() {
  const schools = (await loadUniversityListRows()).map((row) => row.fullName);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-teal-900 selection:text-white">
      {/* Background Decorators */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,_rgba(13,148,136,0.12),_transparent_28%),radial-gradient(circle_at_88%_14%,_rgba(245,158,11,0.10),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f7fbfb_35%,_#ffffff_100%)]" />
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

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#about" className="transition-colors hover:text-teal-900">
              Tổng Quan
            </a>
            <a href="#featured-apps" className="transition-colors hover:text-teal-900 font-bold text-amber-900 flex items-center gap-1">
              <Sparkles className="size-3.5 text-amber-600" />
              <span>Ứng Dụng Nổi Bật</span>
            </a>
            <a href="#showcase" className="transition-colors hover:text-teal-900">
              Sản Phẩm Mẫu
            </a>
            <a href="#live-dashboard" className="transition-colors hover:text-teal-900 flex items-center gap-1 text-teal-800 font-bold">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Demo Dashboard</span>
            </a>
            <a href="#method" className="transition-colors hover:text-teal-900">
              Phương Pháp
            </a>
            <a href="#roadmap" className="transition-colors hover:text-teal-900">
              Lộ Trình 8 Buổi
            </a>
            <a href="#pricing" className="transition-colors hover:text-teal-900 flex items-center gap-1 font-bold text-amber-800">
              <Percent className="size-3.5 text-amber-600" />
              <span>Bảng Giá (-30%)</span>
            </a>
            <a href="#faq" className="transition-colors hover:text-teal-900">
              Hỏi Đáp
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              <Users className="size-3.5 text-amber-700" />
              <span>Nhóm 5 giảm 30%</span>
            </a>

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
              <span>Tuyển Sinh Đợt Mới · Khai Giảng Dự Kiến 22/09 · Sĩ Số Tối Đa 20 Học Viên</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              Đừng chỉ dừng lại ở <span className="text-slate-500 line-through decoration-rose-500 decoration-2">người dùng AI</span>.
              <span className="block mt-2 bg-gradient-to-r from-teal-900 via-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Hãy trở thành người kiến tạo sản phẩm số.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Khóa thực chiến 8 buổi độc quyền từ <strong className="font-semibold text-slate-900">Viện VNU - AI4SD</strong> kết hợp sức mạnh <strong className="font-semibold text-teal-800">Google Gemini &amp; Vibe Coding</strong>. 
              Lịch học linh hoạt <strong className="text-slate-900 font-semibold">2 ngày cuối tuần &amp; các buổi tối trong tuần</strong>, khai giảng dự kiến ngày <strong className="text-amber-900 font-bold">22/09</strong>. 
              Dành riêng cho sinh viên &amp; nhân sự khối Kinh tế, Marketing, Quản trị: Chuyển hóa ý tưởng thành sản phẩm số hoàn chỉnh như <strong className="text-amber-900 font-bold">KidStoryLab.com</strong> hay <strong className="text-teal-900 font-bold">ThietKeAI.com</strong> mà <strong className="font-semibold text-teal-800">không cần nền tảng lập trình</strong>.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#pricing"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-teal-900 bg-teal-900 px-8 py-4 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,118,110,0.25)] transition-all hover:bg-teal-800 hover:shadow-teal-900/35 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Xem Bảng Giá &amp; Ưu Đãi Nhóm (-30%)</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#featured-apps"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-950"
              >
                <Sparkles className="size-5 text-amber-600" />
                <span>Xem Ứng Dụng Nổi Bật</span>
              </a>
            </div>

            {/* 4 Metric Badges */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-teal-900 sm:text-3xl">8 Buổi</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Thực chiến từ con số 0 đến Live Product</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-amber-700 sm:text-3xl">22/09</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Khai giảng dự kiến · Cuối tuần &amp; Buổi tối</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-blue-800 sm:text-3xl">Giảm 30%</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Ưu đãi nhóm từ 5 bạn đăng ký chung</div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur">
                <div className="text-2xl font-extrabold text-emerald-800 sm:text-3xl">Tối Đa 20</div>
                <div className="mt-1 text-xs font-medium text-slate-500">Sĩ số giới hạn để kèm cặp 1:1</div>
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
                  <span>Google Gemini Powered · Live Apps</span>
                </div>
              </div>

              <div className="absolute inset-x-7 bottom-7 rounded-[1.75rem] border border-white/90 bg-white/94 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.16)] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-teal-800">
                    Build · Ship · Scale
                  </div>
                  <div className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                    8 Buổi Thực Chiến
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

      {/* Section: Ứng Dụng AI Nổi Bật Đang Vận Hành Thực Tế (Featured Live Apps) */}
      <Section id="featured-apps" className="relative z-10 border-t border-slate-200/80 bg-gradient-to-b from-teal-950 via-slate-950 to-slate-900 text-white py-24">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Sparkles className="size-4 text-amber-400" />
            <span>Featured Live Production Ecosystem</span>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Các sản phẩm AI thực tế đang vận hành online.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 max-w-2xl mx-auto">
            Đây là những nền tảng AI được kiến tạo bởi học viên và đội ngũ Viện VNU - AI4SD, 
            kết nối dữ liệu thật, chạy độc lập trên Internet và thu hút hàng nghìn lượt người dùng mỗi tháng.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {featuredLiveApps.map((app) => (
            <div
              key={app.id}
              className={`relative flex flex-col justify-between rounded-[2.75rem] border ${app.border} bg-gradient-to-br ${app.gradient} p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-inner">
                      {app.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block">{app.category}</span>
                      <span className="text-lg font-black text-white font-mono">{app.domain}</span>
                    </div>
                  </div>

                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-950 hover:bg-amber-300 px-4 py-2 text-xs font-bold shadow-md transition-all group"
                  >
                    <span>Truy cập web</span>
                    <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl leading-snug">
                  {app.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {app.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 space-y-3 rounded-2xl bg-black/30 border border-white/10 p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                    Điểm đột phá của sản phẩm:
                  </span>
                  {app.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                {app.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            ✦ Cùng hàng chục ứng dụng số khác đang được học viên liên tục hoàn thiện và đưa lên mạng Internet...
          </p>
        </div>
      </Section>

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
            Với <strong className="text-slate-900 font-semibold">Google Gemini &amp; Vibe Coding</strong>, 
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
                <span>Chỉ biết gõ vài câu lệnh prompt cơ bản, copy-paste rời rạc, không tạo ra tài sản số nào có giá trị.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">✕</span>
                <span>Mất 2-3 năm chật vật học cú pháp lập trình, thuật toán phức tạp nhưng không thể tự dựng nổi một sản phẩm hoàn chỉnh.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">✕</span>
                <span>CV xin việc nhạt nhòa, chỉ liệt kê &quot;biết sử dụng Office/AI cơ bản&quot; mà không có sản phẩm thực tế chứng minh năng lực.</span>
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
                <span>Tận dụng thế mạnh thấu hiểu nghiệp vụ Kinh tế, Marketing, Quản trị để chỉ đạo Google Gemini xây dựng sản phẩm theo ý muốn.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-500/30 text-teal-300 text-xs font-bold">✓</span>
                <span>Tự tay xây dựng và triển khai Chatbot CSKH, Dashboard tài chính, Hệ thống Marketing Automation chỉ trong 8 buổi.</span>
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
            Các dòng sản phẩm đột phá bạn sẽ tự tay làm ra.
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
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-teal-900 transition-colors">
                    {project.title}
                  </h3>
                  {project.hasLiveDemo && (
                    <a
                      href="#live-dashboard"
                      className="shrink-0 inline-flex items-center gap-1 rounded-full bg-teal-100 hover:bg-teal-200 px-3 py-1 text-xs font-bold text-teal-950 transition-colors"
                    >
                      <span>Thử Live Demo</span>
                      <ArrowRight className="size-3" />
                    </a>
                  )}
                </div>

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
      </Section>

      {/* Section: Live Interactive Financial Dashboard */}
      <Section id="live-dashboard" className="relative z-10 border-t border-slate-200/80 bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
            <BarChart3 className="size-3.5 text-teal-400" />
            Trải Nghiệm Live Demo Trực Tiếp
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Bảng Điều Khiển Tài Chính Thông Minh (AI Dashboard)
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400 max-w-2xl mx-auto">
            Học viên tự tay xây dựng hệ thống này trong khóa học 8 buổi bằng Vibe Coding: Tự động gom dữ liệu doanh thu, 
            trực quan hóa biểu đồ và nhúng Google Gemini phân tích tài chính theo thời gian thực.
          </p>
        </div>

        {/* The Live Interactive Dashboard Component */}
        <div className="mx-auto max-w-7xl">
          <FinancialDashboardPreview isStandalone={false} />
        </div>
      </Section>

      {/* Section: Phương Pháp Đào Tạo Đột Phá */}
      <Section id="method" className="relative z-10 border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
              <Zap className="size-3.5 text-teal-700" />
              Phương Pháp Sư Phạm Khác Biệt
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
                    Dùng ngôn ngữ tự nhiên kết hợp Google Gemini để biến ý tưởng thành ứng dụng có giao diện và tính năng trong vài ngày.
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

      {/* Section: Lộ Trình 8 Buổi Thực Chiến */}
      <Section id="roadmap" className="relative z-10 border-t border-slate-200/80">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Layers className="size-3.5 text-amber-600" />
              Lộ Trình Tăng Tốc 8 Buổi
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              4 Module tinh gọn, từ số 0 tới Live Product.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Mỗi buổi học bạn luôn biết rõ mình đang học gì, làm gì và kết thúc khóa học sẽ cầm về được sản phẩm gì.
            </p>

            <div className="mt-9 space-y-4">
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Không có bài kiểm tra lý thuyết — Đánh giá 100% dựa trên sản phẩm thực tế.</span>
              </div>
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Học viên được tự do đề xuất bài toán, ý tưởng hoặc sản phẩm muốn xây dựng.</span>
              </div>
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Hình thức học linh hoạt: Có cả lớp Trực tiếp (Offline) và Trực tuyến (Online).</span>
              </div>
              <div className="flex gap-3 text-base font-medium text-slate-700">
                <CheckCircle2 className="size-5 text-teal-700 shrink-0 mt-0.5" />
                <span>Lịch học tiện lợi: Thứ 7, Chủ Nhật &amp; Buổi tối (19:30 – 21:30) · Khai giảng 22/09.</span>
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

      {/* Section: Cấu Trúc Giá & Ưu Đãi Nhóm 5 Người Giảm 30% */}
      <Section id="pricing" className="relative z-10 border-t border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-950 shadow-sm">
            <Gift className="size-4 text-amber-600" />
            <span>Chính Sách Học Phí &amp; Ưu Đãi Đặc Quyền</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Càng đông càng vui — <span className="text-teal-800">Nhóm 5 người giảm ngay 30%</span>.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Học tập và kiến tạo sản phẩm theo đội ngũ giúp bạn tăng 300% hiệu suất, chia sẻ tài nguyên Google Gemini API 
            và nhận mức học phí ưu đãi tốt nhất từ Viện VNU - AI4SD. Sĩ số giới hạn 20 học viên/lớp.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-[2.5rem] border p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 ${pkg.accent}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md">
                  Gợi Ý Khuyên Dùng ⭐
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold sm:text-5xl tracking-tight text-teal-400">
                    {pkg.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    {pkg.period}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs">
                  {pkg.originalPrice && (
                    <span className="text-slate-400 line-through">
                      Gốc: {pkg.originalPrice} ₫
                    </span>
                  )}
                  <span className="font-bold text-amber-400">
                    ({pkg.totalSavings})
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-3.5 text-sm leading-6 border-t border-slate-700/50 pt-6">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check className="size-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6">
                <a
                  href="#register"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all shadow-md active:scale-98 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/20"
                      : "bg-teal-900 text-white hover:bg-teal-800 shadow-teal-900/20"
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 mx-auto max-w-4xl rounded-3xl border border-teal-200 bg-teal-50/70 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-900 text-amber-300 font-bold">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-950 text-base">Cam kết 100% có sản phẩm số chạy online sau 8 buổi</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Nếu học viên tham gia đầy đủ 8 buổi mà không dựng được sản phẩm số hoàn chỉnh, Viện hỗ trợ hướng dẫn trực tiếp hoặc học lại miễn phí đợt tiếp theo.
              </p>
            </div>
          </div>
          <a
            href="#register"
            className="mt-4 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 rounded-full bg-teal-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800 transition-colors"
          >
            <span>Giữ chỗ ngay (Tối đa 20)</span>
            <ArrowRight className="size-3.5" />
          </a>
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
            Kết thúc 8 buổi thực chiến, bạn không chỉ có kiến thức mà nắm giữ những tài sản cụ thể để bứt phá trong kỷ nguyên AI.
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
                value: "8 Buổi Thực Chiến · Google Gemini · Sĩ số ≤ 20",
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
                  Khai Giảng Dự Kiến 22/09 · Lịch Học Cuối Tuần &amp; Buổi Tối
                </div>

                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Sẵn sàng chuyển hóa từ người dùng AI thành <span className="text-teal-800">AI Product Builder</span>?
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Khóa học khai giảng ngày <strong>22/09</strong>, lịch học linh hoạt vào <strong>2 ngày cuối tuần &amp; các buổi tối</strong>. 
                  Để lại thông tin ngay hôm nay để nhận <strong>trọn bộ Đề cương &amp; Chi tiết chương trình 8 buổi</strong>, 
                  nhận <strong>ưu đãi nhóm 5 người giảm 30%</strong> (chỉ 4.480.000 ₫/bạn) và được <strong>cố vấn 1:1 xác định ý tưởng sản phẩm</strong> trước khi vào lớp.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Lịch học linh hoạt: Thứ 7, Chủ Nhật &amp; Buổi tối (19:30 – 21:30)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Ưu đãi giảm ngay 30% khi đăng ký theo nhóm từ 5 bạn</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <Check className="size-5 text-emerald-600 shrink-0" />
                    <span>Sĩ số tối đa 20 học viên — Cam kết 100% hoàn thành sản phẩm số chạy online</span>
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

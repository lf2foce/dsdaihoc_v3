"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  MapPin, 
  ArrowRight,
  Users,
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import styles from "./genv.module.css";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "#home" },
    { name: "Về chúng tôi", href: "#about" },
    { name: "Dịch vụ", href: "#services" },
    { name: "Đối tác", href: "#partners" },
    { name: "Liên hệ", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-extrabold text-2xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">G</div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-heading font-extrabold tracking-tighter text-primary">GENV</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Solutions</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Button className={cn(styles.btnGradient, "rounded-full px-7 font-bold")}>
            Bắt đầu dự án
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-border overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button className={cn(styles.btnGradient, "w-full rounded-xl py-6 text-lg")}>Bắt đầu ngay</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section id="home" className={cn("relative min-h-screen flex items-center pt-20 overflow-hidden", styles.bgMesh)}>
      <div className={cn(styles.sectionContainer, "grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full")}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-8"
          >
            <Zap size={14} className="fill-primary" />
            <span>Giải pháp doanh nghiệp thế hệ mới</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold leading-[0.95] mb-8">
            Kiến tạo <span className={styles.textGradient}>Tương lai</span> <br />
            Số hóa cùng <span className="text-primary">Genv</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Chúng tôi đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số, tối ưu hóa quy trình và bứt phá doanh thu bằng công nghệ đột phá.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <Button size="lg" className={cn(styles.btnGradient, "rounded-full px-10 py-7 text-lg font-bold gap-3 group")}>
              Khám phá dịch vụ <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg font-bold border-2 hover:bg-muted transition-all">
              Về Genv
            </Button>
          </div>
          
          <div className="mt-16 flex items-center gap-8 border-t border-border pt-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, zIndex: 10 }}
                  className="w-12 h-12 rounded-full border-4 border-white bg-muted overflow-hidden shadow-md cursor-pointer"
                >
                  <img src={`https://picsum.photos/seed/avatar${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Award key={i} size={16} className="fill-current" />)}
              </div>
              <p className="text-sm font-bold text-foreground">Tin dùng bởi 1,000+ lãnh đạo</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.1)] border-[12px] border-white/50 backdrop-blur-sm">
            <img 
              src="/genv_hero_professional.png"
              alt="Innovation" 
              className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Stat Card */}
          <motion.div 
            style={{ y: y2 }}
            className={cn(styles.glassPanel, "absolute -top-12 -right-12 p-8 rounded-3xl z-20 w-64")}
          >
            <div className="flex items-center gap-5 mb-4">
              <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-primary">+85%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tăng trưởng</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-secondary" 
              />
            </div>
          </motion.div>
          
          {/* Floating AI badge */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={cn(styles.glassPanel, "absolute -bottom-8 -left-16 p-6 rounded-2xl z-20 flex items-center gap-4")}
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">AI</div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">UX</div>
            </div>
            <p className="text-sm font-bold">Tối ưu hóa bởi Genv AI</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      <div className={cn(styles.sectionContainer, "grid lg:grid-cols-2 gap-24 items-center")}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
            <img 
              src="https://picsum.photos/seed/team/800/800" 
              alt="Our Team" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-[10px] border-white">
            <span className="text-5xl font-extrabold">12+</span>
            <span className="text-xs font-bold uppercase tracking-widest">Năm kinh nghiệm</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
          <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-8 leading-tight">
            Chúng tôi định nghĩa lại <br />
            <span className="text-primary">Tiêu chuẩn</span> ngành
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Genv không chỉ là một công ty công nghệ. Chúng tôi là tập hợp của những chuyên gia đam mê sáng tạo, luôn tìm kiếm những cách thức mới để giải quyết các vấn đề phức tạp của doanh nghiệp.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            {[
              { icon: <Target className="text-primary" />, title: "Tầm nhìn", desc: "Dẫn đầu kỷ nguyên số" },
              { icon: <Award className="text-secondary" />, title: "Chất lượng", desc: "Cam kết 100% hài lòng" },
              { icon: <Users className="text-blue-500" />, title: "Con người", desc: "Đội ngũ tinh hoa" },
              { icon: <ShieldCheck className="text-green-500" />, title: "Bảo mật", desc: "An toàn tuyệt đối" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button size="lg" className="rounded-full px-10 font-bold group">
            Tìm hiểu thêm <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Chuyển đổi số",
      desc: "Tư vấn và triển khai hệ thống quản trị doanh nghiệp thông minh, tự động hóa quy trình.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: "Giải pháp AI",
      desc: "Tích hợp trí tuệ nhân tạo vào vận hành, phân tích dữ liệu và dự báo xu hướng thị trường.",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      title: "Trải nghiệm Khách hàng",
      desc: "Thiết kế hành trình khách hàng tối ưu, tăng tỷ lệ chuyển đổi và lòng trung thành.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-400"
    },
    {
      title: "An ninh Mạng",
      desc: "Bảo vệ tài sản số của doanh nghiệp với các giải pháp bảo mật đa lớp tiên tiến nhất.",
      icon: <ShieldCheck className="w-8 h-8" />,
      gradient: "from-rose-500 to-orange-400"
    }
  ];

  return (
    <section id="services" className={cn(styles.bgMesh, "w-full relative")}>
      <div className={cn(styles.sectionContainer)}>
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6"
          >
            Dịch vụ chuyên nghiệp
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-heading font-extrabold mb-8"
          >
            Giải pháp <span className={styles.textGradient}>Đột phá</span> cho Doanh nghiệp
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Chúng tôi cung cấp hệ sinh thái dịch vụ đa dạng, được thiết kế riêng để giải quyết những thách thức đặc thù của từng doanh nghiệp.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={cn(styles.glassPanel, "h-full rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white/90 relative overflow-hidden")}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-[5rem] transition-all duration-500 group-hover:opacity-10 group-hover:scale-110`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.desc}
                </p>
                
                <Button variant="ghost" className="p-0 hover:bg-transparent text-primary font-bold group/btn">
                  Xem chi tiết <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  return (
    <section id="partners" className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-[0.4em] mb-16">Được tin tưởng bởi các tập đoàn hàng đầu</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {["Google", "Microsoft", "Amazon", "Apple", "Meta", "Samsung"].map((name) => (
            <div key={name} className="text-4xl font-heading font-black tracking-tighter text-foreground/80 hover:text-primary transition-colors cursor-default">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className={cn(styles.sectionContainer, "relative overflow-hidden block")}>
      <div className="absolute top-0 left-0 w-full h-full bg-primary rounded-[4rem] z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center text-white">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-8 leading-[0.95]">
            Sẵn sàng để <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Bứt phá?</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-md">
            Hãy để Genv giúp bạn hiện thực hóa những ý tưởng táo bạo nhất. Liên hệ ngay hôm nay để nhận tư vấn miễn phí.
          </p>
          
          <div className="space-y-10">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                <MapPin size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Trụ sở chính</p>
                <p className="text-xl font-bold">Bitexco Financial Tower, Quận 1, HCM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                <Mail size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Email hỗ trợ</p>
                <p className="text-xl font-bold">hello@genv.solutions</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-10 md:p-12 rounded-[3rem] text-foreground shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-8">Gửi yêu cầu tư vấn</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Họ và tên</label>
                <Input placeholder="Nguyễn Văn A" className="h-14 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                <Input type="email" placeholder="example@genv.vn" className="h-14 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dịch vụ quan tâm</label>
              <Input placeholder="Chọn dịch vụ của bạn" className="h-14 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nội dung tin nhắn</label>
              <Textarea placeholder="Mô tả ngắn gọn nhu cầu của bạn..." className="min-h-[120px] rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary p-4" />
            </div>
            <Button className={cn(styles.btnGradient, "w-full py-8 rounded-2xl text-xl font-bold")}>
              Gửi yêu cầu ngay
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-extrabold text-xl">G</div>
              <span className="text-2xl font-heading font-extrabold tracking-tighter text-primary">GENV</span>
            </a>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Tiên phong trong các giải pháp công nghệ hiện đại, giúp doanh nghiệp bứt phá mọi giới hạn.
            </p>
            <div className="flex gap-5">
              {["FB", "TW", "LN", "IG"].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-xs text-foreground/50">Khám phá</h4>
            <ul className="space-y-5 text-lg font-medium text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Trang chủ</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Về chúng tôi</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Dịch vụ</a></li>
              <li><a href="#partners" className="hover:text-primary transition-colors">Đối tác</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-xs text-foreground/50">Dịch vụ</h4>
            <ul className="space-y-5 text-lg font-medium text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Chuyển đổi số</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Giải pháp AI</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">UX/UI Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cloud Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-xs text-foreground/50">Kết nối</h4>
            <p className="text-muted-foreground mb-6">Đăng ký nhận bản tin công nghệ hàng tuần.</p>
            <div className="relative">
              <Input placeholder="Email của bạn" className="h-14 rounded-2xl pr-14 bg-muted/50 border-none" />
              <button className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} GENV SOLUTIONS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function GenvClient() {
  return (
    <div className={cn(styles.page, "min-h-screen")}>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <AboutUs />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

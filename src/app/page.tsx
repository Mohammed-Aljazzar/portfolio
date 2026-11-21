"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { Project } from "@/lib/types";
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/common/ScrollReveal";
import { TypewriterText } from "@/components/common/TypewriterText";
import {
  Layers, Server, Layout, Palette, ArrowRight, ArrowLeft,
  Sparkles, Github, CheckCircle2, Calendar, Users, Award,
  GraduationCap, ExternalLink, ChevronRight, ChevronLeft,
  Mail, Copy, Check, MapPin, Briefcase, Terminal, ShieldCheck,
  Cpu, Compass, Code2, Flame, Send, X, Clock, HelpCircle, CheckCircle,
  Lightbulb, Rocket, Shield, Eye, Download, Linkedin, AppWindow, Cable,
} from "lucide-react";

// Animations
const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function HomePage() {
  const { language, t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSkillTab, setActiveSkillTab] = useState<"erp" | "backend" | "frontend" | "uiux">("erp");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const config = initialData.config;
  const pillars = initialData.pillars;
  const skills = initialData.skills;
  const featuredProject = (initialData.projects.find((p) => p.isFeatured) || initialData.projects[0]) as any;
  const selectedProjects = initialData.projects
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .slice(0, 6) as any[];

  const typewriterPhrases = language === "ar" ? [
    "مهندس أنظمة ERP معتمد رسمياً من Odoo S.A.",
    "مطور تطبيقات Frappe Framework و ERPNext المؤسسية",
    "مهندس واجهات خلفية بـ Python و Django و REST APIs",
    "مهندس فرونت إند وتطبيقات Next.js و React الحديثة",
    "مصمم واجهات وتجربة المستخدم (UI/UX) في فيجما",
    "مدرب تقني وموجه لأكثر من 1,500 مهندس ومطور",
  ] : [
    "Official Odoo S.A. Certified ERP Developer",
    "Frappe Framework & ERPNext Enterprise Specialist",
    "Python, Django & High-Throughput RESTful APIs",
    "Modern Next.js & React Full-Stack Engineer",
    "UI/UX Product Designer & Figma Design Systems",
    "Technical Mentor to 1,500+ Next-Gen Developers",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email || "m.i.aljazzar19@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const pillarIcons: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    Server: <Server className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    Layout: <Layout className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    Palette: <Palette className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
  };

  // Telemetry gauge percentages for skills (Gouda Nasrallah style)
  const skillGauges: Record<string, number> = {
    "Odoo (Official Odoo S.A. Certified)": 98,
    "نظام أودو (معتمد رسمياً)": 98,
    "Frappe Framework": 96,
    "إطار عمل فريبه (Frappe Framework)": 96,
    "ERPNext": 95,
    "نظام ERPNext المؤسسي": 95,
    "Custom Modules & DocTypes": 96,
    "تطوير الموديولات المخصصة (Custom Modules)": 96,
    "Python": 98,
    "لغة بايثون (Python)": 98,
    "Django Framework": 95,
    "إطار عمل جانغو (Django)": 95,
    "Django REST Framework (APIs)": 96,
    "واجهات برمجية (Django REST Framework)": 96,
    "PostgreSQL": 92,
    "قواعد بيانات PostgreSQL": 92,
    "Docker Containerization": 88,
    "الحاويات والنشر بـ Docker": 88,
    "React.js": 94,
    "مكتبة React.js": 94,
    "Next.js (App Router & SSR)": 95,
    "إطار عمل Next.js (App Router)": 95,
    "TypeScript": 90,
    "لغة TypeScript": 90,
    "Tailwind CSS": 98,
    "تصميم واجهات Tailwind CSS": 98,
    "Native RTL/LTR Bidirectional Architecture": 98,
    "هندسة الواجهات ثنائية الاتجاه (RTL/LTR)": 98,
    "Figma (Auto Layout, Tokens, Components)": 95,
    "برنامج فيجما (Figma)": 95,
    "Design Systems & Atomic Architecture": 94,
    "أنظمة التصميم (Design Systems)": 94,
    "Low & High-Fidelity Wireframing": 92,
    "المخططات السلكية (Wireframing)": 92,
    "Micro-interactions & Prototyping": 90,
    "النماذج التفاعلية (Interactive Prototyping)": 90,
  };

  const techBadges = [
    { name: "Python", icon: "🐍" },
    { name: "Django", icon: "⚡" },
    { name: "Odoo (Certified)", icon: "🟣" },
    { name: "ERPNext", icon: "🔷" },
    { name: "Frappe", icon: "⚙️" },
    { name: "React.js", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "🌊" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma (UI/UX)", icon: "🎨" },
  ];

  const methodologyCards = [
    {
      number: "01",
      icon: <Cpu className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      iconBg: "bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60",
      badgeColor: "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60",
      titleAr: "هندسة أنظمة ERP",
      titleEn: "ERP Systems Engineering",
      descAr: "تحليل متطلبات الشركات وتحويلها إلى تدفقات عمل مؤتمتة عبر Odoo (معتمد رسمياً) و Frappe / ERPNext.",
      descEn: "Analyzing corporate requirements and turning them into automated workflows via Odoo (Official Certified) & Frappe / ERPNext.",
      spanClass: "lg:col-span-1 lg:row-span-2",
    },
    {
      number: "02",
      icon: <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/60",
      badgeColor: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60",
      titleAr: "تطوير الويب المتكامل",
      titleEn: "Full-Stack Web Development",
      descAr: "بناء معماريات خلفية عالية الاعتمادية بـ Python & Django وواجهات أمامية فائقة السرعة بـ React & Next.js.",
      descEn: "Building high-reliability backend architectures with Python & Django and ultra-fast frontends with React & Next.js.",
      spanClass: "md:col-span-2 lg:col-span-2 lg:row-span-1",
    },
    {
      number: "03",
      icon: <Palette className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
      titleAr: "تجربة المستخدم UI/UX",
      titleEn: "UI/UX User Experience",
      descAr: "تصميم أنظمة تصميم متكاملة (Design Systems) ونماذج تفاعلية في Figma تجمع بين الجمال وسهولة الاستخدام.",
      descEn: "Crafting comprehensive design systems and interactive prototypes in Figma merging aesthetics with effortless usability.",
      spanClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      number: "04",
      icon: <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/60",
      badgeColor: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
      titleAr: "التدريب ونقل المعرفة",
      titleEn: "Training & Knowledge Transfer",
      descAr: "تمكين الفرق والمطورين عبر برامج تدريبية تطبيقية وورش عمل مكثفة في البرمجة وأنظمة المؤسسات.",
      descEn: "Empowering engineering teams and developers through hands-on training programs and intensive enterprise workshops.",
      spanClass: "lg:col-span-1 lg:row-span-1",
    },
  ];

  const philosophyCards = [
    {
      icon: <Lightbulb className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      iconBg: "bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60",
      titleAr: "عقلية حل المشكلات",
      titleEn: "Problem-First Mindset",
      descAr: "البدء دائماً بفهم عميق لتدفقات العمل واحتياجات المؤسسة واختناقات الأداء قبل كتابة سطر كود واحد، لضمان أعلى عائد استثماري وقيمة ملموسة.",
      descEn: "Deep immersion in business workflows, constraints, and pain points before writing code to maximize software ROI and operational impact.",
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/60",
      titleAr: "معمارية قابلة للتوسع",
      titleEn: "Scalable Architecture",
      descAr: "اعتماد المعايير الدولية في هندسة قواعد البيانات، الـ APIs النظيفة، وفصل المسؤوليات، مما يجعل النظام قابلاً للنمو والتطوير دون تراكم ديون تقنية.",
      descEn: "Adhering to strict modular architectures, relational schema normalization, and decoupled APIs that scale without technical debt.",
    },
    {
      icon: <Palette className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60",
      titleAr: "تصميم يركز على الإنسان",
      titleEn: "Human-Centered Design",
      descAr: "أقوى نظام برمجيات يفقد جدواه إن كان معقداً في التشغيل. ندمج بين صرامة الـ ERP وبساطة وسرعة واجهات الـ UI/UX الحديثة لتجربة مستخدم سلسة.",
      descEn: "The most powerful backend is useless if difficult to operate. We marry enterprise ERP rigor with fluid, intuitive consumer-grade UX.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/60",
      titleAr: "موثوقية وأمان الإنتاج",
      titleEn: "Production Rigor & Security",
      descAr: "حماية متقدمة للبيانات، إدارة دقيقة للصلاحيات، أتمتة موثوقة لتدفقات العمل، وضمان استقرار تشغيلي مستمر للأنظمة تحت أعلى أحمال العمل.",
      descEn: "Enterprise-grade data security, granular access controls, automated fail-safes, and 24/7 stability under peak operational loads.",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ══════════════════════════════════════════════
          1. HERO SECTION — Bento & Interactive Hub
             (With Typewriter & Floating Ambient Orbs)
         ══════════════════════════════════════════════ */}
      <section className="relative pt-24 sm:pt-28 pb-8 overflow-hidden bg-grid-pattern">
        {/* Floating Ambient Glow Spheres with Slow Motion */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            x: [0, 10, 0],
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-1/4 w-96 h-96 bg-teal-500/15 dark:bg-teal-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -12, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content — Staggered Text Entrance with Comfortable Spacing */}
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 sm:space-y-7"
            >
              {/* Interactive Telemetry Status Badges */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-2.5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50/90 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold shadow-xs backdrop-blur-md"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                  </span>
                  <span className="font-mono text-[11px] font-bold">100% OPERATIONAL •</span>
                  <span>{language === "ar" ? config.availabilityStatusAr : config.availabilityStatusEn}</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-semibold backdrop-blur-md"
                >
                  <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{language === "ar" ? "مهندس برمجيات وأنظمة ERP" : "Software & ERP Systems Engineer"}</span>
                </motion.div>
              </motion.div>

              {/* Headline with Typewriter Subtitle */}
              <motion.div variants={heroItem} className="space-y-3 sm:space-y-3.5">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  {t.hero.greeting}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                  {language === "ar" ? config.nameAr : config.nameEn}
                </h1>
                
                {/* Dynamic Typewriter Text with Minimum Height to Avoid Layout Shifts */}
                <div className="text-base sm:text-xl lg:text-2xl font-bold min-h-[3rem] sm:min-h-[2.8rem] flex items-center">
                  <TypewriterText
                    phrases={typewriterPhrases}
                    speed={65}
                    pause={2000}
                    className="text-gradient font-bold"
                    cursorClassName="text-teal-500 font-mono text-xl sm:text-2xl"
                  />
                </div>
              </motion.div>

              {/* Bio */}
              <motion.p variants={heroItem} className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {language === "ar" ? config.bioAr : config.bioEn}
              </motion.p>

              {/* Action Hub — Primary & Secondary Buttons */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-2.5">
                {/* 1. Primary Button: Projects */}
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-teal-500/25 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <span>{t.hero.ctaProjects}</span>
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                {/* 2. Secondary Button: Download CV */}
                <a
                  href={language === "ar" ? config.cvUrlAr || "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf" : config.cvUrlEn || "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-xs group"
                >
                  <Download className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{language === "ar" ? "تحميل السيرة الذاتية" : "Download Resume (CV)"}</span>
                </a>
              </motion.div>

              {/* Direct Quick Contact & Social Channels (Email, LinkedIn, WhatsApp, GitHub, X) */}
              <motion.div variants={heroItem} className="pt-2 sm:pt-2.5 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  {language === "ar" ? "قنوات التواصل المباشر:" : "Direct Channels:"}
                </span>

                <div className="flex items-center gap-2">
                  {/* 1. Email */}
                  <a
                    href="mailto:m.i.aljazzar19@gmail.com"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-50/50 dark:hover:bg-teal-950/40 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="m.i.aljazzar19@gmail.com"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      Email
                    </span>
                  </a>

                  {/* 2. LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/mohammed-aljazzar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      LinkedIn
                    </span>
                  </a>

                  {/* 3. WhatsApp */}
                  <a
                    href="https://wa.me/972598048284"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="+972 59 804 8284"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
                    </svg>
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      WhatsApp
                    </span>
                  </a>

                  {/* 4. GitHub */}
                  <a
                    href="https://github.com/Mohammed-Aljazzar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      GitHub
                    </span>
                  </a>

                  {/* 5. X Platform (Twitter) */}
                  <a
                    href="https://x.com/moh_aljazzar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="X (@moh_aljazzar)"
                    aria-label="X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      X (Twitter)
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side — High-End Portrait Aligned Parallel to Content */}
            <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
                className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] h-[26rem] sm:h-[30rem] lg:h-[33rem] xl:h-[34rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group"
              >
                <Image
                  src={config.avatarUrl}
                  alt={language === "ar" ? config.nameAr : config.nameEn}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="font-bold block text-sm">{language === "ar" ? config.nameAr : config.nameEn}</span>
                    <span className="text-[11px] text-teal-300 font-mono">B.Sc. Software Eng. &amp; AI</span>
                  </div>
                  <span className="font-mono bg-teal-600/90 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow-xs">
                    Odoo Certified
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Subtle Soft Divider between Hero & Stats */}
          <div className="mt-10 sm:mt-12 lg:mt-14 mb-8 sm:mb-10 relative flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          </div>

          {/* 4 Hero Stats Cards Spanning the Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
          >
            {/* 1. Years of Practical Experience */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.yearsOfExperience} />
                <span className="text-xl font-sans ml-0.5 text-teal-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.years}
              </div>
            </div>

            {/* 2. Completed Software Projects */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.completedProjects} />
                <span className="text-xl font-sans ml-0.5 text-indigo-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.projects}
              </div>
            </div>

            {/* 3. Specialized Training Programs */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-amber-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-800 dark:text-slate-200 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.trainingProgramsCount} />
                <span className="text-xl font-sans ml-0.5 text-amber-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.programs}
              </div>
            </div>

            {/* 4. Trainees & Beneficiaries */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.traineesCount} />
                <span className="text-xl font-sans ml-0.5 text-teal-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.trainees}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WORK PHILOSOPHY SECTION
             (Engineering Focused on Delivering Reliable Products)
             Matches media_1795258393687_dc594766.png exactly
         ══════════════════════════════════════════════ */}
      <section id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-right rtl:text-right ltr:text-left mb-8 sm:mb-10">
          {/* Overline with dash & bullet */}
          <div className="flex items-center justify-start gap-2 mb-2.5">
            <span className="w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-xs sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "فلسفة العمل والهندسة" : "WORK & ENGINEERING PHILOSOPHY"}
            </span>
          </div>

          {/* Main Title — Refined, Classy & Smooth Typography */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
            {language === "ar" ? "المبادئ الحاكمة لجودة واستدامة الأنظمة" : "Guiding Principles for Enduring & Scalable Systems"}
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mt-2.5">
            {language === "ar"
              ? "لا نكتب الكود لمجرد البرمجة، بل لبناء معماريات مؤسسية متينة تحقق أهداف العمل وتدوم لسنوات، توازن بين صرامة الأنظمة وسلاسة التجربة."
              : "We don't write code for the sake of code. We architect enduring enterprise systems that solve real challenges, balancing structural rigor with fluid experience."}
          </p>
        </ScrollReveal>

        {/* 4 Philosophy Cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6" staggerDelay={0.1}>
          {philosophyCards.map((card, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 flex flex-col justify-start text-right items-start group h-full"
              >
                {/* Icon in Rounded Box */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 ${card.iconBg}`}>
                  {card.icon}
                </div>

                {/* Card Title — Prominent font grade & guaranteed single line */}
                <h3 className="w-full text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                  {language === "ar" ? card.titleAr : card.titleEn}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "ar" ? card.descAr : card.descEn}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          3. WORK METHODOLOGY & CORE SERVICES
             (ERP, Web, UI/UX, Mentorship)
             Matches the Philosophy section styling 100%
         ══════════════════════════════════════════════ */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-right rtl:text-right ltr:text-left mb-8 sm:mb-10">
          {/* Overline with dash & bullet */}
          <div className="flex items-center justify-start gap-2 mb-2.5">
            <span className="w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-xs sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "منهجية العمل والخدمات الهندسية" : "METHODOLOGY & SERVICES"}
            </span>
          </div>

          {/* Main Title — Refined, Classy & Smooth Typography */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
            {language === "ar" ? "مسارات هندسية متكاملة لبناء وتطوير الأعمال" : "Integrated Engineering Tracks for Scalable Business"}
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mt-2.5">
            {language === "ar"
              ? "نغطي دورة حياة المنتج الرقمي بأكملها: من معمارية أنظمة الـ ERP وتطوير الويب إلى واجهات الاستخدام المتقنة والتدريب التقني التطبيقي."
              : "Covering the full digital product lifecycle: from ERP business architecture and full-stack web to polished UI/UX and applied technical training."}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.1}>
          {methodologyCards.map((card) => (
            <StaggerItem key={card.number} className={card.spanClass}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 flex flex-col justify-start text-right items-start group h-full"
              >
                {/* Top Bar with Icon in Box & Number Pill */}
                <div className="w-full flex items-center justify-between mb-3.5 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-lg ${card.badgeColor}`}>
                    {card.number}
                  </span>
                </div>

                {/* Card Title — Single Line */}
                <h3 className="w-full text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                  {language === "ar" ? card.titleAr : card.titleEn}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "ar" ? card.descAr : card.descEn}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Button Aligned to Left in RTL (End of line) */}
        <div className="flex justify-end mt-8 sm:mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold shadow-xs hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-md transition-all group"
          >
            <span>{language === "ar" ? "استكشف الأعمال والمشاريع" : "Explore Projects & Case Studies"}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180 text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FEATURED PROJECT SPOTLIGHT — Browser Mockup
          (Flagship Case Study in the Limelight)
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-teal-950/95 via-slate-900 to-[#0B1120] border border-teal-800/50 text-white relative overflow-hidden shadow-2xl">
          {/* Top Browser Chrome Bar */}
          <div className="px-6 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="bg-slate-950/60 px-4 py-1 rounded-md text-[11px] text-teal-300 font-mono border border-slate-800">
              frappe.system/smart-service-management
            </div>
            <span className="text-[11px] text-teal-400 font-semibold">ERP &amp; Automation</span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12 relative z-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 border border-teal-400/30 text-teal-300">
                <Sparkles className="w-3.5 h-3.5" />
                {t.featured.sectionBadge}
              </span>
              <span className="text-xs font-mono text-teal-300 bg-teal-900/40 px-3 py-1 rounded-lg border border-teal-700/40">
                Frappe Framework &amp; ERPNext
              </span>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {language === "ar" ? featuredProject.titleAr : featuredProject.titleEn}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {language === "ar" ? featuredProject.summaryAr : featuredProject.summaryEn}
              </p>
            </div>

            {/* Visual Dashboard Illustration Box */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 p-2 sm:p-4">
              <Image
                src={featuredProject.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                alt={language === "ar" ? featuredProject.titleAr : featuredProject.titleEn}
                fill
                className="object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-2 text-xs font-mono text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span>Production Verified SLA Automation Engine</span>
              </div>
            </div>

            {/* 3 Column Architecture Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-2 hover:border-teal-700/50 transition-colors">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  {t.featured.challenge}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === "ar" ? featuredProject.challengeAr : featuredProject.challengeEn}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-2 hover:border-teal-700/50 transition-colors">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  {t.featured.solution}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === "ar" ? featuredProject.solutionAr : featuredProject.solutionEn}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-2 hover:border-teal-700/50 transition-colors">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  {t.featured.architecture}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === "ar" ? featuredProject.architectureAr : featuredProject.architectureEn}
                </p>
              </div>
            </div>

            {/* Tech Stack & Links */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap gap-2">
                {featuredProject.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-teal-900/40 text-teal-200 border border-teal-700/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.featured.viewGithub}</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>{language === "ar" ? "دراسة الحالة الكاملة" : "Full Case Study"}</span>
                  <Arrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════
          3. BIO-TELEMETRY SKILLS MESH WITH GAUGES
             (Inspired by Gouda Nasrallah)
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <Terminal className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "الترسانة التقنية والمهارات" : "Technical Arsenal & Telemetry"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {language === "ar" ? (
              <>
                أدوات تم اختبارها بالإنتاج و
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  جاهزية تشغيلية كاملة
                </span>
              </>
            ) : (
              <>
                Production-Tested Stack &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  Operational Readiness
                </span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-2xl mx-auto">
            {language === "ar"
              ? "استكشف الكفاءات البرمجية المصنفة حسب مسارات العمل مع مقاييس الجاهزية والخبرة"
              : "Explore verified technical proficiencies across all 4 engineering disciplines with live readiness telemetry."}
          </p>
        </ScrollReveal>

        {/* Skill Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-fit mx-auto">
            {[
              { id: "erp", label: language === "ar" ? "أنظمة ERP وأتمتة الأعمال" : "ERP & Business Automation", icon: <Layers className="w-4 h-4" /> },
              { id: "backend", label: language === "ar" ? "الباك إند وقواعد البيانات" : "Backend & DevOps", icon: <Server className="w-4 h-4" /> },
              { id: "frontend", label: language === "ar" ? "الفرونت إند والويب" : "Frontend & Web Apps", icon: <Layout className="w-4 h-4" /> },
              { id: "uiux", label: language === "ar" ? "تصميم واجهات وتجربة UI/UX" : "UI/UX & Product Design", icon: <Palette className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeSkillTab === tab.id
                    ? "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid with Telemetry Gauges */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
          {skills[activeSkillTab].map((skill, idx) => {
            const skillName = language === "ar" ? skill.nameAr : skill.nameEn;
            const gauge = skillGauges[skill.nameEn] || skillGauges[skill.nameAr] || 90;

            return (
              <StaggerItem key={`${activeSkillTab}-${idx}`}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {skillName}
                    </span>
                    {skill.isCore && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shrink-0">
                        Core
                      </span>
                    )}
                  </div>

                  {/* Telemetry Gauge Bar (Gouda Nasrallah style) */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>{skill.level}</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">{gauge}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${gauge}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          6. SELECTED PROJECTS PREVIEW WITH MOCKUP FRAMES
             (Inspired by Ameer Abudraz & Ahmed Said)
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <Code2 className="w-3.5 h-3.5" />
                <span>{t.selectedProjects.sectionBadge}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {language === "ar" ? (
                  <>
                    نماذج حية من{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                      الأنظمة والحلول المنجزة
                    </span>
                  </>
                ) : (
                  <>
                    Engineered Solutions &{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                      Live Deployments
                    </span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-relaxed">
                {t.selectedProjects.subheading}
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
            >
              <span>{t.selectedProjects.viewAllBtn}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: t.selectedProjects.all },
              { id: "erp", label: t.selectedProjects.erp },
              { id: "backend", label: t.selectedProjects.backend },
              { id: "frontend", label: t.selectedProjects.frontend },
              { id: "uiux", label: t.selectedProjects.uiux },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-teal-600 dark:bg-teal-500 text-white shadow-sm shadow-teal-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Cards Grid with Visual Mockup Windows */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {selectedProjects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-teal-500/5 group h-full cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="space-y-4">
                  {/* Visual Project Mockup Window Frame */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group/img">
                    {/* Window Bar */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-900/90 backdrop-blur-xs border-b border-slate-800/80 px-2.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                        {project.slug || project.category}
                      </span>
                      <span className="text-[9px] font-mono text-teal-400 uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Visual SVG Graphic Cover */}
                    <div className="pt-6 w-full h-full relative">
                      <Image
                        src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                        alt={language === "ar" ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                    </div>

                    {/* Hover Quick Action Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-2xs pointer-events-none">
                      <span className="px-3 py-1.5 rounded-xl bg-teal-500/95 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === "ar" ? "معاينة دراسة الحالة" : "Preview Case Study"}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {project.category.toUpperCase()}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {language === "ar" ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {language === "ar" ? project.summaryAr : project.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="pt-5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400 pt-3 border-t border-slate-100 dark:border-slate-800 group-hover:text-teal-700 dark:group-hover:text-teal-300">
                    <span>{t.selectedProjects.viewDetails}</span>
                    <Chevron className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          7. INDEPENDENT TRAINING TRACK BANNER
             (Harmonized Brand Colors: Teal & Indigo)
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1120] to-[#042f2e]/90 border border-teal-500/30 dark:border-teal-400/25 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl group">
          {/* Ambient Brand Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/30 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-700" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-500/15 border border-teal-400/30 text-teal-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <span>{t.trainingTeaser.badge}</span>
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {language === "ar" ? (
                  <>
                    نقل المعرفة و
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-indigo-300">
                      تمكين العقول التقنية
                    </span>{" "}
                    الصاعدة
                  </>
                ) : (
                  <>
                    Sharing Knowledge &{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-indigo-300">
                      Empowering Emerging
                    </span>{" "}
                    Tech Minds
                  </>
                )}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-body">
                {t.trainingTeaser.description}
              </p>

              {/* Verified Metrics Counter Hub */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-800/80 max-w-lg">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 flex items-center">
                    <AnimatedCounter value={config.trainingProgramsCount} />
                    <span className="text-teal-500 text-lg ml-0.5 rtl:mr-0.5">+</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{t.trainingTeaser.programsCount}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 flex items-center">
                    <AnimatedCounter value={config.workshopsCount} />
                    <span className="text-teal-500 text-lg ml-0.5 rtl:mr-0.5">+</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{t.trainingTeaser.workshopsCount}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 flex items-center">
                    <AnimatedCounter value={config.traineesCount} />
                    <span className="text-teal-500 text-lg ml-0.5 rtl:mr-0.5">+</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{t.trainingTeaser.traineesCount}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
              {/* Glassmorphic Mentorship Tag */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>Odoo • Python/Django • UI/UX</span>
              </div>

              <Link
                href="/training"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/20 hover:shadow-teal-500/35 transition-all duration-300 hover:-translate-y-1 group/btn"
              >
                <span>{t.trainingTeaser.exploreBtn}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════
          8. SIGNALS ALONG THE WAY (Milestones & Credentials)
             (Inspired by Maha Qudwa)
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <Award className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "محطات وإشارات على الطريق" : "Signals Along The Way"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {language === "ar" ? (
              <>
                اعتمادات وإنجازات{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  رسّخت الخبرة العملية
                </span>
              </>
            ) : (
              <>
                Milestones & Credentials{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  Affirming Excellence
                </span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-2xl mx-auto">
            {language === "ar"
              ? "سجل موثق من الشهادات الرسمية والاعتمادات الأكاديمية والمهنية الدولية"
              : "Documented trajectory of international vendor certifications and academic distinctions."}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            {
              year: "2023",
              title: language === "ar" ? "الشهادة الرسمية المعتمدة من شركة أودو العالمية" : "Official Odoo S.A. Certified Developer",
              issuer: "Odoo S.A. (Global)",
              desc: language === "ar"
                ? "اعتماد رسمي دولي يثبت الكفاءة العالية في هندسة وتطوير موديولات Odoo المعقدة، وأتمتة مسارات العمل وتكامل قواعد البيانات."
                : "Official developer certification attesting to advanced competency in architecting Odoo apps, ORM modeling, and workflows.",
              badge: "Certified Odoo",
            },
            {
              year: "2024",
              title: language === "ar" ? "بكالوريوس هندسة البرمجيات والذكاء الاصطناعي" : "B.Sc. Software Engineering & AI (With Honors)",
              issuer: language === "ar" ? "جامعة فلسطين، غزة" : "University of Palestine, Gaza",
              desc: language === "ar"
                ? "التخرج بمعدل امتياز 87% (GPA 3.48 من 4.00) مع مرتبة الشرف، ومشروع تخرج تطبيقي متقدم في حوسبة الأعمال."
                : "Graduated with High Honors (87% / GPA 3.48), with a recognized capstone application in enterprise computing.",
              badge: "Honor Graduate",
            },
            {
              year: "2023",
              title: language === "ar" ? "دبلوم تصميم واجهات وتجربة المستخدم المتقدم" : "Advanced UI/UX Design Professional Program",
              issuer: "Gaza Sky Geeks",
              desc: language === "ar"
                ? "تأهيل مكثف في أبحاث المستخدمين، أنظمة التصميم (Design Systems) بـ Figma، واختبارات قابلية الاستخدام والنماذج التفاعلية."
                : "Intensive training in user empathy mapping, Figma design tokens, usability benchmarking, and micro-interactions.",
              badge: "Advanced UI/UX",
            },
          ].map((signal, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xs hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 hover:shadow-lg group h-full flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                      {signal.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{signal.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {signal.title}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                    {signal.issuer}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {signal.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          9. GLOBAL COMMUNICATION HUB & CONTACT
             (Inspired by Gouda Nasrallah & Ameer Abudraz)
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  RESPONSE TIME: &lt; 2 HOURS
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {language === "ar" ? "قنوات موثقة ومباشرة" : "Direct Verified Channels"}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {language === "ar" ? (
                  <>
                    جاهز لبناء{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                      شيء استثنائي يدوم
                    </span>{" "}
                    معاً؟
                  </>
                ) : (
                  <>
                    Ready to Architect{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                      Something Exceptional
                    </span>{" "}
                    Together?
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {language === "ar"
                  ? "سواء كنت بحاجة لتطوير نظام ERP مخصص، بناء تطبيق ويب متكامل بـ Django و Next.js، تصميم واجهات مستخدم، أو تنسيق برنامج تدريبي متقدم؛ يسعدني التواصل المباشر معك."
                  : "Whether you need a custom ERP implementation, scalable Django/Next.js full-stack platform, refined UI/UX design system, or specialized technical training, let's talk."}
              </p>

              {/* Direct Channel Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.hero.ctaContact}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/972598048284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>WhatsApp: +972 59 804 8284</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500 text-sm font-mono transition-all duration-300 hover:-translate-y-0.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-teal-500" />
                      <span className="text-teal-600 font-sans font-semibold">
                        {language === "ar" ? "تم نسخ البريد!" : "Copied!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>m.i.aljazzar19@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Links to Socials */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {[
                { name: "LinkedIn", handle: "/in/mohammed-aljazzar", url: "https://www.linkedin.com/in/mohammed-aljazzar" },
                { name: "GitHub", handle: "@Mohammed-Aljazzar", url: "https://github.com/Mohammed-Aljazzar" },
                { name: "Behance", handle: "@mohammedaljazzar", url: "https://www.behance.net/mohammedaljazzar" },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-400 transition-all hover:-translate-y-0.5 group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {soc.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {soc.handle}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════
          PROJECT DETAILS MODAL (Smooth Framer Motion)
         ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {selectedProject.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-1">
                    {language === "ar" ? selectedProject.titleAr : selectedProject.titleEn}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Cover Image Preview */}
              <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image
                  src={selectedProject.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                  alt={language === "ar" ? selectedProject.titleAr : selectedProject.titleEn}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 900px) 100vw, 800px"
                />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === "ar" ? selectedProject.summaryAr : selectedProject.summaryEn}
              </p>

              <div className="space-y-4 pt-2">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">
                    {language === "ar" ? "التحدي الهندسي" : "Challenge"}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === "ar" ? selectedProject.challengeAr : selectedProject.challengeEn}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">
                    {language === "ar" ? "الحل والمعمارية التقنية" : "Solution & Architecture"}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === "ar" ? selectedProject.solutionAr : selectedProject.solutionEn}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  {language === "ar" ? "التقنيات المستخدمة:" : "Tech Stack:"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold text-xs transition-opacity hover:opacity-90"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.featured.viewGithub}</span>
                  </a>
                ) : (
                  <span />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

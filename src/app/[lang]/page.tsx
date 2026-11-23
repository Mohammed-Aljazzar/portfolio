"use client";

import React, { useState, useRef } from "react";
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
  Lightbulb, Rocket, Shield, Eye, Download, Linkedin, AppWindow, Cable, Globe, ArrowUpRight,
  LayoutGrid, MessageCircle,
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
  const [featuredIndex, setFeaturedIndex] = useState<number>(2);

  // Drag-to-scroll & swipe state for Skill Tabs on mobile & tablet
  const skillTabsRef = useRef<HTMLDivElement>(null);
  const isTabsDownRef = useRef(false);
  const tabsStartXRef = useRef(0);
  const tabsScrollLeftRef = useRef(0);
  const hasTabsDraggedRef = useRef(false);

  const handleTabsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!skillTabsRef.current) return;
    isTabsDownRef.current = true;
    hasTabsDraggedRef.current = false;
    tabsStartXRef.current = e.pageX - skillTabsRef.current.offsetLeft;
    tabsScrollLeftRef.current = skillTabsRef.current.scrollLeft;
  };

  const handleTabsMouseLeave = () => {
    isTabsDownRef.current = false;
  };

  const handleTabsMouseUp = () => {
    isTabsDownRef.current = false;
  };

  const handleTabsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTabsDownRef.current || !skillTabsRef.current) return;
    const x = e.pageX - skillTabsRef.current.offsetLeft;
    const walk = x - tabsStartXRef.current;
    if (Math.abs(walk) > 5) {
      hasTabsDraggedRef.current = true;
    }
    skillTabsRef.current.scrollLeft = tabsScrollLeftRef.current - walk;
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const config = initialData.config;
  const pillars = initialData.pillars;
  const skills = initialData.skills;

  const showcaseProjects = [
    {
      id: "smart-service-management",
      slug: "smart-service-management",
      category: "أنظمة ERP وأتمتة",
      categoryEn: "ERP & Automation",
      categoryBadge: "ERP",
      categoryKey: "erp",
      year: "2024",
      featuredBadge: "FEATURED ERP • 01",
      titleAr: "نظام إدارة الخدمات الذكي",
      titleEn: "Smart Service Management System",
      descAr: "نظام متكامل لإدارة أوامر العمل، الصيانة، الفوترة وقطع الغيار مبني على Frappe و ERPNext.",
      descEn: "Integrated service management platform for work orders, maintenance, billing, and parts built on Frappe & ERPNext.",
      tags: ["Frappe Framework", "ERPNext", "Python", "JavaScript", "MariaDB", "REST APIs"],
      role: "Lead ERP Architect",
      coreStack: "Frappe • ERPNext • Python • MariaDB",
      image: "/assets/images/projects/erp-smart-service.jpg",
      liveUrl: "https://github.com/Mohammed-Aljazzar/Smart-Service-Management-By-Frappe",
      githubUrl: "https://github.com/Mohammed-Aljazzar/Smart-Service-Management-By-Frappe",
    },
    {
      id: "masar-partner-platform",
      slug: "masar-partner-platform",
      category: "تطوير فرونت إند وويب",
      categoryEn: "Frontend & Web Apps",
      categoryBadge: "FRONTEND",
      categoryKey: "frontend",
      year: "2024",
      featuredBadge: "FEATURED FRONTEND • 02",
      titleAr: "منصة شركة بيديا المتكاملة (Pidea)",
      titleEn: "Pidea Integrated Digital Platform",
      descAr: "البوابة الرقمية الرسمية ونظام إدارة الخدمات لشركة بيديا للحلول الرقمية بتجربة استخدام حديثة وسريعة.",
      descEn: "Official digital gateway and service management platform for Pidea Digital Solutions with modern, fast user experience.",
      tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      role: "Frontend & UI Lead",
      coreStack: "Next.js • TypeScript • Tailwind CSS • Python",
      image: "/assets/images/projects/masar-platform.jpg",
      liveUrl: "https://github.com/Mohammed-Aljazzar/masar_partner",
      githubUrl: "https://github.com/Mohammed-Aljazzar/masar_partner",
    },
    {
      id: "bi-dashboard-reporting",
      slug: "bi-dashboard-reporting",
      category: "تطوير واجهات وتجربة UI/UX",
      categoryEn: "Frontend & UI/UX Analytics",
      categoryBadge: "FRONTEND",
      categoryKey: "frontend",
      year: "2023",
      featuredBadge: "FEATURED FRONTEND • 03",
      titleAr: "لوحة تحكم ذكاء الأعمال والتقارير",
      titleEn: "BI Analytics & Reporting Dashboard",
      descAr: "واجهة تحليل بيانات فورية لعرض مؤشرات الأداء المالي والتشغيلي بدقة تفاعلية.",
      descEn: "Real-time analytics dashboard presenting corporate financial and operational KPIs with interactive precision.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Recharts", "Analytics"],
      role: "Frontend Engineer",
      coreStack: "React.js • TypeScript • Tailwind CSS • Charts",
      image: "/assets/images/projects/bi-dashboard.jpg",
      liveUrl: "https://mohammed-aljazzar.vercel.app",
      githubUrl: "https://github.com/Mohammed-Aljazzar",
    },
  ];

  const activeFeatured = showcaseProjects[featuredIndex] || showcaseProjects[2];
  const filteredShowcaseProjects = activeCategory === "all"
    ? showcaseProjects
    : showcaseProjects.filter((p) => p.categoryKey === activeCategory);

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
      subtitleAr: "معتمد رسمياً من Odoo S.A. ومختص Frappe",
      subtitleEn: "Official Odoo S.A. Certified & Frappe Specialist",
      descAr: "تحليل وتطوير حلول المؤسسات المؤتمتة عبر Odoo و Frappe / ERPNext لإدارة المبيعات، المخازن، والعمليات المالية بدقة وموثوقية عالية.",
      descEn: "Developing automated enterprise workflows via Odoo & Frappe / ERPNext managing sales, inventory, and accounting with high precision.",
      featuresAr: [
        "تطوير موديولات مخصصة (Custom Modules)",
        "أتمتة دورات العمل والعمليات المالية",
        "ترحيل قواعد البيانات وربط الـ APIs",
      ],
      featuresEn: [
        "Custom enterprise modules development",
        "Workflow & financial processes automation",
        "Database migration & secure API integrations",
      ],
      tagsAr: ["Odoo Certified", "ERPNext", "Frappe", "PostgreSQL", "Python"],
      tagsEn: ["Odoo Certified", "ERPNext", "Frappe", "PostgreSQL", "Python"],
      spanClass: "lg:col-span-1 lg:row-span-2",
    },
    {
      number: "02",
      icon: <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/60",
      badgeColor: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60",
      titleAr: "تطوير الويب المتكامل",
      titleEn: "Full-Stack Web Development",
      descAr: "هندسة تطبيقات ويب متكاملة وسريعة الاستجابة؛ واجهات تفاعلية حديثة بـ Next.js و React، ومعماريات خلفية متينة بـ Python & Django مع واجهات RESTful آمنة.",
      descEn: "Building robust full-stack web applications with high-performance Next.js frontends and secure Python & Django backends.",
      featuresAr: [
        "واجهات تفاعلية فائقة السرعة بـ Next.js & React",
        "معماريات خلفية متينة بـ Python & Django",
      ],
      featuresEn: [
        "Interactive ultra-fast Next.js & React frontends",
        "Robust, secure Python & Django backend APIs",
      ],
      tagsAr: ["Next.js", "React", "Python", "Django", "TypeScript", "REST APIs"],
      tagsEn: ["Next.js", "React", "Python", "Django", "TypeScript", "REST APIs"],
      spanClass: "lg:col-span-2 lg:row-span-1",
    },
    {
      number: "03",
      icon: <Palette className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
      titleAr: "تجربة وتصميم الواجهات",
      titleEn: "UI/UX Experience Design",
      descAr: "بناء نظم تصميم (Design Systems) تفاعلية ونماذج عمل في Figma تجمع بين جمالية المظهر وسلاسة الاستخدام وقابلية التنفيذ البرمجي الدقيق.",
      descEn: "Crafting comprehensive design systems and interactive Figma prototypes balancing clean aesthetics with effortless developer handoff.",
      featuresAr: [
        "بناء نظم تصميم موحدة (Design Systems)",
        "نماذج تفاعلية عالية الدقة في Figma",
      ],
      featuresEn: [
        "Unified scalable design systems",
        "High-fidelity interactive Figma prototypes",
      ],
      tagsAr: ["Figma", "Design Systems", "UI/UX", "Prototyping"],
      tagsEn: ["Figma", "Design Systems", "UI/UX", "Prototyping"],
      spanClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      number: "04",
      icon: <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-800/60",
      badgeColor: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
      titleAr: "التدريب ونقل المعرفة",
      titleEn: "Training & Mentorship",
      descAr: "تمكين المطورين والفرق التقنية من خلال ورش عمل تطبيقية تركز على كتابة كود نظيف، معمارية البرمجيات، وأفضل ممارسات التطوير المؤسسي.",
      descEn: "Empowering developers and engineering teams through applied workshops on clean code, software architecture, and industry best practices.",
      featuresAr: [
        "ورش عمل برمجية تطبيقية ومكثفة",
        "جلسات مراجعة الكود وهندسة المعمارية",
      ],
      featuresEn: [
        "Applied hands-on coding workshops",
        "Architecture review & clean code mentorship",
      ],
      tagsAr: ["Clean Code", "Code Review", "Architecture", "Mentorship"],
      tagsEn: ["Clean Code", "Code Review", "Architecture", "Mentorship"],
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
              className="lg:col-span-7 space-y-6 sm:space-y-7 order-2 lg:order-1 text-center lg:text-start flex flex-col items-center lg:items-start"
            >
              {/* Interactive Telemetry Status Badges */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50/90 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold shadow-xs backdrop-blur-md"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                  </span>
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
              <motion.div variants={heroItem} className="space-y-3 sm:space-y-3.5 w-full">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center lg:justify-start gap-2">
                  <Terminal className="w-4 h-4" />
                  {t.hero.greeting}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                  {language === "ar" ? config.nameAr : config.nameEn}
                </h1>
                
                {/* Dynamic Typewriter Text with Minimum Height to Avoid Layout Shifts */}
                <div className="text-base sm:text-xl lg:text-2xl font-bold min-h-[3.6rem] sm:min-h-[2.8rem] flex items-center justify-center lg:justify-start">
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
              <motion.p variants={heroItem} className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {language === "ar" ? config.bioAr : config.bioEn}
              </motion.p>

              {/* Action Hub — Primary & Secondary Buttons */}
              <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-3.5 pt-2 sm:pt-2.5 w-full sm:w-auto">
                {/* 1. Primary Button: Projects */}
                <Link
                  href={`/${language}/projects`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-teal-500/25 transition-all duration-300 group"
                >
                  <span>{t.hero.ctaProjects}</span>
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                {/* 2. Secondary Button: Download CV */}
                <a
                  href={language === "ar" ? config.cvUrlAr || "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf" : config.cvUrlEn || "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm transition-all duration-300 shadow-xs group"
                >
                  <Download className="w-4 h-4 text-teal-600 dark:text-teal-400 transition-transform" />
                  <span>{language === "ar" ? "تحميل السيرة الذاتية" : "Download Resume (CV)"}</span>
                </a>
              </motion.div>

              {/* Direct Quick Contact & Social Channels (Email, LinkedIn, WhatsApp, GitHub, X) */}
              <motion.div variants={heroItem} className="pt-2 sm:pt-2.5 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  {language === "ar" ? "قنوات التواصل المباشر:" : "Direct Channels:"}
                </span>

                <div className="flex items-center gap-2.5 sm:gap-2">
                  {/* 1. Email */}
                  <a
                    href="mailto:m.i.aljazzar19@gmail.com"
                    className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-50/50 dark:hover:bg-teal-950/40 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="m.i.aljazzar19@gmail.com"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      Email
                    </span>
                  </a>

                  {/* 2. LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/mohammed-aljazzar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      LinkedIn
                    </span>
                  </a>

                  {/* 3. WhatsApp */}
                  <a
                    href="https://wa.me/972598048284"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="+972 59 804 8284"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
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
                    className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      GitHub
                    </span>
                  </a>

                  {/* 5. X Platform (Twitter) */}
                  <a
                    href="https://x.com/moh_aljazzar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                    title="X (@moh_aljazzar)"
                    aria-label="X"
                  >
                    <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="absolute -top-8.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md whitespace-nowrap z-30">
                      X (Twitter)
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side — High-End Portrait (Above content on small screens, right on lg+) */}
            <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-start order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
                className="relative w-full max-w-[315px] sm:max-w-[360px] lg:max-w-[420px] xl:max-w-[440px] aspect-[4/5] sm:h-[30rem] lg:h-[33rem] xl:h-[34rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group"
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
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.yearsOfExperience} />
                <span className="text-xl font-sans ltr:ml-0.5 rtl:mr-0.5 text-teal-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.years}
              </div>
            </div>

            {/* 2. Completed Software Projects */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.completedProjects} />
                <span className="text-xl font-sans ltr:ml-0.5 rtl:mr-0.5 text-indigo-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.projects}
              </div>
            </div>

            {/* 3. Specialized Training Programs */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-slate-800 dark:text-slate-200 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.trainingProgramsCount} />
                <span className="text-xl font-sans ltr:ml-0.5 rtl:mr-0.5 text-amber-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.programs}
              </div>
            </div>

            {/* 4. Trainees & Beneficiaries */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-center text-center sm:text-start">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight flex items-center justify-center sm:justify-start">
                <AnimatedCounter value={config.traineesCount} />
                <span className="text-xl font-sans ltr:ml-0.5 rtl:mr-0.5 text-teal-500">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-snug">
                {t.hero.stats.trainees}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. SELECTED PROJECTS & SHOWCASE
             Placed directly under the Hero section
         ══════════════════════════════════════════════ */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header & Filter Pills Row */}
        <ScrollReveal>
          <div className="pb-2 space-y-2.5">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1 text-start min-w-0">
                {/* Overline with dash & bullet */}
                <div className="flex items-center justify-start gap-2 mb-1 sm:mb-2">
                  <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400 truncate">
                    {language === "ar" ? "أعمال ومشاريع مختارة" : "SELECTED WORK & PROJECTS"}
                  </span>
                </div>

                {/* Main Title — Refined, Classy & Smooth Typography */}
                <h2 className="text-xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
                  {language === "ar" ? "أعمال ومشاريع مختارة" : "Selected Work & Projects"}
                </h2>
              </div>

              {/* Edge-aligned opposite to the Section Title — Compact on mobile only */}
              <div className="shrink-0">
                <Link
                  href={`/${language}/projects`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-[11px] sm:text-[13px] font-bold shadow-xs hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-md transition-all group"
                >
                  <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                  <span>{language === "ar" ? "كل المشاريع" : "All Projects"}</span>
                </Link>
              </div>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {language === "ar"
                ? "مجموعة من الأنظمة المؤسسية والمنصات التفاعلية وتجارب المستخدم المصممة بدقة عالية للاستخدام العملي."
                : "Curated enterprise systems, interactive platforms, and polished user experiences crafted for production impact."}
            </p>
          </div>
        </ScrollReveal>

        {/* 1. Large Featured Showcase Card (Hero Card) */}
        <ScrollReveal delay={0.08}>
          <div
            id="featured-project-hero"
            className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 scroll-mt-28"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Details Column */}
              <div className="lg:col-span-6 flex flex-col justify-between text-start space-y-5 lg:order-1">
                <div>
                  {/* Top Bar: Nav Arrows, Category & Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setFeaturedIndex((featuredIndex - 1 + showcaseProjects.length) % showcaseProjects.length)}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        aria-label="Previous"
                      >
                        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                      </button>
                      <button
                        onClick={() => setFeaturedIndex((featuredIndex + 1) % showcaseProjects.length)}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        aria-label="Next"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                        {activeFeatured.year}
                      </span>
                      <span className="text-xs font-mono font-bold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
                        {activeFeatured.categoryBadge}
                      </span>
                    </div>
                  </div>

                  {/* Title — Formatted with Philosophy font grade */}
                  <h3 className="w-full text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {language === "ar" ? activeFeatured.titleAr : activeFeatured.titleEn}
                  </h3>

                  {/* Realistic Engineering Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-lg mb-6">
                    {language === "ar" ? activeFeatured.descAr : activeFeatured.descEn}
                  </p>

                  {/* Two Meta Boxes (CORE STACK & ROLE) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-start">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block mb-1">
                        CORE STACK
                      </span>
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate block">
                        {activeFeatured.coreStack}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-start">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold block mb-1">
                        ROLE
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                        {activeFeatured.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: CTA Buttons & Slide Indicators */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2.5">
                    {/* View Details Button */}
                    <button
                      onClick={() => {
                        const p = initialData.projects.find((x) => x.id === activeFeatured.id);
                        if (p) setSelectedProject(p);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-200 group"
                    >
                      <span>{language === "ar" ? "عرض التفاصيل الكاملة" : "Full Details"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    {/* Visit Site / Live Demo Link */}
                    {activeFeatured.liveUrl && (
                      <a
                        href={activeFeatured.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                      >
                        <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{language === "ar" ? "زيارة الموقع" : "Live Demo"}</span>
                      </a>
                    )}
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {showcaseProjects.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setFeaturedIndex(dotIdx)}
                        className={`transition-all duration-300 ${
                          featuredIndex === dotIdx
                            ? "w-6 h-1.5 rounded-full bg-teal-600"
                            : "w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-400"
                        }`}
                        aria-label={`Slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Frame (Left in RTL / Order 2 in RTL) */}
              <div
                className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-lg group cursor-pointer lg:order-2 rtl:lg:order-2 ltr:lg:order-2"
                onClick={() => {
                  const p = initialData.projects.find((x) => x.id === activeFeatured.id);
                  if (p) setSelectedProject(p);
                }}
              >
                <Image
                  src={activeFeatured.image}
                  alt={language === "ar" ? activeFeatured.titleAr : activeFeatured.titleEn}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1200px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

                {/* Floating Badge on Image */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10.5px] font-mono text-white font-semibold border border-slate-700/60 shadow-md">
                  <span>{activeFeatured.featuredBadge} • {activeFeatured.year}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Three Project Cards Grid Below (2 on tablet screens for clean 2-column symmetry) */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {filteredShowcaseProjects.map((project, idx) => {
            const isSelectedInHero = activeFeatured.id === project.id;

            return (
              <StaggerItem
                key={project.id}
                className={idx >= 2 ? "sm:hidden lg:block h-full" : "h-full"}
              >
                <motion.div
                  className={`rounded-2xl bg-white dark:bg-slate-900/90 border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full ${
                    isSelectedInHero
                      ? "border-teal-500/80 dark:border-teal-400/80 shadow-md ring-1 ring-teal-500/30"
                      : "border-slate-200/90 dark:border-slate-800 hover:border-teal-500/40 dark:hover:border-teal-400/40"
                  }`}
                >
                  <div>
                    {/* Visual Image Header */}
                    <div
                      className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                      onClick={() => {
                        const targetIdx = showcaseProjects.findIndex((p) => p.id === project.id);
                        if (targetIdx !== -1) {
                          setFeaturedIndex(targetIdx);
                          const el = document.getElementById("featured-project-hero");
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={language === "ar" ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* Top Floating Badges (Category & Year) */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono font-bold text-slate-200 border border-slate-700/60 shadow-xs">
                          {project.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[10px] font-mono font-bold tracking-wider text-teal-800 dark:text-teal-300 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                          {project.categoryBadge}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6 text-start space-y-2.5">
                      {/* Card Title */}
                      <h3
                        className="w-full text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors cursor-pointer"
                        onClick={() => {
                          const targetIdx = showcaseProjects.findIndex((p) => p.id === project.id);
                          if (targetIdx !== -1) {
                            setFeaturedIndex(targetIdx);
                            const el = document.getElementById("featured-project-hero");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }}
                      >
                        {language === "ar" ? project.titleAr : project.titleEn}
                      </h3>

                      {/* Natural Engineering Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal line-clamp-2">
                        {language === "ar" ? project.descAr : project.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Footer Row: Action Buttons & Role */}
                  <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-3">
                      {/* View Details Arrow Button — Click loads project and tags into the featured card */}
                      <button
                        onClick={() => {
                          const targetIdx = showcaseProjects.findIndex((p) => p.id === project.id);
                          if (targetIdx !== -1) {
                            setFeaturedIndex(targetIdx);
                            const el = document.getElementById("featured-project-hero");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }}
                        className="text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 flex items-center gap-1 transition-colors group cursor-pointer"
                        title={language === "ar" ? "عرض بالبطاقة الرئيسية" : "View in Featured Hero"}
                      >
                        <span>{language === "ar" ? "عرض التفاصيل" : "Details"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      {project.liveUrl && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 font-medium flex items-center gap-1 transition-colors"
                          >
                            <Globe className="w-3 h-3" />
                            <span>{language === "ar" ? "زيارة" : "Live"}</span>
                          </a>
                        </>
                      )}
                    </div>

                    {/* Role Tag */}
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">
                      {project.role}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          3. WORK METHODOLOGY & CORE SERVICES
             (ERP, Web, UI/UX, Mentorship)
             Matches the Philosophy section styling 100%
         ══════════════════════════════════════════════ */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-start mb-8 sm:mb-10">
          {/* Overline with dash & bullet */}
          <div className="flex items-center justify-start gap-2 mb-2.5">
            <span className="w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-xs sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "الخدمات والمسارات الهندسية" : "ENGINEERING TRACKS & SERVICES"}
            </span>
          </div>

          {/* Main Title — Refined, Classy & Smooth Typography */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
            {language === "ar" ? "مسارات هندسية متكاملة لبناء وتطوير الأعمال" : "Integrated Engineering Tracks for Scalable Business"}
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mt-2.5">
            {language === "ar"
              ? "حلول برمجية واقعية تنطلق من متطلبات العمل الفعلية؛ تشمل تخصيص أنظمة الـ ERP، وتطوير تطبيقات الويب الحديثة، وتصميم الواجهات ونقل المعرفة للفرق."
              : "End-to-end software solutions grounded in real business requirements: from ERP customization and full-stack web to polished UI/UX and engineering mentorship."}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" staggerDelay={0.1}>
          {methodologyCards.map((card) => (
            <StaggerItem key={card.number} className={`${card.spanClass} h-full`}>
              <motion.div
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 flex flex-col justify-between text-start items-start group h-full"
              >
                <div className="w-full">
                  {/* Top Bar with Icon in Box & Number Pill + Certified Badge */}
                  <div className="w-full flex items-center justify-between mb-4 sm:mb-5">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {card.subtitleAr && (
                        <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                          <span>{language === "ar" ? "معتمد Odoo" : "Odoo Certified"}</span>
                        </span>
                      )}
                      <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg ${card.badgeColor}`}>
                        {card.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Title — Prominent font grade & responsive wrap */}
                  <h3 className="w-full text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                    {language === "ar" ? card.titleAr : card.titleEn}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-4">
                    {language === "ar" ? card.descAr : card.descEn}
                  </p>

                  {/* Highlights / Features with neat Check icon */}
                  {card.featuresAr && (
                    <ul className={`space-y-2 mb-5 w-full ${card.spanClass.includes("col-span-2") ? "lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0" : ""}`}>
                      {(language === "ar" ? card.featuresAr : card.featuresEn).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Pills Footer - Natural, stylish chips without harsh separator */}
                {card.tagsAr && (
                  <div className="flex flex-wrap gap-1.5 pt-2 w-full mt-auto">
                    {(language === "ar" ? card.tagsAr : card.tagsEn).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 hover:border-teal-500/40 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Button Aligned to Left in RTL (End of line) */}
        <div className="flex justify-end mt-8 sm:mt-10">
          <Link
            href={`/${language}/experience`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold shadow-xs hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-md transition-all group"
          >
            <span>{language === "ar" ? "عرض الخبرات الهندسية" : "View Engineering Experience"}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180 text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. BIO-TELEMETRY SKILLS MESH WITH GAUGES
             Formatted 100% like Philosophy of Work section
         ══════════════════════════════════════════════ */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <ScrollReveal className="text-start mb-2">
          {/* Overline with dash & bullet */}
          <div className="flex items-center justify-start gap-2 mb-2.5">
            <span className="w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-xs sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "الترسانة التقنية والمهارات" : "TECHNICAL ARSENAL & SKILLS"}
            </span>
          </div>

          {/* Main Title — Refined, Classy & Smooth Typography */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
            {language === "ar" ? "أدوات تم اختبارها بالإنتاج وجاهزية تشغيلية كاملة" : "Production-Tested Stack & Operational Readiness"}
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mt-2.5">
            {language === "ar"
              ? "استكشف الكفاءات البرمجية المصنفة حسب مسارات العمل مع مقاييس الجاهزية والخبرة العملية في بيئات الإنتاج الفعلية."
              : "Explore verified technical proficiencies across engineering disciplines with live readiness telemetry from production environments."}
          </p>
        </ScrollReveal>

        {/* Skill Tabs — Draggable & Swipeable on mobile & tablet without visible scrollbars */}
        <ScrollReveal delay={0.08}>
          <div className="w-full overflow-hidden">
            <div
              ref={skillTabsRef}
              onMouseDown={handleTabsMouseDown}
              onMouseLeave={handleTabsMouseLeave}
              onMouseUp={handleTabsMouseUp}
              onMouseMove={handleTabsMouseMove}
              className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full lg:w-auto max-w-full lg:max-w-fit overflow-x-auto lg:overflow-visible no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x cursor-grab active:cursor-grabbing select-none"
            >
              {[
                { id: "erp", label: language === "ar" ? "أنظمة ERP وأتمتة الأعمال" : "ERP & Business Automation", icon: <Layers className="w-4 h-4 shrink-0" /> },
                { id: "backend", label: language === "ar" ? "الباك إند وقواعد البيانات" : "Backend & DevOps", icon: <Server className="w-4 h-4 shrink-0" /> },
                { id: "frontend", label: language === "ar" ? "الفرونت إند والويب" : "Frontend & Web Apps", icon: <Layout className="w-4 h-4 shrink-0" /> },
                { id: "uiux", label: language === "ar" ? "تصميم واجهات وتجربة UI/UX" : "UI/UX & Product Design", icon: <Palette className="w-4 h-4 shrink-0" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (hasTabsDraggedRef.current) {
                      hasTabsDraggedRef.current = false;
                      return;
                    }
                    setActiveSkillTab(tab.id as any);
                  }}
                  className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
                      <span>
                        {skill.level.includes("|")
                          ? language === "ar"
                            ? skill.level.split("|")[0].trim()
                            : skill.level.split("|")[1].trim()
                          : skill.level}
                      </span>
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
          5. INDEPENDENT TRAINING TRACK BANNER
             Clean, lightweight & focused on mentorship CTA
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-lg hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            {/* Content + Counters Column */}
            <div className="flex-1 space-y-5 text-start">
              <div>
                {/* Overline with dash & bullet */}
                <div className="flex items-center justify-start gap-2 mb-2">
                  <span className="w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  <span className="text-xs sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                    {language === "ar" ? "المسار التدريبي ونقل المعرفة" : "TRAINING TRACK & KNOWLEDGE TRANSFER"}
                  </span>
                </div>

                {/* Main Title — Refined, Classy & Smooth Typography */}
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight mb-2">
                  {language === "ar"
                    ? "نقل المعرفة وتمكين العقول التقنية الصاعدة"
                    : "Sharing Knowledge & Empowering Emerging Tech Minds"}
                </h3>

                {/* Subtitle Paragraph */}
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
                  {t.trainingTeaser.description}
                </p>
              </div>

              {/* Verified Metrics Counter Hub — Centered on mobile only */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400 flex items-center">
                    <AnimatedCounter value={config.trainingProgramsCount} />
                    <span className="text-teal-500 text-base ml-0.5 rtl:mr-0.5 font-bold">+</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.trainingTeaser.programsCount}</span>
                </div>

                <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400 flex items-center">
                    <AnimatedCounter value={config.workshopsCount} />
                    <span className="text-teal-500 text-base ml-0.5 rtl:mr-0.5 font-bold">+</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.trainingTeaser.workshopsCount}</span>
                </div>

                <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400 flex items-center">
                    <AnimatedCounter value={config.traineesCount} />
                    <span className="text-teal-500 text-base ml-0.5 rtl:mr-0.5 font-bold">+</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.trainingTeaser.traineesCount}</span>
                </div>
              </div>
            </div>

            {/* Left in RTL: CTA Button — Centered on mobile only */}
            <div className="shrink-0 flex items-center justify-center sm:justify-start lg:justify-end w-full sm:w-auto">
              <Link
                href={`/${language}/training`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group text-center whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.trainingTeaser.exploreBtn}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════
          6. WORK PHILOSOPHY SECTION
             (Engineering Focused on Delivering Reliable Products)
             Matches media_1795258393687_dc594766.png exactly
         ══════════════════════════════════════════════ */}
      <section id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-start mb-8 sm:mb-10">
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
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 flex flex-col justify-start text-start items-start group h-full"
              >
                {/* Icon in Rounded Box */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 ${card.iconBg}`}>
                  {card.icon}
                </div>

                {/* Card Title — Prominent font grade & responsive wrap */}
                <h3 className="w-full text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
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
          7. GLOBAL COMMUNICATION HUB & CONTACT
          Formatted to match reference design (media_1795342356118_66eef428.png)
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-14 shadow-xs hover:shadow-xl hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14">
            
            {/* Content Column */}
            <div className="flex-1 space-y-4 text-start">
              {/* Top Row: Availability Pill & Overline */}
              <div className="flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === "ar" ? "جاهز لبدء تعاون هندسي جديد" : "Ready for New Engineering Collaborations"}</span>
                </div>

                {/* Overline with dash & bullet */}
                <div className="flex items-center justify-start gap-2">
                  <span className="w-5 h-[1.5px] bg-teal-500 rounded-full inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    {language === "ar" ? "للتواصل" : "GET IN TOUCH"}
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                {language === "ar"
                  ? "جاهز لبناء شيء استثنائي يدوم معاً؟"
                  : "Ready to Architect Something Exceptional Together?"}
              </h2>

              {/* Subtitle Paragraph */}
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
                {language === "ar"
                  ? "سواء كنت بحاجة لبناء وتخصيص نظام ERP متكامل، تطوير منصة ويب متقدمة، أو قيادة تحدٍ هندسي استثنائي؛ يسعدني مناقشة فكرتك وتحويلها لواقع تشغيلي موثوق."
                  : "Whether you need custom ERP engineering, scalable web architectures, or dedicated technical consulting, let's discuss your roadmap and build it with production-grade reliability."}
              </p>
            </div>

            {/* Left in RTL: Action Buttons Stack — Side-by-side on tablet screens only */}
            <div className="w-full lg:w-64 shrink-0 flex flex-col items-stretch sm:items-start lg:items-stretch space-y-3">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-full">
                {/* 1. Primary Action Button (Start Conversation / ابدأ محادثة) */}
                <a
                  href="https://wa.me/972598048284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-teal-500/25 transition-all duration-200 group text-center hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{language === "ar" ? "ابدأ محادثة" : "Start a Conversation"}</span>
                </a>

                {/* 2. Secondary Action Button (Send Email / أرسل بريداً) */}
                <a
                  href="mailto:m.i.aljazzar19@gmail.com"
                  className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-bold text-sm shadow-2xs hover:shadow-sm transition-all duration-200 group text-center whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                  <span>{language === "ar" ? "أرسل بريداً" : "Send an Email"}</span>
                </a>
              </div>

              {/* Subtext below buttons */}
              <p className="text-[11.5px] text-slate-400 dark:text-slate-500 text-center sm:text-start lg:text-center font-normal pt-1">
                {language === "ar" ? "أرد عادةً في أقرب وقت أكون فيه متاحًا." : "Usually reply as soon as available."}
              </p>
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

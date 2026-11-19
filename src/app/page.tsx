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
  Lightbulb, Rocket, Shield, Eye,
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

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ══════════════════════════════════════════════
          1. HERO SECTION — Bento & Interactive Hub
             (With Typewriter & Floating Ambient Orbs)
         ══════════════════════════════════════════════ */}
      <section className="relative pt-24 sm:pt-32 pb-8 overflow-hidden bg-grid-pattern">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content — Staggered Text Entrance */}
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium backdrop-blur-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === "ar" ? "غزة، فلسطين 🇵🇸" : "Gaza, Palestine 🇵🇸"}</span>
                </motion.div>
              </motion.div>

              {/* Headline with Typewriter Subtitle */}
              <motion.div variants={heroItem} className="space-y-3">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  {t.hero.greeting}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                  {language === "ar" ? config.nameAr : config.nameEn}
                </h1>
                
                {/* Dynamic Typewriter Text with Minimum Height to Avoid Layout Shifts */}
                <div className="text-base sm:text-xl lg:text-2xl font-bold min-h-[3.2rem] sm:min-h-[2.8rem] flex items-center">
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

              {/* Action Hub & 1-Click Copy Email */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-teal-500/25 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <span>{t.hero.ctaProjects}</span>
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/training"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.hero.ctaTraining}</span>
                </Link>

                {/* 1-Click Copy Email Button (Gouda & Ameer Style) */}
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-mono font-medium transition-all duration-300 bg-white/70 dark:bg-slate-900/70 hover:-translate-y-0.5 shadow-xs"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-teal-500" />
                      <span className="text-teal-600 dark:text-teal-400 font-sans font-semibold">
                        {language === "ar" ? "تم نسخ البريد!" : "Copied!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{config.email || "m.i.aljazzar19@gmail.com"}</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Credential Pills with Soft Glass Effect */}
              <motion.div variants={heroItem} className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50/80 dark:bg-slate-800/80 border border-teal-200/60 dark:border-slate-700 font-mono font-semibold text-teal-800 dark:text-teal-300 backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Official Odoo S.A. Certified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-slate-700 font-mono font-semibold text-indigo-800 dark:text-indigo-300 backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Frappe &amp; ERPNext Specialist
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 font-mono font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Software Eng. &amp; AI Honors (GPA 3.48)
                </span>
              </motion.div>

              {/* Fast Tech Stack Pills with Soft Micro-interactions */}
              <motion.div variants={heroItem} className="pt-2 flex flex-wrap gap-2">
                {techBadges.map((tech) => (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 shadow-2xs hover:border-teal-400 dark:hover:border-teal-400 transition-colors cursor-default"
                  >
                    <span className="text-[11px] opacity-80">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side — High-End Portrait & Floating Bento Telemetry */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group"
              >
                <Image
                  src={config.avatarUrl}
                  alt={language === "ar" ? config.nameAr : config.nameEn}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
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

              {/* Floating Bento Telemetry Stats Card with Subtle Float Animation */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-sm -mt-8 sm:-mt-10 relative z-20 glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-xl"
              >
                <div className="grid grid-cols-2 gap-4 divide-x divide-slate-200 dark:divide-slate-800 rtl:divide-x-reverse">
                  <div className="text-center px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                      <AnimatedCounter value={config.yearsOfExperience} />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {t.hero.stats.years}
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                      <AnimatedCounter value={config.completedProjects} />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {t.hero.stats.projects}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 grid grid-cols-2 gap-4 divide-x divide-slate-200 dark:divide-slate-800 rtl:divide-x-reverse">
                  <div className="text-center px-2">
                    <div className="text-lg sm:text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
                      <AnimatedCounter value={config.trainingProgramsCount} />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {t.hero.stats.programs}
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-lg sm:text-xl font-bold font-mono text-teal-600 dark:text-teal-400">
                      <AnimatedCounter value={config.traineesCount} />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {t.hero.stats.trainees}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. THE DNA OF ENGINEERING & CORE PRINCIPLES
             (Inspired by Ahmed Said & Maha Qudwa)
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
            <Cpu className="w-3.5 h-3.5" />
            {language === "ar" ? "فلسفة العمل والهندسة" : "Engineering DNA & Philosophy"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "ar" ? "المبادئ الثلاثة الحاكمة لكل سطر برمجي" : "Three Principles Governing Every Line of Code"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "ar"
              ? "لا نكتب الكود لمجرد البرمجة، بل لبناء حلول مؤسسية متينة تحقق أهداف العمل وتدوم لسنوات"
              : "We don't write code for the sake of code. We architect enduring enterprise systems that solve real challenges."}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {[
            {
              icon: <Lightbulb className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
              badge: language === "ar" ? "المبدأ 01" : "Principle 01",
              title: language === "ar" ? "عقلية حل المشكلات أولاً" : "Problem-First Architecture",
              desc: language === "ar"
                ? "البدء دائماً بفهم عميق لاحتياج العميل، تدفقات العمل، واختناقات الأداء قبل كتابة سطر كود واحد، لضمان أعلى عائد استثماري للحل التقني."
                : "Deep immersion in business workflows, constraints, and pain points before writing code to maximize software ROI.",
            },
            {
              icon: <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
              badge: language === "ar" ? "المبدأ 02" : "Principle 02",
              title: language === "ar" ? "معمارية نظيفة وقابلة للتوسع" : "Clean & Modular Scalability",
              desc: language === "ar"
                ? "اعتماد المعايير الدولية في هندسة قواعد البيانات، الـ APIs النظيفة، وفصل المسؤوليات، مما يجعل النظام قابلاً للنمو والتطوير دون تراكم ديون تقنية."
                : "Adhering to strict modular architectures, relational schema normalization, and decoupled APIs that scale without technical debt.",
            },
            {
              icon: <Rocket className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
              badge: language === "ar" ? "المبدأ 03" : "Principle 03",
              title: language === "ar" ? "تصميم يضع الإنسان في المركز" : "Human-Centered Product Design",
              desc: language === "ar"
                ? "أقوى نظام في العالم يفقد جدواه إن كان معقداً أو مربكاً للموظف. ندمج بين صرامة الـ ERP وبساطة وسرعة واجهات الـ UI/UX الحديثة."
                : "The most powerful backend is useless if employees dread using it. We marry ERP rigor with fluid, intuitive consumer-grade UX.",
            },
          ].map((card, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 group h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/40 transition-colors">
                      {card.icon}
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          3. CORE PILLARS (01–04) — Inspired by Maha Qudwa
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <Sparkles className="w-3.5 h-3.5" />
            {t.pillars.sectionBadge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.pillars.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.pillars.subheading}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.12}>
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 group overflow-hidden"
              >
                {/* Large Background Watermark Number (Maha Qudwa style) */}
                <span className="absolute -top-3 right-4 rtl:right-auto rtl:left-4 text-7xl sm:text-8xl font-black font-mono text-slate-100 dark:text-slate-800/40 select-none pointer-events-none group-hover:text-teal-500/10 transition-colors duration-500">
                  {pillar.number}
                </span>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      PILLAR {pillar.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-teal-50 dark:bg-slate-800 border border-teal-100 dark:border-slate-700 group-hover:bg-teal-100 dark:group-hover:bg-teal-950/40 transition-colors duration-300">
                      {pillarIcons[pillar.icon]}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {language === "ar" ? pillar.titleAr : pillar.titleEn}
                    </h3>
                    <p className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                      {language === "ar" ? pillar.subtitleAr : pillar.subtitleEn}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === "ar" ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {pillar.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 group-hover:border-teal-300/40 dark:group-hover:border-teal-700/40 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          4. FEATURED PROJECT SPOTLIGHT — Browser Mockup
             (With Visual Mockup Banner & Split Breakdown)
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
                src={featuredProject.coverImage ? featuredProject.coverImage.replace(".jpg", ".svg") : "/assets/images/projects/erp-smart-service.svg"}
                alt={language === "ar" ? featuredProject.titleAr : featuredProject.titleEn}
                fill
                unoptimized
                className="object-cover object-center opacity-85 hover:opacity-100 transition-opacity"
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
          5. BIO-TELEMETRY SKILLS MESH WITH GAUGES
             (Inspired by Gouda Nasrallah)
         ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <Code2 className="w-3.5 h-3.5" />
            {language === "ar" ? "شبكة المهارات والجاهزية الإنتاجية" : "Telemetry Skills & Production Readiness"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "ar" ? "جاهزية تشغيلية كاملة وأدوات تم اختبارها بالإنتاج" : "Production-Tested Stack & Operational Readiness"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
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
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase">
                {t.selectedProjects.sectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t.selectedProjects.heading}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
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
                        src={project.coverImage ? project.coverImage.replace(".jpg", ".svg") : "/assets/images/projects/erp-smart-service.svg"}
                        alt={language === "ar" ? project.titleAr : project.titleEn}
                        fill
                        unoptimized
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
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
             (Distinct Dual-Track Architecture)
         ══════════════════════════════════════════════ */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/95 via-slate-900 to-indigo-900/90 border border-indigo-700/40 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                <GraduationCap className="w-4 h-4" />
                {t.trainingTeaser.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.trainingTeaser.heading}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {t.trainingTeaser.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-indigo-800/60 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-300">
                    <AnimatedCounter value={config.trainingProgramsCount} />
                  </div>
                  <div className="text-xs text-slate-400">{t.trainingTeaser.programsCount}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-300">
                    <AnimatedCounter value={config.workshopsCount} />
                  </div>
                  <div className="text-xs text-slate-400">{t.trainingTeaser.workshopsCount}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-300">
                    <AnimatedCounter value={config.traineesCount} />
                  </div>
                  <div className="text-xs text-slate-400">{t.trainingTeaser.traineesCount}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/training"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm sm:text-base shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/25"
              >
                <span>{t.trainingTeaser.exploreBtn}</span>
                <Arrow className="w-4 h-4" />
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
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <Award className="w-3.5 h-3.5" />
            {language === "ar" ? "محطات وإشارات على الطريق" : "Signals Along The Way"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "ar" ? "اعتمادات وإنجازات رسّخت الخبرة" : "Milestones, Credentials & Honors"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
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

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {language === "ar" ? "جاهز لبناء شيء استثنائي معاً؟" : "Let's Build Something Exceptional Together"}
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
                  src={selectedProject.coverImage ? selectedProject.coverImage.replace(".jpg", ".svg") : "/assets/images/projects/erp-smart-service.svg"}
                  alt={language === "ar" ? selectedProject.titleAr : selectedProject.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-top"
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

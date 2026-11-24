"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Award,
  MessageSquare,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";

export default function ContactPage() {
  const { language, t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "erp",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("m.i.aljazzar19@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", requestType: "erp", message: "" });
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Structured Contact Channels with specialized icons and colors
  const directChannels = [
    {
      id: "email",
      label: language === "ar" ? "البريد الإلكتروني" : "Direct Email",
      value: "m.i.aljazzar19@gmail.com",
      href: "mailto:m.i.aljazzar19@gmail.com",
      badge: language === "ar" ? "المراسلة الرسمية" : "Official Inquiries",
      isCopy: true,
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-900/40",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      id: "whatsapp",
      label: language === "ar" ? "واتساب والهاتف" : "WhatsApp & Phone",
      value: "+970 59 804 8284",
      href: "https://wa.me/970598048284",
      badge: language === "ar" ? "محادثة فورية" : "Instant Chat",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-900/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
        </svg>
      ),
    },
    {
      id: "location",
      label: language === "ar" ? "الموقع ونطاق العمل" : "Location & Scope",
      value: language === "ar" ? "فلسطين (متاح للعمل عن بُعد)" : "Palestine (Remote Globally)",
      subtext: language === "ar" ? "الشرق الأوسط، الخليج، أوروبا" : "Middle East, Gulf, Europe & Worldwide",
      badge: language === "ar" ? "مرونة التعاقد" : "Flexible Contract",
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-900/40",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  // Professional networks & verified accounts
  const socialProfiles = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohammed-aljazzar/",
      role: language === "ar" ? "الملف المهني الرسمي" : "Professional Network",
      handle: "in/mohammed-aljazzar",
      brandColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Mohammed-Aljazzar",
      role: language === "ar" ? "المستودعات والمشاريع البرمجية" : "Code Repositories",
      handle: "Mohammed-Aljazzar",
      brandColor: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
    {
      name: "Behance",
      url: "https://www.behance.net/moh_aljazzar",
      role: language === "ar" ? "تصاميم واجهات وتجربة المستخدم" : "UI/UX & Product Design",
      handle: "moh_aljazzar",
      brandColor: "hover:text-[#0057ff] hover:border-[#0057ff]/40 hover:bg-[#0057ff]/5",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.468 0-5.555-2.504-5.555-5.918 0-3.515 2.196-6.082 5.565-6.082 3.493 0 5.234 2.459 5.234 5.761 0 .524-.055 1.085-.098 1.367h-7.669c.075 1.777 1.363 2.923 3.197 2.923 1.488 0 2.493-.655 2.871-1.571l1.626.52zm-7.643-3.691h4.945c-.075-1.429-.982-2.42-2.404-2.42-1.399 0-2.443.957-2.541 2.42zm-9.083 5.691h-7v-14h7.525c3.275 0 5.475 1.636 5.475 4.498 0 1.614-.852 2.986-2.185 3.731 1.771.693 2.76 2.373 2.76 4.316 0 3.325-2.585 5.455-6.575 5.455zm-4-8h3.393c1.721 0 2.825-.795 2.825-2.072 0-1.332-1.076-2.071-2.73-2.071h-3.488v4.143zm0 6.143h3.766c1.884 0 3.184-.882 3.184-2.298 0-1.442-1.258-2.298-3.094-2.298h-3.856v4.596z" />
        </svg>
      ),
    },
    {
      name: "Mostaql",
      url: "https://mostaql.com/u/Mohammed_Aljazzar",
      role: language === "ar" ? "منصة العمل الحر الموثقة" : "Verified Freelance Account",
      handle: "Mohammed_Aljazzar",
      brandColor: "hover:text-[#2388ff] hover:border-[#2388ff]/40 hover:bg-[#2388ff]/5",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V7h2v3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* ══════════════════════════════════════════════
          1. HERO HEADER (Clean, Soft & Modern)
         ══════════════════════════════════════════════ */}
      <header className="py-12 sm:py-16 text-center max-w-3xl mx-auto px-4 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/70 dark:border-teal-800/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{language === "ar" ? "متاح للتعاقد والمشاريع الجديدة" : "Available for new projects"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          {language === "ar" ? (
            <>
              لنبدأ العمل معاً، أو حمّل{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                السيرة الذاتية
              </span>
            </>
          ) : (
            <>
              Let&apos;s build together, or get my{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                Resume
              </span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {language === "ar"
            ? "يسعدني دائماً بحث فرص التعاون في تطوير أنظمة ERP، التطبيقات السحابية المتكاملة، وتصميم تجارب المستخدم، أو مناقشة انضمامي لفريقك كمهندس برمجيات متكامل."
            : "I am always open to discussing new ERP implementations, custom full-stack software, UI/UX systems, or high-impact engineering roles."}
        </p>

        {/* Quick Contact Icons Strip Under Title */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {/* Email Icon */}
          <a
            href="mailto:m.i.aljazzar19@gmail.com"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/40 shadow-xs text-xs font-medium transition-all"
            title="m.i.aljazzar19@gmail.com"
          >
            <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span dir="ltr">m.i.aljazzar19@gmail.com</span>
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/970598048284"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs text-xs font-medium transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span dir="ltr">+970 59 804 8284</span>
          </a>

          {/* Location Badge */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{language === "ar" ? "فلسطين (عن بُعد)" : "Palestine (Remote)"}</span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          3. MAIN CONTENT CONTAINER
         ══════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">

        {/* ── CARD: RESUME DOWNLOAD & OVERVIEW (السيرة الذاتية المعتمدة) ── */}
        <section
          aria-labelledby="cv-heading"
          className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white via-white to-slate-50/50 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-900/60 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 id="cv-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {language === "ar" ? "السيرة الذاتية المهنية (Curriculum Vitae)" : "Professional Resume & Credentials"}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/70">
                    PDF 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                  {language === "ar"
                    ? "ملف شامل ومحدث يضم سجل الخبرات العملية، المشاريع المنجزة، الشهادات الاحترافية، والمهارات التقنية."
                    : "Complete, updated overview of professional experience, enterprise projects, technical competencies, and credentials."}
                </p>
              </div>
            </div>

            {/* Resume Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/25 transition-all cursor-pointer group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>{language === "ar" ? "تحميل السيرة (عربي)" : "Resume (Arabic)"}</span>
              </a>

              <a
                href="/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer group"
              >
                <Download className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>{language === "ar" ? "تحميل السيرة (English)" : "Resume (English)"}</span>
              </a>
            </div>
          </div>

          {/* Core Highlights Pills under CV */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/70">
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase tracking-wider">
                {language === "ar" ? "المؤهل الدراسي" : "Degree"}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {language === "ar" ? "بكالوريوس هندسة برمجيات" : "B.Sc. Software Engineering"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/70">
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase tracking-wider">
                {language === "ar" ? "سنوات الخبرة" : "Experience"}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {language === "ar" ? "+4 سنوات خبرة عملية" : "+4 Professional Years"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/70">
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase tracking-wider">
                {language === "ar" ? "التخصصات الرئيسية" : "Core Domains"}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                ERP, Full-Stack, UI/UX
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/70">
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase tracking-wider">
                {language === "ar" ? "التوفر الحالي" : "Availability"}
              </span>
              <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{language === "ar" ? "عن بُعد / دوام مرن" : "Remote & Flexible"}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── TWO-COLUMN GRID: CONTACT METHODS & MESSAGE FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Direct Cards & Verified Networks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Cards */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === "ar" ? "طرق التواصل المباشر" : "Direct Channels"}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  <span>{language === "ar" ? "رد خلال ساعات العمل" : "Same-day reply"}</span>
                </span>
              </div>

              {/* 1. Email Card with Copy Action */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-teal-500/40 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        {language === "ar" ? "البريد الإلكتروني الرسمي" : "Official Email"}
                      </span>
                      <a
                        href="mailto:m.i.aljazzar19@gmail.com"
                        className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 block"
                        dir="ltr"
                      >
                        m.i.aljazzar19@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title={language === "ar" ? "نسخ البريد" : "Copy email"}
                  >
                    {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {copied && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium ps-10">
                    {language === "ar" ? "تم نسخ البريد بنجاح!" : "Email copied to clipboard!"}
                  </p>
                )}
              </div>

              {/* 2. WhatsApp Direct Chat */}
              <a
                href="https://wa.me/970598048284"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/15 dark:hover:bg-emerald-950/15 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      {language === "ar" ? "واتساب والهاتف" : "WhatsApp"}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-slate-100 block" dir="ltr">
                      +970 59 804 8284
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                  <span>{language === "ar" ? "محادثة فورية" : "Chat Now"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* 3. Location & Availability */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {language === "ar" ? "الموقع ونطاق التعاقد" : "Location & Work Model"}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {language === "ar" ? "فلسطين (متاح للعمل عن بُعد عالمياً)" : "Palestine (Remote Globally)"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === "ar"
                      ? "تعاقدات مرنة وسريعة مع شركات الخليج، أوروبا، والشرق الأوسط."
                      : "Seamless remote collaboration with teams in the Gulf, Europe & worldwide."}
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Verified Business Profiles with Brand Badges */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === "ar" ? "القنوات المهنية الموثقة" : "Verified Professional Channels"}
                </h3>
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {socialProfiles.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 transition-all flex flex-col justify-between gap-3 group ${item.brandColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-slate-600 dark:text-slate-300 transition-colors">
                        {item.icon}
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    </div>

                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {item.role}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Modern & Soft Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 lg:p-9 shadow-xs space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {language === "ar" ? "أرسل رسالة مباشرة" : "Send a Direct Message"}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 ps-10">
                  {language === "ar"
                    ? "املأ النموذج وسيصلني إشعار فوري للرد على استفسارك خلال اليوم."
                    : "Fill out the fields below and I will get back to you promptly today."}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-teal-900 dark:text-teal-200">
                      {t.contactPage.successTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-800/90 dark:text-teal-300/90 max-w-sm mx-auto leading-relaxed">
                      {t.contactPage.successDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
                  >
                    {t.contactPage.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4.5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t.contactPage.nameLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contactPage.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {t.contactPage.emailLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contactPage.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Project / Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t.contactPage.typeLabel}
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <option value="erp">{t.contactPage.typeOptions.erp}</option>
                      <option value="backend">{t.contactPage.typeOptions.backend}</option>
                      <option value="uiux">{t.contactPage.typeOptions.uiux}</option>
                      <option value="training">{t.contactPage.typeOptions.training}</option>
                      <option value="consulting">{t.contactPage.typeOptions.consulting}</option>
                      <option value="other">{t.contactPage.typeOptions.other}</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t.contactPage.messageLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contactPage.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-teal-500/25 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? t.contactPage.sending : t.contactPage.submitBtn}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

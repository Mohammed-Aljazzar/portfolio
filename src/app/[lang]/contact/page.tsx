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
    setTimeout(() => setCopied(false), 2500);
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

  // Structured Social Platforms
  const professionalNetworks = [
    {
      name: "LinkedIn",
      handle: "in/mohammed-aljazzar",
      url: "https://www.linkedin.com/in/mohammed-aljazzar/",
      badge: language === "ar" ? "الملف المهني" : "Professional",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      handle: "Mohammed-Aljazzar",
      url: "https://github.com/Mohammed-Aljazzar",
      badge: language === "ar" ? "المستودعات" : "Repositories",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
    {
      name: "Behance",
      handle: "moh_aljazzar",
      url: "https://www.behance.net/moh_aljazzar",
      badge: language === "ar" ? "معرض التصميم" : "UI/UX Portfolio",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.468 0-5.555-2.504-5.555-5.918 0-3.515 2.196-6.082 5.565-6.082 3.493 0 5.234 2.459 5.234 5.761 0 .524-.055 1.085-.098 1.367h-7.669c.075 1.777 1.363 2.923 3.197 2.923 1.488 0 2.493-.655 2.871-1.571l1.626.52zm-7.643-3.691h4.945c-.075-1.429-.982-2.42-2.404-2.42-1.399 0-2.443.957-2.541 2.42zm-9.083 5.691h-7v-14h7.525c3.275 0 5.475 1.636 5.475 4.498 0 1.614-.852 2.986-2.185 3.731 1.771.693 2.76 2.373 2.76 4.316 0 3.325-2.585 5.455-6.575 5.455zm-4-8h3.393c1.721 0 2.825-.795 2.825-2.072 0-1.332-1.076-2.071-2.73-2.071h-3.488v4.143zm0 6.143h3.766c1.884 0 3.184-.882 3.184-2.298 0-1.442-1.258-2.298-3.094-2.298h-3.856v4.596z" />
        </svg>
      ),
    },
    {
      name: "Mostaql",
      handle: "Mohammed_Aljazzar",
      url: "https://mostaql.com/u/Mohammed_Aljazzar",
      badge: language === "ar" ? "العمل الحر" : "Freelance",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V7h2v3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100">
      {/* ══════════════════════════════════════════════
          1. BREADCRUMBS
         ══════════════════════════════════════════════ */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href={`/${language}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              {language === "ar" ? "التواصل والسيرة الذاتية" : "Contact & Resume"}
            </span>
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. HEADER / HERO (Editorial & Clean)
         ══════════════════════════════════════════════ */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0B1120] py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-start">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "مركز التواصل والتوظيف" : "CONNECT & HIRING HUB"}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{language === "ar" ? "متاح للمشاريع والتعاقد فوراً" : "Open to opportunities"}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {language === "ar" ? (
              <>
                تواصل معي لبدء تعاون ناجح، أو حمّل{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  السيرة الذاتية
                </span>
              </>
            ) : (
              <>
                Let&apos;s build something great, or get my{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  Resume & Credentials
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {language === "ar"
              ? "سواء كنت تبحث عن استشارة في أنظمة ERP، تطوير منصة مخصصة، أو ترغب في ضم خبراتي لفريقك كمهندس برمجيات متكامل، يسعدني التواصل المباشر معك."
              : "Whether you need enterprise ERP consulting, a full-stack platform, or want to discuss a software engineering role, feel free to reach out directly."}
          </p>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          3. MAIN CONTENT
         ══════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

        {/* ── CARD: RESUME & CREDENTIALS (السيرة الذاتية والملف المهني) ── */}
        <section aria-labelledby="resume-heading" className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 id="resume-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {language === "ar" ? "السيرة الذاتية والملف المهني (CV & Resume)" : "Curriculum Vitae & Resume"}
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/70">
                    PDF 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {language === "ar"
                    ? "نسخة محدثة جاهزة للتحميل والطباعة باللغتين العربية والإنجليزية، تتضمن ملخص المشاريع وسجل الخبرات."
                    : "Updated versions ready for download in both Arabic and English, covering project highlights and career track."}
                </p>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{language === "ar" ? "تحميل السيرة (عربي)" : "Resume (Arabic)"}</span>
              </a>

              <a
                href="/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <Download className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{language === "ar" ? "تحميل السيرة (English)" : "Resume (English)"}</span>
              </a>
            </div>
          </div>

          {/* Quick Stats Grid under CV */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                {language === "ar" ? "الدرجة العلمية" : "Education"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {language === "ar" ? "بكالوريوس هندسة برمجيات" : "B.Sc. Software Engineering"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                {language === "ar" ? "سنوات الخبرة" : "Experience"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {language === "ar" ? "+4 سنوات احترافية" : "+4 Professional Years"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                {language === "ar" ? "المجالات الرئيسية" : "Focus Areas"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                ERP, Full-Stack, UI/UX
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                {language === "ar" ? "حالة التعاقد" : "Availability"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {language === "ar" ? "عن بُعد / دوام مرن" : "Remote & Flexible"}
              </p>
            </div>
          </div>
        </section>

        {/* ── TWO COLUMN: DIRECT CONTACT INFO & SEND MESSAGE FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Direct Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === "ar" ? "قنوات التواصل السريع" : "Direct Channels"}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {language === "ar" ? "رد خلال ساعات العمل" : "Active response"}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </span>
                    <a
                      href="mailto:m.i.aljazzar19@gmail.com"
                      className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 block truncate"
                      dir="ltr"
                    >
                      m.i.aljazzar19@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/970598048284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      {language === "ar" ? "واتساب والهاتف" : "WhatsApp & Phone"}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200 block" dir="ltr">
                      +970 59 804 8284
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 group-hover:underline shrink-0">
                  <span>{language === "ar" ? "محادثة" : "Chat"}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === "ar" ? "فلسطين (متاح للعمل عن بُعد)" : "Palestine (Remote Globally)"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    {language === "ar"
                      ? "تعاقدات مرنة مع أسواق الشرق الأوسط، أوروبا، ودولياً."
                      : "Open to engagements across Middle East, Europe & globally."}
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Verified Profiles */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                {language === "ar" ? "الحسابات المهنية والمنصات" : "Professional Profiles"}
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {professionalNetworks.map((net) => (
                  <a
                    key={net.name}
                    href={net.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-teal-500/40 hover:bg-teal-50/10 dark:hover:bg-slate-800 transition-all flex flex-col justify-between gap-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-slate-600 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {net.icon}
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {net.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {net.badge}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Clean Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {language === "ar" ? "أرسل رسالة أو استفساراً" : "Send a Message"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {language === "ar"
                    ? "املأ النموذج التالي وسيصلني إشعار فوري للرد عليك في أقرب وقت."
                    : "Fill out the form below and I will respond to your inquiry promptly."}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-teal-900 dark:text-teal-200">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-800/90 dark:text-teal-300/90 max-w-sm mx-auto">
                    {t.contactPage.successDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors cursor-pointer"
                  >
                    {t.contactPage.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 text-xs sm:text-sm transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 text-xs sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Request Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t.contactPage.typeLabel}
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <option value="erp">{t.contactPage.typeOptions.erp}</option>
                      <option value="backend">{t.contactPage.typeOptions.backend}</option>
                      <option value="uiux">{t.contactPage.typeOptions.uiux}</option>
                      <option value="training">{t.contactPage.typeOptions.training}</option>
                      <option value="consulting">{t.contactPage.typeOptions.consulting}</option>
                      <option value="other">{t.contactPage.typeOptions.other}</option>
                    </select>
                  </div>

                  {/* Message */}
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 text-xs sm:text-sm transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
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

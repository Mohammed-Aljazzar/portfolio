"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  Sparkles, Layers, Server, Layout, Palette, GraduationCap, Award,
  CheckCircle2, Calendar, MapPin, ArrowRight, ArrowLeft, Download,
  MessageCircle, Mail, Globe, ArrowUpRight, ShieldCheck,
} from "lucide-react";

export default function AboutPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"erp" | "backend" | "frontend" | "uiux">("erp");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const config = initialData.config;
  const skills = initialData.skills;
  const edu = initialData.education[0];
  const certs = initialData.certifications;

  // Telemetry gauge percentages for skills (aligned with Home page)
  const skillGauges: Record<string, number> = {
    "Odoo (Official Odoo S.A. Certified)": 98,
    "نظام أودو (معتمد رسمياً)": 98,
    "Frappe Framework": 96,
    "إطار عمل فريبه (Frappe Framework)": 96,
    "ERPNext": 95,
    "نظام ERPNext المؤسسي": 95,
    "Custom Modules & DocTypes": 96,
    "موديولات ونماذج بيانات مخصصة": 96,
    "Python": 95,
    "لغة بايثون (Python)": 95,
    "Django": 92,
    "إطار عمل دجانغو (Django)": 92,
    "REST APIs & Integrations": 94,
    "واجهات برمجة التطبيقات (REST APIs)": 94,
    "PostgreSQL": 90,
    "قواعد بيانات PostgreSQL": 90,
    "Next.js": 94,
    "إطار عمل Next.js الحديث": 94,
    "React": 95,
    "مكتبة React.js للواجهات": 95,
    "TypeScript": 92,
    "لغة TypeScript النظيفة": 92,
    "Tailwind CSS": 96,
    "تنسيقات Tailwind CSS": 96,
    "Figma": 92,
    "أداة فيجما (Figma)": 92,
    "Design Systems": 90,
    "نظم التصميم الشاملة (Design Systems)": 90,
    "UI/UX Design": 91,
    "تصميم واجهات وتجربة المستخدم": 91,
    "Prototyping & Wireframing": 92,
    "النماذج التفاعلية والمخططات الهيكلية": 92,
  };

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

  const tabOptions = [
    { id: "erp", label: language === "ar" ? "أنظمة ERP وأتمتة الأعمال" : "ERP & Business Automation", icon: <Layers className="w-4 h-4 shrink-0" /> },
    { id: "backend", label: language === "ar" ? "الباك إند وقواعد البيانات" : "Backend & DevOps", icon: <Server className="w-4 h-4 shrink-0" /> },
    { id: "frontend", label: language === "ar" ? "الفرونت إند والويب" : "Frontend & Web Apps", icon: <Layout className="w-4 h-4 shrink-0" /> },
    { id: "uiux", label: language === "ar" ? "تصميم واجهات وتجربة UI/UX" : "UI/UX & Product Design", icon: <Palette className="w-4 h-4 shrink-0" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
      {/* ══════════════════════════════════════════════
          1. HEADER & PROFESSIONAL JOURNEY
          Refined Typography & Harmonized Cards
         ══════════════════════════════════════════════ */}
      <section className="space-y-10 sm:space-y-12">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {language === "ar" ? "نبذة مهنية وشخصية" : "BIOGRAPHY & BACKGROUND"}
              </span>
            </div>

            {/* Main Title — Refined, Classy & Smooth Typography */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {language === "ar" ? (
                <>
                  القصة المهنية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    المسار الهندسي
                  </span>
                </>
              ) : (
                <>
                  Professional Journey &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Engineering Path
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {t.aboutPage.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Responsive Layout (Portrait & Story) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Portrait Column (Top on mobile, left/right on desktop) */}
          <ScrollReveal className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start" direction="left">
            <div className="relative w-full max-w-[315px] sm:max-w-[360px] lg:max-w-[420px] aspect-[4/5] sm:h-[28rem] lg:h-[31rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
              <Image
                src={config.avatarUrl}
                alt={language === "ar" ? config.nameAr : config.nameEn}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90" />
              
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
            </div>

            {/* Key Credentials Box */}
            <div className="w-full max-w-[315px] sm:max-w-[360px] lg:max-w-[420px] rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 space-y-3.5 shadow-xs hover:border-teal-500/30 transition-all">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <h4 className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  {language === "ar" ? "الاعتمادات الرئيسية" : "Key Credentials"}
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 text-start">
                {[
                  "Official Odoo Certified Developer — Odoo S.A.",
                  "ERPNext & Frappe Custom Applications Specialist",
                  "Advanced UI/UX Design Specialist — Gaza Sky Geeks",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Journey Story Column */}
          <ScrollReveal className="lg:col-span-7 space-y-6 text-start" direction="right">
            <div className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                {t.aboutPage.journeyTitle}
              </h3>
              
              <div className="space-y-4 text-xs sm:text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                <p>{t.aboutPage.journeyP1}</p>
                <p>{t.aboutPage.journeyP2}</p>
                <p>{t.aboutPage.journeyP3}</p>
              </div>

              {/* CV Download Buttons & Experience Link — Matching Home Page Style */}
              <div className="pt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all group"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.nav.cvArabic}</span>
                  </a>

                  <a
                    href="/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{t.nav.cvEnglish}</span>
                  </a>
                </div>

                <Link
                  href={`/${language}/experience`}
                  className="inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline transition-all"
                >
                  <span>{language === "ar" ? "استعرض سجل الخبرات" : "View Experience Track"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. TECHNICAL ARSENAL & SKILLS MESH
          Telemetry Gauges & Swiper Draggable Tabs
         ══════════════════════════════════════════════ */}
      <section className="space-y-8 sm:space-y-10">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {language === "ar" ? "الترسانة التقنية والمهارات" : "TECHNICAL ARSENAL & SKILLS"}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {t.aboutPage.skillsMeshTitle}
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {t.aboutPage.skillsMeshDesc}
            </p>
          </div>
        </ScrollReveal>

        {/* Skill Tabs — Draggable & Swipeable without visible scrollbars */}
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
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (hasTabsDraggedRef.current) {
                      hasTabsDraggedRef.current = false;
                      return;
                    }
                    setActiveTab(tab.id as any);
                  }}
                  className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
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
          {skills[activeTab].map((skill, idx) => {
            const skillName = language === "ar" ? skill.nameAr : skill.nameEn;
            const gauge = skillGauges[skill.nameEn] || skillGauges[skill.nameAr] || 90;

            return (
              <StaggerItem key={`${activeTab}-${idx}`}>
                <motion.div
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-2xs group text-start"
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

                  {/* Telemetry Gauge Bar */}
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
          3. ACADEMIC EDUCATION & CERTIFICATIONS
          Matching Work Philosophy Bento Card Aesthetic
         ══════════════════════════════════════════════ */}
      <section className="space-y-8 sm:space-y-10 pt-4">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {t.aboutPage.educationBadge}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {t.aboutPage.educationTitle}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.1}>
          {/* Education Card */}
          <StaggerItem className="h-full">
            <motion.div
              className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between text-start h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {language === "ar" ? edu.degreeAr : edu.degreeEn}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {language === "ar" ? edu.institutionAr : edu.institutionEn}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{language === "ar" ? edu.gradeAr : edu.gradeEn}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "ar" ? edu.detailsAr : edu.detailsEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{language === "ar" ? edu.locationAr : edu.locationEn}</span>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Certifications Card */}
          <StaggerItem className="h-full">
            <motion.div
              className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between text-start h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                    Official
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {language === "ar" ? "الشهادات والاعتمادات المهنية" : "Certifications & Credentials"}
                </h3>

                <ul className="space-y-3.5 pt-1">
                  {certs.map((cert) => (
                    <li key={cert.id} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white leading-snug">
                          {language === "ar" ? cert.titleAr : cert.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {language === "ar" ? cert.issuerAr : cert.issuerEn} · {language === "ar" ? cert.dateAr : cert.dateEn}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === "ar" ? "اعتمادات موثقة من جهات دولية معتمدة" : "Verified by official international bodies"}</span>
              </div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ══════════════════════════════════════════════
          4. CLOSING COLLABORATION BANNER
          Exact match to Home page contact teaser
         ══════════════════════════════════════════════ */}
      <ScrollReveal>
        <div className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xs hover:shadow-xl hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14">
            {/* Content Column */}
            <div className="flex-1 space-y-4 text-start">
              <div className="flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === "ar" ? "جاهز لبدء تعاون هندسي جديد" : "Ready for New Engineering Collaborations"}</span>
                </div>

                <div className="flex items-center justify-start gap-2">
                  <span className="w-5 h-[1.5px] bg-teal-500 rounded-full inline-block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    {language === "ar" ? "الخطوة التالية" : "NEXT STEP"}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                {language === "ar"
                  ? "جاهز لبناء شيء استثنائي يدوم معاً؟"
                  : "Ready to Architect Something Exceptional Together?"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
                {language === "ar"
                  ? "سواء كنت بحاجة لبناء وتخصيص نظام ERP متكامل، تطوير منصة ويب متقدمة، أو استشارة تقنية معمقة؛ يسعدني التواصل ومناقشة تفاصيل مشروعك."
                  : "Whether you need custom ERP engineering, scalable web architectures, or technical consulting, let's connect and discuss your vision."}
              </p>
            </div>

            {/* Action Buttons Stack (Side-by-side on tablet, stacked on mobile/desktop) */}
            <div className="w-full lg:w-64 shrink-0 flex flex-col items-stretch sm:items-start lg:items-stretch space-y-3">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-full">
                <a
                  href="https://wa.me/972598048284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-teal-500/25 transition-all duration-200 group text-center hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{language === "ar" ? "ابدأ محادثة" : "Start a Conversation"}</span>
                </a>

                <a
                  href="mailto:m.i.aljazzar19@gmail.com"
                  className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-bold text-sm shadow-2xs hover:shadow-sm transition-all duration-200 group text-center whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
                  <span>{language === "ar" ? "أرسل بريداً" : "Send an Email"}</span>
                </a>
              </div>

              <p className="text-[11.5px] text-slate-400 dark:text-slate-500 text-center sm:text-start lg:text-center font-normal pt-1">
                {language === "ar" ? "أرد عادةً في أقرب وقت أكون فيه متاحًا." : "Usually reply as soon as available."}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

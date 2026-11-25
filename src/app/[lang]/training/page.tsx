"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  GraduationCap,
  Users,
  Clock,
  Building2,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Target,
  Award,
  Layers,
  Terminal,
  Presentation,
  CheckCircle2,
  Image as ImageIcon,
  Flame,
} from "lucide-react";

export default function TrainingPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "programs" | "workshops">("all");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const overview = initialData.trainingOverview;
  const partners = initialData.trainingPartners;
  const programs = initialData.trainingPrograms;
  const workshops = initialData.workshops;

  // Custom visual icons / logos for partner organizations
  const getPartnerIcon = (nameAr: string) => {
    if (nameAr.includes("بيديا") || nameAr.includes("Pidea")) {
      return (
        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
      );
    }
    if (nameAr.includes("SkillUp")) {
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
          <Award className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
        <Building2 className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 selection:bg-teal-500 selection:text-white">
      {/* ══════════════════════════════════════════════
          1. HEADER & OVERLINE (Matches Home, Projects, Experience & Contact)
         ══════════════════════════════════════════════ */}
      <section className="space-y-6 sm:space-y-8">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {language === "ar" ? "التدريب التقني وتمكين الكفاءات" : "TECHNICAL TRAINING & MENTORSHIP"}
              </span>
            </div>

            {/* Main Title — Balanced, Refined & Modern Typography */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {language === "ar" ? (
                <>
                  سجل البرامج التدريبية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    ورش العمل التقنية
                  </span>
                </>
              ) : (
                <>
                  Technical Training &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Workshops Catalog
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-[13.5px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {language === "ar"
                ? "سجل حافل بتقديم البرامج التدريبية المتخصصة وورش العمل التطبيقية لإعداد الكوادر التقنية لسوق العمل الدولي والعمل الحر وبناء البرمجيات الحديثة."
                : "A documented track record of executing practical training programs, bootcamps, and masterclasses preparing tech talent for global remote work and engineering."}
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════
            2. CERTIFIED INSTRUCTOR & PHILOSOPHY CARD
           ══════════════════════════════════════════════ */}
        <ScrollReveal delay={0.04}>
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4 hover:border-teal-500/40 transition-colors text-start">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/70 dark:border-teal-800/70 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {language === "ar" ? overview.roleAr : overview.roleEn}
                  </h2>
                  <div className="text-xs font-mono text-teal-600 dark:text-teal-400 font-medium">
                    {language === "ar" ? overview.periodAr : overview.periodEn}
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/70 w-fit self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                <span>{language === "ar" ? (overview.methodologyAr || "منهجية تدريب قائمة على المشاريع") : (overview.methodologyEn || "Project-Based Pedagogy")}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
              {language === "ar" ? overview.philosophyAr : overview.philosophyEn}
            </p>
          </div>
        </ScrollReveal>

        {/* ══════════════════════════════════════════════
            3. STATS OVERVIEW CARDS (4 Main Numbers)
           ══════════════════════════════════════════════ */}
        <ScrollReveal delay={0.06}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-start">
            {/* Stat 1: Programs */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5 hover:border-teal-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "ar" ? "الدورات المنفذة" : "Training Programs"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                +{overview.stats.programsCount}
              </div>
              <p className="text-[10.5px] text-slate-400 leading-tight">
                {language === "ar" ? "برامج دبلوم وتأسيس شاملة" : "Full diplomas & bootcamps"}
              </p>
            </div>

            {/* Stat 2: Workshops */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5 hover:border-teal-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "ar" ? "ورش العمل والمحاضرات" : "Workshops & Talks"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Presentation className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                +{overview.stats.workshopsCount}
              </div>
              <p className="text-[10.5px] text-slate-400 leading-tight">
                {language === "ar" ? "جلسات تخصصية وتطبيقية" : "Specialized tech masterclasses"}
              </p>
            </div>

            {/* Stat 3: Trainees */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5 hover:border-teal-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "ar" ? "إجمالي المتدربين" : "Trainees & Beneficiaries"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                +{overview.stats.traineesCount}
              </div>
              <p className="text-[10.5px] text-slate-400 leading-tight">
                {language === "ar" ? "خريج ومستفيد مباشر" : "Direct learners & graduates"}
              </p>
            </div>

            {/* Stat 4: Organizations (محسوبة تلقائياً بناءً على عدد الشركاء المضافين) */}
            <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5 hover:border-teal-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {language === "ar" ? "المؤسسات والشركاء" : "Partner Organizations"}
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                +{partners.length}
              </div>
              <p className="text-[10.5px] text-slate-400 leading-tight">
                {language === "ar" ? "أكاديميات ومراكز تكنولوجية" : "Academies & tech centers"}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════
          3. PARTNERS & INSTITUTIONS (شعار المؤسسة واسمها فقط)
         ══════════════════════════════════════════════ */}
      <section className="space-y-5 text-start">
        <ScrollReveal>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === "ar" ? "المؤسسات والجهات التدريبية الشريكة" : "Partner Institutions & Organizations"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === "ar"
                  ? "جهات وأكاديميات تم تنفيذ البرامج والورش التقنية بالتعاون معها"
                  : "Collaborative partnerships executing technical courses and masterclasses"}
              </p>
            </div>
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold hidden sm:inline-block">
              {partners.length} {language === "ar" ? "شراكات معتمدة" : "Partners"}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((partner, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.06}>
              <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 p-2.5 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={language === "ar" ? partner.nameAr : partner.nameEn}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                    {language === "ar" ? partner.nameAr : partner.nameEn}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FILTER TABS (All / Programs / Workshops)
         ══════════════════════════════════════════════ */}
      <section className="space-y-8 text-start">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === "ar" ? "الدورات والورش المقدمة" : "Delivered Programs & Workshops"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === "ar"
                  ? "تفاصيل ومحاور المناهج التطبيقية والورش العملية وساعات التدريب"
                  : "Comprehensive view of curriculums, practical workshops and training hours"}
              </p>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {language === "ar" ? "الكل" : "All"} ({programs.length + workshops.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("programs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "programs"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {language === "ar" ? "الدورات المعتمدة" : "Programs"} ({programs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("workshops")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "workshops"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {language === "ar" ? "ورش العمل" : "Workshops"} ({workshops.length})
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ── SUBSECTION A: CERTIFIED PROGRAMS ── */}
        {(activeTab === "all" || activeTab === "programs") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {language === "ar" ? "الدورات التدريبية المعتمدة (Certified Programs)" : "Certified Programs"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {programs.map((program, idx) => (
                <ScrollReveal key={program.id} delay={idx * 0.05}>
                  <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/40 transition-all flex flex-col justify-between gap-4 h-full group">
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                          <Building2 className="w-3 h-3" />
                          <span>{language === "ar" ? program.organizationAr : program.organizationEn}</span>
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 font-medium">
                          {program.batchesCount} {language === "ar" ? "أفواج" : "Batches"}
                        </span>
                      </div>

                      {/* Program Title */}
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {language === "ar" ? program.titleAr : program.titleEn}
                      </h4>

                      {/* Hours & Trainees Bar */}
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-500" />
                          <span>{program.totalHours} {language === "ar" ? "ساعة تدريبية" : "Hours"}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-teal-500" />
                          <span>+{program.traineesCount} {language === "ar" ? "متدرب" : "Trainees"}</span>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {language === "ar" ? program.descriptionAr : program.descriptionEn}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* ── SUBSECTION B: TECHNICAL WORKSHOPS ── */}
        {(activeTab === "all" || activeTab === "workshops") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {language === "ar" ? "ورش العمل والمحاضرات المتخصصة (Workshops)" : "Technical Workshops"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {workshops.map((ws, idx) => (
                <ScrollReveal key={ws.id} delay={idx * 0.04}>
                  <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-500/40 transition-all flex flex-col justify-between gap-4 h-full group">
                    <div className="space-y-3">
                      {/* Top Badges (Institution & Date) */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                          <Building2 className="w-3 h-3" />
                          <span>{language === "ar" ? ws.organizationAr : ws.organizationEn}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{ws.date}</span>
                        </span>
                      </div>

                      {/* Workshop Title */}
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {language === "ar" ? ws.titleAr : ws.titleEn}
                      </h4>

                      {/* Hours & Beneficiaries Stats */}
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{ws.hours} {language === "ar" ? "ساعات تدريبية" : "Hours"}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-indigo-500" />
                          <span>+{ws.beneficiariesCount} {language === "ar" ? "مستفيد" : "Learners"}</span>
                        </span>
                      </div>

                      {/* Workshop Summary */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {language === "ar" ? ws.descriptionAr : ws.descriptionEn}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          5. TRAINER PHOTO GALLERY (معرض صور التدريب والمحاضرات - شريط تمرير تلقائي مستمر)
         ══════════════════════════════════════════════ */}
      <section className="space-y-6 text-start overflow-hidden">
        <ScrollReveal>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {language === "ar" ? "معرض صور التدريب والمحاضرات" : "Training Moments & Visual Highlights"}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === "ar"
                  ? "لقطات وصور شخصية من تقديم وإدارة البرامج التدريبية والورش التقنية"
                  : "Photos and snapshots from delivering technical courses and training masterclasses"}
              </p>
            </div>
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold hidden sm:inline-block">
              {language === "ar" ? "تمرير تلقائي مستمر" : "Continuous Carousel"}
            </span>
          </div>
        </ScrollReveal>

        {/* Infinite Continuous Auto-Scrolling Carousel (بدون ضباب على الأطراف) */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee-scroll flex gap-5 items-center">
            {/* Double array to create seamless infinite loop from dynamic trainer photos */}
            {((overview as any).trainerPhotos && (overview as any).trainerPhotos.length > 0
              ? [...(overview as any).trainerPhotos, ...(overview as any).trainerPhotos, ...(overview as any).trainerPhotos]
              : [
                  {
                    src: "/assets/images/training/trainer-1.png",
                    captionAr: "المهندس محمد الجزار — مدرب ومحاضر تقني معتمد",
                    captionEn: "Eng. Mohammed Aljazzar — Certified Technical Instructor",
                  },
                  {
                    src: "/assets/images/training/trainer-2.png",
                    captionAr: "تقديم الورش التقنية والتدريب العملي المباشر",
                    captionEn: "Delivering hands-on technical workshops & training",
                  },
                  {
                    src: "/assets/images/training/trainer-3.jpg",
                    captionAr: "تمكين الكفاءات وتوجيه المتدربين نحو سوق العمل",
                    captionEn: "Empowering tech talent & career mentorship",
                  },
                  {
                    src: "/assets/images/training/trainer-1.png",
                    captionAr: "المهندس محمد الجزار — مدرب ومحاضر تقني معتمد",
                    captionEn: "Eng. Mohammed Aljazzar — Certified Technical Instructor",
                  },
                ]
            ).map((photo: any, i: number) => (
              <div
                key={i}
                className="shrink-0 w-64 sm:w-80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={photo.src}
                    alt={language === "ar" ? photo.captionAr : photo.captionEn}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-xs text-white font-medium leading-snug">
                      {language === "ar" ? photo.captionAr : photo.captionEn}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {language === "ar" ? photo.captionAr : photo.captionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* مؤشرات النقاط تحت شريط العرض (Indicator Dots) */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="w-6 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span className="w-2 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-2 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. CTA TO CONTACT FOR TRAINING ENQUIRIES
         ══════════════════════════════════════════════ */}
      <section>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/80 dark:from-slate-900 dark:via-slate-900/95 dark:to-teal-950/90 border border-teal-500/30 p-8 sm:p-10 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl text-start">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div className="relative space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{language === "ar" ? "جاهزية واستشارات تدريبية مخصصة" : "Customized Training Programs"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
                {language === "ar"
                  ? "هل ترغب في تنظيم برنامج تدريبي أو ورشة عمل لفريقك؟"
                  : "Looking to conduct technical workshops or bootcamps for your team?"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {language === "ar"
                  ? "متاح لتقديم برامج مخصصة وحقائب تدريبية عملية في تطوير أنظمة ERP، أطر عمل بايثون، هندسة واجهات Next.js، وتصميم أنظمة Figma مع متابعة مشاريع واقعية."
                  : "Available for tailored masterclasses in ERP systems, Python/Django, Next.js architecture, and Figma Design Systems with hands-on capstone mentoring."}
              </p>
            </div>

            <div className="relative shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/${language}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-teal-500/25 transition-all cursor-pointer group"
              >
                <span>{language === "ar" ? "تواصل لحجز تدريب" : "Inquire for Training"}</span>
                <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

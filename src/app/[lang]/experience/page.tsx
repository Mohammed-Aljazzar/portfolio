"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  Briefcase, Calendar, MapPin, CheckCircle2,
  ArrowRight, ArrowLeft, GraduationCap, Terminal,
  MessageCircle, Mail,
} from "lucide-react";

export default function ExperiencePage() {
  const { language, t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const engineeringExps = initialData.engineeringExperiences.filter((e) => e.category === "engineering");
  const operationsExps = initialData.engineeringExperiences.filter((e) => e.category === "operations");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
      {/* ══════════════════════════════════════════════
          1. HEADER & INTRODUCTION
         ══════════════════════════════════════════════ */}
      <section className="space-y-6 sm:space-y-8">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {language === "ar" ? "المسار المهني والخبرات" : "CAREER & ENGINEERING TRACK"}
              </span>
            </div>

            {/* Main Title — Refined, Classy & Smooth Typography */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {language === "ar" ? (
                <>
                  الخبرات المهنية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    تطوير البرمجيات
                  </span>
                </>
              ) : (
                <>
                  Professional Experience &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Software Track
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {t.experiencePage.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* Notice & Training Gateway Banner */}
        <ScrollReveal delay={0.06}>
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:border-teal-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-start">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {t.experiencePage.notice}
              </p>
            </div>
            <Link
              href={`/${language}/training`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all group shrink-0 self-start sm:self-auto whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.nav.training}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════
          2. ENGINEERING CAREER TIMELINE
         ══════════════════════════════════════════════ */}
      <section className="space-y-8">
        <div className="relative border-s-2 border-slate-200/80 dark:border-slate-800/80 ms-3 sm:ms-6 space-y-10 sm:space-y-12">
          {engineeringExps.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.08} className="relative ps-6 sm:ps-10">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -start-[9px] sm:-start-[10px] top-6 w-4 sm:w-5 h-4 sm:h-5 rounded-full border-4 border-white dark:border-[#0B1120] transition-colors ${
                  exp.isCurrent
                    ? "bg-teal-500 ring-4 ring-teal-500/20"
                    : "bg-slate-300 dark:bg-slate-700 ring-2 ring-slate-200/50 dark:ring-slate-800/50"
                }`}
              />

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-9 space-y-6 shadow-xs hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 text-start group"
              >
                {/* Header: Role, Company, Period & Location */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                        {language === "ar" ? exp.roleAr : exp.roleEn}
                      </h3>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{t.experiencePage.present}</span>
                        </span>
                      )}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-teal-600 dark:text-teal-400">
                      {language === "ar" ? exp.companyAr : exp.companyEn}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                      <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>{language === "ar" ? exp.locationAr : exp.locationEn}</span>
                    </span>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {t.experiencePage.keyAchievements}
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {(language === "ar" ? exp.highlightsAr : exp.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {t.experiencePage.techUsed}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-teal-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. OPERATIONS & SUPPORTING TRACK
         ══════════════════════════════════════════════ */}
      {operationsExps.length > 0 && (
        <section className="space-y-6 pt-4">
          <ScrollReveal>
            <div className="text-start space-y-2.5">
              <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
                <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                  {language === "ar" ? "مسارات مساندة" : "SUPPORTING TRACKS"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
                {t.experiencePage.operationsTitle}
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6" staggerDelay={0.08}>
            {operationsExps.map((exp) => (
              <StaggerItem key={exp.id}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-4 shadow-xs hover:border-teal-500/30 transition-all duration-300 text-start"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {language === "ar" ? exp.roleAr : exp.roleEn}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400">
                        {language === "ar" ? exp.companyAr : exp.companyEn}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {exp.startDate} – {exp.endDate}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {(language === "ar" ? exp.highlightsAr : exp.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          4. CLOSING COLLABORATION BANNER
          Exact match to Home & About pages contact teaser
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

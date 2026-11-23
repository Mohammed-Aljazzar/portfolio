"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  Briefcase, Calendar, MapPin, CheckCircle2, Sparkles,
  ArrowRight, ArrowLeft, GraduationCap, Layers, Terminal, ShieldAlert,
} from "lucide-react";

export default function ExperiencePage() {
  const { language, t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const engineeringExps = initialData.engineeringExperiences.filter((e) => e.category === "engineering");
  const operationsExps = initialData.engineeringExperiences.filter((e) => e.category === "operations");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.experiencePage.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {language === "ar" ? (
                <>
                  الخبرات المهنية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    تطوير البرمجيات
                  </span>
                </>
              ) : (
                <>
                  Engineering Career &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Software Track
                  </span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-3xl">
              {t.experiencePage.subheading}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-teal-800 dark:text-teal-200">
              <span className="p-2 rounded-xl bg-teal-200/50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 shrink-0"><Terminal className="w-4 h-4" /></span>
              <span>{t.experiencePage.notice}</span>
            </div>
            <Link href={`/${language}/training`} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 shrink-0">
              <GraduationCap className="w-3.5 h-3.5" /><span>{t.nav.training}</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* TIMELINE */}
      <section className="space-y-8">
        <div className="relative border-s-2 border-slate-200 dark:border-slate-800 ms-4 sm:ms-6 space-y-12">
          {engineeringExps.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1} className="relative ps-6 sm:ps-10">
              <div className={`absolute -start-[11px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-[#0B1120] transition-colors ${
                exp.isCurrent ? "bg-teal-500 ring-4 ring-teal-500/20" : "bg-slate-400 dark:bg-slate-700"
              }`} />

              <motion.div whileHover={{ y: -3 }} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{language === "ar" ? exp.roleAr : exp.roleEn}</h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">{t.experiencePage.present}</span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">{language === "ar" ? exp.companyAr : exp.companyEn}</div>
                  </div>
                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md"><Calendar className="w-3.5 h-3.5" />{exp.startDate} – {exp.endDate}</span>
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md"><MapPin className="w-3.5 h-3.5" />{language === "ar" ? exp.locationAr : exp.locationEn}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase text-slate-400">{t.experiencePage.keyAchievements}</h4>
                  <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                    {(language === "ar" ? exp.highlightsAr : exp.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /><span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-mono text-slate-400">{t.experiencePage.techUsed}</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* OPERATIONS */}
      {operationsExps.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <ScrollReveal>
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Operations Track</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.experiencePage.operationsTitle}</h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6" staggerDelay={0.1}>
            {operationsExps.map((exp) => (
              <StaggerItem key={exp.id}>
                <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{language === "ar" ? exp.roleAr : exp.roleEn}</h3>
                      <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">{language === "ar" ? exp.companyAr : exp.companyEn}</div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {(language === "ar" ? exp.highlightsAr : exp.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" /><span>{item}</span></li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/common/ScrollReveal";
import {
  GraduationCap, Users, Clock, Building2, Calendar, CheckCircle2,
  Sparkles, BookOpen, ArrowRight, ArrowLeft, ExternalLink, Target, Award,
} from "lucide-react";

export default function TrainingPage() {
  const { language, t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const overview = initialData.trainingOverview;
  const partners = initialData.trainingPartners;
  const programs = initialData.trainingPrograms;
  const workshops = initialData.workshops;

  const filteredPrograms = programs.filter((p) => selectedCategory === "all" || p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. HEADER & PHILOSOPHY */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <GraduationCap className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.trainingPage.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {language === "ar" ? (
                <>
                  سجل البرامج التدريبية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    الإرشاد التقني
                  </span>
                </>
              ) : (
                <>
                  Technical Training &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Mentorship Catalog
                  </span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-3xl">
              {t.trainingPage.subheading}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1120] to-[#042f2e]/80 border border-teal-500/30 dark:border-teal-400/25 p-6 sm:p-10 text-white space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-teal-300">{language === "ar" ? overview.roleAr : overview.roleEn}</h2>
                <div className="text-xs font-mono text-teal-400/80">{language === "ar" ? overview.periodAr : overview.periodEn}</div>
              </div>
              <span className="text-xs font-mono bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-700/60 w-fit">Project-Based Pedagogy</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-body">{language === "ar" ? overview.philosophyAr : overview.philosophyEn}</p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.08}>
          {[
            { val: overview.stats.programsCount, label: t.trainingPage.stats.programs },
            { val: overview.stats.workshopsCount, label: t.trainingPage.stats.workshops },
            { val: overview.stats.organizationsCount, label: t.trainingPage.stats.partners },
            { val: overview.stats.trainingHours, label: t.trainingPage.stats.hours },
            { val: overview.stats.traineesCount, label: t.trainingPage.stats.trainees, span: true },
          ].map((s, i) => (
            <StaggerItem key={i} className={s.span ? "col-span-2 lg:col-span-1" : ""}>
              <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:border-indigo-500/40">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                  <AnimatedCounter value={s.val} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{s.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 2. PARTNERS */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Institutional Alliances</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.trainingPage.partnersHeading}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t.trainingPage.partnersSub}</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {partners.map((partner, idx) => (
            <StaggerItem key={idx}>
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-xs hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"><Building2 className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{language === "ar" ? partner.nameAr : partner.nameEn}</h3>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{language === "ar" ? partner.roleAr : partner.roleEn}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{language === "ar" ? partner.descriptionAr : partner.descriptionEn}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. PROGRAMS */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Comprehensive Curricula</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.trainingPage.programsHeading}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t.trainingPage.programsSub}</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {filteredPrograms.map((program) => (
            <StaggerItem key={program.id}>
              <motion.div whileHover={{ y: -4 }} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-xs hover:shadow-md group">
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span>{language === "ar" ? program.organizationAr : program.organizationEn}</span>
                    <span className="bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">{program.batchesCount} {t.trainingPage.batchesLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {language === "ar" ? program.titleAr : program.titleEn}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" />{program.totalHours} {t.trainingPage.hoursLabel}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-500" />{program.traineesCount}+ {t.trainingPage.traineesLabel}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{language === "ar" ? program.descriptionAr : program.descriptionEn}</p>
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-semibold uppercase text-slate-400">{t.trainingPage.topicsCovered}</div>
                  <div className="flex flex-wrap gap-2">
                    {(language === "ar" ? program.topicsAr : program.topicsEn).map((topic, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">{topic}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. WORKSHOPS */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Masterclasses &amp; Seminars</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.trainingPage.workshopsHeading}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t.trainingPage.workshopsSub}</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="space-y-4" staggerDelay={0.08}>
          {workshops.map((ws) => (
            <StaggerItem key={ws.id}>
              <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-xs hover:shadow-md">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold px-2.5 py-0.5 rounded-md">{language === "ar" ? ws.organizationAr : ws.organizationEn}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ws.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ws.beneficiariesCount} {t.trainingPage.beneficiariesLabel}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{language === "ar" ? ws.titleAr : ws.titleEn}</h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(language === "ar" ? ws.topicsAr : ws.topicsEn).map((tItem, idx) => (
                      <span key={idx} className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60">{tItem}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}

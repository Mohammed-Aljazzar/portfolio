"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  Sparkles, Layers, Server, Layout, Palette, GraduationCap, Award,
  CheckCircle2, Calendar, MapPin, ArrowRight, ArrowLeft, Download,
} from "lucide-react";

export default function AboutPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"erp" | "backend" | "frontend" | "uiux">("erp");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const config = initialData.config;
  const skills = initialData.skills;
  const edu = initialData.education[0];
  const certs = initialData.certifications;

  const tabOptions = [
    { id: "erp", label: language === "ar" ? "أنظمة ERP وأتمتة الأعمال" : "ERP & Business Systems", icon: <Layers className="w-4 h-4" /> },
    { id: "backend", label: language === "ar" ? "الباك إند وقواعد البيانات" : "Backend & DevOps", icon: <Server className="w-4 h-4" /> },
    { id: "frontend", label: language === "ar" ? "الفرونت إند والويب" : "Frontend Engineering", icon: <Layout className="w-4 h-4" /> },
    { id: "uiux", label: language === "ar" ? "تصميم واجهات وUI/UX" : "UI/UX & Product Design", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. HEADER & JOURNEY */}
      <section className="space-y-12">
        <ScrollReveal>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.aboutPage.badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
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
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-3xl">
              {t.aboutPage.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait */}
          <ScrollReveal className="lg:col-span-5 space-y-6" direction="left">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group">
              <Image src={config.avatarUrl} alt={language === "ar" ? config.nameAr : config.nameEn} fill priority className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 450px" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white space-y-1">
                <div className="text-xl font-bold">{language === "ar" ? config.nameAr : config.nameEn}</div>
                <div className="text-xs text-teal-300 font-mono">Software Engineering & AI B.Sc. (GPA 3.48 / 87%)</div>
              </div>
            </div>

            <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs transition-shadow hover:shadow-md">
              <h4 className="text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase">
                {language === "ar" ? "الاعتمادات الرئيسية" : "Key Credentials"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {["Official Odoo Certified Developer — Odoo S.A.", "ERPNext & Frappe Custom Applications Specialist", "Advanced UI/UX Design Specialist — Gaza Sky Geeks"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>

          {/* Journey */}
          <ScrollReveal className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg" direction="right">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.aboutPage.journeyTitle}</h3>
              <p>{t.aboutPage.journeyP1}</p>
              <p>{t.aboutPage.journeyP2}</p>
              <p>{t.aboutPage.journeyP3}</p>
              <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-100 dark:border-slate-800">
                <a href="/assets/cv/Mohammed_Aljazzar_CV_AR.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-all duration-300 hover:-translate-y-0.5">
                  <Download className="w-4 h-4" /><span>{t.nav.cvArabic}</span>
                </a>
                <a href="/assets/cv/Mohammed_Aljazzar_CV_EN.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5">
                  <Download className="w-4 h-4" /><span>{t.nav.cvEnglish}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SKILLS MESH */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase">Categorized Skills Mesh</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.aboutPage.skillsMeshTitle}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t.aboutPage.skillsMeshDesc}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
            {tabOptions.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id ? "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}>
                {tab.icon}<span>{tab.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
          {skills[activeTab].map((skill, idx) => (
            <StaggerItem key={`${activeTab}-${idx}`}>
              <motion.div whileHover={{ y: -3 }}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-xs group">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {language === "ar" ? skill.nameAr : skill.nameEn}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {skill.level.includes("|")
                      ? language === "ar"
                        ? skill.level.split("|")[0].trim()
                        : skill.level.split("|")[1].trim()
                      : skill.level}
                  </div>
                </div>
                {skill.isCore && (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shrink-0">Core</span>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. EDUCATION & CERTIFICATIONS */}
      <section className="space-y-10 pt-4">
        <ScrollReveal>
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">{t.aboutPage.educationBadge}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.aboutPage.educationTitle}</h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.1}>
          {/* Education Card */}
          <StaggerItem>
            <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === "ar" ? edu.degreeAr : edu.degreeEn}
                  </h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {language === "ar" ? edu.institutionAr : edu.institutionEn}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{edu.period}</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />{language === "ar" ? edu.gradeAr : edu.gradeEn}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "ar" ? edu.detailsAr : edu.detailsEn}
              </p>
            </motion.div>
          </StaggerItem>

          {/* Certs Card */}
          <StaggerItem>
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                {language === "ar" ? "الشهادات والاعتمادات المهنية" : "Certifications & Credentials"}
              </h3>
              <ul className="space-y-3">
                {certs.map((cert) => (
                  <motion.li key={cert.id} whileHover={{ x: isRTL ? -4 : 4 }} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">{language === "ar" ? cert.titleAr : cert.titleEn}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {language === "ar" ? cert.issuerAr : cert.issuerEn} · {language === "ar" ? cert.dateAr : cert.dateEn}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  FolderGit2,
  Github,
  Globe,
  Palette,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Star,
  Terminal,
} from "lucide-react";

export default function ProjectsPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // Drag-to-scroll for categories on mobile & tablet
  const filterTabsRef = useRef<HTMLDivElement>(null);
  const isTabsDownRef = useRef(false);
  const tabsStartXRef = useRef(0);
  const tabsScrollLeftRef = useRef(0);
  const hasTabsDraggedRef = useRef(false);

  const handleTabsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filterTabsRef.current) return;
    isTabsDownRef.current = true;
    hasTabsDraggedRef.current = false;
    tabsStartXRef.current = e.pageX - filterTabsRef.current.offsetLeft;
    tabsScrollLeftRef.current = filterTabsRef.current.scrollLeft;
  };

  const handleTabsMouseLeave = () => {
    isTabsDownRef.current = false;
  };

  const handleTabsMouseUp = () => {
    isTabsDownRef.current = false;
  };

  const handleTabsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTabsDownRef.current || !filterTabsRef.current) return;
    const x = e.pageX - filterTabsRef.current.offsetLeft;
    const walk = x - tabsStartXRef.current;
    if (Math.abs(walk) > 5) {
      hasTabsDraggedRef.current = true;
    }
    filterTabsRef.current.scrollLeft = tabsScrollLeftRef.current - walk;
  };

  const projects = initialData.projects;
  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* ══════════════════════════════════════════════
          1. HEADER & INTRODUCTION (Matches Home & Experience 100%)
         ══════════════════════════════════════════════ */}
      <section className="space-y-6 sm:space-y-8">
        <ScrollReveal>
          <div className="text-start space-y-2.5">
            {/* Signature Overline with dash & bullet */}
            <div className="flex items-center justify-start gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
                {language === "ar" ? "معرض الأعمال البرمجية" : "PORTFOLIO & CASE STUDIES"}
              </span>
            </div>

            {/* Main Title — Refined, Classy & Smooth Typography */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
              {language === "ar" ? (
                <>
                  المشاريع البرمجية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    دراسات الحالة
                  </span>
                </>
              ) : (
                <>
                  Software Projects &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Case Studies
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl text-start">
              {language === "ar"
                ? "سجل موثق من الأنظمة المؤسسية وتطبيقات الويب وتصاميم واجهات المستخدم المنفذة باحترافية، مع تفاصيل معمارية كل نظام وتحدياته الهندسية."
                : "A documented portfolio of enterprise ERP platforms, modern web applications, and UI/UX design systems with deep architectural and engineering case studies."}
            </p>
          </div>
        </ScrollReveal>

        {/* Categories / Filter Tabs (Drag-to-scroll & swipe on mobile and tablet, wrap on lg+) */}
        <ScrollReveal delay={0.06}>
          <div className="relative border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div
              ref={filterTabsRef}
              onMouseDown={handleTabsMouseDown}
              onMouseLeave={handleTabsMouseLeave}
              onMouseUp={handleTabsMouseUp}
              onMouseMove={handleTabsMouseMove}
              className="flex items-center gap-2 overflow-x-auto lg:flex-wrap lg:overflow-x-visible no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none py-1"
            >
              {[
                { id: "all", label: t.projectsPage.filters.all },
                { id: "erp", label: t.projectsPage.filters.erp },
                { id: "backend", label: t.projectsPage.filters.backend },
                { id: "frontend", label: t.projectsPage.filters.frontend },
                { id: "uiux", label: t.projectsPage.filters.uiux },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    if (hasTabsDraggedRef.current) return;
                    setActiveFilter(f.id);
                  }}
                  className={`px-4 py-2 text-xs sm:text-[13px] font-semibold rounded-xl transition-all duration-200 shrink-0 cursor-pointer whitespace-nowrap ${
                    activeFilter === f.id
                      ? "bg-teal-600 dark:bg-teal-500 text-white shadow-xs shadow-teal-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════
          2. PROJECTS GRID (Cards formatted like Home page showcase cards)
         ══════════════════════════════════════════════ */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        staggerDelay={0.06}
      >
        {filteredProjects.map((project) => {
          const detailUrl = `/${language}/projects/${project.slug || project.id}`;
          const isUiUx = project.category === "uiux";

          return (
            <StaggerItem key={project.id} className="h-full">
              <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:border-teal-500/40 dark:hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 flex flex-col justify-between group h-full text-start">
                <div>
                  {/* Visual Image Header */}
                  <Link
                    href={detailUrl}
                    className="block relative w-full aspect-[16/10] overflow-hidden bg-slate-950 focus:outline-hidden"
                  >
                    <Image
                      src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                      alt={language === "ar" ? project.titleAr : project.titleEn}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Top Floating Badges (Category & Featured) */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-[10px] font-mono font-bold tracking-wider text-teal-400 border border-slate-700/60 shadow-xs uppercase">
                        {project.category}
                      </span>
                      {project.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-xs text-[10px] font-mono font-bold text-slate-950 shadow-xs">
                          <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                          <span>{language === "ar" ? "مشروع مميز" : "Featured"}</span>
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Card Title Link */}
                    <Link href={detailUrl} className="block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {language === "ar" ? project.titleAr : project.titleEn}
                      </h3>
                    </Link>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal line-clamp-3">
                      {language === "ar" ? project.summaryAr : project.summaryEn}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[10.5px] font-mono rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10.5px] font-mono rounded-md bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Row: Actions */}
                <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                  {/* View Details Link */}
                  <Link
                    href={detailUrl}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition-colors group/btn"
                  >
                    <span>{t.projectsPage.card.viewDetails}</span>
                    <Arrow className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                  </Link>

                  {/* External Links */}
                  <div className="flex items-center gap-2">
                    {/* Live Demo or Behance design */}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 font-medium flex items-center gap-1 transition-colors"
                        title={isUiUx ? t.projectsPage.card.design : t.projectsPage.card.live}
                      >
                        {isUiUx ? <Palette className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                        <span>{isUiUx ? (language === "ar" ? "التصميم" : "Design") : (language === "ar" ? "الموقع" : "Live")}</span>
                      </a>
                    )}

                    {project.behanceUrl && project.behanceUrl !== project.liveDemoUrl && (
                      <a
                        href={project.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors"
                        title={t.projectsPage.card.behance}
                      >
                        <Palette className="w-3.5 h-3.5" />
                        <span>Behance</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title={t.projectsPage.card.github}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

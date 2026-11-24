"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { initialData } from "@/lib/initialData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  FolderGit2,
  Github,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Palette,
  Terminal,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function ProjectsPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const projects = initialData.projects;
  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* ══════════════════════════════════════════════
          1. HEADER & OVERVIEW
         ══════════════════════════════════════════════ */}
      <section className="space-y-6 text-start">
        <ScrollReveal>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t.projectsPage.badge}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {language === "ar" ? (
                <>
                  معرض المشاريع البرمجية و
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    دراسات الحالة
                  </span>
                </>
              ) : (
                <>
                  Engineered Works &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                    Case Studies
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-body leading-relaxed max-w-3xl">
              {t.projectsPage.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* Categories / Filter Tabs */}
        <ScrollReveal delay={0.08}>
          <div className="flex flex-wrap gap-2 pt-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            {[
              { id: "all", label: t.projectsPage.filters.all },
              { id: "erp", label: t.projectsPage.filters.erp },
              { id: "backend", label: t.projectsPage.filters.backend },
              { id: "frontend", label: t.projectsPage.filters.frontend },
              { id: "uiux", label: t.projectsPage.filters.uiux },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-teal-600 dark:bg-teal-500 text-white shadow-sm shadow-teal-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════
          2. PROJECTS GRID
         ══════════════════════════════════════════════ */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        staggerDelay={0.06}
      >
        {filteredProjects.map((project) => {
          const detailUrl = `/${language}/projects/${project.slug || project.id}`;
          const isUiUx = project.category === "uiux";

          return (
            <StaggerItem key={project.id}>
              <div className="rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-teal-500/40 dark:hover:border-teal-400/40 transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-teal-500/5 group h-full text-start">
                <div className="space-y-4">
                  {/* Visual Window Mockup Frame */}
                  <Link
                    href={detailUrl}
                    className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group/img focus:outline-hidden"
                  >
                    {/* Window Bar */}
                    <div className="absolute top-0 inset-x-0 h-6.5 bg-slate-900/95 backdrop-blur-xs border-b border-slate-800/80 px-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                        {project.slug || project.category}
                      </span>
                      <span className="text-[9px] font-mono text-teal-400 uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Cover Graphic */}
                    <div className="pt-6.5 w-full h-full relative">
                      <Image
                        src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                        alt={language === "ar" ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                    </div>
                  </Link>

                  {/* Badges: Category & Featured */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      {project.category.toUpperCase()}
                    </span>
                    {project.isFeatured && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                        <Sparkles className="w-3 h-3 text-teal-500" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <Link href={detailUrl} className="group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors block">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {language === "ar" ? project.titleAr : project.titleEn}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-body">
                      {language === "ar" ? project.summaryAr : project.summaryEn}
                    </p>
                  </div>
                </div>

                {/* Footer Section: Tech Stack & Actions */}
                <div className="pt-6 space-y-4">
                  {/* Tech Stack Tags (2 shown + count) */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-100/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 gap-2">
                    {/* Primary Button: View Project Details Page */}
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group/btn"
                    >
                      <span>{t.projectsPage.card.viewDetails}</span>
                      <Arrow className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                    </Link>

                    {/* Direct External Links: Live / Design / GitHub */}
                    <div className="flex items-center gap-1.5">
                      {/* Live Demo or Behance Design preview */}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 text-[11px] font-semibold transition-colors"
                          title={isUiUx ? t.projectsPage.card.design : t.projectsPage.card.live}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{isUiUx ? (language === "ar" ? "التصميم" : "Design") : (language === "ar" ? "معاينة" : "Live")}</span>
                        </a>
                      )}

                      {/* Behance Showcase if not already shown */}
                      {project.behanceUrl && project.behanceUrl !== project.liveDemoUrl && (
                        <a
                          href={project.behanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold transition-colors"
                          title={t.projectsPage.card.behance}
                        >
                          <Palette className="w-3.5 h-3.5" />
                          <span>Behance</span>
                        </a>
                      )}

                      {/* GitHub Link */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title={t.projectsPage.card.github}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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

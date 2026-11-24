import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialData } from "@/lib/initialData";
import { translations } from "@/lib/translations";
import {
  FolderGit2,
  Github,
  Globe,
  Palette,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Workflow,
  Terminal,
} from "lucide-react";

interface Props {
  params: Promise<{
    lang: "ar" | "en";
    id: string;
  }>;
}

export async function generateStaticParams() {
  const languages = ["ar", "en"];
  const projects = initialData.projects;

  const params: { lang: string; id: string }[] = [];
  for (const lang of languages) {
    for (const project of projects) {
      params.push({ lang, id: project.slug || project.id });
      if (project.id !== project.slug) {
        params.push({ lang, id: project.id });
      }
    }
  }
  return params;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { lang, id } = await params;
  const language = lang === "en" ? "en" : "ar";
  const isRTL = language === "ar";
  const t = translations[language];

  // Find project by slug or id
  const projectIndex = initialData.projects.findIndex(
    (p) => p.slug === id || p.id === id
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = initialData.projects[projectIndex];
  const isUiUx = project.category === "uiux";
  const prevProject =
    projectIndex > 0 ? initialData.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < initialData.projects.length - 1
      ? initialData.projects[projectIndex + 1]
      : null;

  const title = language === "ar" ? project.titleAr : project.titleEn;
  const summary = language === "ar" ? project.summaryAr : project.summaryEn;
  const challenge =
    language === "ar" ? project.challengeAr : project.challengeEn;
  const solution = language === "ar" ? project.solutionAr : project.solutionEn;
  const architecture =
    language === "ar" ? project.architectureAr : project.architectureEn;

  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;

  const categoryNames: Record<string, { ar: string; en: string }> = {
    erp: { ar: "أنظمة ERP وتطوير الأعمال", en: "Enterprise ERP & Business Automation" },
    backend: { ar: "هندسة الباك إند والخدمات السحابية", en: "Backend & Cloud Web Services" },
    frontend: { ar: "تطوير تطبيقات الويب والفرونت إند", en: "Modern Web Apps & Frontend" },
    uiux: { ar: "تصميم واجهات وتجربة المستخدم", en: "UI/UX & Product Design System" },
  };

  const categoryLabel =
    categoryNames[project.category]?.[language] || project.category.toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-14">
      {/* ══════════════════════════════════════════════
          1. NAVIGATION BREADCRUMB
         ══════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <Link
          href={`/${language}/projects`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
        >
          <ArrowBack className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          <span>{t.projectsPage.projectDetail.backToProjects}</span>
        </Link>

        {/* Category & Featured Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
            {project.category.toUpperCase()}
          </span>
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-700 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>Featured</span>
            </span>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. HEADER (Matches Home & Experience Overline Style)
         ══════════════════════════════════════════════ */}
      <div className="space-y-4 text-start">
        {/* Signature Overline */}
        <div className="flex items-center justify-start gap-2">
          <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
          <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
            {categoryLabel}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
          {title}
        </h1>

        {/* Summary */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-4xl">
          {summary}
        </p>

        {/* Action Buttons: Live Demo, Design, GitHub */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all group"
            >
              {isUiUx ? <Palette className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              <span>
                {isUiUx
                  ? t.projectsPage.projectDetail.viewDesign
                  : t.projectsPage.projectDetail.visitLive}
              </span>
            </a>
          )}

          {project.behanceUrl && project.behanceUrl !== project.liveDemoUrl && (
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all group"
            >
              <Palette className="w-4 h-4" />
              <span>{t.projectsPage.projectDetail.viewDesign}</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 transition-all group"
            >
              <Github className="w-4 h-4" />
              <span>{t.projectsPage.projectDetail.viewSource}</span>
            </a>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. COVER IMAGE SHOWCASE FRAME
         ══════════════════════════════════════════════ */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
        <Image
          src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1200px) 100vw, 1100px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
      </div>

      {/* ══════════════════════════════════════════════
          4. CASE STUDY DEEP DIVE (CHALLENGE & SOLUTION)
         ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 text-start">
        {/* The Challenge */}
        {challenge && (
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 shrink-0">
                <Workflow className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  {language === "ar" ? "المشكلة التشغيلية" : "Problem Statement"}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {t.projectsPage.projectDetail.challengeTitle}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {challenge}
            </p>
          </div>
        )}

        {/* The Solution */}
        {solution && (
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  {language === "ar" ? "الحل الهندسي" : "Engineered Solution"}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {t.projectsPage.projectDetail.solutionTitle}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {solution}
            </p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          5. ARCHITECTURE & IMPLEMENTATION
         ══════════════════════════════════════════════ */}
      {architecture && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                {language === "ar" ? "البنية المعمارية" : "Architecture & Patterns"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.projectsPage.projectDetail.architectureTitle}
              </h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
            {architecture}
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          6. TECH STACK SPECIFICATION
         ══════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-4 shadow-xs text-start">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
              {language === "ar" ? "المكونات التقنية" : "Stack & Tooling"}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.projectsPage.projectDetail.techStackTitle}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/70 hover:border-teal-500/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          7. BOTTOM NAVIGATION: PREV & NEXT PROJECT
         ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        {prevProject ? (
          <Link
            href={`/${language}/projects/${prevProject.slug || prevProject.id}`}
            className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 transition-all flex items-center gap-4 text-start group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              <ArrowBack className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10.5px] font-mono text-slate-400 block">
                {t.projectsPage.projectDetail.prevProject}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {language === "ar" ? prevProject.titleAr : prevProject.titleEn}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/${language}/projects/${nextProject.slug || nextProject.id}`}
            className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 transition-all flex items-center justify-between gap-4 text-end sm:text-end group ms-auto w-full"
          >
            <div className="space-y-0.5 min-w-0 text-start sm:text-end w-full">
              <span className="text-[10.5px] font-mono text-slate-400 block">
                {t.projectsPage.projectDetail.nextProject}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {language === "ar" ? nextProject.titleAr : nextProject.titleEn}
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              <ArrowNext className="w-4 h-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

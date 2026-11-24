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
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Workflow,
  Terminal,
  Calendar,
  Building,
  UserCheck,
  Layers,
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
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
  const role = language === "ar" ? project.roleAr : project.roleEn;
  const client = language === "ar" ? project.clientAr : project.clientEn;
  const projectType =
    language === "ar" ? project.projectTypeAr : project.projectTypeEn;
  const year = project.year || "2025";
  const keyFeatures =
    language === "ar" ? project.keyFeaturesAr : project.keyFeaturesEn;
  const myContributions =
    language === "ar" ? project.myContributionsAr : project.myContributionsEn;
  const outcomes =
    language === "ar" ? project.outcomesAr : project.outcomesEn;
  const gallery = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.coverImage];

  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;

  const categoryNames: Record<string, { ar: string; en: string }> = {
    erp: { ar: "أنظمة ERP وتطوير الأعمال", en: "Enterprise ERP & Automation" },
    backend: { ar: "هندسة الباك إند والخدمات السحابية", en: "Backend & Cloud Services" },
    frontend: { ar: "تطوير تطبيقات الويب والفرونت إند", en: "Modern Web Apps & Frontend" },
    uiux: { ar: "تصميم واجهات وتجربة المستخدم", en: "UI/UX & Product Design System" },
  };

  const categoryLabel =
    categoryNames[project.category]?.[language] || project.category.toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
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
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-950 font-bold bg-amber-400 px-3 py-1 rounded-full shadow-xs">
              <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>{language === "ar" ? "مشروع مميز" : "Featured"}</span>
            </span>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. HEADER HERO
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

        {/* Summary Description */}
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
          3. PROJECT METADATA CARD (Role, Client, Type, Year, Status)
             Inspired by ameerabudraz.com/en/projects/doosdoos
         ══════════════════════════════════════════════ */}
      <div className="rounded-2xl sm:rounded-3xl bg-slate-50/70 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-start">
          {/* Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
              <UserCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.projectsPage.projectDetail.roleLabel}</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
              {role || (language === "ar" ? "مهندس برمجيات ومطور رئيسي" : "Lead Software Engineer")}
            </p>
          </div>

          {/* Client / Organization */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
              <Building className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.projectsPage.projectDetail.clientLabel}</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
              {client || (language === "ar" ? "عميل تجاري ومؤسسي" : "Enterprise Client")}
            </p>
          </div>

          {/* Project Type */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.projectsPage.projectDetail.projectTypeLabel}</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug">
              {projectType || categoryLabel}
            </p>
          </div>

          {/* Timeline & Status */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.projectsPage.projectDetail.yearLabel}</span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-teal-600 dark:text-teal-400 leading-snug">
              {year} • {t.projectsPage.projectDetail.statusDelivered}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. COVER IMAGE SHOWCASE FRAME
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
          5. OVERVIEW & ENGINEERING CHALLENGE / SOLUTION
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
                  {language === "ar" ? "المشكلة التشغيلية" : "Operational Challenge"}
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
          6. KEY FEATURES & CAPABILITIES
         ══════════════════════════════════════════════ */}
      {keyFeatures && keyFeatures.length > 0 && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                {language === "ar" ? "قدرات النظام" : "Core Capabilities"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.projectsPage.projectDetail.featuresTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          7. MY SPECIFIC CONTRIBUTIONS & DELIVERABLES
         ══════════════════════════════════════════════ */}
      {myContributions && myContributions.length > 0 && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                {language === "ar" ? "المسؤولية والتسليم" : "Scope & Execution"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.projectsPage.projectDetail.myContributionsTitle}
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {myContributions.map((contrib, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {contrib}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          8. OUTCOMES & MEASURED IMPACT
         ══════════════════════════════════════════════ */}
      {outcomes && outcomes.length > 0 && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                {language === "ar" ? "القيمة المضافة" : "Business Impact"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.projectsPage.projectDetail.outcomesTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/40 space-y-1.5"
              >
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                  0{idx + 1}
                </span>
                <p className="text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          9. ARCHITECTURE & IMPLEMENTATION
         ══════════════════════════════════════════════ */}
      {architecture && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
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
          10. GALLERY (Multiple Project Images)
         ══════════════════════════════════════════════ */}
      {gallery && gallery.length > 1 && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-xs text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 text-teal-600 dark:text-teal-400 shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                {language === "ar" ? "المعرض البصري" : "Project Gallery"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.projectsPage.projectDetail.galleryTitle}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group"
              >
                <Image
                  src={imgUrl}
                  alt={`${title} - screenshot ${idx + 1}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          11. TECH STACK SPECIFICATION
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
          12. BOTTOM NAVIGATION: PREV & NEXT PROJECT
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

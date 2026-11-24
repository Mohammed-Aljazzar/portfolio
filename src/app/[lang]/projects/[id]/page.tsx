import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialData } from "@/lib/initialData";
import { translations } from "@/lib/translations";
import {
  ExternalLink,
  Github,
  Palette,
  Globe,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
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
  const totalProjects = initialData.projects.length;
  const currentIndex = projectIndex + 1;
  const isUiUx = project.category === "uiux";

  const prevProject =
    projectIndex > 0 ? initialData.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < totalProjects - 1
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
  const gallery =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : [project.coverImage];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const categoryNames: Record<string, { ar: string; en: string }> = {
    erp: { ar: "أنظمة ERP وتطوير الأعمال", en: "Enterprise ERP & Automation" },
    backend: { ar: "هندسة الباك إند والخدمات السحابية", en: "Backend & Cloud Services" },
    frontend: { ar: "تطوير تطبيقات الويب والفرونت إند", en: "Modern Web Apps & Frontend" },
    uiux: { ar: "تصميم واجهات وتجربة المستخدم", en: "UI/UX & Product Design System" },
  };

  const categoryLabel =
    categoryNames[project.category]?.[language] || project.category.toUpperCase();

  return (
    <article className="min-h-screen text-slate-900 dark:text-slate-100">
      {/* ══════════════════════════════════════════════
          HERO SECTION & KEY METADATA
         ══════════════════════════════════════════════ */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 py-10 sm:py-14 bg-white dark:bg-[#0B1120]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-start">
          {/* Eyebrow / Category & Market */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
              {categoryLabel}
            </span>
            {client && (
              <>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {client}
                </span>
              </>
            )}
            {project.isFeatured && (
              <span className="ms-auto inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{language === "ar" ? "مشروع مميز" : "Featured"}</span>
              </span>
            )}
          </div>

          {/* Title & One-line Summary */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
              {summary}
            </p>
          </div>

          {/* Clean Metadata Grid (Role, Project Type, Client, Status, Year) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/70 text-start">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {language === "ar" ? "الدور" : "Role"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {role || (language === "ar" ? "مهندس برمجيات" : "Software Engineer")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {language === "ar" ? "نوع المشروع" : "Project Type"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {projectType || categoryLabel}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {language === "ar" ? "الجهة / العميل" : "Client"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {client || (language === "ar" ? "عميل تجاري" : "Client Project")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {language === "ar" ? "الحالة" : "Status"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 leading-snug">
                {t.projectsPage.projectDetail.statusDelivered}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {language === "ar" ? "السنة" : "Year"}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {year}
              </p>
            </div>
          </div>

          {/* Technologies + Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/70">
            {/* Tech Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium me-2">
                {language === "ar" ? "التقنيات:" : "Technologies:"}
              </span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs"
                >
                  <span>
                    {isUiUx
                      ? (language === "ar" ? "معاينة التصميم" : "View Design")
                      : (language === "ar" ? "زيارة الموقع" : "Visit Website")}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.behanceUrl && project.behanceUrl !== project.liveDemoUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs"
                >
                  <span>Behance</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          3. IN-PAGE STICKY SECTION NAV
             (Gallery, Overview, Role, Features, Technology, Outcomes)
         ══════════════════════════════════════════════ */}
      <div className="sticky top-16 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 no-scrollbar">
            <a href="#gallery" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
              {language === "ar" ? "المعرض" : "Gallery"}
            </a>
            <a href="#overview" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
              {language === "ar" ? "نظرة عامة" : "Overview"}
            </a>
            <a href="#role" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
              {language === "ar" ? "دوري بالمشروع" : "My Role"}
            </a>
            <a href="#features" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
              {language === "ar" ? "الميزات" : "Features"}
            </a>
            <a href="#technology" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
              {language === "ar" ? "التقنيات" : "Technology"}
            </a>
            {outcomes && outcomes.length > 0 && (
              <a href="#outcomes" className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                {language === "ar" ? "النتائج والأثر" : "Outcomes"}
              </a>
            )}
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. MAIN CONTENT CASE STUDY BODY
         ══════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20 text-start">
        {/* SECTION: GALLERY */}
        <section id="gallery" className="scroll-mt-32 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "شاشات وتجربة استخدام النظام" : "Visual Experience & Interfaces"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === "ar"
                ? "استعراض بصري لأهم واجهات المنصة، تدفق العمليات، وسهولة الوصول."
                : "A closer look at the key web experiences, operational flows, and interface responsiveness."}
            </p>
          </div>

          {/* Primary Main Cover Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Image
              src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
              alt={title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
          </div>

          {/* Secondary Gallery Images */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800"
                >
                  <Image
                    src={imgUrl}
                    alt={`${title} - screenshot ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION: OVERVIEW & CHALLENGE / SOLUTION */}
        <section id="overview" className="scroll-mt-32 space-y-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "نظرة عامة على المشروع وأهدافه" : "Project Overview & Engineering Goals"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* The Challenge */}
            {challenge && (
              <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  {language === "ar" ? "المشكلة والتحدي التشغيلي" : "The Challenge"}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {challenge}
                </p>
              </div>
            )}

            {/* The Solution */}
            {solution && (
              <div className="rounded-2xl p-6 bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/40 space-y-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  {language === "ar" ? "الحل الهندسي المنفذ" : "The Solution"}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {solution}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION: MY ROLE & CONTRIBUTIONS */}
        <section id="role" className="scroll-mt-32 space-y-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "دوري بالتحديد ومسؤولياتي" : "My Role & Contributions"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {role
                ? (language === "ar"
                    ? `قمت بالعمل بصفتي ${role} على قيادة وتطوير هذا المشروع ومتابعة كافة جوانبه التقنية.`
                    : `I served as ${role}, owning the technical implementation, architecture, and quality assurance.`)
                : (language === "ar"
                    ? "توليت التطوير الكامل والربط البرمجي وضمان الجودة واختبارات الأداء للنظام."
                    : "I led full-lifecycle engineering, API integration, and performance testing across the system.")}
            </p>
          </div>

          {/* Bulleted Contributions */}
          <div className="space-y-3">
            {(myContributions && myContributions.length > 0
              ? myContributions
              : [
                  language === "ar"
                    ? "تصميم وبناء البنية التحتية البرمجية ومخطط البيانات وقواعد العمل."
                    : "Designed and engineered system architecture, data models, and business logic.",
                  language === "ar"
                    ? "تطوير الواجهات التفاعلية وسهلة الاستخدام وضمان التجاوب مع مختلف الشاشات."
                    : "Implemented responsive, accessible user interfaces optimized for cross-device performance.",
                  language === "ar"
                    ? "ربط وتكامل واجهات برمجة التطبيقات (APIs) وخدمات الطرف الثالث وقواعد البيانات."
                    : "Integrated REST APIs, third-party platform services, and cloud database streams.",
                  language === "ar"
                    ? "إجراء اختبارات الجودة (QA) والتحقق الشامل من حالات الاستخدام الواقعية قبل التسليم."
                    : "Conducted end-to-end QA validation and real-world acceptance testing prior to release.",
                ]
            ).map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-2" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: CORE FEATURES & CAPABILITIES */}
        <section id="features" className="scroll-mt-32 space-y-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "الميزات والقدرات الرئيسية للمنصة" : "Core Platform Features"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === "ar"
                ? "مجموعة الميزات التشغيلية والتقنية المدمجة في النظام لخدمة المستخدمين والمؤسسة."
                : "The primary functional capabilities engineered into the system to streamline operations."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(keyFeatures && keyFeatures.length > 0
              ? keyFeatures
              : [
                  language === "ar" ? "إدارة دورة حياة العمليات بمرونة وأمان كامل." : "Secure and flexible operational workflow lifecycle.",
                  language === "ar" ? "لوحة تحكم إدارية فورية لمتابعة مؤشرات الأداء والتقارير." : "Real-time dashboard for metrics, reporting, and logs.",
                  language === "ar" ? "تنبيهات وإشعارات فورية عبر القنوات المعتمدة." : "Automated real-time notifications and alerts.",
                  language === "ar" ? "أداء فائق وسرعة استجابة على الهواتف والأجهزة المكتبية." : "Sub-second responsive experience on mobile and desktop.",
                ]
            ).map((feat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {feat.split("—")[0].split(":")[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed ps-6">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: TECHNOLOGY & INTEGRATION */}
        <section id="technology" className="scroll-mt-32 space-y-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "حزمة التقنيات والمعمارية" : "Technology & Architecture"}
            </h2>
            {architecture && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl font-normal">
                {architecture}
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              {language === "ar" ? "المكونات التقنية المستخدمة" : "Stack Components & Integrations"}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: OUTCOMES & BUSINESS IMPACT */}
        {outcomes && outcomes.length > 0 && (
          <section id="outcomes" className="scroll-mt-32 space-y-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-12">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {language === "ar" ? "النتائج والأثر المحقق" : "Product Outcomes & Measured Impact"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {language === "ar"
                  ? "القيمة المضافة والأثر الفعلي الذي حققه النظام بعد تسليمه وإطلاقه."
                  : "Tangible operational value and quantifiable impact delivered through this project."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 space-y-2"
                >
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          5. BOTTOM PAGINATION BAR (Prev / Next with Index)
             Matches "Previous project Shams Flowers | 02 / 06 | Next project Z Agency"
         ══════════════════════════════════════════════ */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Previous Project */}
          <div className="flex-1 min-w-0">
            {prevProject ? (
              <Link
                href={`/${language}/projects/${prevProject.slug || prevProject.id}`}
                className="group inline-flex flex-col gap-1 text-start"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  <BackArrow className="w-3.5 h-3.5" />
                  <span>{language === "ar" ? "المشروع السابق" : "Previous project"}</span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {language === "ar" ? prevProject.titleAr : prevProject.titleEn}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Project Index (e.g. 02 / 12) */}
          <div className="shrink-0 text-xs font-mono text-slate-400 font-medium px-4">
            {currentIndex.toString().padStart(2, "0")} / {totalProjects.toString().padStart(2, "0")}
          </div>

          {/* Next Project */}
          <div className="flex-1 min-w-0 flex justify-end">
            {nextProject ? (
              <Link
                href={`/${language}/projects/${nextProject.slug || nextProject.id}`}
                className="group inline-flex flex-col items-end gap-1 text-end"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  <span>{language === "ar" ? "المشروع التالي" : "Next project"}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {language === "ar" ? nextProject.titleAr : nextProject.titleEn}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}

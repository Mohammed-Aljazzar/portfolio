"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { Project } from "@/lib/types";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import {
  FolderGit2, Github, ExternalLink, X, Layers, Sparkles,
  ArrowRight, ArrowLeft, CheckCircle2, Filter,
} from "lucide-react";

export default function ProjectsPage() {
  const { language, t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const projects = initialData.projects;
  const filteredProjects = projects.filter((p) => activeFilter === "all" || p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* HEADER */}
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

      {/* FILTERS */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: "all", label: t.projectsPage.filters.all },
            { id: "erp", label: t.projectsPage.filters.erp },
            { id: "backend", label: t.projectsPage.filters.backend },
            { id: "frontend", label: t.projectsPage.filters.frontend },
            { id: "uiux", label: t.projectsPage.filters.uiux },
          ].map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeFilter === f.id
                  ? "bg-teal-600 dark:bg-teal-500 text-white shadow-sm shadow-teal-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}>{f.label}</button>
          ))}
        </div>
      </ScrollReveal>

      {/* GRID */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
        {filteredProjects.map((project) => (
          <StaggerItem key={project.id}>
            <motion.div whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-teal-500/5 group h-full">
              <div className="space-y-4">
                {/* Visual Window Mockup Frame */}
                <div
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 group/img cursor-pointer"
                  onClick={() => setSelectedProject(project as Project)}
                >
                  {/* Window Bar */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-slate-900/90 backdrop-blur-xs border-b border-slate-800/80 px-2.5 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                      {project.slug || project.category}
                    </span>
                    <span className="text-[9px] font-mono text-teal-400 uppercase font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Real Image Graphic Cover */}
                  <div className="pt-6 w-full h-full relative">
                    <Image
                      src={project.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                      alt={language === "ar" ? project.titleAr : project.titleEn}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{project.category.toUpperCase()}</span>
                  {project.isFeatured && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                      <Sparkles className="w-3 h-3" />Featured
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {language === "ar" ? project.titleAr : project.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {language === "ar" ? project.summaryAr : project.summaryEn}
                  </p>
                </div>
              </div>
              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && <span className="px-1.5 py-0.5 text-[11px] font-mono text-slate-400">+{project.techStack.length - 4}</span>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button onClick={() => setSelectedProject(project as Project)} className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition-colors">
                    <span>{t.projectsPage.card.viewCaseStudy}</span><Arrow className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title={t.projectsPage.card.github}><Github className="w-4 h-4" /></a>
                    )}
                    {project.behanceUrl && (
                      <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-xs" title={t.projectsPage.card.behance}>Bē</a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">{selectedProject.category.toUpperCase()}</span>
                    {selectedProject.isFeatured && <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">Featured</span>}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{language === "ar" ? selectedProject.titleAr : selectedProject.titleEn}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close modal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Cover Image Preview */}
              {selectedProject.coverImage && (
                <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <Image
                    src={selectedProject.coverImage || "/assets/images/projects/erp-smart-service.jpg"}
                    alt={language === "ar" ? selectedProject.titleAr : selectedProject.titleEn}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 900px) 100vw, 800px"
                  />
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">{t.projectsPage.modal.aboutProject}</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{language === "ar" ? selectedProject.summaryAr : selectedProject.summaryEn}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.challengeAr && (
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 space-y-2 border border-slate-100 dark:border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">{t.projectsPage.modal.challenge}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{language === "ar" ? selectedProject.challengeAr : selectedProject.challengeEn}</p>
                  </div>
                )}
                {selectedProject.solutionAr && (
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 space-y-2 border border-slate-100 dark:border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold uppercase text-teal-600 dark:text-teal-400">{t.projectsPage.modal.solution}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{language === "ar" ? selectedProject.solutionAr : selectedProject.solutionEn}</p>
                  </div>
                )}
              </div>

              {selectedProject.architectureAr && (
                <div className="rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 p-4 space-y-2 border border-teal-200/60 dark:border-teal-800/40">
                  <h4 className="text-xs font-mono font-bold uppercase text-teal-700 dark:text-teal-300">{t.projectsPage.modal.architecture}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{language === "ar" ? selectedProject.architectureAr : selectedProject.architectureEn}</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">{t.projectsPage.modal.stack}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all hover:opacity-90">
                      <Github className="w-4 h-4" /><span>{t.projectsPage.card.github}</span>
                    </a>
                  )}
                  {selectedProject.behanceUrl && (
                    <a href={selectedProject.behanceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold transition-all hover:bg-blue-700">
                      <span>{t.projectsPage.card.behance}</span>
                    </a>
                  )}
                </div>
                <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {t.projectsPage.modal.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingActions: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappMessage = encodeURIComponent(
    language === "ar"
      ? "مرحباً م. محمد الجزار، اطلعت على معرض أعمالك وأود التواصل معك بخصوص مشروع / استشارة تقنية."
      : "Hello Eng. Mohammed Aljazzar, I visited your portfolio and would like to discuss a project / technical consultation."
  );

  const whatsappUrl = `https://wa.me/970598048284?text=${whatsappMessage}`;

  return (
    <div
      className={`fixed bottom-6 z-40 flex flex-col items-center gap-3 ${
        isRTL ? "left-6 sm:left-8" : "right-6 sm:right-8"
      }`}
    >
      {/* 1. Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            onClick={scrollToTop}
            aria-label={language === "ar" ? "العودة إلى أعلى الصفحة" : "Scroll to Top"}
            title={language === "ar" ? "العودة للأعلى" : "Back to top"}
            className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-xl shadow-slate-900/10 hover:shadow-teal-500/20 hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            
            {/* Tooltip Label */}
            <span
              className={`absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2.5 py-1 text-[11px] font-semibold font-mono rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg ${
                isRTL ? "left-14" : "right-14"
              }`}
            >
              {language === "ar" ? "العودة للأعلى ↑" : "Back to top ↑"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Floating WhatsApp Direct Contact Button (Site Identity: Teal Theme) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === "ar" ? "تواصل معي عبر واتساب" : "Chat on WhatsApp"}
        title={language === "ar" ? "تواصل مباشرة عبر واتساب" : "Direct WhatsApp Chat"}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 border border-teal-300/40 dark:border-teal-400/30 transition-all duration-300"
      >
        {/* Radar Ambient Pulse */}
        <span className="absolute -inset-1 rounded-2xl bg-teal-500 opacity-35 blur-xs group-hover:opacity-60 transition-opacity animate-pulse pointer-events-none" />

        {/* WhatsApp SVG Icon in Site Palette */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
        </svg>

        {/* Live Chat Tooltip */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl flex items-center gap-1.5 ${
            isRTL ? "left-15" : "right-15"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>{language === "ar" ? "تواصل واتساب مباشر" : "Direct WhatsApp"}</span>
        </span>
      </motion.a>
    </div>
  );
};

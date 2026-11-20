"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MonogramLogo } from "@/components/common/MonogramLogo";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  Download,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  MessageSquare,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/experience", label: t.nav.experience },
    { href: "/projects", label: t.nav.projects },
    { href: "/training", label: t.nav.training, highlight: true },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "glass-dock border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-black/5 dark:shadow-black/20"
              : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xs"
          }`}
        >
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none rounded-xl p-1 group"
          >
            <MonogramLogo size={36} />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {language === "ar" ? "محمد الجزار" : "Mohammed Aljazzar"}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-teal-600 dark:text-teal-400 font-medium">
                Software &amp; ERP Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center h-10 gap-0.5 xl:gap-1 bg-slate-100/70 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`h-8 px-3 xl:px-3.5 inline-flex items-center justify-center text-xs xl:text-sm font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-teal-900 dark:text-teal-200 font-semibold bg-white dark:bg-slate-900 shadow-xs"
                      : link.highlight
                      ? "text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 hover:bg-white/50 dark:hover:bg-slate-900/50"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-900/50"
                  }`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="absolute top-1.5 -right-0.5 w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Utilities (Language, Theme, CTA, Admin) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Switcher */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="h-10 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all bg-slate-50/80 dark:bg-slate-800/60"
              title={t.nav.toggleLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{language === "ar" ? "EN" : "عربي"}</span>
            </motion.button>

            {/* Dark/Light Switcher */}
            <motion.button
              whileTap={{ rotate: 180, scale: 0.9 }}
              onClick={toggleTheme}
              className="h-10 w-10 rounded-full inline-flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all bg-slate-50/80 dark:bg-slate-800/60"
              title={t.nav.toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </motion.button>

            {/* Soft, Refined Contact CTA Button */}
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="h-10 inline-flex items-center justify-center gap-2 px-4 xl:px-5 text-xs sm:text-sm font-semibold rounded-full bg-teal-600 hover:bg-teal-500 text-white dark:bg-teal-500/15 dark:hover:bg-teal-500/25 dark:text-teal-200 dark:border dark:border-teal-500/35 shadow-xs shadow-teal-900/10 hover:shadow-sm hover:shadow-teal-500/20 transition-all duration-200 group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-teal-300 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 dark:bg-teal-400"></span>
                </span>
                <MessageSquare className="w-3.5 h-3.5 opacity-90 transition-transform duration-200 group-hover:scale-105" />
                <span>{language === "ar" ? "تواصل معي" : "Get in Touch"}</span>
              </Link>
            </motion.div>

            {/* Admin CMS Portal Link */}
            <Link
              href="/admin"
              className="h-10 w-10 rounded-full inline-flex items-center justify-center border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title={t.nav.admin}
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="h-8 px-2.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {language === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={toggleTheme}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-3"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        isActive
                          ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold"
                          : link.highlight
                          ? "text-teal-700 dark:text-teal-300 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Contact Action */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-teal-600 hover:bg-teal-500 text-white dark:bg-teal-500/15 dark:hover:bg-teal-500/25 dark:text-teal-200 dark:border dark:border-teal-500/35 shadow-xs transition-all duration-200"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-teal-300 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 dark:bg-teal-400"></span>
                </span>
                <MessageSquare className="w-3.5 h-3.5 opacity-90" />
                <span>{language === "ar" ? "تواصل معي" : "Get in Touch"}</span>
              </Link>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <a
                  href="/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 text-xs font-semibold rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300"
                >
                  <span>{t.nav.cvArabic}</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                >
                  <span>{t.nav.cvEnglish}</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

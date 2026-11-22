"use client";

import React from "react";
import Link from "next/link";
import { MonogramLogo } from "@/components/common/MonogramLogo";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/training", label: t.nav.training },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Mohammed-Aljazzar",
      icon: <Github className="w-4 h-4" />,
      hoverColor: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mohammed-aljazzar/",
      icon: <Linkedin className="w-4 h-4" />,
      hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/972598048284",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
        </svg>
      ),
      hoverColor: "hover:text-[#25D366] hover:border-[#25D366]/40",
    },
    {
      name: "Email",
      href: "mailto:m.i.aljazzar19@gmail.com",
      icon: <Mail className="w-4 h-4" />,
      hoverColor: "hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/40",
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#070b14] text-slate-600 dark:text-slate-400 border-t border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Main Footer Block: Responsive Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Identity & Status */}
          <div className="space-y-2.5 max-w-md text-start">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <MonogramLogo size={38} />
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {language === "ar" ? "محمد الجزار" : "Mohammed Aljazzar"}
                </h3>
                <p className="text-xs font-mono text-teal-600 dark:text-teal-400">
                  Full-Stack &amp; ERP Engineer
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              {language === "ar"
                ? "مهندس برمجيات متخصص في بناء وتطوير أنظمة ERP وتطبيقات الويب المتكاملة وحلول الأعمال الرقمية الموثوقة."
                : "Software engineer specialized in scalable ERP architecture, robust web platforms, and engineering mentorship."}
            </p>

            <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {language === "ar"
                  ? "غزة، فلسطين • متاح للعمل عن بُعد حول العالم"
                  : "Gaza, Palestine • Available Remote Worldwide"}
              </span>
            </div>
          </div>

          {/* Navigation Links + Social Channels Hub */}
          <div className="flex flex-col sm:flex-row sm:items-center lg:items-end gap-6 sm:gap-10 w-full lg:w-auto">
            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons Stack */}
            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-2xs hover:shadow-sm ${soc.hoverColor}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p className="font-normal text-center sm:text-start">
            © {currentYear} {language === "ar" ? "محمد الجزار. جميع الحقوق محفوظة." : "Mohammed Aljazzar. All rights reserved."}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/40 transition-all font-medium text-xs cursor-pointer group"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

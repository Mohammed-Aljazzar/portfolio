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
  Phone,
  MapPin,
  ExternalLink,
  Layers,
  Server,
  Layout,
  Palette,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 dark:bg-[#060913] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800/90">
      {/* Subtle Background Monogram Watermark */}
      <div className="absolute -bottom-16 rtl:-right-16 ltr:-left-16 pointer-events-none opacity-5 dark:opacity-10 select-none">
        <MonogramLogo size={360} withWatermark />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Identity & Bio (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 text-start">
            <Link href={`/${language}`} className="inline-flex items-center gap-3 group">
              <MonogramLogo size={42} />
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight group-hover:text-teal-400 transition-colors">
                  {language === "ar" ? "محمد الجزار" : "Mohammed Aljazzar"}
                </h3>
                <p className="text-xs font-mono text-teal-400 font-medium">
                  Full-Stack &amp; ERP Engineer
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              {language === "ar"
                ? "مهندس برمجيات متخصص في بناء وتطوير أنظمة الـ ERP، وتطبيقات الويب المتكاملة عالية الأداء، ونقل المعرفة الهندسية المتقدمة."
                : "Software engineer specialized in scalable ERP systems, modern full-stack web applications, and applied technical training."}
            </p>

            {/* Live Location / Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/60 border border-teal-800/60 text-teal-300 text-xs font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {language === "ar"
                  ? "فلسطين • متاح للعمل عن بُعد عالمياً"
                  : "Palestine • Available Remote Worldwide"}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>{t.footer.quickLinks}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href={`/${language}`} className="text-slate-400 hover:text-teal-300 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/projects`} className="text-slate-400 hover:text-teal-300 transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/experience`} className="text-slate-400 hover:text-teal-300 transition-colors">
                  {t.nav.experience}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/training`} className="text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1.5">
                  <span>{t.nav.training}</span>
                  <span className="text-[10px] bg-teal-950/80 border border-teal-800/80 px-1.5 py-0.5 rounded font-mono">Hub</span>
                </Link>
              </li>
              <li>
                <Link href={`/${language}/about`} className="text-slate-400 hover:text-teal-300 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/contact`} className="text-slate-400 hover:text-teal-300 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>{t.footer.specialties}</span>
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-400 font-medium">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 text-teal-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span>Odoo &amp; ERPNext Systems</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 text-teal-400">
                  <Server className="w-3.5 h-3.5" />
                </div>
                <span>Python, Django &amp; REST APIs</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 text-teal-400">
                  <Layout className="w-3.5 h-3.5" />
                </div>
                <span>Next.js, React &amp; TypeScript</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 text-teal-400">
                  <Palette className="w-3.5 h-3.5" />
                </div>
                <span>Figma UI/UX &amp; Design Systems</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Channels & Socials (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 text-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>{language === "ar" ? "قنوات التواصل المباشر" : "Direct Channels"}</span>
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <a
                href="mailto:m.i.aljazzar19@gmail.com"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/80 hover:text-teal-300 transition-all group"
              >
                <Mail className="w-4 h-4 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs truncate">m.i.aljazzar19@gmail.com</span>
              </a>

              <a
                href="https://wa.me/970598048284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/80 hover:text-teal-300 transition-all group"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs" dir="ltr">+970 59 804 8284</span>
              </a>
            </div>

            {/* Social Icons row */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-medium">
                {language === "ar" ? "الشبكات المهنية:" : "Social Profiles:"}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Mohammed-Aljazzar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:bg-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/mohammed-aljazzar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:bg-[#0A66C2] hover:border-[#0A66C2] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/970598048284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:bg-gradient-to-br hover:from-teal-500 hover:to-teal-700 hover:border-teal-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs hover:shadow-teal-500/20"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.677-1.632-.927-2.235-.243-.587-.49-.508-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.511 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.505 2 2.02 6.485 2.02 12.02c0 1.91.537 3.69 1.47 5.215L2.04 22l4.908-1.412a10.007 10.007 0 0 0 5.092 1.432c5.535 0 10.02-4.485 10.02-10.02C22.06 6.485 17.575 2 12.04 2zm0 18.258a8.214 8.214 0 0 1-4.22-1.163l-.303-.18-3.136.903.9-3.056-.197-.314a8.22 8.22 0 0 1-1.264-4.428c0-4.542 3.696-8.238 8.22-8.238 4.524 0 8.22 3.696 8.22 8.238 0 4.542-3.696 8.238-8.22 8.238z" />
                  </svg>
                </a>

                <a
                  href="https://behance.net/moh_aljazzar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:bg-[#0057ff] hover:border-[#0057ff] flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs text-xs font-bold"
                  title="Behance"
                  aria-label="Behance"
                >
                  Bē
                </a>

                <a
                  href="https://mostaql.com/u/Mohammed_Aljazzar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:bg-teal-600 hover:border-teal-500 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs text-xs font-bold font-mono"
                  title="Mostaql"
                  aria-label="Mostaql"
                >
                  M
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="font-normal text-center sm:text-start">
            © {currentYear} {language === "ar" ? "محمد الجزار. جميع الحقوق محفوظة." : "Mohammed Aljazzar. All rights reserved."}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-teal-600 border border-slate-700/80 hover:border-teal-500 text-slate-300 hover:text-white transition-all font-medium text-xs cursor-pointer group shadow-xs"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

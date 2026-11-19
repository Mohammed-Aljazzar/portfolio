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
  const { language, t, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 dark:bg-[#060913] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Subtle Background Monogram Watermark */}
      <div className="absolute -bottom-16 -right-16 pointer-events-none opacity-5 dark:opacity-10 select-none">
        <MonogramLogo size={340} withWatermark />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Identity & Availability */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <MonogramLogo size={42} />
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">
                  {language === "ar" ? "محمد الجزار" : "Mohammed Aljazzar"}
                </h3>
                <p className="text-xs font-mono text-teal-400">
                  Full-Stack & ERP Engineer
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.role}
            </p>
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/60 border border-teal-800/60 text-teal-300 text-xs font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>{t.hero.availableBadge}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-teal-400 transition-colors">
                  {t.nav.experience}
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                  <span>{t.nav.training}</span>
                  <span className="text-[10px] bg-indigo-900/60 px-1.5 py-0.5 rounded font-mono">Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-teal-400 transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              {t.footer.specialties}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Odoo & ERPNext / Frappe Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Python, Django & Scalable APIs</span>
              </li>
              <li className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-teal-400 shrink-0" />
                <span>React.js, Next.js & Modern Web Apps</span>
              </li>
              <li className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Figma UI/UX & Design Systems</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Channels */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              {t.contactPage.directInfoTitle}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="mailto:m.i.aljazzar19@gmail.com"
                className="flex items-center gap-2 hover:text-teal-300 transition-colors group"
              >
                <Mail className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs">m.i.aljazzar19@gmail.com</span>
              </a>
              <a
                href="https://wa.me/972598048284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-teal-300 transition-colors group"
              >
                <Phone className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs" dir="ltr">+972 59 804 8284</span>
              </a>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{language === "ar" ? "غزة، فلسطين (متاح للعمل عن بُعد)" : "Gaza, Palestine (Remote Worldwide)"}</span>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Mohammed-Aljazzar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-aljazzar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://behance.net/moh_aljazzar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm font-bold text-xs"
                title="Behance"
              >
                Bē
              </a>
              <a
                href="https://mostaql.com/u/Mohammed_Aljazzar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm text-xs font-bold"
                title="Mostaql"
              >
                M
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.rights}</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-teal-400 transition-colors p-1"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

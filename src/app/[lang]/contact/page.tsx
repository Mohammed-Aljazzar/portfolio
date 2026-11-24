"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  Globe,
  Briefcase,
  Share2,
} from "lucide-react";

export default function ContactPage() {
  const { language, t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "erp",
    message: "",
  });

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("m.i.aljazzar19@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", requestType: "erp", message: "" });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Structured Social Platforms categorized cleanly
  const professionalNetworks = [
    {
      name: "LinkedIn",
      handle: "/in/mohammed-aljazzar",
      url: "https://www.linkedin.com/in/mohammed-aljazzar/",
      badge: language === "ar" ? "الملف المهني" : "Professional",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      handle: "Mohammed-Aljazzar",
      url: "https://github.com/Mohammed-Aljazzar",
      badge: language === "ar" ? "المستودعات" : "Repositories",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
    {
      name: "Behance",
      handle: "moh_aljazzar",
      url: "https://behance.net/moh_aljazzar",
      badge: language === "ar" ? "معرض التصميم" : "UI/UX Works",
      icon: (
        <span className="font-bold text-xs font-mono">Bē</span>
      ),
    },
    {
      name: language === "ar" ? "منصة مستقل" : "Mostaql",
      handle: "Mohammed_Aljazzar",
      url: "https://mostaql.com/u/Mohammed_Aljazzar",
      badge: language === "ar" ? "العمل الحر" : "Freelance",
      icon: (
        <Briefcase className="w-3.5 h-3.5" />
      ),
    },
    {
      name: "X (Twitter)",
      handle: "@moh_aljazzar",
      url: "https://x.com/moh_aljazzar",
      badge: language === "ar" ? "التحديثات التقنية" : "Tech Updates",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "mohammed.aljazzar",
      url: "https://facebook.com/mohammed.aljazzar",
      badge: language === "ar" ? "التواصل الاجتماعي" : "Social",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* ══════════════════════════════════════════════
          1. HEADER (Matches Home, Experience & Projects)
         ══════════════════════════════════════════════ */}
      <section className="text-start space-y-3">
        <ScrollReveal>
          {/* Signature Overline with dash & bullet */}
          <div className="flex items-center justify-start gap-2 mb-2">
            <span className="w-5 sm:w-6 h-[1.5px] bg-teal-500 rounded-full inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            <span className="text-[11px] sm:text-[13px] font-semibold text-teal-600 dark:text-teal-400">
              {language === "ar" ? "مركز التواصل والتعاون" : "GET IN TOUCH & COLLABORATE"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
            {language === "ar" ? (
              <>
                لنبدأ محادثة حول{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  مشروعك القادم
                </span>
              </>
            ) : (
              <>
                Let&apos;s Discuss Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-300">
                  Next Project
                </span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            {t.contactPage.subheading}
          </p>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════
          2. TWO-COLUMN MAIN WORKSPACE
         ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start text-start">
        {/* Left Column: Handcrafted Direct Info & Verified Channels */}
        <div className="lg:col-span-5 space-y-8">
          {/* SECTION A: Direct Contact Channels (Minimalist List) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                {t.contactPage.directInfoTitle}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === "ar" ? "متاح للمشاريع والتعاقد" : "Available for Work"}</span>
              </span>
            </div>

            {/* Item 1: Email */}
            <div className="group rounded-2xl p-4 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[10.5px] font-mono text-slate-400 block uppercase">
                      {t.contactPage.emailLabel}
                    </span>
                    <a
                      href="mailto:m.i.aljazzar19@gmail.com"
                      className="font-mono text-xs sm:text-[13px] text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block truncate"
                      dir="ltr"
                    >
                      m.i.aljazzar19@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-2 ps-12">
                  {t.contactPage.copySuccess}
                </p>
              )}
            </div>

            {/* Item 2: WhatsApp / Direct Phone */}
            <a
              href="https://wa.me/970598048284"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-4 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/10 transition-colors shadow-xs flex items-center justify-between gap-3 block"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10.5px] font-mono text-slate-400 block uppercase">
                    {t.contactPage.phoneLabel}
                  </span>
                  <span className="font-mono text-xs sm:text-[13px] text-slate-900 dark:text-slate-100 block" dir="ltr">
                    +970 59 804 8284
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform shrink-0">
                <span>{language === "ar" ? "محادثة واتساب" : "Chat"}</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            {/* Item 3: Location & Remote Mobility */}
            <div className="rounded-2xl p-4 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs sm:text-[13px]">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {language === "ar" ? "فلسطين (متاح للعمل عن بُعد)" : "Palestine (Remote Globally)"}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  {language === "ar"
                    ? "تعاقدات مرنة مع شركات الخليج وأوروبا والشرق الأوسط."
                    : "Flexible remote collaboration with teams in the Gulf, Europe & worldwide."}
                </p>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pt-1 ps-1">
              <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span>
                {language === "ar"
                  ? "متوسط وقت الرد: خلال ساعات العمل في نفس اليوم."
                  : "Typical response time: within a few business hours."}
              </span>
            </div>
          </div>

          {/* SECTION B: Verified Business Channels & Networks (Clean, Non-AI Grid) */}
          <div className="space-y-3.5 pt-2">
            <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                {t.contactPage.socialHeading}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {professionalNetworks.map((net) => (
                <a
                  key={net.name}
                  href={net.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0">
                      {net.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {net.name}
                      </p>
                      <span className="text-[10px] text-slate-400 block truncate font-mono">
                        {net.badge}
                      </span>
                    </div>
                  </div>

                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-500 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Clean & Soft Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-9 shadow-xs space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.contactPage.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                {t.contactPage.formSub}
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 p-8 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-teal-900 dark:text-teal-200">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-800/90 dark:text-teal-300/90 max-w-md mx-auto leading-relaxed">
                    {t.contactPage.successDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 rounded-xl bg-teal-600 text-white font-medium text-xs hover:bg-teal-700 transition-colors shadow-xs cursor-pointer"
                >
                  {t.contactPage.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t.contactPage.nameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contactPage.namePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {t.contactPage.emailLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contactPage.emailPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Inquiry Type Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.contactPage.typeLabel}
                  </label>
                  <select
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <option value="erp">{t.contactPage.typeOptions.erp}</option>
                    <option value="backend">{t.contactPage.typeOptions.backend}</option>
                    <option value="uiux">{t.contactPage.typeOptions.uiux}</option>
                    <option value="training">{t.contactPage.typeOptions.training}</option>
                    <option value="consulting">{t.contactPage.typeOptions.consulting}</option>
                    <option value="other">{t.contactPage.typeOptions.other}</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.contactPage.messageLabel} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contactPage.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-xs sm:text-sm transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs sm:text-sm shadow-xs hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? t.contactPage.sending : t.contactPage.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

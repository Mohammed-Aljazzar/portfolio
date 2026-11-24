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
  Sparkles,
  ArrowRight,
  ArrowLeft,
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

  const socialLinks = initialData.socialLinks.filter((s) => s.isVisible);

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
        {/* Left Column: Soft Channels & Direct Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Direct Info Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-6 shadow-xs">
            {/* Header + Availability Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                {t.contactPage.directInfoTitle}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === "ar" ? "متاح للمشاريع" : "Available"}</span>
              </span>
            </div>

            {/* Email Channel */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                {t.contactPage.emailLabel}
              </span>
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 group hover:border-teal-500/40 transition-colors">
                <a
                  href="mailto:m.i.aljazzar19@gmail.com"
                  className="flex items-center gap-2.5 truncate text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-xs sm:text-[13px] truncate" dir="ltr">
                    m.i.aljazzar19@gmail.com
                  </span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors shrink-0 cursor-pointer"
                  title={copied ? "Copied" : "Copy email"}
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
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium ps-1">
                  {t.contactPage.copySuccess}
                </p>
              )}
            </div>

            {/* WhatsApp / Phone Channel */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                {t.contactPage.phoneLabel}
              </span>
              <a
                href="https://wa.me/970598048284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 group hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:text-[#25D366]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-xs sm:text-[13px] text-slate-800 dark:text-slate-200" dir="ltr">
                    +970 59 804 8284
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                  <span>واتساب</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>

            {/* Location & Remote Availability */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                {t.contactPage.locationLabel}
              </span>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {language === "ar" ? "فلسطين" : "Palestine"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    {language === "ar"
                      ? "متاح للتعاقد عن بُعد للشركات في الخليج، أوروبا، ومختلف الدول."
                      : "Open for remote engineering contracts across Gulf, Europe, and globally."}
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee Pill */}
            <div className="flex items-center gap-2 pt-1 text-slate-500 dark:text-slate-400 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span>
                {language === "ar"
                  ? "يتم الرد على جميع الاستفسارات والرسائل خلال أقل من 24 ساعة."
                  : "All inquiries receive a prompt reply within 24 hours."}
              </span>
            </div>
          </div>

          {/* Social & Business Networks Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 space-y-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider block">
              {t.contactPage.socialHeading}
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 hover:border-teal-500/40 hover:bg-teal-50/30 dark:hover:bg-slate-800 transition-all text-xs font-medium text-slate-700 dark:text-slate-300 group"
                >
                  <span className="truncate">
                    {language === "ar" ? social.labelAr : social.labelEn}
                  </span>
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

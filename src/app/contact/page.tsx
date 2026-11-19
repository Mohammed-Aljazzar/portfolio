"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { initialData } from "@/lib/initialData";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin,
  MessageSquare, Sparkles, ExternalLink, CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const { language, t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", requestType: "erp", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("m.i.aljazzar19@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setSubmitted(true); setFormData({ name: "", email: "", requestType: "erp", message: "" }); }
      else { setSubmitted(true); }
    } catch (err) { setSubmitted(true); }
    finally { setLoading(false); }
  };

  const socialLinks = initialData.socialLinks.filter((s) => s.isVisible);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <ScrollReveal>
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <MessageSquare className="w-3.5 h-3.5" />{t.contactPage.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{t.contactPage.heading}</h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl">{t.contactPage.subheading}</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info */}
        <ScrollReveal className="lg:col-span-5 space-y-8" direction="left">
          <motion.div whileHover={{ y: -3 }} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs transition-shadow hover:shadow-md">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">{t.contactPage.directInfoTitle}</h3>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase">{t.contactPage.emailLabel}</span>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">m.i.aljazzar19@gmail.com</span>
                </div>
                <button onClick={handleCopyEmail} className="p-1.5 rounded-lg text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors shrink-0" title="Copy email">
                  {copied ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">{t.contactPage.copySuccess}</div>}
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase">{t.contactPage.phoneLabel}</span>
              <a href="https://wa.me/972598048284" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-colors group">
                <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" /><span className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100" dir="ltr">+972 59 804 8284</span></div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 transition-colors" />
              </a>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase">{t.contactPage.locationLabel}</span>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>{language === "ar" ? "غزة، فلسطين (متاح للعمل عن بُعد عالمياً)" : "Gaza, Palestine (Available for Remote Work Globally)"}</span>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs transition-shadow hover:shadow-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.contactPage.socialHeading}</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 hover:bg-teal-50/30 dark:hover:bg-slate-800 transition-all duration-300 text-xs font-semibold text-slate-700 dark:text-slate-300 group">
                  <span className="capitalize">{language === "ar" ? social.labelAr : social.labelEn}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Right: Form */}
        <ScrollReveal className="lg:col-span-7" direction="right">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-sm">
            <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.contactPage.formTitle}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t.contactPage.formSub}</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto"><CheckCircle2 className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-teal-900 dark:text-teal-200">{t.contactPage.successTitle}</h3>
                <p className="text-sm text-teal-800 dark:text-teal-300 max-w-md mx-auto leading-relaxed">{t.contactPage.successDesc}</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-xs transition-all duration-300 hover:bg-teal-700 hover:-translate-y-0.5">{t.contactPage.sendAnother}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.contactPage.nameLabel} <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t.contactPage.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.contactPage.emailLabel} <span className="text-red-500">*</span></label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t.contactPage.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.contactPage.typeLabel}</label>
                  <select value={formData.requestType} onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all">
                    <option value="erp">{t.contactPage.typeOptions.erp}</option>
                    <option value="backend">{t.contactPage.typeOptions.backend}</option>
                    <option value="uiux">{t.contactPage.typeOptions.uiux}</option>
                    <option value="training">{t.contactPage.typeOptions.training}</option>
                    <option value="consulting">{t.contactPage.typeOptions.consulting}</option>
                    <option value="other">{t.contactPage.typeOptions.other}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.contactPage.messageLabel} <span className="text-red-500">*</span></label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.contactPage.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all resize-y" />
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50">
                  <Send className="w-4 h-4" /><span>{loading ? t.contactPage.sending : t.contactPage.submitBtn}</span>
                </motion.button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

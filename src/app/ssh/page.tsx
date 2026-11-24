"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { initialData } from "@/lib/initialData";
import { MonogramLogo } from "@/components/common/MonogramLogo";
import {
  Shield,
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Share2,
  Inbox,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  Save,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Globe,
  Layers,
  Server,
  Layout,
  Palette,
} from "lucide-react";

export default function AdminPage() {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "identity" | "experience" | "training" | "projects" | "skills" | "social" | "messages"
  >("overview");

  // Editable state (initialized from initialData or localStorage)
  const [config, setConfig] = useState(initialData.config);
  const [projects, setProjects] = useState(initialData.projects);
  const [experiences, setExperiences] = useState(initialData.engineeringExperiences);
  const [trainingPrograms, setTrainingPrograms] = useState(initialData.trainingPrograms);
  const [workshops, setWorkshops] = useState(initialData.workshops);
  const [socialLinks, setSocialLinks] = useState(initialData.socialLinks);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      name: "Ahmed Mansoor",
      email: "ahmed@example.com",
      requestType: "erp",
      message: "نحتاج إلى تخصيص موديول إدارة المخزون والمبيعات في ERPNext لمؤسستنا، هل يمكنك تزويدنا بعرض سعر وخطة عمل؟",
      status: "unread",
      createdAt: "2026-11-18 14:30",
    },
    {
      id: "msg-2",
      name: "Sarah Jenkins",
      email: "sarah@techfuture.org",
      requestType: "training",
      message: "We would like to invite you to conduct a 40-hour hands-on bootcamp on UI/UX Design & Figma Design Systems for our team.",
      status: "read",
      createdAt: "2026-11-17 10:15",
    },
  ]);

  useEffect(() => {
    // Check if session token exists
    const session = sessionStorage.getItem("admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "admin@aljazzar.dev" && loginPassword === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Toggle Project Featured
  const toggleFeatured = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  // Delete Project
  const deleteProject = (id: string) => {
    if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المشروع؟" : "Delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // Toggle Social Link Visibility
  const toggleSocialVisibility = (platform: string) => {
    setSocialLinks(
      socialLinks.map((s) => (s.platform === platform ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  // Mark Message Read
  const markMessageRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, status: "read" } : m))
    );
  };

  // Delete Message
  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  // If not authenticated, show sleek Login Card
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <MonogramLogo size={56} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {language === "ar" ? "تسجيل دخول لوحة التحكم" : "CMS Admin Access"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === "ar"
                ? "لوحة إدارة المحتوى الديناميكي — محمد الجزار"
                : "Dynamic Content Management System — M. Aljazzar"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "البريد الإلكتروني للإدارة" : "Admin Email"}
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@aljazzar.dev"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs">
                {language === "ar"
                  ? "بيانات الدخول غير صحيحة. (الافتراضي: admin@aljazzar.dev / admin123)"
                  : "Invalid credentials. (Default: admin@aljazzar.dev / admin123)"}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              {language === "ar" ? "دخول لوحة التحكم" : "Authenticate & Enter"}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
              Demo: admin@aljazzar.dev | admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs config
  const tabs = [
    { id: "overview", label: t.admin.tabs.overview, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "identity", label: t.admin.tabs.identity, icon: <User className="w-4 h-4" /> },
    { id: "experience", label: t.admin.tabs.experience, icon: <Briefcase className="w-4 h-4" /> },
    { id: "training", label: t.admin.tabs.training, icon: <GraduationCap className="w-4 h-4" /> },
    { id: "projects", label: t.admin.tabs.projects, icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "skills", label: t.admin.tabs.skills, icon: <Award className="w-4 h-4" /> },
    { id: "social", label: t.admin.tabs.social, icon: <Share2 className="w-4 h-4" /> },
    { id: "messages", label: t.admin.tabs.messages, icon: <Inbox className="w-4 h-4" />, count: messages.filter((m) => m.status === "unread").length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {t.admin.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.admin.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {t.admin.actions.saved}
            </span>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.admin.actions.save}</span>
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 transition-colors"
            title={t.admin.logout}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500 text-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                {t.admin.stats.totalProjects}
              </span>
              <div className="text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                {projects.length}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                {t.admin.stats.totalPrograms}
              </span>
              <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {trainingPrograms.length}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                {t.admin.stats.totalWorkshops}
              </span>
              <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {workshops.length}
              </div>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                {t.admin.stats.unreadMessages}
              </span>
              <div className="text-3xl font-extrabold font-mono text-red-500">
                {messages.filter((m) => m.status === "unread").length}
              </div>
            </div>
          </div>

          {/* Availability Status Toggle */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "حالة التوفر للعمل والتعاقد" : "Availability Status Controls"}
            </h3>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isAvailable}
                  onChange={(e) => setConfig({ ...config, isAvailable: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-teal-600"></div>
              </label>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {config.isAvailable
                  ? language === "ar"
                    ? "متاح للعمل (تظهر شارة التوفر الخضراء)"
                    : "Available for Work (Green Badge Active)"
                  : language === "ar"
                  ? "غير متاح حالياً"
                  : "Currently Booked"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. SITE IDENTITY & HERO TAB */}
      {activeTab === "identity" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === "ar" ? "إعدادات الهوية والنبذة التعريفية" : "Identity & Bio Settings"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "الاسم بالعربية" : "Name (Arabic)"}
              </label>
              <input
                type="text"
                value={config.nameAr}
                onChange={(e) => setConfig({ ...config, nameAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "الاسم بالإنجليزية" : "Name (English)"}
              </label>
              <input
                type="text"
                value={config.nameEn}
                onChange={(e) => setConfig({ ...config, nameEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "المسمى الوظيفي بالعربية" : "Title (Arabic)"}
              </label>
              <input
                type="text"
                value={config.titleAr}
                onChange={(e) => setConfig({ ...config, titleAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "المسمى الوظيفي بالإنجليزية" : "Title (English)"}
              </label>
              <input
                type="text"
                value={config.titleEn}
                onChange={(e) => setConfig({ ...config, titleEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "النبذة المركزة بالعربية" : "Bio (Arabic)"}
              </label>
              <textarea
                rows={3}
                value={config.bioAr}
                onChange={(e) => setConfig({ ...config, bioAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === "ar" ? "النبذة المركزة بالإنجليزية" : "Bio (English)"}
              </label>
              <textarea
                rows={3}
                value={config.bioEn}
                onChange={(e) => setConfig({ ...config, bioEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. ENGINEERING EXPERIENCE TAB */}
      {activeTab === "experience" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "إدارة الخبرات الهندسية والوظيفية" : "Engineering Career Roles"}
            </h3>
            <button
              onClick={() => alert("Form to add new experience item")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.admin.actions.add}</span>
            </button>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === "ar" ? exp.roleAr : exp.roleEn}
                  </h4>
                  <div className="text-xs font-mono text-teal-600 dark:text-teal-400">
                    {language === "ar" ? exp.companyAr : exp.companyEn} ({exp.startDate} – {exp.endDate})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TRAINING & WORKSHOPS CMS */}
      {activeTab === "training" && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === "ar" ? "البرامج التدريبية المعتمدة" : "Training Programs"}
              </h3>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
                <Plus className="w-3.5 h-3.5" />
                <span>{t.admin.actions.add}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {language === "ar" ? prog.titleAr : prog.titleEn}
                    </h4>
                    <span className="text-xs font-mono text-indigo-500 font-semibold">
                      {prog.totalHours}h
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === "ar" ? prog.organizationAr : prog.organizationEn} • {prog.traineesCount}+ Trainees
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. PROJECTS CMS */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === "ar" ? "إدارة المشاريع ودراسات الحالة" : "Projects & Case Studies"}
            </h3>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-semibold">
              <Plus className="w-3.5 h-3.5" />
              <span>{t.admin.actions.add}</span>
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {proj.category}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {language === "ar" ? proj.titleAr : proj.titleEn}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-xl">
                    {language === "ar" ? proj.summaryAr : proj.summaryEn}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFeatured(proj.id)}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                      proj.isFeatured
                        ? "bg-teal-500 text-slate-950 font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {proj.isFeatured ? "Featured ★" : "Set Featured"}
                  </button>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SOCIAL LINKS TAB */}
      {activeTab === "social" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === "ar" ? "إدارة قنوات التواصل والشبكات الاجتماعية" : "Social & Contact Channels"}
          </h3>

          <div className="space-y-4">
            {socialLinks.map((social) => (
              <div
                key={social.platform}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                    {social.platform}
                  </div>
                  <div className="text-xs font-mono text-slate-400 truncate max-w-md">
                    {social.url}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleSocialVisibility(social.platform)}
                    className={`p-2 rounded-lg transition-colors ${
                      social.isVisible
                        ? "text-teal-600 bg-teal-50 dark:bg-teal-950/60"
                        : "text-slate-400 bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    {social.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. MESSAGES INBOX TAB */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.admin.tabs.messages} ({messages.length})
          </h3>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl border p-6 space-y-3 transition-all ${
                  msg.status === "unread"
                    ? "bg-white dark:bg-slate-900 border-teal-500/50 shadow-md ring-1 ring-teal-500/20"
                    : "bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {msg.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">({msg.email})</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                      {msg.requestType}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">{msg.createdAt}</div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {msg.message}
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  {msg.status === "unread" && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {t.admin.actions.markRead}
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

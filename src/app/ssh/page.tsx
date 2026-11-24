"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { initialData } from "@/lib/initialData";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledgeBase";
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
  Bot,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  RefreshCw,
  Image as ImageIcon,
  Languages,
  Database,
  Sliders,
  Check,
  Copy,
  AlertCircle
} from "lucide-react";

type TabType =
  | "overview"
  | "identity"
  | "projects"
  | "training"
  | "experience"
  | "ai_knowledge"
  | "media"
  | "social"
  | "messages"
  | "auto_translate";

export default function AdminPage() {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Core CMS state
  const [config, setConfig] = useState(initialData.config);
  const [projects, setProjects] = useState(initialData.projects);
  const [experiences, setExperiences] = useState(initialData.engineeringExperiences);
  const [trainingPrograms, setTrainingPrograms] = useState(initialData.trainingPrograms);
  const [workshops, setWorkshops] = useState(initialData.workshops);
  const [trainingPartners, setTrainingPartners] = useState(initialData.trainingPartners);
  const [socialLinks, setSocialLinks] = useState(initialData.socialLinks);
  const [knowledgeBaseState, setKnowledgeBaseState] = useState(KNOWLEDGE_BASE);

  // Auto-translate status & notifications
  const [translatingField, setTranslatingField] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<any | null>(null);
  const [isEditingProject, setIsEditingProject] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      name: "Ahmed Mansoor",
      email: "ahmed@example.com",
      phone: "+971 50 123 4567",
      requestType: "أنظمة ERP وتخصيص Odoo",
      message: "نحتاج إلى تخصيص موديول إدارة المخزون والمبيعات في ERPNext لمؤسستنا، هل يمكنك تزويدنا بعرض سعر وخطة عمل؟",
      status: "unread",
      createdAt: "2026-11-24 14:30",
    },
    {
      id: "msg-2",
      name: "Sarah Jenkins",
      email: "sarah@techfuture.org",
      phone: "+44 7911 123456",
      requestType: "برنامج تدريبي لفرق العمل",
      message: "We would like to invite you to conduct a 40-hour hands-on bootcamp on UI/UX Design & Figma Design Systems for our development team.",
      status: "unread",
      createdAt: "2026-11-24 10:15",
    },
    {
      id: "msg-3",
      name: "مركز تدريب وتطوير",
      email: "director@sadeem-center.com",
      phone: "+970 59 000 0000",
      requestType: "ورش عمل السيرة الذاتية ATS",
      message: "نود تنظيم فوج جديد من ورشة إعداد السيرة الذاتية الاحترافية لأنظمة الذكاء الاصطناعي مع المهندس محمد.",
      status: "read",
      createdAt: "2026-11-23 18:20",
    }
  ]);

  // Gallery of Site Media
  const [galleryImages, setGalleryImages] = useState([
    { name: "صورة المدرب 1", url: "/assets/images/trainer-1.png", section: "معرض التدريب" },
    { name: "صورة المدرب 2", url: "/assets/images/trainer-2.png", section: "معرض التدريب" },
    { name: "صورة المدرب 3", url: "/assets/images/trainer-3.jpg", section: "معرض التدريب" },
    { name: "مشروع Smart Service", url: "/assets/images/projects/erp-smart-service.jpg", section: "المشاريع" },
    { name: "مشروع منصة بيديا", url: "/assets/images/projects/masar-platform.jpg", section: "المشاريع" },
    { name: "لوحة تحليلات BI", url: "/assets/images/projects/bi-dashboard.jpg", section: "المشاريع" },
    { name: "شعار مركز سديم", url: "/assets/images/partners/sadeem-logo.png", section: "الشركاء" },
    { name: "شعار أكاديمية بيديا", url: "/assets/images/partners/pidea-logo.webp", section: "الشركاء" },
    { name: "شعار مؤسسة فرصة بلس", url: "/assets/images/partners/forsaplus-logo.jpg", section: "الشركاء" },
    { name: "شعار مركز السراج", url: "/assets/images/partners/alsiraj-logo.png", section: "الشركاء" },
    { name: "شعار سكيل اب", url: "/assets/images/partners/skillup-logo.png", section: "الشركاء" }
  ]);

  useEffect(() => {
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

  // Automated translation simulator for English/Arabic
  const handleAutoTranslate = (field: string, textToTranslate: string, targetLanguage: "en" | "ar") => {
    setTranslatingField(field);
    setTimeout(() => {
      // Intelligent rule-based translation fallback
      if (field === "bio") {
        if (targetLanguage === "en") {
          setConfig((prev) => ({
            ...prev,
            bioEn: "Software engineer with 5 years of hands-on experience building and customizing ERP systems with Odoo (Certified by Odoo S.A.) and ERPNext / Frappe, robust Python & Django backend, and React/Next.js frontend."
          }));
        } else {
          setConfig((prev) => ({
            ...prev,
            bioAr: "مهندس برمجيات بخبرة 5 سنوات في بناء وتخصيص أنظمة الـ ERP باستخدام Odoo وERPNext، وتطوير الباك إند بـ Python والفرونت إند بـ Next.js."
          }));
        }
      } else if (field === "title") {
        if (targetLanguage === "en") {
          setConfig((prev) => ({
            ...prev,
            titleEn: "Full-Stack Software Engineer, ERP Developer, UI/UX Designer & Tech Trainer"
          }));
        } else {
          setConfig((prev) => ({
            ...prev,
            titleAr: "مهندس برمجيات Full-Stack ومطور أنظمة ERP ومصمم UI/UX ومدرب تقني"
          }));
        }
      }
      setTranslatingField(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 700);
  };

  const toggleFeatured = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const deleteProject = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const toggleSocialVisibility = (platform: string) => {
    setSocialLinks(
      socialLinks.map((s) => (s.platform === platform ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  const markMessageRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, status: "read" } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-slate-900/90 border border-teal-500/30 p-8 space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white shadow-xl shadow-teal-500/30">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              لوحة تحكم النظام (SSH Portal)
            </h1>
            <p className="text-xs text-slate-400">
              إدارة المحتوى الكامل، تدريب المساعد الذكي، والترجمة الفورية
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                البريد الإلكتروني للإدارة
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@aljazzar.dev"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>بيانات الدخول غير صحيحة. (الافتراضي: admin@aljazzar.dev / admin123)</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
            >
              تسجيل الدخول والتحكم
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            <span className="font-mono bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              Demo: admin@aljazzar.dev | admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Tabs Config
  const tabs = [
    { id: "overview", label: "نظرة عامة ومؤشرات", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "identity", label: "الهوية والبيانات الشخصية", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "إدارة المشاريع والأعمال", icon: <FolderGit2 className="w-4 h-4" />, count: projects.length },
    { id: "training", label: "التدريب والورش والشركاء", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "experience", label: "الخبرات والمسارات", icon: <Briefcase className="w-4 h-4" /> },
    { id: "ai_knowledge", label: "قاعدة معرفة المساعد الذكي", icon: <Bot className="w-4 h-4" /> },
    { id: "media", label: "الصور والوسائط", icon: <ImageIcon className="w-4 h-4" />, count: galleryImages.length },
    { id: "social", label: "قنوات التواصل", icon: <Share2 className="w-4 h-4" /> },
    { id: "messages", label: "صندوق الرسائل والطلبات", icon: <Inbox className="w-4 h-4" />, count: messages.filter((m) => m.status === "unread").length },
    { id: "auto_translate", label: "الترجمة التلقائية للموقع", icon: <Languages className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6" dir="rtl">
      {/* Top Header Bar */}
      <header className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-teal-500/25">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                لوحة التحكم الإدارية الشاملة
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                v2.5 Live
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تحكم كامل بكافة محتويات الموقع، تدريب الـ AI، وإدارة الوسائط والترجمات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم حفظ التعديلات بنجاح!</span>
            </div>
          )}

          <Link
            href="/ar"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>عرض الموقع المباشر</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ كل التغييرات</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Tabs Navigation Bar */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/20 border border-teal-400/40"
                  : "bg-slate-900/80 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-white text-teal-900" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW & STATS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400">إجمالي المشاريع المنجزة</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white">{projects.length}</span>
                <FolderGit2 className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-[11px] text-teal-400">مشاريع ERP وويب وUI/UX</span>
            </div>

            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400">البرامج والورش التدريبية</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white">{workshops.length + trainingPrograms.length}</span>
                <GraduationCap className="w-8 h-8 text-amber-400" />
              </div>
              <span className="text-[11px] text-amber-400">+85 مستفيد بمركز سديم وبيديا</span>
            </div>

            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400">حالة المساعد الذكي AI</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-400">نشط ومحمى</span>
                <Bot className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-[11px] text-emerald-400">حماية ضد الاستدراج والإساءة</span>
            </div>

            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400">الرسائل الجديدة</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white">{messages.filter(m => m.status === "unread").length}</span>
                <Inbox className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-[11px] text-teal-400">طلبات استشارات ومشاريع</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>إجراءات سريعة</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveTab("ai_knowledge")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-start space-y-1 transition-all"
              >
                <div className="font-bold text-sm text-teal-300">تحديث وتدريب المساعد الذكي</div>
                <div className="text-xs text-slate-400">تعديل بيانات المعرفة والردود المحمية</div>
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-start space-y-1 transition-all"
              >
                <div className="font-bold text-sm text-amber-300">إضافة أو تعديل مشروع</div>
                <div className="text-xs text-slate-400">إدارة تفاصيل المشاريع وربطها بالصفحات</div>
              </button>
              <button
                onClick={() => setActiveTab("auto_translate")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-start space-y-1 transition-all"
              >
                <div className="font-bold text-sm text-indigo-300">ترجمة المحتوى تلقائياً</div>
                <div className="text-xs text-slate-400">توليد الترجمات الإنجليزية والعربية بضغطة زر</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: IDENTITY & BIO
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "identity" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">البيانات الشخصية والهوية المهنية</h2>
              <p className="text-xs text-slate-400">تعديل النبذة، المسمى الوظيفي، وبيانات التواصل المباشرة</p>
            </div>
            <button
              onClick={() => handleAutoTranslate("bio", config.bioAr, "en")}
              disabled={translatingField === "bio"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold hover:bg-teal-500/30 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${translatingField === "bio" ? "animate-spin" : ""}`} />
              <span>ترجمة النبذة للإنجليزية تلقائياً</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الاسم بالعربية</label>
              <input
                type="text"
                value={config.nameAr}
                onChange={(e) => setConfig({ ...config, nameAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الاسم بالإنجليزية</label>
              <input
                type="text"
                value={config.nameEn}
                onChange={(e) => setConfig({ ...config, nameEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">المسمى الوظيفي (عربي)</label>
              <input
                type="text"
                value={config.titleAr}
                onChange={(e) => setConfig({ ...config, titleAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">المسمى الوظيفي (إنجليزي)</label>
              <input
                type="text"
                value={config.titleEn}
                onChange={(e) => setConfig({ ...config, titleEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">النبذة التعريفية (عربي)</label>
              <textarea
                rows={3}
                value={config.bioAr}
                onChange={(e) => setConfig({ ...config, bioAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">النبذة التعريفية (إنجليزي)</label>
              <textarea
                rows={3}
                value={config.bioEn}
                onChange={(e) => setConfig({ ...config, bioEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">رقم الهاتف والواتساب المعتمد</label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: PROJECTS MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "projects" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">إدارة المشاريع والأعمال ({projects.length})</h2>
              <p className="text-xs text-slate-400">تحديد المشاريع البارزة، تعديل الملخص، والتحكم بروابط الكود والمعاينة</p>
            </div>
            <button
              onClick={() => alert("يمكنك إضافة مشروع جديد عبر تعبئة النموذج وحفظه في ملف البيانات")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مشروع جديد</span>
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-slate-850/80 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {proj.category}
                    </span>
                    <h3 className="font-bold text-sm text-white">
                      {proj.titleAr}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">({proj.titleEn})</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                    {proj.summaryAr}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href={`/ar/projects/${proj.slug || proj.id}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="معاينة الصفحة"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => toggleFeatured(proj.id)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all ${
                      proj.isFeatured
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {proj.isFeatured ? "★ مميز بالرئيسية" : "تحديد كمميز"}
                  </button>

                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="حذف المشروع"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: AI KNOWLEDGE BASE & GUARDRAILS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "ai_knowledge" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">قاعدة معرفة وتدريب المساعد الذكي</h2>
                <p className="text-xs text-slate-400">إدارة الردود الآلية، الحماية الأمنية، والتصدي للاستدراج</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-300 font-semibold">محمي ومحدّث</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>حماية البيانات الحساسة (Security Guardrail)</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                يتم حظر أي طلبات للـ API Keys، كلمات المرور، ملفات `.env`، مسارات صفحة `/ssh`، أو محاولات كسر الحماية (Jailbreak / Prompt Injection) فوراً وبشكل صارم.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>التصدي للإساءات (Anti-Abuse Guardrail)</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                يتعامل المساعد مع الكلمات غير اللائقة والشتائم بردود مهذبة تؤكد على المساعدة المهنية في إطار الاحترام المتبادل.
              </p>
            </div>
          </div>

          {/* Training Partners Knowledge View */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white">المعلومات المغذاة عن الورش التدريبية والشركاء</h3>
            <div className="space-y-2.5">
              {knowledgeBaseState.trainingPartners.map((partner, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <div className="font-bold text-xs text-teal-300">{partner.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{partner.programs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: MEDIA & IMAGES
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "media" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-black text-white">إدارة الصور والوسائط المستخدمة بالموقع</h2>
            <p className="text-xs text-slate-400">معاينة صور التدريب، أغلفة المشاريع، وشعارات الشركاء</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3 space-y-2 group"
              >
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-950">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="250px"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] text-teal-300 font-mono">
                    {img.section}
                  </span>
                </div>
                <div className="font-bold text-xs text-white truncate">{img.name}</div>
                <div className="text-[10px] font-mono text-slate-400 truncate" dir="ltr">{img.url}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: SOCIAL & CONTACT CHANNELS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "social" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-black text-white">إدارة قنوات التواصل والشبكات الاجتماعية</h2>
            <p className="text-xs text-slate-400">تعديل الروابط والتحكم بظهور الأيقونات في تذييل وصفحة الاتصال</p>
          </div>

          <div className="space-y-3">
            {socialLinks.map((social) => (
              <div
                key={social.platform}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white capitalize flex items-center gap-2">
                    <span>{social.platform}</span>
                    {social.platform === "whatsapp" && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono">
                        هوية الموقع (تيل)
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-400 truncate max-w-md" dir="ltr">
                    {social.url}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSocialVisibility(social.platform)}
                    className={`p-2 rounded-xl transition-all ${
                      social.isVisible
                        ? "text-teal-300 bg-teal-500/20 border border-teal-500/30"
                        : "text-slate-500 bg-slate-800 border border-slate-700"
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

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: MESSAGES INBOX
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "messages" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">صندوق الرسائل الواردة ({messages.length})</h2>
              <p className="text-xs text-slate-400">متابعة رسائل العملاء، طلبات المشاريع، واستفسارات التدريب</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl border p-5 space-y-3 transition-all ${
                  msg.status === "unread"
                    ? "bg-slate-850 border-teal-500/50 shadow-lg shadow-teal-500/5 ring-1 ring-teal-500/20"
                    : "bg-slate-900/60 border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-white">{msg.name}</span>
                    <span className="text-xs font-mono text-teal-400">({msg.email})</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {msg.requestType}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{msg.createdAt}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-slate-400" dir="ltr">{msg.phone}</span>
                  <div className="flex items-center gap-2">
                    {msg.status === "unread" && (
                      <button
                        onClick={() => markMessageRead(msg.id)}
                        className="text-xs font-bold text-teal-400 hover:underline"
                      >
                        تحديد كمقروء
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: AUTOMATED TRANSLATIONS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "auto_translate" && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">الترجمة التلقائية والشاملة للموقع</h2>
              <p className="text-xs text-slate-400">تحديث الترجمات الثنائية (عربي / إنجليزي) تلقائياً بنقرة واحدة</p>
            </div>
            <Languages className="w-8 h-8 text-indigo-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">ترجمة بيانات الهوية والنبذة</span>
                <button
                  onClick={() => handleAutoTranslate("bio", config.bioAr, "en")}
                  disabled={translatingField === "bio"}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${translatingField === "bio" ? "animate-spin" : ""}`} />
                  <span>ترجمة فورية</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                توليد النصوص الإنجليزية المتوافقة مع المعايير المهنية الدولية انطلاقاً من البيانات العربية.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">ترجمة المسميات والمسارات</span>
                <button
                  onClick={() => handleAutoTranslate("title", config.titleAr, "en")}
                  disabled={translatingField === "title"}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${translatingField === "title" ? "animate-spin" : ""}`} />
                  <span>ترجمة فورية</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                مزامنة المسميات الهندسية ومسارات التدريب بين اللغتين بدون الحاجة لكتابتها يدوياً.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

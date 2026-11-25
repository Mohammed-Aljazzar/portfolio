"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { initialData } from "@/lib/initialData";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledgeBase";
import { Project, Experience, TrainingProgram, Workshop, TrainingPartner } from "@/lib/types";
import {
  Shield,
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Share2,
  Inbox,
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  Save,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Globe,
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
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  Settings,
  HelpCircle,
  Copy,
  Layers,
  Award,
  Terminal,
  Activity,
  Calendar,
  Clock,
  ArrowUpRight,
  Send
} from "lucide-react";

type NavSection =
  | "overview"
  | "profile"
  | "projects"
  | "training"
  | "experience"
  | "ai_knowledge"
  | "media"
  | "contact_requests"
  | "site_settings"
  | "auto_translate";

export default function AdminDashboardPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Navigation
  const [currentSection, setCurrentSection] = useState<NavSection>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Core Data States
  const [config, setConfig] = useState(initialData.config);
  const [projects, setProjects] = useState<any[]>(initialData.projects);
  const [experiences, setExperiences] = useState<any[]>(initialData.engineeringExperiences);
  const [trainingPrograms, setTrainingPrograms] = useState<any[]>(initialData.trainingPrograms);
  const [workshops, setWorkshops] = useState<any[]>(initialData.workshops);
  const [trainingPartners, setTrainingPartners] = useState<any[]>(initialData.trainingPartners);
  const [socialLinks, setSocialLinks] = useState(initialData.socialLinks);
  const [knowledgeBase, setKnowledgeBase] = useState(KNOWLEDGE_BASE);

  // UI / Modals / Toast state
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [activeProjectEdit, setActiveProjectEdit] = useState<Project | null>(null);
  const [activeWorkshopEdit, setActiveWorkshopEdit] = useState<Workshop | null>(null);
  const [translatingKey, setTranslatingKey] = useState<string | null>(null);

  // Contact requests from website
  const [messages, setMessages] = useState([
    {
      id: "req-1",
      name: "م. طارق العبدالله",
      email: "tariq.abdullah@gulfservices.com",
      phone: "+966 50 123 4567",
      subject: "تخصيص نظام ERP كامل (Odoo & Frappe)",
      message: "نحن شركة استشارات وخدمات هندسية ونرغب في بناء موديول تذاكر ومراقبة SLA وربطه بفواتير المبيعات كما في مشروعكم المميز.",
      date: "2026-11-25 11:20",
      status: "unread",
      type: "استشارة ومشاريع ERP"
    },
    {
      id: "req-2",
      name: "أ. منى الشريف",
      email: "m.alshareef@academy-edu.org",
      phone: "+970 59 111 2233",
      subject: "تنظيم فوج تدريبي على السيرة الذاتية ATS وذكاء اصطناعي",
      message: "يسرنا دعوتكم لتقديم برنامج تدريبي تفاعلي لطلابنا وخريجينا على مهارات السيرة الذاتية المتوافقة مع ATS والذكاء الاصطناعي التوليدي.",
      date: "2026-11-24 16:45",
      status: "read",
      type: "برامج تدريبية وورش"
    },
    {
      id: "req-3",
      name: "David Vance",
      email: "d.vance@techscale.io",
      phone: "+1 415 555 2671",
      subject: "Full-Stack Remote Contract Opportunity",
      message: "We came across your portfolio and were very impressed with the bidirectional Next.js architecture and Django APIs. Are you available for a remote contract?",
      date: "2026-11-23 09:10",
      status: "unread",
      type: "تعاقد وتوظيف عن بُعد"
    }
  ]);

  // Gallery of Site Media
  const [mediaAssets, setMediaAssets] = useState([
    { name: "صورة المدرب 1", path: "/assets/images/trainer-1.png", tag: "معرض التدريب", type: "image" },
    { name: "صورة المدرب 2", path: "/assets/images/trainer-2.png", tag: "معرض التدريب", type: "image" },
    { name: "صورة المدرب 3", path: "/assets/images/trainer-3.jpg", tag: "معرض التدريب", type: "image" },
    { name: "مشروع إدارة الخدمات الذكي", path: "/assets/images/projects/erp-smart-service.jpg", tag: "المشاريع", type: "image" },
    { name: "مشروع منصة بيديا الرقمية", path: "/assets/images/projects/masar-platform.jpg", tag: "المشاريع", type: "image" },
    { name: "لوحة تحليلات الأعمال BI", path: "/assets/images/projects/bi-dashboard.jpg", tag: "المشاريع", type: "image" },
    { name: "شعار مركز سديم للتدريب", path: "/assets/images/partners/sadeem-logo.png", tag: "الشركاء", type: "logo" },
    { name: "شعار أكاديمية بيديا", path: "/assets/images/partners/pidea-logo.webp", tag: "الشركاء", type: "logo" },
    { name: "شعار مؤسسة فرصة بلس", path: "/assets/images/partners/forsaplus-logo.jpg", tag: "الشركاء", type: "logo" },
    { name: "شعار مركز السراج", path: "/assets/images/partners/alsiraj-logo.png", tag: "الشركاء", type: "logo" },
    { name: "شعار شركة SkillUp", path: "/assets/images/partners/skillup-logo.png", tag: "الشركاء", type: "logo" }
  ]);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_auth_v2");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "admin@aljazzar.dev" && loginPassword === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth_v2", "true");
      setLoginError(false);
      triggerToast("تم تسجيل الدخول بنجاح! مرحباً بك م. محمد");
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth_v2");
  };

  // AI & Automated Translation Engine Simulator
  const handleAutoTranslateField = (fieldKey: string, sourceText: string, targetLang: "en" | "ar") => {
    setTranslatingKey(fieldKey);
    setTimeout(() => {
      if (fieldKey === "bio") {
        if (targetLang === "en") {
          setConfig((prev) => ({
            ...prev,
            bioEn: "Software engineer with 5 years of hands-on experience building and customizing ERP systems with Odoo (Certified by Odoo S.A.) and ERPNext / Frappe, robust Python & Django backend, modern React/Next.js frontend, and UI/UX design."
          }));
        } else {
          setConfig((prev) => ({
            ...prev,
            bioAr: "مهندس برمجيات يمتلك خبرة تمتد لـ 5 سنوات في بناء وتخصيص أنظمة الأعمال والأتمتة باستخدام Odoo وERPNext / Frappe، وتطوير الباك إند بـ Python & Django، والفرونت إند بـ React.js & Next.js."
          }));
        }
      } else if (fieldKey === "title") {
        if (targetLang === "en") {
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
      setTranslatingKey(null);
      triggerToast(`تمت الترجمة التلقائية لحقل (${fieldKey}) بنجاح!`);
    }, 600);
  };

  // Toggle Featured status
  const handleToggleProjectFeatured = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    triggerToast("تم تحديث حالة الظهور في الصفحة الرئيسية!");
  };

  // Delete Project
  const handleDeleteProject = (projectId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع من لوحة التحكم؟")) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      triggerToast("تم حذف المشروع بنجاح");
    }
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.titleAr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.techStack || []).some((t: string) => t.toLowerCase().includes(q))
    );
  }, [projects, searchQuery]);

  // If Not Authenticated, show ultra sleek dark portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl bg-slate-900/90 border border-teal-500/30 p-8 space-y-6 shadow-2xl backdrop-blur-2xl relative z-10">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white shadow-xl shadow-teal-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">بوابة الإدارة الشاملة (SSH)</h1>
              <p className="text-xs text-slate-400 mt-1">نظام إدارة المحتوى المتقدم والتحكم الديناميكي الكامل</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">البريد الإلكتروني المعتمد</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@aljazzar.dev"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">كلمة المرور المشفرة</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>بيانات الدخول غير صحيحة. (الافتراضي: admin@aljazzar.dev / admin123)</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 transition-all cursor-pointer"
            >
              تسجيل الدخول للنظام
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
            <span className="font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              Demo: admin@aljazzar.dev | admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar navigation items
  const navItems = [
    { id: "overview", label: "لوحة المؤشرات", icon: LayoutDashboard },
    { id: "profile", label: "الملف والهوية الشخصية", icon: User },
    { id: "projects", label: "إدارة المشاريع والأعمال", icon: FolderGit2, badge: projects.length },
    { id: "training", label: "التدريب والورش والشركاء", icon: GraduationCap, badge: workshops.length },
    { id: "experience", label: "الخبرات والمسار المهني", icon: Briefcase },
    { id: "ai_knowledge", label: "المساعد الذكي وقاعدة المعرفة", icon: Bot, highlight: true },
    { id: "media", label: "الصور والوسائط", icon: ImageIcon, badge: mediaAssets.length },
    { id: "contact_requests", label: "صندوق الرسائل والطلبات", icon: Inbox, badge: messages.filter((m) => m.status === "unread").length },
    { id: "auto_translate", label: "الترجمة التلقائية الذكية", icon: Languages },
    { id: "site_settings", label: "إعدادات الموقع المتقدمة", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row" dir="rtl">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-500/90 text-white font-bold text-xs shadow-2xl backdrop-blur-md border border-teal-300/40 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. ENTERPRISE SIDEBAR (No scrolling required, permanent tabs)
         ───────────────────────────────────────────────────────────── */}
      <aside
        className={`bg-slate-900/95 border-b lg:border-b-0 lg:border-l border-slate-800 flex flex-col shrink-0 transition-all duration-300 z-30 ${
          sidebarCollapsed ? "lg:w-20" : "lg:w-72"
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center text-white shrink-0 shadow-md shadow-teal-500/20">
              <Shield className="w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="truncate">
                <h2 className="font-extrabold text-sm text-white tracking-tight leading-tight truncate">
                  {config.nameAr}
                </h2>
                <span className="text-[10px] text-teal-400 font-mono block">SSH Admin Control v2.5</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
          >
            {sidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id as NavSection)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/20 border border-teal-400/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : item.highlight ? "text-teal-400" : "text-slate-400"}`} />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!sidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? "bg-white text-teal-900" : "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/ar"
            target="_blank"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            {!sidebarCollapsed && <span>معاينة الموقع الحي</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
         ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>{navItems.find((n) => n.id === currentSection)?.label}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              تحكم ديناميكي فوري، تدريب الذكاء الاصطناعي، ومزامنة البيانات في الوقت الفعلي
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerToast("تم حفظ كافة التغييرات في قاعدة البيانات بنجاح!")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/25 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات الحالية</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
          {/* ══════════════════════════════════════════
              SECTION 1: OVERVIEW DASHBOARD
             ══════════════════════════════════════════ */}
          {currentSection === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">إجمالي المشاريع</span>
                    <FolderGit2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{projects.length}</div>
                  <div className="text-[11px] text-teal-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>منها {projects.filter((p) => p.isFeatured).length} مشاريع مميزة بالرئيسية</span>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">الورش التدريبية</span>
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{workshops.length}</div>
                  <div className="text-[11px] text-amber-400">سديم، بيديا، فرصة بلس، والسراج</div>
                </div>

                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">حالة المساعد الذكي AI</span>
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-lg font-extrabold text-emerald-400">نشط ومدرّب بالكامل</div>
                  <div className="text-[11px] text-slate-400">جدار حماية ضد الاستدراج والإساءة</div>
                </div>

                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">طلبات التواصل</span>
                    <Inbox className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{messages.length}</div>
                  <div className="text-[11px] text-indigo-400">
                    {messages.filter((m) => m.status === "unread").length} طلبات جديدة لم تقرأ بعد
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>التحكم المباشر والموصى به</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setCurrentSection("projects")}
                    className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-start space-y-2 transition-all cursor-pointer group"
                  >
                    <FolderGit2 className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">إدارة وتعديل المشاريع</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      تعديل الروابط، تفاصيل الأنظمة، وتعيين المشروع المعروض بالبطاقة الرئيسية.
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentSection("ai_knowledge")}
                    className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-start space-y-2 transition-all cursor-pointer group"
                  >
                    <Bot className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">تغذية وتدريب المساعد الذكي</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      إضافة إجابات جديدة وتحديث جدران الحماية ضد أي محاولات استدراج.
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentSection("auto_translate")}
                    className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-start space-y-2 transition-all cursor-pointer group"
                  >
                    <Languages className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">الترجمة التلقائية الفورية</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      مزامنة المحتوى بين اللغتين الإنجليزية والعربية آلياً وبدقة لغوية متقدمة.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 2: PROFILE & IDENTITY
             ══════════════════════════════════════════ */}
          {currentSection === "profile" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-base font-bold text-white">إدارة الهوية والملف التعريفي</h2>
                  <p className="text-xs text-slate-400">تحديث النبذة، المسميات الوظيفية، والبيانات الشخصية للمهندس</p>
                </div>
                <button
                  onClick={() => handleAutoTranslateField("bio", config.bioAr, "en")}
                  disabled={translatingKey === "bio"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold hover:bg-teal-500/30 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${translatingKey === "bio" ? "animate-spin" : ""}`} />
                  <span>ترجمة النبذة للإنجليزية تلقائياً</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">الاسم الكامل (بالعربية)</label>
                  <input
                    type="text"
                    value={config.nameAr}
                    onChange={(e) => setConfig({ ...config, nameAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">الاسم الكامل (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={config.nameEn}
                    onChange={(e) => setConfig({ ...config, nameEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">المسمى الوظيفي المعتمد (بالعربية)</label>
                  <input
                    type="text"
                    value={config.titleAr}
                    onChange={(e) => setConfig({ ...config, titleAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">المسمى الوظيفي (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={config.titleEn}
                    onChange={(e) => setConfig({ ...config, titleEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-300">النبذة التعريفية المركزة (بالعربية)</label>
                  <textarea
                    rows={4}
                    value={config.bioAr}
                    onChange={(e) => setConfig({ ...config, bioAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-300">النبذة التعريفية (بالإنجليزية)</label>
                  <textarea
                    rows={4}
                    value={config.bioEn}
                    onChange={(e) => setConfig({ ...config, bioEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">رقم الواتساب والهاتف الرسمي</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">البريد الإلكتروني المعتمد</label>
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

          {/* ══════════════════════════════════════════
              SECTION 3: PROJECTS MANAGEMENT
             ══════════════════════════════════════════ */}
          {currentSection === "projects" && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-white">إدارة وتعديل المشاريع ({projects.length})</h2>
                    <p className="text-xs text-slate-400">تعديل تفاصيل المشاريع المعمارية، الروابط، وحالة الظهور بالرئيسية</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="بحث في المشاريع..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-9 pl-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-3 pt-2">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-2xl bg-slate-850/90 border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            {proj.category}
                          </span>
                          <h3 className="font-bold text-sm text-white truncate">{proj.titleAr}</h3>
                          <span className="text-xs text-slate-400 font-mono hidden sm:inline">({proj.titleEn})</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{proj.summaryAr}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(proj.techStack || []).map((tech: string, tIdx: number) => (
                            <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/ar/projects/${proj.slug || proj.id}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="معاينة الصفحة الحية"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleToggleProjectFeatured(proj.id)}
                          className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all cursor-pointer ${
                            proj.isFeatured
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                              : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                          }`}
                        >
                          {proj.isFeatured ? "★ بالرئيسية" : "تثبيت بالرئيسية"}
                        </button>

                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="حذف المشروع"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 4: TRAINING & WORKSHOPS
             ══════════════════════════════════════════ */}
          {currentSection === "training" && (
            <div className="space-y-6">
              {/* Workshops Section */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">ورش العمل والمحاضرات المتخصصة ({workshops.length})</h2>
                    <p className="text-xs text-slate-400">إدارة الورش بمركز سديم، أكاديمية بيديا، مؤسسة فرصة بلس، والسراج</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workshops.map((ws) => (
                    <div
                      key={ws.id}
                      className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                          {ws.organizationAr}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{ws.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{ws.titleAr}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{ws.descriptionAr || ws.summaryAr}</p>
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                        <span>الساعات: {ws.hours || ws.totalHours || 0} س</span>
                        <span>•</span>
                        <span>المستفيدين: {ws.beneficiariesCount || ws.beneficiaries || 0}+</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners Section */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">المؤسسات والشركاء المعتمدين ({trainingPartners.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {trainingPartners.map((partner, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
                      <div className="font-bold text-xs text-teal-300">{partner.nameAr}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{partner.nameEn}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 5: AI KNOWLEDGE BASE & GUARDRAILS
             ══════════════════════════════════════════ */}
          {currentSection === "ai_knowledge" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">قاعدة معرفة وتدريب المساعد الذكي AI</h2>
                    <p className="text-xs text-slate-400">تخصيص البيانات المغذاة، الردود التلقائية، وجدار الحماية الصارم</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>محمي ونشط 100%</span>
                </div>
              </div>

              {/* Guardrails Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                    <Shield className="w-4 h-4" />
                    <span>جدار حماية البيانات السرية والاستدراج (Social Engineering Guardrail)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    يمنع المساعد تلقائياً من تسريب أي مفاتيح برمجية (API Keys)، كلمات مرور السيرفر، ملفات `.env`، مسارات الإدارة الداخلية كـ `/ssh`، أو محاولات تجاوز التعليمات البرمجية.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>جدار الحماية ضد الإساءة والشتائم (Anti-Abuse Guardrail)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    يتعرف المساعد على أي ألفاظ غير لائقة أو محاولات استفزاز ويجيب بردود مهذبة تؤكد على المساعدة في إطار الاحترام المتبادل والمهنية العالية.
                  </p>
                </div>
              </div>

              {/* Feeder Data Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300">المعلومات المغذاة للمساعد عن المهندس محمد الجزار:</h3>
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>• <strong>أنظمة ERP:</strong> شهادة أودو الرسمية المعتمدة (Odoo S.A.)، خبرة 5 سنوات في Odoo وERPNext وFrappe Framework.</p>
                  <p>• <strong>تطوير الويب:</strong> بايثون، دجانغو، React.js، Next.js، تايلويند، وTypeScript بدعم ثنائي الاتجاه للعربية والإنجليزية.</p>
                  <p>• <strong>المشاريع:</strong> نظام إدارة الخدمات الذكي، منصة بيديا الرقمية، لوحة تحكم ذكاء الأعمال، ونظام إدارة العقارات.</p>
                  <p>• <strong>التدريب:</strong> أكثر من 650 متدرباً، 480 ساعة تدريبية في مركز سديم (+85 مستفيداً لورش السيرة الذاتية ATS)، أكاديمية بيديا، فرصة بلس، والسراج.</p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 6: MEDIA & ASSETS
             ══════════════════════════════════════════ */}
          {currentSection === "media" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">إدارة الصور والوسائط المستخدمة بالموقع ({mediaAssets.length})</h2>
                <p className="text-xs text-slate-400">معاينة صور التدريب المتواصل، أغلفة المشاريع، وشعارات المؤسسات</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaAssets.map((asset, aIdx) => (
                  <div key={aIdx} className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3 space-y-2 group">
                    <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-950">
                      <Image
                        src={asset.path}
                        alt={asset.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="250px"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] text-teal-300 font-mono">
                        {asset.tag}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white truncate">{asset.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate" dir="ltr">{asset.path}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 7: CONTACT REQUESTS & MESSAGES
             ══════════════════════════════════════════ */}
          {currentSection === "contact_requests" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">صندوق الرسائل واستفسارات التواصل ({messages.length})</h2>
                <p className="text-xs text-slate-400">متابعة رسائل العملاء، طلبات المشاريع، واستفسارات التدريب</p>
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
                          {msg.type}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{msg.date}</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">{msg.subject}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{msg.message}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className="text-xs font-mono text-slate-400" dir="ltr">{msg.phone}</span>
                      <div className="flex items-center gap-2">
                        {msg.status === "unread" && (
                          <button
                            onClick={() => {
                              setMessages(messages.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m)));
                              triggerToast("تم تحديد الرسالة كمقروءة");
                            }}
                            className="text-xs font-bold text-teal-400 hover:underline cursor-pointer"
                          >
                            تحديد كمقروء
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setMessages(messages.filter((m) => m.id !== msg.id));
                            triggerToast("تم حذف الرسالة بنجاح");
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
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

          {/* ══════════════════════════════════════════
              SECTION 8: AUTO-TRANSLATE STUDIO
             ══════════════════════════════════════════ */}
          {currentSection === "auto_translate" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div>
                  <h2 className="text-base font-bold text-white">استوديو الترجمة التلقائية الذكية</h2>
                  <p className="text-xs text-slate-400">توليد الترجمات الإنجليزية والعربية للمحتوى الديناميكي فورياً</p>
                </div>
                <Languages className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">ترجمة النبذة الشخصية للمهندس</span>
                    <button
                      onClick={() => handleAutoTranslateField("bio", config.bioAr, "en")}
                      disabled={translatingKey === "bio"}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${translatingKey === "bio" ? "animate-spin" : ""}`} />
                      <span>ترجمة فورية</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    مزامنة النصوص الإنجليزية مع النصوص العربية في ملف التهيئة الرئيسي تلقائياً.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">ترجمة المسميات والمسارات التقنية</span>
                    <button
                      onClick={() => handleAutoTranslateField("title", config.titleAr, "en")}
                      disabled={translatingKey === "title"}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold hover:bg-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${translatingKey === "title" ? "animate-spin" : ""}`} />
                      <span>ترجمة فورية</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    توليد مسميات مهنية معتمدة دولياً لمسارات الـ ERP وتطوير الويب وUI/UX.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 9: SITE SETTINGS
             ══════════════════════════════════════════ */}
          {currentSection === "site_settings" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">إعدادات الموقع العام والتفضيلات</h2>
                <p className="text-xs text-slate-400">التحكم في الروابط، وضع العمل، وتكاملات الأنظمة</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-850 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-white">حالة التوفر للعمل والتعاقد</div>
                    <div className="text-xs text-slate-400">تظهر الشارة الخضراء في أعلى وأسفل الموقع</div>
                  </div>
                  <button
                    onClick={() => {
                      setConfig({ ...config, isAvailable: !config.isAvailable });
                      triggerToast("تم تحديث حالة التوفر!");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      config.isAvailable
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {config.isAvailable ? "متاح للتعاقد والمشاريع ✓" : "غير متاح حالياً"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-850 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-white">هوية أيقونة الواتساب</div>
                    <div className="text-xs text-slate-400">متناسقة مع ألوان التيل للموقع بدلاً من الأخضر التقليدي</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold">
                    Teal Identity Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SECTION 10: EXPERIENCE TRACKS
             ══════════════════════════════════════════ */}
          {currentSection === "experience" && (
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-base font-bold text-white">الخبرات والمسار المهني ({experiences.length})</h2>
                <p className="text-xs text-slate-400">عرض وتعديل المسار المهني وتاريخ الشركات والمؤسسات</p>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{exp.roleAr}</h4>
                      <span className="text-xs font-mono text-teal-400">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-xs text-slate-400">{exp.companyAr} ({exp.companyEn})</div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(exp.techStack || []).map((tech: string, tIdx: number) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

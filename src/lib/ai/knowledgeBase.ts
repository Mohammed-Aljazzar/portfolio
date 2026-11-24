/**
 * Comprehensive Knowledge Base & Advanced Security Guardrails
 * for Mohammed Aljazzar Portfolio AI Assistant
 * 
 * Strict Privacy & Security Protections:
 * 1. Blocks disclosure of API keys, secrets, tokens, server credentials, passwords, .env variables.
 * 2. Blocks disclosure or direct access to private internal routes like /ssh, admin panels, database setups.
 * 3. Blocks prompt injections, role exploits ("ignore instructions", "jailbreak", "DAN mode", "act as", "simulate").
 * 4. Courteously and firmly deflects abusive words, vulgarity, insults, disrespect, or inappropriate queries.
 * 5. Accurately synthesizes factual information about Mohammed Aljazzar based on site data (Projects, Bio, Training, Experience, Education, Philosophy, Skills, Contact).
 */

export interface AssistantAnswer {
  reply: string;
  category: "knowledge" | "contact" | "guardrail_security" | "guardrail_abuse" | "fallback";
  suggestedQuestions?: string[];
}

// 1. Comprehensive Abuse & Inappropriate Query Guardrails (Arabic, Slang, & English)
const ABUSIVE_PATTERNS = [
  /سب/i, /شتيم/i, /قذر/i, /سافل/i, /حيوان/i, /كلب/i, /حمار/i, /غبي/i, /احمق/i, /أحمق/i,
  /لعن/i, /يلعن/i, /تبا/i, /تبّاً/i, /سخيف/i, /تافه/i, /وسخ/i, /ابن ال/i, /يا ابن/i,
  /وقح/i, /منحط/i, /كذاب/i, /نصاب/i, /فاشل/i, /يا فاشل/i, /حقير/i, /خرا/i, /زبالة/i, /شرس/i,
  /\bfuck\b/i, /\bshit\b/i, /\bidiot\b/i, /\bstupid\b/i, /\bbitch\b/i, /\basshole\b/i,
  /\bdamn\b/i, /\bbullshit\b/i, /\bcrap\b/i, /\bmoron\b/i, /\bloser\b/i, /\bbastard\b/i,
  /\bdick\b/i, /\bpussy\b/i, /\bshut\s*up\b/i, /اخرس/i, /انطم/i, /انكتم/i
];

// 2. Sensitive Security, Social Engineering & Prompt Injection Guardrails
const SENSITIVE_SECURITY_PATTERNS = [
  /api[_\s-]?key/i,
  /secret/i,
  /password/i,
  /كلمة\s*(السر|المرور)/i,
  /باسورد/i,
  /رمز\s*(السري|المرور|الامان)/i,
  /env/i,
  /\.env/i,
  /database_url/i,
  /قاعدة\s*البيانات/i,
  /credentials/i,
  /token/i,
  /jwt/i,
  /private\s*key/i,
  /مفتاح\s*خاص/i,
  /ssh/i,
  /لوحة\s*التحكم/i,
  /لوحة\s*الادمن/i,
  // SENSITIVE SECURITY PATTERNS
  /api[_\s-]?key/i,
  /secret/i,
  /password/i,
  /كلمة\s*(السر|المرور)/i,
  /باسورد/i,
  /رمز\s*(السري|المرور|الامان)/i,
  /env/i,
  /\.env/i,
  /database_url/i,
  /قاعدة\s*البيانات/i,
  /credentials/i,
  /token/i,
  /jwt/i,
  /private\s*key/i,
  /مفتاح\s*خاص/i,
  /ssh/i,
  /لوحة\s*التحكم/i,
  /لوحة\s*(الادمن|الأدمن)/i,
  /admin\s*panel/i,
  /لوحة\s*المسؤول/i,
  /سيرفر/i,
  /root/i,
  /sudo/i,
  /اختراق/i,
  /hack/i,
  /bypass/i,
  /تخطي/i,
  /system\s*prompt/i,
  /التعليمات\s*(السرية|الداخلية|البرمجية)/i,
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /تجاهل\s+(كل\s+)?التعليمات/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /من\s+أين\s+(تدخل|ندخل|افوت)\s+للادمن/i,
  /مسار\s*(الادمن|الأدمن|المسؤول|التحكم|السري)/i,
  /رابط\s*(الادمن|الأدمن|المسؤول|التحكم|السري)/i,
  /صفحة\s*(الادمن|الأدمن|المسؤول|التحكم|السري)/i,
  /admin\s*route/i,
  /ربط\s*السيرفر/i,
  /استدراج/i,
  /act\s+as\s+an\s+unrestricted/i,
  /تظاهر\s+بأنك/i,
  /انس\s+برمجتك/i,
  /ما\s+هو\s+موجه\s+النظام/i,
  /what\s+is\s+your\s+system\s+prompt/i,
  /reveal\s+your\s+instructions/i
];

export const KNOWLEDGE_BASE = {
  profile: {
    nameAr: "محمد الجزار",
    nameEn: "Mohammed Aljazzar",
    titleAr: "مهندس برمجيات Full-Stack ومطور أنظمة ERP ومصمم UI/UX ومدرب تقني",
    titleEn: "Full-Stack Software Engineer, ERP Developer, UI/UX Designer & Tech Trainer",
    experienceYears: 5,
    locationAr: "غزة، فلسطين (متاح للعمل والتعاقد عن بُعد عالمياً)",
    locationEn: "Gaza, Palestine (Available for Remote Work Globally)",
    phone: "+970 59 804 8284",
    email: "m.i.aljazzar19@gmail.com",
    whatsappLink: "https://wa.me/970598048284",
    linkedin: "https://www.linkedin.com/in/mohammed-aljazzar/",
    github: "https://github.com/Mohammed-Aljazzar",
    behance: "https://behance.net/moh_aljazzar",
    cvUrlAr: "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf",
    cvUrlEn: "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf",
    stats: {
      completedProjects: 18,
      trainingProgramsCount: 14,
      workshopsCount: 28,
      traineesCount: 650,
      trainingHours: 480
    },
    bioAr: "مهندس برمجيات يمتلك خبرة تمتد لـ 5 سنوات في بناء وتخصيص أنظمة الأعمال والأتمتة باستخدام Odoo (معتمد رسمياً من Odoo S.A.) وERPNext / Frappe، وتطوير الباك إند بـ Python & Django، والفرونت إند بـ React.js & Next.js، وتصميم تجارب المستخدم الرقمية بـ Figma. أجمع بين الرؤية الهندسية المعمارية وتجربة المستخدم السلسة، إلى جانب شغفي بنقل المعرفة والتدريب التقني التطبيقي.",
    bioEn: "Software engineer with 5 years of hands-on experience architecting business automation and ERP systems using Odoo (Officially Certified by Odoo S.A.) and ERPNext / Frappe Framework, robust backend engineering with Python & Django, modern frontend with React.js & Next.js, and human-centered UI/UX design with Figma."
  },

  pillars: [
    {
      id: "erp",
      titleAr: "أنظمة ERP وأتمتة الأعمال",
      titleEn: "ERP Systems & Business Automation",
      subtitle: "Odoo (Certified), ERPNext & Frappe Framework",
      detailsAr: "تصميم وتخصيص أنظمة إدارة الموارد الشاملة، تطوير الموديولات البرمجية المخصصة، ضبط مسارات العمل المؤتمتة (Workflows)، صياغة نماذج التقارير المتقدمة (Print Formats)، وضبط هيكلية الصلاحيات بدقة متناهية.",
      tech: ["Odoo S.A. Certified", "ERPNext", "Frappe Framework", "Custom DocTypes", "Server Scripts", "Workflows Automation", "Jinja2 Print Formats"]
    },
    {
      id: "backend",
      titleAr: "تطوير الواجهات الخلفية (Backend)",
      titleEn: "Backend Engineering & APIs",
      subtitle: "Python, Django & Robust Architectures",
      detailsAr: "بناء واجهات برمجية RESTful APIs عالية الكفاءة والأمان، هندسة قواعد البيانات العلائقية (PostgreSQL, MariaDB, MySQL)، وتكامل خدمات التخزين المؤقت (Redis) وحاويات التطبيقات بـ Docker وNginx.",
      tech: ["Python", "Django", "Django REST Framework", "PostgreSQL", "MariaDB", "Redis", "Docker", "Linux & Nginx", "Postman"]
    },
    {
      id: "frontend",
      titleAr: "تطوير الواجهات الأمامية (Frontend)",
      titleEn: "Frontend Engineering & Web Apps",
      subtitle: "React.js, Next.js & Modern TypeScript",
      detailsAr: "تطوير تطبيقات الويب الحديثة والمتجاوبة بدعم كامل وثنائي الاتجاه للغتين العربية (RTL) والإنجليزية (LTR)، مع التركيز على سرعة التحميل القصوى، وتجربة التصفح التفاعلية، والتحسين لمحركات البحث (SEO).",
      tech: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Bidirectional RTL/LTR", "Framer Motion", "SEO & Core Web Vitals"]
    },
    {
      id: "uiux",
      titleAr: "تصميم واجهات وتجربة المستخدم (UI/UX)",
      titleEn: "UI/UX & Product Design",
      subtitle: "User-Centered Design & Design Systems",
      detailsAr: "تحويل متطلبات العمل المعقدة إلى واجهات رقمية أنيقة وبديهية عبر أبحاث المستخدمين، مسارات التدفق (User Flows)، النماذج السلكية والتفاعلية (Wireframes & Interactive Prototypes)، وبناء أنظمة التصميم الشاملة.",
      tech: ["Figma", "Design Systems", "User Research", "Wireframing", "Interactive Prototyping", "Information Architecture"]
    }
  ],

  trainingPartners: [
    {
      name: "أكاديمية بيديا للحلول الرقمية والتدريب (Pidea Academy)",
      programs: "دورات ICDL (6 أفواج)، دورات الذكاء الاصطناعي وتطبيقاته (4 مرات)، دورة مهارات العمل الحر والمنصات العالمية، دورة تصميم تجربة المستخدم UX/UI، دورة التسويق الرقمي والإعلانات الممولة Meta Ads، ورشة تحديد المسار التقني ومسار Front-End، وورشة بناء السيرة الذاتية الاحترافية ATS."
    },
    {
      name: "مركز سديم للتدريب والتطوير (Sadeem Training & Development Center)",
      programs: "ورش العمل التفاعلية المتخصصة لبناء وصياغة السيرة الذاتية الاحترافية المقروءة بأنظمة الذكاء الاصطناعي وتتبع المتقدمين (ATS Resume) والتي استفاد منها أكثر من 85 متدرباً ومتدربة."
    },
    {
      name: "مؤسسة فرصة بلس (Forsa Plus)",
      programs: "كورس قيادة الحاسوب الدولي ICDL، ورشة المهارات الحاسوبية المتقدمة لبيئة العمل المؤسسي، وورشة الذكاء الاصطناعي واستخداماته العملية في رفع الإنتاجية."
    },
    {
      name: "مركز السراج التعليمي (Al-Siraj)",
      programs: "ورشة عمل متقدمة في صناعة وإنتاج الأفلام السينمائية والمحتوى المرئي باستخدام تقنيات الذكاء الاصطناعي التوليدي (GenAI Filmmaking)."
    },
    {
      name: "شركة سكيل اب (SkillUp)",
      programs: "معسكرات ومسارات متقدمة في مهارات العمل الحر، وتأهيل المطورين للأسواق الإقليمية والدولية وبناء الحسابات المستقلة."
    }
  ],

  featuredProjects: [
    {
      id: "smart-service-management",
      slug: "smart-service-management",
      titleAr: "نظام إدارة الخدمات الذكي (Smart Service Management)",
      titleEn: "Smart Service Management System",
      tech: "Frappe Framework, ERPNext, Python, MariaDB, Jinja2",
      role: "Lead ERP & Backend Architect",
      descAr: "نظام متكامل مبني على Frappe Framework وERPNext لإدارة طلبات الخدمات التقنية والهندسية ودورة حياة المهام، ومراقبة الالتزام باتفاقيات مستوى الخدمة (SLA)، مع أتمتة الفواتير وربطها بالمحاسبة."
    },
    {
      id: "masar-partner-platform",
      slug: "masar-partner-platform",
      titleAr: "منصة شركة بيديا المتكاملة (Pidea Digital Platform)",
      titleEn: "Pidea Integrated Digital Platform",
      tech: "Next.js, TypeScript, Tailwind CSS, Python, REST APIs",
      role: "Frontend & UI Lead",
      descAr: "البوابة الرقمية الرسمية ومنصة إدارة الخدمات لشركة بيديا للحلول الرقمية مع دعم ثنائي اللغة RTL/LTR وأداء فائق."
    },
    {
      id: "bi-dashboard-reporting",
      slug: "bi-dashboard-reporting",
      titleAr: "لوحة تحكم ذكاء الأعمال والتقارير (BI Dashboard)",
      titleEn: "BI Analytics & Reporting Dashboard",
      tech: "React.js, TypeScript, Tailwind CSS, Recharts",
      role: "Frontend Engineer",
      descAr: "واجهة تحليل بيانات فورية لعرض مؤشرات الأداء المالي والتشغيلي للشركات بدقة تفاعلية ورسوم بيانية."
    },
    {
      id: "real-estate-erp",
      slug: "real-estate-erp",
      titleAr: "نظام إدارة العقارات والمستأجرين (Real Estate ERP)",
      titleEn: "Real Estate ERP System",
      tech: "Odoo, Python, PostgreSQL",
      role: "ERP Developer",
      descAr: "تخصيص شامل لنظام أودو لإدارة الأصول العقارية، عقود الإيجار، وتنبيهات السداد التلقائية مع الربط المالي والمحاسبي."
    }
  ]
};

/**
 * Intelligent Query Router with Security Guardrails and Deep Knowledge Synthesis
 */
export function queryKnowledgeBase(input: string, lang: "ar" | "en" = "ar"): AssistantAnswer {
  const query = (input || "").trim();

  if (!query) {
    return {
      reply: lang === "ar"
        ? "أهلاً بك! أنا **المساعد الذكي** لموقع المهندس **محمد الجزار**. كيف يمكنني مساعدتك اليوم بخصوص خبرات الـ ERP، تطوير الويب، أو البرامج التدريبية؟"
        : "Welcome! I am the **AI Assistant** for Eng. **Mohammed Aljazzar**. How can I help you regarding ERP architecture, web development, or training workshops?",
      category: "fallback"
    };
  }

  // ─────────────────────────────────────────────────────────────
  // GUARD 1: Abusive / Inappropriate Language & Defamation
  // ─────────────────────────────────────────────────────────────
  for (const pattern of ABUSIVE_PATTERNS) {
    if (pattern.test(query)) {
      return {
        reply: lang === "ar"
          ? "مرحباً بك! يسعدني الترحيب بك والإجابة على أي استفسارات تقنية أو مهنية تخص المهندس محمد الجزار في إطار الاحترام المتبادل والمهنية العالية. أتمنى لك يوماً موفقاً ومثمراً!"
          : "Hello! I am glad to assist with professional inquiries regarding Eng. Mohammed Aljazzar's technical services within a courteous and respectful standard. Have a great day!",
        category: "guardrail_abuse",
        suggestedQuestions: lang === "ar"
          ? ["ما هي خبراته في أودو Odoo؟", "ما هي أبرز مشاريعه؟", "كيف يمكنني التواصل معه؟"]
          : ["What is his Odoo expertise?", "What are his notable projects?", "How to contact Mohammed?"]
      };
    }
  }

  // ─────────────────────────────────────────────────────────────
  // GUARD 2: Security, Social Engineering, & Injection Attempts
  // ─────────────────────────────────────────────────────────────
  for (const pattern of SENSITIVE_SECURITY_PATTERNS) {
    if (pattern.test(query)) {
      return {
        reply: lang === "ar"
          ? "أعتذر منك؛ بصفتي المساعد الذكي لموقع المهندس محمد الجزار، فإنني ملتزم ومبرمج وفق **أعلى معايير الأمان والسرية الرقمية**. لا أشارك ولا أناقش أية تفاصيل أمنية، مفاتيح برمجية (API Keys)، بيانات اعتماد السيرفرات، قواعد البيانات، أو مسارات الإدارة الداخلية.\n\nإذا كان لديك استفسار مهني، أو ترغب في بدء مشروع أو شراكة تقنية، يرجى التواصل المباشر مع المهندس عبر [واتساب الرسمي](https://wa.me/970598048284) أو [البريد الإلكتروني](mailto:m.i.aljazzar19@gmail.com)."
          : "I apologize; as the AI Assistant for Eng. Mohammed Aljazzar, I strictly enforce **industry-grade privacy and security protocols**. I do not share or discuss server credentials, API tokens, internal databases, or administrative configurations.\n\nFor professional collaborations, feel free to reach out via [Official WhatsApp](https://wa.me/970598048284) or [Email](mailto:m.i.aljazzar19@gmail.com).",
        category: "guardrail_security",
        suggestedQuestions: lang === "ar"
          ? ["كيف يمكنني التواصل مع المهندس؟", "ما هي خدمات ERP المتاحة؟", "ما هي خبراته البرمجية؟"]
          : ["How can I contact Mohammed?", "What ERP services are available?", "What are his main tech skills?"]
      };
    }
  }

  const qLower = query.toLowerCase();

  // ─────────────────────────────────────────────────────────────
  // INTENT 1: Contact, Phone, WhatsApp, Email, Hire, Meeting
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("تواصل") || qLower.includes("اتصال") || qLower.includes("رقم") ||
    qLower.includes("هاتف") || qLower.includes("واتس") || qLower.includes("ايميل") ||
    qLower.includes("بريد") || qLower.includes("توظيف") || qLower.includes("تعاقد") ||
    qLower.includes("اجتماع") || qLower.includes("مقابلة") || qLower.includes("استشارة") ||
    qLower.includes("contact") || qLower.includes("phone") || qLower.includes("email") ||
    qLower.includes("whatsapp") || qLower.includes("hire") || qLower.includes("meeting")
  ) {
    return {
      reply: lang === "ar"
        ? `يسعد المهندس **محمد الجزار** بالتعاون وتقديم الاستشارات التقنية! يمكنك التواصل معه مباشرة عبر القنوات الرسمية التالية:\n\n• **واتساب وهاتف:** [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink})\n• **البريد الإلكتروني:** [${KNOWLEDGE_BASE.profile.email}](mailto:${KNOWLEDGE_BASE.profile.email})\n• **لينكد إن:** [Mohammed Aljazzar on LinkedIn](${KNOWLEDGE_BASE.profile.linkedin})\n• **حساب GitHub:** [github.com/Mohammed-Aljazzar](${KNOWLEDGE_BASE.profile.github})\n• **معرض Behance:** [behance.net/moh_aljazzar](${KNOWLEDGE_BASE.profile.behance})\n• **حالة التوفر:** ${KNOWLEDGE_BASE.profile.locationAr}، ومتاح دائماً للتعاقد والمشاريع عن بُعد.`
        : `Eng. **Mohammed Aljazzar** welcomes collaborations and consulting inquiries! You can reach him through:\n\n• **WhatsApp & Phone:** [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink})\n• **Email:** [${KNOWLEDGE_BASE.profile.email}](mailto:${KNOWLEDGE_BASE.profile.email})\n• **LinkedIn:** [Mohammed Aljazzar on LinkedIn](${KNOWLEDGE_BASE.profile.linkedin})\n• **GitHub:** [github.com/Mohammed-Aljazzar](${KNOWLEDGE_BASE.profile.github})\n• **Availability:** ${KNOWLEDGE_BASE.profile.locationEn} for global remote contracts.`,
      category: "contact",
      suggestedQuestions: lang === "ar"
        ? ["ما هي خبراته في أودو Odoo؟", "ما هي المشاريع المنجزة؟", "كيف أطلب برنامجاً تدريبياً؟"]
        : ["What is his Odoo expertise?", "What are his notable projects?", "How to book a training program?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 2: ERP, Odoo, Frappe, ERPNext, Business Automation
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("odoo") || qLower.includes("أودو") || qLower.includes("اودو") ||
    qLower.includes("erp") || qLower.includes("frappe") || qLower.includes("فارب") ||
    qLower.includes("فرايب") || qLower.includes("erpnext") || qLower.includes("أتمتة") ||
    qLower.includes("اتمتة") || qLower.includes("انظمة") || qLower.includes("أنظمة") ||
    qLower.includes("doctypes") || qLower.includes("workflow") || qLower.includes("print formats")
  ) {
    return {
      reply: lang === "ar"
        ? `يتمتع المهندس محمد بخبرة هندسية متقدمة تمتد لـ **5 سنوات** في بناء وتخصيص أنظمة الـ ERP وأتمتة مسارات العمل:\n\n1. **شهادة Odoo Certified الرسمية:** حاصل على الاعتماد الرسمي من شركة **Odoo S.A. في بلجيكا**، وخبير في تطوير الموديولات البرمجية المخصصة، وتعديل نماذج الحسابات، المبيعات، المخازن والمشتريات.\n2. **ERPNext & Frappe Framework:** بناء تطبيقات مخصصة من الصفر (Custom DocTypes, Server & Client Scripts, Scheduled Workflows, Advanced Jinja2 Print Formats).\n3. **الأتمتة الشاملة والربط (Integrations):** ربط أنظمة الـ ERP بواجهات APIs خارجية وقواعد بيانات PostgreSQL وMariaDB لتسريع زمن الإنجاز وتفادي الأخطاء البشرية.`
        : `Eng. Mohammed has **5 years** of hands-on expertise in ERP architecture and enterprise workflow automation:\n\n1. **Officially Certified Odoo Developer:** Certified by **Odoo S.A. (Belgium)** with deep competence in custom module architecture, sales, inventory, and accounting synchronization.\n2. **ERPNext & Frappe Framework:** Architecting custom DocTypes, Python server hooks, automated multi-tier workflows, and complex Jinja2 print formats.\n3. **API Integrations:** Connecting ERP engines to third-party portals and relational databases (PostgreSQL & MariaDB).`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["أخبرني عن مشروع Smart Service Management", "ما هي خبراته في الباك إند؟", "كيف يمكنني التواصل معه؟"]
        : ["Tell me about Smart Service Management project", "What is his backend experience?", "How to contact him?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 3: Training, Courses, Workshops, Sadeem, Pidea, Forsa Plus, Siraj, SkillUp
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("تدريب") || qLower.includes("دورة") || qLower.includes("دورات") ||
    qLower.includes("ورشة") || qLower.includes("ورش") || qLower.includes("بيديا") ||
    qLower.includes("سديم") || qLower.includes("فرصة") || qLower.includes("سراج") ||
    qLower.includes("سكيل") || qLower.includes("skillup") || qLower.includes("تدريبية") ||
    qLower.includes("icdl") || qLower.includes("ذكاء اصطناعي") || qLower.includes("سيرة ذاتية") ||
    qLower.includes("ats") || qLower.includes("training") || qLower.includes("workshop") ||
    qLower.includes("course") || qLower.includes("مدرب")
  ) {
    return {
      reply: lang === "ar"
        ? `المهندس **محمد الجزار** مدرب تقني معتمد درب أكثر من **650 متدرباً** وقدم أكثر من **480 ساعة تدريبية** عبر شراكات مع كبرى المؤسسات:\n\n• **أكاديمية بيديا (Pidea Academy):** قدّم 6 أفواج من كورس قيادة الحاسوب الدولي ICDL، 4 دورات في أدوات الذكاء الاصطناعي وتطبيقاته، دورة مهارات العمل الحر الدولي، دورة تصميم تجربة المستخدم UX/UI، دورة التسويق والإعلانات الممولة Meta Ads، وورش تحديد المسار التقني.\n• **مركز سديم للتدريب والتطوير (Sadeem Center):** ورش عمل تفاعلية لبناء وصياغة السيرة الذاتية الاحترافية المتوافقة مع أنظمة الذكاء الاصطناعي (ATS Resume) والتي استفاد منها أكثر من **85 متدرباً**.\n• **مؤسسة فرصة بلس (Forsa Plus):** كورس ICDL، ورش المهارات الحاسوبية المتقدمة، وورش الذكاء الاصطناعي في بيئة العمل.\n• **مركز السراج التعليمي (Al-Siraj):** ورشة عمل متقدمة في صناعة وإنتاج الأفلام السينمائية بالذكاء الاصطناعي (GenAI Filmmaking).\n• **شركة SkillUp:** معسكرات تدريبية لتأهيل المتدربين للمنافسة في أسواق العمل الحر الدولية.`
        : `Eng. **Mohammed Aljazzar** is an accredited technical trainer who has trained over **650+ students** across **480+ training hours**:\n\n• **Pidea Academy:** 6 cohorts of ICDL, 4 cohorts of Generative AI, International Freelancing Skills, UI/UX Design, Meta Ads & Digital Marketing, and Career Path workshops.\n• **Sadeem Training Center:** Specialized ATS Resume Optimization workshops with **85+ graduates**.\n• **Forsa Plus:** ICDL courses and Workplace AI Productivity workshops.\n• **Al-Siraj Center:** AI Cinematic Filmmaking workshop.\n• **SkillUp:** Global freelancing readiness bootcamps.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["هل يمكن تنظيم ورشة عمل لفريقي؟", "كيف أتواصل بخصوص دورة تدريبية؟", "ما هي المهارات التقنية التي يدرب عليها؟"]
        : ["Can I organize a workshop for my team?", "How to contact regarding training?", "What are his main teaching subjects?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 4: Projects & Portfolio Showcase
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("مشاريع") || qLower.includes("مشروع") || qLower.includes("اعمال") ||
    qLower.includes("أعمال") || qLower.includes("معرض") || qLower.includes("projects") ||
    qLower.includes("portfolio") || qLower.includes("smart service") || qLower.includes("بيديا") ||
    qLower.includes("dashboard") || qLower.includes("masar")
  ) {
    return {
      reply: lang === "ar"
        ? `أنجز المهندس محمد أكثر من **18 مشروعاً تقنياً احترافياً**، من أبرزها المعروضة بالموقع:\n\n1. **[Smart Service Management System](/ar/projects/smart-service-management):** نظام متكامل مبني على Frappe وERPNext لإدارة طلبات الصيانة، متابعة اتفاقيات مستوى الخدمة (SLA)، وأتمتة الفواتير.\n2. **[Pidea Integrated Digital Platform](/ar/projects/masar-partner-platform):** منصة رقمية متطورة بـ Next.js وTypeScript تقدم خدمات تدريبية وحلولاً برمجية بدعم كامل للغتين.\n3. **[BI Analytics & Reporting Dashboard](/ar/projects/bi-dashboard-reporting):** لوحة تحكم تفاعلية متقدمة بـ React لتحليل البيانات ومؤشرات الأداء المالي والتشغيلي.\n4. **Real Estate ERP System:** نظام لإدارة العقارات والمستأجرين مبني على Odoo مع تنبيهات السداد والربط المحاسبي.\n\nيمكنك زيارة صفحة [المشاريع الكاملة](/ar/projects) للاطلاع على التفاصيل المعمارية وروابط الكود.`
        : `Eng. Mohammed has delivered over **18+ production-ready projects**, featured on the site:\n\n1. **[Smart Service Management System](/en/projects/smart-service-management):** Custom Frappe/ERPNext app for field tickets and automated SLA billing.\n2. **[Pidea Integrated Platform](/en/projects/masar-partner-platform):** Modern Next.js & TypeScript multi-lingual platform for digital services.\n3. **[BI Analytics Dashboard](/en/projects/bi-dashboard-reporting):** Real-time operational intelligence dashboard with interactive charts.\n4. **Real Estate ERP:** End-to-end Odoo customization for properties and lease management.\n\nExplore them all on the [Projects page](/en/projects).`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي تفاصيل نظام Smart Service Management؟", "كيف يمكنني طلب مشروع؟", "طرق التواصل السريع"]
        : ["Details on Smart Service Management?", "How to request a new project?", "Contact options"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 5: Technical Skills, Stack, Python, Django, React, Next, Figma
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("مهارات") || qLower.includes("تقنيات") || qLower.includes("تكنولوجيا") ||
    qLower.includes("بايثون") || qLower.includes("python") || qLower.includes("django") ||
    qLower.includes("react") || qLower.includes("next") || qLower.includes("figma") ||
    qLower.includes("ux") || qLower.includes("ui") || qLower.includes("فرونت") ||
    qLower.includes("باك") || qLower.includes("skills") || qLower.includes("stack") ||
    qLower.includes("typescript") || qLower.includes("tailwind") || qLower.includes("docker")
  ) {
    return {
      reply: lang === "ar"
        ? `يجمع المهندس محمد بين أربعة مسارات تقنية متكاملة (Full-Stack Engineering & Design):\n\n1. **أنظمة ERP:** Odoo (معتمد رسمياً)، ERPNext، Frappe Framework، تخصيص DocTypes، وWorkflows.\n2. **الباك إند (Backend):** Python، Django، Django REST Framework، قواعد بيانات PostgreSQL وMariaDB، Redis، Docker، Linux وNginx.\n3. **الفرونت إند (Frontend):** React.js، Next.js (App Router)، TypeScript، Tailwind CSS، ودعم ثنائي الاتجاه فائق السلاسة للعربية والإنجليزية (RTL/LTR).\n4. **تصميم واجهات وتجربة المستخدم (UI/UX):** Figma، أبحاث المستخدمين، Wireframing، النماذج التفاعلية (Prototypes)، وتأسيس أنظمة التصميم (Design Systems).`
        : `Eng. Mohammed brings together a complete Full-Stack & UI/UX engineering skillset:\n\n1. **ERP Systems:** Certified Odoo Developer, Frappe Framework, ERPNext customization.\n2. **Backend Engineering:** Python, Django, DRF, PostgreSQL, MariaDB, Redis, Docker, Linux/Nginx.\n3. **Frontend Engineering:** React.js, Next.js, TypeScript, Tailwind CSS, Bi-directional RTL/LTR.\n4. **UI/UX Design:** Figma, Interactive Prototyping, User Research, and Enterprise Design Systems.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي أبرز مشاريعه؟", "كيف أحمل سيرته الذاتية (CV)؟", "أرقام التواصل والواتساب"]
        : ["What are his top projects?", "How to download his CV?", "Contact & WhatsApp info"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 6: CV / Resume Download
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("cv") || qLower.includes("سيرة") || qLower.includes("سيرة ذاتية") ||
    qLower.includes("resume") || qLower.includes("تحميل") || qLower.includes("ملف")
  ) {
    return {
      reply: lang === "ar"
        ? `يمكنك تحميل السيرة الذاتية الرسمية والمحدثة للمهندس **محمد الجزار** بصيغة PDF مباشرة:\n\n• **[تحميل السيرة الذاتية (باللغة العربية) - PDF](${KNOWLEDGE_BASE.profile.cvUrlAr})**\n• **[Download Resume (English Version) - PDF](${KNOWLEDGE_BASE.profile.cvUrlEn})**\n\nكما يمكنك مراجعة ملخص المسار المهني والشهادات عبر صفحة [عن المهندس](/ar/about).`
        : `You can directly download the updated resume of Eng. **Mohammed Aljazzar** in PDF format:\n\n• **[Download Resume (English) - PDF](${KNOWLEDGE_BASE.profile.cvUrlEn})**\n• **[Download Resume (Arabic) - PDF](${KNOWLEDGE_BASE.profile.cvUrlAr})**\n\nYou can also explore the complete biography on the [About page](/en/about).`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي أهم خبراته؟", "ما هي شهاداته المعتمدة؟", "كيف يمكنني التواصل معه؟"]
        : ["What is his main experience?", "What certifications does he hold?", "How to schedule a call?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // INTENT 7: Who is Mohammed? / Bio / About
  // ─────────────────────────────────────────────────────────────
  if (
    qLower.includes("من انت") || qLower.includes("من هو") || qLower.includes("نبذة") ||
    qLower.includes("عرفني") || qLower.includes("محمد") || qLower.includes("الجزار") ||
    qLower.includes("who is") || qLower.includes("about") || qLower.includes("أخبرني عن")
  ) {
    return {
      reply: lang === "ar"
        ? `**محمد الجزار** هو مهندس برمجيات Full-Stack ومطور أنظمة ERP معتمد رسمياً من شركة Odoo S.A. العالمية، ومصمم واجهات وتجربة مستخدم UI/UX، ومدرب تقني بخبرة **5 سنوات**:\n\n• متخصص في بناء وتطوير أنظمة الأعمال المؤتمتة باستخدام Odoo وERPNext وFrappe.\n• مهندس Full-Stack متمكن بـ Python/Django في الباك إند وNext.js/React/TypeScript في الفرونت إند.\n• مصمم واجهات عبر Figma مع تأسيس Design Systems متكاملة.\n• درّب أكثر من 650 متدرباً وقدم 28 ورشة و14 برنامجاً تخصصياً في بيديا، سديم، فرصة بلس، والسراج.\n• مقيم في غزة، فلسطين ومتاح للمشاريع والتعاقدات عن بُعد حول العالم.`
        : `**Mohammed Aljazzar** is a Full-Stack Software Engineer, Officially Certified Odoo Developer, UI/UX Designer, and Technical Trainer with **5 years** of industry experience:\n\n• Specialized in enterprise business automation with Odoo and Frappe/ERPNext.\n• Full-Stack developer proficient in Python/Django backend and Next.js/React frontend.\n• UI/UX Designer building design systems with Figma.\n• Trained 650+ professionals across Pidea, Sadeem Center, Forsa Plus, and Al-Siraj.\n• Based in Gaza, Palestine and available for remote contracts worldwide.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي حلول الـ ERP التي يقدمها؟", "ما هي أبرز مشاريعه؟", "طرق التواصل والواتساب"]
        : ["What ERP solutions does he offer?", "What are his top projects?", "Contact info"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT / FALLBACK RESPONSE
  // ─────────────────────────────────────────────────────────────
  return {
    reply: lang === "ar"
      ? `أهلاً بك! أنا **المساعد الذكي** لموقع المهندس **محمد الجزار**. يمكنني تزويدك بكافة المعلومات الدقيقة عن:\n\n1. **أنظمة ERP:** تطوير وتخصيص Odoo (معتمد رسمياً) وERPNext / Frappe.\n2. **تطوير الويب:** مشاريع وتطبيقات Full-Stack بـ Python/Django وNext.js/TypeScript.\n3. **تصميم UI/UX:** بناء تجارب الاستخدام والأنظمة البصرية بـ Figma.\n4. **التدريب والورش:** دورات ICDL، الذكاء الاصطناعي، العمل الحر، وورشة الـ ATS بمركز سديم وبيديا.\n5. **التواصل والتعاقد:** هاتف وواتساب [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink}).`
      : `Welcome! I am the **AI Portfolio Assistant** for Eng. **Mohammed Aljazzar**. I can assist you with:\n\n1. **ERP Engineering:** Certified Odoo development and Frappe / ERPNext workflows.\n2. **Web Development:** Full-Stack web apps with Python, Django, React, and Next.js.\n3. **UI/UX Design:** User research and interactive prototyping in Figma.\n4. **Technical Training:** Workshops and bootcamps at Pidea, Sadeem Center, Forsa Plus, etc.\n5. **Direct Contact:** WhatsApp & phone at [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink}).`,
    category: "fallback",
    suggestedQuestions: lang === "ar"
      ? ["ما هي خبراته في أودو Odoo؟", "ما هي الورش التي قدمها في مركز سديم وبيديا؟", "كيف يمكنني التواصل مع المهندس؟"]
      : ["What is his Odoo experience?", "What workshops did he lead?", "How can I contact Mohammed?"]
  };
}

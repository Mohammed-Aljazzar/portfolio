/**
 * Knowledge Base & Security Guardrails for Mohammed Aljazzar Portfolio AI Assistant
 * 
 * Strict Privacy & Security Protections:
 * 1. Blocks disclosure of API keys, tokens, server credentials, passwords, or .env files.
 * 2. Blocks disclosure or direct access to private internal routes like /ssh or administrative panels.
 * 3. Blocks prompt injections, role exploits ("ignore instructions", "jailbreak", "DAN mode").
 * 4. Courteously deflects abusive words, vulgarity, insults, or inappropriate queries.
 * 5. Accurately synthesizes factual information about Mohammed Aljazzar based on site data.
 */

export interface AssistantAnswer {
  reply: string;
  category: "knowledge" | "contact" | "guardrail_security" | "guardrail_abuse" | "fallback";
  suggestedQuestions?: string[];
}

// 1. Abuse & Inappropriate Query Guardrails (Arabic & English)
const ABUSIVE_PATTERNS = [
  /سب/i, /شتيم/i, /قذر/i, /سافل/i, /حيوان/i, /كلب/i, /حمار/i, /غبي/i, /احمق/i, /أحمق/i,
  /لعن/i, /يلعن/i, /تبا/i, /تبّاً/i, /سخيف/i, /تافه/i, /وسخ/i, /ابن ال/i, /يا ابن/i,
  /\bfuck\b/i, /\bshit\b/i, /\bidiot\b/i, /\bstupid\b/i, /\bbitch\b/i, /\basshole\b/i,
  /\bdamn\b/i, /\bbullshit\b/i, /\bcrap\b/i, /\bmoron\b/i
];

// 2. Sensitive Security & Prompt Injection Guardrails
const SENSITIVE_SECURITY_PATTERNS = [
  /api[_\s-]?key/i,
  /secret/i,
  /password/i,
  /كلمة\s*(السر|المرور)/i,
  /باسورد/i,
  /رمز\s*السري/i,
  /env/i,
  /\.env/i,
  /database_url/i,
  /قاعدة\s*البيانات/i,
  /credentials/i,
  /token/i,
  /private\s*key/i,
  /مفتاح\s*خاص/i,
  /ssh/i,
  /لوحة\s*التحكم/i,
  /لوحة\s*الادمن/i,
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
  /التعليمات\s*السرية/i,
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /تجاهل\s+(كل\s+)?التعليمات/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /من\s+أين\s+تدخل\s+للادمن/i
];

export const KNOWLEDGE_BASE = {
  profile: {
    nameAr: "محمد الجزار",
    nameEn: "Mohammed Aljazzar",
    titleAr: "مهندس برمجيات Full-Stack ومطور أنظمة ERP ومصمم UI/UX ومدرب تقني",
    titleEn: "Full-Stack Software Engineer, ERP Developer, UI/UX Designer & Tech Trainer",
    experienceYears: 5,
    location: "غزة، فلسطين (متاح للعمل والتعاقد عن بُعد عالمياً)",
    phone: "+970 59 804 8284",
    email: "m.i.aljazzar19@gmail.com",
    whatsappLink: "https://wa.me/970598048284",
    linkedin: "https://www.linkedin.com/in/mohammed-aljazzar/",
    github: "https://github.com/Mohammed-Aljazzar",
    behance: "https://behance.net/moh_aljazzar",
    cvUrlAr: "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf",
    cvUrlEn: "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf",
    bio: "مهندس برمجيات بخبرة 5 سنوات، حاصل على شهادة Odoo Certified الرسمية من شركة Odoo S.A. العالمية، وخبير بأنظمة ERPNext وFrappe Framework. مطور Full-Stack متمكن في Python & Django وReact/Next.js وTypeScript، ومصمم واجهات UI/UX عبر Figma، بالإضافة لكونه مدرباً تقنياً معتمداً درب أكثر من 650 متدرباً وقدم ما يزيد عن 28 ورشة عمل و14 برنامجاً تخصصياً."
  },
  pillars: [
    {
      name: "أنظمة ERP وأتمتة الأعمال (ERP & Automation)",
      details: "تطوير وتخصيص أنظمة Odoo وERPNext وFrappe Framework، بناء موديولات مخصصة، ضبط مسارات العمل المؤتمتة (Workflows)، نماذج الطباعة المتقدمة (Print Formats)، وضبط صلاحيات المستخدمين."
    },
    {
      name: "تطوير الباك إند والواجهات البرمجية (Backend & APIs)",
      details: "بناء واجهات RESTful APIs عالية الأداء بـ Python وDjango وDjango REST Framework، هندسة قواعد البيانات (PostgreSQL, MariaDB, MySQL)، وتكامل Redis وDocker وNginx."
    },
    {
      name: "تطوير الفرونت إند وتطبيقات الويب (Frontend Web Apps)",
      details: "تطوير واجهات عصرية تفاعلية وسريعة بـ React.js وNext.js وTypeScript وTailwind CSS مع دعم ثنائي الاتجاه فائق السلاسة للعربية (RTL) والإنجليزية (LTR)."
    },
    {
      name: "تصميم واجهات وتجربة المستخدم (UI/UX)",
      details: "تحويل متطلبات العمل المعقدة إلى واجهات سهلة وبديهية عبر أدوات Figma، إجراء أبحاث المستخدمين، بناء النماذج التفاعلية (Prototypes)، وتأسيس أنظمة التصميم (Design Systems)."
    }
  ],
  trainingPartners: [
    {
      name: "أكاديمية بيديا للحلول الرقمية والتدريب (Pidea Academy)",
      programs: "دورات ICDL (6 أفواج)، دورات الذكاء الاصطناعي وتطبيقاته (4 مرات)، دورة مهارات العمل الحر (Freelancing)، دورة تصميم تجربة المستخدم UX/UI، دورة التسويق الرقمي والإعلانات الممولة Meta Ads، ورشات تحديد المسار التقني ومسار Front-End، وورشة بناء السيرة الذاتية الاحترافية ATS."
    },
    {
      name: "مركز سديم للتدريب والتطوير (Sadeem Center)",
      programs: "ورش العمل التفاعلية لبناء السيرة الذاتية الاحترافية المقروءة بأنظمة الذكاء الاصطناعي (ATS Resume) والتي استفاد منها أكثر من 85 متدرباً ومتدربة."
    },
    {
      name: "مؤسسة فرصة بلس (Forsa Plus)",
      programs: "كورس قيادة الحاسوب الدولي ICDL، ورشة المهارات الحاسوبية المتقدمة لبيئة العمل، ورشة الذكاء الاصطناعي واستخداماته العملية في الإنتاجية."
    },
    {
      name: "مركز السراج التعليمي (Al-Siraj)",
      programs: "ورشة عمل متقدمة في صناعة وإنتاج الأفلام السينمائية والمحتوى المرئي باستخدام تقنيات الذكاء الاصطناعي التوليدي (GenAI Filmmaking)."
    },
    {
      name: "شركة سكيل اب (SkillUp)",
      programs: "معسكرات ومسارات متقدمة في مهارات العمل الحر، وتأهيل المطورين للأسواق الإقليمية والدولية."
    }
  ],
  notableProjects: [
    {
      name: "نظام إدارة الخدمات الذكي (Smart Service Management System)",
      tech: "Frappe Framework, ERPNext, Python, MariaDB",
      desc: "نظام لإدارة طلبات الخدمات الهندسية ومراقبة الالتزام باتفاقيات SLA وأتمتة الفواتير وربطها بالمحاسبة."
    },
    {
      name: "منصة شركة بيديا الرقمية (Pidea Digital Platform)",
      tech: "Next.js, TypeScript, Tailwind CSS, Python",
      desc: "منصة ويب متكاملة ثنائية اللغة لإدارة البرامج التدريبية والخدمات الرقمية وحلول تكنولوجيا المعلومات."
    },
    {
      name: "نظام إدارة العقارات والمستأجرين (Real Estate ERP)",
      tech: "Odoo, Python, PostgreSQL",
      desc: "تخصيص شامل لنظام أودو لإدارة العقارات، عقود الإيجار، وتنبيهات السداد التلقائية مع الربط المالي."
    },
    {
      name: "لوحة تحليلات الأعمال ومؤشرات الأداء (BI Dashboard)",
      tech: "React, Python, Django, Chart.js",
      desc: "منصة تفاعلية لقياس مؤشرات الأداء المالي والتشغيلي وتحليل بيانات المبيعات."
    }
  ]
};

/**
 * Main AI Query Processing with security & abuse filter
 */
export function queryKnowledgeBase(input: string, lang: "ar" | "en" = "ar"): AssistantAnswer {
  const query = (input || "").trim();

  if (!query) {
    return {
      reply: lang === "ar"
        ? "أهلاً بك! كيف يمكنني مساعدتك اليوم بخصوص خبرات المهندس محمد الجزار، خدمات الـ ERP، أو برامجه التدريبية؟"
        : "Welcome! How can I assist you regarding Eng. Mohammed Aljazzar's ERP expertise, software projects, or technical training?",
      category: "fallback"
    };
  }

  // Check 1: Guard against abusive and inappropriate queries
  for (const pattern of ABUSIVE_PATTERNS) {
    if (pattern.test(query)) {
      return {
        reply: lang === "ar"
          ? "مرحباً بك، يسعدني الترحيب بك والإجابة على أي استفسارات تقنية أو مهنية تتعلق بخدمات المهندس محمد الجزار في إطار الاحترام والمهنية المتبادلة. أتمنى لك يوماً طيباً!"
          : "Hello, I am glad to assist you with professional inquiries regarding Eng. Mohammed Aljazzar's technical services within a courteous and respectful manner. Have a great day!",
        category: "guardrail_abuse"
      };
    }
  }

  // Check 2: Guard against sensitive platform information & injection attempts
  for (const pattern of SENSITIVE_SECURITY_PATTERNS) {
    if (pattern.test(query)) {
      return {
        reply: lang === "ar"
          ? "أعتذر منك، بصفتي المساعد الذكي لموقع المهندس محمد الجزار، فإنني ألتزم بأعلى معايير الأمان والسرية الرقمية. لا يمكنني مناقشة أو تقديم أية تفاصيل أمنية، مفاتيح برمجية، بيانات اتصال داخلية، أو لوحات تحكم. إذا كان لديك استفسار مهني أو ترغب في بدء مشروع، يمكنك التواصل مباشرة عبر واتساب أو البريد."
          : "I apologize, as the AI Assistant for Eng. Mohammed Aljazzar's portfolio, I strictly adhere to high security and privacy standards. I cannot share internal credentials, API keys, or administrative details. For professional collaborations, please reach out directly via WhatsApp or email.",
        category: "guardrail_security",
        suggestedQuestions: lang === "ar"
          ? ["كيف يمكنني التواصل مع المهندس؟", "ما هي خدمات ERP المتاحة؟", "ما هي خبراته البرمجية؟"]
          : ["How can I contact Mohammed?", "What ERP services are available?", "What are his main tech skills?"]
      };
    }
  }

  const qLower = query.toLowerCase();

  // Intent 1: Contact, Phone, WhatsApp, Email, Hire, Meeting
  if (
    qLower.includes("تواصل") || qLower.includes("اتصال") || qLower.includes("رقم") ||
    qLower.includes("هاتف") || qLower.includes("واتس") || qLower.includes("ايميل") ||
    qLower.includes("بريد") || qLower.includes("توظيف") || qLower.includes("تعاقد") ||
    qLower.includes("contact") || qLower.includes("phone") || qLower.includes("email") ||
    qLower.includes("whatsapp") || qLower.includes("hire")
  ) {
    return {
      reply: lang === "ar"
        ? `يسعد المهندس محمد الجزار بالتعاون معك! يمكنك التواصل معه مباشرة عبر القنوات التالية:\n\n• **واتساب وهاتف:** [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink})\n• **البريد الإلكتروني:** [${KNOWLEDGE_BASE.profile.email}](mailto:${KNOWLEDGE_BASE.profile.email})\n• **لينكد إن:** [Mohammed Aljazzar on LinkedIn](${KNOWLEDGE_BASE.profile.linkedin})\n• **حالة العمل:** ${KNOWLEDGE_BASE.profile.location} ومتاح حالياً لاستلام مشاريع جديدة.`
        : `Eng. Mohammed Aljazzar welcomes collaborations! You can contact him via:\n\n• **WhatsApp & Phone:** [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink})\n• **Email:** [${KNOWLEDGE_BASE.profile.email}](mailto:${KNOWLEDGE_BASE.profile.email})\n• **LinkedIn:** [Mohammed Aljazzar on LinkedIn](${KNOWLEDGE_BASE.profile.linkedin})\n• **Status:** Available for remote consulting and projects worldwide.`,
      category: "contact",
      suggestedQuestions: lang === "ar"
        ? ["ما هي خبراته في أودو Odoo؟", "ما هي المشاريع المنجزة؟", "كيف أطلب برنامجاً تدريبياً؟"]
        : ["What is his Odoo expertise?", "What are his notable projects?", "How to book a training program?"]
    };
  }

  // Intent 2: ERP, Odoo, Frappe, ERPNext, Automation
  if (
    qLower.includes("odoo") || qLower.includes("أودو") || qLower.includes("اودو") ||
    qLower.includes("erp") || qLower.includes("frappe") || qLower.includes("فارب") ||
    qLower.includes("فرايب") || qLower.includes("erpnext") || qLower.includes("أتمتة") ||
    qLower.includes("اتمتة") || qLower.includes("انظمة") || qLower.includes("أنظمة")
  ) {
    return {
      reply: lang === "ar"
        ? `يتمتع المهندس محمد بخبرة معمقة تمتد لـ 5 سنوات في أنظمة الـ ERP وأتمتة العمليات:\n\n1. **Odoo Certified:** حاصل على شهادة رسمية معتمدة من شركة Odoo S.A. في بلجيكا، وخبير في تطوير وتخصيص موديولات أودو وإدارة المبيعات، المحاسبة، والمستودعات.\n2. **ERPNext & Frappe:** بناء حلول وتطبيقات متكاملة مخصصة (Custom DocTypes, Server Scripts, Custom Workflows, Advanced Print Formats).\n3. **الأتمتة والربط:** ربط أنظمة الـ ERP بالبوابات الخارجية وواجهات APIs وقواعد بيانات PostgreSQL وMariaDB لتسريع العمليات وتفادي الأخطاء اليدوية.`
        : `Eng. Mohammed has 5 years of specialized expertise in ERP architecture and workflow automation:\n\n1. **Certified Odoo Expert:** Officially certified by Odoo S.A. (Belgium) with hands-on mastery in building custom modules, business workflows, and accounting/inventory synchronization.\n2. **ERPNext & Frappe Specialist:** Architecting custom DocTypes, server scripts, automated workflows, and complex Jinja2 print formats.\n3. **Integration:** Seamlessly connecting ERP databases (PostgreSQL/MariaDB) to external third-party APIs and frontend portals.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["أخبرني عن مشروع Smart Service Management", "ما هي شهاداته التقنية؟", "كيف يمكنني التواصل معه؟"]
        : ["Tell me about Smart Service Management project", "What are his certifications?", "How to get in touch?"]
    };
  }

  // Intent 3: Training, Courses, Workshops, Pidea, Sadeem, Forsa Plus, Siraj, ICDL, AI
  if (
    qLower.includes("تدريب") || qLower.includes("دورة") || qLower.includes("دورات") ||
    qLower.includes("ورشة") || qLower.includes("ورش") || qLower.includes("بيديا") ||
    qLower.includes("سديم") || qLower.includes("فرصة") || qLower.includes("سراج") ||
    qLower.includes("تدريبية") || qLower.includes("icdl") || qLower.includes("ذكاء اصطناعي") ||
    qLower.includes("سيرة ذاتية") || qLower.includes("ats") || qLower.includes("training") ||
    qLower.includes("workshop") || qLower.includes("course")
  ) {
    return {
      reply: lang === "ar"
        ? `المهندس محمد الجزار مدرب تقني معتمد درب أكثر من 650 متدرباً وقدم أكثر من 480 ساعة تدريبية:\n\n• **أكاديمية بيديا (Pidea):** قدّم 6 أفواج من كورس قيادة الحاسوب الدولي ICDL، 4 دورات في أدوات وتطبيقات الذكاء الاصطناعي، دورة مهارات العمل الحر، دورة تصميم تجربة المستخدم UX/UI، دورة التسويق والإعلانات الممولة Meta Ads، وورش تحديد المسار التقني وبناء الـ CV.\n• **مركز سديم للتدريب والتطوير (Sadeem Center):** ورش عمل متخصصة في صناعة السيرة الذاتية الاحترافية المتوافقة مع أنظمة الـ ATS واستفاد منها أكثر من 85 متدرباً.\n• **مؤسسة فرصة بلس (Forsa Plus):** كورس ICDL، ورش مهارات الحاسوب المتقدمة، وورش الذكاء الاصطناعي في بيئة العمل.\n• **مركز السراج (Al-Siraj):** ورشة عمل متقدمة في صناعة وإنتاج الأفلام السينمائية بالذكاء الاصطناعي.\n• **شركة SkillUp:** مسارات ومعسكرات تأهيل المتدربين للعمل الحر الدولي.`
        : `Eng. Mohammed is an accomplished technical trainer who has trained over 650+ students across 480+ training hours:\n\n• **Pidea Academy:** Conducted 6 cohorts of ICDL, 4 cohorts of Generative AI, Freelancing Skills, UI/UX Design, Meta Ads & Digital Marketing, and ATS Resume workshops.\n• **Sadeem Center:** Specialized ATS Resume Optimization workshops with 85+ graduates.\n• **Forsa Plus:** ICDL courses and AI Productivity workshops.\n• **Al-Siraj Center:** AI Cinematic Filmmaking workshops.\n• **SkillUp:** Global freelancing readiness bootcamps.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["هل يمكن حجز ورشة عمل لفريقي؟", "كيف أتواصل بخصوص برنامج تدريبي؟", "ما هي المهارات التقنية التي يدرب عليها؟"]
        : ["Can I book a training workshop for my team?", "How to contact about training?", "What are his core teaching subjects?"]
    };
  }

  // Intent 4: Skills, Tech Stack, Python, Django, React, Next.js, Figma, UI/UX
  if (
    qLower.includes("مهارات") || qLower.includes("تقنيات") || qLower.includes("تكنولوجيا") ||
    qLower.includes("بايثون") || qLower.includes("python") || qLower.includes("django") ||
    qLower.includes("react") || qLower.includes("next") || qLower.includes("figma") ||
    qLower.includes("ux") || qLower.includes("ui") || qLower.includes("فرونت") ||
    qLower.includes("باك") || qLower.includes("skills") || qLower.includes("stack")
  ) {
    return {
      reply: lang === "ar"
        ? `يمتلك المهندس محمد مزيجاً تقنياً متكاملاً (Full-Stack Engineering & Design):\n\n1. **الأنظمة الإدارية:** Odoo (Certified), ERPNext, Frappe Framework, Custom DocTypes & Workflows.\n2. **الباك إند (Backend):** Python, Django, Django REST Framework, PostgreSQL, MariaDB, Redis, Docker, Linux.\n3. **الفرونت إند (Frontend):** React.js, Next.js (App Router), TypeScript, Tailwind CSS, دعم RTL/LTR الاحترافي.\n4. **تصميم الواجهات (UI/UX):** Figma, Wireframing, High-Fidelity Prototyping, Design Systems وأبحاث المستخدمين.`
        : `Eng. Mohammed possesses a comprehensive Full-Stack & UI/UX skillset:\n\n1. **ERP & Enterprise:** Certified Odoo Developer, Frappe Framework, ERPNext customization.\n2. **Backend Engineering:** Python, Django, DRF, PostgreSQL, MariaDB, Redis, Docker, Linux/Nginx.\n3. **Frontend Engineering:** React.js, Next.js, TypeScript, Tailwind CSS, Bi-directional RTL/LTR.\n4. **UI/UX Design:** Figma, Interactive Prototyping, User Experience Research, and Enterprise Design Systems.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي أبرز المشاريع التي نفذها؟", "كيف يمكنني تحميل سيرته الذاتية (CV)؟", "طرق التواصل السريع"]
        : ["What are his major projects?", "How can I download his CV?", "Quick contact options"]
    };
  }

  // Intent 5: Projects & Portfolio
  if (
    qLower.includes("مشاريع") || qLower.includes("مشروع") || qLower.includes("اعمال") ||
    qLower.includes("أعمال") || qLower.includes("معرض") || qLower.includes("سيرفر") ||
    qLower.includes("projects") || qLower.includes("portfolio") || qLower.includes("smart service")
  ) {
    return {
      reply: lang === "ar"
        ? `أنجز المهندس محمد أكثر من 18 مشروعاً تقنياً احترافياً، من أبرزها:\n\n1. **Smart Service Management System:** تطبيق Frappe متكامل لإدارة الخدمات التخصصية، ومتابعة تذاكر الـ SLA، وأتمتة الفواتير.\n2. **Pidea Integrated Platform:** منصة رقمية متطورة بـ Next.js وTypeScript تقدم خدمات تدريبية وحلولاً برمجية.\n3. **Real Estate ERP System:** نظام عقاري متكامل مبني على Odoo لإدارة العقود والإيجارات والتنبيهات التلقائية.\n4. **BI & Analytics Dashboard:** لوحة تحكم تفاعلية متطورة لتحليل بيانات الأعمال ومؤشرات الأداء.\n\nيمكنك زيارة صفحة [المشاريع](/ar/projects) للاطلاع على التفاصيل والمعمارية التقنية لكل مشروع.`
        : `Eng. Mohammed has delivered over 18+ enterprise-grade projects, including:\n\n1. **Smart Service Management System:** Custom Frappe application for SLA ticket lifecycle and billing automation.\n2. **Pidea Integrated Platform:** Next.js & TypeScript multi-lingual platform for digital services and training.\n3. **Real Estate ERP:** Tailored Odoo system for property, leasing, and automated contract workflows.\n4. **BI Analytics Dashboard:** Real-time business intelligence dashboard with custom financial KPI charts.\n\nExplore them in detail on the [Projects page](/en/projects).`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي تفاصيل نظام Smart Service Management؟", "كيف يتم طلب مشروع جديد؟", "أرقام التواصل"]
        : ["Details on Smart Service Management?", "How to start a new project?", "Contact details"]
    };
  }

  // Intent 6: CV / Resume
  if (
    qLower.includes("cv") || qLower.includes("سيرة") || qLower.includes("سيرة ذاتية") ||
    qLower.includes("resume") || qLower.includes("تحميل") || qLower.includes("ملف")
  ) {
    return {
      reply: lang === "ar"
        ? `يمكنك تحميل السيرة الذاتية الرسمية والمحدثة للمهندس محمد الجزار مباشرة:\n\n• **[تحميل السيرة الذاتية (عربي) - PDF](${KNOWLEDGE_BASE.profile.cvUrlAr || "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"})**\n• **[Download Resume (English) - PDF](${KNOWLEDGE_BASE.profile.cvUrlEn || "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"})**\n\nأو يمكنك تصفح ملخص الخبرات المباشر عبر صفحة [عن المهندس](/ar/about).`
        : `You can directly download the updated resume of Eng. Mohammed Aljazzar:\n\n• **[Download Resume (English) - PDF](${KNOWLEDGE_BASE.profile.cvUrlEn || "/assets/cv/Mohammed_Aljazzar_CV_EN.pdf"})**\n• **[Download Resume (Arabic) - PDF](${KNOWLEDGE_BASE.profile.cvUrlAr || "/assets/cv/Mohammed_Aljazzar_CV_AR.pdf"})**\n\nFeel free also to explore the full background on the [About page](/en/about).`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي أهم خبراته؟", "ما هي شهاداته المعتمدة؟", "كيف يمكنني مقابلته أو مراسلته؟"]
        : ["What is his main experience?", "What certifications does he hold?", "How to schedule a call?"]
    };
  }

  // Intent 7: About / Bio / Who is Mohammed?
  if (
    qLower.includes("من انت") || qLower.includes("من هو") || qLower.includes("نبذة") ||
    qLower.includes("عرفني") || qLower.includes("محمد") || qLower.includes("الجزار") ||
    qLower.includes("who is") || qLower.includes("about")
  ) {
    return {
      reply: lang === "ar"
        ? `**محمد الجزار** هو مهندس برمجيات Full-Stack، ومطور أنظمة ERP معتمد من شركة Odoo العالمية، ومصمم واجهات UI/UX، ومدرب تقني.\n\n• خبرة 5 سنوات في بناء وتخصيص أنظمة المؤسسات والأعمال بـ Odoo وERPNext.\n• مطور متمكن في Python/Django وNext.js/React.\n• درب أكثر من 650 متدرباً في مؤسسات رائدة مثل أكاديمية بيديا، مركز سديم، مؤسسة فرصة بلس، مركز السراج، وSkillUp.\n• مقيم في غزة، فلسطين ومتاح دائماً للمشاريع والتعاقدات عن بُعد عالمياً.`
        : `**Mohammed Aljazzar** is a Full-Stack Software Engineer, Officially Certified Odoo ERP Developer, UI/UX Designer, and Technical Trainer with 5 years of industry experience.\n\n• Certified by Odoo S.A. and specialized in Frappe/ERPNext business systems.\n• Advanced engineering background in Python/Django & Next.js/React.\n• Trained 650+ learners across organizations including Pidea Academy, Sadeem Center, Forsa Plus, Al-Siraj Center, and SkillUp.\n• Based in Gaza, Palestine and available for global remote engineering contracts.`,
      category: "knowledge",
      suggestedQuestions: lang === "ar"
        ? ["ما هي حلول الـ ERP التي يقدمها؟", "ما هي أبرز مشاريعه؟", "أرقام التواصل والواتساب"]
        : ["What ERP solutions does he offer?", "What are his top projects?", "Contact & WhatsApp info"]
    };
  }

  // Default Fallback
  return {
    reply: lang === "ar"
      ? `أهلاً بك! أنا المساعد الذكي لموقع المهندس محمد الجزار. يمكنني مساعدتك في الإجابة على أي استفسار يتعلق بـ:\n\n1. **أنظمة ERP:** استشارات وتطوير Odoo (معتمد) وFrappe / ERPNext.\n2. **تطوير الويب:** مشاريع Full-Stack بـ Python & Django وNext.js & React.\n3. **تصميم UI/UX:** بناء أنظمة التصميم وتجارب المستخدم عبر Figma.\n4. **التدريب التقني:** ورش العمل والدورات التخصصية (أكاديمية بيديا، مركز سديم، فرصة بلس، السراج).\n5. **التواصل المباشر والتعاقد:** هاتف وواتساب [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink}).`
      : `Welcome! I am the AI Portfolio Assistant for Eng. Mohammed Aljazzar. I can answer questions about:\n\n1. **ERP Engineering:** Certified Odoo development and Frappe / ERPNext automation.\n2. **Web Development:** Full-Stack projects with Python, Django, React, and Next.js.\n3. **UI/UX Design:** User research and interactive prototyping in Figma.\n4. **Technical Training:** Workshops and bootcamps at Pidea, Sadeem Center, Forsa Plus, etc.\n5. **Direct Contact:** WhatsApp & phone at [${KNOWLEDGE_BASE.profile.phone}](${KNOWLEDGE_BASE.profile.whatsappLink}).`,
    category: "fallback",
    suggestedQuestions: lang === "ar"
      ? ["ما هي خبراته في أودو Odoo؟", "ما هي الورش التي قدمها في مركز سديم وبيديا؟", "كيف يمكنني التواصل مع المهندس؟"]
      : ["What is his Odoo experience?", "What workshops did he lead?", "How can I contact Mohammed?"]
  };
}

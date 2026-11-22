import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { FloatingActions } from "@/components/common/FloatingActions";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammed-aljazzar.vercel.app"),
  title: "محمد الجزار | Mohammed Aljazzar — Software Engineer & ERP Specialist",
  description: "الموقع الشخصي ومعرض الأعمال للمهندس محمد الجزار — مهندس برمجيات Full-Stack ومطور أنظمة ERP (Odoo & ERPNext) ومصمم UI/UX ومدرب تقني.",
  keywords: [
    "Mohammed Aljazzar", "محمد الجزار", "ERP Developer", "Odoo Certified",
    "ERPNext", "Frappe Framework", "Full Stack Developer", "Python", "Django",
    "React", "Next.js", "UI/UX Designer", "Figma", "Technical Trainer",
  ],
  authors: [{ name: "Mohammed Aljazzar" }],
  openGraph: {
    title: "محمد الجزار | Mohammed Aljazzar — Portfolio & Systems Showcase",
    description: "مهندس برمجيات Full-Stack ومطور أنظمة ERP (Odoo & ERPNext) ومصمم UI/UX ومدرب تقني.",
    images: ["/assets/images/mohammed-aljazzar.jpg"],
    type: "website",
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0B1120] dark:text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
        <LanguageProvider>
          <ThemeProvider>
            <ScrollProgressBar />
            <Navbar />
            <main className="flex-1 pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <FloatingActions />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Language } from "@/lib/types";
import { translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.ar;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const getLangFromPath = (path: string | null): Language => {
    if (!path) return "ar";
    if (path.startsWith("/en/") || path === "/en") return "en";
    if (path.startsWith("/ar/") || path === "/ar") return "ar";
    return "ar";
  };

  const [language, setLanguageState] = useState<Language>(() => {
    return getLangFromPath(pathname);
  });

  // Sync state & DOM whenever pathname changes
  useEffect(() => {
    const currentLang = getLangFromPath(pathname);
    setLanguageState(currentLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", currentLang);
      document.cookie = `portfolio_lang=${currentLang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }
  }, [pathname]);

  const setLanguage = (targetLang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", targetLang);
      document.cookie = `portfolio_lang=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = targetLang;
      document.documentElement.dir = targetLang === "ar" ? "rtl" : "ltr";
    }
    setLanguageState(targetLang);

    // Compute updated path replacing current locale prefix
    let newPath = pathname;
    if (pathname.startsWith("/ar")) {
      newPath = pathname.replace(/^\/ar(\/|$)/, `/${targetLang}$1`);
    } else if (pathname.startsWith("/en")) {
      newPath = pathname.replace(/^\/en(\/|$)/, `/${targetLang}$1`);
    } else {
      newPath = `/${targetLang}${pathname === "/" ? "" : pathname}`;
    }

    startTransition(() => {
      router.push(newPath);
    });
  };

  const toggleLanguage = () => {
    const nextLang = language === "ar" ? "en" : "ar";
    setLanguage(nextLang);
  };

  const isRTL = language === "ar";
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { FloatingActions } from "@/components/common/FloatingActions";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSshRoute = pathname?.startsWith("/ssh") || pathname?.startsWith("/admin");

  if (isSshRoute) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1 pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

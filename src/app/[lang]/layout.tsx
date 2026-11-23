import React from "react";

export function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

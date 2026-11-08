import React from "react";
import { notFound } from "next/navigation";
import { isValidLocale, SUPPORTED_LOCALES } from "@/data/content";
import { Locale } from "@/data/types";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IntroOverlay } from "@/components/IntroOverlay";
import { LocaleDocumentSync } from "@/components/LocaleDocumentSync";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang: Locale = params.lang;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      lang={lang}
      className={`min-h-screen flex flex-col bg-obsidian text-alabaster ${
        lang === "ar" ? "font-arabic" : "font-sans"
      }`}
    >
      <LocaleDocumentSync lang={lang} />
      <IntroOverlay lang={lang} />
      <SiteHeader lang={lang} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}


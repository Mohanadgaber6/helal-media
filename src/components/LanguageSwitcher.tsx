"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";

export function LanguageSwitcher({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const pathname = usePathname() || `/${lang}`;
  const [hash, setHash] = useState("");
  const copy = getCopy(lang);
  const targetLang: Locale = lang === "en" ? "ar" : "en";

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash || "");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  // Replace leading /en or /ar segment with targetLang
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en" || segments[0] === "ar") {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }
  const targetHref = `/${segments.join("/")}${hash}`;

  return (
    <Link
      href={targetHref}
      aria-label={copy.nav.langSwitchAria}
      data-testid="language-switcher"
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-alabaster transition-all duration-200 hover:border-brandBlue hover:bg-brandBlue/10 hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue ${className}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
        aria-hidden="true"
      />
      <span className={targetLang === "ar" ? "font-arabic" : "font-sans"}>
        {copy.nav.langSwitchLabel}
      </span>
    </Link>
  );
}

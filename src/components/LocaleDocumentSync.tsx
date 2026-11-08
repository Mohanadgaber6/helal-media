"use client";

import { useEffect } from "react";
import { Locale } from "@/data/types";

export function LocaleDocumentSync({ lang }: { lang: Locale }) {
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  return null;
}


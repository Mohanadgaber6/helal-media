import React from "react";
import Link from "next/link";
import { HelalLogo } from "@/components/HelalLogo";

export default function NotFound() {
  return (
    <div
      data-testid="not-found-page"
      className="flex min-h-[75vh] flex-col items-center justify-center bg-obsidian px-4 py-20 text-center text-alabaster"
    >
      <div className="mb-8">
        <HelalLogo size="md" />
      </div>
      <span className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-brand-gradient">
        404 · خطأ
      </span>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight">
        Page Not Found
      </h1>
      <p
        dir="rtl"
        className="mt-2 font-arabic text-xl sm:text-2xl text-pewter"
      >
        الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
      </p>
      <p className="mt-2 max-w-md text-sm sm:text-base text-pewter">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-alabaster shadow-brandGlow transition hover:brightness-110"
        >
          <span>Back to Home (EN)</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/ar"
          dir="rtl"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-arabic text-sm font-bold text-alabaster transition hover:border-brandBlue hover:text-brandBlue"
        >
          <span>العودة إلى الرئيسية (AR)</span>
          <span aria-hidden="true">←</span>
        </Link>
      </div>
    </div>
  );
}

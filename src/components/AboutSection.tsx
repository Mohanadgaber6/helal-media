"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { FloatingBackground } from "./FloatingBackground";

export function AboutSection({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative scroll-mt-24 border-b border-white/[0.08] bg-carbon py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <FloatingBackground variant="section" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Section Index / Label */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="lg:col-span-4 flex flex-col space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gradient">
              01 / {copy.about.eyebrow}
            </span>
            <div
              className="h-[2px] w-16 rounded-full bg-brand-gradient"
              aria-hidden="true"
            />
          </motion.div>

          {/* Main Editorial Narrative */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOutExpo }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Bold Subheading — Visually Larger and Heavier */}
            <h2
              data-testid="about-subheading"
              className={`font-bold text-alabaster ${
                lang === "ar"
                  ? "font-arabic text-3xl sm:text-4xl lg:text-5xl leading-[1.25]"
                  : "font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight"
              }`}
            >
              {copy.about.boldSubheading}
            </h2>

            {/* Body Paragraphs — Verbatim */}
            <div className="space-y-6 text-lg sm:text-xl lg:text-2xl leading-relaxed text-pewter font-normal">
              <p data-testid="about-paragraph-1">{copy.about.paragraph1}</p>
              <p
                data-testid="about-paragraph-2"
                className="font-medium text-alabaster"
              >
                {copy.about.paragraph2}
              </p>
            </div>

            {/* Two CTA Buttons Immediately Below with Arrow Shift Microinteractions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href={`/${lang}/contact`}
                data-testid="about-cta-start-project"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-gradient px-7 py-4 text-sm sm:text-base font-bold text-alabaster shadow-brandGlow transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                <span>{copy.about.ctaPrimary}</span>
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform duration-300 ${
                    lang === "ar"
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                >
                  {lang === "ar" ? "←" : "→"}
                </span>
              </Link>

              <Link
                href={`/${lang}/work`}
                data-testid="about-cta-see-projects"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm sm:text-base font-semibold text-alabaster transition-all duration-300 hover:border-brandBlue hover:bg-brand-gradient-subtle hover:text-alabaster hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                <span>{copy.about.ctaSecondary}</span>
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform duration-300 ${
                    lang === "ar"
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                >
                  {lang === "ar" ? "←" : "→"}
                </span>
              </Link>
            </div>

            {/* Regional Presence Country Flags (Egypt - Saudi Arabia - UAE - Kuwait) */}
            <div
              data-testid="about-countries-row"
              className="pt-6 border-t border-white/10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pewter mb-4">
                {lang === "ar" ? "تواجدنا الإقليمي" : "Serving Brands Across"}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {REGIONAL_COUNTRIES.map((country, idx) => (
                  <div
                    key={country.code}
                    data-testid={`about-country-${country.code}`}
                    style={{ animationDelay: `${idx * 0.45}s` }}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-semibold text-alabaster shadow-[0_8px_24px_rgba(0,0,0,0.35)] animate-[floatY_4.2s_ease-in-out_infinite] transition-all duration-300 hover:border-brandBlue/60 hover:bg-white/[0.08] hover:scale-105"
                  >
                    <span className="inline-flex h-5 w-7 overflow-hidden rounded-[4px] border border-white/15 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {country.flagSvg}
                    </span>
                    <span>{country.label[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const REGIONAL_COUNTRIES: Array<{
  code: string;
  label: Record<Locale, string>;
  flagSvg: React.ReactNode;
}> = [
  {
    code: "eg",
    label: { en: "Egypt", ar: "مصر" },
    flagSvg: (
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true">
        <rect width="28" height="6.67" y="0" fill="#CE1126" />
        <rect width="28" height="6.67" y="6.67" fill="#FFFFFF" />
        <rect width="28" height="6.67" y="13.33" fill="#000000" />
        <path
          d="M12.5 8.2h3l-.4 3.4h-2.2z"
          fill="#C09300"
        />
      </svg>
    ),
  },
  {
    code: "sa",
    label: { en: "Saudi Arabia", ar: "السعودية" },
    flagSvg: (
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true">
        <rect width="28" height="20" fill="#006C35" />
        <rect x="6" y="6.5" width="16" height="2.4" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="8" y="12" width="12" height="1.3" rx="0.65" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    code: "ae",
    label: { en: "UAE", ar: "الإمارات" },
    flagSvg: (
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true">
        <rect width="28" height="6.67" y="0" fill="#00732F" />
        <rect width="28" height="6.67" y="6.67" fill="#FFFFFF" />
        <rect width="28" height="6.67" y="13.33" fill="#000000" />
        <rect width="7.5" height="20" x="0" y="0" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: "kw",
    label: { en: "Kuwait", ar: "الكويت" },
    flagSvg: (
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true">
        <rect width="28" height="6.67" y="0" fill="#007A3D" />
        <rect width="28" height="6.67" y="6.67" fill="#FFFFFF" />
        <rect width="28" height="6.67" y="13.33" fill="#CE1126" />
        <polygon points="0,0 7.5,6.67 7.5,13.33 0,20" fill="#000000" />
      </svg>
    ),
  },
];

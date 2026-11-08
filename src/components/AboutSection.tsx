import React from "react";
import Link from "next/link";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";

export function AboutSection({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative scroll-mt-24 border-b border-white/[0.08] bg-carbon py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Section Index / Label */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gradient">
              01 / {copy.about.eyebrow}
            </span>
            <div
              className="h-[2px] w-16 rounded-full bg-brand-gradient"
              aria-hidden="true"
            />
          </div>

          {/* Main Editorial Narrative */}
          <div className="lg:col-span-8 space-y-8">
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

            {/* Two CTA Buttons Immediately Below */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href={`/${lang}/contact`}
                data-testid="about-cta-start-project"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-gradient px-7 py-4 text-sm sm:text-base font-bold text-alabaster shadow-brandGlow transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                <span>{copy.about.ctaPrimary}</span>
                <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
              </Link>

              <Link
                href={`/${lang}/work`}
                data-testid="about-cta-see-projects"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm sm:text-base font-semibold text-alabaster transition-all duration-200 hover:border-brandBlue hover:bg-brand-gradient-subtle hover:text-alabaster hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                <span>{copy.about.ctaSecondary}</span>
                <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

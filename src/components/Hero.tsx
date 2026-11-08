import React from "react";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";

export function Hero({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden border-b border-white/[0.08] bg-obsidian pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-44"
    >
      {/* Subtle multicolor brand ambient studio glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_18%,rgba(129,69,202,0.16)_0%,rgba(20,172,243,0.08)_40%,transparent_72%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brandBlue/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Small Eyebrow */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 mb-8 sm:mb-10 animate-[fadeInUp_0.5s_ease-out_both]">
            <span
              className="h-2 w-2 rounded-full bg-brand-gradient"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-alabaster/90">
              {copy.hero.eyebrow}
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h1
            data-testid="hero-headline"
            className={`font-bold tracking-tight text-alabaster ${
              lang === "ar"
                ? "font-arabic text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.18]"
                : "font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] leading-[1.04] tracking-editorial"
            }`}
          >
            <span>{copy.hero.headlinePrefix}</span>
            <span
              data-testid="hero-accent-word"
              className="text-brand-gradient inline-block relative pb-1"
            >
              {copy.hero.headlineAccent}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-brand-gradient opacity-80"
              />
            </span>
            {copy.hero.headlineSuffix && <span>{copy.hero.headlineSuffix}</span>}
          </h1>
        </div>
      </div>
    </section>
  );
}

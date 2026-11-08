import React from "react";
import Link from "next/link";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";

export function FinalCTA({
  lang,
  headline,
  secondaryLine,
  buttonLabel,
}: {
  lang: Locale;
  headline?: string;
  secondaryLine?: string;
  buttonLabel?: string;
}) {
  const copy = getCopy(lang);
  const title = headline || copy.closingCta.headline;
  const subline = secondaryLine || copy.closingCta.secondaryLine;
  const ctaText = buttonLabel || copy.closingCta.button;

  return (
    <section
      data-testid="closing-cta-section"
      className="relative overflow-hidden bg-gradient-to-b from-carbon to-obsidian py-24 sm:py-32 lg:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,69,202,0.16)_0%,rgba(20,172,243,0.08)_38%,transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          data-testid="closing-cta-headline"
          className={`font-bold text-alabaster mb-5 ${
            lang === "ar"
              ? "font-arabic text-3xl sm:text-5xl lg:text-6xl leading-[1.22]"
              : "font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight"
          }`}
        >
          {title}
        </h2>

        <p
          data-testid="closing-cta-subline"
          className="text-lg sm:text-2xl text-pewter mb-10"
        >
          {subline}
        </p>

        <Link
          href={`/${lang}/contact`}
          data-testid="closing-cta-button"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-gradient px-9 py-4.5 text-base sm:text-lg font-bold text-alabaster shadow-brandGlow transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
        >
          <span>{ctaText}</span>
          <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
        </Link>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { FloatingBackground } from "./FloatingBackground";

export function CollectionHero({
  lang,
  eyebrow,
  headline,
  supportingCopy,
  overviewLabel,
  overviewCopy,
  inThisCollection,
  extraTag,
}: {
  lang: Locale;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  overviewLabel: string;
  overviewCopy: string;
  inThisCollection: string;
  extraTag?: string;
}) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      data-testid="collection-hero"
      className="relative overflow-hidden border-b border-white/10 bg-obsidian pt-12 pb-16 sm:pt-16 sm:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_10%,rgba(129,69,202,0.14),rgba(20,172,243,0.06),transparent_70%)]"
        aria-hidden="true"
      />
      <FloatingBackground variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back to Work Hub breadcrumb */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className="mb-8"
        >
          <Link
            href={`/${lang}/work`}
            data-testid="collection-back-to-work"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pewter transition hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded"
          >
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-300 ${
                lang === "ar"
                  ? "group-hover:translate-x-1"
                  : "group-hover:-translate-x-1"
              }`}
            >
              {lang === "ar" ? "→" : "←"}
            </span>
            <span>{copy.workHub.backToWork}</span>
          </Link>
        </motion.div>

        {/* Eyebrow + Optional Rectangular Tag */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOutExpo }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span
            data-testid="collection-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-alabaster/90"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
              aria-hidden="true"
            />
            {eyebrow}
          </span>

          {extraTag && (
            <span
              data-testid="collection-extra-tag"
              className="inline-block rounded-md border border-brandBlue/45 bg-brand-gradient-subtle px-3.5 py-1 text-xs font-semibold tracking-wider text-brandBlue"
            >
              {extraTag}
            </span>
          )}
        </motion.div>

        {/* Main Collection Headline */}
        <motion.h1
          data-testid="collection-headline"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOutExpo }}
          className={`font-bold text-alabaster mb-4 ${
            lang === "ar"
              ? "font-arabic text-4xl sm:text-6xl lg:text-7xl leading-[1.18]"
              : "font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight"
          }`}
        >
          {headline}
        </motion.h1>

        {/* Supporting Sentence */}
        <motion.p
          data-testid="collection-supporting-copy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: easeOutExpo }}
          className="max-w-2xl text-lg sm:text-2xl text-pewter leading-relaxed"
        >
          {supportingCopy}
        </motion.p>

        {/* Overview Block with Official Brand Gradient Label */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: easeOutExpo }}
          className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-slateStudio/90 p-7 sm:p-10 lg:grid-cols-12 lg:items-center backdrop-blur-sm"
        >
          <div className="lg:col-span-3">
            <span
              data-testid="collection-overview-label"
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-bold uppercase tracking-[0.2em]"
            >
              <span
                className="h-2 w-2 rounded-full bg-brand-gradient"
                aria-hidden="true"
              />
              <span className="text-brand-gradient">{overviewLabel}</span>
            </span>
          </div>
          <div className="lg:col-span-9">
            <p
              data-testid="collection-overview-copy"
              className="text-base sm:text-xl leading-relaxed text-alabaster/90"
            >
              {overviewCopy}
            </p>
          </div>
        </motion.div>

        {/* Subheading: In this collection */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <h2
            data-testid="collection-subheading"
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-brand-gradient"
          >
            {inThisCollection}
          </h2>
          <div
            className="h-px flex-1 bg-gradient-to-r from-brandBlue/30 via-brandPurple/20 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

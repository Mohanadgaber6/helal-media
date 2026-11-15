"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { FloatingBackground } from "./FloatingBackground";

export function Hero({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();

  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

      {/* Floating Background Elements (Task 7B) */}
      <FloatingBackground variant="hero" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* 1. Small Eyebrow Entrance */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 mb-8 sm:mb-10 backdrop-blur-sm"
          >
            <span
              className="h-2 w-2 rounded-full bg-brand-gradient animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-alabaster/90">
              {copy.hero.eyebrow}
            </span>
          </motion.div>

          {/* 2. Large Editorial Headline Entrance */}
          <motion.h1
            data-testid="hero-headline"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
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
              <motion.span
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={prefersReducedMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.75, delay: 0.35, ease: easeOutExpo }}
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left rounded-full bg-brand-gradient opacity-85"
              />
            </span>
            {copy.hero.headlineSuffix && <span>{copy.hero.headlineSuffix}</span>}
          </motion.h1>

          {/* 3. Signature Brand Slogan in Website Brand Gradient & Geometric Arabic Font */}
          <motion.p
            dir="rtl"
            data-testid="hero-slogan-ar"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: easeOutExpo }}
            className="mt-6 sm:mt-8 inline-block font-arabic text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-brand-gradient"
          >
            التسويق ملوش كتالوج
          </motion.p>
        </div>
      </div>
    </section>
  );
}

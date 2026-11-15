"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { FloatingBackground } from "./FloatingBackground";

const MARQUEE_ITEMS = [
  "BRANDING & IDENTITY",
  "التسويق ملوش كتالوج",
  "VIDEO PRODUCTION",
  "SOCIAL MEDIA MANAGEMENT",
  "AI CREATIVE CONTENT",
  "MEDIA BUYING & ROI",
  "WEB DESIGN & DEV",
  "CONTENT STRATEGY",
];

export function Hero({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();

  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden border-b border-white/[0.08] bg-obsidian pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Subtle multicolor brand ambient studio glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_18%,rgba(129,69,202,0.18)_0%,rgba(20,172,243,0.1)_40%,transparent_72%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brandBlue/40 to-transparent"
        aria-hidden="true"
      />

      {/* Floating Background Elements */}
      <FloatingBackground variant="hero" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* 1. Small Eyebrow Entrance + Gentle Float */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: 1, y: [0, -4, 0] }
            }
            transition={{
              opacity: { duration: 0.55, ease: easeOutExpo },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="inline-flex items-center gap-3 rounded-full border border-brandBlue/30 bg-white/[0.04] px-4 py-2 mb-8 sm:mb-10 backdrop-blur-sm shadow-[0_0_25px_rgba(20,172,243,0.14)]"
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-brand-gradient animate-pulse"
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
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scaleX: [1, 0.92, 1], opacity: [0.85, 1, 0.85] }
                }
                transition={{
                  duration: 3.2,
                  delay: 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left rounded-full bg-brand-gradient shadow-[0_0_14px_rgba(243,57,141,0.65)]"
              />
            </span>
            {copy.hero.headlineSuffix && <span>{copy.hero.headlineSuffix}</span>}
          </motion.h1>

          {/* 3. Signature Brand Slogan in Website Brand Gradient & Geometric Arabic Font */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: 1, y: [0, -6, 0] }
            }
            transition={{
              opacity: { duration: 0.65, delay: 0.22, ease: easeOutExpo },
              y: {
                duration: 4.2,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="mt-7 sm:mt-9 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md shadow-[0_12px_32px_rgba(129,69,202,0.16)]"
          >
            <span
              aria-hidden="true"
              className="text-brandPink text-base animate-spin"
            >
              ✦
            </span>
            <p
              dir="rtl"
              data-testid="hero-slogan-ar"
              className="font-arabic text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-brand-gradient"
            >
              التسويق ملوش كتالوج
            </p>
          </motion.div>
        </div>
      </div>

      {/* 4. Continuous Kinetic Brand Marquee Ribbon */}
      <div
        dir="ltr"
        aria-hidden="true"
        className="relative z-10 mt-14 sm:mt-20 border-y border-white/[0.08] bg-white/[0.02] py-3.5 overflow-hidden backdrop-blur-sm"
      >
        <div className="flex w-max animate-[marqueeScroll_28s_linear_infinite] items-center gap-8 sm:gap-12">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-12">
              <span
                className={`text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase ${
                  item === "التسويق ملوش كتالوج"
                    ? "font-arabic text-base sm:text-lg tracking-normal text-brand-gradient"
                    : idx % 2 === 0
                    ? "font-display text-alabaster/80"
                    : "font-display text-brand-gradient"
                }`}
              >
                {item}
              </span>
              <span className="text-brandPink text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

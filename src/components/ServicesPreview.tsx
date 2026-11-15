"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy, HOME_FEATURED_SERVICES } from "@/data/content";
import { ServiceCard } from "./ServiceCard";
import { FloatingBackground } from "./FloatingBackground";

export function ServicesPreview({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const { left, center, right } = HOME_FEATURED_SERVICES;
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      data-testid="services-preview-section"
      className="relative border-b border-white/[0.08] bg-obsidian py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <FloatingBackground variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mx-auto max-w-3xl text-center mb-16 sm:mb-24"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-gradient mb-3">
            {copy.servicesPreview.smallTitle}
          </p>
          <h2
            className={`font-bold text-alabaster mb-5 ${
              lang === "ar"
                ? "font-arabic text-3xl sm:text-5xl leading-[1.2]"
                : "font-display text-3xl sm:text-5xl leading-[1.1] tracking-tight"
            }`}
          >
            {copy.servicesPreview.mainHeading}
          </h2>
          <p className="text-base sm:text-lg text-pewter leading-relaxed">
            {copy.servicesPreview.description}
          </p>
        </motion.div>

        {/*
          Three Featured Cards Geometry (Section 3.3):
          LEFT — Branding
          CENTER — Social Media Management (larger & visually closer to camera/visitor)
          RIGHT — Content Strategy
          dir="ltr" on the desktop grid ensures spatial LEFT / CENTER / RIGHT geometry is preserved in both languages,
          while each card sets its own text direction (LTR or RTL).
        */}
        <div
          dir="ltr"
          data-testid="services-preview-grid"
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center lg:gap-10"
        >
          {/* LEFT: Branding */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
            className="order-2 md:order-1"
          >
            <ServiceCard
              service={left}
              lang={lang}
              variant="side"
              slotName="left"
              indexLabel="01"
            />
          </motion.div>

          {/* CENTER: Social Media Management (Focal Point — Larger & Closer) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="order-1 md:order-2"
          >
            <ServiceCard
              service={center}
              lang={lang}
              variant="focal"
              slotName="center"
              featuredBadge={copy.servicesPreview.featuredBadge}
            />
          </motion.div>

          {/* RIGHT: Content Strategy */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOutExpo }}
            className="order-3 md:order-3"
          >
            <ServiceCard
              service={right}
              lang={lang}
              variant="side"
              slotName="right"
              indexLabel="03"
            />
          </motion.div>
        </div>

        {/* CTA: View all services */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.2, ease: easeOutExpo }}
          className="mt-16 sm:mt-24 text-center"
        >
          <Link
            href={`/${lang}/services`}
            data-testid="services-preview-view-all"
            className="group inline-flex items-center gap-3 rounded-full border border-brandBlue/45 bg-brand-gradient-subtle px-8 py-4 text-sm sm:text-base font-bold text-alabaster transition-all duration-300 hover:bg-brand-gradient hover:border-transparent hover:shadow-brandGlow hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <span>{copy.servicesPreview.cta}</span>
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
        </motion.div>
      </div>
    </section>
  );
}

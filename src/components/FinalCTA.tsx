"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { BUSINESS_CONFIG, getCopy } from "@/data/content";
import { FloatingBackground } from "./FloatingBackground";

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
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const title = headline || copy.closingCta.headline;
  const subline = secondaryLine || copy.closingCta.secondaryLine;
  const ctaText = buttonLabel || copy.closingCta.button;

  return (
    <section
      data-testid="closing-cta-section"
      className="relative overflow-hidden bg-gradient-to-b from-carbon to-obsidian py-24 sm:py-32 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,69,202,0.16)_0%,rgba(20,172,243,0.08)_38%,transparent_68%)]"
        aria-hidden="true"
      />

      <FloatingBackground variant="section" />

      {/* Centered Question + Contact Us Button Immediately Below */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pb-20 sm:pb-28 border-b border-white/[0.08]"
      >
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
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-gradient px-9 py-4.5 text-base sm:text-lg font-bold text-alabaster shadow-brandGlow transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
        >
          <span>{ctaText}</span>
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

      {/* Bottom-of-Site "Get in Touch" Section (Modeled on naeladvertising.ae) */}
      <motion.div
        data-testid="get-in-touch-section"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0.08, ease: easeOutExpo }}
        className="relative z-10 mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8"
      >
        <div className="text-center mb-12 sm:mb-14">
          <h2
            dir="ltr"
            data-testid="get-in-touch-heading"
            className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-alabaster"
          >
            Get in <span className="text-brand-gradient">Touch</span>
          </h2>
        </div>

        {/* 3 Cards Grid: Card 1 (Intro Copy), Card 2 (WhatsApp Only), Card 3 (Email) */}
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6 items-stretch"
        >
          {/* Card 1: Intro Narrative */}
          <div
            data-testid="git-card-intro"
            className="relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-brandPurple/30 bg-[#0D0918]/90 p-7 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brandPurple/20 blur-2xl"
            />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brandPurple/40 bg-brandPurple/15 text-brandBlue mb-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-alabaster/90 font-medium">
              Tell us about your brand and we’ll build a plan around it. Reach
              out directly and our team will get back to you within 24 hours
            </p>
          </div>

          {/* Card 2: WhatsApp Only ("WHATSAPP : +201055515576") */}
          <a
            href={BUSINESS_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="git-card-whatsapp"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-brandPurple/30 bg-[#0D0918]/90 p-7 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/60 hover:shadow-[0_22px_50px_rgba(37,211,102,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366] transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15Z" />
                </svg>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#25D366] opacity-80 group-hover:opacity-100">
                ↗
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pewter mb-2">
                WHATSAPP
              </p>
              <p className="font-mono text-base sm:text-lg font-bold text-alabaster group-hover:text-[#25D366] transition-colors">
                WHATSAPP : +201055515576
              </p>
            </div>
          </a>

          {/* Card 3: Email ("EMAIL" / "helal.media0@gmail.com") */}
          <a
            href={`mailto:${BUSINESS_CONFIG.email}`}
            data-testid="git-card-email"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-brandPurple/30 bg-[#0D0918]/90 p-7 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-brandBlue/60 hover:shadow-[0_22px_50px_rgba(20,172,243,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brandBlue/40 bg-brandBlue/15 text-brandBlue transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-brandBlue opacity-80 group-hover:opacity-100">
                ↗
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pewter mb-2">
                EMAIL
              </p>
              <p className="font-mono text-base sm:text-lg font-bold text-alabaster group-hover:text-brandBlue transition-colors break-all">
                {BUSINESS_CONFIG.email}
              </p>
            </div>
          </a>
        </div>

        {/* Follow Us Row (Facebook & Instagram) */}
        <div
          dir="ltr"
          data-testid="git-follow-us"
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/[0.03] px-6 py-5 sm:px-8"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-alabaster">
            Follow Us
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={BUSINESS_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="git-social-facebook"
              aria-label={BUSINESS_CONFIG.socials.facebookLabel}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs sm:text-sm font-semibold text-alabaster transition-all duration-200 hover:border-brandBlue hover:bg-brandBlue/15 hover:text-brandBlue hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M15 3H12.5C10.567 3 9 4.567 9 6.5V10H6.5V14H9V21H13V14H16L16.8 10H13V6.8C13 6.358 13.358 6 13.8 6H16.8V3H15Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Facebook</span>
            </a>

            <a
              href={BUSINESS_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="git-social-instagram"
              aria-label={BUSINESS_CONFIG.socials.instagramLabel}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs sm:text-sm font-semibold text-alabaster transition-all duration-200 hover:border-brandPink hover:bg-brandPink/15 hover:text-brandPink hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Locale, WorkFolderItem } from "@/data/types";
import {
  DESIGN_CLIENTS,
  getCopy,
  TOTAL_DESIGN_COUNT,
  TOTAL_VIDEO_COUNT,
  VIDEO_INDUSTRY_GROUPS,
  WORK_FOLDERS,
} from "@/data/content";

export function WorkFolders({
  lang,
  mode = "home",
}: {
  lang: Locale;
  mode?: "home" | "hub";
}) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // Dynamically compute count labels from the actual collection arrays
  const designCaseCount = String(DESIGN_CLIENTS.length).padStart(2, "0");
  const videoGroupCount = String(VIDEO_INDUSTRY_GROUPS.length).padStart(2, "0");

  const baseDesigns = WORK_FOLDERS.find((f) => f.id === "designs")!;
  const baseVideos = WORK_FOLDERS.find((f) => f.id === "videos")!;
  const websitesFolder = WORK_FOLDERS.find((f) => f.id === "websites")!;

  const designsFolder: WorkFolderItem = {
    ...baseDesigns,
    countLabel: {
      en: `${designCaseCount} Case Studies · ${TOTAL_DESIGN_COUNT} Visuals`,
      ar: `${designCaseCount} دراسات حالة · ${TOTAL_DESIGN_COUNT} تصميمًا`,
    },
  };

  const videosFolder: WorkFolderItem = {
    ...baseVideos,
    countLabel: {
      en: `${videoGroupCount} Industries · ${TOTAL_VIDEO_COUNT} Films`,
      ar: `${videoGroupCount} قطاعات · ${TOTAL_VIDEO_COUNT} فيديو`,
    },
  };

  return (
    <section
      data-testid={mode === "home" ? "work-folders-section" : "work-hub-section"}
      className="relative border-b border-white/[0.08] bg-carbon py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient studio spotlight with official brand colors */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(129,69,202,0.12)_0%,rgba(20,172,243,0.06)_35%,transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading: Client Work + Our Team */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mx-auto max-w-3xl text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 mb-4">
            <span
              data-testid="work-secondary-label"
              className="rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brandBlue"
            >
              {copy.workPreview.secondaryLabel}
            </span>
            {mode === "hub" && (
              <span
                data-testid="work-category-eyebrow"
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1 text-xs font-medium uppercase tracking-[0.16em] text-pewter"
              >
                {copy.workHub.categoryBadge}
              </span>
            )}
          </div>

          <h1
            data-testid={mode === "hub" ? "work-hub-heading" : "work-preview-heading"}
            className={`font-bold text-alabaster mb-4 ${
              lang === "ar" && mode === "home"
                ? "font-arabic text-3xl sm:text-5xl lg:text-6xl leading-[1.2]"
                : "font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight"
            }`}
          >
            {mode === "hub" ? copy.workHub.heading : copy.workPreview.heading}
          </h1>

          {mode === "hub" && (
            <p
              data-testid="work-hub-supporting-copy"
              className="text-base sm:text-xl text-pewter leading-relaxed mt-3"
            >
              {copy.workHub.supportingCopy}
            </p>
          )}
        </motion.div>

        {/*
          Triangle Folder Geometry (Section 3.4 & Section 5):
          - Designs at upper left
          - Videos at upper right
          - Websites at lower center, between the first two
          On mobile (< md), stacks cleanly for zero horizontal overflow.
        */}
        <div
          dir="ltr"
          data-testid="work-folders-triangle"
          className="relative mx-auto max-w-5xl"
        >
          {/* Upper Row: Upper Left (Designs) & Upper Right (Videos) */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 items-start">
            <motion.div
              data-testid="folder-slot-top-left"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="md:col-span-5 md:col-start-1"
            >
              <FolderInteractiveCard
                folder={designsFolder}
                lang={lang}
                showSubtitle={mode === "hub"}
                indexNumber="01"
                openLabel={copy.workPreview.openFolderLabel}
              />
            </motion.div>

            <motion.div
              data-testid="folder-slot-top-right"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              className="md:col-span-5 md:col-start-8"
            >
              <FolderInteractiveCard
                folder={videosFolder}
                lang={lang}
                showSubtitle={mode === "hub"}
                indexNumber="02"
                openLabel={copy.workPreview.openFolderLabel}
              />
            </motion.div>
          </div>

          {/* Lower Center Row: Websites positioned between the upper two */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12">
            <motion.div
              data-testid="folder-slot-bottom-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.18, ease: easeOutExpo }}
              className="md:col-span-6 md:col-start-4"
            >
              <FolderInteractiveCard
                folder={websitesFolder}
                lang={lang}
                showSubtitle={mode === "hub"}
                indexNumber="03"
                openLabel={copy.workPreview.openFolderLabel}
              />
            </motion.div>
          </div>
        </div>

        {/* Homepage CTA: View all work */}
        {mode === "home" && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.22, ease: easeOutExpo }}
            className="mt-16 sm:mt-24 text-center"
          >
            <Link
              href={`/${lang}/work`}
              data-testid="work-preview-view-all"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-sm sm:text-base font-bold text-alabaster transition-all duration-300 hover:border-transparent hover:bg-brand-gradient hover:shadow-brandGlow hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
            >
              <span>{copy.workPreview.cta}</span>
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
        )}
      </div>
    </section>
  );
}

function FolderInteractiveCard({
  folder,
  lang,
  showSubtitle,
  indexNumber,
  openLabel,
}: {
  folder: WorkFolderItem;
  lang: Locale;
  showSubtitle: boolean;
  indexNumber: string;
  openLabel: string;
}) {
  return (
    <Link
      href={`/${lang}${folder.href}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
      data-testid={`work-folder-${folder.slug}`}
      className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-3xl"
    >
      {/* Sculpted Folder Container */}
      <div
        style={{
          animationDelay:
            indexNumber === "01" ? "0s" : indexNumber === "02" ? "0.8s" : "1.6s",
        }}
        className="relative pt-5 animate-[floatY_5.2s_ease-in-out_infinite] transition-transform duration-300 group-hover:-translate-y-2.5"
      >
        {/* Folder Back Plate + Top Tab */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-6 h-8 w-36 rounded-t-2xl border border-b-0 border-white/15 bg-slateStudio transition-colors duration-300 group-hover:border-brandBlue/50 group-hover:bg-[#1E1E26]"
        >
          <span className="absolute top-2 left-4 font-mono text-[11px] font-bold tracking-widest text-brand-gradient">
            {indexNumber}
          </span>
        </div>

        {/* Layered Internal Creative Sheets (Lift and fan on hover) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-3 h-16 rounded-2xl border border-brandBlue/20 bg-brandBlue/[0.06] transition-all duration-300 group-hover:-translate-y-3 group-hover:rotate-[-2deg] group-hover:border-brandBlue/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-4 h-16 rounded-2xl border border-brandPink/25 bg-brandPink/[0.08] transition-all duration-300 group-hover:-translate-y-5 group-hover:rotate-[1.5deg] group-hover:bg-brand-gradient-subtle"
        />

        {/* Front Folder Pocket Body */}
        <div className="relative z-10 overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-[#1B1B22] to-[#121216] p-7 sm:p-8 shadow-folder transition-all duration-300 group-hover:border-brandPurple/60 group-hover:shadow-[0_24px_60px_rgba(129,69,202,0.22)]">
          {/* Subtle top pocket crease */}
          <div
            aria-hidden="true"
            className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-pewter">
              <span className="h-2 w-2 rounded-full bg-brand-gradient transition-transform group-hover:scale-125" />
              {folder.countLabel[lang]}
            </span>

            {/* Folder Emblem Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-brandBlue transition-transform duration-300 group-hover:scale-110 group-hover:text-brandPink"
            >
              <path
                d="M3 6C3 4.89543 3.89543 4 5 4H9.17157C9.70201 4 10.2107 4.21071 10.5858 4.58579L12.4142 6.41421C12.7893 6.78929 13.298 7 13.8284 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </div>

          {/* Visible Nearby / Prominent Folder Label */}
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={`font-bold text-alabaster transition-colors group-hover:text-brandBlue ${
                lang === "ar"
                  ? "font-arabic text-2xl sm:text-3xl"
                  : "font-display text-2xl sm:text-3xl tracking-tight"
              }`}
            >
              {folder.title[lang]}
            </h3>

            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-alabaster transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-alabaster group-hover:scale-110">
              {lang === "ar" ? "←" : "↗"}
            </span>
          </div>

          {/* Category Subtitle */}
          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed text-pewter ${
              showSubtitle ? "block" : "line-clamp-2"
            }`}
          >
            {folder.subtitle[lang]}
          </p>

          <div className="mt-5 pt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gradient">
            <span>{openLabel}</span>
            <span
              aria-hidden="true"
              className={`inline-block text-brandOrange transition-transform duration-300 ${
                lang === "ar"
                  ? "group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            >
              {lang === "ar" ? "←" : "→"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

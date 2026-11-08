import React from "react";
import Link from "next/link";
import { Locale } from "@/data/types";
import { getCopy, HOME_FEATURED_SERVICES } from "@/data/content";
import { ServiceCard } from "./ServiceCard";

export function ServicesPreview({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const { left, center, right } = HOME_FEATURED_SERVICES;

  return (
    <section
      data-testid="services-preview-section"
      className="relative border-b border-white/[0.08] bg-obsidian py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
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
        </div>

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
          <div className="order-2 md:order-1">
            <ServiceCard
              service={left}
              lang={lang}
              variant="side"
              slotName="left"
              indexLabel="01"
            />
          </div>

          {/* CENTER: Social Media Management (Focal Point — Larger & Closer) */}
          <div className="order-1 md:order-2">
            <ServiceCard
              service={center}
              lang={lang}
              variant="focal"
              slotName="center"
              featuredBadge={copy.servicesPreview.featuredBadge}
            />
          </div>

          {/* RIGHT: Content Strategy */}
          <div className="order-3 md:order-3">
            <ServiceCard
              service={right}
              lang={lang}
              variant="side"
              slotName="right"
              indexLabel="03"
            />
          </div>
        </div>

        {/* CTA: View all services */}
        <div className="mt-16 sm:mt-24 text-center">
          <Link
            href={`/${lang}/services`}
            data-testid="services-preview-view-all"
            className="inline-flex items-center gap-3 rounded-full border border-brandBlue/45 bg-brand-gradient-subtle px-8 py-4 text-sm sm:text-base font-bold text-alabaster transition-all duration-200 hover:bg-brand-gradient hover:border-transparent hover:shadow-brandGlow hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <span>{copy.servicesPreview.cta}</span>
            <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

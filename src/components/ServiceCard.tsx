import React from "react";
import { Locale, ServiceItem } from "@/data/types";
import { ServiceIcon } from "./ServiceIcons";

export function ServiceCard({
  service,
  lang,
  variant = "side",
  indexLabel,
  featuredBadge,
  slotName,
}: {
  service: ServiceItem;
  lang: Locale;
  variant?: "focal" | "side" | "grid";
  indexLabel?: string;
  featuredBadge?: string;
  slotName?: "left" | "center" | "right";
}) {
  const isFocal = variant === "focal";

  return (
    <article
      dir={lang === "ar" ? "rtl" : "ltr"}
      data-testid={
        slotName ? `service-preview-card-${slotName}` : `service-card-${service.slug}`
      }
      data-focal={isFocal ? "true" : "false"}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 ${
        isFocal
          ? "z-20 border border-brandPurple/60 bg-gradient-to-b from-[#1C1B24] to-[#121217] p-8 sm:p-10 lg:p-12 shadow-focal md:scale-[1.06] lg:scale-[1.08] md:-translate-y-4"
          : variant === "side"
          ? "z-10 border border-white/10 bg-slateStudio p-7 sm:p-8 lg:p-9 md:translate-y-3 hover:border-brandBlue/50 hover:bg-[#191920] hover:-translate-y-0.5"
          : "border border-white/10 bg-slateStudio p-7 sm:p-9 hover:border-brandBlue/50 hover:bg-[#191920] hover:-translate-y-1"
      }`}
    >
      {/* Top multicolor gradient accent bar on focal card */}
      {isFocal && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-gradient"
        />
      )}

      {/* Top Row: Icon + Focal Badge or Index */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-7">
          <div
            className={`inline-flex items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${
              isFocal
                ? "h-16 w-16 border-brandBlue/40 bg-brand-gradient-subtle text-alabaster"
                : "h-14 w-14 border-white/15 bg-white/[0.04] text-alabaster group-hover:border-brandBlue/40"
            }`}
          >
            <ServiceIcon
              iconKey={service.iconKey}
              className={isFocal ? "w-8 h-8" : "w-7 h-7"}
            />
          </div>

          {isFocal && featuredBadge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-alabaster">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
                aria-hidden="true"
              />
              {featuredBadge}
            </span>
          ) : indexLabel ? (
            <span className="font-mono text-xs font-bold tracking-widest text-brand-gradient">
              {indexLabel}
            </span>
          ) : null}
        </div>

        {/* Service Title */}
        <h3
          className={`font-bold text-alabaster transition-colors group-hover:text-brandBlue ${
            isFocal
              ? lang === "ar"
                ? "font-arabic text-2xl sm:text-3xl leading-snug mb-4"
                : "font-display text-2xl sm:text-3xl leading-tight mb-4"
              : lang === "ar"
              ? "font-arabic text-xl sm:text-2xl leading-snug mb-3"
              : "font-display text-xl sm:text-2xl leading-tight mb-3"
          }`}
        >
          {service.title[lang]}
        </h3>

        {/* Service Verbatim Description */}
        <p
          className={`leading-relaxed ${
            isFocal
              ? "text-base sm:text-lg text-alabaster/90"
              : "text-sm sm:text-base text-pewter"
          }`}
        >
          {service.description[lang]}
        </p>
      </div>

      {/* Bottom decorative rule */}
      <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <span
          className={`h-1 rounded-full transition-all duration-300 ${
            isFocal
              ? "w-14 bg-brand-gradient"
              : "w-6 bg-white/20 group-hover:w-12 group-hover:bg-brand-gradient"
          }`}
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className={`text-xs transition-transform duration-300 ${
            isFocal
              ? "text-brandPink"
              : "text-pewter group-hover:text-brandBlue"
          }`}
        >
          ✦
        </span>
      </div>
    </article>
  );
}

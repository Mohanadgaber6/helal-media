import React from "react";
import { Locale } from "@/data/types";
import { getCopy, SERVICES_PAGE_ORDER } from "@/data/content";
import { ServiceIcon } from "./ServiceIcons";
import { FinalCTA } from "./FinalCTA";

export function ServicesPage({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);

  return (
    <div data-testid="services-page" className="bg-obsidian text-alabaster">
      {/* Editorial Hero */}
      <section className="relative border-b border-white/[0.08] pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_15%,rgba(129,69,202,0.14),rgba(20,172,243,0.06),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span
            data-testid="services-page-eyebrow"
            className="inline-block rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-brandBlue mb-6"
          >
            {copy.servicesPage.eyebrow}
          </span>
          <h1
            data-testid="services-page-headline"
            className={`max-w-4xl font-bold text-alabaster ${
              lang === "ar"
                ? "font-arabic text-4xl sm:text-5xl lg:text-6xl leading-[1.2]"
                : "font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight"
            }`}
          >
            {copy.servicesPage.mainHeadline}
          </h1>
        </div>
      </section>

      {/* All Eight Official Services in Exact Ordered Sequence */}
      <section
        aria-label={copy.servicesPage.eyebrow}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      >
        <div
          data-testid="services-full-list"
          className="divide-y divide-white/10 border-t border-b border-white/10"
        >
          {SERVICES_PAGE_ORDER.map((service, idx) => (
            <article
              key={service.id}
              data-testid={`full-service-item-${idx + 1}`}
              data-service-slug={service.slug}
              className="group grid grid-cols-1 gap-6 py-10 sm:py-12 md:grid-cols-12 md:items-center transition-colors duration-300 hover:bg-slateStudio/60 px-2 sm:px-6 rounded-2xl"
            >
              {/* Number + Icon */}
              <div className="md:col-span-3 flex items-center gap-5">
                <span className="font-mono text-sm font-bold tracking-widest text-brand-gradient">
                  0{idx + 1}
                </span>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slateStudio text-alabaster transition-all duration-300 group-hover:border-brandBlue/60 group-hover:bg-brand-gradient-subtle group-hover:scale-105">
                  <ServiceIcon
                    iconKey={service.iconKey}
                    className="w-7 h-7"
                  />
                </div>
              </div>

              {/* Service Title */}
              <div className="md:col-span-4">
                <h2
                  className={`font-bold text-alabaster transition-colors group-hover:text-brandBlue ${
                    lang === "ar"
                      ? "font-arabic text-2xl sm:text-3xl"
                      : "font-display text-2xl sm:text-3xl tracking-tight"
                  }`}
                >
                  {service.title[lang]}
                </h2>
              </div>

              {/* Verbatim Service Description */}
              <div className="md:col-span-5">
                <p className="text-base sm:text-lg leading-relaxed text-pewter group-hover:text-alabaster/90 transition-colors">
                  {service.description[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Strong CTA — Well separated from service cards */}
      <FinalCTA
        lang={lang}
        headline={copy.servicesPage.ctaHeadline}
        secondaryLine={copy.servicesPage.ctaSubline}
        buttonLabel={copy.servicesPage.ctaButton}
      />
    </div>
  );
}

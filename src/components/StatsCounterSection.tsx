"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";

interface KpiCardSpec {
  id: string;
  target: number;
  unit: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: React.ReactNode;
}

/**
 * Ordered so that in LTR desktop:
 * - Left card: 380 campaigns
 * - Middle card: 8 services
 * - Right card ("اول كارت اللي علي يمين"): 1 Agency
 */
const KPI_CARDS: KpiCardSpec[] = [
  {
    id: "campaigns",
    target: 380,
    unit: {
      en: "campaigns",
      ar: "campaigns",
    },
    description: {
      en: "Launched across social media, paid ads, and content for brands that wanted more than a template",
      ar: "Launched across social media, paid ads, and content for brands that wanted more than a template",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    id: "services",
    target: 8,
    unit: {
      en: "services",
      ar: "services",
    },
    description: {
      en: "Under one roof: branding, social media, content, design, video, web, and paid ads",
      ar: "Under one roof: branding, social media, content, design, video, web, and paid ads",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "agency",
    target: 1,
    unit: {
      en: "Agency",
      ar: "Agency",
    },
    description: {
      en: "From idea to results, one team takes care of it all, so you don’t have to chase anyone.",
      ar: "From idea to results, one team takes care of it all, so you don’t have to chase anyone.",
    },
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function AnimatedCounter({
  target,
  inView,
  prefersReducedMotion,
}: {
  target: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const [value, setValue] = useState<number>(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!inView || prefersReducedMotion || hasAnimatedRef.current) {
      if (inView) setValue(target);
      return;
    }
    hasAnimatedRef.current = true;
    const duration = target > 50 ? 1500 : 1100;
    const startTime = performance.now();
    setValue(0);

    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, prefersReducedMotion]);

  return (
    <span
      data-testid={`kpi-number-${target}`}
      data-target={target}
      aria-label={String(target)}
    >
      {value}
    </span>
  );
}

export function StatsCounterSection({ lang }: { lang: Locale }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = Boolean(useReducedMotion());
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      ref={sectionRef}
      data-testid="stats-counter-section"
      className="relative border-b border-white/[0.08] bg-obsidian py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      {/* Ambient studio radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(129,69,202,0.16)_0%,rgba(20,172,243,0.06)_42%,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading & Subtitle */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mx-auto max-w-3xl text-center mb-14 sm:mb-20"
        >
          <h2
            dir="ltr"
            data-testid="stats-counter-heading"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-alabaster leading-[1.08] mb-4"
          >
            Numbers That Speak For{" "}
            <span className="text-brand-gradient">Themselves</span>
          </h2>
          <p
            dir="ltr"
            data-testid="stats-counter-subheading"
            className="text-base sm:text-xl text-pewter leading-relaxed"
          >
            Every brand gets a plan built from scratch, measured by real impact
          </p>
        </motion.div>

        {/* 3 Animated Count-Up KPI Cards (dir="ltr" so right card is 1 Agency, middle is 8 services, left is 380 campaigns) */}
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          {KPI_CARDS.map((card, idx) => (
            <motion.article
              key={card.id}
              data-testid={`kpi-card-${card.id}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: easeOutExpo,
              }}
              className="group relative flex min-h-[360px] sm:min-h-[390px] flex-col justify-between overflow-hidden rounded-[26px] border border-brandPurple/25 bg-[#0A0714] p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brandBlue/50 hover:shadow-[0_28px_64px_rgba(129,69,202,0.24)]"
            >
              {/* Subtle Architectural Grid Pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(129,69,202,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(129,69,202,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
              />
              {/* Radial Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0A0714_92%)]"
              />
              {/* Top Brand Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 left-1/2 h-40 w-4/5 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(129,69,202,0.32)_0%,rgba(20,172,243,0.12)_45%,transparent_72%)] transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Top Content: Number + Unit + Description */}
              <div className="relative z-10 text-left">
                <div className="font-display text-6xl sm:text-7xl font-black leading-none tracking-tight text-brand-gradient mb-3">
                  <AnimatedCounter
                    target={card.target}
                    inView={isInView}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
                <h3 className="font-display text-2xl sm:text-[26px] font-bold text-alabaster tracking-tight mb-3">
                  {card.unit[lang]}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-pewter max-w-[30ch]">
                  {card.description[lang]}
                </p>
              </div>

              {/* Bottom Icon Badge */}
              <div className="relative z-10 mt-8 flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brandPurple/40 bg-brandPurple/15 text-brandBlue shadow-[0_0_24px_rgba(129,69,202,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:border-brandBlue">
                  {card.icon}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/25">
                  0{idx + 1}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


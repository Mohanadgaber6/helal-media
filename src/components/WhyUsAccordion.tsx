"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Locale } from "@/data/types";
import { getCopy, WHY_CHOOSE_US_CARDS } from "@/data/content";
import { WhyUsIcon } from "./ServiceIcons";

export function WhyUsAccordion({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // All cards collapsed by default on both desktop and mobile per Section 3.5:
  // "In collapsed state show only short title + small animated icon. On click/tap/Enter/Space, smoothly reveal the full explanation; allow toggling closed."
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      data-testid="why-us-section"
      className="relative border-b border-white/[0.08] bg-obsidian py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mx-auto max-w-3xl text-center mb-14 sm:mb-20"
        >
          <h2
            className={`font-bold text-alabaster ${
              lang === "ar"
                ? "font-arabic text-3xl sm:text-5xl leading-[1.2]"
                : "font-display text-3xl sm:text-5xl leading-[1.1] tracking-tight"
            }`}
          >
            {copy.whyUs.heading}
          </h2>
        </motion.div>

        {/* Four Interactive Disclosure Cards — Horizontal 4-Card Row on Desktop */}
        <div
          data-testid="why-us-grid"
          className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch"
        >
          {WHY_CHOOSE_US_CARDS.map((card, idx) => {
            const isOpen = Boolean(openIds[card.id]);
            const panelId = `why-us-panel-${card.id}`;
            const buttonId = `why-us-button-${card.id}`;

            return (
              <motion.div
                key={card.id}
                data-testid={`why-us-card-${card.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: easeOutExpo,
                }}
                className={`group flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brandPurple/60 bg-slateStudio shadow-[0_16px_45px_rgba(0,0,0,0.65)]"
                    : "border-white/10 bg-carbon hover:border-brandBlue/40 hover:-translate-y-1"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCard(card.id)}
                    data-testid={`why-us-trigger-${card.id}`}
                    className="flex w-full flex-col items-start justify-between gap-5 px-6 py-6 sm:px-6 sm:py-7 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-2xl"
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs font-bold text-brand-gradient">
                        0{idx + 1}
                      </span>
                      <WhyUsIcon iconKey={card.iconKey} isOpen={isOpen} />
                    </div>

                    <span
                      className={`font-bold text-alabaster transition-colors group-hover:text-brandBlue leading-snug ${
                        lang === "ar"
                          ? "font-arabic text-xl sm:text-2xl"
                          : "font-display text-lg sm:text-xl"
                      }`}
                    >
                      {card.title[lang]}
                    </span>
                  </button>
                </h3>

                {/* Collapsible Explanation Region */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  data-testid={`why-us-panel-${card.id}`}
                  className={
                    isOpen
                      ? "px-6 pb-6 pt-3 border-t border-white/[0.08] animate-[fadeIn_0.25s_ease-out]"
                      : "hidden"
                  }
                >
                  <p className="text-sm sm:text-base leading-relaxed text-pewter">
                    {card.description[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

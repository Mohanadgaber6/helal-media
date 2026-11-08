"use client";

import React, { useState } from "react";
import { Locale } from "@/data/types";
import { getCopy, WHY_CHOOSE_US_CARDS } from "@/data/content";
import { WhyUsIcon } from "./ServiceIcons";

export function WhyUsAccordion({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
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
      className="relative border-b border-white/[0.08] bg-obsidian py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-20">
          <h2
            className={`font-bold text-alabaster ${
              lang === "ar"
                ? "font-arabic text-3xl sm:text-5xl leading-[1.2]"
                : "font-display text-3xl sm:text-5xl leading-[1.1] tracking-tight"
            }`}
          >
            {copy.whyUs.heading}
          </h2>
        </div>

        {/* Four Interactive Disclosure Cards */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:gap-5">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => {
            const isOpen = Boolean(openIds[card.id]);
            const panelId = `why-us-panel-${card.id}`;
            const buttonId = `why-us-button-${card.id}`;

            return (
              <div
                key={card.id}
                data-testid={`why-us-card-${card.id}`}
                className={`group rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brandPurple/60 bg-slateStudio shadow-[0_16px_45px_rgba(0,0,0,0.65)]"
                    : "border-white/10 bg-carbon hover:border-brandBlue/40"
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
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 sm:px-8 sm:py-7 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-2xl"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="font-mono text-xs font-bold text-brand-gradient">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-bold text-alabaster transition-colors group-hover:text-brandBlue ${
                          lang === "ar"
                            ? "font-arabic text-xl sm:text-2xl"
                            : "font-display text-xl sm:text-2xl"
                        }`}
                      >
                        {card.title[lang]}
                      </span>
                    </div>

                    <WhyUsIcon iconKey={card.iconKey} isOpen={isOpen} />
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
                      ? "px-6 pb-7 sm:px-8 sm:pb-8 pt-1 border-t border-white/[0.08] animate-[fadeIn_0.25s_ease-out]"
                      : "hidden"
                  }
                >
                  <p className="text-base sm:text-lg leading-relaxed text-pewter ps-0 sm:ps-9">
                    {card.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

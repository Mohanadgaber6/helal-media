"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { HelalLogo } from "./HelalLogo";

const SESSION_KEY = "helal_intro_seen_v1";

export function IntroOverlay({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore storage errors in restricted environments
    }
    setExiting(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 450);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      setVisible(false);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setVisible(true);

    const duration = prefersReducedMotion ? 500 : 1750;
    const timer = window.setTimeout(() => {
      dismiss();
    }, duration);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Helal Media Production Intro"
      data-testid="intro-overlay"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian px-6 text-center transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle brand-gradient ambient light reveal */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(129,69,202,0.18)_0%,rgba(20,172,243,0.08)_35%,transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Official Helal Media Production Vector Logo */}
        <div className="animate-[fadeInUp_0.55s_ease-out_forwards]">
          <HelalLogo size="xl" priority />
        </div>

        {/* Multicolor Brand Gradient Divider Line */}
        <span
          className="my-6 h-[2px] w-24 bg-brand-gradient rounded-full animate-[scaleIn_0.5s_0.15s_ease-out_both]"
          aria-hidden="true"
        />

        {/* Official Slogan — Smaller than brand logo */}
        <p
          dir="ltr"
          className="text-sm sm:text-lg md:text-xl uppercase tracking-[0.24em] text-brand-gradient font-bold animate-[fadeInUp_0.55s_0.2s_ease-out_both]"
        >
          Marketing Has No Catalog
        </p>

        {lang === "ar" && (
          <p
            dir="rtl"
            className="mt-2.5 text-sm sm:text-base text-pewter font-arabic animate-[fadeInUp_0.55s_0.28s_ease-out_both]"
          >
            {copy.intro.slogan}
          </p>
        )}
      </div>

      {/* Accessible Skip Control */}
      <button
        type="button"
        onClick={dismiss}
        data-testid="intro-skip-button"
        className="absolute bottom-8 right-8 z-20 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-alabaster/85 transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
      >
        {copy.intro.skip}
      </button>
    </div>
  );
}

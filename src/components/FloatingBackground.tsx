"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function FloatingBackground({
  variant = "hero",
}: {
  variant?: "hero" | "section";
}) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const ySlow = useTransform(
    scrollY,
    [0, 1200],
    prefersReducedMotion ? [0, 0] : [0, -55]
  );
  const yMedium = useTransform(
    scrollY,
    [0, 1200],
    prefersReducedMotion ? [0, 0] : [0, 40]
  );

  return (
    <div
      aria-hidden="true"
      data-testid={`floating-background-${variant}`}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Soft Ambient Brand Blur Glows Only (No Geometric Circles, Rings, or Triangles) */}
      <motion.div
        style={{ y: ySlow }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.35, 0.55, 0.35],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-[8%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[radial-gradient(circle,rgba(20,172,243,0.16)_0%,rgba(129,69,202,0.08)_45%,transparent_72%)] blur-3xl"
      />

      <motion.div
        style={{ y: yMedium }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.45, 0.25],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-[-4rem] left-[6%] h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[radial-gradient(circle,rgba(243,57,141,0.14)_0%,rgba(255,117,56,0.06)_48%,transparent_72%)] blur-3xl"
      />
    </div>
  );
}

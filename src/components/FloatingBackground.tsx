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

  // Conservative scroll parallax offsets (disabled when reduced motion is active)
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
      {/* Soft Ambient Brand Orbs */}
      <motion.div
        style={{ y: ySlow }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.5, 0.35],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-[8%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[radial-gradient(circle,rgba(20,172,243,0.16)_0%,rgba(129,69,202,0.08)_45%,transparent_72%)] blur-2xl"
      />

      <motion.div
        style={{ y: yMedium }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.25, 0.42, 0.25],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-[-4rem] left-[6%] h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[radial-gradient(circle,rgba(243,57,141,0.13)_0%,rgba(255,117,56,0.06)_48%,transparent_72%)] blur-2xl"
      />

      {/* Outlined Geometric Studio Ring — Top Right */}
      <motion.div
        style={{ y: ySlow }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -14, 0],
                rotate: [0, 18, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="hidden sm:block absolute top-14 right-[12%] lg:right-[15%] opacity-30"
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="70"
            cy="70"
            r="56"
            stroke="url(#helalRingGrad1)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle
            cx="70"
            cy="70"
            r="36"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <circle cx="70" cy="14" r="3" fill="#14ACF3" />
          <defs>
            <linearGradient
              id="helalRingGrad1"
              x1="0"
              y1="0"
              x2="140"
              y2="140"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#14ACF3" />
              <stop offset="50%" stopColor="#8145CA" />
              <stop offset="100%" stopColor="#F3398D" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Camera Viewfinder / Creative Framing Corner Bracket — Bottom Right */}
      {variant === "hero" && (
        <motion.div
          style={{ y: yMedium }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 12, 0],
                  x: [0, -8, 0],
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="hidden md:block absolute bottom-12 right-[7%] lg:right-[10%] opacity-35"
        >
          <svg
            width="120"
            height="88"
            viewBox="0 0 120 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Viewfinder corners */}
            <path
              d="M20 4H4V20M100 4H116V20M20 84H4V68M100 84H116V68"
              stroke="url(#helalFrameGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Center reticle crosshair */}
            <path
              d="M54 44H66M60 38V50"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="104" cy="16" r="2.5" fill="#F3398D" />
            <defs>
              <linearGradient
                id="helalFrameGrad"
                x1="4"
                y1="4"
                x2="116"
                y2="84"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#14ACF3" />
                <stop offset="50%" stopColor="#8145CA" />
                <stop offset="100%" stopColor="#FF7538" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Minimal Floating Geometric Diamond & Fine Line — Left Mid */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotate: [0, -12, 0],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="hidden lg:block absolute top-1/2 left-[3%] opacity-25"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="32"
            y="6"
            width="36"
            height="36"
            rx="6"
            transform="rotate(45 32 6)"
            stroke="rgba(20,172,243,0.55)"
            strokeWidth="1.2"
          />
          <circle cx="32" cy="32" r="3" fill="#8145CA" />
        </svg>
      </motion.div>
    </div>
  );
}


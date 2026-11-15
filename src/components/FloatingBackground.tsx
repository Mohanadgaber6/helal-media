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
    prefersReducedMotion ? [0, 0] : [0, -65]
  );
  const yMedium = useTransform(
    scrollY,
    [0, 1200],
    prefersReducedMotion ? [0, 0] : [0, 48]
  );

  return (
    <div
      aria-hidden="true"
      data-testid={`floating-background-${variant}`}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Vivid Ambient Brand Aurora Orbs */}
      <motion.div
        style={{ y: ySlow }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.18, 1],
                x: [0, 28, -16, 0],
                y: [0, -24, 14, 0],
                opacity: [0.45, 0.72, 0.45],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 right-[6%] h-72 w-72 sm:h-[26rem] sm:w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(20,172,243,0.24)_0%,rgba(129,69,202,0.14)_45%,transparent_72%)] blur-2xl"
      />

      <motion.div
        style={{ y: yMedium }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                x: [0, -24, 18, 0],
                y: [0, 20, -16, 0],
                opacity: [0.35, 0.62, 0.35],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-3rem] left-[4%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[radial-gradient(circle,rgba(243,57,141,0.22)_0%,rgba(255,117,56,0.12)_48%,transparent_72%)] blur-2xl"
      />

      {/* Rotating Studio Orbit Ring with Glowing Satellites — Top Right */}
      <motion.div
        style={{ y: ySlow }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -18, 0],
                rotate: [0, 360],
              }
        }
        transition={{
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 26, repeat: Infinity, ease: "linear" },
        }}
        className="hidden sm:block absolute top-10 right-[8%] lg:right-[11%] opacity-65"
      >
        <svg
          width="176"
          height="176"
          viewBox="0 0 176 176"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="88"
            cy="88"
            r="72"
            stroke="url(#helalRingGrad1)"
            strokeWidth="1.6"
            strokeDasharray="10 7"
          />
          <circle
            cx="88"
            cy="88"
            r="48"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <circle cx="88" cy="16" r="5" fill="#14ACF3" />
          <circle cx="160" cy="88" r="4" fill="#F3398D" />
          <circle cx="88" cy="160" r="4.5" fill="#FF7538" />
          <defs>
            <linearGradient
              id="helalRingGrad1"
              x1="0"
              y1="0"
              x2="176"
              y2="176"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#14ACF3" />
              <stop offset="50%" stopColor="#8145CA" />
              <stop offset="100%" stopColor="#F3398D" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Playful Floating Glassmorphic Studio Badges & Camera Viewfinder (Hero) */}
      {variant === "hero" && (
        <>
          {/* Floating Live Studio Production Pill */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -14, 0],
                    x: [0, 6, 0],
                    rotate: [-2, 2, -2],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden lg:flex items-center gap-2.5 absolute top-24 right-[6%] xl:right-[9%] rounded-2xl border border-brandBlue/35 bg-[#12121A]/85 px-4 py-2.5 shadow-[0_14px_35px_rgba(20,172,243,0.18)] backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPink opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brandPink" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-alabaster/90">
              REC 4K · STUDIO
            </span>
          </motion.div>

          {/* Floating Creative Strategy Badge + Viewfinder Frame — Bottom Right */}
          <motion.div
            style={{ y: yMedium }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    rotate: [1.5, -2, 1.5],
                  }
            }
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="hidden md:flex flex-col items-end gap-3 absolute bottom-24 right-[6%] lg:right-[9%]"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-brandPurple/40 bg-[#141122]/85 px-4 py-2 shadow-[0_14px_35px_rgba(129,69,202,0.22)] backdrop-blur-md">
              <span className="text-brandOrange text-sm animate-spin">✦</span>
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-brand-gradient">
                CREATIVE · MOTION · AI
              </span>
            </div>

            <svg
              width="136"
              height="96"
              viewBox="0 0 120 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-65"
            >
              <path
                d="M20 4H4V20M100 4H116V20M20 84H4V68M100 84H116V68"
                stroke="url(#helalFrameGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M52 44H68M60 36V52"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="104" cy="16" r="3.5" fill="#F3398D" />
              <circle cx="16" cy="72" r="3" fill="#14ACF3" />
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
        </>
      )}

      {/* Floating Geometric Diamond & Vector Bezier Curve — Left Mid */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -16, 0],
                rotate: [0, -18, 12, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="hidden lg:block absolute top-[42%] left-[2.5%] opacity-55"
      >
        <svg
          width="84"
          height="84"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="32"
            y="6"
            width="36"
            height="36"
            rx="8"
            transform="rotate(45 32 6)"
            stroke="url(#helalDiamondGrad)"
            strokeWidth="1.6"
          />
          <circle cx="32" cy="32" r="4" fill="#14ACF3" />
          <defs>
            <linearGradient
              id="helalDiamondGrad"
              x1="0"
              y1="0"
              x2="64"
              y2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#14ACF3" />
              <stop offset="50%" stopColor="#F3398D" />
              <stop offset="100%" stopColor="#FF7538" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Brand Sparkles across viewport */}
      <motion.span
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -12, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [0.85, 1.25, 0.85],
              }
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:inline-block absolute top-[22%] left-[48%] text-brandBlue text-lg"
      >
        ✦
      </motion.span>
      <motion.span
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 14, 0],
                opacity: [0.25, 0.85, 0.25],
                scale: [0.9, 1.3, 0.9],
              }
        }
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="hidden sm:inline-block absolute bottom-[26%] left-[38%] text-brandPink text-base"
      >
        ✦
      </motion.span>
    </div>
  );
}

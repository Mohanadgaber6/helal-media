"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function InteractiveMotionLayer() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      {/* Smooth Scroll Progress Bar at top of viewport */}
      <motion.div
        aria-hidden="true"
        data-testid="scroll-progress-bar"
        style={{ scaleX }}
        className="pointer-events-none fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-brand-gradient shadow-[0_0_16px_rgba(20,172,243,0.75)]"
      />

      {/* Interactive Cursor Ambient Spotlight (Desktop) */}
      {cursorPos && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 hidden lg:block transition-opacity duration-300"
          style={{
            background: `radial-gradient(520px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(20, 172, 243, 0.065), rgba(129, 69, 202, 0.045) 40%, transparent 75%)`,
          }}
        />
      )}
    </>
  );
}


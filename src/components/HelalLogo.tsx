import React from "react";

export interface HelalLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "symbol";
  className?: string;
  priority?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<HelalLogoProps["size"]>, string> = {
  sm: "h-8 sm:h-9 w-auto",
  md: "h-10 sm:h-11 w-auto",
  lg: "h-14 sm:h-16 w-auto",
  xl: "h-20 sm:h-28 md:h-32 w-auto",
};

/**
 * Official Helal Media Production Logo Component
 * Extracted directly from the official vector paths on Page 1 of 5-.pdf.
 * Includes the 5-piece multicolor gradient geometric symbol, TM mark,
 * bold white HELAL wordmark, and MEDIA PRODUCTION subtitle.
 * Always rendered LTR and never mirrored in Arabic (RTL).
 */
export function HelalLogo({
  size = "sm",
  variant = "full",
  className = "",
  priority = false,
}: HelalLogoProps) {
  const src =
    variant === "symbol" ? "/brand/helal-symbol.svg" : "/brand/helal-logo.svg";
  const width = variant === "symbol" ? 172 : 786;
  const height = variant === "symbol" ? 214 : 218;

  return (
    <span
      dir="ltr"
      data-testid={`helal-official-logo-${variant}`}
      className={`inline-flex items-center select-none [unicode-bidi:isolate] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Helal Media Production"
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`${SIZE_CLASSES[size]} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
      <span className="sr-only">Helal Media Production</span>
    </span>
  );
}


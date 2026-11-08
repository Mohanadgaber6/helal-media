import React, { useId } from "react";
import { ServiceItem, WhyChooseUsItem } from "@/data/types";

function BrandGradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14ACF3" />
        <stop offset="35%" stopColor="#8145CA" />
        <stop offset="68%" stopColor="#F3398D" />
        <stop offset="100%" stopColor="#FF7538" />
      </linearGradient>
    </defs>
  );
}

export function ServiceIcon({
  iconKey,
  className = "w-7 h-7",
}: {
  iconKey: ServiceItem["iconKey"];
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `helal_svc_grad_${iconKey}_${uid}`;
  const strokeUrl = `url(#${gradId})`;

  switch (iconKey) {
    case "branding":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <path
            d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle
            cx="16"
            cy="16"
            r="5"
            stroke={strokeUrl}
            strokeWidth="1.85"
          />
          <path
            d="M16 3V11M16 21V29M4 9.5L11.5 13.5M20.5 18.5L28 22.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "social-media":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <rect
            x="4"
            y="5"
            width="24"
            height="18"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M11 27L16 23L21 27"
            stroke={strokeUrl}
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="11.5" cy="14" r="2" fill="#14ACF3" />
          <circle cx="16" cy="14" r="2" fill="#F3398D" />
          <circle cx="20.5" cy="14" r="2" fill="#FF7538" />
        </svg>
      );
    case "content-strategy":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <path
            d="M6 8H26M6 16H20M6 24H15"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle
            cx="23"
            cy="21"
            r="5"
            stroke={strokeUrl}
            strokeWidth="1.85"
          />
          <path
            d="M21.5 21L22.8 22.3L25.2 19.7"
            stroke={strokeUrl}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "graphic-design":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <path
            d="M5 27L14 18M27 5L19 13L14 18L5 27Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="19"
            cy="13"
            r="6"
            stroke={strokeUrl}
            strokeWidth="1.85"
          />
          <rect
            x="5"
            y="5"
            width="8"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "media-production":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <rect
            x="3"
            y="8"
            width="20"
            height="16"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M23 13L29 9.5V22.5L23 19V13Z"
            stroke={strokeUrl}
            strokeWidth="1.85"
            strokeLinejoin="round"
          />
          <circle
            cx="13"
            cy="16"
            r="4"
            stroke={strokeUrl}
            strokeWidth="1.6"
          />
        </svg>
      );
    case "video-editing":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <rect
            x="4"
            y="6"
            width="24"
            height="20"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M4 11H28M4 21H28"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M14 13.5L19.5 16L14 18.5V13.5Z"
            fill={strokeUrl}
            stroke={strokeUrl}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "web-development":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <rect
            x="3"
            y="5"
            width="26"
            height="22"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path d="M3 11H29" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 16L9 19L12 22M20 16L23 19L20 22M17 15L15 23"
            stroke={strokeUrl}
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "paid-ads":
      return (
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <BrandGradientDefs id={gradId} />
          <path
            d="M5 24L12 16L17 20L27 9"
            stroke={strokeUrl}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 9H27V15"
            stroke={strokeUrl}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 27H27"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function WhyUsIcon({
  iconKey,
  isOpen,
}: {
  iconKey: WhyChooseUsItem["iconKey"];
  isOpen: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
        isOpen
          ? "border-brandBlue bg-brand-gradient text-alabaster rotate-45 shadow-brandGlow"
          : "border-white/15 bg-white/5 text-alabaster group-hover:border-brandBlue/60 group-hover:text-brandBlue"
      }`}
      aria-hidden="true"
    >
      {iconKey === "bespoke" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {iconKey === "roof" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M3 11L12 4L21 11M5 9.5V20H19V9.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {iconKey === "discovery" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M16 16L20.5 20.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
      {iconKey === "action" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

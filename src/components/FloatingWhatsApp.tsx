"use client";

import React from "react";
import { Locale } from "@/data/types";
import { BUSINESS_CONFIG, getCopy } from "@/data/content";

export function FloatingWhatsApp({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const primaryWhatsAppPhone = BUSINESS_CONFIG.phones.find(
    (p) => p.hasWhatsApp && p.whatsappHref
  );
  const whatsappHref =
    BUSINESS_CONFIG.whatsappUrl ||
    primaryWhatsAppPhone?.whatsappHref ||
    "https://wa.me/201055515576";

  const isRtl = lang === "ar";

  return (
    <div
      data-testid="floating-whatsapp-container"
      className={`fixed bottom-5 sm:bottom-6 z-40 pointer-events-none ${
        isRtl ? "left-5 sm:left-6" : "right-5 sm:right-6"
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.floatingWhatsapp.ariaLabel}
        data-testid="floating-whatsapp-button"
        className="group pointer-events-auto relative inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-full"
      >
        {/* Tooltip pill that reveals smoothly on hover/focus on desktop */}
        <span
          className={`hidden sm:inline-flex items-center rounded-full border border-white/15 bg-obsidian/90 px-3.5 py-1.5 text-xs font-semibold text-alabaster shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 ${
            isRtl ? "order-2" : "order-1"
          }`}
        >
          {copy.floatingWhatsapp.tooltip}
        </span>

        {/* Polished Circular WhatsApp Button */}
        <span
          className={`relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#25D366]/45 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_34px_rgba(37,211,102,0.52)] active:scale-95 ${
            isRtl ? "order-1" : "order-2"
          }`}
          style={{ width: "3.35rem", height: "3.35rem" }}
        >
          {/* Subtle ambient ring */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-0"
          />

          {/* Official WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:rotate-6"
          >
            <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.011L2 22l5.122-1.343a9.97 9.97 0 0 0 4.909 1.292h.004c5.522 0 10.007-4.485 10.007-10.008 0-2.674-1.041-5.188-2.932-7.079A9.946 9.946 0 0 0 12.031 2zm0 18.293h-.003a8.29 8.29 0 0 1-4.228-1.158l-.303-.18-3.039.797.811-2.963-.197-.314a8.279 8.279 0 0 1-1.274-4.415c0-4.576 3.723-8.299 8.303-8.299 2.217 0 4.301.864 5.869 2.432a8.248 8.248 0 0 1 2.431 5.869c0 4.577-3.724 8.301-8.37 8.231zm4.553-6.212c-.249-.125-1.476-.729-1.705-.812-.229-.083-.395-.125-.562.125-.166.25-.644.812-.79.979-.146.166-.291.187-.541.062-.249-.125-1.053-.388-2.006-1.238-.742-.661-1.242-1.479-1.388-1.729-.146-.25-.015-.385.11-.509.112-.112.25-.291.374-.437.125-.146.166-.25.25-.416.083-.167.042-.312-.021-.437-.062-.125-.561-1.353-.769-1.853-.203-.487-.409-.421-.562-.429-.145-.007-.312-.009-.478-.009s-.437.062-.665.312c-.229.25-.873.854-.873 2.082s.894 2.415 1.019 2.582c.125.166 1.759 2.686 4.262 3.766.595.257 1.06.41 1.422.525.598.19 1.142.163 1.572.099.48-.072 1.476-.604 1.684-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.478-.291z" />
          </svg>
        </span>
      </a>
    </div>
  );
}


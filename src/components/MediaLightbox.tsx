"use client";

import React, { useEffect } from "react";
import { Locale, MediaAssetRecord } from "@/data/types";
import { getCopy } from "@/data/content";

export function MediaLightbox({
  lang,
  assets,
  currentIndex,
  clientName,
  credit,
  onClose,
  onPrev,
  onNext,
}: {
  lang: Locale;
  assets: MediaAssetRecord[];
  currentIndex: number;
  clientName: string;
  credit: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const copy = getCopy(lang);
  const current = assets[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${clientName} — Artwork ${currentIndex + 1} of ${assets.length}`}
      data-testid="media-lightbox"
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between gap-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <span
            dir="ltr"
            className="font-display text-base sm:text-lg font-bold text-alabaster [unicode-bidi:isolate]"
          >
            {clientName}
          </span>
          <span className="text-xs text-pewter">
            {credit} · {currentIndex + 1} / {assets.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={copy.designsPage.lightboxClose}
          data-testid="lightbox-close-button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-alabaster transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ✕
        </button>
      </div>

      {/* Main Artwork Viewport — object-contain so logos/artwork are NEVER destructively cropped */}
      <div
        className="relative my-auto flex max-h-[78vh] w-full items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {current.status === "verified" && current.localPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.localPath}
            alt={`${clientName} — Design ${currentIndex + 1}`}
            className="max-h-[76vh] max-w-full w-auto h-auto object-contain rounded-xl border border-white/10 shadow-2xl"
          />
        ) : (
          <div className="flex h-64 w-96 flex-col items-center justify-center rounded-2xl border border-white/15 bg-slateStudio p-6 text-center">
            <p className="font-display text-base font-bold text-alabaster mb-1">
              {clientName} · 0{currentIndex + 1}
            </p>
            <p className="text-sm font-semibold text-brand-gradient">
              {copy.designsPage.missingMediaPlaceholder}
            </p>
            <p className="mt-2 font-mono text-xs text-pewter break-all">
              Drive ID: {current.driveFileId}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div
        className="flex items-center justify-center gap-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onPrev}
          aria-label={copy.designsPage.lightboxPrev}
          data-testid="lightbox-prev-button"
          className="inline-flex h-11 px-5 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-alabaster transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          ←
        </button>
        <span className="font-mono text-xs text-pewter">
          {currentIndex + 1} / {assets.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label={copy.designsPage.lightboxNext}
          data-testid="lightbox-next-button"
          className="inline-flex h-11 px-5 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-alabaster transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          →
        </button>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  DesignClientCaseStudy,
  DesignShowcaseBox,
  Locale,
  MediaAssetRecord,
} from "@/data/types";
import {
  DESIGN_CLIENTS,
  DESIGN_SHOWCASE_BOXES,
  getCopy,
} from "@/data/content";
import { getMediaAssetsByIds } from "@/data/media";
import { CollectionHero } from "./CollectionHero";
import { MediaLightbox } from "./MediaLightbox";
import { FinalCTA } from "./FinalCTA";

export function DesignClientShowcase({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const [lightboxState, setLightboxState] = useState<{
    title: string;
    credit: string;
    assets: MediaAssetRecord[];
    index: number;
  } | null>(null);

  return (
    <div
      data-testid="designs-collection-page"
      className="bg-obsidian text-alabaster"
    >
      <CollectionHero
        lang={lang}
        eyebrow={copy.designsPage.eyebrow}
        headline={copy.designsPage.headline}
        supportingCopy={copy.designsPage.supportingSentence}
        overviewLabel={copy.designsPage.overviewLabel}
        overviewCopy={copy.designsPage.overviewCopy}
        inThisCollection={copy.designsPage.inThisCollection}
      />

      {/* =====================================================================
          5 Interactive Curated Design Showcase Boxes (34 Designs Total)
          Modeled on https://naeladvertising.ae/web-design/ per Google Doc Item 12
         ===================================================================== */}
      <div
        data-testid="designs-interactive-showcases"
        className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-20 lg:px-8 space-y-20 sm:space-y-28"
      >
        {DESIGN_SHOWCASE_BOXES.map((box, boxIdx) => {
          const boxAssets = getMediaAssetsByIds(box.assetIds);
          return (
            <InteractiveDesignBox
              key={box.id}
              box={box}
              boxIndex={boxIdx}
              assets={boxAssets}
              lang={lang}
              onOpenLightbox={(index) =>
                setLightboxState({
                  title: box.title,
                  credit: "Helal Media Production — Creative Team",
                  assets: boxAssets,
                  index,
                })
              }
            />
          );
        })}
      </div>

      {/* =====================================================================
          Client-by-Client Case Study Storytelling Sections (5 Named Clients)
         ===================================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 space-y-28 sm:space-y-36 border-t border-white/10">
        {DESIGN_CLIENTS.map((client: DesignClientCaseStudy, clientIdx) => {
          const assets = getMediaAssetsByIds(client.assetIds);
          const leadAsset = assets[0];
          const remainingAssets = assets.slice(1);
          const chips = client.categoryChips[lang];

          return (
            <motion.section
              key={client.id}
              id={client.slug}
              data-testid={`design-client-section-${client.slug}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative scroll-mt-24 border-b border-white/10 pb-24 sm:pb-32 last:border-b-0 last:pb-8"
            >
              {/* Client Editorial Header Row */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
                <div className="lg:col-span-7 space-y-4">
                  {/* Index + Rectangular Category Chips */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gradient me-2">
                      0{clientIdx + 1}
                    </span>
                    <span
                      data-testid={`client-chip-industry-${client.slug}`}
                      className="inline-block rounded-md border border-brandBlue/40 bg-brand-gradient-subtle px-3.5 py-1 text-xs font-semibold tracking-wider text-brandBlue"
                    >
                      {chips[0]}
                    </span>
                    <span
                      data-testid={`client-chip-type-${client.slug}`}
                      className="inline-block rounded-md border border-white/20 bg-white/[0.05] px-3.5 py-1 text-xs font-semibold tracking-wider text-alabaster/90"
                    >
                      {chips[1]}
                    </span>
                  </div>

                  {/* Exact Client/Brand Name in Prominent Type */}
                  <h3
                    dir="ltr"
                    data-testid={`client-name-${client.slug}`}
                    className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-alabaster [unicode-bidi:isolate] text-start"
                  >
                    {client.name}
                  </h3>

                  {/* Exact Short Description */}
                  <p
                    data-testid={`client-description-${client.slug}`}
                    className="max-w-2xl text-base sm:text-xl leading-relaxed text-pewter"
                  >
                    {client.description[lang]}
                  </p>
                </div>

                {/* Designer Credit in Thin Readable Typography: Designed By / <name> */}
                <div className="lg:col-span-5 flex lg:justify-end">
                  <div
                    data-testid={`client-credit-${client.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slateStudio px-4 py-2.5 text-xs sm:text-sm font-light tracking-wide text-alabaster/85"
                  >
                    <span>{client.creditPrefix[lang]}</span>
                    <span
                      dir="ltr"
                      className="font-semibold text-brand-gradient [unicode-bidi:isolate]"
                    >
                      {client.designerName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Hero Visual (Asset #1) + Asymmetrical Editorial Gallery (Remaining 3 or 4 Assets) */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
                {/* Lead Hero Visual (Occupies 7 columns on Desktop) */}
                {leadAsset && (
                  <div className="lg:col-span-7">
                    <DesignAssetCard
                      asset={leadAsset}
                      clientName={client.name}
                      index={0}
                      isLead={true}
                      lang={lang}
                      onOpen={() =>
                        setLightboxState({
                          title: client.name,
                          credit: client.creditFull[lang],
                          assets,
                          index: 0,
                        })
                      }
                    />
                  </div>
                )}

                {/* Asymmetrical Editorial Gallery for Remaining Assets */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {remainingAssets.map((asset, idx) => {
                    const actualIndex = idx + 1;
                    const spanFullInSubgrid =
                      remainingAssets.length === 3 && idx === 0;

                    return (
                      <div
                        key={asset.id}
                        className={
                          spanFullInSubgrid ? "sm:col-span-2" : "sm:col-span-1"
                        }
                      >
                        <DesignAssetCard
                          asset={asset}
                          clientName={client.name}
                          index={actualIndex}
                          isLead={false}
                          lang={lang}
                          onOpen={() =>
                            setLightboxState({
                              title: client.name,
                              credit: client.creditFull[lang],
                              assets,
                              index: actualIndex,
                            })
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxState && (
        <MediaLightbox
          lang={lang}
          assets={lightboxState.assets}
          currentIndex={lightboxState.index}
          clientName={lightboxState.title}
          credit={lightboxState.credit}
          onClose={() => setLightboxState(null)}
          onPrev={() =>
            setLightboxState((prev) =>
              prev
                ? {
                    ...prev,
                    index:
                      (prev.index - 1 + prev.assets.length) %
                      prev.assets.length,
                  }
                : null
            )
          }
          onNext={() =>
            setLightboxState((prev) =>
              prev
                ? {
                    ...prev,
                    index: (prev.index + 1) % prev.assets.length,
                  }
                : null
            )
          }
        />
      )}

      <FinalCTA lang={lang} />
    </div>
  );
}

/**
 * Interactive Framed Showcase Box (Modeled on https://naeladvertising.ae/web-design/)
 * Supports:
 * - 3D Concave Arc Carousel ("arc-3d" for Box 1: BY OUR TEAM)
 * - Expand-on-Hover / Click Interactive Strip ("expand-strip" for Box 2)
 * - Fanned 3D Stack ("fan-stack" for Box 3)
 * - Focus-to-Center Carousel ("focus-carousel" for Box 4)
 * - Interactive Framed Showcase ("film-strip" for Box 5)
 * All boxes feature Left/Right navigation arrows, pagination dots, pointer drag/swipe, and Lightbox preview.
 */
function InteractiveDesignBox({
  box,
  boxIndex,
  assets,
  onOpenLightbox,
}: {
  box: DesignShowcaseBox;
  boxIndex: number;
  assets: MediaAssetRecord[];
  lang: Locale;
  onOpenLightbox: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const total = assets.length || 1;

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Compute circular offset in [-total/2, total/2]
  const getSignedOffset = (idx: number) => {
    let diff = idx - activeIndex;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  return (
    <section
      dir="ltr"
      data-testid={`design-showcase-box-${boxIndex + 1}`}
      className="relative overflow-hidden rounded-[28px] border border-brandPurple/25 bg-[#090612] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 shadow-[0_24px_80px_rgba(0,0,0,0.75)]"
    >
      {/* Top & Center Ambient Studio Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_55%,rgba(129,69,202,0.18)_0%,rgba(20,172,243,0.06)_48%,transparent_75%)]"
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-3xl text-center mb-10 sm:mb-14">
        {boxIndex === 0 ? (
          <>
            <span
              data-testid="showcase-box-1-eyebrow"
              className="inline-block rounded-full border border-brandPurple/40 bg-brandPurple/15 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.22em] text-brandBlue mb-4"
            >
              BY OUR TEAM
            </span>
            <h2
              data-testid="showcase-box-1-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-alabaster leading-[1.15]"
            >
              {box.subtitle}
            </h2>
          </>
        ) : (
          <>
            {box.eyebrow && (
              <span className="inline-block rounded-full border border-brandBlue/35 bg-brand-gradient-subtle px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brandBlue mb-3">
                {box.eyebrow}
              </span>
            )}
            <h2
              data-testid={`showcase-box-${boxIndex + 1}-heading`}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-alabaster leading-[1.2]"
            >
              {box.title}
            </h2>
          </>
        )}
      </div>

      {/* Interactive Stage: Variant-Specific 3D / Expanding Motion */}
      {box.variant === "expand-strip" ? (
        /* Variant 2: Expand-on-Hover / Click Horizontal Accordion Strip (like .fec-section on naeladvertising.ae/web-design/) */
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative z-10 mx-auto flex h-[340px] sm:h-[420px] max-w-6xl items-stretch gap-2.5 sm:gap-3.5 overflow-x-auto sm:overflow-hidden pb-2 select-none"
        >
          {assets.map((asset, idx) => {
            const isSelected = idx === activeIndex;
            const imgSrc = asset.localPath || "/brand/helal-symbol.svg";
            return (
              <div
                key={asset.id}
                data-testid={`showcase-card-${asset.id}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  if (isSelected) onOpenLightbox(idx);
                  else setActiveIndex(idx);
                }}
                style={{
                  flex: isSelected ? "3.2 1 0%" : "1 1 0%",
                }}
                className={`group relative min-w-[90px] sm:min-w-[64px] cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isSelected
                    ? "border-brandBlue/70 shadow-[0_20px_50px_rgba(129,69,202,0.4)]"
                    : "border-white/10 opacity-65 hover:opacity-90"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`${box.title} — Design ${idx + 1}`}
                  loading={boxIndex === 0 && idx < 3 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/15">
                    0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      View Full ⤢
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3D Concave Arc / Fan Stack / Focus Carousel Stage (like .fa-section / .ffc-section / .fag-section) */
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          style={{ perspective: "1100px" }}
          className="relative z-10 mx-auto h-[340px] sm:h-[430px] w-full max-w-5xl select-none cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        >
          {assets.map((asset, idx) => {
            const offset = getSignedOffset(idx);
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 3;

            // Compute 3D transform based on box.variant
            let translateX = offset * 175;
            let translateY = absOffset * absOffset * 8;
            let translateZ = -absOffset * 95;
            let rotateY = offset * -14;
            let rotateZ = 0;
            let scale = Math.max(0.68, 1 - absOffset * 0.11);

            if (box.variant === "fan-stack") {
              translateX = offset * 145;
              translateY = absOffset * 16;
              rotateY = offset * -6;
              rotateZ = offset * 4.5;
            } else if (box.variant === "focus-carousel") {
              translateX = offset * 195;
              translateY = 0;
              rotateY = offset * -8;
              scale = offset === 0 ? 1.04 : Math.max(0.74, 0.88 - absOffset * 0.08);
            } else if (box.variant === "film-strip") {
              translateX = offset * 210;
              translateY = absOffset * 6;
              rotateY = offset * -10;
            }

            const imgSrc = asset.localPath || "/brand/helal-symbol.svg";

            return (
              <div
                key={asset.id}
                data-testid={`showcase-card-${asset.id}`}
                onClick={() => {
                  if (offset === 0) onOpenLightbox(idx);
                  else setActiveIndex(idx);
                }}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex: 20 - absOffset * 3,
                  opacity: isVisible ? Math.max(0.25, 1 - absOffset * 0.25) : 0,
                  filter:
                    box.variant === "focus-carousel" && absOffset > 0
                      ? `blur(${Math.min(4, absOffset * 1.5)}px)`
                      : "none",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className={`group absolute w-[220px] sm:w-[290px] aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  offset === 0
                    ? "border-brandBlue/75 shadow-[0_24px_65px_rgba(129,69,202,0.5)]"
                    : "border-white/15 shadow-[0_14px_35px_rgba(0,0,0,0.65)] hover:border-brandPurple/50"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`${box.title} — Design ${idx + 1}`}
                  loading={boxIndex === 0 && idx < 3 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover object-center bg-carbon"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                  <span className="rounded-full bg-black/65 backdrop-blur-md px-2.5 py-1 border border-white/15">
                    0{idx + 1} / 0{total}
                  </span>
                  {offset === 0 && (
                    <span className="rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Expand ⤢
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Controls: Prev Arrow + Pagination Dots + Next Arrow + Drag Hint */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous design"
            data-testid={`showcase-prev-${boxIndex + 1}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brandPurple/40 bg-brandPurple/15 text-alabaster transition-all duration-200 hover:scale-105 hover:border-brandBlue hover:bg-brandPurple/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {assets.map((asset, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to design ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-brand-gradient shadow-[0_0_10px_rgba(20,172,243,0.6)]"
                      : "w-2 bg-white/25 hover:bg-white/45"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next design"
            data-testid={`showcase-next-${boxIndex + 1}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brandPurple/40 bg-brandPurple/15 text-alabaster transition-all duration-200 hover:scale-105 hover:border-brandBlue hover:bg-brandPurple/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-pewter/75">
          Drag or swipe to explore
        </p>
      </div>
    </section>
  );
}

function DesignAssetCard({
  asset,
  clientName,
  index,
  isLead,
  lang,
  onOpen,
}: {
  asset: MediaAssetRecord;
  clientName: string;
  index: number;
  isLead: boolean;
  lang: Locale;
  onOpen: () => void;
}) {
  const copy = getCopy(lang);
  const [imgError, setImgError] = useState(false);
  const isAvailable =
    asset.status === "verified" && Boolean(asset.localPath) && !imgError;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${clientName} — ${copy.designsPage.expandImageAria} ${
        index + 1
      }`}
      data-testid={`design-asset-card-${asset.id}`}
      data-client={asset.groupSlug}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-slateStudio text-start transition-all duration-300 hover:border-brandBlue/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
    >
      {isAvailable ? (
        <div
          className={`relative w-full overflow-hidden bg-carbon flex items-center justify-center ${
            isLead ? "p-3 sm:p-5" : "p-2 sm:p-3"
          }`}
        >
          {/* Preserves original artwork aspect ratio without destructive cropping */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.localPath!}
            alt={`${clientName} social media creative ${index + 1}`}
            width={asset.width || 1080}
            height={asset.height || 1080}
            loading={isLead && index === 0 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
            className="w-full h-auto max-h-[640px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Subtle expand badge on hover */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-alabaster opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <span>⤢</span>
            <span>0{index + 1}</span>
          </span>
        </div>
      ) : (
        <div
          data-testid={`missing-media-${asset.id}`}
          className={`flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-slateStudio to-carbon ${
            isLead ? "min-h-[380px] sm:min-h-[460px]" : "min-h-[240px]"
          }`}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/helal-symbol.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-auto opacity-80"
            />
          </div>
          <span className="font-display text-sm sm:text-base font-bold text-alabaster">
            {clientName} · 0{index + 1}
          </span>
          <span className="mt-1.5 max-w-xs text-xs font-medium text-brand-gradient">
            {copy.designsPage.missingMediaPlaceholder}
          </span>
          <span className="mt-2 font-mono text-[11px] text-pewter/70">
            Drive ID: {asset.driveFileId.slice(0, 12)}… (HTTP 401 Restricted)
          </span>
        </div>
      )}
    </button>
  );
}

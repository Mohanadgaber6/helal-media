"use client";

import React, { useState } from "react";
import { DesignClientCaseStudy, Locale, MediaAssetRecord } from "@/data/types";
import { DESIGN_CLIENTS, getCopy } from "@/data/content";
import { getMediaAssetsByIds } from "@/data/media";
import { CollectionHero } from "./CollectionHero";
import { MediaLightbox } from "./MediaLightbox";
import { FinalCTA } from "./FinalCTA";

export function DesignClientShowcase({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const [lightboxState, setLightboxState] = useState<{
    client: DesignClientCaseStudy;
    assets: MediaAssetRecord[];
    index: number;
  } | null>(null);

  return (
    <div data-testid="designs-collection-page" className="bg-obsidian text-alabaster">
      <CollectionHero
        lang={lang}
        eyebrow={copy.designsPage.eyebrow}
        headline={copy.designsPage.headline}
        supportingCopy={copy.designsPage.supportingSentence}
        overviewLabel={copy.designsPage.overviewLabel}
        overviewCopy={copy.designsPage.overviewCopy}
        inThisCollection={copy.designsPage.inThisCollection}
      />

      {/* Client-by-Client Case Study Storytelling Sections */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 space-y-28 sm:space-y-36">
        {DESIGN_CLIENTS.map((client, clientIdx) => {
          const assets = getMediaAssetsByIds(client.assetIds);
          const leadAsset = assets[0];
          const remainingAssets = assets.slice(1);
          const chips = client.categoryChips[lang];

          return (
            <section
              key={client.id}
              id={client.slug}
              data-testid={`design-client-section-${client.slug}`}
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
                        setLightboxState({ client, assets, index: 0 })
                      }
                    />
                  </div>
                )}

                {/* Asymmetrical Editorial Gallery for Remaining Assets (Occupies 5 columns in a 2-column staggered subgrid) */}
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
                              client,
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
            </section>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxState && (
        <MediaLightbox
          lang={lang}
          assets={lightboxState.assets}
          currentIndex={lightboxState.index}
          clientName={lightboxState.client.name}
          credit={lightboxState.client.creditFull[lang]}
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

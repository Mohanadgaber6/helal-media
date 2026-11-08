"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale, MediaAssetRecord, WebsiteCaseStudy } from "@/data/types";
import { getCopy, WEBSITE_PROJECTS } from "@/data/content";
import { getMediaAssetsByIds } from "@/data/media";
import { CollectionHero } from "./CollectionHero";
import { MediaLightbox } from "./MediaLightbox";
import { FinalCTA } from "./FinalCTA";

export function WebsitesCollection({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const projects = WEBSITE_PROJECTS;
  const [lightboxState, setLightboxState] = useState<{
    project: WebsiteCaseStudy;
    assets: MediaAssetRecord[];
    index: number;
  } | null>(null);

  return (
    <div
      data-testid="websites-collection-page"
      className="bg-obsidian text-alabaster"
    >
      <CollectionHero
        lang={lang}
        eyebrow={copy.websitesPage.eyebrow}
        headline={copy.websitesPage.headline}
        supportingCopy={copy.websitesPage.supportingCopy}
        extraTag={copy.websitesPage.tag}
        overviewLabel={copy.websitesPage.overviewLabel}
        overviewCopy={copy.websitesPage.overviewCopy}
        inThisCollection={copy.websitesPage.inThisCollection}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {projects.length > 0 ? (
          <div className="space-y-28 sm:space-y-36">
            {projects.map((project, idx) => {
              const assets = getMediaAssetsByIds(project.assetIds);
              return (
                <WebsiteProjectSection
                  key={project.id}
                  project={project}
                  assets={assets}
                  index={idx}
                  lang={lang}
                  onOpenLightbox={(assetIndex) =>
                    setLightboxState({
                      project,
                      assets,
                      index: assetIndex,
                    })
                  }
                />
              );
            })}
          </div>
        ) : (
          <div
            data-testid="websites-honest-empty-state"
            className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-slateStudio to-carbon p-8 sm:p-14 lg:p-20 text-center"
          >
            <span className="inline-block rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brandBlue mb-4">
              {copy.websitesPage.tag}
            </span>
            <h3 className="mx-auto max-w-2xl font-display text-2xl sm:text-4xl font-bold text-alabaster mb-4">
              {copy.websitesPage.emptyStateTitle}
            </h3>
            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-pewter mb-9">
              {copy.websitesPage.emptyStateBody}
            </p>
            <Link
              href={`/${lang}/contact`}
              data-testid="websites-empty-state-cta"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-gradient px-8 py-4 text-sm sm:text-base font-bold text-alabaster shadow-brandGlow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
            >
              <span>{copy.websitesPage.emptyStateCta}</span>
              <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Interactive Full-Resolution Screenshot Lightbox */}
      {lightboxState && (
        <MediaLightbox
          lang={lang}
          assets={lightboxState.assets}
          currentIndex={lightboxState.index}
          clientName={
            lang === "ar" && lightboxState.project.arabicName
              ? `${lightboxState.project.arabicName} (${lightboxState.project.name})`
              : lightboxState.project.name
          }
          credit={lightboxState.project.categoryChips[lang][1]}
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

function WebsiteProjectSection({
  project,
  assets,
  index,
  lang,
  onOpenLightbox,
}: {
  project: WebsiteCaseStudy;
  assets: MediaAssetRecord[];
  index: number;
  lang: Locale;
  onOpenLightbox: (assetIndex: number) => void;
}) {
  const copy = getCopy(lang);
  const chips = project.categoryChips[lang];
  const leadAsset = assets[0];
  const supportingAssets = assets.slice(1);
  const displayName =
    lang === "ar" && project.arabicName
      ? `${project.arabicName} — ${project.name}`
      : project.arabicName
      ? `${project.name} (${project.arabicName})`
      : project.name;

  return (
    <section
      id={project.slug}
      data-testid={`website-project-section-${project.slug}`}
      className="relative scroll-mt-24 border-b border-white/10 pb-24 sm:pb-32 last:border-b-0 last:pb-8"
    >
      {/* Editorial Header Row (unless using split-editorial where header sits beside the lead screen) */}
      {project.layoutVariant !== "split-editorial" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gradient me-2">
                {project.folderNumber}
              </span>
              <span
                data-testid={`website-chip-industry-${project.slug}`}
                className="inline-block rounded-md border border-brandBlue/40 bg-brand-gradient-subtle px-3.5 py-1 text-xs font-semibold tracking-wider text-brandBlue"
              >
                {chips[0]}
              </span>
              <span
                data-testid={`website-chip-service-${project.slug}`}
                className="inline-block rounded-md border border-white/20 bg-white/[0.05] px-3.5 py-1 text-xs font-semibold tracking-wider text-alabaster/90"
              >
                {chips[1]}
              </span>
            </div>

            <h3
              dir="ltr"
              data-testid={`website-name-${project.slug}`}
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-alabaster [unicode-bidi:isolate] text-start"
            >
              {displayName}
            </h3>

            <p
              data-testid={`website-description-${project.slug}`}
              className="max-w-3xl text-base sm:text-xl leading-relaxed text-pewter"
            >
              {project.description[lang]}
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end items-center gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-slateStudio px-4 py-2.5 text-xs sm:text-sm font-mono text-pewter">
              <span className="h-2 w-2 rounded-full bg-brand-gradient" />
              <span>
                {assets.length}{" "}
                {lang === "ar" ? "واجهات تفاعلية" : "Interface Screens"}
              </span>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-alabaster shadow-brandGlow transition hover:brightness-110"
              >
                <span>{copy.websitesPage.visitSite}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* LAYOUT 1: Hero Browser Mockup + Balanced Multi-Row Supporting Grid (AutoParts — 6 screens) */}
      {project.layoutVariant === "hero-plus-grid" && (
        <div className="space-y-8">
          {leadAsset && (
            <BrowserMockupCard
              asset={leadAsset}
              projectName={project.name}
              screenIndex={0}
              totalScreens={assets.length}
              isLead={true}
              lang={lang}
              onOpen={() => onOpenLightbox(0)}
            />
          )}

          {supportingAssets.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {supportingAssets.slice(0, 2).map((asset, idx) => (
                  <BrowserMockupCard
                    key={asset.id}
                    asset={asset}
                    projectName={project.name}
                    screenIndex={idx + 1}
                    totalScreens={assets.length}
                    isLead={false}
                    lang={lang}
                    onOpen={() => onOpenLightbox(idx + 1)}
                  />
                ))}
              </div>
              {supportingAssets.length > 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportingAssets.slice(2).map((asset, idx) => (
                    <BrowserMockupCard
                      key={asset.id}
                      asset={asset}
                      projectName={project.name}
                      screenIndex={idx + 3}
                      totalScreens={assets.length}
                      isLead={false}
                      lang={lang}
                      onOpen={() => onOpenLightbox(idx + 3)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* LAYOUT 2: Split Editorial Header Beside Lead Screen + 3-Column Operations Grid (FitTrack — 7 screens) */}
      {project.layoutVariant === "split-editorial" && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gradient me-2">
                  {project.folderNumber}
                </span>
                <span
                  data-testid={`website-chip-industry-${project.slug}`}
                  className="inline-block rounded-md border border-brandBlue/40 bg-brand-gradient-subtle px-3.5 py-1 text-xs font-semibold tracking-wider text-brandBlue"
                >
                  {chips[0]}
                </span>
                <span
                  data-testid={`website-chip-service-${project.slug}`}
                  className="inline-block rounded-md border border-white/20 bg-white/[0.05] px-3.5 py-1 text-xs font-semibold tracking-wider text-alabaster/90"
                >
                  {chips[1]}
                </span>
              </div>

              <h3
                dir="ltr"
                data-testid={`website-name-${project.slug}`}
                className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-alabaster [unicode-bidi:isolate] text-start"
              >
                {displayName}
              </h3>

              <p
                data-testid={`website-description-${project.slug}`}
                className="text-base sm:text-lg leading-relaxed text-pewter"
              >
                {project.description[lang]}
              </p>

              <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-slateStudio px-4 py-2.5 text-xs sm:text-sm font-mono text-pewter">
                <span className="h-2 w-2 rounded-full bg-brand-gradient" />
                <span>
                  {assets.length}{" "}
                  {lang === "ar" ? "واجهات تفاعلية" : "Interface Screens"}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              {leadAsset && (
                <BrowserMockupCard
                  asset={leadAsset}
                  projectName={project.name}
                  screenIndex={0}
                  totalScreens={assets.length}
                  isLead={true}
                  lang={lang}
                  onOpen={() => onOpenLightbox(0)}
                />
              )}
            </div>
          </div>

          {supportingAssets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {supportingAssets.map((asset, idx) => (
                <BrowserMockupCard
                  key={asset.id}
                  asset={asset}
                  projectName={project.name}
                  screenIndex={idx + 1}
                  totalScreens={assets.length}
                  isLead={false}
                  lang={lang}
                  onOpen={() => onOpenLightbox(idx + 1)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* LAYOUT 3: Wide Dual-Screen Editorial Presentation (Awfa Smart E-Services — 2 screens) */}
      {project.layoutVariant === "dual-showcase" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {leadAsset && (
            <div className="lg:col-span-7">
              <BrowserMockupCard
                asset={leadAsset}
                projectName={project.name}
                screenIndex={0}
                totalScreens={assets.length}
                isLead={true}
                lang={lang}
                onOpen={() => onOpenLightbox(0)}
              />
            </div>
          )}
          {supportingAssets[0] && (
            <div className="lg:col-span-5 lg:mt-12">
              <BrowserMockupCard
                asset={supportingAssets[0]}
                projectName={project.name}
                screenIndex={1}
                totalScreens={assets.length}
                isLead={true}
                lang={lang}
                onOpen={() => onOpenLightbox(1)}
              />
            </div>
          )}
        </div>
      )}

      {/* LAYOUT 4: Asymmetric Editorial Mosaic (Yadawy — 5 screens) */}
      {project.layoutVariant === "asymmetric-mosaic" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {leadAsset && (
              <div className="lg:col-span-8">
                <BrowserMockupCard
                  asset={leadAsset}
                  projectName={project.name}
                  screenIndex={0}
                  totalScreens={assets.length}
                  isLead={true}
                  lang={lang}
                  onOpen={() => onOpenLightbox(0)}
                />
              </div>
            )}
            <div className="lg:col-span-4 space-y-6 sm:space-y-8">
              {supportingAssets.slice(0, 2).map((asset, idx) => (
                <BrowserMockupCard
                  key={asset.id}
                  asset={asset}
                  projectName={project.name}
                  screenIndex={idx + 1}
                  totalScreens={assets.length}
                  isLead={false}
                  lang={lang}
                  onOpen={() => onOpenLightbox(idx + 1)}
                />
              ))}
            </div>
          </div>

          {supportingAssets.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {supportingAssets.slice(2).map((asset, idx) => (
                <BrowserMockupCard
                  key={asset.id}
                  asset={asset}
                  projectName={project.name}
                  screenIndex={idx + 3}
                  totalScreens={assets.length}
                  isLead={false}
                  lang={lang}
                  onOpen={() => onOpenLightbox(idx + 3)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* LAYOUT 5: Strong Full-Width Closing Flagship Showcase (Kayan Solea — 4 screens) */}
      {project.layoutVariant === "closing-flagship" && (
        <div className="space-y-8">
          {leadAsset && (
            <BrowserMockupCard
              asset={leadAsset}
              projectName={project.name}
              screenIndex={0}
              totalScreens={assets.length}
              isLead={true}
              lang={lang}
              onOpen={() => onOpenLightbox(0)}
            />
          )}

          {supportingAssets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {supportingAssets.map((asset, idx) => (
                <BrowserMockupCard
                  key={asset.id}
                  asset={asset}
                  projectName={project.name}
                  screenIndex={idx + 1}
                  totalScreens={assets.length}
                  isLead={false}
                  lang={lang}
                  onOpen={() => onOpenLightbox(idx + 1)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function BrowserMockupCard({
  asset,
  projectName,
  screenIndex,
  totalScreens,
  isLead,
  lang,
  onOpen,
}: {
  asset: MediaAssetRecord;
  projectName: string;
  screenIndex: number;
  totalScreens: number;
  isLead: boolean;
  lang: Locale;
  onOpen: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isAvailable =
    asset.status === "verified" && Boolean(asset.localPath) && !imgError;
  const numStr = String(screenIndex + 1).padStart(2, "0");

  return (
    <button
      type="button"
      dir="ltr"
      onClick={onOpen}
      aria-label={`${projectName} — ${
        lang === "ar" ? "عرض لقطة الشاشة" : "View website screenshot"
      } ${screenIndex + 1} / ${totalScreens}`}
      data-testid={`website-asset-card-${asset.id}`}
      data-website={asset.groupSlug}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/12 bg-slateStudio text-start shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-brandBlue/60 hover:shadow-[0_24px_65px_rgba(20,172,243,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
    >
      {/* Minimalist Dark Browser Chrome Toolbar (No fabricated URLs) */}
      <div
        dir="ltr"
        className="flex items-center justify-between border-b border-white/10 bg-carbon/95 px-4 py-2.5"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brandPink/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-brandOrange/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-brandBlue/85" />
        </div>

        <span className="truncate max-w-[240px] sm:max-w-xs rounded-md border border-white/10 bg-white/[0.03] px-3 py-0.5 font-mono text-[11px] text-pewter">
          {projectName} · Screen {numStr}
        </span>

        <span
          aria-hidden="true"
          className="font-mono text-[11px] text-pewter transition-colors group-hover:text-brandBlue"
        >
          ⤢
        </span>
      </div>

      {/* Website Viewport Screenshot — dir="ltr" so UI screenshots are never mirrored in RTL */}
      {isAvailable ? (
        <div
          dir="ltr"
          className="relative w-full overflow-hidden bg-obsidian flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.localPath!}
            alt={`${projectName} website interface screenshot ${screenIndex + 1}`}
            width={asset.width || 1920}
            height={asset.height || 900}
            loading={isLead && screenIndex === 0 ? "eager" : "lazy"}
            onError={() => setImgError(true)}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
          />

          {/* Subtle Hover Expand Badge */}
          <span
            aria-hidden="true"
            className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-obsidian/85 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-alabaster opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <span>⤢</span>
            <span>
              {numStr} / {String(totalScreens).padStart(2, "0")}
            </span>
          </span>
        </div>
      ) : (
        <div
          data-testid={`missing-website-media-${asset.id}`}
          className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center bg-carbon"
        >
          <span className="font-display text-sm font-bold text-alabaster">
            {projectName} · {numStr}
          </span>
          <span className="mt-1 font-mono text-xs text-pewter">
            ID: {asset.driveFileId}
          </span>
        </div>
      )}
    </button>
  );
}

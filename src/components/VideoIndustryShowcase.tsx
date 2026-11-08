"use client";

import React, { useRef, useState, useCallback } from "react";
import { Locale, MediaAssetRecord } from "@/data/types";
import { getCopy, VIDEO_INDUSTRY_GROUPS } from "@/data/content";
import { getMediaAssetsByIds } from "@/data/media";
import { CollectionHero } from "./CollectionHero";
import { FinalCTA } from "./FinalCTA";

export function VideoIndustryShowcase({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const registerVideoRef = useCallback(
    (id: string, el: HTMLVideoElement | null) => {
      videoRefs.current[id] = el;
    },
    []
  );

  // Pause any other playing video when a new video starts playing
  const handleVideoPlay = useCallback((playingId: string) => {
    setActiveVideoId(playingId);
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (id !== playingId && el && !el.paused) {
        el.pause();
      }
    });
  }, []);

  return (
    <div data-testid="videos-collection-page" className="bg-obsidian text-alabaster">
      <CollectionHero
        lang={lang}
        eyebrow={copy.videosPage.eyebrow}
        headline={copy.videosPage.headline}
        supportingCopy={copy.videosPage.supportingCopy}
        overviewLabel={copy.videosPage.overviewLabel}
        overviewCopy={copy.videosPage.overviewCopy}
        inThisCollection={copy.videosPage.inThisCollection}
      />

      {/* Five Industry Cinematic Sections */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 space-y-28 sm:space-y-36">
        {VIDEO_INDUSTRY_GROUPS.map((group, groupIdx) => {
          const assets = getMediaAssetsByIds(group.assetIds);

          return (
            <section
              key={group.id}
              id={group.slug}
              data-testid={`video-industry-section-${group.slug}`}
              className="relative scroll-mt-24 border-b border-white/10 pb-24 sm:pb-32 last:border-b-0 last:pb-8"
            >
              {/* Split Layout: Alternating Large Sticky Category Label on One Side, Playable Videos on the Other */}
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
                {/* Sticky Industry Heading & Editorial Note */}
                <div
                  className={`lg:col-span-4 lg:sticky lg:top-28 space-y-4 ${
                    groupIdx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="inline-flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gradient">
                      0{groupIdx + 1}
                    </span>
                    <span className="h-1 w-8 rounded-full bg-brand-gradient" />
                    <span className="font-mono text-xs text-pewter">
                      {assets.length} {lang === "ar" ? "فيديو" : "Films"}
                    </span>
                  </div>

                  <h3
                    data-testid={`video-industry-heading-${group.slug}`}
                    className={`font-bold text-alabaster ${
                      lang === "ar"
                        ? "font-arabic text-3xl sm:text-4xl lg:text-5xl leading-[1.2]"
                        : "font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight"
                    }`}
                  >
                    {group.title[lang]}
                  </h3>

                  <p className="text-base sm:text-lg leading-relaxed text-pewter">
                    {group.editorialNote[lang]}
                  </p>
                </div>

                {/* Playable Video Cards Grid */}
                <div
                  className={`lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
                    groupIdx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {assets.map((asset, idx) => (
                    <PlayableVideoCard
                      key={asset.id}
                      asset={asset}
                      industryTitle={group.title[lang]}
                      index={idx}
                      lang={lang}
                      isActive={activeVideoId === asset.id}
                      registerRef={registerVideoRef}
                      onPlay={() => handleVideoPlay(asset.id)}
                      onPause={() => {
                        if (activeVideoId === asset.id) {
                          setActiveVideoId(null);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}

function PlayableVideoCard({
  asset,
  industryTitle,
  index,
  lang,
  isActive,
  registerRef,
  onPlay,
  onPause,
}: {
  asset: MediaAssetRecord;
  industryTitle: string;
  index: number;
  lang: Locale;
  isActive: boolean;
  registerRef: (id: string, el: HTMLVideoElement | null) => void;
  onPlay: () => void;
  onPause: () => void;
}) {
  const copy = getCopy(lang);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // In production deployments where heavy raw MP4s are excluded from Git,
  // stream directly from Google Drive preview or the local path if present
  const videoSrc = videoError
    ? `https://drive.google.com/file/d/${asset.driveFileId}/preview`
    : (asset.localPath || `https://drive.google.com/file/d/${asset.driveFileId}/preview`);

  const setRefs = (el: HTMLVideoElement | null) => {
    localRef.current = el;
    registerRef(asset.id, el);
  };

  const togglePlay = () => {
    const el = localRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {
        setVideoError(true);
      });
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = localRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const requestFullscreen = () => {
    const el = localRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <article
      data-testid={`video-asset-card-${asset.id}`}
      data-industry={asset.groupSlug}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-brandBlue shadow-focal bg-slateStudio"
          : "border-white/10 bg-carbon hover:border-brandPurple/50"
      }`}
    >
      {!videoError ? (
        <div className="relative w-full bg-obsidian flex items-center justify-center overflow-hidden aspect-[9/16] max-h-[540px]">
          <video
            ref={setRefs}
            src={asset.localPath!}
            poster={asset.posterPath || undefined}
            preload="metadata"
            playsInline
            controls
            onPlay={() => {
              setIsPlaying(true);
              setIsLoading(false);
              onPlay();
            }}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onPause={() => {
              setIsPlaying(false);
              setIsLoading(false);
              onPause();
            }}
            onEnded={() => {
              setIsPlaying(false);
              setIsLoading(false);
              onPause();
            }}
            onVolumeChange={() => {
              if (localRef.current) {
                setIsMuted(localRef.current.muted);
              }
            }}
            onError={() => setVideoError(true)}
            aria-label={`${industryTitle} — Reel 0${index + 1}`}
            className="h-full w-full object-contain"
          />

          {/* Centered Custom-Branded Play Button & Loading Indicator */}
          {!isPlaying && !isLoading && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={copy.videosPage.playVideo}
              className="group/play absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/70 text-lg text-alabaster shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brandBlue hover:bg-brand-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
            >
              <span className="ms-0.5">▶</span>
            </button>
          )}

          {isLoading && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/75 backdrop-blur-md"
            >
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-brandBlue border-t-transparent" />
            </div>
          )}

          {/* Custom Accessible Quick-Action Overlay Bar at Top */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/35 to-transparent p-3.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 backdrop-blur-md px-3 py-1 text-xs font-medium text-alabaster">
              <span
                className={`h-2 w-2 rounded-full ${
                  isPlaying ? "bg-brand-gradient animate-pulse" : "bg-white/40"
                }`}
              />
              <span>
                {industryTitle} · 0{index + 1}
              </span>
            </span>

            <div className="pointer-events-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={
                  isPlaying
                    ? copy.videosPage.pauseVideo
                    : copy.videosPage.playVideo
                }
                data-testid={`video-play-toggle-${asset.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/75 text-xs text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={
                  isMuted
                    ? copy.videosPage.unmuteVideo
                    : copy.videosPage.muteVideo
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/75 text-xs text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              <button
                type="button"
                onClick={requestFullscreen}
                aria-label={copy.videosPage.fullscreenVideo}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/75 text-xs text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full bg-obsidian flex items-center justify-center overflow-hidden aspect-[9/16] max-h-[540px]">
          <iframe
            src={`https://drive.google.com/file/d/${asset.driveFileId}/preview`}
            title={`${industryTitle} — Reel 0${index + 1}`}
            allow="autoplay; encrypted-media; fullscreen"
            className="h-full w-full border-0"
          />
        </div>
      )}
    </article>
  );
}

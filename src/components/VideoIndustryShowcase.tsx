"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Locale, MediaAssetRecord } from "@/data/types";
import { getCopy, VIDEO_INDUSTRY_GROUPS } from "@/data/content";
import { getMediaAssetsByIds } from "@/data/media";
import { CollectionHero } from "./CollectionHero";
import { FinalCTA } from "./FinalCTA";

export function VideoIndustryShowcase({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const prefersReducedMotion = useReducedMotion();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const registerVideoRef = useCallback(
    (id: string, el: HTMLVideoElement | null) => {
      videoRefs.current[id] = el;
    },
    []
  );

  // Notify SoundProvider whenever any video plays or stops so UI sounds do not overlap
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("helal:video-playback", {
          detail: { playing: Boolean(activeVideoId) },
        })
      );
    }
    return () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("helal:video-playback", {
            detail: { playing: false },
          })
        );
      }
    };
  }, [activeVideoId]);

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
    <div
      data-testid="videos-collection-page"
      className="bg-obsidian text-alabaster"
    >
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
            <motion.section
              key={group.id}
              id={group.slug}
              data-testid={`video-industry-section-${group.slug}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                    <span
                      data-testid={`video-industry-count-${group.slug}`}
                      className="font-mono text-xs text-pewter"
                    >
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

                  <p
                    data-testid={`video-industry-note-${group.slug}`}
                    className="text-base sm:text-lg leading-relaxed text-pewter"
                  >
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
                      groupIdx={groupIdx}
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
            </motion.section>
          );
        })}
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}

/**
 * Reusable Professional Video Thumbnail Overlay
 * Displays the optimized poster image with a cinematic vignette, hover zoom,
 * and centered play icon before playback and after video reset.
 */
function VideoThumbnailCover({
  posterPath,
  title,
  index,
  eagerLoad,
  playLabel,
  onPlayClick,
}: {
  posterPath: string | null;
  title: string;
  index: number;
  eagerLoad: boolean;
  playLabel: string;
  onPlayClick: () => void;
}) {
  const [posterError, setPosterError] = useState(false);
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <div
      data-testid="video-thumbnail-cover"
      onClick={onPlayClick}
      className="group/thumb absolute inset-0 z-10 flex cursor-pointer items-center justify-center overflow-hidden bg-obsidian"
    >
      {posterPath && !posterError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterPath}
          alt={`${title} — Reel ${numStr} Thumbnail`}
          loading={eagerLoad ? "eager" : "lazy"}
          decoding="async"
          onError={() => setPosterError(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(129,69,202,0.28),rgba(20,172,243,0.12),#08080B_75%)] p-6 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-brandBlue">
            {title}
          </span>
          <span className="mt-2 font-display text-2xl font-bold text-alabaster">
            Reel {numStr}
          </span>
        </div>
      )}

      {/* Subtle Cinematic Vignette & Hover Glow Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/55 transition-opacity duration-500 group-hover/thumb:from-black/65 group-hover/thumb:via-brandPurple/10"
      />

      {/* Centered Elegant Play Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlayClick();
        }}
        aria-label={playLabel}
        data-testid="video-thumbnail-play-button"
        className="relative z-20 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/65 text-alabaster shadow-[0_14px_38px_rgba(0,0,0,0.75)] backdrop-blur-md transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:border-brandBlue group-hover/thumb:bg-brand-gradient group-hover/thumb:shadow-brandGlow focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/25 transition-transform duration-500 group-hover/thumb:scale-125 group-hover/thumb:opacity-0"
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6 translate-x-0.5"
        >
          <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
        </svg>
      </button>
    </div>
  );
}

function PlayableVideoCard({
  asset,
  industryTitle,
  groupIdx,
  index,
  lang,
  isActive,
  registerRef,
  onPlay,
  onPause,
}: {
  asset: MediaAssetRecord;
  industryTitle: string;
  groupIdx: number;
  index: number;
  lang: Locale;
  isActive: boolean;
  registerRef: (id: string, el: HTMLVideoElement | null) => void;
  onPlay: () => void;
  onPause: () => void;
}) {
  const copy = getCopy(lang);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const numStr = String(index + 1).padStart(2, "0");
  const eagerThumbnail = groupIdx === 0 && index < 2;

  const setRefs = (el: HTMLVideoElement | null) => {
    localRef.current = el;
    registerRef(asset.id, el);
  };

  // When another video becomes active, pause this video
  useEffect(() => {
    if (!isActive && showEmbed) {
      setShowEmbed(false);
      setHasStarted(false);
      setIsPlaying(false);
    }
  }, [isActive, showEmbed]);

  const startOrTogglePlay = () => {
    if (showEmbed) {
      return;
    }

    const el = localRef.current;
    if (!el) {
      setHasStarted(true);
      setShowEmbed(true);
      onPlay();
      return;
    }

    setHasStarted(true);
    if (el.paused) {
      setIsLoading(true);
      el.play().catch(() => {
        // Local file does not exist on cloud CDN, switch seamlessly to Google Drive stream
        setIsLoading(false);
        setShowEmbed(true);
        setIsPlaying(true);
        onPlay();
      });
    } else {
      el.pause();
    }
  };

  const resetToThumbnail = () => {
    const el = localRef.current;
    if (el) {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        // ignore seek errors on unloaded media
      }
    }
    setShowEmbed(false);
    setIsPlaying(false);
    setIsLoading(false);
    setHasStarted(false);
    onPause();
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

  const showThumbnailCover = !hasStarted && !isPlaying && !showEmbed;

  return (
    <article
      data-testid={`video-asset-card-${asset.id}`}
      data-industry={asset.groupSlug}
      data-video-player="true"
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-brandBlue shadow-focal bg-slateStudio"
          : "border-white/10 bg-carbon hover:border-brandPurple/50 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.65)]"
      }`}
    >
      <div className="relative w-full bg-obsidian flex items-center justify-center overflow-hidden aspect-[9/16] max-h-[540px]">
        {showEmbed ? (
          <iframe
            src={`https://drive.google.com/file/d/${asset.driveFileId}/preview`}
            title={`${industryTitle} — Reel ${numStr}`}
            allow="autoplay; encrypted-media; fullscreen"
            className="h-full w-full border-0"
          />
        ) : (
          <video
            ref={setRefs}
            src={asset.localPath!}
            poster={asset.posterPath || undefined}
            preload="none"
            playsInline
            controls={isPlaying}
            onPlay={() => {
              setHasStarted(true);
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
              // Automatically display the thumbnail again after the video finishes/resets
              setIsPlaying(false);
              setIsLoading(false);
              setHasStarted(false);
              onPause();
            }}
            onVolumeChange={() => {
              if (localRef.current) {
                setIsMuted(localRef.current.muted);
              }
            }}
            onError={() => {
              if (hasStarted) {
                setIsLoading(false);
                setShowEmbed(true);
                setIsPlaying(true);
                onPlay();
              }
            }}
            aria-label={`${industryTitle} — Reel ${numStr}`}
            className="h-full w-full object-contain cursor-pointer"
            onClick={startOrTogglePlay}
          />
        )}

        {/* Reusable Thumbnail Cover Displayed Before Playback and After Reset */}
        {showThumbnailCover && (
          <VideoThumbnailCover
            posterPath={asset.posterPath}
            title={industryTitle}
            index={index}
            eagerLoad={eagerThumbnail}
            playLabel={copy.videosPage.playVideo}
            onPlayClick={startOrTogglePlay}
          />
        )}

        {/* Centered Play Button When Paused Mid-Stream */}
        {!showThumbnailCover && !isPlaying && !isLoading && !showEmbed && (
          <button
            type="button"
            onClick={startOrTogglePlay}
            aria-label={copy.videosPage.playVideo}
            className="z-20 absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/70 text-lg text-alabaster shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brandBlue hover:bg-brand-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <span className="ms-0.5">▶</span>
          </button>
        )}

        {isLoading && (
          <div
            aria-hidden="true"
            className="pointer-events-none z-20 absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/75 backdrop-blur-md"
          >
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-brandBlue border-t-transparent" />
          </div>
        )}

        {/* Top Quick Bar (Always accessible above thumbnail & video) */}
        <div className="pointer-events-none z-20 absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/35 to-transparent p-3.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 backdrop-blur-md px-3 py-1 text-xs font-medium text-alabaster">
            <span
              className={`h-2 w-2 rounded-full ${
                isPlaying || showEmbed
                  ? "bg-brand-gradient animate-pulse"
                  : "bg-white/40"
              }`}
            />
            <span>
              {industryTitle} · {numStr}
            </span>
          </span>

          <div className="pointer-events-auto flex items-center gap-1.5">
            {(hasStarted || showEmbed) && (
              <button
                type="button"
                onClick={resetToThumbnail}
                aria-label={copy.videosPage.resetVideo}
                title={copy.videosPage.resetVideo}
                data-testid={`video-reset-${asset.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/75 text-xs text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                ↺
              </button>
            )}

            {!showEmbed && (
              <>
                <button
                  type="button"
                  onClick={startOrTogglePlay}
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
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

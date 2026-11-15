"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";

interface SoundContextValue {
  isSoundEnabled: boolean;
  isVideoPlaying: boolean;
  toggleSound: () => void;
  setVideoPlaying: (playing: boolean) => void;
  playClickTone: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  isSoundEnabled: false,
  isVideoPlaying: false,
  toggleSound: () => {},
  setVideoPlaying: () => {},
  playClickTone: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // OFF by default per Task 6 requirements
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const checkAnyVideoPlaying = useCallback((): boolean => {
    if (isVideoPlaying) return true;
    if (typeof document === "undefined") return false;
    const videos = document.querySelectorAll("video");
    for (let i = 0; i < videos.length; i++) {
      if (!videos[i].paused && !videos[i].ended) {
        return true;
      }
    }
    return false;
  }, [isVideoPlaying]);

  const playActivationChime = useCallback(() => {
    try {
      if (checkAnyVideoPlaying()) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.032, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.17);
    } catch {
      // Ignore Web Audio API restrictions in headless/restricted environments
    }
  }, [checkAnyVideoPlaying, getAudioContext]);

  const playClickTone = useCallback(() => {
    if (!isSoundEnabled) return;
    if (checkAnyVideoPlaying()) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.055);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.022, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Ignore audio errors
    }
  }, [isSoundEnabled, checkAnyVideoPlaying, getAudioContext]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        playActivationChime();
      }
      return next;
    });
  }, [playActivationChime]);

  // Listen for custom portfolio video playback state events
  useEffect(() => {
    const handleVideoState = (e: Event) => {
      const detail = (e as CustomEvent<{ playing: boolean }>).detail;
      if (detail && typeof detail.playing === "boolean") {
        setIsVideoPlaying(detail.playing);
      }
    };
    window.addEventListener("helal:video-playback", handleVideoState);
    return () =>
      window.removeEventListener("helal:video-playback", handleVideoState);
  }, []);

  // Delegate subtle UI sound on interactive button/link clicks when sound is ON
  useEffect(() => {
    if (!isSoundEnabled) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button']");
      if (!interactive) return;
      // Skip the sound toggle button itself (it plays its own chime) or video controls
      if (
        interactive.getAttribute("data-testid") === "sound-toggle" ||
        interactive.closest("[data-video-player='true']")
      ) {
        return;
      }
      playClickTone();
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [isSoundEnabled, playClickTone]);

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        isVideoPlaying,
        toggleSound,
        setVideoPlaying: setIsVideoPlaying,
        playClickTone,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function SoundToggleButton({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const copy = getCopy(lang);
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={isSoundEnabled}
      aria-label={copy.nav.soundToggleAria}
      title={isSoundEnabled ? copy.nav.soundOn : copy.nav.soundOff}
      data-testid="sound-toggle"
      data-sound-state={isSoundEnabled ? "on" : "off"}
      className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue ${
        isSoundEnabled
          ? "border-brandBlue/60 bg-brandBlue/15 text-brandBlue shadow-[0_0_16px_rgba(20,172,243,0.3)]"
          : "border-white/15 bg-white/[0.04] text-pewter hover:border-brandBlue/50 hover:bg-white/[0.08] hover:text-alabaster"
      } ${className}`}
    >
      {isSoundEnabled ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-3.5 w-3.5"
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-3.5 w-3.5"
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 9L16 15M16 9L22 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}


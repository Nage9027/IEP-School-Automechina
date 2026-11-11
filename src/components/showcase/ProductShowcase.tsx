"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { LaptopScreens } from "./screens/laptop/index.tsx";
import { MobileScreens } from "./screens/mobile/index.tsx";
import { FloatingNotifications } from "./FloatingNotifications";
import { LaptopFrame } from "./LaptopFrame";
import { cn } from "@/lib/utils";

const LAPTOP_INTERVAL_MS = 5000;

export function ProductShowcase({
  className,
  selectedIndex,
}: {
  className?: string;
  selectedIndex?: number;
}) {
  const [autoIndex, setAutoIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const laptopCount = LaptopScreens.length;
  const mobileCount = MobileScreens.length;

  // Use manual selection when provided, otherwise auto-rotate
  const effectiveLaptopIndex = selectedIndex ?? autoIndex;
  const currentLaptop = LaptopScreens[effectiveLaptopIndex % laptopCount];
  const currentMobile = MobileScreens[mobileIndex % mobileCount];

  const advance = useCallback(() => {
    if (!isPlaying || isHovered || reducedMotion || selectedIndex !== undefined)
      return;
    setAutoIndex((i) => i + 1);
    setMobileIndex((i) => i + 1);
    setProgress(0);
    progressRef.current = 0;
  }, [isPlaying, isHovered, reducedMotion, selectedIndex]);

  // Progress bar ticker
  useEffect(() => {
    if (!isPlaying || isHovered || reducedMotion || selectedIndex !== undefined) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const segmentProgress = Math.min(elapsed / LAPTOP_INTERVAL_MS, 1);
      setProgress(segmentProgress);
      progressRef.current = segmentProgress;
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isHovered, reducedMotion, selectedIndex]);

  // Auto-advance interval
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying || isHovered || reducedMotion || selectedIndex !== undefined)
      return;

    intervalRef.current = setInterval(advance, LAPTOP_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isHovered, reducedMotion, selectedIndex, advance]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <section
      className={cn(
        "relative w-full h-full min-h-[560px] sm:min-h-[640px] lg:min-h-[680px] overflow-hidden",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Device showcase area - desktop left, mobile right */}
      <div
        className={cn(
          "relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 h-full",
          "lg:items-start",
        )}
      >
        {/* LEFT: Desktop application in laptop frame */}
        <div className="relative flex flex-col items-center w-full lg:w-auto max-w-[820px]">
          <LaptopFrame className="relative z-10">
            <LaptopScreen
              screen={currentLaptop}
              transition={
                !reducedMotion && isPlaying && !isHovered && selectedIndex === undefined
                  ? "fade"
                  : "none"
              }
            />
          </LaptopFrame>

          {/* Subtle glow behind desktop */}
          <div className="absolute -inset-4 -z-1 rounded-[28px] blur-[40px] bg-purple-400/20 opacity-0 sm:opacity-40" />
        </div>

        {/* RIGHT: Mobile (Parent App) - overlapping laptop on desktop */}
        <div
          className={cn(
            "relative z-20 flex flex-col items-center w-full lg:w-auto",
            "-mt-6 sm:-mt-8 lg:-mt-14",
          )}
        >
          <MobileScreen
            screen={currentMobile}
            transition={
              !reducedMotion && isPlaying && !isHovered && selectedIndex === undefined
                ? "fade"
                : "none"
            }
          />
        </div>

        {/* Floating notifications around devices */}
        <FloatingNotifications />

        {/* Controls overlay - bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
          {/* Progress bar */}
          <div className="w-48 h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-1000 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Module label + controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause showcase" : "Resume showcase"}
              disabled={selectedIndex !== undefined}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 bg-white text-ink text-[10px] transition-colors",
                selectedIndex !== undefined
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-ink/5 hover:border-violet-300",
              )}
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </button>
            <span className="text-[9px] font-semibold text-ink/60 tracking-wide uppercase">
              {currentLaptop.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ScreenProps {
  screen: { label: string; Component: () => JSX.Element };
  transition: "fade" | "none";
}

function LaptopScreen({ screen, transition }: ScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative group ${
        transition === "fade" && mounted
          ? "animate-[fadeIn_0.6s_ease-out]"
          : "opacity-100"
      }`}
    >
      {screen.Component()}
    </div>
  );
}

function MobileScreen({ screen, transition }: ScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative group ${
        transition === "fade" && mounted
          ? "animate-[fadeIn_0.6s_ease-out]"
          : "opacity-100"
      }`}
    >
      {screen.Component()}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Pause,
  Play,
  RotateCcw,
  School,
  Volume2,
  VolumeX,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroPlaylistItem {
  id: string;
  title: string;
  tag: string;
  src: string;
  description: string;
}

export const heroVideoPlaylist: HeroPlaylistItem[] = [
  {
    id: "iep-animation-intro",
    title: "IEP Schools Animated Introduction",
    tag: "Platform Animation",
    src: "/media/iep%20animation%20(2).mp4",
    description: "Animated introduction to the IEP Schools platform.",
  },
  {
    id: "campus-cloud",
    title: "Campus Cloud Automation Tour",
    tag: "Campus Cloud",
    src: "/media/gemini_generated_video_6587df98_2K_upscaled%20(online-video-cutter.com)%20(1).mp4",
    description: "2K ultra-wide preview of cloud infrastructure and smart school campus automation.",
  },
  {
    id: "platform-overview",
    title: "IEP Schools Platform Introduction",
    tag: "ERP Architecture",
    src: "/media/about.mp4",
    description: "Unified web ERP application, connected records and school management workflow.",
  },
  {
    id: "student-lifecycle",
    title: "Student Management & Admissions",
    tag: "Student Lifecycle",
    src: "/media/student-management.mp4",
    description: "Digital registration, student profiles, KYC verification and class allotments.",
  },
  {
    id: "fees-finance",
    title: "Fee Collection & Cashier Workspace",
    tag: "Fees & POS Ledger",
    src: "/media/finance.mp4",
    description: "Fast counter collections, thermal receipt printing and cashier shift reconciliation.",
  },
  {
    id: "communication",
    title: "School & Parent Communication Hub",
    tag: "Parent Alerts",
    src: "/media/communication.mp4",
    description: "Emergency alerts, circular announcements, SMS and WhatsApp broadcast delivery.",
  },
  {
    id: "platform-security",
    title: "Role Security & Multi-Tenant Container",
    tag: "Dedicated Cloud",
    src: "/media/platform-animation.mp4",
    description: "Fine-grained RBAC permissions, audit trail and isolated cloud deployment.",
  },
];

interface HeroFeatureCardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge: string;
}

const heroFeatureCards: HeroFeatureCardItem[] = [
  {
    id: "students",
    title: "Student & Admission",
    description: "Manage student records and admissions.",
    icon: GraduationCap,
    href: "/features#module-students",
    badge: "KYC & Admissions",
  },
  {
    id: "attendance",
    title: "Smart Attendance",
    description: "Track attendance and notify parents.",
    icon: CalendarCheck,
    href: "/features#module-attendance",
    badge: "Biometric & App",
  },
  {
    id: "finance",
    title: "Fee & Finance",
    description: "Manage fee collection, receipts and ledgers.",
    icon: Wallet,
    href: "/features#module-finance",
    badge: "Counter POS & Online",
  },
  {
    id: "academics",
    title: "Academic Management",
    description: "Manage examinations, results and timetables.",
    icon: BookOpen,
    href: "/features#module-academics",
    badge: "CBSE Report Cards",
  },
];

interface HomeHeroProps {
  erpLoginUrl: string;
  onWatchDemo: () => void;
}

export function HomeHero({ erpLoginUrl, onWatchDemo }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const [videoIndex, setVideoIndex] = useState(0);
  const [isHeroMuted, setIsHeroMuted] = useState(true); // Browsers require muted initially for reliable autoplay
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);
  const [introDismissedManually, setIntroDismissedManually] = useState(false);

  const hasInteractedRef = useRef(false);
  const audioUnlockedRef = useRef(false);

  const currentVideo = heroVideoPlaylist[videoIndex];

  // 1. Core Audio Unmute & Play Engine (Guaranteed audio playback)
  const unmuteAndPlayAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsHeroMuted(false);
          setNeedsAudioUnlock(false);
          audioUnlockedRef.current = true;
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Browser autoplay audio policy requires user interaction:", err);
          video.muted = true;
          setIsHeroMuted(true);
          setNeedsAudioUnlock(true);
        });
    } else {
      setIsHeroMuted(false);
      setNeedsAudioUnlock(false);
      audioUnlockedRef.current = true;
    }
  }, []);

  // 2. Document-Level User Interaction Capture (Click, Tap, Scroll, Key)
  // As soon as the visitor interacts anywhere on the page, unlock sound if intro has ended!
  useEffect(() => {
    const handleUserGesture = () => {
      hasInteractedRef.current = true;
      if (!introVisible || needsAudioUnlock) {
        if (!audioUnlockedRef.current) {
          unmuteAndPlayAudio();
        }
      }
    };

    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("click", handleUserGesture);
    window.addEventListener("keydown", handleUserGesture);
    window.addEventListener("touchstart", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };
  }, [introVisible, needsAudioUnlock, unmuteAndPlayAudio]);

  // 3. Initial Intro Timer (~7.5 seconds)
  // When the centre words fade away automatically, sound MUST start playing automatically!
  useEffect(() => {
    if (introDismissedManually) return;
    const timer = setTimeout(() => {
      setIntroVisible(false);
      // Automatically attempt to unmute and play voice/audio as requested
      unmuteAndPlayAudio();
    }, 7500);

    return () => clearTimeout(timer);
  }, [introDismissedManually, unmuteAndPlayAudio]);

  // 4. Manual Audio Control Toggle
  const toggleHeroMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isHeroMuted) {
      // Unmuting
      unmuteAndPlayAudio();
    } else {
      // Muting
      video.muted = true;
      video.defaultMuted = true;
      setIsHeroMuted(true);
      audioUnlockedRef.current = false;
      setNeedsAudioUnlock(false);
    }
  };

  // 5. Play/Pause toggle
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // 6. Sequential Video Playlist Cycling: Loop automatically through all clips
  const handleHeroVideoEnded = () => {
    setVideoIndex((prev) => (prev + 1) % heroVideoPlaylist.length);
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % heroVideoPlaylist.length);
  };

  const handlePrevVideo = () => {
    setVideoIndex((prev) => (prev === 0 ? heroVideoPlaylist.length - 1 : prev - 1));
  };

  // 7. Video Playback & Sound State Preservation on Clip Change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextSrc = heroVideoPlaylist[videoIndex].src;
    if (!video.src.endsWith(nextSrc)) {
      video.src = nextSrc;
    }

    video.muted = isHeroMuted;
    video.defaultMuted = isHeroMuted;
    if (!isHeroMuted) {
      video.volume = 1.0;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Background video autoplay prevented on track switch:", err);
          video.muted = true;
          setIsHeroMuted(true);
          video.play().catch(() => {});
        });
    }
  }, [videoIndex, isHeroMuted]);

  // Replay introduction on demand
  const handleReplayIntro = () => {
    setIntroVisible(true);
    setIntroDismissedManually(false);
  };

  // Motion variants
  const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  });

  const fadeIn = (delay = 0): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      },
    },
  });

  return (
    <section
      onClick={!introVisible && isHeroMuted ? unmuteAndPlayAudio : undefined}
      className={cn(
        "home-page-hero relative min-h-[85vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-navy-950 text-white",
        !introVisible && isHeroMuted && "cursor-pointer",
      )}
    >
      {/* =========================================================================
          FULL-SCREEN CINEMATIC BACKGROUND VIDEO (Occupies 100% of hero)
          ========================================================================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="home-hero-video h-full w-full object-cover object-center select-none"
          autoPlay
          muted={isHeroMuted}
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          src={heroVideoPlaylist[videoIndex].src}
          onEnded={handleHeroVideoEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Preload hidden element for the next video clip to ensure zero buffering */}
        <video
          preload="auto"
          className="hidden"
          src={heroVideoPlaylist[(videoIndex + 1) % heroVideoPlaylist.length].src}
          aria-hidden="true"
        />

        {/* Subtle, non-obscuring overlay: only 40% top tint for header contrast, crystal-clear center so software screens are vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070914]/45 via-transparent to-[#070914]/50 pointer-events-none" />

        {/* Soft Edge Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(7,9,20,0.45)_100%)] pointer-events-none" />

        {/* Smooth transition into page content below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/70 to-transparent" />
      </div>

      {/* Top Spacer to offset the sticky navigation bar (~68px) */}
      <div className="h-20 sm:h-24 lg:h-28 shrink-0 pointer-events-none" />

      {/* =========================================================================
          1. INITIAL INTRODUCTION OVERLAY (0–8s)
          Both the central intro AND the four bottom cards live inside AnimatePresence.
          After 7-8s, everything smoothly fades out and moves slightly up, completely
          unmounting to reveal pure VIDEO-ONLY PRESENTATION MODE!
          ========================================================================= */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            key="hero-intro-wrapper"
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -24,
              transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 my-auto flex w-full flex-col justify-between py-4"
          >
            {/* Central Introduction Content */}
            <div className="container-x mx-auto w-full max-w-[1080px] px-4 text-center sm:px-6">
              <div className="mx-auto flex flex-col items-center">
                {/* Eyebrow Badge */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp(0.05)}
                  className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-navy-950/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-purple-200 shadow-md backdrop-blur-md"
                >
                  <School className="h-3.5 w-3.5 text-purple-300" />
                  <span>COMPLETE SCHOOL AUTOMATION PLATFORM</span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white text-balance sm:mt-6 sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.25rem]">
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp(0.15)}
                    className="block text-white [text-shadow:0_3px_16px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.8)]"
                  >
                    One Smart Platform.
                  </motion.span>
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp(0.26)}
                    className="mt-1 block bg-gradient-to-r from-purple-300 via-pink-300 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                  >
                    Complete School Automation.
                  </motion.span>
                </h1>

                {/* Full Product Description */}
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp(0.36)}
                  className="mt-5 max-w-[850px] text-base leading-relaxed text-purple-50/95 text-pretty sm:mt-6 sm:text-lg lg:text-xl [text-shadow:0_2px_10px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  Automate your school&apos;s daily operations with one intelligent platform. From admissions and attendance to academics, fee management, parent communication, examinations and transport, IEP Schools brings your entire school workflow together.
                </motion.p>

                {/* 3 Main CTA Buttons */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp(0.46)}
                  className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4"
                >
                  {/* 1. Get Started Free: Purple gradient primary */}
                  <Link
                    to="/contact?plan=free&source=home"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_25px_rgba(103,56,245,0.65),0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-200 hover:shadow-[0_0_35px_rgba(139,92,246,0.85)] hover:brightness-110 active:scale-[0.98] sm:w-auto sm:text-base"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {/* 2. Watch Product Demo */}
                  <button
                    type="button"
                    onClick={onWatchDemo}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/30 bg-navy-950/75 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:border-white/50 hover:bg-navy-900/90 active:scale-[0.98] sm:w-auto sm:text-base"
                  >
                    <Play className="h-4 w-4 fill-current text-white" />
                    <span>Watch Product Demo</span>
                  </button>

                  {/* 3. Book a Demo */}
                  <Link
                    to="/contact?topic=demo&source=home"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-purple-400/50 bg-navy-950/75 px-6 py-3.5 text-sm font-bold text-purple-200 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:border-purple-300 hover:bg-purple-950/85 hover:text-white active:scale-[0.98] sm:w-auto sm:text-base"
                  >
                    <CalendarDays className="h-4 w-4 text-purple-300" />
                    <span>Book a Demo</span>
                  </Link>
                </motion.div>

                {/* School Login & Audio Fast-Toggle Bar */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn(0.56)}
                  className="mt-4 flex flex-wrap items-center justify-center gap-3"
                >
                  <a
                    href={erpLoginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-950/60 px-3.5 py-1.5 text-xs font-semibold text-purple-200 shadow-sm backdrop-blur-md transition-colors hover:border-white/35 hover:text-white"
                  >
                    <span>Existing School? Open School Login</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  {/* Sound Quick Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleHeroMute}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold shadow-md backdrop-blur-md transition-all duration-200 active:scale-95",
                      isHeroMuted
                        ? "border border-purple-400/50 bg-purple-950/80 text-purple-200 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:border-purple-300 hover:bg-purple-600 hover:text-white"
                        : "border border-emerald-400/60 bg-emerald-950/80 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:bg-emerald-900",
                    )}
                    aria-label={isHeroMuted ? "Enable sound" : "Mute audio"}
                  >
                    {isHeroMuted ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5 text-purple-300 animate-pulse" />
                        <span>Enable Sound</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                        <span>Sound Active 🔊</span>
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Supporting Trust Indicators */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn(0.66)}
                  className="mt-5 flex flex-wrap items-center justify-center gap-3.5 text-xs font-medium text-purple-200/95 sm:mt-6 sm:gap-6 sm:text-sm"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-950/65 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Quick Setup</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-950/65 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>No Technical Expertise</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-950/65 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Free Plan with Hosting</span>
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Four Feature Cards at the bottom of the intro (also disappear when intro exits) */}
            <div className="container-x mx-auto mt-8 w-full px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
                {heroFeatureCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: shouldReduceMotion ? 0 : idx * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        to={card.href}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-navy-950/75 p-3.5 sm:p-4 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-navy-900/90 hover:shadow-[0_15px_35px_rgba(103,56,245,0.3)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-600/25 text-purple-300 transition-colors group-hover:bg-purple-600 group-hover:text-white shadow-sm">
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="rounded-full border border-purple-400/30 bg-purple-950/60 px-2 py-0.5 text-[9.5px] font-bold text-purple-200">
                            {card.badge}
                          </span>
                        </div>

                        <div className="mt-3">
                          <h2 className="text-sm font-extrabold text-white group-hover:text-purple-200 transition-colors">
                            {card.title}
                          </h2>
                          <p className="mt-0.5 text-xs leading-relaxed text-purple-100/75 line-clamp-2">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-purple-300 group-hover:text-white transition-colors">
                          <span>Explore workflow</span>
                          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          AUDIO UNLOCK BANNER (Appears if browser autoplay policy gated sound on cold load)
          ========================================================================= */}
      <AnimatePresence>
        {needsAudioUnlock && !introVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center px-4"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                unmuteAndPlayAudio();
              }}
              className="group flex items-center gap-3 rounded-full border border-purple-400/50 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-[0_0_40px_rgba(139,92,246,0.9),0_6px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-[0_0_55px_rgba(168,85,247,1)] active:scale-95 animate-pulse"
              aria-label="Click anywhere to turn on audio and voiceover"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-emerald-300">
                <Volume2 className="h-4 w-4 animate-bounce text-emerald-300" />
              </span>
              <span>🔊 Sound Ready! Click anywhere to hear voice</span>
              <span className="hidden sm:inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-purple-100">
                Tap to unmute
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          2. VIDEO-ONLY PRESENTATION MODE CONTROLS (Corner Positioned)
          During video-only mode, the four feature cards and central text are completely
          gone. Only small, elegant, unobtrusive controls remain in the bottom corner.
          ========================================================================= */}
      <div className="pointer-events-auto absolute bottom-5 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
        {/* Floating Unobtrusive Video Controls Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-navy-950/85 p-1.5 shadow-lg backdrop-blur-md">
          {/* Current Clip Sequence Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 text-xs text-purple-200 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white max-w-[170px] truncate">
              {currentVideo.title}
            </span>
            <span className="text-[10px] text-purple-300/80 font-mono">
              ({videoIndex + 1}/{heroVideoPlaylist.length})
            </span>
          </div>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={togglePlayPause}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-purple-600"
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
            )}
          </button>

          {/* Previous Video */}
          <button
            type="button"
            onClick={handlePrevVideo}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-purple-200 transition-colors hover:bg-white/15 hover:text-white"
            title="Previous video"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Next Video */}
          <button
            type="button"
            onClick={handleNextVideo}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-purple-200 transition-colors hover:bg-white/15 hover:text-white"
            title="Next video"
            aria-label="Next video"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Sound / Mute Toggle */}
          <button
            type="button"
            onClick={toggleHeroMute}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all active:scale-95",
              isHeroMuted
                ? "bg-purple-950/80 text-purple-200 hover:bg-purple-600 hover:text-white"
                : "bg-emerald-950/90 text-emerald-200 hover:bg-emerald-900",
            )}
            aria-label={isHeroMuted ? "Enable sound" : "Mute sound"}
          >
            {isHeroMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-purple-300" />
                <span>Enable Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span>Sound Active 🔊</span>
              </>
            )}
          </button>

          {/* Small Replay Intro Button (if intro has faded out) */}
          {!introVisible && (
            <button
              type="button"
              onClick={handleReplayIntro}
              className="inline-flex items-center gap-1 rounded-full bg-purple-600/40 px-2.5 py-1 text-xs font-semibold text-purple-100 hover:bg-purple-600 hover:text-white transition-colors"
              title="Show introduction and feature cards again"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Intro</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

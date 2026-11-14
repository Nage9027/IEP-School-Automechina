import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Library,
  Lightbulb,
  MessagesSquare,
  Pause,
  Play,
  RotateCcw,
  School,
  Search,
  Settings,
  ShieldCheck,
  SkipForward,
  Smartphone,
  Sparkles,
  Users,
  Video,
  Volume2,
  VolumeX,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  productFilms,
  roleLearningPaths,
  stepGuides,
  tutorialCategories,
  tutorials,
} from "@/content/tutorials";
import type { ProductFilm, Tutorial } from "@/content/types";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

// Map category IDs to relevant Lucide icons
const categoryIconMap: Record<string, React.ElementType> = {
  "getting-started": Compass,
  dashboard: LayoutDashboard,
  "student-management": GraduationCap,
  admissions: School,
  attendance: CalendarCheck,
  academics: BookOpen,
  examinations: Award,
  "fees-finance": Wallet,
  library: Library,
  transport: Compass,
  communication: MessagesSquare,
  "parent-portal": Smartphone,
  "staff-management": Users,
  reports: FileText,
  settings: Settings,
  ai: Sparkles,
};

// Map role icon names to Lucide icons
const roleIconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Wallet,
  Library,
  Smartphone,
  Users,
};

// Top hero auto-advancing video playlist
const tutorialHeroPlaylist = [
  {
    id: "about",
    title: "IEP Schools Platform Overview",
    duration: "00:59",
    src: "/media/about.mp4",
    tag: "Getting Started",
    description: "Complete walkthrough of the smart education ERP platform and cloud infrastructure.",
  },
  {
    id: "student-management",
    title: "Student Lifecycle & Admissions",
    duration: "00:51",
    src: "/media/student-management.mp4",
    tag: "Student Management",
    description: "Digital student registration, KYC documents, roll numbers and section mapping.",
  },
  {
    id: "finance",
    title: "Fee Collection & Cashier Workspace",
    duration: "01:00",
    src: "/media/finance.mp4",
    tag: "Fees & Finance",
    description: "Counter fee collection, printed thermal receipts, and daily shift reconciliation.",
  },
  {
    id: "communication",
    title: "School Communication & Alerts",
    duration: "01:02",
    src: "/media/communication.mp4",
    tag: "Communication",
    description: "Multi-channel broadcast circulars, SMS, and WhatsApp alerts for parents.",
  },
  {
    id: "campus-automation",
    title: "Campus Cloud Automation Tour",
    duration: "00:30",
    src: "/media/home-hero-bg.mp4",
    tag: "Cloud Operations",
    description: "Cloud ERP infrastructure and high-speed multi-branch school network.",
  },
  {
    id: "platform-security",
    title: "Role Security & Permissions",
    duration: "00:09",
    src: "/media/platform-animation.mp4",
    tag: "Security & Roles",
    description: "Multi-tenant role access control and end-to-end data encryption.",
  },
  {
    id: "teachers-staff",
    title: "Day 6: Teachers & Staff Management",
    duration: "01:15",
    src: "/media/IEP%20DAY%206%20TEACHERS%20AND%20STAFF.mp4",
    tag: "Staff Management",
    description: "Faculty management, subject allocations, class teachers, and staff coordination.",
  },
  {
    id: "attendance-work",
    title: "Day 7: Student Attendance & Daily Workflows",
    duration: "01:20",
    src: "/media/IEP%20DAY%207%20Attendence%20%26%20Work.mp4",
    tag: "Attendance & Work",
    description: "Daily roll-call marking, automated parent absence alerts, and monthly attendance registers.",
  },
];

export default function TutorialsPage() {
  const shouldReduceMotion = useReducedMotion();

  // SEO
  usePageMeta({
    title: "School ERP Tutorials & Learning Centre | IEP Schools",
    description:
      "Master every feature of IEP Schools with video walkthroughs, role-based training paths, and step-by-step guides for admissions, attendance, fees, exams and transport.",
    path: "/tutorials",
  });

  // State
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedGuideId, setSelectedGuideId] = useState<string>(stepGuides[0].id);
  const [activeModalItem, setActiveModalItem] = useState<Tutorial | ProductFilm | null>(null);

  // Hero interactive video player preview ref & playlist state
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroPlaylistIndex, setHeroPlaylistIndex] = useState(0);
  const [isHeroMuted, setIsHeroMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentHeroVideo = tutorialHeroPlaylist[heroPlaylistIndex];

  // Auto-advance playlist when current video ends
  const handleHeroVideoEnded = () => {
    setHeroPlaylistIndex((prev) => (prev + 1) % tutorialHeroPlaylist.length);
  };

  const handleNextHeroVideo = () => {
    setHeroPlaylistIndex((prev) => (prev + 1) % tutorialHeroPlaylist.length);
  };

  const handlePrevHeroVideo = () => {
    setHeroPlaylistIndex((prev) => (prev === 0 ? tutorialHeroPlaylist.length - 1 : prev - 1));
  };

  const toggleHeroMute = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const nextMuted = !isHeroMuted;
    video.muted = nextMuted;
    setIsHeroMuted(nextMuted);
    if (!nextMuted) {
      video.volume = 1.0;
      video.play().catch(() => {});
    }
  };

  const togglePlayPause = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Autoplay hero video and sequence remaining videos with sound
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.src = currentHeroVideo.src;
    video.muted = isHeroMuted;
    if (!isHeroMuted) {
      video.volume = 1.0;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // If browser policy prevents unmuted autoplay on initial load, gracefully fallback to muted
          console.warn("Autoplay with sound prevented by browser:", err);
          video.muted = true;
          setIsHeroMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        });
    }
  }, [heroPlaylistIndex]);

  // Keyboard navigation for active modal
  useEffect(() => {
    if (!activeModalItem) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModalItem(null);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeModalItem]);

  // Motion variants
  const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      },
    },
  });

  // Filtered tutorials
  const filteredTutorials = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutorials.filter((tutorial) => {
      const matchCat =
        selectedCategory === "all" || tutorial.categoryId === selectedCategory;
      const matchLevel =
        selectedLevel === "all" || tutorial.level === selectedLevel;
      const matchQuery =
        !q ||
        tutorial.title.toLowerCase().includes(q) ||
        tutorial.description.toLowerCase().includes(q) ||
        (tutorial.role && tutorial.role.toLowerCase().includes(q)) ||
        (tutorial.keyTakeaways &&
          tutorial.keyTakeaways.some((t) => t.toLowerCase().includes(q)));
      return matchCat && matchLevel && matchQuery;
    });
  }, [query, selectedCategory, selectedLevel]);

  // Filtered product films
  const filteredFilms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return productFilms.filter((film) => {
      return (
        !q ||
        film.title.toLowerCase().includes(q) ||
        film.description.toLowerCase().includes(q) ||
        film.tag.toLowerCase().includes(q)
      );
    });
  }, [query]);

  // Active guide
  const activeGuide = useMemo(() => {
    return stepGuides.find((g) => g.id === selectedGuideId) ?? stepGuides[0];
  }, [selectedGuideId]);

  // Modal navigation helpers
  const allModalPlayables = useMemo(() => {
    return [...tutorials, ...productFilms];
  }, []);

  const currentModalIndex = useMemo(() => {
    if (!activeModalItem) return -1;
    return allModalPlayables.findIndex((item) => item.id === activeModalItem.id);
  }, [activeModalItem, allModalPlayables]);

  const handlePrevModal = () => {
    if (currentModalIndex > 0) {
      setActiveModalItem(allModalPlayables[currentModalIndex - 1]);
    } else {
      setActiveModalItem(allModalPlayables[allModalPlayables.length - 1]);
    }
  };

  const handleNextModal = () => {
    if (currentModalIndex < allModalPlayables.length - 1) {
      setActiveModalItem(allModalPlayables[currentModalIndex + 1]);
    } else {
      setActiveModalItem(allModalPlayables[0]);
    }
  };

  // Helper to get category name
  const getCategoryName = (id: string) => {
    return tutorialCategories.find((c) => c.id === id)?.name ?? id;
  };

  return (
    <div className="bg-navy-950 text-white min-h-screen selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-white/10">
        {/* Animated educational technology background glow */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[650px] w-[650px] rounded-full bg-purple-600/15 blur-[140px]" />
          <div className="absolute -right-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[140px]" />
          <div className="absolute left-1/3 bottom-0 h-[450px] w-[450px] rounded-full bg-fuchsia-600/10 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="container-x relative z-10 mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            
            {/* Left Column: Heading, Eyebrow, Description & CTAs */}
            <div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.05)}
                className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-purple-200 shadow-sm backdrop-blur-md"
              >
                <GraduationCap className="h-4 w-4 text-purple-300" />
                <span>MASTER EVERY FEATURE · BUILD A SMARTER SCHOOL</span>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.15)}
                className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white text-balance sm:mt-6 sm:text-5xl md:text-6xl lg:text-[3.75rem]"
              >
                Master Every Feature.{" "}
                <span className="block text-gradient">
                  Build a Smarter School.
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.25)}
                className="mt-6 max-w-xl text-base leading-relaxed text-purple-100/80 sm:text-lg"
              >
                Explore practical video tutorials and step-by-step guides to configure IEP Schools, manage daily school operations and get the most out of every module.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.35)}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#tutorial-library"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-glow transition-all duration-200 hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] hover:brightness-110 active:scale-[0.98] sm:text-base"
                >
                  <span>Browse Tutorials</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Button
                  to="/contact?topic=demo"
                  variant="light"
                  size="lg"
                  className="px-6 border-white/20 text-white hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4 text-purple-300" />
                  <span>Book a Live Walkthrough</span>
                </Button>
              </motion.div>

              {/* Quick Trust Indicators */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.45)}
                className="mt-10 flex flex-wrap items-center gap-6 text-xs text-purple-200/75"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Real ERP Demonstrations
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Step-by-Step Instructions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  CBSE Norms Aligned
                </span>
              </motion.div>
            </div>

            {/* Right Column: Visually Attractive Video Player Preview Card with Floating Icons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.25)}
              className="relative mx-auto w-full max-w-[560px]"
            >
              {/* Ambient glow behind preview frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-600/35 via-violet-500/25 to-fuchsia-500/20 blur-2xl opacity-75 animate-pulse"
              />

              {/* Player Preview Glass Card with Autoplay & Sequential Video Playlist */}
              <div className="relative overflow-hidden rounded-[24px] border border-purple-400/30 bg-navy-900/90 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_40px_rgba(147,51,234,0.3)] backdrop-blur-xl">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-950 group">
                  <video
                    ref={heroVideoRef}
                    key={currentHeroVideo.src}
                    className="h-full w-full object-cover"
                    playsInline
                    autoPlay
                    muted={isHeroMuted}
                    preload="auto"
                    onEnded={handleHeroVideoEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={currentHeroVideo.src} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>

                  {/* Gradient overlay for badges and controls */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/60" />

                  {/* Top Header Badge & Live Indicator */}
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-950/85 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{currentHeroVideo.tag}</span>
                    </span>
                    <span className="rounded-full border border-purple-400/30 bg-purple-950/75 px-2 py-0.5 text-[10px] font-semibold text-purple-200 backdrop-blur-md">
                      {heroPlaylistIndex + 1}/{tutorialHeroPlaylist.length}
                    </span>
                  </div>

                  {/* Top-Right Mute/Unmute & Duration Buttons */}
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleHeroMute}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold shadow-lift backdrop-blur-md transition-all active:scale-95",
                        isHeroMuted
                          ? "border border-amber-400/60 bg-amber-950/85 text-amber-200 hover:bg-amber-900"
                          : "border border-emerald-400/60 bg-emerald-950/85 text-emerald-200 hover:bg-emerald-900"
                      )}
                      aria-label={isHeroMuted ? "Unmute video voiceover" : "Mute video audio"}
                    >
                      {isHeroMuted ? (
                        <>
                          <VolumeX className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                          <span>Tap for Sound</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                          <span>Voice Active 🔊</span>
                        </>
                      )}
                    </button>

                    <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white/90 backdrop-blur-md">
                      {currentHeroVideo.duration}
                    </span>
                  </div>

                  {/* Floating Center Tap-to-Unmute Callout if muted */}
                  {isHeroMuted && (
                    <div className="absolute inset-x-0 bottom-14 z-10 flex justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={toggleHeroMute}
                        className="pointer-events-auto flex items-center gap-2 rounded-full border border-purple-400/50 bg-navy-950/90 px-4 py-1.5 text-xs font-bold text-white shadow-[0_4px_25px_rgba(103,56,245,0.7)] backdrop-blur-md transition-all hover:bg-purple-600 hover:scale-105 active:scale-95"
                      >
                        <Volume2 className="h-4 w-4 text-purple-300 animate-bounce" />
                        <span>Unmute Voice & Sound</span>
                      </button>
                    </div>
                  )}

                  {/* Bottom Controls Bar on Video */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-3 bg-gradient-to-t from-navy-950 via-navy-950/90 to-transparent">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-white transition-all hover:bg-purple-500 active:scale-95 shadow-md"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="ml-0.5 h-4 w-4 fill-current" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrevHeroVideo}
                        className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-navy-900/80 text-purple-200 transition-colors hover:text-white"
                        title="Previous video"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextHeroVideo}
                        className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-navy-900/80 text-purple-200 transition-colors hover:text-white"
                        title="Next video"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="hidden sm:block text-center text-xs">
                      <p className="font-extrabold text-white truncate max-w-[210px]">
                        {currentHeroVideo.title}
                      </p>
                      <p className="text-[10px] text-purple-300/80">
                        Sequential autoplay with sound
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleNextHeroVideo}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-navy-900/80 px-2.5 py-1 text-[11px] font-semibold text-purple-200 transition-colors hover:text-white hover:bg-purple-950"
                        title="Skip to next tutorial video"
                      >
                        <span>Next</span>
                        <SkipForward className="h-3 w-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const matchingTut =
                            tutorials.find(
                              (t) =>
                                t.id === currentHeroVideo.id ||
                                t.videoUrl === currentHeroVideo.src
                            ) ?? tutorials[0];
                          setActiveModalItem(matchingTut);
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-white/20"
                        title="Open full instructions"
                      >
                        <span>Steps</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-bar with playlist selector pills */}
                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between text-xs text-purple-200/80 mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-white truncate max-w-[280px]">
                      <Video className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      {currentHeroVideo.title}
                    </span>
                    <span className="text-[11px] font-semibold text-purple-300">
                      Auto-playing in order
                    </span>
                  </div>

                  {/* Horizontal Playlist Selector Pills */}
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-8">
                    {tutorialHeroPlaylist.map((item, idx) => {
                      const isActive = idx === heroPlaylistIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setHeroPlaylistIndex(idx)}
                          className={cn(
                            "group flex flex-col items-center justify-center rounded-xl p-1.5 text-center transition-all",
                            isActive
                              ? "border border-purple-400 bg-purple-600/30 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                              : "border border-white/5 bg-white/[0.02] text-purple-200/60 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                          )}
                          title={`${item.title} (${item.duration})`}
                        >
                          <span className="text-[10px] font-bold tracking-tight">
                            {idx + 1}. {item.tag.split(" ")[0]}
                          </span>
                          <span className="text-[9px] opacity-70">
                            {item.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Floating Icon 1: Attendance (Top-Left) */}
              <div className="absolute -left-6 -top-4 hidden sm:flex items-center gap-2.5 rounded-2xl border border-purple-400/30 bg-navy-900/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CalendarCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-300">Attendance</p>
                  <p className="text-xs font-extrabold">Instant Register</p>
                </div>
              </div>

              {/* Floating Icon 2: Finance (Bottom-Left) */}
              <div className="absolute -left-4 -bottom-4 hidden sm:flex items-center gap-2.5 rounded-2xl border border-purple-400/30 bg-navy-900/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:1.5s]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-purple-500/20 text-purple-300">
                  <Wallet className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-300">Finance</p>
                  <p className="text-xs font-extrabold">POS Cashier Shift</p>
                </div>
              </div>

              {/* Floating Icon 3: Students (Top-Right) */}
              <div className="absolute -right-5 top-8 hidden sm:flex items-center gap-2.5 rounded-2xl border border-purple-400/30 bg-navy-900/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:2.5s]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-500/20 text-violet-300">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-300">Students</p>
                  <p className="text-xs font-extrabold">KYC Verified</p>
                </div>
              </div>

              {/* Floating Icon 4: Academics (Bottom-Right) */}
              <div className="absolute -right-4 -bottom-2 hidden sm:flex items-center gap-2.5 rounded-2xl border border-purple-400/30 bg-navy-900/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:3.5s]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-pink-500/20 text-pink-300">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-300">Academics</p>
                  <p className="text-xs font-extrabold">CBSE Timetable</p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY LEARNING STATS STRIP
          ========================================================================= */}
      <div className="border-b border-white/10 bg-navy-900/60 py-6">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="font-display text-2xl font-black text-white sm:text-3xl">6 Real Films</p>
              <p className="mt-1 text-xs text-purple-200/70">Published Walkthroughs</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="font-display text-2xl font-black text-white sm:text-3xl">16 Modules</p>
              <p className="mt-1 text-xs text-purple-200/70">Categorized Workflows</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="font-display text-2xl font-black text-white sm:text-3xl">7 Roles</p>
              <p className="mt-1 text-xs text-purple-200/70">Tailored Learning Paths</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="font-display text-2xl font-black text-white sm:text-3xl">100% Free</p>
              <p className="mt-1 text-xs text-purple-200/70">Included With Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: 16 TUTORIAL CATEGORIES (Prompt Section 2)
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                <Layers className="h-3 w-3" />
                EXPLORE 16 ERP CATEGORIES
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                Browse Tutorials by Module
              </h2>
              <p className="mt-2 max-w-xl text-sm text-purple-200/70">
                Select any operational module to filter video walkthroughs, documentation guides, and planned release topics.
              </p>
            </div>

            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-purple-500/20 px-4 py-2 text-xs font-bold text-purple-200 hover:text-white transition-colors"
              >
                <span>Clear Category Filter ({getCategoryName(selectedCategory)})</span>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 16 Category Cards Grid */}
          <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tutorialCategories.map((cat) => {
              const IconComp = categoryIconMap[cat.id] ?? Compass;
              const isSelected = selectedCategory === cat.id;
              const matchingTutorialCount = tutorials.filter(
                (t) => t.categoryId === cat.id,
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(isSelected ? "all" : cat.id);
                    // Smooth scroll down to library
                    const elem = document.getElementById("tutorial-library");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300",
                    isSelected
                      ? "border-purple-400 bg-purple-600/20 shadow-[0_0_25px_rgba(139,92,246,0.35)] ring-1 ring-purple-400"
                      : "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.06] hover:shadow-card",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl transition-colors",
                          isSelected
                            ? "bg-purple-500 text-white"
                            : "bg-purple-500/15 text-purple-300 group-hover:bg-purple-500 group-hover:text-white",
                        )}
                      >
                        <IconComp className="h-5 w-5" />
                      </span>

                      {matchingTutorialCount > 0 ? (
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                          {matchingTutorialCount} Video{matchingTutorialCount > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
                          Roadmap
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-sm font-extrabold text-white group-hover:text-purple-200 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-purple-200/65 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-purple-400 group-hover:text-purple-300">
                    <span>{isSelected ? "Active filter" : "Explore tutorials"}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: VIDEO TUTORIAL LIBRARY (Search, Filters, Grid)
          ========================================================================= */}
      <section id="tutorial-library" className="py-16 sm:py-20 border-b border-white/10">
        <div className="container-x">
          
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                <Video className="h-3 w-3" />
                VERIFIED REAL VIDEOS
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                Video Tutorial Library
              </h2>
              <p className="mt-2 max-w-xl text-sm text-purple-200/70">
                Explore genuine product walkthroughs filmed directly inside live IEP Schools environments. Never scripted mockups.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-300/60" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search video tutorials…"
                  aria-label="Search video tutorials"
                  className="w-full rounded-full border border-white/15 bg-navy-900/90 py-2.5 pl-10 pr-9 text-xs font-medium text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Difficulty Level Pills */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-900/80 p-1">
                {(["all", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-bold transition-colors",
                      selectedLevel === lvl
                        ? "bg-purple-600 text-white"
                        : "text-purple-200/60 hover:text-white",
                    )}
                  >
                    {lvl === "all" ? "All Levels" : lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "all" || selectedLevel !== "all" || query) && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-purple-200/60">Active filters:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-200">
                  Category: {getCategoryName(selectedCategory)}
                  <button type="button" onClick={() => setSelectedCategory("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedLevel !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-200">
                  Level: {selectedLevel}
                  <button type="button" onClick={() => setSelectedLevel("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {query && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-200">
                  Query: &ldquo;{query}&rdquo;
                  <button type="button" onClick={() => setQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setQuery("");
                }}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 underline"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Tutorial Cards Grid */}
          <div className="mt-8">
            {filteredTutorials.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredTutorials.map((tut) => (
                  <article
                    key={tut.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-navy-900/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-card"
                  >
                    <div>
                      {/* Video Thumbnail with Hover Play Button */}
                      <div className="relative aspect-video overflow-hidden bg-navy-950">
                        {tut.thumbnailUrl ? (
                          <img
                            src={tut.thumbnailUrl}
                            alt={tut.title}
                            className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-purple-950 to-navy-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                        {/* Centered Play Pill */}
                        <button
                          type="button"
                          onClick={() => setActiveModalItem(tut)}
                          aria-label={`Watch tutorial: ${tut.title}`}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-purple-600 to-violet-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                            <Play className="ml-0.5 h-6 w-6 fill-current" />
                          </span>
                        </button>

                        {/* Duration Badge */}
                        {tut.duration && (
                          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                            {tut.duration}
                          </span>
                        )}

                        {/* Category Badge */}
                        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-purple-400/30 bg-navy-950/80 px-2.5 py-0.5 text-[10px] font-bold text-purple-200 backdrop-blur-md">
                          {getCategoryName(tut.categoryId)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold",
                              tut.level === "Beginner" &&
                                "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
                              tut.level === "Intermediate" &&
                                "bg-amber-500/15 text-amber-300 border border-amber-500/25",
                              tut.level === "Advanced" &&
                                "bg-rose-500/15 text-rose-300 border border-rose-500/25",
                            )}
                          >
                            <GraduationCap className="h-3 w-3" />
                            {tut.level}
                          </span>

                          {tut.role && (
                            <span className="text-purple-200/60 font-medium truncate max-w-[150px]">
                              {tut.role}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-extrabold text-white group-hover:text-purple-200 transition-colors">
                          {tut.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-purple-200/70 line-clamp-2">
                          {tut.description}
                        </p>

                        {/* Key Takeaways preview if available */}
                        {tut.keyTakeaways && tut.keyTakeaways.length > 0 && (
                          <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                              What you will learn:
                            </p>
                            {tut.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                              <p
                                key={idx}
                                className="flex items-center gap-1.5 text-[11px] text-purple-200/75"
                              >
                                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                                <span className="truncate">{takeaway}</span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="border-t border-white/10 p-5 pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(tut)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600/20 py-2.5 text-xs font-bold text-purple-200 border border-purple-400/30 transition-all hover:bg-purple-600 hover:text-white"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Watch Tutorial & Instructions</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/15 text-purple-300">
                  <Search className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">
                  No video tutorials match the selected criteria
                </h3>
                <p className="mt-1 text-xs text-purple-200/60 max-w-md mx-auto">
                  Try clearing the search query or resetting the category filter to view all verified walkthroughs.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                    setQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-5 py-2 text-xs font-bold text-purple-200 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Genuine Overview Product Films strip */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-navy-900/60 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/25">
                  Core Product Films
                </span>
                <h3 className="mt-2 text-lg font-extrabold text-white">
                  Live System Demonstrations
                </h3>
              </div>
              <p className="text-xs text-purple-200/60 max-w-sm">
                Authentic short overview clips demonstrating platform responsiveness and module workflows.
              </p>
            </div>

            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveModalItem(film)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveModalItem(film);
                  }}
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-purple-400/30 hover:bg-white/[0.05]"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-navy-950">
                    <span className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 to-navy-950" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-white shadow-md group-hover:scale-110 transition-transform">
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                      </span>
                    </span>
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">
                      {film.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-purple-400">
                      {film.tag}
                    </span>
                    <p className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                      {film.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-purple-200/60 line-clamp-1">
                      {film.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ROLE-BASED TRAINING PATHS (Prompt Section 5)
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-white/10 bg-navy-900/30">
        <div className="container-x">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
              <Users className="h-3 w-3" />
              LEARNING BY RESPONSIBILITY
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Role-Based Training Paths
            </h2>
            <p className="mt-2 max-w-xl text-sm text-purple-200/70">
              Structured learning tracks mapped directly to each school role&apos;s daily operational boundaries and permissions.
            </p>
          </div>

          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {roleLearningPaths.map((path) => {
              const RoleIcon = roleIconMap[path.iconName] ?? Users;

              return (
                <div
                  key={path.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-900/70 p-6 shadow-soft transition-all duration-300 hover:border-purple-400/40 hover:bg-navy-900"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        <RoleIcon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200">
                        {path.platformAccess.split("(")[0]}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold text-white">
                      {path.role}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-purple-300">
                      {path.title}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-purple-200/70">
                      {path.description}
                    </p>

                    {/* Core workflows checklist */}
                    <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                        Core Responsibilities:
                      </p>
                      {path.coreWorkflows.map((workflow, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-purple-200/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{workflow}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(path.role.toLowerCase());
                        const elem = document.getElementById("tutorial-library");
                        if (elem) elem.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600/20 py-2.5 text-xs font-bold text-purple-200 border border-purple-400/30 transition-all hover:bg-purple-600 hover:text-white"
                    >
                      <span>Explore {path.role} Tutorials</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: STEP-BY-STEP OPERATIONAL GUIDES (Prompt Section 6)
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="container-x">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
              <FileText className="h-3 w-3" />
              DETAILED DOCUMENTATION
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Step-by-Step Configuration Guides
            </h2>
            <p className="mt-2 max-w-xl text-sm text-purple-200/70">
              In-depth procedural documentation detailing how to configure master school parameters, enroll students, and manage finances.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr]">
            
            {/* Left Nav: Guide Selector Tabs */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2 px-1">
                Select Guide ({stepGuides.length} Available)
              </p>
              {stepGuides.map((guide) => {
                const isSelected = guide.id === selectedGuideId;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={cn(
                      "w-full text-left rounded-2xl p-4 transition-all duration-200 border",
                      isSelected
                        ? "border-purple-400 bg-purple-600/20 text-white shadow-soft ring-1 ring-purple-400"
                        : "border-white/10 bg-navy-900/60 text-purple-200/70 hover:border-purple-400/30 hover:text-white",
                    )}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-purple-300">
                      <span>{guide.categoryName}</span>
                      <span>{guide.estimatedMinutes}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-white">
                      {guide.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Panel: Active Step Guide Documentation Detail */}
            <div className="rounded-3xl border border-white/10 bg-navy-900/80 p-6 sm:p-8 shadow-card">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-1 text-[10px] font-bold text-purple-200 uppercase tracking-wider">
                    {activeGuide.categoryName} • {activeGuide.difficulty}
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                    {activeGuide.title}
                  </h3>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-purple-200/80">
                  <Clock className="h-3.5 w-3.5 text-purple-300" />
                  Estimated: {activeGuide.estimatedMinutes}
                </span>
              </div>

              {/* Introduction */}
              <p className="mt-5 text-sm leading-relaxed text-purple-100/90">
                {activeGuide.intro}
              </p>

              {/* Authentic Screenshot Preview */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-navy-950">
                <div className="relative aspect-[21/9] sm:aspect-[2.4/1]">
                  <img
                    src={activeGuide.screenshot}
                    alt={activeGuide.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-navy-950/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur border border-white/10">
                    Live Interface: {activeGuide.title}
                  </span>
                </div>
              </div>

              {/* Numbered Step Instructions */}
              <div className="mt-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Numbered Instructions
                </h4>
                {activeGuide.steps.map((st) => (
                  <div
                    key={st.number}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 font-display text-sm font-black text-white shadow-sm">
                      {st.number}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-white">{st.title}</h5>
                      <p className="mt-1 text-xs leading-relaxed text-purple-200/80">
                        {st.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips and Warnings Box */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Tip */}
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4">
                  <Lightbulb className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Best Practice Tip
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-100/80">
                      {activeGuide.tips}
                    </p>
                  </div>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Important Warning
                    </p>
                    <p className="mt-1 text-xs leading-5 text-amber-100/80">
                      {activeGuide.warning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Guides Links */}
              {activeGuide.relatedGuideIds.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-xs">
                  <span className="font-semibold text-purple-200/60">Related Guides:</span>
                  {activeGuide.relatedGuideIds.map((relId) => {
                    const relGuide = stepGuides.find((g) => g.id === relId);
                    if (!relGuide) return null;
                    return (
                      <button
                        key={relId}
                        type="button"
                        onClick={() => setSelectedGuideId(relId)}
                        className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 font-bold text-purple-300 hover:bg-purple-500/20 hover:text-white transition-colors"
                      >
                        <span>{relGuide.title}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TUTORIAL DETAIL MODAL DIALOG (Prompt Section 4)
          ========================================================================= */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop blur */}
          <div
            tabIndex={-1}
            onClick={() => setActiveModalItem(null)}
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-400/40 bg-navy-900 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-500/20 text-purple-300">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-200">
                    {"categoryId" in activeModalItem
                      ? getCategoryName(activeModalItem.categoryId)
                      : activeModalItem.tag}
                  </span>
                  <p className="text-xs text-purple-200/60 font-medium">
                    Duration: {activeModalItem.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevModal}
                  aria-label="Previous tutorial"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-purple-200 hover:bg-white/10 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextModal}
                  aria-label="Next tutorial"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-purple-200 hover:bg-white/10 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  aria-label="Close dialog"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-purple-200 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <video
                key={"src" in activeModalItem ? activeModalItem.src : activeModalItem.videoUrl ?? ""}
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                <source
                  src={
                    "src" in activeModalItem
                      ? activeModalItem.src
                      : activeModalItem.videoUrl ?? "/media/about.mp4"
                  }
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Detail Information Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {activeModalItem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-purple-100/80">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Numbered Steps if available */}
              {"steps" in activeModalItem && activeModalItem.steps && activeModalItem.steps.length > 0 && (
                <div className="border-t border-white/10 pt-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Step-by-Step Procedure
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalItem.steps.map((st) => (
                      <div
                        key={st.step}
                        className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-purple-600 font-bold text-white">
                          {st.step}
                        </span>
                        <div>
                          <p className="font-bold text-white">{st.title}</p>
                          <p className="mt-0.5 text-purple-200/75 leading-relaxed">
                            {st.instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Tutorials in Modal */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
                  More Video Walkthroughs
                </p>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {tutorials
                    .filter((t) => t.id !== activeModalItem.id)
                    .slice(0, 2)
                    .map((relTut) => (
                      <button
                        key={relTut.id}
                        type="button"
                        onClick={() => setActiveModalItem(relTut)}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-left transition-colors hover:border-purple-400/40 hover:bg-white/[0.06]"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-600/30 text-purple-300">
                          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">
                            {relTut.title}
                          </p>
                          <p className="text-[10px] text-purple-200/60">
                            {relTut.duration} • {getCategoryName(relTut.categoryId)}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 7: BOTTOM CTA BAND
          ========================================================================= */}
      <CtaBand
        title="Need a custom walkthrough for your school team?"
        description="Our onboarding team will guide your administrators, coordinators, and accountants through your school's exact CBSE/State academic workflows."
        secondary="features"
      />

    </div>
  );
}

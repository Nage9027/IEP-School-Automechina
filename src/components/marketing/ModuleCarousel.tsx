"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bus,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Library,
  MessagesSquare,
  Pause,
  UserPlus,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Unified school-wide overview with real-time metrics.",
    icon: LayoutDashboard,
  },
  {
    id: "student-management",
    name: "Student Management",
    description: "Complete student lifecycle from admission to alumni.",
    icon: GraduationCap,
  },
  {
    id: "admissions-management",
    name: "Admissions Management",
    description: "Streamline applications and enrollment workflows.",
    icon: UserPlus,
  },
  {
    id: "attendance-management",
    name: "Attendance Management",
    description: "Daily marking, automated alerts, and reporting.",
    icon: CalendarCheck,
  },
  {
    id: "academic-management",
    name: "Academic Management",
    description: "Timetables, subjects, lesson plans, curriculum.",
    icon: BookOpen,
  },
  {
    id: "fee-finance-management",
    name: "Fee & Finance Management",
    description: "Fee structures, collections, ledgers, reporting.",
    icon: Wallet,
  },
  {
    id: "parent-communication",
    name: "Parent Communication",
    description: "Messaging, announcements, circulars, engagement.",
    icon: MessagesSquare,
  },
  {
    id: "examination-results",
    name: "Examination & Results",
    description: "Scheduling, marks entry, analytics, report cards.",
    icon: ClipboardList,
  },
  {
    id: "transport-management",
    name: "Transport Management",
    description: "Vehicles, routes, trips, boarding, live tracking.",
    icon: Bus,
  },
  {
    id: "library-management",
    name: "Library Management",
    description: "Catalog, issue/return, inventory (planned module).",
    icon: Library,
  },
  {
    id: "reports-analytics",
    name: "Reports & Analytics",
    description: "Academic, operational, financial insights hub.",
    icon: BarChart3,
  },
] as const;

function ModuleCard({
  module,
  isActive,
}: {
  module: typeof MODULES[number];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col items-center text-center p-6 rounded-[1.5rem] border bg-white transition-all duration-500 ease-out",
        isActive
          ? "border-purple-300 shadow-[0_20px_50px_-20px_rgba(109,56,245,0.25)] ring-2 ring-purple-200 scale-[1.02] z-10"
          : "border-border shadow-card",
      )}
    >
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
          <Award className="h-3.5 w-3.5" />
          Active Module
        </div>
      )}

      <div
        className={cn(
          "mb-5 flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300",
          isActive
            ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-glow"
            : "bg-purple-50 text-purple-700",
        )}
      >
        <module.icon className={cn("h-8 w-8", isActive ? "text-white" : "text-purple-700")} />
      </div>

      <h3 className="mb-2 text-lg font-extrabold text-navy-900">
        {module.name}
      </h3>

      <p className="text-sm leading-6 text-slate-500 flex-1">
        {module.description}
      </p>

      <div className="mt-6 pt-4 border-t border-border w-full">
        <button className="inline-flex items-center justify-center gap-1.5 w-full rounded-full bg-purple-50 text-purple-700 px-4 py-2.5 text-sm font-bold hover:bg-purple-100 transition-colors">
          Explore {module.name}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ModuleCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const advance = useCallback(() => {
    if (!isPlaying || reducedMotion) return;

    setActiveIdx((i) => (i + 1) % MODULES.length);
  }, [isPlaying, reducedMotion]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying || reducedMotion) return;

    intervalRef.current = setInterval(advance, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, reducedMotion, advance]);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-purple-700">
            <Award className="h-3.5 w-3.5" />
            Complete Module Ecosystem
          </span>
          <h2 className="mt-5 text-3xl font-display font-extrabold leading-[1.1] tracking-[-0.03em] text-navy-900 sm:text-4xl lg:text-[2.9rem]">
            Eleven Modules.{" "}
            <span className="text-gradient">One Connected Platform.</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-slate-500 sm:text-lg">
            Every module works from the same school record.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center gap-2 mb-10">
            {MODULES.map((_, index) => (
              <button
                key={MODULES[index].id}
                onClick={() => setActiveIdx(index)}
                aria-label={`Go to ${MODULES[index].name}`}
                aria-current={index === activeIdx ? "true" : "false"}
                className={cn(
                  "relative w-10 h-1.5 rounded-full transition-all duration-300",
                  index === activeIdx
                    ? "bg-purple-600 shadow-[0_0_12px_rgba(109,56,245,0.5)]"
                    : "bg-purple-100 hover:bg-purple-200",
                )}
              >
                {index === activeIdx && (
                  <div
                    className="absolute bottom-full left-0 h-1.5 rounded-full bg-purple-600"
                    style={{
                      width: "0%",
                      transition: "width 0.1s linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="overflow-hidden" style={{ minHeight: "380px" }}>
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(${-activeIdx * (100 / MODULES.length)}%)`,
                  width: `${MODULES.length * 100}%`,
                }}
              >
                {MODULES.map((module) => (
                  <div
                    key={module.id}
                    className="w-full flex-shrink-0 px-3"
                    style={{ width: `${100 / MODULES.length}%` }}
                  >
                    <ModuleCard module={module} isActive={module.id === MODULES[activeIdx].id} />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none lg:hidden">
              <button
                onClick={() => setActiveIdx((i) => (i - 1 + MODULES.length) % MODULES.length)}
                aria-label="Previous module"
                className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-purple-200 text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:border-purple-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveIdx((i) => (i + 1) % MODULES.length)}
                aria-label="Next module"
                className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-purple-200 text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:border-purple-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between w-full px-4">
              <button
                onClick={() => setActiveIdx((i) => (i - 1 + MODULES.length) % MODULES.length)}
                aria-label="Previous module"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-purple-200 text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:border-purple-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveIdx((i) => (i + 1) % MODULES.length)}
                aria-label="Next module"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-purple-200 text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:border-purple-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause carousel" : "Resume carousel"}
              className="flex items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
              <span className="text-sm font-semibold text-purple-700">
                {isPlaying ? "Pause" : "Resume"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

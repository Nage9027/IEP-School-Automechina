import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeroBenefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
  breadcrumb,
  compact = false,
  benefits,
  tone = "dark",
  backgroundImage,
  className,
  bottomWave = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  breadcrumb: string;
  compact?: boolean;
  benefits?: PageHeroBenefit[];
  tone?: "dark" | "light";
  backgroundImage?: string;
  className?: string;
  bottomWave?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        className,
        isLight
          ? "bg-gradient-to-b from-[#FAF8FF] via-[#F4EFFE]/50 to-white text-navy-900 border-b border-purple-100/70"
          : "bg-navy-950 text-white",
      )}
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
    >
      {backgroundImage && !isLight ? (
        <div
          aria-hidden="true"
          className="page-hero-image-overlay pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#080719]/80 via-[#110c32]/55 to-[#211044]/35"
        />
      ) : !isLight ? (
        <>
          <div className="absolute inset-0 dark-glow" />
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
        </>
      ) : null}

      {isLight && (
        <>
          <div className="pointer-events-none absolute -left-32 top-8 h-[400px] w-[400px] rounded-full bg-violet-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-16 h-[500px] w-[500px] rounded-full bg-indigo-200/25 blur-3xl" />
        </>
      )}

      {bottomWave && (
        <svg
          aria-hidden="true"
          className="application-hero-wave pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-9 w-full sm:h-12 lg:h-16"
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
        >
          <path
            d="M0 34 C170 52 300 48 465 31 C640 13 755 20 900 35 C1080 53 1205 43 1325 26 C1370 20 1408 19 1440 24 L1440 72 L0 72 Z"
            fill="#F8F7FF"
          />
        </svg>
      )}

      <div className="container-x relative z-10 py-12 sm:py-16 lg:py-20">
        <nav
          className={cn(
            "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
            isLight ? "text-slate-500" : "text-white/55",
          )}
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className={cn(
              "transition-colors",
              isLight ? "hover:text-violet-700" : "hover:text-white/80",
            )}
          >
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className={isLight ? "text-violet-700 font-bold" : "text-white/80"}>
            {breadcrumb}
          </span>
        </nav>

        <div
          className={cn(
            "mt-6 grid items-center gap-10",
            aside ? "lg:grid-cols-[1.1fr_0.9fr]" : "max-w-3xl",
          )}
        >
          <div>
            <span
              className={cn(
                "eyebrow",
                isLight
                  ? "border border-purple-200 bg-white text-purple-700 shadow-xs"
                  : "eyebrow-dark",
              )}
            >
              {eyebrow}
            </span>
            <h1
              className={cn(
                "mt-4 font-extrabold leading-[1.08] tracking-[-0.04em]",
                compact
                  ? "text-3xl sm:text-4xl"
                  : "text-4xl sm:text-5xl lg:text-[3.4rem]",
                isLight ? "text-navy-900" : "text-white",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
                isLight ? "text-slate-600" : "text-white/65",
              )}
            >
              {description}
            </p>
            {children && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {children}
              </div>
            )}
          </div>

          {aside && <div className="relative">{aside}</div>}
        </div>

        {/* 3 or 4 Relevant Benefit Highlights */}
        {benefits && benefits.length > 0 && (
          <div
            className={cn(
              "mt-12 grid grid-cols-2 gap-4 border-t pt-8 sm:grid-cols-4",
              isLight ? "border-purple-100" : "border-white/10",
            )}
          >
            {benefits.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                    isLight
                      ? "bg-purple-50 text-purple-600 ring-1 ring-purple-100"
                      : "bg-white/10 text-violet-300 ring-1 ring-white/15",
                  )}
                >
                  <b.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-xs font-black leading-tight",
                      isLight ? "text-navy-900" : "text-white",
                    )}
                  >
                    {b.title}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-[11px] font-medium leading-tight",
                      isLight ? "text-slate-500" : "text-white/60",
                    )}
                  >
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

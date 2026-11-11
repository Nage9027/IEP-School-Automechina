import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import type { ProductFilm } from "@/content/types";
import { cn } from "@/lib/utils";

export function VideoCard({
  film,
  className,
  compact = false,
}: {
  film: ProductFilm;
  className?: string;
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-3xl border border-ink/10 bg-navy-950 shadow-soft",
        className,
      )}
    >
      <div className="relative aspect-video bg-navy-900">
        {playing && !failed ? (
          <video
            className="h-full w-full bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="none"
            onError={() => setFailed(true)}
          >
            <source src={film.src} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
            aria-label={`Play ${film.title}`}
            onClick={() => {
              setFailed(false);
              setPlaying(true);
            }}
          >
            <span className="absolute inset-0 dark-glow opacity-90" />
            <span className="absolute inset-0 grid-pattern opacity-[0.08]" />
            {failed ? (
              <>
                <RotateCcw className="relative h-8 w-8 text-white/70" />
                <span className="relative max-w-xs text-xs font-semibold text-white/70">
                  This browser could not play the embedded film. Reload the page
                  or try a different browser.
                </span>
              </>
            ) : (
              <>
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-violet-700 shadow-lift transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </span>
                <span className="relative">
                  <span className="block text-sm font-extrabold text-white sm:text-base">
                    {film.title}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                    {film.tag} · {film.duration}
                  </span>
                </span>
              </>
            )}
          </button>
        )}
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white/80 backdrop-blur">
          {film.duration}
        </span>
      </div>
      {!compact && (
        <div className="border-t border-white/10 p-5">
          <h3 className="text-sm font-bold text-white">{film.title}</h3>
          <p className="mt-1.5 text-xs leading-6 text-white/65">
            {film.description}
          </p>
        </div>
      )}
    </article>
  );
}

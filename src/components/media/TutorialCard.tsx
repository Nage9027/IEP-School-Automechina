import { useState } from "react";
import { Clock, GraduationCap, Play } from "lucide-react";
import type { Tutorial } from "@/content/types";
import { cn } from "@/lib/utils";

export function TutorialCard({
  tutorial,
  categoryName,
}: {
  tutorial: Tutorial;
  categoryName: string;
}) {
  const [playing, setPlaying] = useState(false);
  const isDirectVideo =
    tutorial.videoUrl?.endsWith(".mp4") ||
    tutorial.videoUrl?.endsWith(".webm");

  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-video bg-navy-950">
        {playing && tutorial.videoUrl ? (
          isDirectVideo ? (
            <video
              className="h-full w-full object-contain"
              controls
              autoPlay
              playsInline
              preload="metadata"
              src={tutorial.videoUrl}
            />
          ) : (
            <iframe
              className="h-full w-full"
              src={tutorial.videoUrl}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <button
            type="button"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
            aria-label={`Play tutorial: ${tutorial.title}`}
            onClick={() => setPlaying(true)}
          >
            {tutorial.thumbnailUrl ? (
              <img
                src={tutorial.thumbnailUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
            ) : (
              <span className="absolute inset-0 dark-glow" />
            )}
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-violet-700 shadow-lift">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
            <span className="relative text-xs font-bold text-white">
              Watch tutorial
            </span>
          </button>
        )}
        {tutorial.duration && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white">
            {tutorial.duration}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
            {categoryName}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold",
              tutorial.level === "Beginner" && "bg-emerald-50 text-emerald-700",
              tutorial.level === "Intermediate" && "bg-amber-50 text-amber-800",
              tutorial.level === "Advanced" && "bg-rose-50 text-rose-700",
            )}
          >
            <GraduationCap className="h-3 w-3" />
            {tutorial.level}
          </span>
          {tutorial.duration && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink/60">
              <Clock className="h-3 w-3" />
              {tutorial.duration}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-sm font-extrabold text-navy-900">
          {tutorial.title}
        </h3>
        <p className="mt-1.5 text-xs leading-6 text-ink/65">
          {tutorial.description}
        </p>
      </div>
    </article>
  );
}

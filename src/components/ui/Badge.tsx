import { cn } from "@/lib/utils";
import type { Availability } from "@/content/types";

const styles: Record<Availability, string> = {
  available: "border-emerald-200 bg-emerald-50 text-emerald-700",
  beta: "border-amber-200 bg-amber-50 text-amber-800",
  upcoming: "border-slate-200 bg-slate-100 text-slate-600",
};

const labels: Record<Availability, string> = {
  available: "Available",
  beta: "Beta",
  upcoming: "Upcoming",
};

export function AvailabilityBadge({
  status,
  className,
  label,
}: {
  status: Availability;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        styles[status],
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "available" && "bg-emerald-500",
          status === "beta" && "bg-amber-500",
          status === "upcoming" && "bg-slate-400",
        )}
      />
      {label ?? labels[status]}
    </span>
  );
}

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

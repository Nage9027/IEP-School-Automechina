import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}

export function Logo({
  tone = "dark",
  className,
}: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="IEP Schools - Smart Education ERP"
      className={cn(
        "group inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 transition-opacity hover:opacity-95 shrink-0 select-none",
        className,
      )}
    >
      {/* Official IEP Schools Emblem Asset */}
      <img
        src="/brand/iep-schools-mark-transparent.png"
        alt="IEP Schools"
        width={561}
        height={353}
        loading="eager"
        decoding="async"
        className="h-9 sm:h-10 md:h-[42px] lg:h-[46px] w-auto max-h-[50px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Brand Typography Lockup */}
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={cn(
            "font-display font-extrabold tracking-[-0.03em] transition-colors duration-200",
            "text-[15.5px] sm:text-[17px] md:text-[18.5px] lg:text-[19.5px]",
            tone === "dark" ? "text-navy-950" : "text-white",
          )}
        >
          IEP Schools
        </span>
        <span
          className={cn(
            "mt-0.5 font-bold uppercase tracking-[0.19em] transition-colors duration-200",
            "text-[7.5px] sm:text-[8px] md:text-[8.5px] lg:text-[9px]",
            tone === "dark" ? "text-purple-700/85" : "text-purple-200/85",
          )}
        >
          Smart Education
        </span>
      </span>
    </Link>
  );
}

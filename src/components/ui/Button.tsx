import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "gold";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet-600 text-white shadow-glow hover:bg-violet-700 active:bg-violet-800",
  secondary:
    "bg-navy-900 text-white shadow-soft hover:bg-navy-800 active:bg-navy-700",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-violet-300 hover:bg-violet-50",
  ghost: "text-ink hover:bg-ink/5",
  light:
    "border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15",
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  to?: string;
  href?: string;
  external?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  ariaLabel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  to,
  href,
  external = false,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

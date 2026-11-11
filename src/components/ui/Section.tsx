import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "light" | "tint" | "dark" | "white";
const SectionToneContext = createContext<SectionTone>("light");

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
}) {
  return (
    <SectionToneContext.Provider value={tone}>
      <section
        id={id}
        className={cn(
          "py-16 sm:py-20 lg:py-24",
          tone === "light" && "bg-surface",
          tone === "tint" && "bg-violet-50/60",
          tone === "white" && "bg-white",
          tone === "dark" && "bg-navy-950 text-white",
          className,
        )}
      >
        {children}
      </section>
    </SectionToneContext.Provider>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone,
  className,
  titleClassName,
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  const inheritedTone = useContext(SectionToneContext);
  const resolvedTone = tone ?? (inheritedTone === "dark" ? "dark" : "light");
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", resolvedTone === "dark" && "eyebrow-dark")}>
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "mt-5 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.9rem]",
          resolvedTone === "dark" ? "text-white" : "text-navy-900",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-7 sm:text-lg",
            resolvedTone === "dark" ? "text-white/75" : "text-ink/65",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

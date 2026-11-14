import { useContext, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionToneContext } from "@/components/ui/Section";

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
  tone,
}: {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const inheritedTone = useContext(SectionToneContext);
  const isDark = (tone ?? (inheritedTone === "dark" ? "dark" : "light")) === "dark";

  return (
    <div className={cn("border-b last:border-0", isDark ? "border-white/10" : "border-slate-200/70")}>
      <h3>
        <button
          type="button"
          className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={cn(
              "text-base font-bold leading-6 transition-colors sm:text-lg",
              isDark
                ? "text-white group-hover:text-purple-300"
                : "text-navy-900 group-hover:text-purple-700",
            )}
          >
            {question}
          </span>
          <span
            className={cn(
              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
              isDark
                ? open
                  ? "rotate-180 border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "border-white/15 bg-white/10 text-white/90 group-hover:bg-white/20 group-hover:text-white"
                : open
                  ? "rotate-180 border-violet-200 bg-violet-50 text-violet-700"
                  : "border-slate-200 bg-white text-slate-600 group-hover:border-purple-300 group-hover:text-purple-700",
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "pb-6 pr-12 text-sm leading-7 sm:text-base",
              isDark ? "text-slate-200/90" : "text-slate-600",
            )}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const inheritedTone = useContext(SectionToneContext);
  const isDark = inheritedTone === "dark";

  return (
    <div
      className={cn(
        "divide-y",
        isDark ? "divide-white/10" : "divide-slate-200/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-b border-ink/10 last:border-0">
      <h3>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="text-base font-bold leading-6 text-navy-900 sm:text-lg">
            {question}
          </span>
          <span
            className={cn(
              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-ink/60 transition-transform duration-300",
              open && "rotate-180 border-violet-200 bg-violet-50 text-violet-700",
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
          <div className="pb-6 pr-12 text-sm leading-7 text-ink/65 sm:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="divide-y divide-ink/10">{children}</div>;
}

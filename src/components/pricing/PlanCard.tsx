import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/lib/content";
import { cn, formatInr } from "@/lib/utils";
import type { Plan } from "@/content/types";

export function PlanCard({
  plan,
  annual,
  featureCount,
  compact = false,
}: {
  plan: Plan;
  annual: boolean;
  featureCount?: number;
  compact?: boolean;
}) {
  const { annualMonths } = useSiteContent();
  const price = annual ? plan.annual : plan.monthly;
  const savings =
    annual && plan.monthly && plan.annual
      ? plan.monthly * 12 - plan.annual
      : 0;
  const shownFeatures = featureCount
    ? plan.features.slice(0, featureCount)
    : plan.features;
  const remaining = plan.features.length - shownFeatures.length;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-soft",
        plan.highlighted
          ? "border-violet-300 shadow-lift ring-1 ring-violet-200"
          : "border-ink/10",
        compact && "p-5",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
          Most popular
        </span>
      )}

      <div>
        <h3 className="text-lg font-extrabold tracking-tight text-navy-900">
          {plan.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-ink/65">{plan.tagline}</p>
      </div>

      <div className="mt-6">
        {price === null ? (
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold tracking-[-0.04em] text-navy-900">
              Custom
            </span>
          </div>
        ) : (
          <div className="flex items-end gap-1.5">
            <span className="text-4xl font-extrabold tracking-[-0.04em] text-navy-900">
              {price === 0 ? "₹0" : formatInr(price)}
            </span>
            <span className="mb-1 text-xs font-semibold text-ink/60">
              /{annual ? "year" : "month"}
            </span>
          </div>
        )}
        <p className="mt-2 min-h-[32px] text-[11px] leading-5 text-ink/60">
          {price === null
            ? "Quoted after a requirements review."
            : annual && savings > 0
              ? `Annual billing · ${annualMonths} months billed for 12 · save ${formatInr(savings)}`
              : plan.priceNote}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 border-y border-ink/10 py-4 text-[11px]">
        <div>
          <p className="font-bold uppercase tracking-wide text-ink/60">Students</p>
          <p className="mt-1 font-semibold text-ink/70">{plan.limits.students}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-ink/60">Staff</p>
          <p className="mt-1 font-semibold text-ink/70">{plan.limits.staff}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-ink/60">Storage</p>
          <p className="mt-1 font-semibold text-ink/70">{plan.limits.storage}</p>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-ink/60">Support</p>
          <p className="mt-1 font-semibold text-ink/70">{plan.support}</p>
        </div>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {shownFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-ink/65">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-600" />
            <span>{feature}</span>
          </li>
        ))}
        {remaining > 0 && (
          <li className="text-[11px] font-semibold text-violet-600">
            + {remaining} more inclusions
          </li>
        )}
      </ul>

      <Button
        to={plan.ctaHref}
        variant={plan.highlighted ? "primary" : "outline"}
        size={compact ? "sm" : "md"}
        className="mt-6 w-full"
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </article>
  );
}

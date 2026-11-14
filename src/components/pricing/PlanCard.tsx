import { ArrowRight, Check, Globe, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
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
        "relative flex h-full flex-col rounded-3xl border bg-white p-6 transition-all duration-300 shadow-soft hover:-translate-y-1 hover:shadow-card-hover",
        plan.highlighted
          ? "border-purple-400 bg-gradient-to-b from-purple-50/40 via-white to-white shadow-lift ring-2 ring-purple-600/20"
          : "border-ink/10",
        compact && "p-5",
      )}
    >
      {/* Popular / Recommended Tag */}
      {plan.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
          <Sparkles className="h-3 w-3" />
          Recommended &middot; Growth Plan
        </span>
      )}

      {/* Positioning & Plan Name */}
      <div className="pt-1">
        {plan.positioning && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 rounded-full px-2.5 py-0.5 border border-purple-100">
            {plan.positioning}
          </span>
        )}
        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-navy-900">
          {plan.name}
        </h3>
        <p className="mt-1 text-xs font-medium leading-5 text-ink/70">
          {plan.tagline}
        </p>
      </div>

      {/* Pricing Block */}
      <div className="mt-5 rounded-2xl bg-surface p-4 border border-ink/5">
        {price === null ? (
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold tracking-[-0.04em] text-navy-900">
              Custom Quote
            </span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-[-0.04em] text-navy-900">
              {price === 0 ? "₹0" : formatInr(price)}
            </span>
            <span className="text-xs font-semibold text-ink/60">
              /{annual ? "year" : "month"}
            </span>
          </div>
        )}
        <p className="mt-1.5 min-h-[30px] text-[11px] leading-snug text-ink/65">
          {price === null
            ? "Quoted after institutional requirements review."
            : annual && savings > 0
              ? `Annual billing · ${annualMonths} months billed for 12 · save ${formatInr(savings)}`
              : plan.priceNote}
        </p>
      </div>

      {/* Resource Limits Pills */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-y border-ink/10 py-3 text-[11px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Students</p>
          <p className="mt-0.5 font-bold text-navy-900">{plan.limits.students}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">RAM Allocation</p>
          <p className="mt-0.5 font-bold text-purple-700">
            {plan.id === "free"
              ? "6 GB RAM (Shared)"
              : plan.id === "silver"
                ? "8 GB RAM (Cloud)"
                : plan.id === "advanced"
                  ? "16 GB Dedicated"
                  : "64 GB+ Clustered"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Storage</p>
          <p className="mt-0.5 font-bold text-navy-900">{plan.limits.storage}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">Support</p>
          <p className="mt-0.5 font-bold text-navy-900">{plan.support}</p>
        </div>
      </div>

      {/* Special Value Badges: Website & Marketing */}
      <div className="mt-4 space-y-2">
        {plan.websiteIncluded && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70 px-3 py-2 text-[11px] font-bold text-emerald-900">
            <Globe className="h-4 w-4 shrink-0 text-emerald-600" />
            <div className="min-w-0">
              <span className="block leading-tight">School Website Included</span>
              <span className="block text-[10px] font-medium text-emerald-700">
                {plan.id === "free"
                  ? "₹0 website development charge"
                  : plan.id === "silver"
                    ? "Enhanced design & staff directory"
                    : "Premium design, landing pages & SEO"}
              </span>
            </div>
          </div>
        )}

        {plan.marketingIncluded ? (
          <div className="flex items-center gap-2 rounded-xl bg-purple-50/90 border border-purple-200/80 px-3 py-2 text-[11px] font-bold text-purple-900">
            <Megaphone className="h-4 w-4 shrink-0 text-purple-600" />
            <div className="min-w-0">
              <span className="block leading-tight">Digital Marketing Included</span>
              <span className="block text-[10px] font-medium text-purple-700">
                Weekly spotlight, creatives & monthly reports
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-[10px] font-medium text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>Digital Marketing optional add-on (Included in Advanced)</span>
          </div>
        )}
      </div>

      {/* Features List */}
      <div className="mt-5 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-ink/60 mb-2">
          What is included:
        </p>
        <ul className="space-y-2">
          {shownFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-ink/75">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-600" />
              <span>{feature}</span>
            </li>
          ))}
          {remaining > 0 && (
            <li className="text-[11px] font-semibold text-purple-700">
              + {remaining} more inclusions
            </li>
          )}
        </ul>
      </div>

      {/* Target Audience Notes */}
      {plan.targetAudience && plan.targetAudience.length > 0 && (
        <div className="mt-4 pt-3 border-t border-ink/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Best for:
          </p>
          <p className="text-[11px] leading-snug text-slate-600">
            {plan.targetAudience[0]}
          </p>
        </div>
      )}

      {/* Action CTA */}
      <Button
        to={plan.ctaHref}
        variant={plan.highlighted ? "primary" : "outline"}
        size={compact ? "sm" : "md"}
        className={cn(
          "mt-5 w-full",
          plan.highlighted && "bg-[#6738F5] hover:bg-[#5826ea] text-white shadow-md shadow-purple-600/25",
        )}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </article>
  );
}

import type { Feature } from "@/content/types";
import { AvailabilityBadge } from "@/components/ui/Badge";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-700">
          <feature.icon className="h-5 w-5" />
        </span>
        <AvailabilityBadge status={feature.availability} />
      </div>
      <h3 className="mt-4 text-base font-extrabold tracking-tight text-navy-900">
        {feature.name}
      </h3>
      <dl className="mt-4 space-y-3.5">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
            What it does
          </dt>
          <dd className="mt-1 text-sm leading-6 text-ink/65">{feature.what}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
            Who uses it
          </dt>
          <dd className="mt-1 text-sm leading-6 text-ink/65">{feature.who}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
            Why it helps
          </dt>
          <dd className="mt-1 text-sm leading-6 text-ink/65">{feature.help}</dd>
        </div>
      </dl>
      {feature.note && (
        <p className="mt-4 rounded-xl border border-amber-200/70 bg-amber-50 px-3 py-2.5 text-[11px] leading-5 text-amber-900/75">
          {feature.note}
        </p>
      )}
    </article>
  );
}

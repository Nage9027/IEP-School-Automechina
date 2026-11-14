import { useMemo, useState, useCallback } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Search,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { FeatureCard } from "@/components/features/FeatureCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { features, featureModules } from "@/content/modules";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

// --- Type Definitions ---

type StatusFilter = "all" | "available" | "beta" | "upcoming";

// --- Constants ---

const STATUS_FILTERS: Record<StatusFilter, { label: string; value: StatusFilter }> = {
  all: { label: "All capabilities", value: "all" },
  available: { label: "Available", value: "available" },
  beta: { label: "Beta", value: "beta" },
  upcoming: { label: "Upcoming", value: "upcoming" },
};

/// --- Helper Functions ---

function usePageMetaFeatures() {
  usePageMeta({
    title: "School Automation Features | IEP Schools",
    description:
      "Discover the power of school automation. Explore the connected tools that automate student administration, attendance, communication, academics, finance and daily school operations.",
    path: "/features",
  });
}

function filterFeatures(
  query: string,
  status: StatusFilter,
): { module: typeof featureModules[0]; items: typeof features }[] {
  const normalized = query.trim().toLowerCase();

  return featureModules
    .map((module) => ({
      module,
      items: features.filter((feature) => {
        const matchesStatus =
          status === "all" || feature.availability === status;
        const matchesQuery =
          !normalized ||
          [feature.name, feature.what, feature.who, feature.help]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        return feature.moduleId === module.id && matchesStatus && matchesQuery;
      }),
    }))
    .filter((group) => group.items.length > 0);
}

// --- Main Component ---

export default function FeaturesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  // Initialize page meta
  usePageMetaFeatures();

  // Compute filtered groups using useMemo with proper deps
  const groups = useMemo(
    () => filterFeatures(query, status),
    [query, status],
  );

  const total = useMemo(
    () => groups.reduce((sum, group) => sum + group.items.length, 0),
    [groups],
  );

  // Memoized filter change handlers
  const handleStatusChange = useCallback(
    (newStatus: StatusFilter) => {
      setStatus(newStatus);
    },
    [],
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleClearQuery = useCallback(() => {
    setQuery("");
    setStatus("all");
  }, []);

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <PageHero
        className="features-page-hero"
        backgroundImage="/media/Images/Futuristic%20School%20Portal%20Network.png"
        eyebrow="School Automation Platform"
        title={
          <>
            Discover the Power of{" "}
            <span className="text-gradient">School Automation.</span>
          </>
        }
        description="Explore the connected tools that automate student administration, attendance, communication, academics, finance and daily school operations."
        breadcrumb="Features"
        benefits={[
          { icon: CalendarCheck, title: "Roll-Call Absence Alerts", text: "Configured parent notification" },
          { icon: Wallet, title: "Fee Collection Automation", text: "Instant receipts & ledger" },
          { icon: BookOpen, title: "Academic Timetables", text: "Teacher & class period schedules" },
          { icon: Award, title: "Automated Report Cards", text: "Examination marks processing" },
        ]}
        aside={
          <div className="feature-status-panel relative isolate overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-2xl sm:p-6">
            <span aria-hidden="true" className="feature-status-glow" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-300">
                  Platform Performance Metrics
                </p>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Certified
                </span>
              </div>
              <div className="mt-4 grid gap-2.5">
                <div className="feature-status-row rounded-xl p-3 bg-white/5 border border-white/10">
                  <span className="font-extrabold text-white text-base">99.98% Uptime SLA</span>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    High-availability cloud clustering ensures uninterrupted service during peak school hours.
                  </p>
                </div>
                <div className="feature-status-row rounded-xl p-3 bg-white/5 border border-white/10">
                  <span className="font-extrabold text-white text-base">99.6% Automated Accuracy</span>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Battle-tested calculation algorithms for fee installments, roll calls, and exam grading.
                  </p>
                </div>
                <div className="feature-status-row rounded-xl p-3 bg-white/5 border border-white/10">
                  <span className="font-extrabold text-white text-base">150+ Schools · 45,000+ Students</span>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Active across leading educational institutions with same-day digital onboarding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Button to="/contact?plan=free" size="lg">
          Explore All Features
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button to="/contact?topic=demo" variant="light" size="lg">
          <CalendarDays className="h-4 w-4" />
          Book a Demo
        </Button>
      </PageHero>

      {/* ============ SEARCH & FILTERS ============ */}
      <Section tone="white" className="py-10 sm:py-12">
        <div className="container-x">
          <div className="card p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
                <input
                  type="search"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search capabilities, roles or outcomes…"
                  aria-label="Search features"
                  className="w-full rounded-full border border-ink/15 bg-surface py-3 pl-11 pr-10 text-sm font-medium text-navy-900 placeholder:text-ink/60 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                />
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearQuery}
                    className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-ink/5 text-ink/65"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden items-center gap-1.5 pr-1 text-[11px] font-bold uppercase tracking-wide text-ink/60 sm:flex">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filter
                </span>
                {Object.entries(STATUS_FILTERS).map(
                  ([, { label, value }]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleStatusChange(value)}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                        status === value
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-ink/10 bg-white text-ink/65 hover:border-violet-200 hover:text-violet-700",
                      )}
                      aria-pressed={status === value}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Jump to
              </span>
              {featureModules.map((module) => (
                <a
                  key={module.id}
                  href={`#module-${module.id}`}
                  className="rounded-full bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink/65 transition-colors hover:bg-violet-50 hover:text-violet-700"
                >
                  {module.name}
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs font-medium text-ink/60">
              Showing {total} of {features.length} capabilities
              {query ? ` for " ${query}"` : ""}.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ MODULES GRID ============ */}
      <Section tone="light" className="pt-4 sm:pt-6">
        <div className="container-x space-y-16">
          {groups.map(({ module, items }) => (
            <section
              key={module.id}
              id={`module-${module.id}`}
              className="scroll-mt-32"
            >
              <div className="flex flex-col gap-5 border-b border-ink/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-violet-700 shadow-soft">
                    <module.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-navy-900">
                        {module.name}
                      </h2>
                      <AvailabilityBadge status={module.availability} />
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-600">
                      {module.tagline}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
                      {module.description}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-ink/60">
                  {items.length} {items.length === 1 ? "capability" : "capabilities"}
                </span>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((feature, index) => (
                  <Reveal key={feature.id} delay={Math.min(index * 40, 160)}>
                    <FeatureCard feature={feature} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          {/* Empty State */}
          {groups.length === 0 && (
            <div className="card mx-auto max-w-xl p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                <Search className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-navy-900">
                No capabilities match that filter
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Try a broader search, or reset to see every available, beta and
                upcoming capability.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={handleClearQuery}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* ============ CONVERSION CTA ============ */}
      <CtaBand
        title="Ready to automate your school's daily operations?"
        description="Experience a live demonstration of our production-ready ERP platform. See how admissions, attendance, fees, exams, and mobile portals work together seamlessly."
        secondary="pricing"
      />
    </>
  );
}
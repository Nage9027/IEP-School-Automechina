import { Fragment, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Database,
  Globe,
  HardDrive,
  Headphones,
  IndianRupee,
  Info,
  LayoutDashboard,
  Minus,
  Monitor,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wifi,
  X,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { CtaBand } from "@/components/ui/CtaBand";
import { PlanCard } from "@/components/pricing/PlanCard";
import {
  addOns,
  comparisonGroups,
  comparisonRows,
  pricingNotes,
} from "@/content/plans";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { cn, formatInr } from "@/lib/utils";

const pricingSteps = [
  {
    step: "01",
    title: "Start Free",
    desc: "Choose the Free plan and send an enquiry; our team will arrange onboarding with you.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Set Up Your School",
    desc: "Configure classrooms, academic sessions, fee structures, and staff permissions tailored to your institution.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Use the Platform",
    desc: "Manage daily attendance, record fees, generate timetables, and publish report cards seamlessly.",
    icon: LayoutDashboard,
  },
  {
    step: "04",
    title: "Grow Your Institution",
    desc: "Request a plan review when enrollment or infrastructure needs change; capacity and pricing are confirmed with the team.",
    icon: TrendingUp,
  },
  {
    step: "05",
    title: "Get Continued Support",
    desc: "Review available documentation and support options with the team during onboarding.",
    icon: Headphones,
  },
];

function PricingHeroIllustration({ ram, mobileIncluded, freePrice }: {
  ram: string;
  mobileIncluded: boolean;
  freePrice: string;
}) {
  return (
    <div className="pricing-hero-illustration relative mx-auto w-full max-w-lg lg:max-w-none">
      <div aria-hidden="true" className="pricing-hero-glow" />
      <div className="pricing-hero-image-frame">
        <img
          src="/media/Futuristic%20School%20Pricing%20Dashboard.png"
          alt="Illustration of a school connected to cloud hosting, a management dashboard, mobile app and analytics"
          className="pricing-hero-image"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="pricing-hero-badges">
        <div className="pricing-hero-badge pricing-hero-badge--server">
          <Server aria-hidden="true" /><span>{ram} RAM <small>Shared Free plan allocation</small></span>
        </div>
        <div className="pricing-hero-badge pricing-hero-badge--mobile">
          <Smartphone aria-hidden="true" /><span>Parent Mobile App <small>{mobileIncluded ? "Limited features in Free" : "Availability varies by plan"}</small></span>
        </div>
        <div className="pricing-hero-badge pricing-hero-badge--free">
          <ShieldCheck aria-hidden="true" /><span>{freePrice} Upfront <small>No card details collected here</small></span>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const { site, plans, faqs, annualMonths, freeHosting } = useSiteContent();
  const [annual, setAnnual] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");

  usePageMeta({
    title: "School Automation Pricing | Start Free | IEP Schools",
    description:
      "Compare IEP Schools plans, configured pricing, student and storage limits, included features, hosting terms and FAQs. Start with the Free plan; enquiries are handled by our team.",
    path: "/pricing",
  });

  const freePlan = plans.find((plan) => plan.id === "free");
  const corePlans = plans.filter((plan) =>
    ["free", "starter", "professional", "enterprise"].includes(plan.id),
  );
  const customPlan = plans.find((plan) => plan.id === "custom");
  const pricingFaqs = faqs.filter((faq) => faq.category === "Pricing & plans");
  const comparisonPlans = plans;
  const parentMobileIncluded = Boolean(
    freePlan?.features.some((feature) => feature.toLowerCase().includes("parent mobile app")),
  );
  const freePrice = freePlan?.monthly === 0 ? "₹0" : "Free plan";

  const pricingHeroBenefits = [
    { icon: Server, title: `${freeHosting.ram} RAM`, text: "Shared allocation in Free plan" },
    {
      icon: Smartphone,
      title: "Parent Mobile App",
      text: parentMobileIncluded ? "Limited features in Free plan" : "Availability varies by plan",
    },
    {
      icon: Database,
      title: `${freeHosting.storage} Storage`,
      text: `${freeHosting.bandwidth} bandwidth · subject to fair use`,
    },
    {
      icon: IndianRupee,
      title: `${freePrice} Upfront Cost`,
      text: "No card details collected on this website",
    },
  ];

  const hostingBenefits = [
    {
      icon: Server,
      title: "Shared Free-plan allocation",
      desc: `${freeHosting.ram} RAM and ${freeHosting.storage} storage are included with the Free plan. This is a shared allocation, not a physically dedicated server.`,
      tag: `${freeHosting.ram} RAM · ${freeHosting.storage} storage`,
    },
    {
      icon: Wifi,
      title: "Bandwidth with fair-use terms",
      desc: freeHosting.bandwidthNote,
      tag: freeHosting.bandwidth,
    },
    {
      icon: ShieldCheck,
      title: "HTTPS and role-based access",
      desc: "The deployed site uses HTTPS and staff access is controlled by role-based permissions. Hosting region and provider details are confirmed during onboarding.",
      tag: "Configured per deployment",
    },
    {
      icon: HardDrive,
      title: "Backup tooling",
      desc: "Scheduled and manual database backup options are available. Backup frequency and retention are confirmed for each deployment.",
      tag: "Schedule and retention confirmed at setup",
    },
  ];

  const trustStats = [
    { value: freeHosting.ram, label: "Free-plan RAM", desc: "Shared allocation included with the Free tier." },
    { value: freeHosting.storage, label: "Free-plan storage", desc: "Used for the database, documents and school files." },
    { value: freeHosting.bandwidth, label: "Bandwidth", desc: freeHosting.bandwidthNote },
    {
      value: freePrice,
      label: "Free-plan starting cost",
      desc: "No online checkout; plan enquiries are handled by the team.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return pricingFaqs;
    const query = faqSearch.toLowerCase();
    return pricingFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query),
    );
  }, [pricingFaqs, faqSearch]);

  return (
    <div className="pricing-page">
      <PageHero
        className="pricing-page-hero"
        eyebrow="School Automation Pricing"
        title={
          <>
            Start Free.{" "}
            <span className="text-gradient">Grow Without Limits.</span>
          </>
        }
        description="Choose a school automation plan that matches your institution. Start with essential features and upgrade as your requirements grow."
        breadcrumb="Pricing"
        benefits={pricingHeroBenefits}
        aside={
          <PricingHeroIllustration
            ram={freeHosting.ram}
            mobileIncluded={parentMobileIncluded}
            freePrice={freePrice}
          />
        }
      >
        <Button to="/contact?plan=free" size="lg">
          Start Free
          <ArrowRight className="h-4 w-4" />
        </Button>
        <a
          href="#compare-plans"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
        >
          Compare Plans
        </a>
        <Button to="/contact?topic=demo" variant="light" size="lg">
          Book a Demo
        </Button>
        <div className="mt-3 flex w-full items-center gap-2 text-xs text-white/60">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>School-specific deployment · Role-based access · No card required on this website</span>
        </div>
      </PageHero>

      {/* Pricing Header Strip & Billing Toggle */}
      <Section tone="white" className="py-10 sm:py-12">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-ink/10 bg-surface p-5 sm:flex-row sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-violet-700 shadow-sm">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">
                  This website does not process payments.
                </p>
                <p className="mt-0.5 text-xs leading-5 text-ink/65">
                  Plan enquiries go to our team. No card details are collected here.
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-colors",
                  !annual
                    ? "bg-navy-950 text-white"
                    : "text-ink/65 hover:text-navy-900",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-colors",
                  annual
                    ? "bg-violet-600 text-white"
                    : "text-ink/65 hover:text-navy-900",
                )}
              >
                Annual
                <span
                  className={cn(
                    "ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wide",
                    annual ? "bg-white/15 text-white" : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  {annualMonths} for 12
                </span>
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] leading-5 text-ink/60">
            Annual prices are indicative. They are not an automatic checkout and may
            change after a requirements review.
          </p>
        </div>
      </Section>

      {/* Plan Cards Section */}
      <Section tone="light" className="pt-4 sm:pt-6">
        <div className="container-x">
          <SectionHeading
            eyebrow="Transparent tiers"
            title="Choose the Right Plan for Your School"
            description="Start with the essentials and scale your school operations as your institution grows."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {corePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} annual={annual} />
            ))}
          </div>

          {customPlan && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-navy-950 p-6 text-white shadow-soft sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {customPlan.name}
                    </h2>
                    <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-400">
                      Contact sales
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    {customPlan.tagline}. Custom RAM, storage, capacity and
                    integrations are quoted after a requirements review.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button to={customPlan.ctaHref} variant="gold">
                      {customPlan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      href={site.contact.whatsapp}
                      external
                      variant="light"
                    >
                      WhatsApp us
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {customPlan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11px] leading-5 text-white/65"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-xs leading-6 text-ink/60">
            {site.pricingDisclaimer}
          </p>
        </div>
      </Section>

      {/* Feature Comparison Section */}
      <Section tone="white" id="compare-plans">
        <div className="container-x">
          <SectionHeading
            eyebrow="Compare plans"
            title="Compare Every Feature Before You Choose"
            description="Values combine what is verified in the ERP with proposed commercial limits. Anything not built is marked as unavailable, not hidden in a footnote."
          />

          <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/10 bg-surface">
                    <th className="sticky left-0 z-10 bg-surface px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                      Capability
                    </th>
                    {comparisonPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className={cn(
                          "px-4 py-4 text-center text-xs font-extrabold",
                          plan.highlighted ? "bg-violet-50 text-violet-800" : "text-navy-900",
                        )}
                      >
                        {plan.name}
                        <span className="mt-1 block text-[10px] font-semibold text-ink/60">
                          {annual
                            ? plan.annual === null
                              ? "Quoted"
                              : plan.annual === 0
                                ? "₹0/yr"
                                : `${formatInr(plan.annual)}/yr`
                            : plan.monthly === null
                              ? "Quoted"
                              : `${formatInr(plan.monthly)}/mo`}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonGroups.map((group) => (
                    <Fragment key={group}>
                      <tr className="border-b border-ink/10 bg-ink/[0.02]">
                        <td
                          colSpan={comparisonPlans.length + 1}
                          className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700"
                        >
                          {group}
                        </td>
                      </tr>
                      {comparisonRows
                        .filter((row) => row.group === group)
                        .map((row) => (
                          <tr
                            key={row.label}
                            className="border-b border-ink/[0.06] last:border-0"
                          >
                            <td className="sticky left-0 z-10 bg-white px-5 py-3.5 text-xs font-semibold text-ink/65">
                              {row.label}
                            </td>
                            {comparisonPlans.map((plan) => {
                              const value = row.values[plan.id];
                              return (
                                <td
                                  key={plan.id}
                                  className={cn(
                                    "px-4 py-3.5 text-center text-xs",
                                    plan.highlighted && "bg-violet-50/40",
                                  )}
                                >
                                  {typeof value === "boolean" ? (
                                    value ? (
                                      <Check className="mx-auto h-4 w-4 text-emerald-600" />
                                    ) : (
                                      <Minus className="mx-auto h-4 w-4 text-ink/20" />
                                    )
                                  ) : (
                                    <span
                                      className={cn(
                                        "font-semibold",
                                        value === "Not available" ||
                                          value === "Not included" ||
                                          value === "No"
                                          ? "text-ink/60"
                                          : "text-ink/65",
                                      )}
                                    >
                                      {value}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] leading-5 text-ink/60">
            Student, staff and storage figures are proposed starting limits. Paid
            RAM allocation is confirmed in your quotation. Plan boundaries are
            commercial terms, not automatic software locks.
          </p>

          {/* Dedicated Application Pricing Comparison */}
          <div className="mt-14">
            <h3 className="text-xl font-extrabold text-navy-900 text-center">
              Application Pricing & Access Comparison
            </h3>
            <p className="mt-2 text-xs text-slate-500 text-center max-w-xl mx-auto">
              Different school roles connect through different devices. Here is what is supported on Free versus Paid plans.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-soft">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-purple-50/60 border-b border-purple-100 text-[11px] font-bold uppercase tracking-wider text-navy-900">
                    <th className="px-6 py-4">Application</th>
                    <th className="px-6 py-4">Free Plan</th>
                    <th className="px-6 py-4">Paid Plans (Starter / Pro / Enterprise)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  <tr>
                    <td className="px-6 py-4 font-bold text-navy-900 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-600" /> Web Application
                    </td>
                    <td className="px-6 py-4 text-slate-600">Basic access (Core administrative modules & teacher workflows)</td>
                    <td className="px-6 py-4 text-navy-900 font-semibold">Expanded access (Higher limits, multi-role RBAC & advanced analytics)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-navy-900 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-purple-600" /> Parent Mobile App
                    </td>
                    <td className="px-6 py-4 text-slate-600">Included with basic attendance alerts, notices & student info</td>
                    <td className="px-6 py-4 text-navy-900 font-semibold">Expanded features (Rich communication, media circulars & fee records)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-navy-900 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-purple-600" /> Staff Mobile App
                    </td>
                    <td className="px-6 py-4 text-slate-400">As per plan limits</td>
                    <td className="px-6 py-4 text-navy-900 font-semibold">Available for supported roles (attendance marking & driver tracking)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-navy-900 flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-purple-600" /> Windows Finance App
                    </td>
                    <td className="px-6 py-4 text-slate-400">Not included</td>
                    <td className="px-6 py-4 text-navy-900 font-semibold">Premium add-on or eligible custom plan (Offline counter collection)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* How the Pricing Works (Customer Journey) */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="How It Works"
            title="Simple Pricing. Flexible Growth."
            description="From initial free onboarding to institutional expansion, here is how IEP Schools adapts to your journey."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {pricingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black tracking-tight text-purple-600/30">
                      {step.step}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-ink/65">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Hosting & Infrastructure Benefits */}
      <Section tone="white" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Cloud Architecture"
            title="Built to Support Your School as It Grows"
            description="Enterprise-grade cloud infrastructure engineered specifically for school data privacy, uptime, and speed."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hostingBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col rounded-3xl border border-ink/10 bg-surface p-6 shadow-soft transition-all duration-300 hover:border-purple-200 hover:bg-white hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-purple-600 shadow-sm ring-1 ring-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    {item.tag}
                  </span>
                  <h3 className="mt-1 text-base font-extrabold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-ink/65">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-purple-200/70 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-purple-600 text-white shadow-glow">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">
                  Need detailed hardware & hosting specifications?
                </p>
                <p className="text-xs text-ink/65">
                  Explore full server specs, backup policies, and disaster recovery architecture.
                </p>
              </div>
            </div>
            <Button to="/hosting" variant="outline" size="sm">
              View Hosting Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Platform Statistics & Verified Trust */}
      <Section tone="dark" className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 dark-glow opacity-50" />
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="Platform Reliability"
            title="Proven Security & Data Isolation"
            description="Real verified architecture standards backing Indian educational institutions."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <span className="text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm font-bold text-white">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Separately Scoped Add-ons */}
      <Section tone="tint" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Add-ons"
            title="Separately scoped, never silently bundled"
            description="Some requirements sit outside a standard plan. They are priced or confirmed separately, and nothing here is presented as already included."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {addOns.map((addOn) => (
              <div key={addOn.name} className="card flex h-full flex-col p-6 bg-white rounded-3xl border border-ink/10 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-extrabold text-navy-900">
                    {addOn.name}
                  </h3>
                  <AvailabilityBadge status={addOn.availability} />
                </div>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-600">
                  {addOn.status}
                </p>
                <p className="mt-3 flex-1 text-xs leading-6 text-ink/65">
                  {addOn.description}
                </p>
                <Button
                  to={
                    addOn.name === "Windows Finance Application"
                      ? "/contact?topic=windows-finance"
                      : "/contact"
                  }
                  variant="ghost"
                  size="sm"
                  className="mt-5 justify-start px-0 text-violet-700 hover:bg-transparent hover:text-violet-800"
                >
                  Discuss this
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Notes & Searchable FAQ Section */}
      <Section tone="white" className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Before you choose"
              title="The details that usually need a conversation"
              description="These notes are part of the offer, not an afterthought."
            />
            <div className="mt-6 space-y-3">
              {pricingNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-start gap-2.5 rounded-2xl border border-ink/10 bg-surface p-4"
                >
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  <p className="text-xs leading-6 text-ink/65">{note}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-6 text-emerald-900/75">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Every plan starts with a requirements review. If the Free plan is
                  enough for your school, we will say so.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">Pricing FAQ</span>
                <h2 className="mt-2 text-2xl font-extrabold text-navy-900">
                  Cost questions, answered
                </h2>
              </div>

              {/* Searchable input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter FAQ questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full rounded-full border border-ink/10 bg-surface py-1.5 pl-9 pr-8 text-xs font-medium text-navy-900 outline-none transition-colors focus:border-purple-400 focus:bg-white"
                />
                {faqSearch && (
                  <button
                    type="button"
                    onClick={() => setFaqSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 card px-6 sm:px-8 bg-white rounded-3xl border border-ink/10 shadow-soft">
              {filteredFaqs.length > 0 ? (
                <Accordion>
                  {filteredFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </Accordion>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No questions match "{faqSearch}". Try searching for "free", "mobile", or "support".
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call To Action */}
      <CtaBand
        title="Ready to Transform Your School Operations?"
        description="Start with the essentials, experience smarter school management, and expand as your institution grows."
        secondary="hosting"
      />
    </div>
  );
}

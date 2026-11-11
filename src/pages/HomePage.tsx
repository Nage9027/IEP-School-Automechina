import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  DatabaseBackup,
  IndianRupee,
  Infinity as InfinityIcon,
  LayoutGrid,
  LifeBuoy,
  MemoryStick,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { PlanCard } from "@/components/pricing/PlanCard";
import { FinanceMockup } from "@/components/mockups/Mockups";
import { HomeHero } from "@/components/home/HomeHero";
import { useSiteContent } from "@/lib/content";
import { usePageMeta, useStructuredData } from "@/lib/seo";
import { cn, formatInr } from "@/lib/utils";
import { featureModules, features } from "@/content/modules";
import { portals } from "@/content/portals";
import { applicationChannels } from "@/content/applications";
import { productFilms } from "@/content/tutorials";

const moduleOrder = [
  "administration",
  "students",
  "academics",
  "attendance",
  "exams",
  "finance",
  "transport",
  "communication",
  "ai",
  "library",
];

const portalOrder = [
  "teacher",
  "parent",
  "principal",
  "finance",
  "driver",
  "cashier",
];

const financeFeatureIds = [
  "fee-structure",
  "fee-collection",
  "student-ledger",
  "cashier-workspace",
  "financial-reports",
];

export default function HomePage() {
  const { site, plans, freeHosting, faqs } = useSiteContent();
  const [overviewOpen, setOverviewOpen] = useState(false);

  usePageMeta({
    title: `${site.productName} | School Management ERP`,
    description:
      "One integrated platform for Indian schools: admissions, attendance, exams, fees, transport and communication. Explore verified features, role portals, pricing and the Free plan.",
    path: "/",
  });

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.productName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: site.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Free plan with included hosting allocation.",
      },
    }),
    [site.productName, site.description]
  );
  useStructuredData(schema);

  useEffect(() => {
    if (!overviewOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverviewOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [overviewOpen]);

  const homePlans = plans.filter((plan) =>
    ["free", "starter", "professional", "enterprise"].includes(plan.id)
  );
  const homeFaqs = faqs.filter((faq) =>
    [
      "free-hosting",
      "library",
      "windows-app",
      "online-payments",
      "mobile-app",
      "security",
    ].includes(faq.id)
  );

  const aboutFilm = productFilms.find((film) => film.id === "about") ?? productFilms[0];
  const freePlan = plans.find((plan) => plan.id === "free");
  const startingPrice = freePlan?.monthly ?? 0;
  const loginRoleCount = portals.filter((portal) => portal.id !== "transport-manager").length;

  const stats = [
    { icon: Users, value: `${loginRoleCount}`, label: "User portals", note: "Verified login roles" },
    { icon: LayoutGrid, value: `${featureModules.length}`, label: "ERP modules", note: "Documented module groups" },
    { icon: MemoryStick, value: freeHosting.ram, label: "Free-plan RAM", note: "Shared allocation" },
    { icon: Database, value: freeHosting.storage, label: "Free storage", note: "Included with Free" },
    { icon: InfinityIcon, value: freeHosting.bandwidth, label: "Bandwidth", note: "Subject to fair use" },
    { icon: IndianRupee, value: formatInr(startingPrice), label: "Starting price", note: "Free plan available" },
  ];

  const hostingBenefits = [
    { icon: Cloud, title: "Included cloud hosting", text: "The web app, API, database and real-time channel are deployed together." },
    { icon: ShieldCheck, title: "HTTPS access", text: "Served over HTTPS, with certificate setup confirmed during onboarding." },
    { icon: DatabaseBackup, title: "Backup tooling", text: "Scheduled and manual database backup options are part of the deployment." },
    { icon: TrendingUp, title: "Upgrade path", text: "Add RAM, storage and capacity as your school grows." },
  ];

  return (
    <>
      {/* CINEMATIC FULL-SCREEN VIDEO HERO */}
      <HomeHero
        erpLoginUrl={site.erpLoginUrl}
        onWatchDemo={() => setOverviewOpen(true)}
      />

      {/* MODULE CAROUSEL */}

      {/* 4-COLUMN FEATURE STRIP */}
      <div className="relative z-10 -mt-6 sm:-mt-8">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 rounded-[1.5rem] bg-white px-6 py-8 shadow-[0_24px_70px_-40px_rgba(58,32,140,0.2)] ring-1 ring-purple-100 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-purple-100">
            
            <div className="flex items-center gap-4 lg:px-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600">
                <LayoutGrid className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-navy-900">All-in-one School Automation</p>
                <p className="mt-1 text-xs text-slate-500">One connected school record</p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600">
                <Cloud className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-navy-900">Included Hosting</p>
                <p className="mt-1 text-xs text-slate-500">{freeHosting.ram} RAM • {freeHosting.storage} Storage</p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600">
                <MonitorSmartphone className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-navy-900">Web Application</p>
                <p className="mt-1 text-xs text-slate-500">Full-featured ERP dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600">
                <Smartphone className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-navy-900">Parent Mobile App</p>
                <p className="mt-1 text-xs text-slate-500">Attendance, fees, homework & more</p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:px-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600">
                <LifeBuoy className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-navy-900">Guided Onboarding</p>
                <p className="mt-1 text-xs text-slate-500">Complete setup support from our team</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="relative z-10 pt-12 sm:pt-16">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-purple-100 shadow-[0_24px_70px_-40px_rgba(58,32,140,0.4)] ring-1 ring-purple-100 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-4 py-4.5 sm:px-5">
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <stat.icon className="h-3.5 w-3.5 text-purple-500" />
                  {stat.label}
                </span>
                <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-navy-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-medium leading-4 text-slate-400">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ECOSYSTEM MODULES */}
      <Section tone="white" className="pt-16 sm:pt-20">
        <div className="container-x">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Our solution"
              title={
                <>
                  A complete digital ecosystem for{" "}
                  <span className="text-gradient">modern schools.</span>
                </>
              }
              description="From the first admission enquiry to the final receipt, every module works from the same school record and the same role-based permissions."
            />
            <Button
              to="/features"
              variant="secondary"
              className="justify-self-start lg:shrink-0"
            >
              Explore all features
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {moduleOrder.map((id, index) => {
              const module = featureModules.find((item) => item.id === id);
              if (!module) return null;
              return (
                <Reveal key={module.id} delay={index * 40} className="animate-fade-up">
                  <Link
                    to={`/features#module-${module.id}`}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-5 shadow-card card-hover"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-50 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                        <module.icon className="h-5 w-5" />
                      </span>
                      <AvailabilityBadge status={module.availability} />
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold leading-5 tracking-tight text-navy-900">
                      {module.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-5 text-slate-500">
                      {module.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-purple-600">
                      View module
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button to="/features" variant="ghost">
              See all {features.length} documented capabilities
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* USER PORTALS */}
      <Section tone="white" className="bg-purple-50/30">
        <div className="container-x">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              align="left"
              eyebrow="User portals"
              title={
                <>
                  The right workspace for{" "}
                  <span className="text-gradient">every responsibility.</span>
                </>
              }
              description="Ten verified login roles, each with a focused view of the school. Access is scoped by permissions, not by sharing one administrator account."
            />
            <Button
              to="/portals"
              variant="secondary"
              className="justify-self-start lg:justify-self-end"
            >
              Explore role portals
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portalOrder.map((id, index) => {
              const portal = portals.find((item) => item.id === id);
              if (!portal) return null;
              return (
                <Reveal key={portal.id} delay={index * 50} className="animate-fade-up">
                  <Link
                    to={`/portals?role=${portal.id}`}
                    className="group flex h-full gap-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-card card-hover"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      <portal.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-navy-900">
                          {portal.name}
                        </h3>
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-purple-600" />
                      </div>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        {portal.subtitle}
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-purple-600">
                        {portal.mobile === "web-only"
                          ? "Web only"
                          : portal.mobile === "free-limited"
                            ? "Mobile • Free (limited)"
                            : portal.mobile === "paid-eligible"
                              ? "Mobile • paid plans"
                              : "Planned"}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* APPLICATIONS COMPARISON */}
      <Section tone="white">
        <div className="container-x">
          <SectionHeading
            eyebrow="One platform, three ways in"
            title={
              <>
                Choose the application that fits{" "}
                <span className="text-gradient">the role.</span>
              </>
            }
            description="The web ERP is the full workspace. Mobile access covers supported roles. A Windows finance companion is planned, not released."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {applicationChannels.map((channel, index) => {
              const isUpcoming = channel.availability === "upcoming";
              return (
                <Reveal key={channel.id} delay={index * 60} className="animate-fade-up">
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-[1.6rem] border p-6 sm:p-7",
                      isUpcoming
                        ? "border-slate-200 bg-slate-50/70"
                        : "border-border bg-white shadow-card"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "grid h-12 w-12 place-items-center rounded-2xl",
                          isUpcoming
                            ? "bg-slate-200/70 text-slate-600"
                            : "bg-purple-50 text-purple-700"
                        )}
                      >
                        <channel.icon className="h-5 w-5" />
                      </span>
                      <AvailabilityBadge
                        status={channel.availability}
                        label={isUpcoming ? "Planned" : "Available"}
                      />
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-navy-900">
                      {channel.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {channel.description}
                    </p>

                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                      {channel.capabilities.slice(0, 4).map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2 text-xs leading-5 text-slate-500"
                        >
                          {isUpcoming ? (
                            <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                          ) : (
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          )}
                          {capability}
                        </li>
                      ))}
                    </ul>

                    {isUpcoming && (
                      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] font-semibold leading-4 text-amber-800">
                        No download, installer or release date is available.
                      </p>
                    )}

                    <div className="mt-6">
                      {channel.id === "web" ? (
                        <Button
                          href={channel.ctaHref}
                          external
                          variant="primary"
                          className="w-full"
                        >
                          {channel.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          to={channel.ctaHref}
                          variant="secondary"
                          className="w-full"
                        >
                          {channel.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-5 text-slate-400">
            No APK downloads or unverified app-store links are published here.
            Mobile distribution is arranged during onboarding. The Windows
            finance application is planned as a paid add-on.
          </p>
        </div>
      </Section>

      {/* FINANCE */}
      <Section tone="white" className="bg-purple-50/30">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Finance"
              title="Fee collection with a trail the school can follow"
              description="Set the fee structure, record payments, issue receipts and reconcile the counter without stitching spreadsheets together at month-end."
            />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {financeFeatureIds.map((id) => {
                const feature = features.find((item) => item.id === id);
                if (!feature) return null;
                return (
                  <li key={id} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-navy-900">
                        {feature.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                        {feature.help}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900/75">
              <strong className="font-bold">No online gateway:</strong> fee
              payments are recorded in the ERP by school staff. Online parent
              checkout is not available today.
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/features#module-finance" variant="secondary">
                Finance features
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/contact?topic=demo" variant="ghost">
                <IndianRupee className="h-4 w-4" />
                Discuss your fee workflow
              </Button>
            </div>
          </div>
          <Reveal>
            <FinanceMockup />
            <p className="mt-3 text-right text-[10px] font-medium text-slate-400">
              Illustrative preview of the finance workspace.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* HOSTING */}
      <Section tone="white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Hosting"
              title="Start free, with the limits stated clearly"
              description="The Free plan includes a shared hosting allocation for schools getting started. Capacity can be expanded as your school grows."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {hostingBenefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-700">
                    <benefit.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-navy-900">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/hosting" variant="secondary">
                Hosting details
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/pricing" variant="ghost">
                Compare plans
              </Button>
            </div>
          </div>

          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-purple-200 bg-gradient-to-b from-white to-purple-50/60 p-6 shadow-lift sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/60 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-600">
                    Free plan
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-[-0.05em] text-navy-900">
                    {formatInr(startingPrice)}
                    <span className="ml-1 text-xs font-semibold tracking-normal text-slate-400">
                      /month
                    </span>
                  </p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                  No card required
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3 border-y border-purple-100 py-5 text-center">
                {[
                  { label: "RAM", value: freeHosting.ram },
                  { label: "Storage", value: freeHosting.storage },
                  { label: "Bandwidth", value: freeHosting.bandwidth },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                      {spec.label}
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-navy-900">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="relative mt-5 space-y-2.5 text-xs text-slate-500">
                {[
                  "Web ERP and core school modules",
                  "Parent mobile app with limited features",
                  freeHosting.students,
                  "No online checkout on this website",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button to="/hosting" variant="secondary" className="relative mt-6 w-full">
                View hosting details
                <ArrowRight className="h-4 w-4" />
              </Button>

              <p className="relative mt-4 text-[10px] leading-5 text-slate-400">
                Shared allocation, not a dedicated server. No uptime SLA on Free.
                Bandwidth is subject to fair use.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PRICING */}
      <Section tone="white" className="bg-purple-50/30">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent starting points"
            description="Proposed prices and limits, confirmed in writing before onboarding. No online checkout on this website."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homePlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                annual={false}
                featureCount={4}
                compact
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 sm:flex-row">
            <p className="text-xs leading-6 text-slate-500">
              Need a different scale, custom integration or the planned Windows
              finance app? Start with a requirements review.
            </p>
            <Button to="/contact?plan=custom" variant="secondary" size="sm">
              Talk to sales
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
            {site.pricingDisclaimer}
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Straight answers"
              title="Questions schools ask before a demo"
              description="If something is not available, we say so. That includes the library module, online payments and the Windows finance app."
            />
            <Button to="/faq" variant="secondary" className="mt-6">
              Read all FAQs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="card px-6 sm:px-8">
            <Accordion>
              {homeFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white pb-16 pt-4 sm:pb-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 px-6 py-12 text-white shadow-[0_36px_90px_-40px_rgba(71,32,174,0.55)] sm:px-10 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  Start with a conversation
                </span>
                <h2 className="mt-4 max-w-2xl text-3xl font-display font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[2.7rem]">
                  Bring your school into one connected system.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                  See the ERP, role portals and parent app with your own school
                  workflow. We will tell you clearly what is included today and
                  what is still planned.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    to="/contact?topic=demo"
                    variant="secondary"
                    size="lg"
                    className="border-white bg-white text-purple-700 shadow-lg hover:bg-purple-50"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Book a Demo
                  </Button>
                  <Button to="/pricing" variant="ghost" size="lg" className="text-white hover:bg-white/10 border-white/20">
                    Compare plans
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Prefer WhatsApp? Chat with our team
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="relative hidden w-[240px] rounded-[1.5rem] border border-white/20 bg-white/10 p-5 backdrop-blur lg:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  Free plan
                </p>
                <p className="mt-2 text-4xl font-extrabold tracking-[-0.05em]">
                  {formatInr(startingPrice)}
                </p>
                <p className="mt-1 text-[11px] text-white/60">
                  {freeHosting.ram} RAM • {freeHosting.storage} storage
                </p>
                <div className="mt-5 space-y-2.5 border-t border-white/15 pt-5">
                  {[
                    "No card required",
                    "Parent app included",
                    "Guided onboarding",
                  ].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 text-[11px] font-semibold text-white/75"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Video Modal */}
      {overviewOpen && aboutFilm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/80 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="overview-video-title"
          onClick={() => setOverviewOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white">
              <div>
                <p
                  id="overview-video-title"
                  className="text-sm font-extrabold"
                >
                  {aboutFilm.title}
                </p>
                <p className="mt-0.5 text-[10px] text-white/55">
                  Real product film • {aboutFilm.duration}
                </p>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setOverviewOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close overview video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <video
              className="aspect-video w-full bg-black"
              src={aboutFilm.src}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support video playback.
            </video>
            <p className="px-5 py-4 text-[10px] leading-5 text-white/50">
              Interface visuals are representative. School names and records
              shown in product films are illustrative, not live customer data.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

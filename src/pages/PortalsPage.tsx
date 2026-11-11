import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Crown,
  KeyRound,
  LayoutDashboard,
  LogIn,
  Monitor,
  School,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { CtaBand } from "@/components/ui/CtaBand";
import { portals } from "@/content/portals";
import { roleMatrix } from "@/content/applications";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const mobileLabels: Record<string, string> = {
  available: "Mobile app available",
  "web-only": "Web ERP only",
  planned: "Mobile access planned",
  "not-planned": "Not planned for mobile",
};

const solutionHeroBenefits = [
  {
    icon: Crown,
    title: "School Owners & Trustees",
    text: "Financial visibility & campus oversight",
  },
  {
    icon: School,
    title: "Principals & Directors",
    text: "Staff monitoring & academic metrics",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    text: "Automated attendance & admissions",
  },
  {
    icon: BookOpen,
    title: "Teachers & Educators",
    text: "Roll-call marking & grading tools",
  },
];

export default function PortalsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  usePageMeta({
    title: "School Solutions & Workspaces | IEP Schools",
    description:
      "One automation platform, multiple school operations. Tailored solutions for school owners, principals, administrators, teachers, accountants, transport managers, and parents.",
    path: "/solutions",
  });

  const selectedId = useMemo(() => {
    const requested = searchParams.get("role");
    return portals.some((portal) => portal.id === requested) ? requested! : "principal";
  }, [searchParams]);

  const selected = portals.find((portal) => portal.id === selectedId) ?? portals[0];

  // Function to handle role selection with smooth scroll to details
  const handleRoleSelect = (id: string) => {
    setSearchParams({ role: id });
    document.getElementById("role-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        className="solutions-page-hero"
        backgroundImage="/media/Images/Futuristic%20School%20Portal%20Network.png"
        eyebrow="Solutions for Every School Role"
        title={
          <>
            One Automation Platform.{" "}
            <span className="text-gradient">Multiple School Operations.</span>
          </>
        }
        description="Whether you manage a small school or a growing educational institution, IEP Schools helps organize and automate your everyday workflows."
        breadcrumb="Solutions"
        benefits={solutionHeroBenefits}
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-violet-400" />
              Select a Role Solution
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {portals.map((portal) => (
                <button
                  key={portal.id}
                  type="button"
                  onClick={() => handleRoleSelect(portal.id)}
                  className={cn(
                    "group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[11px] font-semibold transition-all duration-300",
                    selected.id === portal.id
                      ? "border-violet-400/50 bg-violet-500/20 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.02]"
                      : "border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.08] hover:border-white/20"
                  )}
                >
                  <portal.icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", selected.id === portal.id ? "text-violet-300" : "text-white/50")} />
                  {portal.name}
                </button>
              ))}
            </div>
            <p className="mt-5 text-[10px] leading-5 text-white/55 border-t border-white/10 pt-4">
              Strict role-based permissions ensure each staff member accesses only their designated operations.
            </p>
          </div>
        }
      >
        <Button to="/contact?plan=free" size="lg" className="shadow-glow">
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button to="/contact?topic=demo" variant="light" size="lg">
          Book a Live Demo
        </Button>
      </PageHero>

      {/* Role Selector Tabs */}
      <Section tone="white" className="py-8 sm:py-10 sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-ink/5">
        <div className="container-x">
          <div
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="tablist"
            aria-label="Select a role"
          >
            {portals.map((portal) => (
              <button
                key={portal.id}
                type="button"
                role="tab"
                aria-selected={selected.id === portal.id}
                onClick={() => handleRoleSelect(portal.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-300",
                  selected.id === portal.id
                    ? "border-violet-600 bg-violet-600 text-white shadow-glow scale-105"
                    : "border-ink/10 bg-white text-ink/65 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50"
                )}
              >
                <portal.icon className={cn("h-4 w-4", selected.id === portal.id ? "text-white" : "text-violet-500")} />
                {portal.name}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Selected Role Details */}
      <Section tone="light" id="role-details" className="pt-10 sm:pt-16 scroll-mt-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            
            {/* Left Side - Main Details Card */}
            <div className="card relative overflow-hidden p-6 sm:p-8 animate-fade-up group hover:shadow-lift transition-all duration-500 border border-ink/5">
              <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-violet-200/40 blur-3xl transition-transform group-hover:scale-125" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 text-white shadow-xl">
                    <selected.icon className="h-8 w-8" />
                  </span>
                  <AvailabilityBadge status={selected.availability} />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-navy-900">
                  {selected.name}
                </h2>
                <p className="mt-1 text-sm font-bold text-violet-600">
                  {selected.subtitle}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-ink/10 bg-surface/50 p-4 transition-colors hover:bg-surface">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                      <LogIn className="h-3.5 w-3.5 text-violet-500" /> Access Method
                    </div>
                    <p className="mt-2 text-sm font-semibold text-navy-900">
                      {selected.login}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-surface/50 p-4 transition-colors hover:bg-surface">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                      <LayoutDashboard className="h-3.5 w-3.5 text-violet-500" /> Dashboard
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink/70">
                      {selected.dashboard}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-surface/50 p-4 transition-colors hover:bg-surface">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                      <KeyRound className="h-3.5 w-3.5 text-violet-500" /> Permissions
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink/70">
                      {selected.permissions}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-white px-4 py-3 shadow-sm">
                  {selected.mobile === "web-only" ? (
                    <Monitor className="h-5 w-5 text-violet-700" />
                  ) : (
                    <Smartphone className="h-5 w-5 text-violet-700" />
                  )}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-violet-700/60">
                      Mobile access
                    </p>
                    <p className="text-xs font-bold text-violet-900">
                      {mobileLabels[selected.mobile]}
                    </p>
                  </div>
                </div>

                {selected.note && (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900/80">
                    <span className="font-bold block mb-1">Note:</span>
                    {selected.note}
                  </div>
                )}

                <Button to="/contact" className="mt-8 w-full shadow-glow hover:scale-[1.02] transition-transform">
                  Discuss this portal
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Side - Modules & Lists */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              
              {/* Modules Card */}
              <div className="card p-6 sm:p-8 border border-ink/5">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="h-5 w-5 text-violet-600" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                    Modules in view
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.modules.map((module) => (
                    <span
                      key={module}
                      className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm hover:bg-violet-100 transition-colors cursor-default"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities & Benefits */}
              <div className="card p-6 sm:p-8 border border-ink/5">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 mb-4">
                      <Briefcase className="h-4 w-4 text-blue-500" /> Responsibilities
                    </h3>
                    <ul className="space-y-3.5">
                      {selected.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ink/70 group">
                          <div className="mt-1 grid place-items-center h-4 w-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <CheckCircle2 className="h-3 w-3 text-blue-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 mb-4">
                      <Sparkles className="h-4 w-4 text-amber-500" /> Key benefits
                    </h3>
                    <ul className="space-y-3.5">
                      {selected.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ink/70 group">
                          <div className="mt-1 grid place-items-center h-4 w-4 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
                            <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5 text-xs leading-6 text-ink/70 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <strong className="font-bold text-navy-900 block mb-1">A note on access:</strong>
                  Permissions are configured by the school during onboarding. A role having access to a module does not mean every action inside that module is permitted. The school remains responsible for account creation and deactivation.
                </div>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* Access Comparison Table / Cards */}
      <Section tone="white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Access at a glance"
            title="Web and mobile access by role"
            description="Mobile access is not identical to web access. Some roles are web-only, and the parent app is the only mobile experience included on the Free plan."
          />
          
          {/* Desktop Table */}
          <div className="mt-10 hidden md:block overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10 bg-surface/80 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Web ERP</th>
                    <th className="px-6 py-4">Mobile app</th>
                  </tr>
                </thead>
                <tbody>
                  {roleMatrix.map((row) => (
                    <tr key={row.role} className="border-b border-ink/[0.06] last:border-0 hover:bg-violet-50/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-navy-900 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-violet-400" />
                        {row.role}
                      </td>
                      <td className="px-6 py-4">
                        {row.web ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-ink/60 bg-gray-100 px-2 py-1 rounded-md">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1",
                            row.mobile === "Web-only"
                              ? "bg-slate-100 text-slate-600"
                              : row.mobile === "Free (limited)"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-violet-50 text-violet-700"
                          )}
                        >
                          {row.mobile !== "Web-only" && <Smartphone className="h-3 w-3" />}
                          {row.mobile}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="mt-8 grid gap-4 md:hidden">
            {roleMatrix.map((row) => (
              <div key={row.role} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-ink/5 pb-3">
                  <h4 className="font-bold text-navy-900">{row.role}</h4>
                  {row.web ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      <Monitor className="h-3 w-3" /> Web Available
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-ink/50 bg-gray-100 px-2 py-1 rounded">No Web</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink/60">Mobile App:</span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-1 font-bold flex items-center gap-1",
                      row.mobile === "Web-only"
                        ? "text-slate-500 bg-slate-100"
                        : row.mobile === "Free (limited)"
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-violet-700 bg-violet-50"
                    )}
                  >
                    {row.mobile !== "Web-only" && <Smartphone className="h-3 w-3" />}
                    {row.mobile}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] leading-5 text-ink/60 max-w-2xl mx-auto">
            Admin, finance and accountant are web-only. Driver uses the mobile app for trip operations. Transport manager responsibilities are handled in the admin workspace.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Map roles to your school's real responsibilities"
        description="We will review your staffing structure, identify who needs which access, and show you how permission templates work before onboarding."
        secondary="features"
      />
    </>
  );
}

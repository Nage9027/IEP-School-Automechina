import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Mail,
  MessageCircle,
  Palette,
  Plug,
  Receipt,
  ShieldCheck,
  Workflow,
  XCircle,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { LeadForm } from "@/components/forms/LeadForm";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const customizationAreas = [
  {
    icon: Palette,
    title: "School branding & profile",
    type: "Configuration",
    text: "School details, logo, academic identity and receipt branding within the supported settings.",
  },
  {
    icon: BookOpen,
    title: "Academic structure",
    type: "Configuration",
    text: "Academic year, terms, classes, sections, subjects and grade configuration.",
  },
  {
    icon: ShieldCheck,
    title: "Roles & permissions",
    type: "Configuration",
    text: "Permission templates and teacher-level access aligned to your staffing model.",
  },
  {
    icon: Receipt,
    title: "Fee heads & receipts",
    type: "Configuration",
    text: "Fee structure, instalments and receipt settings supported by the finance module.",
  },
  {
    icon: BarChart3,
    title: "Report formats",
    type: "Scoped custom",
    text: "Additional report layouts or exports are reviewed against available data and maintainability.",
  },
  {
    icon: Workflow,
    title: "Workflow changes",
    type: "Scoped custom",
    text: "New approval steps or statuses are assessed for fit with the existing product and roadmap.",
  },
  {
    icon: Plug,
    title: "Integrations",
    type: "Scoped custom",
    text: "SMS, WhatsApp and email providers can be configured. Other integrations are reviewed case by case. No payment gateway today.",
  },
  {
    icon: GraduationCap,
    title: "Training & onboarding",
    type: "Configuration + scope",
    text: "Guided onboarding is included. Extended or on-site training is quoted separately.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    text: "We review your school size, roles, current systems and the outcome you need.",
  },
  {
    step: "02",
    title: "Fit review",
    text: "We separate what is already configurable from what would require custom work.",
  },
  {
    step: "03",
    title: "Written scope",
    text: "Deliverables, timeline, price and exclusions are agreed before work begins.",
  },
  {
    step: "04",
    title: "Implementation",
    text: "Changes are built in stages, with a review point before final handover.",
  },
  {
    step: "05",
    title: "Handover",
    text: "Your team is trained on the configured workflow and knows what changed.",
  },
];

export default function CustomizePage() {
  const { site } = useSiteContent();

  usePageMeta({
    title: "Customization",
    description:
      "IEP Schools customization: branding, academic structure, roles, fee receipts, reports, workflows and integrations, scoped and quoted before work begins.",
    path: "/customize",
  });

  return (
    <>
      <PageHero
        eyebrow="Customization"
        title={
          <>
            Your school's workflow.{" "}
            <span className="text-gradient">Scoped, not improvised.</span>
          </>
        }
        description="Configuration is included where the product supports it. Anything beyond that is reviewed for fit, maintainability and timeline before it is quoted."
        breadcrumb="Customization"
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              How we decide
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Configuration first</p>
                  <p className="mt-1 text-[11px] leading-5 text-white/65">
                    Use the settings, permissions and structures already built into
                    the ERP.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-violet-300">
                  <Workflow className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">Custom when justified</p>
                  <p className="mt-1 text-[11px] leading-5 text-white/65">
                    New code or integrations are proposed only when the need is real
                    and the scope is sustainable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-400/10 text-rose-300">
                  <XCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">No blank cheques</p>
                  <p className="mt-1 text-[11px] leading-5 text-white/65">
                    We will decline or re-scope requests that conflict with the
                    product, data model or support obligations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Button href="#customize-form" size="lg">
          Request a review
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button to="/pricing" variant="light" size="lg">
          See Custom plan
        </Button>
      </PageHero>

      <Section tone="light">
        <div className="container-x">
          <SectionHeading
            eyebrow="What can change"
            title="Eight areas, two very different kinds of work"
            description="Configuration uses existing product settings. Custom work creates something new and is estimated separately. The label matters."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customizationAreas.map((area) => (
              <div key={area.title} className="card flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <area.icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide",
                      area.type === "Configuration"
                        ? "bg-emerald-50 text-emerald-700"
                        : area.type === "Scoped custom"
                          ? "bg-violet-50 text-violet-700"
                          : "bg-amber-50 text-amber-800",
                    )}
                  >
                    {area.type}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-navy-900">
                  {area.title}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-ink/65">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The process"
              title="No surprise invoice, no vanish-after-demo"
              description="A clear sequence from first conversation to handover."
            />
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs leading-6 text-amber-900/75">
              <strong className="font-bold">Timeline reality:</strong> custom work
              depends on scope, data availability and review cycles. We do not
              promise a release date before the fit review is complete.
            </div>
          </div>
          <div className="space-y-3">
            {process.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-2xl border border-ink/10 bg-surface p-5"
              >
                <span className="text-lg font-extrabold text-violet-400">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-ink/65">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint" id="customize-form">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Request a review"
              title="Tell us what the standard ERP does not cover"
              description="Describe the workflow, report or integration you need. We will tell you whether it is configuration, custom work, or not something we should build."
            />
            <div className="mt-7 space-y-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all text-sm font-bold text-navy-900 hover:text-violet-700"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">
                    WhatsApp
                  </p>
                  <a
                    href={site.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-navy-900 hover:text-violet-700"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <ClipboardList className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink/60">
                    What to include
                  </p>
                  <p className="text-xs leading-6 text-ink/65">
                    The role involved, the current process, the outcome you need,
                    and whether a deadline is fixed.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 text-xs leading-6 text-ink/65">
              <strong className="font-bold text-navy-900">Please do not send:</strong>{" "}
              student records, passwords, payment details or other sensitive data in
              the enquiry form. We will request what is needed through an appropriate
              channel after the first review.
            </div>
          </div>

          <LeadForm defaultTopic="Customization" defaultPlan="Custom" />
        </div>
      </Section>

      <CtaBand
        title="Start with what is already possible"
        description="Most schools do not need custom code. A demo will show you how far configuration goes before we ever discuss a custom scope."
        secondary="features"
      />
    </>
  );
}

import { useMemo, useState, type FormEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { submitWebsiteEnquiry } from "@/lib/websiteEnquiries";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "dispatched"; enquiryId?: string }
  | { state: "error"; message: string };

const roles = [
  "Principal",
  "School administrator",
  "Owner / trustee",
  "Teacher",
  "IT / operations",
  "Other",
];

const sizes = ["Under 200", "200–500", "500–1,500", "1,500–5,000", "5,000+"];

const topics = [
  "Book a demo",
  "Pricing and plans",
  "Hosting",
  "Mobile app access",
  "Windows finance app",
  "Customization",
  "Admissions module",
  "Support",
  "Other",
];

const planOptions = ["Free", "Starter", "Professional", "Enterprise", "Custom", "Not sure"];

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-navy-900 placeholder:text-ink/60 transition-colors focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-100";

const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60";

export function LeadForm({
  className,
  defaultTopic,
  defaultPlan,
}: {
  className?: string;
  defaultTopic?: string;
  defaultPlan?: string;
}) {
  const { site } = useSiteContent();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const initialTopic = useMemo(() => {
    if (defaultTopic) return defaultTopic;
    const topic = searchParams.get("topic");
    if (topic === "windows-finance") return "Windows finance app";
    if (topic === "mobile-app") return "Mobile app access";
    if (topic === "customization") return "Customization";
    return "Book a demo";
  }, [searchParams, defaultTopic]);

  const initialPlan = useMemo(() => {
    if (defaultPlan) return defaultPlan;
    const plan = searchParams.get("plan");
    if (!plan) return "Not sure";
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  }, [searchParams, defaultPlan]);

  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const honeypot = String(data.get("company_website") ?? "");
    if (honeypot) return;

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      school: String(data.get("school") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      students: String(data.get("students") ?? "").trim(),
      plan: String(data.get("plan") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
      source: "iep-schools-website",
      page: location.pathname,
      submittedAt: new Date().toISOString(),
    };

    if (!payload.name || !payload.school || !payload.email || !payload.consent) {
      setStatus({
        state: "error",
        message:
          "Please complete your name, school, email address and the contact consent checkbox.",
      });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const result = await submitWebsiteEnquiry({
        customerName: payload.name,
        email: payload.email,
        phone: payload.phone,
        schoolName: payload.school,
        requestType: payload.topic,
        sourcePage: `Customization enquiry · ${location.pathname}`,
        pageUrl: window.location.href,
        website: honeypot,
        message: [
          `Role: ${payload.role || "Not specified"}`,
          `Student enrollment: ${payload.students || "Not specified"}`,
          `Plan interest: ${payload.plan}`,
          `Topic: ${payload.topic}`,
          "Contact consent: Yes",
          "",
          payload.message || "No additional message.",
        ].join("\n"),
      });
      setStatus({ state: "dispatched", enquiryId: result.enquiryId });
      form.reset();
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error
          ? error.message
          : `We could not dispatch your enquiry. Please email ${site.contact.email} or use WhatsApp instead.`,
      });
    }
  }

  return (
    <div className={cn("card p-6 sm:p-8", className)}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-navy-900">
            Tell us about your school
          </h2>
          <p className="mt-1 text-sm leading-6 text-ink/65">
            Share your requirements and we will respond using the contact details
            you provide.
          </p>
        </div>
      </div>

      {status.state === "dispatched" ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-bold text-emerald-950">Enquiry Submitted Successfully!</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-emerald-900/90">
            Thank you for contacting IEP Schools. Our team will review your inquiry and connect with you shortly. An acknowledgement has also been dispatched to your email.
          </p>
          {status.enquiryId && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1 text-xs text-emerald-950 border border-emerald-200">
              <span className="font-semibold text-emerald-700">Reference ID:</span>
              <span className="font-mono">{status.enquiryId}</span>
            </div>
          )}
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="lead-name">
                Your name *
              </label>
              <input
                id="lead-name"
                name="name"
                required
                autoComplete="name"
                className={inputClass}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-school">
                School name *
              </label>
              <input
                id="lead-school"
                name="school"
                required
                autoComplete="organization"
                className={inputClass}
                placeholder="School or institution"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="lead-email">
                Email *
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@school.edu.in"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-phone">
                Phone / WhatsApp
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className={inputClass}
                placeholder="+91"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="lead-role">
                Your role
              </label>
              <div className="relative">
                <select
                  id="lead-role"
                  name="role"
                  className={cn(inputClass, "appearance-none pr-10")}
                  defaultValue="Principal"
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-students">
                Students
              </label>
              <div className="relative">
                <select
                  id="lead-students"
                  name="students"
                  className={cn(inputClass, "appearance-none pr-10")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  {sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="lead-plan">
                Plan interest
              </label>
              <div className="relative">
                <select
                  id="lead-plan"
                  name="plan"
                  className={cn(inputClass, "appearance-none pr-10")}
                  defaultValue={initialPlan}
                >
                  {planOptions.map((plan) => (
                    <option key={plan}>{plan}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="lead-topic">
                What is this about?
              </label>
              <div className="relative">
                <select
                  id="lead-topic"
                  name="topic"
                  className={cn(inputClass, "appearance-none pr-10")}
                  defaultValue={initialTopic}
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-message">
              Anything else?
            </label>
            <textarea
              id="lead-message"
              name="message"
              rows={4}
              className={cn(inputClass, "resize-y")}
              placeholder="Modules you need, current systems, or questions about the ERP."
            />
          </div>

          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-surface p-4">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-ink/20 text-violet-600 focus:ring-violet-500"
            />
            <span className="text-xs leading-6 text-ink/65">
              I agree to be contacted about this enquiry. Please do not include
              passwords or sensitive student data in this form.
            </span>
          </label>

          {status.state === "error" && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{status.message}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status.state === "sending"}
          >
            {status.state === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending enquiry
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send enquiry
              </>
            )}
          </Button>

          <p className="text-center text-[11px] leading-5 text-ink/60">
            This form is for enquiries only. It does not create an ERP account,
            process payment, or confirm a plan.
          </p>
        </form>
      )}
    </div>
  );
}

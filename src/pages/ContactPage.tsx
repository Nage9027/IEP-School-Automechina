import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  HelpCircle,
  Loader2,
  LogIn,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  Server,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";

// Institutional response metrics
const heroStats = [
  { value: "< 2 hrs", label: "Average Response Time" },
  { value: "₹0", label: "Free Tier Available" },
  { value: "100%", label: "Dedicated Cloud Isolation" },
];

// School-specific enquiry topics
const enquiryTopics = [
  "Full School ERP Automation (All Modules)",
  "Book a Live Interactive Demo",
  "Admissions & Student Registration",
  "Daily Attendance & Automated Parent Alerts",
  "Fee Structures & Counter Collections",
  "Timetable & Staff Scheduling",
  "Examinations & Term Report Cards",
  "Dedicated Cloud Hosting Setup",
  "Software Migration & Data Import",
  "General Inquiry / Support",
] as const;

// School roles & designations
const schoolRoles = [
  "Principal / Head of School",
  "School Administrator / Director",
  "Trustee / School Correspondent",
  "Academic Coordinator / Vice Principal",
  "IT Incharge / Systems Admin",
  "Accounts Officer / Cashier",
  "Teacher / Department Head",
  "Other Institutional Representative",
] as const;

// School student strength brackets
const studentStrengthRanges = [
  "Under 250 Students (Eligible for ₹0 Free Tier)",
  "250 – 500 Students",
  "500 – 1,000 Students",
  "1,000 – 2,500 Students",
  "2,500+ Students",
  "Multiple Campuses / School Group",
] as const;

// Onboarding timelines
const onboardingTimelines = [
  "Immediate (Current Academic Term)",
  "Within 1 Month",
  "Upcoming Academic Term",
  "Next Academic Year",
  "Evaluating & Comparing Platforms",
] as const;

const faqCategoryMap: Record<string, string> = {
  "Getting started": "General",
  "Pricing & plans": "Pricing",
  Hosting: "Hosting",
  Features: "Features",
  "Mobile & desktop": "Portals",
  "Data & security": "Security",
  Support: "Support",
};

const filterCategories = [
  "All",
  "General",
  "Pricing",
  "Hosting",
  "Features",
  "Portals",
  "Security",
  "Support",
] as const;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string; // School name
  jobTitle: string; // Designation
  projectType: string; // Enquiry topic
  budgetRange: string; // Student strength
  timeline: string; // Onboarding timeline
  message: string;
  requestDemo: boolean;
  newsletter: boolean;
  consent: boolean;
}

interface FormError {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  consent?: string;
  form?: string;
}

interface FormStatus {
  state: "idle" | "sending" | "sent" | "mailto" | "error";
  href?: string;
  message?: string;
}

export default function ContactPage() {
  const { site, faqs } = useSiteContent();
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic");
  const planParam = searchParams.get("plan");

  usePageMeta({
    title: "Contact & Institutional Demo | IEP Schools – Smart Education",
    description:
      "Connect with the IEP Schools team to discuss school management automation, request a live interactive ERP demo, or get assistance with your school's dedicated cloud instance.",
    path: "/contact",
  });

  const contactFaqs = useMemo(() => faqs, [faqs]);
  const endpoint = (import.meta.env.VITE_LEADS_ENDPOINT as string | undefined)?.trim();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: schoolRoles[0],
    projectType: enquiryTopics[0],
    budgetRange: studentStrengthRanges[0],
    timeline: onboardingTimelines[0],
    message: "",
    requestDemo: false,
    newsletter: true,
    consent: false,
  });

  // Handle URL query parameters (e.g. ?topic=demo, ?plan=pro)
  useEffect(() => {
    if (topicParam === "demo") {
      setFormData((prev) => ({
        ...prev,
        requestDemo: true,
        projectType: "Book a Live Interactive Demo",
      }));
    } else if (planParam) {
      const planName = planParam.charAt(0).toUpperCase() + planParam.slice(1);
      setFormData((prev) => ({
        ...prev,
        projectType: "Dedicated Cloud Hosting Setup",
        message: prev.message || `We are interested in exploring the ${planName} plan for our school.`,
      }));
    }
  }, [topicParam, planParam]);

  const [errors, setErrors] = useState<FormError>({});
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  const setField = (key: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormError]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FormError];
        return next;
      });
    }
  };

  const validate = useCallback((): boolean => {
    const next: FormError = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) next.name = "Full name is required.";
    if (!formData.email.trim()) next.email = "Email address is required.";
    else if (!emailRe.test(formData.email)) next.email = "Please enter a valid email address.";
    if (!formData.phone.trim()) next.phone = "Phone or WhatsApp number is required.";
    else if (formData.phone.trim().length < 8) next.phone = "Please enter a valid contact number.";
    if (!formData.company.trim()) next.company = "School or institution name is required.";
    if (!formData.message.trim()) next.message = "Please enter your message or requirements.";
    else if (formData.message.length > 2000) {
      next.message = "Message must be 2000 characters or fewer.";
    }
    if (!formData.consent) next.consent = "You must accept the Privacy Policy and Terms of Service.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [formData]);

  const handleChange =
    (key: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setField(key, event.target.value);
    };

  const handleToggle = (key: keyof ContactFormData) => () => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;
    if (!validate()) return;

    const honeypot = (event.currentTarget.elements.namedItem("institution_website_check") as HTMLInputElement | null)?.value ?? "";
    if (honeypot) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      jobTitle: formData.jobTitle,
      projectType: formData.projectType,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      message: formData.message.trim(),
      requestDemo: formData.requestDemo,
      newsletter: formData.newsletter,
      consent: formData.consent,
      source: "iep-schools-website",
      page: location.pathname,
      submittedAt: new Date().toISOString(),
    };

    const mailtoHref = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `[IEP Schools Inquiry] ${payload.company} — ${payload.projectType}`,
    )}&body=${encodeURIComponent(
      `INSTITUTIONAL ENQUIRY DETAILS\n` +
        `-----------------------------------------\n` +
        `School Name: ${payload.company}\n` +
        `Contact Person: ${payload.name}\n` +
        `Designation: ${payload.jobTitle}\n` +
        `Work Email: ${payload.email}\n` +
        `Phone / WhatsApp: ${payload.phone}\n` +
        `Area of Interest: ${payload.projectType}\n` +
        `Student Strength: ${payload.budgetRange}\n` +
        `Target Timeline: ${payload.timeline}\n` +
        `Requested Live Demo: ${payload.requestDemo ? "Yes" : "No"}\n` +
        `Newsletter Subscription: ${payload.newsletter ? "Yes" : "No"}\n\n` +
        `Message / Requirements:\n${payload.message}\n`,
    )}`;

    if (!endpoint) {
      window.location.href = mailtoHref;
      setStatus({ state: "mailto", href: mailtoHref });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus({ state: "sent" });
      event.currentTarget.reset();
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: schoolRoles[0],
        projectType: enquiryTopics[0],
        budgetRange: studentStrengthRanges[0],
        timeline: onboardingTimelines[0],
        message: "",
        requestDemo: false,
        newsletter: true,
        consent: false,
      });
    } catch {
      setStatus({
        state: "error",
        message: "We could not submit the form automatically. Please connect directly via WhatsApp or email.",
      });
    }
  };

  /* ── FAQ filtering / search ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<(typeof filterCategories)[number]>("All");

  const filteredFaqs = useMemo(() => {
    return contactFaqs
      .filter((faq) => {
        const mappedCat = faqCategoryMap[faq.category] || faq.category;
        const matchesCategory =
          selectedCategory === "All" || mappedCat === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
          faq.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.question.localeCompare(b.question));
  }, [contactFaqs, searchQuery, selectedCategory]);

  return (
    <>
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <PageHero
        backgroundImage="/media/Images/Modern%20School%20Management%20Illustration.png"
        className="contact-page-hero"
        eyebrow="Institutional Onboarding & Inquiries"
        title={
          <>
            We’re Here to Help Your School{" "}
            <span className="text-gradient">Run Smarter.</span>
          </>
        }
        description="Have questions about IEP Schools ERP, need a tailored walkthrough for your institution, or want assistance setting up your school's dedicated cloud instance? Our school operations and onboarding team are ready to assist."
        breadcrumb="Contact & Support"
        aside={
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Ambient Purple Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-purple-600/35 via-violet-500/25 to-fuchsia-500/20 blur-2xl opacity-75 animate-pulse"
            />

            {/* Quick Support & Onboarding Card */}
            <div className="relative overflow-hidden rounded-3xl border border-purple-400/30 bg-navy-950/75 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Admissions & Helpdesk Live
                  </span>
                </div>
                <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300">
                  Mon – Sat · 9AM – 7PM IST
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-300">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Dedicated School Cloud Instance</h3>
                    <p className="mt-0.5 text-xs text-white/65">
                      6 GB RAM & 10 GB SSD container provisioned per institution on the ₹0 Free tier.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Instant WhatsApp Consultation</h3>
                    <p className="mt-0.5 text-xs text-white/65">
                      Connect directly with an education advisor to explore syllabus and board settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">100% Institutional Data Privacy</h3>
                    <p className="mt-0.5 text-xs text-white/65">
                      Isolated database boundaries ensure student and financial records stay strictly confidential.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons inside Aside */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition-all hover:bg-emerald-700 hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Call Directly
                </a>
              </div>
            </div>
          </div>
        }
      >
        {/* Metric Badges */}
        <Reveal delay={60}>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center max-w-xl">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-sm"
              >
                <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-purple-200/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Hero CTAs */}
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#contact-form" size="lg">
              Send an Enquiry
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={site.contact.whatsapp}
              external
              variant="light"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Chat on WhatsApp
            </Button>
            <Button
              href="#faq"
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <HelpCircle className="h-4 w-4" />
              View FAQs
            </Button>
          </div>
        </Reveal>
      </PageHero>

      {/* ========================================================
          2. DIRECT CHANNELS (4 Responsive Cards)
          ======================================================== */}
      <Section id="get-in-touch" tone="light" className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Direct Channels"
          title="Connect With Our Team"
          description="Choose the communication channel that works best for your school administration. All inquiries are answered by our dedicated education advisors."
          align="center"
        />

        <div className="mt-12 container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Phone */}
            <div className="card p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-purple-100/70">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-700 mb-5">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Phone Support</h3>
              <p className="mt-1 text-xs text-ink/60">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
              <a
                href={`tel:${site.contact.phone}`}
                className="mt-3 block text-sm font-extrabold text-navy-900 hover:text-purple-700 transition-colors"
              >
                {site.contact.phoneDisplay}
              </a>
              <Button href={`tel:${site.contact.phone}`} variant="outline" size="sm" className="mt-5 w-full">
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </Button>
            </div>

            {/* Card 2: WhatsApp Direct */}
            <div className="card p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-emerald-100 bg-gradient-to-b from-white to-emerald-50/20">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900">WhatsApp Helpdesk</h3>
              <p className="mt-1 text-xs text-ink/60">Instant messaging & demo booking</p>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm font-extrabold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {site.contact.phoneDisplay}
              </a>
              <Button
                href={site.contact.whatsapp}
                external
                variant="primary"
                size="sm"
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Card 3: Email */}
            <div className="card p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-purple-100/70">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 mb-5">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Email Inquiries</h3>
              <p className="mt-1 text-xs text-ink/60">Detailed requirements & proposals</p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-3 block text-xs font-bold text-navy-900 hover:text-purple-700 transition-colors break-words"
              >
                {site.contact.email}
              </a>
              <Button href={`mailto:${site.contact.email}`} variant="outline" size="sm" className="mt-5 w-full">
                <Mail className="h-3.5 w-3.5" />
                Email Us
              </Button>
            </div>

            {/* Card 4: ERP Portal Login */}
            <div className="card p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-purple-100/70">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-50 text-fuchsia-700 mb-5">
                <LogIn className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900">ERP Portal Login</h3>
              <p className="mt-1 text-xs text-ink/60">Existing institutions & staff</p>
              <a
                href={site.erpLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm font-bold text-navy-900 hover:text-purple-700 transition-colors"
              >
                sch.iepsolutions.in
              </a>
              <Button href={site.erpLoginUrl} external variant="outline" size="sm" className="mt-5 w-full">
                <ExternalLink className="h-3.5 w-3.5" />
                Open Portal
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          3. INSTITUTIONAL ENQUIRY FORM + DETAILS
          ======================================================== */}
      <Section tone="white" id="contact-form" className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:gap-14 lg:grid-cols-[1fr_420px]">
          {/* Main Form Card */}
          <div className="card p-6 sm:p-10 border-purple-100 shadow-xl">
            <div className="flex items-start gap-4 mb-8">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-100 text-purple-700">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">
                  Request a Demo or School Consultation
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-ink/70">
                  Share your school's details below. Our education consultants will connect with you to review your requirements, demonstrate live modules, and assist with onboarding.
                </p>
              </div>
            </div>

            {status.state === "sent" ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 text-center sm:text-left">
                <div className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Enquiry Received Successfully!</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
                  Thank you for reaching out. An IEP Schools onboarding coordinator has received your message and will reach out to schedule your walkthrough within 2 business hours.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={() => setStatus({ state: "idle" })}
                    variant="outline"
                    size="sm"
                    className="border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                  >
                    Submit Another Enquiry
                  </Button>
                  <Button
                    href={site.contact.whatsapp}
                    external
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp Now
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="name"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 placeholder:text-ink/40 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.name}</p>}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Work / Official Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 placeholder:text-ink/40 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="principal@yourschool.edu.in"
                      value={formData.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 placeholder:text-ink/40 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.phone}</p>}
                  </div>

                  {/* School / Institution Name */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      School / Institution Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="company"
                      autoComplete="organization"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 placeholder:text-ink/40 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                      placeholder="e.g. St. Xavier's International School"
                      value={formData.company}
                      onChange={handleChange("company")}
                    />
                    {errors.company && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.company}</p>}
                  </div>

                  {/* Designation / Role */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Your Role / Designation
                    </label>
                    <div className="relative">
                      <select
                        name="jobTitle"
                        className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 appearance-none pr-10"
                        value={formData.jobTitle}
                        onChange={handleChange("jobTitle")}
                      >
                        {schoolRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                    </div>
                  </div>

                  {/* Student Strength */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Student Enrollment
                    </label>
                    <div className="relative">
                      <select
                        name="budgetRange"
                        className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 appearance-none pr-10"
                        value={formData.budgetRange}
                        onChange={handleChange("budgetRange")}
                      >
                        {studentStrengthRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Area of Interest / Key Module
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 appearance-none pr-10"
                        value={formData.projectType}
                        onChange={handleChange("projectType")}
                      >
                        {enquiryTopics.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Target Implementation Timeline
                  </label>
                  <div className="relative">
                    <select
                      name="timeline"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 appearance-none pr-10"
                      value={formData.timeline}
                      onChange={handleChange("timeline")}
                    >
                      {onboardingTimelines.map((tl) => (
                        <option key={tl} value={tl}>
                          {tl}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Requirements &amp; Specific School Questions <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={2000}
                    className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium text-navy-900 placeholder:text-ink/40 resize-y transition-colors focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                    placeholder="Tell us about your curriculum/board (CBSE, ICSE, State), any specific attendance or fee collection requirements, or existing software you want to replace..."
                    value={formData.message}
                    onChange={handleChange("message")}
                  />
                  <div className="mt-1.5 flex justify-between text-[11px]">
                    <span className="text-ink/50">{formData.message.length} / 2000 characters</span>
                    {errors.message && <span className="text-rose-600 font-medium">{errors.message}</span>}
                  </div>
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  name="institution_website_check"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/40 p-4 cursor-pointer hover:bg-purple-50/70 transition-colors">
                    <input
                      type="checkbox"
                      name="requestDemo"
                      className="mt-1 h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      checked={formData.requestDemo}
                      onChange={handleToggle("requestDemo")}
                    />
                    <div>
                      <span className="text-xs font-bold text-navy-900">
                        Schedule a live 1-on-1 walkthrough for school leadership
                      </span>
                      <p className="text-[11px] text-ink/65 mt-0.5">
                        Our specialist will walk through the Principal, Teacher, Parent, and Cashier workspaces with your team.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      name="newsletter"
                      className="mt-1 h-4 w-4 rounded border-ink/20 text-purple-600 focus:ring-purple-500"
                      checked={formData.newsletter}
                      onChange={handleToggle("newsletter")}
                    />
                    <span className="text-xs text-ink/75 leading-relaxed">
                      Receive school operations best practices, CBSE exam timetabling guides, and product updates.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 h-4 w-4 rounded border-ink/20 text-purple-600 focus:ring-purple-500"
                      checked={formData.consent}
                      onChange={handleToggle("consent")}
                    />
                    <span className="text-xs text-ink/75 leading-relaxed">
                      I accept the{" "}
                      <a href="/privacy" className="text-purple-700 font-semibold hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms" className="text-purple-700 font-semibold hover:underline">
                        Terms of Service
                      </a>
                      . School data is processed under strict institutional data protection standards.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-rose-600 font-medium pl-1">{errors.consent}</p>}
                </div>

                {status.state === "error" && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs leading-relaxed text-rose-800">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{status.message}</p>
                    </div>
                  </div>
                )}

                {status.state === "mailto" && (
                  <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4.5">
                    <p className="text-sm font-bold text-navy-900">Your email client has been prepared</p>
                    <p className="mt-1 text-xs leading-5 text-ink/65">
                      Press Send in your email software to deliver your details directly to our admissions desk.
                    </p>
                    <Button href={status.href} variant="outline" size="sm" className="mt-3">
                      <Mail className="h-4 w-4" />
                      Open Email App Again
                    </Button>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base py-4"
                  disabled={status.state === "sending"}
                >
                  {status.state === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting School Enquiry...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit School Enquiry
                    </>
                  )}
                </Button>

                <p className="text-center text-[11px] leading-5 text-ink/50">
                  This form is for institutional inquiries and demo booking. It does not initiate automated charges or require credit card details.
                </p>
              </form>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Card 1: Dedicated School Container */}
            <div className="card p-6 sm:p-7 border-purple-100 bg-gradient-to-br from-white via-purple-50/20 to-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-100 text-purple-700">
                  <Server className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy-900">Dedicated Hosting Included</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                    Free Tier: 6 GB RAM
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-ink/70">
                Unlike multi-tenant shared systems where school records mix in one database, every IEP Schools client receives a dedicated cloud environment.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-ink/75">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Isolated MongoDB database container</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Automated daily snapshot backups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Bank-grade TLS 1.3 encrypted data flow</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Helpdesk Hours & Contact */}
            <div className="card p-6 sm:p-7 border-purple-100">
              <h3 className="text-base font-bold text-navy-900 mb-1">Operational Helpdesk</h3>
              <p className="text-xs text-ink/65 mb-4">India Operations & Support Desk</p>
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-start gap-3 text-xs text-ink/75">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <div>
                    <p className="font-bold text-navy-900">Working Hours</p>
                    <p className="text-ink/60">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>

                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 text-xs text-navy-900 hover:text-purple-700 transition-colors"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span className="break-all">{site.contact.email}</span>
                </a>

                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-start gap-3 text-xs text-navy-900 hover:text-purple-700 transition-colors"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span>{site.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Card 3: Existing Institutional Client */}
            <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-50 via-white to-violet-50 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-600 text-white">
                  <LogIn className="h-4 w-4" />
                </span>
                <h3 className="text-base font-bold text-navy-900">Existing Institution?</h3>
              </div>
              <p className="text-xs leading-relaxed text-ink/65 mb-4">
                Administrators, teachers, cashiers, and parents can access their live school workspace directly.
              </p>
              <Button href={site.erpLoginUrl} external variant="primary" size="sm" className="w-full">
                Open ERP Login Portal
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      {/* ========================================================
          4. FREQUENTLY ASKED QUESTIONS (FAQ)
          ======================================================== */}
      <Section tone="light" id="faq" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Answers Before You Reach Out"
            description="Browse frequently asked questions regarding onboarding, pricing plans, free tier hosting, and data security."
            align="center"
          />

          <Reveal>
            <div className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  type="search"
                  placeholder="Search questions (e.g., free tier, hosting, admissions)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-ink/15 bg-white pl-10 pr-4 py-3.5 text-sm text-navy-900 placeholder:text-ink/50 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as (typeof filterCategories)[number])}
                  className="w-full rounded-2xl border border-ink/15 bg-white pl-10 pr-10 py-3.5 text-sm text-navy-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 appearance-none font-medium"
                >
                  {filterCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 max-w-4xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <Accordion>
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} />
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-2xl border border-dashed border-ink/20 py-12 text-center text-sm text-ink/60 bg-white">
                  No questions match your current search or category filter. Connect with our team directly for custom queries.
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ========================================================
          5. NEWSLETTER & STAY CONNECTED
          ======================================================== */}
      <Section tone="white" className="py-16 sm:py-20 border-t border-border">
        <div className="container-x grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <span className="eyebrow">Stay Connected</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-900">
              Join School Leaders &amp; Educators
            </h2>
            <p className="text-sm leading-relaxed text-ink/70 max-w-md">
              Follow our announcements and educational insights as we roll out new modules for CBSE and State Board institutions across India.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { label: "WhatsApp", icon: MessageCircle, href: site.contact.whatsapp },
                { label: "Email Desk", icon: Mail, href: `mailto:${site.contact.email}` },
                { label: "Phone", icon: Phone, href: `tel:${site.contact.phone}` },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-200/80 bg-purple-50/50 px-3.5 py-2 text-xs font-bold text-purple-700 transition-all hover:bg-purple-100 hover:text-purple-800"
                >
                  <platform.icon className="h-4 w-4" />
                  <span>{platform.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50/70 via-white to-violet-50/40 p-6 sm:p-8 shadow-card">
            <h3 className="text-base font-bold text-navy-900 mb-1">School Operations Newsletter</h3>
            <p className="mt-1 text-xs text-ink/70">
              Receive practical guides on academic timetable scheduling, RFID attendance, and fee collection workflows.
            </p>
            <form
              className="mt-4 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing! Educational updates will be sent to your email.");
              }}
            >
              <input
                type="email"
                placeholder="principal@school.edu.in"
                required
                className="flex-1 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-ink/40 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
              />
              <Button type="submit" size="sm" className="whitespace-nowrap px-6">
                Subscribe
              </Button>
            </form>
            <p className="mt-2.5 text-[10px] leading-4 text-ink/50">
              Zero spam. Institutional updates and school management insights only. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </Section>

      {/* ========================================================
          6. FINAL CALL TO ACTION BAND
          ======================================================== */}
      <Section tone="dark" id="cta" className="py-16 sm:py-20">
        <div className="container-x relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#120a2e] via-[#1a0e42] to-[#0a071c] p-8 sm:p-14 text-white shadow-2xl border border-purple-500/25">
          <div className="absolute inset-0 dark-glow opacity-80" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="eyebrow eyebrow-dark">Begin School Automation</span>
            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Modernize Your School Operations?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-7 text-white/70 max-w-xl mx-auto">
              Start with our ₹0 Free tier complete with dedicated cloud hosting, or speak with our team to customize an end-to-end ERP deployment for your institution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
              <Button href="#contact-form" size="lg" className="shadow-lg shadow-purple-600/30">
                Request a Free Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={site.contact.whatsapp}
                external
                variant="light"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

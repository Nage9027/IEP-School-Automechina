import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  Cloud,
  CreditCard,
  Database,
  Globe,
  GraduationCap,
  Headphones,
  Info,
  LayoutDashboard,
  Megaphone,
  Minus,
  Rocket,
  Search,
  Server,
  Settings,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { PlanCard } from "@/components/pricing/PlanCard";
import {
  comparisonGroups,
  comparisonRows,
  pricingNotes,
} from "@/content/plans";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { cn, formatInr } from "@/lib/utils";

// 5-Step Customer Onboarding & Delivery Journey
const serviceWorkflowSteps = [
  {
    step: "01",
    title: "Choose Your Plan",
    subtitle: "Select the Package",
    desc: "Select the Free, Silver, or Advanced tier matching your school size, digital goals, and marketing ambition.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "School Onboarding",
    subtitle: "Gather Details",
    desc: "Our onboarding team collects your school logo, brand colors, leadership notes, photos, and grade structures.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "ERP Configuration",
    subtitle: "System Setup",
    desc: "We configure your dedicated cloud environment, academic sessions, fee heads, and role-based staff credentials.",
    icon: Settings,
  },
  {
    step: "04",
    title: "Website & Digital Setup",
    subtitle: "Web Launch",
    desc: "Our design team builds and publishes your mobile-responsive school website and configures online admission enquiry routing.",
    icon: Globe,
  },
  {
    step: "05",
    title: "Growth & Marketing",
    subtitle: "Ongoing Reach",
    desc: "Enjoy continuous ERP support, while Advanced subscribers receive weekly school spotlights, admission creatives, and monthly reports.",
    icon: TrendingUp,
  },
];

// What Makes IEP Schools Different (6 Benefit Cards)
const ecosystemBenefits = [
  {
    id: "automation",
    title: "Complete School Automation",
    subtitle: "Minimal Manual Paperwork",
    description:
      "Automate daily roll-call attendance, fee installment reminders, examination grading, student report cards, and transport rosters in one integrated system.",
    icon: Zap,
    badge: "Operations",
  },
  {
    id: "environment",
    title: "Dedicated School Environment",
    subtitle: "Private & Secure Architecture",
    description:
      "Every institution operates in its own isolated container environment with dedicated database collections, 256-bit encryption, and daily backup tooling.",
    icon: Server,
    badge: "Cloud Hosting",
  },
  {
    id: "website",
    title: "Professional School Website",
    subtitle: "Included in Every Plan",
    description:
      "Every eligible school receives a professionally developed website with ₹0 website development charge on Free, enhanced on Silver, and premium on Advanced.",
    icon: Globe,
    badge: "Digital Identity",
  },
  {
    id: "mobile",
    title: "Parent Mobile Application",
    subtitle: "Direct Parent Connection",
    description:
      "Parents stay informed in real time with attendance alerts, homework assignments, school circulars, fee receipts, and student progress on their smartphones.",
    icon: Smartphone,
    badge: "Parent App",
  },
  {
    id: "marketing",
    title: "Digital Marketing Support",
    subtitle: "Grow Student Enrollment",
    description:
      "Get continuous institutional promotion with featured directory listings, weekly social media graphics, admission campaign drives, and transparent reports.",
    icon: Megaphone,
    badge: "Marketing",
  },
  {
    id: "support",
    title: "Continuous Technical Assistance",
    subtitle: "Dedicated Partner Team",
    description:
      "From guided data migration to staff training and routine website updates, our engineers ensure your digital school operates without downtime or friction.",
    icon: Headphones,
    badge: "Support",
  },
];

// Marketing Showcase Mockup Tabs
const marketingMockups = [
  {
    id: "directory",
    title: "Featured School Profile",
    subtitle: "Official Directory Placement",
    badge: "Directory Spotlight",
    headline: "St. Xavier's International Academy",
    meta: "CBSE Affiliated · Nursery to XII · Bangalore",
    excerpt:
      "Featured as one of the top tech-enabled schools with verified digital operations, smart classrooms, and 100% digital parent communication.",
    tags: ["Verified School", "Smart Campus", "Admissions Open 2026-27"],
    stats: "12,400+ Parent Profile Views",
  },
  {
    id: "admission",
    title: "Admission Campaign Banner",
    subtitle: "Enrollment Drive Graphics",
    badge: "Campaign Creative",
    headline: "Admissions Open for Academic Year 2026–27",
    meta: "Targeted Digital Distribution · High CTR",
    excerpt:
      "Eye-catching digital banners designed for social media, WhatsApp broadcasts, and landing pages with direct click-to-apply buttons.",
    tags: ["Early Bird Enquiries", "Direct WhatsApp Link", "Digital Form"],
    stats: "340+ Direct Admission Enquiries Logged",
  },
  {
    id: "topper",
    title: "School Achievement Spotlight",
    subtitle: "Academic & Sports Toppers",
    badge: "Success Spotlight",
    headline: "Celebrating 100% CBSE Board Pass Percentage",
    meta: "Published on IEP Platform & Social Channels",
    excerpt:
      "Custom branded congratulatory graphics highlighting school toppers, state-level athletes, and science olympiad winners to build local prestige.",
    tags: ["Topper Spotlight", "Social Creative", "Alumni Pride"],
    stats: "4,800+ Shares & Parent Reactions",
  },
  {
    id: "social",
    title: "Social Media Campaign Post",
    subtitle: "Weekly Ready-to-Publish Creatives",
    badge: "Social Media Ready",
    headline: "Nurturing Tomorrow's Innovators at Oakridge",
    meta: "Square Post & Vertical Story Formats Included",
    excerpt:
      "Professional Instagram and Facebook creative highlighting STEM robotics labs, sports facilities, and holistic character building.",
    tags: ["Instagram Ready", "Story Format", "School Branding"],
    stats: "Consistent Weekly Engagement",
  },
  {
    id: "event",
    title: "School Event Announcement",
    subtitle: "Annual Day & Sports Meets",
    badge: "Event Broadcast",
    headline: "Annual Sports Meet & Cultural Fiesta 2026",
    meta: "Digital Invitation & Schedule Highlights",
    excerpt:
      "Digital invitations, event schedules, and live video broadcast teasers created and distributed to parent community with one click.",
    tags: ["Parent Invitation", "Schedule Highlight", "Broadcast Ready"],
    stats: "98% Parent Reach Recorded",
  },
  {
    id: "report",
    title: "Monthly Visibility Report",
    subtitle: "Transparent Performance Data",
    badge: "Monthly Analytics",
    headline: "October 2026 Institutional Reach Report",
    meta: "Delivered to School Leadership Every Month",
    excerpt:
      "Comprehensive breakdown of monthly views, parent clicks, website inquiry form submissions, and campaign engagement metrics.",
    tags: ["Audited Metrics", "Lead Breakdown", "Leadership Review"],
    stats: "Detailed PDF Report Every Month",
  },
];

// Website Showcase Examples
const websiteShowcasePages = [
  {
    id: "home",
    name: "Modern Homepage",
    desc: "Hero banner carousel, principal's greeting, core statistics, and quick admission links.",
    includes: ["Brand Color Theme", "Admission Quick Link", "Announcement Ticker"],
  },
  {
    id: "about",
    name: "About & Leadership",
    desc: "Institutional heritage, mission, vision, management message, and leadership profiles.",
    includes: ["Founder's Vision", "Core Values", "Accreditation Badges"],
  },
  {
    id: "academics",
    name: "Academics & Streams",
    desc: "Curriculum overview, primary to senior secondary streams, labs, and faculty highlights.",
    includes: ["CBSE / State Curriculum", "Faculty Directory", "Smart Classrooms"],
  },
  {
    id: "admissions",
    name: "Admissions & Inquiries",
    desc: "Direct admission guidelines, fee criteria, and interactive form synced with ERP inbox.",
    includes: ["Online Inquiry Form", "Document Checklist", "ERP Direct Sync"],
  },
  {
    id: "gallery",
    name: "Campus & Event Gallery",
    desc: "Categorized photo albums of campus infrastructure, sports grounds, and annual festivals.",
    includes: ["High-Res Albums", "Event Highlights", "Campus Infrastructure"],
  },
  {
    id: "contact",
    name: "Contact & Directions",
    desc: "Interactive Google Maps, office visiting hours, emergency desk, and contact directory.",
    includes: ["Google Maps Embed", "Visiting Timings", "Department Emails"],
  },
];

export default function PricingPage() {
  const { site, plans, faqs, freeHosting } = useSiteContent();
  const [annual, setAnnual] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [activeMarketingTab, setActiveMarketingTab] = useState(0);
  const [activeWebPageTab, setActiveWebPageTab] = useState(0);

  usePageMeta({
    title: "Pricing & School Digital Growth Packages | IEP Schools",
    description:
      "More than school software. IEP Schools provides complete school management ERP, professional school website development, and digital marketing services to help your institution grow.",
    path: "/pricing",
  });

  const corePlans = plans.filter((plan) =>
    ["free", "silver", "advanced"].includes(plan.id),
  );
  const enterprisePlan = plans.find((plan) => plan.id === "enterprise");
  const comparisonPlans = plans.filter((plan) =>
    ["free", "silver", "advanced", "enterprise"].includes(plan.id),
  );
  const pricingFaqs = faqs.filter((faq) => faq.category === "Pricing & plans");

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return pricingFaqs;
    const query = faqSearch.toLowerCase();
    return pricingFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query),
    );
  }, [pricingFaqs, faqSearch]);

  const activeMarketingItem = marketingMockups[activeMarketingTab];
  const activeWebItem = websiteShowcasePages[activeWebPageTab];

  return (
    <div className="pricing-page bg-white">
      {/* ========================================================
          1. HERO SECTION – PREMIUM DIGITAL GROWTH PARTNER
          ======================================================== */}
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-24 text-white sm:pt-28 lg:pb-28 lg:pt-32">
        {/* Ambient Dark Neon Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-purple-600/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[600px] w-[600px] rounded-full bg-indigo-600/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-fuchsia-600/15 blur-3xl"
        />

        <div className="container-x relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 xl:gap-12">
            {/* Left Column: Heading, Value Proposition & Actions */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-purple-200 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-purple-300" />
                Complete Digital Education Ecosystem
              </span>

              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.12] break-words">
                More Than School Software.{" "}
                <span className="block bg-gradient-to-r from-[#A78BFA] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
                  Your Complete Digital Growth Partner.
                </span>
              </h1>

              <p className="mt-5 text-sm leading-relaxed text-purple-100/80 sm:text-lg sm:leading-8">
                From managing everyday school operations to building your digital presence and reaching more parents, IEP Schools provides the technology, tools and services to help your institution grow.
              </p>

              {/* 3 Core Pillars Pill Matrix */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-300">
                    <LayoutDashboard className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white leading-tight">School ERP</p>
                    <p className="text-[10px] text-purple-200/70">Full Automation</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Globe className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white leading-tight">School Website</p>
                    <p className="text-[10px] text-emerald-200/70">Included in Plans</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                    <Megaphone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white leading-tight">Digital Marketing</p>
                    <p className="text-[10px] text-fuchsia-200/70">Promote Your School</p>
                  </div>
                </div>
              </div>

              {/* Hero Action CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#plans"
                  className="inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-[#6738F5] to-[#8B5CF6] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] hover:shadow-purple-600/50"
                >
                  <Rocket className="h-4 w-4" />
                  Explore Our Plans
                </a>

                <Button
                  to="/contact?topic=consultation&source=pricing"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center border-purple-400/40 text-purple-200 hover:bg-white/10 hover:text-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a Consultation
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-purple-200/75">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Free Plan Available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ₹0 Website Development Fee
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  No Card Required Online
                </span>
              </div>
            </div>

            {/* Right Column: 3D Educational Technology & Dashboard Mockup */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative overflow-hidden rounded-[26px] border border-purple-400/30 bg-navy-900/80 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(103,56,245,0.25)] backdrop-blur-md">
                <img
                  src="/media/Futuristic%20School%20Pricing%20Dashboard.png"
                  alt="IEP Schools Digital Ecosystem - Cloud ERP, School Website, Parent App and Marketing Analytics"
                  className="h-auto w-full rounded-2xl object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Floating Glassmorphism Cards */}
                <div className="absolute -left-3 top-5 hidden sm:flex items-center gap-2.5 rounded-2xl border border-purple-400/30 bg-navy-950/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float">
                  <span className="grid h-7 w-7 place-items-center rounded-xl bg-purple-500/25 text-purple-300">
                    <LayoutDashboard className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block leading-tight">School Management ERP</span>
                    <span className="text-[10px] font-normal text-purple-200/70">12+ Portals & 22+ Modules</span>
                  </div>
                </div>

                <div className="absolute -right-3 bottom-6 hidden sm:flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-navy-950/90 px-3.5 py-2 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:2s]">
                  <span className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-500/25 text-emerald-300">
                    <Globe className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block leading-tight">School Website Included</span>
                    <span className="text-[10px] font-normal text-emerald-200/70">Free & Paid Plan Benefit</span>
                  </div>
                </div>

                <div className="absolute left-6 bottom-4 hidden sm:flex items-center gap-2 rounded-2xl border border-fuchsia-400/30 bg-navy-950/90 px-3 py-1.5 text-xs font-bold text-white shadow-lift backdrop-blur-md">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-fuchsia-500/25 text-fuchsia-300">
                    <Megaphone className="h-3.5 w-3.5" />
                  </span>
                  <span>Digital Marketing Support</span>
                </div>
              </div>

              <p className="mt-3 text-center text-[11px] text-purple-200/60">
                Connected educational ecosystem: ERP Automation &middot; Institutional Website &middot; Digital Marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. THREE MAIN PRICING PACKAGES (FREE, SILVER, ADVANCED)
          ======================================================== */}
      <section id="plans" className="py-16 sm:py-20 bg-slate-50/70 border-b border-purple-100/60">
        <div className="container-x">
          <SectionHeading
            eyebrow="Transparent Packages"
            title="Three Comprehensive School Growth Plans"
            description="Choose the right package for your institution. Every plan combines software automation, web presence and support to help your school thrive."
          />

          {/* Billing Switcher & Transparency Note */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-purple-100 bg-white p-5 shadow-soft sm:flex-row sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">
                  Transparent Institutional Pricing &middot; Zero Hidden Surcharges
                </p>
                <p className="text-xs text-slate-500">
                  No online checkout or automatic credit card locks. Plans are confirmed with an agreed quotation.
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-1 rounded-full border border-purple-200/80 bg-purple-50/50 p-1"
              role="group"
              aria-label="Billing frequency"
            >
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-all",
                  !annual
                    ? "bg-[#6738F5] text-white shadow-sm"
                    : "text-slate-600 hover:text-navy-900",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-all",
                  annual
                    ? "bg-[#6738F5] text-white shadow-sm"
                    : "text-slate-600 hover:text-navy-900",
                )}
              >
                Annual
                <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-800">
                  10 for 12 (Save 2 Mo.)
                </span>
              </button>
            </div>
          </div>

          {/* Three Main Package Cards Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {corePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} annual={annual} />
            ))}
          </div>

          {/* Enterprise / Custom Plan Banner */}
          {enterprisePlan && (
            <div className="mt-10 overflow-hidden rounded-3xl border border-purple-200/60 bg-gradient-to-r from-navy-950 via-[#181138] to-navy-950 p-6 text-white shadow-soft sm:p-8">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Multi-Campus & Custom
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight">
                      {enterprisePlan.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-purple-100/80">
                    {enterprisePlan.tagline}. Designed for educational trusts, group institutions, and campuses with 5,000+ students requiring dedicated server containers, bespoke integrations, or multi-branch consolidation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button to={enterprisePlan.ctaHref} variant="gold">
                      {enterprisePlan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button href={site.contact.whatsapp} external variant="light">
                      Talk on WhatsApp
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {enterprisePlan.features.slice(0, 6).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-snug text-purple-100/80"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          3. WHAT MAKES IEP SCHOOLS DIFFERENT? (6 BENEFIT CARDS)
          ======================================================== */}
      <Section tone="white" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Institutional Advantage"
            title="Everything Your School Needs to Grow"
            description="Unlike traditional software vendors who sell ERP in isolation, IEP Schools unites daily automation, digital identity, and parent reach into one connected partnership."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="group relative flex flex-col rounded-3xl border border-purple-100/80 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100 group-hover:bg-[#6738F5] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-navy-900 group-hover:text-purple-700 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {benefit.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ========================================================
          4. HOW OUR SERVICES WORK (5-STEP PROCESS)
          ======================================================== */}
      <Section tone="light" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-purple-50/30">
        <div className="container-x">
          <SectionHeading
            eyebrow="Delivery Journey"
            title="How Our Services Work"
            description="From initial package selection to website deployment and continuous marketing, our structured 5-step process ensures a smooth launch."
          />

          {/* Desktop Horizontal Timeline / Mobile Vertical */}
          <div className="mt-14 grid gap-6 md:grid-cols-5 relative">
            {/* Desktop connecting track line behind cards */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-purple-200 via-violet-300 to-purple-200 -z-0"
            />

            {serviceWorkflowSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative z-10 flex flex-col rounded-3xl border border-purple-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-purple-600/30">
                      {item.step}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 ring-1 ring-purple-200/70 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-purple-600">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-1 text-base font-extrabold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ========================================================
          5. MARKETING SHOWCASE – "YOUR SCHOOL DESERVES TO BE SEEN"
          ======================================================== */}
      <Section tone="white" className="py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-700 border border-purple-100">
              <Megaphone className="h-3.5 w-3.5" />
              Digital Marketing & Growth
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              Your School Deserves to Be Seen.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Included in our Advanced plan, we help your institution establish brand prestige, run admission campaign promotions, celebrate student achievements, and attract prospective families.
            </p>
          </div>

          {/* Interactive Mockup Tabs */}
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-purple-100 pb-4">
              {marketingMockups.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMarketingTab(index)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold transition-all",
                    activeMarketingTab === index
                      ? "bg-[#6738F5] text-white shadow-md shadow-purple-600/20"
                      : "bg-surface text-slate-600 hover:bg-purple-50 hover:text-purple-700",
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Display Active Marketing Showcase Card */}
            <div className="mt-8 rounded-3xl border border-purple-200/70 bg-gradient-to-br from-slate-900 via-navy-950 to-slate-950 p-6 text-white shadow-xl sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                      {activeMarketingItem.badge}
                    </span>
                    <span className="text-xs text-purple-200/60 font-medium">
                      {activeMarketingItem.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {activeMarketingItem.headline}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-emerald-400">
                    {activeMarketingItem.meta}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-purple-100/80">
                    {activeMarketingItem.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeMarketingItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-purple-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <BarChart3 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {activeMarketingItem.stats}
                      </p>
                      <p className="text-[10px] text-purple-200/60">
                        Illustrative performance metric based on participating school averages
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Visual Graphic Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                  <div className="rounded-xl border border-purple-400/20 bg-navy-900 p-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-600 grid place-items-center font-bold text-xs text-white">
                          IEP
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">IEP Schools Spotlight</p>
                          <p className="text-[10px] text-slate-400">Verified Institution Broadcast</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[9px] font-bold">
                        Published
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="h-32 rounded-lg bg-gradient-to-tr from-purple-800/40 via-indigo-700/30 to-fuchsia-600/30 flex items-center justify-center border border-white/10 text-center p-4">
                        <div>
                          <GraduationCap className="h-8 w-8 mx-auto text-purple-300 opacity-80 mb-1" />
                          <p className="text-xs font-bold text-white">{activeMarketingItem.headline}</p>
                          <p className="text-[10px] text-purple-200/70 mt-0.5">Official Campaign Asset</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeMarketingItem.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3.5 w-3.5" /> Multi-Channel
                      </span>
                      <span className="text-purple-300 font-semibold">
                        Approved by Principal &middot; 100% Authorized
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Approval Workflow Banner */}
              <div className="mt-8 rounded-2xl border border-purple-400/30 bg-purple-950/40 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Transparent 5-Stage Content Approval Workflow
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-5 text-[11px]">
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-purple-300 font-bold">1. School Submits</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Upload event details & photos</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-purple-300 font-bold">2. IEP Reviews</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Team designs brand creative</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-emerald-300 font-bold">3. School Approves</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Principal signs off on creative</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-purple-300 font-bold">4. Scheduled</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Published across channels</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <span className="text-purple-300 font-bold">5. Monthly Report</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Views & inquiries logged</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <p className="text-[11px] text-purple-200/60 italic">
                  * Note: All marketing materials require verified school authorization. No photos or student details are published without written approval.
                </p>
                <Link
                  to="/contact?topic=marketing&source=pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-navy-900 transition-all hover:bg-purple-50"
                >
                  Promote Your School with IEP Schools
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          6. SCHOOL WEBSITE SHOWCASE – "YOUR SCHOOL. YOUR IDENTITY."
          ======================================================== */}
      <Section tone="light" className="py-16 sm:py-24 bg-purple-50/40 border-y border-purple-100">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              Website Development Inclusions
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              Your School. Your Identity. Your Website.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A high-performing school website is your most valuable digital asset. We build, host, and maintain your school website as part of your subscription package.
            </p>
          </div>

          {/* Website Package Breakdown Comparison Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Free Tier Website */}
            <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-soft flex flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Included in Free
                </span>
                <span className="text-xs font-extrabold text-emerald-600">₹0 Dev Fee</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-navy-900">
                Standard School Website
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Clean, mobile-responsive website establishing your official school presence.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-slate-700 flex-1">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Homepage with school crest & banner</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>About Us, Vision & Mission page</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Principal's message & leadership desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Campus photo gallery & facility tour</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Admission enquiry form with email alert</span>
                </li>
              </ul>
              <div className="mt-5 pt-3 border-t border-purple-50 text-[11px] text-slate-500">
                Domain registration & renewal fees paid separately
              </div>
            </div>

            {/* Silver Tier Website */}
            <div className="rounded-3xl border border-purple-200 bg-white p-6 shadow-soft flex flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-800">
                  Included in Silver
                </span>
                <span className="text-xs font-extrabold text-purple-600">Enhanced Design</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-navy-900">
                Professional School Website
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Custom brand styling, staff directory, and two-way integration with your ERP.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-slate-700 flex-1">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Everything in Standard package</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Tailored institution brand color palette</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Faculty & staff directory presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Direct ERP sync: Inquiries go into admission desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Live circulars, notices & news feed ticker</span>
                </li>
              </ul>
              <div className="mt-5 pt-3 border-t border-purple-50 text-[11px] text-slate-500">
                SEO sitemap and Parent Portal login links included
              </div>
            </div>

            {/* Advanced Tier Website */}
            <div className="rounded-3xl border border-purple-400 bg-gradient-to-b from-purple-50/60 to-white p-6 shadow-lift ring-1 ring-purple-300 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#6738F5] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Included in Advanced
                </span>
                <span className="text-xs font-extrabold text-purple-700">Premium & Landing Pages</span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-navy-900">
                Premium Custom Website
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                High-converting admission landing pages, Google Analytics, and ongoing updates.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-slate-700 flex-1">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Everything in Professional package</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Dedicated admission drive campaign landing pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Google Analytics & Meta Pixel integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Schema markup for search engine rich snippets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>Continuous regular content updates & webmaster support</span>
                </li>
              </ul>
              <div className="mt-5 pt-3 border-t border-purple-100 text-[11px] text-purple-800 font-semibold">
                High-converting responsive landing page included
              </div>
            </div>
          </div>

          {/* Interactive Web Page Preview Tabs */}
          <div className="mt-12 rounded-3xl border border-purple-100 bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-lg font-extrabold text-navy-900 text-center">
              Explore Included Website Deliverables
            </h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {websiteShowcasePages.map((page, idx) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setActiveWebPageTab(idx)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold transition-all",
                    activeWebPageTab === idx
                      ? "bg-navy-950 text-white shadow-sm"
                      : "bg-surface text-slate-600 hover:text-navy-900",
                  )}
                >
                  {page.name}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Deliverable Overview
                </p>
                <h4 className="text-xl font-extrabold text-navy-900 mt-1">
                  {activeWebItem.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
                  {activeWebItem.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeWebItem.includes.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-lg bg-white border border-purple-200/80 px-2.5 py-1 text-[11px] font-semibold text-purple-900 shadow-2xs"
                    >
                      &check; {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Button to="/contact?topic=website&source=pricing" variant="primary" size="md">
                Discuss Your School Website
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          7. FULL PLAN COMPARISON SECTION
          ======================================================== */}
      <Section tone="white" id="compare-plans" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Detailed Comparison"
            title="Compare Every Inclusions Across All Packages"
            description="Clear institutional breakdown across ERP capabilities, website development, marketing services, cloud hosting, and support."
          />

          <div className="mt-12 overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-purple-100 bg-purple-50/70">
                    <th className="sticky left-0 z-10 bg-purple-50 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
                      Deliverable / Feature
                    </th>
                    {comparisonPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className={cn(
                          "px-4 py-4 text-center text-xs font-extrabold",
                          plan.highlighted ? "bg-purple-100/70 text-purple-900" : "text-navy-900",
                        )}
                      >
                        {plan.name}
                        <span className="mt-1 block text-[10px] font-semibold text-slate-500">
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
                      <tr className="border-b border-purple-100 bg-purple-50/30">
                        <td
                          colSpan={comparisonPlans.length + 1}
                          className="px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-purple-700"
                        >
                          {group}
                        </td>
                      </tr>
                      {comparisonRows
                        .filter((row) => row.group === group)
                        .map((row) => (
                          <tr
                            key={row.label}
                            className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors last:border-0"
                          >
                            <td className="sticky left-0 z-10 bg-white px-6 py-3.5 text-xs font-semibold text-slate-700">
                              {row.label}
                            </td>
                            {comparisonPlans.map((plan) => {
                              const value = row.values[plan.id];
                              return (
                                <td
                                  key={plan.id}
                                  className={cn(
                                    "px-4 py-3.5 text-center text-xs",
                                    plan.highlighted && "bg-purple-50/30",
                                  )}
                                >
                                  {typeof value === "boolean" ? (
                                    value ? (
                                      <Check className="mx-auto h-4 w-4 text-emerald-600 stroke-[2.5]" />
                                    ) : (
                                      <Minus className="mx-auto h-4 w-4 text-slate-300" />
                                    )
                                  ) : (
                                    <span
                                      className={cn(
                                        "font-semibold",
                                        value === "Not included" || value === "N/A"
                                          ? "text-slate-400 font-normal"
                                          : value?.toLowerCase().includes("included") ||
                                              value?.toLowerCase().includes("advanced")
                                            ? "text-purple-700 font-bold"
                                            : "text-slate-700",
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

          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
            Student and staff limits are initial configured allocations. Plans are commercial boundaries, not rigid software locks. Capacity can be easily adjusted as your institution grows.
          </p>
        </div>
      </Section>

      {/* ========================================================
          8. CLOUD HOSTING & INFRASTRUCTURE TRUST
          ======================================================== */}
      <Section tone="dark" className="py-16 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 dark-glow opacity-50" />
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="Cloud Infrastructure"
            title="Included Cloud Hosting. Engineered for Schools."
            description="Every school environment is provisioned with high-availability cloud hosting, automated database backups, and strict data privacy."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/20 text-purple-300 mb-4">
                <Server className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {freeHosting.ram}
              </span>
              <p className="mt-1 text-sm font-bold text-purple-200">
                RAM Allocation
              </p>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Included allocation with the Free tier. Higher priority allocations configured on Silver and Advanced.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-300 mb-4">
                <Database className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {freeHosting.storage}
              </span>
              <p className="mt-1 text-sm font-bold text-emerald-200">
                Free Cloud Storage
              </p>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Used for school records, student KYC documents, receipts, and circulars. Scales to 50 GB+ on paid plans.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-500/20 text-indigo-300 mb-4">
                <Wifi className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                Unlimited
              </span>
              <p className="mt-1 text-sm font-bold text-indigo-200">
                Bandwidth (Fair-Use)
              </p>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Fast web page delivery and parent app sync with zero per-gigabyte bandwidth overage penalties.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-300 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                ₹0 Upfront
              </span>
              <p className="mt-1 text-sm font-bold text-fuchsia-200">
                No Card Required
              </p>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Explore school automation with no risk. Onboarding is handled smoothly with our team.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-purple-400/30 bg-purple-950/40 p-6 sm:p-8">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-purple-600 text-white shadow-glow">
                <Cloud className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">
                  Want to review full hardware, backup & disaster recovery specs?
                </p>
                <p className="text-xs text-purple-200/70">
                  Read our full hosting infrastructure overview and data privacy commitments.
                </p>
              </div>
            </div>
            <Button to="/hosting" variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              Explore Hosting Specs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ========================================================
          9. SEARCHABLE FAQ SECTION (13+ COMPREHENSIVE QUESTIONS)
          ======================================================== */}
      <Section tone="white" className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Column: Summary & Notes */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Transparency First"
              title="Important Plan & Service Disclosures"
              description="Clear terms agreed up front. We believe in complete transparency before you begin."
            />

            <div className="mt-6 space-y-3">
              {pricingNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-start gap-2.5 rounded-2xl border border-purple-100 bg-purple-50/30 p-4"
                >
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <p className="text-xs leading-6 text-slate-700">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs leading-6 text-emerald-900">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <p>
                  Every subscription begins with an institutional requirements review. If the Free plan fulfills your school's current needs, we will gladly recommend starting with Free.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Searchable FAQ Accordion */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                  Frequently Asked Questions
                </span>
                <h3 className="text-2xl font-extrabold text-navy-900 mt-1">
                  Everything you need to know
                </h3>
              </div>

              {/* FAQ Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter FAQ questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full rounded-full border border-purple-200 bg-purple-50/30 py-2 pl-9 pr-8 text-xs font-medium text-navy-900 outline-none transition-colors focus:border-purple-600 focus:bg-white"
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

            <div className="mt-6 rounded-3xl border border-purple-100 bg-white p-6 sm:p-8 shadow-soft">
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
                  No questions match "{faqSearch}". Try searching for "free", "website", "marketing", or "domain".
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================
          10. FINAL CONVERSION CTA BAND
          ======================================================== */}
      <CtaBand
        title="Ready to Transform Your School Operations & Online Presence?"
        description="Experience smarter school automation, a professional school website, and digital marketing support tailored for your institution."
        secondary="hosting"
      />
    </div>
  );
}

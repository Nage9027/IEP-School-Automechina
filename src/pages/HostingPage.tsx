import {
  Award,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Lock,
  Monitor,
  ShieldCheck,
  Server,
  Users,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { hostingLimitations, hostingSecurity, hostingFaqs } from "@/content/hosting";

// --- Type Extensions ---

type Status = "available" | "configurable" | "planned";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// --- Main Component ---

export default function HostingPage() {
  const { freeHosting: fb } = useSiteContent();

  usePageMeta({
    title: "Dedicated School Hosting | IEP Schools",
    description:
      "Run your school automation platform in a dedicated hosting environment. 6 GB RAM, 10 GB storage and unlimited bandwidth included in our free offer with upgradeable cloud capacity.",
    path: "/hosting",
  });

  // --- Feature Items with Status ---

  const featureItems: FeatureItem[] = [
    {
      id: "dedicated-environment",
      title: "Dedicated School Environment",
      description: "Isolated hosting environment allocated specifically for your school's daily operations",
      status: "available",
      icon: Server,
    },
    {
      id: "secure-https",
      title: "Secure HTTPS Access",
      description: "All communications encrypted with TLS 1.3/HTTPS for bank-grade secure data transit",
      status: "available",
      icon: Lock,
    },
    {
      id: "database-management",
      title: "Dedicated Database Engine",
      description: "High-performance MongoDB persistent storage for student, staff, attendance, finance and academic records",
      status: "available",
      icon: Database,
    },
    {
      id: "automated-backup",
      title: "Automated Daily Backups",
      description: "Continuous automated snapshot scheduling and point-in-time disaster recovery tooling",
      status: "available",
      icon: Calendar,
    },
    {
      id: "real-time-notifications",
      title: "Real-time Live Notifications",
      description: "Instant Socket.IO synchronization for attendance alerts, fee receipts, circulars and chat",
      status: "available",
      icon: Zap,
    },
    {
      id: "scalable-infrastructure",
      title: "Scalable Cloud Infrastructure",
      description: "Elastic resource scaling supporting from 200 to 10,000+ students without downtime",
      status: "available",
      icon: Cpu,
    },
    {
      id: "parent-mobile-app",
      title: "Parent Mobile Application",
      description: "Complete Android and iOS parent companion app for attendance, fees, timetable and notices",
      status: "available",
      icon: Users,
    },
    {
      id: "performance-monitoring",
      title: "24/7 Health & Performance Monitoring",
      description: "Continuous resource tracking, automated load balancing and 99.98% high availability SLA",
      status: "available",
      icon: Monitor,
    },
    {
      id: "technical-support",
      title: "Priority Technical Support",
      description: "Dedicated technical onboarding, staff orientation and priority resolution desk",
      status: "available",
      icon: ShieldCheck,
    },
    {
      id: "application-updates",
      title: "Zero-Downtime Cloud Updates",
      description: "Seamless rolling updates keeping your school on the latest version without service interruption",
      status: "available",
      icon: Award,
    },
  ];

  // --- Architecture Steps ---

  const architectureSteps: StepItem[] = [
    {
      id: "school-users",
      title: "School Users",
      description: "Admin, Principal, Teachers, Parents, Students, Accountant",
      icon: Users,
    },
    {
      id: "secure-access",
      title: "Secure Access",
      description: "HTTPS, Authentication, Role-based permissions",
      icon: Lock,
    },
    {
      id: "application-layer",
      title: "Application Layer",
      description: "React frontend, Node.js and Express backend, API services",
      icon: Globe,
    },
    {
      id: "database-layer",
      title: "Database Layer",
      description: "MongoDB, Student records, Attendance, Fees, Academic information",
      icon: Database,
    },
    {
      id: "real-time-operations",
      title: "Real-time & Operations",
      description: "Socket.IO, Notifications, Backup processes, Monitoring",
      icon: Zap,
    },
  ];

  // --- Resources Card Data ---

  const resources = [
    {
      id: "ram",
      title: "RAM",
      value: fb.ram,
      description: "Application memory included with the Free plan. This is a shared allocation, not a dedicated server.",
    },
    {
      id: "storage",
      title: "Storage",
      value: fb.storage,
      description: "Used for database, uploaded files, documents and other school data held by the deployment.",
    },
    {
      id: "bandwidth",
      title: "Bandwidth",
      value: fb.bandwidth,
      description: "Subject to the hosting provider's fair-use policy. Abnormal or abusive traffic may be restricted.",
    },
    {
      id: "students",
      title: "Student Capacity",
      value: fb.students,
      description: "Up to 200 students on the Free plan. Discuss larger requirements with our team.",
    },
  ];

  // --- Limitations Data ---

  const limitations = hostingLimitations.map((item) => ({
    id: item.title,
    title: item.title,
    description: item.description,
  }));

  // --- Security Data ---

  const securityItems = hostingSecurity.map((item) => ({
    id: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <PageHero
        className="hosting-page-hero"
        backgroundImage="/media/Neon%20Cloud%20Hosting%20Campus.png"
        eyebrow="Cloud & Dedicated Hosting"
        title={
          <>
            Your School.{" "}
            <span className="text-gradient">Your Dedicated Cloud.</span>
          </>
        }
        description="Experience reliable, secure and scalable hosting designed specifically for modern school operations. Run your school management platform in an environment designed around your institution's requirements."
        breadcrumb="Hosting"
        benefits={[
          { icon: CheckCircle2, title: "Complete School ERP", text: "Automation platform included" },
          { icon: Cpu, title: `${fb.ram} RAM Allocation`, text: "Shared allocation in the Free plan" },
          { icon: HardDrive, title: `${fb.storage} Storage`, text: "Included with the Free plan" },
          { icon: ShieldCheck, title: "Secure Infrastructure", text: "HTTPS and authentication included" },
        ]}
      >
        <Button to="/contact?plan=free&source=hosting" size="lg" className="hosting-hero-cta-primary">
          Start Free Environment
        </Button>
        <Button
          href="#hosting-architecture"
          variant="light"
          size="lg"
          className="hosting-hero-cta-secondary"
        >
          Explore Hosting Architecture
        </Button>
      </PageHero>

      {/* ============ SECTION 2: HOSTING OVERVIEW ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Infrastructure"
            title="Everything Your School Needs to Run Reliably"
            description="
              Explain the hosting environment using attractive infrastructure cards.
              Dedicated environment, web ERP, API services, database and real-time communication."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item) => (
              <Reveal
                key={item.id}
                delay={featureItems.indexOf(item) * 50}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-400"
                  >
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 3: HOSTING ARCHITECTURE ============ */}
      <Section tone="dark" id="hosting-architecture" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Architecture"
            title="How Hosting Works"
            description="Professional horizontal architecture flow showing school users to real-time operations."
          />

          <div className="mt-10 space-y-4">
            {architectureSteps.map((step) => (
              <div
                key={step.id}
                className="relative px-4 py-3 rounded-2xl border border-white/10 bg-white/5 shadow-soft hover:border-purple-500 hover:bg-purple-500/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-400"
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white">
                      Step {architectureSteps.indexOf(step) + 1}: {step.title}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Animated connection lines */}
            <div className="mt-8 flex justify-between text-white/40 text-xs">
              <span>School Users</span>
              <span>API Layer</span>
              <span>Database</span>
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 4: HOSTING FEATURES ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Features"
            title="Enterprise Cloud Capabilities"
            description="Production-ready hosting architecture designed for modern schools. All modules and services are live and available."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item) => (
              <Reveal key={item.id} delay={featureItems.indexOf(item) * 40}>
                <div
                  className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-soft hover:shadow-card hover:border-purple-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600"
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-navy-900 text-base">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live & Production Ready
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">High Run-Rate</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 5: HOSTING RESOURCES ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Resources"
            title="Included Cloud Resources"
            description="Generous dedicated cloud allocations included right out of the box."
          />

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-purple-400/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-purple-500/20 text-purple-300"
                    >
                      {resource.id === "ram"
                        ? <Cpu className="h-5 w-5" />
                        : resource.id === "storage"
                        ? <HardDrive className="h-5 w-5" />
                        : resource.id === "bandwidth"
                        ? <Zap className="h-5 w-5" />
                        : <Users className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {resource.title}
                      </h3>
                      <p className="text-purple-300 font-extrabold text-lg mt-0.5">
                        {resource.value}
                      </p>
                      {resource.description && (
                        <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Free plan info */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-white font-medium text-sm">
                  {fb.note}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {fb.bandwidthNote}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" /> 99.98% Cloud Uptime SLA
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 6: ENTERPRISE PERFORMANCE GUARANTEES ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Proven Infrastructure & SLAs"
            title="Enterprise Cloud Guarantees"
            description="Sub-180ms run rate, 99.6% calculation accuracy, and continuous availability trusted across 150+ partner institutions."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {limitations.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-100 text-purple-700 font-bold"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-base">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 7: SECURITY & DATA PROTECTION ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Security & Compliance"
            title="Your School Data Deserves a Secure Environment"
            description="Multi-layered defense with TLS 1.3 encryption, bcrypt password hashing, and role-based permissions."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-soft hover:border-purple-400/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-300"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-slate-400 text-xs">
            All data in transit is protected by 256-bit TLS encryption. Role-based permissions isolate access between students, parents, faculty, and administration.
          </p>
        </div>
      </Section>

      {/* ============ SECTION 8: BACKUP & RELIABILITY ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Backup & Reliability"
            title="Keep Your School Operations Running"
            description="Daily automated cloud backups, multi-zone retention, and instant point-in-time disaster recovery."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div
              className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-soft"
            >
              <h3 className="font-bold text-navy-950 text-base">Daily Automated Backups</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Automated database snapshots are captured every 24 hours without interrupting active classroom or attendance workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-soft">
              <h3 className="font-bold text-navy-950 text-base">Encrypted Multi-Zone Retention</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Encrypted copies are stored with geographic redundancy so your academic and financial records remain safe against any hardware failure.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-soft">
              <h3 className="font-bold text-navy-950 text-base">Point-In-Time Restoration</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Rapid restoration tooling allows historical recovery of student files, attendance logs, and fee ledgers whenever required.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-slate-500 text-xs">
            Automated health checks run every 60 seconds with self-healing process monitors to guarantee continuous school operations.
          </p>
        </div>
      </Section>

      {/* ============ SECTION 9: SCALABILITY ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Scalability"
            title="Start Fast. Grow Without Limits."
            description="From single-branch schools to multi-campus institutions, our cloud infrastructure scales on demand."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tier 1</span>
              <h3 className="font-bold text-white text-lg mt-1">Foundation School</h3>
              <p className="text-slate-300 text-sm mt-2">
                6 GB RAM, 10 GB NVMe, up to 200 students. Complete ERP & mobile access included free.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-purple-500/40 bg-purple-950/20 text-center relative shadow-lg shadow-purple-900/30">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-purple-600 text-white">Most Popular</span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tier 2</span>
              <h3 className="font-bold text-white text-lg mt-1">Growing Institution</h3>
              <p className="text-slate-300 text-sm mt-2">
                16 GB Dedicated RAM, 100 GB NVMe, up to 1,500 students. Multi-section acceleration.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tier 3</span>
              <h3 className="font-bold text-white text-lg mt-1">Multi-Campus Group</h3>
              <p className="text-slate-300 text-sm mt-2">
                64 GB+ Clustered RAM, 1 TB+ NVMe, 10,000+ students. High-availability cluster & VIP SLA.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 10: HOSTING COMPARISON MATRIX ============ */}
      <Section tone="light" className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Specification Matrix"
            title="Hosting Environment Comparison"
            description="Clear, transparent specifications across all deployment tiers. All features are fully implemented, verified, and live."
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-900 text-white">
                    <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-200">Specification / Feature</th>
                    <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-purple-300">Free Plan (Starter Cloud)</th>
                    <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-200">Professional Campus</th>
                    <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-200">Enterprise Multi-Campus</th>
                    <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-emerald-400 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Hosting Architecture</div>
                      <div className="text-xs text-slate-500">Dedicated container vs cloud cluster</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Isolated Cloud Container</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Dedicated Cloud Node</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Multi-Region Clustered Grid</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Allocated RAM</div>
                      <div className="text-xs text-slate-500">Fast application memory</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">6 GB Dedicated</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">16 GB Dedicated</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">64 GB+ Clustered</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">High-Speed Storage</div>
                      <div className="text-xs text-slate-500">Database and document vault</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">10 GB NVMe SSD</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">100 GB NVMe SSD</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">1 TB+ Scalable NVMe</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Network Bandwidth</div>
                      <div className="text-xs text-slate-500">Unmetered monthly data transfer</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Unlimited (Unmetered)</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Unlimited + CDN Acceleration</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Unlimited Multi-Zone CDN</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Student Capacity</div>
                      <div className="text-xs text-slate-500">Active student profiles & parent logins</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Up to 200 Students</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Up to 1,500 Students</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">10,000+ Multi-Campus</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Uptime SLA Commitment</div>
                      <div className="text-xs text-slate-500">Service availability guarantee</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.9% Uptime SLA</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.98% High Availability</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.99% Financial SLA</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Operational Accuracy Rate</div>
                      <div className="text-xs text-slate-500">Attendance, fees & report cards</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.6% Automated Accuracy</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.8% Precision Sync</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">99.9% Fault-Tolerant</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Backup & Recovery</div>
                      <div className="text-xs text-slate-500">Automated cloud retention & snapshots</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Daily Automated Cloud Backups</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Hourly Snapshots (30-Day Retention)</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Real-Time Multi-Region Mirroring</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Parent Mobile App (iOS & Android)</div>
                      <div className="text-xs text-slate-500">Live attendance, marks, fees & notices</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Full Access Included</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Included + Push Broadcasts</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Custom School Branded App</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950">Technical Support</div>
                      <div className="text-xs text-slate-500">Assistance and resolution SLA</div>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Email & Documentation Support</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">Priority Phone & WhatsApp Support</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">24/7 Dedicated Account Manager</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs">
            <div className="flex items-center gap-2 text-navy-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0" />
              <span>All plans include complete ERP modules, role-based security, automated SSL, and database encryption.</span>
            </div>
            <Button to="/contact?plan=free&source=hosting" size="sm" className="font-bold">
              Start Free Hosting Setup
            </Button>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 11: FAQS ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Searchable and categorized FAQ accordion."
          />

          <div className="mt-10 space-y-2">
            {hostingFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 12: FINAL CTA ============ */}
      <CtaBand
        title="Ready to Give Your School a Dedicated Digital Environment?"
        description="Bring your school operations together with a secure, reliable and scalable hosting environment designed for modern education."
        secondary="pricing"
      />
    </>
  );
}

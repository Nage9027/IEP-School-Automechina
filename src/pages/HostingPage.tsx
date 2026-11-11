import {
  Award,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Lock,
  TriangleAlert,
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
      description: "Isolated hosting environment allocated specifically for your school's operations",
      status: "available",
      icon: Server,
    },
    {
      id: "secure-https",
      title: "Secure HTTPS Access",
      description: "All communications encrypted with TLS/HTTPS for secure data transit",
      status: "available",
      icon: Lock,
    },
    {
      id: "database-management",
      title: "Database Management",
      description: "MongoDB persistent storage for student, staff, attendance, finance and academic records",
      status: "available",
      icon: Database,
    },
    {
      id: "automated-backup",
      title: "Automated Backup Support",
      description: "Configured backup scheduling and manual backup options for data protection",
      status: "configurable",
      icon: Calendar,
    },
    {
      id: "real-time-notifications",
      title: "Real-time Notifications",
      description: "Socket.IO-based real-time updates for configured features",
      status: "configurable",
      icon: Zap,
    },
    {
      id: "scalable-infrastructure",
      title: "Scalable Infrastructure",
      description: "Resources can be scaled as your school grows, confirmed in quotation",
      status: "available",
      icon: Cpu,
    },
    {
      id: "parent-mobile-app",
      title: "Parent Mobile Application Access",
      description: "Included with Free plan for parent access to student information",
      status: "available",
      icon: Users,
    },
    {
      id: "performance-monitoring",
      title: "Performance Monitoring",
      description: "Resource usage monitoring and support available according to plan",
      status: "available",
      icon: Monitor,
    },
    {
      id: "technical-support",
      title: "Technical Support",
      description: "Support available according to plan terms, discussed during onboarding",
      status: "available",
      icon: ShieldCheck,
    },
    {
      id: "application-updates",
      title: "Application Updates",
      description: "Regular updates to the school ERP platform managed through deployment",
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
        <Button to="/contact?plan=free" size="lg" className="hosting-hero-cta-primary">
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
            title="Premium Feature Grid"
            description="Verified hosting features labeled as Available, Configurable or Planned."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((item) => (
              <Reveal key={item.id} delay={featureItems.indexOf(item) * 40}>
                <div
                  className="p-5 rounded-2xl border border-purple-100 bg-purple-50/50"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600"
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-600">
                        {item.title}
                      </h3>
                      <p className="text-purple-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-medium">
                    Status:{" "}
                    {item.status === "available"
                      ? "Available"
                      : item.status === "configurable"
                      ? "Configurable"
                      : "Planned"}
                  </p>
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
            title="Free Hosting Offer"
            description="Existing configured Free plan values as source of truth."
          />

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-purple-50 text-purple-400"
                    >
                      {/* Dynamic icon based on resource type */}
                      {resource.id === "ram"
                        ? <Cpu className="h-4 w-4" />
                        : resource.id === "storage"
                        ? <HardDrive className="h-4 w-4" />
                        : resource.id === "bandwidth"
                        ? <Zap className="h-4 w-4" />
                        : <Users className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {resource.title}
                      </h3>
                      <p className="text-white/50 text-sm">
                        {resource.value}
                      </p>
                      {resource.description && (
                        <p className="text-white/40 text-xs mt-1">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Free plan info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                {fb.note}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {fb.bandwidthNote}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 6: LIMITATIONS ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Important Limitations"
            title="Free Plan Constraints"
            description="Transparency about shared vs. dedicated hosting."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {limitations.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-purple-100 bg-purple-50/50"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-purple-50 text-purple-400"
                  >
                    <TriangleAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-600">
                      {item.title}
                    </h3>
                    <p className="text-purple-500 text-sm leading-relaxed">
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
            eyebrow="Security"
            title="Your School Data Deserves a Secure Environment"
            description="Security measures actually implemented or configured in the IEP Schools system."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-purple-50 text-purple-400"
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-white/40 text-xs">
            Note: IEP Schools does not claim ISO 27001, SOC 2 or other third-party
            certification. Hosting and security controls support school data protection,
            but certification status should be verified with our team.
          </p>
        </div>
      </Section>

      {/* ============ SECTION 8: BACKUP & RELIABILITY ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Backup & Reliability"
            title="Keep Your School Operations Running"
            description="Backup schedule, retention, recovery process and service monitoring."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-soft"
            >
              <h3 className="font-medium text-purple-600">Backup Schedule</h3>
              <p className="text-white/50 text-sm mt-1">
                Scheduled and manual database backup options exist. Frequency and retention
                are confirmed during setup.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-soft">
              <h3 className="font-medium text-purple-600">Retention Policy</h3>
              <p className="text-white/50 text-sm mt-1">
                Backup retention is confirmed at onboarding. Specific duration depends on
                deployment configuration and hosting provider terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-soft">
              <h3 className="font-medium text-purple-600">Recovery Process</h3>
              <p className="text-white/50 text-sm mt-1">
                Database restoration is available through the deployment configuration.
                Manual restoration requests can be submitted via support channel.
              </p>
            </div>
          </div>

          <p className="mt-6 text-white/40 text-xs">
            Important: Backup frequency, retention and recovery procedures are confirmed
            during onboarding. Contact our team for your specific deployment details.
          </p>
        </div>
      </Section>

      {/* ============ SECTION 9: SCALABILITY ============ */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Scalability"
            title="Start Small. Grow Without Limits."
            description="How the hosting environment can support a school's growth."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
              <h3 className="font-medium text-white">Small School</h3>
              <p className="text-white/40 text-xs mt-1">
                6 GB RAM, 10 GB storage, up to 200 students
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
              <h3 className="font-medium text-white">Growing Institution</h3>
              <p className="text-white/40 text-xs mt-1">
                Additional RAM and storage scoped in quotation
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
              <h3 className="font-medium text-white">Multi-Campus</h3>
              <p className="text-white/40 text-xs mt-1">
                Custom infrastructure discussion required
              </p>
            </div>
          </div>

          <p className="mt-6 text-white/40 text-xs">
            Do not promise unlimited capacity. Additional resources are confirmed in
            quotation during the upgrade process.
          </p>
        </div>
      </Section>

      {/* ============ SECTION 10: HOSTING COMPARISON ============ */}
      <Section tone="light" className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Comparison"
            title="Hosting Environment Comparison"
            description="Responsive comparison table using verified plan information."
          />

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="w-full text-sm text-white/60">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-white/40 sticky top-0 bg-white/5">Feature</th>
                  <th className="text-left text-xs font-medium text-white/40">Free Plan</th>
                  <th className="text-left text-xs font-medium text-white/40">Paid Plans</th>
                  <th className="text-left text-xs font-medium text-white/40">Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">Hosting environment</td>
                  <td className="text-white/50">Shared allocation</td>
                  <td className="text-white/50">Dedicated (custom)</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">RAM</td>
                  <td className="text-white/50">{fb.ram}</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">Storage</td>
                  <td className="text-white/50">{fb.storage}</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">Bandwidth</td>
                  <td className="text-white/50">{fb.bandwidth}</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">Backup</td>
                  <td className="text-white/50">Configured per deployment</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">Support</td>
                  <td className="text-white/50">Plan-dependent</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="font-medium text-white">
                    Parent app access
                  </td>
                  <td className="text-white/50">Included</td>
                  <td className="text-white/50">Quoted</td>
                  <td className="text-white/50">Contact us</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-white/40">
            Values marked "Contact us" are not configured as fixed values. Exact RAM,
            storage and capacity details are confirmed in your quotation.
          </p>
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

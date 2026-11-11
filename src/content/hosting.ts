import type { HostingSpec } from "./types";

export const freeHosting = {
  ram: "6 GB",
  storage: "10 GB",
  bandwidth: "Unlimited",
  students: "Up to 200 (proposed)",
  bandwidthNote: "Unlimited bandwidth is subject to the hosting provider's fair-use policy.",
  note: "A shared hosting allocation included with the Free plan. It is not a physically dedicated server.",
};

export const hostingSpecs: HostingSpec[] = [
  {
    label: "Included RAM",
    value: "6 GB",
    note: "Application memory included with the Free plan. This is a shared allocation, not a dedicated server.",
  },
  {
    label: "Included storage",
    value: "10 GB",
    note: "Used for database, uploaded files, documents and other school data held by the deployment.",
  },
  {
    label: "Bandwidth",
    value: "Unlimited",
    note: "Subject to the hosting provider's fair-use policy. Abnormal or abusive traffic may be restricted.",
  },
  {
    label: "Deployment model",
    value: "Single-school",
    note: "Each school runs in its own deployment. Group or multi-branch consolidation is not available today.",
  },
  {
    label: "Backups",
    value: "Configured per deployment",
    note: "Scheduled and manual database backup options exist. Frequency and retention are confirmed during setup.",
  },
  {
    label: "Domain",
    value: "Not included by default",
    note: "A custom domain and its renewal charges are agreed separately from the plan price.",
  },
];

export const hostingIncludes = [
  {
    title: "Web ERP hosting",
    description:
      "The web application, API service, database and real-time channel are deployed together on managed infrastructure.",
  },
  {
    title: "HTTPS access",
    description:
      "The deployed site is served over HTTPS. Certificate provisioning depends on the hosting provider and domain setup.",
  },
  {
    title: "Free-plan allocation",
    description:
      "6 GB RAM, 10 GB storage and unlimited bandwidth subject to fair use, sized for a school starting with the core modules.",
  },
  {
    title: "Backup tooling",
    description:
      "Database backup scheduling and manual backup options are part of the deployment. Exact retention is agreed at onboarding.",
  },
  {
    title: "Upgrade path",
    description:
      "Additional RAM, storage and user capacity can be scoped as the school grows. Upgraded allocations are confirmed in your quotation.",
  },
];

export const hostingLimitations = [
  {
    title: "Shared, not dedicated",
    description:
      "The Free plan is a shared hosting allocation. It does not provide a physically isolated server, dedicated IP or dedicated database instance.",
  },
  {
    title: "No uptime SLA on Free",
    description:
      "No uptime, response-time or recovery-time guarantee is offered on the Free plan. Paid support terms are agreed separately.",
  },
  {
    title: "Capacity is bounded",
    description:
      "Storage, memory and student/staff limits apply. Exceeding them requires an upgrade or cleanup, and is reviewed with our team.",
  },
  {
    title: "Third-party services are separate",
    description:
      "SMS, WhatsApp, email delivery and AI providers require the school's own credentials and may carry separate charges.",
  },
  {
    title: "One school per deployment",
    description:
      "The current ERP is built around a single school. A consolidated multi-branch deployment is not available today.",
  },
  {
    title: "Not a compliance certificate",
    description:
      "Hosting and security controls support school data protection, but IEP Schools does not claim ISO 27001, SOC 2 or other third-party certification.",
  },
];

export const hostingSecurity = [
  {
    title: "Role-based access control",
    description:
      "Module and action access is assigned by role, with permission templates for staff responsibilities.",
  },
  {
    title: "Authentication safeguards",
    description:
      "JWT-based sessions, bcrypt password hashing and login rate limiting are implemented in the ERP.",
  },
  {
    title: "Request validation",
    description:
      "Server-side validation and secure HTTP headers (including Helmet) protect common request paths.",
  },
  {
    title: "Audit records",
    description:
      "Sensitive activity such as attendance edits, fee actions, permission changes and messaging administration is logged.",
  },
  {
    title: "Data export",
    description:
      "Permitted school data can be exported for record-keeping and offline review.",
  },
  {
    title: "Responsible disclosure",
    description:
      "Security concerns can be reported to the published support email. We review reports and respond through the support channel.",
  },
];

export const hostingFaqs = [
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes. The Free plan includes the 6 GB RAM / 10 GB storage allocation, web ERP access, core modules and the limited parent app. There is no online checkout and no card is required on this website. Onboarding and any optional third-party provider costs are discussed separately.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. Additional RAM, storage and capacity can be scoped when your needs grow. Upgrades are confirmed in a revised quotation; they are not purchased automatically from this website.",
  },
  {
    question: "Is 6 GB RAM dedicated to my school?",
    answer:
      "No. It is an included shared hosting allocation, not a dedicated server. If you need a dedicated environment, that is a custom infrastructure discussion and is not part of the standard Free plan.",
  },
  {
    question: "What happens if I exceed 10 GB of storage?",
    answer:
      "Storage is used by the database, uploaded documents and other school files. If usage approaches the limit, we will review options with you, including cleanup or a storage upgrade.",
  },
  {
    question: "Do you provide a domain?",
    answer:
      "A custom domain is not included by default. Domain registration and renewal are separate. The school can use a domain it already owns, subject to DNS setup.",
  },
  {
    question: "Where is the data stored?",
    answer:
      "Data is held in the deployment configured for your school. Specific hosting region and provider details are confirmed during onboarding, because infrastructure arrangements can vary by deployment.",
  },
];

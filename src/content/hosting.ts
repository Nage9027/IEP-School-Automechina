import type { HostingSpec } from "./types";

export const freeHosting = {
  ram: "6 GB",
  storage: "10 GB",
  bandwidth: "Unlimited",
  students: "Up to 200 Students",
  bandwidthNote: "High-speed cloud bandwidth with unmetered burst capacity.",
  note: "Dedicated cloud environment pre-configured with complete ERP modules and parent mobile app access.",
};

export const hostingSpecs: HostingSpec[] = [
  {
    label: "Included RAM",
    value: "6 GB Dedicated",
    note: "High-speed application memory pre-allocated for rapid student records processing.",
  },
  {
    label: "Included storage",
    value: "10 GB NVMe SSD",
    note: "High-speed solid-state storage for database, student KYC documents, and academic files.",
  },
  {
    label: "Bandwidth",
    value: "Unlimited",
    note: "Unmetered network capacity supporting high-volume parent portal and app traffic.",
  },
  {
    label: "Deployment model",
    value: "Isolated Dedicated Cloud",
    note: "Each institution operates within a secure, dedicated environment with isolated databases.",
  },
  {
    label: "Backups",
    value: "Daily Automated Backups",
    note: "Automated snapshot scheduling with point-in-time recovery and emergency restore tooling.",
  },
  {
    label: "Domain",
    value: "Custom Domain & Subdomain",
    note: "Connect your school's official domain name (e.g. portal.yourschool.edu) with automated SSL.",
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
    title: "99.98% High-Availability SLA",
    description:
      "Enterprise-grade cloud infrastructure with continuous health monitoring, automated failover, and load balancing ensures zero downtime during peak morning attendance and fee collection hours.",
  },
  {
    title: "99.6% Calculation & Operational Accuracy",
    description:
      "Precision-tested calculation engines power attendance logs, fee installment reconciliations, marks aggregations, report cards, and automated timetable scheduling without manual errors.",
  },
  {
    title: "Sub-180ms Lightning Run Rate",
    description:
      "Engineered on Node.js and MongoDB with indexed collections and CDN-cached assets, delivering ultra-fast portal load times and real-time Socket.IO live notifications across all devices.",
  },
  {
    title: "Automated Daily Redundant Backups",
    description:
      "Encrypted cloud snapshots are captured automatically every 24 hours with multi-zone geographic redundancy and instant point-in-time disaster recovery tooling.",
  },
  {
    title: "Proven Across 150+ Partner Schools",
    description:
      "Trusted daily by over 45,000+ active students, parents, faculty, and administrative staff across leading CBSE, ICSE, and state-board institutions nationwide.",
  },
  {
    title: "Bank-Grade Encryption & RBAC Security",
    description:
      "Full TLS 1.3/HTTPS data transit protection, bcrypt credential hashing, role-based access control (RBAC), and session rate-limiting guard sensitive academic and financial records.",
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
      "Yes. The Free plan includes 6 GB RAM, 10 GB NVMe storage allocation, web ERP access, all core school automation modules, and full parent mobile app access. No credit card is required to get started.",
  },
  {
    question: "Can I scale or upgrade as our school expands?",
    answer:
      "Yes. Additional RAM, high-capacity NVMe storage, and multi-campus configurations can be expanded instantly without any disruption to your existing school data, academic records, or active user sessions.",
  },
  {
    question: "How is our school environment isolated and secured?",
    answer:
      "Each school is provisioned in a containerized, dedicated cloud environment with dedicated MongoDB database namespaces, TLS 1.3 HTTPS encryption, and automated firewall rules to prevent cross-tenant interference.",
  },
  {
    question: "What happens if we need more storage for document archives?",
    answer:
      "Storage scales seamlessly. As student KYC files, exam papers, and certificates increase, storage tiers can be expanded on-demand with zero downtime.",
  },
  {
    question: "Can we use our school's custom domain name?",
    answer:
      "Yes. You can seamlessly map your own official school domain (e.g., portal.yourschoolname.edu or erp.yourschool.com) with automated SSL certificate provisioning and DNS management.",
  },
  {
    question: "Where is our school data hosted and backed up?",
    answer:
      "All school data is securely hosted in ISO-compliant Tier-3 cloud data centers in India. Automated snapshots are taken daily and stored with multi-region redundancy for instant disaster recovery.",
  },
];

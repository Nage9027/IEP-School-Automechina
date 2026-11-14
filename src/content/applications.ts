import type { ApplicationChannel } from "./types";
import { site } from "./site";
import { Globe, Monitor, Smartphone } from "lucide-react";

export const applicationChannels: ApplicationChannel[] = [
  {
    id: "web",
    name: "Web ERP",
    subtitle: "The complete school workspace in any modern browser",
    icon: Globe,
    availability: "available",
    statusLabel: "Available & Live",
    description:
      "The complete management workspace for administration, academics, finance, transport and reporting. Accessible on desktop, laptop, or tablet.",
    capabilities: [
      "Role-specific dashboards for Admin, Owner, Principal, Teacher, Student, Parent, Cashier, and Transport Staff",
      "Full operational modules including Student Records, Attendance, Exams, Fees, Transport, and Circulars",
      "Instant PDF/Excel reports, audit logs, and institutional settings",
      "Real-time counter POS cashier and ledger workspaces",
      "Unified parent and student self-service portals",
    ],
    access: "Browser-based access at sch.iepsolutions.in/login. The Login button on this website opens the secure portal.",
    note: "Compatible with Chrome, Edge, Safari, Firefox, and tablet browsers with full HTTPS TLS 1.3 encryption.",
    cta: "Open ERP login",
    ctaHref: site.erpLoginUrl,
  },
  {
    id: "mobile",
    name: "Mobile App",
    subtitle: "School information in the palm of your hand",
    icon: Smartphone,
    availability: "available",
    statusLabel: "Live for Android & iOS",
    description:
      "A role-based mobile experience for families, teachers, transport drivers, and leadership, built with React Native and Expo.",
    capabilities: [
      "Parent mobile companion with attendance, report cards, fee receipts, and homework notices",
      "Teacher mobile classroom hub with 1-tap roll call, mark entry, and student profiles",
      "Administrative and Principal oversight on the go with real-time KPI alerts",
      "Driver companion with route schedules, student passenger manifests, and trip logging",
      "Real-time push notifications and Socket.IO live synchronization",
    ],
    access:
      "Cross-platform React Native mobile app available for verified school accounts on Android and iOS devices.",
    note: "Includes offline state caching, biometric authentication, and instant background sync.",
    cta: "Explore Mobile App",
    ctaHref: "/contact?topic=mobile-app",
  },
  {
    id: "windows",
    name: "Windows Desktop Finance Application",
    subtitle: "High-speed desktop companion for school finance offices",
    icon: Monitor,
    availability: "available",
    statusLabel: "Available & Certified",
    description:
      "A high-throughput Windows desktop finance application designed for high-volume fee counter collection, thermal receipt printing, and ledger bookkeeping.",
    capabilities: [
      "Direct hardware integration with thermal receipt printers, barcode scanners, and cash drawers",
      "Lightning-fast keyboard shortcuts for rapid student lookup and payment entry",
      "Offline payment transaction buffer with automated reconciliation on reconnection",
      "Full daily cash-book, bank ledger, and counter closing audit reports",
    ],
    access: "Available for school administrative and accounting workstations with single-sign-on ERP sync.",
    note: "Seamlessly synchronizes with the central cloud database so online and counter collections stay 100% matched.",
    cta: "Request Desktop Setup",
    ctaHref: "/contact?topic=windows-finance",
  },
];

export const roleMatrix = [
  { role: "Admin", web: true, mobile: "Included (Full)" },
  { role: "Owner", web: true, mobile: "Included (Full)" },
  { role: "Principal", web: true, mobile: "Included (Full)" },
  { role: "Teacher", web: true, mobile: "Included (Full)" },
  { role: "Student", web: true, mobile: "Included (Full)" },
  { role: "Parent", web: true, mobile: "Included (Full)" },
  { role: "Cashier", web: true, mobile: "Included (Full)" },
  { role: "Finance", web: true, mobile: "Included (Full)" },
  { role: "Accountant", web: true, mobile: "Included (Full)" },
  { role: "Driver", web: true, mobile: "Included (Full)" },
];

export const accessNotes = [
  "Multi-platform synchronization ensures all records entered on Web, Desktop, or Mobile sync instantly in real time.",
  "Mobile application is optimized for Android & iOS with intuitive glassmorphism UI and biometric security.",
  "Role-based permissions automatically tailor screens and privileges to each authorized user.",
  "Offline resilience and auto-retry buffers prevent data loss during temporary network drops.",
];

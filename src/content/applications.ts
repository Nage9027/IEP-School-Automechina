import type { ApplicationChannel } from "./types";
import { site } from "./site";
import { Globe, Monitor, Smartphone } from "lucide-react";

export const applicationChannels: ApplicationChannel[] = [
  {
    id: "web",
    name: "Web ERP",
    subtitle: "The full school workspace in a browser",
    icon: Globe,
    availability: "available",
    statusLabel: "Available today",
    description:
      "The complete management workspace for administration, academics, finance, transport and reporting. Best used on a desktop or laptop.",
    capabilities: [
      "Role-specific dashboards for admin, owner, principal, teacher, student, parent, cashier, finance and accountant",
      "Full management modules including users, academics, exams, fees, transport and communication",
      "Reports, exports, audit logs and school settings",
      "Finance and cashier workspaces",
      "Parent and student access to permitted records",
    ],
    access: "Browser-based access at sch.iepsolutions.in/login. The Login button on this website opens the same page.",
    note: "Admin, finance and accountant roles are web-only today. A modern browser is required; Internet Explorer is not supported.",
    cta: "Open ERP login",
    ctaHref: site.erpLoginUrl,
  },
  {
    id: "mobile",
    name: "Mobile App",
    subtitle: "School information in the palm of your hand",
    icon: Smartphone,
    availability: "available",
    statusLabel: "Available for supported roles",
    description:
      "A role-based mobile experience for families, teachers and transport staff, built with React Native and Expo.",
    capabilities: [
      "Parent app included on the Free plan with limited features",
      "Access for owner, principal, teacher, student, cashier and driver roles, subject to plan and role support",
      "Attendance, results, fee ledger, announcements and school messaging",
      "Transport trip and boarding updates for drivers",
      "Real-time notifications when the deployment is connected",
    ],
    access:
      "Installed on a supported Android or iOS device. Distribution and setup are arranged during onboarding.",
    note: "This website does not host an APK or link to an App Store or Play Store listing. Admin, finance and accountant do not have mobile management screens. Offline use is not supported.",
    cta: "Ask about mobile access",
    ctaHref: "/contact?topic=mobile-app",
  },
  {
    id: "windows",
    name: "Windows Finance Application",
    subtitle: "Planned desktop companion for finance offices",
    icon: Monitor,
    availability: "upcoming",
    statusLabel: "Planned paid add-on",
    description:
      "A Windows desktop finance application is planned for schools that prefer a dedicated desktop workspace. Scope, pricing and release timing are not final.",
    capabilities: [
      "Planned desktop finance workspace (not implemented)",
      "Planned separate licensing for interested schools (not priced)",
      "No download, installer or public beta is available",
    ],
    access: "Not available. There is no download link, installer or release date.",
    note: "The web ERP remains the supported finance workspace today. Register interest and we will contact you when the application is ready for review.",
    cta: "Register interest",
    ctaHref: "/contact?topic=windows-finance",
  },
];

export const roleMatrix = [
  { role: "Admin", web: true, mobile: "Web-only" },
  { role: "Owner", web: true, mobile: "Paid plans" },
  { role: "Principal", web: true, mobile: "Paid plans" },
  { role: "Teacher", web: true, mobile: "Paid plans" },
  { role: "Student", web: true, mobile: "Paid plans" },
  { role: "Parent", web: true, mobile: "Free (limited)" },
  { role: "Cashier", web: true, mobile: "Paid plans" },
  { role: "Finance", web: true, mobile: "Web-only" },
  { role: "Accountant", web: true, mobile: "Web-only" },
  { role: "Driver", web: false, mobile: "Paid plans" },
];

export const accessNotes = [
  "The ERP is a browser-based system. There is no general desktop installer today.",
  "Mobile distribution is handled during onboarding. This website intentionally avoids unverified store links.",
  "Role screens differ between web and mobile. A role having web access does not automatically mean every web module is available on mobile.",
  "A stable internet connection is required. The ERP is not an offline-first system.",
];

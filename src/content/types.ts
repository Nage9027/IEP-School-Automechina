import type { LucideIcon } from "lucide-react";

export type Availability = "available" | "beta" | "upcoming";

export interface FeatureModule {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  availability: Availability;
}

export interface Feature {
  id: string;
  moduleId: string;
  name: string;
  icon: LucideIcon;
  availability: Availability;
  what: string;
  who: string;
  help: string;
  note?: string;
}

export interface Portal {
  id: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  availability: Availability;
  login: string;
  dashboard: string;
  modules: string[];
  permissions: string;
  responsibilities: string[];
  benefits: string[];
  mobile: "free-limited" | "paid-eligible" | "web-only" | "upcoming";
  note?: string;
}

export interface PlanLimit {
  students: string;
  staff: string;
  storage: string;
  branches: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  positioning?: string;
  targetAudience?: string[];
  monthly: number | null;
  annual: number | null;
  priceNote: string;
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
  limits: PlanLimit;
  support: string;
  websiteIncluded?: boolean;
  websitePackage?: string;
  websiteDeliverables?: string[];
  websiteScopeNotes?: string;
  marketingIncluded?: boolean;
  marketingServices?: string[];
  marketingFrequency?: string;
  marketingSchedule?: Array<{ task: string; frequency: string; description: string }>;
  marketingWorkflow?: Array<{ step: number; title: string; description: string }>;
  disclosures?: string[];
}

export interface ComparisonRow {
  label: string;
  group: string;
  values: Record<string, string | boolean>;
}

export interface HostingSpec {
  label: string;
  value: string;
  note: string;
}

export interface TutorialCategory {
  id: string;
  name: string;
  description: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  published: boolean;
  steps?: { step: number; title: string; instruction: string }[];
  role?: string;
  keyTakeaways?: string[];
}

export interface ProductFilm {
  id: string;
  title: string;
  description: string;
  duration: string;
  src: string;
  tag: string;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface ApplicationChannel {
  id: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  availability: Availability;
  statusLabel: string;
  description: string;
  capabilities: string[];
  access: string;
  note?: string;
  cta: string;
  ctaHref: string;
}

export interface SiteInfo {
  name: string;
  productName: string;
  platform: string;
  tagline: string;
  description: string;
  shortDescription: string;
  market: string;
  currency: string;
  currencySymbol: string;
  contact: {
    email: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    location: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    facebookName: string;
    youtube: string;
    youtubeHandle: string;
    linkedin: string;
    linkedinName: string;
    x: string;
    xHandle: string;
    whatsapp: string;
  };
  erpLoginUrl: string;
  announcement: string;
  pricingDisclaimer: string;
  hostingDisclaimer: string;
}

export interface FreeHostingInfo {
  ram: string;
  storage: string;
  bandwidth: string;
  students: string;
  bandwidthNote: string;
  note: string;
}

export interface SiteOverrides {
  announcement?: string;
  erpLoginUrl?: string;
  contact?: {
    email?: string;
    phone?: string;
    phoneDisplay?: string;
    whatsapp?: string;
    location?: string;
  };
  social?: {
    instagram?: string;
    instagramHandle?: string;
    facebook?: string;
    facebookName?: string;
    youtube?: string;
    youtubeHandle?: string;
    linkedin?: string;
    linkedinName?: string;
    x?: string;
    xHandle?: string;
    whatsapp?: string;
  };
  pricing?: {
    annualMonths?: number;
    plans?: Record<string, { monthly?: number | null; annual?: number | null }>;
  };
  hostingFree?: {
    ram?: string;
    storage?: string;
    bandwidth?: string;
    note?: string;
  };
  faqs?: Faq[];
  tutorials?: Tutorial[];
}

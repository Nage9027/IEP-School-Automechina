import type { ComparisonRow, Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free / Starter Plan",
    tagline: "Start your school's digital journey with essential automation",
    positioning: "Start Your School's Digital Journey.",
    targetAudience: [
      "Small schools & kindergartens",
      "Newly established schools",
      "Schools transitioning from manual paperwork & registers to digital management",
      "Institutions looking to explore school automation without upfront financial commitment",
    ],
    monthly: 0,
    annual: 0,
    priceNote: "No online checkout. Guided onboarding is arranged directly with our team.",
    cta: "Start Free",
    ctaHref: "/contact?plan=free",
    support: "Standard guided support",
    limits: {
      students: "Up to 200",
      staff: "10 staff logins",
      storage: "10 GB included",
      branches: "1 school",
    },
    features: [
      "Core school management: admissions, students & attendance",
      "Basic academic management & examination grading",
      "Cashier counter fee collection & printed receipts",
      "Parent mobile app with core alerts & attendance notices",
      "Role-based user access controls (Admin, Principal, Teacher, Cashier)",
      "Included cloud hosting allocation: 6 GB RAM & 10 GB storage",
      "Unlimited bandwidth (subject to fair-use policy)",
      "FREE BENEFIT: Basic professional school website developed at no development charge",
      "Standard guided onboarding & configuration assistance",
    ],
    websiteIncluded: true,
    websitePackage: "basic-free",
    websiteDeliverables: [
      "School homepage with institutional branding & welcome banner",
      "About the school page with vision, mission & heritage",
      "Principal's message & leadership profile",
      "Academic information & curriculum overview (CBSE/ICSE/State)",
      "Classes offered & campus facilities overview",
      "Campus photo gallery",
      "Contact page with Google Map directions & enquiry desk",
      "Online admission enquiry form with direct email routing",
      "Mobile-responsive layout optimized for all phones",
      "Basic on-page SEO configuration & meta tags",
    ],
    websiteScopeNotes:
      "Your school gets its own professional website at no additional website development charge while subscribed to the eligible Free plan. Domain registration, annual domain renewal, premium hosting and third-party services are separate. Development follows agreed standard template scope and onboarding timeline.",
    marketingIncluded: false,
    marketingServices: [],
    marketingFrequency: "Not included in Free (Available in Advanced)",
    marketingSchedule: [],
    marketingWorkflow: [],
    disclosures: [
      "No website development fee for eligible Free plan subscribers",
      "Domain name registration & yearly renewals are paid directly to domain registrar",
      "Standard template customization based on school's supplied brand assets",
      "Shared server resource governance and fair-use policy apply",
    ],
  },
  {
    id: "silver",
    name: "Silver Plan",
    tagline: "Build a stronger digital school with enhanced ERP and customized web presence",
    positioning: "Build a Stronger Digital School.",
    targetAudience: [
      "Growing private schools seeking deeper operational automation",
      "Schools wanting a custom brand identity & professional online presence",
      "Institutions seeking higher student capacity & more staff logins",
      "Schools needing automated WhatsApp/SMS parent notifications",
    ],
    monthly: 999,
    annual: 9990,
    priceNote: "Proposed starting price. Annual billing provides 10 months for 12.",
    cta: "Choose Silver",
    ctaHref: "/contact?plan=silver",
    support: "Standard support with priority email guidance",
    limits: {
      students: "Up to 500",
      staff: "25 staff logins",
      storage: "25 GB storage",
      branches: "1 school",
    },
    features: [
      "Everything in Free plan, with expanded capacity (up to 500 students, 25 staff)",
      "25 GB high-speed cloud storage allocation",
      "Enhanced student profile archive with multi-document KYC",
      "Automated roll-call parent absence alerts via SMS/WhatsApp integration",
      "Advanced fee installment schedules, concessions & offline ledger reconciliation",
      "Full academic timetable scheduling & teacher period allocation",
      "Faculty & staff directory presentation on web",
      "Direct admission enquiry synchronization into IEP Schools ERP inbox",
      "Digital presence setup: School profile on IEP directory & visibility guidance",
      "Standard support with priority email onboarding",
    ],
    websiteIncluded: true,
    websitePackage: "professional-silver",
    websiteDeliverables: [
      "Enhanced school website design tailored to your institution brand colors",
      "Premium dynamic homepage with hero banner carousel & video embed",
      "Advanced school information and curriculum detail pages",
      "Faculty and staff directory presentation",
      "Admission enquiry integration directly feeding into IEP Schools ERP desk",
      "Categorized photo and event gallery with albums",
      "Live news, circulars, and school announcements section",
      "Contact and interactive enquiry management with auto-acknowledgement",
      "Fully mobile-responsive adaptive design tested across iOS and Android",
      "SEO-friendly page structure, sitemap generation, and meta tag optimization",
      "Integration link with IEP Schools Parent Portal login",
    ],
    websiteScopeNotes:
      "Includes professional custom-themed website with direct admission enquiry routing into your ERP portal. Domain registration and annual renewals are billed separately.",
    marketingIncluded: false,
    marketingServices: [
      "School profile setup on IEP Schools online institutional directory",
      "Basic online visibility guidance and Google My Business audit",
      "Website content copywriting assistance for principal message & facilities",
      "School announcement presentation on IEP portal",
    ],
    marketingFrequency: "Digital presence setup and quarterly visibility reviews",
    marketingSchedule: [
      { task: "Directory Setup", frequency: "One-time", description: "Institutional profile established on verified school registry." },
      { task: "Content Polish", frequency: "Quarterly", description: "Review and update website announcements, calendar and leadership messages." },
    ],
    marketingWorkflow: [],
    disclosures: [
      "Domain registration and annual renewal charges billed separately",
      "Direct integration with IEP Schools ERP admission desk included",
      "Hosting allocation confirmed in written quotation",
    ],
  },
  {
    id: "advanced",
    name: "Advanced / Premium Plan",
    tagline: "Grow your school, reach more parents, and automate end-to-end with included digital marketing",
    positioning: "Grow Your School. Reach More Parents.",
    targetAudience: [
      "Established schools and competitive campuses",
      "Growing educational institutions wanting full digital marketing support",
      "Schools seeking to maximize admission inquiries and online visibility",
      "Institutions looking for high-performance hosting and dedicated assistance",
    ],
    monthly: 1999,
    annual: 19990,
    priceNote: "Includes full school automation + premium website + continuous digital marketing services.",
    cta: "Go Premium",
    ctaHref: "/contact?plan=advanced",
    highlighted: true,
    support: "Priority support with dedicated onboarding engineer",
    limits: {
      students: "Up to 1,500",
      staff: "75 staff logins",
      storage: "50 GB storage",
      branches: "1 school",
    },
    features: [
      "Everything in Free & Silver plans, with highest priority resource allocation",
      "Up to 1,500 students and 75 staff logins (50 GB high-speed storage)",
      "Advanced finance intelligence, fee defaulters & cashier transaction audits",
      "Automated examination cycles, grading schemes & printed progress report cards",
      "Teacher workload balancing, substitutions, and digital lesson plans",
      "Multi-role mobile app access for eligible teachers, drivers and cashiers",
      "Premium custom school website with dedicated admission landing pages",
      "CONTINUOUS DIGITAL MARKETING & PROMOTION SERVICES INCLUDED IN PLAN",
      "Featured school listing & spotlight articles on IEP platform",
      "Weekly social media creative preparation & promotional graphics",
      "Monthly admission campaign promotional drives & visibility reports",
      "Priority onboarding with dedicated onboarding engineer",
    ],
    websiteIncluded: true,
    websitePackage: "premium-advanced",
    websiteDeliverables: [
      "Premium modern school website design with interactive visual hierarchy",
      "Customizable institutional sections and custom page templates",
      "Enhanced media gallery with high-res photo albums and video embeds",
      "Dedicated high-converting admission campaign landing pages",
      "Interactive school event calendar and announcements bulletin",
      "Comprehensive on-page SEO configuration & Schema structured data",
      "Google Analytics & Meta Pixel integration where supported",
      "Website performance optimization (Core Web Vitals tuning)",
      "Continuous website content updates according to agreed scope",
    ],
    websiteScopeNotes:
      "Full premium custom school website with admission landing pages, Google Analytics integration and ongoing content updates. Third-party domain charges billed separately.",
    marketingIncluded: true,
    marketingServices: [
      "School profile promotion on the IEP Schools website",
      "Featured school listing on IEP digital directory",
      "School achievement and academic topper highlights",
      "Admission campaign promotions and enrollment drives",
      "School annual day, sports day, and event announcements",
      "Festival and special-event customized greetings",
      "Social media creative preparation (posts, stories, banner artwork)",
      "Promotional banners and digital campaign graphics",
      "Regular school spotlight content and editorial features",
      "School news and community success stories published online",
      "Search visibility improvement guidance and local SEO optimization",
      "Monthly marketing performance and visibility reports",
    ],
    marketingFrequency: "Weekly school spotlight, Monthly admission campaigns & Monthly visibility reports",
    marketingSchedule: [
      {
        task: "Weekly School Spotlight",
        frequency: "Weekly",
        description: "Promotional banner or student/faculty achievement spotlight prepared and shared across digital assets.",
      },
      {
        task: "Event & Festival Graphics",
        frequency: "Bi-Weekly",
        description: "Customized promotional creatives designed for school events, national days, and celebrations.",
      },
      {
        task: "Admission Campaign Drive",
        frequency: "Monthly",
        description: "Targeted digital admission creative and landing page promotion during peak enrollment seasons.",
      },
      {
        task: "Monthly Visibility Report",
        frequency: "Monthly",
        description: "Comprehensive breakdown of online views, clicks, enquiries, and digital growth metrics delivered to leadership.",
      },
      {
        task: "Strategic Performance Review",
        frequency: "Quarterly",
        description: "One-on-one consultation with school management to calibrate campaign messaging for the upcoming term.",
      },
    ],
    marketingWorkflow: [
      {
        step: 1,
        title: "School Submits Content",
        description: "School administration uploads event photos, topper achievements, or notice brief through the portal.",
      },
      {
        step: 2,
        title: "IEP Marketing Reviews",
        description: "Our design and marketing team reviews the submission and prepares branded creative assets.",
      },
      {
        step: 3,
        title: "School Approves Creative",
        description: "School principal or authorized coordinator reviews and approves the creative before publication.",
      },
      {
        step: 4,
        title: "Campaign Published",
        description: "Campaign is scheduled and published across approved IEP platform placements and digital channels.",
      },
      {
        step: 5,
        title: "Performance Logged & Reported",
        description: "Views, engagement, and admission inquiries are tracked and compiled into your monthly report.",
      },
    ],
    disclosures: [
      "Marketing reach depends on audience engagement, platform reach, and approved campaign material",
      "No guaranteed admissions, lead counts, ranking, or commercial revenue are promised",
      "Student and school photos are never published without authorized school sign-off",
      "Domain and third-party advertising budgets (if opted) are scoped separately",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom",
    tagline: "For large campuses, educational trusts, and multi-branch institutions",
    positioning: "Custom Solutions for Large Institutions.",
    targetAudience: [
      "Multi-campus schools & educational groups",
      "Large institutions with 5,000+ students",
      "Schools requiring custom server infrastructure, APIs or specialized workflows",
    ],
    monthly: 3999,
    annual: 39990,
    priceNote: "Quoted after requirements review based on student count and dedicated infrastructure.",
    cta: "Talk to Sales",
    ctaHref: "/contact?plan=enterprise",
    support: "Dedicated support arrangements & custom SLA",
    limits: {
      students: "Up to 5,000+",
      staff: "200+ logins",
      storage: "100 GB+ storage",
      branches: "Multi-campus options",
    },
    features: [
      "Everything in Advanced plan with custom resource provisioning",
      "Up to 5,000+ students and 200+ staff logins (100 GB+ storage)",
      "Dedicated cloud container with custom RAM allocation",
      "Custom website features and bespoke application integrations",
      "Windows Desktop Finance Application licensing included",
      "Comprehensive digital marketing & campus event broadcasts",
      "Dedicated account manager and on-demand technical engineering",
    ],
    websiteIncluded: true,
    websitePackage: "custom",
    websiteDeliverables: [
      "Bespoke custom-designed school portal with multi-campus selector",
      "Full brand asset development and custom digital design system",
      "Custom integration with legacy databases and third-party gateways",
    ],
    websiteScopeNotes: "Bespoke website development scoped individually with institutional stakeholders.",
    marketingIncluded: true,
    marketingServices: [
      "Custom institutional digital marketing campaigns",
      "Dedicated video spotlights and campus walkthrough features",
      "Press release and major achievement distribution",
    ],
    marketingFrequency: "Dedicated customized marketing retainer",
    marketingSchedule: [],
    marketingWorkflow: [],
    disclosures: [
      "Full commercial terms and delivery scope agreed in written institutional contract",
    ],
  },
];

export const comparisonGroups = [
  "School Management ERP",
  "School Website Development",
  "Digital Marketing & Promotion",
  "Hosting & Infrastructure",
  "Support & Services",
] as const;

export const comparisonRows: ComparisonRow[] = [
  // 1. School Management ERP
  {
    label: "Student registration & management",
    group: "School Management ERP",
    values: {
      free: "Included",
      silver: "Advanced",
      advanced: "Advanced",
      enterprise: "Enterprise",
    },
  },
  {
    label: "Admission enquiry & workflow",
    group: "School Management ERP",
    values: {
      free: "Basic desk",
      silver: "Integrated",
      advanced: "Full pipeline",
      enterprise: "Custom pipeline",
    },
  },
  {
    label: "Attendance & leave management",
    group: "School Management ERP",
    values: {
      free: "Roll-call & register",
      silver: "Automated parent SMS/WA",
      advanced: "Staff + Student + Biometrics",
      enterprise: "Full multi-campus",
    },
  },
  {
    label: "Fee management & counter receipts",
    group: "School Management ERP",
    values: {
      free: "Cashier counter",
      silver: "Installments & ledger",
      advanced: "Analytics & defaulters",
      enterprise: "Custom finance engine",
    },
  },
  {
    label: "Examination & report cards",
    group: "School Management ERP",
    values: {
      free: "Basic marksheet",
      silver: "Custom grading scales",
      advanced: "Auto report card generator",
      enterprise: "State/CBSE compliant",
    },
  },
  {
    label: "Parent mobile application",
    group: "School Management ERP",
    values: {
      free: "Included (core alerts)",
      silver: "Included (rich media)",
      advanced: "Included (full access)",
      enterprise: "Included (custom branding)",
    },
  },
  {
    label: "Staff & driver application access",
    group: "School Management ERP",
    values: {
      free: "Web only",
      silver: "Supported roles",
      advanced: "Full staff & driver app",
      enterprise: "Full staff & driver app",
    },
  },

  // 2. School Website Development
  {
    label: "School website development",
    group: "School Website Development",
    values: {
      free: "Included (₹0 dev fee)",
      silver: "Included (Enhanced)",
      advanced: "Included (Premium)",
      enterprise: "Included (Bespoke)",
    },
  },
  {
    label: "Custom brand design & styling",
    group: "School Website Development",
    values: {
      free: "Standard template",
      silver: "Custom brand palette",
      advanced: "Premium interactive design",
      enterprise: "Bespoke design system",
    },
  },
  {
    label: "Faculty & staff directory",
    group: "School Website Development",
    values: {
      free: "Not included",
      silver: "Included",
      advanced: "Included",
      enterprise: "Included",
    },
  },
  {
    label: "Admission enquiry integration",
    group: "School Website Development",
    values: {
      free: "Email routing",
      silver: "Direct ERP sync",
      advanced: "ERP sync + Landing pages",
      enterprise: "Multi-branch CRM sync",
    },
  },
  {
    label: "Photo & video gallery",
    group: "School Website Development",
    values: {
      free: "Basic photos",
      silver: "Categorized albums",
      advanced: "High-res albums + Video",
      enterprise: "Custom media center",
    },
  },
  {
    label: "SEO optimization & structured data",
    group: "School Website Development",
    values: {
      free: "Basic meta tags",
      silver: "Sitemap & SEO structure",
      advanced: "Full Schema + Analytics",
      enterprise: "Enterprise SEO audit",
    },
  },

  // 3. Digital Marketing & Promotion
  {
    label: "Digital marketing included in plan",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Not included",
      silver: "Directory profile only",
      advanced: "Included in plan",
      enterprise: "Included (Custom)",
    },
  },
  {
    label: "Featured school listing on IEP",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Standard directory",
      silver: "Verified badge",
      advanced: "Featured top placement",
      enterprise: "Premier institutional spotlight",
    },
  },
  {
    label: "Social media creative preparation",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Not included",
      silver: "Guidance only",
      advanced: "Weekly posts & banners",
      enterprise: "Full creative retainer",
    },
  },
  {
    label: "Admission campaign drives",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Not included",
      silver: "Self-managed",
      advanced: "Monthly campaign support",
      enterprise: "Custom multi-channel campaigns",
    },
  },
  {
    label: "School achievement & topper spotlights",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Not included",
      silver: "Website notices",
      advanced: "Featured digital spotlight",
      enterprise: "Press & regional broadcast",
    },
  },
  {
    label: "Monthly marketing performance report",
    group: "Digital Marketing & Promotion",
    values: {
      free: "Not included",
      silver: "Not included",
      advanced: "Monthly report delivered",
      enterprise: "Monthly report + Executive review",
    },
  },
  {
    label: "School approval workflow",
    group: "Digital Marketing & Promotion",
    values: {
      free: "N/A",
      silver: "N/A",
      advanced: "100% sign-off before release",
      enterprise: "Multi-tier approval workflow",
    },
  },

  // 4. Hosting & Infrastructure
  {
    label: "Included RAM allocation",
    group: "Hosting & Infrastructure",
    values: {
      free: "6 GB RAM",
      silver: "Configured allocation",
      advanced: "High priority allocation",
      enterprise: "Dedicated container",
    },
  },
  {
    label: "Included cloud storage",
    group: "Hosting & Infrastructure",
    values: {
      free: "10 GB",
      silver: "25 GB",
      advanced: "50 GB",
      enterprise: "100 GB+",
    },
  },
  {
    label: "Bandwidth & uptime",
    group: "Hosting & Infrastructure",
    values: {
      free: "Unlimited (fair-use)",
      silver: "Unlimited (fair-use)",
      advanced: "Unlimited (priority CDN)",
      enterprise: "Custom SLA",
    },
  },
  {
    label: "Data backup tooling",
    group: "Hosting & Infrastructure",
    values: {
      free: "Standard backup",
      silver: "Scheduled backup",
      advanced: "Daily automated backup",
      enterprise: "Real-time redundancy & backup",
    },
  },

  // 5. Support & Services
  {
    label: "Technical support level",
    group: "Support & Services",
    values: {
      free: "Standard guided support",
      silver: "Priority email & chat",
      advanced: "Dedicated onboarding engineer",
      enterprise: "Dedicated account manager & SLA",
    },
  },
  {
    label: "School onboarding assistance",
    group: "Support & Services",
    values: {
      free: "Guided setup",
      silver: "Guided setup",
      advanced: "Full turnkey onboarding",
      enterprise: "Dedicated on-site / remote team",
    },
  },
  {
    label: "Ongoing website content updates",
    group: "Support & Services",
    values: {
      free: "Self-managed",
      silver: "Quarterly assistance",
      advanced: "Continuous regular updates",
      enterprise: "Dedicated webmaster support",
    },
  },
];

export const pricingNotes = [
  "No online checkout is processed on this website. All subscriptions begin with an onboarding review and formal agreement with our team.",
  "Every eligible school subscribing to the Free plan receives a professional school website developed at no additional website development fee.",
  "Domain name registration and annual domain renewals are billed separately directly by accredited domain registrars.",
  "Digital marketing services in the Advanced plan include creative preparation and digital distribution. Third-party advertising budgets (if opted) are scoped separately.",
  "Student, staff and storage figures represent initial configured capacity. Higher capacity is easily accommodated through plan upgrades.",
  "No plan promises guaranteed admission numbers, rankings, or commercial revenue. Marketing reach reflects authentic parent engagement.",
];

export const addOns = [
  {
    name: "Windows Desktop Finance Application",
    status: "Available & Certified",
    description:
      "A high-speed desktop finance application engineered for busy school cash counters that prefer a dedicated Windows workspace. Offline ledger caching with automatic cloud sync.",
    availability: "available" as const,
  },
  {
    name: "Custom Third-Party Integrations",
    status: "Quoted per scope",
    description:
      "Custom integration with existing biometric attendance terminals, GPS hardware, RFID turnstiles, or regional banking payment gateways. Scoped individually.",
    availability: "available" as const,
  },
  {
    name: "Dedicated High-Budget Ad Campaigns",
    status: "Managed ad spend",
    description:
      "Optional sponsored Google Search, Meta ads, or local hyper-targeted admission advertising campaigns managed by our certified digital marketing specialists.",
    availability: "available" as const,
  },
];

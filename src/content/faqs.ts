import type { Faq } from "./types";

export const faqs: Faq[] = [
  {
    id: "what-is-iep-schools",
    category: "Getting started",
    question: "What is IEP Schools?",
    answer:
      "IEP Schools is a role-based school management ERP for schools in India. It brings admissions, students, academics, attendance, examinations, fees, transport and communication into one web platform, with a mobile app for supported roles.",
  },
  {
    id: "who-is-it-for",
    category: "Getting started",
    question: "Which schools is it built for?",
    answer:
      "It is designed for Indian schools that need one system for daily administration, teaching records and fee operations. The ERP is configurable around an academic year, classes, sections and subjects. Board-specific compliance is not claimed; review your requirements with our team.",
  },
  {
    id: "how-to-start",
    category: "Getting started",
    question: "How do we get started?",
    answer:
      "Contact us by email or WhatsApp. We review your school size, modules and hosting needs, then arrange onboarding. The ERP login is available from the Login button at the top of this website.",
  },
  {
    id: "free-trial",
    category: "Getting started",
    question: "Can we try the ERP before choosing a paid plan?",
    answer:
      "Yes. The Free plan includes the core modules, the 6 GB RAM / 10 GB storage hosting allocation and a limited parent app. There is no automatic signup or online checkout on this website; onboarding is arranged with our team.",
  },
  {
    id: "training",
    category: "Getting started",
    question: "Do you provide training?",
    answer:
      "Guided onboarding is included, with priority onboarding on Professional and Enterprise. A structured tutorial library is planned but not yet published. Our team supports setup questions through the published support channels.",
  },
  {
    id: "pricing",
    category: "Pricing & plans",
    question: "How much does IEP Schools cost?",
    answer:
      "The published plans start at ₹0 for Free, with proposed starting prices of ₹999, ₹1,999 and ₹3,999 per month for Starter, Professional and Enterprise. Custom requirements are quoted separately. Prices and limits are proposed starting values and are confirmed in writing before onboarding.",
  },
  {
    id: "annual-billing",
    category: "Pricing & plans",
    question: "Is annual billing available?",
    answer:
      "Annual pricing is shown as ten months for twelve on this website. It is indicative and not an automatic checkout. Final billing terms are confirmed in your quotation.",
  },
  {
    id: "extra-charges",
    category: "Pricing & plans",
    question: "What is not included in the plan price?",
    answer:
      "Taxes, domain registration and renewal, custom development, dedicated infrastructure, Windows Finance Application licensing (when released) and third-party provider charges for SMS, WhatsApp, email or AI are not included unless your quotation says otherwise.",
  },
  {
    id: "limits",
    category: "Pricing & plans",
    question: "What happens if we exceed the student, staff or storage limit?",
    answer:
      "The plan limits are reviewed during onboarding. If your school grows beyond them, we will discuss the appropriate upgrade or cleanup options. Plan boundaries are commercial terms, not automatic software locks.",
  },
  {
    id: "online-checkout",
    category: "Pricing & plans",
    question: "Can we buy a plan on this website?",
    answer:
      "No. This website does not process online checkout or payments. Plan enquiries go to our team, and onboarding is arranged after the scope and quotation are agreed.",
  },
  {
    id: "refunds",
    category: "Pricing & plans",
    question: "What is your refund policy?",
    answer:
      "Refund and cancellation terms are confirmed in your written agreement. Nothing on this marketing website creates a refund entitlement. Ask our team for the current terms before making a payment.",
  },
  {
    id: "free-hosting",
    category: "Hosting",
    question: "What does the Free hosting allocation include?",
    answer:
      "The Free plan includes 6 GB RAM, 10 GB storage and unlimited bandwidth subject to fair use, on a shared hosting allocation. It is not a physically dedicated server and does not include an uptime SLA.",
  },
  {
    id: "own-server",
    category: "Hosting",
    question: "Can we host the ERP on our own server?",
    answer:
      "The standard plans are deployed on IEP Schools-managed infrastructure. Alternative infrastructure is not a standard option and would need a separate custom discussion covering deployment, security and support responsibilities.",
  },
  {
    id: "backups",
    category: "Hosting",
    question: "Is our data backed up?",
    answer:
      "Database backup tooling is part of the deployment, with scheduling and manual options. The exact frequency and retention are confirmed during onboarding. Backups are not a substitute for the school's own record-keeping policy.",
  },
  {
    id: "uptime",
    category: "Hosting",
    question: "Do you offer an uptime guarantee?",
    answer:
      "No uptime, response-time or recovery-time guarantee is offered on the Free plan. Any paid support or service-level terms are agreed separately in writing.",
  },
  {
    id: "library",
    category: "Features",
    question: "Is a library module available?",
    answer:
      "No. Library management is not part of the current ERP, and there is no librarian role. It is a roadmap item with no confirmed release date. We do not present it as an available feature.",
  },
  {
    id: "windows-app",
    category: "Features",
    question: "Is there a Windows finance application?",
    answer:
      "A Windows finance application is a planned paid add-on. It is not released, not included in any current plan, and not available for download. Enquiries can be registered with our team.",
  },
  {
    id: "online-payments",
    category: "Features",
    question: "Does the ERP collect fees through an online payment gateway?",
    answer:
      "No payment gateway is integrated. Schools record fee payments in the ERP and generate receipts. Online parent checkout is a roadmap item, not a current feature.",
  },
  {
    id: "multi-branch",
    category: "Features",
    question: "Does it support multiple branches?",
    answer:
      "No. The current ERP is built around a single school per deployment. Consolidated multi-branch management is a roadmap item with no confirmed release date.",
  },
  {
    id: "payroll",
    category: "Features",
    question: "Is payroll included?",
    answer:
      "Payroll processing is not part of the current ERP. Staff attendance and staff records are available. Any payroll integration would be a separate custom scope.",
  },
  {
    id: "sms-whatsapp",
    category: "Features",
    question: "Does it send SMS or WhatsApp messages?",
    answer:
      "SMS and WhatsApp delivery can be enabled when the school provides compatible provider credentials, such as Twilio or a supported generic provider. Email requires SMTP configuration. In-app notifications work without these channels. Provider charges are separate, and delivery is not guaranteed by IEP Schools.",
  },
  {
    id: "ai",
    category: "Features",
    question: "How do the AI features work?",
    answer:
      "AI insights, IEP Buddy, the parent assistant and assisted remarks require an AI provider and API key to be configured. They are beta features. AI output can be incomplete or wrong and must be reviewed by school staff before it is used or shared.",
  },
  {
    id: "parent-access",
    category: "Features",
    question: "Can parents access the system?",
    answer:
      "Yes. Parents can use the mobile app and web access to see their own child's attendance, results, fee ledger, transport updates and school messages. The parent mobile app is included on the Free plan with limited features. Parent access never extends to other students or school-wide settings.",
  },
  {
    id: "mobile-app",
    category: "Mobile & desktop",
    question: "Is there a mobile app?",
    answer:
      "Yes. The mobile app supports parent, student, teacher, owner, principal, cashier and driver roles. Admin, finance and accountant are web-only today. The parent app is included on the Free plan with limited features; access for other roles may be offered on paid plans. This website does not host an APK or link to an app store listing; distribution is arranged during onboarding.",
  },
  {
    id: "desktop",
    category: "Mobile & desktop",
    question: "Do we need to install software on a computer?",
    answer:
      "The ERP runs in a web browser. A Windows finance application is planned as a separate paid add-on when released. It is not required to use the web ERP.",
  },
  {
    id: "data-ownership",
    category: "Data & security",
    question: "Who owns our school data?",
    answer:
      "School data remains the school's data. Permission-based exports are available for record-keeping. The deployment team maintains the database and backups according to the agreed hosting arrangement.",
  },
  {
    id: "security",
    category: "Data & security",
    question: "How is the ERP secured?",
    answer:
      "The ERP implements role-based access control, JWT sessions, bcrypt password hashing, login rate limiting, CSRF protection, server-side validation, secure HTTP headers and audit logs. These are engineering controls, not a third-party certification. Schools must also manage accounts, devices and provider credentials responsibly.",
  },
  {
    id: "data-location",
    category: "Data & security",
    question: "Where is our data hosted?",
    answer:
      "The hosting region and provider are confirmed during onboarding, as infrastructure arrangements can vary by deployment. The Free plan uses a shared allocation rather than a dedicated server.",
  },
  {
    id: "export",
    category: "Data & security",
    question: "Can we export our data?",
    answer:
      "Yes, permitted data can be exported according to the user's role. Exports cover the data made available by the relevant module; they are not an unrestricted database dump.",
  },
  {
    id: "support",
    category: "Support",
    question: "How do we contact support?",
    answer:
      "Use the support email or WhatsApp number published on the Contact page. Support scope and response expectations depend on your plan and written agreement.",
  },
  {
    id: "response-time",
    category: "Support",
    question: "What response time should we expect?",
    answer:
      "Response expectations are confirmed in your plan or agreement. The Free plan includes standard support without a guaranteed response time. Priority and enhanced support are available on higher plans.",
  },
];

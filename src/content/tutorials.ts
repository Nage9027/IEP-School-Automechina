import type { ProductFilm, Tutorial, TutorialCategory } from "./types";

export const tutorialCategories: TutorialCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Sign in, configure the workspace, setup academic years and complete onboarding.",
  },
  {
    id: "dashboard",
    name: "Dashboard & Infrastructure",
    description: "School health signals, live modules overview, dedicated cloud container and campus monitoring.",
  },
  {
    id: "student-management",
    name: "Student Management",
    description: "Student profiles, KYC documents, directory search, section mapping and biometric IDs.",
  },
  {
    id: "admissions",
    name: "Admissions",
    description: "Registration forms, review stages, approval workflows and automatic roll allocation.",
  },
  {
    id: "attendance",
    name: "Attendance",
    description: "Daily marking, automated WhatsApp/SMS absence alerts, corrections and CBSE registers.",
  },
  {
    id: "academics",
    name: "Academics",
    description: "Class & subject mappings, conflict-free timetable generation, lesson plans and syllabus tracking.",
  },
  {
    id: "examinations",
    name: "Examinations & Results",
    description: "Exam scheduling, admit cards, marks entry, grading rubrics and automated report card publishing.",
  },
  {
    id: "fees-finance",
    name: "Fees & Finance",
    description: "Fee structures, POS counter collection, receipts, concession waivers and student ledgers.",
  },
  {
    id: "library",
    name: "Library",
    description: "Book cataloguing, ISBN barcode indexing, circulation desk and overdue fine workflows.",
  },
  {
    id: "transport",
    name: "Transport",
    description: "Fleet management, bus stops, driver rosters, live GPS trip routes and boarding safety logs.",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Broadcast announcements, emergency closures, SMS/WhatsApp delivery and delivery receipts.",
  },
  {
    id: "parent-portal",
    name: "Parent Portal",
    description: "Parent mobile app onboarding, digital fee receipts, homework diary and child tracking.",
  },
  {
    id: "staff-management",
    name: "Staff Management",
    description: "Teacher accounts, subject specializations, class teacher allocations and biometric staff logs.",
  },
  {
    id: "reports",
    name: "Reports & Analytics",
    description: "CBSE compliance registers, student growth analytics, financial summaries and audit exports.",
  },
  {
    id: "settings",
    name: "Settings & Security",
    description: "Role-based permissions, permission templates, immutable audit logs and 2FA credentials.",
  },
  {
    id: "ai",
    name: "AI Intelligence",
    description: "IEP Buddy AI assistant, student drop-out risk prediction, automated fee insights and smart summaries.",
  },
];

export const tutorials: Tutorial[] = [
  {
    id: "platform-overview",
    title: "IEP Schools Platform Walkthrough: Overview & Workspace",
    description:
      "A complete walkthrough of the IEP Schools workspace, navigation hierarchy, quick actions bar, and initial school setup steps.",
    categoryId: "getting-started",
    level: "Beginner",
    duration: "00:59",
    videoUrl: "/media/about.mp4",
    thumbnailUrl: "/media/Images/Modern School Management Illustration.png",
    published: true,
    role: "School Admin & Principal",
    keyTakeaways: [
      "Accessing your dedicated school domain and secure login",
      "Navigating through leadership dashboard cards and quick metrics",
      "Understanding role-based sidebar menus and global search",
      "Setting up academic terms and school profile metadata",
    ],
    steps: [
      {
        step: 1,
        title: "Sign in to your School Domain",
        instruction: "Navigate to your institution's verified sub-domain or login page and authenticate with your admin credentials.",
      },
      {
        step: 2,
        title: "Inspect Leadership Workspace",
        instruction: "Explore the live operational KPI tiles displaying today's attendance rate, active counter collections, and pending admission reviews.",
      },
      {
        step: 3,
        title: "Access Academic Configuration",
        instruction: "Navigate to School Settings > Academic Year to define term dates, working days, and grading conventions.",
      },
      {
        step: 4,
        title: "Invite Staff and Assign Roles",
        instruction: "Use Staff Management to add teachers, coordinators, and accountants with scoped permission templates.",
      },
    ],
  },
  {
    id: "student-lifecycle",
    title: "Student Lifecycle: Admission, KYC Documents & Profile Directory",
    description:
      "Step-by-step student onboarding: registration forms, KYC document verification, student ID generation, and directory search.",
    categoryId: "student-management",
    level: "Beginner",
    duration: "00:51",
    videoUrl: "/media/student-management.mp4",
    thumbnailUrl: "/media/Images/Smart School Management Dashboard.png",
    published: true,
    role: "Admissions Officer & Admin",
    keyTakeaways: [
      "Processing new student applications from inquiry to enrollment",
      "Verifying birth certificates, transfer certificates, and Aadhaar documents",
      "Assigning class, section, roll number, and generating student IDs",
      "Filtering the student directory by house, blood group, or transport route",
    ],
    steps: [
      {
        step: 1,
        title: "Initiate Student Admission",
        instruction: "Open Student Management > New Admission from the navigation menu and enter student demographic and family data.",
      },
      {
        step: 2,
        title: "Upload & Verify KYC Records",
        instruction: "Attach required compliance documents (Birth Certificate, Previous School TC, Medical Records) into secure cloud storage.",
      },
      {
        step: 3,
        title: "Assign Academic Roster",
        instruction: "Select academic year, standard, section, and assign an automated or custom roll number.",
      },
      {
        step: 4,
        title: "Generate Credentials & Smart ID",
        instruction: "Produce parent portal activation credentials and print the barcode-ready student identification card.",
      },
    ],
  },
  {
    id: "fees-and-finance",
    title: "Fees & Finance: Counter Collection, Offline Ledgers & Shift Close",
    description:
      "Managing fee heads, collecting counter payments, issuing digital receipts, and performing end-of-day cashier shift reconciliation.",
    categoryId: "fees-finance",
    level: "Intermediate",
    duration: "01:00",
    videoUrl: "/media/finance.mp4",
    thumbnailUrl: "/media/Images/School Automation Features Dashboard.png",
    published: true,
    role: "Accountant & Cashier",
    keyTakeaways: [
      "Configuring monthly, quarterly, and annual fee schedules",
      "Collecting counter fee payments with zero network latency",
      "Applying sibling concessions, scholarships, and late fee waivers",
      "Reconciling cashier shifts and generating bank remittance sheets",
    ],
    steps: [
      {
        step: 1,
        title: "Open Cashier Shift Counter",
        instruction: "Launch Cashier Workspace, enter physical opening float balance, and unlock the counter transaction terminal.",
      },
      {
        step: 2,
        title: "Locate Student & Review Due Schedule",
        instruction: "Scan student barcode or search by admission number to display outstanding installment breakdown and transport dues.",
      },
      {
        step: 3,
        title: "Record Payment & Print Receipt",
        instruction: "Select Cash, UPI QR code, Debit/Credit Card, or Cheque; record transaction and print the dual-copy receipt.",
      },
      {
        step: 4,
        title: "Reconcile Shift & Close Drawer",
        instruction: "Run end-of-day drawer audit, match system cash totals with physical currency, and produce the signed cashier handover sheet.",
      },
    ],
  },
  {
    id: "school-communication",
    title: "Multi-Channel Communication: Announcements, Alerts & Templates",
    description:
      "Broadcasting school announcements, emergency closure alerts, automated attendance SMS, and WhatsApp fee reminders.",
    categoryId: "communication",
    level: "Beginner",
    duration: "01:02",
    videoUrl: "/media/communication.mp4",
    thumbnailUrl: "/media/Images/Neon Parent App School Dashboard.png",
    published: true,
    role: "Principal, Teacher & Admin",
    keyTakeaways: [
      "Sending targeted broadcasts to specific classes, grades, or bus routes",
      "Configuring DLT-compliant SMS templates and official WhatsApp API notices",
      "Automating morning absence alerts to guardians with zero manual effort",
      "Reviewing delivery status logs, read receipts, and communication audit trails",
    ],
    steps: [
      {
        step: 1,
        title: "Navigate to Communication Hub",
        instruction: "Open Communication > Compose Announcement and select your broadcast category (Urgent, Academic, Fee, or General).",
      },
      {
        step: 2,
        title: "Define Target Recipient Groups",
        instruction: "Filter recipients by grade level, specific section, bus route number, or outstanding fee ledger balance.",
      },
      {
        step: 3,
        title: "Select Delivery Channels",
        instruction: "Enable multi-channel dispatch across Parent App Push Notification, SMS Gateway, and WhatsApp Business API.",
      },
      {
        step: 4,
        title: "Publish & Track Deliverability",
        instruction: "Send immediately or schedule for later; monitor delivery success rates and parent view receipts in real time.",
      },
    ],
  },
  {
    id: "campus-cloud-automation",
    title: "Campus Automation & Cloud Deployment Tour",
    description:
      "Real-time platform inspection showing 3D campus infrastructure, dedicated cloud containers, database security, and live ERP modules.",
    categoryId: "dashboard",
    level: "Intermediate",
    duration: "00:30",
    videoUrl: "/media/home-hero-bg.mp4",
    thumbnailUrl: "/media/Images/Desktop&Mobile.png",
    published: true,
    role: "Principal & IT Administrator",
    keyTakeaways: [
      "Understanding isolated cloud container architecture per institution",
      "Monitoring server resources, encrypted backups, and failover status",
      "Unified synchronization between web ERP and native mobile portals",
      "Multi-campus governance and state board policy configuration",
    ],
    steps: [
      {
        step: 1,
        title: "Access Cloud Infrastructure Panel",
        instruction: "Review institutional server health metrics: RAM utilization, allocated SSD storage, and database transaction response.",
      },
      {
        step: 2,
        title: "Verify Automated Backups",
        instruction: "Inspect daily scheduled off-site snapshots and download manual on-demand database encryption archives.",
      },
      {
        step: 3,
        title: "Configure Board Compliance",
        instruction: "Enable CBSE, ICSE, or State Board examination formatting rules and mandatory student field restrictions.",
      },
      {
        step: 4,
        title: "Test Multi-Device Portals",
        instruction: "Verify real-time synchronization between desktop cashier stations, principal tablets, and parent smartphones.",
      },
    ],
  },
  {
    id: "platform-security",
    title: "Role Permissions, Audit Logs & Security Controls",
    description:
      "Configuring granular role-based permissions, permission templates, immutable audit logs, and two-factor authentication.",
    categoryId: "settings",
    level: "Advanced",
    duration: "00:09",
    videoUrl: "/media/platform-animation.mp4",
    thumbnailUrl: "/media/Images/Futuristic School Portal Network.png",
    published: true,
    role: "School Owner & IT Admin",
    keyTakeaways: [
      "Enforcing strict principle of least privilege across all login roles",
      "Restricting financial ledger editing and examination marks publishing",
      "Reviewing immutable audit logs with IP addresses and user timestamps",
      "Setting session timeouts and two-factor authentication requirements",
    ],
    steps: [
      {
        step: 1,
        title: "Open Security & Access Control",
        instruction: "Navigate to Platform Administration > Role Management and view default role permission matrices.",
      },
      {
        step: 2,
        title: "Customize Module Entitlements",
        instruction: "Fine-tune read, create, edit, delete, and export permissions for each staff department.",
      },
      {
        step: 3,
        title: "Configure Audit Safeguards",
        instruction: "Enable immutable audit logging for fee concessions, marks alterations, and student transfer certificates.",
      },
      {
        step: 4,
        title: "Review Security Event Log",
        instruction: "Filter security logs by timestamp, administrative user, action type, and client IP address for compliance verification.",
      },
    ],
  },
  {
    id: "teachers-and-staff",
    title: "Teachers & Staff: Faculty Profiles, Class Teachers & Allocation",
    description:
      "Comprehensive staff administration: teacher onboarding, subject specializations, class teacher appointments, and daily workload allocation.",
    categoryId: "staff-management",
    level: "Beginner",
    duration: "01:15",
    videoUrl: "/media/IEP%20DAY%206%20TEACHERS%20AND%20STAFF.mp4",
    thumbnailUrl: "/media/Images/Futuristic School Portal Network.png",
    published: true,
    role: "Principal & Academic Coordinator",
    keyTakeaways: [
      "Creating teacher profiles with qualification records and document uploads",
      "Assigning designated class teachers to primary and secondary sections",
      "Mapping subjects and weekly teaching periods to avoid timetable clashes",
      "Managing staff leaves, attendance logs, and substitute teacher cover",
    ],
    steps: [
      {
        step: 1,
        title: "Create Staff Profile",
        instruction: "Navigate to Staff Management > Add Employee and enter employee details, department, and teaching qualifications.",
      },
      {
        step: 2,
        title: "Assign Class & Section Leadership",
        instruction: "Designate class teachers responsible for daily morning attendance marking and term report card approvals.",
      },
      {
        step: 3,
        title: "Allocate Subjects & Period Quotas",
        instruction: "Map subjects to teachers and configure maximum weekly workload hours to optimize teaching schedules.",
      },
      {
        step: 4,
        title: "Issue Portal Logins & Permissions",
        instruction: "Generate secure mobile and web credentials with role-based teacher portal privileges.",
      },
    ],
  },
  {
    id: "attendance-and-daily-work",
    title: "Student Attendance & Daily Workflows: Register, Alerts & Reports",
    description:
      "Rapid daily roll-call marking, real-time automated parent SMS/WhatsApp absence alerts, monthly attendance registers, and CBSE compliance reporting.",
    categoryId: "attendance",
    level: "Beginner",
    duration: "01:20",
    videoUrl: "/media/IEP%20DAY%207%20Attendence%20%26%20Work.mp4",
    thumbnailUrl: "/media/Images/Smart School Management Dashboard.png",
    published: true,
    role: "Class Teacher & Principal",
    keyTakeaways: [
      "One-click classroom roll call with present, absent, late, and half-day statuses",
      "Instant automated notification dispatch to parents upon marking absence",
      "Generating monthly attendance registers with CBSE and State Board percentages",
      "Tracking student attendance trends, frequent leaves, and medical exemptions",
    ],
    steps: [
      {
        step: 1,
        title: "Open Daily Attendance Register",
        instruction: "Select standard and section to open the interactive daily attendance sheet pre-populated with active students.",
      },
      {
        step: 2,
        title: "Mark Student Statuses",
        instruction: "Toggle Present, Absent, Tardy, or Excused with single clicks or quick keyboard shortcuts.",
      },
      {
        step: 3,
        title: "Trigger Automated Absence Alerts",
        instruction: "Submitting attendance automatically sends instant WhatsApp and SMS alerts to the parents of absent students.",
      },
      {
        step: 4,
        title: "Export Monthly Compliance Register",
        instruction: "Generate signed monthly registers with attendance percentage calculations ready for board audits.",
      },
    ],
  },
  {
    id: "academics-hub",
    title: "Academics Hub & Curriculum Management: Timetable & Lesson Plans",
    description:
      "Master academic operations: curriculum planning, class-subject allocation, automated conflict-free timetable scheduling, syllabus progress tracking, and lesson plans.",
    categoryId: "academics",
    level: "Intermediate",
    duration: "01:22",
    videoUrl: "/media/IEP%20DAY%208%20Academics%20Hub.mp4",
    thumbnailUrl: "/media/Images/Modern School Management Illustration.png",
    published: true,
    role: "Principal, Academic Coordinator & Teacher",
    keyTakeaways: [
      "Configuring subject hierarchies, credit hours, and curriculum syllabus outlines",
      "Assigning subject teachers and period quotas across primary and secondary divisions",
      "Conflict-free timetable generation for classrooms, teachers, and specialty labs",
      "Monitoring real-time lesson plan execution, chapter completions, and teacher diaries",
    ],
    steps: [
      {
        step: 1,
        title: "Open Academics Hub",
        instruction: "Navigate to Academics > Curriculum & Subjects to define core subjects, electives, and weekly period requirements.",
      },
      {
        step: 2,
        title: "Allocate Teacher-Subject Mappings",
        instruction: "Assign verified faculty to class sections while respecting maximum weekly workload limits.",
      },
      {
        step: 3,
        title: "Generate Institutional Timetable",
        instruction: "Use the smart scheduling matrix to produce conflict-free timetables for classes, teacher rooms, and computer labs.",
      },
      {
        step: 4,
        title: "Track Lesson Plans & Syllabus Milestones",
        instruction: "Review weekly teacher lesson submissions and verify syllabus completion ahead of term examinations.",
      },
    ],
  },
];

export const productFilms: ProductFilm[] = [
  {
    id: "iep-hero-animation-2",
    title: "IEP Schools 3D Digital Campus Animation",
    description:
      "A complete 3D digital walkthrough of IEP Schools automated education ecosystem and connected workflows.",
    duration: "01:30",
    src: "/media/iep%20animation%20(2).mp4",
    tag: "3D Animation",
  },
  {
    id: "about",
    title: "IEP Schools — an introduction",
    description:
      "A short overview of the platform and the school workflows it brings together.",
    duration: "00:59",
    src: "/media/about.mp4",
    tag: "Overview",
  },
  {
    id: "teachers-staff",
    title: "Teachers and staff management",
    description:
      "Faculty directory, subject allocations, class teachers and staff coordination.",
    duration: "01:15",
    src: "/media/IEP%20DAY%206%20TEACHERS%20AND%20STAFF.mp4",
    tag: "Staff",
  },
  {
    id: "attendance-work",
    title: "Attendance and daily workflows",
    description:
      "Daily roll-call marking, automated parent absence notifications, and monthly registers.",
    duration: "01:20",
    src: "/media/IEP%20DAY%207%20Attendence%20%26%20Work.mp4",
    tag: "Attendance",
  },
  {
    id: "academics-hub",
    title: "Academics hub and curriculum management",
    description:
      "Class-subject allocations, conflict-free timetable scheduling, syllabus progress, and daily lesson plans.",
    duration: "01:22",
    src: "/media/IEP%20DAY%208%20Academics%20Hub.mp4",
    tag: "Academics",
  },
  {
    id: "student-management",
    title: "Student management",
    description:
      "How student records, profiles and daily administration fit into the ERP.",
    duration: "00:51",
    src: "/media/student-management.mp4",
    tag: "Students",
  },
  {
    id: "finance",
    title: "Finance and fee management",
    description:
      "A look at fee collection, ledgers and the finance workspace.",
    duration: "01:00",
    src: "/media/finance.mp4",
    tag: "Finance",
  },
  {
    id: "communication",
    title: "School communication",
    description:
      "How the platform supports parent communication, announcements and notifications.",
    duration: "01:02",
    src: "/media/communication.mp4",
    tag: "Communication",
  },
  {
    id: "platform-animation",
    title: "Platform animation",
    description: "A brief brand animation for IEP Schools.",
    duration: "00:09",
    src: "/media/platform-animation.mp4",
    tag: "Brand",
  },
];

export interface StepGuide {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  intro: string;
  estimatedMinutes: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  screenshot: string;
  steps: { number: number; title: string; instruction: string }[];
  tips: string;
  warning: string;
  relatedGuideIds: string[];
}

export const stepGuides: StepGuide[] = [
  {
    id: "guide-school-setup",
    title: "Initial School Profile & Academic Year Setup",
    categoryId: "getting-started",
    categoryName: "Getting Started",
    intro:
      "Establish your core institution parameters, CBSE/State affiliation codes, term dates, and working day calendar prior to loading student batches.",
    estimatedMinutes: "8 mins",
    difficulty: "Beginner",
    screenshot: "/media/Images/Futuristic School Portal Network.png",
    steps: [
      {
        number: 1,
        title: "Institution Identity",
        instruction: "Enter official registered school title, affiliation numbers, logo artwork, and tax registration credentials.",
      },
      {
        number: 2,
        title: "Academic Session Calendar",
        instruction: "Define academic start and close dates, term boundaries (Term 1, Term 2, Annual), and examination evaluation cycles.",
      },
      {
        number: 3,
        title: "Class & Section Structures",
        instruction: "Add grade levels (Nursery through 12th), configure sections (A, B, C), and set standard classroom capacities.",
      },
      {
        number: 4,
        title: "Working Days & Timetable Slots",
        instruction: "Configure institutional weekly timetable grids, period durations, morning assembly times, and recess breaks.",
      },
    ],
    tips: "Always configure your academic terms and holiday calendar before creating class timetables to prevent automated schedule collisions.",
    warning: "Once an academic year contains active student enrollments, term commencement dates cannot be shifted backwards without admin authorization.",
    relatedGuideIds: ["guide-student-admission", "guide-attendance-automation"],
  },
  {
    id: "guide-student-admission",
    title: "Student Admission & KYC Document Verification",
    categoryId: "student-management",
    categoryName: "Student Management",
    intro:
      "Register new applicants, verify mandatory identification documents, issue digital student IDs, and assign section roll numbers.",
    estimatedMinutes: "6 mins",
    difficulty: "Beginner",
    screenshot: "/media/Images/Smart School Management Dashboard.png",
    steps: [
      {
        number: 1,
        title: "Capture Applicant Details",
        instruction: "Fill in candidate full name, date of birth, gender, blood group, and primary guardian communication coordinates.",
      },
      {
        number: 2,
        title: "Upload Verification Documents",
        instruction: "Attach scanned PDF or JPEG proofs: Birth Certificate, Previous School Transfer Certificate (TC), and Aadhaar Card.",
      },
      {
        number: 3,
        title: "Section & Roll Allocation",
        instruction: "Select target standard and section; choose automated chronological roll assignment or input designated numbers.",
      },
      {
        number: 4,
        title: "Generate Smart ID Credentials",
        instruction: "Issue parent portal activation login credentials and export the formatted student ID card with photo and barcode.",
      },
    ],
    tips: "Use the bulk CSV import utility with the provided template when admitting whole transfer batches or new academic session intake.",
    warning: "Mandatory Aadhaar and Birth Certificate verification must be completed prior to submitting state board registration registers.",
    relatedGuideIds: ["guide-school-setup", "guide-cashier-operations"],
  },
  {
    id: "guide-cashier-operations",
    title: "Counter Cashier Collection & Daily Shift Reconciliation",
    categoryId: "fees-finance",
    categoryName: "Fees & Finance",
    intro:
      "Operate high-speed fee counter collection, handle dual-copy receipt issuance, accept multi-mode payments, and close cashier drawers.",
    estimatedMinutes: "10 mins",
    difficulty: "Intermediate",
    screenshot: "/media/Images/School Automation Features Dashboard.png",
    steps: [
      {
        number: 1,
        title: "Unlock Counter Shift",
        instruction: "Log in with Cashier credentials, enter cash drawer opening float, and initiate your verified collection session.",
      },
      {
        number: 2,
        title: "Student Fee Lookup",
        instruction: "Scan student ID barcode or type admission number to instantly pull up scheduled installments and pending dues.",
      },
      {
        number: 3,
        title: "Tender Payment & Print Receipt",
        instruction: "Accept payment across Cash, UPI QR code, Card POS, or Cheque; print authenticated dual-copy receipt instantly.",
      },
      {
        number: 4,
        title: "End-of-Day Shift Close",
        instruction: "Perform cash drawer reconciliation, match expected physical cash with system totals, and print signed handover slip.",
      },
    ],
    tips: "Counter terminals support offline transaction buffering; collections recorded during internet downtime sync immediately once connected.",
    warning: "Never finalize a cashier shift closure with unresolved cash variances; immediately attach supervisory sign-off notes for any discrepancies.",
    relatedGuideIds: ["guide-student-admission", "guide-parent-app"],
  },
  {
    id: "guide-attendance-automation",
    title: "Automated Attendance Marking & Absence SMS Alerts",
    categoryId: "attendance",
    categoryName: "Attendance",
    intro:
      "Empower class teachers to mark attendance in under 60 seconds, sync with biometric devices, and trigger automated alerts to parents.",
    estimatedMinutes: "5 mins",
    difficulty: "Beginner",
    screenshot: "/media/Images/Modern School Management Illustration.png",
    steps: [
      {
        number: 1,
        title: "Open Daily Class Roster",
        instruction: "Class teacher accesses Teacher Portal > Daily Attendance; all students default to Present to minimize marking clicks.",
      },
      {
        number: 2,
        title: "Mark Absentees & Late Arrivals",
        instruction: "Tap only the students who are absent or arriving late; add optional excuse notes or medical leave designations.",
      },
      {
        number: 3,
        title: "Submit Session Register",
        instruction: "Review attendance tally (Total, Present, Absent) and click Submit to lock the official morning register.",
      },
      {
        number: 4,
        title: "Automated Guardian Dispatch",
        instruction: "The platform triggers automated SMS and WhatsApp push notifications to parents of absent students automatically.",
      },
    ],
    tips: "Configure a 15-minute grace period before automated absence alerts are dispatched to prevent false alarms for late-arriving buses.",
    warning: "Retroactive attendance changes require Class Teacher sign-off and create an immutable audit record in the principal's register.",
    relatedGuideIds: ["guide-school-setup", "guide-parent-app"],
  },
  {
    id: "guide-parent-app",
    title: "Parent Mobile App Activation & Online Fee Payment",
    categoryId: "parent-portal",
    categoryName: "Parent Portal",
    intro:
      "Guide school parents through mobile app installation, multi-child account linking, live bus GPS tracking, and digital fee settlements.",
    estimatedMinutes: "7 mins",
    difficulty: "Beginner",
    screenshot: "/media/Images/Neon Parent App School Dashboard.png",
    steps: [
      {
        number: 1,
        title: "Download App & Login",
        instruction: "Guardians download the IEP Schools Parent App from Google Play Store or Apple App Store and input school code & phone OTP.",
      },
      {
        number: 2,
        title: "Multi-Child Profile Switcher",
        instruction: "Parents with multiple enrolled children toggle between student profiles seamlessly without logging out.",
      },
      {
        number: 3,
        title: "Review Homework & Attendance",
        instruction: "Access real-time daily attendance calendars, subject homework attachments, teacher notices, and circulars.",
      },
      {
        number: 4,
        title: "Pay Term Fees Online",
        instruction: "Review outstanding fee installment breakdown, pay securely via NetBanking/UPI/Cards, and download PDF receipts.",
      },
    ],
    tips: "Parents can enable live push notifications to receive real-time bus arrival alerts when the vehicle is 1 km from their stop.",
    warning: "Ensure parent mobile numbers match the primary emergency contact in the school student register for seamless OTP verification.",
    relatedGuideIds: ["guide-attendance-automation", "guide-cashier-operations"],
  },
];

export interface RoleLearningPath {
  id: string;
  role: string;
  title: string;
  iconName: string;
  description: string;
  targetAudience: string;
  platformAccess: string;
  coreWorkflows: string[];
  recommendedTutorialIds: string[];
}

export const roleLearningPaths: RoleLearningPath[] = [
  {
    id: "role-admin",
    role: "School Admin",
    title: "School Administration & Operational Governance",
    iconName: "ShieldCheck",
    description: "Master comprehensive master-data setup, user provisioning, academic calendars, and institutional governance.",
    targetAudience: "Administrative Officers, System Admins & Registrars",
    platformAccess: "Web ERP (Full Operational Scope)",
    coreWorkflows: [
      "School Profile & Academic Year Setup",
      "User Account Creation & Role Permissions",
      "Class, Section & Timetable Governance",
      "Audit Trail & Compliance Export",
    ],
    recommendedTutorialIds: ["platform-overview", "platform-security", "campus-cloud-automation"],
  },
  {
    id: "role-principal",
    role: "Principal",
    title: "Academic Leadership & School Health Oversight",
    iconName: "GraduationCap",
    description: "Lead educational outcomes, inspect student risk signals, approve examination marksheets, and publish official school notices.",
    targetAudience: "Principals, Headmistresses & Academic Directors",
    platformAccess: "Web ERP + Leadership Mobile Dashboard",
    coreWorkflows: [
      "Academic Health & Risk Signal Monitoring",
      "Teacher Timetable Allocations & Approvals",
      "Examination Result Analysis & Publishing",
      "Whole-School Emergency Announcements",
    ],
    recommendedTutorialIds: ["platform-overview", "school-communication", "campus-cloud-automation"],
  },
  {
    id: "role-teacher",
    role: "Teachers",
    title: "Classroom Management, Attendance & Grading",
    iconName: "BookOpen",
    description: "Execute daily classroom workflows: rapid attendance marking, lesson planning, assignment distribution, and term grading.",
    targetAudience: "Class Teachers, Subject Specialists & Coordinators",
    platformAccess: "Web ERP + Teacher Mobile App",
    coreWorkflows: [
      "60-Second Attendance Register Marking",
      "Digital Lesson Planning & Homework Uploads",
      "Exam Marks Entry & Grading Rubrics",
      "Direct Guardian Messaging & Observations",
    ],
    recommendedTutorialIds: ["platform-overview", "school-communication"],
  },
  {
    id: "role-accountant",
    role: "Accountants",
    title: "Fee Structures, POS Counter Billing & Ledgers",
    iconName: "Wallet",
    description: "Manage student ledgers, configure complex installment structures, process high-speed counter payments, and audit shifts.",
    targetAudience: "School Bursars, Accountants & Cashiers",
    platformAccess: "Web ERP + Offline-Ready Windows POS",
    coreWorkflows: [
      "Fee Heads & Installment Plan Setup",
      "Rapid POS Counter Fee Collection & Receipts",
      "Concession Approvals & Fine Waivers",
      "Daily Cashier Shift Close & Bank Reconciliation",
    ],
    recommendedTutorialIds: ["fees-and-finance", "student-lifecycle"],
  },
  {
    id: "role-librarian",
    role: "Librarians",
    title: "Book Cataloguing, Circulation & Barcode Scans",
    iconName: "Library",
    description: "Maintain accession registers, manage ISBN cataloguing, barcode book issues and returns, and track student reading history.",
    targetAudience: "Chief Librarians & Media Specialists",
    platformAccess: "Web ERP (Roadmap Module Access)",
    coreWorkflows: [
      "Accession Cataloguing by ISBN & Dewey Decimal",
      "Rapid Barcode Issue & Return Desk",
      "Overdue Book Fine Tracking & Waivers",
      "Circulation Registers & Inventory Audits",
    ],
    recommendedTutorialIds: ["platform-overview"],
  },
  {
    id: "role-parent",
    role: "Parents",
    title: "Child Academic Journey & Mobile Notifications",
    iconName: "Smartphone",
    description: "Stay connected with real-time attendance alerts, digital fee payments, homework tasks, report cards, and live bus GPS.",
    targetAudience: "Student Guardians & Parents",
    platformAccess: "Native Android & iOS Mobile App",
    coreWorkflows: [
      "Real-Time Absence & Late Arrival Notifications",
      "Secure Online Fee Payments & Instant Receipts",
      "Live GPS Bus Tracking with Arrival Geofences",
      "Exam Progress Reports & Teacher Direct Chat",
    ],
    recommendedTutorialIds: ["school-communication", "fees-and-finance"],
  },
  {
    id: "role-student",
    role: "Students",
    title: "Daily Timetable, Assignments & Progress",
    iconName: "Users",
    description: "Access personalized daily class schedules, download digital study resources, submit homework, and view report cards.",
    targetAudience: "Enrolled School Students",
    platformAccess: "Student Web Portal + Mobile App",
    coreWorkflows: [
      "Daily Period Schedule & Teacher Rosters",
      "Homework Notes & Study Material Access",
      "Examination Date Sheets & Admit Cards",
      "Published Term Report Cards & Attendance",
    ],
    recommendedTutorialIds: ["platform-overview"],
  },
];

export const tutorialTopics = [
  "Create your school profile and academic year",
  "Add classes, sections and subjects",
  "Invite staff and assign roles",
  "Register students and review admission records",
  "Mark daily attendance and review corrections",
  "Build and publish a class timetable",
  "Schedule an exam and enter marks",
  "Generate progress reports",
  "Set up fee heads and record a payment",
  "Reconcile a cashier shift",
  "Plan a transport route and trip",
  "Send an announcement and review notifications",
  "Review audit logs and permission changes",
];

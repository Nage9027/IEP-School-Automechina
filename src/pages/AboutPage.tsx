import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bus,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  Database,
  Facebook,
  GraduationCap,
  HardDrive,
  Heart,
  Instagram,
  LayoutDashboard,
  Library,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Monitor,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Wallet,
  Youtube,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { portals } from "@/content/portals";

// Hero Benefit Highlights
const aboutHeroBenefits = [
  {
    icon: GraduationCap,
    title: "Built for Indian Schools",
    text: "Designed around CBSE/State boards, academic terms & fee norms",
  },
  {
    icon: Zap,
    title: "Purpose-Driven Automation",
    text: "Attendance alerts, fee dues & approval workflows run automatically",
  },
  {
    icon: ShieldCheck,
    title: "Data Ownership & Security",
    text: "Dedicated database environment per school with full role governance",
  },
  {
    icon: Rocket,
    title: "Continuous Platform Roadmap",
    text: "Honest availability labels with regular operational upgrades",
  },
];

// Section 2: Why We Built IEP Schools - 4 Key Pillars
const storyPillars = [
  {
    icon: Database,
    title: "Unified School Records",
    text: "Student profiles, guardian contacts, daily attendance, and fee ledgers connected under one institutional record.",
  },
  {
    icon: Zap,
    title: "Reduced Manual Drudgery",
    text: "Automated morning session alerts, pending fee reminders, and timetable conflict detection save hours each week.",
  },
  {
    icon: Users,
    title: "Role-Tailored Workspaces",
    text: "Principals, teachers, cashiers, transport drivers, and parents each get interfaces tailored specifically to their tasks.",
  },
  {
    icon: ShieldCheck,
    title: "Data Privacy & Governance",
    text: "Isolated cloud database boundaries per school ensure institutional records remain strictly private and secure.",
  },
];

// Section: Leadership Team
const leadershipTeam = [
  {
    name: "Nagendra Naidu",
    role: "Founder",
    image: "/media/Nagendra.png",
    alt: "Nagendra Naidu – Founder, IEP Schools",
  },
  {
    name: "Hari Nath",
    role: "Marketing Manager",
    image: "/media/Hari%20Nath.png",
    alt: "Hari Nath – Marketing Manager, IEP Schools",
  },
  {
    name: "Sai Krishna",
    role: "Co-Founder",
    image: "/media/Sai%20Krishna%20Png.png",
    alt: "Sai Krishna – Co-Founder, IEP Schools",
  },
];

// Section 4: What IEP Schools Automates - 10 Core Modules
const automatedModules = [
  {
    id: "students-admissions",
    title: "Student & Admission Management",
    description: "Online KYC forms, document verification, enrollment numbers, student directory, and transfer certificates.",
    icon: GraduationCap,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "attendance",
    title: "Attendance Management",
    description: "Session and period-wise marking, automated absence notifications via SMS/WhatsApp, and monthly registers.",
    icon: CalendarCheck,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "academics",
    title: "Academic & Timetable Management",
    description: "Class & subject mappings, conflict-free timetable generation, syllabus trackers, and lesson planning.",
    icon: BookOpen,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "finance",
    title: "Fee & Finance Management",
    description: "Flexible fee structures, POS counter collection, instant receipt generation, concessions, and student ledgers.",
    icon: Wallet,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "communication",
    title: "Parent Communication",
    description: "Digital circulars, class broadcast announcements, direct inquiries, and verified delivery receipts.",
    icon: MessageSquare,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "examinations",
    title: "Examinations & Results",
    description: "Exam schedules, hall tickets, marks entry by subject teachers, automated grading, and term report cards.",
    icon: ClipboardList,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "transport",
    title: "Transport Management",
    description: "Bus fleet management, route stops, driver allocations, student passenger lists, and vehicle fuel logs.",
    icon: Bus,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "library",
    title: "Library Management",
    description: "Book cataloging by ISBN/author, student issue and return registers, and overdue fine calculations.",
    icon: Library,
    status: "Upcoming",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Campus-wide attendance percentages, fee collection summaries, academic averages, and audit exports.",
    icon: BarChart3,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "user-management",
    title: "User Management & Role Access",
    description: "Fine-grained role-based permission templates, staff credentials, activity monitoring, and security settings.",
    icon: ShieldCheck,
    status: "Available",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

// Section 5: How the Platform Works - 5 Steps
const workflowSteps = [
  {
    step: "01",
    title: "School Setup",
    desc: "Create your institutional workspace, set academic sessions, define classes, sections, and configure grading scales.",
    icon: Settings,
  },
  {
    step: "02",
    title: "Configure Modules",
    desc: "Activate only the modules your team is ready to use; define customized fee structures and timetable slots.",
    icon: LayoutDashboard,
  },
  {
    step: "03",
    title: "Manage Operations",
    desc: "Faculty and administrative staff manage daily tasks with role-specific views and zero repetitive data entry.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Monitor Activity",
    desc: "School leadership monitors morning attendance signals, counter fee collections, and transport updates in real time.",
    icon: TrendingUp,
  },
  {
    step: "05",
    title: "Review Reports",
    desc: "Generate term progress report cards, fee reconciliation statements, and operational compliance reports with a single click.",
    icon: BarChart3,
  },
];

// Section 7: Technology & Security Highlights
const techPillars = [
  {
    icon: Server,
    title: "Dedicated Virtual Environment",
    desc: "Every school runs in an isolated virtual container with 6 GB RAM and 10 GB SSD on the Free tier, expandable on demand.",
    tag: "6 GB RAM Included",
  },
  {
    icon: Lock,
    title: "Bank-Grade HTTPS/TLS 1.3",
    desc: "All browser and mobile app communications are encrypted with TLS 1.3, secure session tokens, and strict CSRF protection.",
    tag: "End-to-End Encryption",
  },
  {
    icon: ShieldCheck,
    title: "Strict Role-Based Access (RBAC)",
    desc: "Zero cross-department data leakage. Teachers access assigned classes, cashiers access active counters, parents see only their child.",
    tag: "Granular Permissions",
  },
  {
    icon: HardDrive,
    title: "Automated Cloud Backups",
    desc: "Automated redundant database snapshots safeguard all student, academic, and financial records against data loss.",
    tag: "Daily Redundancy",
  },
  {
    icon: Database,
    title: "High-Performance Persistence",
    desc: "Scalable MongoDB document architecture structured for sub-second query performance during peak morning traffic.",
    tag: "MongoDB Powered",
  },
  {
    icon: Monitor,
    title: "Multi-Device Unified Ecosystem",
    desc: "Responsive Web ERP for office and faculty, Native Parent Smartphone App for families, and Windows Desktop app for cashiers.",
    tag: "Web · Mobile · Desktop",
  },
];

// Section 8: Why Schools Choose IEP Schools - 4 Impact Benefits
const whyChooseBenefits = [
  {
    icon: Zap,
    title: "Less Repetitive Work",
    description: "Streamline recurring administrative routines like morning roll calls, fee receipts, and circular dispatch.",
    metric: "Save 15+ hrs/week",
  },
  {
    icon: LayoutDashboard,
    title: "Better Operational Visibility",
    description: "Replace disconnected registers and spreadsheets with synchronized real-time leadership dashboards.",
    metric: "100% Live Records",
  },
  {
    icon: Heart,
    title: "Improved Family Communication",
    description: "Keep parents informed with instant absence alerts, digital report cards, circulars, and fee receipts.",
    metric: "98% Parent Reach",
  },
  {
    icon: TrendingUp,
    title: "Designed for Growth",
    description: "Start on the ₹0 Free tier with generous resource limits and scale smoothly as your student enrollment grows.",
    metric: "Zero Upfront Cost",
  },
];

export default function AboutPage() {
  const { site } = useSiteContent();
  const [selectedRole, setSelectedRole] = useState(portals[0]?.id || "admin");

  usePageMeta({
    title: "About Us | Making Everyday School Operations Smarter | IEP Schools",
    description:
      "IEP Schools simplifies school administration through connected technology and practical automation. From admissions and attendance to academics, finance, communication, and reporting, our platform helps schools manage everyday operations more efficiently.",
    path: "/about",
  });

  const activePortal = portals.find((p) => p.id === selectedRole) || portals[0];

  return (
    <>
      {/* ============ SECTION 1: HERO SECTION ============ */}
      <PageHero
        backgroundImage="/media/Images/IEP%20Schools_%20About%20Us%20Classroom.png"
        className="about-page-hero"
        eyebrow="About IEP Schools"
        title={
          <>
            Making Everyday School{" "}
            <span className="text-gradient">Operations Smarter.</span>
          </>
        }
        description="IEP Schools simplifies school administration through connected technology and practical automation. From admissions and attendance to academics, finance, communication, and reporting, our platform helps schools manage everyday operations more efficiently."
        breadcrumb="About Us"
        benefits={aboutHeroBenefits}
        aside={
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Background Ambient Purple Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-fuchsia-500/20 blur-2xl opacity-75 animate-pulse"
            />

            {/* Framed Classroom Image Showcase */}
            <div className="relative overflow-hidden rounded-3xl border border-purple-400/30 bg-navy-950/40 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(147,51,234,0.22)] backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_45px_rgba(147,51,234,0.32)] group">
              <div className="relative overflow-hidden rounded-2xl bg-navy-900 aspect-[16/9] flex items-center justify-center">
                <img
                  src="/media/Images/IEP%20Schools_%20About%20Us%20Classroom.png"
                  alt="IEP Schools - Smart Education Classroom & Platform Ecosystem"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -left-2 top-4 hidden sm:flex items-center gap-2 rounded-2xl border border-purple-400/25 bg-navy-950/90 px-3 py-1.5 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-purple-500/20 text-purple-300">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span>Smart School Automation</span>
              </div>

              {/* Floating Badge 2 - Top Right */}
              <div className="absolute -right-2 top-6 hidden sm:flex items-center gap-2 rounded-2xl border border-purple-400/25 bg-navy-950/90 px-3 py-1.5 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:1.5s]">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <GraduationCap className="h-3.5 w-3.5" />
                </span>
                <span>CBSE & State Board Ready</span>
              </div>

              {/* Floating Badge 3 - Bottom Left */}
              <div className="absolute -left-2 bottom-5 hidden sm:flex items-center gap-2 rounded-2xl border border-purple-400/25 bg-navy-950/90 px-3 py-1.5 text-xs font-bold text-white shadow-lift backdrop-blur-md animate-float [animation-delay:2.5s]">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-fuchsia-500/20 text-fuchsia-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
                <span>Dedicated Cloud Environment</span>
              </div>
            </div>
          </div>
        }
      >
        <Button to="/features" size="lg">
          Explore Automation Features
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button to="/contact" variant="light" size="lg">
          Contact Our Team
        </Button>
      </PageHero>

      {/* ============ SECTION 2: OUR STORY ============ */}
      <Section tone="light" className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
                Why We Built IEP Schools
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-ink/70">
                <p>
                  Schools manage hundreds of important tasks every day. Student records, attendance,
                  fee collection, academic planning, parent communication, and reporting often require
                  separate systems or repetitive manual work.
                </p>
                <p>
                  IEP Schools brings these essential operations into one connected platform, helping
                  institutions reduce administrative effort, improve visibility, and focus more on education.
                </p>
                <p>
                  By eliminating scattered spreadsheets and paper registers, staff no longer waste hours
                  reconciling conflicting records. Every department works with live, verified data while
                  maintaining strict role permissions.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/features" variant="primary">
                  See What Is Built
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button to="/contact?plan=free" variant="outline">
                  Start with Free Plan
                </Button>
              </div>
            </div>

            {/* 4 Illustrated Benefit Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {storyPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col rounded-3xl border border-purple-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-card-hover"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-extrabold text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-ink/65">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION: LEADERSHIP TEAM ============ */}
      <Section tone="white" id="leadership" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Subtle ambient lavender glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-purple-100/50 via-violet-50/25 to-transparent blur-3xl -z-10"
        />

        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership Team"
            title="Meet the People Behind IEP Schools"
            description="Driven by innovation, technology and a shared commitment to making school management smarter."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadershipTeam.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-card-hover md:last:col-span-2 md:last:max-w-md md:last:mx-auto lg:last:col-span-1 lg:last:max-w-none w-full"
              >
                {/* Large Professional Portrait */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-slate-100 to-purple-50/30">
                  <img
                    src={member.image}
                    alt={member.alt}
                    width={600}
                    height={750}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                {/* Profile Details */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/80 px-3 py-1 text-xs font-bold text-purple-700 tracking-wide">
                      {member.role}
                    </span>
                    <h3 className="mt-3.5 text-xl sm:text-2xl font-extrabold tracking-tight text-navy-900 transition-colors group-hover:text-purple-600">
                      {member.name}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-100/80 flex items-center justify-between text-xs text-ink/60">
                    <span className="font-semibold text-navy-900/80">IEP Schools</span>
                    <span className="font-medium text-slate-500">Executive Team</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 3: MISSION AND VISION ============ */}
      <Section tone="dark" className="py-16 sm:py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 dark-glow opacity-50" />
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="Core Purpose"
            title="Our Mission & Vision"
            description="Guiding principles behind our technology choices, accessibility goals, and school partnerships."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-400/40 transition-colors">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-colors" />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-300">
                  <Target className="h-3.5 w-3.5" />
                  OUR MISSION
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
                  Make Everyday School Management Simpler
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  To make everyday school management simpler, more connected, and more accessible
                  through practical automation.
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  We empower school leaders, teachers, and administrative staff with reliable tools
                  that cut repetitive paperwork, maintain transparent audit trails, and give educators
                  more time to focus on teaching and student mentorship.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-purple-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero capital lock-in · Generous Free plan included</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-400/40 transition-colors">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl group-hover:bg-fuchsia-500/30 transition-colors" />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-bold text-fuchsia-300">
                  <Compass className="h-3.5 w-3.5" />
                  OUR VISION
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
                  Technology That Truly Supports Education
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  To help educational institutions operate efficiently with technology that supports
                  administrators, teachers, students, and parents.
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  We envision an educational landscape where institutions of all sizes run seamlessly
                  on modern cloud infrastructure, where communication between teachers and parents is
                  instant and transparent, and where school decisions are backed by clean operational data.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-fuchsia-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>One connected system for school, home, and commute</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 4: WHAT IEP SCHOOLS AUTOMATES ============ */}
      <Section tone="white" className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Comprehensive Modules"
            title="What IEP Schools Automates"
            description="Ten integrated operational modules connected to a single live database, removing manual handoffs."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {automatedModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-ink/10 bg-surface p-6 shadow-soft transition-all duration-300 hover:border-purple-200 hover:bg-white hover:shadow-card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-purple-600 shadow-sm ring-1 ring-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${mod.statusColor}`}
                      >
                        {mod.status}
                      </span>
                    </div>

                    <h3 className="mt-5 text-sm font-extrabold text-navy-900 leading-snug">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-ink/65">
                      {mod.description}
                    </p>
                  </div>

                  <Link
                    to="/features"
                    className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Explore capability
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button to="/features" variant="outline">
              View Detailed Capability Matrix
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 5: HOW THE PLATFORM WORKS ============ */}
      <Section tone="light" className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Workflow Architecture"
            title="How the Platform Works"
            description="From initial setup to daily operations and year-end reporting, a structured path to automation."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black tracking-tight text-purple-600/30">
                      {step.step}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-ink/65">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ============ SECTION 6: MULTIPLE SCHOOL ROLES ============ */}
      <Section tone="white" className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Role-Based Portals"
            title="One Platform, Multiple School Roles"
            description="Every member of the school ecosystem gets a dedicated interface matched to their daily responsibilities."
          />

          {/* Role Selection Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {portals.map((p) => {
              const Icon = p.icon;
              const isSelected = p.id === activePortal.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedRole(p.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-glow"
                      : "border border-ink/10 bg-surface text-ink/70 hover:bg-white hover:text-navy-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Active Role Card Overview */}
          <div className="mt-8 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/20 p-8 shadow-soft sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-600 text-white shadow-glow">
                    <activePortal.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy-900">
                      {activePortal.name} Workspace
                    </h3>
                    <p className="text-xs font-semibold text-purple-600">
                      {activePortal.subtitle}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-ink/70">
                  {activePortal.dashboard}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/60">
                    Included Core Modules:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activePortal.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-purple-200 bg-white px-3 py-1 text-[11px] font-semibold text-navy-900 shadow-xs"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button to="/portals" variant="primary">
                    View Role Portal Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button to="/contact?topic=demo" variant="outline">
                    Request Walkthrough
                  </Button>
                </div>
              </div>

              {/* Access Mode and Permission Highlights */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span className="text-xs text-ink/60">Primary Device</span>
                  <span className="text-xs font-bold text-navy-900">{activePortal.login}</span>
                </div>
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span className="text-xs text-ink/60">Deployment Status</span>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-bold uppercase">
                    {activePortal.availability}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2">
                    Access Governance
                  </p>
                  <p className="text-xs leading-5 text-ink/65">
                    {activePortal.permissions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 7: TECHNOLOGY & SECURITY ============ */}
      <Section tone="dark" className="py-16 sm:py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 dark-glow opacity-50" />
        <div className="container-x relative z-10">
          <SectionHeading
            eyebrow="Technical Foundations"
            title="Technology, Security and Data Management"
            description="Enterprise architecture built specifically for institutional reliability, multi-user concurrency, and data ownership."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md shadow-card transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/65">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">
                  Strict Data Privacy Guarantee
                </p>
                <p className="text-xs text-white/60">
                  Each school operates within an isolated database container. Student data is never commingled or commercialized.
                </p>
              </div>
            </div>
            <Button to="/hosting" variant="light" size="sm">
              Explore Hosting Specs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 8: WHY SCHOOLS CHOOSE IEP SCHOOLS ============ */}
      <Section tone="white" className="py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Operational Advantages"
            title="Why Schools Choose IEP Schools"
            description="Tangible operational benefits that simplify everyday routines for administrators, teachers, and parents."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group flex flex-col justify-between rounded-3xl border border-ink/10 bg-surface p-6 shadow-soft transition-all duration-300 hover:border-purple-200 hover:bg-white hover:shadow-lift"
                >
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-purple-600 shadow-sm ring-1 ring-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      {item.metric}
                    </span>
                    <h3 className="mt-1 text-base font-extrabold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-ink/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Team Strip */}
          <div className="mt-12 rounded-3xl border border-purple-100 bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-600 text-white shadow-glow">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-extrabold text-navy-900">
                  Serving Educational Institutions Across India
                </p>
                <p className="text-xs text-ink/65">
                  Direct support from our product and engineering teams. No third-party call centers.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-bold text-navy-900 hover:text-purple-600 transition-colors shadow-sm"
              >
                <Mail className="h-3.5 w-3.5 text-purple-600" />
                {site.contact.email}
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                WhatsApp
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1.5 text-xs font-bold text-pink-800 hover:bg-pink-100 transition-colors shadow-sm"
                title="Official Instagram"
              >
                <Instagram className="h-3.5 w-3.5 text-pink-600" />
                Instagram
              </a>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-800 hover:bg-red-100 transition-colors shadow-sm"
                title="Official YouTube Channel"
              >
                <Youtube className="h-3.5 w-3.5 text-red-600" />
                YouTube
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors shadow-sm"
                title="Official Facebook Page"
              >
                <Facebook className="h-3.5 w-3.5 text-blue-600" />
                Facebook
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100 transition-colors shadow-sm"
                title="Official LinkedIn Profile"
              >
                <Linkedin className="h-3.5 w-3.5 text-sky-600" />
                LinkedIn
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors shadow-sm"
                title="Official X (Twitter) Account"
              >
                <Twitter className="h-3.5 w-3.5 text-slate-700" />
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SECTION 9: FINAL CALL TO ACTION ============ */}
      <CtaBand
        title="Ready to Make Your School Smarter?"
        description="Discover how IEP Schools can help your institution organize everyday operations through connected school automation."
        secondary="features"
      />
    </>
  );
}

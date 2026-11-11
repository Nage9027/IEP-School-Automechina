/**
 * Illustrative preview data for the HeroProductShowcase.
 * All values are sample/demonstration data only — not live school statistics.
 */

export interface DesktopScreen {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  stats: Array<{ label: string; value: string; trend?: string }>;
  cards: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
    value?: string;
  }>;
  listItems?: Array<{ label: string; status: string; time?: string }>;
  chartType?: "bar" | "line" | "donut";
}

export interface MobileScreen {
  id: string;
  title: string;
  tiles: Array<{ label: string; icon: string; color: string }>;
  items: Array<{ title: string; subtitle: string; time?: string; type?: string }>;
}

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  type: "success" | "info" | "warning" | "alert";
  icon: string;
}

/* ------------------------------------------------------------------ */
/*  Desktop screens                                                   */
/* ------------------------------------------------------------------ */

export const DESKTOP_SCREENS: DesktopScreen[] = [
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    subtitle: "School-wide overview · real-time metrics",
    icon: "LayoutDashboard",
    stats: [
      { label: "Total Schools", value: "412", trend: "+3.1%" },
      { label: "Active Users", value: "18.6K", trend: "+5.4%" },
      { label: "Modules Deployed", value: "22", trend: "All active" },
      { label: "System Uptime", value: "99.9%", trend: "Last 30 days" },
    ],
    cards: [
      {
        title: "Platform Overview",
        description: "All schools · real-time health",
        icon: "Activity",
        color: "text-violet-600",
        value: "Healthy",
      },
      {
        title: "System Health",
        description: "API · database · channels",
        icon: "BarChart3",
        color: "text-emerald-600",
        value: "Operational",
      },
    ],
    listItems: [
      { label: "New school onboarded", status: "Delhi Public School", time: "5m ago" },
      { label: "Fee collection sync", status: "₹2.4L collected", time: "12m ago" },
      { label: "Parent app update", status: "v2.1.0 released", time: "45m ago" },
    ],
    chartType: "bar",
  },
  {
    id: "student-management",
    title: "Student Management",
    subtitle: "Directory · enrollment · records",
    icon: "Users",
    stats: [
      { label: "Total Students", value: "1,248", trend: "+4.2%" },
      { label: "Enrolled This Term", value: "89", trend: "12 pending" },
      { label: "Attendance Rate", value: "94.2%", trend: "+1.8%" },
      { label: "Fee Compliance", value: "82%", trend: "+3.4%" },
    ],
    cards: [
      {
        title: "Student Directory",
        description: "Searchable student records",
        icon: "FileText",
        color: "text-indigo-600",
      },
      {
        title: "Enrollment Pipeline",
        description: "Applications under review",
        icon: "CalendarCheck",
        color: "text-amber-600",
      },
    ],
    listItems: [
      { label: "Aarav Sharma", status: "Class 6-B · 96% attendance", time: "Present" },
      { label: "Diya Patel", status: "Class 8-A · 89% attendance", time: "Present" },
      { label: "Kabir Rao", status: "Class 10-C · 92% attendance", time: "Late" },
    ],
  },
  {
    id: "attendance-management",
    title: "Attendance Management",
    subtitle: "Daily marking · automated alerts · reports",
    icon: "CalendarCheck",
    stats: [
      { label: "Present Today", value: "1,176", trend: "94.2%" },
      { label: "Absent", value: "54", trend: "4.3%" },
      { label: "Late Arrivals", value: "18", trend: "1.4%" },
      { label: "Classes Covered", value: "86", trend: "100%" },
    ],
    cards: [
      {
        title: "Weekly Trend",
        description: "Attendance percentage",
        icon: "TrendingUp",
        color: "text-emerald-600",
      },
      {
        title: "At-Risk Students",
        description: "Below 75% attendance",
        icon: "Clock",
        color: "text-rose-600",
      },
    ],
    listItems: [
      { label: "Class 8-A", status: "96% · All marked", time: "Completed" },
      { label: "Class 9-B", status: "88% · 2 absent", time: "Pending" },
      { label: "Class 10-C", status: "91% · 1 late", time: "Completed" },
    ],
    chartType: "bar",
  },
  {
    id: "fee-management",
    title: "Fee Management",
    subtitle: "Collection · reminders · receipts",
    icon: "IndianRupee",
    stats: [
      { label: "Today's Collection", value: "₹1,42,800", trend: "" },
      { label: "Receipts Issued", value: "23", trend: "" },
      { label: "Pending Dues", value: "₹4.1L", trend: "" },
      { label: "Collection Rate", value: "82%", trend: "+2.1%" },
    ],
    cards: [
      {
        title: "Collection Trend",
        description: "Daily fee collection",
        icon: "TrendingUp",
        color: "text-violet-600",
      },
      {
        title: "Payment Mode",
        description: "UPI · Cash · Card",
        icon: "CreditCard",
        color: "text-amber-600",
      },
    ],
    listItems: [
      { label: "Aarav Sharma", status: "₹18,500 · Paid", time: "08 Nov" },
      { label: "Diya Patel", status: "₹4,200 · Paid", time: "07 Nov" },
      { label: "Kabir Rao", status: "₹21,000 · Partial", time: "Pending" },
    ],
  },
  {
    id: "admissions",
    title: "Admissions Management",
    subtitle: "Online applications · approval workflows",
    icon: "School",
    stats: [
      { label: "New Applications", value: "24", trend: "This month" },
      { label: "Approved", value: "18", trend: "75%" },
      { label: "Pending Review", value: "6", trend: "Awaiting docs" },
      { label: "Conversion Rate", value: "72%", trend: "+5.3%" },
    ],
    cards: [
      {
        title: "Application Pipeline",
        description: "Enrolment status tracking",
        icon: "FileText",
        color: "text-indigo-600",
      },
      {
        title: "Document Verification",
        description: "KYC & academic records",
        icon: "CheckCircle2",
        color: "text-emerald-600",
      },
    ],
    listItems: [
      { label: "Priya Shah", status: "Grade 1 · Under review", time: "02 Nov" },
      { label: "Arjun Reddy", status: "Grade 3 · Documents pending", time: "31 Oct" },
      { label: "Zara Khan", status: "Grade 5 · Approved", time: "28 Oct" },
    ],
  },
  {
    id: "academic-management",
    title: "Academic Management",
    subtitle: "Timetables · lesson plans · subjects",
    icon: "BookOpen",
    stats: [
      { label: "Active Subjects", value: "12", trend: "" },
      { label: "Published Lessons", value: "42", trend: "This term" },
      { label: "Draft Lessons", value: "6", trend: "Pending review" },
      { label: "Class Timetables", value: "34", trend: "Active" },
    ],
    cards: [
      {
        title: "Lesson Plans",
        description: "Curriculum & materials",
        icon: "FileText",
        color: "text-indigo-600",
      },
      {
        title: "Class Timetables",
        description: "Weekly schedules",
        icon: "Calendar",
        color: "text-violet-600",
      },
    ],
    listItems: [
      { label: "Mathematics", status: "Grade 10 · Published", time: "Active" },
      { label: "Physics", status: "Grade 9 · Published", time: "Active" },
      { label: "English Literature", status: "Grade 8 · Draft", time: "Pending" },
    ],
  },
  {
    id: "parent-communication",
    title: "Parent Communication",
    subtitle: "Circulars · notifications · announcements",
    icon: "MessageSquare",
    stats: [
      { label: "Messages Sent", value: "1.2K", trend: "This month" },
      { label: "Delivered", value: "98%", trend: "" },
      { label: "Circulars Published", value: "6", trend: "" },
      { label: "Read Rate", value: "91%", trend: "+3.2%" },
    ],
    cards: [
      {
        title: "Bulk Messages",
        description: "Circulars & alerts",
        icon: "Bell",
        color: "text-rose-600",
      },
      {
        title: "Parent-Teacher Chat",
        description: "1:1 communication",
        icon: "MessageCircle",
        color: "text-indigo-600",
      },
    ],
    listItems: [
      { label: "Parent-Teacher Meeting", status: "All parents", time: "2h ago" },
      { label: "Fee Payment Reminder", status: "Grade 8–10", time: "5h ago" },
      { label: "School Closure Notice", status: "All classes", time: "1d ago" },
    ],
  },
  {
    id: "reports-analytics",
    title: "Reports & Analytics",
    subtitle: "Academic · operational · financial reports",
    icon: "BarChart3",
    stats: [
      { label: "Reports Generated", value: "48", trend: "This month" },
      { label: "Export Formats", value: "3", trend: "PDF · Excel · CSV" },
      { label: "Scheduled Reports", value: "8", trend: "Auto-email" },
      { label: "Data Freshness", value: "Real-time", trend: "" },
    ],
    cards: [
      {
        title: "Report Types",
        description: "Attendance · finance · academics",
        icon: "FileText",
        color: "text-violet-600",
      },
      {
        title: "Recent Exports",
        description: "Auto-generated reports",
        icon: "Download",
        color: "text-emerald-600",
      },
    ],
    listItems: [
      { label: "Monthly Fee Report", status: "Generated", time: "12 Nov" },
      { label: "Attendance Summary", status: "Generated", time: "11 Nov" },
      { label: "Results Analysis", status: "Generated", time: "09 Nov" },
    ],
    chartType: "donut",
  },
];

/* ------------------------------------------------------------------ */
/*  Mobile screens                                                    */
/* ------------------------------------------------------------------ */

export const MOBILE_SCREENS: MobileScreen[] = [
  {
    id: "parent-dashboard",
    title: "Parent App",
    tiles: [
      { label: "Attendance", icon: "CalendarCheck", color: "text-violet-600" },
      { label: "Fees", icon: "IndianRupee", color: "text-amber-600" },
      { label: "Homework", icon: "FileText", color: "text-emerald-600" },
      { label: "Circulars", icon: "Bell", color: "text-rose-600" },
      { label: "Results", icon: "Award", color: "text-sky-600" },
      { label: "Transport", icon: "Bus", color: "text-indigo-600" },
    ],
    items: [
      { title: "Aarav Das · Class 5-A", subtitle: "Hello, Parent", type: "profile" },
      { title: "Today's Attendance", subtitle: "All classes attended", type: "success" },
      { title: "Fee Payment", subtitle: "₹18,500 · Due 15 Nov", type: "warning" },
    ],
  },
  {
    id: "child-attendance",
    title: "Child Attendance",
    tiles: [
      { label: "Overall", icon: "CalendarCheck", color: "text-violet-600" },
      { label: "Present", icon: "CheckCircle2", color: "text-emerald-600" },
      { label: "Absent", icon: "X", color: "text-rose-600" },
      { label: "Late", icon: "Clock", color: "text-amber-600" },
    ],
    items: [
      { title: "Mathematics", subtitle: "9:00–9:45 · Present", type: "success" },
      { title: "Science", subtitle: "9:45–10:30 · Present", type: "success" },
      { title: "English", subtitle: "10:30–11:15 · Present", type: "success" },
      { title: "History", subtitle: "11:15–12:00 · Absent", type: "alert" },
    ],
  },
  {
    id: "fee-details",
    title: "Fee Details",
    tiles: [
      { label: "Term Fee", icon: "IndianRupee", color: "text-amber-600" },
      { label: "Transport", icon: "Bus", color: "text-indigo-600" },
      { label: "Activity", icon: "Award", color: "text-violet-600" },
      { label: "Exam Fee", icon: "FileText", color: "text-sky-600" },
    ],
    items: [
      { title: "Term 2 Fee", subtitle: "₹18,500 · Paid · 08 Nov", type: "success" },
      { title: "Transport Fee", subtitle: "₹3,000 · Due · 15 Nov", type: "warning" },
      { title: "Activity Fee", subtitle: "₹1,500 · Paid · 01 Oct", type: "success" },
    ],
  },
  {
    id: "payment-history",
    title: "Payment History",
    tiles: [
      { label: "Receipts", icon: "FileText", color: "text-indigo-600" },
      { label: "Refunds", icon: "ArrowLeft", color: "text-rose-600" },
      { label: "Pending", icon: "Clock", color: "text-amber-600" },
    ],
    items: [
      { title: "Term 2 Fee", subtitle: "₹18,500 · UPI · RCP-88421", time: "08 Nov" },
      { title: "Transport Fee", subtitle: "₹3,000 · Cash · RCP-77102", time: "15 Oct" },
      { title: "Activity Fee", subtitle: "₹1,500 · UPI · RCP-65411", time: "01 Sep" },
    ],
  },
  {
    id: "homework",
    title: "Homework",
    tiles: [
      { label: "Mathematics", icon: "BarChart3", color: "text-violet-600" },
      { label: "Science", icon: "Flask", color: "text-emerald-600" },
      { label: "English", icon: "BookOpen", color: "text-indigo-600" },
      { label: "History", icon: "Book", color: "text-rose-600" },
    ],
    items: [
      { title: "Exercise 5.1 · Q1–Q10", subtitle: "Due 13 Nov · Class 5-A", type: "warning" },
      { title: "Chapter 3 Q&A", subtitle: "Due 14 Nov · Class 5-A", type: "warning" },
      { title: "Essay: 'My School'", subtitle: "Due 16 Nov · Class 5-A", type: "warning" },
    ],
  },
  {
    id: "circulars",
    title: "Circulars & Notifications",
    tiles: [
      { label: "General", icon: "Bell", color: "text-rose-600" },
      { label: "Holiday", icon: "Calendar", color: "text-amber-600" },
      { label: "Event", icon: "Star", color: "text-violet-600" },
    ],
    items: [
      { title: "Parent-Teacher Meeting", subtitle: "15 Nov 2026 · General", time: "2h ago" },
      { title: "Winter Break Schedule", subtitle: "10 Nov 2026 · Holiday", time: "1d ago" },
      { title: "Annual Day Rehearsal", subtitle: "05 Nov 2026 · Event", time: "3d ago" },
    ],
  },
  {
    id: "examination-results",
    title: "Examination Results",
    tiles: [
      { label: "Mathematics", icon: "BarChart3", color: "text-sky-600" },
      { label: "Science", icon: "Flask", color: "text-emerald-600" },
      { label: "English", icon: "BookOpen", color: "text-indigo-600" },
      { label: "History", icon: "Book", color: "text-violet-600" },
    ],
    items: [
      { title: "Mathematics", subtitle: "85/100 · Grade A", type: "success" },
      { title: "Science", subtitle: "78/100 · Grade B+", type: "success" },
      { title: "English", subtitle: "82/100 · Grade A", type: "success" },
      { title: "History", subtitle: "71/100 · Grade B+", type: "success" },
    ],
  },
  {
    id: "transport-info",
    title: "Transport Information",
    tiles: [
      { label: "Routes", icon: "MapPin", color: "text-indigo-600" },
      { label: "Buses", icon: "Bus", color: "text-violet-600" },
      { label: "Tracking", icon: "Smartphone", color: "text-emerald-600" },
    ],
    items: [
      { title: "Route 4 – North City", subtitle: "On time · Bus MH-12-A-4401", type: "success" },
      { title: "Route 7 – East Valley", subtitle: "On time · Bus MH-12-B-1102", type: "success" },
      { title: "Route 2 – West Hills", subtitle: "Delayed 5 min · MH-12-C-3301", type: "warning" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Notifications                                                     */
/* ------------------------------------------------------------------ */

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "attendance-marked",
    title: "Attendance marked successfully",
    subtitle: "Class 8-A · All students recorded",
    type: "success",
    icon: "CheckCircle2",
  },
  {
    id: "parent-notification",
    title: "Parent notification delivered",
    subtitle: "Fee reminder sent to 142 parents",
    type: "info",
    icon: "MessageSquare",
  },
  {
    id: "fee-payment",
    title: "Fee payment recorded",
    subtitle: "₹18,500 · UPI · Aarav Sharma",
    type: "success",
    icon: "IndianRupee",
  },
  {
    id: "new-admission",
    title: "New admission received",
    subtitle: "Priya Shah · Grade 1 · Under review",
    type: "info",
    icon: "School",
  },
  {
    id: "homework-published",
    title: "Homework published",
    subtitle: "Mathematics · Exercise 5.1 · Class 5-A",
    type: "info",
    icon: "FileText",
  },
  {
    id: "exam-result",
    title: "Examination result available",
    subtitle: "Term 2 Mathematics · Grade 10",
    type: "success",
    icon: "Award",
  },
  {
    id: "transport-update",
    title: "Transport notification sent",
    subtitle: "Route 4 delayed 5 minutes",
    type: "warning",
    icon: "Bus",
  },
];

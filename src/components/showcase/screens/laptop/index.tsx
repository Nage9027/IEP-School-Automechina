"use client";

import {
  Activity,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bus,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  GraduationCap,
  IndianRupee,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Settings,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                    */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  trend?: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[8px] font-semibold text-ink/60">{label}</span>
        <Icon className="h-3 w-3 text-violet-500" />
      </div>
      <p className="mt-1 text-[14px] font-extrabold tracking-tight text-navy-900">
        {value}
      </p>
      {trend && (
        <p className="text-[8px] font-semibold text-emerald-600">{trend}</p>
      )}
    </div>
  );
}

/**
 * Proportional sidebar: ~22% of screen width on desktop.
 */
function Sidebar({ active }: { active: string }) {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Students" },
    { icon: CalendarCheck, label: "Attendance" },
    { icon: BookOpen, label: "Academics" },
    { icon: Wallet, label: "Finance" },
    { icon: Bus, label: "Transport" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <aside className="hidden w-[22%] shrink-0 flex-col border-r border-ink/[0.07] bg-white p-4 lg:flex">
      <div className="flex items-center gap-2 mb-6">
        <img
          src="/brand/iep-schools-mark-transparent.png"
          alt=""
          className="h-6 w-auto"
        />
        <span className="text-[10px] font-extrabold leading-tight text-navy-900">
          IEP<br />Schools
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = item.label === active;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[9px] font-semibold ${
                isActive
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-ink/60"
              }`}
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </div>
          );
        })}
      </div>
      <div className="mt-auto rounded-xl border border-violet-100 bg-violet-50 p-3">
        <p className="text-[8px] font-bold text-violet-700">Academic year</p>
        <p className="mt-0.5 text-[8px] text-ink/55">2025–26 · Term 2</p>
      </div>
    </aside>
  );
}

/**
 * Application header with logo, title, and user controls.
 */
function Header({
  title,
  subtitle,
  date,
}: {
  title: string;
  subtitle?: string;
  date?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div>
        {date && (
          <p className="text-[9px] font-semibold text-ink/60">{date}</p>
        )}
        <p className="text-[15px] font-extrabold tracking-tight text-navy-900">
          {title}
        </p>
        {subtitle && <p className="text-[9px] text-ink/60">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink/60 shadow-sm">
          <Search className="h-3.5 w-3.5" />
        </span>
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white text-ink/60 shadow-sm">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-rose-500" />
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
          PS
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Admin Dashboard                                                */
/* ------------------------------------------------------------------ */
export function AdminDashboard() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Admin Dashboard" date="Monday, 09 Nov 2026" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Schools" value="412" trend="+3.1%" icon={Users} />
          <StatCard label="Active Users" value="18.6K" trend="+5.4%" icon={UserRound} />
          <StatCard label="Modules Deployed" value="22" trend="All active" icon={LayoutDashboard} />
          <StatCard label="Uptime" value="99.9%" trend="Last 30 days" icon={Activity} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold text-navy-900">Platform overview</p>
                <p className="text-[8px] text-ink/60">All schools · real-time</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-700">
                <TrendingUp className="h-2.5 w-2.5" />
                Healthy
              </span>
            </div>
            <div className="flex h-[72px] items-end gap-2">
              {[68, 82, 74, 90, 86, 94].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-[60px] w-full items-end rounded-sm bg-violet-50">
                    <div className={`w-full rounded-sm ${i === 5 ? "bg-violet-600" : "bg-violet-300"}`} style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[7px] font-semibold text-ink/60">{["Mon","Tue","Wed","Thu","Fri","Sat"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">System health</p>
            <p className="text-[8px] text-ink/60">API · database · channels</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Web API", status: "Operational", pct: 100 },
                { label: "Parent mobile sync", status: "Operational", pct: 98 },
                { label: "Notifications", status: "Operational", pct: 99 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[9px] text-ink/60">{item.label}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] font-semibold text-emerald-600">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-navy-900">Recent activity</p>
              <span className="text-[8px] font-semibold text-violet-600">View all</span>
            </div>
            <div className="space-y-2">
              {[
                { text: "New school onboarded", meta: "Delhi Public School · 5m ago" },
                { text: "Fee collection sync", meta: "₹2.4L collected · 12m ago" },
                { text: "Parent app update", meta: "v2.1.0 released · 45m ago" },
              ].map((row) => (
                <div key={row.text} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet-50 text-violet-600">
                    <Users className="h-3 w-3" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-semibold text-navy-900">{row.text}</p>
                    <p className="text-[8px] text-ink/60">{row.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Quick actions</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: "Add school", Icon: Plus },
                { label: "Send circular", Icon: Mail },
                { label: "View reports", Icon: BarChart3 },
                { label: "Manage users", Icon: UserRound },
              ].map((item) => (
                <button key={item.label} className="flex items-center justify-between rounded-lg border border-ink/[0.06] bg-white p-2.5 text-[8px] font-semibold text-navy-900 hover:bg-violet-50">
                  <span>{item.label}</span>
                  <item.Icon className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Principal Dashboard                                            */
/* ------------------------------------------------------------------ */
export function PrincipalDashboard() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Principal Dashboard" subtitle="Sunnydale Public School" date="Monday, 09 Nov 2026" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Students" value="1,248" trend="+4.2%" icon={Users} />
          <StatCard label="Attendance" value="94.2%" trend="+1.8%" icon={CalendarCheck} />
          <StatCard label="Fee collected" value="₹18.4L" trend="82% of target" icon={IndianRupee} />
          <StatCard label="Staff present" value="68/74" trend="91.9%" icon={UserRound} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold text-navy-900">Attendance this week</p>
                <p className="text-[8px] text-ink/60">All classes · percentage</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-700">
                <TrendingUp className="h-2.5 w-2.5" />
                Healthy
              </span>
            </div>
            <div className="flex h-[72px] items-end gap-2">
              {[72, 86, 80, 94, 88, 96].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-[60px] w-full items-end rounded-sm bg-violet-50">
                    <div className={`w-full rounded-sm ${i === 4 ? "bg-violet-600" : "bg-violet-300"}`} style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[7px] font-semibold text-ink/60">{["Mon","Tue","Wed","Thu","Fri","Sat"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Fee collection</p>
            <p className="text-[8px] text-ink/60">Term 2 progress</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(#6D3BF5 0 82%, #EDE7FF 82% 100%)" }}>
                <div className="grid h-[48px] w-[48px] place-items-center rounded-full bg-white">
                  <span className="text-[11px] font-extrabold text-navy-900">82%</span>
                </div>
              </div>
              <div className="min-w-0 space-y-2">
                {[
                  { label: "Collected", value: "₹18.4L", color: "bg-violet-600" },
                  { label: "Pending", value: "₹4.1L", color: "bg-amber-400" },
                  { label: "Concessions", value: "₹0.6L", color: "bg-ink/15" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${row.color}`} />
                    <span className="text-[9px] text-ink/65">{row.label}</span>
                    <span className="ml-auto text-[9px] font-bold text-navy-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Student Management                                             */
/* ------------------------------------------------------------------ */
export function StudentManagement() {
  const students = [
    { name: "Aarav Sharma", cls: "6-B", admission: "ADM-2024-0142", attendance: "96%", fee: "Paid", transport: "Yes" },
    { name: "Diya Patel", cls: "8-A", admission: "ADM-2023-0891", attendance: "89%", fee: "Paid", transport: "No" },
    { name: "Kabir Rao", cls: "10-C", admission: "ADM-2022-1105", attendance: "92%", fee: "Partial", transport: "Yes" },
    { name: "Isha Nair", cls: "7-B", admission: "ADM-2024-0218", attendance: "97%", fee: "Paid", transport: "No" },
    { name: "Rohan Mehta", cls: "9-A", admission: "ADM-2023-0567", attendance: "85%", fee: "Due", transport: "Yes" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Students" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Student Management" subtitle="Directory · enrollment · records" />
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/[0.06] bg-white text-[9px] font-semibold text-navy-900">
              <Search className="h-4 w-4" />
            </span>
            <input className="flex-1 border border-ink/[0.1] rounded-lg px-3 py-2 text-[9px] outline-none focus:border-violet-500" placeholder="Search students…" />
            <button className="rounded-lg border border-ink/[0.1] bg-white px-3 py-2 text-[9px] font-semibold text-navy-900 hover:bg-ink/5">Filter</button>
          </div>
          <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
            <table className="w-full text-left text-[8.5px]">
              <thead className="bg-ink/[0.02]">
                <tr>
                  {["Student", "Class", "Admission No.", "Attendance", "Fee status", "Transport"].map((h) => (
                    <th key={h} className="px-3 py-2.5 font-semibold text-ink/60 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.04]">
                {students.map((s) => (
                  <tr key={s.name} className="hover:bg-ink/3 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-violet-700 text-[8px] font-bold">
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-navy-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-ink/60">{s.cls}</td>
                    <td className="px-3 py-2.5 text-ink/60">{s.admission}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[8px] font-bold ${Number(s.attendance.replace("%","")) >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{s.attendance}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold ${s.fee === "Paid" ? "bg-emerald-50 text-emerald-700" : s.fee === "Partial" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>{s.fee}</span>
                    </td>
                    <td className="px-3 py-2.5 text-ink/60">{s.transport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Admission Management                                           */
/* ------------------------------------------------------------------ */
export function AdmissionManagement() {
  const apps = [
    { name: "Priya Shah", grade: "Grade 1", status: "Under review", date: "02 Nov" },
    { name: "Arjun Reddy", grade: "Grade 3", status: "Documents pending", date: "31 Oct" },
    { name: "Zara Khan", grade: "Grade 5", status: "Approved", date: "28 Oct" },
    { name: "Vihaan Singh", grade: "Grade 2", status: "Under review", date: "25 Oct" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Admission Management" subtitle="Enrolment pipeline · applications" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="New applications" value="24" trend="This month" icon={FileText} />
          <StatCard label="Approved" value="18" trend="75%" icon={CheckCircle2} />
          <StatCard label="Pending" value="6" trend="Awaiting docs" icon={Clock} />
          <StatCard label="Conversion" value="72%" trend="vs last month" icon={TrendingUp} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Applicant</span>
              <span>Grade</span>
              <span className="text-right">Status</span>
              <span className="text-right">Applied</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {apps.map((a) => (
              <div key={a.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-amber-50 text-amber-700 text-[8px] font-bold">{a.name.charAt(0)}</div>
                  <div>
                    <span className="font-semibold text-navy-900">{a.name}</span>
                    <br />
                    <span className="text-ink/50">{a.grade}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className={`font-semibold ${a.status === "Approved" ? "text-emerald-600" : a.status === "Under review" ? "text-amber-600" : "text-ink/60"}`}>{a.status}</span>
                  <span className="text-ink/60">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Teacher Management                                             */
/* ------------------------------------------------------------------ */
export function TeacherManagement() {
  const teachers = [
    { name: "Sarah Johnson", dept: "Mathematics", id: "TCH-014", status: "Active", subjects: "Algebra, Geometry" },
    { name: "Michael Chen", dept: "Science", id: "TCH-023", status: "Active", subjects: "Physics, Chemistry" },
    { name: "Emily Watson", dept: "English", id: "TCH-031", status: "On leave", subjects: "Literature, Grammar" },
    { name: "Robert Kumar", dept: "History", id: "TCH-045", status: "Active", subjects: "World History, Civics" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Teacher Management" subtitle="Staff directory · subjects · assignments" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total teachers" value="34" trend="12 departments" icon={Users} />
          <StatCard label="Active" value="31" trend="91%" icon={CheckCircle2} />
          <StatCard label="On leave" value="2" trend="Temporary" icon={Clock} />
          <StatCard label="Avg. experience" value="6.2 yrs" trend="" icon={Award} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Teacher</span>
              <span>Department</span>
              <span>Employee ID</span>
              <span className="text-right">Status</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {teachers.map((t) => (
              <div key={t.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-violet-700 text-[8px] font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <span className="font-semibold text-navy-900">{t.name}</span>
                    <br />
                    <span className="text-ink/50 text-[8px]">{t.subjects}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div className="text-left min-w-[120px]">
                    <span className="text-ink/60">{t.dept}</span>
                    <br />
                    <span className="text-[8px] text-ink/50">{t.id}</span>
                  </div>
                  <span className={`font-semibold ${t.status === "Active" ? "text-emerald-600" : "text-amber-600"}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Student Attendance                                             */
/* ------------------------------------------------------------------ */
export function StudentAttendance() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Attendance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Student Attendance" subtitle="Daily marking · alerts · reports" date="Wednesday, 12 Nov 2026" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total students" value="1,248" trend="" icon={Users} />
          <StatCard label="Present today" value="1,176" trend="94.2%" icon={CheckCircle2} />
          <StatCard label="Absent" value="54" trend="4.3%" icon={X} />
          <StatCard label="Late" value="18" trend="1.4%" icon={Clock} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold text-navy-900">Weekly trend</p>
                <p className="text-[8px] text-ink/60">Attendance percentage</p>
              </div>
              <span className="text-[8px] font-semibold text-emerald-600">+2.1% vs last week</span>
            </div>
            <div className="flex h-64 items-end gap-2">
              {[78, 85, 82, 90, 88, 94, 92].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-[48px] w-full items-end rounded-sm bg-violet-50">
                    <div className={`w-full rounded-sm ${i === 6 ? "bg-violet-600" : "bg-violet-300"}`} style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[7px] font-semibold text-ink/60">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-navy-900">At-risk students</p>
              <span className="text-[8px] font-semibold text-amber-600">Below 75%</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Rohan Mehta", cls: "9-A", pct: "72%" },
                { name: "Sanya Gupta", cls: "8-B", pct: "68%" },
                { name: "Arjun Reddy", cls: "3-C", pct: "71%" },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-rose-50 text-rose-700 text-[8px] font-bold">{s.name.charAt(0)}</div>
                    <span className="text-[9px] font-semibold text-navy-900">{s.name}</span>
                  </div>
                  <span className="text-right text-[9px] font-bold text-ink/90">{s.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Teacher Attendance                                             */
/* ------------------------------------------------------------------ */
export function TeacherAttendance() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Attendance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Teacher Attendance" subtitle="Staff attendance · leave tracking" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total staff" value="34" trend="" icon={Users} />
          <StatCard label="Present" value="30" trend="88%" icon={CheckCircle2} />
          <StatCard label="On leave" value="3" trend="Temporary" icon={Clock} />
          <StatCard label="Classes covered" value="8" trend="By substitutes" icon={BookOpen} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Teacher</span>
              <span>Department</span>
              <span className="text-right">Status</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { name: "Sarah Johnson", dept: "Mathematics", status: "Present" },
              { name: "Michael Chen", dept: "Science", status: "Present" },
              { name: "Emily Watson", dept: "English", status: "On leave" },
              { name: "Robert Kumar", dept: "History", status: "Present" },
              { name: "Lisa D'Souza", dept: "Computer Science", status: "Present" },
            ].map((t) => (
              <div key={t.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{t.name}</span>
                <span className="text-ink/60">{t.dept}</span>
                <span className={`font-semibold ${t.status === "Present" ? "text-emerald-600" : "text-amber-600"}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Class Timetable                                                */
/* ------------------------------------------------------------------ */
export function ClassTimetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [
    { time: "9:00–9:45", subject: "Mathematics", teacher: "S. Johnson", room: "101" },
    { time: "9:45–10:30", subject: "Physics", teacher: "M. Chen", room: "Lab 2" },
    { time: "10:30–11:15", subject: "English", teacher: "E. Watson", room: "205" },
    { time: "11:15–12:00", subject: "History", teacher: "R. Kumar", room: "210" },
    { time: "12:00–12:45", subject: "Chemistry", teacher: "M. Chen", room: "Lab 2" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Academics" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Class Timetable" subtitle="Grade 8-A · Weekly schedule" date="Term 2 · Week 6" />
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span className="w-24">Time</span>
              {days.map((d) => (
                <span key={d} className="flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {periods.map((p) => (
              <div key={p.time} className="px-4 py-3 flex">
                <span className="w-24 text-[9px] font-semibold text-ink/60">{p.time}</span>
                {[
                  { label: p.subject, teacher: p.teacher, room: p.room, color: "bg-violet-50 text-violet-700" },
                  { label: p.subject, teacher: p.teacher, room: p.room, color: "bg-amber-50 text-amber-700" },
                  { label: p.subject, teacher: p.teacher, room: p.room, color: "bg-emerald-50 text-emerald-700" },
                  { label: p.subject, teacher: p.teacher, room: p.room, color: "bg-rose-50 text-rose-700" },
                  { label: p.subject, teacher: p.teacher, room: p.room, color: "bg-indigo-50 text-indigo-700" },
                ].map((cell, ci) => (
                  <span key={ci} className={`flex-1 rounded-lg p-2 ${cell.color} text-[8px] font-bold`}>
                    <div className="font-semibold">{cell.label}</div>
                    <div className="text-ink/50 text-[8px]">{cell.teacher} · {cell.room}</div>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Teacher Timetable                                              */
/* ------------------------------------------------------------------ */
export function TeacherTimetable() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Academics" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Teacher Timetable" subtitle="Sarah Johnson · Mathematics" date="Week of 09 Nov 2026" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total periods" value="24" trend="This week" icon={LayoutDashboard} />
          <StatCard label="Conducted" value="18" trend="75%" icon={CheckCircle2} />
          <StatCard label="Remaining" value="6" trend="" icon={Clock} />
          <StatCard label="Classes" value="5" trend="Grade 6–10" icon={Users} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span className="w-24">Day</span>
              <span className="flex-1 text-center">Periods</span>
              <span className="text-center">Classes</span>
              <span className="text-right">Rooms</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { day: "Monday", periods: 5, classes: "6-A, 8-B", rooms: "101, 205" },
              { day: "Tuesday", periods: 4, classes: "7-A, 9-C", rooms: "102, 210" },
              { day: "Wednesday", periods: 5, classes: "8-A, 10-B", rooms: "101, 215" },
              { day: "Thursday", periods: 4, classes: "6-B, 9-A", rooms: "103, 205" },
              { day: "Friday", periods: 3, classes: "7-C, 8-C", rooms: "102, 210" },
            ].map((d) => (
              <div key={d.day} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900 w-24">{d.day}</span>
                <span className="text-ink/60 flex-1 text-center">{d.periods}</span>
                <span className="text-ink/60 text-center">{d.classes}</span>
                <span className="text-right text-ink/60">{d.rooms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Lesson Plans                                                  */
/* ------------------------------------------------------------------ */
export function LessonPlans() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Academics" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Lesson Plans" subtitle="Curriculum · materials · assignments" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Published" value="42" trend="This term" icon={FileText} />
          <StatCard label="Draft" value="6" trend="Pending review" icon={Clock} />
          <StatCard label="Subjects" value="8" trend="Active" icon={BookOpen} />
          <StatCard label="Classes" value="12" trend="Grade 1–10" icon={Users} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Topic</span>
              <span>Subject</span>
              <span className="text-right">Class</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { topic: "Quadratic Equations", subject: "Mathematics", cls: "10-A", status: "Published" },
              { topic: "Newton's Laws", subject: "Physics", cls: "9-B", status: "Published" },
              { topic: "Shakespeare", subject: "English", cls: "8-A", status: "Draft" },
              { topic: "Indus Valley", subject: "History", cls: "7-C", status: "Published" },
            ].map((l) => (
              <div key={l.topic} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{l.topic}</span>
                <span className="text-ink/60">{l.subject}</span>
                <span className={`text-right ${l.status === "Published" ? "text-emerald-600" : "text-amber-600"} font-bold`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  11. Examination Management                                        */
/* ------------------------------------------------------------------ */
export function ExaminationManagement() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Academics" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Examination Management" subtitle="Exam schedules · results · grading" date="Term 2 · 2026" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total exams" value="18" trend="Scheduled" icon={Calendar} />
          <StatCard label="Ongoing" value="3" trend="This week" icon={Activity} />
          <StatCard label="Completed" value="12" trend="Results out" icon={CheckCircle2} />
          <StatCard label="Upcoming" value="3" trend="Next 7 days" icon={Clock} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Exam</span>
              <span>Class</span>
              <span className="text-right">Date</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { exam: "Mid-term Mathematics", cls: "Grade 10", date: "14 Nov", status: "Scheduled" },
              { exam: "Unit Test Science", cls: "Grade 8", date: "16 Nov", status: "Scheduled" },
              { exam: "Final English", cls: "Grade 6", date: "20 Nov", status: "Upcoming" },
              { exam: "Terminal History", cls: "Grade 9", date: "22 Nov", status: "Upcoming" },
            ].map((e) => (
              <div key={e.exam} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{e.exam}</span>
                <span className="text-ink/60">{e.cls}</span>
                <span className="text-right text-ink/60 font-bold">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  12. Results and Marks                                             */
/* ------------------------------------------------------------------ */
export function ResultsMarks() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Results and Marks" subtitle="Grade cards · mark sheets · analytics" date="Term 2 Results" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Students graded" value="1,248" trend="100%" icon={Users} />
          <StatCard label="Average score" value="78.4%" trend="+2.3 pts" icon={Award} />
          <StatCard label="Distinctions" value="312" trend="25%" icon={CheckCircle2} />
          <StatCard label="Pending entry" value="4" trend="Teachers" icon={Clock} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Student</span>
              <span>Class</span>
              <span className="text-right">Grade</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { name: "Aarav Sharma", cls: "6-B", grade: "A+" },
              { name: "Diya Patel", cls: "8-A", grade: "A" },
              { name: "Kabir Rao", cls: "10-C", grade: "B+" },
              { name: "Isha Nair", cls: "7-B", grade: "A+" },
            ].map((r) => (
              <div key={r.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{r.name}</span>
                <span className="text-ink/60">{r.cls}</span>
                <span className={`text-right font-bold ${r.grade === "A+" ? "text-emerald-600" : "text-violet-600"}`}>{r.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  13. Finance Dashboard                                             */
/* ------------------------------------------------------------------ */
export function FinanceDashboard() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Finance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Finance Dashboard" subtitle="School finances · collections · pending" />
        <div className="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-4">
          <StatCard label="Today's collection" value="₹1,42,800" trend="" icon={IndianRupee} />
          <StatCard label="Receipts issued" value="23" trend="" icon={FileText} />
          <StatCard label="Pending dues" value="₹4.1L" trend="" icon={Clock} />
          <StatCard label="Collection rate" value="82%" trend="" icon={CheckCircle2} />
        </div>
        <div className="mt-4 grid grid-cols-[1.5fr_1fr] gap-4">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-navy-900">Collection trend</p>
              <span className="text-[8px] font-semibold text-emerald-600">+12.4%</span>
            </div>
            <div className="flex h-[72px] items-end gap-2">
              {[38, 52, 44, 68, 58, 78, 66, 84, 72, 92].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i > 7 ? "bg-violet-600" : "bg-violet-300"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Collection by mode</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "UPI", value: "58%", width: "58%" },
                { label: "Cash", value: "27%", width: "27%" },
                { label: "Card", value: "15%", width: "15%" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-[8px] text-ink/60">
                    <span>{row.label}</span>
                    <span className="font-bold text-navy-900">{row.value}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/5">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: row.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  14. Fee Collection                                                */
/* ------------------------------------------------------------------ */
export function FeeCollection() {
  const payments = [
    { student: "Aarav Sharma", cls: "6-B", head: "Term 2 fee", mode: "UPI", amount: "₹18,500", status: "Paid" },
    { student: "Diya Patel", cls: "8-A", head: "Transport", mode: "Cash", amount: "₹4,200", status: "Paid" },
    { student: "Kabir Rao", cls: "10-C", head: "Term 2 fee", mode: "Card", amount: "₹21,000", status: "Partial" },
    { student: "Isha Nair", cls: "7-B", head: "Exam fee", mode: "UPI", amount: "₹1,500", status: "Paid" },
    { student: "Reyan Ali", cls: "5-C", head: "Term 2 fee", mode: "UPI", amount: "₹12,000", status: "Pending" },
  ];
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Finance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Fee Collection" subtitle="Collect fees · issue receipts · track dues" date="Wednesday, 12 Nov · Shift 1" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Today's collection" value="₹1,42,800" trend="" icon={IndianRupee} />
          <StatCard label="Receipts issued" value="23" trend="" icon={FileText} />
          <StatCard label="Pending dues" value="₹4.1L" trend="" icon={Clock} />
          <StatCard label="Collection rate" value="82%" trend="" icon={CheckCircle2} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Student</span>
              <span>Class</span>
              <span>Fee head</span>
              <span className="text-right">Amount</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {payments.map((p) => (
              <div key={p.student} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-violet-700 text-[8px] font-bold">{p.student.charAt(0)}</div>
                  <div className="min-w-0">
                    <span className="font-semibold text-navy-900">{p.student}</span>
                    <br />
                    <span className="text-ink/50 text-[8px]">{p.head}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-ink/60">{p.cls}</span>
                  <span className="text-ink/60">{p.mode}</span>
                  <span className={`font-bold ${p.status === "Paid" ? "text-emerald-600" : p.status === "Partial" ? "text-amber-600" : "text-rose-600"}`}>{p.status}</span>
                  <span className="text-navy-900 font-bold">{p.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  15. Payment History                                               */
/* ------------------------------------------------------------------ */
export function PaymentHistory() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Finance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Payment History" subtitle="Transaction records · receipts · refunds" />
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Date</span>
              <span>Student</span>
              <span>Mode</span>
              <span className="text-right">Amount</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { date: "12 Nov 2026", student: "Aarav Sharma", mode: "UPI", amount: "₹18,500", ref: "UPI-98421" },
              { date: "11 Nov 2026", student: "Diya Patel", mode: "Cash", amount: "₹4,200", ref: "CSH-3312" },
              { date: "10 Nov 2026", student: "Kabir Rao", mode: "Card", amount: "₹10,500", ref: "CARD-7741" },
              { date: "09 Nov 2026", student: "Isha Nair", mode: "UPI", amount: "₹1,500", ref: "UPI-8823" },
              { date: "08 Nov 2026", student: "Reyan Ali", mode: "UPI", amount: "₹12,000", ref: "UPI-5519" },
            ].map((p) => (
              <div key={p.ref} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="text-ink/60 font-mono">{p.date}</span>
                <span className="font-semibold text-navy-900">{p.student}</span>
                <span className="text-ink/60">{p.mode}</span>
                <span className="text-right font-bold text-navy-900">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  16. Student Ledger                                                */
/* ------------------------------------------------------------------ */
export function StudentLedger() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Finance" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Student Ledger" subtitle="Per-student dues · payments · balance" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total ledgers" value="1,248" trend="All students" icon={Users} />
          <StatCard label="With balance due" value="89" trend="7%" icon={Clock} />
          <StatCard label="Total outstanding" value="₹4.1L" trend="" icon={IndianRupee} />
          <StatCard label="Overdue >30 days" value="12" trend="" icon={X} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Student</span>
              <span>Class</span>
              <span className="text-right">Balance</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { name: "Rohan Mehta", cls: "9-A", balance: "₹8,500", status: "Due" },
              { name: "Sanya Gupta", cls: "8-B", balance: "₹3,200", status: "Partial" },
              { name: "Arjun Reddy", cls: "3-C", balance: "₹1,200", status: "Due" },
            ].map((s) => (
              <div key={s.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{s.name}</span>
                <span className="text-ink/60">{s.cls}</span>
                <span className={`text-right font-bold ${s.status === "Due" ? "text-rose-600" : "text-amber-600"}`}>{s.balance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  17. Transport Management                                          */
/* ------------------------------------------------------------------ */
export function TransportManagement() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Transport" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Transport Management" subtitle="Routes · buses · student tracking" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Active buses" value="12" trend="" icon={Bus} />
          <StatCard label="Routes" value="8" trend="Active" icon={MapPin} />
          <StatCard label="Students onboard" value="642" trend="" icon={Users} />
          <StatCard label="On time" value="96%" trend="" icon={CheckCircle2} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Route</span>
              <span>Driver</span>
              <span>Students</span>
              <span className="text-right">Status</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { route: "Route 4 – North City", driver: "Rajesh Kumar", students: "58", status: "On time" },
              { route: "Route 7 – East Valley", driver: "Sunita Devi", students: "52", status: "On time" },
              { route: "Route 2 – West Hills", driver: "Mohammed Ali", students: "45", status: "Delayed 5 min" },
            ].map((t) => (
              <div key={t.route} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{t.route}</span>
                <span className="text-ink/60">{t.driver}</span>
                <span className="text-ink/60">{t.students}</span>
                <span className={`font-bold ${t.status === "On time" ? "text-emerald-600" : "text-amber-600"}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  18. Parent Communication                                          */
/* ------------------------------------------------------------------ */
export function ParentCommunication() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Messages" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Parent Communication" subtitle="Bulk messages · circulars · alerts" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Messages sent" value="1.2K" trend="This month" icon={MessageSquare} />
          <StatCard label="Delivered" value="98%" trend="" icon={CheckCircle2} />
          <StatCard label="Circulars" value="6" trend="Published" icon={FileText} />
          <StatCard label="Read rate" value="91%" trend="" icon={Bell} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Message</span>
              <span>Recipients</span>
              <span className="text-right">Sent</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { msg: "Parent-teacher meeting tomorrow", recipients: "All parents", time: "2h ago" },
              { msg: "Fee payment reminder", recipients: "Grade 8–10", time: "5h ago" },
              { msg: "School closure notice", recipients: "All classes", time: "1d ago" },
            ].map((m) => (
              <div key={m.msg} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{m.msg}</span>
                <span className="text-ink/60">{m.recipients}</span>
                <span className="text-right text-ink/60">{m.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  19. Messaging System                                              */
/* ------------------------------------------------------------------ */
export function MessagingSystem() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Messages" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Messaging System" subtitle="1:1 chat · teacher · parent · admin" />
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Conversation</span>
              <span>Last message</span>
              <span className="text-right">Time</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { user: "Sarah Johnson (Math)", last: "Homework for Chapter 5 assigned", time: "10m ago", unread: 2 },
              { user: "Diya Patel's parent", last: "Attendance update for today", time: "45m ago", unread: 0 },
              { user: "Principal office", last: "Staff meeting reminder", time: "2h ago", unread: 1 },
            ].map((c) => (
              <div key={c.user} className="px-4 py-3 flex items-center justify-between text-[8.5px] hover:bg-ink/5">
                <div className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-violet-700 text-[8px] font-bold">{c.user.charAt(0)}</div>
                  <span className="font-semibold text-navy-900 truncate max-w-[140px]">{c.user}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block truncate text-ink/60">{c.last}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] text-ink/50">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[8px] font-bold text-white">{c.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  20. Reports and Analytics                                         */
/* ------------------------------------------------------------------ */
export function ReportsAnalytics() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Reports and Analytics" subtitle="Academic · operational · financial reports" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Reports generated" value="48" trend="This month" icon={BarChart3} />
          <StatCard label="Export formats" value="3" trend="PDF · Excel · CSV" icon={Copy} />
          <StatCard label="Scheduled reports" value="8" trend="Auto-email" icon={Clock} />
          <StatCard label="Data freshness" value="Real-time" trend="" icon={Activity} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Report types</p>
            <div className="mt-3 space-y-2">
              {[
                "Attendance summary",
                "Fee collection report",
                "Student progress card",
                "Teacher workload",
                "Transport efficiency",
              ].map((r) => (
                <div key={r} className="flex items-center justify-between text-[8.5px]">
                  <span className="text-ink/60">{r}</span>
                  <span className="text-[8px] font-semibold text-violet-600">PDF</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Recent exports</p>
            <div className="mt-3 space-y-2">
              {[
                { name: "Monthly fee report", date: "12 Nov" },
                { name: "Attendance summary", date: "11 Nov" },
                { name: "Results analysis", date: "09 Nov" },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between text-[8.5px]">
                  <span className="font-semibold text-navy-900 truncate">{r.name}</span>
                  <span className="text-ink/60">{r.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  21. Library Management                                            */
/* ------------------------------------------------------------------ */
export function LibraryManagement() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Library Management" subtitle="Book catalogue · issues · returns" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total books" value="8,420" trend="" icon={BookOpen} />
          <StatCard label="Issued" value="312" trend="" icon={FileText} />
          <StatCard label="Available" value="8,108" trend="" icon={CheckCircle2} />
          <StatCard label="Overdue" value="18" trend="" icon={Clock} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Book</span>
              <span>Issued to</span>
              <span className="text-right">Due date</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { book: "Physics for Class 10", student: "Aarav Sharma", due: "18 Nov" },
              { book: "World History", student: "Diya Patel", due: "20 Nov" },
              { book: "Algebra Made Easy", student: "Kabir Rao", due: "15 Nov" },
            ].map((b) => (
              <div key={b.book} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900 truncate">{b.book}</span>
                <span className="text-ink/60">{b.student}</span>
                <span className="text-right text-ink/60 font-bold">{b.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  22. Leave Management                                              */
/* ------------------------------------------------------------------ */
export function LeaveManagement() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Dashboard" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Leave Management" subtitle="Staff leave · applications · approvals" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Pending requests" value="4" trend="" icon={Clock} />
          <StatCard label="Approved" value="12" trend="This month" icon={CheckCircle2} />
          <StatCard label="Rejected" value="1" trend="" icon={X} />
          <StatCard label="Total staff leave" value="17" trend="" icon={Users} />
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-4 py-3">
            <div className="flex items-center justify-between text-[9px] font-semibold text-ink/60 uppercase tracking-wider">
              <span>Staff member</span>
              <span>Leave type</span>
              <span className="text-right">Status</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { name: "Emily Watson", type: "Sick leave", status: "Approved" },
              { name: "Michael Chen", type: "Personal leave", status: "Pending" },
              { name: "Robert Kumar", type: "Casual leave", status: "Approved" },
            ].map((l) => (
              <div key={l.name} className="px-4 py-3 flex items-center justify-between text-[8.5px]">
                <span className="font-semibold text-navy-900">{l.name}</span>
                <span className="text-ink/60">{l.type}</span>
                <span className={`font-bold ${l.status === "Approved" ? "text-emerald-600" : "text-amber-600"}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  23. Settings and Administration                                   */
/* ------------------------------------------------------------------ */
export function SettingsAdmin() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-[#F7F5FF] text-navy-900">
      <Sidebar active="Settings" />
      <div className="min-w-0 flex-1 p-4 lg:p-6">
        <Header title="Settings and Administration" subtitle="School configuration · users · permissions" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Schools configured" value="412" trend="" icon={GraduationCap} />
          <StatCard label="Admin users" value="89" trend="" icon={UserRound} />
          <StatCard label="Roles defined" value="10" trend="" icon={ShieldCheckIcon} />
          <StatCard label="System version" value="v2.1.0" trend="" icon={MonitorIcon} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">Configuration</p>
            <div className="mt-3 space-y-2">
              {[
                "Academic year setup",
                "Grade & section structure",
                "Fee structure templates",
                "Transport routes",
                "Notification settings",
              ].map((c) => (
                <div key={c} className="flex items-center justify-between text-[8.5px]">
                  <span className="text-ink/60">{c}</span>
                  <ChevronRight className="h-3 w-3 text-ink/40" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold text-navy-900">User management</p>
            <div className="mt-3 space-y-2">
              {[
                { role: "Principal", count: "412" },
                { role: "Teacher", count: "3,840" },
                { role: "Cashier", count: "412" },
                { role: "Parent", count: "12,800" },
              ].map((u) => (
                <div key={u.role} className="flex items-center justify-between text-[8.5px]">
                  <span className="font-semibold text-navy-900">{u.role}</span>
                  <span className="text-ink/60 font-mono">{u.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon() { return <CheckCircle2 className="h-3 w-3" />; }
function MonitorIcon() { return <Activity className="h-3 w-3" />; }

/* ------------------------------------------------------------------ */
/*  Registry                                                          */
/* ------------------------------------------------------------------ */

export const LaptopScreens: { label: string; Component: () => JSX.Element }[] = [
  // Priority 12 modules (spec order)
  { label: "Dashboard Overview", Component: AdminDashboard },
  { label: "Student Management", Component: StudentManagement },
  { label: "Online Admissions", Component: AdmissionManagement },
  { label: "Automatic Attendance", Component: StudentAttendance },
  { label: "Parent Notifications", Component: MessagingSystem },
  { label: "Fee Management", Component: FeeCollection },
  { label: "Examination & Results", Component: ExaminationManagement },
  { label: "Homework & Assignments", Component: LessonPlans },
  { label: "Parent Communication", Component: ParentCommunication },
  { label: "Transport Management", Component: TransportManagement },
  { label: "Teacher & Staff Mgmt", Component: TeacherManagement },
  { label: "Reports & Analytics", Component: ReportsAnalytics },

  // Remaining modules
  { label: "Principal Dashboard", Component: PrincipalDashboard },
  { label: "Teacher Attendance", Component: TeacherAttendance },
  { label: "Class Timetable", Component: ClassTimetable },
  { label: "Teacher Timetable", Component: TeacherTimetable },
  { label: "Results and Marks", Component: ResultsMarks },
  { label: "Finance Dashboard", Component: FinanceDashboard },
  { label: "Payment History", Component: PaymentHistory },
  { label: "Student Ledger", Component: StudentLedger },
  { label: "Library Management", Component: LibraryManagement },
  { label: "Leave Management", Component: LeaveManagement },
  { label: "Settings & Admin", Component: SettingsAdmin },
];

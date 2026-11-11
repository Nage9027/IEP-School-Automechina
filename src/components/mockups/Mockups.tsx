import {
  Award,
  Bell,
  BookOpen,
  Bus,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Home,
  IndianRupee,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

function BrowserChrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ink/10 bg-white px-3 py-2.5">
      <span className="h-2 w-2 rounded-full bg-rose-400" />
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <div className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-ink/[0.04] px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="truncate text-[9px] font-semibold text-ink/65">{path}</span>
      </div>
      <span className="hidden rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-violet-600 sm:inline">
        Illustrative preview
      </span>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: GraduationCap, label: "Students" },
  { icon: CalendarCheck, label: "Attendance" },
  { icon: BookOpen, label: "Academics" },
  { icon: Wallet, label: "Finance" },
  { icon: Bus, label: "Transport" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-[15px] bg-[#F8F7FD] text-navy-900",
        className,
      )}
    >
      <div className="flex">
          <aside className="hidden w-[128px] shrink-0 flex-col border-r border-ink/[0.07] bg-white p-3 sm:flex">
            <div className="flex items-center gap-2">
              <img
                src="/brand/iep-schools-mark-transparent.png"
                alt=""
                className="h-6 w-auto"
              />
              <span className="text-[9px] font-extrabold leading-tight text-navy-900">
                IEP
                <br />
                Schools
              </span>
            </div>
            <div className="mt-4 space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[8px] font-semibold",
                    item.active
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-ink/60",
                  )}
                >
                  <item.icon className="h-2.5 w-2.5" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-lg border border-violet-100 bg-violet-50 p-2">
              <p className="text-[7px] font-bold text-violet-700">Academic year</p>
              <p className="mt-0.5 text-[7px] text-ink/55">2025–26 · Term 2</p>
            </div>
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[8px] font-semibold text-ink/60">
                  Monday, 09 Nov 2026
                </p>
                <p className="text-[13px] font-extrabold tracking-tight text-navy-900">
                  Good morning, Principal
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-ink/60 shadow-sm">
                  <Search className="h-3 w-3" />
                </span>
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white text-ink/60 shadow-sm">
                  <Bell className="h-3 w-3" />
                  <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-rose-500" />
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-[8px] font-bold text-white">
                  PS
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                { label: "Students", value: "1,248", trend: "+4.2%", icon: Users },
                { label: "Attendance", value: "94.2%", trend: "+1.8%", icon: CalendarCheck },
                { label: "Fee collected", value: "₹18.4L", trend: "82% of target", icon: IndianRupee },
                { label: "Staff present", value: "68/74", trend: "91.9%", icon: UserRound },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-ink/[0.06] bg-white p-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-semibold text-ink/60">
                      {stat.label}
                    </span>
                    <stat.icon className="h-3 w-3 text-violet-500" />
                  </div>
                  <p className="mt-1 text-[14px] font-extrabold tracking-tight text-navy-900">
                    {stat.value}
                  </p>
                  <p className="text-[7px] font-semibold text-emerald-600">
                    {stat.trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2 grid gap-2 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-xl border border-ink/[0.06] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-navy-900">
                      Attendance this week
                    </p>
                    <p className="text-[7px] text-ink/60">All classes · percentage</p>
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[7px] font-bold text-emerald-700">
                    <TrendingUp className="h-2 w-2" />
                    Healthy
                  </span>
                </div>
                <div className="mt-3 flex h-[74px] items-end gap-1.5">
                  {[72, 86, 80, 94, 88, 96].map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex h-[62px] w-full items-end rounded-sm bg-violet-50">
                        <div
                          className={cn(
                            "w-full rounded-sm",
                            index === 4 ? "bg-violet-600" : "bg-violet-300",
                          )}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[6px] font-semibold text-ink/60">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-ink/[0.06] bg-white p-3 shadow-sm">
                <p className="text-[9px] font-bold text-navy-900">Fee collection</p>
                <p className="text-[7px] text-ink/60">Term 2 progress</p>
                <div className="mt-3 flex items-center gap-3">
                  <div
                    className="relative grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#6D3BF5 0 82%, #EDE7FF 82% 100%)",
                    }}
                  >
                    <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white">
                      <span className="text-[10px] font-extrabold text-navy-900">82%</span>
                    </div>
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    {[
                      { label: "Collected", value: "₹18.4L", color: "bg-violet-600" },
                      { label: "Pending", value: "₹4.1L", color: "bg-amber-400" },
                      { label: "Concessions", value: "₹0.6L", color: "bg-ink/15" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-1.5">
                        <span className={cn("h-1.5 w-1.5 rounded-full", row.color)} />
                        <span className="text-[7px] text-ink/65">{row.label}</span>
                        <span className="ml-auto text-[7px] font-bold text-navy-900">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-ink/[0.06] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold text-navy-900">Recent activity</p>
                  <span className="text-[7px] font-semibold text-violet-600">View all</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {[
                    { icon: IndianRupee, text: "Fee receipt generated", meta: "Grade 6-B · 2m ago" },
                    { icon: CalendarCheck, text: "Attendance submitted", meta: "Grade 8-A · 9m ago" },
                    { icon: FileText, text: "Admission application", meta: "New enquiry · 24m ago" },
                  ].map((row) => (
                    <div key={row.text} className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-lg bg-violet-50 text-violet-600">
                        <row.icon className="h-2.5 w-2.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[8px] font-semibold text-navy-900">
                          {row.text}
                        </p>
                        <p className="text-[7px] text-ink/60">{row.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-ink/[0.06] bg-white p-3 shadow-sm">
                <p className="text-[9px] font-bold text-navy-900">Coming up</p>
                <div className="mt-2 space-y-1.5">
                  {[
                    { text: "Unit Test II", meta: "Grade 8 · 14 Nov" },
                    { text: "Parent-teacher meeting", meta: "All classes · 16 Nov" },
                    { text: "Route 4 safety audit", meta: "Transport · 18 Nov" },
                  ].map((row) => (
                    <div key={row.text} className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-lg bg-amber-50 text-amber-600">
                        <Clock className="h-2.5 w-2.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[8px] font-semibold text-navy-900">
                          {row.text}
                        </p>
                        <p className="text-[7px] text-ink/60">{row.meta}</p>
                      </div>
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

export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-[235px] sm:w-[252px] rounded-[38px] border-[8px] border-[#131126] bg-[#131126] shadow-[0_36px_90px_-28px_rgba(20,10,48,0.7)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-20 h-3.5 w-20 -translate-x-1/2 rounded-full bg-[#131126]" />
      <div className="overflow-hidden rounded-[30px] bg-[#F7F6FD]">
        {/* Top Header bar */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-700 px-3.5 pb-3 pt-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/15">
                <img
                  src="/brand/iep-schools-mark-transparent.png"
                  alt=""
                  className="h-3.5 w-auto brightness-0 invert"
                />
              </span>
              <div>
                <p className="text-[6.5px] font-bold uppercase tracking-wider text-white/80 leading-none">
                  IEP Schools
                </p>
                <p className="text-[9.5px] font-extrabold text-white leading-tight">
                  Parent App
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/15 text-white">
                <Bell className="h-3 w-3" />
                <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-rose-400" />
              </span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="border-b border-ink/[0.05] bg-white px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-purple-600 text-[10px] font-black text-white shadow-sm">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-[7.5px] font-semibold text-ink/50 leading-tight">
                Hello, Parent
              </p>
              <p className="truncate text-[10px] font-extrabold text-navy-900 leading-tight">
                Aarav Das <span className="text-[8px] font-medium text-ink/55">(Class 5-A)</span>
              </p>
            </div>
          </div>
        </div>

        {/* 6 Grid items */}
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Attendance", icon: CalendarCheck, color: "text-violet-600", bg: "bg-violet-50 ring-1 ring-violet-100" },
              { label: "Fees", icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50 ring-1 ring-amber-100" },
              { label: "Homework", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50 ring-1 ring-emerald-100" },
              { label: "Circulars", icon: Bell, color: "text-rose-600", bg: "bg-rose-50 ring-1 ring-rose-100" },
              { label: "Results", icon: Award, color: "text-sky-600", bg: "bg-sky-50 ring-1 ring-sky-100" },
              { label: "Transport", icon: Bus, color: "text-indigo-600", bg: "bg-indigo-50 ring-1 ring-indigo-100" },
            ].map((tile) => (
              <div
                key={tile.label}
                className="flex flex-col items-center justify-center rounded-xl border border-ink/[0.06] bg-white py-2.5 px-2 shadow-xs transition-transform hover:scale-[1.02]"
              >
                <span className={cn("grid h-7 w-7 place-items-center rounded-xl", tile.bg, tile.color)}>
                  <tile.icon className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1.5 text-[8.5px] font-bold text-navy-900">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t border-ink/[0.06] bg-white px-3 py-1.5">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-0.5 text-violet-600">
              <Home className="h-3.5 w-3.5" />
              <span className="text-[7px] font-bold">Home</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-ink/50">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-[7px] font-medium">Messages</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-ink/50">
              <UserRound className="h-3.5 w-3.5" />
              <span className="text-[7px] font-medium">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const financeRows = [
  { student: "Aarav Sharma", cls: "6-B", head: "Term 2 fee", mode: "UPI", amount: "₹18,500", status: "Paid" },
  { student: "Diya Patel", cls: "8-A", head: "Transport", mode: "Cash", amount: "₹4,200", status: "Paid" },
  { student: "Kabir Rao", cls: "10-C", head: "Term 2 fee", mode: "Card", amount: "₹21,000", status: "Partial" },
  { student: "Isha Nair", cls: "7-B", head: "Exam fee", mode: "UPI", amount: "₹1,500", status: "Paid" },
];

export function FinanceMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-[26px] border border-ink/10 bg-navy-900 p-2 shadow-[0_34px_90px_-40px_rgba(7,11,34,0.5)]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[19px] bg-[#F7F6FC]">
        <BrowserChrome path="sch.iepsolutions.in/finance" />
        <div className="flex">
          <aside className="hidden w-[116px] shrink-0 bg-navy-950 p-3 text-white sm:block">
            <div className="flex items-center gap-1.5">
              <img
                src="/brand/iep-schools-mark-transparent.png"
                alt=""
                className="h-5 w-auto"
              />
              <span className="text-[8px] font-extrabold">IEP Schools</span>
            </div>
            <div className="mt-4 space-y-1">
              {[
                { icon: LayoutDashboard, label: "Overview" },
                { icon: IndianRupee, label: "Collect fees", active: true },
                { icon: FileText, label: "Ledger" },
                { icon: ClipboardList, label: "Reports" },
                { icon: CheckCircle2, label: "Receipts" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[7px] font-semibold",
                    item.active ? "bg-violet-600 text-white" : "text-white/65",
                  )}
                >
                  <item.icon className="h-2.5 w-2.5" />
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="text-[6px] text-white/55">Cashier shift</p>
              <p className="mt-0.5 text-[7px] font-bold text-white/80">Open · 09:00</p>
            </div>
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[7px] font-semibold uppercase tracking-wider text-violet-600">
                  Finance workspace
                </p>
                <p className="text-[13px] font-extrabold tracking-tight text-navy-900">
                  Fee collection
                </p>
                <p className="text-[7px] text-ink/60">Wednesday, 12 November · Shift 1</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-bold text-emerald-700">
                Live ledger
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: "Today's collection", value: "₹1,42,800" },
                { label: "Receipts issued", value: "23" },
                { label: "Pending follow-up", value: "₹4.1L" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-ink/[0.06] bg-white p-2 shadow-sm"
                >
                  <p className="text-[6px] font-semibold text-ink/60">{stat.label}</p>
                  <p className="mt-0.5 text-[11px] font-extrabold text-navy-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2 overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-ink/[0.06] px-2.5 py-2">
                <p className="text-[8px] font-bold text-navy-900">Recent payments</p>
                <span className="text-[6px] font-semibold text-violet-600">
                  Export · Filter
                </span>
              </div>
              <div className="grid grid-cols-[1.4fr_0.5fr_1fr_0.7fr_0.7fr] gap-1 bg-ink/[0.02] px-2.5 py-1 text-[6px] font-bold uppercase tracking-wide text-ink/60">
                <span>Student</span>
                <span>Class</span>
                <span>Fee head</span>
                <span>Mode</span>
                <span className="text-right">Amount</span>
              </div>
              {financeRows.map((row) => (
                <div
                  key={row.student}
                  className="grid grid-cols-[1.4fr_0.5fr_1fr_0.7fr_0.7fr] items-center gap-1 border-t border-ink/[0.04] px-2.5 py-1.5"
                >
                  <span className="truncate text-[7px] font-semibold text-navy-900">
                    {row.student}
                  </span>
                  <span className="text-[6px] text-ink/60">{row.cls}</span>
                  <span className="truncate text-[6px] text-ink/60">{row.head}</span>
                  <span className="text-[6px] text-ink/60">{row.mode}</span>
                  <span className="text-right text-[7px] font-bold text-navy-900">
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-[1.3fr_1fr] gap-2">
              <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-bold text-navy-900">Collection trend</p>
                  <span className="text-[6px] font-semibold text-emerald-600">+12.4%</span>
                </div>
                <div className="mt-2 flex h-12 items-end gap-1">
                  {[38, 52, 44, 68, 58, 78, 66, 84, 72, 92].map((height, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex-1 rounded-sm",
                        index > 7 ? "bg-violet-600" : "bg-violet-200",
                      )}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5 shadow-sm">
                <p className="text-[8px] font-bold text-navy-900">Collection by mode</p>
                <div className="mt-2 space-y-1.5">
                  {[
                    { label: "UPI", value: "58%", width: "58%" },
                    { label: "Cash", value: "27%", width: "27%" },
                    { label: "Card", value: "15%", width: "15%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-[6px] text-ink/60">
                        <span>{row.label}</span>
                        <span className="font-bold text-navy-900">{row.value}</span>
                      </div>
                      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-ink/5">
                        <div
                          className="h-full rounded-full bg-violet-500"
                          style={{ width: row.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

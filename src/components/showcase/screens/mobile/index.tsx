"use client";

import {
  Award,
  Bell,
  Bus,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  FileText,
  Home,
  IndianRupee,
  MessageSquare,
  UserRound,
} from "lucide-react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-[235px] sm:w-[252px] rounded-[38px] border-[8px] border-[#131126] bg-[#131126] shadow-[0_36px_90px_-28px_rgba(20,10,48,0.7)] ring-1 ring-white/10"
    >
      <div className="absolute left-1/2 top-2 z-20 h-3.5 w-20 -translate-x-1/2 rounded-full bg-[#131126]" />
      <div className="overflow-hidden rounded-[30px] bg-[#F7F6FD]">{children}</div>
    </div>
  );
}

function PhoneHeader({ title }: { title: string }) {
  return (
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
              {title}
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
  );
}

function UserCard({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="border-b border-ink/[0.05] bg-white px-3.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-purple-600 text-[10px] font-black text-white shadow-sm">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-[7.5px] font-semibold text-ink/50 leading-tight">
            Hello, Parent
          </p>
          <p className="truncate text-[10px] font-extrabold text-navy-900 leading-tight">
            {name} <span className="text-[8px] font-medium text-ink/55">({cls})</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function GridTile({
  label,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-ink/[0.06] bg-white py-2.5 px-2 shadow-xs transition-transform hover:scale-[1.02]">
      <span className={`grid h-7 w-7 place-items-center rounded-xl ${bg} ${color}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="mt-1.5 text-[8.5px] font-bold text-navy-900">{label}</span>
    </div>
  );
}

export function ParentDashboard() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Parent App" />
      <UserCard name="Aarav Das" cls="Class 5-A" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          <GridTile label="Attendance" icon={CalendarCheck} color="text-violet-600" bg="bg-violet-50 ring-1 ring-violet-100" />
          <GridTile label="Fees" icon={IndianRupee} color="text-amber-600" bg="bg-amber-50 ring-1 ring-amber-100" />
          <GridTile label="Homework" icon={FileText} color="text-emerald-600" bg="bg-emerald-50 ring-1 ring-emerald-100" />
          <GridTile label="Circulars" icon={Bell} color="text-rose-600" bg="bg-rose-50 ring-1 ring-rose-100" />
          <GridTile label="Results" icon={Award} color="text-sky-600" bg="bg-sky-50 ring-1 ring-sky-100" />
          <GridTile label="Transport" icon={Bus} color="text-indigo-600" bg="bg-indigo-50 ring-1 ring-indigo-100" />
        </div>
      </div>
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
    </PhoneFrame>
  );
}

export function ChildProfile() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Child Profile" />
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr from-violet-600 to-purple-600 text-[12px] font-black text-white shadow-sm">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-[8px] font-bold text-navy-900">Aarav Das</p>
            <p className="text-[7px] text-ink/60">Class 5-A · Roll No. 12</p>
            <p className="text-[7px] text-ink/60">Admission: ADM-2024-0512</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { label: "Date of birth", value: "14 Mar 2016" },
            { label: "Blood group", value: "B+" },
            { label: "Parent phone", value: "+91 98765 43210" },
            { label: "Emergency contact", value: "+91 98765 43211" },
            { label: "Address", value: "124, Sunny Enclave, Mohali" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-1.5 border-b border-ink/[0.04]">
              <span className="text-[8px] text-ink/60">{item.label}</span>
              <span className="text-[8px] font-semibold text-navy-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AttendanceDetails() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Attendance" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5">
            <p className="text-[7px] font-semibold text-ink/60">Overall attendance</p>
            <p className="mt-1 text-[14px] font-extrabold text-navy-900">94.2%</p>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5">
            <p className="text-[7px] font-semibold text-ink/60">Days present</p>
            <p className="mt-1 text-[14px] font-extrabold text-navy-900">117 / 124</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <p className="text-[8px] font-bold text-navy-900">Daily attendance</p>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { date: "12 Nov 2026", day: "Wed", status: "Present", pct: "100%" },
              { date: "11 Nov 2026", day: "Tue", status: "Present", pct: "100%" },
              { date: "10 Nov 2026", day: "Mon", status: "Present", pct: "100%" },
              { date: "09 Nov 2026", day: "Sun", status: "Holiday", pct: "—" },
              { date: "08 Nov 2026", day: "Sat", status: "Present", pct: "80%" },
              { date: "07 Nov 2026", day: "Fri", status: "Present", pct: "100%" },
            ].map((a) => (
              <div key={a.date} className="px-3 py-2 flex items-center justify-between text-[7.5px]">
                <div className="flex items-center gap-2">
                  <span className="text-ink/60 font-mono">{a.date}</span>
                  <span className="text-ink/50 text-[6.5px]">{a.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${a.status === "Present" ? "text-emerald-600" : a.status === "Holiday" ? "text-ink/40" : "text-amber-600"}`}>{a.status}</span>
                  <span className="text-ink/60">{a.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function DailyAttendanceStatus() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Today's Attendance" />
      <div className="p-3">
        <div className="rounded-xl border border-ink/[0.06] bg-white p-3 mb-3">
          <p className="text-[8px] font-semibold text-ink/60">Wednesday, 12 Nov 2026</p>
          <p className="mt-1 text-[16px] font-extrabold text-navy-900">Present</p>
          <p className="mt-1 text-[7px] text-emerald-600 font-semibold">All classes attended today</p>
        </div>
        <div className="space-y-2">
          {[
            { period: "1st", time: "9:00–9:45", subject: "Mathematics", status: "Present" },
            { period: "2nd", time: "9:45–10:30", subject: "Science", status: "Present" },
            { period: "3rd", time: "10:30–11:15", subject: "English", status: "Present" },
            { period: "4th", time: "11:15–12:00", subject: "History", status: "Present" },
            { period: "5th", time: "12:00–12:45", subject: "Physical Education", status: "Present" },
          ].map((p) => (
            <div key={p.period} className="flex items-center justify-between p-2 rounded-lg border border-ink/[0.06] bg-white">
              <div>
                <span className="text-[7px] font-semibold text-navy-900">{p.subject}</span>
                <br />
                <span className="text-[6.5px] text-ink/50">{p.time}</span>
              </div>
              <span className="text-[7px] font-bold text-emerald-600">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function FeeDetails() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Fees" />
      <div className="p-3">
        <div className="rounded-xl border border-ink/[0.06] bg-white p-3 mb-3">
          <p className="text-[8px] font-semibold text-ink/60">Term 2 Fee</p>
          <p className="mt-1 text-[16px] font-extrabold text-navy-900">₹18,500</p>
          <p className="mt-1 text-[7px] text-emerald-600 font-semibold">Paid · 08 Nov 2026</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <p className="text-[8px] font-bold text-navy-900">Fee breakdown</p>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { head: "Tuition fee", amount: "₹14,000" },
              { head: "Transport fee", amount: "₹3,000" },
              { head: "Activity fee", amount: "₹1,500" },
            ].map((f) => (
              <div key={f.head} className="px-3 py-2 flex items-center justify-between text-[7.5px]">
                <span className="text-ink/60">{f.head}</span>
                <span className="font-bold text-navy-900">{f.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function PaymentReceipts() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Receipts" />
      <div className="p-3">
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <p className="text-[8px] font-bold text-navy-900">Payment receipts</p>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { date: "08 Nov 2026", head: "Term 2 fee", amount: "₹18,500", mode: "UPI", ref: "RCP-88421" },
              { date: "15 Oct 2026", head: "Transport fee", amount: "₹3,000", mode: "Cash", ref: "RCP-77102" },
              { date: "01 Sep 2026", head: "Activity fee", amount: "₹1,500", mode: "UPI", ref: "RCP-65411" },
            ].map((r) => (
              <div key={r.ref} className="px-3 py-2.5 flex items-center justify-between text-[7.5px]">
                <div>
                  <span className="font-semibold text-navy-900">{r.head}</span>
                  <br />
                  <span className="text-[6.5px] text-ink/50">{r.date}</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-navy-900">{r.amount}</span>
                  <span className="block text-[6.5px] text-ink/50">{r.mode} · {r.ref}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Homework() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Homework" />
      <div className="p-3">
        <div className="space-y-2">
          {[
            { subject: "Mathematics", title: "Exercise 5.1 – Q1 to Q10", due: "13 Nov", class: "5-A" },
            { subject: "Science", title: "Chapter 3 – Questions & Answers", due: "14 Nov", class: "5-A" },
            { subject: "English", title: "Essay: 'My School' (150 words)", due: "16 Nov", class: "5-A" },
          ].map((h) => (
            <div key={h.subject} className="flex items-center justify-between p-3 rounded-xl border border-ink/[0.06] bg-white">
              <div>
                <span className="block text-[7px] font-semibold text-violet-600 uppercase">{h.subject}</span>
                <span className="block mt-0.5 text-[8px] font-semibold text-navy-900">{h.title}</span>
                <span className="block mt-0.5 text-[6.5px] text-ink/50">{h.class} · Due {h.due}</span>
              </div>
              <span className="text-[7px] font-bold text-ink/60">Not submitted</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function ExaminationResults() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Results" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5">
            <p className="text-[7px] font-semibold text-ink/60">Average score</p>
            <p className="mt-1 text-[14px] font-extrabold text-navy-900">78.4%</p>
          </div>
          <div className="rounded-xl border border-ink/[0.06] bg-white p-2.5">
            <p className="text-[7px] font-semibold text-ink/60">Grade</p>
            <p className="mt-1 text-[14px] font-extrabold text-emerald-600">A</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <p className="text-[8px] font-bold text-navy-900">Term 2 results</p>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { subject: "Mathematics", marks: "85/100", grade: "A" },
              { subject: "Science", marks: "78/100", grade: "B+" },
              { subject: "English", marks: "82/100", grade: "A" },
              { subject: "History", marks: "71/100", grade: "B+" },
            ].map((r) => (
              <div key={r.subject} className="px-3 py-2 flex items-center justify-between text-[7.5px]">
                <span className="text-ink/60">{r.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="text-ink/50">{r.marks}</span>
                  <span className={`font-bold ${r.grade === "A" ? "text-emerald-600" : "text-violet-600"}`}>{r.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Timetable() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Timetable" />
      <div className="p-3">
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <div className="flex text-[7px] font-semibold text-ink/60 uppercase tracking-wider">
              <span className="w-20">Time</span>
              <span className="flex-1">Subject</span>
              <span className="text-right">Room</span>
            </div>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { time: "9:00–9:45", subject: "Mathematics", room: "101" },
              { time: "9:45–10:30", subject: "Science", room: "Lab 2" },
              { time: "10:30–11:15", subject: "English", room: "205" },
              { time: "11:15–12:00", subject: "History", room: "210" },
            ].map((t) => (
              <div key={t.time} className="px-3 py-2 flex items-center justify-between text-[7.5px]">
                <span className="w-20 text-ink/60 font-mono">{t.time}</span>
                <span className="flex-1 font-semibold text-navy-900">{t.subject}</span>
                <span className="text-right text-ink/60">{t.room}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function SchoolCirculars() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Circulars" />
      <div className="p-3">
        <div className="space-y-2">
          {[
            { title: "Parent-Teacher Meeting", date: "15 Nov 2026", type: "General" },
            { title: "Winter Break Schedule", date: "10 Nov 2026", type: "Holiday" },
            { title: "Annual Day Rehearsal", date: "05 Nov 2026", type: "Event" },
          ].map((c) => (
            <div key={c.title} className="flex items-center justify-between p-3 rounded-xl border border-ink/[0.06] bg-white">
              <div>
                <span className="block text-[7px] font-semibold text-rose-600 uppercase">{c.type}</span>
                <span className="block mt-0.5 text-[8px] font-bold text-navy-900">{c.title}</span>
                <span className="block mt-0.5 text-[6.5px] text-ink/50">{c.date}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-ink/40" />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function Notifications() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Notifications" />
      <div className="p-3">
        <div className="space-y-2">
          {[
            { title: "Fee payment confirmed", body: "Term 2 fee of ₹18,500 received", time: "2h ago", type: "fee" },
            { title: "New homework assigned", body: "Mathematics – Exercise 5.1", time: "5h ago", type: "homework" },
            { title: "School circular published", body: "Parent-teacher meeting schedule", time: "1d ago", type: "circular" },
          ].map((n) => (
            <div key={n.title} className="flex items-start gap-2 p-3 rounded-xl border border-ink/[0.06] bg-white">
              <div className={`mt-0.5 ${n.type === "fee" ? "text-emerald-600" : n.type === "homework" ? "text-violet-600" : "text-rose-600"}`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] font-bold text-navy-900">{n.title}</span>
                <span className="block mt-0.5 text-[6.5px] text-ink/60">{n.body}</span>
                <span className="block text-[6.5px] text-ink/40">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function TransportUpdates() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Transport" />
      <div className="p-3">
        <div className="rounded-xl border border-ink/[0.06] bg-white p-3 mb-3">
          <p className="text-[8px] font-semibold text-ink/60">Route 4 – North City</p>
          <p className="mt-1 text-[14px] font-extrabold text-emerald-600">On time</p>
          <p className="mt-1 text-[7px] text-ink/50">Bus no. MH-12-A-4401 · Driver: Rajesh Kumar</p>
        </div>
        <div className="space-y-2">
          {[
            { stop: "Stop 1 – Sunny Enclave", time: "7:45 AM", status: "Pickup" },
            { stop: "Stop 2 – Green Valley", time: "7:55 AM", status: "Pickup" },
            { stop: "Stop 3 – Central Mall", time: "8:05 AM", status: "Pickup" },
            { stop: "School – Main Gate", time: "8:30 AM", status: "Drop-off" },
          ].map((s) => (
            <div key={s.stop} className="flex items-center justify-between p-2 rounded-lg border border-ink/[0.06] bg-white">
              <div>
                <span className="block text-[7px] font-bold text-navy-900">{s.stop}</span>
                <span className="block text-[6.5px] text-ink/50">{s.time}</span>
              </div>
              <span className="text-[7px] font-bold text-ink/60">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function TeacherCommunication() {
  return (
    <PhoneFrame>
      <PhoneHeader title="Messages" />
      <div className="p-3">
        <div className="overflow-hidden rounded-xl border border-ink/[0.06] bg-white shadow-sm">
          <div className="border-b border-ink/[0.04] bg-ink/[0.02] px-3 py-2">
            <p className="text-[8px] font-bold text-navy-900">Conversations</p>
          </div>
          <div className="divide-y divide-ink/[0.04]">
            {[
              { user: "Sarah Johnson (Math)", last: "Homework for Chapter 5 assigned", time: "10m ago", unread: 2 },
              { user: "Michael Chen (Science)", last: "Lab practical schedule", time: "1d ago", unread: 0 },
            ].map((c) => (
              <div key={c.user} className="px-3 py-2.5 flex items-center justify-between text-[7.5px] hover:bg-ink/5">
                <div className="flex items-center gap-2">
                  <div className="grid h-5 w-5 place-items-center rounded-full bg-violet-50 text-violet-700 text-[7px] font-bold">{c.user.charAt(0)}</div>
                  <span className="font-bold text-navy-900 truncate">{c.user}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block truncate text-ink/60">{c.last}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[6.5px] text-ink/50">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[7px] font-bold text-white">{c.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

export const MobileScreens: { label: string; Component: () => JSX.Element }[] = [
  { label: "Parent Dashboard", Component: ParentDashboard },
  { label: "Child Profile", Component: ChildProfile },
  { label: "Attendance Details", Component: AttendanceDetails },
  { label: "Daily Attendance", Component: DailyAttendanceStatus },
  { label: "Fee Details", Component: FeeDetails },
  { label: "Payment Receipts", Component: PaymentReceipts },
  { label: "Homework", Component: Homework },
  { label: "Examination Results", Component: ExaminationResults },
  { label: "Timetable", Component: Timetable },
  { label: "School Circulars", Component: SchoolCirculars },
  { label: "Notifications", Component: Notifications },
  { label: "Transport Updates", Component: TransportUpdates },
  { label: "Teacher Communication", Component: TeacherCommunication },
];

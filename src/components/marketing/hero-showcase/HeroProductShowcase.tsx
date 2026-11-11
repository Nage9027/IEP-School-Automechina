"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity, ArrowLeft, Award, BarChart3, Bell, Book, BookOpen, Bus, 
  Calendar, CalendarCheck, CheckCircle2, ChevronRight, Clock, Copy, 
  FileText, GraduationCap, IndianRupee, LayoutDashboard, Mail, MapPin, 
  MessageCircle, MessageSquare, MonitorSmartphone, Play, Pause, Plus, 
  Search, Settings, Smartphone, Star, TrendingUp, UserRound, Users, Wallet, X,
} from "lucide-react";
import {
  DESKTOP_SCREENS,
  MOBILE_SCREENS,
  NOTIFICATIONS,
  type DesktopScreen,
  type MobileScreen,
  type NotificationItem,
} from "./showcaseData";
import "./HeroProductShowcase.css";
import { cn } from "@/lib/utils";

const ROTATION_INTERVAL_MS = 6000;

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                      */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Activity, ArrowLeft, Award, BarChart3, Bell, Book, BookOpen, Bus, Calendar,
  CalendarCheck, CheckCircle2, ChevronRight, Clock, Copy, FileText, GraduationCap,
  IndianRupee, LayoutDashboard, Mail, MapPin, MessageCircle, MessageSquare,
  MonitorSmartphone, Plus, Search, Settings, Smartphone, Star, TrendingUp,
  UserRound, Users, Wallet, X,
};

function resolveIcon(name: string) {
  return ICON_MAP[name] || LayoutDashboard;
}

/* ------------------------------------------------------------------ */
/*  Desktop Screen Elements                                           */
/* ------------------------------------------------------------------ */

function StatCard({ label, value, trend, iconName }: { label: string; value: string; trend?: string; iconName: string; }) {
  const Icon = resolveIcon(iconName);
  return (
    <div className="ips-stat-card p-2 sm:p-3 lg:p-4">
      <div className="flex items-center justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
        <span className="ips-stat-label text-[8px] sm:text-[10px]">{label}</span>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-violet-600" />
      </div>
      <p className="ips-stat-value text-[12px] sm:text-[16px] lg:text-[18px]">{value}</p>
      {trend && <p className="ips-stat-trend mt-0.5 text-[6px] sm:text-[8px]">{trend}</p>}
    </div>
  );
}

function DashboardCard({ title, description, iconName, color, value }: { title: string; description: string; iconName: string; color: string; value?: string; }) {
  const Icon = resolveIcon(iconName);
  return (
    <div className="rounded-lg sm:rounded-xl border border-[var(--ips-border-lavender)] bg-white p-2 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-1 sm:mb-3">
        <div>
          <p className="text-[8px] sm:text-[10px] font-bold text-[var(--ips-text-navy)]">{title}</p>
          <p className="text-[6px] sm:text-[8px] text-[var(--ips-text-muted)]">{description}</p>
        </div>
        <Icon className={cn("h-3 w-3 sm:h-5 sm:w-5", color)} />
      </div>
      {value && <p className={cn("text-[9px] sm:text-[12px] font-bold text-[var(--ips-text-navy)] mt-1 sm:mt-2", color)}>{value}</p>}
    </div>
  );
}

function ListItem({ label, status, time }: { label: string; status: string; time?: string; }) {
  const isPositive = status.includes("Present") || status.includes("Approved") || status === "Completed" || status.includes("Paid");
  return (
    <div className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-2 text-[6px] sm:text-[8px]">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <span className="font-semibold text-[var(--ips-text-navy)] truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1 text-right">
        <span className={cn("font-semibold", isPositive ? "text-emerald-600" : "text-amber-600")}>{status}</span>
        {time && <span className="text-[var(--ips-text-muted)] ml-1 hidden sm:inline">{time}</span>}
      </div>
    </div>
  );
}

function DesktopScreen({ screen, className }: { screen: DesktopScreen; className?: string }) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-5 flex-shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="grid h-4 w-4 sm:h-6 sm:w-6 place-items-center rounded bg-violet-100/80 text-violet-700">
            <SchoolIcon className="h-2 w-2 sm:h-3 sm:w-3" />
          </div>
          <div>
            <p className="text-[7px] sm:text-[9px] font-bold text-[var(--ips-text-navy)] leading-none">IEP Schools</p>
            <p className="text-[5px] sm:text-[7px] text-[var(--ips-text-muted)] leading-none">Smart Education</p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="grid h-4 w-4 sm:h-6 sm:w-6 place-items-center rounded-full bg-white text-[var(--ips-text-muted)] shadow-sm"><Search className="h-2 w-2 sm:h-3 sm:w-3" /></div>
          <div className="relative grid h-4 w-4 sm:h-6 sm:w-6 place-items-center rounded-full bg-white text-[var(--ips-text-muted)] shadow-sm">
            <Bell className="h-2 w-2 sm:h-3 sm:w-3" />
            <span className="absolute right-1 top-1 h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-rose-500" />
          </div>
          <div className="grid h-4 w-4 sm:h-6 sm:w-6 place-items-center rounded-full bg-violet-600 text-[6px] sm:text-[8px] font-bold text-white">AD</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-4 mb-2 sm:mb-5 flex-shrink-0">
        {screen.stats.map((stat) => <StatCard key={stat.label} iconName="LayoutDashboard" {...stat} />)}
      </div>

      <div className="grid gap-1.5 sm:gap-5 lg:grid-cols-[1.5fr_1fr] mb-2 sm:mb-5 flex-1 min-h-0">
        <div className="space-y-1.5 sm:space-y-4">
          {screen.cards.map((card) => <DashboardCard key={card.title} iconName={card.icon} {...card} />)}
        </div>
        <div className="rounded-lg sm:rounded-xl border border-[var(--ips-border-lavender)] bg-white p-2 sm:p-4 shadow-sm min-h-[80px] sm:min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-5 h-5 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-violet-100 border-t-violet-600 animate-spin mx-auto mb-1 sm:mb-2" />
            <p className="text-[6px] sm:text-[10px] font-semibold text-[var(--ips-text-navy)]">Live Data</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg sm:rounded-xl border border-[var(--ips-border-lavender)] bg-white shadow-sm overflow-hidden flex-1 min-h-0">
        <div className="border-b border-[var(--ips-border-lavender)] bg-[var(--ips-bg-lavender)] px-2 sm:px-4 py-1 sm:py-3 flex-shrink-0">
          <p className="text-[7px] sm:text-[9px] font-semibold text-[var(--ips-text-navy)] uppercase tracking-wider">Recent Activity</p>
        </div>
        <div className="divide-y divide-[var(--ips-border-lavender)] overflow-y-auto flex-1">
          {screen.listItems?.map((item) => <ListItem key={item.label} {...item} />)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Screen Elements                                            */
/* ------------------------------------------------------------------ */

function MobileTile({ label, iconName, color }: { label: string; iconName: string; color: string }) {
  const Icon = resolveIcon(iconName);
  const iconBgClass = color.replace("text-", "").replace("-600", "").replace("-500", "");
  return (
    <div className="ips-mobile-tile">
      <div className={cn("ips-mobile-tile-icon", `text-${iconBgClass}-600`)}>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
      </div>
      <span className="ips-mobile-tile-label text-[6px] sm:text-[8px]">{label}</span>
    </div>
  );
}

function MobileListItem({ title, subtitle, time, type }: { title: string; subtitle: string; time?: string; type?: string; }) {
  const timeColorClass = type === "success" ? "ips-mobile-list-item-time success" : type === "warning" ? "ips-mobile-list-item-time warning" : type === "alert" ? "ips-mobile-list-item-time alert" : "ips-mobile-list-item-time info";
  return (
    <div className="ips-mobile-list-item py-1 sm:py-2">
      <div className="ips-mobile-list-item-content">
        <span className="ips-mobile-list-item-title text-[6px] sm:text-[8px]">{title}</span>
        <span className="ips-mobile-list-item-subtitle text-[5px] sm:text-[7px]">{subtitle}</span>
      </div>
      {time && <span className={cn(timeColorClass, "text-[5px] sm:text-[7px]")}>{time}</span>}
    </div>
  );
}

function MobileScreen({ screen, className }: { screen: MobileScreen; className?: string }) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="ips-mobile-statusbar text-[5px] sm:text-[7px] py-1 sm:py-2 px-2 sm:px-3">
        <span>9:41</span>
        <div className="ips-signal flex items-center gap-1">
          <div className="ips-signal-dot" /><span>LTE</span><div className="ips-signal-dot" />
        </div>
      </div>
      <div className="ips-mobile-header flex-shrink-0 py-1.5 sm:py-3 px-2 sm:px-3">
        <div className="ips-mobile-header-content flex items-center justify-between">
          <div className="ips-mobile-header-brand flex items-center gap-1.5 sm:gap-2">
            <div className="ips-mobile-header-logo">
              <img src="/brand/iep-schools-mark-transparent.png" alt="" className="h-2.5 sm:h-3 w-auto brightness-0 invert" />
            </div>
            <div className="ips-mobile-header-text">
              <p className="ips-mobile-header-label text-[5px] sm:text-[7px]">IEP Schools</p>
              <p className="ips-mobile-header-title text-[7px] sm:text-[9px]">{screen.title}</p>
            </div>
          </div>
          <div className="ips-mobile-header-actions">
            <button className="ips-mobile-header-btn" aria-label="Notifications">
              <Bell className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="ips-mobile-tiles gap-1 sm:gap-2 p-1.5 sm:p-3">
        {screen.tiles.map((tile) => <MobileTile key={tile.label} iconName={tile.icon} {...tile} />)}
      </div>
      <div className="ips-mobile-list space-y-0.5 sm:space-y-2 px-1.5 sm:px-3">
        {screen.items.map((item) => <MobileListItem key={item.title} {...item} />)}
      </div>
      <div className="ips-mobile-bottom-nav py-1 sm:py-2 mt-auto">
        <button className="active" aria-label="Home"><MonitorSmartphone className="h-3 w-3 sm:h-5 sm:w-5" /><span className="text-[5px] sm:text-[7px]">Home</span></button>
        <button aria-label="Messages"><MessageSquare className="h-3 w-3 sm:h-5 sm:w-5" /><span className="text-[5px] sm:text-[7px]">Messages</span></button>
        <button aria-label="Profile"><UserRound className="h-3 w-3 sm:h-5 sm:w-5" /><span className="text-[5px] sm:text-[7px]">Profile</span></button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Notifications                                            */
/* ------------------------------------------------------------------ */

function NotificationCard({ notification, x, y }: { notification: NotificationItem; x: number; y: number; }) {
  const Icon = resolveIcon(notification.icon);
  const typeClass = "ips-notification-" + notification.type;
  
  return (
    <div
      className={cn("ips-notification-card absolute", typeClass)}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex items-start gap-1.5 sm:gap-2">
        <div className={cn("ips-notification-icon mt-0.5", typeClass)}>
          <Icon className="h-2 w-2 sm:h-3 sm:w-3" />
        </div>
        <div className="min-w-0">
          <p className="ips-notification-title text-[6px] sm:text-[8px]">{notification.title}</p>
          <p className="ips-notification-subtitle text-[5px] sm:text-[7px]">{notification.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function FloatingNotifications() {
  // Hardcoded positions to sit around the edges without covering the dashboard.
  const fixedCards = [
    { id: 1, x: 0, y: 15, notificationId: 0 },   // Top Left (Fee Payment)
    { id: 2, x: 65, y: 0, notificationId: 1 },   // Top Right (Attendance)
    { id: 3, x: 5, y: 80, notificationId: 2 },   // Bottom Left (Admission)
    { id: 4, x: 70, y: 90, notificationId: 3 },  // Bottom Right (Exam)
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {fixedCards.map((card) => (
        <NotificationCard
          key={card.id}
          notification={NOTIFICATIONS[card.notificationId] || NOTIFICATIONS[0]}
          x={card.x}
          y={card.y}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Frames                                                            */
/* ------------------------------------------------------------------ */

function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full rounded-xl sm:rounded-[24px] border-[6px] sm:border-[10px] border-[#181426] bg-[#181426] shadow-2xl overflow-hidden">
      <div className="px-2 sm:px-3 py-1 sm:py-2 bg-[#f8f7fd] border-b flex items-center gap-1.5 sm:gap-2">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-400" />
          <div className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400" />
          <div className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="text-[5px] sm:text-[7px] text-slate-400 font-medium">
          IEP Schools · Admin Dashboard
        </div>
      </div>
      <div className="p-2 sm:p-4 bg-[#F8F7FD]">{children}</div>
    </div>
  );
}

function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full rounded-[20px] sm:rounded-[32px] overflow-hidden border-[4px] sm:border-[6px] border-[#181426] bg-[#F8F7FD] shadow-2xl">
      <div className="absolute left-1/2 top-1 sm:top-2 z-20 h-2 w-10 sm:h-3 sm:w-16 -translate-x-1/2 rounded-full bg-[#131126]" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export function HeroProductShowcase({ className }: { className?: string }) {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousDesktop, setPreviousDesktop] = useState<DesktopScreen | null>(null);
  const [previousMobile, setPreviousMobile] = useState<MobileScreen | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const progressStartRef = useRef<number>(Date.now());

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const currentDesktop = DESKTOP_SCREENS[desktopIndex % DESKTOP_SCREENS.length];
  const currentMobile = MOBILE_SCREENS[mobileIndex % MOBILE_SCREENS.length];

  const advance = useCallback(() => {
    if (!isPlaying || isHovered || reducedMotion) return;
    setIsTransitioning(true);
    setPreviousDesktop(currentDesktop);
    setPreviousMobile(currentMobile);
    setDesktopIndex((i) => i + 1);
    setMobileIndex((i) => i + 1);
    setProgress(0);
    progressRef.current = 0;
    progressStartRef.current = Date.now();
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousDesktop(null);
      setPreviousMobile(null);
    }, 400);
  }, [currentDesktop, currentMobile, isPlaying, isHovered, reducedMotion]);

  useEffect(() => {
    if (!isPlaying || isHovered || reducedMotion) {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    const tick = () => {
      const elapsed = Date.now() - progressStartRef.current;
      const segmentProgress = Math.min(elapsed / ROTATION_INTERVAL_MS, 1);
      setProgress(segmentProgress * 100);
      progressRef.current = segmentProgress;
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    animationFrameRef.current = requestAnimationFrame(tick);
    return () => { if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current); };
  }, [isPlaying, isHovered, reducedMotion]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPlaying || isHovered || reducedMotion) return;
    intervalRef.current = setInterval(advance, ROTATION_INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, isHovered, reducedMotion, advance]);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <section
      className={cn("relative w-full h-full min-h-[300px] sm:min-h-[450px] lg:min-h-[550px] flex items-center justify-center", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        CENTRALIZED WRAPPER:
        The devices are scaled perfectly within this container.
        The phone anchors to the bottom right of the laptop.
      */}
      <div className="relative w-full max-w-[800px] mx-auto flex items-end justify-center pb-6 sm:pb-10">
        
        {/* Laptop (Desktop) */}
        <div className="w-[85%] relative z-10">
          <DesktopFrame>
            <div className="ips-screen-transition relative h-full min-h-[200px] sm:min-h-[350px]">
              {!isTransitioning || !previousDesktop ? (
                <DesktopScreen key={currentDesktop.id} screen={currentDesktop} className="ips-screen ips-screen-active" />
              ) : (
                <>
                  <DesktopScreen key={previousDesktop!.id} screen={previousDesktop!} className="ips-screen ips-screen-previous" />
                  <DesktopScreen key={currentDesktop.id} screen={currentDesktop} className="ips-screen ips-screen-active" />
                </>
              )}
            </div>
          </DesktopFrame>
        </div>

        {/* Phone (Mobile) - Anchored exactly to the bottom right of the laptop */}
        <div className="absolute right-0 sm:right-4 lg:right-8 bottom-0 z-20 w-[30%] max-w-[160px] sm:max-w-[180px]">
          <MobileFrame>
            <div className="ips-screen-transition relative h-full min-h-[180px] sm:min-h-[320px]">
              {!isTransitioning || !previousMobile ? (
                <MobileScreen key={currentMobile.id} screen={currentMobile} className="ips-screen ips-screen-active" />
              ) : (
                <>
                  <MobileScreen key={previousMobile!.id} screen={previousMobile!} className="ips-screen ips-screen-previous" />
                  <MobileScreen key={currentMobile.id} screen={currentMobile} className="ips-screen ips-screen-active" />
                </>
              )}
            </div>
          </MobileFrame>
        </div>

        {/* Background Glow */}
        <div className="absolute inset-0 bg-purple-200/40 blur-3xl rounded-full scale-90 -z-10" />
      </div>

      <FloatingNotifications />

      {/* Progress bar & Controls */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] flex flex-col items-center gap-2">
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-violet-600" style={{ width: `${progress}%`, transition: isTransitioning ? "width 0.4s ease-out" : "width 0.1s linear" }} />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="h-6 w-6 rounded-full bg-white shadow-sm flex items-center justify-center text-violet-600 border">
            {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
          </button>
          <span className="text-[10px] text-slate-500 font-medium">{currentDesktop.title}</span>
        </div>
      </div>
    </section>
  );
}

function SchoolIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
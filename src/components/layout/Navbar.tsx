import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Bus,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  Globe,
  GraduationCap,
  IdCard,
  LogIn,
  Menu,
  Monitor,
  PackageCheck,
  School,
  Smartphone,
  UserCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const featureLinks = [
  {
    title: "Admissions & Enrollment",
    description: "Multi-step registration, KYC documents, and fee payment",
    href: "/features#module-administration",
    icon: School,
  },
  {
    title: "Student Information",
    description: "Profiles, academic histories, emergency contacts, and documents",
    href: "/features#module-students",
    icon: GraduationCap,
  },
  {
    title: "Attendance & Leaves",
    description: "Daily marking, automated SMS/WhatsApp alerts, and leave workflows",
    href: "/features#module-attendance",
    icon: CalendarCheck,
  },
  {
    title: "Fee & Finance Management",
    description: "Fee structures, counter collection, receipts, and offline ledger",
    href: "/features#module-finance",
    icon: Wallet,
  },
  {
    title: "Academics & Timetable",
    description: "Class & teacher timetables, syllabus tracking, and classroom scheduling",
    href: "/features#module-academics",
    icon: BookOpen,
  },
  {
    title: "Transport & Fleet GPS",
    description: "Buses, driver assignments, route stops, and student passenger rosters",
    href: "/features#module-transport",
    icon: Bus,
  },
  {
    title: "Student ID Cards & Studio",
    description: "Template library, visual designer, photo cropping & QR verification",
    href: "/features#module-id-cards",
    icon: IdCard,
  },
  {
    title: "Inventory & School Store",
    description: "Stock ledger, size variants, supplier POs, GRN & counter POS",
    href: "/features#module-inventory",
    icon: Boxes,
  },
];

const portalLinks = [
  {
    title: "Principal Portal",
    description: "Leadership dashboard, oversight, teacher reports & audit monitors",
    href: "/portals?role=principal",
    icon: School,
  },
  {
    title: "Teacher Portal",
    description: "Class attendance, student grades, daily timetable & homework notes",
    href: "/portals?role=teacher",
    icon: BookOpen,
  },
  {
    title: "Parent Portal & App",
    description: "Live student attendance, fee receipts, notices, timetable & bus tracking",
    href: "/portals?role=parent",
    icon: Users,
  },
  {
    title: "Cashier Workspace",
    description: "Point-of-sale fee collections, receipt printing & daily cash ledger",
    href: "/portals?role=cashier",
    icon: Wallet,
  },
  {
    title: "Inventory Manager",
    description: "Stock catalog, supplier purchasing, warehouse transfers & store POS",
    href: "/portals?role=inventory_manager",
    icon: Boxes,
  },
  {
    title: "Storekeeper Console",
    description: "Receiving goods (GRN), issuing uniforms/books & physical count audits",
    href: "/portals?role=storekeeper",
    icon: PackageCheck,
  },
  {
    title: "Driver Companion",
    description: "Assigned vehicle status, fuel logging, and route student passenger list",
    href: "/portals?role=driver",
    icon: Bus,
  },
  {
    title: "School Admin Portal",
    description: "Full configuration, RBAC permissions, audit monitor & staff management",
    href: "/portals?role=admin",
    icon: UserCheck,
  },
];

const applicationLinks = [
  {
    title: "Web ERP Application",
    description: "Complete full-featured cloud workspace for all staff and leadership",
    tag: "All Users \u00B7 Available",
    href: "/applications",
    icon: Globe,
  },
  {
    title: "Parent Mobile Application",
    description: "Instant mobile companion for parents, attendance alerts & circulars",
    tag: "Parent \u00B7 Free Plan",
    href: "/applications",
    icon: Smartphone,
  },
  {
    title: "Windows Desktop Application",
    description: "High-speed offline finance & counter cashier application",
    tag: "Finance \u00B7 Paid Add-on",
    href: "/applications",
    icon: Monitor,
  },
];

export function Navbar() {
  const { site } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const isLightHeroPage = false;
  const isTransparentAtTop = !scrolled;

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "-mb-[68px]",
        isTransparentAtTop && "hero-nav-transparent",
        isTransparentAtTop && isLightHeroPage && "hero-nav-transparent-light",
        scrolled && "hero-nav-scrolled",
      )}
    >
      {/* Main sticky navigation bar - ~68px height */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-navy-950/85 backdrop-blur-md shadow-lg shadow-black/30"
            : isTransparentAtTop
              ? "border-transparent bg-transparent shadow-none backdrop-blur-0"
              : "border-border bg-white/95 backdrop-blur-xl",
        )}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          {/* Logo - aligned to far-left */}
          <div className="flex shrink-0 items-center">
            <Logo tone={!isLightHeroPage ? "light" : "dark"} />
          </div>

          {/* Desktop Navigation - centered */}
          <nav
            className="hidden items-center justify-center gap-1 xl:flex flex-1"
            aria-label="Primary navigation"
            data-hero-nav="true"
          >
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                  isActive && "after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-purple-600",
                )
              }
            >
              Home
            </NavLink>

            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("features")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:text-navy-900",
                  activeDropdown === "features" && "text-navy-900",
                )}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "features" ? null : "features")
                }
              >
                Features
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "features" && "rotate-180 text-purple-600",
                  )}
                />
              </button>

              {activeDropdown === "features" && (
                <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-border bg-white p-4 shadow-card-hover">
                    <div className="grid grid-cols-2 gap-2">
                      {featureLinks.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-purple-50/80"
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-100/70 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-navy-900 group-hover:text-purple-700">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs">
                      <span className="text-[11px] font-medium text-slate-500">
                        20+ integrated school modules built in
                      </span>
                      <Link
                        to="/features"
                        className="inline-flex items-center gap-1 font-bold text-purple-700 hover:text-purple-800"
                      >
                        Explore all features
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:text-navy-900",
                  activeDropdown === "solutions" && "text-navy-900",
                )}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")
                }
              >
                Solutions
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "solutions" && "rotate-180 text-purple-600",
                  )}
                />
              </button>

              {activeDropdown === "solutions" && (
                <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-border bg-white p-4 shadow-card-hover">
                    <div className="grid grid-cols-2 gap-2">
                      {portalLinks.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-purple-50/80"
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-100/70 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-navy-900 group-hover:text-purple-700">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs">
                      <span className="text-[11px] font-medium text-slate-500">
                        Tailored automation for owners, principals, teachers, parents & staff
                      </span>
                      <Link
                        to="/portals"
                        className="inline-flex items-center gap-1 font-bold text-purple-700 hover:text-purple-800"
                      >
                        Explore all solutions
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Applications Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("applications")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:text-navy-900",
                  activeDropdown === "applications" && "text-navy-900",
                )}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "applications" ? null : "applications",
                  )
                }
              >
                Applications
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "applications" && "rotate-180 text-purple-600",
                  )}
                />
              </button>

              {activeDropdown === "applications" && (
                <div className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-border bg-white p-4 shadow-card-hover">
                    <div className="space-y-2">
                      {applicationLinks.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-purple-50/80"
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-100/70 text-purple-700 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-navy-900 group-hover:text-purple-700">
                                {item.title}
                              </p>
                              <span className="rounded-full bg-purple-100/60 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-purple-700">
                                {item.tag}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct links */}
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                )
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/hosting"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                )
              }
            >
              Hosting
            </NavLink>
            <NavLink
              to="/tutorials"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                )
              }
            >
              Tutorials
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                )
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-colors",
                  isActive
                    ? "text-navy-900 font-bold"
                    : "text-slate-600 hover:text-navy-900",
                )
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Buttons - aligned to far-right */}
          <div className="flex shrink-0 items-center justify-end gap-2.5">
            {/* Login button - outline */}
            <a
              href={site.erpLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold shadow-xs transition-all sm:inline-flex",
                !isLightHeroPage
                  ? "border-white/45 bg-white/5 text-white hover:border-white/70 hover:bg-white/10 hover:text-white"
                  : "border-purple-200/90 bg-white text-navy-900 hover:border-purple-300 hover:bg-purple-50/70 hover:text-purple-700",
              )}
            >
              <LogIn className={cn("h-3.5 w-3.5", !isLightHeroPage ? "text-white" : "text-purple-600")} />
              Login
            </a>

            {/* Book a Demo button - solid purple */}
            <Link
              to="/contact?topic=demo"
              className="hidden items-center gap-1.5 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/30 sm:inline-flex whitespace-nowrap"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Book a Demo
            </Link>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border xl:hidden shadow-xs",
                !isLightHeroPage
                  ? "border-white/45 bg-white/5 text-white"
                  : "border-border bg-white text-navy-900",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        {...(!open ? { inert: "" } : {})}
        className={cn(
          "fixed inset-x-0 z-40 overflow-y-auto border-t border-border bg-white transition-all duration-300 xl:hidden",
          "top-[68px] h-[calc(100dvh-68px)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="container-x py-6">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Home
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Features
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/portals"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Solutions
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/applications"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Applications
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Pricing
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/hosting"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Hosting
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/tutorials"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Tutorials
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              About Us
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-navy-900",
                  isActive ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50",
                )
              }
            >
              Contact
              <ArrowRight className="h-4 w-4 opacity-40" />
            </NavLink>
          </nav>
          <div className="mt-6 grid gap-3 border-t border-border pt-6">
            <Link
              to="/contact?topic=demo"
              className="flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3.5 text-sm font-bold text-white shadow-md"
            >
              <CalendarDays className="h-4 w-4" />
              Book a Demo
            </Link>
            <a
              href={site.erpLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white py-3.5 text-sm font-bold text-navy-900"
            >
              <LogIn className="h-4 w-4 text-purple-600" />
              Login to ERP
            </a>
            <p className="px-2 text-center text-xs leading-5 text-slate-500">
              Login opens the school ERP workspace. Credentials are provided during onboarding.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

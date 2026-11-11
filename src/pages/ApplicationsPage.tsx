import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Info,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { CtaBand } from "@/components/ui/CtaBand";
import { applicationChannels, accessNotes, roleMatrix } from "@/content/applications";
import { useSiteContent } from "@/lib/content";
import { usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// 🔹 ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ApplicationsPage() {
  const { site } = useSiteContent();

  usePageMeta({
    title: "School Applications | Web, Mobile & Windows | IEP Schools",
    description:
      "Access your school on the device that works for you. Connect your school operations through browser-based web ERP, parent mobile application, and dedicated Windows finance tool.",
    path: "/applications",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <PageHero
        className="applications-page-hero"
        eyebrow="Multi-Platform Access"
        backgroundImage="/media/Images/Neon Parent App School Dashboard.png"
        title={
          <>
            Access Your School.{" "}
            <span className="text-gradient">On the Device That Works for You.</span>
          </>
        }
        description="Connect your school operations through web, mobile and desktop applications. Role-focused experiences designed for administration, parents and finance."
        breadcrumb="Applications"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button to="/contact?plan=free" size="lg" className="shadow-glow hover:scale-[1.02] transition-transform duration-300">
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={site.erpLoginUrl} external variant="light" size="lg" className="hover:scale-[1.02] transition-transform duration-300">
            Launch Web App
          </Button>
        </motion.div>
      </PageHero>

      <Section tone="light">
        <div className="container-x">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SectionHeading
              eyebrow="Three surfaces"
              title="Web today, mobile for supported roles, desktop planned"
              description="The ERP is not a single app stretched across every device. Each surface has a defined role and a clear availability status."
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-12 space-y-6"
          >
            {applicationChannels.map((channel) => (
              <motion.div
                key={channel.id}
                variants={fadeInUp}
                className={cn(
                  "card overflow-hidden group hover:shadow-lift transition-all duration-500",
                  channel.availability === "upcoming" && "border-dashed",
                )}
              >
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                  <div
                    className={cn(
                      "relative overflow-hidden p-6 sm:p-8 lg:p-10 transition-colors duration-500",
                      channel.id === "web" && "bg-navy-950 text-white",
                      channel.id === "mobile" && "bg-gradient-to-br from-violet-700 via-violet-600 to-fuchsia-600 text-white",
                      channel.id === "windows" && "bg-surface",
                    )}
                  >
                    <div className="absolute inset-0 grid-pattern opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12]" />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110",
                            channel.id === "windows"
                              ? "bg-white text-violet-700 shadow-soft"
                              : "bg-white/10 text-white",
                          )}
                        >
                          <channel.icon className="h-6 w-6" />
                        </span>
                        <AvailabilityBadge
                          status={channel.availability}
                          className={cn(
                            channel.id !== "windows" &&
                              "border-white/15 bg-white/10 text-white/75",
                          )}
                        />
                      </div>
                      <h2
                        className={cn(
                          "mt-6 text-3xl font-extrabold tracking-[-0.03em]",
                          channel.id === "windows" ? "text-navy-900" : "text-white",
                        )}
                      >
                        {channel.name}
                      </h2>
                      <p
                        className={cn(
                          "mt-1 text-sm font-semibold",
                          channel.id === "windows" ? "text-violet-700" : "text-white/70",
                        )}
                      >
                        {channel.statusLabel}
                      </p>
                      <p
                        className={cn(
                          "mt-4 text-sm leading-7",
                          channel.id === "windows" ? "text-ink/65" : "text-white/60",
                        )}
                      >
                        {channel.description}
                      </p>

                      <div
                        className={cn(
                          "mt-6 rounded-2xl border p-4 transition-colors",
                          channel.id === "windows"
                            ? "border-amber-200 bg-amber-50"
                            : "border-white/10 bg-white/[0.06]",
                        )}
                      >
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.14em]",
                            channel.id === "windows" ? "text-amber-700" : "text-white/55",
                          )}
                        >
                          Access
                        </p>
                        <p
                          className={cn(
                            "mt-1.5 text-xs leading-6",
                            channel.id === "windows" ? "text-amber-900/75" : "text-white/60",
                          )}
                        >
                          {channel.access}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                      Capabilities
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {channel.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2.5 text-sm leading-6 text-ink/65 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                          {capability}
                        </li>
                      ))}
                    </ul>

                    {channel.note && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: "auto" }}
                        className="mt-5 rounded-2xl border border-ink/10 bg-surface p-4 text-xs leading-6 text-ink/65"
                      >
                        {channel.note}
                      </motion.div>
                    )}

                    <div className="mt-6">
                      {channel.id === "windows" ? (
                        <Button
                          to="/contact?topic=windows-finance"
                          variant="outline"
                          className="group/btn"
                        >
                          Register interest
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      ) : (
                        <Button
                          to={channel.id === "web" ? undefined : "/contact?topic=mobile-app"}
                          href={channel.id === "web" ? site.erpLoginUrl : undefined}
                          external={channel.id === "web"}
                          variant={channel.id === "web" ? "outline" : "primary"}
                          className="group/btn shadow-glow hover:scale-[1.02] transition-transform duration-300"
                        >
                          {channel.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section tone="white">
        <div className="container-x">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionHeading
              eyebrow="Role availability"
              title="Who gets a mobile experience?"
              description="The app supports seven roles. Admin, finance and accountant remain web-only, and only the parent app is included on the Free plan."
            />
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {roleMatrix.map((row) => (
              <motion.div
                key={row.role}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className={cn(
                  "rounded-2xl border p-4 transition-all duration-300 hover:shadow-md",
                  row.web
                    ? "border-ink/10 bg-surface hover:border-violet-200"
                    : "border-dashed border-ink/15 bg-white hover:border-ink/20",
                )}
              >
                <p className="text-sm font-extrabold text-navy-900">{row.role}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-ink/60">
                  Web
                </p>
                <p className="text-xs font-semibold text-ink/60">
                  {row.web ? "Available" : "Not available"}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-ink/60">
                  Mobile
                </p>
                <p
                  className={cn(
                    "text-xs font-semibold",
                    row.mobile === "Web-only"
                      ? "text-ink/60"
                      : row.mobile === "Free (limited)"
                        ? "text-emerald-700"
                        : "text-violet-700",
                  )}
                >
                  {row.mobile}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-4 text-center text-[11px] leading-5 text-ink/60">
            Driver has mobile access for trip operations. Transport manager duties
            are performed in the admin web workspace.
          </p>
        </div>
      </Section>

      <Section tone="light">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              align="left"
              eyebrow="Requirements"
              title="What the school needs to run it"
              description="The platform is browser-based and online. There is no offline mode, and mobile distribution is arranged during onboarding."
            />
            <div className="mt-6 space-y-3">
              {accessNotes.map((note, idx) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4 hover:shadow-sm transition-shadow"
                >
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                  <p className="text-xs leading-6 text-ink/65">{note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="card p-6 hover:shadow-lift transition-all duration-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-600" />
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                  Distribution, stated plainly
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/60">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Web access is immediate at the existing ERP login page.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Mobile setup is handled by the school during onboarding.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  No APK file is hosted on this marketing website.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-ink/20 bg-white p-6 hover:border-violet-200 transition-colors">
              <div className="flex items-center gap-2 text-ink/65">
                <Download className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-[0.16em]">
                  Windows finance app
                </h3>
              </div>
              <p className="mt-3 text-sm font-bold text-navy-900">
                There is no download today.
              </p>
              <p className="mt-1 text-xs leading-6 text-ink/65">
                The Windows Finance Application is a planned paid add-on. No
                installer, beta build, release date or price has been announced.
                Register interest to be contacted when it is ready for review.
              </p>
              <Button
                to="/contact?topic=windows-finance"
                variant="outline"
                size="sm"
                className="mt-4 group/btn"
              >
                Register interest
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      <CtaBand
        title="Tell us which devices your staff actually use"
        description="We will map the web and mobile experience to your roles, and be clear about what is included in your plan and what requires setup."
        secondary="hosting"
      />
    </motion.div>
  );
}

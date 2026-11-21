import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSiteContent } from "@/lib/content";

const productLinks = [
  { label: "Features", to: "/features" },
  { label: "Solutions & Portals", to: "/solutions" },
  { label: "Applications", to: "/applications" },
  { label: "Pricing & Plans", to: "/pricing" },
  { label: "Dedicated Hosting", to: "/hosting" },
];

const resourceLinks = [
  { label: "Tutorials & Guides", to: "/tutorials" },
  { label: "Customization", to: "/customize" },
  { label: "FAQ & Knowledge", to: "/faq" },
  { label: "About Us", to: "/about" },
  { label: "Contact & Demo", to: "/contact" },
];

export function Footer() {
  const { site } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Fully Automated School Management Software for Indian schools. Reduce
              repetitive administrative work, keep parents informed and run your
              entire campus smoothly from one connected platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                Web Application
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                Parent Mobile App
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
                Windows Application
              </span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold text-violet-300">
                School Automation
              </span>
            </div>

            {/* Official Social Media Presence */}
            <div className="mt-7 pt-5 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                Official Channels & Community
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-xs font-semibold transition shadow-sm"
                  title="Official Instagram @iepsolutions7"
                >
                  <Instagram className="h-3.5 w-3.5 text-pink-400" />
                  Instagram
                </a>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold transition shadow-sm"
                  title="Official YouTube @IEPSOLUTIONS"
                >
                  <Youtube className="h-3.5 w-3.5 text-red-400" />
                  YouTube
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-semibold transition shadow-sm"
                  title="Official Facebook IEP Solutions"
                >
                  <Facebook className="h-3.5 w-3.5 text-blue-400" />
                  Facebook
                </a>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold transition shadow-sm"
                  title="Official WhatsApp Desk"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  WhatsApp
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold transition shadow-sm"
                  title="Official LinkedIn IEP Solutions"
                >
                  <Linkedin className="h-3.5 w-3.5 text-sky-400" />
                  LinkedIn
                </a>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-400/30 bg-slate-400/10 hover:bg-slate-400/20 text-slate-200 text-xs font-semibold transition shadow-sm"
                  title="Official X @IEPSOLUTIONS7"
                >
                  <Twitter className="h-3.5 w-3.5 text-slate-300" />
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
              Platform & Solutions
            </h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
              Resources & Training
            </h2>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.erpLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  ERP Login Portal
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
              Contact & Support
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                  <span className="break-all">{site.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-violet-300" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-pink-400" />
                  Instagram: {site.social.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Youtube className="h-4 w-4 shrink-0 text-red-400" />
                  YouTube: {site.social.youtubeHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Facebook className="h-4 w-4 shrink-0 text-blue-400" />
                  Facebook: {site.social.facebookName}
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Linkedin className="h-4 w-4 shrink-0 text-sky-400" />
                  LinkedIn: {site.social.linkedinName}
                </a>
              </li>
              <li>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <Twitter className="h-4 w-4 shrink-0 text-slate-300" />
                  X: {site.social.xHandle}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/65">
                <MapPin className="h-4 w-4 shrink-0 text-violet-300" />
                {site.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} IEP Schools. All rights reserved. School data remains the
            property of the respective school.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/40">Official:</span>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-pink-300 transition"
              title="Instagram"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-red-300 transition"
              title="YouTube"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-blue-300 transition"
              title="Facebook"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-emerald-300 transition"
              title="WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-sky-300 transition"
              title="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 transition"
              title="X (Twitter)"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="max-w-md lg:text-right">
            Enterprise-grade school automation engineered for Indian institutions. 99.98% cloud uptime SLA with ISO/IEC 27001 data protection standards.
          </p>
        </div>
      </div>
    </footer>
  );
}

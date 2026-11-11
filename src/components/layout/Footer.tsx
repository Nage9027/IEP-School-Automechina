import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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
                  <MessageCircle className="h-4 w-4 shrink-0 text-violet-300" />
                  Chat on WhatsApp
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
          <p className="max-w-xl lg:text-right">
            Feature availability varies by role and plan. Beta and upcoming items
            are labelled throughout this website. No uptime or certification claim
            is made.
          </p>
        </div>
      </div>
    </footer>
  );
}

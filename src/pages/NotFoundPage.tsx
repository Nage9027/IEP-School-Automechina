import { Link } from "react-router-dom";
import { ArrowRight, Home, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { usePageMeta } from "@/lib/seo";

const links = [
  { label: "Features", to: "/features" },
  { label: "Role portals", to: "/portals" },
  { label: "Pricing", to: "/pricing" },
  { label: "Applications", to: "/applications" },
  { label: "Hosting", to: "/hosting" },
  { label: "Contact", to: "/contact" },
];

export default function NotFoundPage() {
  usePageMeta({
    title: "Page not found",
    description:
      "The page you requested could not be found. Use the links to continue exploring IEP Schools.",
    path: "/404",
    noIndex: true,
  });

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950 py-20 text-white">
      <div className="absolute inset-0 dark-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
      <div className="container-x relative text-center">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <Logo tone="light" />
          <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300">
            404
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            This page is not in the register.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/65">
            The link may be old or mistyped. Nothing was changed in your school
            account. Use the links below to continue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">
              <Home className="h-4 w-4" />
              Back home
            </Button>
            <Button to="/contact" variant="light" size="lg">
              <LifeBuoy className="h-4 w-4" />
              Contact support
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center gap-1 text-xs font-semibold text-white/65 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/lib/content";

export function CtaBand({
  title = "Ready to see the ERP with your school's workflow?",
  description = "Tell us about your school, the modules you need and how you operate today. We will walk you through the platform and the realistic next steps.",
  secondary = "pricing",
}: {
  title?: string;
  description?: string;
  secondary?: "pricing" | "features" | "hosting";
}) {
  const { site } = useSiteContent();
  const secondaryMap = {
    pricing: { label: "Compare plans", to: "/pricing" },
    features: { label: "Explore features", to: "/features" },
    hosting: { label: "See hosting details", to: "/hosting" },
  } as const;

  return (
    <section className="bg-surface pb-20 pt-4 sm:pb-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-12 text-white shadow-lift sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-0 dark-glow" />
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          <img
            src="/brand/iep-schools-mark-transparent.png"
            alt=""
            className="pointer-events-none absolute -right-8 top-1/2 hidden w-72 -translate-y-1/2 opacity-[0.08] lg:block"
          />
          <div className="relative max-w-2xl">
            <span className="eyebrow eyebrow-dark">Next step</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/contact" size="lg">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to={secondaryMap[secondary].to} variant="light" size="lg">
                {secondaryMap[secondary].label}
              </Button>
              <Button
                href={site.contact.whatsapp}
                external
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
            <p className="mt-5 text-[11px] leading-5 text-white/55">
              No online checkout. Enquiries are handled by our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

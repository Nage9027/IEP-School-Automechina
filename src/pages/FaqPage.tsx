import { useMemo, useState } from "react";
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { useSiteContent } from "@/lib/content";
import { usePageMeta, useStructuredData } from "@/lib/seo";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  const { site, faqs } = useSiteContent();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  usePageMeta({
    title: "FAQ",
    description:
      "Answers about IEP Schools pricing, hosting, available features, library, Windows finance app, online payments, mobile access, data and security.",
    path: "/faq",
  });

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    [faqs],
  );
  useStructuredData(schema);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))],
    [faqs],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = category === "All" || faq.category === category;
      const matchesQuery =
        !normalized ||
        [faq.question, faq.answer, faq.category]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [faqs, query, category]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((faq) => {
      const existing = map.get(faq.category) ?? [];
      map.set(faq.category, [...existing, faq]);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Straight answers,{" "}
            <span className="text-gradient">including the awkward ones.</span>
          </>
        }
        description="Search every published answer about pricing, hosting, features, data, mobile access and what is not available yet."
        breadcrumb="FAQ"
        compact
        aside={
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              Quick positions
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                { label: "Library module", value: "Not available" },
                { label: "Online fee gateway", value: "Not available" },
                { label: "Windows finance app", value: "Planned add-on" },
                { label: "Multi-branch", value: "Roadmap only" },
                { label: "Offline mode", value: "Not supported" },
                { label: "Uptime SLA", value: "Not on Free" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5 text-[11px] last:border-0 last:pb-0"
                >
                  <span className="text-white/55">{item.label}</span>
                  <span className="font-bold text-white/70">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Button to="/contact" size="lg">
          Ask us directly
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href={site.contact.whatsapp} external variant="light" size="lg">
          WhatsApp
        </Button>
      </PageHero>

      <Section tone="white" className="py-10 sm:py-12">
        <div className="container-x">
          <div className="card p-4 sm:p-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions and answers…"
                aria-label="Search FAQs"
                className="w-full rounded-full border border-ink/15 bg-surface py-3 pl-11 pr-10 text-sm font-medium text-navy-900 placeholder:text-ink/60 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-ink/5 text-ink/65"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                    category === item
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-ink/10 bg-white text-ink/65 hover:border-violet-200 hover:text-violet-700",
                  )}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-ink/60">
            Showing {filtered.length} of {faqs.length} answers
            {query ? ` for “${query}”` : ""}.
          </p>
        </div>
      </Section>

      <Section tone="light" className="pt-4 sm:pt-6">
        <div className="container-x">
          <div className="mx-auto max-w-4xl space-y-10">
            {groups.map(([groupName, items]) => (
              <div key={groupName}>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg font-extrabold tracking-tight text-navy-900">
                    {groupName}
                  </h2>
                  <span className="text-[11px] font-semibold text-ink/60">
                    {items.length}
                  </span>
                </div>
                <div className="mt-4 card px-6 sm:px-8">
                  <Accordion>
                    {items.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}

            {groups.length === 0 && (
              <div className="card p-10 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                  <Search className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-extrabold text-navy-900">
                  No answer matches that search
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">
                  Try a different phrase, or send the question to our team. If it is
                  useful to other schools, we may add it here.
                </p>
                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <MessageCircle className="h-6 w-6 text-emerald-600" />
            <h2 className="mt-4 text-xl font-extrabold text-navy-900">
              Question not answered?
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">
              Send it to our team. We will answer directly and, where it helps other
              schools, add a clearer answer to this page.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button to="/contact" size="sm">
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={site.contact.whatsapp}
                external
                variant="outline"
                size="sm"
              >
                WhatsApp
              </Button>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <ShieldCheck className="h-6 w-6 text-violet-600" />
            <h2 className="mt-4 text-xl font-extrabold text-navy-900">
              Need the security detail?
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink/65">
              The hosting page lists the implemented controls, backup approach and
              the limits of what we claim. No certification is implied.
            </p>
            <Button to="/hosting" variant="outline" size="sm" className="mt-5">
              Read security & hosting
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Still deciding whether to book a demo?"
        description="Bring your questions. We will show the relevant modules, state what needs configuration and tell you if the Free plan is the better starting point."
        secondary="pricing"
      />
    </>
  );
}

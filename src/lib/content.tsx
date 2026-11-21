import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { site as defaultSite } from "@/content/site";
import { plans as defaultPlans } from "@/content/plans";
import { freeHosting as defaultFreeHosting } from "@/content/hosting";
import { faqs as defaultFaqs } from "@/content/faqs";
import { tutorials as defaultTutorials } from "@/content/tutorials";
import type {
  Faq,
  FreeHostingInfo,
  Plan,
  SiteInfo,
  SiteOverrides,
  Tutorial,
} from "@/content/types";

interface SiteContent {
  site: SiteInfo;
  plans: Plan[];
  annualMonths: number;
  freeHosting: FreeHostingInfo;
  faqs: Faq[];
  tutorials: Tutorial[];
  overridesApplied: boolean;
}

const SiteContentContext = createContext<SiteContent>({
  site: defaultSite,
  plans: defaultPlans,
  annualMonths: 10,
  freeHosting: defaultFreeHosting,
  faqs: defaultFaqs,
  tutorials: defaultTutorials,
  overridesApplied: false,
});

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function validFaqs(value: unknown): Faq[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const parsed = value.filter(
    (item): item is Faq =>
      Boolean(item) &&
      typeof item.id === "string" &&
      typeof item.category === "string" &&
      typeof item.question === "string" &&
      typeof item.answer === "string" &&
      item.question.trim().length > 0 &&
      item.answer.trim().length > 0,
  );
  return parsed.length ? parsed : null;
}

function validTutorials(value: unknown): Tutorial[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const parsed = value.filter(
    (item): item is Tutorial =>
      Boolean(item) &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.description === "string" &&
      typeof item.categoryId === "string" &&
      typeof item.videoUrl === "string" &&
      item.videoUrl.trim().length > 0 &&
      item.published === true,
  );
  return parsed.length ? parsed : null;
}

function mergeContent(overrides: SiteOverrides | null): SiteContent {
  if (!overrides) {
    return {
      site: defaultSite,
      plans: defaultPlans,
      annualMonths: 10,
      freeHosting: defaultFreeHosting,
      faqs: defaultFaqs,
      tutorials: defaultTutorials,
      overridesApplied: false,
    };
  }

  const contact = overrides.contact ?? {};
  const social = overrides.social ?? {};
  const site: SiteInfo = {
    ...defaultSite,
    announcement: text(overrides.announcement, defaultSite.announcement),
    erpLoginUrl: text(overrides.erpLoginUrl, defaultSite.erpLoginUrl),
    contact: {
      email: text(contact.email, defaultSite.contact.email),
      phone: text(contact.phone, defaultSite.contact.phone),
      phoneDisplay: text(contact.phoneDisplay, defaultSite.contact.phoneDisplay),
      whatsapp: text(contact.whatsapp, defaultSite.contact.whatsapp),
      location: text(contact.location, defaultSite.contact.location),
    },
    social: {
      instagram: text(social.instagram, defaultSite.social.instagram),
      instagramHandle: text(social.instagramHandle, defaultSite.social.instagramHandle),
      facebook: text(social.facebook, defaultSite.social.facebook),
      facebookName: text(social.facebookName, defaultSite.social.facebookName),
      youtube: text(social.youtube, defaultSite.social.youtube),
      youtubeHandle: text(social.youtubeHandle, defaultSite.social.youtubeHandle),
      linkedin: text(social.linkedin, defaultSite.social.linkedin),
      linkedinName: text(social.linkedinName, defaultSite.social.linkedinName),
      x: text(social.x, defaultSite.social.x),
      xHandle: text(social.xHandle, defaultSite.social.xHandle),
      whatsapp: text(social.whatsapp, defaultSite.social.whatsapp),
    },
  };

  const annualMonths =
    typeof overrides.pricing?.annualMonths === "number" &&
    overrides.pricing.annualMonths > 0
      ? overrides.pricing.annualMonths
      : 10;

  const plans = defaultPlans.map((plan) => {
    const override = overrides.pricing?.plans?.[plan.id];
    if (!override) return plan;
    const monthly =
      typeof override.monthly === "number" ? override.monthly : plan.monthly;
    let annual =
      typeof override.annual === "number" ? override.annual : plan.annual;
    if (typeof override.monthly === "number" && typeof override.annual !== "number") {
      annual = override.monthly * annualMonths;
    }
    return { ...plan, monthly, annual };
  });

  const hosting = overrides.hostingFree ?? {};
  const freeHosting: FreeHostingInfo = {
    ...defaultFreeHosting,
    ram: text(hosting.ram, defaultFreeHosting.ram),
    storage: text(hosting.storage, defaultFreeHosting.storage),
    bandwidth: text(hosting.bandwidth, defaultFreeHosting.bandwidth),
    note: text(hosting.note, defaultFreeHosting.note),
  };

  const faqs = validFaqs(overrides.faqs) ?? defaultFaqs;
  const tutorials = validTutorials(overrides.tutorials) ?? defaultTutorials;

  const hasEdits =
    site.announcement !== defaultSite.announcement ||
    site.erpLoginUrl !== defaultSite.erpLoginUrl ||
    site.contact.email !== defaultSite.contact.email ||
    site.contact.phone !== defaultSite.contact.phone ||
    site.contact.whatsapp !== defaultSite.contact.whatsapp ||
    plans.some((plan, index) => plan.monthly !== defaultPlans[index].monthly) ||
    freeHosting.ram !== defaultFreeHosting.ram ||
    freeHosting.storage !== defaultFreeHosting.storage ||
    faqs !== defaultFaqs ||
    tutorials !== defaultTutorials;

  return {
    site,
    plans,
    annualMonths,
    freeHosting,
    faqs,
    tutorials,
    overridesApplied: hasEdits,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<SiteOverrides | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/content/site.json", { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setOverrides(data as SiteOverrides);
        }
      })
      .catch(() => {
        setOverrides(null);
      });
    return () => controller.abort();
  }, []);

  const value = useMemo(() => mergeContent(overrides), [overrides]);

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

import { useEffect } from "react";
import { site } from "@/content/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "");

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function usePageMeta({ title, description, path, noIndex = false }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes(site.name)
      ? title
      : `${title} | ${site.name}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    if (siteUrl) {
      const url = `${siteUrl}${path}`;
      upsertMeta("property", "og:url", url);
      upsertLink("canonical", url);
    }

    return () => {
      upsertMeta("name", "robots", "index, follow");
    };
  }, [title, description, path, noIndex]);
}

export function useStructuredData(data: Record<string, unknown> | null) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
}

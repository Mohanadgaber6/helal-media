import type { Metadata } from "next";
import { Locale } from "@/data/types";
import { getCopy, isValidLocale } from "@/data/content";

export function buildPageMetadata(
  langParam: string,
  pageKey:
    | "home"
    | "services"
    | "work"
    | "designs"
    | "videos"
    | "websites"
    | "contact",
  subpath: string = ""
): Metadata {
  const lang: Locale = isValidLocale(langParam) ? langParam : "en";
  const copy = getCopy(lang);
  const title = copy.meta.pages[pageKey];
  const description = copy.meta.siteDescription;

  const cleanSubpath = subpath ? `/${subpath.replace(/^\/+/, "")}` : "";
  const enPath = `/en${cleanSubpath}`;
  const arPath = `/ar${cleanSubpath}`;
  const canonicalPath = lang === "ar" ? arPath : enPath;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: enPath,
        ar: arPath,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Helal Media Production",
      locale: lang === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: [
        {
          url: "/brand/og-share.png",
          width: 1200,
          height: 630,
          alt: "Helal Media Production — Marketing Has No Catalog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/og-share.png"],
    },
  };
}

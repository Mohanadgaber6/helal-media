import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Do not invent a final domain before provided; use env variable or relative-safe placeholder
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  const routes = [
    "",
    "/services",
    "/work",
    "/work/designs",
    "/work/videos",
    "/work/websites",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const lang of ["en", "ar"] as const) {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    }
  }

  return entries;
}


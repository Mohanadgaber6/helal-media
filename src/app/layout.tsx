import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Helal Media Production — Marketing Has No Catalog",
  description:
    "Full-Service Marketing Agency. Your Strategic Creative Partner.",
  icons: {
    icon: [
      { url: "/brand/helal-symbol.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Helal Media Production — Marketing Has No Catalog",
    description:
      "Full-Service Marketing Agency. Your Strategic Creative Partner.",
    siteName: "Helal Media Production",
    images: [
      {
        url: "/brand/og-share.png",
        width: 1200,
        height: 630,
        alt: "Helal Media Production — Marketing Has No Catalog",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = headers();
  const locale = hdrs.get("x-helal-locale") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen flex flex-col bg-obsidian text-alabaster selection:bg-brandPurple selection:text-alabaster ${
          locale === "ar" ? "font-arabic" : "font-sans"
        }`}
      >
        {children}
      </body>
    </html>
  );
}

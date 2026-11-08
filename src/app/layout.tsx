import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Syne, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-en-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-en-display",
  display: "swap",
  weight: ["700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ar-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      className={`${plusJakarta.variable} ${syne.variable} ${ibmPlexArabic.variable}`}
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

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { WorkFolders } from "@/components/WorkFolders";
import { WhyUsAccordion } from "@/components/WhyUsAccordion";
import { FinalCTA } from "@/components/FinalCTA";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "home", "");
}

export default function HomePage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  const lang = params.lang;

  /*
    Exact Homepage Section Sequence (Section 3):
    3.1 Hero
    3.2 About Us (id="about")
    3.3 Services Preview (Left: Branding, Center: Social Media Management, Right: Content Strategy)
    3.4 Client Work — Portfolio Folder Preview (Triangle Geometry: Designs, Videos, Websites)
    3.5 Why Choose Us — Four Interactive Reveal Cards
    3.6 Closing CTA
    (3.7 Global Footer rendered in LocaleLayout)
  */
  return (
    <div data-testid="home-page">
      <Hero lang={lang} />
      <AboutSection lang={lang} />
      <ServicesPreview lang={lang} />
      <WorkFolders lang={lang} mode="home" />
      <WhyUsAccordion lang={lang} />
      <FinalCTA lang={lang} />
    </div>
  );
}


import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { ContactDetails } from "@/components/ContactDetails";
import { InquiryForm } from "@/components/InquiryForm";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "contact", "contact");
}

export default function ContactRoute({
  params,
}: {
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  const lang = params.lang;

  return (
    <section
      data-testid="contact-page"
      className="relative bg-obsidian py-16 sm:py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(129,69,202,0.14),rgba(20,172,243,0.06),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-column editorial layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <ContactDetails lang={lang} />
          </div>
          <div className="lg:col-span-6">
            <InquiryForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPage } from "@/components/ServicesPage";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "services", "services");
}

export default function ServicesRoute({
  params,
}: {
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  return <ServicesPage lang={params.lang} />;
}


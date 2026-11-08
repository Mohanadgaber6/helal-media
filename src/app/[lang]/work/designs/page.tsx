import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { DesignClientShowcase } from "@/components/DesignClientShowcase";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "designs", "work/designs");
}

export default function DesignsRoute({
  params,
}: {
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  return <DesignClientShowcase lang={params.lang} />;
}


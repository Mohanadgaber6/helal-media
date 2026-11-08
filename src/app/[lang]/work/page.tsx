import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { WorkPage } from "@/components/WorkPage";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "work", "work");
}

export default function WorkRoute({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  return <WorkPage lang={params.lang} />;
}


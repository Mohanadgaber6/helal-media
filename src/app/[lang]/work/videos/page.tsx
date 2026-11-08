import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";
import { VideoIndustryShowcase } from "@/components/VideoIndustryShowcase";

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  return buildPageMetadata(params.lang, "videos", "work/videos");
}

export default function VideosRoute({
  params,
}: {
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }
  return <VideoIndustryShowcase lang={params.lang} />;
}


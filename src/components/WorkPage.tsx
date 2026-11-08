import React from "react";
import { Locale } from "@/data/types";
import { WorkFolders } from "./WorkFolders";
import { FinalCTA } from "./FinalCTA";

export function WorkPage({ lang }: { lang: Locale }) {
  return (
    <div data-testid="work-page" className="bg-obsidian text-alabaster">
      <WorkFolders lang={lang} mode="hub" />
      <FinalCTA lang={lang} />
    </div>
  );
}


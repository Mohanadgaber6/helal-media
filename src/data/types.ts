export type Locale = "en" | "ar";

export interface MediaAssetRecord {
  id: string;
  kind: "image" | "video";
  groupSlug: string;
  clientName?: string;
  industry: string;
  credit?: string;
  index: number;
  isLead?: boolean;
  sourceUrl: string;
  driveFileId: string;
  status: "verified" | "blocked" | "pending";
  httpStatus: number | null;
  mimeType: string | null;
  rawBytes: number;
  optimizedBytes: number;
  width: number;
  height: number;
  orientation: "landscape" | "portrait" | "square" | "unknown";
  codec: string | null;
  duration: number | null;
  localPath: string | null;
  posterPath: string | null;
  error: string | null;
}

export interface ServiceItem {
  id: string;
  slug: string;
  iconKey:
    | "social-media"
    | "branding"
    | "content-strategy"
    | "graphic-design"
    | "media-production"
    | "video-editing"
    | "web-development"
    | "paid-ads";
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface WorkFolderItem {
  id: "designs" | "videos" | "websites";
  slug: "designs" | "videos" | "websites";
  position: "top-left" | "top-right" | "bottom-center";
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  href: string;
  countLabel: Record<Locale, string>;
}

export interface WhyChooseUsItem {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  iconKey: "bespoke" | "roof" | "discovery" | "action";
}

export interface DesignClientCaseStudy {
  id: string;
  slug: string;
  name: string; // Preserved Latin proper brand name
  description: Record<Locale, string>;
  industryKey: "health-care" | "shipping" | "sports" | "home-decor";
  categoryChips: Record<Locale, [string, string]>;
  designerName: string;
  creditPrefix: Record<Locale, string>;
  creditFull: Record<Locale, string>;
  assetIds: string[];
}

export interface VideoIndustryGroup {
  id: string;
  slug: "health-care" | "shipping" | "sports" | "home-decor" | "ai-characters";
  title: Record<Locale, string>;
  editorialNote: Record<Locale, string>;
  assetIds: string[];
}

export interface ContactPhoneNumber {
  raw: string;
  display: string;
  telHref: string;
  hasWhatsApp: boolean;
  whatsappHref?: string;
}

export type WebsiteLayoutVariant =
  | "hero-plus-grid"
  | "split-editorial"
  | "dual-showcase"
  | "asymmetric-mosaic"
  | "closing-flagship";

export interface WebsiteCaseStudy {
  id: string;
  slug: string;
  folderNumber: string;
  driveFolderId: string;
  name: string;
  arabicName?: string;
  description: Record<Locale, string>;
  categoryChips: Record<Locale, [string, string]>;
  layoutVariant: WebsiteLayoutVariant;
  assetIds: string[];
  liveUrl?: string;
}


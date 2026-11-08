import manifestJson from "./media-manifest.json";
import { MediaAssetRecord } from "./types";

export interface MediaManifest {
  generatedAt: string;
  summary: {
    totalAssets: number;
    designImagesTotal: number;
    designImagesVerified: number;
    designImagesBlocked: number;
    videosTotal: number;
    videosVerified: number;
    videosBlocked: number;
    websiteImagesTotal: number;
    websiteImagesVerified: number;
    websiteImagesBlocked: number;
  };
  designs: MediaAssetRecord[];
  videos: MediaAssetRecord[];
  websites: MediaAssetRecord[];
}

export const MEDIA_MANIFEST: MediaManifest = manifestJson as MediaManifest;

const ASSET_MAP = new Map<string, MediaAssetRecord>();
for (const item of MEDIA_MANIFEST.designs) {
  ASSET_MAP.set(item.id, item);
}
for (const item of MEDIA_MANIFEST.videos) {
  ASSET_MAP.set(item.id, item);
}
for (const item of MEDIA_MANIFEST.websites || []) {
  ASSET_MAP.set(item.id, item);
}

export function getMediaAssetById(id: string): MediaAssetRecord | undefined {
  return ASSET_MAP.get(id);
}

export function getMediaAssetsByIds(ids: string[]): MediaAssetRecord[] {
  return ids
    .map((id) => ASSET_MAP.get(id))
    .filter((item): item is MediaAssetRecord => Boolean(item));
}


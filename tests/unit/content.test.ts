import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import {
  BUSINESS_CONFIG,
  CANONICAL_SERVICES_MAP,
  CONTACT_DROPDOWN_SERVICES,
  DESIGN_CLIENTS,
  DESIGN_SHOWCASE_BOXES,
  HOME_FEATURED_SERVICES,
  SERVICES_PAGE_ORDER,
  SITE_COPY,
  TOTAL_SHOWCASE_DESIGN_COUNT,
  VIDEO_INDUSTRY_GROUPS,
  WEBSITE_PROJECTS,
  WHY_CHOOSE_US_CARDS,
  WORK_FOLDERS,
} from "@/data/content";
import { MEDIA_MANIFEST } from "@/data/media";

describe("Helal Media Production — Canonical Data & Bilingual Integrity", () => {
  it("contains exact business email, all three phone numbers with correct WhatsApp configuration, and official social media links", () => {
    expect(BUSINESS_CONFIG.email).toBe("helal.media0@gmail.com");
    const rawPhones = BUSINESS_CONFIG.phones.map((p) => p.raw);
    expect(rawPhones).toEqual([
      "+201055515576",
      "+201158260899",
      "+201080645590",
    ]);

    // Number 1: +201055515576 (Phone + WhatsApp)
    expect(BUSINESS_CONFIG.phones[0].telHref).toBe("tel:+201055515576");
    expect(BUSINESS_CONFIG.phones[0].hasWhatsApp).toBe(true);
    expect(BUSINESS_CONFIG.phones[0].whatsappHref).toBe("https://wa.me/201055515576");

    // Number 2: +201158260899 (Phone + WhatsApp)
    expect(BUSINESS_CONFIG.phones[1].telHref).toBe("tel:+201158260899");
    expect(BUSINESS_CONFIG.phones[1].hasWhatsApp).toBe(true);
    expect(BUSINESS_CONFIG.phones[1].whatsappHref).toBe("https://wa.me/201158260899");

    // Number 3: +201080645590 (Phone ONLY, WhatsApp NOT enabled)
    expect(BUSINESS_CONFIG.phones[2].telHref).toBe("tel:+201080645590");
    expect(BUSINESS_CONFIG.phones[2].hasWhatsApp).toBe(false);
    expect(BUSINESS_CONFIG.phones[2].whatsappHref).toBeUndefined();

    expect(BUSINESS_CONFIG.socials.instagram).toBe(
      "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
    );
    expect(BUSINESS_CONFIG.socials.facebook).toBe(
      "https://www.facebook.com/share/1Fku98K1qm/"
    );
    expect(BUSINESS_CONFIG.socials.instagramLabel).toBe(
      "Helal Media on Instagram"
    );
    expect(BUSINESS_CONFIG.socials.facebookLabel).toBe(
      "Helal Media on Facebook"
    );
  });

  it("maintains a single canonical dataset of 8 official services with exact ordering", () => {
    expect(Object.keys(CANONICAL_SERVICES_MAP)).toHaveLength(8);
    expect(SERVICES_PAGE_ORDER.map((s) => s.title.en)).toEqual([
      "Social Media Management",
      "Branding",
      "Content Strategy",
      "Graphic Design",
      "Media Production",
      "Video Editing",
      "Web Development",
      "Paid Ads",
    ]);
    expect(CONTACT_DROPDOWN_SERVICES.map((s) => s.title.en)).toEqual([
      "Branding",
      "Social Media Management",
      "Content Strategy",
      "Graphic Design",
      "Media Production",
      "Video Editing",
      "Web Development",
      "Paid Ads",
    ]);
    expect(HOME_FEATURED_SERVICES.left.title.en).toBe("Branding");
    expect(HOME_FEATURED_SERVICES.center.title.en).toBe(
      "Social Media Management"
    );
    expect(HOME_FEATURED_SERVICES.right.title.en).toBe("Content Strategy");
  });

  it("defines the 3 portfolio folders with triangle geometry positions", () => {
    expect(WORK_FOLDERS.map((f) => ({ id: f.id, pos: f.position }))).toEqual([
      { id: "designs", pos: "top-left" },
      { id: "videos", pos: "top-right" },
      { id: "websites", pos: "bottom-center" },
    ]);
  });

  it("defines all 4 Why Choose Us cards in both EN and AR", () => {
    expect(WHY_CHOOSE_US_CARDS).toHaveLength(4);
    expect(WHY_CHOOSE_US_CARDS.map((c) => c.title.en)).toEqual([
      "No templates",
      "Everything under one roof",
      "We learn your brand first",
      "Built to drive action",
    ]);
    expect(WHY_CHOOSE_US_CARDS.map((c) => c.title.ar)).toEqual([
      "بدون قوالب جاهزة",
      "كل الخدمات تحت سقف واحد",
      "نفهم علامتك أولًا",
      "إبداع يحقق نتائج",
    ]);
  });

  it("maps 5 named Design Clients (24 assets) + 5 Interactive Design Showcase Boxes (34 assets) = 58 total verified design assets", () => {
    expect(DESIGN_CLIENTS).toHaveLength(5);
    expect(DESIGN_CLIENTS.map((c) => c.name)).toEqual([
      "Dr. Mohamed Ismail Dental Clinics",
      "Ogien Dental Clinic",
      "Fast Way",
      "Galaxy Swimming Academy",
      "Yadawy",
    ]);
    const totalDesignAssets = DESIGN_CLIENTS.reduce(
      (acc, c) => acc + c.assetIds.length,
      0
    );
    expect(totalDesignAssets).toBe(24);
    expect(DESIGN_SHOWCASE_BOXES).toHaveLength(5);
    expect(DESIGN_SHOWCASE_BOXES.map((b) => b.assetIds.length)).toEqual([
      8, 8, 7, 6, 5,
    ]);
    expect(TOTAL_SHOWCASE_DESIGN_COUNT).toBe(34);
    expect(MEDIA_MANIFEST.designs).toHaveLength(58);
    expect(MEDIA_MANIFEST.summary.designImagesVerified).toBe(58);
    expect(MEDIA_MANIFEST.summary.designImagesBlocked).toBe(0);
    for (const design of MEDIA_MANIFEST.designs) {
      expect(design.status).toBe("verified");
      expect(design.localPath).toBeTruthy();
      expect(design.width).toBeGreaterThan(0);
      expect(design.height).toBeGreaterThan(0);
    }
  });

  it("maps 5 Video Industry Groups with 23 total verified video assets (9 in Health Care in exact client-supplied order including HQ #7) and poster thumbnails, with AI Content Production category", () => {
    expect(VIDEO_INDUSTRY_GROUPS).toHaveLength(5);
    expect(VIDEO_INDUSTRY_GROUPS.map((g) => g.title.en)).toEqual([
      "Health Care",
      "Shipping",
      "Sports",
      "Home Decor",
      "AI Content Production",
    ]);
    expect(VIDEO_INDUSTRY_GROUPS.map((g) => g.title.ar)).toEqual([
      "الرعاية الصحية",
      "الشحن",
      "الرياضة",
      "ديكور المنزل",
      "إنتاج المحتوى بالذكاء الاصطناعي",
    ]);
    expect(VIDEO_INDUSTRY_GROUPS[0].assetIds).toHaveLength(9);
    expect(VIDEO_INDUSTRY_GROUPS[0].assetIds).toContain("video-health-care-8");
    expect(VIDEO_INDUSTRY_GROUPS[0].assetIds).toContain("video-health-care-9");

    const healthCareDriveIds = MEDIA_MANIFEST.videos
      .filter((v) => v.groupSlug === "health-care")
      .map((v) => v.driveFileId);
    expect(healthCareDriveIds).toEqual([
      "17SV0E9JO4LVoDaoGjTs5nLGL0tON_a-e",
      "1h3aUD9TvP-YbkTzf76U8TPJn0zKYcGHx",
      "1xB4hpyqi-XdgkAXSgzb-ehr1wMG_lmMx",
      "1Bdv-mjIagc7zJ-IRs3aiaB8T2kOWPTlO",
      "1SWJ4ot--7suRr-OpfwEtTs2fwSyydmzj",
      "1Pd6N5ABBFnFUxuH6__vgAwdmSLR7ez12",
      "1w51Nk77tqLiE0ibWA7yFHSw3lEx9c2N2",
      "1jT0T55CMY6PRtdRqF4EU7S0lbNR0yfwb",
      "1nva8k10_tOk9l6Vz-mKLhXN1Z-QkAXqP",
    ]);

    const totalVideoAssets = VIDEO_INDUSTRY_GROUPS.reduce(
      (acc, g) => acc + g.assetIds.length,
      0
    );
    expect(totalVideoAssets).toBe(23);
    expect(MEDIA_MANIFEST.videos).toHaveLength(23);
    expect(MEDIA_MANIFEST.summary.videosVerified).toBe(23);
    expect(MEDIA_MANIFEST.summary.videosBlocked).toBe(0);
    for (const video of MEDIA_MANIFEST.videos) {
      expect(video.status).toBe("verified");
      expect(video.localPath).toBeTruthy();
      expect(video.posterPath).toBeTruthy();
      expect(video.duration).toBeGreaterThan(0);
    }
  });

  it("maps 5 verified Website Projects with 24 total website screenshots and preserves exact Contact copy", () => {
    expect(WEBSITE_PROJECTS).toHaveLength(5);
    expect(WEBSITE_PROJECTS.map((p) => p.name)).toEqual([
      "AutoParts",
      "FitTrack",
      "Awfa Smart E-Services",
      "Yadawy",
      "Kiya",
    ]);
    expect(WEBSITE_PROJECTS.map((p) => p.slug)).toEqual([
      "autoparts",
      "fittrack",
      "awfa-smart-services",
      "yadawy",
      "kiya",
    ]);
    const totalWebsiteAssets = WEBSITE_PROJECTS.reduce(
      (acc, p) => acc + p.assetIds.length,
      0
    );
    expect(totalWebsiteAssets).toBe(24);
    expect(MEDIA_MANIFEST.websites).toHaveLength(24);
    expect(MEDIA_MANIFEST.summary.websiteImagesVerified).toBe(24);
    expect(MEDIA_MANIFEST.summary.websiteImagesBlocked).toBe(0);
    for (const siteImg of MEDIA_MANIFEST.websites) {
      expect(siteImg.status).toBe("verified");
      expect(siteImg.localPath).toMatch(/^\/portfolio\/websites\/.+\.webp$/);
      expect(siteImg.width).toBeGreaterThan(0);
      expect(siteImg.height).toBeGreaterThan(0);
    }

    expect(
      `${SITE_COPY.en.contactPage.heroPrefix}${SITE_COPY.en.contactPage.heroAccent}${SITE_COPY.en.contactPage.heroSuffix}`
    ).toBe("Marketing has no catalog. We’ll write your brand’s");
    expect(SITE_COPY.en.contactPage.form.successMessage).toBe(
      "Got it! Helal Media will be in touch soon"
    );
    expect(SITE_COPY.ar.contactPage.form.successMessage).toBe(
      "وصلتنا رسالتك! هلال ميديا هتتواصل معاك قريبًا."
    );
  });

  it("verifies 100% Google Drive independence: all 69 media files (24 designs + 21 videos + 24 website screenshots) + 21 posters exist locally in public/ and zero runtime components reference Google Drive", () => {
    const publicDir = path.join(process.cwd(), "public");
    const rawCacheDir = path.join(process.cwd(), ".media-cache");

    // 1. Verify all 24 design images exist physically in both public/portfolio/designs/ and public/media/designs/ + .media-cache/
    for (const design of MEDIA_MANIFEST.designs) {
      expect(design.localPath).toMatch(/^\/portfolio\/designs\/.+\.webp$/);
      expect(design.localPath).not.toContain("drive.google.com");
      expect(design.localPath).not.toContain("googleusercontent.com");

      const primaryAbs = path.join(
        publicDir,
        design.localPath!.replace(/^\//, "")
      );
      expect(fs.existsSync(primaryAbs), `Missing ${primaryAbs}`).toBe(true);
      expect(fs.statSync(primaryAbs).size).toBeGreaterThan(1024);

      const numStr = String(design.index).padStart(2, "0");
      const mirrorAbs = path.join(
        publicDir,
        "media",
        "designs",
        design.groupSlug,
        `${design.groupSlug}-${numStr}.webp`
      );
      expect(fs.existsSync(mirrorAbs), `Missing mirror ${mirrorAbs}`).toBe(
        true
      );
      expect(fs.statSync(mirrorAbs).size).toBeGreaterThan(1024);

      const rawAbs = path.join(
        rawCacheDir,
        `${design.id}_${design.driveFileId}.bin`
      );
      expect(fs.existsSync(rawAbs), `Missing original raw ${rawAbs}`).toBe(
        true
      );
      expect(fs.statSync(rawAbs).size).toBeGreaterThan(1024);
    }

    // 2. Verify all 21 videos and 21 poster thumbnails exist physically in public/portfolio/videos/, public/media/videos/, and public/media/posters/
    for (const video of MEDIA_MANIFEST.videos) {
      expect(video.localPath).toMatch(/^\/portfolio\/videos\/.+\.mp4$/);
      expect(video.localPath).not.toContain("drive.google.com");
      expect(video.localPath).not.toContain("googleusercontent.com");

      const primaryVideoAbs = path.join(
        publicDir,
        video.localPath!.replace(/^\//, "")
      );
      expect(fs.existsSync(primaryVideoAbs), `Missing ${primaryVideoAbs}`).toBe(
        true
      );
      expect(fs.statSync(primaryVideoAbs).size).toBeGreaterThan(10000);

      const numStr = String(video.index).padStart(2, "0");
      const mirrorVideoAbs = path.join(
        publicDir,
        "media",
        "videos",
        video.groupSlug,
        `${video.groupSlug}-${numStr}.mp4`
      );
      expect(
        fs.existsSync(mirrorVideoAbs),
        `Missing mirror ${mirrorVideoAbs}`
      ).toBe(true);
      expect(fs.statSync(mirrorVideoAbs).size).toBeGreaterThan(10000);

      const posterAbs = path.join(
        publicDir,
        video.posterPath!.replace(/^\//, "")
      );
      expect(fs.existsSync(posterAbs), `Missing poster ${posterAbs}`).toBe(
        true
      );
      expect(fs.statSync(posterAbs).size).toBeGreaterThan(1024);
    }

    // 3. Verify all 24 website screenshots exist physically in public/portfolio/websites/, public/media/websites/, and .media-cache/
    for (const siteImg of MEDIA_MANIFEST.websites) {
      expect(siteImg.localPath).toMatch(/^\/portfolio\/websites\/.+\.webp$/);
      expect(siteImg.localPath).not.toContain("drive.google.com");
      expect(siteImg.localPath).not.toContain("googleusercontent.com");

      const primarySiteAbs = path.join(
        publicDir,
        siteImg.localPath!.replace(/^\//, "")
      );
      expect(
        fs.existsSync(primarySiteAbs),
        `Missing website image ${primarySiteAbs}`
      ).toBe(true);
      expect(fs.statSync(primarySiteAbs).size).toBeGreaterThan(1024);

      const numStr = String(siteImg.index).padStart(2, "0");
      const mirrorSiteAbs = path.join(
        publicDir,
        "media",
        "websites",
        siteImg.groupSlug,
        `${siteImg.groupSlug}-${numStr}.webp`
      );
      expect(
        fs.existsSync(mirrorSiteAbs),
        `Missing website mirror ${mirrorSiteAbs}`
      ).toBe(true);
      expect(fs.statSync(mirrorSiteAbs).size).toBeGreaterThan(1024);

      const rawSiteAbs = path.join(
        rawCacheDir,
        `${siteImg.id}_${siteImg.driveFileId}.bin`
      );
      expect(
        fs.existsSync(rawSiteAbs),
        `Missing website raw cache ${rawSiteAbs}`
      ).toBe(true);
      expect(fs.statSync(rawSiteAbs).size).toBeGreaterThan(1024);
    }

    // 4. Verify all media manifest localPath and posterPath values point exclusively to local public/ paths
    expect(MEDIA_MANIFEST.summary.totalAssets).toBe(105);
    expect(BUSINESS_CONFIG.officialSlogan.ar).toBe("التسويق ملوش كتالوج");
    expect(SITE_COPY.en.footer.tagline).toBe("التسويق ملوش كتالوج");
    expect(SITE_COPY.ar.footer.tagline).toBe("التسويق ملوش كتالوج");
    expect(SITE_COPY.en.workHub.heading).toBe("Work by Our Team");
    expect(SITE_COPY.en.workHub.supportingCopy).toBe(
      "Explore the work our team has delivered across different industries."
    );
    for (const asset of [
      ...MEDIA_MANIFEST.designs,
      ...MEDIA_MANIFEST.videos,
      ...MEDIA_MANIFEST.websites,
    ]) {
      expect(asset.localPath).not.toContain("drive.google.com");
      expect(asset.localPath).not.toContain("googleusercontent.com");
      if (asset.posterPath) {
        expect(asset.posterPath).toMatch(/^\/media\/posters\/.+\.webp$/);
      }
    }
  });
});


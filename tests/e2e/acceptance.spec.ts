import { test, expect } from "@playwright/test";

const ARTIFACT_DIR =
  "C:/Users/ADMIN/.gemini/antigravity/brain/c6405892-644c-4191-872b-186e2f79b68c";

test.describe("Helal Media Production — Full Acceptance Matrix (EN & AR)", () => {
  test("1. Splash Intro, Skip Control, Internal Navigation No-Replay, Header, Footer & #about Cross-Route Navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    // Splash intro appears on fresh visit and can be skipped cleanly
    const introOverlay = page.getByTestId("intro-overlay");
    await expect(introOverlay).toBeVisible();
    await expect(introOverlay.locator('img[src="/brand/helal-logo.svg"]')).toBeVisible();
    await expect(introOverlay).toContainText("Helal Media Production");
    await expect(introOverlay).toContainText("Marketing Has No Catalog");

    // Verify official brand CSS variables and #000000 primary background
    const brandTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      const bodyBg = getComputedStyle(document.body).backgroundColor;
      return {
        bgPrimary: style.getPropertyValue("--background-primary").trim().toLowerCase(),
        brandBlue: style.getPropertyValue("--brand-blue").trim().toUpperCase(),
        brandPurple: style.getPropertyValue("--brand-purple").trim().toUpperCase(),
        brandPink: style.getPropertyValue("--brand-pink").trim().toUpperCase(),
        brandOrange: style.getPropertyValue("--brand-orange").trim().toUpperCase(),
        bodyBg,
      };
    });
    expect(["#000", "#000000"]).toContain(brandTokens.bgPrimary);
    expect(brandTokens.brandBlue).toBe("#14ACF3");
    expect(brandTokens.brandPurple).toBe("#8145CA");
    expect(brandTokens.brandPink).toBe("#F3398D");
    expect(brandTokens.brandOrange).toBe("#FF7538");
    expect(brandTokens.bodyBg).toBe("rgb(0, 0, 0)");

    await page.getByTestId("intro-skip-button").click();
    await expect(introOverlay).toBeHidden();

    // Header & Footer display the official Helal Media Production vector logo
    await expect(
      page.getByTestId("site-header").locator('img[src="/brand/helal-logo.svg"]')
    ).toBeVisible();
    await expect(
      page.getByTestId("site-footer").locator('img[src="/brand/helal-logo.svg"]')
    ).toBeVisible();

    // Verify Footer official Instagram & Facebook links on Desktop
    const footerIg = page.getByTestId("footer-social-instagram");
    const footerFb = page.getByTestId("footer-social-facebook");
    await expect(footerIg).toHaveAttribute(
      "href",
      "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
    );
    await expect(footerIg).toHaveAttribute("target", "_blank");
    await expect(footerIg).toHaveAttribute("rel", "noopener noreferrer");
    await expect(footerIg).toHaveAttribute(
      "aria-label",
      "Helal Media on Instagram"
    );
    await expect(footerFb).toHaveAttribute(
      "href",
      "https://www.facebook.com/share/1Fku98K1qm/"
    );
    await expect(footerFb).toHaveAttribute("target", "_blank");
    await expect(footerFb).toHaveAttribute("rel", "noopener noreferrer");
    await expect(footerFb).toHaveAttribute(
      "aria-label",
      "Helal Media on Facebook"
    );

    // Navigating internally should NOT replay the splash overlay
    await page.getByTestId("nav-link-services").click();
    await expect(page).toHaveURL(/\/en\/services$/);
    await expect(page.getByTestId("intro-overlay")).toHaveCount(0);

    // Clicking "About" from nested route (/en/services) navigates to /en#about
    await page.getByTestId("nav-link-about").click();
    await expect(page).toHaveURL(/\/en#about$/);
    await expect(page.getByTestId("about-section")).toBeVisible();

    // Global Footer contains exact email, all three phone numbers, and phone/WhatsApp action verification
    const footer = page.getByTestId("site-footer");
    await expect(footer).toContainText(
      "Marketing has no catalog — a full-service marketing agency"
    );
    await expect(footer).toContainText("helal.media0@gmail.com");
    await expect(footer).toContainText("+201055515576");
    await expect(footer).toContainText("+201158260899");
    await expect(footer).toContainText("+201080645590");

    // Number 1 (+201055515576): Phone + WhatsApp
    await expect(page.getByTestId("footer-phone-+201055515576")).toHaveAttribute(
      "href",
      "tel:+201055515576"
    );
    await expect(page.getByTestId("footer-whatsapp-+201055515576")).toHaveAttribute(
      "href",
      "https://wa.me/201055515576"
    );

    // Number 2 (+201158260899): Phone + WhatsApp
    await expect(page.getByTestId("footer-phone-+201158260899")).toHaveAttribute(
      "href",
      "tel:+201158260899"
    );
    await expect(page.getByTestId("footer-whatsapp-+201158260899")).toHaveAttribute(
      "href",
      "https://wa.me/201158260899"
    );

    // Number 3 (+201080645590): Phone ONLY (WhatsApp NOT enabled)
    await expect(page.getByTestId("footer-phone-+201080645590")).toHaveAttribute(
      "href",
      "tel:+201080645590"
    );
    await expect(page.getByTestId("footer-whatsapp-+201080645590")).toHaveCount(0);

    await expect(footer).toContainText("Open by appointment");
    await expect(footer).toContainText("2026 Helal Media. All rights reserved");
    await expect(footer).toContainText("Strategy · Creativity · Production");
  });

  test("2. Homepage Exact Section Sequence, Featured 3-Card Geometry, Folder Triangle, and 4 Reveal Cards", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("helal_intro_seen_v1", "1");
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    await page.screenshot({
      path: `${ARTIFACT_DIR}/home-en-desktop.png`,
      fullPage: false,
    });

    // 3.1 Hero with colored Partner
    await expect(page.getByTestId("hero-section")).toContainText(
      "Full-Service Marketing Agency"
    );
    await expect(page.getByTestId("hero-headline")).toContainText(
      "Your Strategic Creative Partner"
    );
    await expect(page.getByTestId("hero-accent-word")).toHaveText("Partner");

    // 3.2 About section verbatim text & CTAs
    await expect(page.getByTestId("about-subheading")).toHaveText(
      "At Helal Media, we don’t just do marketing."
    );
    await expect(page.getByTestId("about-paragraph-1")).toHaveText(
      "We get to know your brand, your audience, and what drives them, then turn that into ideas that get noticed, build trust, and drive action."
    );
    await expect(page.getByTestId("about-paragraph-2")).toHaveText(
      "The result? Brands that don’t just get seen. They get remembered, and they sell"
    );
    await expect(page.getByTestId("about-cta-start-project")).toHaveAttribute(
      "href",
      "/en/contact"
    );
    await expect(page.getByTestId("about-cta-see-projects")).toHaveAttribute(
      "href",
      "/en/work"
    );

    // 3.3 Services Preview: Left = Branding, Center = Social Media Management (larger focal point), Right = Content Strategy
    const leftCard = page.getByTestId("service-preview-card-left");
    const centerCard = page.getByTestId("service-preview-card-center");
    const rightCard = page.getByTestId("service-preview-card-right");

    await expect(leftCard).toContainText("Branding");
    await expect(centerCard).toContainText("Social Media Management");
    await expect(rightCard).toContainText("Content Strategy");

    const leftBox = await leftCard.boundingBox();
    const centerBox = await centerCard.boundingBox();
    const rightBox = await rightCard.boundingBox();
    expect(leftBox).not.toBeNull();
    expect(centerBox).not.toBeNull();
    expect(rightBox).not.toBeNull();

    // Spatial verification: Left < Center < Right horizontally, and Center is larger
    expect(leftBox!.x).toBeLessThan(centerBox!.x);
    expect(centerBox!.x).toBeLessThan(rightBox!.x);
    expect(centerBox!.height).toBeGreaterThan(leftBox!.height);

    // 3.4 Work Folders Triangle Geometry: Designs (top-left), Videos (top-right), Websites (bottom-center)
    const designsFolder = page.getByTestId("work-folder-designs");
    const videosFolder = page.getByTestId("work-folder-videos");
    const websitesFolder = page.getByTestId("work-folder-websites");

    const dBox = await designsFolder.boundingBox();
    const vBox = await videosFolder.boundingBox();
    const wBox = await websitesFolder.boundingBox();
    expect(dBox!.x).toBeLessThan(vBox!.x);
    expect(wBox!.y).toBeGreaterThan(dBox!.y + 40);
    expect(wBox!.x).toBeGreaterThan(dBox!.x);
    expect(wBox!.x).toBeLessThan(vBox!.x);

    // 3.5 Why Choose Us: 4 interactive reveal cards collapsed by default, toggle on click
    const firstTrigger = page.getByTestId("why-us-trigger-no-templates");
    const firstPanel = page.getByTestId("why-us-panel-no-templates");
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(firstPanel).toBeHidden();

    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    await expect(firstPanel).toBeVisible();
    await expect(firstPanel).toContainText(
      "Every strategy is built around your brand, never copied."
    );

    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(firstPanel).toBeHidden();
  });

  test("3. Services Page: 8 Official Services in Exact Order & Copy", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("helal_intro_seen_v1", "1");
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/services");

    await expect(page.getByTestId("services-page-eyebrow")).toHaveText(
      "services"
    );
    await expect(page.getByTestId("services-page-headline")).toHaveText(
      "Built around your brand, not a template."
    );

    const expectedOrder = [
      "Social Media Management",
      "Branding",
      "Content Strategy",
      "Graphic Design",
      "Media Production",
      "Video Editing",
      "Web Development",
      "Paid Ads",
    ];

    for (let i = 0; i < expectedOrder.length; i++) {
      const item = page.getByTestId(`full-service-item-${i + 1}`);
      await expect(item).toContainText(expectedOrder[i]);
    }

    await expect(page.getByTestId("closing-cta-headline")).toHaveText(
      "Let’s build it together."
    );
    await expect(page.getByTestId("closing-cta-button")).toHaveAttribute(
      "href",
      "/en/contact"
    );
  });

  test("4. Work Hub, Designs Collection (5 Clients, 24 Images + Lightbox), Videos Collection (5 Industries, 21 Videos), Websites Collection — Zero Google Drive Dependency", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("helal_intro_seen_v1", "1");
    });
    await page.setViewportSize({ width: 1440, height: 900 });

    // Simulate revoked Google Drive public sharing by intercepting & blocking any Google Drive or Google User Content requests
    const attemptedGoogleDriveRequests: string[] = [];
    await page.route(
      /drive\.google\.com|drive\.usercontent\.google\.com|googleusercontent\.com|docs\.google\.com/i,
      async (route) => {
        attemptedGoogleDriveRequests.push(route.request().url());
        await route.abort("blockedbyclient");
      }
    );

    // Work Hub
    await page.goto("/en/work");
    await expect(page.getByTestId("work-hub-supporting-copy")).toHaveText(
      "Discover how we’ve helped brands stand out and succeed."
    );

    // Navigate to Designs
    await page.getByTestId("work-folder-designs").click();
    await expect(page).toHaveURL(/\/en\/work\/designs$/);
    await expect(page.getByTestId("collection-headline")).toHaveText("Designs");
    await expect(page.getByTestId("collection-overview-label")).toHaveText(
      "Overview"
    );

    // Verify all 5 named design clients and 24 design cards
    const designCards = page.locator('[data-testid^="design-asset-card-"]');
    await expect(designCards).toHaveCount(24);
    await expect(
      page.getByTestId("client-name-dr-mohamed-ismail-dental-clinics")
    ).toHaveText("Dr. Mohamed Ismail Dental Clinics");
    await expect(
      page.getByTestId("client-credit-ogien-dental-clinic")
    ).toContainText("Omar Abdelrahim");

    // Ensure no missing-media placeholders or "Verified Client Asset Unavailable" text appear anywhere
    await expect(page.locator('[data-testid^="missing-media-"]')).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(
      "Verified Client Asset Unavailable"
    );

    // Deterministically load & verify all 24 authentic client design images (including all 5 Ogien Dental Clinic images) with naturalWidth > 0
    const imgAudit = await page.evaluate(async () => {
      const imgs = Array.from(
        document.querySelectorAll('[data-testid^="design-asset-card-"] img')
      ) as HTMLImageElement[];
      await Promise.all(
        imgs.map((img) => {
          img.loading = "eager";
          if (img.complete && img.naturalWidth > 0) {
            return Promise.resolve();
          }
          return new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
            // Re-trigger load if needed
            const src = img.getAttribute("src");
            if (src) img.src = src;
          });
        })
      );
      return imgs.map((img) => ({
        src: img.getAttribute("src") || "",
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
    });
    expect(imgAudit.length).toBe(24);
    for (const item of imgAudit) {
      expect(item.src).toMatch(/^\/portfolio\/designs\/.+\.webp$/);
      expect(
        item.naturalWidth,
        `Broken image detected for ${item.src}`
      ).toBeGreaterThan(0);
      expect(item.naturalHeight).toBeGreaterThan(0);
    }

    // Scroll back to top for full Designs Hero + Client #1 screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `${ARTIFACT_DIR}/designs-en-desktop.png`,
      fullPage: false,
    });

    // Scroll to Ogien Dental Clinic section and capture screenshot of the 5 real client designs
    const ogienSection = page.getByTestId(
      "design-client-section-ogien-dental-clinic"
    );
    await ogienSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await ogienSection.screenshot({
      path: `${ARTIFACT_DIR}/ogien-dental-clinic-desktop.png`,
    });

    // Test Lightbox open & close
    await designCards.first().click();
    await expect(page.getByTestId("media-lightbox")).toBeVisible();
    await page.getByTestId("lightbox-close-button").click();
    await expect(page.getByTestId("media-lightbox")).toBeHidden();

    // Navigate to Videos
    await page.goto("/en/work/videos");
    await expect(page.getByTestId("collection-headline")).toHaveText("Videos");
    const videoCards = page.locator('[data-testid^="video-asset-card-"]');
    await expect(videoCards).toHaveCount(21);
    await expect(
      page.locator('[data-testid^="unavailable-video-"]')
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid^="video-asset-card-"] video')
    ).toHaveCount(21);
    await expect(
      page.getByTestId("video-industry-heading-health-care")
    ).toHaveText("Health Care");
    await expect(
      page.getByTestId("video-industry-heading-ai-characters")
    ).toHaveText("AI Characters");

    // Verify all 21 video elements use local /portfolio/videos/ paths and local /media/posters/ thumbnails, and verify HTTP 200 on every single one
    const videoDomAudit = await page.evaluate(() => {
      const vids = Array.from(
        document.querySelectorAll('[data-testid^="video-asset-card-"] video')
      ) as HTMLVideoElement[];
      return vids.map((v) => ({
        src: v.getAttribute("src") || "",
        poster: v.getAttribute("poster") || "",
      }));
    });
    expect(videoDomAudit.length).toBe(21);
    for (const v of videoDomAudit) {
      expect(v.src).toMatch(/^\/portfolio\/videos\/.+\.mp4$/);
      expect(v.poster).toMatch(/^\/media\/posters\/.+\.webp$/);
      const vRes = await page.request.head(v.src);
      expect(vRes.status(), `Failed HEAD for video ${v.src}`).toBe(200);
      const pRes = await page.request.head(v.poster);
      expect(pRes.status(), `Failed HEAD for poster ${v.poster}`).toBe(200);
    }

    // Verify that ZERO network requests were made to Google Drive across both Designs and Videos pages
    expect(attemptedGoogleDriveRequests).toEqual([]);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/videos-en-desktop.png`,
      fullPage: false,
    });

    // Navigate to Websites
    await page.goto("/en/work/websites");
    await expect(page.getByTestId("collection-eyebrow")).toHaveText(
      "Case Study"
    );
    await expect(page.getByTestId("collection-headline")).toHaveText(
      "Websites"
    );
    await expect(page.getByTestId("collection-supporting-copy")).toHaveText(
      "Live websites, built around each client’s needs."
    );
    await expect(page.getByTestId("collection-extra-tag")).toHaveText(
      "Web Design & Development"
    );
    await expect(page.getByTestId("collection-overview-label")).toHaveText(
      "Overview"
    );
    await expect(page.getByTestId("collection-overview-copy")).toHaveText(
      "A selection of websites our team designed and built, each one shaped around its brand’s goals, across different industries."
    );
    await expect(page.getByTestId("collection-subheading")).toHaveText(
      "In This Collection"
    );

    // Verify all 5 Website projects and all 24 Website screenshot cards
    const expectedWebsites = [
      { slug: "autoparts", name: "AutoParts" },
      { slug: "fittrack", name: "FitTrack" },
      { slug: "awfa-smart-services", name: "Awfa Smart E-Services" },
      { slug: "yadawy", name: "Yadawy" },
      { slug: "kiya", name: "Kiya" },
    ];
    for (const site of expectedWebsites) {
      await expect(
        page.getByTestId(`website-project-section-${site.slug}`)
      ).toBeVisible();
      await expect(
        page.getByTestId(`website-name-${site.slug}`)
      ).toContainText(site.name);
    }

    const websiteCards = page.locator('[data-testid^="website-asset-card-"]');
    await expect(websiteCards).toHaveCount(24);
    await expect(
      page.locator('[data-testid^="missing-website-media-"]')
    ).toHaveCount(0);

    // Deterministically load & verify all 24 website screenshots with naturalWidth > 0
    const websiteImgAudit = await page.evaluate(async () => {
      const imgs = Array.from(
        document.querySelectorAll('[data-testid^="website-asset-card-"] img')
      ) as HTMLImageElement[];
      await Promise.all(
        imgs.map((img) => {
          img.loading = "eager";
          if (img.complete && img.naturalWidth > 0) {
            return Promise.resolve();
          }
          return new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
            const src = img.getAttribute("src");
            if (src) img.src = src;
          });
        })
      );
      return imgs.map((img) => ({
        src: img.getAttribute("src") || "",
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
    });
    expect(websiteImgAudit.length).toBe(24);
    for (const item of websiteImgAudit) {
      expect(item.src).toMatch(/^\/portfolio\/websites\/.+\.webp$/);
      expect(
        item.naturalWidth,
        `Broken website screenshot detected for ${item.src}`
      ).toBeGreaterThan(0);
      expect(item.naturalHeight).toBeGreaterThan(0);
    }

    // Verify zero Google Drive requests across Designs, Videos, and Websites
    expect(attemptedGoogleDriveRequests).toEqual([]);

    // Scroll to top of Websites page and capture desktop screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `${ARTIFACT_DIR}/websites-en-desktop.png`,
      fullPage: false,
    });

    // Test Lightbox open & close on Websites collection
    await websiteCards.first().click();
    await expect(page.getByTestId("media-lightbox")).toBeVisible();
    await page.getByTestId("lightbox-close-button").click();
    await expect(page.getByTestId("media-lightbox")).toBeHidden();
  });

  test("5. Contact Page: Verbatim Headline, 4 Fields, 8 Service Options, Unconfigured Blocker vs. Genuine Server-Ack Success", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("helal_intro_seen_v1", "1");
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/contact");

    await expect(page.getByTestId("contact-hero-headline")).toHaveText(
      "Marketing has no catalog. We’ll write your brand’s"
    );
    await expect(page.getByTestId("contact-accent-catalog")).toHaveText(
      "catalog"
    );

    // Verify Contact Page official Instagram & Facebook links
    const contactIg = page.getByTestId("contact-social-instagram");
    const contactFb = page.getByTestId("contact-social-facebook");
    await expect(contactIg).toHaveAttribute(
      "href",
      "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
    );
    await expect(contactIg).toHaveAttribute("target", "_blank");
    await expect(contactIg).toHaveAttribute("rel", "noopener noreferrer");
    await expect(contactIg).toHaveAttribute(
      "aria-label",
      "Helal Media on Instagram"
    );
    await expect(contactFb).toHaveAttribute(
      "href",
      "https://www.facebook.com/share/1Fku98K1qm/"
    );
    await expect(contactFb).toHaveAttribute("target", "_blank");
    await expect(contactFb).toHaveAttribute("rel", "noopener noreferrer");
    await expect(contactFb).toHaveAttribute(
      "aria-label",
      "Helal Media on Facebook"
    );

    // Verify Contact Page phone & WhatsApp actions
    // Number 1 (+201055515576): Phone + WhatsApp
    await expect(page.getByTestId("contact-phone-+201055515576")).toHaveAttribute(
      "href",
      "tel:+201055515576"
    );
    await expect(page.getByTestId("contact-whatsapp-+201055515576")).toHaveAttribute(
      "href",
      "https://wa.me/201055515576"
    );

    // Number 2 (+201158260899): Phone + WhatsApp
    await expect(page.getByTestId("contact-phone-+201158260899")).toHaveAttribute(
      "href",
      "tel:+201158260899"
    );
    await expect(page.getByTestId("contact-whatsapp-+201158260899")).toHaveAttribute(
      "href",
      "https://wa.me/201158260899"
    );

    // Number 3 (+201080645590): Phone ONLY (WhatsApp NOT enabled)
    await expect(page.getByTestId("contact-phone-+201080645590")).toHaveAttribute(
      "href",
      "tel:+201080645590"
    );
    await expect(page.getByTestId("contact-whatsapp-+201080645590")).toHaveCount(0);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/contact-en-desktop.png`,
      fullPage: false,
    });

    // Verify 8 service options + 1 placeholder option = 9 options
    const options = page.locator('[data-testid="select-service"] option');
    await expect(options).toHaveCount(9);

    // Fill out form and submit WITHOUT SMTP configured -> Must show honest blocker and preserve input!
    await page.getByTestId("input-name").fill("Nour El-Din");
    await page.getByTestId("input-email").fill("nour@example.com");
    await page.getByTestId("select-service").selectOption("Branding");
    await page
      .getByTestId("textarea-project")
      .fill("Full rebranding and campaign launch for our Cairo Flagship.");

    await page.getByTestId("contact-submit-button").click();

    await expect(page.getByTestId("contact-form-error")).toBeVisible();
    await expect(page.getByTestId("input-name")).toHaveValue("Nour El-Din");

    // Verify server-side validation and honeypot protection directly against /api/contact
    const invalidRes = await page.request.post("/api/contact", {
      data: { name: "", email: "bad-email", project: "" },
    });
    expect(invalidRes.status()).toBe(422);

    const spamRes = await page.request.post("/api/contact", {
      data: {
        name: "Bot",
        email: "bot@example.com",
        project: "Spam",
        company_website: "https://spam.example.com",
      },
    });
    expect(spamRes.status()).toBe(400);

    // Verify that when the server acknowledges genuine delivery (HTTP 200 delivered: true), the exact success message renders
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          delivered: true,
          transport: "smtp-verified",
        }),
      });
    });
    await page.getByTestId("contact-submit-button").click();

    await expect(page.getByTestId("contact-form-success")).toBeVisible();
    await expect(page.getByTestId("contact-form-success")).toContainText(
      "Got it! Helal Media will be in touch soon"
    );
  });

  test("6. Arabic Localization (RTL), Language Switching Route Preservation, and Zero Horizontal Overflow Across Viewports", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("helal_intro_seen_v1", "1");
    });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/en/work/designs");
    await page.getByTestId("language-switcher").click();
    await expect(page).toHaveURL(/\/ar\/work\/designs$/);

    const htmlDir = await page.locator("html").getAttribute("dir");
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlDir).toBe("rtl");
    expect(htmlLang).toBe("ar");

    await expect(page.getByTestId("collection-headline")).toHaveText(
      "التصميمات"
    );

    // Verify Arabic RTL Websites Case Study page and non-mirrored browser frames
    await page.goto("/ar/work/websites");
    await expect(page.getByTestId("collection-headline")).toHaveText(
      "المواقع الإلكترونية"
    );
    await expect(
      page.getByTestId("website-name-awfa-smart-services")
    ).toHaveText("أوفى الذكية للخدمات الإلكترونية — Awfa Smart E-Services");
    await expect(
      page.locator('[data-testid^="website-asset-card-"]').first()
    ).toHaveAttribute("dir", "ltr");

    await page.goto("/ar");
    // Ensure official logo container remains LTR (never mirrored) in Arabic RTL
    await expect(
      page.getByTestId("site-header").getByTestId("helal-official-logo-full")
    ).toHaveAttribute("dir", "ltr");
    await page.screenshot({
      path: `${ARTIFACT_DIR}/home-ar-rtl-desktop.png`,
      fullPage: false,
    });

    // Test responsive viewports in both /en and /ar for zero horizontal scroll
    const viewports = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 840 });
      for (const route of ["/en", "/ar", "/en/services", "/ar/contact"]) {
        await page.goto(route);
        if (width === 375 && route === "/ar") {
          await page.screenshot({
            path: `${ARTIFACT_DIR}/home-ar-mobile-375.png`,
            fullPage: false,
          });
          // Verify official social links on mobile Arabic view
          await expect(page.getByTestId("footer-social-instagram")).toHaveAttribute(
            "href",
            "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
          );
          await expect(page.getByTestId("footer-social-facebook")).toHaveAttribute(
            "href",
            "https://www.facebook.com/share/1Fku98K1qm/"
          );
        }
        if (width === 375 && route === "/ar/contact") {
          await expect(page.getByTestId("contact-social-instagram")).toHaveAttribute(
            "href",
            "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
          );
          await expect(page.getByTestId("contact-social-facebook")).toHaveAttribute(
            "href",
            "https://www.facebook.com/share/1Fku98K1qm/"
          );
        }
        const overflow = await page.evaluate(() => {
          return (
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth
          );
        });
        expect(
          overflow,
          `Horizontal overflow detected at ${width}px on ${route}`
        ).toBe(false);
      }
    }
  });
});

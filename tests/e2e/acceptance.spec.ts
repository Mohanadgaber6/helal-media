import { test, expect } from "@playwright/test";

const ARTIFACT_DIR =
  "C:/Users/ADMIN/.gemini/antigravity/brain/c6405892-644c-4191-872b-186e2f79b68c";

test.describe("Helal Media Production — Full Acceptance Matrix (EN & AR)", () => {
  test.beforeEach(async ({ page }) => {
    // Prevent external Google Fonts CDN latency from blocking window 'load' event during headless E2E tests
    await page.route(/fonts\.googleapis\.com|fonts\.gstatic\.com/i, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/css",
        body: "",
      });
    });
  });

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
    await expect(page.getByTestId("intro-slogan-ar")).toHaveText("التسويق ملوش كتالوج");

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

    // Task 4: Header Contact Us button beside Language Switcher
    const headerContactCta = page.getByTestId("header-contact-cta");
    await expect(headerContactCta).toBeVisible();
    await expect(headerContactCta).toContainText("Contact Us");
    await expect(headerContactCta).toHaveAttribute("href", "/en/contact");

    // Task 6: Interactive Sound Toggle (OFF by default, toggles ON/OFF)
    const soundToggle = page.getByTestId("sound-toggle");
    await expect(soundToggle).toBeVisible();
    await expect(soundToggle).toHaveAttribute("aria-pressed", "false");
    await expect(soundToggle).toHaveAttribute("data-sound-state", "off");
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute("aria-pressed", "true");
    await expect(soundToggle).toHaveAttribute("data-sound-state", "on");
    await soundToggle.click();
    await expect(soundToggle).toHaveAttribute("aria-pressed", "false");

    // Task 5: Persistent Floating WhatsApp Button (EN LTR bottom-right)
    const floatingWa = page.getByTestId("floating-whatsapp-button");
    await expect(floatingWa).toBeVisible();
    await expect(floatingWa).toHaveAttribute("href", "https://wa.me/201055515576");
    const waBoxEn = await floatingWa.boundingBox();
    expect(waBoxEn!.x).toBeGreaterThan(700);

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
    await expect(footer).toContainText("التسويق ملوش كتالوج");
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

    await expect(footer).not.toContainText("Open by appointment");
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
    await page.waitForTimeout(750);

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
    await expect(
      page.getByTestId("about-cta-see-projects")
    ).toHaveAttribute("href", "/en/work");

    // Item 2: Verify 4 Country Flags under About Us (Egypt, Saudi Arabia, UAE, Kuwait)
    await expect(page.getByTestId("about-countries-row")).toBeVisible();
    await expect(page.getByTestId("about-country-eg")).toContainText("Egypt");
    await expect(page.getByTestId("about-country-sa")).toContainText("Saudi Arabia");
    await expect(page.getByTestId("about-country-ae")).toContainText("UAE");
    await expect(page.getByTestId("about-country-kw")).toContainText("Kuwait");

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

    // Item 8: KPI Counter Section ("Numbers That Speak For Themselves") after Client Work
    const statsSection = page.getByTestId("stats-counter-section");
    await expect(statsSection).toBeVisible();
    await expect(page.getByTestId("stats-counter-heading")).toContainText(
      "Numbers That Speak For Themselves"
    );
    await expect(page.getByTestId("stats-counter-subheading")).toHaveText(
      "Every brand gets a plan built from scratch, measured by real impact"
    );
    await expect(page.getByTestId("kpi-card-agency")).toContainText("Agency");
    await expect(page.getByTestId("kpi-card-agency")).toContainText(
      "From idea to results, one team takes care of it all, so you don’t have to chase anyone."
    );
    await expect(page.getByTestId("kpi-card-services")).toContainText("services");
    await expect(page.getByTestId("kpi-card-services")).toContainText(
      "Under one roof: branding, social media, content, design, video, web, and paid ads"
    );
    await expect(page.getByTestId("kpi-card-campaigns")).toContainText("campaigns");
    await expect(page.getByTestId("kpi-card-campaigns")).toContainText(
      "Launched across social media, paid ads, and content for brands that wanted more than a template"
    );

    // Item 9: Why Choose Us 4 horizontal cards on desktop
    const card1Box = await page.getByTestId("why-us-card-no-templates").boundingBox();
    const card2Box = await page.getByTestId("why-us-card-everything-under-one-roof").boundingBox();
    expect(card1Box!.x).toBeLessThan(card2Box!.x);

    // Item 10: Closing CTA + Bottom "Get in Touch" Section
    await expect(page.getByTestId("get-in-touch-section")).toBeVisible();
    await expect(page.getByTestId("git-card-intro")).toContainText(
      "Tell us about your brand and we’ll build a plan around it. Reach out directly and our team will get back to you within 24 hours"
    );
    await expect(page.getByTestId("git-card-whatsapp")).toContainText(
      "WHATSAPP : +201055515576"
    );
    await expect(page.getByTestId("git-card-whatsapp")).toHaveAttribute(
      "href",
      "https://wa.me/201055515576"
    );
    await expect(page.getByTestId("git-card-email")).toContainText(
      "helal.media0@gmail.com"
    );
    await expect(page.getByTestId("git-social-facebook")).toHaveAttribute(
      "href",
      "https://www.facebook.com/share/1Fku98K1qm/"
    );
    await expect(page.getByTestId("git-social-instagram")).toHaveAttribute(
      "href",
      "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ=="
    );

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

    // Work Hub (Item 11: "Work by Our Team" + "Explore the work our team has delivered across different industries.")
    await page.goto("/en/work");
    await expect(page.getByTestId("work-hub-heading")).toHaveText(
      "Work by Our Team"
    );
    await expect(page.getByTestId("work-hub-supporting-copy")).toHaveText(
      "Explore the work our team has delivered across different industries."
    );

    // Navigate to Designs
    await page.getByTestId("work-folder-designs").click();
    await expect(page).toHaveURL(/\/en\/work\/designs$/);
    await expect(page.getByTestId("collection-headline")).toHaveText("Designs");
    await expect(page.getByTestId("collection-overview-label")).toHaveText(
      "Overview"
    );

    // Item 12: Verify all 5 Interactive Design Showcase Boxes (34 showcase cards)
    for (let b = 1; b <= 5; b++) {
      await expect(page.getByTestId(`design-showcase-box-${b}`)).toBeVisible();
    }
    await expect(page.getByTestId("showcase-box-1-eyebrow")).toHaveText(
      "BY OUR TEAM"
    );
    await expect(page.getByTestId("showcase-box-1-heading")).toHaveText(
      "From social media designs to full brand identities, explore the work of our team."
    );
    await expect(page.getByTestId("showcase-box-2-heading")).toHaveText(
      "Beauty, perfume, dental, and health: see how our team brings each brand to life."
    );
    await expect(page.getByTestId("showcase-box-3-heading")).toHaveText(
      "From restaurants to cafes, explore the designs our team made to make every dish stand out."
    );
    await expect(page.getByTestId("showcase-box-4-heading")).toHaveText(
      "Motivation starts with the first look. See how our team designs for fitness."
    );
    await expect(page.getByTestId("showcase-box-5-heading")).toHaveText(
      "Designs that inspire learning and earn trust for every academy."
    );
    const showcaseCards = page.locator('[data-testid^="showcase-card-"]');
    await expect(showcaseCards).toHaveCount(34);
    await page.getByTestId("showcase-next-1").click();

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

    // Deterministically load & verify all 58 design images (34 interactive showcase + 24 client case studies) with naturalWidth > 0
    const imgAudit = await page.evaluate(async () => {
      const imgs = Array.from(
        document.querySelectorAll(
          '[data-testid^="showcase-card-"] img, [data-testid^="design-asset-card-"] img'
        )
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
    expect(imgAudit.length).toBe(58);
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
    await expect(videoCards).toHaveCount(23);
    await expect(
      page.locator('[data-testid^="unavailable-video-"]')
    ).toHaveCount(0);
    await expect(
      page.locator('[data-testid^="video-asset-card-"] video')
    ).toHaveCount(23);
    await expect(
      page.locator('[data-testid="video-thumbnail-cover"]')
    ).toHaveCount(23);
    await expect(
      page.getByTestId("video-industry-heading-health-care")
    ).toHaveText("Health Care");
    await expect(
      page.getByTestId("video-industry-count-health-care")
    ).toHaveText("9 Films");
    await expect(
      page.getByTestId("video-industry-heading-ai-characters")
    ).toHaveText("AI Content Production");

    // Verify all 23 video elements use local /portfolio/videos/ paths and local /media/posters/ thumbnails, and verify HTTP 200 on every single one
    const videoDomAudit = await page.evaluate(() => {
      const vids = Array.from(
        document.querySelectorAll('[data-testid^="video-asset-card-"] video')
      ) as HTMLVideoElement[];
      return vids.map((v) => ({
        src: v.getAttribute("src") || "",
        poster: v.getAttribute("poster") || "",
      }));
    });
    expect(videoDomAudit.length).toBe(23);
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

    const healthCareSection = page.getByTestId("video-industry-section-health-care");
    await healthCareSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);

    // Verify play button is centered inside the first thumbnail cover
    const firstCoverBox = await page
      .locator('[data-testid="video-thumbnail-cover"]')
      .first()
      .boundingBox();
    const firstPlayBox = await page
      .locator('[data-testid="video-thumbnail-play-button"]')
      .first()
      .boundingBox();
    expect(firstCoverBox).not.toBeNull();
    expect(firstPlayBox).not.toBeNull();
    const coverCenterX = firstCoverBox!.x + firstCoverBox!.width / 2;
    const playCenterX = firstPlayBox!.x + firstPlayBox!.width / 2;
    expect(Math.abs(coverCenterX - playCenterX)).toBeLessThan(8);

    await page.screenshot({
      path: `${ARTIFACT_DIR}/videos-en-desktop.png`,
      fullPage: false,
    });

    const newDrMohamedCard = page.getByTestId("video-asset-card-video-health-care-9");
    await newDrMohamedCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await newDrMohamedCard.screenshot({
      path: `${ARTIFACT_DIR}/video-health-care-08-dr-mohamed.png`,
    });

    const aiSection = page.getByTestId("video-industry-section-ai-characters");
    await aiSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.screenshot({
      path: `${ARTIFACT_DIR}/videos-ai-content-en-desktop.png`,
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
    // Verify Arabic Header Contact CTA and RTL Floating WhatsApp position (left side)
    await expect(page.getByTestId("header-contact-cta")).toContainText("تواصل معنا");
    await expect(page.getByTestId("header-contact-cta")).toHaveAttribute("href", "/ar/contact");
    const waBoxAr = await page.getByTestId("floating-whatsapp-button").boundingBox();
    expect(waBoxAr!.x).toBeLessThan(400);
    await page.waitForTimeout(750);
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
          await page.waitForTimeout(750);
          const menuBtnBox = await page.getByTestId("mobile-menu-toggle").boundingBox();
          expect(menuBtnBox).not.toBeNull();
          expect(menuBtnBox!.x).toBeGreaterThanOrEqual(0);
          expect(menuBtnBox!.x + menuBtnBox!.width).toBeLessThanOrEqual(375);
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

# Helal Media Production — Official Bilingual Website (EN / AR)

Production-grade bilingual (`English LTR` / `Arabic RTL`) creative agency website for **Helal Media Production** (*"Marketing Has No Catalog"*).

## Technology Stack
- **Framework**: Next.js 14 App Router + React 18 + TypeScript
- **Styling**: Tailwind CSS with centralized editorial design tokens (`#08080A` Obsidian, `#F5F4F0` Alabaster, `#F4A23E` Editorial Amber-Gold)
- **Typography**: `Syne` & `Plus Jakarta Sans` (English LTR) + `IBM Plex Sans Arabic` (Arabic RTL)
- **Media Pipeline**: Deterministic Python + FFmpeg/FFprobe ingestion script (`scripts/ingest_media.py`) with WebP image optimization, H.264/AAC faststart MP4 video optimization, and WebP video poster generation
- **Testing**: Vitest (unit/data integrity) + Playwright (multi-viewport, bilingual E2E browser verification)

## Routes
- `/en`, `/ar` — Home (Splash Intro, Hero, `#about`, Featured 3-Service Geometry, Triangle Portfolio Folders, 4 Why-Us Disclosures, Closing CTA, Global Footer)
- `/en/services`, `/ar/services` — Full 8 Official Services
- `/en/work`, `/ar/work` — Client Work Hub (Triangle Folder Navigation)
- `/en/work/designs`, `/ar/work/designs` — Designs Case-Study Collection (5 Named Clients, 24 Mapped Visuals + Lightbox)
- `/en/work/videos`, `/ar/work/videos` — Videos Case-Study Collection (5 Industry Sections, 21 Mapped Videos)
- `/en/work/websites`, `/ar/work/websites` — Websites Case-Study Collection (`Web Design & Development`)
- `/en/contact`, `/ar/contact` — Contact Details & Real Server-Validated Inquiry Form (`/api/contact`)

## Contact Form Delivery Setup (`helal.media0@gmail.com`)
Copy `.env.example` to `.env.local` and supply either SMTP credentials or an authorized CRM webhook:

```env
CONTACT_RECEIVER_EMAIL=helal.media0@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=helal.media0@gmail.com
SMTP_PASS=your_app_specific_password
SMTP_FROM_EMAIL="Helal Media Website <helal.media0@gmail.com>"
```

When neither `SMTP_*` nor `CONTACT_WEBHOOK_URL` is configured, `/api/contact` returns HTTP `503` (`TRANSPORT_UNCONFIGURED`), preserving visitor input and displaying a localized configuration notice rather than a fake success message.

## Commands
```bash
npm run ingest-media   # Fetch, verify, and optimize all 45 Google Drive assets
npm run typecheck      # TypeScript strict verification
npm run lint           # Next.js ESLint verification
npm test               # Run Vitest unit & content integrity suite
npm run build          # Production Next.js build
npm run test:e2e       # Run Playwright E2E acceptance matrix across EN/AR & 9 viewports
```


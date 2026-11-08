import {
  ContactPhoneNumber,
  DesignClientCaseStudy,
  Locale,
  ServiceItem,
  VideoIndustryGroup,
  WebsiteCaseStudy,
  WhyChooseUsItem,
  WorkFolderItem,
} from "./types";

export const SUPPORTED_LOCALES: Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(lang: string): lang is Locale {
  return lang === "en" || lang === "ar";
}

/**
 * Centralized Business Contact & Social Configuration
 * Single source of truth across Header, Footer, Contact Page, and API.
 */
export const BUSINESS_CONFIG = {
  brandName: "Helal Media Production",
  shortBrandName: "Helal Media",
  officialSlogan: {
    en: "Marketing Has No Catalog",
    ar: "التسويق ليس له كتالوج",
  },
  email: "helal.media0@gmail.com",
  phones: [
    {
      raw: "+201055515576",
      display: "+201055515576",
      telHref: "tel:+201055515576",
      hasWhatsApp: true,
      whatsappHref: "https://wa.me/201055515576",
    },
    {
      raw: "+201158260899",
      display: "+201158260899",
      telHref: "tel:+201158260899",
      hasWhatsApp: true,
      whatsappHref: "https://wa.me/201158260899",
    },
    {
      raw: "+201080645590",
      display: "+201080645590",
      telHref: "tel:+201080645590",
      hasWhatsApp: false,
    },
  ] as ContactPhoneNumber[],
  /**
   * Official Helal Media Production social media accounts.
   * Centralized single source of truth used across Footer and Contact Page (EN & AR).
   */
  socials: {
    instagram:
      "https://www.instagram.com/helal.media.production?vrfl=MW5ucWQzeHVtdjV2OQ==",
    facebook: "https://www.facebook.com/share/1Fku98K1qm/",
    instagramLabel: "Helal Media on Instagram",
    facebookLabel: "Helal Media on Facebook",
  },
  /**
   * WhatsApp-enabled phone number is not identified among the three numbers.
   * Only activates if explicitly configured via NEXT_PUBLIC_WHATSAPP_URL.
   */
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  availability: {
    en: "Open by appointment",
    ar: "نستقبلكم بمواعيد مسبقة",
  },
} as const;

/**
 * Canonical 8 Official Services Dataset
 * Shared across:
 * 1) Full Services Page (ordered 1..8 per Section 4)
 * 2) Homepage Services Preview (Left: Branding, Center: Social Media Management, Right: Content Strategy per Section 3.3)
 * 3) Contact Form Service Dropdown (ordered per Section 9)
 */
export const CANONICAL_SERVICES_MAP: Record<string, ServiceItem> = {
  "social-media-management": {
    id: "social-media-management",
    slug: "social-media-management",
    iconKey: "social-media",
    title: {
      en: "Social Media Management",
      ar: "إدارة وسائل التواصل الاجتماعي",
    },
    description: {
      en: "We plan, create, and manage content that keeps your brand active, grows your community, and turns followers into loyal customers.",
      ar: "نخطط للمحتوى ونصنعه وندير حساباتك بما يحافظ على حضور علامتك التجارية، وينمّي مجتمعك، ويحوّل المتابعين إلى عملاء أوفياء.",
    },
  },
  branding: {
    id: "branding",
    slug: "branding",
    iconKey: "branding",
    title: {
      en: "Branding",
      ar: "بناء الهوية التجارية",
    },
    description: {
      en: "We build brand identities that make your business easy to recognize, hard to forget, and consistent in everything your audience sees.",
      ar: "نصنع هويات تجارية تجعل علامتك سهلة التمييز، وصعبة النسيان، ومتسقة في كل ما يراه جمهورك.",
    },
  },
  "content-strategy": {
    id: "content-strategy",
    slug: "content-strategy",
    iconKey: "content-strategy",
    title: {
      en: "Content Strategy",
      ar: "استراتيجية المحتوى",
    },
    description: {
      en: "Content plans, ideas, and scripts built around your audience, so every post has a purpose and a place in your bigger story.",
      ar: "نضع خطط المحتوى والأفكار والسيناريوهات بناءً على فهم جمهورك، ليكون لكل منشور هدف واضح ودور في قصة علامتك التجارية.",
    },
  },
  "graphic-design": {
    id: "graphic-design",
    slug: "graphic-design",
    iconKey: "graphic-design",
    title: {
      en: "Graphic Design",
      ar: "التصميم الجرافيكي",
    },
    description: {
      en: "Creative visuals for social media, ads, and print that match your brand’s voice and make people stop scrolling.",
      ar: "نصمم مواد بصرية مبتكرة للسوشيال ميديا والإعلانات والمطبوعات، تعكس شخصية علامتك وتلفت الانتباه.",
    },
  },
  "media-production": {
    id: "media-production",
    slug: "media-production",
    iconKey: "media-production",
    title: {
      en: "Media Production",
      ar: "الإنتاج الإعلامي",
    },
    description: {
      en: "Professional photography and video production that tells your brand’s story and brings your ideas to life on screen.",
      ar: "نقدم تصويرًا فوتوغرافيًا وإنتاج فيديو احترافيًا يروي قصة علامتك ويحوّل أفكارك إلى مشاهد مؤثرة.",
    },
  },
  "video-editing": {
    id: "video-editing",
    slug: "video-editing",
    iconKey: "video-editing",
    title: {
      en: "Video Editing",
      ar: "مونتاج الفيديو",
    },
    description: {
      en: "Reels, ads, and brand videos edited with rhythm and style, so your story holds attention from the first second to the last.",
      ar: "ننتج مونتاجًا جذابًا للريلز والإعلانات وفيديوهات العلامات التجارية، بإيقاع وأسلوب يحافظان على انتباه المشاهد من البداية للنهاية.",
    },
  },
  "web-development": {
    id: "web-development",
    slug: "web-development",
    iconKey: "web-development",
    title: {
      en: "Web Development",
      ar: "تطوير المواقع الإلكترونية",
    },
    description: {
      en: "We design and build fast, responsive websites that look great on every device and guide visitors toward taking action",
      ar: "نصمم ونطوّر مواقع سريعة ومتجاوبة تعمل بكفاءة على مختلف الأجهزة وتساعد زوارك على اتخاذ الخطوة التالية.",
    },
  },
  "paid-ads": {
    id: "paid-ads",
    slug: "paid-ads",
    iconKey: "paid-ads",
    title: {
      en: "Paid Ads",
      ar: "الإعلانات المدفوعة",
    },
    description: {
      en: "We plan and run targeted campaigns on all major platforms, tracked and optimized to bring you measurable results.",
      ar: "نخطط وندير حملات إعلانية مستهدفة على المنصات الرئيسية، ونتابع أداءها ونحسّنه لتحقيق نتائج قابلة للقياس.",
    },
  },
};

/**
 * Section 4: Full Services Page exact ordered list (8 services)
 */
export const SERVICES_PAGE_ORDER: ServiceItem[] = [
  CANONICAL_SERVICES_MAP["social-media-management"],
  CANONICAL_SERVICES_MAP["branding"],
  CANONICAL_SERVICES_MAP["content-strategy"],
  CANONICAL_SERVICES_MAP["graphic-design"],
  CANONICAL_SERVICES_MAP["media-production"],
  CANONICAL_SERVICES_MAP["video-editing"],
  CANONICAL_SERVICES_MAP["web-development"],
  CANONICAL_SERVICES_MAP["paid-ads"],
];

/**
 * Section 3.3: Homepage Featured Services (Exact Left / Center / Right placement)
 * LEFT — Branding
 * CENTER — Social Media Management (focal point, larger and closer)
 * RIGHT — Content Strategy
 */
export const HOME_FEATURED_SERVICES = {
  left: CANONICAL_SERVICES_MAP["branding"],
  center: CANONICAL_SERVICES_MAP["social-media-management"],
  right: CANONICAL_SERVICES_MAP["content-strategy"],
};

/**
 * Section 9: Contact Form Dropdown Options (Exact 8 services in specified order)
 */
export const CONTACT_DROPDOWN_SERVICES: ServiceItem[] = [
  CANONICAL_SERVICES_MAP["branding"],
  CANONICAL_SERVICES_MAP["social-media-management"],
  CANONICAL_SERVICES_MAP["content-strategy"],
  CANONICAL_SERVICES_MAP["graphic-design"],
  CANONICAL_SERVICES_MAP["media-production"],
  CANONICAL_SERVICES_MAP["video-editing"],
  CANONICAL_SERVICES_MAP["web-development"],
  CANONICAL_SERVICES_MAP["paid-ads"],
];

/**
 * Section 3.4 & Section 5: Three Portfolio Folders (Triangle Geometry)
 */
export const WORK_FOLDERS: WorkFolderItem[] = [
  {
    id: "designs",
    slug: "designs",
    position: "top-left",
    title: {
      en: "Designs",
      ar: "التصميمات",
    },
    subtitle: {
      en: "Social and brand creative made for every industry.",
      ar: "محتوى بصري للسوشيال ميديا وهوية العلامات التجارية في مختلف المجالات.",
    },
    href: "/work/designs",
    countLabel: {
      en: "05 Case Studies · 24 Visuals",
      ar: "05 دراسات حالة · 24 تصميمًا",
    },
  },
  {
    id: "videos",
    slug: "videos",
    position: "top-right",
    title: {
      en: "Videos",
      ar: "الفيديوهات",
    },
    subtitle: {
      en: "Reels and brand films that tell each client’s story.",
      ar: "ريلز وأفلام للعلامات التجارية تحكي قصة كل عميل.",
    },
    href: "/work/videos",
    countLabel: {
      en: "05 Industries · 21 Films",
      ar: "05 قطاعات · 21 فيديو",
    },
  },
  {
    id: "websites",
    slug: "websites",
    position: "bottom-center",
    title: {
      en: "Websites",
      ar: "المواقع الإلكترونية",
    },
    subtitle: {
      en: "Live websites, built around each client’s needs.",
      ar: "مواقع حقيقية صُممت وفقًا لاحتياجات كل عميل.",
    },
    href: "/work/websites",
    countLabel: {
      en: "Web Design & Development",
      ar: "تصميم وتطوير المواقع الإلكترونية",
    },
  },
];

/**
 * Section 3.5: Why Choose Us — Four Interactive Reveal Cards
 */
export const WHY_CHOOSE_US_CARDS: WhyChooseUsItem[] = [
  {
    id: "no-templates",
    iconKey: "bespoke",
    title: {
      en: "No templates",
      ar: "بدون قوالب جاهزة",
    },
    description: {
      en: "Every strategy is built around your brand, never copied.",
      ar: "نصمم كل استراتيجية خصيصًا لعلامتك التجارية، دون نسخ أو تكرار.",
    },
  },
  {
    id: "everything-under-one-roof",
    iconKey: "roof",
    title: {
      en: "Everything under one roof",
      ar: "كل الخدمات تحت سقف واحد",
    },
    description: {
      en: "Strategy, design, production, and ads, from one team.",
      ar: "الاستراتيجية والتصميم والإنتاج والإعلانات، من خلال فريق واحد.",
    },
  },
  {
    id: "we-learn-your-brand-first",
    iconKey: "discovery",
    title: {
      en: "We learn your brand first",
      ar: "نفهم علامتك أولًا",
    },
    description: {
      en: "We understand your audience, then we create.",
      ar: "نتعرف على جمهورك ونفهم احتياجاته، ثم نبدأ في الإبداع.",
    },
  },
  {
    id: "built-to-drive-action",
    iconKey: "action",
    title: {
      en: "Built to drive action",
      ar: "إبداع يحقق نتائج",
    },
    description: {
      en: "Every idea has a goal: attention, trust, or sales.",
      ar: "كل فكرة لها هدف: جذب الانتباه، أو بناء الثقة، أو زيادة المبيعات.",
    },
  },
];

/**
 * Section 6: Designs Case-Study Collection (5 Named Clients, 24 Images)
 */
export const DESIGN_CLIENTS: DesignClientCaseStudy[] = [
  {
    id: "client-1-dr-mohamed-ismail",
    slug: "dr-mohamed-ismail-dental-clinics",
    name: "Dr. Mohamed Ismail Dental Clinics",
    description: {
      en: "Design creative for a dental expert — bold, trustworthy visuals built to stop the scroll.",
      ar: "تصميمات إبداعية لخبير طب الأسنان — مرئيات جريئة وموثوقة صُممت لتلفت الانتباه وتستوقف المتصفح.",
    },
    industryKey: "health-care",
    categoryChips: {
      en: ["Health Care", "Social Media"],
      ar: ["الرعاية الصحية", "وسائل التواصل الاجتماعي"],
    },
    designerName: "Ahmed Maroof",
    creditPrefix: {
      en: "Designed By /",
      ar: "تصميم /",
    },
    creditFull: {
      en: "Designed By / Ahmed Maroof",
      ar: "تصميم / Ahmed Maroof",
    },
    assetIds: [
      "design-dr-mohamed-1",
      "design-dr-mohamed-2",
      "design-dr-mohamed-3",
      "design-dr-mohamed-4",
      "design-dr-mohamed-5",
    ],
  },
  {
    id: "client-2-ogien-dental",
    slug: "ogien-dental-clinic",
    name: "Ogien Dental Clinic",
    description: {
      en: "Kids’ dental clinic campaign creative — bright, friendly visuals built to earn parents’ trust.",
      ar: "حملة إبداعية لعيادة أسنان الأطفال — مرئيات مشرقة وودودة صُممت لكسب ثقة الآباء والأمهات.",
    },
    industryKey: "health-care",
    categoryChips: {
      en: ["Health Care", "Social Media"],
      ar: ["الرعاية الصحية", "وسائل التواصل الاجتماعي"],
    },
    designerName: "Omar Abdelrahim",
    creditPrefix: {
      en: "Designed By /",
      ar: "تصميم /",
    },
    creditFull: {
      en: "Designed By / Omar Abdelrahim",
      ar: "تصميم / Omar Abdelrahim",
    },
    assetIds: [
      "design-ogien-1",
      "design-ogien-2",
      "design-ogien-3",
      "design-ogien-4",
      "design-ogien-5",
    ],
  },
  {
    id: "client-3-fast-way",
    slug: "fast-way",
    name: "Fast Way",
    description: {
      en: "Shipping company social media designs — bold, fast-moving visuals built to earn businesses’ trust.",
      ar: "تصميمات سوشيال ميديا لشركة شحن — مرئيات جريئة وحيوية صُممت لكسب ثقة الشركات والأعمال.",
    },
    industryKey: "shipping",
    categoryChips: {
      en: ["Shipping", "Social Media"],
      ar: ["الشحن", "وسائل التواصل الاجتماعي"],
    },
    designerName: "Ahmed Maroof",
    creditPrefix: {
      en: "Designed By /",
      ar: "تصميم /",
    },
    creditFull: {
      en: "Designed By / Ahmed Maroof",
      ar: "تصميم / Ahmed Maroof",
    },
    assetIds: [
      "design-fast-way-1",
      "design-fast-way-2",
      "design-fast-way-3",
      "design-fast-way-4",
      "design-fast-way-5",
    ],
  },
  {
    id: "client-4-galaxy-swimming",
    slug: "galaxy-swimming-academy",
    name: "Galaxy Swimming Academy",
    description: {
      en: "designs dynamic, motivating visuals built to turn passion into performance.",
      ar: "تصميمات ديناميكية ومحفّزة صُممت لتحويل الشغف الرياضي إلى أداء متميز.",
    },
    industryKey: "sports",
    categoryChips: {
      en: ["Sports", "Social Media"],
      ar: ["الرياضة", "وسائل التواصل الاجتماعي"],
    },
    designerName: "Ahmed Maroof",
    creditPrefix: {
      en: "Designed By /",
      ar: "تصميم /",
    },
    creditFull: {
      en: "Designed By / Ahmed Maroof",
      ar: "تصميم / Ahmed Maroof",
    },
    assetIds: [
      "design-galaxy-1",
      "design-galaxy-2",
      "design-galaxy-3",
      "design-galaxy-4",
    ],
  },
  {
    id: "client-5-yadawy",
    slug: "yadawy",
    name: "Yadawy",
    description: {
      en: "Handwoven kilim brand designs — rich, authentic posts built to make every knot a story worth telling.",
      ar: "تصميمات لعلامة كليم يدوي الصنع — منشورات غنية وأصيلة تجعل من كل عقدة حكاية تستحق أن تُروى.",
    },
    industryKey: "home-decor",
    categoryChips: {
      en: ["Home Decor", "Social Media"],
      ar: ["ديكور المنزل", "وسائل التواصل الاجتماعي"],
    },
    designerName: "Ahmed Maroof",
    creditPrefix: {
      en: "Designed By /",
      ar: "تصميم /",
    },
    creditFull: {
      en: "Designed By / Ahmed Maroof",
      ar: "تصميم / Ahmed Maroof",
    },
    assetIds: [
      "design-yadawy-1",
      "design-yadawy-2",
      "design-yadawy-3",
      "design-yadawy-4",
      "design-yadawy-5",
    ],
  },
];

/**
 * Section 7: Videos Case-Study Collection (5 Industry Groups, 21 Videos)
 */
export const VIDEO_INDUSTRY_GROUPS: VideoIndustryGroup[] = [
  {
    id: "video-group-1-health-care",
    slug: "health-care",
    title: {
      en: "Health Care",
      ar: "الرعاية الصحية",
    },
    editorialNote: {
      en: "Human-centered medical storytelling and reels designed to build patient confidence and clarity.",
      ar: "قصص مرئية وريلز في قطاع الرعاية الصحية مصممة لبناء ثقة المرضى وتقديم المعلومة بوضوح.",
    },
    assetIds: [
      "video-health-care-1",
      "video-health-care-2",
      "video-health-care-3",
      "video-health-care-4",
      "video-health-care-5",
      "video-health-care-6",
      "video-health-care-7",
    ],
  },
  {
    id: "video-group-2-shipping",
    slug: "shipping",
    title: {
      en: "Shipping",
      ar: "الشحن",
    },
    editorialNote: {
      en: "High-tempo commercial reels capturing speed, reliability, and operational momentum.",
      ar: "ريلز وفيديوهات إعلانية بإيقاع سريع يعكس الدقة والسرعة والاعتمادية في خدمات الشحن.",
    },
    assetIds: [
      "video-shipping-1",
      "video-shipping-2",
      "video-shipping-3",
      "video-shipping-4",
    ],
  },
  {
    id: "video-group-3-sports",
    slug: "sports",
    title: {
      en: "Sports",
      ar: "الرياضة",
    },
    editorialNote: {
      en: "Kinetic athletic edits that translate training discipline and energy to the screen.",
      ar: "مونتاج رياضي مفعم بالحركة والطاقة يترجم شغف التدريب والإنجاز إلى مشاهد ملهمة.",
    },
    assetIds: [
      "video-sports-1",
      "video-sports-2",
      "video-sports-3",
      "video-sports-4",
    ],
  },
  {
    id: "video-group-4-home-decor",
    slug: "home-decor",
    title: {
      en: "Home Decor",
      ar: "ديكور المنزل",
    },
    editorialNote: {
      en: "Tactile, atmospheric brand films highlighting craftsmanship, texture, and warm living spaces.",
      ar: "أفلام قصيرة تبرز تفاصيل الحرفية اليدوية ودفء المساحات المنزلية وأصالة التصميم.",
    },
    assetIds: [
      "video-home-decor-1",
      "video-home-decor-2",
      "video-home-decor-3",
      "video-home-decor-4",
    ],
  },
  {
    id: "video-group-5-ai-characters",
    slug: "ai-characters",
    title: {
      en: "AI Characters",
      ar: "شخصيات الذكاء الاصطناعي",
    },
    editorialNote: {
      en: "Next-generation character-driven creative blending AI synthesis with narrative direction.",
      ar: "محتوى إبداعي مبتكر يدمج شخصيات الذكاء الاصطناعي مع الإخراج القصصي لخلق تجربة بصرية فريدة.",
    },
    assetIds: ["video-ai-characters-1", "video-ai-characters-2"],
  },
];

/**
 * Section 8: Websites Case-Study Collection (5 Website Projects, 24 Screenshots from Google Drive folder 1_aqFp9GmWLrcXfVObZJiqVOwV1m41Id5)
 */
export const WEBSITE_PROJECTS: WebsiteCaseStudy[] = [
  {
    id: "website-1-autoparts",
    slug: "autoparts",
    folderNumber: "01",
    driveFolderId: "13zk7p1OF2DeRxDMeJiIDcoLiyC4LxXcw",
    name: "AutoParts",
    description: {
      en: "Quality Auto Parts Engineered for Performance — Find genuine spare parts for every make and model, featuring vehicle brand search, category filtering, customer account dashboards, and product detail views.",
      ar: "منصة تجارة إلكترونية لقطع غيار السيارات — تتيح البحث عن قطع الغيار الأصلية حسب الماركة والفئة، مع لوحة حسابات العملاء وصفحات عرض تفاصيل المنتجات.",
    },
    categoryChips: {
      en: ["Automotive E-Commerce", "Web Design & Development"],
      ar: ["متجر قطع غيار السيارات", "تصميم وتطوير المواقع الإلكترونية"],
    },
    layoutVariant: "hero-plus-grid",
    assetIds: [
      "website-autoparts-1",
      "website-autoparts-2",
      "website-autoparts-3",
      "website-autoparts-4",
      "website-autoparts-5",
      "website-autoparts-6",
    ],
  },
  {
    id: "website-2-fittrack",
    slug: "fittrack",
    folderNumber: "02",
    driveFolderId: "1Ge-4XcKQzK3BKK6wLzYuXbqhVaaax9ph",
    name: "FitTrack",
    description: {
      en: "FitTrack is a complete gym management solution for tracking members, subscriptions, trainers, attendance, and payments — all in one powerful dashboard.",
      ar: "نظام متكامل لإدارة الصالات الرياضية لمتابعة الأعضاء والاشتراكات والمدربين والحضور والمدفوعات والتقارير داخل لوحة تحكم احترافية واحدة.",
    },
    categoryChips: {
      en: ["Gym Management System", "Web Design & Development"],
      ar: ["نظام إدارة الصالات الرياضية", "تصميم وتطوير المواقع الإلكترونية"],
    },
    layoutVariant: "split-editorial",
    assetIds: [
      "website-fittrack-1",
      "website-fittrack-2",
      "website-fittrack-3",
      "website-fittrack-4",
      "website-fittrack-5",
      "website-fittrack-6",
      "website-fittrack-7",
    ],
  },
  {
    id: "website-3-awfa-smart-services",
    slug: "awfa-smart-services",
    folderNumber: "03",
    driveFolderId: "1Pd9AoBj2MlmaXwLfBz_s40rIxmIv4zXA",
    name: "Awfa Smart E-Services",
    arabicName: "أوفى الذكية للخدمات الإلكترونية",
    description: {
      en: "Your smart partner in establishing and growing your business — integrated solutions in company formation, financial administrative services, and digital marketing under one roof.",
      ar: "شريكك الذكي في تأسيس وتطوير أعمالك — حلول متكاملة في تأسيس الشركات، الخدمات الإدارية المالية، والتسويق الإلكتروني — كل ما تحتاجه تحت سقف واحد.",
    },
    categoryChips: {
      en: ["Corporate & E-Services", "Web Design & Development"],
      ar: ["الخدمات الإلكترونية وتأسيس الأعمال", "تصميم وتطوير المواقع الإلكترونية"],
    },
    layoutVariant: "dual-showcase",
    assetIds: ["website-awfa-1", "website-awfa-2"],
  },
  {
    id: "website-4-yadawy",
    slug: "yadawy",
    folderNumber: "04",
    driveFolderId: "186hhsJgaHky4NXOzzwuHnYr7gNTK83WZ",
    name: "Yadawy",
    arabicName: "يَدَوِيّ",
    description: {
      en: "The Art of Handwoven Rugs — Curated masterpieces woven with tradition, designed for modern living. Showcasing 100% handwoven Egyptian kilims and carpets with collection and price filtering.",
      ar: "فن السجاد والكليم المنسوج يدويًا — قطع فنية أصيلة منسوجة بأيدي حرفيين مصريين بتصميم عصري، مع كتالوج متكامل وتصفية حسب الفئة والسعر.",
    },
    categoryChips: {
      en: ["Home Decor & Artisanal Rugs", "Web Design & Development"],
      ar: ["الديكور المنزلي والكليم اليدوي", "تصميم وتطوير المواقع الإلكترونية"],
    },
    layoutVariant: "asymmetric-mosaic",
    assetIds: [
      "website-yadawy-1",
      "website-yadawy-2",
      "website-yadawy-3",
      "website-yadawy-4",
      "website-yadawy-5",
    ],
  },
  {
    id: "website-5-kiya",
    slug: "kiya",
    folderNumber: "05",
    driveFolderId: "1rg3s59dVws7r1tHdVRlJqFruCIG56k6E",
    name: "Kiya",
    description: {
      en: "Fashion and apparel online store for Kiya showcasing the Solea Collection — featuring interactive color and size selectors, live stock indicators, bundle offers, and verified buyer reviews.",
      ar: "متجر أزياء إلكتروني لعلامة Kiya يعرض مجموعة Solea — يضم خيارات الألوان والمقاسات، ومؤشرات المخزون المباشرة، وعروض الباقات، وتقييمات المشترين الموثقة.",
    },
    categoryChips: {
      en: ["Fashion & Apparel E-Commerce", "Web Design & Development"],
      ar: ["الأزياء والتجارة الإلكترونية", "تصميم وتطوير المواقع الإلكترونية"],
    },
    layoutVariant: "closing-flagship",
    assetIds: [
      "website-kiya-1",
      "website-kiya-2",
      "website-kiya-3",
      "website-kiya-4",
    ],
  },
];

/**
 * Complete Bilingual Dictionary (EN / AR)
 */
export const SITE_COPY = {
  en: {
    meta: {
      siteTitle: "Helal Media Production — Marketing Has No Catalog",
      siteDescription:
        "Full-Service Marketing Agency. We get to know your brand, your audience, and what drives them, then turn that into ideas that get noticed, build trust, and drive action.",
      pages: {
        home: "Helal Media Production | Your Strategic Creative Partner",
        services: "Services — Built Around Your Brand | Helal Media Production",
        work: "Client Work & Portfolio | Helal Media Production",
        designs: "Designs Case Studies — Portfolio | Helal Media Production",
        videos: "Videos Case Studies — Portfolio | Helal Media Production",
        websites: "Websites Case Studies — Portfolio | Helal Media Production",
        contact: "Contact Us — Start a Project | Helal Media Production",
      },
    },
    intro: {
      brand: "Helal Media Production",
      slogan: "Marketing Has No Catalog",
      skip: "Skip Intro",
    },
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      services: "Services",
      contact: "Contact",
      langSwitchLabel: "العربية",
      langSwitchAria: "Switch language to Arabic",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      eyebrow: "Full-Service Marketing Agency",
      headlinePrefix: "Your Strategic Creative ",
      headlineAccent: "Partner",
      headlineSuffix: "",
      scrollLabel: "Explore",
    },
    about: {
      eyebrow: "About Us",
      boldSubheading: "At Helal Media, we don’t just do marketing.",
      paragraph1:
        "We get to know your brand, your audience, and what drives them, then turn that into ideas that get noticed, build trust, and drive action.",
      paragraph2:
        "The result? Brands that don’t just get seen. They get remembered, and they sell",
      ctaPrimary: "Start a Project",
      ctaSecondary: "See Our Projects",
    },
    servicesPreview: {
      smallTitle: "Our Services",
      mainHeading: "Everything we do for your brand",
      description:
        "From the first idea to the final frame, we handle the whole journey.",
      cta: "View all services",
      featuredBadge: "Core Focus",
    },
    workPreview: {
      heading: "Client Work",
      secondaryLabel: "Our Team",
      eyebrow: "Graphic Design",
      description: "Discover how we’ve helped brands stand out and succeed.",
      cta: "View all work",
      openFolderLabel: "Open Collection",
    },
    whyUs: {
      heading: "Why do brands choose to work with us ?",
      toggleHint: "Click to reveal",
    },
    closingCta: {
      headline: "Ready to be the brand everyone remembers?",
      secondaryLine: "Let’s make it happen together.",
      button: "Contact Us",
    },
    servicesPage: {
      eyebrow: "services",
      mainHeadline: "Built around your brand, not a template.",
      ctaHeadline: "Let’s build it together.",
      ctaSubline: "Share your project with Helal Media and let’s start.",
      ctaButton: "Start a project",
    },
    workHub: {
      heading: "Client Work",
      secondaryLabel: "Our Team",
      categoryBadge: "Graphic Design",
      supportingCopy: "Discover how we’ve helped brands stand out and succeed.",
      backToWork: "Back to Work",
    },
    designsPage: {
      eyebrow: "Case study",
      headline: "Designs",
      supportingSentence: "Social and brand creative made for every industry.",
      overviewLabel: "Overview",
      overviewCopy:
        "Designs by our team for social media and brand identity across industries — made to make your brand stand out and stay remembered.",
      inThisCollection: "In this collection",
      expandImageAria: "View full artwork in lightbox",
      missingMediaPlaceholder: "Campaign Artwork — Awaiting Google Drive Access",
      lightboxClose: "Close preview",
      lightboxPrev: "Previous image",
      lightboxNext: "Next image",
    },
    videosPage: {
      eyebrow: "Case study",
      headline: "Videos",
      supportingCopy: "Reels and brand films that tell each client’s story.",
      overviewLabel: "Overview",
      overviewCopy:
        "Brand videos across industries — from travel and healthcare to cafés and handmade crafts, each one built to tell a story and hold attention.",
      inThisCollection: "In this collection",
      playVideo: "Play video",
      pauseVideo: "Pause video",
      muteVideo: "Mute audio",
      unmuteVideo: "Unmute audio",
      fullscreenVideo: "Fullscreen",
      unavailableVideo: "Video stream unavailable",
    },
    websitesPage: {
      eyebrow: "Case Study",
      headline: "Websites",
      supportingCopy: "Live websites, built around each client’s needs.",
      tag: "Web Design & Development",
      overviewLabel: "Overview",
      overviewCopy:
        "A selection of websites our team designed and built, each one shaped around its brand’s goals, across different industries.",
      inThisCollection: "In This Collection",
      emptyStateTitle: "Client Website Showcases — Awaiting Approved Assets",
      emptyStateBody:
        "Our Web Design & Development case studies are currently undergoing client asset verification and screenshot preparation. Contact us directly to request a live walkthrough of our latest web builds.",
      emptyStateCta: "Request a Live Walkthrough",
      visitSite: "Visit Site",
    },
    contactPage: {
      /**
       * Exact user-supplied phrase preserved per Section 9:
       * "Marketing has no catalog. We’ll write your brand’s"
       * Highlight the word "catalog" in the global accent color.
       * Do not silently invent an official ending.
       */
      heroPrefix: "Marketing has no ",
      heroAccent: "catalog",
      heroSuffix: ". We’ll write your brand’s",
      supportingCopy:
        "Tell us where your brand is and where you want it to go, and Helal Media will map out the way",
      infoLabels: {
        email: "Email",
        phone: "Contact",
        followUs: "Follow us",
        availability: "Availability",
      },
      form: {
        nameLabel: "Your name",
        namePlaceholder: "Your name",
        emailLabel: "Email address",
        emailPlaceholder: "you@company.com",
        serviceLabel: "Service of interest",
        servicePlaceholder: "Select a service (optional)",
        projectLabel: "Tell us about your project",
        projectPlaceholder:
          "Tell us about your brand, goals, timeline, and what you want to achieve...",
        submitButton: "Send Message",
        submittingButton: "Sending...",
        /**
         * Exact required success message ONLY after genuine server-acknowledged delivery:
         */
        successMessage: "Got it! Helal Media will be in touch soon",
        sendAnother: "Send another inquiry",
        validation: {
          nameRequired: "Please enter your name.",
          emailRequired: "Please enter a valid email address.",
          projectRequired: "Please tell us about your project.",
        },
        errors: {
          unconfigured:
            "Direct inquiry delivery is awaiting mail server configuration (SMTP/CRM credentials). Your message was validated but could not be dispatched automatically. Please email us directly at helal.media0@gmail.com or call +201055515576.",
          network:
            "We couldn’t reach the server right now. Your message is still here — please try again or contact us via email/phone.",
          rateLimited:
            "Too many requests submitted recently. Please wait a moment before trying again.",
        },
      },
    },
    footer: {
      tagline: "Marketing has no catalog — a full-service marketing agency",
      navigateHeading: "NAVIGATE",
      getInTouchHeading: "GET IN TOUCH",
      followUs: "Follow us",
      openByAppointment: "Open by appointment",
      copyright: "2026 Helal Media. All rights reserved",
      signature: "Strategy · Creativity · Production",
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      description:
        "The page you are looking for doesn’t exist or has been moved.",
      backHome: "Back to Home",
    },
  },
  ar: {
    meta: {
      siteTitle: "Helal Media Production — التسويق ليس له كتالوج",
      siteDescription:
        "وكالة تسويق متكاملة الخدمات. نتعرف على علامتك التجارية وجمهورك وما يحفّزه، ثم نحوّل هذا الفهم إلى أفكار تلفت الانتباه، وتبني الثقة، وتدفع الجمهور إلى التفاعل واتخاذ القرار.",
      pages: {
        home: "Helal Media Production | شريكك الاستراتيجي للإبداع",
        services: "خدماتنا — مصممة حول علامتك التجارية | Helal Media Production",
        work: "أعمال عملائنا | Helal Media Production",
        designs: "دراسة حالة: التصميمات | Helal Media Production",
        videos: "دراسة حالة: الفيديوهات | Helal Media Production",
        websites: "دراسة حالة: المواقع الإلكترونية | Helal Media Production",
        contact: "تواصل معنا — ابدأ مشروعك | Helal Media Production",
      },
    },
    intro: {
      brand: "Helal Media Production",
      slogan: "التسويق ليس له كتالوج",
      skip: "تخطي المقدمة",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      work: "أعمالنا",
      services: "خدماتنا",
      contact: "تواصل معنا",
      langSwitchLabel: "EN",
      langSwitchAria: "التبديل إلى اللغة الإنجليزية",
      openMenu: "فتح قائمة التصفح",
      closeMenu: "إغلاق قائمة التصفح",
    },
    hero: {
      eyebrow: "وكالة تسويق متكاملة الخدمات",
      headlinePrefix: "شريكك الاستراتيجي ",
      headlineAccent: "للإبداع",
      headlineSuffix: "",
      scrollLabel: "استكشف",
    },
    about: {
      eyebrow: "من نحن",
      boldSubheading: "في هلال ميديا، نحن لا نكتفي بالتسويق.",
      paragraph1:
        "نتعرف على علامتك التجارية وجمهورك وما يحفّزه، ثم نحوّل هذا الفهم إلى أفكار تلفت الانتباه، وتبني الثقة، وتدفع الجمهور إلى التفاعل واتخاذ القرار.",
      paragraph2:
        "والنتيجة؟ علامات تجارية لا يكتفي الناس برؤيتها، بل يتذكرونها ويتفاعلون معها ويشترون منها.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "شاهد أعمالنا",
    },
    servicesPreview: {
      smallTitle: "خدماتنا",
      mainHeading: "كل ما تحتاجه علامتك التجارية",
      description: "من الفكرة الأولى إلى المشهد الأخير، نتولى الرحلة كاملة.",
      cta: "عرض جميع الخدمات",
      featuredBadge: "الخدمة المحورية",
    },
    workPreview: {
      heading: "أعمال عملائنا",
      secondaryLabel: "فريقنا",
      eyebrow: "التصميم الجرافيكي",
      description: "اكتشف كيف ساعدنا العلامات التجارية على التميز والنجاح.",
      cta: "عرض جميع الأعمال",
      openFolderLabel: "استعراض المجموعة",
    },
    whyUs: {
      heading: "لماذا تختار العلامات التجارية العمل معنا؟",
      toggleHint: "اضغط للتفاصيل",
    },
    closingCta: {
      headline: "مستعد تخلي علامتك التجارية علامة لا تُنسى؟",
      secondaryLine: "خلّينا نحقق ده مع بعض.",
      button: "تواصل معنا",
    },
    servicesPage: {
      eyebrow: "خدماتنا",
      mainHeadline: "مصممة حول علامتك التجارية، وليست قالبًا جاهزًا.",
      ctaHeadline: "خلّينا نبنيها سوا.",
      ctaSubline: "شاركنا تفاصيل مشروعك مع هلال ميديا ولنبدأ.",
      ctaButton: "ابدأ مشروعك",
    },
    workHub: {
      heading: "أعمال عملائنا",
      secondaryLabel: "فريقنا",
      categoryBadge: "التصميم الجرافيكي",
      supportingCopy: "اكتشف كيف ساعدنا العلامات التجارية على التميز والنجاح.",
      backToWork: "العودة إلى أعمالنا",
    },
    designsPage: {
      eyebrow: "دراسة حالة",
      headline: "التصميمات",
      supportingSentence:
        "محتوى بصري للسوشيال ميديا وهوية العلامات التجارية في مختلف المجالات.",
      overviewLabel: "نظرة عامة",
      overviewCopy:
        "تصميمات أبدعها فريقنا للسوشيال ميديا والهويات التجارية في مجالات متنوعة، لتبرز علامتك وتبقى في الذاكرة.",
      inThisCollection: "ضمن هذه المجموعة",
      expandImageAria: "عرض التصميم بالحجم الكامل",
      missingMediaPlaceholder: "تصميم الحملة — بانتظار تفعيل صلاحية المصدر",
      lightboxClose: "إغلاق العرض",
      lightboxPrev: "التصميم السابق",
      lightboxNext: "التصميم التالي",
    },
    videosPage: {
      eyebrow: "دراسة حالة",
      headline: "الفيديوهات",
      supportingCopy: "ريلز وأفلام للعلامات التجارية تحكي قصة كل عميل.",
      overviewLabel: "نظرة عامة",
      overviewCopy:
        "فيديوهات للعلامات التجارية في قطاعات مختلفة، من الرعاية الصحية والشحن إلى الرياضة والديكور والشخصيات المصممة بالذكاء الاصطناعي؛ يروي كل فيديو قصة ويجذب الانتباه.",
      inThisCollection: "ضمن هذه المجموعة",
      playVideo: "تشغيل الفيديو",
      pauseVideo: "إيقاف مؤقت",
      muteVideo: "كتم الصوت",
      unmuteVideo: "تشغيل الصوت",
      fullscreenVideo: "ملء الشاشة",
      unavailableVideo: "ملف الفيديو غير متاح حاليًا",
    },
    websitesPage: {
      eyebrow: "دراسة حالة",
      headline: "المواقع الإلكترونية",
      supportingCopy: "مواقع حقيقية صُممت وفقًا لاحتياجات كل عميل.",
      tag: "تصميم وتطوير المواقع الإلكترونية",
      overviewLabel: "نظرة عامة",
      overviewCopy:
        "مجموعة من المواقع التي صممها وطوّرها فريقنا لتلائم أهداف كل علامة تجارية عبر مجالات مختلفة.",
      inThisCollection: "ضمن هذه المجموعة",
      emptyStateTitle: "نماذج المواقع الإلكترونية — بانتظار اعتماد ملفات العرض",
      emptyStateBody:
        "يجري حاليًا تجهيز واعتماد لقطات الشاشة والروابط الحية الخاصة بمشاريع المواقع الإلكترونية لعملائنا. يمكنك التواصل معنا مباشرة لطلب عرض حي ومباشر لأحدث أعمالنا في تطوير المواقع.",
      emptyStateCta: "اطلب عرضًا مباشرًا لأعمالنا",
      visitSite: "زيارة الموقع",
    },
    contactPage: {
      heroPrefix: "التسويق ليس له ",
      heroAccent: "كتالوج",
      heroSuffix: ". سنكتب لعلامتك التجارية",
      supportingCopy:
        "احكيلنا علامتك التجارية وصلت لفين، ونفسك توصل بيها لفين، وهلال ميديا هتساعدك ترسم الطريق.",
      infoLabels: {
        email: "البريد الإلكتروني",
        phone: "أرقام التواصل",
        followUs: "تابعنا",
        availability: "مواعيد العمل",
      },
      form: {
        nameLabel: "اسمك",
        namePlaceholder: "اسمك الكريم",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "you@company.com",
        serviceLabel: "الخدمة المهتم بها",
        servicePlaceholder: "اختر خدمة (اختياري)",
        projectLabel: "احكيلنا عن مشروعك",
        projectPlaceholder:
          "شاركنا تفاصيل علامتك التجارية، أهدافك، والجدول الزمني المقترح...",
        submitButton: "إرسال الرسالة",
        submittingButton: "جاري الإرسال...",
        successMessage: "وصلتنا رسالتك! هلال ميديا هتتواصل معاك قريبًا.",
        sendAnother: "إرسال رسالة أخرى",
        validation: {
          nameRequired: "يرجى إدخال اسمك.",
          emailRequired: "يرجى إدخال بريد إلكتروني صحيح.",
          projectRequired: "يرجى كتابة نبذة عن مشروعك.",
        },
        errors: {
          unconfigured:
            "خدمة الإرسال المباشر عبر الخادم بانتظار ضبط إعدادات البريد (SMTP/CRM). تم التحقق من بيانات رسالتك، ولكن للإرسال الفوري يرجى مراسلتنا مباشرة على helal.media0@gmail.com أو الاتصال على +201055515576.",
          network:
            "تعذر الاتصال بالخادم حاليًا. بيانات رسالتك محفوظة — يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.",
          rateLimited:
            "تم إرسال عدة طلبات خلال وقت قصير. يرجى الانتظار قليلًا ثم المحاولة مجددًا.",
        },
      },
    },
    footer: {
      tagline: "التسويق ليس له كتالوج — وكالة تسويق متكاملة الخدمات",
      navigateHeading: "تصفح الموقع",
      getInTouchHeading: "تواصل معنا",
      followUs: "تابعنا",
      openByAppointment: "نستقبلكم بمواعيد مسبقة",
      copyright: "2026 هلال ميديا. جميع الحقوق محفوظة.",
      signature: "استراتيجية · إبداع · إنتاج",
    },
    notFound: {
      code: "404",
      title: "الصفحة غير موجودة",
      description: "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.",
      backHome: "العودة إلى الرئيسية",
    },
  },
} as const;

export function getCopy(lang: Locale) {
  return SITE_COPY[lang] ?? SITE_COPY.en;
}


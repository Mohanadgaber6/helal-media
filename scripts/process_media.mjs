import fs from "fs";
import path from "path";
import sharp from "sharp";

const BASE_DIR = process.cwd();
const PUBLIC_DIR = path.join(BASE_DIR, "public");
const RAW_CACHE_DIR = path.join(BASE_DIR, ".media-cache");
const MANIFEST_PATH = path.join(BASE_DIR, "src", "data", "media-manifest.json");

const DESIGN_ITEMS = [
  // Client 1: Dr. Mohamed Ismail Dental Clinics (5)
  { id: "design-dr-mohamed-1", kind: "image", groupSlug: "dr-mohamed-ismail-dental-clinics", clientName: "Dr. Mohamed Ismail Dental Clinics", industry: "Health Care", credit: "Designed By / Ahmed Maroof", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1S5YykVj_9tB9aN1TnTigJ7zX1hOHtIDa/view?usp=drive_link" },
  { id: "design-dr-mohamed-2", kind: "image", groupSlug: "dr-mohamed-ismail-dental-clinics", clientName: "Dr. Mohamed Ismail Dental Clinics", industry: "Health Care", credit: "Designed By / Ahmed Maroof", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1nsu_tIQlcUc_DVqNaeR0ZOnojKGNCART/view?usp=drive_link" },
  { id: "design-dr-mohamed-3", kind: "image", groupSlug: "dr-mohamed-ismail-dental-clinics", clientName: "Dr. Mohamed Ismail Dental Clinics", industry: "Health Care", credit: "Designed By / Ahmed Maroof", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1xdzWR9bE1_YJGMGJ5skbu3VV5Oe3ENlf/view?usp=drive_link" },
  { id: "design-dr-mohamed-4", kind: "image", groupSlug: "dr-mohamed-ismail-dental-clinics", clientName: "Dr. Mohamed Ismail Dental Clinics", industry: "Health Care", credit: "Designed By / Ahmed Maroof", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1LJB348dsa_7oeZ7FOUmHZVUWCGL0z-sV/view?usp=drive_link" },
  { id: "design-dr-mohamed-5", kind: "image", groupSlug: "dr-mohamed-ismail-dental-clinics", clientName: "Dr. Mohamed Ismail Dental Clinics", industry: "Health Care", credit: "Designed By / Ahmed Maroof", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/1fz8lOruDYwiQbA-C0rvc7QdGcybjh54W/view?usp=drive_link" },
  // Client 2: Ogien Dental Clinic (5)
  { id: "design-ogien-1", kind: "image", groupSlug: "ogien-dental-clinic", clientName: "Ogien Dental Clinic", industry: "Health Care", credit: "Designed By / Omar Abdelrahim", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1XCaF-ZywZs30pgEOztYC9NUuZ3Nvyp3r/view?usp=drive_link" },
  { id: "design-ogien-2", kind: "image", groupSlug: "ogien-dental-clinic", clientName: "Ogien Dental Clinic", industry: "Health Care", credit: "Designed By / Omar Abdelrahim", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/18TgZTvC1nuDxUpO03HIREmJIpWTP7Hf9/view?usp=drive_link" },
  { id: "design-ogien-3", kind: "image", groupSlug: "ogien-dental-clinic", clientName: "Ogien Dental Clinic", industry: "Health Care", credit: "Designed By / Omar Abdelrahim", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1pXGa0gZDobljC9HKnoscd_iYEP0AAlV2/view?usp=drive_link" },
  { id: "design-ogien-4", kind: "image", groupSlug: "ogien-dental-clinic", clientName: "Ogien Dental Clinic", industry: "Health Care", credit: "Designed By / Omar Abdelrahim", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1U_6SluGRp_yiqQN9pPlBJIMRkJb_MNmq/view?usp=drive_link" },
  { id: "design-ogien-5", kind: "image", groupSlug: "ogien-dental-clinic", clientName: "Ogien Dental Clinic", industry: "Health Care", credit: "Designed By / Omar Abdelrahim", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/1d8u-tlTjc4Rmju64paulfOHS7_OZXal-/view?usp=drive_link" },
  // Client 3: Fast Way (5)
  { id: "design-fast-way-1", kind: "image", groupSlug: "fast-way", clientName: "Fast Way", industry: "Shipping", credit: "Designed By / Ahmed Maroof", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1SK1NoYQ9ATx-NiMoFmdl2iFg2dKb7yVu/view?usp=drive_link" },
  { id: "design-fast-way-2", kind: "image", groupSlug: "fast-way", clientName: "Fast Way", industry: "Shipping", credit: "Designed By / Ahmed Maroof", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1vzRK1GhVcaJNyN_5s_EPQyGvpthMeDIV/view?usp=drive_link" },
  { id: "design-fast-way-3", kind: "image", groupSlug: "fast-way", clientName: "Fast Way", industry: "Shipping", credit: "Designed By / Ahmed Maroof", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1LIhrOZHZxGtW8P4SvqIuHVpZYm5HZOZS/view?usp=drive_link" },
  { id: "design-fast-way-4", kind: "image", groupSlug: "fast-way", clientName: "Fast Way", industry: "Shipping", credit: "Designed By / Ahmed Maroof", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1C5W8D8i7GC1Cr7-JaOV9tCc8yZIE3xzZ/view?usp=drive_link" },
  { id: "design-fast-way-5", kind: "image", groupSlug: "fast-way", clientName: "Fast Way", industry: "Shipping", credit: "Designed By / Ahmed Maroof", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/16rOVoK3Nm9bDUcfHQ5u8LdmojvQK1bzf/view?usp=drive_link" },
  // Client 4: Galaxy Swimming Academy (4)
  { id: "design-galaxy-1", kind: "image", groupSlug: "galaxy-swimming-academy", clientName: "Galaxy Swimming Academy", industry: "Sports", credit: "Designed By / Ahmed Maroof", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1uiKJevYcADB0lUfdj0XLbdklj-_x0jH_/view?usp=drive_link" },
  { id: "design-galaxy-2", kind: "image", groupSlug: "galaxy-swimming-academy", clientName: "Galaxy Swimming Academy", industry: "Sports", credit: "Designed By / Ahmed Maroof", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1LYQ_9cL5xNqDuvDTNmdV2mJmugxCTXW8/view?usp=drive_link" },
  { id: "design-galaxy-3", kind: "image", groupSlug: "galaxy-swimming-academy", clientName: "Galaxy Swimming Academy", industry: "Sports", credit: "Designed By / Ahmed Maroof", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1tHGONioTfLSi2PWfbb9PR6iRQuCAvs4h/view?usp=drive_link" },
  { id: "design-galaxy-4", kind: "image", groupSlug: "galaxy-swimming-academy", clientName: "Galaxy Swimming Academy", industry: "Sports", credit: "Designed By / Ahmed Maroof", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/18UIhwHoL4KipBcHLG8BOybXIDkXzqzpi/view?usp=drive_link" },
  // Client 5: Yadawy (5)
  { id: "design-yadawy-1", kind: "image", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor", credit: "Designed By / Ahmed Maroof", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1ImKl_xiTkrIreLoNE9NBWkfRhKg60FJk/view?usp=drive_link" },
  { id: "design-yadawy-2", kind: "image", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor", credit: "Designed By / Ahmed Maroof", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1HpBXG8H8qxucKF1jalU1JX5ZdHTHJbK-/view?usp=drive_link" },
  { id: "design-yadawy-3", kind: "image", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor", credit: "Designed By / Ahmed Maroof", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1ehB37dYdu53NI4fBIC9m83q19DCHumFa/view?usp=drive_link" },
  { id: "design-yadawy-4", kind: "image", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor", credit: "Designed By / Ahmed Maroof", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1QTTj_7XqhPMJrqY7s1MY9-KvOMrqWjNB/view?usp=drive_link" },
  { id: "design-yadawy-5", kind: "image", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor", credit: "Designed By / Ahmed Maroof", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/1WwQmBSCw0HIZsrPza_hLDul10F40ZdBZ/view?usp=drive_link" },
];

const VIDEO_ITEMS = [
  // Group 1: Health Care (7)
  { id: "video-health-care-1", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 1, sourceUrl: "https://drive.google.com/file/d/17SV0E9JO4LVoDaoGjTs5nLGL0tON_a-e/view?usp=drive_link" },
  { id: "video-health-care-2", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 2, sourceUrl: "https://drive.google.com/file/d/1Pd6N5ABBFnFUxuH6__vgAwdmSLR7ez12/view?usp=drive_link" },
  { id: "video-health-care-3", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 3, sourceUrl: "https://drive.google.com/file/d/1j8cGcQg0zT9g0agWcN7V4gQXpS4_KC26/view?usp=drive_link" },
  { id: "video-health-care-4", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 4, sourceUrl: "https://drive.google.com/file/d/1h3aUD9TvP-YbkTzf76U8TPJn0zKYcGHx/view?usp=drive_link" },
  { id: "video-health-care-5", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 5, sourceUrl: "https://drive.google.com/file/d/1xB4hpyqi-XdgkAXSgzb-ehr1wMG_lmMx/view?usp=drive_link" },
  { id: "video-health-care-6", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 6, sourceUrl: "https://drive.google.com/file/d/1Bdv-mjIagc7zJ-IRs3aiaB8T2kOWPTlO/view?usp=drive_link" },
  { id: "video-health-care-7", kind: "video", groupSlug: "health-care", industry: "Health Care", index: 7, sourceUrl: "https://drive.google.com/file/d/1SWJ4ot--7suRr-OpfwEtTs2fwSyydmzj/view?usp=drive_link" },
  // Group 2: Shipping (4)
  { id: "video-shipping-1", kind: "video", groupSlug: "shipping", industry: "Shipping", index: 1, sourceUrl: "https://drive.google.com/file/d/1lu-82yaRQRX5MsflZPONwEPtIUsfYv0j/view?usp=drive_link" },
  { id: "video-shipping-2", kind: "video", groupSlug: "shipping", industry: "Shipping", index: 2, sourceUrl: "https://drive.google.com/file/d/1pz_zZ6H0qUE16isMmB7Hc9wtlD35BzZp/view?usp=drive_link" },
  { id: "video-shipping-3", kind: "video", groupSlug: "shipping", industry: "Shipping", index: 3, sourceUrl: "https://drive.google.com/file/d/103IK4_Ezr1GCMmy4rI0aSe4wT87OVaLP/view?usp=drive_link" },
  { id: "video-shipping-4", kind: "video", groupSlug: "shipping", industry: "Shipping", index: 4, sourceUrl: "https://drive.google.com/file/d/1TkmfYnnSu21mpy-PYqKhKyEj1IQKhuHp/view?usp=drive_link" },
  // Group 3: Sports (4)
  { id: "video-sports-1", kind: "video", groupSlug: "sports", industry: "Sports", index: 1, sourceUrl: "https://drive.google.com/file/d/1pttI5qM9ql_yzJojhf4aWfnntS_VnIz8/view?usp=drive_link" },
  { id: "video-sports-2", kind: "video", groupSlug: "sports", industry: "Sports", index: 2, sourceUrl: "https://drive.google.com/file/d/1D7_jAou0D8EsxRXMFlk9kyyKCCxpe4tO/view?usp=drive_link" },
  { id: "video-sports-3", kind: "video", groupSlug: "sports", industry: "Sports", index: 3, sourceUrl: "https://drive.google.com/file/d/1lQEUuaAIWmUGhHmgzqWrUHy2SHn0h0Er/view?usp=drive_link" },
  { id: "video-sports-4", kind: "video", groupSlug: "sports", industry: "Sports", index: 4, sourceUrl: "https://drive.google.com/file/d/1IkhNiBAl9WMKVdyQfHBVGAandZdGTdjM/view?usp=drive_link" },
  // Group 4: Home Decor (4)
  { id: "video-home-decor-1", kind: "video", groupSlug: "home-decor", industry: "Home Decor", index: 1, sourceUrl: "https://drive.google.com/file/d/1Mcz-U6SZyp-7yMcbxDeeOBRi_FREDa77/view?usp=drive_link" },
  { id: "video-home-decor-2", kind: "video", groupSlug: "home-decor", industry: "Home Decor", index: 2, sourceUrl: "https://drive.google.com/file/d/14bxp0txQAYF8PFzvjATRyPId5eHQYfhR/view?usp=drive_link" },
  { id: "video-home-decor-3", kind: "video", groupSlug: "home-decor", industry: "Home Decor", index: 3, sourceUrl: "https://drive.google.com/file/d/1VWSoqxLHFP-h68agTnFiS1qElyHuDaVs/view?usp=drive_link" },
  { id: "video-home-decor-4", kind: "video", groupSlug: "home-decor", industry: "Home Decor", index: 4, sourceUrl: "https://drive.google.com/file/d/1tWrTbD-HxROR1zxf1oFpSq9x_5s-Sd56/view?usp=drive_link" },
  // Group 5: AI Characters (2)
  { id: "video-ai-characters-1", kind: "video", groupSlug: "ai-characters", industry: "AI Characters", index: 1, sourceUrl: "https://drive.google.com/file/d/1CG8brIZL4wPomreok69JYAt2e2eh1bkx/view?usp=drive_link" },
  { id: "video-ai-characters-2", kind: "video", groupSlug: "ai-characters", industry: "AI Characters", index: 2, sourceUrl: "https://drive.google.com/file/d/1wv9346PvajWOwx0_EcTLdny4zwflZs27/view?usp=drive_link" },
];

const WEBSITE_ITEMS = [
  // Website 1 (Subfolder "1" — 13zk7p1OF2DeRxDMeJiIDcoLiyC4LxXcw): AutoParts (6 screenshots)
  { id: "website-autoparts-1", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1QuOgIQQJkWfZCNejFNt58Afx-sGT1Xdr/view?usp=drive_link" },
  { id: "website-autoparts-2", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1Fd6InTVOA0OYpqw0yrqufC-58fclUXSi/view?usp=drive_link" },
  { id: "website-autoparts-3", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1VnzulqUIrfOSVMfIxZJagUTSeEA_XZ_f/view?usp=drive_link" },
  { id: "website-autoparts-4", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1elUxAYR3syTwwnsVTIuObgNT9Re53Avb/view?usp=drive_link" },
  { id: "website-autoparts-5", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/1NmZYqbUzv_mzLog9VFJ3bm71ng-yrIeU/view?usp=drive_link" },
  { id: "website-autoparts-6", kind: "image", folderNumber: "1", groupSlug: "autoparts", clientName: "AutoParts", industry: "Automotive E-Commerce", index: 6, isLead: false, sourceUrl: "https://drive.google.com/file/d/1VqSML7y0XQy3SYzETeDLY2VPV2khSBlF/view?usp=drive_link" },
  // Website 2 (Subfolder "2" — 1Ge-4XcKQzK3BKK6wLzYuXbqhVaaax9ph): FitTrack (7 screenshots)
  { id: "website-fittrack-1", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1tvRTy85iAzLT-pGWJFaVg37J8efv7HBM/view?usp=drive_link" },
  { id: "website-fittrack-2", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1WyvGVLShX7duedMTCyAwJaEl1mqV7cLW/view?usp=drive_link" },
  { id: "website-fittrack-3", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1N5SniVSPMzY4bM20L-cN-z8uDlIJzJqo/view?usp=drive_link" },
  { id: "website-fittrack-4", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1htnzdm2FwGsKmdUysNqghR0vM3CfuXFh/view?usp=drive_link" },
  { id: "website-fittrack-5", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/16bOetUWI6VC6pd5C9RvxMbjxfrpe6xvi/view?usp=drive_link" },
  { id: "website-fittrack-6", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 6, isLead: false, sourceUrl: "https://drive.google.com/file/d/1dow9MCpC5jWbqoWeqcOX7UA4V9Yzenb6/view?usp=drive_link" },
  { id: "website-fittrack-7", kind: "image", folderNumber: "2", groupSlug: "fittrack", clientName: "FitTrack", industry: "Gym Management System", index: 7, isLead: false, sourceUrl: "https://drive.google.com/file/d/1DJdhcjMK4gf45TbOH--Ky7o-5rNDmUNc/view?usp=drive_link" },
  // Website 3 (Subfolder "3" — 1Pd9AoBj2MlmaXwLfBz_s40rIxmIv4zXA): Awfa Smart E-Services (2 screenshots)
  { id: "website-awfa-1", kind: "image", folderNumber: "3", groupSlug: "awfa-smart-services", clientName: "Awfa Smart E-Services", industry: "Corporate & E-Services", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1daeh-Wz3ci_Lt4Ri6uJBTCYFhVnIa7br/view?usp=drive_link" },
  { id: "website-awfa-2", kind: "image", folderNumber: "3", groupSlug: "awfa-smart-services", clientName: "Awfa Smart E-Services", industry: "Corporate & E-Services", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1PtiNjVz6uxJQyCqAI20SXORNovoXzN5z/view?usp=drive_link" },
  // Website 4 (Subfolder "4" — 186hhsJgaHky4NXOzzwuHnYr7gNTK83WZ): Yadawy (5 screenshots)
  { id: "website-yadawy-1", kind: "image", folderNumber: "4", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor & Artisanal Rugs", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/15EYiDS0carhoBQQ-fUtYyvERRNbZ6U8v/view?usp=drive_link" },
  { id: "website-yadawy-2", kind: "image", folderNumber: "4", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor & Artisanal Rugs", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1-a9vLvYPVHGmNgWyk-2CC21HhkDaSV-e/view?usp=drive_link" },
  { id: "website-yadawy-3", kind: "image", folderNumber: "4", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor & Artisanal Rugs", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1dUs3-ZomZMDPx4wnhmiijLseY_76rq8_/view?usp=drive_link" },
  { id: "website-yadawy-4", kind: "image", folderNumber: "4", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor & Artisanal Rugs", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1ubk6m85TxC69o9s8my6vqvx-7gbHC-gX/view?usp=drive_link" },
  { id: "website-yadawy-5", kind: "image", folderNumber: "4", groupSlug: "yadawy", clientName: "Yadawy", industry: "Home Decor & Artisanal Rugs", index: 5, isLead: false, sourceUrl: "https://drive.google.com/file/d/1xcSfVfIarmBbooiH6iLACiif1ITvRIO1/view?usp=drive_link" },
  // Website 5 (Subfolder "5" — 1rg3s59dVws7r1tHdVRlJqFruCIG56k6E): Kiya (4 screenshots)
  { id: "website-kiya-1", kind: "image", folderNumber: "5", groupSlug: "kiya", clientName: "Kiya", industry: "Fashion & Apparel E-Commerce", index: 1, isLead: true, sourceUrl: "https://drive.google.com/file/d/1ux92FN4r5YyIPFb6IEDLFG7l6EXUKogZ/view?usp=drive_link" },
  { id: "website-kiya-2", kind: "image", folderNumber: "5", groupSlug: "kiya", clientName: "Kiya", industry: "Fashion & Apparel E-Commerce", index: 2, isLead: false, sourceUrl: "https://drive.google.com/file/d/1px8xRb25FTSMpsVAUsxrfsLn1WlBEk7z/view?usp=drive_link" },
  { id: "website-kiya-3", kind: "image", folderNumber: "5", groupSlug: "kiya", clientName: "Kiya", industry: "Fashion & Apparel E-Commerce", index: 3, isLead: false, sourceUrl: "https://drive.google.com/file/d/1aL8VwhFxkEqjf2DWv1wvaMSxi8QWPdsv/view?usp=drive_link" },
  { id: "website-kiya-4", kind: "image", folderNumber: "5", groupSlug: "kiya", clientName: "Kiya", industry: "Fashion & Apparel E-Commerce", index: 4, isLead: false, sourceUrl: "https://drive.google.com/file/d/1BBKmvJfCfewxW_XJ94mH_gDPcMPw5r-E/view?usp=drive_link" },
];

function extractDriveId(url) {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : "";
}

const IS_OFFLINE_MODE = process.argv.includes("--offline");

/**
 * Look for a local file in public/portfolio/designs/<portfolioFolder>/
 * or public/media/designs/<groupSlug>/ before falling back to network fetch.
 */
function findLocalOverrideFile(groupSlug, portfolioFolder, index, fileId) {
  const numStr = String(index).padStart(2, "0");
  const candidateDirs = [
    path.join(PUBLIC_DIR, "portfolio", "designs", portfolioFolder),
    path.join(PUBLIC_DIR, "portfolio", "designs", groupSlug),
    path.join(PUBLIC_DIR, "media", "designs", groupSlug),
  ];
  const candidateNames = [
    `${portfolioFolder}-${numStr}.webp`,
    `${groupSlug}-${numStr}.webp`,
    `${portfolioFolder}-${numStr}.png`,
    `${groupSlug}-${numStr}.png`,
    `${portfolioFolder}-${numStr}.jpg`,
    `${groupSlug}-${numStr}.jpg`,
    `${portfolioFolder}-${numStr}.jpeg`,
    `${groupSlug}-${numStr}.jpeg`,
    `${index}.webp`,
    `${index}.png`,
    `${index}.jpg`,
    `${index}.jpeg`,
    `image-${index}.webp`,
    `image-${index}.png`,
    `image-${index}.jpg`,
    `${fileId}.webp`,
    `${fileId}.png`,
    `${fileId}.jpg`,
  ];

  for (const dir of candidateDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of candidateNames) {
      const full = path.join(dir, name);
      if (fs.existsSync(full) && fs.statSync(full).size > 1024) {
        return full;
      }
    }
  }
  return null;
}

/**
 * Attempt to download a file from Google Drive and verify it is genuine binary media (not an HTML sign-in page).
 */
async function attemptDriveDownload(fileId, rawPath) {
  if (IS_OFFLINE_MODE) {
    return {
      ok: false,
      httpStatus: 0,
      mimeType: null,
      error: "Offline mode enabled (--offline): Google Drive network requests disabled.",
    };
  }
  fs.mkdirSync(path.dirname(rawPath), { recursive: true });
  const downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`;

  try {
    const res = await fetch(downloadUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    });
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const finalUrl = res.url || "";

    if (
      finalUrl.includes("accounts.google.com") ||
      contentType.includes("text/html")
    ) {
      // Check the /view endpoint to confirm exact HTTP status (e.g., 401 vs 404)
      let viewStatus = res.status;
      try {
        const vRes = await fetch(viewUrl, { redirect: "manual" });
        viewStatus = vRes.status;
      } catch {
        // ignore
      }
      return {
        ok: false,
        httpStatus: viewStatus === 200 ? 401 : viewStatus,
        mimeType: "text/html",
        error:
          "Google Drive file access is set to 'Restricted' (HTTP 401 / redirects to accounts.google.com sign-in). Change Google Drive sharing permission to 'Anyone with the link (Viewer)' or place the image in public/portfolio/designs/ogien-dental-clinic/.",
      };
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 1024) {
      fs.writeFileSync(rawPath, buf);
      return {
        ok: true,
        httpStatus: 200,
        mimeType: contentType,
        error: null,
      };
    }
    return {
      ok: false,
      httpStatus: res.status,
      mimeType: contentType,
      error: `Downloaded payload too small (${buf.length} bytes)`,
    };
  } catch (err) {
    return {
      ok: false,
      httpStatus: null,
      mimeType: null,
      error: `Network error fetching Google Drive asset: ${err.message}`,
    };
  }
}

/**
 * Inspect MP4 binary atoms (mvhd for duration, tkhd for dimensions, avc1/hvc1 for codec)
 */
function parseMp4Metadata(filePath) {
  const stat = fs.statSync(filePath);
  const readSize = Math.min(stat.size, 8 * 1024 * 1024);
  const fd = fs.openSync(filePath, "r");
  const headBuf = Buffer.alloc(readSize);
  fs.readSync(fd, headBuf, 0, readSize, 0);

  let tailBuf = Buffer.alloc(0);
  if (stat.size > readSize) {
    const tailSize = Math.min(stat.size - readSize, 4 * 1024 * 1024);
    tailBuf = Buffer.alloc(tailSize);
    fs.readSync(fd, tailBuf, 0, tailSize, stat.size - tailSize);
  }
  fs.closeSync(fd);

  const combined = Buffer.concat([headBuf, tailBuf]);

  // Verify ftyp box
  if (!combined.includes(Buffer.from("ftyp"))) {
    return null;
  }

  let codec = "h264";
  if (combined.includes(Buffer.from("avc1"))) codec = "h264 (avc1)";
  else if (combined.includes(Buffer.from("hvc1")) || combined.includes(Buffer.from("hev1"))) codec = "hevc";

  // Parse mvhd for duration
  let duration = null;
  const mvhdIdx = combined.indexOf(Buffer.from("mvhd"));
  if (mvhdIdx !== -1 && mvhdIdx + 24 < combined.length) {
    const version = combined.readUInt8(mvhdIdx + 4);
    if (version === 0 && mvhdIdx + 24 <= combined.length) {
      const timescale = combined.readUInt32BE(mvhdIdx + 16);
      const dur = combined.readUInt32BE(mvhdIdx + 20);
      if (timescale > 0) duration = Number((dur / timescale).toFixed(2));
    } else if (version === 1 && mvhdIdx + 32 <= combined.length) {
      const timescale = combined.readUInt32BE(mvhdIdx + 24);
      const dur = Number(combined.readBigUInt64BE(mvhdIdx + 28));
      if (timescale > 0) duration = Number((dur / timescale).toFixed(2));
    }
  }

  // Parse tkhd for width & height
  let width = 1080;
  let height = 1920;
  let searchOffset = 0;
  while (searchOffset < combined.length) {
    const tkhdIdx = combined.indexOf(Buffer.from("tkhd"), searchOffset);
    if (tkhdIdx === -1) break;
    const version = combined.readUInt8(tkhdIdx + 4);
    const widthOffset = version === 1 ? tkhdIdx + 92 : tkhdIdx + 80;
    if (widthOffset + 8 <= combined.length) {
      const wFixed = combined.readUInt32BE(widthOffset);
      const hFixed = combined.readUInt32BE(widthOffset + 4);
      const w = Math.round(wFixed / 65536);
      const h = Math.round(hFixed / 65536);
      if (w >= 120 && h >= 120 && w <= 7680 && h <= 7680) {
        width = w;
        height = h;
        break;
      }
    }
    searchOffset = tkhdIdx + 4;
  }

  const orientation =
    width > height ? "landscape" : height > width ? "portrait" : "square";

  return { width, height, orientation, codec, duration };
}

async function generateVideoPosterWebp(
  fileId,
  itemId,
  posterAbs,
  industry,
  index,
  width,
  height
) {
  const thumbCachePath = path.join(RAW_CACHE_DIR, `${itemId}_${fileId}_thumb.jpg`);
  // If poster already exists on disk in public/media/posters/ and raw thumb cache isn't present, preserve existing poster without hitting Google Drive
  if (
    fs.existsSync(posterAbs) &&
    fs.statSync(posterAbs).size > 1024 &&
    (!fs.existsSync(thumbCachePath) || fs.statSync(thumbCachePath).size <= 1024)
  ) {
    return;
  }

  if (
    !IS_OFFLINE_MODE &&
    (!fs.existsSync(thumbCachePath) || fs.statSync(thumbCachePath).size <= 1024)
  ) {
    try {
      const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1080`;
      const res = await fetch(thumbUrl, {
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
      });
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (res.ok && ct.startsWith("image/")) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 1024) {
          fs.mkdirSync(path.dirname(thumbCachePath), { recursive: true });
          fs.writeFileSync(thumbCachePath, buf);
        }
      }
    } catch {
      // Fallback to SVG poster below
    }
  }

  if (fs.existsSync(thumbCachePath) && fs.statSync(thumbCachePath).size > 1024) {
    try {
      await sharp(fs.readFileSync(thumbCachePath))
        .resize({ width: 900, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toFile(posterAbs);
      return;
    } catch {
      // Fallback to SVG poster below
    }
  }

  if (fs.existsSync(posterAbs) && fs.statSync(posterAbs).size > 1024) {
    return;
  }

  await generatePosterSvgWebp(posterAbs, industry, index, width, height);
}

async function generatePosterSvgWebp(posterAbs, industry, index, width, height) {
  const w = 720;
  const h = Math.round((w * (height || 1920)) / (width || 1080));
  const clampedH = Math.max(480, Math.min(1280, h));
  const numStr = String(index).padStart(2, "0");

  const svg = `<svg width="${w}" height="${clampedH}" viewBox="0 0 ${w} ${clampedH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#8145CA" stop-opacity="0.26"/>
        <stop offset="50%" stop-color="#14ACF3" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14ACF3"/>
        <stop offset="35%" stop-color="#8145CA"/>
        <stop offset="68%" stop-color="#F3398D"/>
        <stop offset="100%" stop-color="#FF7538"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#000000"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <rect x="28" y="28" width="${w - 56}" height="${clampedH - 56}" rx="24" fill="none" stroke="url(#brandGrad)" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="50%" y="44%" text-anchor="middle" fill="#14ACF3" font-family="sans-serif" font-size="18" font-weight="700" letter-spacing="6">${industry.toUpperCase()}</text>
    <text x="50%" y="52%" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="42" font-weight="800">REEL ${numStr}</text>
    <text x="50%" y="59%" text-anchor="middle" fill="#B7B7BF" font-family="sans-serif" font-size="14" letter-spacing="3">HELAL MEDIA PRODUCTION</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 86 })
    .toFile(posterAbs);
}

async function generateBrandMetaAssets() {
  const symbolPath = path.join(PUBLIC_DIR, "brand/helal-symbol.svg");
  const logoPath = path.join(PUBLIC_DIR, "brand/helal-logo.svg");
  if (!fs.existsSync(symbolPath) || !fs.existsSync(logoPath)) return;

  const symbolSvg = fs.readFileSync(symbolPath);
  await sharp({
    create: { width: 180, height: 180, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(symbolSvg, { density: 300 })
          .resize(124, 154, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
      },
    ])
    .png()
    .toFile(path.join(PUBLIC_DIR, "brand/apple-touch-icon.png"));

  const logoSvg = fs.readFileSync(logoPath);
  const logoBuf = await sharp(logoSvg, { density: 300 })
    .resize(680, 189, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const bgSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#8145CA" stop-opacity="0.22"/>
        <stop offset="50%" stop-color="#14ACF3" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#14ACF3"/>
        <stop offset="35%" stop-color="#8145CA"/>
        <stop offset="68%" stop-color="#F3398D"/>
        <stop offset="100%" stop-color="#FF7538"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#000000"/>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="480" y="420" width="240" height="3" rx="1.5" fill="url(#bar)"/>
    <text x="600" y="468" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="700" letter-spacing="8">MARKETING HAS NO CATALOG</text>
  </svg>`);

  await sharp(bgSvg)
    .composite([{ input: logoBuf, top: 185, left: 260 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, "brand/og-share.png"));
  console.log("[BRAND META] Generated apple-touch-icon.png and og-share.png");
}

async function main() {
  await generateBrandMetaAssets();
  const designsOut = [];
  const videosOut = [];

  // Ensure /public/portfolio/designs/ogien-dental-clinic/ directory exists for easy drop-in
  fs.mkdirSync(
    path.join(PUBLIC_DIR, "portfolio", "designs", "ogien-dental-clinic"),
    { recursive: true }
  );

  for (const item of DESIGN_ITEMS) {
    const fileId = extractDriveId(item.sourceUrl);
    const rawPath = path.join(RAW_CACHE_DIR, `${item.id}_${fileId}.bin`);
    const numStr = String(item.index).padStart(2, "0");
    const portfolioFolder =
      item.groupSlug === "dr-mohamed-ismail-dental-clinics"
        ? "dr-mohamed-ismail"
        : item.groupSlug;
    const outRel = `/media/designs/${item.groupSlug}/${item.groupSlug}-${numStr}.webp`;
    const portfolioRel = `/portfolio/designs/${portfolioFolder}/${portfolioFolder}-${numStr}.webp`;
    const outAbs = path.join(PUBLIC_DIR, outRel.replace(/^\//, ""));
    const portfolioAbs = path.join(PUBLIC_DIR, portfolioRel.replace(/^\//, ""));

    const record = {
      ...item,
      driveFileId: fileId,
      status: "blocked",
      httpStatus: 401,
      mimeType: null,
      rawBytes: 0,
      optimizedBytes: 0,
      width: 0,
      height: 0,
      orientation: "unknown",
      codec: null,
      duration: null,
      localPath: null,
      posterPath: null,
      error: null,
    };

    // Check if a local file exists in .media-cache, public/portfolio/designs/<slug>/, or public/media/designs/<slug>/
    let sourceFile =
      fs.existsSync(rawPath) && fs.statSync(rawPath).size > 1024
        ? rawPath
        : findLocalOverrideFile(
            item.groupSlug,
            portfolioFolder,
            item.index,
            fileId
          );

    // If not stored locally anywhere, attempt live download from Google Drive
    let liveProbe = null;
    if (!sourceFile) {
      liveProbe = await attemptDriveDownload(fileId, rawPath);
      if (liveProbe.ok && fs.existsSync(rawPath)) {
        sourceFile = rawPath;
      }
    }

    if (sourceFile && fs.existsSync(sourceFile)) {
      try {
        const inputBuf = fs.readFileSync(sourceFile);
        const rawBytes = inputBuf.length;
        fs.mkdirSync(path.dirname(outAbs), { recursive: true });
        fs.mkdirSync(path.dirname(portfolioAbs), { recursive: true });

        const img = sharp(inputBuf);
        const meta = await img.metadata();
        const origW = meta.width || 1080;

        const resized =
          origW > 1800
            ? img.resize({ width: 1800, withoutEnlargement: true })
            : img;
        const info = await resized.webp({ quality: 88 }).toFile(outAbs);
        // Mirror to /public/portfolio/designs/<portfolioFolder>/
        fs.copyFileSync(outAbs, portfolioAbs);

        record.status = "verified";
        record.httpStatus = 200;
        record.mimeType = `image/${meta.format || "png"}`;
        record.rawBytes = rawBytes;
        record.optimizedBytes = info.size;
        record.width = info.width;
        record.height = info.height;
        record.orientation =
          info.width > info.height
            ? "landscape"
            : info.height > info.width
            ? "portrait"
            : "square";
        record.codec = "webp";
        record.localPath = portfolioRel;
        console.log(
          `[VERIFIED IMAGE] ${item.id} -> ${portfolioRel} (${info.width}x${info.height}, ${info.size}B)`
        );
      } catch (e) {
        record.error = `Image decode error: ${e.message}`;
        console.log(`[BLOCKED IMAGE] ${item.id} -> ${record.error}`);
      }
    } else {
      record.httpStatus = liveProbe?.httpStatus ?? 401;
      record.mimeType = liveProbe?.mimeType ?? "text/html";
      record.error =
        liveProbe?.error ||
        "HTTP 401 Unauthorized — Google Drive file ACL restricted by owner (requires Google Drive 'Anyone with the link' permission)";
      console.log(`[BLOCKED IMAGE] ${item.id} (${fileId}) -> ${record.error}`);
    }

    designsOut.push(record);
  }

  for (const item of VIDEO_ITEMS) {
    const fileId = extractDriveId(item.sourceUrl);
    const rawPath = path.join(RAW_CACHE_DIR, `${item.id}_${fileId}.bin`);
    const numStr = String(item.index).padStart(2, "0");
    const outRel = `/media/videos/${item.groupSlug}/${item.groupSlug}-${numStr}.mp4`;
    const portfolioVideoRel = `/portfolio/videos/${item.groupSlug}/${item.groupSlug}-${numStr}.mp4`;
    const posterRel = `/media/posters/${item.groupSlug}/${item.groupSlug}-${numStr}-poster.webp`;
    const outAbs = path.join(PUBLIC_DIR, outRel.replace(/^\//, ""));
    const portfolioVideoAbs = path.join(PUBLIC_DIR, portfolioVideoRel.replace(/^\//, ""));
    const posterAbs = path.join(PUBLIC_DIR, posterRel.replace(/^\//, ""));

    const record = {
      ...item,
      driveFileId: fileId,
      status: "blocked",
      httpStatus: null,
      mimeType: null,
      rawBytes: 0,
      optimizedBytes: 0,
      width: 0,
      height: 0,
      orientation: "unknown",
      codec: null,
      duration: null,
      localPath: null,
      posterPath: null,
      error: null,
    };

    let videoSourcePath = [rawPath, portfolioVideoAbs, outAbs].find(
      (p) => fs.existsSync(p) && fs.statSync(p).size > 1024
    );

    if (!videoSourcePath) {
      const dl = await attemptDriveDownload(fileId, rawPath);
      if (dl.ok && fs.existsSync(rawPath) && fs.statSync(rawPath).size > 1024) {
        videoSourcePath = rawPath;
      }
    }

    if (videoSourcePath && fs.existsSync(videoSourcePath)) {
      try {
        const rawBytes = fs.statSync(videoSourcePath).size;
        const meta = parseMp4Metadata(videoSourcePath);
        if (!meta) {
          throw new Error("Invalid MP4 container header");
        }

        fs.mkdirSync(path.dirname(outAbs), { recursive: true });
        fs.mkdirSync(path.dirname(portfolioVideoAbs), { recursive: true });
        fs.mkdirSync(path.dirname(posterAbs), { recursive: true });

        if (
          path.resolve(videoSourcePath) !== path.resolve(outAbs) &&
          (!fs.existsSync(outAbs) || fs.statSync(outAbs).size !== rawBytes)
        ) {
          fs.copyFileSync(videoSourcePath, outAbs);
        }

        if (
          path.resolve(videoSourcePath) !== path.resolve(portfolioVideoAbs) &&
          (!fs.existsSync(portfolioVideoAbs) ||
            fs.statSync(portfolioVideoAbs).size !== rawBytes)
        ) {
          try {
            if (fs.existsSync(portfolioVideoAbs)) fs.unlinkSync(portfolioVideoAbs);
            fs.linkSync(outAbs, portfolioVideoAbs);
          } catch {
            fs.copyFileSync(outAbs, portfolioVideoAbs);
          }
        }

        await generateVideoPosterWebp(
          fileId,
          item.id,
          posterAbs,
          item.industry,
          item.index,
          meta.width,
          meta.height
        );

        record.status = "verified";
        record.httpStatus = 200;
        record.mimeType = "video/mp4";
        record.rawBytes = rawBytes;
        record.optimizedBytes = fs.statSync(outAbs).size;
        record.width = meta.width;
        record.height = meta.height;
        record.orientation = meta.orientation;
        record.codec = meta.codec;
        record.duration = meta.duration;
        record.localPath = portfolioVideoRel;
        record.posterPath = posterRel;
        console.log(
          `[VERIFIED VIDEO] ${item.id} -> ${portfolioVideoRel} (${meta.width}x${meta.height}, ${meta.duration}s, ${meta.codec})`
        );
      } catch (e) {
        record.error = `Video validation error: ${e.message}`;
        console.log(`[BLOCKED VIDEO] ${item.id} -> ${record.error}`);
      }
    } else {
      record.httpStatus = 403;
      record.error = "Video file unavailable from Google Drive";
      console.log(`[BLOCKED VIDEO] ${item.id} -> ${record.error}`);
    }

    videosOut.push(record);
  }

  const websitesOut = [];
  for (const item of WEBSITE_ITEMS) {
    const fileId = extractDriveId(item.sourceUrl);
    const rawPath = path.join(RAW_CACHE_DIR, `${item.id}_${fileId}.bin`);
    const folderRawPath = path.join(
      RAW_CACHE_DIR,
      "websites",
      `folder${item.folderNumber}_${item.index}_${fileId}.png`
    );
    const numStr = String(item.index).padStart(2, "0");
    const outRel = `/media/websites/${item.groupSlug}/${item.groupSlug}-${numStr}.webp`;
    const portfolioRel = `/portfolio/websites/${item.groupSlug}/${item.groupSlug}-${numStr}.webp`;
    const outAbs = path.join(PUBLIC_DIR, outRel.replace(/^\//, ""));
    const portfolioAbs = path.join(PUBLIC_DIR, portfolioRel.replace(/^\//, ""));

    const record = {
      ...item,
      driveFileId: fileId,
      status: "blocked",
      httpStatus: 401,
      mimeType: null,
      rawBytes: 0,
      optimizedBytes: 0,
      width: 0,
      height: 0,
      orientation: "unknown",
      codec: null,
      duration: null,
      localPath: null,
      posterPath: null,
      error: null,
    };

    let sourceFile = [rawPath, folderRawPath, portfolioAbs, outAbs].find(
      (p) => fs.existsSync(p) && fs.statSync(p).size > 1024
    );

    let liveProbe = null;
    if (!sourceFile) {
      liveProbe = await attemptDriveDownload(fileId, rawPath);
      if (liveProbe.ok && fs.existsSync(rawPath)) {
        sourceFile = rawPath;
      }
    }

    if (sourceFile && fs.existsSync(sourceFile)) {
      try {
        const inputBuf = fs.readFileSync(sourceFile);
        const rawBytes = inputBuf.length;
        if (!fs.existsSync(rawPath) || fs.statSync(rawPath).size <= 1024) {
          fs.mkdirSync(path.dirname(rawPath), { recursive: true });
          fs.writeFileSync(rawPath, inputBuf);
        }
        fs.mkdirSync(path.dirname(outAbs), { recursive: true });
        fs.mkdirSync(path.dirname(portfolioAbs), { recursive: true });

        const img = sharp(inputBuf);
        const meta = await img.metadata();
        const origW = meta.width || 1920;

        const resized =
          origW > 1920
            ? img.resize({ width: 1920, withoutEnlargement: true })
            : img;
        const info = await resized.webp({ quality: 90 }).toFile(outAbs);
        fs.copyFileSync(outAbs, portfolioAbs);

        record.status = "verified";
        record.httpStatus = 200;
        record.mimeType = `image/${meta.format || "png"}`;
        record.rawBytes = rawBytes;
        record.optimizedBytes = info.size;
        record.width = info.width;
        record.height = info.height;
        record.orientation =
          info.width > info.height
            ? "landscape"
            : info.height > info.width
            ? "portrait"
            : "square";
        record.codec = "webp";
        record.localPath = portfolioRel;
        console.log(
          `[VERIFIED WEBSITE] ${item.id} -> ${portfolioRel} (${info.width}x${info.height}, ${info.size}B)`
        );
      } catch (e) {
        record.error = `Website image decode error: ${e.message}`;
        console.log(`[BLOCKED WEBSITE] ${item.id} -> ${record.error}`);
      }
    } else {
      record.httpStatus = liveProbe?.httpStatus ?? 401;
      record.mimeType = liveProbe?.mimeType ?? "text/html";
      record.error =
        liveProbe?.error ||
        "Website screenshot unavailable from Google Drive";
      console.log(`[BLOCKED WEBSITE] ${item.id} (${fileId}) -> ${record.error}`);
    }

    websitesOut.push(record);
  }

  const verifiedDesigns = designsOut.filter((d) => d.status === "verified").length;
  const verifiedVideos = videosOut.filter((v) => v.status === "verified").length;
  const verifiedWebsites = websitesOut.filter((w) => w.status === "verified").length;

  const manifest = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalAssets: designsOut.length + videosOut.length + websitesOut.length,
      designImagesTotal: designsOut.length,
      designImagesVerified: verifiedDesigns,
      designImagesBlocked: designsOut.length - verifiedDesigns,
      videosTotal: videosOut.length,
      videosVerified: verifiedVideos,
      videosBlocked: videosOut.length - verifiedVideos,
      websiteImagesTotal: websitesOut.length,
      websiteImagesVerified: verifiedWebsites,
      websiteImagesBlocked: websitesOut.length - verifiedWebsites,
    },
    designs: designsOut,
    videos: videosOut,
    websites: websitesOut,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log("\n=== FINAL MEDIA MANIFEST SUMMARY ===");
  console.log(JSON.stringify(manifest.summary, null, 2));
}

main();

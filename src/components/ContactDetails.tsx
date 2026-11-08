import React from "react";
import { Locale } from "@/data/types";
import { BUSINESS_CONFIG, getCopy } from "@/data/content";

export function ContactDetails({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const { email, phones, socials, whatsappUrl } = BUSINESS_CONFIG;

  return (
    <div
      data-testid="contact-details"
      className="flex flex-col justify-between space-y-12"
    >
      {/* Large Editorial Hero Statement */}
      <div className="space-y-6">
        <span className="inline-block rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brandBlue">
          {copy.nav.contact}
        </span>

        {/*
          Section 9 Contact Hero:
          "Marketing has no catalog. We’ll write your brand’s"
          Highlight the word "catalog" / "كتالوج" in the official brand gradient.
          Preserved verbatim without silently inventing an unapproved ending.
        */}
        <h1
          data-testid="contact-hero-headline"
          className={`font-bold text-alabaster ${
            lang === "ar"
              ? "font-arabic text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.24]"
              : "font-display text-3xl sm:text-5xl lg:text-[3.65rem] leading-[1.08] tracking-tight"
          }`}
        >
          <span>{copy.contactPage.heroPrefix}</span>
          <span
            data-testid="contact-accent-catalog"
            className="text-brand-gradient relative inline-block pb-1"
          >
            {copy.contactPage.heroAccent}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-brand-gradient opacity-80"
            />
          </span>
          <span>{copy.contactPage.heroSuffix}</span>
        </h1>

        <p
          data-testid="contact-supporting-copy"
          className="max-w-xl text-base sm:text-xl leading-relaxed text-pewter"
        >
          {copy.contactPage.supportingCopy}
        </p>
      </div>

      {/* Contact Methods Card */}
      <div className="space-y-8 rounded-3xl border border-white/10 bg-slateStudio p-7 sm:p-10">
        {/* Email */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gradient">
            {copy.contactPage.infoLabels.email}
          </h2>
          <a
            href={`mailto:${email}`}
            dir="ltr"
            data-testid="contact-email-link"
            className="inline-block font-sans text-lg sm:text-2xl font-bold tracking-tight text-alabaster transition hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded [unicode-bidi:isolate]"
          >
            {email}
          </a>
        </div>

        {/* Three Official Phone Numbers */}
        <div className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gradient">
            {copy.contactPage.infoLabels.phone}
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            {phones.map((phone) => (
              <div
                key={phone.raw}
                className="flex items-center gap-2 rounded-xl border border-white/12 bg-carbon px-4 py-2.5 shadow-sm transition hover:border-brandBlue/50"
              >
                {/* Clickable Phone Number */}
                <a
                  href={phone.telHref}
                  dir="ltr"
                  data-testid={`contact-phone-${phone.raw}`}
                  aria-label={`${lang === "ar" ? "اتصال هاتفي" : "Call"} ${phone.display}`}
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-alabaster transition hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue [unicode-bidi:isolate]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brandBlue transition group-hover:border-brandBlue group-hover:bg-brandBlue/15">
                    <PhoneIcon />
                  </span>
                  <span>{phone.display}</span>
                </a>

                {/* Clickable WhatsApp Icon (only for WhatsApp-enabled numbers) */}
                {phone.hasWhatsApp && phone.whatsappHref && (
                  <a
                    href={phone.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    data-testid={`contact-whatsapp-${phone.raw}`}
                    aria-label={`${lang === "ar" ? "مراسلة عبر واتساب" : "Chat on WhatsApp with"} ${phone.display}`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#25D366] transition-all hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  >
                    <WhatsAppIcon />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Official Social Media Icons + Availability */}
        <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pewter mb-3">
              {copy.contactPage.infoLabels.followUs}
            </h2>
            <div className="flex items-center gap-3">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials.instagramLabel}
                data-testid="contact-social-instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-alabaster transition-all duration-200 hover:border-brandPink hover:bg-brand-gradient-subtle hover:text-brandPink hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPink"
              >
                <InstagramIcon />
              </a>

              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials.facebookLabel}
                data-testid="contact-social-facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-alabaster transition-all duration-200 hover:border-brandBlue hover:bg-brand-gradient-subtle hover:text-brandBlue hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pewter mb-3">
              {copy.contactPage.infoLabels.availability}
            </h2>
            <p
              data-testid="contact-availability"
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-alabaster"
            >
              <span
                className="h-2.5 w-2.5 rounded-full bg-brand-gradient"
                aria-hidden="true"
              />
              <span>{BUSINESS_CONFIG.availability[lang]}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M15 3H12.5C10.567 3 9 4.567 9 6.5V10H6.5V14H9V21H13V14H16L16.8 10H13V6.8C13 6.358 13.358 6 13.8 6H16.8V3H15Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M5 4H9L11 9L8.5 10.5C9.57 12.67 11.33 14.43 13.5 15.5L15 13L20 15V19C20 19.55 19.55 20 19 20C10.72 20 4 13.28 4 5C4 4.45 4.45 4 5 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.33C16.31 14.21 15.09 13.61 14.86 13.52C14.64 13.44 14.47 13.4 14.31 13.65C14.14 13.9 13.66 14.47 13.51 14.64C13.37 14.8 13.22 14.82 12.97 14.7C12.72 14.58 11.92 14.32 10.97 13.47C10.23 12.81 9.73 11.99 9.59 11.75C9.44 11.5 9.57 11.37 9.7 11.24C9.81 11.13 9.94 10.95 10.07 10.81C10.19 10.66 10.23 10.56 10.31 10.39C10.39 10.23 10.35 10.08 10.29 9.96C10.23 9.84 9.74 8.64 9.54 8.14C9.34 7.65 9.14 7.72 8.99 7.71C8.85 7.7 8.69 7.7 8.52 7.7C8.36 7.7 8.09 7.76 7.87 8C7.64 8.25 7.01 8.84 7.01 10.04C7.01 11.24 7.89 12.4 8.01 12.56C8.13 12.72 9.73 15.2 12.19 16.26C12.78 16.51 13.23 16.66 13.59 16.78C14.18 16.97 14.72 16.94 15.15 16.88C15.63 16.81 16.62 16.28 16.82 15.7C17.03 15.12 17.03 14.63 16.97 14.53C16.91 14.43 16.81 14.45 16.56 14.33Z" />
    </svg>
  );
}

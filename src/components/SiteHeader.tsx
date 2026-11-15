"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SoundToggleButton } from "./SoundProvider";

export function SiteHeader({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const pathname = usePathname() || `/${lang}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      key: "home",
      label: copy.nav.home,
      href: `/${lang}`,
      isActive: pathname === `/${lang}` || pathname === `/${lang}/`,
    },
    {
      key: "about",
      label: copy.nav.about,
      href: `/${lang}#about`,
      isActive: false,
    },
    {
      key: "work",
      label: copy.nav.work,
      href: `/${lang}/work`,
      isActive: pathname.startsWith(`/${lang}/work`),
    },
    {
      key: "services",
      label: copy.nav.services,
      href: `/${lang}/services`,
      isActive: pathname.startsWith(`/${lang}/services`),
    },
    {
      key: "contact",
      label: copy.nav.contact,
      href: `/${lang}/contact`,
      isActive: pathname.startsWith(`/${lang}/contact`),
    },
  ];

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-obsidian/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        {/* Official Helal Media Production Brand Mark */}
        <Link
          href={`/${lang}`}
          dir="ltr"
          aria-label="Helal Media Production — Home"
          data-testid="header-logo"
          className="group flex shrink-0 items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-lg"
        >
          <span
            dir="ltr"
            data-testid="helal-official-logo-full"
            className="inline-flex items-center"
          >
            {/* Official Brand Lockup SVG extracted from Guidelines PDF */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/helal-logo.svg"
              alt="Helal Media Production"
              width={168}
              height={46}
              className="h-6 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </span>
        </Link>

        {/* Desktop Primary Navigation (5 Exact Items) */}
        <nav
          aria-label="Primary Navigation"
          data-testid="desktop-nav"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              data-testid={`nav-link-${item.key}`}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full ${
                item.isActive
                  ? "text-alabaster bg-white/[0.06]"
                  : "text-pewter hover:text-alabaster hover:bg-white/[0.03]"
              }`}
            >
              {item.label}
              {item.isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 -bottom-[1px] h-[2px] rounded-full bg-brand-gradient"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side Controls: Sound Toggle + Contact Us CTA + Language Switcher + Mobile Menu Toggle */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* Interactive UI Sound Toggle (OFF by default) */}
          <SoundToggleButton lang={lang} className="h-7 w-7 sm:h-8 sm:w-8" />

          {/* Contact Us Action Button beside Language Switcher */}
          <Link
            href={`/${lang}/contact`}
            aria-label={copy.nav.contactUsAria}
            data-testid="header-contact-cta"
            className="group inline-flex items-center gap-1 sm:gap-2 rounded-full border border-brandBlue/40 bg-brand-gradient-subtle px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide text-alabaster transition-all duration-300 hover:border-transparent hover:bg-brand-gradient hover:shadow-brandGlow hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            {/* Modern Message / Contact Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brandBlue transition-transform duration-300 group-hover:scale-110 group-hover:text-alabaster shrink-0"
            >
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="whitespace-nowrap">{copy.nav.contactUsCta}</span>
          </Link>

          <LanguageSwitcher lang={lang} />

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? copy.nav.closeMenu : copy.nav.openMenu}
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex lg:hidden h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            <span className="sr-only">
              {mobileOpen ? copy.nav.closeMenu : copy.nav.openMenu}
            </span>
            {mobileOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M4 7H20M4 12H20M4 17H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          data-testid="mobile-nav-drawer"
          className="lg:hidden border-t border-white/10 bg-carbon/98 px-4 pt-4 pb-6 backdrop-blur-2xl"
        >
          <ul className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  data-testid={`mobile-nav-link-${item.key}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                    item.isActive
                      ? "bg-brand-gradient-subtle text-alabaster border border-brandBlue/30"
                      : "text-pewter hover:bg-white/[0.04] hover:text-alabaster"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-brandBlue opacity-75"
                  >
                    {lang === "ar" ? "←" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/data/types";
import { getCopy } from "@/data/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HelalLogo } from "./HelalLogo";

export function SiteHeader({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const pathname = usePathname() || `/${lang}`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-obsidian/92 backdrop-blur-xl py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.75)]"
          : "border-b border-white/[0.08] bg-obsidian/80 backdrop-blur-md py-4.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official Helal Media Production Logo (Never mirrored in RTL) */}
        <Link
          href={`/${lang}`}
          aria-label="Helal Media Production"
          data-testid="header-brand-logo"
          className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue rounded-md"
        >
          <HelalLogo size="sm" priority />
        </Link>

        {/* Desktop Primary Navigation: Home | About | Work | Services | Contact */}
        <nav
          aria-label="Primary Navigation"
          data-testid="desktop-nav"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              data-testid={`nav-link-${item.key}`}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue ${
                item.isActive
                  ? "bg-white/[0.08] text-alabaster font-semibold"
                  : "text-alabaster/80 hover:bg-white/[0.04] hover:text-alabaster"
              }`}
            >
              {item.label}
              {item.isActive && (
                <span
                  className="absolute bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-brand-gradient"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Language Switcher + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen ? copy.nav.closeMenu : copy.nav.openMenu
            }
            data-testid="mobile-menu-toggle"
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-alabaster transition hover:border-brandBlue hover:text-brandBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue"
          >
            {mobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
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
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          data-testid="mobile-nav-drawer"
          className="md:hidden border-t border-white/10 bg-carbon/98 backdrop-blur-2xl px-6 py-6"
        >
          <div className="mb-5 pb-4 border-b border-white/10 flex items-center justify-between">
            <HelalLogo size="sm" />
          </div>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-link-${item.key}`}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                    item.isActive
                      ? "bg-brand-gradient-subtle text-alabaster font-semibold border border-brandBlue/40"
                      : "text-alabaster hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-brandBlue"
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

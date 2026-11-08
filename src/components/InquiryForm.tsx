"use client";

import React, { useState } from "react";
import { Locale } from "@/data/types";
import { CONTACT_DROPDOWN_SERVICES, getCopy } from "@/data/content";

export function InquiryForm({ lang }: { lang: Locale }) {
  const copy = getCopy(lang);
  const f = copy.contactPage.form;

  // Four visible fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [project, setProject] = useState("");

  // Hidden honeypot
  const [honeypot, setHoneypot] = useState("");

  // Submission states
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    project?: string;
  }>({});

  const validateClient = () => {
    const errs: { name?: string; email?: string; project?: string } = {};
    if (!name.trim()) {
      errs.name = f.validation.nameRequired;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = f.validation.emailRequired;
    }
    if (!project.trim()) {
      errs.project = f.validation.projectRequired;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateClient()) {
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: service.trim(),
          project: project.trim(),
          lang,
          company_website: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok === true && data?.delivered === true) {
        setStatus("success");
        setName("");
        setEmail("");
        setService("");
        setProject("");
        setFieldErrors({});
        return;
      }

      // Preserve visitor input on any failure!
      setStatus("error");
      if (res.status === 429 || data?.code === "RATE_LIMITED") {
        setErrorMessage(f.errors.rateLimited);
      } else if (res.status === 503 || data?.code === "TRANSPORT_UNCONFIGURED") {
        setErrorMessage(f.errors.unconfigured);
      } else if (data?.error) {
        setErrorMessage(data.error);
      } else {
        setErrorMessage(f.errors.network);
      }
    } catch {
      setStatus("error");
      setErrorMessage(f.errors.network);
    }
  };

  return (
    <div
      data-testid="inquiry-form-container"
      className="rounded-3xl border border-white/12 bg-gradient-to-b from-slateStudio to-carbon p-7 sm:p-10 lg:p-12 shadow-2xl"
    >
      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          data-testid="contact-form-success"
          className="flex min-h-[420px] flex-col items-center justify-center text-center space-y-6 py-12"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-2xl text-alabaster shadow-brandGlow">
            ✓
          </div>
          <h2
            className={`font-bold text-alabaster ${
              lang === "ar"
                ? "font-arabic text-2xl sm:text-3xl"
                : "font-display text-2xl sm:text-3xl"
            }`}
          >
            {f.successMessage}
          </h2>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setErrorMessage(null);
            }}
            className="mt-4 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-alabaster transition hover:border-brandBlue hover:text-brandBlue"
          >
            {f.sendAnother}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          data-testid="contact-inquiry-form"
          className="space-y-6"
        >
          {/* Field 1: Your name (Required) */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-semibold text-alabaster mb-2"
            >
              {f.nameLabel} <span className="text-brandPink">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) {
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              placeholder={f.namePlaceholder}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "err-name" : undefined}
              data-testid="input-name"
              className="w-full rounded-xl border border-white/15 bg-obsidian px-4 py-3.5 text-base text-alabaster placeholder:text-pewter/50 transition focus:border-brandBlue focus:outline-none focus:ring-2 focus:ring-brandPurple/40"
            />
            {fieldErrors.name && (
              <p
                id="err-name"
                role="alert"
                data-testid="error-name"
                className="mt-1.5 text-xs font-medium text-brandOrange"
              >
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Field 2: Email address (Required) */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-semibold text-alabaster mb-2"
            >
              {f.emailLabel} <span className="text-brandPink">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              placeholder={f.emailPlaceholder}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "err-email" : undefined}
              data-testid="input-email"
              className="w-full rounded-xl border border-white/15 bg-obsidian px-4 py-3.5 text-base text-alabaster placeholder:text-pewter/50 transition focus:border-brandBlue focus:outline-none focus:ring-2 focus:ring-brandPurple/40 text-start"
            />
            {fieldErrors.email && (
              <p
                id="err-email"
                role="alert"
                data-testid="error-email"
                className="mt-1.5 text-xs font-medium text-brandOrange"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Field 3: Service of interest (Custom-styled accessible dropdown/select, Optional, Exact 8 values) */}
          <div>
            <label
              htmlFor="contact-service"
              className="block text-sm font-semibold text-alabaster mb-2"
            >
              {f.serviceLabel}
            </label>
            <div className="relative">
              <select
                id="contact-service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                data-testid="select-service"
                className="w-full appearance-none rounded-xl border border-white/15 bg-obsidian px-4 py-3.5 pe-11 text-base text-alabaster transition focus:border-brandBlue focus:outline-none focus:ring-2 focus:ring-brandPurple/40"
              >
                <option value="" className="bg-obsidian text-pewter">
                  {f.servicePlaceholder}
                </option>
                {CONTACT_DROPDOWN_SERVICES.map((srv) => (
                  <option
                    key={srv.id}
                    value={srv.title.en}
                    className="bg-obsidian text-alabaster"
                  >
                    {srv.title[lang]}
                  </option>
                ))}
              </select>

              {/* Visible Chevron / Arrow */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 flex items-center text-brandBlue ${
                  lang === "ar" ? "left-4" : "right-4"
                }`}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Field 4: Tell us about your project (Multiline textarea, Required) */}
          <div>
            <label
              htmlFor="contact-project"
              className="block text-sm font-semibold text-alabaster mb-2"
            >
              {f.projectLabel} <span className="text-brandPink">*</span>
            </label>
            <textarea
              id="contact-project"
              name="project"
              rows={5}
              required
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                if (fieldErrors.project) {
                  setFieldErrors((prev) => ({ ...prev, project: undefined }));
                }
              }}
              placeholder={f.projectPlaceholder}
              aria-invalid={Boolean(fieldErrors.project)}
              aria-describedby={fieldErrors.project ? "err-project" : undefined}
              data-testid="textarea-project"
              className="w-full rounded-xl border border-white/15 bg-obsidian px-4 py-3.5 text-base text-alabaster placeholder:text-pewter/50 transition focus:border-brandBlue focus:outline-none focus:ring-2 focus:ring-brandPurple/40"
            />
            {fieldErrors.project && (
              <p
                id="err-project"
                role="alert"
                data-testid="error-project"
                className="mt-1.5 text-xs font-medium text-brandOrange"
              >
                {fieldErrors.project}
              </p>
            )}
          </div>

          {/* Hidden Honeypot for Anti-Spam (Not visible to users) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
          >
            <label htmlFor="company_website">Company Website</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Server / Configuration Error Banner (Preserves visitor input) */}
          {status === "error" && errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              data-testid="contact-form-error"
              className="rounded-2xl border border-brandOrange/45 bg-brandOrange/10 p-4 text-sm leading-relaxed text-alabaster"
            >
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            data-testid="contact-submit-button"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-alabaster shadow-brandGlow transition-all duration-200 hover:brightness-110 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            <span>
              {status === "submitting" ? f.submittingButton : f.submitButton}
            </span>
            <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
          </button>
        </form>
      )}
    </div>
  );
}

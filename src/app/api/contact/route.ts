import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUSINESS_CONFIG, CONTACT_DROPDOWN_SERVICES } from "@/data/content";

// Simple in-memory rate limit store per IP
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 6;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const ALLOWED_SERVICES = new Set(
  CONTACT_DROPDOWN_SERVICES.map((s) => s.title.en)
);

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "local";

    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (record && now < record.resetAt) {
      if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: "RATE_LIMITED",
            error: "Too many inquiries submitted recently. Please wait a moment.",
          },
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          code: "INVALID_PAYLOAD",
          error: "Invalid request payload.",
        },
        { status: 400 }
      );
    }

    // Check honeypot
    if (body.company_website && String(body.company_website).trim().length > 0) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          code: "SPAM_REJECTED",
          error: "Submission rejected.",
        },
        { status: 400 }
      );
    }

    const name = sanitizeText(body.name, 140);
    const email = sanitizeText(body.email, 180);
    const service = sanitizeText(body.service, 100);
    const project = sanitizeText(body.project, 4000);
    const lang = body.lang === "ar" ? "ar" : "en";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !emailRegex.test(email) || !project) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          code: "VALIDATION_FAILED",
          error:
            lang === "ar"
              ? "يرجى التأكد من ملء جميع الحقول المطلوبة بشكل صحيح."
              : "Please complete all required fields with valid information.",
        },
        { status: 422 }
      );
    }

    if (service && !ALLOWED_SERVICES.has(service)) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          code: "INVALID_SERVICE",
          error: "Selected service is not recognized.",
        },
        { status: 422 }
      );
    }

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || BUSINESS_CONFIG.email;

    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      dateStyle: "full",
      timeStyle: "long",
    });

    const emailSubject = `[Helal Media Inquiry] ${name}${
      service ? ` — ${service}` : ""
    }`;

    const textBody = [
      `New Project Inquiry — Helal Media Production`,
      `============================================`,
      `Date & Time: ${formattedDate} (Cairo Time)`,
      `Customer Name: ${name}`,
      `Customer Email: ${email}`,
      `Selected Service: ${service || "Not specified (Optional)"}`,
      `Website Language: ${lang.toUpperCase()}`,
      ``,
      `Project Description:`,
      `--------------------------------------------`,
      project,
      `============================================`,
      `Recipient: ${receiverEmail}`,
    ].join("\n");

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0e; color: #ffffff; padding: 24px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #151519; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden;">
    <div style="background: linear-gradient(110deg, #14ACF3 0%, #8145CA 35%, #F3398D 68%, #FF7538 100%); padding: 3px;">
      <div style="background-color: #0d0d10; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 1px;">HELAL MEDIA PRODUCTION</h1>
        <p style="color: #b7b7bf; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">New Client Project Inquiry</p>
      </div>
    </div>
    <div style="padding: 28px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px; width: 140px;">Submission Time</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-size: 14px; font-weight: 500;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px;">Customer Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px;">Customer Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${email}" style="color: #14ACF3; text-decoration: none; font-weight: 500;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px;">Selected Service</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F3398D; font-size: 14px; font-weight: 600;">${service || "Not specified (Optional)"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px;">Website Locale</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #b7b7bf; font-size: 13px;">${lang.toUpperCase()}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <h3 style="color: #14ACF3; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 12px 0;">Project Description</h3>
        <div style="background-color: #0b0b0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${project}</div>
      </div>
    </div>
    <div style="background-color: #0d0d10; padding: 16px 28px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #71717a;">
      Sent automatically from Helal Media Production Contact Form to ${receiverEmail}
    </div>
  </div>
</body>
</html>
    `;

    // 1. Check Resend / Transactional API Keys if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Helal Media Inquiries <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: email,
          subject: emailSubject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json(
          { ok: true, delivered: true, transport: "resend" },
          { status: 200 }
        );
      }
      console.error(
        "[Contact API] Resend API error:",
        await resendRes.text().catch(() => "")
      );
    }

    // 2. Check Webhook / CRM integration if configured
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const whRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify({
          brand: BUSINESS_CONFIG.brandName,
          destination: receiverEmail,
          name,
          email,
          service: service || "Not specified",
          project,
          lang,
          submittedAt: new Date().toISOString(),
          formattedDate,
          subject: emailSubject,
          text: textBody,
        }),
      });

      if (!whRes.ok) {
        console.error(
          "[Contact API] Webhook delivery failed with status",
          whRes.status
        );
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: "DELIVERY_FAILED",
            error:
              lang === "ar"
                ? "تعذر تسليم الرسالة عبر الخادم. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة على helal.media0@gmail.com."
                : "Could not deliver inquiry to webhook transport. Please try again or email helal.media0@gmail.com directly.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { ok: true, delivered: true, transport: "webhook" },
        { status: 200 }
      );
    }

    // 3. Check SMTP Transport (Gmail App Password, Custom SMTP, etc.)
    const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : undefined);
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpPort = Number(process.env.SMTP_PORT || (smtpHost === "smtp.gmail.com" ? 465 : 587));
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from:
          process.env.SMTP_FROM_EMAIL ||
          `"Helal Media Inquiries" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: `"${name}" <${email}>`,
        subject: emailSubject,
        text: textBody,
        html: htmlBody,
      });

      return NextResponse.json(
        { ok: true, delivered: true, transport: "smtp" },
        { status: 200 }
      );
    }

    // 4. Honest Configuration Blocker (Section 9):
    // "If no working delivery integration can be configured, implement the secure endpoint interface
    // and a clear configuration blocker without displaying a fake success."
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        code: "TRANSPORT_UNCONFIGURED",
        recipient: receiverEmail,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        code: "INTERNAL_ERROR",
        error:
          "An error occurred while dispatching the message. Please try again or contact us directly at helal.media0@gmail.com.",
      },
      { status: 500 }
    );
  }
}


import { NextResponse } from "next/server";
import { Resend } from "resend";
import { interestOptions } from "@/lib/capabilities";

/**
 * Contact form endpoint.
 * - Validates the payload server-side (never trusts the client).
 * - Silently drops honeypot hits with a fake 200.
 * - Rate-limits by IP (in-memory; fine for launch).
 * - Sends via Resend as inline-styled HTML.
 */

export const runtime = "nodejs";

type Errors = Record<string, string>;

const MAX_LEN = {
  name: 100,
  email: 200,
  company: 120,
  storeUrl: 200,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validInterests = new Set(interestOptions.map((o) => o.value));

// ── In-memory rate limiter: max 5 requests / 10 min / IP ──
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Prune the map so it can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_HITS;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real user never fills the hidden "website" field.
  if (str(body.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a little while." },
      { status: 429 },
    );
  }

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const storeUrl = str(body.storeUrl);
  const interest = str(body.interest);
  const message = str(body.message);

  const errors: Errors = {};
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > MAX_LEN.name) errors.name = "That name is too long.";

  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email) || email.length > MAX_LEN.email)
    errors.email = "That doesn't look like a valid email.";

  if (company.length > MAX_LEN.company) errors.company = "That's too long.";
  if (storeUrl.length > MAX_LEN.storeUrl) errors.storeUrl = "That's too long.";

  if (interest && !validInterests.has(interest))
    errors.interest = "Please choose a valid option.";

  if (!message) errors.message = "Please add a short message.";
  else if (message.length < 10) errors.message = "A little more detail helps.";
  else if (message.length > MAX_LEN.message) errors.message = "That message is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, error: "The contact form isn't configured yet. Email us directly." },
      { status: 502 },
    );
  }

  const interestLabel =
    interestOptions.find((o) => o.value === interest)?.label ?? "Not specified";

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#05060a;color:#f7f8f8;padding:24px;border-radius:12px;max-width:560px;">
    <p style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e08a38;margin:0 0 16px;">New AskRoo enquiry</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#a1a8b3;width:130px;">Name</td><td style="padding:8px 0;color:#f7f8f8;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px 0;color:#a1a8b3;">Email</td><td style="padding:8px 0;color:#f7f8f8;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:8px 0;color:#a1a8b3;">Company</td><td style="padding:8px 0;color:#f7f8f8;">${escapeHtml(company) || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#a1a8b3;">Store URL</td><td style="padding:8px 0;color:#f7f8f8;">${escapeHtml(storeUrl) || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#a1a8b3;">Interest</td><td style="padding:8px 0;color:#f7f8f8;">${escapeHtml(interestLabel)}</td></tr>
    </table>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.09);">
      <p style="color:#a1a8b3;font-size:14px;margin:0 0 8px;">Message</p>
      <p style="color:#f7f8f8;font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
    </div>
  </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `AskRoo enquiry — ${name} (${interestLabel})`,
      html,
    });
    if (error) {
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please try again or email us." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

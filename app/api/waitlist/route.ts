import { NextResponse } from "next/server";
import { Resend } from "resend";

type WaitlistPayload = {
  name: string;
  email: string;
  phone: string;
  territory: string;
  opportunity: string;
  investment: string;
  trade: string;
  vision: string;
};

const MAX_LENGTHS = {
  name: 100,
  email: 255,
  phone: 20,
  territory: 100,
  opportunity: 40,
  investment: 40,
  trade: 200,
  vision: 1000,
} as const;

function normalizeValue(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizePayload(raw: unknown): WaitlistPayload {
  const body = (raw ?? {}) as Record<string, unknown>;
  return {
    name: normalizeValue(body.name, MAX_LENGTHS.name),
    email: normalizeValue(body.email, MAX_LENGTHS.email).toLowerCase(),
    phone: normalizeValue(body.phone, MAX_LENGTHS.phone),
    territory: normalizeValue(body.territory, MAX_LENGTHS.territory),
    opportunity: normalizeValue(body.opportunity, MAX_LENGTHS.opportunity),
    investment: normalizeValue(body.investment, MAX_LENGTHS.investment),
    trade: normalizeValue(body.trade, MAX_LENGTHS.trade),
    vision: normalizeValue(body.vision, MAX_LENGTHS.vision),
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.WAITLIST_TO_EMAIL;

  if (!resendKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  const payload = normalizePayload(await request.json().catch(() => null));
  const requiredValues = [
    payload.name,
    payload.email,
    payload.phone,
    payload.territory,
    payload.opportunity,
    payload.investment,
    payload.trade,
    payload.vision,
  ];

  if (requiredValues.some((field) => !field)) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const resend = new Resend(resendKey);

  try {
    const adminEmail = resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject: `New Franchise Application — ${payload.name}`,
      text: [
        "A new franchise waiting list application was submitted.",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Territory: ${payload.territory}`,
        `Opportunity Type: ${payload.opportunity}`,
        `Expected Investment: ${payload.investment}`,
        `Trade/Experience: ${payload.trade}`,
        "",
        "Business Vision:",
        payload.vision,
      ].join("\n"),
    });

    const userEmail = resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      subject: "We received your Betz Pools franchise application",
      text: [
        `Hi ${payload.name},`,
        "",
        "Thank you for applying to join the Betz Pools franchise waiting list.",
        "Our team received your submission and will review it shortly.",
        "",
        "If you have any immediate questions, simply reply to this email.",
        "",
        "Betz Pools Franchise Team",
      ].join("\n"),
    });

    await Promise.all([adminEmail, userEmail]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your application could not be sent. Please try again." },
      { status: 502 }
    );
  }
}

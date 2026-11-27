import { NextResponse } from "next/server";

export const runtime = "nodejs";

const services: Record<string, string> = {
  general: "General enquiry",
  security: "Spark Security Solutions",
  cleaning: "Spark Cleaning Solutions",
  supplies: "Spark Holdings Supplies",
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Spam trap: real visitors leave this empty. Pretend it worked.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const message = clean(body.message, 4000);
  const service = services[clean(body.division, 20)] ?? services.general;

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO ?? "info@sparkholdingsmw.com";

  // Not configured yet: tell the form so it can show the phone and email instead.
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Quote request: ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "not given"}\nService: ${service}\n\n${message}`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "Could not send" }, { status: 502 });
  return NextResponse.json({ ok: true });
}

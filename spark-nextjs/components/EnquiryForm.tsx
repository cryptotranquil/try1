"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "invalid" | "manual" | "error";

const options = [
  { value: "general", label: "Not sure yet" },
  { value: "security", label: "Spark Security Solutions" },
  { value: "cleaning", label: "Spark Cleaning Solutions" },
  { value: "supplies", label: "Spark Holdings Supplies" },
];

export default function EnquiryForm({ defaultDivision = "general" }: { defaultDivision?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("invalid");
      (form.querySelector(":invalid") as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else if (res.status === 503) {
        setStatus("manual");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const message: Record<Status, string> = {
    idle: "",
    sending: "Sending your enquiry.",
    sent: "Thank you. We have your enquiry and will reply to your email.",
    invalid: "Please fill in your name, a valid email and your message.",
    manual: `The online form is not connected yet. Please email ${site.email} or call ${site.tel.label}.`,
    error: `Your enquiry did not send. Please try again, or email ${site.email}.`,
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-1.5">
        <label htmlFor="division" className="font-semibold">
          Which service do you need?
        </label>
        <select id="division" name="division" defaultValue={defaultDivision} className="field">
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="font-semibold">
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" required className="field" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="phone" className="font-semibold">
          Phone <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="message" className="font-semibold">
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="For example: night guards for a warehouse in Blantyre, starting next month."
          className="field min-h-[8rem]"
        />
      </div>
      {/* Spam trap: people never see or fill this field. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <button type="submit" className="btn btn-cta" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send enquiry"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] font-medium">
        {message[status]}
      </p>
    </form>
  );
}

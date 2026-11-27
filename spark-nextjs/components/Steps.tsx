"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";
import { EASE } from "@/lib/ease";
import { Reveal, Stagger, StaggerItem } from "./motion";

function Icon({ d }: { d: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const steps = [
  {
    title: "Choose your division",
    text: "Security, cleaning or supplies. If you are not sure, say so and we will route your enquiry to the right team.",
    icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
    link: { href: "#divisions", label: "See the divisions" },
  },
  {
    title: "Send an enquiry",
    text: `Tell us what you need, how often and where. Use the form, or call ${site.tel.label}.`,
    icon: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
    link: { href: "/contact", label: "Request a quote" },
  },
  {
    title: "Follow the service",
    text: "Security clients get daily shift reports and monthly reviews. Cleaning runs on a schedule you agree. Supplies have no minimum order.",
    icon: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9",
    link: { href: "/security", label: "How security reports work" },
  },
];

/**
 * Three steps. The dark highlight starts on the middle step and glides to whichever step
 * you hover, tap or tab to, with the same ease in and out as the rest of the site.
 */
export default function Steps() {
  const [active, setActive] = useState(1);

  return (
    <Reveal>
      <section className="panel inner py-12 sm:py-16" id="start" aria-labelledby="start-title">
        <div className="text-center">
          <h2 id="start-title" className="section-title mx-auto">
            Getting started is simple
          </h2>
          <p className="lead mx-auto mt-3">Three steps from first message to a service you can check on.</p>
        </div>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3" gap={0.18}>
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <StaggerItem key={s.title} className="relative isolate">
                <div
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`relative flex h-full flex-col gap-3 rounded-[1.75rem] p-6 transition-colors duration-500 ease-in-out md:p-8 ${on ? "text-white" : "text-ink"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="step-highlight"
                      transition={{ duration: 0.6, ease: EASE }}
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-[1.75rem] bg-sec shadow-[0_24px_48px_rgb(16_37_43/0.22)]"
                    />
                  )}
                  <span className={`inline-flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-500 ease-in-out ${on ? "bg-white/15" : "bg-paper"}`}>
                    <Icon d={s.icon} />
                  </span>
                  <span className={`text-sm transition-colors duration-500 ease-in-out ${on ? "text-[#b9cbc8]" : "text-muted"}`}>Step {i + 1}</span>
                  <h3 className="text-3xl">{s.title}</h3>
                  <p className={`transition-colors duration-500 ease-in-out ${on ? "text-[#d5e0de]" : "text-muted"}`}>{s.text}</p>
                  <Link
                    href={s.link.href}
                    className={`mt-auto pt-3 font-semibold underline decoration-2 underline-offset-4 transition-colors duration-500 ease-in-out ${on ? "decoration-[var(--cta)]" : "decoration-line"}`}
                  >
                    {s.link.label}
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </Reveal>
  );
}

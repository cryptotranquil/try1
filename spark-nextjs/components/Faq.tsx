"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faq } from "@/lib/content";
import { EASE } from "@/lib/ease";

/** Accordion. Answers open and close with an eased height change. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl border-b border-line">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-line">
            <h3 className="text-xl">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                {item.q}
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="shrink-0"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-5 text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

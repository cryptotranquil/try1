"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions, site } from "@/lib/content";
import { EASE } from "@/lib/ease";
import Photo from "./Photo";
import { RevealText } from "./motion";

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** The three companies that slide through the hero, in a loop. Holdings and Security share the navy theme. */
const slides = [
  { key: "security", label: "Spark Security Solutions", src: "/img/security/lineup.jpg", pos: "50% 40%", tone: "bg-sec", alt: "Spark Security guards standing in a line" },
  { key: "cleaning", label: "Spark Cleaning Solutions", src: "/img/cleaning/sprayers.jpg", pos: "50% 35%", tone: "bg-clean", alt: "Spark Cleaning staff carrying sprayers" },
  { key: "holdings", label: "Spark Holdings", src: "/img/supplies/hardhat.jpg", pos: "50% 30%", tone: "bg-sec", alt: "A Spark Holdings worker in a red hard hat" },
];
const SLIDE_MS = 5500;

/**
 * Opening moment of the home page, in order:
 * 1. the panel wipes down into place, 2. the headline slides up word by word,
 * 3. the line and buttons ease in, 4. the card of divisions rises from below.
 * The photo drifts slowly as you scroll.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setI((n) => (n + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [i, reduce]);

  const slide = slides[i];

  return (
    <motion.section
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0 round 2rem)" }}
      animate={{ clipPath: "inset(0 0 0% 0 round 2rem)" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative isolate -mt-[4.75rem] overflow-hidden rounded-[2rem] bg-sec text-white sm:-mt-[5.75rem]"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] -z-10 h-[116%] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.key}
            initial={{ x: "100%", scale: 1.08 }}
            animate={{ x: "0%", scale: 1 }}
            exit={{ x: "-30%", opacity: 0 }}
            transition={{ duration: 1.3, ease: EASE }}
            className="absolute inset-0"
          >
            <Photo src={slide.src} alt={slide.alt} tone={slide.tone} pos={slide.pos} className="h-full w-full rounded-none" zoom={false} priority={i === 0} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#08161b] via-[#08161b]/55 to-[#08161b]/30" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#08161b]/50 to-transparent" />

      <div className="inner grid min-h-[36rem] items-end gap-8 pb-8 pt-40 sm:min-h-[44rem] sm:pb-12 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h1 className="max-w-[14ch] text-[clamp(2.7rem,8.5vw,6.5rem)]">
            <RevealText text="Security, cleaning and supplies from one Malawian company" delay={0.6} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
            className="mt-6 max-w-xl text-lg text-[#d5e0de]"
          >
            Offices in Lilongwe and Blantyre. Choose the service you need and your enquiry goes straight to that team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.65 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <motion.span whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn btn-cta">
                Request a quote
              </Link>
            </motion.span>
            <span className="font-semibold">
              Or call{" "}
              <a className="underline underline-offset-4" href={site.tel.href}>
                {site.tel.label}
              </a>
            </span>
          </motion.div>
          <div className="mt-8 flex items-center gap-4" role="group" aria-label="Hero photos">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={slide.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="min-w-[13rem] text-sm font-semibold text-white/90"
                aria-live="polite"
              >
                {slide.label}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-2">
              {slides.map((sl, n) => (
                <button
                  key={sl.key}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show ${sl.label}`}
                  aria-current={n === i}
                  className="relative h-1.5 w-12 overflow-hidden rounded-full bg-white/30"
                >
                  {n === i && (
                    <motion.span
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduce ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                      className="absolute inset-0 origin-left rounded-full bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.9 }}
          aria-label="Our divisions"
          className="w-full max-w-sm rounded-3xl bg-surface p-4 text-ink shadow-[0_20px_50px_rgb(0_0_0/0.25)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {divisions.map((d) => (
                <Photo
                  key={d.slug}
                  src={d.homeImage.src}
                  alt=""
                  tone={d.bg}
                  pos={d.homeImage.pos}
                  className="h-12 w-12 rounded-full border-2 border-surface"
                  zoom={false}
                />
              ))}
            </div>
            <div>
              <p className="font-semibold leading-snug">Three divisions, one company</p>
              <p className="text-sm text-muted">Security, cleaning and supplies</p>
            </div>
          </div>
          <a href="#divisions" className="group mt-4 flex items-center justify-between rounded-full bg-paper px-4 py-3 font-semibold">
            See all services
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 ease-in-out group-hover:translate-x-1">
              <Arrow />
            </span>
          </a>
        </motion.aside>
      </div>
    </motion.section>
  );
}

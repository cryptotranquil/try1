"use client";

import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { divisions } from "@/lib/content";
import { EASE } from "@/lib/ease";
import Photo from "./Photo";
import { Reveal, RevealText } from "./motion";

const GAP = 16;

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className={dir === "left" ? "rotate-180" : ""}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * The three divisions as a carousel. Two cards show on wide screens and one on phones.
 * The arrows, a drag or a swipe, and keyboard focus all slide the track with the same ease in and out.
 */
export default function DivisionsCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const firstCard = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [step, setStep] = useState(0);
  const dragged = useRef(false);

  const max = Math.max(0, divisions.length - visible);

  // How many cards fit, and how far one card is from the next.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      setVisible(mq.matches ? 2 : 1);
      if (firstCard.current) setStep(firstCard.current.offsetWidth + GAP);
    };
    measure();
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    return () => {
      mq.removeEventListener("change", measure);
      ro.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), max);
      setIndex(clamped);
      animate(x, -clamped * step, { duration: 0.75, ease: EASE });
    },
    [max, step, x],
  );

  // Keep the position right when the screen size changes.
  useEffect(() => {
    const clamped = Math.min(index, max);
    if (clamped !== index) setIndex(clamped);
    x.set(-clamped * step);
  }, [step, max]); // eslint-disable-line react-hooks/exhaustive-deps

  function onDragEnd(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const projected = x.get() + info.velocity.x * 0.2;
    goTo(Math.round(-projected / step));
    window.setTimeout(() => (dragged.current = false), 0);
  }

  return (
    <section id="divisions" className="px-4 py-6 sm:px-6 sm:py-10" aria-labelledby="divisions-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="divisions-title" className="section-title">
            <RevealText text="Choose your division" onScroll />
          </h2>
          <Reveal delay={0.2}>
            <p className="lead mt-3">Spark Holdings runs three divisions from offices in Lilongwe and Blantyre. Pick the one you need.</p>
          </Reveal>
        </div>
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous division"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink transition-opacity duration-500 ease-in-out disabled:opacity-35"
          >
            <Arrow dir="left" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= max}
            whileTap={{ scale: 0.92 }}
            aria-label="Next division"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-opacity duration-500 ease-in-out disabled:opacity-35"
          >
            <Arrow />
          </motion.button>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div ref={viewport} className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Spark Holdings divisions">
          <motion.ul
            style={{ x, gap: GAP }}
            drag={max > 0 ? "x" : false}
            dragConstraints={{ left: -max * step, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            className="flex cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {divisions.map((d, i) => (
              <li
                key={d.slug}
                ref={i === 0 ? firstCard : undefined}
                aria-label={`${i + 1} of ${divisions.length}`}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)]"
              >
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="h-full">
                  <Link
                    href={`/${d.slug}`}
                    draggable={false}
                    onClickCapture={(e) => {
                      if (dragged.current) e.preventDefault();
                    }}
                    onFocus={() => {
                      if (viewport.current) viewport.current.scrollLeft = 0;
                      if (i < index) goTo(i);
                      else if (i > index + visible - 1) goTo(i - visible + 1);
                    }}
                    className="group block h-full rounded-[1.75rem] bg-surface p-3"
                  >
                    <div className="pointer-events-none">
                      <Photo src={d.homeImage.src} alt={d.homeImage.alt} tone={d.bg} pos={d.homeImage.pos} className="aspect-[4/3] rounded-[1.25rem]" />
                    </div>
                    <div className="p-4">
                      <h3 className="flex items-center gap-3 text-3xl">
                        <span className={`dot ${d.bg}`} aria-hidden="true" />
                        {d.name}
                      </h3>
                      <p className="mt-2 text-muted">{d.homeBlurb}</p>
                      <span className="mt-5 flex items-center justify-between font-semibold">
                        {d.homeCta}
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                          <Arrow />
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        </div>
      </Reveal>
    </section>
  );
}

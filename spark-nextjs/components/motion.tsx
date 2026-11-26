"use client";

import { MotionConfig, animate, motion, useInView, useScroll, type Variants } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE } from "@/lib/ease";

/** Wraps the site. Visitors who ask their device for reduced motion get fades instead of movement. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}

/** Thin bar at the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-cta" />;
}

export type RevealVariant = "rise" | "fade" | "scale" | "wipe";

const reveal: Record<RevealVariant, Variants> = {
  rise: { hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, shown: { opacity: 1, scale: 1 } },
  wipe: { hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)" } },
};

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Eases a block in once, when it scrolls into view. */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={reveal[variant]}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for a group of StaggerItem children that ease in one after another. */
export function Stagger({
  children,
  gap = 0.12,
  delay = 0,
  className,
}: {
  children: ReactNode;
  gap?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function StaggerItem({ children, className, lift = false }: { children: ReactNode; className?: string; lift?: boolean }) {
  return (
    <motion.div
      className={className}
      variants={item}
      whileHover={lift ? { y: -8, transition: { duration: 0.5, ease: EASE } } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Headline whose words slide up out of a mask, one after another. */
export function RevealText({
  text,
  className,
  delay = 0,
  onScroll = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** false: plays when the page loads. true: plays when the heading scrolls into view. */
  onScroll?: boolean;
}) {
  const words = text.split(" ");
  // The trigger sits on the outer element, which is never clipped. Each word is a child that follows it.
  const trigger = onScroll ? { whileInView: "shown", viewport } : { animate: "shown" };
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true">
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "115%" }, shown: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

/** A number that counts up once it scrolls into view. Shows the final value if scripts or motion are off. */
export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{to}</span>;
}

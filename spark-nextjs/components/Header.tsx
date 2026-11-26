"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { EASE } from "@/lib/ease";
import ThemeToggle from "./ThemeToggle";

export function SparkMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0l2.6 8.4L24 12l-9.4 3.6L12 24l-2.6-8.4L0 12l9.4-3.6z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      className="canvas sticky top-0 z-50 pt-2 sm:pt-4"
    >
      <motion.div
        animate={{ boxShadow: scrolled ? "0 12px 32px rgb(16 37 43 / 0.18)" : "0 0 0 rgb(16 37 43 / 0)" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-[2rem] bg-surface"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <Link href="/" aria-label="Spark Holdings, home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/brand/spark-holdings-logo.png"
              alt="Spark Holdings Pty Limited"
              width={900}
              height={291}
              className="h-9 w-auto dark:rounded-lg dark:bg-white dark:px-2 dark:py-0.5 sm:h-10"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="relative rounded-full px-4 py-2 font-medium"
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-paper"
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-ink hidden sm:inline-flex">
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1.5px_var(--line)] lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col px-6 pb-5">
                {nav.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`border-t border-line py-3 text-lg font-medium ${isActive(l.href) ? "text-cta" : ""}`}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link href="/contact" className="btn btn-cta mt-3">
                  Request a quote
                </Link>
                <a href={site.tel.href} className="mt-3 text-center font-semibold underline underline-offset-4">
                  Call {site.tel.label}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

import Link from "next/link";
import DivisionsCarousel from "@/components/DivisionsCarousel";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import Steps from "@/components/Steps";
import { Counter, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { divisions, facts, proof, site, supplies } from "@/lib/content";

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Reveal variant="fade">
        <section aria-label="Clients we have supplied" className="mx-2 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[1.75rem] bg-surface px-6 py-4 text-sm text-muted sm:mx-4 sm:rounded-full sm:px-8">
          <span className="font-display text-xl font-extrabold text-ink" style={{ fontStretch: "75%" }}>
            Clients we have supplied
          </span>
          {(supplies.clients ?? []).map((c) => (
            <span key={c.t} className="min-w-0 max-w-full">
              {c.t}
            </span>
          ))}
        </section>
      </Reveal>

      <DivisionsCarousel />

      <Steps />

      <section className="grid gap-4 pt-0 sm:gap-6 md:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal variant="wipe" duration={1.1} className="relative">
          <Photo src="/img/supplies/hardhat.jpg" alt="A worker in a red hard hat and orange vest" tone="bg-supply" className="aspect-[4/5] h-full min-h-[24rem] w-full rounded-[2rem]" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-surface px-4 py-3 shadow-lg">
            <p className="font-display text-2xl font-extrabold leading-none" style={{ fontStretch: "75%" }}>
              No minimum order
            </p>
            <p className="text-sm text-muted">on supplies</p>
          </div>
        </Reveal>
        <div className="panel inner flex flex-col justify-between gap-8 py-10 sm:py-14">
          <div>
            <h2 className="text-[clamp(2.6rem,6vw,5.5rem)]">
              <RevealText text="One company for guards, cleaners and supplies" onScroll />
            </h2>
            <div className="mt-6 space-y-4">
              <p className="lead">
                Spark Holdings Pty Limited is registered under the Companies Act 2013. Its core business is investment and general supply. Spark
                Security Solutions and Spark Cleaning Solutions trade as its subsidiaries.
              </p>
              <p className="lead">
                We build long relationships with companies by meeting their specific needs, including customised products, and by backing the
                product with service and competitive pricing.
              </p>
            </div>
          </div>
          <Link href="/contact" className="stripes group flex items-center justify-between rounded-full bg-sec px-8 py-5 text-xl font-semibold text-white">
            Request a quote
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-ink transition-transform duration-500 ease-in-out group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
        </div>
      </section>

      <Reveal variant="scale">
        <section className="stripes inner grid grid-cols-2 gap-y-8 rounded-[2rem] bg-sec py-10 text-white md:grid-cols-4" aria-label="Spark Holdings at a glance">
          {facts.map((f, i) => (
            <div key={f.c} className={`${i % 2 === 1 ? "pl-4" : ""} ${i > 0 ? "md:border-l md:border-white/15 md:pl-6" : ""}`}>
              <div className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-none tabular-nums" style={{ fontStretch: "75%" }}>
                <Counter to={Number(f.n)} />
              </div>
              <p className="mt-2 max-w-[20ch] text-[0.9375rem] text-[#b9cbc8]">{f.c}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <section className="panel inner py-12 sm:py-16" id="why">
        <h2 className="section-title">
          <RevealText text="What you can count on" onScroll />
        </h2>
        <Stagger className="mt-8 grid gap-x-12 md:grid-cols-2" gap={0.12}>
          {proof.map((p) => (
            <StaggerItem key={p.t} className="border-t border-line py-4">
              <h3 className="mb-1 text-2xl">{p.t}</h3>
              <p className="text-muted">{p.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="panel inner grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" id="faq">
        <div>
          <h2 className="section-title">
            <RevealText text="Questions we hear most" onScroll />
          </h2>
          <p className="lead mt-3 text-base">Cannot find your answer? Call {site.tel.label} or send an enquiry.</p>
        </div>
        <Faq />
      </section>

      <Reveal variant="scale">
        <section className="stripes inner flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-sec py-12 text-white">
          <h2 className="max-w-[22ch] text-[clamp(1.9rem,4vw,2.75rem)]">Not sure which division you need?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-cta">
              Send an enquiry
            </Link>
            <a href={site.tel.href} className="font-semibold hover:underline">
              Call {site.tel.label}
            </a>
          </div>
        </section>
      </Reveal>
    </>
  );
}

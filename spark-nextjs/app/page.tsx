import Link from "next/link";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import { Counter, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { divisions, facts, proof, site, supplies } from "@/lib/content";

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Reveal variant="fade">
        <div className="inner flex flex-wrap items-center gap-x-8 gap-y-2 py-2 text-sm text-muted">
          <span className="font-semibold text-ink">Clients we have supplied</span>
          {(supplies.clients ?? []).map((c) => (
            <span key={c.t}>{c.t}</span>
          ))}
        </div>
      </Reveal>

      <section id="divisions" className="px-4 py-6 sm:px-6 sm:py-10">
        <h2 className="section-title">
          <RevealText text="Choose your division" onScroll />
        </h2>
        <p className="lead mt-3">Spark Holdings runs three divisions from offices in Lilongwe and Blantyre. Pick the one you need.</p>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-3" gap={0.15}>
          {divisions.map((d, i) => (
            <StaggerItem key={d.slug} lift className={i === 1 ? "md:mt-10" : ""}>
              <Link href={`/${d.slug}`} className="group block h-full rounded-[1.75rem] bg-surface p-3">
                <Photo src={d.homeImage.src} alt={d.homeImage.alt} tone={d.bg} className="aspect-[4/3] rounded-[1.25rem]" />
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
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal>
        <section className="panel inner py-12 sm:py-16" id="start">
          <div className="text-center">
            <h2 className="section-title mx-auto">Getting started is simple</h2>
            <p className="lead mx-auto mt-3">Three steps from first message to a service you can check on.</p>
          </div>
          <Stagger className="mt-12 grid gap-4 md:mt-24 md:grid-cols-3 md:items-stretch" gap={0.18}>
            <StaggerItem className="flex flex-col gap-3 p-4 md:p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper">
                <Icon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
              </span>
              <span className="text-sm text-muted">Step 1</span>
              <h3 className="text-3xl">Choose your division</h3>
              <p className="text-muted">Security, cleaning or supplies. If you are not sure, say so and we will route your enquiry to the right team.</p>
            </StaggerItem>
            <StaggerItem className="stripes flex flex-col gap-3 rounded-[1.75rem] bg-sec p-8 text-white md:-mb-12 md:-mt-14 md:py-12">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
              </span>
              <span className="text-sm text-[#b9cbc8]">Step 2</span>
              <h3 className="text-3xl">Send an enquiry</h3>
              <p className="text-[#d5e0de]">Tell us what you need, how often and where. Use the form, or call {site.tel.label}.</p>
              <Link href="/contact" className="btn btn-cta mt-3 self-start">
                Request a quote
              </Link>
            </StaggerItem>
            <StaggerItem className="flex flex-col gap-3 p-4 md:p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper">
                <Icon d="M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9" />
              </span>
              <span className="text-sm text-muted">Step 3</span>
              <h3 className="text-3xl">Follow the service</h3>
              <p className="text-muted">
                Security clients get daily shift reports and monthly reviews. Cleaning runs on a schedule you agree. Supplies have no minimum order.
              </p>
            </StaggerItem>
          </Stagger>
        </section>
      </Reveal>

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

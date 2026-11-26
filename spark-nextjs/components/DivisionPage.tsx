import Link from "next/link";
import type { Division, Item } from "@/lib/content";
import { site } from "@/lib/content";
import PageHeader from "./PageHeader";
import Photo from "./Photo";
import { Reveal, RevealText, Stagger, StaggerItem } from "./motion";

const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="border-b border-line">
      {items.map((it) => (
        <li key={it.t} className="border-t border-line py-2.5">
          {it.t}
          {it.d && <span className="block text-[0.9375rem] text-muted">{it.d}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function DivisionPage({ d }: { d: Division }) {
  const gallery = d.extraImages;
  return (
    <>
      <PageHeader
        title={d.title}
        crumb={d.slug[0].toUpperCase() + d.slug.slice(1)}
        lead={d.lead}
        tone={d.bg}
        image={d.mainImage}
      />

      <section className="grid gap-4 sm:gap-6 lg:grid-cols-2" id="about">
        <div className="panel inner flex flex-col justify-center py-10 sm:py-14">
          <h2 className="section-title">
            <RevealText text={d.introTitle} onScroll />
          </h2>
          <Stagger className="mt-5 space-y-4" gap={0.15}>
            {d.intro.map((p) => (
              <StaggerItem key={p}>
                <p className="lead">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal variant="wipe" duration={1}>
          <Photo src={d.homeImage.src} alt={d.homeImage.alt} tone={d.bg} className="aspect-[4/3] h-full min-h-[18rem] w-full rounded-[2rem]" />
        </Reveal>
      </section>

      <Stagger className="grid gap-4 sm:gap-6 md:grid-cols-2" gap={0.18}>
        {[
          { h: "Vision", p: d.vision },
          { h: "Mission", p: d.mission },
        ].map((b) => (
          <StaggerItem key={b.h} className={`stripes rounded-[2rem] p-8 text-white sm:p-10 ${d.bg}`}>
            <h3 className="mb-3 text-3xl">{b.h}</h3>
            <p className="max-w-[48ch] text-lg text-white/90">{b.p}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <section className="panel inner py-12 sm:py-16" id="services">
        <h2 className="section-title">
          <RevealText text={d.groupsTitle} onScroll />
        </h2>
        <Stagger className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {d.groups.map((g) => (
            <StaggerItem key={g.title} className="min-w-0">
              <h3 className="mb-2 text-3xl">{g.title}</h3>
              {g.note && <p className="mb-3 text-muted">{g.note}</p>}
              <ItemList items={g.items} />
            </StaggerItem>
          ))}
        </Stagger>
        {gallery.length > 0 && (
          <Stagger className={`mt-14 grid gap-4 ${gallery.length === 1 ? "" : "sm:grid-cols-2 lg:grid-cols-4"}`} gap={0.12}>
            {gallery.map((img) => (
              <StaggerItem key={img.src}>
                <Photo
                  src={img.src}
                  alt={img.alt}
                  tone={d.bg}
                  className={`rounded-3xl ${gallery.length === 1 ? "aspect-[16/9] sm:aspect-[21/8]" : "aspect-[4/3]"}`}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {d.blocks.map((b) => (
        <section key={b.title} className="panel inner py-12 sm:py-16">
          <h2 className="section-title">
            <RevealText text={b.title} onScroll />
          </h2>
          <Stagger className={`mt-8 grid gap-x-12 ${colClass[b.cols]}`} gap={0.1}>
            {b.items.map((it) => (
              <StaggerItem key={it.t} className="border-t border-line py-4">
                <h3 className="mb-1 text-2xl">{it.t}</h3>
                <p className="text-muted">{it.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ))}

      {d.clients && (
        <section className="panel inner py-12 sm:py-16" id="references">
          <h2 className="section-title">
            <RevealText text="Clients we have supplied" onScroll />
          </h2>
          <p className="lead mt-3">These clients can speak about our work. Ask us for contact details when you need them.</p>
          <Stagger className="mt-8 grid gap-x-12 md:grid-cols-2" gap={0.08}>
            {d.clients.map((c) => (
              <StaggerItem key={c.t} className="border-t border-line py-4">
                <strong className="block">{c.t}</strong>
                <span className="text-[0.9375rem] text-muted">{c.d}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <Reveal variant="scale">
        <section className="stripes inner flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-sec py-12 text-white">
          <div>
            <h2 className="max-w-[22ch] text-[clamp(1.9rem,4vw,2.75rem)]">Tell the {d.slug} team what you need</h2>
            {d.slug === "security" && (
              <p className="mt-3 flex flex-wrap gap-x-5 font-semibold">
                {site.securityTels.map((t) => (
                  <a key={t.href} href={t.href} className="hover:underline">
                    {t.label}
                  </a>
                ))}
              </p>
            )}
          </div>
          <Link href={`/contact?division=${d.slug}`} className="group btn btn-cta">
            {d.quoteLabel}
            <span className="transition-transform duration-500 ease-in-out group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
        </section>
      </Reveal>
    </>
  );
}

import Link from "next/link";
import Photo from "./Photo";
import { Reveal, RevealText } from "./motion";

type Props = {
  title: string;
  crumb: string;
  lead: string;
  /** Background colour class, for example "bg-clean". */
  tone?: string;
  image?: { src: string; alt: string; pos?: string };
};

/** Large rounded panel that opens a page. The panel wipes in, then the title slides up word by word. */
export default function PageHeader({ title, crumb, lead, tone = "bg-sec", image }: Props) {
  return (
    <Reveal variant="wipe" duration={1.1}>
      <section className={`stripes relative isolate overflow-hidden rounded-[2rem] text-white ${tone}`}>
        {image && (
          <div className="absolute inset-0 -z-10">
            <Photo src={image.src} alt={image.alt} tone={tone} pos={image.pos} className="h-full w-full rounded-none" zoom={false} priority />
          </div>
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#08161b] via-[#08161b]/60 to-[#08161b]/20" />
        <div className="inner flex min-h-[22rem] flex-col justify-end pb-10 pt-32 sm:min-h-[28rem] sm:pb-14">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[#d5e0de]">
            <ol className="flex gap-2">
              <li>
                <Link className="underline underline-offset-4" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)]">
            <RevealText text={title} delay={0.45} />
          </h1>
          <Reveal delay={0.9}>
            <p className="mt-5 max-w-2xl text-lg text-[#d5e0de]">{lead}</p>
          </Reveal>
        </div>
      </section>
    </Reveal>
  );
}

import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHeader from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Lilongwe or Blantyre office, or send an enquiry about security, cleaning or supplies.",
};

const valid = ["general", "security", "cleaning", "supplies"];

export default function Contact({ searchParams }: { searchParams: { division?: string } }) {
  const division = searchParams.division && valid.includes(searchParams.division) ? searchParams.division : "general";
  return (
    <>
      <PageHeader
        title="Contact us"
        crumb="Contact"
        lead="Call, email or send an enquiry. Tell us which division you need and we will route it to the right team."
      />
      <section className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Stagger className="panel inner space-y-8 py-10 sm:py-14" gap={0.12}>
          {site.offices.map((o) => (
            <StaggerItem key={o.name} className="border-t border-line pt-4">
              <h2 className="mb-1 text-3xl">{o.name}</h2>
              <address className="not-italic text-muted">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </StaggerItem>
          ))}
          <StaggerItem className="border-t border-line pt-4">
            <h2 className="mb-1 text-3xl">Call or email</h2>
            <p className="text-muted">
              Tel:{" "}
              <a className="text-ink underline underline-offset-4" href={site.tel.href}>
                {site.tel.label}
              </a>
              <br />
              Cell:{" "}
              <a className="text-ink underline underline-offset-4" href={site.cell.href}>
                {site.cell.label}
              </a>
              <br />
              Email:{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </StaggerItem>
          <StaggerItem className="border-t border-line pt-4">
            <h2 className="mb-1 text-3xl">Security line</h2>
            <p className="flex flex-wrap gap-x-5 font-semibold">
              {site.securityTels.map((t) => (
                <a key={t.href} className="underline underline-offset-4" href={t.href}>
                  {t.label}
                </a>
              ))}
            </p>
          </StaggerItem>
        </Stagger>
        <Reveal>
          <div className="panel inner h-full py-10 sm:py-14">
            <h2 className="mb-6 text-[clamp(1.9rem,4vw,2.75rem)]">Send an enquiry</h2>
            <EnquiryForm defaultDivision={division} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

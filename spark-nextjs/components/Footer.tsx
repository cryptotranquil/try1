import Link from "next/link";
import { nav, site } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="canvas pb-2 sm:pb-4">
      <div className="inner rounded-[2rem] bg-[#0b1b20] py-12 text-[0.9375rem] text-[#b9cbc8]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo src="/img/brand/spark-holdings-logo.png" alt={site.legalName} className="h-11" />
            <p className="mt-4">{site.tagline}</p>
          </div>
          <div>
            <h2 className="mb-3 text-xl text-white">Divisions</h2>
            <ul className="space-y-1">
              {nav
                .filter((l) => l.href !== "/")
                .map((l) => (
                  <li key={l.href}>
                    <Link className="text-[#e3ecea] hover:underline" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            {site.offices.map((o, i) => (
              <div key={o.name} className={i ? "mt-4" : ""}>
                <h2 className="mb-2 text-xl text-white">{o.name}</h2>
                <address className="not-italic">
                  {o.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 text-xl text-white">Call or email</h2>
            <ul className="space-y-1">
              <li>
                Tel:{" "}
                <a className="text-[#e3ecea] hover:underline" href={site.tel.href}>
                  {site.tel.label}
                </a>
              </li>
              <li>
                Cell:{" "}
                <a className="text-[#e3ecea] hover:underline" href={site.cell.href}>
                  {site.cell.label}
                </a>
              </li>
              <li>
                <a className="text-[#e3ecea] hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
            <h2 className="mb-2 mt-4 text-xl text-white">Security line</h2>
            <ul className="space-y-1">
              {site.securityTels.map((t) => (
                <li key={t.href}>
                  <a className="text-[#e3ecea] hover:underline" href={t.href}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-4">&copy; 2026 {site.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="This page could not be found"
        crumb="Not found"
        lead="The link may be out of date. Choose a division or go back to the home page."
      />
      <section className="panel inner flex flex-wrap gap-3 py-10">
        <Link href="/" className="btn btn-cta">
          Go to the home page
        </Link>
        <Link href="/security" className="btn btn-ghost">
          Security
        </Link>
        <Link href="/cleaning" className="btn btn-ghost">
          Cleaning
        </Link>
        <Link href="/supplies" className="btn btn-ghost">
          Supplies
        </Link>
      </section>
    </>
  );
}

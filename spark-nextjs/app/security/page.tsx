import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";
import { security } from "@/lib/content";

export const metadata: Metadata = {
  title: "Spark Security Solutions",
  description: security.description,
  openGraph: { images: ["/img/security/hero.jpg"] },
};

export default function Page() {
  return <DivisionPage d={security} />;
}

import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";
import { supplies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Spark Holdings Supplies",
  description: supplies.description,
  openGraph: { images: ["/img/supplies/tools.jpg"] },
};

export default function Page() {
  return <DivisionPage d={supplies} />;
}

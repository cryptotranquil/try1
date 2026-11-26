import type { Metadata } from "next";
import DivisionPage from "@/components/DivisionPage";
import { cleaning } from "@/lib/content";

export const metadata: Metadata = {
  title: "Spark Cleaning Solutions",
  description: cleaning.description,
  openGraph: { images: ["/img/cleaning/team.jpg"] },
};

export default function Page() {
  return <DivisionPage d={cleaning} />;
}

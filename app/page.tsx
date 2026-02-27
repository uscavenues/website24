import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Avenues Consulting Group | USC",
  description:
    "USC's student-run consulting group spanning strategy, technology, and design. Pro bono, and built for impact.",
  openGraph: {
    title: "Avenues Consulting Group | USC",
    description:
      "USC's student-run consulting group delivering pro bono strategy, technology, and design work for nonprofits, startups, and companies.",
    url: "https://avenues-ten.vercel.app/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}

import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio | Avenues Consulting Group",
  description: "Pro bono strategy, technology, and design work delivered for LinkedIn, DoorDash, Mountain Dew, and 20+ organizations. See what Avenues has built.",
  openGraph: {
    title: "Portfolio | Avenues Consulting Group",
    description: "20+ pro bono engagements across strategy, technology, and design.",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}

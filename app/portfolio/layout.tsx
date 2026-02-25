import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Avenues Consulting Group",
  description:
    "Explore Avenues' past client work across strategy, technology, and design  -  serving 20+ organizations from startups to Fortune 500.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

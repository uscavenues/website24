import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Avenues Consulting Group | USC",
  description:
    "USC's premier student-run consulting group specializing in strategy, technology, and design. Pro-bono project building for non-profits, startups, and corporations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${dmSerif.variable}`}>
      <body className="bg-[#08080f] text-white antialiased">
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

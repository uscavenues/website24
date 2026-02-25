import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080f" },
    { media: "(prefers-color-scheme: light)", color: "#08080f" },
  ],
};

export const metadata: Metadata = {
  title: "Avenues Consulting Group | USC",
  description:
    "USC's premier student-run consulting group specializing in strategy, technology, and design. Pro-bono project building for non-profits, startups, and corporations.",
  openGraph: {
    type: "website",
    images: [
      {
        url: "/assets/icons/avenues-logo.png",
        width: 1200,
        height: 630,
        alt: "Avenues Consulting Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/icons/avenues-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${dmSerif.variable}`}>
      <body className="bg-[#08080f] text-white antialiased">
        {/* Skip to main content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#eb4c60] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.1em] focus:rounded-sm"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

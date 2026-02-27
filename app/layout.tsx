import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";

const dmSerif = DM_Serif_Display({
  weight: "400",
  display: "swap",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Avenues Consulting Group",
  "url": "https://avenues-ten.vercel.app",
  "logo": "https://avenues-ten.vercel.app/assets/icons/avenues-logo.png",
  "description": "USC's student-run consulting group spanning strategy, technology, and design. Pro bono.",
  "foundingDate": "2023",
  "areaServed": "United States",
  "memberOf": {
    "@type": "CollegeOrUniversity",
    "name": "University of Southern California",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "uscavenues@gmail.com",
    "contactType": "general inquiry",
  },
  "sameAs": [
    "https://www.instagram.com/uscavenues/",
    "https://www.linkedin.com/company/avenues-consulting-group-usc/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://avenues-ten.vercel.app"),
  title: "Avenues Consulting Group | USC",
  description:
    "A student-run consulting group at USC delivering pro bono strategy, technology, and design work for nonprofits, startups, and established companies. No fees. Real projects.",
  openGraph: {
    type: "website",
    images: [
      {
        url: "/assets/photos/home.jpg",
        width: 1920,
        height: 1080,
        alt: "Avenues Consulting Group, Spring '26 Cohort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avenues Consulting Group | USC",
    images: ["/assets/photos/home.jpg"],
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
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Avenues Consulting Group",
  description:
    "Learn about Avenues Consulting Group at USC. Our story, mission, and the team behind our pro bono work.",
  openGraph: {
    title: "About Avenues Consulting Group",
    description:
      "The story, mission, and team behind USC's premier student-run consulting organization.",
    url: "https://avenues-ten.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

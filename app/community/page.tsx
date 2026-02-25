import type { Metadata } from "next";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
  title: "Our Community | Avenues Consulting Group",
  description: "Meet the students behind Avenues — 24 majors, industry mentors from Deloitte to BCG, and alumni placing at top firms globally.",
  openGraph: {
    title: "Our Community | Avenues Consulting Group",
    description: "24 majors, industry mentors, and alumni at JP Morgan, Disney, Deloitte, and more.",
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}

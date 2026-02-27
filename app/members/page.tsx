import type { Metadata } from "next";
import MembersClient from "./MembersClient";

export const metadata: Metadata = {
  title: "Member Hub | Avenues Consulting Group",
  description:
    "Avenues Consulting Group member-only hub. Access active projects, team directory, and internal resources.",
  robots: { index: false, follow: false },
};

export default function MembersPage() {
  return <MembersClient />;
}

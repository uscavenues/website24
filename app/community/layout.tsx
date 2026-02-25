import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Avenues Consulting Group",
  description:
    "Meet the diverse community behind Avenues  -  our members, mentors, and alumni network at USC.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

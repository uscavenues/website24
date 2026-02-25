"use client";

import { useScrollReveal } from "@/lib/use-scroll-reveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  scale?: boolean;
  as?: "div" | "section" | "article";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = "",
  scale = false,
  as: Tag = "div",
}: Props) {
  const ref = useScrollReveal<HTMLDivElement>();
  const base = scale ? "reveal-scale" : "reveal";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${base} ${delay} ${className}`}>
      {children}
    </Tag>
  );
}

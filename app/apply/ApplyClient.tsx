"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqApplication, faqOrg, type FAQItem } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

type Tab = "application" | "org";

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/[0.05]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="group">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
                }`}
              >
                {item.q}
              </span>
              {/* + → × morph (same technique as hamburger → X) */}
              <span
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isOpen
                    ? "border-[#eb4c60]"
                    : "border-white/[0.12] group-hover:border-white/25"
                }`}
              >
                <span className="relative w-2.5 h-2.5 block">
                  {/* Horizontal bar — rotates to 45° */}
                  <span className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "bg-[#eb4c60] rotate-45" : "bg-zinc-500 group-hover:bg-zinc-300 rotate-0"
                  }`} />
                  {/* Vertical bar — rotates to -45° (forms ×) */}
                  <span className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 transition-all duration-300 ${
                    isOpen ? "bg-[#eb4c60] -rotate-45" : "bg-zinc-500 group-hover:bg-zinc-300 rotate-0"
                  }`} />
                </span>
              </span>
            </button>

            {/* Smooth max-h accordion */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-6 pr-12 text-sm text-zinc-400 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ApplyClient() {
  const [activeTab, setActiveTab] = useState<Tab>("application");

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        {/* Dot texture */}
        <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
        {/* Pink glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#eb4c60]/12 blur-[120px] pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Recruitment
            </span>
          </div>
          <h1 className="text-[clamp(4rem,14vw,11rem)] font-black leading-[0.85] tracking-tighter text-white">
            APPLY
          </h1>
          <p className="mt-6 max-w-lg text-zinc-500 text-sm leading-relaxed">
            We recruit the most driven students at USC — regardless of major or
            background. One application. Three tracks. Unlimited impact.
          </p>
        </div>
      </section>

      {/* ── STATUS BANNER ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-16">
        <div className="relative overflow-hidden rounded-sm border border-[#eb4c60]/25 bg-white/[0.05] backdrop-blur-sm shadow-[0_4px_32px_rgba(235,76,96,0.08)] p-8 md:p-10">
          {/* Subtle red glow in corner */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#eb4c60]/8 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Status indicator */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Applications Closed
              </span>
            </div>

            <div className="flex-1">
              <p className="text-2xl font-black text-white mb-2 tracking-tight leading-tight">
                Applications are currently{" "}
                <span className="text-[#eb4c60]">closed.</span>
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Recruitment opens each semester. Follow us{" "}
                <a
                  href="https://www.instagram.com/uscavenues/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 underline underline-offset-2 decoration-white/20 hover:text-[#eb4c60] hover:decoration-[#eb4c60]/40 transition-colors duration-200"
                >
                  @uscavenues
                </a>{" "}
                on Instagram or email{" "}
                <a
                  href="mailto:uscavenues@gmail.com"
                  className="text-zinc-300 underline underline-offset-2 decoration-white/20 hover:text-[#eb4c60] hover:decoration-[#eb4c60]/40 transition-colors duration-200"
                >
                  uscavenues@gmail.com
                </a>{" "}
                to get notified when the next cycle opens.
              </p>
              <p className="text-xs text-zinc-500 mt-2">Applications reopen at the start of each semester. Follow <a href="https://www.instagram.com/uscavenues/" className="text-[#eb4c60] hover:underline">@uscavenues</a> for announcements.</p>
            </div>

            {/* IG CTA */}
            <a
              href="https://www.instagram.com/uscavenues/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 border border-white/[0.1] text-zinc-400 hover:border-[#eb4c60]/40 hover:text-white px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE LOOK FOR ─────────────────────────────────────────────── */}
      <section id="what-we-look-for" className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <ScrollReveal className="reveal">
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">What We Look For</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        </ScrollReveal>

        <div className="divide-y divide-white/[0.05]">
          {[
            {
              n: "01",
              title: "Curiosity",
              desc: "You ask hard questions and don't settle for surface-level answers.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              hoverClass: "group-hover:text-[#eb4c60]",
              barOrigin: "origin-left",
              barPos: "bottom-0",
            },
            {
              n: "02",
              title: "Ownership",
              desc: "You ship. You follow through. You don't wait to be told what to do.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              hoverClass: "group-hover:text-zinc-100 group-hover:scale-x-[1.01]",
              barOrigin: "origin-right",
              barPos: "bottom-0",
            },
            {
              n: "03",
              title: "Collaboration",
              desc: "You make everyone around you sharper, not just yourself.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
              hoverClass: "group-hover:text-[#eb4c60]",
              barOrigin: "origin-left",
              barPos: "top-0",
            },
            {
              n: "04",
              title: "Any Major",
              desc: "CS, pre-med, architecture, business. Diversity of thought is our edge.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
              hoverClass: "group-hover:text-zinc-100",
              barOrigin: "origin-right",
              barPos: "top-0",
            },
            {
              n: "05",
              title: "No Experience Required",
              desc: "We'll teach you everything you need. You just have to show up.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              hoverClass: "group-hover:text-[#eb4c60]",
              barOrigin: "origin-left",
              barPos: "bottom-0",
            },
            {
              n: "06",
              title: "Ambition",
              desc: "You're here to build something real, not pad a resume.",
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
              hoverClass: "group-hover:text-[#eb4c60] group-hover:-translate-y-0.5",
              barOrigin: "origin-right",
              barPos: "bottom-0",
            },
          ].map(({ n, title, desc, icon, hoverClass, barOrigin, barPos }) => (
            <div
              key={n}
              className="group relative flex flex-col md:flex-row md:items-center gap-2 md:gap-12 py-8 cursor-default overflow-hidden"
            >
              {/* Unique hover bar (alternating top/bottom, alternating direction) */}
              <div className={`absolute ${barPos} left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 ${barOrigin} transition-transform duration-500 pointer-events-none`} />

              {/* Top row on mobile, full row on desktop */}
              <div className="flex items-center gap-6 md:gap-12 flex-1">
                {/* Number */}
                <span className="shrink-0 text-[10px] font-mono text-zinc-600 group-hover:text-[#eb4c60]/60 transition-colors duration-300 w-6">{n}</span>

                {/* Icon */}
                <span className={`shrink-0 text-zinc-600 transition-all duration-300 ${hoverClass}`}>
                  {icon}
                </span>

                {/* Title */}
                <h3 className={`flex-none text-xl md:text-2xl font-black tracking-tight text-white transition-all duration-300 md:min-w-[220px] ${hoverClass}`}>
                  {title}
                </h3>

                {/* Description — right aligned, desktop only */}
                <p className="flex-1 text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {desc}
                </p>
              </div>

              {/* Mobile description below */}
              <p className="text-xs text-zinc-500 leading-relaxed pl-12 group-hover:text-zinc-300 transition-colors duration-300 md:hidden">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────────────── */}
      <section id="faq" className="relative border-t border-white/[0.05] pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20">
          {/* Section label */}
          <ScrollReveal className="reveal">
          <div className="mb-12 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              FAQ
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
            {/* Left: heading + tabs */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
                Common
                <br />
                <span className="text-[#eb4c60]">Questions</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mb-10">
                Everything you need to know about applying and working with
                Avenues.
              </p>

              {/* Tabs */}
              <div className="flex flex-col gap-1">
                {(
                  [
                    { key: "application", label: "Application" },
                    { key: "org", label: "Organization" },
                  ] as { key: Tab; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative text-left px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm transition-all duration-200 ${
                      activeTab === key
                        ? "text-[#eb4c60] bg-[#eb4c60]/[0.06]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {activeTab === key && (
                      <motion.span
                        layoutId="faq-tab-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-[#eb4c60] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: FAQ accordion */}
            <div>
              {activeTab === "application" ? (
                <FAQAccordion key="application" items={faqApplication} />
              ) : (
                <FAQAccordion key="org" items={faqOrg} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

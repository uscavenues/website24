"use client";

import { useState } from "react";
import Image from "next/image";
import { faqApplication, type FAQItem } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

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
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
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
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
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
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Full-bleed cinematic photo */}
        <div className="absolute inset-0">
          <Image src="/assets/photos/tabling.jpg" alt="" fill className="object-cover opacity-35" priority sizes="100vw" />
        </div>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/55 to-[#08080f]/25 pointer-events-none" />
        {/* Dot texture */}
        <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pb-20 w-full">
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Recruitment
            </span>
          </div>
          <h1 className="text-[clamp(4rem,14vw,11rem)] font-black leading-[0.85] tracking-tighter text-white">
            APPLY
          </h1>
          <p className="mt-6 max-w-lg text-zinc-500 text-sm leading-relaxed">
            We recruit the most driven students at USC, regardless of major or
            background. One application. Three tracks: Strategy, Technology, or Design. Unlimited impact.
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
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
              {/* Email capture — only show when applications are closed */}
              {notified ? (
                <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  We&apos;ll notify you when Fall 2026 applications open.
                </div>
              ) : (
                <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border-b border-white/[0.12] focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-2 text-xs transition-colors duration-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = email.trim();
                        if (val && val.includes('@')) {
                          setNotified(true);
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="shrink-0 text-[10px] uppercase tracking-[0.15em] font-semibold border border-[#eb4c60]/40 text-[#eb4c60] hover:bg-[#eb4c60] hover:text-white px-3 py-1.5 rounded-sm transition-all duration-200"
                    onClick={() => {
                      if (email.trim() && email.includes('@')) {
                        setNotified(true);
                      }
                    }}
                  >
                    Notify me →
                  </button>
                </div>
              )}
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
              desc: "We'll train you from day one. You bring the drive; we handle the rest.",
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
                <p className="hidden md:block flex-1 text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
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

      {/* ── MANIFESTO BREAK ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center border-y border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#eb4c60]/[0.04] blur-[140px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-[1.75rem] sm:text-[clamp(2.5rem,7.5vw,7rem)] font-black text-white tracking-tighter leading-[0.9]">
            We&apos;re not looking
            <br className="hidden sm:block" />
            for the <span className="text-[#eb4c60]">resume.</span>
            <br className="hidden sm:block" />
            We&apos;re looking for
            <br className="hidden sm:block" />
            the <span className="text-[#eb4c60]">person.</span>
          </p>
        </div>
      </section>

      {/* ── WHAT YOU'LL GET ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Member Benefits
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white tracking-tighter leading-[0.9] mb-12">
            What you&apos;ll<br /><span className="text-[#eb4c60]">get.</span>
          </h2>
          <div className="divide-y divide-white/[0.05]">
            {[
              { n: "01", title: "Real client work", desc: "Actual engagements with nonprofits and startups. No case studies or simulations." },
              { n: "02", title: "Cross-disciplinary peers", desc: "Collaborate with students across every major: engineering, business, design, pre-med, and beyond." },
              { n: "03", title: "Professional development", desc: "Weekly curriculum nights, mentorship from industry professionals, and structured learning tracks." },
              { n: "04", title: "A portfolio of work", desc: "Leave with deliverables you can show: strategy decks, built products, and design systems." },
              { n: "05", title: "Leadership opportunities", desc: "Directors and execs are chosen from within. Early members get first access to leadership tracks." },
              { n: "06", title: "A lasting network", desc: "Our alumni are at top firms globally. Avenues opens doors beyond USC." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="group relative flex items-start gap-8 py-8 overflow-hidden cursor-default">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />
                <span className="shrink-0 text-[10px] font-mono text-zinc-700 group-hover:text-[#eb4c60]/50 transition-colors duration-300 w-6 mt-1">{n}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white group-hover:text-[#eb4c60] transition-colors duration-300 mb-2 tracking-tight">{title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
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
            {/* Left: heading */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white tracking-tighter leading-[0.9] mb-3">
                Common
                <br />
                <span className="text-[#eb4c60]">Questions</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Everything you need to know about applying to Avenues.
              </p>
            </div>

            {/* Right: FAQ accordion */}
            <div>
              <FAQAccordion items={faqApplication} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#eb4c60]">
        <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2">Stay in the loop</p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Spots open twice a year.
            </h2>
            <p className="text-sm text-white/70 mt-2 max-w-sm">
              Fall and spring applications open in the first two weeks of each semester. Follow us on Instagram for exact announcement dates.
            </p>
          </div>
          <a
            href="https://www.instagram.com/uscavenues/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#eb4c60] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-white/90 transition-colors duration-200"
          >
            Follow @uscavenues
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

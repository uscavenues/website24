"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  // ── CHANGE 4: Page header parallax refs ──
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerY = useTransform(headerScroll, [0, 1], [0, -80]);
  const headerOp = useTransform(headerScroll, [0, 0.6], [1, 0]);

  // ── CHANGE 1: Founding story photo parallax refs ──
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(storyScroll, [0, 1], [40, -40]);

  // ── CHANGE 2: Mission divider draw-in refs ──
  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: missionScroll } = useScroll({
    target: missionRef,
    offset: ["start 80%", "end 20%"],
  });
  const dividerScaleY = useTransform(missionScroll, [0, 0.5], [0, 1]);

  return (
    <>
      {/* ─────────────────────────────────────────────
          1. PAGE HEADER  -  dark hero with dot-texture
      ───────────────────────────────────────────── */}
      <section ref={headerRef} className="relative overflow-hidden pt-32 pb-20">
        {/* Halftone dot texture */}
        <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
        {/* Top-left glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[400px] rounded-full bg-[#eb4c60]/8 blur-[120px] pointer-events-none" />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          {/* Eyebrow */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6">
            Avenues Consulting Group · USC
          </p>

          {/* CHANGE 4: Parallax wrapper around heading block */}
          <motion.div style={{ y: headerY, opacity: headerOp }}>
            {/* Giant heading */}
            <h1 className="text-[clamp(4.5rem,14vw,12rem)] font-black leading-[0.86] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              ABOUT
            </h1>

            {/* Pink accent line */}
            <div className="w-20 h-1 bg-[#eb4c60] mt-6 mb-8" />

            {/* Subtitle */}
            <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
              A student organization built from the ground up, on the belief that
              real-world project experience shouldn&apos;t be gated by prestige or access.
            </p>

            {/* EST. badge */}
            <div className="inline-flex items-center gap-2 mt-10 border border-[#eb4c60]/30 px-4 py-2 rounded-sm">
              <span className="text-[#eb4c60] text-[10px] font-black uppercase tracking-[0.4em]">
                Est. 2023
              </span>
              <span className="w-px h-3 bg-[#eb4c60]/40" />
              <span className="text-zinc-500 text-[10px] uppercase tracking-[0.25em]">
                University of Southern California
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          2. OUR BEGINNINGS  -  two-column editorial
      ───────────────────────────────────────────── */}
      <section ref={storyRef} className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
            Our Beginnings
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left  -  founding story text */}
          <ScrollReveal className="reveal-up">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black text-white leading-[1.05] tracking-tight mb-8">
                Built by students,
                <br />
                <span className="text-[#eb4c60]">for students.</span>
              </h2>

              <div className="space-y-5 text-zinc-400 leading-relaxed">
                <p>
                  Founded in 2023 by students who recognized a gap: USC&apos;s consulting
                  landscape lacked meaningful opportunities for hands-on project work.
                  Most orgs were case-prep focused. Avenues was built to be different.
                </p>
                <p>
                  Since then, Avenues has grown threefold and acquired{" "}
                  <span className="text-white font-semibold">20+ clients</span> — from
                  Fortune 500 companies and non-profits to early-stage startups — within
                  two years of founding.
                </p>
                <p>
                  Every engagement is pro bono. Every project is real.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right  -  cohort photo with parallax */}
          <div className="relative">
            {/* Accent border offset */}
            <div className="absolute -top-3 -right-3 w-full h-full border border-[#eb4c60]/15 rounded-sm pointer-events-none" />
            {/* CHANGE 1: motion wrapper on photo */}
            <motion.div
              style={{ y: photoY }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden bg-white/[0.03]"
            >
              <Image
                src="/assets/photos/founders.jpg"
                alt="Avenues founding cohort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080f]/40 via-transparent to-transparent" />
            </motion.div>
            {/* Caption */}
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Spring &apos;26 Cohort · USC
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. OUR MISSION  -  two-column with animated pink divider
      ───────────────────────────────────────────── */}
      <section ref={missionRef} className="relative border-y border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 dot-texture-subtle opacity-60 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
              Our Mission
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <blockquote className="mb-16 md:mb-20">
            <p className="font-display italic text-[clamp(1.4rem,3.5vw,2.5rem)] text-white/80 leading-snug tracking-tight max-w-3xl">
              &ldquo;Pro bono doesn&rsquo;t mean second-rate. It means no barriers between great work and the organizations that need it.&rdquo;
            </p>
            <footer className="mt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-600">&mdash; Avenues Consulting Group</footer>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-0">
            {/* Left column  -  clients */}
            <ScrollReveal className="reveal-left delay-1">
              <div className="md:pr-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-5">
                  For our clients
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-6">
                  Pro bono project-building across strategy, technology, and design.
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  We work with organizations of every size — from startups finding product-market
                  fit to non-profits scaling their impact. No fees, ever. Just rigorous, student-driven work.
                </p>
              </div>
            </ScrollReveal>

            {/* CHANGE 2: Animated pink vertical divider */}
            <div className="hidden md:block relative w-px bg-white/[0.04] mx-auto self-stretch overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-[#eb4c60]/60 origin-top"
                style={{ scaleY: dividerScaleY, height: "100%" }}
              />
            </div>

            {/* Right column  -  consultants */}
            <ScrollReveal className="reveal-right delay-2">
              <div className="md:pl-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-5">
                  For our consultants
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-6">
                  A space to collaborate, build, learn, and grow professionally.
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Regardless of your goals — consulting, tech, design, or beyond — Avenues is a
                  place to do real work alongside people who take it seriously. No experience required.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY BAR ──────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.05] py-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {[
            { value: "20+", label: "Clients served", sub: "Nonprofits, startups & corps" },
            { value: "2", label: "Semesters", sub: "Since Fall 2023" },
            { value: "3", label: "Practice areas", sub: "Strategy, Tech & Design" },
            { value: "100%", label: "Pro bono", sub: "Zero cost to clients" },
          ].map(({ value, label, sub }) => (
            <div key={label} className="px-6 md:px-8 py-4 text-center first:pl-0 last:pr-0">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#eb4c60] mb-1">{label}</div>
              <div className="text-[10px] text-zinc-600">{sub}</div>
            </div>
          ))}
        </div>
      </div>

            {/* ─────────────────────────────────────────────
          4. TEAM SECTION  -  editorial redesign
      ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
            The Team
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        {/* ── CHANGE 3a: EXECUTIVE — large portrait cards ── */}
        <div className="mb-28">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-12">
            Executive Leadership
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            {team.executive.map((member) => (
              <div key={member.name} className="group relative overflow-hidden rounded-sm cursor-pointer">
                {/* Photo */}
                <div className="relative aspect-[3/4] bg-white/[0.03]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/30 to-transparent" />
                  {/* Red left-edge bar */}
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-[#eb4c60] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
                </div>
                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-black text-xl leading-tight tracking-tight">{member.name}</p>
                  <p className="text-[#eb4c60] text-[10px] font-bold uppercase tracking-[0.25em] mt-1">{member.role}</p>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CHANGE 3b: DIRECTORS — horizontal editorial list ── */}
        <div className="mb-28">
          <div className="h-px bg-white/[0.04] mb-12" />
          <div className="border-l-2 border-[#eb4c60]/30 pl-4">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-10">
            Directors
          </p>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {team.directors.map((member, idx) => (
              <div key={member.name} className="group relative flex items-center gap-6 md:gap-10 py-5 overflow-hidden">
                {/* Sweep line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />

                {/* Index number */}
                <span className="shrink-0 text-[10px] font-mono text-zinc-700 w-5">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Photo — small circle */}
                <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white/[0.04]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="40px"
                  />
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm tracking-tight group-hover:text-[#eb4c60] transition-colors duration-300">
                    {member.name}
                  </p>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">{member.role}</p>
                </div>

                {/* LinkedIn */}
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-zinc-700 hover:text-[#eb4c60] transition-colors duration-200"
                  aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                >
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── CHANGE 3c: ASSOCIATES — compact two-column editorial list ── */}
        <div>
          <div className="h-px bg-white/[0.04] mb-12" />
          <div className="border-l-2 border-white/[0.05] pl-4">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-10">
            Associates
          </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y divide-white/[0.04] md:divide-y-0">
            {team.associates.map((member, i) => (
              <ScrollReveal key={member.name} className={`reveal delay-${(i % 5) + 1}`}>
              <div className="group relative flex items-center gap-5 py-4 border-b border-white/[0.04] overflow-hidden">
                {/* Sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60]/50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[400ms] pointer-events-none" />

                {/* Small photo */}
                <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden bg-white/[0.04]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="32px"
                  />
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-300 font-semibold text-xs tracking-tight group-hover:text-white transition-colors duration-300 truncate">
                    {member.name}
                  </p>
                  <p className="text-zinc-600 text-[10px] truncate">{member.role}</p>
                </div>

                {/* LinkedIn icon */}
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-zinc-700 hover:text-[#eb4c60] transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                >
                  <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. BOTTOM CTA BAND
      ───────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
              Get involved
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Want to join
              <br />
              <span className="text-[#eb4c60]">our team?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/apply"
              className="bg-[#eb4c60] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
            >
              Apply now
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/[0.1] text-zinc-400 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white transition-colors duration-200"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>
    
      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-16 flex justify-end">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 hover:text-[#eb4c60] transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-3 h-3 rotate-[-90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Back to top
        </button>
      </div>
    </>
  );
}

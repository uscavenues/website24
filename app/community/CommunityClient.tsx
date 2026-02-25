"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";
import { whatWeDo, majors, mentors, alumni } from "@/lib/data";

// ─── Photo strip data (actual filenames on disk) ───────────────────────────────
const photos = [
  { src: "/assets/photos/backtoschool.jpg", alt: "Back to school event" },
  { src: "/assets/photos/carter.jpg",       alt: "Carter event" },
  { src: "/assets/photos/kbbqar.jpg",       alt: "KBBQ alumni relations" },
  { src: "/assets/photos/potluck.jpg",      alt: "Potluck gathering" },
  { src: "/assets/photos/speeddating.jpg",  alt: "Speed networking" },
  { src: "/assets/photos/kbbqgroup.jpg",    alt: "KBBQ group photo" },
  { src: "/assets/photos/trio.jpg",         alt: "Three members" },
  { src: "/assets/photos/tabling.jpg",      alt: "Tabling at USC" },
];

// SVG icons mapped to whatWeDo icon keys
const whatWeDoIcons: Record<string, JSX.Element> = {
  "01": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "02": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "03": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "04": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "05": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  "06": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "07": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  "08": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

export default function CommunityClient() {
  // Duplicate for seamless marquee loop — stable IDs avoid index-as-key
  const allPhotos = [
    ...photos.map((p, n) => ({ ...p, id: `a${n}` })),
    ...photos.map((p, n) => ({ ...p, id: `b${n}` })),
  ];

  return (
    <>

      {/* ══════════════════════════════════════════════════
          1. PAGE HEADER
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-16">
        {/* Halftone texture */}
        <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
        {/* Pink glow bloom */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#eb4c60]/10 blur-[160px] pointer-events-none" />
        {/* Bottom fade to solid bg */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          {/* Section label */}
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-[#eb4c60]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Avenues · USC
            </span>
          </div>

          <h1 className="text-[clamp(3rem,11vw,8.5rem)] font-black leading-[0.88] tracking-tighter text-white mb-8">
            OUR
            <br />
            <span className="text-[#eb4c60]">COMMUNITY</span>
          </h1>

          <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed">
            We celebrate the diversity of majors, perspectives, and paths that make up Avenues. No matter where your interests lie, there&apos;s a place here for you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. PHOTO MARQUEE — dual opposing rows
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden border-y border-white/[0.05] py-4 space-y-3 marquee-hover-pause">
        {/* Row 1 — scrolls left */}
        <div className="marquee-track">
          {allPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-56 w-80 shrink-0 mr-3 overflow-hidden rounded-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right (reversed order, slightly smaller + dimmed) */}
        <div className="marquee-track-reverse">
          {[...allPhotos].reverse().map((photo) => (
            <div
              key={`rev-${photo.id}`}
              className="relative h-48 w-72 shrink-0 mr-3 overflow-hidden rounded-sm opacity-75 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. OUR MEMBERS — 3-row opposing marquee
      ══════════════════════════════════════════════════ */}

      <section id="majors">
      {/* Section header — constrained */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 pb-8">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Our Members
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        <p className="text-xs text-zinc-400 uppercase tracking-[0.2em]">
          Fields of Study — 24 majors across strategy, technology &amp; design
        </p>
      </div>

      {/* Majors marquee — full bleed */}
      <div className="overflow-hidden space-y-2 pb-14 marquee-hover-pause">
        {/* Row 1 — left */}
        <div className="marquee-track">
          {[...majors.slice(0, 8), ...majors.slice(0, 8)].map((major, i) => (
            <span
              key={`m1-${i}`}
              className="shrink-0 mr-3 border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm px-4 py-2 text-xs text-zinc-300 rounded-sm hover:border-[#eb4c60]/40 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-default whitespace-nowrap"
            >
              {major}
            </span>
          ))}
        </div>

        {/* Row 2 — right (reversed, crimson tint) */}
        <div className="marquee-track-reverse">
          {[...majors.slice(8, 16), ...majors.slice(8, 16)].map((major, i) => (
            <span
              key={`m2-${i}`}
              className="shrink-0 mr-3 border border-[#eb4c60]/20 bg-[#eb4c60]/[0.04] backdrop-blur-sm px-4 py-2 text-xs text-zinc-300 rounded-sm hover:border-[#eb4c60]/50 hover:text-white hover:bg-[#eb4c60]/[0.08] transition-all duration-200 cursor-default whitespace-nowrap"
            >
              {major}
            </span>
          ))}
        </div>

        {/* Row 3 — left (muted) */}
        <div className="marquee-track">
          {[...majors.slice(16, 24), ...majors.slice(16, 24)].map((major, i) => (
            <span
              key={`m3-${i}`}
              className="shrink-0 mr-3 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-4 py-2 text-xs text-zinc-400 rounded-sm hover:border-[#eb4c60]/30 hover:text-zinc-200 transition-all duration-200 cursor-default whitespace-nowrap"
            >
              {major}
            </span>
          ))}
        </div>
      </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. WHAT WE DO — editorial alternating list
      ══════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.04]">
        <div className="absolute inset-0 dot-texture-subtle opacity-60 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          <div className="mb-14 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
              How We Work Together
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl -mt-6 mb-14">
            Avenues runs on collaboration between students who think differently. Every engagement is cross-disciplinary &mdash; strategists work alongside engineers and designers from day one.
          </p>

          <div className="divide-y divide-white/[0.05]">
            {whatWeDo.map(({ title, desc, icon: iconKey }, idx) => (
              <div
                key={title}
                className="group relative flex items-center gap-6 md:gap-12 py-8 md:py-10 overflow-hidden cursor-default"
              >
                {/* Unique per-item hover accents */}
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 1 && (
                  <div className="absolute inset-0 bg-[#eb4c60]/[0] group-hover:bg-[#eb4c60]/[0.03] transition-all duration-500 pointer-events-none" />
                )}
                {idx === 2 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 3 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 4 && (
                  <div className="absolute inset-y-0 left-0 w-px bg-[#eb4c60] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 5 && (
                  <div className="absolute inset-y-0 right-0 w-px bg-[#eb4c60] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 6 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />
                )}
                {idx === 7 && (
                  <div className="absolute inset-0 bg-[#eb4c60]/[0] group-hover:bg-[#eb4c60]/[0.02] transition-all duration-700 pointer-events-none" />
                )}

                {/* Large faded index number */}
                <span className="shrink-0 text-[clamp(2rem,4vw,3.5rem)] font-black font-mono text-zinc-800 group-hover:text-[#eb4c60]/30 transition-colors duration-300 leading-none w-16 md:w-20 text-right select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* SVG icon */}
                <span className="shrink-0 text-zinc-600 group-hover:text-[#eb4c60] transition-colors duration-300 hidden md:block">
                  {whatWeDoIcons[iconKey] ?? null}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#eb4c60] transition-colors duration-300 mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300 max-w-lg">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. OUR MENTORS — dual opposing marquee
      ══════════════════════════════════════════════════ */}
      <section id="mentors" className="border-t border-white/[0.04]">
        {/* Section header — constrained */}
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 pb-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Our Mentors
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
          <p className="text-zinc-600 text-sm max-w-lg">
            Professionals from these organizations advise our members, conduct
            workshops, and share industry expertise.
          </p>
        </div>

        {/* Full-bleed dual marquee */}
        <div className="overflow-hidden space-y-4 pb-20 marquee-hover-pause">
          {/* Row 1 — left */}
          <div className="marquee-track">
            {[...mentors, ...mentors].map((mentor, i) => (
              <div
                key={`r1-${i}`}
                className="shrink-0 mr-8 flex items-center justify-center glass-card-deep rounded-sm px-8 py-4 min-w-[160px]"
              >
                <div className="relative h-8 w-32">
                  <Image
                    src={mentor.logo}
                    alt={mentor.name}
                    fill
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — right (reversed order, more muted) */}
          <div className="marquee-track-reverse">
            {[...mentors, ...mentors].reverse().map((mentor, i) => (
              <div
                key={`r2-${i}`}
                className="shrink-0 mr-8 flex items-center justify-center glass-card-deep rounded-sm px-8 py-4 min-w-[160px]"
              >
                <div className="relative h-8 w-32">
                  <Image
                    src={mentor.logo}
                    alt={mentor.name}
                    fill
                    className="object-contain opacity-60 hover:opacity-90 transition-opacity duration-300"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. ALUMNI PLACEMENTS
      ══════════════════════════════════════════════════ */}
      <section id="alumni" className="relative bg-[#f4f4f0] border-t border-zinc-200">
        {/* Gradient transition from dark to light */}
        <div className="h-8 bg-gradient-to-b from-[#08080f] to-[#f4f4f0]" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Alumni Placements
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <div className="mb-10 flex flex-col sm:flex-row sm:items-end gap-4">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-zinc-900 tracking-tight leading-tight">
              Our alumni have placed at<br />
              <span className="text-[#c73d51]">top firms globally.</span>
            </h2>
          </div>

          {/* Editorial placement record — alternating rows */}
          <div className="divide-y divide-zinc-200">
            {alumni.map(({ company, logo, positions }, idx) => (
              <div
                key={company}
                className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 overflow-hidden transition-opacity duration-500"
              >
                {/* Unique hover effect — alternating sweep direction */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none ${idx % 2 === 0 ? "origin-left" : "origin-right"}`} />

                {/* Left: index + logo */}
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:text-[#c73d51]/60 transition-colors duration-300 w-5">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="relative h-7 w-28 shrink-0">
                    <Image
                      src={logo}
                      alt={company}
                      fill
                      className="object-contain object-left opacity-80 group-hover:opacity-100 transition-all duration-300"
                      sizes="112px"
                    />
                  </div>
                </div>

                {/* Center: company name — grows to fill */}
                <p className="flex-1 text-sm font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors duration-300 tracking-tight">{company}</p>

                {/* Right: position tags */}
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {positions.map((pos) => (
                    <span
                      key={pos}
                      className="text-[9px] font-medium text-[#c73d51] border border-[#c73d51]/30 bg-[#c73d51]/[0.05] px-2 py-0.5 rounded-sm group-hover:border-[#c73d51]/50 group-hover:bg-[#c73d51]/[0.08] transition-all duration-200 whitespace-nowrap"
                    >
                      {pos}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Gradient transition from light back to dark */}
        <div className="h-8 bg-gradient-to-b from-[#f4f4f0] to-[#08080f]" />
      </section>

      {/* ══════════════════════════════════════════════════
          COMMUNITY CROSS-LINK
      ══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 text-center">
        <p className="text-zinc-500 text-sm mb-4">Applications open each semester. Stay in the loop.</p>
        <a
          href="https://www.instagram.com/uscavenues/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#eb4c60]/30 text-[#eb4c60] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm hover:bg-[#eb4c60]/[0.06] transition-colors duration-200"
        >
          Follow @uscavenues
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
              Join Us
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Find your people
              <br />
              <span className="text-[#eb4c60]">at Avenues.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/apply"
              className="bg-[#eb4c60] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors"
            >
              Apply now
            </Link>
            <Link
              href="/about"
              className="border border-white/[0.1] text-zinc-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white transition-colors"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

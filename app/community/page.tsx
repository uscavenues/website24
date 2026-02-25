"use client";

import Link from "next/link";
import Image from "next/image";
import { whatWeDo, majors, mentors, alumni } from "@/lib/data";

// ─── Photo strip data (actual filenames on disk) ───────────────────────────────
const photos = [
  { src: "/assets/photos/backtoschool.jpeg", alt: "Back to school event" },
  { src: "/assets/photos/carter.JPEG",       alt: "Carter event" },
  { src: "/assets/photos/kbbqar.jpeg",        alt: "KBBQ alumni relations" },
  { src: "/assets/photos/potluck.jpg",        alt: "Potluck gathering" },
  { src: "/assets/photos/speeddating.jpeg",   alt: "Speed networking" },
  { src: "/assets/photos/kbbqgroup.jpeg",     alt: "KBBQ group photo" },
  { src: "/assets/photos/trio.JPEG",          alt: "Three members" },
  { src: "/assets/photos/tabling.jpeg",       alt: "Tabling at USC" },
];

export default function CommunityPage() {
  // Duplicate for seamless marquee loop — stable IDs avoid index-as-key
  const allPhotos = [
    ...photos.map((p, n) => ({ ...p, id: `a${n}` })),
    ...photos.map((p, n) => ({ ...p, id: `b${n}` })),
  ];

  return (
    <div className="bg-[#08080f] min-h-screen">

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

          <h1 className="text-[clamp(3rem,11vw,8.5rem)] font-black leading-[0.88] tracking-tighter text-white mb-8 reveal-up">
            OUR
            <br />
            <span className="text-[#eb4c60]">COMMUNITY</span>
          </h1>

          <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed reveal-up delay-2">
            We cherish the unique blend of majors, industries, and bright futures
            that make up Avenues. No matter where your interests lie, we invite
            you to join us.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. PHOTO MARQUEE
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden border-y border-white/[0.05] py-0">
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
                sizes="(max-width: 768px) 320px, 320px"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. OUR MEMBERS — stats + major tags
      ══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        {/* Section header */}
        <div className="mb-14 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
            Our Members
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — stat numbers */}
          <div className="space-y-10">
            {[
              { value: "24", label: "Majors Represented" },
              { value: "3",  label: "Disciplines" },
              { value: "Est. 2023", label: "Founded at USC" },
            ].map(({ value, label }) => (
              <div key={label} className="group">
                <div className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-none tracking-tighter text-white group-hover:text-[#eb4c60] transition-colors duration-300">
                  {value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  {label}
                </div>
                <div className="mt-3 h-px w-12 bg-white/[0.06] group-hover:bg-[#eb4c60]/40 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Right — major pills */}
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] mb-5">
              Fields of Study
            </p>
            <div className="flex flex-wrap gap-2">
              {majors.map((major) => (
                <span
                  key={major}
                  className="border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-zinc-400 rounded-sm hover:border-[#eb4c60]/30 hover:text-zinc-200 hover:bg-white/[0.04] transition-all duration-200 cursor-default"
                >
                  {major}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. WHAT WE DO — 8-item grid
      ══════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.04]">
        {/* Subtle dot texture band */}
        <div className="absolute inset-0 dot-texture-subtle opacity-60 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          {/* Section header */}
          <div className="mb-14 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
              What We Do
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {whatWeDo.map(({ title, desc }, idx) => (
              <div
                key={title}
                className="group relative border border-white/[0.06] bg-white/[0.02] rounded-sm p-6 overflow-hidden hover:border-[#eb4c60]/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                {/* Pink accent mark */}
                <div className="absolute top-5 left-5 w-4 h-px bg-[#eb4c60] group-hover:w-6 transition-all duration-300" />
                {/* Index number */}
                <div className="absolute top-4 right-5 text-[10px] font-mono text-zinc-800 group-hover:text-[#eb4c60]/30 transition-colors duration-300">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-7">
                  <h3 className="text-sm font-bold text-white mb-2.5 leading-snug tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. OUR MENTORS — logo strip
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
          {/* Section header */}
          <div className="mb-12 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
              Our Mentors
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <p className="text-zinc-600 text-sm mb-10 max-w-lg">
            Professionals from these organizations advise our members, conduct
            workshops, and share industry expertise.
          </p>

          <div className="flex flex-wrap justify-start items-center gap-x-10 gap-y-8">
            {mentors.map(({ name, logo }) => (
              <div key={name} className="group relative">
                <Image
                  src={logo}
                  alt={name}
                  width={100}
                  height={32}
                  className="object-contain max-h-8 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. ALUMNI PLACEMENTS
      ══════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.04]">
        <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          {/* Section header */}
          <div className="mb-4 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
              Alumni Placements
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            Since Fall 2023, our alumni have placed at:
          </h2>
          <p className="text-zinc-600 text-sm mb-12 max-w-xl">
            Avenues members go on to top firms across consulting, technology,
            finance, and beyond.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {alumni.map(({ company, logo, positions }) => (
              <div
                key={company}
                className="group relative border border-white/[0.06] bg-white/[0.02] rounded-sm p-5 overflow-hidden hover:border-[#eb4c60]/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                {/* Logo */}
                <div className="flex items-center justify-center h-10 mb-4">
                  <Image
                    src={logo}
                    alt={company}
                    width={80}
                    height={80}
                    className="object-contain max-h-9 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Company name */}
                <p className="text-[11px] font-semibold text-zinc-300 text-center mb-2 leading-tight">
                  {company}
                </p>

                {/* Positions — always visible, pink accent */}
                <div className="space-y-0.5">
                  {positions.map((pos) => (
                    <p
                      key={pos}
                      className="text-[10px] text-[#eb4c60]/70 group-hover:text-[#eb4c60] text-center leading-tight transition-colors duration-200"
                    >
                      {pos}
                    </p>
                  ))}
                </div>

                {/* Top-left accent line */}
                <div className="absolute top-0 left-0 w-0 h-px bg-[#eb4c60] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700 mb-3">
              Join Us
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Be part of something
              <br />
              <span className="text-[#eb4c60]">bigger than a resume.</span>
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

    </div>
  );
}

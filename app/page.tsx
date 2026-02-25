"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Phase 1: Big centered logo fades out as scroll begins
  const bigLogoOpacity = useTransform(scrollYProgress, [0, 0.28, 0.48], [1, 1, 0]);
  const bigLogoScale = useTransform(scrollYProgress, [0.28, 0.48], [1, 0.55]);

  // Phase 2: Full h1 fades in
  const titleOpacity = useTransform(scrollYProgress, [0.38, 0.62], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.38, 0.62], [50, 0]);

  // Phase 3: Content below title
  const contentOpacity = useTransform(scrollYProgress, [0.58, 0.82], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.58, 0.82], [30, 0]);

  // Scroll indicator fades out quickly
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <>
      {/* ── HERO: 250vh for scroll animation space ── */}
      <div ref={heroRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Backgrounds */}
          <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#eb4c60]/[0.06] blur-[160px] pointer-events-none" />
          <div className="absolute inset-0">
            <Image
              src="/assets/photos/home.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.06]"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080f]/60 via-transparent to-[#08080f] pointer-events-none" />

          {/* Phase 1: Big centered logo only */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ opacity: bigLogoOpacity }}
          >
            <motion.div
              className="relative"
              style={{
                scale: bigLogoScale,
                width: "clamp(140px, 28vmin, 240px)",
                height: "clamp(140px, 28vmin, 240px)",
              }}
            >
              <Image
                src="/assets/icons/avenues-logo.png"
                alt="Avenues"
                fill
                className="object-contain invert"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Phase 2 + 3: Full hero content */}
          <div className="absolute inset-0 flex flex-col">
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 w-full flex-1 flex flex-col justify-center pt-16">

              {/* Title */}
              <motion.div style={{ opacity: titleOpacity, y: titleY }}>
                <div className="mb-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-md px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#eb4c60] animate-pulse" />
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">
                      Spring &apos;26 · Active Engagements
                    </span>
                  </div>
                </div>

                <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.88] tracking-tighter text-white">
                  <span className="inline-flex items-end" style={{ gap: "0.03em" }}>
                    <span
                      className="relative inline-block"
                      style={{ height: "0.73em", width: "0.73em", marginBottom: "0.01em" }}
                    >
                      <Image
                        src="/assets/icons/avenues-logo.png"
                        alt="A"
                        fill
                        className="object-contain invert"
                      />
                    </span>
                    VENUES
                  </span>
                  <br />
                  <span className="text-[#eb4c60]">CONSULTING</span>
                  <br />
                  GROUP
                </h1>
              </motion.div>

              {/* Tagline + CTAs + Stats */}
              <motion.div style={{ opacity: contentOpacity, y: contentY }}>
                <p className="mt-8 max-w-lg text-zinc-400 text-lg leading-relaxed">
                  USC&apos;s premier student-run consulting group. Pro-bono,
                  multidisciplinary project-building across strategy, technology,
                  and design.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
                  >
                    Work with us
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:border-white/30 hover:bg-white/[0.07] transition-colors duration-200"
                  >
                    Apply to join
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-8 md:gap-14 mt-14 pt-8 border-t border-white/[0.05]">
                  {[
                    { n: "20+", label: "Clients Served" },
                    { n: "3", label: "Disciplines" },
                    { n: "F’23", label: "Established" },
                    { n: "Pro Bono", label: "Always Free" },
                  ].map(({ n, label }) => (
                    <div key={label}>
                      <div className="text-2xl font-black text-white tracking-tight">{n}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5 tracking-[0.2em] uppercase">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* ── THREE PILLARS ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <ScrollReveal className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            What We Do
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              tag: "01",
              title: "Strategy",
              desc: "Market research, growth plans, subscription models, and comprehensive business strategy for any industry.",
              href: "/portfolio",
            },
            {
              tag: "02",
              title: "Technology",
              desc: "Full-stack web development, data analysis, and modern tech solutions built from scratch or on proven platforms.",
              href: "/portfolio",
            },
            {
              tag: "03",
              title: "Design",
              desc: "Brand identity, UI/UX design, and visual storytelling that elevates your organization's presence and reach.",
              href: "/portfolio",
            },
          ].map(({ tag, title, desc, href }, i) => (
            <ScrollReveal key={title} delay={`delay-${i + 1}`} scale>
              <Link
                href={href}
                className="group relative border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm rounded-sm p-8 overflow-hidden block shadow-[0_2px_16px_rgba(0,0,0,0.2)] hover:border-[#eb4c60]/30 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(235,76,96,0.08)] transition-all duration-300"
              >
                <div className="absolute top-5 right-5 text-[10px] font-mono text-zinc-600 group-hover:text-[#eb4c60]/40 transition-colors">
                  {tag}
                </div>
                <div className="w-5 h-px bg-[#eb4c60] mb-6 group-hover:w-8 transition-all duration-300" />
                <h3 className="text-base font-bold text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                <div className="mt-6 flex items-center gap-1.5 text-[11px] text-zinc-600 group-hover:text-[#eb4c60]/70 transition-colors">
                  <span className="font-semibold tracking-[0.1em] uppercase">View work</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── COHORT PHOTO ── */}
      <ScrollReveal className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <div className="relative rounded-sm overflow-hidden aspect-[16/7]">
          <Image
            src="/assets/photos/home.jpg"
            alt="Avenues Spring 26 cohort"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
              Spring &apos;26 Cohort
            </p>
            <p className="text-sm text-zinc-300">Avenues Consulting Group &middot; USC</p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── STATS BAND ── */}
      <section className="relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 dot-texture-subtle opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "20+", label: "Client engagements delivered", sub: "Since Fall 2023" },
              { value: "24", label: "Majors represented", sub: "Across all disciplines" },
              { value: "3", label: "Practice areas", sub: "Strategy, Tech, Design" },
              { value: "100%", label: "Pro-bono", sub: "Always free for clients" },
            ].map(({ value, label, sub }, i) => (
              <ScrollReveal key={label} delay={`delay-${i + 1}`}>
                <div className="group">
                  <div className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tighter text-white group-hover:text-[#eb4c60] transition-colors duration-300">
                    {value}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-zinc-300 leading-snug">{label}</div>
                  <div className="mt-1 text-[10px] text-zinc-600 uppercase tracking-[0.15em]">{sub}</div>
                  <div className="mt-3 h-px w-8 bg-white/[0.06] group-hover:bg-[#eb4c60]/40 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.025] pointer-events-none">
          <Image
            src="/assets/icons/avenues-logo.png"
            alt=""
            fill
            className="object-contain invert"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-4">Get Involved</p>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-black text-white tracking-tighter leading-[0.9] mb-6">
              Ready to build
              <br />
              <span className="text-[#eb4c60]">something real?</span>
            </h2>
            <p className="max-w-md text-zinc-500 text-base leading-relaxed mb-10">
              Whether you want to join the team or bring us a challenge to solve,
              we&apos;re always looking for ambitious collaborators.
            </p>
          </ScrollReveal>
          <ScrollReveal className="flex flex-wrap gap-4" delay="delay-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors"
            >
              Partner with us
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm text-zinc-300 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white hover:bg-white/[0.07] transition-colors"
            >
              Apply to join
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white px-4 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors"
            >
              See our work
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

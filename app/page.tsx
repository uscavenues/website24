"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

interface Pos { x: number; y: number; sz: number }

export default function HomePage() {
  const aRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Start: big centered logo — synchronous so it never teleports
  const [start] = useState<Pos>(() => {
    if (typeof window === "undefined") return { x: 400, y: 260, sz: 500 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sz = Math.min(Math.max(vw * 0.44, 300), 520);
    return { x: vw / 2 - sz / 2, y: vh / 2 - sz / 2, sz };
  });

  const startX  = useMotionValue(start.x);
  const startY  = useMotionValue(start.y);
  const startSz = useMotionValue(start.sz);
  const endX    = useMotionValue(0);
  const endY    = useMotionValue(0);
  const endSz   = useMotionValue(0);

  useLayoutEffect(() => {
    startX.set(start.x); startY.set(start.y); startSz.set(start.sz);
    const measure = () => {
      if (!aRef.current) return;
      const r = aRef.current.getBoundingClientRect();
      endX.set(r.left); endY.set(r.top); endSz.set(r.width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });

  // ── SEQUENCE (scroll-driven, 320vh hero) ──────────────────────────────
  //  0.00–0.05  black screen, big logo centred
  //  0.05–0.32  logo flies centre → A slot              (against black bg)
  //  0.28–0.39  VENUES slides in
  //  0.35–0.46  CONSULTING rises
  //  0.42–0.53  GROUP rises
  //  0.53–0.64  tagline + CTAs fade in  ← right after GROUP
  //  0.64–0.80  black overlay fades → background reveals ← LAST
  //  0.80–1.00  buffer before sticky releases

  // Black overlay — stays until AFTER tagline appears, THEN fades
  const blackOp = useTransform(scrollYProgress, [0, 0.05, 0.64, 0.80], [1, 1, 1, 0]);

  // Logo movement — starts immediately on scroll
  const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const logoLeft = useTransform(
    [scrollYProgress, startX, endX] as MotionValue[],
    (v: number[]) => { const [p,sx,ex]=v; const t=Math.max(0,Math.min(1,(p-0.05)/0.27)); return sx+(ex-sx)*ease(t); }
  );
  const logoTop = useTransform(
    [scrollYProgress, startY, endY] as MotionValue[],
    (v: number[]) => { const [p,sy,ey]=v; const t=Math.max(0,Math.min(1,(p-0.05)/0.27)); return sy+(ey-sy)*ease(t); }
  );
  const logoSize = useTransform(
    [scrollYProgress, startSz, endSz] as MotionValue[],
    (v: number[]) => { const [p,ss,es]=v; const t=Math.max(0,Math.min(1,(p-0.05)/0.27)); return ss+(es-ss)*ease(t); }
  );

  // Text stagger
  const venuesOp  = useTransform(scrollYProgress, [0.28, 0.39], [0, 1]);
  const venuesX   = useTransform(scrollYProgress, [0.28, 0.39], [40, 0]);
  const consultOp = useTransform(scrollYProgress, [0.35, 0.46], [0, 1]);
  const consultY  = useTransform(scrollYProgress, [0.35, 0.46], [44, 0]);
  const groupOp   = useTransform(scrollYProgress, [0.42, 0.53], [0, 1]);
  const groupY    = useTransform(scrollYProgress, [0.42, 0.53], [32, 0]);

  // Tagline + CTAs — right after GROUP, before bg reveal
  const contentOp = useTransform(scrollYProgress, [0.53, 0.64], [0, 1]);
  const contentY  = useTransform(scrollYProgress, [0.53, 0.64], [28, 0]);

  return (
    <>
      {/* ══════════════════════ HERO (320vh sticky, scroll-driven) ══════════ */}
      <div ref={heroRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#eb4c60]/[0.09] blur-[160px] pointer-events-none" />
          <div className="absolute inset-0">
            <Image src="/assets/photos/home.jpg" alt="" fill className="object-cover opacity-[0.38]" priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080f]/50 via-transparent to-[#08080f] pointer-events-none" />

          {/* Black overlay — fades first */}
          <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: blackOp, zIndex: 5 }} />

          {/* Logo — zIndex 20, always on top */}
          <motion.div
            className="pointer-events-none"
            style={{ position: "absolute", left: logoLeft, top: logoTop, width: logoSize, height: logoSize, zIndex: 20 }}
          >
            <Image src="/assets/icons/avenues-logo.png" alt="Avenues logo" fill className="object-contain invert" priority />
          </motion.div>

          {/* Hero text — zIndex 10 */}
          <div className="absolute inset-0 flex flex-col" style={{ zIndex: 10 }}>
            <div className="relative mx-auto max-w-7xl px-6 md:px-10 w-full flex-1 flex flex-col justify-center pt-16">

              <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.88] tracking-tighter text-white">

                {/* Invisible A-placeholder: logo lands here */}
                <span className="inline-flex items-end" style={{ gap: 0 }}>
                  <span
                    ref={aRef}
                    className="inline-block"
                    style={{ height: "1.8em", width: "1.8em", marginBottom: "-0.3em", marginRight: "-0.55em" }}
                    aria-hidden="true"
                  />
                  <motion.span className="inline-block" style={{ opacity: venuesOp, x: venuesX }}>
                    VENUES
                  </motion.span>
                </span>

                <br />

                <motion.span className="inline-block" style={{ opacity: consultOp, y: consultY }}>
                  <span className="text-[#eb4c60]">CONSULTING</span>
                </motion.span>

                <br />

                <motion.span className="inline-block" style={{ opacity: groupOp, y: groupY }}>
                  GROUP
                </motion.span>
              </h1>

              {/* Tagline + CTAs — appear right after GROUP */}
              <motion.div style={{ opacity: contentOp, y: contentY }}>
                <p className="mt-8 max-w-lg text-zinc-400 text-lg leading-relaxed">
                  USC&apos;s premier student-run consulting group — pro-bono,
                  multidisciplinary, and built for impact.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#d43d50] transition-colors duration-200">
                    Work with us
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/apply" className="inline-flex items-center gap-2 border border-white/[0.14] bg-white/[0.03] text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:border-white/30 hover:bg-white/[0.07] transition-colors duration-200">
                    Apply to join
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════ THREE PILLARS ══════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <ScrollReveal className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">What We Do</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { tag: "01", title: "Strategy",   desc: "Market research, growth plans, subscription models, and comprehensive business strategy for any industry.",   href: "/portfolio" },
            { tag: "02", title: "Technology", desc: "Full-stack web development, data analysis, and modern tech solutions built from scratch or on proven platforms.", href: "/portfolio" },
            { tag: "03", title: "Design",     desc: "Brand identity, UI/UX design, and visual storytelling that elevates your organization's presence and reach.",   href: "/portfolio" },
          ].map(({ tag, title, desc, href }, i) => (
            <ScrollReveal key={title} delay={`delay-${i + 1}`} scale>
              <Link href={href} className="glass-card group relative rounded-sm p-8 overflow-hidden block transition-all duration-300">
                <div className="absolute top-5 right-5 text-[10px] font-mono text-zinc-600 group-hover:text-[#eb4c60]/40 transition-colors">{tag}</div>
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

      {/* ══════════════════════ COHORT PHOTO ═══════════════════════════════════ */}
      <ScrollReveal className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <div className="relative rounded-sm overflow-hidden aspect-[16/7]">
          <Image src="/assets/photos/home.jpg" alt="Avenues cohort" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Spring &apos;26 Cohort</p>
            <p className="text-sm text-zinc-300">Avenues Consulting Group &middot; USC</p>
          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════ STATS BAND ═════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 dot-texture-subtle opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "20+",  label: "Client engagements delivered", sub: "Since Fall 2023" },
              { value: "24",   label: "Majors represented",           sub: "Across all disciplines" },
              { value: "3",    label: "Practice areas",               sub: "Strategy, Tech, Design" },
              { value: "100%", label: "Pro-bono",                     sub: "Always free for clients" },
            ].map(({ value, label, sub }, i) => (
              <ScrollReveal key={label} delay={`delay-${i + 1}`}>
                <div className="group">
                  <div className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tighter text-white group-hover:text-[#eb4c60] transition-colors duration-300">{value}</div>
                  <div className="mt-2 text-xs font-semibold text-zinc-300 leading-snug">{label}</div>
                  <div className="mt-1 text-[10px] text-zinc-600 uppercase tracking-[0.15em]">{sub}</div>
                  <div className="mt-3 h-px w-8 bg-white/[0.06] group-hover:bg-[#eb4c60]/40 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BAND ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.025] pointer-events-none">
          <Image src="/assets/icons/avenues-logo.png" alt="" fill className="object-contain invert" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-4">Get Involved</p>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-black text-white tracking-tighter leading-[0.9] mb-6">
              Ready to build<br /><span className="text-[#eb4c60]">something real?</span>
            </h2>
            <p className="max-w-md text-zinc-500 text-base leading-relaxed mb-10">
              Whether you want to join the team or bring us a challenge to solve,
              we&apos;re always looking for ambitious collaborators.
            </p>
          </ScrollReveal>
          <ScrollReveal className="flex flex-wrap gap-4" delay="delay-2">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors">
              Partner with us
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/apply" className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] text-zinc-300 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white hover:bg-white/[0.07] transition-colors">
              Apply to join
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white px-4 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors">
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

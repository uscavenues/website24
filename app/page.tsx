"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

interface Pos { x: number; y: number; sz: number }

function CountUp({ end, suffix = "", duration = 1.5 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(end);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const aRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Start: big centered logo — synchronous so it never teleports
  const [start] = useState<Pos>(() => {
    if (typeof window === "undefined") return { x: 400, y: 260, sz: 500 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sz = Math.min(Math.max(vw * 0.88, 700), 1500);
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

  const skipHero = () => {
    if (heroRef.current) {
      window.scrollTo({ top: heroRef.current.offsetHeight, behavior: "smooth" });
    }
  };

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

          {/* Skip intro button — visible during overlay, fades with it */}
          <motion.button
            onClick={skipHero}
            style={{ opacity: blackOp, zIndex: 25 }}
            className="absolute bottom-8 right-8 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer"
            aria-label="Skip intro animation"
          >
            Skip intro
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>

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

              <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.88] tracking-tighter text-white" aria-label="Avenues Consulting Group">

                {/* Invisible A-placeholder: logo lands here */}
                <span className="inline-flex items-end" style={{ gap: 0 }}>
                  <span
                    ref={aRef}
                    className="inline-block"
                    style={{ height: "2.2em", width: "2.2em", marginBottom: "-0.92em", marginRight: "-0.44em" }}
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
                <p className="mt-8 max-w-lg text-zinc-400 text-base md:text-xl leading-relaxed font-display italic">
                  USC&apos;s student-run consulting group spanning strategy, technology, and design. Pro bono,
                  and built for impact.
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
      <section id="what-we-do" className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <ScrollReveal className="mb-16 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">What We Do</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] rounded-sm overflow-hidden">
          {[
            {
              tag: "01",
              title: "Strategy",
              desc: "Market research, growth plans, subscription models, and comprehensive business strategy for any industry.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              tag: "02",
              title: "Technology",
              desc: "Full-stack web development, data analysis, and modern tech solutions built from scratch or on proven platforms.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              ),
            },
            {
              tag: "03",
              title: "Design",
              desc: "Brand identity, UI/UX design, and visual storytelling that elevates your organization's presence and reach.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map(({ tag, title, desc, icon }, i) => (
            <ScrollReveal key={title} delay={`delay-${i + 1}`}>
              <Link href="/portfolio" className="group relative flex flex-col gap-6 p-8 md:p-10 bg-[#08080f] hover:bg-[#eb4c60]/[0.05] transition-colors duration-500 overflow-hidden h-full cursor-pointer">
                {/* Top accent line animates in on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                {/* Ghost number — background depth */}
                <span className="absolute bottom-4 right-6 text-[7rem] font-black font-mono text-white/[0.03] group-hover:text-[#eb4c60]/[0.07] transition-colors duration-700 leading-none select-none pointer-events-none" aria-hidden="true">{tag.replace("0","")}</span>

                {/* Tag row */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-700 group-hover:text-[#eb4c60]/60 transition-colors duration-300">{tag}</span>
                  <span className="h-px flex-1 bg-white/[0.04] group-hover:bg-[#eb4c60]/20 transition-colors duration-500" />
                </div>

                {/* Icon */}
                <span className="text-zinc-600 group-hover:text-[#eb4c60] transition-colors duration-300 mt-4">
                  {icon}
                </span>

                {/* Title */}
                <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tighter text-white group-hover:text-[#eb4c60] transition-colors duration-300 leading-[0.9]">
                  {title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 mt-auto">
                  {desc}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-600 group-hover:text-[#eb4c60] transition-colors duration-300 mt-2">
                  See work
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="relative">
          <div className="relative rounded-sm overflow-hidden aspect-[16/7]">
            <Image src="/assets/photos/home.jpg" alt="Avenues Consulting Group cohort, USC" fill className="object-cover" sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) calc(100vw - 5rem), 1240px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-sm text-zinc-300">Avenues Consulting Group &middot; USC</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ══════════════════════ STATS BAND ═════════════════════════════════════ */}
      <section id="stats" className="relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 dot-texture-subtle opacity-50 pointer-events-none" />
        {/* Pink radial bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#eb4c60]/[0.05] blur-[120px] pointer-events-none" />

        <div className="relative grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {[
            { end: 20, suffix: "+", label: "Client engagements",   sub: "Since Fall 2023",             hoverStyle: "translate-y" },
            { end: 24, suffix: "",  label: "Majors represented",   sub: "From CS to pre-law",       hoverStyle: "scale" },
            { end: 3,  suffix: "",  label: "Practice areas",       sub: "Strategy · Tech · Design",          hoverStyle: "color" },
            { end: 100, suffix: "%", label: "Pro bono",             sub: "Always free for partners",       hoverStyle: "glow" },
          ].map(({ end, suffix, label, sub, hoverStyle }) => (
            <ScrollReveal key={label}>
              <div className={`group relative flex flex-col justify-center px-8 md:px-12 py-16 overflow-hidden`}>
                {/* Per-stat unique hover effect */}
                {hoverStyle === "glow" && (
                  <div className="absolute inset-0 bg-[#eb4c60]/[0] group-hover:bg-[#eb4c60]/[0.04] transition-all duration-500 pointer-events-none" />
                )}
                {hoverStyle === "translate-y" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />
                )}
                {hoverStyle === "scale" && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 pointer-events-none" />
                )}
                {hoverStyle === "color" && (
                  <div className="absolute inset-0 border border-[#eb4c60]/0 group-hover:border-[#eb4c60]/15 transition-all duration-500 pointer-events-none" />
                )}

                <div className={`text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-tighter text-white transition-all duration-300 ${
                  hoverStyle === "translate-y" ? "group-hover:-translate-y-1 group-hover:text-[#eb4c60]" :
                  hoverStyle === "scale"       ? "group-hover:scale-105 group-hover:text-zinc-100 origin-left" :
                  hoverStyle === "color"       ? "group-hover:text-[#eb4c60]" :
                  "group-hover:text-[#eb4c60]"
                }`}>
                  <CountUp end={end} suffix={suffix} />
                </div>
                <div className="mt-3 text-xs font-semibold text-zinc-400 leading-snug">{label}</div>
                <div className="mt-1 text-[10px] text-zinc-600 uppercase tracking-[0.15em]">{sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CTA BAND ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        {/* Cinematic cohort photo — right side, faint */}
        <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none">
          <Image src="/assets/photos/home.jpg" alt="" fill className="object-cover object-center opacity-[0.11]" sizes="60vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080f] via-[#08080f]/60 to-[#08080f]/10" />
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
              Work with us
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] text-zinc-300 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white hover:bg-white/[0.07] transition-colors">
              See our work
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

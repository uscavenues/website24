"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  clientCards,
  strategyProjects,
  techProjects,
  designProjects,
  type Project,
} from "@/lib/data";


type ProjectTab = "strategy" | "technology" | "design";

const PROJECT_TABS: { key: ProjectTab; label: string; data: Project[] }[] = [
  { key: "strategy", label: "Strategy", data: strategyProjects },
  { key: "technology", label: "Technology", data: techProjects },
  { key: "design", label: "Design", data: designProjects },
];

const TAB_ACCENTS: Record<ProjectTab, string> = {
  strategy: "#3b82f6",   // blue
  technology: "#10b981", // green
  design: "#a855f7",     // purple
};

function ProjectRow({ project, index, accent }: { project: Project; index: number; accent: string }) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 border-b border-white/[0.05] overflow-hidden">
      {/* Sweep line */}
      <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" style={{ background: accent }} aria-hidden="true" />

      {/* Index — large, faded */}
      <span className="shrink-0 w-1 self-stretch rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: accent }} />
      <span className="shrink-0 text-[clamp(2rem,4vw,3.5rem)] font-black font-mono text-zinc-800 group-hover:text-[#eb4c60]/20 transition-colors duration-300 leading-none w-12 md:w-16">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#eb4c60] transition-colors duration-300">{project.title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed mb-3 group-hover:text-zinc-300 transition-colors duration-300">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.clients.split(", ").map((client) => (
            <span key={client} className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#eb4c60]/60 border border-[#eb4c60]/20 px-2 py-0.5 rounded-sm">
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("strategy");

  const activeProjects =
    PROJECT_TABS.find((t) => t.key === activeTab)?.data ?? [];

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-20 w-[800px] h-[600px] rounded-full bg-[#eb4c60]/10 blur-[160px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-10 right-0 w-[500px] h-[400px] rounded-full bg-[#eb4c60]/[0.04] blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080f]/60 via-transparent to-[#08080f] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pb-16 w-full">
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Our Work
            </span>
          </div>
          <h1 className="text-[clamp(4rem,14vw,12rem)] font-black leading-[0.82] tracking-tighter text-white">
            PORTFOLIO
          </h1>
          <p className="mt-8 max-w-lg text-zinc-400 text-sm leading-relaxed">
            Real work for real organizations. Delivered with the rigor of a
            top-tier firm. No fees, ever.
          </p>
        </div>
      </section>

      {/* ── OUR CLIENTS ──────────────────────────────────────────────────── */}
      <section id="clients" className="pb-24 bg-[#f4f4f0]">
        {/* Gradient transition from dark to light */}
        <div className="h-32 bg-gradient-to-b from-[#08080f] to-[#f4f4f0]" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Our Clients
            </span>
            <div className="h-px flex-1 bg-zinc-300/60" />
            <span className="text-[10px] text-zinc-500">
              20+ projects delivered
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black text-zinc-900 tracking-tighter leading-[0.9]">
            20+ clients.
            <br />
            <span className="text-[#c73d51]">All pro bono.</span>
          </h2>
        </div>

        {/* Full-bleed dual-direction marquee */}
        <div className="overflow-hidden space-y-3 marquee-hover-pause">
          {/* Row 1 — scrolls left */}
          <div className="marquee-track">
            {[...clientCards, ...clientCards].map((client, i) => (
              <div
                key={`row1-${i}`}
                className="group relative shrink-0 mr-4 flex flex-col items-center justify-center gap-3 px-10 py-6 min-w-[200px] border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-[#eb4c60]/30 transition-all duration-300 rounded-sm"
              >
                {/* Pink top-line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative h-8 w-28">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                    sizes="112px"
                  />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-700 transition-colors duration-300 whitespace-nowrap">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
          {/* Row 2 — scrolls right */}
          <div className="marquee-track-reverse">
            {[...clientCards, ...clientCards].reverse().map((client, i) => (
              <div
                key={`row2-${i}`}
                className="group relative shrink-0 mr-4 flex flex-col items-center justify-center gap-3 px-10 py-6 min-w-[200px] border border-zinc-200 bg-zinc-50 hover:bg-zinc-50 hover:border-[#eb4c60]/30 transition-all duration-300 rounded-sm"
              >
                {/* Pink bottom-line on hover (different from row 1) */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                <div className="relative h-8 w-28">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                    sizes="112px"
                  />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-700 transition-colors duration-300 whitespace-nowrap">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Gradient transition from light back to dark */}
        <div className="h-32 bg-gradient-to-b from-[#f4f4f0] to-[#08080f]" />
      </section>

      {/* ── PAST PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" className="relative border-t border-white/[0.05] pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20">
          {/* Section header */}
          <div className="mb-12 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
              Past Projects
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">
            {/* Left: heading + tab switcher */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black font-display text-white tracking-tighter leading-[0.9] mb-2">
                Selected
                <br />
                <span className="text-[#eb4c60]">Projects</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mb-10">
                A selection of projects across all three practice areas from
                recent semesters.
              </p>

              {/* Discipline tabs */}
              <div className="flex flex-col gap-0.5">
                {PROJECT_TABS.map(({ key, label, data }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative group flex items-center justify-between px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                      activeTab === key
                        ? "text-[#eb4c60] bg-[#eb4c60]/[0.06]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTab === key && (
                        <motion.span
                          layoutId="tab-indicator"
                          className="w-px h-3.5 bg-[#eb4c60] rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {label}
                    </span>
                    <span
                      className={`text-[9px] font-bold tabular-nums transition-colors ${
                        activeTab === key ? "text-[#eb4c60]/60" : "text-zinc-600"
                      }`}
                    >
                      {data.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: project rows */}
            <div>
              {/* Mobile: section label */}
              <p className="lg:hidden text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-4">Past Projects</p>
              {/* Mobile: tab pill switcher */}
              <div className="lg:hidden mb-6 flex items-center gap-2 flex-wrap">
                {PROJECT_TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-200 ${
                      activeTab === key
                        ? 'bg-[#eb4c60] text-white'
                        : 'border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeProjects.map((project, i) => (
                    <ProjectRow key={project.title} project={project} index={i} accent={TAB_ACCENTS[activeTab]} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.05] mb-0">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080f] to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-4">
            Partner with us
          </p>
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-black text-white tracking-tighter leading-[0.9] mb-8">
            Your problem.<br /><span className="text-[#eb4c60]">Our team.</span><br />Zero cost.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
          >
            Start a conversation
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

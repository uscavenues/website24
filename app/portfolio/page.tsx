"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="glass-card group rounded-sm p-6 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="text-[10px] font-mono text-zinc-600 group-hover:text-[#eb4c60]/40 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="w-3 h-px bg-[#eb4c60] mt-2 shrink-0 group-hover:w-5 transition-all duration-300" />
      </div>
      <h3 className="text-sm font-bold text-white mb-2 leading-snug">
        {project.title}
      </h3>
      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
        {project.desc}
      </p>
      <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#eb4c60]/80">
        {project.clients}
      </span>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("strategy");

  const activeProjects =
    PROJECT_TABS.find((t) => t.key === activeTab)?.data ?? [];

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 dot-texture opacity-35 pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[600px] h-[500px] rounded-full bg-[#eb4c60]/8 blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Our Work
            </span>
          </div>
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-white">
            PORT
            <br />
            FOLIO
          </h1>
          <p className="mt-6 max-w-lg text-zinc-500 text-sm leading-relaxed">
            Pro-bono engagements across strategy, technology, and design,
            delivered with the rigor of a top-tier consulting firm.
          </p>
        </div>
      </section>

      {/* ── OUR CLIENTS ──────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 mb-12">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Our Clients
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[10px] text-zinc-600">
              {clientCards.length} engagements
            </span>
          </div>
          <p className="text-xs text-zinc-600 max-w-lg">
            Pro-bono engagements delivered with the rigor of a top-tier firm.
          </p>
        </div>

        {/* Full-bleed dual-direction marquee */}
        <div className="overflow-hidden space-y-3">
          {/* Row 1 — scrolls left */}
          <div className="marquee-track">
            {[...clientCards, ...clientCards].map((client, i) => (
              <div
                key={`row1-${i}`}
                className="group relative shrink-0 mr-4 flex flex-col items-center justify-center gap-3 px-10 py-6 min-w-[200px] border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#eb4c60]/25 transition-all duration-300 rounded-sm"
              >
                {/* Pink top-line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative h-8 w-28">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-50 group-hover:opacity-100 transition-all duration-300"
                    sizes="112px"
                  />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap">
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
                className="group relative shrink-0 mr-4 flex flex-col items-center justify-center gap-3 px-10 py-6 min-w-[200px] border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] hover:border-[#eb4c60]/20 transition-all duration-300 rounded-sm opacity-70 hover:opacity-100"
              >
                {/* Pink bottom-line on hover (different from row 1) */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#eb4c60] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                <div className="relative h-8 w-28">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-40 group-hover:opacity-90 transition-all duration-300"
                    sizes="112px"
                  />
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST PROJECTS ────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.05] pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-20">
          {/* Section header */}
          <div className="mb-12 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
              Past Projects
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">
            {/* Left: heading + tab switcher */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
                Delivered
                <br />
                <span className="text-[#eb4c60]">Work</span>
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

            {/* Right: project cards */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeProjects.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.05] mb-0">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
              Partner with us
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Ready to start an{" "}
              <span className="text-[#eb4c60]">engagement?</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#eb4c60] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
          >
            Work with us
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

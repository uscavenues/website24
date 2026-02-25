"use client";

import { useState } from "react";
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
    <div className="group border border-white/[0.06] bg-white/[0.02] rounded-sm p-6 hover:border-[#eb4c60]/20 hover:bg-white/[0.03] transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="text-[10px] font-mono text-zinc-800 group-hover:text-[#eb4c60]/40 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="w-3 h-px bg-[#eb4c60] mt-2 shrink-0 group-hover:w-5 transition-all duration-300" />
      </div>
      <h3 className="text-sm font-bold text-white mb-2 leading-snug">
        {project.title}
      </h3>
      <p className="text-xs text-zinc-500 leading-relaxed mb-4">
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
            Pro-bono engagements across strategy, technology, and design —
            delivered with the rigor of a top-tier consulting firm.
          </p>
        </div>
      </section>

      {/* ── OUR CLIENTS ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
            Our Clients
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-[10px] text-zinc-800">
            {clientCards.length} engagements
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {clientCards.map((client) => (
            <div
              key={client.name}
              className="group border border-white/[0.06] bg-white/[0.02] rounded-sm p-5 flex flex-col items-center text-center hover:border-[#eb4c60]/25 hover:bg-white/[0.04] hover:scale-[1.02] transition-all duration-300"
            >
              {/* Logo */}
              <div className="w-20 h-20 flex items-center justify-center mb-3 relative">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-300 max-h-[80px]"
                />
              </div>

              {/* Client name */}
              <p className="text-xs text-zinc-500 font-medium mb-2.5 leading-tight">
                {client.name}
              </p>

              {/* Service pills */}
              <div className="flex flex-wrap gap-1 justify-center">
                {client.services.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#eb4c60]/70 border border-[#eb4c60]/20 rounded-full px-1.5 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
              <p className="text-xs text-zinc-600 leading-relaxed mb-10">
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
                        : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {activeTab === key && (
                        <span className="w-px h-3.5 bg-[#eb4c60] rounded-full" />
                      )}
                      {label}
                    </span>
                    <span
                      className={`text-[9px] font-bold tabular-nums transition-colors ${
                        activeTab === key ? "text-[#eb4c60]/60" : "text-zinc-800"
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
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700 mb-2">
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

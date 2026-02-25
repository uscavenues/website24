"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";

const PASSWORD = "as26";

/* ── Projects (from avenues-hub) ──────────────────────────────────────── */

const PROJECTS = [
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    sector: "Streaming",
    description:
      "Global streaming platform serving 200M+ Prime members. Building a NASCAR GTM strategy and centralized KPI dashboard to drive viewership growth and data-driven content decisions.",
    team: ["2 Strategy Consultants", "1 Design Consultant", "1 Tech Consultant"],
    outcomes: [
      "Live KPI dashboard with real-time analytics",
      "Full NASCAR Q1 GTM playbook delivered",
    ],
    deliverables: [
      "Go-To-Market strategy for Q1 NASCAR launch",
      "Centralized KPI dashboard with AI features",
    ],
    url: "https://prime-video-nascar-dashboard.vercel.app/",
    repo: "https://github.com/calebnewtonusc/prime-video-nascar-dashboard",
    accent: "#00A8FF",
  },
  {
    id: "hemut",
    name: "Hemut",
    sector: "AI Logistics",
    description:
      "Seed-stage AI OS for logistics and trucking, founded 2024. Automates dispatch, invoicing, load tracking, and accounting to reduce manual overhead for modern fleets.",
    team: ["2 Strategy Consultants", "2 Tech Consultants"],
    outcomes: [
      "Onboarding framework cutting ramp time by 40%",
      "Newsletter system reaching 500+ subscribers on Day 1",
    ],
    deliverables: [
      "Scalable onboarding framework and newsletter blueprint",
      "Cross-functional communication strategy to reduce silos",
    ],
    url: "https://hemut-wheat.vercel.app/",
    repo: "https://github.com/calebnewtonusc/hemut",
    accent: "#FBBF24",
  },
  {
    id: "wone",
    name: "Wone",
    sector: "Startup Platform",
    description:
      "All-in-one startup acceleration platform connecting founders, investors, and advisors. In beta with SPV fundraising tools, curated mentorship, and predictive analytics ahead of Q2 launch.",
    team: ["3 Strategy Consultants", "1 Tech Consultant"],
    outcomes: [
      "SoCal investor landscape map covering 120+ funds",
      "Redesigned investor deck increasing meeting conversion",
    ],
    deliverables: [
      "SoCal investor landscape map for targeted outreach",
      "Thought leadership distribution strategy for Q2 launch",
      "Refined investor-facing assets and website UI/UX",
    ],
    url: "https://wone-ruddy.vercel.app/",
    repo: "https://github.com/calebnewtonusc/wone",
    accent: "#4f46e5",
  },
  {
    id: "cosasco",
    name: "Cosasco",
    sector: "Industrial Tech",
    description:
      "Global leader in corrosion and erosion monitoring with 70+ years of expertise. Protecting critical infrastructure across oil & gas, petrochemical, water treatment, and utilities.",
    team: ["2 Design Consultants", "1 Tech Consultant"],
    outcomes: [
      "Redesigned IA reducing navigation friction by 35%",
      "Structured FAQ + support system for enterprise clients",
    ],
    deliverables: [
      "Redesigned website IA and navigation for usability",
      "Optimized UI/UX consistency and customer support pathways",
    ],
    url: "https://cosasco.vercel.app/",
    repo: "https://github.com/calebnewtonusc/cosasco",
    accent: "#f4a65d",
  },
  {
    id: "joyn",
    name: "Joyn",
    sector: "Consumer Social",
    description:
      "A consumer platform focused on community and connection. Building comprehensive paid and organic social strategy alongside refined brand positioning and reusable design systems.",
    team: ["2 Strategy Consultants", "1 Tech Consultant"],
    outcomes: [
      "Full paid + organic social playbook with 90-day roadmap",
      "Brand design system with 20+ reusable templates",
    ],
    deliverables: [
      "Paid + organic social strategy to drive awareness and conversions",
      "Refined brand positioning and reusable social media design templates",
    ],
    url: "https://joyn-strategy-hub.vercel.app/",
    repo: "https://github.com/calebnewtonusc/joyn-strategy-hub",
    accent: "#FD5C1E",
  },
];

/* ── Icons ─────────────────────────────────────────────────────────────── */

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconCheck({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ── Password Gate ─────────────────────────────────────────────────────── */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input,   setInput]   = useState("");
  const [error,   setError]   = useState(false);
  const [shaking, setShaking] = useState(false);

  const attempt = () => {
    if (input.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem("avenues-member-v1", "1");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setInput("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center gap-8"
        style={{ animation: shaking ? "memberShake 0.45s ease-in-out" : "none" }}
      >
        <div className="relative w-10 h-10 opacity-50">
          <Image src="/assets/icons/avenues-logo.png" alt="Avenues" fill className="object-contain invert" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">Password?</p>
        <form onSubmit={(e) => { e.preventDefault(); attempt(); }} className="flex flex-col items-center gap-3">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-b border-zinc-800 text-white text-center text-sm tracking-[0.3em] w-36 pb-2 focus:outline-none focus:border-zinc-600 caret-[#eb4c60] transition-colors duration-200"
            placeholder="· · · · · ·"
            autoFocus
            autoComplete="off"
          />
          {error && (
            <span className="text-[10px] text-[#eb4c60] uppercase tracking-[0.25em]">Incorrect</span>
          )}
          <button type="submit" className="sr-only">Enter</button>
        </form>
      </div>
    </div>
  );
}

/* ── Project Card ──────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const { name, sector, description, team: projectTeam, outcomes, deliverables, url, repo, accent } = project;

  return (
    <div className="relative flex flex-col border border-white/[0.07] bg-white/[0.02] rounded-sm overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]">
      {/* Accent bar */}
      <div className="h-[2px] w-full shrink-0" style={{ background: accent }} />

      <div className="flex flex-col flex-1 p-6 gap-5">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm"
              style={{ background: `${accent}18`, color: accent }}
            >
              {sector}
            </span>
            <div className="flex items-center gap-2">
              <a href={repo} target="_blank" rel="noopener noreferrer"
                className="text-zinc-700 hover:text-zinc-300 transition-colors duration-150" aria-label={`${name} GitHub`}>
                <IconGitHub className="w-3.5 h-3.5" />
              </a>
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="text-zinc-700 hover:text-zinc-300 transition-colors duration-150" aria-label={`${name} live demo`}>
                <IconExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <h3 className="text-base font-bold text-white leading-tight">{name}</h3>
          <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">{description}</p>
        </div>

        {/* Team */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 mb-2">Team</p>
          <div className="flex flex-wrap gap-1.5">
            {projectTeam.map((t) => (
              <span key={t} className="text-[9px] text-zinc-500 border border-white/[0.07] px-2 py-0.5 rounded-sm">{t}</span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 mb-2">Deliverables</p>
          <ul className="space-y-1">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="shrink-0 w-1 h-1 rounded-full bg-zinc-700 mt-[6px]" />
                <span className="text-[11px] text-zinc-500 leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div className="mt-auto">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 mb-2">Outcomes</p>
          <ul className="space-y-1.5">
            {outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2">
                <IconCheck className="w-3 h-3 shrink-0 mt-0.5" style={{ color: accent }} />
                <span className="text-[11px] text-zinc-400 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-[0.18em] border transition-all duration-200 rounded-sm"
          style={{ borderColor: `${accent}40`, color: accent }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}14`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          View Live
          <IconExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────────── */

export default function MembersPage() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("avenues-member-v1");
    setUnlocked(stored === "1");
  }, []);

  if (unlocked === null) return <div className="min-h-screen bg-black" />;
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-[#08080f]">

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="absolute -top-20 right-0 w-[500px] h-[400px] rounded-full bg-[#eb4c60]/[0.05] blur-[120px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eb4c60] animate-pulse shrink-0" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
              Spring 2026 · Members Only
            </span>
          </div>
          <h1 className="text-[clamp(3.5rem,11vw,8rem)] font-black leading-[0.87] tracking-tighter text-white">
            MEMBER
            <br />
            <span className="text-[#eb4c60]">HUB</span>
          </h1>
        </div>
      </section>

      {/* Active Projects */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Spring &apos;26 Active Projects
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-[9px] text-zinc-700 shrink-0">{PROJECTS.length} clients</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Team Directory */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Team Directory</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        {[
          { label: "Executive",  members: team.executive },
          { label: "Directors",  members: team.directors },
          { label: "Associates", members: team.associates },
        ].map(({ label, members }) => (
          <div key={label} className="mb-5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 mb-2 px-1">{label}</p>
            <div className="border border-white/[0.06]">
              {members.map((member) => (
                <Link
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-all duration-150"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      sizes="28px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {member.role}
                  </span>
                  <svg className="w-3 h-3 text-zinc-800 group-hover:text-[#eb4c60] transition-colors shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Sign out */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 pb-20">
        <button
          onClick={() => {
            sessionStorage.removeItem("avenues-member-v1");
            setUnlocked(false);
          }}
          className="text-[10px] text-zinc-800 hover:text-zinc-500 uppercase tracking-[0.25em] transition-colors duration-200"
        >
          Sign out
        </button>
      </div>

    </div>
  );
}

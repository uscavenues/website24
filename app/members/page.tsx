"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";

const PASSWORD = "as26";

const QUICK_LINKS = [
  { label: "Slack", href: "https://slack.com", desc: "Team comms" },
  { label: "Google Drive", href: "https://drive.google.com", desc: "Files & docs" },
  { label: "Notion", href: "https://notion.so", desc: "Notes & playbooks" },
  { label: "Figma", href: "https://figma.com", desc: "Design assets" },
  { label: "GitHub", href: "https://github.com", desc: "Code repos" },
];

const UPCOMING = [
  { date: "Feb 27", day: "Thu", title: "Weekly All-Hands", time: "7:00 PM", location: "JKP 202" },
  { date: "Mar 6",  day: "Thu", title: "Client Check-ins", time: "6:30 PM", location: "HOH 420" },
  { date: "Mar 13", day: "Thu", title: "Curriculum Night", time: "7:00 PM", location: "JKP 202" },
  { date: "Mar 20", day: "Thu", title: "Mini-Hackathon",   time: "6:00 PM", location: "SAL 101" },
  { date: "Mar 27", day: "Thu", title: "Industry Panel",   time: "7:00 PM", location: "HOH 301" },
  { date: "Apr 10", day: "Thu", title: "Spring Showcase",  time: "6:30 PM", location: "Tutor Campus Center" },
];

const CLIENT_TEAMS = [
  {
    client: "LinkedIn",
    track: "Strategy",
    lead: "Armani C.",
    members: ["Grace L.", "Akash P.", "Cici H.", "Samarth R."],
  },
  {
    client: "AANC",
    track: "Technology & Design",
    lead: "Ariana A.",
    members: ["Allison L.", "Vani S.", "Cynthia S.", "Cherim K."],
  },
  {
    client: "Network of Care",
    track: "Strategy & Tech",
    lead: "Calissa W.",
    members: ["Nate B.", "Rena J.", "Nishitha P.", "Chetan K."],
  },
  {
    client: "Captis Intelligence",
    track: "Design & Technology",
    lead: "Katherine Y.",
    members: ["Akshay M.", "Mistie Z.", "Varenya S."],
  },
];

const ANNOUNCEMENTS = [
  {
    label: "Recruiting",
    text: "Spring '26 recruiting is closed. Applications for Fall '26 open Aug 25.",
    date: "Feb 20",
  },
  {
    label: "Client Teams",
    text: "Client reveal happened Feb 14. Check your email for team assignments.",
    date: "Feb 14",
  },
  {
    label: "Dues",
    text: "Semester dues of $20 due by March 1. Venmo @avenues-usc.",
    date: "Feb 10",
  },
];

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
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
        style={{
          animation: shaking ? "memberShake 0.45s ease-in-out" : "none",
        }}
      >
        <div className="relative w-10 h-10 opacity-50">
          <Image
            src="/assets/icons/avenues-logo.png"
            alt="Avenues"
            fill
            className="object-contain invert"
          />
        </div>

        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          Password?
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            attempt();
          }}
          className="flex flex-col items-center gap-3"
        >
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
            <span className="text-[10px] text-[#eb4c60] uppercase tracking-[0.25em]">
              Incorrect
            </span>
          )}
          <button type="submit" className="sr-only">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

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

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-12">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Announcements
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        <div className="space-y-1.5">
          {ANNOUNCEMENTS.map(({ label, text, date }) => (
            <div
              key={label}
              className="flex items-start gap-4 border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 rounded-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#eb4c60] shrink-0 mt-0.5 w-20">
                {label}
              </span>
              <span className="text-xs text-zinc-400 flex-1 leading-relaxed">{text}</span>
              <span className="text-[10px] text-zinc-700 shrink-0 mt-0.5">{date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Quick Links
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {QUICK_LINKS.map(({ label, href, desc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/[0.08] bg-white/[0.02] p-4 rounded-sm hover:border-[#eb4c60]/30 hover:bg-white/[0.05] transition-all duration-200"
            >
              <div className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors mb-1">
                {label}
              </div>
              <div className="text-[10px] text-zinc-700">{desc}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Upcoming Events
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        <div className="border border-white/[0.07]">
          {UPCOMING.map(({ date, day, title, time, location }) => (
            <div
              key={title}
              className="group flex items-center gap-5 px-5 py-4 border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.025] transition-all duration-200"
            >
              <div className="shrink-0 w-14 text-center">
                <div className="text-[9px] uppercase tracking-[0.1em] text-zinc-700">{day}</div>
                <div className="text-[11px] font-bold text-[#eb4c60]">{date}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {title}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-zinc-500">{time}</div>
                <div className="text-[10px] text-zinc-700 mt-0.5">{location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Spring &apos;26 Client Teams
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {CLIENT_TEAMS.map(({ client, track, lead, members }) => (
            <div
              key={client}
              className="group border border-white/[0.07] bg-white/[0.02] p-5 rounded-sm hover:border-[#eb4c60]/20 hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#eb4c60]/60 mb-2 group-hover:text-[#eb4c60]/80 transition-colors">
                {track}
              </div>
              <div className="text-sm font-bold text-white mb-4">{client}</div>
              <div className="space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-[9px] uppercase tracking-[0.1em] text-zinc-700 w-8 shrink-0">Lead</span>
                  <span className="text-[11px] font-medium text-zinc-300">{lead}</span>
                </div>
                {members.map((m) => (
                  <div key={m} className="flex items-baseline gap-2">
                    <span className="text-[9px] text-zinc-800 w-8 shrink-0">·</span>
                    <span className="text-[11px] text-zinc-500">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-14">
        <div className="mb-5 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
            Team Directory
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        {[
          { label: "Executive", members: team.executive },
          { label: "Directors", members: team.directors },
          { label: "Associates", members: team.associates },
        ].map(({ label, members }) => (
          <div key={label} className="mb-5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 mb-2 px-1">
              {label}
            </p>
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
                  <svg
                    className="w-3 h-3 text-zinc-800 group-hover:text-[#eb4c60] transition-colors shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

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

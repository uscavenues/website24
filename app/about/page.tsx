import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";
import type { TeamMember } from "@/lib/data";

export const metadata = {
  title: "About | Avenues Consulting Group",
  description:
    "Learn about Avenues Consulting Group  -  founded in 2023 at USC to provide pro-bono strategy, technology, and design consulting.",
};

const LinkedInIcon = () => (
  <svg
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function MemberCard({
  member,
  size = "md",
}: {
  member: TeamMember;
  size?: "lg" | "md" | "sm";
}) {
  const imgSize =
    size === "lg" ? "aspect-[3/4]" : size === "sm" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div className="group flex flex-col border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm rounded-sm overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.2)] hover:border-[#eb4c60]/30 hover:bg-white/[0.09] hover:shadow-[0_8px_32px_rgba(235,76,96,0.07)] hover:scale-[1.015] transition-all duration-300">
      {/* Photo */}
      <div className={`relative w-full ${imgSize} overflow-hidden bg-white/[0.03]`}>
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Subtle dark overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080f]/60 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 flex items-start justify-between gap-2 flex-1">
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {member.name}
          </p>
          <p className="text-zinc-500 text-[11px] mt-0.5 leading-tight">{member.role}</p>
        </div>
        <Link
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="shrink-0 text-zinc-500 hover:text-[#eb4c60] transition-colors duration-200 mt-0.5"
        >
          <LinkedInIcon />
        </Link>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────
          1. PAGE HEADER  -  dark hero with dot-texture
      ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16">
        {/* Halftone dot texture */}
        <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
        {/* Top-left glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[400px] rounded-full bg-[#eb4c60]/8 blur-[120px] pointer-events-none" />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          {/* Eyebrow */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6">
            Avenues Consulting Group · USC
          </p>

          {/* Giant heading */}
          <h1 className="text-[clamp(4.5rem,14vw,12rem)] font-black leading-[0.86] tracking-tighter text-white">
            ABOUT
          </h1>

          {/* Pink accent line */}
          <div className="w-20 h-1 bg-[#eb4c60] mt-6 mb-8" />

          {/* Subtitle */}
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
            A student organization built from the ground up  -  on the belief that
            real-world project experience shouldn&apos;t be gated by prestige or access.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          2. OUR BEGINNINGS  -  two-column editorial
      ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
            Our Beginnings
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left  -  founding story text */}
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black text-white leading-[1.05] tracking-tight mb-8">
              Built by students,
              <br />
              <span className="text-[#eb4c60]">for students.</span>
            </h2>

            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                Founded in 2023 by students who recognized a gap: USC&apos;s consulting
                landscape lacked meaningful opportunities for hands-on project work.
                Most orgs were case-prep focused. Avenues was built to be different.
              </p>
              <p>
                Since then, Avenues has grown threefold and acquired{" "}
                <span className="text-white font-semibold">20+ clients</span>  -  from
                Fortune 500 companies and non-profits to early-stage startups  -  within
                two years of founding.
              </p>
              <p>
                Every engagement is pro bono. Every project is real.
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-10 mt-12 pt-8 border-t border-white/[0.05]">
              {[
                { n: "2023", label: "Founded" },
                { n: "20+", label: "Clients" },
                { n: "3×", label: "Growth" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black text-white tracking-tight">{n}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 tracking-[0.2em] uppercase">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right  -  cohort photo */}
          <div className="relative">
            {/* Accent border offset */}
            <div className="absolute -top-3 -right-3 w-full h-full border border-[#eb4c60]/15 rounded-sm pointer-events-none" />
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-white/[0.03]">
              <Image
                src="/assets/photos/founders.jpg"
                alt="Avenues founding cohort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080f]/40 via-transparent to-transparent" />
            </div>
            {/* Caption */}
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Spring &apos;26 Cohort · USC
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. OUR MISSION  -  two-column with pink divider
      ───────────────────────────────────────────── */}
      <section className="relative border-y border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 dot-texture-subtle opacity-60 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-24">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
              Our Mission
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-0">
            {/* Left column  -  clients */}
            <div className="md:pr-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-5">
                For our clients
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-6">
                Pro bono project-building across strategy, technology, and design.
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                We work with organizations of every size  -  from startups finding product-market
                fit to non-profits scaling their impact. No fees, ever. Just rigorous, student-driven work.
              </p>
            </div>

            {/* Pink vertical divider */}
            <div className="hidden md:block w-px bg-[#eb4c60]/30 mx-auto self-stretch" />

            {/* Right column  -  consultants */}
            <div className="md:pl-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-5">
                For our consultants
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-6">
                A space to collaborate, build, learn, and grow professionally.
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Regardless of your goals  -  consulting, tech, design, or beyond  -  Avenues is a
                place to do real work alongside people who take it seriously. No experience required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. TEAM SECTION
      ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eb4c60]">
            The Team
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        {/* ── EXECUTIVE ── */}
        <div className="mb-20">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500 mb-8">
            Executive
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm md:max-w-md">
              {team.executive.map((member) => (
                <MemberCard key={member.name} member={member} size="lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-white/[0.04] mb-20" />

        {/* ── DIRECTORS ── */}
        <div className="mb-20">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500 mb-8">
            Directors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {team.directors.map((member) => (
              <MemberCard key={member.name} member={member} size="md" />
            ))}
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-white/[0.04] mb-20" />

        {/* ── ASSOCIATES ── */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-500 mb-8">
            Associates
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {team.associates.map((member) => (
              <MemberCard key={member.name} member={member} size="sm" />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. BOTTOM CTA BAND
      ───────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 dot-texture opacity-25 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
              Get involved
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Want to join
              <br />
              <span className="text-[#eb4c60]">our team?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/apply"
              className="bg-[#eb4c60] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
            >
              Apply now
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/[0.1] text-zinc-400 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white transition-colors duration-200"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Halftone dot texture */}
        <div className="absolute inset-0 dot-texture opacity-50 pointer-events-none" />
        {/* Top pink glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#eb4c60]/10 blur-[140px] pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080f]/80 via-transparent to-[#08080f] pointer-events-none" />
        {/* Cohort photo — very subtle */}
        <div className="absolute inset-0">
          <Image
            src="/assets/photos/home.jpg"
            alt="Avenues cohort"
            fill
            className="object-cover opacity-[0.07]"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-28 pb-20 w-full">
          {/* Status badge */}
          <div className="mb-8 animate-slide-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#eb4c60] animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-500">
                Spring &apos;26 — Active Engagements
              </span>
            </div>
          </div>

          {/* Giant title */}
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.88] tracking-tighter text-white mb-8 animate-fade-up">
            AVENUES
            <br />
            <span className="text-[#eb4c60]">CONSULTING</span>
            <br />
            GROUP
          </h1>

          <p className="max-w-lg text-zinc-400 text-lg leading-relaxed mb-10 animate-fade-up delay-2">
            USC&apos;s premier student-run consulting group. Pro-bono,
            multidisciplinary project-building across strategy, technology, and
            design.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 animate-fade-up delay-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
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
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 border border-white/[0.12] text-white px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:border-white/30 hover:bg-white/[0.04] transition-colors duration-200"
            >
              Apply to join
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-8 md:gap-14 mt-16 pt-10 border-t border-white/[0.05] animate-fade-up delay-4">
            {[
              { n: "20+", label: "Clients Served" },
              { n: "3", label: "Disciplines" },
              { n: "F'23", label: "Established" },
              { n: "Pro Bono", label: "Always Free" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-white tracking-tight">
                  {n}
                </div>
                <div className="text-[10px] text-zinc-700 mt-0.5 tracking-[0.2em] uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-700">
            What We Do
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

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
          ].map(({ tag, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="group relative border border-white/[0.06] bg-white/[0.02] rounded-sm p-8 overflow-hidden hover:border-[#eb4c60]/25 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-[10px] font-mono text-zinc-800 group-hover:text-[#eb4c60]/40 transition-colors">
                {tag}
              </div>
              <div className="w-5 h-px bg-[#eb4c60] mb-6 group-hover:w-8 transition-all duration-300" />
              <h3 className="text-base font-bold text-white mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── COHORT PHOTO STRIP ── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-24">
        <div className="relative rounded-sm overflow-hidden aspect-[16/7]">
          <Image
            src="/assets/photos/home.jpg"
            alt="Avenues Spring '26 cohort"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
              Spring &apos;26 Cohort
            </p>
            <p className="text-sm text-zinc-300">Avenues Consulting Group · USC</p>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 dot-texture opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700 mb-3">
              Get Involved
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to build
              <br />
              <span className="text-[#eb4c60]">something real?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="bg-[#eb4c60] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors"
            >
              Partner with us
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/[0.1] text-zinc-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:border-white/25 hover:text-white transition-colors"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Work With Us | Avenues Consulting Group",
  description:
    "Partner with Avenues Consulting Group for pro-bono strategy, technology, and design consulting. Contact us to get started.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 dot-texture opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] rounded-full bg-[#eb4c60]/10 blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080f] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#eb4c60]">
              Get In Touch
            </span>
          </div>
          <h1 className="text-[clamp(2.2rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-white">
            WORK
            <br />
            <span className="text-[#eb4c60]">WITH</span>
            <br />
            US
          </h1>
          <p className="mt-6 max-w-lg text-zinc-500 text-sm leading-relaxed">
            We are always looking for organizations ready to build something
            meaningful. Reach out and let&apos;s talk.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* ── LEFT: info ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-start pt-2">
            {/* Divider line */}
            <div className="w-8 h-px bg-[#eb4c60] mb-8" />

            <h2 className="text-xl font-bold text-white tracking-tight mb-5 leading-snug">
              A multidisciplinary approach
              <br />
              <span className="text-zinc-500 font-normal">
                to real-world problems.
              </span>
            </h2>

            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Avenues is dedicated to finding solutions through the combined
              lens of strategy, technology, and design. We can help you plan,
              build, and communicate  -  entirely pro-bono. No invoices. No
              catch.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed mb-10">
              Contact us directly at{" "}
              <a
                href="mailto:uscavenues@gmail.com"
                className="text-zinc-300 underline underline-offset-2 decoration-white/15 hover:text-[#eb4c60] hover:decoration-[#eb4c60]/40 transition-colors duration-200"
              >
                uscavenues@gmail.com
              </a>{" "}
              or use the form  -  we typically respond within 48 hours.
            </p>

            {/* Client packet download */}
            <Link
              href="/avenues-client-packet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/[0.1] hover:border-[#eb4c60]/30 bg-white/[0.02] hover:bg-white/[0.04] rounded-sm px-6 py-4 transition-all duration-200 w-fit"
            >
              {/* PDF icon */}
              <div className="shrink-0 w-8 h-8 rounded-sm border border-white/[0.08] bg-white/[0.04] flex items-center justify-center group-hover:border-[#eb4c60]/25 transition-colors">
                <svg
                  className="w-4 h-4 text-zinc-500 group-hover:text-[#eb4c60] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-[#eb4c60] transition-colors duration-200 tracking-tight">
                  Client Packet
                </p>
                <p className="text-[10px] text-zinc-700 mt-0.5">
                  Download PDF  -  Services overview
                </p>
              </div>
              <svg
                className="w-3.5 h-3.5 text-zinc-700 group-hover:text-[#eb4c60] ml-auto transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Link>

            {/* Social links */}
            <div className="mt-12 pt-8 border-t border-white/[0.05]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-4">
                Follow along
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/uscavenues/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-xs font-medium">@uscavenues</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/avenues-consulting-group-usc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: contact form ─────────────────────────────────────── */}
          <div>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-0"
            >
              {/* Web3Forms access key */}
              <input
                type="hidden"
                name="access_key"
                value="112ef749-545a-4476-9b70-3fccfea07740"
              />
              {/* Redirect after submit */}
              <input
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              {/* Honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />

              {/* Form label */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700 mb-1">
                  Contact Form
                </p>
                <div className="h-px bg-white/[0.05]" />
              </div>

              {/* Name */}
              <div className="pb-1">
                <label
                  htmlFor="name"
                  className="block text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-3"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-700 py-3 text-sm w-full transition-colors duration-200"
                />
              </div>

              <div className="h-6" />

              {/* Email */}
              <div className="pb-1">
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-3"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-700 py-3 text-sm w-full transition-colors duration-200"
                />
              </div>

              <div className="h-6" />

              {/* Company */}
              <div className="pb-1">
                <label
                  htmlFor="company"
                  className="block text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-3"
                >
                  Company / Organization
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  placeholder="Acme Corp"
                  className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-700 py-3 text-sm w-full transition-colors duration-200"
                />
              </div>

              <div className="h-6" />

              {/* Message */}
              <div className="pb-1">
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your organization and what you're looking to accomplish..."
                  className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-700 py-3 text-sm w-full transition-colors duration-200 resize-none"
                />
              </div>

              <div className="h-10" />

              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-[#eb4c60] hover:bg-[#d43d50] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-colors duration-200"
              >
                Send Message
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
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
              </button>

              <p className="mt-4 text-[10px] text-zinc-800">
                We typically respond within 48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── INFO STRIP ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: "Email",
                value: "uscavenues@gmail.com",
                href: "mailto:uscavenues@gmail.com",
              },
              {
                label: "Instagram",
                value: "@uscavenues",
                href: "https://www.instagram.com/uscavenues/",
              },
              {
                label: "Location",
                value: "University of Southern California",
                href: null,
              },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 mb-1.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-zinc-400">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

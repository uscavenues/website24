"use client";
import { useState } from "react";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const emailValue = (new FormData(form)).get("email") as string;
    if (!emailValue || !emailValue.includes("@") || !emailValue.includes(".")) {
      setError("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }
    const data = new FormData(form);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "112ef749-545a-4476-9b70-3fccfea07740");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us directly at uscavenues@gmail.com");
      }
    } catch {
      setError("Network error. Please email us directly at uscavenues@gmail.com");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start justify-center py-16 gap-4">
        <div className="w-8 h-px bg-[#eb4c60] mb-4" />
        <h3 className="text-2xl font-black text-white tracking-tight">We&apos;ll be in touch.</h3>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
          Expect a response within 48 hours. In the meantime, check out our{" "}
          <a href="/portfolio" className="text-[#eb4c60] hover:underline">
            portfolio
          </a>{" "}
          to see examples of our work.
        </p>
        <button
          onClick={() => { setSubmitted(false); setError(""); }}
          className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      {/* Form label */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1">Contact Form</p>
        <div className="h-px bg-white/[0.05]" />
      </div>

      {/* Name */}
      <div className="pb-1">
        <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          autoComplete="name"
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200"
        />
      </div>
      <div className="h-6" />

      {/* Email */}
      <div className="pb-1">
        <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          autoComplete="email"
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200"
        />
      </div>
      <div className="h-6" />

      {/* Company */}
      <div className="pb-1">
        <label htmlFor="company" className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
          Company / Organization
        </label>
        <input
          id="company"
          type="text"
          name="company"
          placeholder="Organization or startup"
          autoComplete="organization"
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200"
        />
      </div>
      <div className="h-6" />

      {/* Engagement type */}
      <div className="pb-1">
        <label htmlFor="engagement_type" className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
          Practice Area
        </label>
        <div className="relative">
          <select
            id="engagement_type"
            name="engagement_type"
            required
            className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white py-3 text-sm w-full transition-colors duration-200 appearance-none cursor-pointer pr-8"
            defaultValue=""
          >
            <option value="" disabled className="bg-[#08080f] text-zinc-500">Select a practice area...</option>
            <option value="strategy" className="bg-[#08080f]">Strategy — Go-to-market, research, planning</option>
            <option value="technology" className="bg-[#08080f]">Technology — Web dev, data, product</option>
            <option value="design" className="bg-[#08080f]">Design — Brand, UI/UX, visual identity</option>
            <option value="multiple" className="bg-[#08080f]">Multiple areas — Comprehensive engagement</option>
            <option value="unsure" className="bg-[#08080f]">Not sure yet — Let&apos;s figure it out together</option>
          </select>
          <span className="pointer-events-none absolute right-0 bottom-3 text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
      <div className="h-6" />

      {/* Message */}
      <div className="pb-1">
        <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="What are you working on, and how can Avenues help?"
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200 resize-y"
        />
      </div>
      <div className="h-10" />

      {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-3 bg-[#eb4c60] hover:bg-[#d43d50] disabled:opacity-60 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-colors duration-200"
      >
        {submitting ? (
          <>
            <span className="inline-block w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

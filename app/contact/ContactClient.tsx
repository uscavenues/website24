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
    const data = new FormData(form);
    data.append("access_key", "112ef749-545a-4476-9b70-3fccfea07740");
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
        <h3 className="text-2xl font-black text-white tracking-tight">Message received.</h3>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
          We&apos;ll be in touch within 48 hours. In the meantime, check out our{" "}
          <a href="/portfolio" className="text-[#eb4c60] hover:underline">
            portfolio
          </a>{" "}
          to see examples of our work.
        </p>
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
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200"
        />
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
          placeholder="What are you working on, and how can Avenues help?"
          className="bg-transparent border-b border-white/[0.12] hover:border-[#eb4c60]/50 focus:border-[#eb4c60] outline-none text-white placeholder:text-zinc-600 py-3 text-sm w-full transition-colors duration-200 resize-none"
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
        {submitting ? "Sending..." : "Send Message"}
        {!submitting && (
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" />
      <div className="relative z-10 text-center px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#eb4c60] mb-4">Something went wrong</p>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          Unexpected error.
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          An error occurred while loading this page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/[0.1] text-zinc-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:text-white hover:border-white/20 transition-colors duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

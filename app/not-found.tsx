import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Avenues",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-texture opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#eb4c60]/6 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <span className="text-[clamp(6rem,20vw,16rem)] font-black leading-none tracking-tighter text-white/[0.04] select-none block">
          404
        </span>
        <div className="-mt-8 md:-mt-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#eb4c60] mb-4">Page Not Found</p>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            The page you&apos;re looking for may have moved or never existed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#eb4c60] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-[#d43d50] transition-colors duration-200"
            >
              Go Home
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-white/[0.1] text-zinc-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:text-white hover:border-white/20 transition-colors duration-200"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

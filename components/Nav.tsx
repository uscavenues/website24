"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/apply", label: "Apply" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Work With Us" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080f]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/assets/icons/whitelogo.png"
            alt="Avenues"
            width={30}
            height={30}
            className="opacity-90"
          />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hidden sm:block">
            Avenues
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3.5 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase rounded-sm transition-colors duration-200 ${
                pathname === href
                  ? "text-[#eb4c60]"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-[5px]">
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                open ? "translate-y-[6px] rotate-45 w-5" : "w-5"
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                open ? "opacity-0 w-0" : "w-3"
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                open ? "-translate-y-[6px] -rotate-45 w-5" : "w-5"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-b border-white/[0.06] bg-[#08080f]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 py-4 px-6" : "max-h-0"
        }`}
      >
        <div className="space-y-0.5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors ${
                pathname === href
                  ? "text-[#eb4c60]"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

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
  const [isHidden, setIsHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerThreshold = docHeight - windowHeight - 180;
      if (scrollY < 60) {
        setIsHidden(true);
      } else if (scrollY > footerThreshold) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ transform: isHidden ? "translateY(-110%)" : "translateY(0)" }}
    >
      <div className="bg-[#08080f]/90 backdrop-blur-md border-b border-white/[0.06]">
        <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/assets/icons/avenues-logo.png" alt="Avenues" width={28} height={28} className="opacity-90" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-300 hidden sm:block">Avenues</span>
          </Link>
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase rounded-sm transition-colors duration-200 ${pathname === href ? "text-[#eb4c60]" : "text-zinc-400 hover:text-white"}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white p-1 transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className="w-5 space-y-[5px]">
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "translate-y-[6px] rotate-45 w-5" : "w-5"}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 w-0" : "w-3"}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45 w-5" : "w-5"}`} />
            </div>
          </button>
        </nav>
      </div>
      <div className={`md:hidden border-b border-white/[0.06] bg-[#08080f]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${open ? "max-h-96 py-4 px-6" : "max-h-0"}`}>
        <div className="space-y-0.5">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`block py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors ${pathname === href ? "text-[#eb4c60]" : "text-zinc-400 hover:text-white"}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

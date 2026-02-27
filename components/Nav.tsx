"use client";

import { useReducer, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/apply", label: "Apply" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

type NavState = { isHidden: boolean };
type NavAction = { type: "SET_HIDDEN"; hidden: boolean };

function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case "SET_HIDDEN":
      return { isHidden: action.hidden };
    default:
      return state;
  }
}

/** Mobile menu extracted into its own component so key={pathname} resets its local open state */
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useReducer((s: boolean) => !s, false);

  return (
    <>
      <button
        className="md:hidden text-zinc-400 hover:text-white p-2.5 -mr-2.5 transition-colors"
        onClick={setOpen}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <div className="w-5 space-y-[5px]">
          <span className={`block h-px bg-current transition-all duration-300 ${open ? "translate-y-[6px] rotate-45 w-5" : "w-5"}`} />
          <span className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 w-0" : "w-3"}`} />
          <span className={`block h-px bg-current transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45 w-5" : "w-5"}`} />
        </div>
      </button>
      <div className={`md:hidden border-b border-white/[0.06] bg-[#08080f]/95 backdrop-blur-md overflow-hidden transition-all duration-300 absolute top-full inset-x-0 ${open ? "max-h-96 py-4 px-6" : "max-h-0"}`}>
        <div className="space-y-0.5">
          {links.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`block py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${pathname === href ? "text-[#eb4c60]" : "text-zinc-400 hover:text-white"}`}
              style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/members"
            className={`block py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} ${pathname === "/members" ? "text-[#eb4c60]" : "text-zinc-500 hover:text-white"}`}
            style={{ transitionDelay: open ? `${links.length * 35}ms` : "0ms" }}
          >
            Members
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Nav() {
  const [{ isHidden }, dispatch] = useReducer(navReducer, { isHidden: true });
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerThreshold = docHeight - windowHeight - 180;
      const topThreshold = pathname === "/" ? Math.round(windowHeight * 3.4) : 40;
      const hidden = scrollY < topThreshold || scrollY > footerThreshold;
      dispatch({ type: "SET_HIDDEN", hidden });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        transform: isHidden ? "translateY(-110%)" : "translateY(0)",
        opacity: isHidden ? 0 : 1,
      }}
    >
      <div className="bg-[#08080f]/55 backdrop-blur-2xl border-b border-white/[0.09]">
        <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo wordmark */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="relative inline-block shrink-0 w-[20px] h-[20px]">
              <Image
                src="/assets/icons/avenues-logo.png"
                alt="A"
                fill
                sizes="20px"
                className="object-contain invert opacity-90"
              />
            </span>
            <span className="font-semibold tracking-[0.13em] uppercase text-zinc-300 text-[11px] hidden sm:block" style={{ marginLeft: "-4px" }}>VENUES</span>
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

          {/* Members button */}
          <Link
            href="/members"
            className={`ml-2 inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-sm transition-colors duration-200 ${pathname === "/members" ? "border-[#eb4c60]/40 text-[#eb4c60] bg-[#eb4c60]/[0.06]" : "border-white/[0.1] bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20"}`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Members
          </Link>

          {/* key={pathname} causes MobileMenu to remount on every route change, resetting open state */}
          <MobileMenu key={pathname} pathname={pathname} />
        </nav>
      </div>
    </header>
  );
}

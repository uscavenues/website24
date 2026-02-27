"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";

/**
 * Two-phase directional wipe:
 *   Cover  — scaleX 0→1, origin left  (grows left → right)
 *   Reveal — scaleX 1→0, origin right (retreats right → left)
 *
 * Cover fires on click (before navigation).
 * Reveal fires from onCoverComplete (zero state-machine race conditions).
 *
 * Previous bug: reveal was triggered by a pathname useEffect, which could
 * arrive before setCovering(false) committed → stuck on full red screen.
 * Fix: reveal is always triggered directly from the cover's onAnimationComplete.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const [covering,  setCovering]  = useState(false);
  const [revealing, setRevealing] = useState(false);

  const pending    = useRef<string | null>(null);
  const activePath = useRef(pathname);
  const inFlight   = useRef(false);

  // Keep activePath in sync (used for same-page check)
  useEffect(() => { activePath.current = pathname; }, [pathname]);

  // Intercept internal anchor clicks before Next.js's router
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inFlight.current) return;

      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;
      if (/^(https?:|\/\/|mailto:|tel:|#)/.test(href)) return;
      if (anchor.getAttribute("target") === "_blank") return;

      try {
        const target = new URL(href, location.href).pathname;
        if (target === activePath.current) return;
      } catch { return; }

      // Block Next.js Link's router.push (it checks e.defaultPrevented)
      e.preventDefault();

      inFlight.current = true;
      pending.current  = href;
      setCovering(true);
    };

    document.addEventListener("click", handler, true); // capture phase
    return () => document.removeEventListener("click", handler, true);
  }, []);

  // Cover is done → navigate, then immediately start reveal
  const onCoverComplete = useCallback(() => {
    setCovering(false);
    if (pending.current) {
      router.push(pending.current);
      pending.current = null;
    }
    // Reveal fires here — not from a pathname useEffect, so no race condition
    setRevealing(true);
  }, [router]);

  // Reveal is done → reset
  const onRevealComplete = useCallback(() => {
    setRevealing(false);
    inFlight.current = false;
  }, []);

  return (
    <LazyMotion features={domAnimation}>
    <>
      {/* Cover: grows from left */}
      {covering && (
        <m.div
          className="fixed inset-0 z-[200] bg-[#eb4c60] pointer-events-none"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "left center" }}
          onAnimationComplete={onCoverComplete}
        />
      )}

      {/* Reveal: retreats to right */}
      {revealing && (
        <m.div
          className="fixed inset-0 z-[200] bg-[#eb4c60] pointer-events-none"
          aria-hidden="true"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "right center" }}
          onAnimationComplete={onRevealComplete}
        />
      )}

      {children}
    </>
    </LazyMotion>
  );
}

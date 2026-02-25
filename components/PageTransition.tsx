"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Two-phase wipe transition:
 *   Phase 1 "covering"  — wipe grows left→right (scaleX 0→1) BEFORE navigation
 *   Phase 2 "covered"   — screen is red; router.push fires; new page renders hidden
 *   Phase 3 "revealing" — wipe retreats right→left (scaleX 1→0) revealing new page
 *
 * We intercept anchor clicks in capture phase and call e.preventDefault() so that
 * Next.js Link (which checks e.defaultPrevented before navigating) does nothing.
 * We then manually call router.push after the cover completes.
 */

type Phase = "idle" | "covering" | "covered" | "revealing";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const pending    = useRef<string | null>(null);
  const activePath = useRef(pathname);

  // ── Step 1: intercept clicks before Next.js sees them ──────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (phase !== "idle") return;

      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      // Skip external, hash, protocol links and new-tab targets
      if (/^(https?:|\/\/|mailto:|tel:|#)/.test(href)) return;
      if (anchor.getAttribute("target") === "_blank") return;

      // Skip same-page navigation
      try {
        const target = new URL(href, window.location.href).pathname;
        if (target === activePath.current) return;
      } catch { return; }

      // Block Next.js Link's built-in navigation (it checks defaultPrevented)
      e.preventDefault();

      pending.current = href;
      setPhase("covering");
    };

    // Capture phase → runs before React's synthetic events
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [phase]);

  // ── Step 2: once the pathname actually changes, start reveal ────────────
  useEffect(() => {
    if (pathname !== activePath.current) {
      activePath.current = pathname;
      if (phase === "covered") setPhase("revealing");
    }
  }, [pathname, phase]);

  // ── Animation callbacks ─────────────────────────────────────────────────
  const onAnimComplete = useCallback(() => {
    if (phase === "covering") {
      // Screen fully covered — safe to navigate; user sees nothing change
      setPhase("covered");
      if (pending.current) {
        router.push(pending.current);
        pending.current = null;
      }
    } else if (phase === "revealing") {
      setPhase("idle");
    }
  }, [phase, router]);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {phase !== "idle" && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#eb4c60] pointer-events-none"
          aria-hidden="true"
          // Cover starts collapsed, reveal starts full
          initial={{ scaleX: phase === "covering" ? 0 : 1 }}
          animate={{ scaleX: phase === "revealing" ? 0 : 1 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          style={{
            // Grows from left while covering, retreats from right while revealing
            transformOrigin: phase === "covering" ? "left center" : "right center",
          }}
          onAnimationComplete={onAnimComplete}
        />
      )}
      {children}
    </>
  );
}

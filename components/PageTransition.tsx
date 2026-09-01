"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BASE_PATH } from "@/lib/basePath";
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
  const watchdog   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep activePath in sync (used for same-page check)
  useEffect(() => { activePath.current = pathname; }, [pathname]);

  // Intercept internal anchor clicks before Next.js's router
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inFlight.current) return;

      // Same escape hatches next/link applies. Without these the capture
      // listener cancels the default before Link ever sees the event, so
      // cmd/ctrl/shift-click could not open a link in a new tab.
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;
      if (/^(https?:|\/\/|mailto:|tel:|#)/.test(href)) return;

      // The DOM href is basePath-prefixed (next/link bakes it in), but the
      // router and usePathname both work in basePath-stripped space, and
      // router.push re-adds it. Normalise to router space once, here, or we
      // push /website24/website24/... and land on 404.html.
      let routerPath: string;
      try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return;
        const p = url.pathname;
        routerPath = BASE_PATH
          ? (p === BASE_PATH || p.startsWith(BASE_PATH + "/"))
            ? p.slice((BASE_PATH as string).length) || "/"
            : p
          : p;
        if (routerPath === activePath.current) return;
        routerPath += url.search + url.hash;
      } catch { return; }

      // Block Next.js Link's router.push (it checks e.defaultPrevented)
      e.preventDefault();

      inFlight.current = true;
      pending.current  = routerPath;
      setCovering(true);

      // framer-motion drives the wipe on rAF, which the browser pauses in a
      // background tab — onAnimationComplete then never fires, navigation is
      // lost and inFlight stays true, killing every subsequent link. Force the
      // navigation through if the animation has not reported back in time.
      if (watchdog.current) clearTimeout(watchdog.current);
      watchdog.current = setTimeout(() => {
        if (!inFlight.current) return;
        const href = pending.current;
        pending.current = null;
        setCovering(false);
        setRevealing(false);
        inFlight.current = false;
        if (href) router.push(href);
      }, 1200);
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
    if (watchdog.current) { clearTimeout(watchdog.current); watchdog.current = null; }
    setRevealing(false);
    inFlight.current = false;
  }, []);

  // Clear any pending watchdog on unmount
  useEffect(() => () => { if (watchdog.current) clearTimeout(watchdog.current); }, []);

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

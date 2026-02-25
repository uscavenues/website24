"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [wipeId, setWipeId] = useState(0);
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;
      setWipeId((n) => n + 1);
    }
  }, [pathname]);

  return (
    <>
      {/*
        Wipe lives at this level — NOT inside any motion.div with opacity/transform.
        This ensures position:fixed is relative to the viewport, not a stacking context.
      */}
      <AnimatePresence>
        <motion.div
          key={wipeId}
          className="fixed inset-0 z-[200] bg-[#eb4c60] pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{
            duration: 0.7,
            times: [0, 0.38, 0.62, 1],
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ transformOrigin: "left center" }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Page content — simple crossfade */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

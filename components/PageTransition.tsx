"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} className="relative">
        {/* Crimson wipe — sweeps in from left, holds, sweeps out to right */}
        <motion.div
          className="fixed inset-0 z-[200] bg-[#eb4c60] origin-left pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.65,
            times: [0, 0.4, 0.6, 1],
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left" }}
        />
        {/* Page content fades in after wipe completes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.45 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

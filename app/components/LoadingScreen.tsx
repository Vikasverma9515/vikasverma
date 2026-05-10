"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const next = p + Math.floor(Math.random() * 12) + 5;
        if (next >= 100) { clearInterval(id); return 100; }
        return next;
      });
    }, 50);
    const t = setTimeout(() => setDone(true), 1800);
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center select-none"
        >
          {/* Giant italic name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="italic text-[#e1e0cc] leading-none mb-10"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(64px, 13vw, 144px)",
            }}
          >
            Vikas
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-44 h-px bg-white/8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#e1e0cc]"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "linear", duration: 0.04 }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] font-mono text-[#e1e0cc] mt-3 tracking-[0.35em] tabular-nums"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {String(pct).padStart(3, "0")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

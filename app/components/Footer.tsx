"use client";
import { motion } from "framer-motion";

const ticker =
  "AI Engineer · RAG Pipelines · LangChain · LangGraph · FastAPI · Next.js · Supabase · Full-Stack · LLM Builder · Agentic Workflows · BlindCharm Founder · ";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 overflow-hidden">
      {/* Marquee strip */}
      <div className="py-3 border-b border-white/[0.04] overflow-hidden">
        <div className="flex whitespace-nowrap select-none">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="marquee inline-block text-xs uppercase tracking-[0.15em] text-[#e1e0cc]/10 font-mono"
              aria-hidden={k === 1}
            >
              {ticker.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-[5vw] py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          {/* Big italic name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="leading-none italic text-[#e1e0cc] hover:text-white transition-colors duration-500"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(40px, 9vw, 110px)",
              }}
            >
              Vikas
            </p>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2 md:text-right"
          >
            <a
              href="mailto:vikasverma951582@gmail.com"
              className="block text-[11px] font-mono text-[#e1e0cc]/25 hover:text-[#e1e0cc]/60 transition-colors tracking-wider"
            >
              vikasverma951582@gmail.com
            </a>
            <a
              href="tel:+916302206340"
              className="block text-[11px] font-mono text-[#e1e0cc]/25 hover:text-[#e1e0cc]/60 transition-colors tracking-wider"
            >
              +91 6302206340
            </a>
            <p className="text-[10px] font-mono text-[#e1e0cc]/15 tracking-widest uppercase">
              Hyderabad, Telangana · India
            </p>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#e1e0cc]/15 font-mono">
            © 2026 Vikas Verma · Built with rigor &amp; caffeine
          </p>
          <div className="flex gap-6">
            {[
              { l: "GitHub",   h: "https://github.com/Vikasverma9515" },
              { l: "LinkedIn", h: "https://www.linkedin.com/in/vikas-verma-264103275" },
              { l: "Email",    h: "mailto:vikasverma951582@gmail.com" },
            ].map(({ l, h }) => (
              <a
                key={l}
                href={h}
                target={h.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-[0.2em] text-[#e1e0cc]/15 hover:text-[#e1e0cc]/50 transition-colors font-mono"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

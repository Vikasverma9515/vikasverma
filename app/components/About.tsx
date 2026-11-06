"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <section id="about" ref={ref} className="py-32 px-[6vw] bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Two column: giant left heading + right text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">

          {/* LEFT: big heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h2
              className="font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#e1e0cc]"
              style={{
                fontFamily: "var(--font-almarai), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 7rem)",
              }}
            >
              From Idea
              <br />
              To Execution,
              <br />
              <span className="text-[#FFE500]">I Build AI</span>
              <br />
              That Actually
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px rgba(225,224,204,0.22)",
                  color: "transparent",
                }}
              >
                Works.
              </span>
            </h2>
          </motion.div>

          {/* RIGHT: description + stats */}
          <motion.div
            className="lg:pt-6 space-y-10"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <p
              className="text-xl text-[#e1e0cc]/55 leading-relaxed"
              style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
            >
              I help you go from a wild idea to a deployed, working product —
              with AI that understands context, voice agents that feel human,
              and full-stack systems that actually scale.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { label: "AI & Agentic Systems", desc: "RAG pipelines, multi-agent workflows, LLM evaluation" },
                { label: "Voice Agents",          desc: "Real-time STT/TTS, sub-second latency, LangGraph routing" },
                { label: "Full-Stack Products",   desc: "Next.js → FastAPI → Supabase → deployed in days" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-white/6 last:border-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FFE500] mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#e1e0cc]/90 uppercase tracking-wide">{item.label}</p>
                    <p className="text-xs text-[#e1e0cc]/35 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/5 text-[10px] uppercase tracking-widest text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to work — Hyderabad · India
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-24 border border-white/8 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
        >
          {[
            { n: "2+",   l: "Years building",       accent: false },
            { n: "10+",  l: "AI products shipped",   accent: true  },
            { n: "500+", l: "BlindCharm users",      accent: false },
            { n: "15%",  l: "LLM eval improvement",  accent: false },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a09] p-8 flex flex-col gap-2 hover:bg-[#111] transition-colors">
              <span
                className={`text-4xl md:text-5xl font-black leading-none ${s.accent ? "text-[#FFE500]" : "text-[#e1e0cc]"}`}
                style={{ fontFamily: "var(--font-almarai), sans-serif" }}
              >
                {s.n}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#e1e0cc]/30">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LogoLoop from "./react-bits/LogoLoop";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TECH_STACK = [
  { name: "Python",     color: "#3b82f6" },
  { name: "TypeScript", color: "#6366f1" },
  { name: "Next.js",    color: "#e1e0cc" },
  { name: "LangChain",  color: "#a855f7" },
  { name: "FastAPI",    color: "#10b981" },
  { name: "LangGraph",  color: "#f59e0b" },
  { name: "OpenAI",     color: "#e1e0cc" },
  { name: "Supabase",   color: "#22c55e" },
  { name: "Docker",     color: "#38bdf8" },
  { name: "AWS",        color: "#f59e0b" },
  { name: "FAISS",      color: "#f43f5e" },
  { name: "Redis",      color: "#f43f5e" },
];

const HOW_I_WORK = [
  { n: "01", step: "Understand the problem deeply before touching code" },
  { n: "02", step: "Prototype fast — validate before building big" },
  { n: "03", step: "Ship incrementally, iterate with real feedback" },
  { n: "04", step: "Document for future-me, not just present-me" },
];

const BUILDING_NOW = [
  { title: "Voice Agent Platform",  desc: "Real-time AI phone agents with sub-100ms latency", tag: "In Progress" },
  { title: "RAG Evaluation Suite",  desc: "Automated quality benchmarks for LLM pipelines",   tag: "Building" },
  { title: "BlindCharm v2",         desc: "AI-powered dating app with 500+ active users",      tag: "Shipped" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="skills" ref={ref} className="py-32 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[6vw]">

        {/* ── Section label ── */}
        <motion.p
          className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/30 font-mono mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Stack & Work
        </motion.p>

        {/* ── Tech marquee ── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <LogoLoop items={TECH_STACK} speed={40} direction="left" gap={16} />
        </motion.div>

        {/* ── Widget cards row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1: What I'm Building */}
          <motion.div
            className="rounded-3xl bg-[#0d0d0b] border border-white/8 p-7 flex flex-col gap-5 hover:border-white/14 transition-colors"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35 font-mono">What I&apos;m Building</p>
              <span className="w-2 h-2 rounded-full bg-[#FFE500] animate-pulse" />
            </div>

            <div className="space-y-4 flex-1">
              {BUILDING_NOW.map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-[#e1e0cc]/85">{item.title}</p>
                    <span
                      className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: item.tag === "Shipped" ? "rgba(34,197,94,0.1)" : "rgba(255,229,0,0.08)",
                        color: item.tag === "Shipped" ? "#22c55e" : "#FFE500",
                        border: `1px solid ${item.tag === "Shipped" ? "rgba(34,197,94,0.2)" : "rgba(255,229,0,0.2)"}`,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#e1e0cc]/30">{item.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="https://github.com/Vikasverma9515"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-[#FFE500]/60 hover:text-[#FFE500] transition-colors"
            >
              View on GitHub →
            </a>
          </motion.div>

          {/* Card 2: Current Stack */}
          <motion.div
            className="rounded-3xl bg-[#0d0d0b] border border-white/8 p-7 flex flex-col gap-5 hover:border-white/14 transition-colors"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          >
            <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35 font-mono">Current Stack</p>

            <div className="flex flex-wrap gap-2 flex-1">
              {[
                { name: "LangChain", c: "#a855f7" },
                { name: "LangGraph", c: "#f59e0b" },
                { name: "FastAPI",   c: "#10b981" },
                { name: "Next.js",   c: "#e1e0cc" },
                { name: "Supabase",  c: "#22c55e" },
                { name: "Groq",      c: "#38bdf8" },
                { name: "Pinecone",  c: "#6366f1" },
                { name: "Python",    c: "#3b82f6" },
                { name: "Docker",    c: "#38bdf8" },
                { name: "AWS",       c: "#f59e0b" },
              ].map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold"
                  style={{
                    background: `${t.c}12`,
                    border: `1px solid ${t.c}30`,
                    color: t.c,
                  }}
                >
                  {t.name}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#e1e0cc]/25 leading-relaxed">
              Obsessed with agentic AI, voice systems &amp; shipping products that matter.
            </p>
          </motion.div>

          {/* Card 3: How I Work */}
          <motion.div
            className="rounded-3xl bg-[#0d0d0b] border border-white/8 p-7 flex flex-col gap-5 hover:border-white/14 transition-colors"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          >
            <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35 font-mono">How I Work</p>

            <div className="space-y-5 flex-1">
              {HOW_I_WORK.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span
                    className="text-xs font-black text-[#FFE500]/40 shrink-0 pt-0.5"
                    style={{ fontFamily: "var(--font-almarai), sans-serif" }}
                  >
                    {item.n}
                  </span>
                  <p className="text-sm text-[#e1e0cc]/65 leading-snug">{item.step}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest text-green-400/70 font-mono">
                B.E. CS · Thapar Institute · 2027
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── AI specializations highlight ── */}
        <motion.div
          className="mt-5 p-8 rounded-3xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,229,0,0.06) 0%, rgba(255,229,0,0.01) 100%)",
            border: "1px solid rgba(255,229,0,0.12)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI Engineering",   desc: "RAG · Agents · LLM Evals · Multi-agent systems" },
              { title: "Voice Agents",     desc: "LiveKit · Twilio · Groq · Sub-100ms latency" },
              { title: "Full-Stack",       desc: "Next.js · FastAPI · Supabase · Deployed at scale" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs font-black text-[#FFE500] uppercase tracking-widest mb-2">{item.title}</p>
                <p className="text-sm text-[#e1e0cc]/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

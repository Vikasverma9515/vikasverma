"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    title: "RAG Architectures",
    desc: "Optimizing vector retrieval and context injection pipelines. FAISS, Chroma, Pinecone.",
    color: "#3b82f6",
  },
  {
    title: "Agentic Workflows",
    desc: "Multi-agent systems using LangGraph and Autogen. AI that doesn't just answer — it does things.",
    color: "#a855f7",
  },
  {
    title: "LLM Evaluation",
    desc: "Teaching models to stop confidently saying nonsense. RLHF pipelines and reasoning benchmarks.",
    color: "#10b981",
  },
];

/*
  Node positions are expressed as CSS % of the parent square.
  The SVG uses viewBox="0 0 100 100" with preserveAspectRatio="none"
  so SVG x/y maps 1:1 to CSS percentage of the container.

  LLM CORE:  top 8%,       left 50%,  88×88px  → center: x=50, y= 8 + 88/2 / containerPx * 100 ≈ y=17
  RAG:       top 58%,      left 20%,  68×68px  → center (translate-50%): x=20, y=58
  TOOLS:     top 63%,      left 50%,  68×68px  → center: x=50, y=63
  AGENTS:    top 58%,      left 80%,  68×68px  → center: x=80, y=58
  UI:        bottom 8%,    left 50%, 140×44px  → center: x=50, y≈88
*/
const nodes = [
  { id: "rag",    label: "RAG",    x: 20, y: 58, color: "#3b82f6", size: 68 },
  { id: "tools",  label: "TOOLS",  x: 50, y: 63, color: "#e1e0cc", size: 68 },
  { id: "agents", label: "AGENTS", x: 80, y: 58, color: "#a855f7", size: 68 },
];

// Corrected paths — endpoints match node centers exactly
const connPaths = [
  "M 50 17 L 20 58",
  "M 50 17 L 50 63",
  "M 50 17 L 80 58",
  "M 20 58 L 50 88",
  "M 50 63 L 50 88",
  "M 80 58 L 50 88",
];

const packetPaths = [
  "M 50 17 L 20 58",
  "M 50 17 L 50 63",
  "M 50 17 L 80 58",
];

function ArchDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full aspect-square">
      <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#050505]">
        <div className="absolute inset-0 dot-grid opacity-10" />

        {/* Ambient glows — static, no animation cost */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(59,130,246,0.06)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(168,85,247,0.06)" }} />

        {/* ── SVG: connection lines + data packets ── */}
        {/* preserveAspectRatio="none" ensures 1:1 mapping with CSS % on a square container */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Connection lines */}
          {connPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
              strokeDasharray="2.5 2.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            />
          ))}

          {/* Data packets — native SVG animateMotion, runs off JS thread */}
          {inView && packetPaths.map((d, i) => (
            <circle key={i} r="1.2" fill="rgba(225,224,204,0.9)">
              <animateMotion
                path={d}
                dur="2s"
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* ── LLM CORE — top node ── */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ width: 88, height: 88, top: "8%", left: "50%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer glow */}
          <div className="absolute inset-[-8px] rounded-3xl blur-xl opacity-20"
            style={{ background: "rgba(225,224,204,0.8)" }} />
          {/* Pulse ring via CSS */}
          <div className="absolute inset-0 rounded-2xl border border-white/25 node-pulse" />
          {/* Node body */}
          <div className="relative w-full h-full rounded-2xl border border-white/20 bg-white/5
            backdrop-blur-sm flex flex-col items-center justify-center gap-1">
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#e1e0cc]/90">LLM</span>
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#e1e0cc]/90">CORE</span>
          </div>
        </motion.div>

        {/* ── Middle nodes: RAG, TOOLS, AGENTS ── */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute flex items-center justify-center"
            style={{
              width: node.size,
              height: node.size,
              top: `${node.y}%`,
              left: `${node.x}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full blur-xl opacity-35"
              style={{ background: node.color }} />
            {/* CSS pulse ring */}
            <div
              className="absolute inset-0 rounded-full border node-pulse"
              style={{ borderColor: node.color, animationDelay: `${i * 0.55}s` }}
            />
            {/* Node body */}
            <div
              className="relative w-full h-full rounded-full border flex items-center justify-center"
              style={{ borderColor: `${node.color}60`, background: `${node.color}12` }}
            >
              <span
                className="text-[8px] uppercase tracking-wider font-bold"
                style={{ color: node.color }}
              >
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* ── User Interface — bottom node ── */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ width: 140, height: 44, bottom: "8%", left: "50%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 rounded-xl blur-lg opacity-12"
            style={{ background: "rgba(225,224,204,0.5)" }} />
          <div className="relative w-full h-full rounded-xl border border-white/20 bg-white/5
            backdrop-blur-sm flex items-center justify-center">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#e1e0cc]/70 font-mono">
              User Interface
            </span>
          </div>
        </motion.div>

        {/* ── Metrics ── */}
        {[
          { label: "Tokens/s", value: "1.2k", x: "5%",  y: "42%", color: "#3b82f6" },
          { label: "Accuracy", value: "94%",  x: "72%", y: "42%", color: "#10b981" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            className="absolute"
            style={{ left: m.x, top: m.y }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 + i * 0.15 }}
          >
            <div className="text-sm font-mono font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[8px] font-mono text-white/30 uppercase tracking-wide mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="ai" className="py-40 px-[5vw] bg-neutral-950 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px]
              uppercase tracking-widest mb-8 opacity-60">
              The serious stuff
            </div>
            <h2
              className="text-5xl md:text-6xl italic mb-6 leading-tight"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              AI Stuff{" "}
              <span className="text-xl not-italic opacity-40 block mt-2"
                style={{ fontFamily: "var(--font-almarai)" }}>
                (Yes, this is serious now)
              </span>
            </h2>
            <p className="text-lg opacity-60 leading-relaxed mb-14">
              I design and deploy orchestration layers that bridge the gap between static LLMs and
              dynamic business requirements. Translation:{" "}
              <em>I make AI behave like a useful intern.</em>
            </p>

            <div className="space-y-10">
              {capabilities.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-px h-16 flex-shrink-0"
                    style={{ background: `linear-gradient(to bottom, ${item.color}80, transparent)` }} />
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: item.color }}>{item.title}</h4>
                    <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <ArchDiagram inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

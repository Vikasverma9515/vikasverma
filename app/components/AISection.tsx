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

          {/* Right side — static tech stack grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {[
              { label: "LangChain",   sub: "Orchestration",    color: "#22c55e" },
              { label: "LangGraph",   sub: "Agentic flows",    color: "#a855f7" },
              { label: "FAISS",       sub: "Vector search",    color: "#3b82f6" },
              { label: "OpenAI API",  sub: "LLM inference",    color: "#e1e0cc" },
              { label: "FastAPI",     sub: "Backend layer",    color: "#10b981" },
              { label: "Pinecone",    sub: "Vector DB",        color: "#06b6d4" },
              { label: "Groq",        sub: "Fast inference",   color: "#f59e0b" },
              { label: "RLHF / Evals", sub: "Model alignment", color: "#f43f5e" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-300"
              >
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: item.color }} />
                <p className="text-sm font-bold text-[#e1e0cc]/80">{item.label}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#e1e0cc]/30 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

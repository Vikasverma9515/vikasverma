"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  FileCode2,
  Cpu,
  Atom,
  Triangle,
  Wind,
  Sparkles,
  Zap,
  Server,
  Database,
  CircleDot,
  Link2,
  Workflow,
  Brain,
  Search,
  Bot,
  TreePine,
  BarChart3,
  Cloud,
  Container,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const skillGroups: { cat: string; note: string; items: { name: string; color: string; icon: LucideIcon }[] }[] = [
  {
    cat: "Languages", note: "Main character energy",
    items: [
      { name: "Python",         color: "#3b82f6", icon: Code2 },
      { name: "TypeScript",     color: "#6366f1", icon: FileCode2 },
      { name: "C++",            color: "#e1e0cc", icon: Cpu },
    ],
  },
  {
    cat: "Frontend", note: "Clean & Modular",
    items: [
      { name: "React",          color: "#38bdf8", icon: Atom },
      { name: "Next.js",        color: "#e1e0cc", icon: Triangle },
      { name: "Tailwind CSS",   color: "#0ea5e9", icon: Wind },
      { name: "Framer Motion",  color: "#a855f7", icon: Sparkles },
    ],
  },
  {
    cat: "Backend", note: "Fast & Reliable",
    items: [
      { name: "FastAPI",        color: "#10b981", icon: Zap },
      { name: "Node.js",        color: "#22c55e", icon: Server },
      { name: "PostgreSQL",     color: "#3b82f6", icon: Database },
      { name: "Redis",          color: "#f43f5e", icon: CircleDot },
    ],
  },
  {
    cat: "AI / LLMs", note: "The real magic",
    items: [
      { name: "LangChain",      color: "#22c55e", icon: Link2 },
      { name: "LangGraph",      color: "#a855f7", icon: Workflow },
      { name: "OpenAI API",     color: "#e1e0cc", icon: Brain },
      { name: "FAISS / Chroma", color: "#f59e0b", icon: Search },
    ],
  },
  {
    cat: "Model Layer", note: "Inference & eval",
    items: [
      { name: "Groq",           color: "#f59e0b", icon: Zap },
      { name: "HuggingFace",    color: "#f97316", icon: Bot },
      { name: "Pinecone",       color: "#10b981", icon: TreePine },
      { name: "RLHF / Evals",   color: "#6366f1", icon: BarChart3 },
    ],
  },
  {
    cat: "Cloud & Infra", note: "Ship anywhere",
    items: [
      { name: "Supabase",       color: "#10b981", icon: Zap },
      { name: "AWS",            color: "#f59e0b", icon: Cloud },
      { name: "Vercel",         color: "#e1e0cc", icon: Triangle },
      { name: "Docker",         color: "#38bdf8", icon: Container },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="skills" className="py-40 px-[5vw] bg-black border-t border-white/5" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.h2
          className="text-4xl md:text-5xl italic text-center mb-16"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Skills{" "}
          <span className="text-xl not-italic opacity-35" style={{ fontFamily: "var(--font-almarai)" }}>
            (aka my weapons)
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {skillGroups.map((g, i) => (
            <motion.div
              key={i}
              className="p-5 bg-[#141412] rounded-2xl border border-white/5 hover:border-white/15 transition-colors group relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.05 + i * 0.07 }}
            >
              {/* Subtle gradient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${g.items[0].color}10 0%, transparent 70%)` }}
              />

              <p className="text-[9px] uppercase tracking-widest text-[#e1e0cc]/30 mb-3 relative z-10">{g.cat}</p>

              <div className="space-y-2 relative z-10">
                {g.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2.5 group-hover:translate-x-0.5 transition-transform duration-300">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      <item.icon size={12} />
                    </span>
                    <p className="text-sm font-bold text-[#e1e0cc]/75 group-hover:text-[#e1e0cc] transition-colors">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[9px] italic text-[#e1e0cc]/25 mt-4 relative z-10">{g.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Special cards row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {/* Elite Googling */}
          <motion.div
            className="col-span-2 p-5 bg-[#e1e0cc] rounded-2xl text-black relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.05 + skillGroups.length * 0.07 }}
          >
            <Search className="absolute right-4 top-4 opacity-10" size={48} strokeWidth={1.5} />
            <p className="text-[9px] uppercase tracking-widest text-black/50 mb-2">Speciality</p>
            <p className="text-lg font-bold">Elite Googling</p>
            <p className="text-[9px] italic text-black/50 mt-2">Faster than StackOverflow loads</p>
          </motion.div>

          {/* Prompt engineering */}
          <motion.div
            className="p-5 bg-[#141412] rounded-2xl border border-white/5 hover:border-white/15 transition-colors relative overflow-hidden group"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <Sparkles className="absolute right-3 top-3 opacity-5" size={32} />
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(225,224,204,0.12)", color: "#e1e0cc" }}>
                <Sparkles size={12} />
              </span>
              <p className="text-[9px] uppercase tracking-widest text-[#e1e0cc]/30">AI Craft</p>
            </div>
            <p className="text-sm font-bold text-[#e1e0cc]/80 group-hover:text-[#e1e0cc] transition-colors">Prompt Engineering</p>
            <p className="text-[9px] italic text-[#e1e0cc]/25 mt-3">Yes, it&apos;s a real skill</p>
          </motion.div>
        </div>

        {/* Scrolling marquee strip */}
        <motion.div
          className="mt-16 overflow-hidden py-4 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex whitespace-nowrap select-none">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="marquee inline-block text-xs uppercase tracking-[0.2em] text-[#e1e0cc]/10 font-mono"
              >
                Python · LangChain · LangGraph · FastAPI · Next.js · Supabase · OpenAI · Groq · FAISS · Chroma · RAG · Agentic AI · React · TypeScript · PostgreSQL · Redis · Docker ·&nbsp;
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

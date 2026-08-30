"use client";
import { useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitGraph, ExternalLink, ArrowRight, GitBranch,
  Phone, MessageSquare, Building2, Search, ShieldCheck, Upload, Cpu, TrendingUp,
} from "lucide-react";
import { FlowScene, ChatScene, OrbitScene, WaveScene, MatrixScene, DashScene } from "./visuals/MiniScenes";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Repo = {
  name: string;
  oneLiner: string;
  lang: string;
  langColor: string;
  tags: string[];
  url: string;
  cta: string;
  visual: React.ReactNode;
};

const repos: Repo[] = [
  {
    name: "FinSync",
    oneLiner: "AI portfolio tracker with real-time NSE/BSE data and Groq-powered financial planners.",
    lang: "TypeScript",
    langColor: "#6366f1",
    tags: ["Next.js", "Supabase", "Groq", "Recharts"],
    url: "https://finsync--ai.vercel.app",
    cta: "Live product",
    visual: <DashScene color="#6366f1" bars={[0.4, 0.65, 0.5, 0.8, 1]} />,
  },
  {
    name: "nehahr",
    oneLiner: "Autonomous AI agent that cold-calls candidates, screens them, and books interviews.",
    lang: "Python",
    langColor: "#3b82f6",
    tags: ["Voice AI", "LangGraph", "Scheduling APIs"],
    url: "https://github.com/Vikasverma9515/nehahr",
    cta: "View on GitHub",
    visual: <ChatScene color="#3b82f6" icon={Phone} badge="Call" />,
  },
  {
    name: "BlindCharm",
    oneLiner: "Solo-built AI matchmaking app — 500+ users, zero paid marketing. Now prototyping a 3D “Galaxy View” where matches orbit you.",
    lang: "TypeScript",
    langColor: "#6366f1",
    tags: ["Next.js", "Supabase", "AWS Rekognition", "Three.js"],
    url: "https://github.com/Vikasverma9515/BlindCharm",
    cta: "View on GitHub",
    visual: <OrbitScene color="#f43f5e" />,
  },
  {
    name: "SDR-agent-Salescode",
    oneLiner: "3-stage autonomous B2B prospecting pipeline — enrich, discover, verify.",
    lang: "Python",
    langColor: "#3b82f6",
    tags: ["LangGraph", "FastAPI", "GPT-4o"],
    url: "https://github.com/Vikasverma9515/SDR-agent-Salescode",
    cta: "View on GitHub",
    visual: (
      <FlowScene
        color="#a855f7"
        steps={[
          { icon: Building2, label: "Enrich" },
          { icon: Search, label: "Discover" },
          { icon: ShieldCheck, label: "Verify" },
        ]}
      />
    ),
  },
  {
    name: "salesvoice",
    oneLiner: "Interruptible, real-time AI voice sales agent — built for sub-second latency.",
    lang: "Python",
    langColor: "#3b82f6",
    tags: ["LiveKit", "Groq", "Deepgram"],
    url: "https://github.com/Vikasverma9515/salesvoice",
    cta: "View on GitHub",
    visual: <WaveScene color="#10b981" icon={Phone} />,
  },
  {
    name: "sona.ai",
    oneLiner: "An AI assistant that lives inside WhatsApp — triages messages, schedules, manages tasks.",
    lang: "TypeScript",
    langColor: "#6366f1",
    tags: ["Next.js", "FastAPI", "Supabase"],
    url: "https://github.com/Vikasverma9515/sona.ai",
    cta: "View on GitHub",
    visual: <ChatScene color="#22c55e" icon={MessageSquare} badge="WhatsApp" />,
  },
  {
    name: "InsightLab",
    oneLiner: "No-code ML studio — upload a CSV, train a model, no code required.",
    lang: "JavaScript",
    langColor: "#f59e0b",
    tags: ["No-code ML", "Data preprocessing"],
    url: "https://github.com/Vikasverma9515/InsightLab",
    cta: "View on GitHub",
    visual: (
      <FlowScene
        color="#f59e0b"
        steps={[
          { icon: Upload, label: "Upload" },
          { icon: Cpu, label: "Train" },
          { icon: TrendingUp, label: "Predict" },
        ]}
      />
    ),
  },
  {
    name: "Topsis-Vikas",
    oneLiner: "Published Python package for multi-criteria decision-making — CLI, web UI, and a PyPI release.",
    lang: "Python",
    langColor: "#3b82f6",
    tags: ["PyPI package", "Flask"],
    url: "https://pypi.org/project/Topsis-Vikas-102303451/",
    cta: "View on PyPI",
    visual: (
      <MatrixScene
        color="#3b82f6"
        rows={[
          { label: "A1", value: 1 },
          { label: "A2", value: 0.7 },
          { label: "A3", value: 0.45 },
        ]}
      />
    ),
  },
];

function contributionCell(i: number) {
  const v = (i * 47 + (i % 7) * 13 + (i % 11) * 5) % 100;
  if (v > 88) return "#39d353";
  if (v > 72) return "#26a641";
  if (v > 52) return "#006d32";
  if (v > 30) return "#0e4429";
  return "#161b22";
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="relative w-[280px] md:w-[300px] shrink-0 snap-start">
      <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#e1e0cc] ring-4 ring-black z-10" />
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="group flex flex-col h-full p-5 rounded-2xl border border-white/10 bg-[#0d0d0b] hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="mb-4 pointer-events-none">{repo.visual}</div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <GitGraph size={14} className="opacity-40 shrink-0" />
            <span className="font-mono text-sm font-bold text-[#e1e0cc] truncate">{repo.name}</span>
          </div>
          <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 opacity-40 shrink-0">
            Public
          </span>
        </div>

        <p className="text-xs text-[#e1e0cc]/55 leading-relaxed mb-4 flex-1">{repo.oneLiner}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04] text-[#e1e0cc]/45 border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-[10px] text-[#e1e0cc]/45">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: repo.langColor }} />
            {repo.lang}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#e1e0cc]/70 group-hover:text-[#e1e0cc] transition-colors">
            {repo.cta}
            <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </a>
    </div>
  );
}

export default function GitHubShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail) return;
    dragState.current = { dragging: true, startX: e.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !dragState.current.dragging) return;
    rail.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current.dragging = false;
    railRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  return (
    <section id="github" className="py-32 md:py-40 bg-black overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest mb-8 opacity-60">
              <GitGraph size={11} /> The receipts
            </div>
            <h2
              className="text-5xl md:text-6xl italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              GitHub
            </h2>
            <p className="text-lg opacity-60 leading-relaxed max-w-xl">
              37 public repos. These are the ones worth your time — drag through them.
            </p>
          </div>

          <a
            href="https://github.com/Vikasverma9515"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#e1e0cc]/60 hover:text-[#e1e0cc] transition-colors shrink-0"
          >
            @Vikasverma9515
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Decorative contribution strip */}
        <motion.div
          className="hidden md:grid mb-10 gap-[3px] opacity-70"
          style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))", gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridAutoFlow: "column", height: "72px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {Array.from({ length: 364 }).map((_, i) => (
            <span key={i} className="rounded-[2px]" style={{ background: contributionCell(i) }} />
          ))}
        </motion.div>
      </div>

      {/* Horizontal flow rail */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className="relative"
      >
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          data-cursor="drag"
          className="overflow-x-auto no-scrollbar cursor-none select-none"
        >
          <div className="relative flex items-start gap-6 w-max px-[5vw] pt-8 pb-4">
            {/* Flow track */}
            <div className="absolute left-[5vw] right-[5vw] top-2 h-px bg-repeat-x flow-track pointer-events-none" />

            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}

            {/* End CTA */}
            <a
              href="https://github.com/Vikasverma9515"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative w-[220px] shrink-0 snap-start flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border border-dashed border-white/15 hover:border-white/35 transition-colors"
            >
              <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#e1e0cc]/40 ring-4 ring-black z-10" />
              <GitBranch size={22} className="opacity-40 group-hover:opacity-70 transition-opacity" />
              <p className="text-sm font-bold text-[#e1e0cc]/80">37 public repos</p>
              <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/40">There&apos;s more where that came from</p>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#e1e0cc]/70 group-hover:text-[#e1e0cc] transition-colors">
                View full profile <ArrowRight size={12} />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Mic, Bot, Phone, MessageSquare, Search, Send, RefreshCw, Video, Plug, Boxes, Heart } from "lucide-react";
import {
  FlowScene, ChatScene, NetworkScene, BuilderScene, DashScene, ChecklistScene, OrbitScene, MatrixScene,
} from "./visuals/MiniScenes";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Feature = { title: string; desc: string; scene: React.ReactNode };

type Role = {
  company: string;
  role: string;
  dates: string;
  location: string;
  color: string;
  features: Feature[];
  tech: string[];
};

const roles: Role[] = [
  {
    company: "Tredence Analytics",
    role: "AI Software Engineering Intern",
    dates: "May 2026 – Jul 2026",
    location: "Bengaluru, India",
    color: "#a855f7",
    tech: ["Python", "GPT-5-class LLMs", "LangGraph", "RAG", "MS Teams Bot", "Agile"],
    features: [
      {
        title: "Voice Agent Builder",
        desc: "No-code, graph-based canvas for launching AI phone agents.",
        scene: <BuilderScene color="#a855f7" icons={[Mic, Bot, Phone]} />,
      },
      {
        title: "Benchmark Studio",
        desc: "AI eval & guardrail tool for building golden datasets and quality benchmarks.",
        scene: <ChecklistScene color="#a855f7" items={["Accuracy", "Latency", "Safety"]} />,
      },
      {
        title: "RAG Support Agent",
        desc: "Codebase-grounded (AST-parsed) support agent, live inside Microsoft Teams.",
        scene: <ChatScene color="#a855f7" icon={MessageSquare} badge="Teams" />,
      },
      {
        title: "Agent Orchestration",
        desc: "Extended core agent orchestration and tool-calling modules cross-functionally.",
        scene: <NetworkScene color="#a855f7" />,
      },
    ],
  },
  {
    company: "SalesCode.ai",
    role: "GenAI Intern",
    dates: "Feb 2026 – May 2026",
    location: "Remote",
    color: "#3b82f6",
    tech: ["LangGraph", "RAG", "n8n", "Tavus", "FAISS / Chroma"],
    features: [
      {
        title: "Company Brain (RAG)",
        desc: "FAISS/Chroma retrieval over structured and unstructured sales data.",
        scene: <NetworkScene color="#3b82f6" />,
      },
      {
        title: "BD Automation Pipeline",
        desc: "LangGraph agents + n8n workflows: research → outreach → follow-up.",
        scene: (
          <FlowScene
            color="#3b82f6"
            steps={[
              { icon: Search, label: "Research" },
              { icon: Send, label: "Outreach" },
              { icon: RefreshCw, label: "Follow-up" },
            ]}
          />
        ),
      },
      {
        title: "Multimodal Meeting Agent",
        desc: "Joins live Google Meet calls and converses with participants in real time.",
        scene: <ChatScene color="#3b82f6" icon={Video} badge="Meet" />,
      },
    ],
  },
  {
    company: "Pixeltec",
    role: "Software Developer — AI Implementation & Deployments",
    dates: "Sep 2025 – Dec 2025",
    location: "Remote",
    color: "#10b981",
    tech: ["React", "Next.js", "Supabase", "Firebase"],
    features: [
      {
        title: "Shipped Client Features",
        desc: "AI-driven features for a live client product, end-to-end.",
        scene: <DashScene color="#10b981" bars={[0.5, 0.7, 0.9, 0.6]} />,
      },
      {
        title: "API Integration",
        desc: "Integrated third-party APIs and built core product modules.",
        scene: (
          <FlowScene
            color="#10b981"
            steps={[
              { icon: Plug, label: "API" },
              { icon: Boxes, label: "Modules" },
            ]}
          />
        ),
      },
      {
        title: "SEO & Analytics",
        desc: "Improved UI/UX and SEO/analytics instrumentation.",
        scene: <MatrixScene color="#10b981" rows={[{ label: "Before", value: 0.4 }, { label: "After", value: 0.9 }]} />,
      },
    ],
  },
  {
    company: "BlindCharm",
    role: "Founder & Full-Stack Developer",
    dates: "Aug 2025 – Dec 2025",
    location: "Hyderabad, India",
    color: "#f43f5e",
    tech: ["Next.js", "Supabase", "AWS Rekognition", "Three.js"],
    features: [
      {
        title: "Matchmaking Engine",
        desc: "Real-time engine via Supabase channels & WebSockets — 500+ users.",
        scene: <ChatScene color="#f43f5e" icon={Heart} badge="Match" />,
      },
      {
        title: "Compatibility + Verification",
        desc: "AI-generated insights, plus dual-layer verification and consent-based reveal.",
        scene: <ChecklistScene color="#f43f5e" items={["Face match", "College email", "Consent reveal"]} />,
      },
      {
        title: "Galaxy View (3D)",
        desc: "Spatial UI prototype — matches orbit you based on AI-scored compatibility.",
        scene: <OrbitScene color="#f43f5e" />,
      },
    ],
  },
  {
    company: "Outlier AI",
    role: "AI Model Evaluator",
    dates: "Nov 2024 – Feb 2025",
    location: "Remote",
    color: "#f59e0b",
    tech: ["LLM Evaluation", "Responsible AI", "Code Review"],
    features: [
      {
        title: "Code & Reasoning Eval",
        desc: "Rubric-based evaluation of AI-generated code and reasoning.",
        scene: <ChecklistScene color="#f59e0b" items={["Correctness", "Reasoning", "Style"]} stat="+15% eval accuracy" />,
      },
      {
        title: "Alignment Feedback",
        desc: "Structured feedback used to improve model alignment and responsible AI output.",
        scene: <MatrixScene color="#f59e0b" rows={[{ label: "Before", value: 0.5 }, { label: "After", value: 0.85 }]} />,
      },
    ],
  },
];

function FeatureTile({ f, delay }: { f: Feature; delay: number }) {
  return (
    <motion.div
      className="p-4 rounded-2xl border border-white/8 bg-white/[0.015] hover:border-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      <div className="mb-3">{f.scene}</div>
      <p className="text-sm font-bold text-[#e1e0cc]/85 mb-1">{f.title}</p>
      <p className="text-xs text-[#e1e0cc]/50 leading-relaxed">{f.desc}</p>
    </motion.div>
  );
}

function RoleBlock({ r }: { r: Role }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="relative pl-8 lg:pl-16">
      <div
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-neutral-950 z-10"
        style={{ background: r.color }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ color: r.color, borderColor: `${r.color}40`, background: `${r.color}12` }}
          >
            {r.dates}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35 flex items-center gap-1">
            <MapPin size={10} /> {r.location}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#e1e0cc] mb-1">{r.role}</h3>
        <p className="text-lg italic" style={{ color: r.color, fontFamily: "var(--font-instrument-serif)" }}>
          {r.company}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {r.features.map((f, i) => (
          <FeatureTile key={f.title} f={f} delay={0.1 + i * 0.08} />
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {r.tech.map((t) => (
          <span key={t} className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-[#e1e0cc]/40 border border-white/5">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.2", "end 0.8"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 md:py-40 px-[5vw] bg-neutral-950 border-t border-white/5" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest mb-8 opacity-60">
            5 roles, 0 boring ones
          </div>
          <h2 className="text-5xl md:text-6xl italic mb-4 leading-tight" style={{ fontFamily: "var(--font-instrument-serif)" }}>
            Experience
          </h2>
          <p className="text-lg opacity-60 leading-relaxed max-w-xl">
            What I actually did, not what the job title implies — every feature, visualized.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[6.5px] lg:left-[6.5px] top-0 bottom-0 w-px bg-white/8" />
          <motion.div
            className="absolute left-[6.5px] lg:left-[6.5px] top-0 w-px bg-gradient-to-b from-[#e1e0cc]/60 via-[#e1e0cc]/20 to-transparent origin-top"
            style={{ scaleY: lineScale, height: "100%" }}
          />
          <div className="space-y-16">
            {roles.map((r) => (
              <RoleBlock key={r.company} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

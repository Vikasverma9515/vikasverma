"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


type PType = "social" | "fintech" | "hrtech";

const projects = [
  {
    num: "01", tag: "Social", title: "BlindCharm",
    tagline: 'aka "Tinder, but with character development"',
    bullets: [
      "Personality-first matchmaking — looks revealed later",
      "500+ real users · AI-powered compatibility engine",
      "Real-time chat + progressive profile reveal",
      "AWS Rekognition moderation system",
    ],
    href: "https://blindcharm.com",
    accent: "#f43f5e",
    type: "social" as PType,
  },
  {
    num: "02", tag: "Fintech", title: "FinSync",
    tagline: 'aka "Your finance friend who actually knows stuff"',
    bullets: [
      "Groq-powered financial chatbot",
      "Real-time NSE market tracking",
      "Investment + Tax + Freedom planners",
      "Portfolio P&L engine with AI insights",
    ],
    href: "https://finsync--ai.vercel.app",
    accent: "#10b981",
    type: "fintech" as PType,
  },
  {
    num: "03", tag: "HR Tech", title: "JobNest",
    tagline: 'aka "LinkedIn but less painful"',
    bullets: [
      "Role-based job discovery with smart search",
      "Real-time Supabase live updates",
      "Clerk authentication that actually works",
      "Clean UI — no corporate depression vibes",
    ],
    href: "https://jobnest-psi.vercel.app",
    accent: "#6366f1",
    type: "hrtech" as PType,
  },
];

function CardVisual({ type, accent }: { type: PType; accent: string }) {
  if (type === "social") {
    return (
      <>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent}30 0%, transparent 70%)` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `${accent}50`, background: `${accent}12` }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                <circle cx="14" cy="10" r="4.5" stroke={accent} strokeWidth="1.5" opacity="0.9" />
                <path d="M5 25c0-5 4-9 9-9s9 4 9 9" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </motion.div>

            <motion.svg viewBox="0 0 28 25" className="w-8 h-8"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <path d="M14 23C8.5 18 2 13.5 2 8 2 4.7 4.7 2 8 2c2 0 3.8.9 5 2.4C14.2 2.9 16 2 18 2c3.3 0 6 2.7 6 6 0 5.5-6.5 10-11 15z"
                fill={accent} opacity="0.8" />
            </motion.svg>

            <motion.div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `rgba(234,88,12,0.5)`, background: `rgba(234,88,12,0.12)` }}
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                <circle cx="14" cy="10" r="4.5" stroke="rgb(234,88,12)" strokeWidth="1.5" opacity="0.9" />
                <path d="M5 25c0-5 4-9 9-9s9 4 9 9" stroke="rgb(234,88,12)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              </svg>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border opacity-10"
          style={{ borderColor: accent }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        {[
          { x: "18%", y: "22%" }, { x: "78%", y: "28%" },
          { x: "14%", y: "72%" }, { x: "82%", y: "68%" }, { x: "50%", y: "12%" },
        ].map((d, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full"
            style={{ left: d.x, top: d.y, background: accent }}
            animate={{ opacity: [0.15, 0.55, 0.15], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </>
    );
  }

  if (type === "fintech") {
    const bars = [32, 54, 40, 68, 50, 82, 60, 88, 72, 96];
    return (
      <>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 100%, ${accent}28 0%, transparent 65%)` }} />
        <div className="absolute inset-x-6 bottom-2 flex items-end gap-1 h-[60%]">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t"
              style={{ background: `linear-gradient(to top, ${accent}70, ${accent}18)` }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            />
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" preserveAspectRatio="none">
          <motion.polyline
            points="18,132 48,112 78,122 108,88 138,102 168,62 198,78 228,44 258,56 288,24"
            fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.6 }}
          />
          <motion.circle cx="288" cy="24" r="5" fill={accent}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
        <motion.div className="absolute top-5 right-6 text-right"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <div className="text-sm font-mono font-bold" style={{ color: accent }}>+24.8%</div>
          <div className="text-[9px] font-mono opacity-40">Portfolio YTD</div>
        </motion.div>
        {[{ x: "12%", y: "20%" }, { x: "18%", y: "60%" }].map((d, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full"
            style={{ left: d.x, top: d.y, background: accent }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}28 0%, transparent 65%)` }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 180, height: 110 }}>
          {[2, 1, 0].map((layer) => (
            <motion.div key={layer} className="absolute rounded-xl border"
              style={{
                width: 170 - layer * 10, height: 50,
                borderColor: `${accent}${layer === 0 ? "45" : "18"}`,
                background: `${accent}${layer === 0 ? "12" : "06"}`,
                top: layer * 22, left: layer * 5,
                opacity: 1 - layer * 0.3,
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1 - layer * 0.3, y: 0 }}
              transition={{ delay: layer * 0.12, duration: 0.5 }}
            >
              {layer === 0 && (
                <div className="flex items-center gap-2.5 p-3 h-full">
                  <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${accent}22` }}>
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                      <rect x="2" y="2" width="12" height="12" rx="2.5" stroke={accent} strokeWidth="1.5" />
                      <path d="M5 7h6M5 10h4" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 rounded mb-1.5" style={{ width: "70%", background: `${accent}45` }} />
                    <div className="h-1 rounded" style={{ width: "45%", background: `${accent}22` }} />
                  </div>
                  <div className="w-12 h-5 rounded-full flex items-center justify-center text-[6px] font-mono font-bold tracking-wider" style={{ background: `${accent}22`, color: accent }}>
                    APPLY
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full border flex items-center gap-2 px-3"
        style={{ width: 158, height: 28, borderColor: `${accent}30`, background: `${accent}08` }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <svg viewBox="0 0 14 14" className="w-3 h-3 flex-shrink-0" fill="none">
          <circle cx="6" cy="6" r="4" stroke={accent} strokeWidth="1.5" opacity="0.6" />
          <path d="M9 9L11.5 11.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
        <div className="h-1.5 rounded flex-1" style={{ background: `${accent}22` }} />
      </motion.div>
      {[{ x: "10%", y: "18%" }, { x: "88%", y: "22%" }, { x: "85%", y: "72%" }].map((d, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full"
          style={{ left: d.x, top: d.y, background: accent }}
          animate={{ opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </>
  );
}

function ProjectCard({ p, i, inView }: { p: (typeof projects)[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      className="group relative bg-[#141412] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
      style={{ aspectRatio: "4/5" }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
    >
      {/* Visual preview area */}
      <div className="absolute inset-x-0 top-0 h-[50%] overflow-hidden">
        <CardVisual type={p.type} accent={p.accent} />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141412] to-transparent pointer-events-none" />
      </div>

      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.accent}08 0%, transparent 60%)` }}
      />

      {/* Tag + number row */}
      <div className="absolute top-5 inset-x-5 flex justify-between items-start z-20">
        <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border border-white/10">
          {p.tag}
        </span>
        <span
          className="text-4xl italic opacity-10 group-hover:opacity-80 transition-opacity duration-500"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          {p.num}
        </span>
      </div>

      {/* Text content — bottom half */}
      <div className="absolute inset-x-0 bottom-0 p-7 z-10">
        <h3 className="text-3xl font-bold mb-1.5 text-[#e1e0cc]">{p.title}</h3>
        <p className="text-sm opacity-50 mb-5 italic leading-snug">{p.tagline}</p>

        <ul className="space-y-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {p.bullets.map((b) => (
            <li key={b} className="text-xs text-[#e1e0cc]/65 flex items-start gap-2">
              <span className="mt-1 shrink-0" style={{ color: p.accent }}>•</span>
              {b}
            </li>
          ))}
        </ul>

        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors duration-300 opacity-0 group-hover:opacity-100"
            style={{ color: p.accent }}
          >
            Visit project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="work" className="py-40 px-[5vw] bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.h2
            className="text-5xl md:text-6xl italic leading-tight"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            What I&apos;ve been cooking.
          </motion.h2>
          <motion.span
            className="text-[10px] uppercase tracking-[0.3em] opacity-35 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.35 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Recent drops
          </motion.span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-sm text-[#e1e0cc]/40">
            Also built: PBM Brain Health · GitHub Analyzer · AI Evaluator tools
          </p>
          <a
            href="https://github.com/Vikasverma9515"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-[#e1e0cc]/50 hover:text-[#e1e0cc] transition-colors flex items-center gap-2"
          >
            View all on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

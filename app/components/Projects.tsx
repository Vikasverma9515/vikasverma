"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  },
];

function ProjectCard({ p, i, inView }: { p: (typeof projects)[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      className="group relative bg-[#141412] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
      style={{ aspectRatio: "4/5" }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
    >
      {/* Static gradient preview — no animation, no JS cost */}
      <div className="absolute inset-x-0 top-0 h-[50%]"
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${p.accent}22 0%, transparent 75%)` }}
      >
        {/* Number watermark */}
        <span
          className="absolute bottom-4 right-6 text-[88px] italic leading-none opacity-[0.06] select-none pointer-events-none"
          style={{ fontFamily: "var(--font-instrument-serif)", color: p.accent }}
        >
          {p.num}
        </span>
        {/* Fade into card body */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141412] to-transparent pointer-events-none" />
      </div>

      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.accent}08 0%, transparent 60%)` }}
      />

      {/* Tag row */}
      <div className="absolute top-5 inset-x-5 flex justify-between items-start z-20">
        <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border border-white/10">
          {p.tag}
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

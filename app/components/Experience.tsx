"use client";
import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const EXP_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4";


const jobs = [
  {
    year: "Now",
    dates: "Feb 2026 – Present",
    role: "GenAI Intern",
    company: "SalesCode.ai",
    location: "Remote",
    sub: "Agentic BD automation + RAG pipelines for enterprise sales AI.",
    current: true,
    highlights: [
      "Built RAG pipelines with vector indexing and semantic retrieval using FAISS/Chroma to power context-aware AI responses over enterprise sales data.",
      "Developed agentic BD automation workflows using LangGraph — orchestrating multi-step agent flows for lead research, outreach sequencing, and pipeline management.",
      "Engineered stakeholder mapping automation to identify and rank decision-makers from unstructured data, reducing manual prospecting effort across sales cycles.",
    ],
    tech: ["Python", "LangChain", "LangGraph", "RAG", "FastAPI"],
  },
  {
    year: "2025",
    dates: "Jan 2025 – Present",
    role: "Founder & Full-Stack Dev",
    company: "BlindCharm",
    location: "Hyderabad, India",
    sub: "Built from scratch. 500+ users. Somehow got a dating app to work.",
    current: true,
    highlights: [
      "Launched with 500+ real users; AI-powered matchmaking with preference-driven discovery improved engagement by 30%.",
      "Developed real-time chat, swipe-based discovery, advanced moderation workflows, and admin dashboard.",
      "Optimised DB queries improving response time by 40%.",
    ],
    tech: ["Next.js", "Supabase", "React", "AWS Rekognition"],
  },
  {
    year: "2024",
    dates: "Nov 2024 – Present",
    role: "AI Model Evaluator",
    company: "Outlier AI",
    location: "Remote",
    sub: "Teaching machines how to be slightly less confident when wrong.",
    current: true,
    highlights: [
      "Evaluated AI-generated code, reasoning, and responses to improve LLM alignment.",
      "Improved evaluation accuracy ~15% through structured feedback and prompt refinement.",
      "Code review and RLHF pipelines — dataset curation and reasoning benchmarks.",
    ],
    tech: ["LLM Evaluation", "Code Review", "Prompt Engineering"],
  },
  {
    year: "2025",
    dates: "Sep 2025 – Dec 2025",
    role: "Software Developer Intern",
    company: "Pixeltec",
    location: "Remote",
    sub: "Enhanced AI-driven web products; integrated APIs and improved UI.",
    current: false,
    highlights: [
      "Integrated APIs, improved UI/UX, SEO, and analytics for AI-driven products.",
      "Developed core modules for itsourtimetogether.com.",
    ],
    tech: ["React", "Next.js", "Supabase", "Firebase"],
  },
];

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="experience" className="relative py-40 px-[5vw] overflow-hidden" ref={ref}>
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={EXP_VIDEO} type="video/mp4" />
      </video>
      {/* Merge with black sections above and below */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl italic mb-4 text-black/80"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Experience{" "}
          <span className="text-xl not-italic text-black/35" style={{ fontFamily: "var(--font-almarai)" }}>
            (But make it not boring)
          </span>
        </motion.h2>

        {/* Timeline list */}
        <div className="mt-14 divide-y divide-black/[0.10]">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.09 }}
            >
              {/* Row */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start md:items-center justify-between py-7 gap-5 text-left group"
              >
                {/* Year label */}
                <span
                  className={`text-4xl italic shrink-0 w-20 transition-opacity duration-300 text-black ${open === i ? "opacity-80" : "opacity-20 group-hover:opacity-50"
                    }`}
                  style={{ fontFamily: "var(--font-instrument-serif)" }}
                >
                  {job.year}
                </span>

                {/* Role + company */}
                <div className="flex-grow min-w-0">
                  <p className={`text-xl md:text-2xl font-bold truncate transition-colors duration-300 ${open === i ? "text-black/85" : "text-black/45 group-hover:text-black/70"
                    }`}>
                    {job.role}
                  </p>
                  <p className="text-sm text-black/40 mt-0.5 italic">{job.company}</p>
                  <p className="text-[10px] text-black/30 font-mono mt-0.5 tracking-wide">{job.dates} · {job.location}</p>
                </div>

                {/* Right side: current badge + toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  {job.current && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-700/30 text-green-700 text-[9px] uppercase tracking-widest font-mono bg-white/30 backdrop-blur-sm">
                      <span className="w-1 h-1 rounded-full bg-green-600 animate-pulse" />
                      Now
                    </span>
                  )}
                  <span className={`text-black/30 text-xl transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </div>
              </button>

              {/* Expandable details */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-0 md:pl-24 grid md:grid-cols-[1fr_auto] gap-8">
                      <div>
                        <p className="text-sm text-black/40 italic mb-5">{job.sub}</p>
                        <ul className="space-y-3">
                          {job.highlights.map((h, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-black/60 leading-relaxed">
                              <span className="text-black/30 mt-1 shrink-0">›</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1.5 content-start">
                        {job.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-[9px] uppercase tracking-wider border border-black/15 rounded-full text-black/45 font-mono bg-white/20 backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Education footnote */}
        <motion.p
          className="mt-10 text-[10px] uppercase tracking-widest text-black/30 font-mono"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          B.E. Computer Engineering — Thapar Institute of Engineering & Technology · 2023 – 2027
        </motion.p>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CONTACT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4";

const ticker =
  "AI Engineer · RAG Pipelines · LangChain · LangGraph · FastAPI · Next.js · Supabase · Full-Stack · LLM Builder · Agentic Workflows · BlindCharm Founder · ";

const socials = [
  // { label: "Twitter", href: "https://twitter.com/vikasverma9515" },
  { label: "GitHub", href: "https://github.com/Vikasverma9515" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vikas-verma-264103275" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >

      {/* Video — full opacity, unobstructed */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={CONTACT_VIDEO} type="video/mp4" />
      </video>

      {/* Fade in from black (matches previous section) */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      {/* Very soft haze so text on bright sky is crisper */}
      <div className="absolute top-0 inset-x-0 h-[62%] bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

      {/* ── ALL CONTENT LIVES IN THE SKY (~top 60%) ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-[5vw]"
        style={{ minHeight: "60vh", paddingTop: "5rem", paddingBottom: "2rem" }}
      >
        {/* Open-to-work badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 bg-white/30 backdrop-blur-sm text-[10px] uppercase tracking-widest text-black/60">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Open to collaboration
          </span>
        </motion.div>

        {/* Main heading — dark on light sky */}
        <motion.h2
          className="leading-[0.88] mb-6 text-black/80"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(3rem, 9vw, 8rem)",
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        >
          If you want to build<br />
          something <span className="italic">crazy…</span>
        </motion.h2>

        {/* "hit me up." */}
        <motion.p
          className="italic text-black/65 mb-10"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        >
          hit me up.
        </motion.p>

        {/* Email */}
        <motion.a
          href="mailto:vikasverma951582@gmail.com"
          className="text-base md:text-xl font-light text-black/60 border-b border-black/25 pb-1.5 mb-8 hover:text-black hover:border-black/60 transition-all duration-300"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
        >
          vikasverma951582@gmail.com
        </motion.a>

        {/* Small print */}
        <motion.p
          className="text-sm text-black/40 mb-8 italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.44 }}
        >
          If you don&apos;t want to build something crazy — still hit me up. I&apos;m interesting.
        </motion.p>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-10 text-[10px] uppercase tracking-[0.3em] text-black mb-30 pb-50"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* ── FOOTER INFO — still in the sky ── */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.62 }}
        >
          {/* Marquee */}
          {/* <div className="overflow-hidden py-2 border-y border-black/10 mb-8">
            <div className="flex whitespace-nowrap select-none">
              {[0, 1].map((k) => (
                <span
                  key={k}
                  className="marquee inline-block text-[10px] uppercase tracking-[0.15em] text-black/20 font-mono"
                  aria-hidden={k === 1}
                >
                  {ticker.repeat(4)}
                </span>
              ))}
            </div>
          </div> */}

          {/* Name + contact row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
            <p
              className="leading-none italic text-white"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(32px, 7vw, 80px)",
              }}
            >
              Vikas
            </p>

            <div className="space-y-1 sm:text-right">
              <a href="mailto:vikasverma951582@gmail.com"
                className="block text-[10px] font-mono text-black/35 hover:text-black/60 transition-colors tracking-wider">
                vikasverma951582@gmail.com
              </a>
              <a href="tel:+916302206340"
                className="block text-[10px] font-mono text-black/35 hover:text-black/60 transition-colors tracking-wider">
                +91 6302206340
              </a>
              <p className="text-[9px] font-mono text-black/25 tracking-widest uppercase">
                Hyderabad, Telangana · India
              </p>
            </div>
          </div>

          {/* Copyright + links */}
          <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[8px] uppercase tracking-[0.25em] text-black/25 font-mono">
              © 2026 Vikas Verma · Built with rigor &amp; caffeine
            </p>
            <div className="flex gap-5">
              {[
                { l: "GitHub", h: "https://github.com/Vikasverma9515" },
                { l: "LinkedIn", h: "https://www.linkedin.com/in/vikas-verma-264103275" },
                { l: "Email", h: "mailto:vikasverma951582@gmail.com" },
              ].map(({ l, h }) => (
                <a key={l} href={h}
                  target={h.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-[8px] uppercase tracking-[0.2em] text-black/25 hover:text-black/55 transition-colors font-mono"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── GRASS ZONE — purely decorative, nothing here ── */}
      <div className="flex-1" />
    </section>
  );
}

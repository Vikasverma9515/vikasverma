"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Sparkle({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="currentColor" />
    </svg>
  );
}

const socials = [
  { label: "GitHub",   href: "https://github.com/Vikasverma9515",               icon: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vikas-verma-264103275", icon: "LI" },
  { label: "Email",    href: "mailto:vikasverma951582@gmail.com",                icon: "@" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen w-full bg-black flex flex-col justify-between overflow-hidden"
    >
      {/* ── Background: animated gradient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Yellow accent blob */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,229,0,0.04) 0%, transparent 70%)" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Decorative sparkles ── */}
      <Sparkle size={20} className="absolute top-20 left-[10%] text-[#FFE500] opacity-50 floating" />
      <Sparkle size={14} className="absolute top-1/3 right-[12%] text-[#FFE500] opacity-30 floating-delayed" />
      <Sparkle size={10} className="absolute bottom-40 left-[30%] text-white opacity-15 floating-more" />

      {/* ── Main contact content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[5vw] flex-1 py-40">

        {/* Open to work badge */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/5 text-[10px] uppercase tracking-widest text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to collaboration
          </span>
        </motion.div>

        {/* Giant heading */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <h2
            className="font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#e1e0cc]"
            style={{
              fontFamily: "var(--font-almarai), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
            }}
          >
            Let&apos;s
          </h2>
          <h2
            className="font-black uppercase leading-[0.85] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-almarai), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              WebkitTextStroke: "2px rgba(225,224,204,0.30)",
              color: "transparent",
            }}
          >
            Build.
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-[#e1e0cc]/40 mb-12 max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
        >
          <em>If you want to build something crazy</em> — AI-powered, voice-driven, or just
          delightfully complex — I&apos;m your person.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href="mailto:vikasverma951582@gmail.com"
          className="group inline-flex items-center gap-4 bg-[#FFE500] text-black px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
        >
          Say Hello
          <Sparkle size={14} className="group-hover:rotate-12 transition-transform" />
        </motion.a>

        {/* Email text */}
        <motion.a
          href="mailto:vikasverma951582@gmail.com"
          className="text-[#e1e0cc]/30 hover:text-[#e1e0cc]/70 transition-colors text-sm font-mono tracking-wider mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.44 }}
        >
          vikasverma951582@gmail.com
        </motion.a>

        {/* Social links */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 text-[#e1e0cc]/50 hover:text-[#e1e0cc] hover:border-[#FFE500]/30 hover:bg-[#FFE500]/5 transition-all duration-300 text-[10px] uppercase tracking-widest"
            >
              <span className="text-xs font-bold text-[#FFE500]/60 group-hover:text-[#FFE500]">{s.icon}</span>
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Footer bar ── */}
      <motion.div
        className="relative z-10 border-t border-white/8 px-[5vw] py-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Name */}
          <p
            className="text-2xl font-black uppercase tracking-[-0.02em] text-[#e1e0cc]/80"
            style={{ fontFamily: "var(--font-almarai), sans-serif" }}
          >
            Vikas Verma
          </p>

          {/* Right info */}
          <div className="flex flex-col sm:items-end gap-1">
            <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest text-[#e1e0cc]/25">
              {[
                { l: "GitHub",   h: "https://github.com/Vikasverma9515" },
                { l: "LinkedIn", h: "https://www.linkedin.com/in/vikas-verma-264103275" },
                { l: "Email",    h: "mailto:vikasverma951582@gmail.com" },
              ].map(({ l, h }) => (
                <a key={l} href={h}
                  target={h.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="hover:text-[#e1e0cc]/60 transition-colors">
                  {l}
                </a>
              ))}
            </div>
            <p className="text-[9px] font-mono text-[#e1e0cc]/15 uppercase tracking-widest">
              © 2026 · Built with rigor &amp; caffeine
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

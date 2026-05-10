"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const REVEAL_TEXT =
  "Over the last several years, I have worked with systems that understand context better than humans. I open 17 tabs, ignore 15 of them, and still build something usable. I turn random ideas into working products, make AI do things it probably shouldn't, and debug issues that magically disappear when someone else looks.";

// Word-level reveal: ~50 motion elements vs ~300 char elements — 6× faster
function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-base md:text-lg leading-relaxed text-[#e1e0cc]" aria-label={text}>
      {words.map((word, i) => {
        const start = (i / words.length) * 0.82;
        const end = Math.min(1, start + 0.14);
        return <WordSpan key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
      })}
    </p>
  );
}

function WordSpan({
  word, progress, start, end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [Math.max(0, start), Math.min(1, end)], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

const floatingBadges = [
  { label: "Python", x: "8%",  y: "12%", delay: 0.2,  color: "#3b82f6" },
  { label: "LangChain", x: "72%", y: "8%",  delay: 0.5,  color: "#a855f7" },
  { label: "Next.js", x: "78%", y: "62%", delay: 0.9,  color: "#e1e0cc" },
  { label: "FastAPI", x: "5%",  y: "68%", delay: 1.2,  color: "#10b981" },
  { label: "LangGraph", x: "38%", y: "5%", delay: 0.7, color: "#f59e0b" },
  { label: "FAISS",    x: "60%", y: "88%", delay: 1.4, color: "#f43f5e" },
];

function AvatarVisual() {
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {/* Outermost faint ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/8"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Second ring with dashes */}
      <motion.div
        className="absolute inset-[10%] rounded-full border border-dashed border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Core avatar circle */}
      <div className="absolute inset-[22%] rounded-full border border-white/20 bg-[#0e0e0c] overflow-hidden flex items-center justify-center">
        {/* Gradient bg inside avatar */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 30%, rgba(225,224,204,0.12) 0%, transparent 70%)" }} />

        {/* Initials */}
        <span
          className="text-5xl md:text-6xl italic text-[#e1e0cc]/80 select-none relative z-10"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          VV
        </span>

        {/* Inner glow */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#e1e0cc]/5 to-transparent" />
      </div>

      {/* Orbiting dot on outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50%", originY: "50%" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e1e0cc]/60 shadow-[0_0_8px_rgba(225,224,204,0.8)]" />
      </motion.div>

      {/* Orbiting accent dot on inner dashed ring */}
      <motion.div
        className="absolute inset-[10%] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50%", originY: "50%" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-400/70 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
      </motion.div>

      {/* Floating tech badges */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute px-2.5 py-1 rounded-full text-[8px] uppercase tracking-widest font-mono border backdrop-blur-sm whitespace-nowrap"
          style={{
            left: badge.x, top: badge.y,
            borderColor: `${badge.color}40`,
            background: `${badge.color}12`,
            color: badge.color,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.85, scale: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: badge.delay, duration: 0.5 },
            scale: { delay: badge.delay, duration: 0.5 },
            y: { delay: badge.delay + 0.5, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {badge.label}
        </motion.div>
      ))}

      {/* Status pill */}
      <motion.div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/8 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">Available for work</span>
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" className="py-40 px-[5vw] bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest mb-14 opacity-55"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Who is this guy?
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-16"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          I don&apos;t just{" "}
          <span className="italic">&ldquo;code.&rdquo;</span>
          <br />
          <span className="text-[#e1e0cc]/35">
            I spawn systems out of caffeine, overthinking, and last-minute deadlines.
          </span>
        </motion.h2>

        {/* Two-column: avatar left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <AvatarVisual />
          </motion.div>

          <div className="space-y-10">
            <WordReveal text={REVEAL_TEXT} />

            <motion.div
              className="space-y-6 text-[#e1e0cc]/50 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <p>
                Currently obsessive about agentic workflows and human-computer symbiosis. If it&apos;s complex, I&apos;m interested. If it&apos;s &ldquo;impossible&rdquo;, I&apos;ve probably already tried it twice.
              </p>
              <p>
                Based in the intersection of art and engineering — where the most interesting bugs live and the most unexpected products are born.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/30">Currently</p>
                {[
                  "GenAI Intern @ SalesCode.ai — agentic BD automation",
                  "Scaling BlindCharm — 500+ users, AI matchmaking",
                  "B.E. Computer Engineering @ Thapar (2023 – 2027)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#e1e0cc]/40 mt-2 shrink-0" />
                    <span className="text-[#e1e0cc]/50 text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { n: "2+",   label: "Years building" },
            { n: "10+",  label: "Projects shipped" },
            { n: "500+", label: "BlindCharm users" },
            { n: "15%",  label: "LLM eval improvement" },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a0a] p-8 flex flex-col gap-2 hover:bg-[#111] transition-colors">
              <span
                className="text-4xl md:text-5xl font-bold text-[#e1e0cc] leading-none"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                {s.n}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

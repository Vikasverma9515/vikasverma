"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const patchNotes = [
  { version: "[v2.4.0]", text: "Updated caffeine tolerance threshold.",       highlight: false },
  { version: "[v2.3.1]", text: "Fixed bug where I'd agree to 2am meetings.",  highlight: false },
  { version: "[v2.2.0]", text: 'Added "Unsolicited AI Advice" module.',        highlight: false },
  { version: "[v2.1.0]", text: "My code works… until demo day.",               highlight: false },
  { version: "[active ]", text: "Optimizing for curiosity and speed.",         highlight: true  },
];

const funFacts = [
  {
    icon: "☕",
    label: "Fuel",
    text: "Survives on excessive amounts of Matcha.",
    highlight: false,
    rotate: "",
    accent: "#a16207",
    bg: "rgba(161,98,7,0.08)",
  },
  {
    icon: "🌙",
    label: "Peak hours",
    text: "100% more productive after midnight.",
    highlight: true,
    rotate: "rotate-2",
    accent: "#e1e0cc",
    bg: "#e1e0cc",
  },
  {
    icon: "🎧",
    label: "Soundtrack",
    text: "Can't work without Lofi or aggressive Techno.",
    highlight: false,
    rotate: "-rotate-1",
    accent: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
  },
  {
    icon: "🤖",
    label: "Hot take",
    text: "Believes LLMs are just spicy autocorrect.",
    highlight: false,
    rotate: "",
    accent: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
];

export default function Personality() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-40 px-[5vw] bg-neutral-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest opacity-60">
            The human behind the terminal
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Patch notes terminal card */}
          <motion.div
            className="bg-[#0d0d0b] p-10 rounded-[36px] border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Terminal chrome bar */}
            <div className="absolute top-0 inset-x-0 h-8 bg-white/[0.03] border-b border-white/5 flex items-center gap-1.5 px-4">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <span className="ml-3 text-[8px] font-mono text-white/20 uppercase tracking-widest">vikas_os — patch_notes.log</span>
            </div>

            {/* Background terminal icon */}
            <div className="absolute bottom-4 right-6 opacity-[0.04] select-none pointer-events-none">
              <span className="text-[88px] font-mono leading-none">{">"}_</span>
            </div>

            <h3
              className="text-3xl md:text-4xl italic mt-6 mb-8 text-[#e1e0cc]"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Personality Patch Notes
            </h3>

            <div className="space-y-5 font-mono text-sm">
              {patchNotes.map((note, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-4 items-start ${note.highlight ? "text-green-400" : "opacity-60"}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: note.highlight ? 1 : 0.6, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  {note.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0 animate-pulse" />
                  )}
                  <span className="flex-shrink-0 text-white/25">{note.version}</span>
                  <span>{note.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Blinking cursor — CSS */}
            <span className="inline-block mt-8 font-mono text-green-400 text-sm cursor-blink">
              █
            </span>
          </motion.div>

          {/* Fun facts 2×2 */}
          <div className="grid grid-cols-2 gap-4">
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-3xl flex flex-col justify-between min-h-[180px] relative overflow-hidden ${fact.rotate}`}
                style={{
                  background: fact.highlight ? fact.bg : fact.bg,
                  border: fact.highlight ? "none" : `1px solid ${fact.accent}20`,
                }}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Background decoration */}
                {!fact.highlight && (
                  <div
                    className="absolute bottom-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ background: fact.accent }}
                  />
                )}

                <div className="flex items-start justify-between">
                  <span className="text-3xl">{fact.icon}</span>
                  <span
                    className="text-[8px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full"
                    style={{
                      color: fact.highlight ? "rgba(0,0,0,0.4)" : `${fact.accent}`,
                      background: fact.highlight ? "rgba(0,0,0,0.08)" : `${fact.accent}18`,
                    }}
                  >
                    {fact.label}
                  </span>
                </div>

                <p
                  className={`text-sm leading-snug mt-4 ${
                    fact.highlight ? "font-bold text-black" : "italic"
                  }`}
                  style={fact.highlight ? {} : { color: `${fact.accent}cc` }}
                >
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

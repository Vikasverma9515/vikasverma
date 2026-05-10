"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-end pb-20 md:pb-28 overflow-hidden">

      {/* ── Video background ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Fade to black at bottom (blends into next section) */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* ── Floating status badges ── */}
      {/* <motion.div
        className="absolute top-[30%] left-[8%] floating z-20 hidden sm:block"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
      >
        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-[#e1e0cc]">
          Currently: Training AI 🤖
        </span>
      </motion.div> */}

      {/* <motion.div
        className="absolute top-[22%] right-[12%] floating-delayed z-20 hidden sm:block"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
      >
        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-[#e1e0cc]">
          Building Startups 💸
        </span>
      </motion.div> */}

      {/* <motion.div
        className="absolute bottom-[35%] right-[8%] floating-more z-20 hidden md:block"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
      >
        <span className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-red-200">
          Breaking Production 💀
        </span>
      </motion.div> */}

      {/* ── Live badge top-center ── */}
      <motion.div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="flex items-center gap-2 bg-white/8 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-[#e1e0cc]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to Work
        </span>
      </motion.div>

      {/* ── Main hero content (bottom-left aligned) ── */}
      <motion.div
        style={{ y: textY, opacity: textOp }}
        className="container mx-auto px-[5vw] relative z-10 w-full"
      >
        <div className="max-w-5xl">
          {/* Giant name */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
              className="leading-[0.85] italic tracking-tighter text-[#e1e0cc]"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(4rem, 15vw, 12rem)",
              }}
            >
              Vikas
              <sup className="text-[0.3em] align-super opacity-60">*</sup>
            </motion.h1>
          </div>

          {/* Bottom row: description + CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            <motion.p
              className="text-lg md:text-xl font-light leading-snug max-w-lg text-[#e1e0cc]/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            >
              Hi, I&apos;m Vikas. I build things that shouldn&apos;t exist…{" "}
              <em>but somehow work better than expected.</em>
              <br />
              <span className="text-[#e1e0cc]/45 text-sm mt-1 block">
                AI engineer · Full-stack developer · Accidental founder
              </span>
            </motion.p>

            <motion.div
              className="flex justify-start md:justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-4 bg-[#e1e0cc] text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 hover:bg-white transition-all duration-300"
              >
                Enter the lab
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#e1e0cc]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

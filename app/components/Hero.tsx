"use client";
import { motion } from "framer-motion";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-end pb-20 md:pb-28 overflow-hidden">

      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Fade to black at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Live badge */}
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

      {/* Main hero content */}
      <div className="container mx-auto px-[5vw] relative z-10 w-full">
        <div className="max-w-5xl">
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
      </div>

      {/* Scroll indicator — CSS only, no JS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#e1e0cc]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

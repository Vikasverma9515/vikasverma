"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const PatternWaves = dynamic(() => import("./react-bits/PatternWaves"), { ssr: false });
const DepthText = dynamic(() => import("./react-bits/DepthText"), { ssr: false });

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col">

      {/* PatternWaves — very subtle animated texture */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <PatternWaves
          preset="silk"
          color="#FFE500"
          backgroundColor="transparent"
          fade="edges"
          fadeSize={0.6}
          interactive={false}
          opacity={0.5}
          speed={0.12}
        />
      </div>

      {/* ── Central visual zone: sculpture + depth name ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[72vh]">

        {/* DepthText "VIKAS" — massive, behind the sculpture (desktop only) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden md:flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            <DepthText
              text="VIKAS"
              layers={28}
              depth={4}
              faceColor="rgba(225,224,204,0.15)"
              depthColor="rgba(255,229,0,0.04)"
              tilt={4}
              pointerTracking={true}
              smoothing={0.07}
              perspective={1100}
              fontSize="21vw"
              fontWeight={900}
              style={{
                fontFamily: "var(--font-almarai), sans-serif",
                letterSpacing: "-0.04em",
              }}
            />
          </motion.div>
        </div>

        {/* Sculpture image — in front of the name (z-10) */}
        <motion.div
          className="relative z-10 select-none"
          style={{ width: "clamp(300px, 36vw, 520px)", height: "clamp(400px, 48vw, 680px)" }}
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        >
          <Image
            src="/sculpture.png"
            alt="Vikas Verma"
            fill
            className="object-contain"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Floating italic name — bottom of sculpture zone */}
        <motion.p
          className="absolute bottom-[6%] text-center text-[#e1e0cc]/35 tracking-widest text-sm md:text-base"
          style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
        >
          Hi, I&apos;m Vikas Verma
        </motion.p>
      </div>

      {/* ── Bottom content strip ── */}
      <motion.div
        className="relative z-20 w-full px-6 pb-12 pt-2 flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.85, ease: EASE }}
      >
        {/* Thin Google Font heading */}
        <h1
          className="text-center text-[#e1e0cc] uppercase leading-tight max-w-xl"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            letterSpacing: "0.22em",
          }}
        >
          Build AI That Thinks.
        </h1>

        {/* Badge + name row */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center bg-[#FFE500] text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            AI Engineer
          </span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FFE500]/15 border border-[#FFE500]/25 flex items-center justify-center text-[10px] font-black text-[#FFE500]">
              VV
            </div>
            <span className="text-[#e1e0cc]/45 text-sm font-mono tracking-wider">Vikas Verma</span>
          </div>
        </div>

        {/* Email CTA */}
        <div className="flex items-center bg-white/[0.04] border border-white/[0.09] rounded-full p-1.5 w-full max-w-[360px] focus-within:border-[#FFE500]/30 transition-colors">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-[#e1e0cc] text-sm px-5 py-2 outline-none placeholder-[#e1e0cc]/18"
          />
          <a
            href={`mailto:vikasverma951582@gmail.com?subject=Let%27s%20work%20together&body=Hi%20Vikas%2C%20my%20email%20is%20${email}`}
            className="bg-[#e1e0cc] text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#FFE500] transition-colors shrink-0"
          >
            Contact
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-10 pt-5 border-t border-white/[0.07] w-full max-w-[360px] justify-center">
          {[
            { n: "2+", l: "Years building" },
            { n: "10+", l: "AI products" },
            { n: "500+", l: "Users impacted" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p
                className="text-2xl font-black text-[#e1e0cc] leading-none"
                style={{ fontFamily: "var(--font-almarai), sans-serif" }}
              >
                {s.n}
              </p>
              <p className="text-[8px] uppercase tracking-widest text-[#e1e0cc]/22 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { useScramble } from "../hooks/useScramble";
import { useState, useRef } from "react";
import ParallaxBackground from "./ParallaxBackground";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const scrambledTitle = useScramble("AI PRODUCT BUILDER");
    const scrambledSubtitle = useScramble("FULL-STACK DEVELOPER");

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); // Moves fast
    const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]); // Moves faster
    const descY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]); // Moves fastest
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]); // Fades out quicker

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black selection:bg-white selection:text-black">
            <ParallaxBackground />

            {/* Constrained Content */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-[1400px] mx-auto px-4 md:px-12 pt-20">
                <div className="space-y-8">
                    {/* Status Badge */}
                    <motion.div
                        style={{ y: titleY, opacity: textOpacity }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-sm font-mono tracking-widest uppercase text-zinc-400">
                            System <span className="text-red-500">REC</span>
                        </span>
                    </motion.div>

                    {/* MASSIVE Typography */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.h1
                            style={{ y: titleY, opacity: textOpacity }}
                            className="text-[12vw] leading-[0.85] font-black font-heading tracking-tighter text-white"
                        >
                            {scrambledTitle}
                        </motion.h1>
                        <motion.h1
                            style={{ y: subtitleY, opacity: textOpacity }}
                            className="text-[12vw] leading-[0.85] font-black font-heading tracking-tighter text-transparent disabled-text-stroke text-stroke-white text-zinc-800 selection:bg-[#FFB800] selection:text-black hover:text-[#FFB800] transition-colors duration-300 cursor-default"
                        >
                            {scrambledSubtitle}
                        </motion.h1>
                    </div>

                    {/* Subheadline & CTA */}
                    <motion.div
                        style={{ y: descY, opacity: textOpacity }}
                        className="flex flex-col md:flex-row items-end justify-between gap-12 pt-12 border-t border-zinc-800"
                    >
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-xl font-light leading-relaxed">
                            I build <span className="font-bold text-white">intelligent systems</span> and scalable products.
                            Founder of <span className="underline decoration-white decoration-2 underline-offset-4 text-white">BlindCharm</span>.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                href="#projects"
                                className="group relative px-8 py-4 bg-[#FFB800] text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105"
                            >
                                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    View Projects <HiArrowRight />
                                </span>
                            </Link>

                            <div className="flex gap-4">
                                <SocialLink href="https://github.com/Vikasverma9515" icon={<FaGithub />} />
                                <SocialLink href="https://www.linkedin.com/in/vikas-verma-264103275" icon={<FaLinkedin />} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* AI Avatar (Desktop) */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-screen"
            >
                {/* <motion.img
                            src="/ai_holographic_avatar_1770844034053.png"
                            alt="AI Avatar"
                            className="w-[500px] h-auto object-contain opacity-80"
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, -2, 0],
                                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        /> */}
            </motion.div>
        </section >
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110"
        >
            <span className="text-xl">{icon}</span>
        </a>
    );
}

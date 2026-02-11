"use client";

import Section from "./Section";
import Terminal from "./Terminal";
import { motion } from "framer-motion";

export default function About() {
    const terminalCommands = [
        {
            cmd: "whoami",
            output: "Vikas Verma. Full-Stack Developer. AI Product Builder."
        },
        {
            cmd: "cat current_focus.txt",
            output: [
                "> Building Agentic AI Workflows",
                "> Scaling Real-time Systems",
                "> Mastering Next.js & Supabase"
            ]
        },
        {
            cmd: "run skills_matrix.exe",
            output: "Loading neural network... [██████████] 100% DONE."
        }
    ];

    return (
        <Section id="about" className="relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: The Narrative (Human Side) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-sm tracking-widest uppercase">
            // System Bio
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black font-heading leading-tight text-white">
                        More Than Just <br />
                        <span className="text-zinc-500">Code.</span>
                    </h2>

                    <div className="space-y-6 text-lg text-zinc-400 leading-relaxed font-light">
                        <p>
                            I bridge the gap between <strong className="text-white font-bold">human creativity</strong> and <strong className="text-white font-bold">machine logic</strong>.
                        </p>
                        <p>
                            While others just write code, I architect **systems**. From launching AI-powered social platforms to building scalable financial tools, I thrive in the chaos of "zero to one".
                        </p>
                        <p>
                            My philosophy? <span className="italic text-zinc-300">If it's boring, automate it. If it's impossible, build it with AI.</span>
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <div className="flex flex-col">
                            <span className="text-4xl font-black font-heading text-white">2+</span>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">Years Exp</span>
                        </div>
                        <div className="w-[1px] h-12 bg-zinc-800" />
                        <div className="flex flex-col">
                            <span className="text-4xl font-black font-heading text-white">10+</span>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">Projects</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: The Terminal (Machine Side) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[400px] md:h-[500px] w-full"
                >
                    {/* Glassmorphism Background/Decor */}
                    <div className="absolute -inset-4 bg-zinc-800/20 rounded-2xl blur-2xl opacity-20" />

                    <Terminal commands={terminalCommands} />

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -right-6 bg-black border border-zinc-800 p-4 rounded-xl shadow-2xl hidden md:block"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-xs text-green-500">Vikas_OS v2.0 Running</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
}

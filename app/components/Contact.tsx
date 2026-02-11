"use client";

import Section from "./Section";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useScramble } from "../hooks/useScramble";

export default function Contact() {
    const scrambledTitle = useScramble("INITIALIZE HANDSHAKE");

    return (
        <Section id="contact" className="bg-black text-white relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/40 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white">
                        {scrambledTitle}
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Building the next generation of <span className="text-white font-bold">AI-native</span> products?
                        I'm ready to ship.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-stretch">

                    {/* Mission Card */}
                    <div className="bg-zinc-900/30 backdrop-blur-sm p-8 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                        <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Target Alignment
                        </h3>
                        <ul className="space-y-4 text-zinc-400">
                            {[
                                "AI-powered products & LLM agent workflows",
                                "High-scale Backend systems (Node/Supabase)",
                                "Zero-to-One product engineering",
                                "Teams that ship fast and break things"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <span className="mt-1.5 text-red-500 font-mono text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                                        {'>>'}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Card */}
                    <div className="flex flex-col justify-center space-y-6">
                        <a
                            href="mailto:vikasverma951582@gmail.com"
                            className="group relative flex items-center justify-center gap-4 px-8 py-6 bg-[#FFB800] text-black rounded-2xl font-bold text-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_-5px_rgba(255,184,0,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,184,0,0.5)]"
                        >
                            <FaEnvelope size={24} />
                            <span>EXECUTE_EMAIL_PROTOCOL</span>
                            <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />
                        </a>

                        <div className="grid grid-cols-2 gap-4">
                            <SocialBtn
                                href="https://www.linkedin.com/in/vikas-verma-264103275"
                                icon={<FaLinkedin size={24} />}
                                label="LinkedIn"
                            />
                            <SocialBtn
                                href="https://github.com/Vikasverma9515"
                                icon={<FaGithub size={24} />}
                                label="GitHub"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 group"
        >
            <div className="group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">{label}</span>
        </a>
    );
}

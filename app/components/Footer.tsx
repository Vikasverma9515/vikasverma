"use client";

import { useScramble } from "../hooks/useScramble";

export default function Footer() {
    const scrambledText = useScramble("LETS BUILD THE FUTURE");

    return (
        <footer className="bg-black text-white border-t border-zinc-800 pt-20 pb-10 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                    <div className="space-y-4">
                        <h2 className="text-[10vw] leading-[0.8] font-black font-heading tracking-tighter text-yellow-500 hover:text-white transition-colors duration-500">
                            {scrambledText}
                        </h2>
                        <p className="text-xl text-zinc-500 max-w-sm">
                            Open to selected opportunities for 2026.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-right">
                        <a href="mailto:vikasverma951582@gmail.com" className="text-2xl font-bold hover:text-white text-zinc-400 transition-colors">
                            vikasverma951582@gmail.com
                        </a>
                        <p className="text-zinc-500">Based in India • Available Worldwide</p>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-600">
                    <p>&copy; 2026 VIKAS VERMA. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8 font-mono uppercase tracking-widest">
                        <span>Instagram</span>
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>

            {/* Marquee Effect */}
            <div className="w-full bg-yellow-500 border-y  text-white py-2 mt-10 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block font-black text-lg tracking-widest uppercase">
                    &nbsp; • AI PRODUCT BUILDER • FULL STACK DEVELOPER • NEXT.JS EXPERT • SUPABASE • LLM ENGINEERING • UI/UX DESIGN •
                    &nbsp; • AI PRODUCT BUILDER • FULL STACK DEVELOPER • NEXT.JS EXPERT • SUPABASE • LLM ENGINEERING • UI/UX DESIGN •
                </div>
            </div>
        </footer>
    );
}

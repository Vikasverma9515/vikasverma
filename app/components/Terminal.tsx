"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
    commands: { cmd: string; output: string | string[] }[];
}

export default function Terminal({ commands }: TerminalProps) {
    const [lines, setLines] = useState<{ type: "cmd" | "output"; content: string }[]>([]);
    const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentCmdIndex >= commands.length) return;

        const command = commands[currentCmdIndex];
        let charIndex = 0;

        const typeCommand = () => {
            setIsTyping(true);
            const interval = setInterval(() => {
                setCurrentText(command.cmd.slice(0, charIndex + 1));
                charIndex++;

                if (charIndex === command.cmd.length) {
                    clearInterval(interval);
                    setIsTyping(false);

                    // Add command line
                    setLines((prev) => [...prev, { type: "cmd", content: command.cmd }]);
                    setCurrentText("");

                    // Process output after a delay
                    setTimeout(() => {
                        const outputLines = Array.isArray(command.output) ? command.output : [command.output];
                        outputLines.forEach(line => {
                            setLines(prev => [...prev, { type: "output", content: line }]);
                        });
                        setCurrentCmdIndex((prev) => prev + 1);
                    }, 500);
                }
            }, 50 + Math.random() * 50); // Random typing speed
        };

        const timeout = setTimeout(typeCommand, 1000); // Initial delay before typing starts

        return () => clearTimeout(timeout);
    }, [currentCmdIndex, commands]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, currentText]);

    return (
        <div className="w-full h-full bg-black/90 rounded-xl border border-zinc-800 backdrop-blur-sm p-4 font-mono text-sm overflow-hidden flex flex-col shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-zinc-500 text-xs">vikas@portfolio:~/about</span>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {lines.map((line, i) => (
                    <div key={i} className={`${line.type === "cmd" ? "text-green-400 font-bold mt-4" : "text-zinc-300"}`}>
                        {line.type === "cmd" && <span className="mr-2 text-blue-400">➜</span>}
                        {line.type === "cmd" && <span className="mr-2 text-purple-400">~</span>}
                        {line.content}
                    </div>
                ))}

                {/* Active Line */}
                <div className="text-green-400 font-bold mt-4">
                    {currentCmdIndex < commands.length && (
                        <>
                            <span className="mr-2 text-blue-400">➜</span>
                            <span className="mr-2 text-purple-400">~</span>
                            {currentText}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
                            />
                        </>
                    )}
                    {currentCmdIndex >= commands.length && (
                        <>
                            <span className="mr-2 text-blue-400">➜</span>
                            <span className="mr-2 text-purple-400">~</span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

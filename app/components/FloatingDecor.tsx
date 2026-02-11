"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const symbols = ["</>", "{ }", "01", "[]", "//", ";", "++", "&&", "||", "=>"];

export default function FloatingDecor() {
    const [items, setItems] = useState<{ id: number; x: number; y: number; s: string; d: number }[]>([]);

    useEffect(() => {
        // Generate random positions server-side safest items
        const newItems = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            s: symbols[Math.floor(Math.random() * symbols.length)],
            d: Math.random() * 20,
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0.5, 1, 0.5],
                        y: [0, -50],
                        x: [0, Math.random() * 20 - 10],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: item.d,
                        ease: "linear",
                    }}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                    }}
                    className="absolute text-zinc-300 dark:text-zinc-800 font-mono text-2xl font-bold opacity-0"
                >
                    {item.s}
                </motion.div>
            ))}

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_70%,transparent_100%)] opacity-20 pointer-events-none" />
        </div>
    );
}

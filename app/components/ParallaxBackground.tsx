"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Background Blobs - Slow movement (Far away)
    const yBlobs = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

    // Midground Particles - Standard Parallax
    const yMid1 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const yMid2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    // Foreground Elements - Fast movement (Close to camera, fly-through effect)
    const yFore1 = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
    const yFore2 = useTransform(scrollYProgress, [0, 1], ["0%", "-250%"]);

    return (
        <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
            {/* Background Blobs */}
            <motion.div
                style={{ y: yBlobs, rotate: rotate1 }}
                className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]"
            />
            <motion.div
                style={{ y: yBlobs, rotate: rotate2 }}
                className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]"
            />

            {/* Midground Particles */}
            <motion.div
                style={{ y: yMid1, opacity: 0.4 }}
                className="absolute top-[20%] right-[15%] w-3 h-3 bg-purple-400 rounded-full blur-[2px]"
            />
            <motion.div
                style={{ y: yMid2, opacity: 0.3 }}
                className="absolute top-[40%] left-[10%] w-2 h-2 bg-blue-400 rounded-full blur-[1px]"
            />

            {/* Foreground "Dust" - Moves very fast */}
            <motion.div
                style={{ y: yFore1, opacity: 0.2 }}
                className="absolute top-[80%] right-[20%] w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px]"
            />
            <motion.div
                style={{ y: yFore2, opacity: 0.1 }}
                className="absolute top-[60%] left-[5%] w-24 h-24 bg-purple-500/10 rounded-full blur-[30px]"
            />
            <motion.div
                style={{ y: yFore1, opacity: 0.6 }}
                className="absolute top-[90%] left-[30%] w-1 h-1 bg-white rounded-full blur-[0px]"
            />
        </div>
    );
}

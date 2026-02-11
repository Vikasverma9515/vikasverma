"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export default function Section({ children, id, className = "", delay = 0 }: SectionProps) {
    return (
        <section id={id} className={`w-full py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    );
}

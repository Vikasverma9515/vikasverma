"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="#" className="text-2xl font-bold font-heading tracking-tight">
                    Vikas<span className="text-[#FFB800]">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-mono font-medium text-zinc-500">LIVE</span>
                    </div>

                    <a
                        href="mailto:vikasverma951582@gmail.com"
                        className="px-6 py-2 bg-[#FFB800] text-black text-sm font-bold rounded-full hover:bg-[#E0A800] transition-colors"
                    >
                        Let's Talk
                    </a>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800"
                >
                    <div className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-zinc-600 dark:text-zinc-400"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="mailto:vikasverma951582@gmail.com"
                            className="px-4 py-2 bg-[#FFB800] text-black text-center font-bold rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Let's Talk
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}

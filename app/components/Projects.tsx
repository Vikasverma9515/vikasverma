"use client";

import Section from "./Section";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const projects = [
    {
        title: "BlindCharm",
        tagline: "AI-Powered Social Platform",
        description: "Launch with 500+ users. AI vibes matching, real-time blind dates, and zero-compromise privacy.",
        tech: ["Next.js", "Supabase", "WebSockets", "AI Agents"],
        links: { live: "https://blindcharm.com" },
        className: "md:col-span-2 bg-red-500 border border-zinc-800 text-white",
    },
    {
        title: "PBM - Brain Health",
        tagline: "E-Commerce & Education",
        description: "Official distributor platform for Vielight neuro-tech devices. Built for high-performance and SEO.",
        tech: ["Next.js", "React", "Tailwind", "Vercel"],
        links: { live: "https://pbm-smoky.vercel.app" },
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
    {
        title: "GitHub Analyzer",
        tagline: "Developer Tools",
        description: "Analyze GitHub profiles with deep insights. Visualize commit patterns, languages, and repo stats.",
        tech: ["React", "GitHub API", "Recharts"],
        links: { live: "https://git-hub-analyzer-orcin.vercel.app" },
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
    {
        title: "FinSync",
        tagline: "Intelligent Portfolio Manager",
        description: "AI that talks to your wallet. Automated projections and personalized investment advice.",
        tech: ["Next.js", "ML APIs"],
        links: { live: "https://finsync--ai.vercel.app" },
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
    {
        title: "JobNest",
        tagline: "Real-time Opportunities",
        description: "Role-based job discovery with live updates.",
        tech: ["React", "Supabase"],
        links: { live: "https://jobnest-psi.vercel.app" },
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
];

export default function Projects() {
    return (
        <Section id="projects">
            <h2 className="text-5xl md:text-7xl font-black font-heading mb-16 uppercase tracking-tighter">
                Ship <span className="text-zinc-300 dark:text-zinc-700">Code</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`group relative p-8 rounded-3xl flex flex-col justify-between overflow-hidden hover:scale-[1.02] transition-transform duration-500 ${project.className}`}
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-3xl font-black font-heading leading-none">
                                    {project.title}
                                </h3>
                                {project.links.live && (
                                    <Link
                                        href={project.links.live}
                                        target="_blank"
                                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                                    >
                                        <FaExternalLinkAlt size={16} />
                                    </Link>
                                )}
                            </div>
                            <p className="text-lg font-bold opacity-80 mb-4">{project.tagline}</p>
                            <p className="opacity-70 max-w-sm leading-relaxed text-sm">
                                {project.description}
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-2 py-1 text-xs font-bold uppercase tracking-wider border border-current opacity-60 rounded-md"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}

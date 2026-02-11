"use client";

import Section from "./Section";

const experiences = [
    {
        role: "Founder & Full-Stack Developer",
        company: "BlindCharm",
        period: "Jan 2025 – Present",
        description: "Architected and deployed a privacy-first AI dating platform.",
        achievements: [
            "Engineered real-time matching engine using Vector Embeddings & WebSockets.",
            "scaled infrastructure to support 500+ concurrent users on launch.",
            "Integrated Safety AI agents for real-time content moderation."
        ],
        tech: ["Next.js", "Supabase", "Vector DB", "OpenAI"],
        current: true
    },
    {
        role: "Software Developer Intern",
        company: "Pixeltec",
        period: "Sep 2025 – Dec 2025",
        description: "Feature development for high-traffic production web apps.",
        achievements: [
            "Optimized React render cycles, reducing TTI by 30%.",
            "Built automated testing pipelines for core workflows.",
            "Collaborated on system migration to Next.js App Router."
        ],
        tech: ["React", "TypeScript", "CI/CD"],
        current: false
    },
    {
        role: "AI Model Evaluator",
        company: "Outlier AI",
        period: "Nov 2024 – Present",
        description: "RLHF and evaluation for state-of-the-art LLMs.",
        achievements: [
            "Developed custom evaluation frameworks for code generation models.",
            "Analyzed failure modes in reasoning chains for extensive datasets."
        ],
        tech: ["Python", "RLHF", "Data Analysis"],
        current: false
    },
];

export default function Experience() {
    return (
        <Section id="experience" className="bg-white dark:bg-black">
            <h2 className="text-5xl md:text-7xl font-black font-heading mb-20 text-center uppercase tracking-tighter">
                Execution <span className="text-zinc-400 dark:text-zinc-700">Path</span>
            </h2>

            <div className="relative max-w-3xl mx-auto">
                {/* Central Timeline Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                            {/* Timeline Node */}
                            <div className={`absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-4 ${exp.current ? "border-[#FFB800] bg-[#FFB800]" : "border-white dark:border-black bg-zinc-900 dark:bg-zinc-100"} -translate-x-[9px] md:-translate-x-[9px] z-10 mt-6`} />

                            {/* Content Card */}
                            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                                <div className={`p-6 bg-zinc-50 dark:bg-black border rounded-xl transition-all duration-300 ${exp.current ? "border-[#FFB800]/50 shadow-[0_0_30px_-5px_rgba(255,184,0,0.1)]" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`text-lg font-bold font-heading uppercase tracking-wide ${exp.current ? "text-[#FFB800]" : ""}`}>{exp.role}</h3>
                                            <p className="text-zinc-500 text-sm font-mono mt-1">@ {exp.company}</p>
                                        </div>
                                        <span className="text-xs font-mono py-1 px-2 bg-zinc-200 dark:bg-zinc-900 rounded text-zinc-600 dark:text-zinc-400">
                                            {exp.period}
                                        </span>
                                    </div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="space-y-3">
                                        {exp.achievements.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm text-zinc-500 dark:text-zinc-500">
                                                <span className="mt-1.5 w-1 h-1 bg-zinc-400 rounded-full shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                                        {exp.tech.map(t => (
                                            <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

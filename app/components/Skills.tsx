"use client";

import Section from "./Section";

const skills = [
    {
        category: "AI / ML Architecture",
        items: ["LLMs", "RAG Pipelines", "Agentic Workflows", "OpenAI / Anthropic", "Vector DBs", "Model Eval", "Hugging Face"],
        className: "md:col-span-2 md:row-span-2 bg-purple-500 border border-white/10 text-white relative overflow-hidden",
        highlight: true
    },
    {
        category: "System Backend",
        items: ["Node.js", "Supabase", "PostgreSQL", "Redis", "WebSockets"],
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
    {
        category: "Frontend Engineering",
        items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        className: "bg-black border border-zinc-800 text-zinc-300",
    },
    {
        category: "DevOps & Cloud",
        items: ["Docker", "AWS", "CI/CD", "Vercel"],
        className: "md:col-span-2 bg-black border border-zinc-800 text-zinc-300",
    },
];

export default function Skills() {
    return (
        <Section id="skills" className="bg-black">
            <h2 className="text-5xl md:text-7xl font-black font-heading mb-16 uppercase tracking-tighter text-white">
                Tech <span className="text-zinc-600">Stack</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
                {skills.map((group, index) => (
                    <div
                        key={index}
                        className={`p-8 rounded-2xl flex flex-col justify-between group hover:border-[#FFB800]/50 transition-colors duration-300 ${group.className}`}
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold font-heading uppercase tracking-wider opacity-80 flex items-center gap-3">
                                {group.category}
                            </h3>
                            {/* @ts-ignore */}
                            {group.highlight && (
                                <span className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 rounded-full font-mono">CORE</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {group.items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-zinc-800 rounded-sm bg-zinc-900/50 text-zinc-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}

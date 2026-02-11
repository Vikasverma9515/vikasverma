"use client";

import Section from "./Section";
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaLaptopCode } from "react-icons/fa";
import { useEffect, useState } from "react";

const openSourceRepos = [
    {
        name: "Topsis-Vikas",
        description: "Python library for TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution).",
        stats: { stars: 12, forks: 4 },
        language: "Python",
        url: "https://pypi.org/project/Topsis-Vikas-102303451/"
    },
    {
        name: "Text-Generation-TOPSIS",
        description: "Evaluating text generation models using TOPSIS MCDM method.",
        stats: { stars: 8, forks: 2 },
        language: "Jupyter Notebook",
        url: "https://github.com/Vikasverma9515/Text-Generation-TOPSIS"
    },
    {
        name: "Credit-Card-Sampling",
        description: "Analysis of sampling techniques for credit card fraud detection datasets.",
        stats: { stars: 5, forks: 1 },
        language: "Python",
        url: "https://github.com/Vikasverma9515/Credit-Card-Sampling-Analysis"
    }
];

export default function OpenSource() {
    const [stats, setStats] = useState({
        repos: "...",
        contributions: "...",
        followers: "...",
        languages: "..."
    });

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                // 1. Fetch User Data
                const userRes = await fetch("https://api.github.com/users/vikasverma9515");
                const userData = await userRes.json();

                // 2. Fetch Repos for Language Calc
                const reposRes = await fetch("https://api.github.com/users/vikasverma9515/repos?per_page=100");
                const reposData = await reposRes.json();

                // Calculate Top Languages
                const langMap: Record<string, number> = {};
                if (Array.isArray(reposData)) {
                    reposData.forEach((repo: any) => {
                        if (repo.language) {
                            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                        }
                    });
                }
                const topLangs = Object.entries(langMap)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([lang]) => lang)
                    .join(" / ");

                // 3. Contributions (Backup estimate if API fails or for speed, 
                // but usually requires a proxy. For now, we'll use a realistic baseline 
                // logic or specific API if available. 
                // Using 210 as base based on user input, or 500+ as general estimate.
                // Let's stick to the specific 210 from screenshot if we can't fetch real.)
                // Note: Real realtime contribution graph fetching usually needs a specific proxy service.
                // We will default to the user's observed "210+" to be accurate to their request.

                setStats({
                    repos: userData.public_repos ? `${userData.public_repos}` : "26+",
                    contributions: "210+", // Hardcoded based on user screenshot/request for accuracy
                    followers: userData.followers ? `${userData.followers}` : "3",
                    languages: topLangs || "JS / Python"
                });

            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
                setStats({
                    repos: "26+",
                    contributions: "210+",
                    followers: "3",
                    languages: "Python / JS"
                });
            }
        };

        fetchGitHubStats();
    }, []);

    return (
        <Section id="opensource" className="bg-black text-white relative overflow-hidden py-20">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-800 pb-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter mb-2">
                            OPEN SOURCE
                        </h2>
                        <p className="text-zinc-500 font-mono text-sm">
                            Contributing to the ecosystem.
                        </p>
                    </div>
                    <a
                        href="https://github.com/Vikasverma9515"
                        target="_blank"
                        className="flex items-center gap-2 text-zinc-400 hover:text-[#FFB800] transition-colors font-mono text-sm"
                    >
                        <FaGithub />
                        <span>github.com/Vikasverma9515</span>
                    </a>
                </div>

                {/* Real-time Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-zinc-800">
                    {[
                        { label: "Public Repositories", value: stats.repos, color: "text-zinc-300", icon: <FaLaptopCode /> },
                        { label: "Contributions (Year)", value: stats.contributions, color: "text-[#FFB800]", icon: <FaCodeBranch /> },
                        { label: "Followers", value: stats.followers, color: "text-red-500", icon: <FaUsers /> },
                        { label: "Top Languages", value: stats.languages, color: "text-blue-400", icon: <FaStar /> }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 flex flex-col items-center text-center group hover:bg-zinc-900 transition-colors">
                            <span className={`text-2xl font-black font-heading ${stat.color} mb-2`}>
                                {stat.value}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {openSourceRepos.map((repo, idx) => (
                        <a
                            key={idx}
                            href={repo.url}
                            target="_blank"
                            className="group flex flex-col justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold font-mono group-hover:text-[#FFB800] transition-colors">
                                        {repo.name}
                                    </h3>
                                    <FaGithub className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500" />
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {repo.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-800/50">
                                <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    {repo.language}
                                </span>
                                <div className="flex gap-4 text-xs text-zinc-500 font-mono">
                                    <span className="flex items-center gap-1">
                                        <FaStar className="text-yellow-600" /> {repo.stats.stars}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaCodeBranch /> {repo.stats.forks}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </Section>
    );
}

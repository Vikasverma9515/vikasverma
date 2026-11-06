"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import VoiceShowcase, { MoodRadio } from "./components/VoiceShowcase";

const work = [
  {
    index: "01", type: "VOICE · HR TECH", title: "NehaHR",
    description: "An AI hiring partner that calls candidates, runs first round screens, and books interviews without adding another task to a recruiter’s day.",
    stack: "Python / Voice AI / LangGraph / Scheduling APIs", note: "Outbound calls, end to end",
  },
  {
    index: "02", type: "AGENTIC AI · OPEN SOURCE", title: "Cairn",
    description: "An in-app agent that takes a request by voice or text, then clicks, fills forms, and navigates unfamiliar software like a real person.",
    stack: "TypeScript / LLM agents / Voice AI", note: "Actions are schema checked",
  },
  {
    index: "03", type: "PRODUCT · FOUNDER", title: "BlindCharm",
    description: "A matchmaking product built solo, with personality first discovery, AI compatibility insights, real time chat, and thoughtful moderation.",
    stack: "Next.js / Supabase / PostgreSQL / AWS Rekognition", note: "1,000+ users · no paid marketing",
  },
  {
    index: "04", type: "ENTERPRISE · GENAI", title: "Benchmark Studio",
    description: "An evaluation and guardrail workspace for creating golden datasets and quality benchmarks that make AI systems more reliable.",
    stack: "Python / GenAI / Evaluation", note: "Built at Tredence Analytics",
  },
  {
    index: "05", type: "RAG · DEVELOPER TOOLS", title: "Support Agent",
    description: "A Teams based support agent grounded in product documentation and AST parsed codebase context, designed to answer common questions in the flow of work.",
    stack: "RAG / AST parsing / Microsoft Teams", note: "Built at Tredence Analytics",
  },
  {
    index: "06", type: "MULTIMODAL · MEETINGS", title: "Meeting Agent",
    description: "A real time voice and video agent that joins Google Meet as a participant and speaks with people in the room, engineered for low latency.",
    stack: "Tavus / Voice models / Multimodal AI", note: "Built at SalesCode.ai",
  },
];

const roles = [
  { dates: "MAY — JUL 2026", role: "AI Software Engineering Intern", place: "Tredence Analytics · Bengaluru", details: ["Owned a client-facing telephony voice agent builder from solution design through deployment.", "Built Benchmark Studio for golden datasets, quality benchmarks, AI evaluation, and guardrails.", "Created a RAG Support Agent grounded in enterprise docs and AST parsed code, with a Microsoft Teams bot.", "Worked with product and platform teams on agent orchestration and tool calling."] },
  { dates: "FEB — MAY 2026", role: "GenAI Intern", place: "SalesCode.ai · Remote", details: ["Built FAISS and Chroma retrieval pipelines for a Company Brain over structured and unstructured sales data.", "Orchestrated lead research, outreach, and follow ups with LangGraph and n8n.", "Built a low latency voice and video meeting agent for live Google Meet calls."] },
  { dates: "SEP — DEC 2025", role: "Software Developer — AI Implementation & Deployments", place: "Pixeltec · Remote", details: ["Shipped AI features for a live client product, integrated third party APIs, and built core product modules end to end."] },
  { dates: "AUG — DEC 2025", role: "Founder & Full Stack Developer", place: "BlindCharm · Hyderabad", details: ["Designed, built, and launched an AI matchmaking platform solo; grew to 1,000+ users without paid marketing.", "Built compatibility insights, real time chat, moderation workflows, and improved core PostgreSQL query performance."] },
  { dates: "NOV 2024 — FEB 2025", role: "AI Model Evaluator", place: "Outlier AI · Remote", details: ["Evaluated generated code and reasoning against structured rubrics; feedback supported model alignment and responsible AI quality."] },
];

const skills = [
  ["MAKE IT REASON", "LLMs · RAG · Agentic AI · Multi agent orchestration · LangChain · LangGraph · Vector search · Evaluation & guardrails"],
  ["MAKE IT SPEAK", "Voice AI · Speech to text · Text to speech · Real time agents · Multimodal voice & video · Prompt orchestration"],
  ["MAKE IT SHIP", "Python · TypeScript · JavaScript · React · Next.js · FastAPI · PostgreSQL · REST APIs · Supabase"],
  ["MAKE IT LAST", "AWS · Azure · Vercel · n8n · Git · JIRA · Technical documentation · Agile delivery · Stakeholder collaboration"],
];

const oldProjects = [
  ["Voxera", "Voice AI · multi agent orchestration, post call summaries, emotion detection, patient management and outbound calling."],
  ["FinSync", "Personal finance · Groq powered assistant, NSE tracking, investment and tax planners, and portfolio insights."],
  ["JobNest", "Hiring · role based discovery, smart search, Supabase live updates, and Clerk authentication."],
  ["More experiments", "PBM Brain Health · GitHub Analyzer · AI evaluator tools · stakeholder mapping automation."],
];

function WebLines() {
  return <svg className="web-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 245 C180 12 318 455 520 194 S830 80 1010 279 1280 452 1500 180M-70 660 C140 440 330 820 520 590 S850 355 1040 600 1300 775 1500 500M210 -40 C80 180 545 270 270 470 S420 810 360 960M880 -80 C700 140 1110 270 800 400 S1040 740 930 960M1320 -80 C1180 160 1500 220 1220 450 S1400 720 1300 960"/><path d="M-40 245L-70 660M520 194L520 590M1010 279L1040 600M1500 180L1500 500M210 -40L270 470M880 -80L800 400M1320 -80L1220 450" className="web-spokes"/></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [{ text: "Index", href: "#top" }, { text: "Voice", href: "#voice" }, { text: "Work", href: "#work" }, { text: "Experience", href: "#experience" }, { text: "Toolbox", href: "#toolbox" }, { text: "Say hi", href: "#contact" }];
  return (
    <main className="portfolio-shell" id="top">
      <div className="portfolio-canvas">
        <WebLines />
        <header className="topbar">
          <a className="brand" href="#top" data-silk-anchor aria-label="Vikas Verma home"><span className="brand-icon"><i/></span><span>vikas<span className="brand-dot">.</span></span></a>
          <nav className="desktop-nav" aria-label="Main navigation">{nav.map(n => <a href={n.href} key={n.text} data-silk-anchor>{n.text}</a>)}</nav>
          <a className="availability" href="#contact" data-silk-anchor><span className="live-dot"/> available for good problems</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X/> : <Menu/>}</button>
          {menuOpen && <nav className="mobile-nav">{nav.map(n => <a onClick={() => setMenuOpen(false)} href={n.href} key={n.text}>{n.text}</a>)}</nav>}
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-overline"><span>AI ENGINEER</span><span className="overline-rule"/><span>PATIALA, INDIA · 30°20′N</span></div>
          <div className="hero-title-wrap">
            <h1 id="hero-title"><span>VIKAS</span> <span>VERMA</span></h1>
            <p className="hero-index">A builder of<br/>useful intelligence.<br/><span>Est. 2023—∞</span></p>
            <div className="hero-orbit" aria-hidden="true"><span>✳</span><b>VV</b></div>
          </div>
          <div className="hero-cup" aria-hidden="true"><span>still<br/><em>building</em></span><i/></div>
          <div className="hero-radio-wrap"><MoodRadio/></div>
          <a className="hero-ticket" href="#voice" data-silk-anchor><small>ADMIT ONE <span>NO. 0208</span></small><b>voice agents<br/>that get it done</b><span className="ticket-footer">NehaHR · Cairn · Tredence</span></a>
          <div className="hero-worknote" aria-label="Build notes"><span className="note-pin"/><small>NOTES FROM THE BUILD</small><p><i>✓</i> Listen for intent</p><p><i>✓</i> Make the action clear</p><p><i>↗</i> Leave room for a human</p><span className="worknote-signoff">ONE GOOD TURN AT A TIME</span></div>
          <div className="hero-shirt" aria-hidden="true"><span>PLEASE<br/>DON’T DUST</span><small>eight legs live here</small><i>✳</i></div>
          <div className="hero-bottom">
            <p>From a half formed idea<br/>to software people can use.</p>
            <a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDownRight/></a>
            <a className="hero-contact" href="mailto:vikasverma951582@gmail.com" data-silk-anchor>LET’S MAKE SOMETHING MATTER <ArrowUpRight size={16}/></a>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>BUILT<br/>AT 2AM</span><b>✳</b><small>and shipped anyway</small></div>
        </section>

        <div className="ticker" aria-hidden="true"><div>{Array.from({length: 4}, (_,i)=><span key={i}>IDEA → SYSTEM → PRODUCT <i>✳</i> AI WITH A POINT OF VIEW <i>✳</i> </span>)}</div></div>

        <section className="intro section-pad" id="about">
          <div className="section-label"><span>01 / A LITTLE CONTEXT</span><span>HUMAN FIRST, MACHINE ASSISTED</span></div>
          <div className="intro-grid">
            <h2>I turn <em>“what if?”</em><br/>into <span>“it works.”</span></h2>
            <div className="intro-copy"><p>I’m a computer engineering student and AI engineer who likes the part where an idea becomes a real product. I build grounded AI systems, voice agents, and full stack tools—from first sketch to deployment.</p><p>Right now I’m building an in-app agent for Cairn. Before that, I helped teams put reliable GenAI into the tools people already use.</p><div className="intro-note"><span className="note-mark">✳</span><span>Founder, <b>BlindCharm</b><br/>1,000+ people found their way in.</span></div></div>
          </div>
          <div className="stats-row"><div><strong>1K<span>+</span></strong><small>BlindCharm users</small></div><div><strong>05</strong><small>teams & products</small></div><div><strong>∞</strong><small>things still to build</small></div><a href="/resume.pdf" target="_blank" className="resume-link" data-silk-anchor>OPEN THE FULL RESUME <ArrowUpRight size={15}/></a></div>
        </section>

        <VoiceShowcase />

        <section className="work-section section-pad" id="work">
          <div className="section-label"><span>03 / SELECTED WORK</span><span>MADE TO BE USED</span></div>
          <div className="section-heading"><h2>Things I’ve<br/><em>put into motion.</em></h2><p>Some started as experiments. Some became tools people rely on. All of them taught me something.</p></div>
          <div className="work-grid">{work.map((p, i)=><article className={`work-card work-card-${i+1}`} key={p.index} data-silk-anchor><div className="card-top"><span>{p.index} / {p.type}</span><ArrowUpRight size={18}/></div><div className="card-art" aria-hidden="true"><span className="art-orbit orbit-a"/><span className="art-orbit orbit-b"/><span className="art-core">{i===0 ? "N" : i===1 ? "C" : i===2 ? "♡" : i===3 ? "◎" : i===4 ? "⌘" : "◉"}</span><span className="art-caption">{p.note}</span></div><h3>{p.title}</h3><p className="card-description">{p.description}</p><div className="card-stack">{p.stack}</div></article>)}</div>
          <div className="archive"><div className="archive-heading"><span>FROM THE WORKBENCH</span><span>OLDER BUILDS & SIDE QUESTS</span></div><div className="archive-grid">{oldProjects.map(([name, desc],i)=><div className="archive-item" key={name}><span>0{i+1}</span><div><b>{name}</b><p>{desc}</p></div><ArrowUpRight size={15}/></div>)}</div><a className="github-link" href="https://github.com/Vikasverma9515" target="_blank" rel="noreferrer" data-silk-anchor>MORE LITTLE MACHINES ON GITHUB <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <div className="section-label"><span>04 / THE THINGS I LEARNED</span><span>WORK IN PROGRESS, ALWAYS</span></div>
          <div className="section-heading"><h2>Work that<br/><em>shaped the work.</em></h2><p>Good products are made with other people. Here’s where I’ve had the chance to build together.</p></div>
          <div className="timeline">{roles.map((r,i)=><article className="timeline-row" key={r.role}><span className="timeline-index">0{i+1}</span><div className="timeline-role"><small>{r.dates}</small><h3>{r.role}</h3><p>{r.place}</p></div><ul>{r.details.map(d=><li key={d}>{d}</li>)}</ul></article>)}</div>
          <div className="education"><span>STILL LEARNING</span><p><b>Thapar Institute of Engineering & Technology</b><br/>B.E. Computer Engineering · 2023—2027 · Patiala, Punjab</p><span>THE NEXT CHAPTER IS OPEN</span></div>
        </section>

        <section className="toolbox-section section-pad" id="toolbox">
          <div className="section-label"><span>05 / THINGS I REACH FOR</span><span>TOOLS ARE ONLY THE BEGINNING</span></div>
          <div className="section-heading"><h2>A practical<br/><em>little toolbox.</em></h2><p>Pick the right tools, stay curious, and leave things easier for the next person.</p></div>
          <div className="toolbox-grid">{skills.map(([label, list],i)=><article key={label}><span>0{i+1}</span><h3>{label}</h3><p>{list}</p></article>)}</div>
          <div className="languages"><span>ALSO SPEAK</span><b>Clear documentation</b><i>·</i><b>Agile delivery</b><i>·</i><b>Stakeholder conversations</b><i>·</i><b>Good questions</b></div>
        </section>

        <footer className="contact-section section-pad" id="contact">
          <div className="section-label"><span>06 / YOUR TURN</span><span>NO FORM, NO FUSS</span></div>
          <div className="contact-copy"><span className="contact-asterisk">✳</span><h2>Have a good<br/><em>“what if?”</em></h2><a href="mailto:vikasverma951582@gmail.com" className="contact-email" data-silk-anchor>Let’s talk about it <ArrowUpRight/></a></div>
          <div className="footer-bottom"><a className="brand" href="#top"><span className="brand-icon"><i/></span><span>vikas<span className="brand-dot">.</span></span></a><span>COMPUTER ENGINEERING · THAPAR ’27</span><div><a href="tel:+916302206340">PHONE ↗</a><a href="https://www.linkedin.com/in/vikas-verma-264103275" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://github.com/Vikasverma9515" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://vikasverma-sigma.vercel.app" target="_blank" rel="noreferrer">PORTFOLIO ↗</a></div><span>MADE WITH INTENT · 2026</span></div>
        </footer>
      </div>
    </main>
  );
}

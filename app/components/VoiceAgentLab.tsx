"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Headphones,
  Compass,
  CalendarClock,
  BookOpen,
  TriangleAlert,
  Volume2,
  Mic,
  User,
  Bot,
  Play,
  RotateCcw,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Simulated call script — drives both the diagram and the transcript ── */
const CALL_SCRIPT = [
  { speaker: "caller", text: "Hey, I need to reschedule my appointment from Thursday." },
  { speaker: "system", text: "STT → transcribing audio stream (Deepgram · ~180ms)" },
  { speaker: "system", text: "Orchestrator → intent: reschedule_appointment (0.94 confidence)" },
  { speaker: "system", text: "Orchestrator → routing to Scheduling Agent" },
  { speaker: "agent", text: "Sure — I can move Thursday's 3 PM slot. Does Friday, same time, work for you?" },
  { speaker: "system", text: "TTS → synthesizing voice response (ElevenLabs · ~90ms)" },
  { speaker: "system", text: "Call complete → 640ms end-to-end · logged for post-call analysis" },
] as const;

const STEP_DELAY = 850;
const STEP_START = 650;

const voiceChips = [
  { label: "Deepgram",         sub: "Real-time STT",     color: "#3b82f6" },
  { label: "ElevenLabs",       sub: "Voice synthesis",   color: "#f59e0b" },
  { label: "LiveKit / WebRTC", sub: "Call transport",    color: "#06b6d4" },
  { label: "Twilio",           sub: "Telephony",         color: "#e1e0cc" },
  { label: "LangGraph",        sub: "Agent routing",     color: "#a855f7" },
  { label: "Pipecat",          sub: "Voice pipelines",   color: "#10b981" },
  { label: "Supabase Realtime",sub: "Live call state",   color: "#22c55e" },
  { label: "Groq",             sub: "Low-latency inference", color: "#f43f5e" },
];

function Connector({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:block relative w-10 h-px bg-white/10 shrink-0 overflow-hidden self-center">
      <motion.div
        className="absolute inset-0 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #e1e0cc, transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  );
}

function NodeCard({
  label, sub, icon: Icon, color, active, dim,
}: { label: string; sub?: string; icon: LucideIcon; color: string; active: boolean; dim?: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center text-center gap-1.5 px-4 py-4 rounded-2xl border w-full lg:w-32 shrink-0"
      animate={{
        borderColor: active ? `${color}70` : "rgba(255,255,255,0.07)",
        backgroundColor: active ? `${color}14` : "rgba(255,255,255,0.02)",
        scale: active ? 1.05 : 1,
        opacity: dim && !active ? 0.4 : 1,
      }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {active && (
        <span
          className="absolute inset-0 rounded-2xl node-pulse pointer-events-none"
          style={{ border: `1px solid ${color}` }}
        />
      )}
      <Icon size={18} className="relative z-10" style={{ color: active ? color : "#e1e0cc99" }} />
      <p className="text-[11px] font-bold relative z-10" style={{ color: active ? color : "#e1e0cc99" }}>
        {label}
      </p>
      {sub && <p className="text-[9px] opacity-40 relative z-10">{sub}</p>}
    </motion.div>
  );
}

function OrchestrationDiagram({ activeStep }: { activeStep: number }) {
  const callerActive = activeStep >= 0;
  const sttActive = activeStep >= 1;
  const orchActive = activeStep >= 2;
  const agentActive = activeStep >= 3;
  const ttsActive = activeStep >= 5;
  const delivered = activeStep >= 6;

  return (
    <div className="p-6 md:p-8 rounded-3xl border border-white/8 bg-white/[0.015]">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0">
        <NodeCard
          label="Caller"
          sub={delivered ? "Delivered" : "On the line"}
          icon={delivered ? CircleCheck : Phone}
          color={delivered ? "#10b981" : "#e1e0cc"}
          active={callerActive}
        />
        <Connector active={sttActive} />
        <NodeCard label="Speech-to-Text" sub="Deepgram" icon={Headphones} color="#3b82f6" active={sttActive} />
        <Connector active={orchActive} />
        <NodeCard label="Orchestrator" sub="LangGraph router" icon={Compass} color="#a855f7" active={orchActive} />
        <Connector active={agentActive} />

        <div className="flex flex-row lg:flex-col gap-2 shrink-0">
          <NodeCard label="Scheduling Agent" icon={CalendarClock} color="#10b981" active={agentActive} />
          <NodeCard label="Knowledge Agent" sub="RAG" icon={BookOpen} color="#06b6d4" active={false} dim />
          <NodeCard label="Escalation Agent" icon={TriangleAlert} color="#f43f5e" active={false} dim />
        </div>

        <Connector active={ttsActive} />
        <NodeCard label="Text-to-Speech" sub="ElevenLabs" icon={Volume2} color="#f59e0b" active={ttsActive} />
      </div>
    </div>
  );
}

function CallTranscript({ activeStep, running }: { activeStep: number; running: boolean }) {
  const lines = CALL_SCRIPT.slice(0, activeStep + 1);
  return (
    <div className="p-6 rounded-3xl border border-white/8 bg-[#0d0d0b] h-full flex flex-col min-h-[280px]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <span className={`w-1.5 h-1.5 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-white/20"}`} />
        <span className="text-[9px] uppercase tracking-widest text-[#e1e0cc]/35 font-mono">
          {running ? "Live call trace" : "Call trace"}
        </span>
      </div>

      <div className="flex-1 space-y-3 font-mono text-xs overflow-y-auto">
        {lines.length === 0 && (
          <p className="opacity-30 italic">Press &ldquo;Simulate call&rdquo; to watch the agents work.</p>
        )}
        {lines.map((line, i) => {
          if (line.speaker === "system") {
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 0.45, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] pl-3 border-l border-white/10"
              >
                › {line.text}
              </motion.p>
            );
          }
          const isAgent = line.speaker === "agent";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-xl leading-relaxed ${
                  isAgent ? "bg-green-500/10 border border-green-500/25 text-green-300" : "bg-white/5 border border-white/10 text-[#e1e0cc]/85"
                }`}
              >
                {isAgent ? (
                  <Bot size={13} className="inline-block mr-1.5 -mt-0.5 opacity-40" />
                ) : (
                  <User size={13} className="inline-block mr-1.5 -mt-0.5 opacity-40" />
                )}
                {line.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MicWaveform() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [levels, setLevels] = useState<number[]>(Array(24).fill(6));
  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (ctxRef.current && ctxRef.current.state !== "closed") ctxRef.current.close().catch(() => {});
    streamRef.current = null;
    ctxRef.current = null;
    rafRef.current = null;
    setEnabled(false);
    setLevels(Array(24).fill(6));
  }, []);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteFrequencyData(data);
        setLevels(
          Array.from({ length: 24 }, (_, i) => {
            const v = data[Math.floor((i / 24) * data.length)] ?? 0;
            return Math.max(6, (v / 255) * 56);
          })
        );
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
      setError(false);
      setEnabled(true);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  return (
    <div className="p-6 rounded-3xl border border-white/8 bg-white/[0.02] flex flex-col items-center text-center gap-4">
      <p className="text-[9px] uppercase tracking-widest text-[#e1e0cc]/35">Live mic test</p>
      <div className="flex items-end justify-center gap-[3px] h-14 w-full">
        {levels.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full"
            style={{ background: enabled ? "#10b981" : "rgba(225,224,204,0.15)" }}
            animate={{ height: h }}
            transition={{ duration: 0.08 }}
          />
        ))}
      </div>
      <button
        onClick={enabled ? stop : start}
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
        style={{ background: enabled ? "rgba(16,185,129,0.12)" : "transparent", color: enabled ? "#10b981" : "#e1e0cc" }}
      >
        <Mic size={13} />
        {enabled ? "Stop" : "Test your mic"}
      </button>
      {error && <p className="text-[9px] text-rose-400/70">Mic access denied — enable it in your browser to try live.</p>}
      <p className="text-[9px] opacity-30 leading-relaxed">
        Runs entirely in your browser via the Web Audio API. Nothing is recorded, stored, or sent anywhere.
      </p>
    </div>
  );
}

export default function VoiceAgentLab() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const simulateCall = () => {
    clearTimers();
    setActiveStep(-1);
    setRunning(true);
    CALL_SCRIPT.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveStep(i);
        if (i === CALL_SCRIPT.length - 1) setRunning(false);
      }, STEP_START + i * STEP_DELAY);
      timeouts.current.push(t);
    });
  };

  useEffect(() => clearTimers, []);

  return (
    <section id="voice" className="py-40 px-[5vw] bg-neutral-950 border-t border-white/5 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest mb-8 opacity-60">
              The actual specialty
            </div>
            <h2
              className="text-5xl md:text-6xl italic mb-6 leading-tight"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Voice Agents{" "}
              <span className="text-xl not-italic opacity-40 block mt-2" style={{ fontFamily: "var(--font-almarai)" }}>
                (I build the thing you&apos;re talking to)
              </span>
            </h2>
            <p className="text-lg opacity-60 leading-relaxed">
              Not just a chatbot with a voice bolted on. I design the whole call: real-time transcription,
              an orchestrator that routes intent to the right specialist agent, and sub-second speech synthesis —
              with barge-in, fallbacks, and post-call analytics baked in.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <MicWaveform />
          </motion.div>
        </div>

        {/* Live simulation */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35">
              Multi-agent call orchestration — click to watch it route
            </p>
            <button
              onClick={simulateCall}
              disabled={running}
              className="inline-flex items-center gap-2 bg-[#e1e0cc] text-black px-6 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {running ? (
                "Call in progress…"
              ) : activeStep >= 0 ? (
                <>
                  <RotateCcw size={12} /> Replay call
                </>
              ) : (
                <>
                  <Play size={12} /> Simulate call
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
            <OrchestrationDiagram activeStep={activeStep} />
            <CallTranscript activeStep={activeStep} running={running} />
          </div>
        </motion.div>

        {/* Tech chips */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          {voiceChips.map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-300"
            >
              <div className="w-2 h-2 rounded-full mb-3" style={{ background: item.color }} />
              <p className="text-sm font-bold text-[#e1e0cc]/80">{item.label}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#e1e0cc]/30 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Case study callout */}
        <motion.div
          className="mt-8 p-8 rounded-3xl border border-white/10 bg-[#0d0d0b] relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
        >
          <div className="absolute right-6 top-6 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 opacity-50">
            In active development
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[#e1e0cc]/35 mb-2">Currently shipping</p>
          <h3 className="text-2xl md:text-3xl italic mb-4" style={{ fontFamily: "var(--font-instrument-serif)" }}>
            VOXERA — an AI voice agent platform
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#e1e0cc]/55 leading-relaxed max-w-4xl">
            {[
              "Post-call analysis — auto-generated summaries and emotion detection per call",
              "Live ops dashboard for monitoring calls as they happen",
              "Patient management and bulk outbound calling workflows",
              "Rebuilt the voice pipeline for lower latency and reliability, incl. RAG/prompt quality tuning",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1.5 shrink-0 text-[#e1e0cc]/30">•</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

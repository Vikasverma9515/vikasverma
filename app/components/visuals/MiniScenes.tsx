"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Plus } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SceneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-28 rounded-xl border border-white/8 bg-white/[0.015] overflow-hidden">
      {children}
    </div>
  );
}

/* ── Shared pixel-precise node/line helpers (260×112 canvas) ── */
export function Dot({
  x, y, size = 9, color, delay = 0, pulse = false, faint = false,
}: { x: number; y: number; size?: number; color: string; delay?: number; pulse?: boolean; faint?: boolean }) {
  return (
    <motion.span
      className="absolute rounded-full"
      style={{ left: x, top: y, width: size, height: size, background: faint ? `${color}40` : color, transform: "translate(-50%,-50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      {pulse && <span className="absolute inset-0 rounded-full node-pulse" style={{ border: `1px solid ${color}` }} />}
    </motion.span>
  );
}

export function Line({ x1, y1, x2, y2, color, delay = 0 }: { x1: number; y1: number; x2: number; y2: number; color: string; delay?: number }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <motion.div
      className="absolute h-px origin-left"
      style={{ left: x1, top: y1, width: length, background: `linear-gradient(90deg, ${color}00, ${color}90, ${color}00)`, transform: `rotate(${angle}deg)` }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    />
  );
}

function Block({ x, y, icon: Icon, color, delay = 0, dashed = false }: { x: number; y: number; icon?: LucideIcon; color: string; delay?: number; dashed?: boolean }) {
  return (
    <motion.div
      className={`absolute rounded-md flex items-center justify-center ${dashed ? "border border-dashed" : "border"}`}
      style={{ left: x, top: y, width: 30, height: 24, transform: "translate(-50%,-50%)", borderColor: `${color}60`, background: dashed ? "transparent" : `${color}16` }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {Icon ? <Icon size={12} style={{ color }} /> : <Plus size={12} style={{ color: `${color}80` }} />}
    </motion.div>
  );
}

/* ── 1. FlowScene — horizontal pipeline stages ── */
export function FlowScene({ steps, color }: { steps: { icon: LucideIcon; label: string }[]; color: string }) {
  return (
    <SceneFrame>
      <div className="flex items-center justify-center h-full px-4 gap-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: `${color}16`, borderColor: `${color}50` }}>
                <s.icon size={14} style={{ color }} />
              </span>
              <span className="text-[7px] uppercase tracking-wider text-[#e1e0cc]/40 whitespace-nowrap">{s.label}</span>
            </div>
            {i < steps.length - 1 && <ArrowRight size={11} className="opacity-25 mb-4" />}
          </motion.div>
        ))}
      </div>
    </SceneFrame>
  );
}

/* ── 2. ChatScene — conversational agent transcript ── */
export function ChatScene({ color, badge, icon: Icon }: { color: string; badge?: string; icon: LucideIcon }) {
  return (
    <SceneFrame>
      {badge && (
        <span className="absolute top-2 right-2 text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-[#e1e0cc]/40">
          {badge}
        </span>
      )}
      <div className="flex flex-col justify-center h-full px-4 gap-2">
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
          <span className="h-2 rounded-full bg-white/10" style={{ width: "60%" }} />
        </motion.div>
        <motion.div
          className="flex items-center gap-1.5 justify-end"
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <span className="h-2 rounded-full" style={{ width: "45%", background: `${color}50` }} />
          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}25` }}>
            <Icon size={10} style={{ color }} />
          </span>
        </motion.div>
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.4 }}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
          <span className="h-2 rounded-full bg-white/10" style={{ width: "35%" }} />
        </motion.div>
      </div>
    </SceneFrame>
  );
}

/* ── 3. NetworkScene — central hub + satellite mesh ── */
export function NetworkScene({ color }: { color: string }) {
  const satellites: [number, number][] = [[70, 30], [190, 30], [50, 85], [210, 85], [130, 20], [130, 95]];
  return (
    <SceneFrame>
      {satellites.map(([x, y], i) => (
        <Line key={i} x1={130} y1={56} x2={x} y2={y} color={color} delay={0.08 + i * 0.06} />
      ))}
      {satellites.map(([x, y], i) => (
        <Dot key={i} x={x} y={y} size={6} color={color} delay={0.2 + i * 0.06} />
      ))}
      <Dot x={130} y={56} size={16} color={color} pulse />
    </SceneFrame>
  );
}

/* ── 4. BuilderScene — no-code agent-builder canvas ── */
export function BuilderScene({ color, icons }: { color: string; icons: LucideIcon[] }) {
  const xs = [40, 110, 180];
  return (
    <SceneFrame>
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <Line x1={40} y1={56} x2={110} y2={56} color={color} delay={0.1} />
      <Line x1={110} y1={56} x2={180} y2={56} color={color} delay={0.25} />
      <Line x1={180} y1={56} x2={230} y2={56} color={color} delay={0.4} />
      {xs.map((x, i) => (
        <Block key={i} x={x} y={56} icon={icons[i]} color={color} delay={0.15 + i * 0.15} />
      ))}
      <Block x={230} y={56} color={color} delay={0.55} dashed />
    </SceneFrame>
  );
}

/* ── 5. DashScene — mock analytics dashboard ── */
export function DashScene({ color, bars }: { color: string; bars: number[] }) {
  return (
    <SceneFrame>
      <div className="absolute inset-0 p-3 flex flex-col">
        <div className="flex gap-1.5 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
        </div>
        <div className="flex-1 flex items-end gap-1.5 pb-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm origin-bottom"
              style={{ background: i === bars.length - 1 ? color : `${color}45` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: h }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}

/* ── 6. ChecklistScene — rubric / verification checklist ── */
export function ChecklistScene({ color, items, stat }: { color: string; items: string[]; stat?: string }) {
  return (
    <SceneFrame>
      <div className="absolute inset-0 px-4 py-3 flex flex-col justify-center gap-1.5">
        {items.map((c, i) => (
          <motion.div
            key={c}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <motion.span
              className="w-3 h-3 rounded-full border shrink-0"
              style={{ borderColor: `${color}80` }}
              initial={{ background: "transparent" }}
              whileInView={{ background: color }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
            />
            <span className="text-[9px] text-[#e1e0cc]/50">{c}</span>
          </motion.div>
        ))}
        {stat && (
          <motion.p
            className="text-[9px] font-bold mt-1"
            style={{ color }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {stat}
          </motion.p>
        )}
      </div>
    </SceneFrame>
  );
}

/* ── 7. WaveScene — audio waveform (voice features) ── */
export function WaveScene({ color, icon: Icon }: { color: string; icon: LucideIcon }) {
  const heights = [10, 18, 28, 16, 34, 20, 30, 14, 24, 12, 20, 28, 16, 10];
  return (
    <SceneFrame>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-end gap-[3px] h-9">
          {heights.map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full"
              style={{ background: `${color}${i % 3 === 0 ? "" : "90"}` }}
              initial={{ height: 4 }}
              whileInView={{ height: [4, h, h * 0.6, h, 4] }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.05, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
          ))}
        </div>
        <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-[#e1e0cc]/35">
          <Icon size={9} style={{ color }} /> live
        </span>
      </div>
    </SceneFrame>
  );
}

/* ── 8. OrbitScene — matches/entities orbiting a center ── */
export function OrbitScene({ color }: { color: string }) {
  const rings = [22, 36, 48];
  const orbiters = [
    { r: 22, dur: "7s", size: 6 },
    { r: 36, dur: "11s", size: 8, reverse: true },
    { r: 48, dur: "16s", size: 5 },
  ];
  return (
    <SceneFrame>
      <div className="absolute" style={{ left: "50%", top: "50%" }}>
        {rings.map((r) => (
          <span key={r} className="absolute rounded-full border border-dashed" style={{ width: r * 2, height: r * 2, left: -r, top: -r, borderColor: `${color}30` }} />
        ))}
        <Dot x={0} y={0} size={14} color={color} pulse />
        {orbiters.map((o, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: 0, top: 0, width: 0, height: 0, animation: `spin-slow ${o.dur} linear infinite ${o.reverse ? "reverse" : ""}` }}
          >
            <span className="absolute rounded-full" style={{ width: o.size, height: o.size, left: o.r, top: 0, transform: "translate(-50%,-50%)", background: `${color}cc` }} />
          </div>
        ))}
      </div>
    </SceneFrame>
  );
}

/* ── 9. MatrixScene — ranked bars / before-after comparison ── */
export function MatrixScene({ color, rows }: { color: string; rows: { label: string; value: number }[] }) {
  return (
    <SceneFrame>
      <div className="absolute inset-0 px-4 py-3.5 flex flex-col justify-center gap-2">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="text-[8px] w-10 shrink-0 text-[#e1e0cc]/35 uppercase tracking-wider">{r.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full origin-left"
                style={{ background: i === 0 ? color : `${color}55` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: r.value }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </SceneFrame>
  );
}

"use client";
import { CSSProperties } from "react";

interface LogoItem {
  name: string;
  icon?: React.ReactNode;
  color?: string;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  gap?: number;
}

export default function LogoLoop({
  items = [],
  speed = 40,
  direction = "left",
  className = "",
  gap = 40,
}: LogoLoopProps) {
  const style: CSSProperties = {
    ["--duration" as string]: `${speed}s`,
    ["--direction" as string]: direction === "right" ? "reverse" : "normal",
    ["--gap" as string]: `${gap}px`,
  };

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div className="flex whitespace-nowrap select-none" style={{ gap: "var(--gap)" }}>
        {[0, 1].map((k) => (
          <div
            key={k}
            className="flex shrink-0 items-center"
            style={{
              gap: "var(--gap)",
              animation: `logo-loop var(--duration) linear infinite var(--direction)`,
              animationFillMode: "both",
            }}
            aria-hidden={k === 1}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                style={{
                  borderColor: item.color ? `${item.color}40` : "rgba(255,255,255,0.10)",
                  background: item.color ? `${item.color}0C` : "rgba(255,255,255,0.03)",
                  color: item.color ?? "rgba(225,224,204,0.7)",
                }}
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                {item.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

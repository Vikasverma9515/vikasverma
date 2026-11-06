"use client";
import { useEffect, useRef, CSSProperties } from "react";
import "./DepthText.css";

interface DepthTextProps {
  text: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: string;
  className?: string;
  style?: CSSProperties;
}

export default function DepthText({
  text,
  layers = 34,
  depth = 2.4,
  faceColor = "#e1e0cc",
  depthColor = "#333",
  tilt = 7.5,
  pointerTracking = true,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = false,
  orbitSpeed = 0.35,
  fontSize,
  fontWeight = 900,
  shadow,
  className = "",
  style,
}: DepthTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, orbit: 0, rafId: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".depth-text__stage");
    if (!stage) return;

    let alive = true;
    const s = stateRef.current;
    s.rx = tilt;

    function frame() {
      if (!alive) return;
      if (autoOrbit) {
        s.orbit += orbitSpeed * 0.012;
        s.tx = Math.sin(s.orbit) * 18;
        s.ty = Math.cos(s.orbit * 0.6) * 10;
      }
      s.rx += (tilt + s.ty - s.rx) * smoothing;
      s.ry += (s.tx - s.ry) * smoothing;
      if (stage) stage.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry}deg)`;
      s.rafId = requestAnimationFrame(frame);
    }

    function onPointerMove(e: MouseEvent) {
      if (!pointerTracking) return;
      const rect = root!.getBoundingClientRect();
      s.tx = ((e.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width, 1)) * 28;
      s.ty = ((e.clientY - (rect.top + rect.height / 2)) / Math.max(rect.height, 1)) * -18;
    }

    window.addEventListener("mousemove", onPointerMove);
    frame();

    return () => {
      alive = false;
      cancelAnimationFrame(s.rafId);
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, [tilt, pointerTracking, smoothing, autoOrbit, orbitSpeed]);

  const step = depth / Math.max(layers, 1);

  return (
    <span
      ref={rootRef}
      className={`depth-text ${className}`}
      aria-label={text}
      style={{
        "--depth-text-perspective": `${perspective}px`,
        "--depth-text-font-size": fontSize,
        "--depth-text-font-weight": String(fontWeight),
        "--depth-text-face-color": faceColor,
        "--depth-text-depth-color": depthColor,
        "--depth-text-shadow": shadow,
        ...style,
      } as CSSProperties}
    >
      <span className="depth-text__stage">
        {Array.from({ length: layers }, (_, i) => (
          <span
            key={i}
            className="depth-text__layer"
            aria-hidden="true"
            style={{ transform: `translateZ(${-step * (layers - i)}px)` }}
          >
            {text}
          </span>
        ))}
        <span className="depth-text__face" aria-hidden="true">
          {text}
        </span>
      </span>
    </span>
  );
}

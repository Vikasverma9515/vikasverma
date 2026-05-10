"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 28, stiffness: 300, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 300, mass: 0.5 });

  const [cursorState, setCursorState] = useState<"default" | "hover" | "drag" | "hidden">("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const labelAttr = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");
      if (cursorAttr) {
        setCursorState(cursorAttr as "hover" | "drag");
        setLabel(labelAttr || "");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorState("hover");
      }
    };

    const handleMouseLeave = () => {
      setCursorState("default");
      setLabel("");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const ringSize = cursorState === "hover" ? 48 : cursorState === "drag" ? 64 : 32;
  const dotSize = cursorState === "hover" ? 4 : 8;

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{ left: springX, top: springY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: cursorState === "hidden" ? 0 : 1,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
        className="cursor-ring fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference flex items-center justify-center"
      >
        {(cursorState === "drag" || label) && (
          <span className="text-white text-[9px] font-bold uppercase tracking-widest">
            {label || "drag"}
          </span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        ref={dotRef}
        style={{ left: mouseX, top: mouseY }}
        animate={{ width: dotSize, height: dotSize, opacity: cursorState === "hidden" ? 0 : 1 }}
        transition={{ width: { duration: 0.15 }, height: { duration: 0.15 } }}
        className="cursor-dot fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}

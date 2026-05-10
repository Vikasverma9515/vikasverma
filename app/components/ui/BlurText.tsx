"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  /** Delay stagger between words in seconds */
  stagger?: number;
}

export default function BlurText({ text, className = "", stagger = 0.04 }: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.35em] gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1.2 / words.length;
        return <Word key={i} word={word} progress={scrollYProgress} range={[Math.min(start, 0.9), Math.min(end, 1)]} />;
      })}
    </div>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <motion.span style={{ opacity, filter: blur, y }} className="inline-block">
      {word}
    </motion.span>
  );
}

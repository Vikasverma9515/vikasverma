"use client";
import { useEffect, useRef } from "react";
import type { JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  animationDuration?: number;
  staggerDelay?: number;
  ease?: string;
  startTrigger?: string;
  endTrigger?: string;
}

export default function ScrollFloat({
  children,
  className = "",
  as: Tag = "div",
  animationDuration = 0.8,
  staggerDelay = 0.03,
  ease = "power3.out",
  startTrigger = "top 85%",
  endTrigger = "top 40%",
}: ScrollFloatProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars,words" });
    const chars = split.chars ?? [];

    gsap.set(chars, { opacity: 0, yPercent: 110, rotateX: -80 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: startTrigger,
        end: endTrigger,
        toggleActions: "play none none reverse",
      },
    });

    tl.to(chars, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: animationDuration,
      stagger: staggerDelay,
      ease,
    });

    return () => {
      tl.kill();
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, animationDuration, staggerDelay, ease, startTrigger, endTrigger]);

  return (
    // @ts-ignore
    <Tag ref={ref} className={`overflow-hidden ${className}`} style={{ perspective: "1000px" }}>
      {children}
    </Tag>
  );
}

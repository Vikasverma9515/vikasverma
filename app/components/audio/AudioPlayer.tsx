"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeTo = (target: number, duration = 800) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume;
    const diff = target - start;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      audio.volume = start + diff * p;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0);
      setTimeout(() => audio.pause(), 900);
      setPlaying(false);
    } else {
      audio.volume = 0;
      await audio.play();
      fadeTo(0.3);
      setPlaying(true);
    }
  };

  if (!loaded) return null;

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      data-cursor="hover"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-black/80 backdrop-blur-md text-zinc-400 hover:text-white hover:border-[#FFB800] transition-all duration-300 text-xs font-mono uppercase tracking-widest"
    >
      {playing ? (
        <>
          <AudioBars />
          <span>Music On</span>
        </>
      ) : (
        <>
          <span className="text-base">♪</span>
          <span>Music Off</span>
        </>
      )}
    </motion.button>
  );
}

function AudioBars() {
  return (
    <span className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] bg-[#FFB800] rounded-full"
          animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Card {
  imgSrc: string;
  altText?: string;
}

interface BounceCardsProps {
  cards: Card[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: { rotate?: string; translateX?: string; translateY?: string }[];
  className?: string;
}

const defaultTransforms = [
  { rotate: "-15deg", translateX: "-90px", translateY: "0px" },
  { rotate: "-5deg",  translateX: "-60px", translateY: "-10px" },
  { rotate: "5deg",   translateX: "-10px", translateY: "10px" },
  { rotate: "15deg",  translateX: "50px",  translateY: "0px" },
  { rotate: "25deg",  translateX: "110px", translateY: "-5px" },
];

export default function BounceCards({
  cards = [],
  containerWidth = 450,
  containerHeight = 260,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = "spring",
  transformStyles = defaultTransforms,
  className = "",
}: BounceCardsProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {cards.map((card, i) => {
        const t = transformStyles[i] ?? {};
        return (
          <motion.div
            key={i}
            className="absolute w-[150px] h-[200px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl"
            style={{
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{
              opacity: 0,
              scale: 0.6,
              rotate: 0,
              x: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: t.rotate ?? "0deg",
              x: t.translateX ?? "0px",
              y: t.translateY ?? "0px",
            }}
            transition={
              easeType === "spring"
                ? { type: "spring", stiffness: 260, damping: 20, delay: animationDelay + i * animationStagger }
                : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: animationDelay + i * animationStagger }
            }
            whileHover={{ scale: 1.08, zIndex: 50 }}
          >
            <img
              src={card.imgSrc}
              alt={card.altText ?? `card-${i}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

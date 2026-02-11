"use client";

import { useEffect, useState } from "react";

const CYBERPUNK_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export function useScramble(text: string, speed: number = 40) {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let iterations = 0;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return CYBERPUNK_CHARS[Math.floor(Math.random() * CYBERPUNK_CHARS.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayText;
}

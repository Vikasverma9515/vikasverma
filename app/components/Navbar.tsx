"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "AI",      href: "#ai" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [lastY]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center mt-5 px-[5vw]">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-black/50 backdrop-blur-2xl rounded-full border border-white/10 flex items-center justify-between px-6 py-3 w-full max-w-4xl"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-2xl italic text-[#fefde8]"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Vikas
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-widest text-[#e1e0cc] opacity-55 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block bg-[#e1e0cc] text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-full hover:bg-white transition-colors"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#e1e0cc] transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#e1e0cc] transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#e1e0cc] transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] left-[5vw] right-[5vw] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-1"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-widest text-[#e1e0cc] opacity-60 hover:opacity-100 transition-opacity py-3 border-b border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 bg-[#e1e0cc] text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full text-center hover:bg-white transition-colors"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

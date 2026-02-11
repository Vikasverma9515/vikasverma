import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Import fonts
import "./globals.css";
import FloatingDecor from "./components/FloatingDecor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Vikas Verma | AI Product Builder & Full-Stack Developer",
  description: "Portfolio of Vikas Verma - Full-Stack Developer and AI Product Builder specializing in modern web apps and AI integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 font-sans selection:bg-[#FFB800] selection:text-black`}
      >
        <div className="noise-bg" />
        <FloatingDecor />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

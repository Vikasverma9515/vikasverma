import type { Metadata } from "next";
import "./globals.css";
import SilkSpiderCursor from "./components/ui/silk-spider-cursor";

export const metadata: Metadata = {
  title: "Vikas Verma — AI Engineer & Product Builder",
  description: "Vikas Verma is a computer engineering student and AI engineer building RAG systems, voice agents, and useful full stack products.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Vikas Verma — AI Engineer & Product Builder",
    description: "AI systems, voice agents, and full stack products built from idea to deployment.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <SilkSpiderCursor
          anchorSelector="[data-silk-anchor]"
          silkColor="#fffdf4"
          bounceColor="#102be8"
          shadowColor="#07134c"
          maxThreads={65}
          seedWebs={10}
          sleepAfter={5000}
          zIndex={30}
          className="silk-cursor-wrap"
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CustomCursor from "./components/cursor/CustomCursor";
import AudioPlayer from "./components/audio/AudioPlayer";
import ScrollProgress from "./components/ui/ScrollProgress";

const almarai = Almarai({
  subsets: ["latin"],
  variable: "--font-almarai",
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["italic"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikas | AI Architect & Creative Developer",
  description:
    "I build things that shouldn't exist… but somehow work better than expected. AI Engineer. Full-stack developer. Accidental founder.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Vikas | AI Architect & Creative Developer",
    description: "AI engineer. Full-stack developer. Accidental founder.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${almarai.variable} ${instrumentSerif.variable} antialiased bg-black text-[#e1e0cc] overflow-x-hidden`}
        style={{ fontFamily: "var(--font-almarai), sans-serif" }}
      >
        <div className="noise-bg" aria-hidden="true" />
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          <AudioPlayer />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

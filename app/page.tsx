import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GitHubShowcase from "./components/GitHubShowcase";
import ExperienceJourney from "./components/ExperienceJourney";
import About from "./components/About";
import VoiceAgentLab from "./components/VoiceAgentLab";
import AISection from "./components/AISection";
import Skills from "./components/Skills";
import Personality from "./components/Personality";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="bg-black text-[#e1e0cc]">
        <Navbar />
        <Hero />
        <GitHubShowcase />
        <ExperienceJourney />
        <About />
        <VoiceAgentLab />
        <AISection />
        <Skills />
        <Personality />
        <Contact />
      </main>
    </>
  );
}

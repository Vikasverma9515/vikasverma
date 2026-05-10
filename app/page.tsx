import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import AISection from "./components/AISection";
import Experience from "./components/Experience";
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
        <About />
        <Projects />
        <AISection />
        <Experience />
        <Skills />
        <Personality />
        <Contact />
      </main>
    </>
  );
}

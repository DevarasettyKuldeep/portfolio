import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubRepos from "@/components/GitHubRepos";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Journey from "@/components/Journey";
import GitHubSection from "@/components/GitHub";
import Contact from "@/components/Contact";
import TerminalComponent from "@/components/Terminal";
import Footer from "@/components/Footer";
import GrainientWaves from "@/components/GrainientWaves";
import { fetchGitHubRepos } from "@/lib/github";

export default async function Home() {
  const githubRepos = await fetchGitHubRepos();

  return (
    <>
      <Preloader />
      <Navbar />

      {/* Subtle, elegant Grainient + Waves background in light radium neon blue */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <GrainientWaves
          speed={0.65}
          lineCount={22}
          amplitude={30}
          className="w-full h-full opacity-85"
        />
        {/* Soft edge radial vignette keeping content crisp & readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_65%,#050505_100%)] pointer-events-none" />
      </div>

      <main className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects githubRepos={githubRepos} />
        <Experience />
        <Research />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
      <TerminalComponent />
    </>
  );
}

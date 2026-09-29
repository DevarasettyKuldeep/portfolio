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
import { fetchGitHubRepos } from "@/lib/github";

export default async function Home() {
  const githubRepos = await fetchGitHubRepos();

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
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

import About from "@/components/About";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import EducationSection from "@/components/EducationSection";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import ScrollFX from "@/components/ScrollFX";
import Skills from "@/components/Skills";
import SkillsMarquee from "@/components/SkillsMarquee";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SkillsMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationSection />
      </main>
      <Contact />
      <ScrollFX />
      <SmoothScroll />
      <CustomCursor />
      <Preloader />
    </>
  );
}

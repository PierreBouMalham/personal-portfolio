import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Skills from "./components/Skills/Skills.jsx";
import Education from "./components/Education/Education.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Three.js hero background ships as its own chunk, loaded after first paint
const GalaxyBackground = lazy(() => import("./components/shared/GalaxyBackground.jsx"));

export default function App() {
  // Decided after mount so the prerendered HTML and the first client
  // render match (no window access during render)
  const [showGalaxy, setShowGalaxy] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    setShowGalaxy(!reduce && !saveData);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {showGalaxy && (
        <Suspense fallback={null}>
          <GalaxyBackground />
        </Suspense>
      )}
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

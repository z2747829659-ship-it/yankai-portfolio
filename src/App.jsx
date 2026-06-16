import React, { useEffect, useState } from "react";
import { About } from "./components/About.jsx";
import { Contact } from "./components/Contact.jsx";
import { Hero } from "./components/Hero.jsx";
import { OpeningIntro } from "./components/OpeningIntro.jsx";
import { Projects } from "./components/Projects.jsx";
import { Skills } from "./components/Skills.jsx";

const AI_DRIVER_REVEAL_MS = 3300;
const INTRO_CLEAR_BEFORE_REVEAL_MS = 500;
const INTRO_EXIT_DURATION_MS = 1300;
const INTRO_EXIT_START_MS =
  AI_DRIVER_REVEAL_MS - INTRO_CLEAR_BEFORE_REVEAL_MS - INTRO_EXIT_DURATION_MS;
const INTRO_REMOVE_MS = AI_DRIVER_REVEAL_MS - INTRO_CLEAR_BEFORE_REVEAL_MS + 120;

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIntroExiting(true), INTRO_EXIT_START_MS);
    const removeTimer = window.setTimeout(() => setShowIntro(false), INTRO_REMOVE_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showIntro && <OpeningIntro exiting={introExiting} />}
      <main className="site-shell">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

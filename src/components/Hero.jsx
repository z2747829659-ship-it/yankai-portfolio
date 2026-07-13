import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { navItems } from "../data/content.js";
import SideRays from "./backgrounds/SideRays.jsx";
import { HeroScene3D } from "./HeroScene3D.jsx";

export function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const pipVideoRef = useRef(null);
  const [navFloating, setNavFloating] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    const videos = [videoRef.current, pipVideoRef.current].filter(Boolean);
    if (!hero || videos.length === 0) return undefined;

    const playVideos = () => {
      videos.forEach((video) => {
        video.play().catch(() => {});
      });
    };

    const pauseVideos = () => {
      videos.forEach((video) => {
        video.pause();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideos();
        } else {
          pauseVideos();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    let frameId = 0;
    const updateNavState = () => {
      frameId = 0;
      const rect = hero.getBoundingClientRect();
      setNavFloating(rect.bottom <= 96);
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateNavState);
    };

    updateNavState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-video-slot" aria-hidden="true">
        <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-pip-layer">
          <video ref={pipVideoRef} className="hero-pip-video" autoPlay muted loop playsInline preload="auto">
            <source src="videos/pip-showreel.mov" type="video/quicktime" />
          </video>
        </div>
        <div className="video-placeholder" />
      </div>

      <SideRays
        className="hero-side-rays"
        rayColor1="#64e5c4"
        rayColor2="#ce4747"
        origin="bottom-right"
        speed={4.7}
        intensity={2.3}
        spread={2.2}
        tilt={0}
        saturation={1.5}
        blend={0.43}
        falloff={1.6}
        opacity={1}
      />
      <div className="hero-overlay" />
      <div className="grid-layer" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />

      <nav className={`nav hero-nav${navFloating ? " is-hidden" : ""}`}>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <nav className={`nav floating-nav${navFloating ? " is-visible" : ""}`}>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero-stage">
        <motion.aside
          className="cube-stage"
          initial={{ opacity: 0, y: 28, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.16, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Abstract 3D cube visual"
        >
          <HeroScene3D />
        </motion.aside>

        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, y: 38, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-panel-glow" aria-hidden="true" />
          <h1>Yankai Zhao</h1>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <span>Scroll</span>
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

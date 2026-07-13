import React from "react";
import { motion } from "framer-motion";
import { Bot, Boxes, Eye, MapPin, Route } from "lucide-react";
import { Section } from "./Section.jsx";

const aboutCards = [
  {
    title: "Singapore",
    label: "Studying here",
    copy: "Learning and building in Singapore.",
    icon: MapPin,
    tone: "cyan",
    frame: 0,
    image: "images/optimized/singapore-marina-night.jpg"
  },
  {
    title: "AI Tools",
    label: "Building partner",
    copy: "Codex and ChatGPT as building partners.",
    icon: Bot,
    tone: "emerald",
    frame: 1,
    image: "images/optimized/glass-city-night.jpg"
  },
  {
    title: "Prototype",
    label: "Explore fast",
    copy: "Make the idea tangible before overbuilding.",
    icon: Boxes,
    tone: "blue",
    frame: 2,
    image: "images/optimized/gardens-bay-night.jpg"
  },
  {
    title: "Product Flow",
    label: "Screens first",
    copy: "Shape the path before polishing the screen.",
    icon: Route,
    tone: "green",
    frame: 3,
    image: "images/optimized/singapore-riverside-night.jpg"
  },
  {
    title: "Visual Direction",
    label: "First glance",
    copy: "Create a distinct first impression.",
    icon: Eye,
    tone: "ice",
    frame: 4,
    image: "images/optimized/singapore-studio-night.jpg"
  }
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About / Identity"
      title="How I turn ideas into something visible."
      className="about-section"
    >
      <div className="about-icon-row" aria-label="Yankai Zhao identity signals">
        <div className="about-signal-line" aria-hidden="true" />
        {aboutCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              className={`about-icon-card tone-${item.tone} frame-${item.frame}`}
              key={item.title}
              style={{ "--about-card-image": `url('${item.image}')` }}
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -16, scale: 1.14 }}
              transition={{
                duration: 0.58,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.055
              }}
            >
              <span className="about-card-number">0{index + 1}</span>
              <div className="about-icon-bg" aria-hidden="true">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="about-icon-glass">
                <Icon size={24} />
              </div>
              <div className="about-icon-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

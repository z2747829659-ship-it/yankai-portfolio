import React from "react";
import { motion } from "framer-motion";
import { Bot, Boxes, Eye, MapPin, Route } from "lucide-react";
import { Section } from "./Section.jsx";

const aboutCards = [
  {
    title: "Singapore",
    label: "Studying here",
    copy: "Studying in a global city.",
    icon: MapPin,
    tone: "cyan",
    frame: 0,
    image: "images/optimized/singapore-marina-night.jpg"
  },
  {
    title: "AI Tools",
    label: "Building partner",
    copy: "From rough idea to working prototype.",
    icon: Bot,
    tone: "emerald",
    frame: 1,
    image: "images/optimized/glass-city-night.jpg"
  },
  {
    title: "Prototype",
    label: "Explore fast",
    copy: "Test the idea before overbuilding.",
    icon: Boxes,
    tone: "blue",
    frame: 2,
    image: "images/optimized/gardens-bay-night.jpg"
  },
  {
    title: "Product Flow",
    label: "Screens first",
    copy: "User path, value and usability first.",
    icon: Route,
    tone: "green",
    frame: 3,
    image: "images/optimized/singapore-riverside-night.jpg"
  },
  {
    title: "Visual Direction",
    label: "First glance",
    copy: "Atmosphere, hierarchy and interaction.",
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
      title="Five signals, one visual system."
      className="about-section"
    >
      <div className="about-icon-row" aria-label="Yankai Zhao identity signals">
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
                type: "spring",
                stiffness: 260,
                damping: 21,
                delay: index * 0.055
              }}
            >
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

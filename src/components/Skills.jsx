import React from "react";
import { motion } from "framer-motion";

const maskPath =
  "m53.54,45.42c2.19-3.79,7.67-3.79,9.86,0l4.54,7.87c1.17,2.02,1.17,4.51,0,6.54l-8.15,13.81c-1.68,2.91.42,6.55,3.78,6.55h17.81c3.45,0,5.61-3.74,3.89-6.73l-28.76-49.81c-2.95-5.12-10.34-5.12-13.29,0l-28.46,49.3c-1.86,3.22.46,7.24,4.18,7.24h10.23c2.55,0,4.91-1.36,6.19-3.57l18.18-31.19Z";

const maskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${maskPath}'/%3E%3C/svg%3E")`;

const stats = [
  { value: "5", label: "Interactive Prototypes Built" },
  { value: "3+", label: "Business / Course Projects" },
  { value: "4+", label: "Tableau Dashboards Designed" },
  { value: "Level 5", label: "Kaplan English with Distinction" },
  { value: "110kg", label: "Bench Press Discipline Marker" }
];

const skillSignals = [
  "Prototype Building",
  "AI-assisted Development",
  "Business Analysis",
  "Data Visualization",
  "Interaction Design Thinking"
];

const toolIcons = [
  { name: "Codex", short: "CX", type: "codex", icon: "images/tools/codex-real-icon.png" },
  { name: "ChatGPT", short: "GPT", type: "chatgpt", icon: "images/tools/chatgpt-real-icon.png" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export function Skills() {
  return (
    <section id="skills" className="section stats-section">
      <div className="stats-inner">
        <div className="stats-layout">
          <motion.div
            className="stats-copy-column"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.span className="section-eyebrow" variants={statVariants}>
              Skills / Strengths
            </motion.span>
            <motion.h2 className="stats-heading" variants={statVariants}>
              Making ideas
              <br />
              visible, <span className="stats-serif">testable and real</span>
            </motion.h2>
            <motion.p className="stats-intro" variants={statVariants}>
              I use Codex and ChatGPT to turn business ideas, product flows and visual
              directions into usable prototypes, dashboards and interactive experiences.
            </motion.p>
            <motion.div className="tool-icon-row" variants={statVariants}>
              {toolIcons.map((tool) => (
                <span className={`tool-chip tool-${tool.type}`} key={tool.name}>
                  <i>
                    {tool.icon ? <img src={tool.icon} alt="" /> : tool.short}
                  </i>
                  <em>{tool.name}</em>
                </span>
              ))}
            </motion.div>
            <motion.div className="skill-signal-row" variants={statVariants}>
              {skillSignals.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </motion.div>
            <motion.p className="stats-note" variants={statVariants}>
              Kaplan English Level 5 with Distinction. Data and dashboards are part of my
              business/course project work.
            </motion.p>
            <motion.div
              className="stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 }
                }
              }}
            >
              {stats.map((stat) => (
                <motion.div className="stat-item" key={stat.label} variants={statVariants}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="stats-video-column">
            <motion.div
              className="stats-mask-frame"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1.12 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
              style={{
                WebkitMaskImage: maskUrl,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: maskUrl,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center"
              }}
            >
              <video autoPlay loop muted playsInline className="stats-mask-video">
                <source
                  src="https://app-uploads.krea.ai/wan-videos/7f348c17-c3aa-40c9-9d5b-a2bed9a72c2e.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

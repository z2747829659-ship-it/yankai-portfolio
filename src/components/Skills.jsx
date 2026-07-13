import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Braces, MousePointer2, Route, Sparkles } from "lucide-react";

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

const systemNodes = [
  { label: "Idea", icon: Sparkles, className: "node-idea" },
  { label: "Flow", icon: Route, className: "node-flow" },
  { label: "Build", icon: Braces, className: "node-build" },
  { label: "Test", icon: MousePointer2, className: "node-test" },
  { label: "Measure", icon: BarChart3, className: "node-measure" }
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

          <div className="stats-video-column stats-system-column">
            <motion.div
              className="prototype-system"
              initial={{ opacity: 0, scale: 0.96, x: 24 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="system-topline">
                <span>Prototype System</span>
                <i>LIVE</i>
              </div>
              <div className="system-canvas">
                <svg className="system-connections" viewBox="0 0 720 560" aria-hidden="true">
                  <path d="M100 72 C184 72 228 224 300 270" />
                  <path d="M620 100 C540 108 500 230 420 270" />
                  <path d="M70 260 C164 260 230 274 300 280" />
                  <path d="M620 470 C530 450 486 334 420 300" />
                  <path d="M195 485 C232 404 275 342 320 310" />
                  <circle cx="100" cy="72" r="4" />
                  <circle cx="620" cy="100" r="4" />
                  <circle cx="70" cy="260" r="4" />
                  <circle cx="620" cy="470" r="4" />
                  <circle cx="195" cy="485" r="4" />
                </svg>
                <div className="system-core">
                  <span>Y/Z</span>
                  <strong>BUILD</strong>
                  <small>idea to interface</small>
                </div>
                {systemNodes.map(({ label, icon: Icon, className }, index) => (
                  <motion.div
                    className={`system-node ${className}`}
                    key={label}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </motion.div>
                ))}
                <div className="system-screen screen-a"><i /><i /><i /></div>
                <div className="system-screen screen-b"><span /><span /><span /></div>
                <div className="system-readout readout-a"><strong>05</strong><span>PROTOTYPES</span></div>
                <div className="system-readout readout-b"><strong>04+</strong><span>DASHBOARDS</span></div>
              </div>
              <div className="system-footer">
                <span>Think</span><i />
                <span>Prototype</span><i />
                <span>Test</span><i />
                <span>Refine</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

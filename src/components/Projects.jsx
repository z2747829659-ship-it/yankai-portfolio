import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/content.js";
import { Section } from "./Section.jsx";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Five ideas made tangible."
      intro="Working prototypes across web, mobile, automation and business transformation."
    >
      <div className="project-grid">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              className={`project-card accent-${project.accent}`}
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="project-visual">
                <div className="project-index">0{index + 1}</div>
                <div className="visual-grid" />
                {project.image ? (
                  <div className="visual-window has-screenshot">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="visual-window">
                    <Icon size={34} />
                    <span>Replace with screenshot</span>
                  </div>
                )}
                <div className="visual-status">
                  <i />
                  Prototype case
                </div>
              </div>
              <div className="project-content">
                <div className="project-proof-row">
                  <span>{project.contribution}</span>
                  <strong>{project.outcome}</strong>
                </div>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <ArrowUpRight size={20} />
                </div>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

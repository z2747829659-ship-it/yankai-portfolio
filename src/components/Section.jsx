import React from "react";
import { motion } from "framer-motion";

const layerReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <motion.div
        className="section-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45, margin: "-80px" }}
        variants={layerReveal}
      >
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </motion.div>
      <div className="section-content-reveal">{children}</div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, MessageCircle, Phone } from "lucide-react";
import { Section } from "./Section.jsx";

const contactItem = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
  }
};

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let ideas move from rough notes into something people can try."
      intro="I am open to conversations about AI-assisted prototypes, no-code experiments, digital product ideas and website direction for traditional business transformation."
      className="contact-section"
    >
      <motion.div
        className="contact-panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
      >
        <motion.a
          className="contact-link"
          href="https://www.linkedin.com/in/%E5%BD%A6%E5%87%AF-%E8%B5%B5-98175437a/"
          target="_blank"
          rel="noreferrer"
          variants={contactItem}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <Linkedin size={22} />
          <span>
            LinkedIn
            <strong>Yankai Zhao</strong>
          </span>
        </motion.a>
        <motion.a
          className="contact-link"
          href="weixin://"
          variants={contactItem}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <MessageCircle size={22} />
          <span>
            WeChat
            <strong>zyk2747829659</strong>
          </span>
        </motion.a>
        <motion.a
          className="contact-link"
          href="https://wa.me/6592758502"
          variants={contactItem}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <Phone size={22} />
          <span>
            WhatsApp
            <strong>+65 9275 8502</strong>
          </span>
        </motion.a>
      </motion.div>
    </Section>
  );
}

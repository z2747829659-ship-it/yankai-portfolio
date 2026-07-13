import React from "react";
import { motion } from "framer-motion";
import { Linkedin, MessageCircle } from "lucide-react";
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

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className="whatsapp-brand-icon"
    >
      <path
        fill="currentColor"
        d="M16.04 3.2c-7.04 0-12.78 5.62-12.78 12.54 0 2.2.58 4.34 1.7 6.22L3.16 28.8l7.06-1.78a12.98 12.98 0 0 0 5.82 1.38c7.04 0 12.78-5.62 12.78-12.54S23.08 3.2 16.04 3.2Zm0 22.98c-1.86 0-3.68-.48-5.28-1.4l-.38-.22-4.18 1.06 1.1-4.02-.25-.4a10.1 10.1 0 0 1-1.56-5.36c0-5.7 4.72-10.34 10.54-10.34s10.54 4.64 10.54 10.34-4.72 10.24-10.53 10.24Zm5.78-7.66c-.32-.16-1.88-.92-2.18-1.02-.3-.12-.52-.16-.74.16-.22.32-.84 1.02-1.04 1.24-.2.22-.38.24-.7.08-.32-.16-1.34-.48-2.56-1.56-.94-.82-1.58-1.84-1.76-2.16-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.2.22-.32.32-.54.1-.22.05-.4-.03-.56-.08-.16-.74-1.76-1.02-2.42-.26-.64-.54-.54-.74-.55h-.63c-.22 0-.56.08-.86.4-.3.32-1.14 1.1-1.14 2.68s1.18 3.1 1.34 3.32c.16.22 2.32 3.48 5.62 4.88.78.34 1.4.54 1.88.7.8.24 1.52.2 2.1.12.64-.1 1.88-.76 2.14-1.5.26-.74.26-1.38.18-1.5-.08-.14-.28-.22-.6-.38Z"
      />
    </svg>
  );
}

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
          href="whatsapp://send?phone=6592758502&text=Hi%20Yankai%2C%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20connect."
          variants={contactItem}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <WhatsAppIcon size={22} />
          <span>
            WhatsApp
            <strong>+65 9275 8502</strong>
          </span>
        </motion.a>
      </motion.div>
    </Section>
  );
}

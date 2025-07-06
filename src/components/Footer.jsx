import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import "../styles/pages.css";

const Footer = () => {
  return (
    <footer className="footer-section py-5 bg-dark text-light">
      <motion.div
        className="container text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h4 className="mb-3 fw-semibold fs-3">Let’s Connect</h4>
        <p className="mb-4 fs-6 text-light">
          Thank you for visiting my portfolio 💻✨
        </p>

        <div className="d-flex justify-content-center gap-4 mb-4">
          <motion.a
            href="https://github.com/amansrivastav"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="social-icon"
          >
            <Github size={22} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/amansrivastav"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="social-icon"
          >
            <Linkedin size={22} />
          </motion.a>
          <motion.a
            href="mailto:youremail@example.com"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="social-icon"
          >
            <Mail size={22} />
          </motion.a>
        </div>

        <motion.hr
          className="footer-line mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 0.8 }}
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        />

      <small className="d-block mt-3" style={{ color: "#d1d5db" }}>
  © {new Date().getFullYear()} Aman Srivastav. All rights reserved.
</small>

      </motion.div>
    </footer>
  );
};

export default Footer;

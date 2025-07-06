import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css";

import htmlIcon from "../assets/icons/html.png";
import cssIcon from "../assets/icons/css-3.png";
import jsIcon from "../assets/icons/js.png";
import bootstrapIcon from "../assets/icons/bootstrap.png";
import reactIcon from "../assets/icons/react.png";
import reduxIcon from "../assets/icons/redux-icon.png";
import tailwindIcon from "../assets/icons/tailwind-css-icon.png";
import nodeIcon from "../assets/icons/nodejs.png";
import figmaIcon from "../assets/icons/figma.png";
import dockerIcon from "../assets/icons/docker.png";
import githubIcon from "../assets/icons/github.png";

const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "React", icon: reactIcon },
  { name: "Redux", icon: reduxIcon },
  { name: "Tailwind", icon: tailwindIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "GitHub", icon: githubIcon },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SkillsSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "black" }}>
      <div className="container">
        {/* Title Block */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold display-5 text-white">
            🌟 My <span className="text-white">Tech Stack</span>
          </h2>
          <p className="lead  text-white">
           Tools and technologies I use to build seamless digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 justify-content-center"
        >
          {skills.map((skill, idx) => (
            <motion.div key={idx} variants={item} className="col text-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card p-4 h-100 d-flex flex-column align-items-center"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-icon"
                  style={{ width: "60px", height: "60px", marginBottom: "10px" }}
                />
                <h6 className="mt-2 text-light">{skill.name}</h6>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

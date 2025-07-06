import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css";
import amanImg from "../assets/images/aman.jpeg";

// icons
import jsIcon from "../assets/icons/js.png";
import reactIcon from "../assets/icons/react.png";
import htmlIcon from "../assets/icons/html.png";
import githubicon from "../assets/icons/github.png";
import figmaIcon from "../assets/icons/figma.png";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const techStack = [
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "HTML", icon: htmlIcon },
  { name: "GitHub", icon: githubicon },
  { name: "Figma", icon: figmaIcon },
];

const HomeSection = () => {
  const [currentTech, setCurrentTech] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="container-fluid py-5">
        <div className="row align-items-center min-vh-100">
          {/* Left Side */}
          <motion.div
            className="col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start px-4 mb-5 mb-md-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title */}
          <motion.h1
            className="fw-normal"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              lineHeight: "1.2",
              fontWeight: 600,
            }}
            initial="hidden"
            animate="visible"
            variants={textVariant}
            custom={0.2}
          >
            Front-End <br /> Developer
          </motion.h1>

          {/* Rotating Tech Stack */}
          <div className="mt-3 d-flex align-items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={techStack[currentTech].name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="d-flex align-items-center gap-2"
              >
                <img
                  src={techStack[currentTech].icon}
                  alt={techStack[currentTech].name}
                  style={{ width: "30px", height: "30px", objectFit: "contain" }}
                />
                <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  {techStack[currentTech].name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paragraphs */}
          <div className="mt-4 paragraph-responsive">
            <motion.p
              className="intro-paragraph"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              Hi! I'm Aman Srivastav, a front-end developer with 1.5 years of
              experience crafting responsive and user-friendly web applications
              that deliver real value.
            </motion.p>
            <motion.p
              className="intro-paragraph"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={0.8}
            >
              My goal is to continuously grow as a developer, contribute to
              impactful products, and master performance-driven front-end
              architectures that create seamless digital experiences.
            </motion.p>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          className="col-md-6 text-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.img
            src={amanImg}
            alt="Developer Aman"
            className="img-fluid rounded-4 shadow hero-image"
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </section>
    </>
    
  );
};

export default HomeSection;

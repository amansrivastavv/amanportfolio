import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css";

const testimonials = [
  {
    name: "Paul Davidson",
    role: "Long-term Client",
    feedback:
      "Aman consistently delivers high-quality front-end work. Always a pleasure to collaborate with!",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Kristina Singh",
    role: "Project Client",
    feedback:
      "He took our vision and made it reality — on time, pixel-perfect, and responsive!",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Elmer J.",
    role: "Agency Partner",
    feedback:
      "Aman's ability to understand UI/UX and translate it into real code is truly impressive.",
    image: "https://i.pravatar.cc/150?img=56",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 120, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1.2],
    },
  },
  exit: {
    opacity: 0,
    y: -80,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  hover: { scale: 1.15, rotate: 2, transition: { type: "spring", stiffness: 400 } },
  tap: { scale: 0.9 },
};

const cardHover = {
  rest: { scale: 1, rotate: 0, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.05,
    rotate: 1,
    boxShadow: "0 15px 45px rgba(255, 255, 255, 0.15)",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="py-5 position-relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0f11 0%, #1c1c20 100%)", color: "#fff" }}
    >
      <div className="container position-relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <motion.h2
            className="display-5 fw-bold"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            💬 Client Testimonials
          </motion.h2>
          <p className="lead text-secondary">
            Real words from real clients — powered by passion and precision.
          </p>
        </motion.div>

        <div className="position-relative d-flex justify-content-center align-items-center px-2" style={{ minHeight: "450px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={cardHover}
              className="glass-card p-4 p-md-5 rounded-5 text-center shadow w-100"
              style={{ maxWidth: "700px", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(14px)" }}
            >
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="rounded-circle border border-light-subtle mb-4"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <h5 className="fw-semibold text-white mb-1">{testimonials[currentIndex].name}</h5>
              <p className="text-primary small mb-3">{testimonials[currentIndex].role}</p>
              <p className="text-white-50 fs-5 fst-italic">
                “{testimonials[currentIndex].feedback}”
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-outline-light rounded-circle position-absolute top-50 start-0 translate-middle-y px-2 py-1 d-none d-md-block"
            onClick={prevTestimonial}
            aria-label="Previous"
          >
            ◀
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-outline-light rounded-circle position-absolute top-50 end-0 translate-middle-y px-2 py-1 d-none d-md-block"
            onClick={nextTestimonial}
            aria-label="Next"
          >
            ▶
          </motion.button>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4 d-md-none">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-sm btn-outline-light rounded-pill px-3"
            onClick={prevTestimonial}
          >
            ← Previous
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="btn btn-sm btn-outline-light rounded-pill px-3"
            onClick={nextTestimonial}
          >
            Next →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

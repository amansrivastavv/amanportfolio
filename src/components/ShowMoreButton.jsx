import React from "react";
import { motion } from "framer-motion";
import "../styles/pages.css";

const ShowMoreButton = ({ handleShowMore }) => {
  return (
    <motion.button
      className="modern-glass-button"
      onClick={handleShowMore}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)",
        y: -4,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="modern-button-text">✨ Show More</span>
    </motion.button>
  );
};

export default ShowMoreButton;
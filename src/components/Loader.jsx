import React from "react";
import { motion } from "framer-motion";
import "../styles/pages.css";

const Loader = () => {
  return (
    <motion.div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="spinner-border text-primary"
        role="status"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          repeat: Infinity,
          repeatType: "loop",
          duration: 1.2,
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;

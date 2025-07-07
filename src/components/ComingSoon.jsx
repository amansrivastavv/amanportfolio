import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import comingSoon from "../assets/animations/commingsoon.json";

const ComingSoon = () => {
  return (
    <motion.div
      className="text-center py-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div style={{ width: 300, margin: "0 auto" }}>
        <Lottie animationData={comingSoon} loop={true} />
      </div>
      {/* <h2 className="mt-3">Notes Section Coming Soon...</h2> */}
    </motion.div>
  );
};

export default ComingSoon;

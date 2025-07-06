import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import WorkflowAccordion from "../components/WorkflowAccordion";
import "../components/WorkflowAccordion.css";
import FeaturedProjects from "./ProjectsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css";
import SkillsSection from "./SkillsSection";
import TestimonialSection from "./Testimonial";
import GitHubRepos from "../components/GithubRepo/GitHubRepos";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loader Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <div className="container">
            <HeroSection />
          </div>
          <About />
          <WorkflowAccordion />
          <FeaturedProjects />
          <SkillsSection />
          <TestimonialSection />
          <GitHubRepos />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;

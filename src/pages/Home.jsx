import React, { useState, useEffect, useRef } from "react";
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
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

// ✅ Export scroll instance to use in other components (like GitHubRepos)
export let locomotiveInstance = null;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);

  //  Simulate loader delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  //  Initialize Locomotive Scroll after loader
  useEffect(() => {
    if (!loading && scrollRef.current) {
      locomotiveInstance = scrollInstance.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.07,
        multiplier: 1,
        class: "is-reveal",
      });

      //  Update layout after DOM settles
  const updateTimeout = setTimeout(() => {
      scrollInstance.current.update();
    }, 800);


      // 🧹 Cleanup on unmount
      return () => {
        clearTimeout(updateTimeout);
        scrollInstance.current.destroy();
      };
    }
  }, [loading]);

  return (
    <>
      {/*  Loader Animation */}
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

      {/* Main Scroll Container */}
      {!loading && (
        <div data-scroll-container ref={scrollRef}>
          <div data-scroll-section className="container">
            <HeroSection />
          </div>
          <div data-scroll-section>
            <About />
          </div>
          <div data-scroll-section>
            <WorkflowAccordion />
          </div>
          <div data-scroll-section>
            <FeaturedProjects />
          </div>
          <div data-scroll-section>
            <SkillsSection />
          </div>
          <div data-scroll-section>
            <TestimonialSection />
          </div>
          <div data-scroll-section>
            <GitHubRepos />
          </div>
          <div data-scroll-section>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

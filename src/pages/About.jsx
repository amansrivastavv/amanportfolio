import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/pages.css";
import aboutImg from "../assets/images/about.jpeg";
import ShowMoreButton from "../components/ShowMoreButton";

const About = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    console.log("Show More Clicked!");
    navigate("/about-details");
  };

  return (
    <section className="about-section py-5" style={{ backgroundColor: "#111" }}>
      <div className="container">
        <div className="row align-items-center gx-0">
          {/* Left: Image */}
          <div className="col-md-6">
            <div className="about-img-section">
              <img
                src={aboutImg}
                alt="About"
                className="about-img img-fluid"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="col-md-6">
            <div className="about-text-section px-4 py-3">
              <h2 className="about-heading">About Me</h2>
                <p className="about-text">
                Hello! I'm a passionate web developer with a love for creating
                dynamic and responsive web applications. With a background in
                computer science and a keen eye for design, I strive to build
                user-friendly interfaces that enhance the user experience. My
                journey in web development has equipped me with skills in HTML,
                CSS, JavaScript, and various frameworks. I am always eager to
                learn new technologies and improve my craft.
              </p>
              <p className="about-text">
                In my free time, I enjoy exploring new programming languages,
                contributing to open-source projects, and staying updated with
                the latest trends in web development. I believe in the power of
                collaboration and am always open to working on exciting
                projects.
              </p>
              <ShowMoreButton handleShowMore={handleShowMore} />
            </div>
          </div>
        </div>
      </div>

      <div className="typing-container mt-5 text-center">
        <p className="typing-text">
          "Clean code always looks like it was written<br />
          by someone who cares."
        </p>
      </div>
    </section>
  );
};

export default About;
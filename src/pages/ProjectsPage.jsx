import React from "react";
import { motion } from "framer-motion";

const ProjectsPage = () => {
  return (
    <>
  <section className="projects-section py-5 bg-white">
  <h2 className="text-center mb-5 fw-bold">🚀 Projects</h2>

  <div className="container-fluid">
    {/* ── Project 1 ── */}
    <div className="row g-4 bg-dark text-light rounded-4 p-4 mx-md-5 mx-2 mb-5">
      {/* Left: Iframe */}
      <motion.div
        className="col-12 col-md-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-3 bg-white text-dark rounded-4 shadow-lg h-100">
          <div className="project-embed rounded-3 overflow-hidden">
            <iframe
              src="https://decor31.com//"
              width="100%"
              height="450px"
              style={{ border: "none", borderRadius: "12px" }}
              loading="lazy"
              title="ShadiGlam Project"
            ></iframe>
          </div>
        </div>
      </motion.div>

      {/* Right: Description */}
      <motion.div
        className="col-12 col-md-6 d-flex flex-column justify-content-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-dark text-light rounded-4 h-100 p-4">
          <h4 className="mb-3">Decor 31</h4>
          <p>
            Decor 31 is an e-commerce platform specializing in home decor and
            furnishings, offering a wide range of products to enhance your
            living spaces.
          </p>
          <a
            href="https://decor31.com//"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light mt-3"
          >
            🌐 View Live
          </a>
        </div>
      </motion.div>
    </div>
{/* ── Project 2 ── */}
<div className="row g-4 rounded-4 p-4 mx-md-5 mx-2" style={{ backgroundColor: "#EDEBE7" }}>
  {/* Left: Description */}
  <motion.div
    className="col-12 col-md-6 d-flex flex-column justify-content-center"
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-dark rounded-4 h-100 p-4" style={{ backgroundColor: "#EDEBE7" }}>
      <h4 className="mb-3">ShadiGlam</h4>
      <p>
        ShadiGlam is a wedding planning platform that connects couples
        with vendors, offers planning tools, and showcases beautiful
        wedding ideas.
      </p>
      <a
        href="https://shadiglam.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-dark mt-3"
      >
        🌐 View Live
      </a>
    </div>
  </motion.div>

  {/* Right: Iframe */}
  <motion.div
    className="col-12 col-md-6"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <div className="p-3 bg-white text-dark rounded-4 shadow-lg h-100">
      <div className="project-embed rounded-3 overflow-hidden">
        <iframe
          src="https://shadiglam.com/"
          width="100%"
          height="450px"
          style={{ border: "none", borderRadius: "12px" }}
          loading="lazy"
          title="Example Project"
        ></iframe>
      </div>
    </div>
  </motion.div>
</div>
  </div>
  
</section>

    </>
 


    
  );
};

export default ProjectsPage;

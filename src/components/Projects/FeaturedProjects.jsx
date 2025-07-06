import React from "react";
import projects from "./data/projectsData";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom"; 

const FeaturedProjects = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">✨ Featured Projects</h2>
      <div className="row g-4">
        {projects.slice(0, 2).map((project, index) => (
          <div className="col-md-6" key={index}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

     <div className="text-center mt-4">
        <Link to="/all-projects" className="btn btn-primary">
          See All Projects
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
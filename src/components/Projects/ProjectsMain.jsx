import React from "react";
import projects from "./data/projectsData";
import ProjectCard from "./ProjectCard";

const ProjectsMain = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-5">📁 All Projects</h2>

      <div className="row g-4">
        {projects.map((project, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsMain;
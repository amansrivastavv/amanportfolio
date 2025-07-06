import React from "react";

const ProjectCard = ({ title, description, liveLink }) => {
  return (
    <div className="card h-100 shadow-sm rounded-3 p-3">
      <h5 className="mb-2">{title}</h5>
      <p className="mb-3" style={{ fontSize: "0.95rem" }}>{description}</p>
      <a
        href={liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline-primary"
      >
        🔗 View Project
      </a>
    </div>
  );
};

export default ProjectCard;

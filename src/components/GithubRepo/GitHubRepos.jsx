import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pages.css";
import { locomotiveInstance } from "../../pages/Home";

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reposPerPage = 6;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/amansrivastavv/repos?per_page=100&sort=updated"
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
          setError(true);
        }

        // Refresh Locomotive scroll
        setTimeout(() => {
          if (locomotiveInstance) {
            locomotiveInstance.update();
          }
        }, 500);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section
      className="py-5"
      style={{
        background: "radial-gradient(circle at top left, #1a1a1d, #121214)",
        color: "#fff",
      }}
    >
      <div className="container">
        <motion.h2
          className="text-center mb-4 display-4 fw-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🚀 Featured GitHub Projects
        </motion.h2>

      <motion.div
          className="search-wrapper position-relative mb-3 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="🔍 Search GitHub Repos"
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </motion.div>

        <motion.p
          className="text-center text-light mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {loading
            ? "Fetching repositories..."
            : `Showing ${currentRepos.length} of ${filteredRepos.length} repositories`}
        </motion.p>

        {error ? (
          <div className="text-center text-danger">
            <p>❌ Failed to fetch repositories. Please try again later.</p>
          </div>
        ) : loading ? (
          <div className="text-center">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            <AnimatePresence mode="wait">
              {currentRepos.length > 0 ? (
                currentRepos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    className="col-11 col-sm-6 col-lg-4"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05, rotate: 0.5 }}
                  >
                    <div
                      className="rounded-4 p-4 shadow-lg h-100 d-flex flex-column justify-content-between border border-secondary glass-repo-card"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        transition: "all 0.4s ease-in-out",
                      }}
                    >
                      <div>
                        <h5 className="fw-bold text-white mb-2">{repo.name}</h5>
                        <p className="text-white small">
                          {repo.description || "No description available."}
                        </p>
                        <p className="text-info small mb-1">
                          🛠 Language: {repo.language || "N/A"}
                        </p>
                        <p className="text-green small mb-1">
                          🕒 Updated on:{" "}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </p>
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="mb-2 d-flex flex-wrap gap-1">
                            {repo.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="badge bg-secondary rounded-pill"
                              >
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-warning">
                          ⭐ {repo.stargazers_count}
                        </span>
                        <span className="text-info">
                          🍴 {repo.forks_count}
                        </span>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-light rounded-pill px-3 mt-auto"
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="text-center w-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img
                    src="https://lottie.host/61a4d99d-33f3-4642-8b84-26a29a3b8579/YJrZwSSQe1.json"
                    alt="No Result"
                    className="img-fluid"
                    style={{ maxWidth: "300px", marginBottom: "20px" }}
                  />
                  <p className="text-muted fs-5">No repositories found.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            {[...Array(totalPages).keys()].map((number) => (
              <motion.button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                  currentPage === number + 1
                    ? "btn-light text-dark"
                    : "btn-outline-light"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {number + 1}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubRepos;

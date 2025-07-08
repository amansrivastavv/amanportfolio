import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./BlogSection.css";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const cardRefs = useRef([]);

  const fetchHashnodePosts = async () => {
    const query = `
      query GetPublicationPosts {
        publication(host: "amansrivastav.hashnode.dev") {
          posts(first: 50) {
            edges {
              node {
                title
                brief
                slug
                tags {
                  name
                }
                coverImage {
                  url
                }
                publishedAt
              }
            }
          }
        }
      }
    `;

    try {
      const response = await axios({
        url: "https://gql.hashnode.com",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query,
        },
      });

      const postsData =
        response.data?.data?.publication?.posts?.edges?.map(
          (edge) => edge.node
        ) || [];

      cardRefs.current = [];
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
    fetchHashnodePosts();
    const interval = setInterval(fetchHashnodePosts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.classList.add("active-glow");
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.classList.remove("active-glow");
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch = title.includes(search);
    const matchesFilter =
      filter === "all" ||
      (post.tags && post.tags.some((tag) => tag.name === filter));

    return matchesSearch && matchesFilter;
  });

  const allTags = [
    ...new Set(
      posts.flatMap((post) => (post.tags || []).map((tag) => tag.name))
    ),
  ];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="blog-section container-fluid py-5">
      <div className="container">
        <motion.h2
          className="text-center mb-5 text-light"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📝 Latest Blog Posts
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          className="d-flex flex-wrap justify-content-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tags</option>
            {allTags.map((tag, i) => (
              <option key={i} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </motion.div>

        <div className="row g-4">
          {currentPosts.length === 0 ? (
            <div className="text-center text-light mt-5">
              <p>No blog posts found matching your criteria.</p>
            </div>
          ) : (
            currentPosts.map((post, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="glass-card"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {post.coverImage?.url && (
                    <img
                      src={post.coverImage.url || "/fallback.jpg"}
                      className="card-img-top"
                      alt={post.title}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <div className="card-body text-light">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.brief}</p>
                    <small className="text-info d-block mb-2">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </small>
                    <a
                      href={`https://amansrivastav.hashnode.dev/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light mt-2"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <motion.button
              key={i}
              className={`btn mx-1 ${currentPage === i + 1 ? "btn-light" : "btn-outline-light"}`}
              onClick={() => paginate(i + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-4">
          <motion.button
            className="btn btn-outline-light"
            onClick={fetchHashnodePosts}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Refresh Posts
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

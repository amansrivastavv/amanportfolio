import axios from "axios";
import { useEffect, useState } from "react";

const useHashnodePosts = (username = "amansrivastav", host = "amansrivastav.hashnode.dev", limit = 5) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);         // optional: loading state
  const [error, setError] = useState(null);             // optional: error state

  useEffect(() => {
    const fetchHashnodePosts = async () => {
      const query = `
        query {
          publication(host: "${host}") {
            posts(first: ${limit}) {
              edges {
                node {
                  title
                  brief
                  slug
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
        const response = await axios.post(
          "https://gql.hashnode.com",
          JSON.stringify({ query }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const postsData = response.data.data.publication.posts.edges.map(
          (edge) => edge.node
        );
        setPosts(postsData);
      } catch (err) {
        console.error("❌ Failed to fetch Hashnode posts:", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHashnodePosts();
  }, [username, host, limit]);

  return { posts, loading, error };  
};

export default useHashnodePosts;

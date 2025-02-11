import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [blog, setBlog] = useState({});
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getBlogs");
      if ((response.data.success = true)) {
        setBlog(response.data.blogs);
        console.log(response.data.blogs);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div>Home</div>
      <button onClick={() => (window.location.href = "/blog")}>
        Create Blog
      </button>
      {blog.length > 0 &&
        blog.map((blog) => (
          <div key={blog._id}>
            <h1>{blog.title}</h1>
            <h3>{blog.author}</h3>
            <p>{blog.description}</p>
          </div>
        ))}
      {/* {blog.length > 0 && <div>HEllo</div>} */}
    </>
  );
}

export default Home;

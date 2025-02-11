import axios from "axios";
import React, { useState } from "react";
import { createPost } from "../utils/blockchain";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, description, author };
    console.log(blog);
    try {
      // const contentHash = `hash-${Date.now()}`;
      // await createPost(title, contentHash);
      const response = await axios.post(
        "http://localhost:8000/api/createBlog",
        blog
        // contentHash
      );
      if ((response.data.success = true)) {
        alert("Blog Created Successfully");
        setTitle("");
        setDescription("");
        setAuthor("");
      }
    } catch (error) {
      console.log("Error creating blog:", error);
      // console.log(error);
      alert("Internal Server Error");
    }
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;

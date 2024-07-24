import React, { useState } from "react";
import axios from "axios";
import blogService from "../services/blogs";

const NewBlog = ({
  notification,
  setNotification,
  setBlogFormVisible,
  setBlogs,
}) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    setNewBlog((previousBlog) => ({
      ...previousBlog,
      [event.target.name]: event.target.value,
    }));
    console.log(newBlog);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBlogFormVisible(false);
    const storageToken = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser")
    );
    const token = storageToken.token;
    console.log(token);
    const response = await axios.post(
      "http://localhost:3003/api/blogs",
      newBlog,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    setNotification(
      `A new blog ${response.data.title} by ${response.data.author} added`
    );
    await blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  return (
    <>
      <h3 style={{ text: "green" }}>{notification}</h3>
      <h1>create new blog</h1>
      <form onSubmit={handleSubmit}>
        <p>title:</p>
        <input name="title" value={newBlog.title} onChange={handleChange} />
        <p>author:</p>
        <input name="author" value={newBlog.author} onChange={handleChange} />
        <p>url:</p>
        <input name="url" value={newBlog.url} onChange={handleChange} />
        <button type="submit">save new blog</button>
      </form>
    </>
  );
};

export default NewBlog;

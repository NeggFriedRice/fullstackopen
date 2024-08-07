import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [fullView, setFullView] = useState(false);

  const showFullView = { display: fullView ? "none" : "" };
  const hideFullView = { display: fullView ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <p className="blogTitleAuthor">
        {blog.title} {blog.author}
      </p>

      <button onClick={() => setFullView(true)} style={showFullView}>
        view
      </button>
      <button onClick={() => setFullView(false)} style={hideFullView}>
        hide
      </button>
      <div style={hideFullView} className="blogDetails">
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <p>authored by: {blog.user && blog.user.name}</p>
        <button onClick={() => handleDelete(blog.id)}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;

import { useState } from 'react'

const Blog = ({ blog }) => {

  const [fullView, setFullView] = useState(false)

  const showFullView = {display: fullView ? 'none' : ''}
  const hideFullView = {display: fullView ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setFullView(true)} style={showFullView}>view</button>
      <button onClick={() => setFullView(false)} style={hideFullView}>hide</button>
      <div style={hideFullView}>
        <div>
        {blog.author}
        </div>
        {blog.likes}
      </div>
    </div>
  );
};

export default Blog;

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      console.log(user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        Password
        <input
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const blogsDisplay = () => (
    <div>
      <h2>blogs</h2>
      <h1>{user.username} is logged in</h1>
      <button onClick={handleLogout}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleChange = (event) => {
    setNewBlog((previousBlog) => ({
      ...previousBlog,
      [event.target.name]: event.target.value,
    }));
    console.log(newBlog);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storageToken = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser")
    );
    const token = storageToken.token;
    console.log(token);
    const response = await axios.post("http://localhost:3003/api/blogs", newBlog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    setNotification(`A new blog ${response.data.title} by ${response.data.author} added`)
  };

  const blogForm = () => (
    <>
    <h3 style={{text: 'green'}}>{notification}</h3>
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

  return (
    <div>
      {!user ? loginForm() : blogsDisplay()}
      {user ? blogForm() : null}
    </div>
  );
};

export default App;

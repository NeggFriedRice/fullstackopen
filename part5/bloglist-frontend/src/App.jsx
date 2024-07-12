import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({username, password})
      console.log(user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

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
    window.localStorage.removeItem('loggedBlogappUser')
  }

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

  return <div>{!user ? loginForm() : blogsDisplay()}</div>;
};

export default App;

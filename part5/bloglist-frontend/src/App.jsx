import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [notification, setNotification] = useState(null);

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
      setNotification(null);
    }, 5000);
  }, [notification]);

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    );
  };

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



  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
    const showWhenVisible = { display: blogFormVisible ? "" : "none" };

    return (
      <>
        <h3 style={{ text: "green" }}>{notification}</h3>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlog 
          notification={notification}
          setBlogFormVisible={setBlogFormVisible}
          setNotification={setNotification}
          setBlogs={setBlogs}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </>
    );
  };

  return (
    <div>
      {!user ? loginForm() : blogsDisplay()}
      {user ? blogForm() : null}
    </div>
  );
};

export default App;

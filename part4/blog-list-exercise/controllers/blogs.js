const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  // const user = await User.findById(body.userId)
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  try {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    response.status(201).json(newBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({ error: "invalid token" });
    }

    const blogToDelete = await Blog.findById(request.params.id);
    console.log(blogToDelete);
    if (decodedToken.id.toString() === blogToDelete.user.toString()) {
      try {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
      } catch (error) {
        response.status(400).json(error);
      }
    } else {
      response
        .status(401)
        .json({ error: "you are not authorised to delete this post" });
    }
  } catch (error) {
    response.status(401).json({ error: "authorization could not be verified" });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter;

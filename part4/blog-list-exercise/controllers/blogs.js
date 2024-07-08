const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/api/blogs', async (request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })

  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch (error) {
    response.status(400).json(error)
  }


  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

module.exports = blogsRouter
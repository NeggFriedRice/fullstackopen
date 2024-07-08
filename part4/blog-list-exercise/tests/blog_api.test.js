const { test, after, beforeEach } = require("node:test");
const Blog = require('../models/blog')
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Goodbye",
    author: "Hopposcotch",
    url: "www.blogs.com",
    likes: 5,
  },
  {
    title: "Hello",
    author: "Hopposcotch",
    url: "www.blogs.com",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("correct amount of notes returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
});

test('returned response in JSON format', async () => {
  const response = await api.get('/api/blogs')
  assert('Content-Type', /application\/json/)
})

test('each post has a unique identifier property "id"', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    assert.ok(blog.id, 'id property should be defined');
  });
});

test('check if the likes property is missing', async () => {
  const newBlog = {
    title: "No likes test",
    author: "Test",
    url: "www.nolikestest.com"
  }

  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

})

test('adds a new post to the data base', async () => {
  const newBlog = {
    title: "NewBlog",
    author: "Ronald",
    url: "www.blogtest.com",
    likes: 10
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('title or url must be defined', async () => {
  const newBlog = {
    author: "No title or url",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close();
});

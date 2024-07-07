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

after(async () => {
  await mongoose.connection.close();
});

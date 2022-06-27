const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test Blog 123',
    author: 'Uncle',
    url: 'mock_url',
    likes: 12
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Aunt',
    url: 'mock_url_2',
    likes: 30
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('an id is assigned to the blogs', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(_ => {
    delete _.id
    return _
  })
  expect(contents).toContainEqual(
    initialBlogs[1]
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Jest',
    url: 'auto_gen_url',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => {
    delete r.id
    return r
  })

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContainEqual(
    newBlog
  )
})

test('a blog without likes property will default to 0', async () => {
  const newBlog = {
    title: 'no likes in this title',
    author: 'Jest',
    url: 'auto_gen_url',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => {
    delete r.id
    return r
  })

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContainEqual(
    { ...newBlog, likes: 0 }
  )
})

afterAll(() => {
  mongoose.connection.close()
})
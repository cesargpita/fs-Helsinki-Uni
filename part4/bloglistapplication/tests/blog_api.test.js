const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


let initialBlogs = [
  {
    title: 'Test Blog 123',
    author: 'root',
    url: 'mock_url',
    likes: 12
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'root',
    url: 'mock_url_2',
    likes: 30
  },
]
let token;
let testUser;

beforeAll(async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })

  await user.save()

  const login = await api.post('/api/login').send({ username: 'root', password: 'sekret' })
  token = `Bearer ${login.body.token}`;

  testUser = await User.findOne({ username: 'root' })
  initialBlogs = initialBlogs.map(blog => ({ ...blog, user: testUser.id.toString() }))
})

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
    { ...initialBlogs[1], user: { "id": testUser.id, "username": "root" } }
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: 'auto_gen_url',
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ 'Content-Type': 'application/json', Authorization: token })
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
    url: 'auto_gen_url',
  }

  await api
    .post('/api/blogs')
    .set({ 'Content-Type': 'application/json', Accept: '*/*', Authorization: token })
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

test('a blog without url and title will not be saved', async () => {
  const newBlog = {
    author: 'Jest',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({
      'Content-Type': 'application/json',
      Authorization: token
    })
    .expect(400)
    .expect('Content-Type', /text\/html/)
})

describe('get a specific blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await api.get('/api/blogs');

    await api
      .get(`/api/blogs/${blogs.body[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with status code 404 if id is not valid', async () => {
    await api
      .get(`/api/blogs/${mongoose.Types.ObjectId(1321321)}`)
      .expect(404)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await api.get('/api/blogs');

    const blogToDelete = blogs.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id.toString()}`)
      .set({ 'Content-Type': 'application/json', Accept: '*/*', Authorization: token })
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      initialBlogs.length - 1
    )

    expect(blogsAtEnd.body).not.toContain(blogToDelete.content)
  })

  test('fails with status code 500 if id is not valid', async () => {

    await api
      .delete(`/api/blogs/${mongoose.Types.ObjectId(123123123)}`)
      .set({ Authorization: token })
      .expect(500)
  })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 if id & params are valid', async () => {
    const blogs = await api.get('/api/blogs');

    const blogToUpdate = blogs.body[0];

    const blogAtEnd = await api
      .put(`/api/blogs/${blogToUpdate.id.toString()}`)
      .send({ likes: 20 })
      .set({ 'Content-Type': 'application/json', Accept: '*/*', Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogAtEnd.body.likes).toEqual(20)
    expect(blogAtEnd.body.title).toEqual(blogToUpdate.title)
    expect(blogAtEnd.body.author).toEqual(blogToUpdate.author)
    expect(blogAtEnd.body.url).toEqual(blogToUpdate.url)
  })

  test('fails with status code 500 if id is not valid', async () => {

    const blogs = await api.get('/api/blogs');

    const blogToUpdate = blogs.body[0];

    await api
      .put('/api/blogs/9999999999', { ...blogToUpdate, likes: 20 })
      .set({ 'Content-Type': 'application/json', Accept: '*/*', Authorization: token })
      .expect(500)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with no password', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with no username', async () => {
    const newUser = {
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with short username', async () => {
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation fails with short pwd', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
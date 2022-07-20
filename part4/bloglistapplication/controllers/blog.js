const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const { title, url, likes } = { ...request.body }
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = request.user
  if (!userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(userId)
  if (!title && !url) {
    response.status(400).send('title and url are missing!');
  } else {
    const blog = new Blog({ title, author: user.name, url, likes: likes ? likes : 0 })
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).catch(error => next(error))
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
    .catch(error => next(error))
  response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const userId = request.user
  if (blog.user.toString() === userId) {
    await Blog.findByIdAndRemove(request.params.id)
      .catch(error => next(error))
    response.status(204).end()
  } else {
    response.status(400).send('only the author can delete the blog!');
  }
})


module.exports = blogRouter
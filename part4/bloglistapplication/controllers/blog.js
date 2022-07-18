const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const { title, url, likes } = { ...request.body }
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
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

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = blogRouter
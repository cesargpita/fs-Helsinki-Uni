const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const { title, author, url, likes } = { ...request.body }
  if (!title && !url) {
    response.status(400).send('title and url are missing!');
  } else {
    const blog = new Blog({ title, author, url, likes: likes ? likes : 0 })
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
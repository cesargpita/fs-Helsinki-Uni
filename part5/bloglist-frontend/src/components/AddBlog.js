import React, { useState } from 'react'
import blogService from '../services/blogs';

const AddBlog = ({ setBlogs, blogs }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, url }
    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          url: <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AddBlog
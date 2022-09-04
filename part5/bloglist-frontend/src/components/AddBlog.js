import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ setBlogs, blogs, showMessage }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [visibleForm, setVisibleForm] = useState(false)

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, url }
    const newBlog = await blogService.create(blogObject).catch(err => showMessage(`Error adding blog: ${err}`, 'error'))
    setBlogs(blogs.concat(newBlog.data))
    setTitle('')
    setUrl('')
    setVisibleForm(false)
    showMessage(`a new blog ${title} by ${window.localStorage.getItem('loggedBlogappUser').username} successfully created!`, 'success')
  }

  const hideWhenVisible = { display: visibleForm ? 'none' : '' }
  const showWhenVisible = { display: visibleForm ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisibleForm(true)}>new note</button>
      </div>
      <div style={showWhenVisible}>
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
          <button onClick={() => setVisibleForm(false)}>cancel</button>
        </form>
      </div>
    </>
  )
}

export default AddBlog
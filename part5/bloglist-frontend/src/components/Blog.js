import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog }) => {

  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
    }
  }

  const [visibleBlog, setVisibleBlog] = useState(false)
  return (
    <div style={blogStyle}>
      <div className='title'>{blog.title} <button onClick={() => setVisibleBlog(!visibleBlog)}>{visibleBlog ? 'hide' : 'view'}</button></div>
      <div className='author'>{blog.author}</div>
      {visibleBlog && <div>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes {blog.likes}<button onClick={likeBlog}>like</button></div>
        {user === blog.author && <button onClick={deleteBlog}>delete</button>}
      </div>}
    </div>
  )
}

Blog.propTypes = () => ({
  blog: {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    likes: PropTypes.number
  }
})

export default Blog
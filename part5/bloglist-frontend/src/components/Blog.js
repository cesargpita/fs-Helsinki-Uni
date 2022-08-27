import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [blogData, setBlogData] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async () => {
    const updated = await blogService.update({ ...blogData, likes: blogData.likes + 1 });
    setBlogData(updated.data)
  }

  const [visibleBlog, setVisibleBlog] = useState(false)
  return (
    <div style={blogStyle}>
      <div>{blogData.title} <button onClick={() => setVisibleBlog(!visibleBlog)}>{visibleBlog ? 'hide' : 'view'}</button></div>
      {visibleBlog && <div>
        <div>{blogData.url}</div>
        <div>likes {blogData.likes}<button onClick={likeBlog}>like</button></div>
        <div>{blogData.author}</div>
      </div>}
    </div>
  )
}

export default Blog
import { useState } from "react"

const Blog = ({ blog }) => {

  console.log(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibleBlog, setVisibleBlog] = useState(false)
  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => setVisibleBlog(!visibleBlog)}>{visibleBlog ? 'hide' : 'view'}</button></div>
      {visibleBlog && <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button>like</button></div>
        <div>{blog.author}</div>
      </div>}
    </div>
  )
}

export default Blog
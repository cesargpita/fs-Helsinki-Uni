import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showMessage('Successfully logged out!', 'success')
  }

  const showMessage = (message, type, time = 5000) => {
    setMessageType(type)
    setMessage(
      message
    )
    setTimeout(() => {
      setMessage(null)
    }, time)
  }


  if (user === null) {
    return (<>
      <Notification message={message} type={messageType} />
      <Login setUser={setUser} showMessage={showMessage} />
    </>)
  }
  return (
    <div>
      <Notification message={message} type={messageType} />
      <AddBlog blogs={blogs} setBlogs={setBlogs} showMessage={showMessage} />
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={() => logOut()}>logout</button></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App

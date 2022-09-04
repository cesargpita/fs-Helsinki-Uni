import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const create = (blog) => {
  console.log(window.localStorage.getItem('loggedBlogappUser'))
  const parsedToken = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  setToken(parsedToken.token)
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, { ...blog, user: parsedToken.id }, config)
}

const update = (blog) => {
  setToken(JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token)
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`${baseUrl}/${blog.id}`, blog, config)
}

const remove = (blog) => {
  setToken(JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token)
  console.log(blog)
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, create, setToken, update, remove }
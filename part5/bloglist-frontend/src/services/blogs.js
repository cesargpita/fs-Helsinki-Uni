import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = (blog) => {
  setToken(JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token)
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, blog, config)
}

const update = (blog) => {
  setToken(JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token)
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`${baseUrl}/${blog.id}`, blog, config)
}

export default { getAll, create, setToken, update }
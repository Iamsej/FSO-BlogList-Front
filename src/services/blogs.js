import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const sendBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setLikes = async (oldObject, objectId) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.patch(`${baseUrl}/${objectId}`, oldObject, config)
  return response.data
}


export default { getAll, setToken, sendBlog, setLikes }
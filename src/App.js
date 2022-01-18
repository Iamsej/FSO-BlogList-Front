import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notice from './components/Notice'
import SubmissionForm from './components/SubmissionForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleInput = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const response = await blogService.sendBlog(blog)
    setBlogs(blogs.concat(response))
    setMessage(`New blog "${newTitle}" by ${newAuthor} sucessfully added`)
    setTimeout(()=> {setMessage(null)}, 5000)

  }

  return user === null
    ?
      <div>
        <Notice message={message} error={error}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} autoComplete='off'>
          <div>
            Username: {} 
              <input
              type='text'
              value={username}
              name='Username'
              onChange={({target}) => setUsername(target.value)}
              />
          </div>
          <br/>
          <div>
            Password: {} 
              <input
              type='text'
              value={password}
              name='Password'
              onChange={({target}) => setPassword(target.value)}
              />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
  :
    <div>
      <Notice message={message} error={error}/>
      <h2>blogs</h2>
      <div>
        <p>
        {user.name} logged in <button onClick={logout}>logout</button>
        </p>
      </div>
      <br/>
      <SubmissionForm 
      titleField={newTitle} titleInput={handleTitleInput}
      authorField={newAuthor} authorInput={handleAuthorInput}
      urlField={newUrl} urlInput={handleUrlInput}
      submission={addBlog}/>
      <br/>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
}

export default App
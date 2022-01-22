import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notice from './components/Notice'
import SubmissionForm from './components/SubmissionForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

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



  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }
  
  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
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

  const addBlog = async (blogObject) => {
    noteFormRef.current.toggleVisibility()
    const response = await blogService.sendBlog(blogObject)
    console.log(response)
    setBlogs(blogs.concat(response))
    setMessage(`New blog "${response.title}" by ${response.author} sucessfully added`)
    setTimeout(()=> {setMessage(null)}, 5000)
  }

  const addLike = async (blogObject, id) => {
    const response = await blogService.setLikes(blogObject, id)
    console.log(response)
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Are you sure you want to delete ${blog.title}?`)){
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(blogs => blogs.id !== blog.id))
    } else {
      return 'Deletion cancelled'
    }
  }

  const sortBlogs = (blogList) => {
    console.log(blogList)
    const midList = blogList.sort(function(a,b){
      return(b.likes - a.likes)
    })
    const blogOut = midList.map(blog => 
      <Blog 
       key={blog.id} blog={blog}
       likes={addLike} deletion={deleteBlog}
       user={user}
      />
    )
    return blogOut
  }
    
  return user === null
    ?
      <div>
        <Notice message={message} error={error}/>
          <LoginForm 
          username={username} password={password}
          handleUsernameChange={handleUsernameInput}
          handlePasswordChange={handlePasswordInput}
          handleLogin={handleLogin}
        />
      </div>
  :
    <div>
      <Notice message={message} error={error}/>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={logout}>logout</button>
      </div>
      <br/>
      <Togglable buttonLabel='Show' ref={noteFormRef}>
        <SubmissionForm submission={addBlog}/>
      </Togglable>
      <br/>
      <br/>
      {sortBlogs(blogs)}
    </div>
}

export default App
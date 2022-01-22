import React, { useState } from 'react'



const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
  <>
  <div className='blog' style={hideWhenVisible}>
    {blog.title} {blog.author} {}
    <button onClick={toggleVisibility}>view</button>
  </div>
  <div className='blog' style={showWhenVisible}>
    {blog.title} {blog.author} {}
    <button onClick={toggleVisibility}>hide</button>
    <br/>
    {blog.url}
    <br/>
    {blog.likes} {}
    <button>like</button>
    <br/>
    {blog.user.username}
  </div>
  </>
  )  
}

export default Blog
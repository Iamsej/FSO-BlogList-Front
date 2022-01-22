import React, { useState } from 'react'



const Blog = ({blog, likes}) => {
  const [visible, setVisible] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()
    likes({
      likes: likeCount + 1
    }, blog.id)

    setLikeCount(likeCount + 1)
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
    {likeCount} {}
    <button onClick={addLike}>like</button>
    <br/>
    {blog.user.username}
  </div>
  </>
  )  
}

export default Blog
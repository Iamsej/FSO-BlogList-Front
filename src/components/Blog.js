import React, { useState, useEffect } from 'react'



const Blog = ({ blog, likes, deletion, user }) => {
  const [visible, setVisible] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.likes)
  const [userMatches, setUserMatches] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenUserMatches = { display: userMatches ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const userMatch = (name) => {
    if (name.name === blog.user.name) {
      setUserMatches(true)
    } else {
      setUserMatches(false)
    }
  }

  useEffect(() => {
    userMatch(user)
  })

  const addLike = async (event) => {
    event.preventDefault()
    likes({
      likes: likeCount + 1
    }, blog.id)

    setLikeCount(likeCount + 1)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    deletion(blog)
  }

  return(
    <>
      <div className='blog' style={hideWhenVisible}>
        {blog.title} {blog.author} {}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className={'blog', 'togglableContent'} style={showWhenVisible}>
        {blog.title} {blog.author} {}
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {likeCount} {}
        <button onClick={addLike}>like</button>
        <br/>
        {blog.user.username}
        <br/>
        <button onClick={deleteBlog}
          style={showWhenUserMatches}>delete</button>
      </div>
    </>
  )
}

export default Blog
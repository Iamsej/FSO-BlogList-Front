import React, { useState } from 'react'

const SubmissionForm = ({ submission }) => {

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleUrlInput = (event) => {
    setUrl(event.target.value)
  }

  const handleTitleInput = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    setAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    submission({
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
          Title: <input
          className='titleInput' value={newTitle}
          onChange={handleTitleInput}/>
      </div>
      <div>
          Author: <input
          className='authorInput' value={newAuthor}
          onChange={handleAuthorInput}/>
      </div>
      <div>
          url: <input
          className='urlInput' value={newUrl}
          onChange={handleUrlInput}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default SubmissionForm
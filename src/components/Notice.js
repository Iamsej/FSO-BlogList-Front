import React from 'react'

const Notice = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  } else if (message === null) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }

  return(
    <div className='message'>
      {message}
    </div>
  )
}

export default Notice
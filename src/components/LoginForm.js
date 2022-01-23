import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return(
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} autoComplete='off'>
        <div>
                Username: {}
          <input
            type='text'
            value={username}
            id='username'
            onChange={handleUsernameChange}
          />
        </div>
        <br/>
        <div>
                Password: {}
          <input
            type='text'
            value={password}
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit' id='loginButton'>login</button>
      </form>
    </>
  )
}

export default LoginForm
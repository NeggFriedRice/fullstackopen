import React from 'react'

export const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      Username
      <input
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      Password
      <input
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />
    </div>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
  )
}

export default LoginForm

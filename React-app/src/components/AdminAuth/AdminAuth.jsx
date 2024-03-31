import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminAuth.scss'

function AdminAuth ({ onLoginSuccess }) {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    try {
      const response = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error('Invalid Credentials')
      }

      const data = await response.json()
      setMessage(data.message)
      if (data.message === 'Login Successful') {
        onLoginSuccess()
        navigate('/')
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className= 'backg'>
        <div className='auth-h1'>
            <h1>Authentification</h1>
        </div>
        <div>
        <form className='form-auth' onSubmit={handleLogin}>
        <div>
            {message && <p>{message}</p>}
        </div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required /><br />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required /><br />

            <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default AdminAuth

import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { UserContext } from '../UserContext'
import { useContext } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
          alert('Please enter both email and password')
          return
      }
        try {
          const {data} = await axios.post('/login', {email, password})
          setUser(data)
          window.localStorage.setItem('token', data.token)
          alert('Login successful')
          navigate('/')
        } catch (e) {
          alert('Login failed')
          console.log(e.message)
        }
      }

  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input type="email"
               placeholder="your@email.com"
               value={email}
               onChange={e => setEmail(e.target.value)} />
        <input type="password"
               placeholder="password"
               value={password}
               onChange={e => setPassword(e.target.value)} />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
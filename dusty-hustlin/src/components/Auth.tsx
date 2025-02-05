import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (type: 'signup' | 'signin') => {
    try {
      setLoading(true)
      const { error } = type === 'signup' 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
      
      if (error) throw error
      navigate('/dashboard')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-primary">Dusty Hustlin'</h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <button
            onClick={() => handleLogin('signup')}
            disabled={loading}
            className="flex-1 bg-primary text-white p-2 rounded hover:bg-primary-dark"
          >
            Sign Up
          </button>
          <button
            onClick={() => handleLogin('signin')}
            disabled={loading}
            className="flex-1 bg-secondary text-white p-2 rounded hover:bg-secondary-dark"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
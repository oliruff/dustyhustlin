import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {  // Add underscore to unused param
        setUser(session?.user ?? null)
      }
    )
  
    return () => authListener?.subscription.unsubscribe()
  }, [])

  return (
    <Router basename="/">
      <Navbar user={user} />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </Router>
  )
}
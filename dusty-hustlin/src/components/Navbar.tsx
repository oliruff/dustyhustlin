import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User | null
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Dusty Hustlin'</Link>
        <div className="space-x-4">
          {user ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="hover:text-secondary transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth" className="hover:text-secondary transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
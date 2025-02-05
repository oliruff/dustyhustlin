import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Dusty Hustlin'</Link>
        <div className="space-x-4">
           (
            <button 
              onClick={() => supabase.auth.signOut()}
              className="hover:text-secondary"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth" className="hover:text-secondary">
              Login
            </Link>
          )
        </div>
      </div>
    </nav>
  )
}
import { Link } from 'react-router-dom'

export default function Home() {  // Remove props if not needed
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Dusty Hustlin'</h1>
      <p className="mb-8">Maximize your credit card rewards</p>
      <Link 
        to="/auth" 
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark"
      >
        Get Started
      </Link>
    </div>
  )
}
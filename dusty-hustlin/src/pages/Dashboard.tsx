import Calculator from '../components/Calculator'
import CardManager from '../components/CardManager'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <Calculator />
      <CardManager />
    </div>
  )
}
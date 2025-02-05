import { useState } from 'react'
import { optimizeSpending } from '../lib/calculations'
import { useCards } from '../lib/hooks' // Create this hook

export default function Calculator() {
  const [amount, setAmount] = useState('')
  const [results, setResults] = useState<any>(null)
  const { cards } = useCards()

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount)
    if (cards && parsedAmount > 0) {
      const optimization = optimizeSpending(parsedAmount, cards)
      setResults(optimization)
    }
  }

  return (
    <div className="calculator">
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Purchase amount"
        />
        <button onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {results && (
        <div className="results">
          <h3>Optimal Allocation</h3>
          {results.breakdown.map((result: any) => (
            <div key={result.card.id} className="allocation-card">
              <h4>{result.card.name}</h4>
              <p>Allocated: ${result.allocated.toFixed(2)}</p>
              <p>Points: {result.points}</p>
              <p>Net Benefit: ${result.netBenefit.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
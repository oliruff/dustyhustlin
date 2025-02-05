import { useState } from 'react'
import { motion } from 'framer-motion'
import { optimizeSpending, AllocationResult } from '../lib/calculations'
import { useCards } from '../lib/hooks'

export default function Calculator() {
  const [amount, setAmount] = useState('')
  const [results, setResults] = useState<AllocationResult | null>(null)
  const { cards } = useCards()

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount)
    if (cards && parsedAmount > 0) {
      const optimization = optimizeSpending(parsedAmount, cards)
      setResults(optimization)
    }
  }

  return (
    <motion.div 
      className="p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter purchase amount"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Optimal Allocation</h3>
          {results.breakdown.map((result) => (
            <div 
              key={result.card.id}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="font-semibold">{result.card.name}</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>Allocated:</div>
                <div className="font-mono">${result.allocated.toFixed(2)}</div>
                <div>Points Earned:</div>
                <div className="font-mono">{result.points}</div>
                <div>Net Benefit:</div>
                <div className="font-mono">${result.netBenefit.toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-bold">Total Points:</div>
              <div className="font-mono font-bold">{results.totalPoints}</div>
              <div className="font-bold">Total Net Benefit:</div>
              <div className="font-mono font-bold">${results.totalNetBenefit.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
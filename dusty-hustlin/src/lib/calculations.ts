interface Card {
    id: string
    name: string
    annual_fee: number
    welcome_bonus_points: number
    reward_rate: number
    min_spend: number
    category_bonuses?: Record<string, number>
    tiered_rewards?: Array<{ min: number; rate: number }>
  }
  
  interface AllocationResult {
    totalPoints: number
    totalNetBenefit: number
    breakdown: Array<{
      card: Card
      allocated: number
      points: number
      netBenefit: number
    }>
  }
  
  export function optimizeSpending(purchaseAmount: number, cards: Card[], category?: string): AllocationResult {
    let remaining = purchaseAmount
    const allocation: Record<string, number> = {}
    
    // Clone cards to avoid mutation
    const sortedCards = [...cards]
      .sort((a, b) => {
        const aValue = a.welcome_bonus_points - a.annual_fee
        const bValue = b.welcome_bonus_points - b.annual_fee
        return bValue - aValue
      })
  
    // Allocate to meet minimum spends for welcome bonuses
    for (const card of sortedCards.filter(c => c.min_spend > 0)) {
      if (remaining <= 0) break
      const allocate = Math.min(card.min_spend, remaining)
      allocation[card.id] = allocate
      remaining -= allocate
    }
  
    // Allocate remaining to best ongoing rates
    const remainingCards = sortedCards
      .filter(c => !allocation[c.id])
      .sort((a, b) => {
        const aRate = getEffectiveRate(a, category)
        const bRate = getEffectiveRate(b, category)
        return bRate - aRate
      })
  
    for (const card of remainingCards) {
      if (remaining <= 0) break
      allocation[card.id] = (allocation[card.id] || 0) + remaining
      remaining = 0
    }
  
    // Calculate results
    const breakdown = cards.map(card => {
      const allocated = allocation[card.id] || 0
      const points = calculatePoints(card, allocated, category)
      const netBenefit = points - card.annual_fee
      
      return {
        card,
        allocated,
        points,
        netBenefit
      }
    })
  
    return {
      totalPoints: breakdown.reduce((sum, r) => sum + r.points, 0),
      totalNetBenefit: breakdown.reduce((sum, r) => sum + r.netBenefit, 0),
      breakdown
    }
  }
  
  function getEffectiveRate(card: Card, category?: string): number {
    let rate = card.reward_rate
    if (category && card.category_bonuses?.[category]) {
      rate += card.category_bonuses[category]
    }
    return rate
  }
  
  function calculatePoints(card: Card, amount: number, category?: string): number {
    let points = 0
    
    // Add welcome bonus if minimum spend met
    if (amount >= card.min_spend) {
      points += card.welcome_bonus_points
    }
  
    // Calculate regular points
    points += amount * (getEffectiveRate(card, category) / 100)
  
    return Math.round(points)
  }
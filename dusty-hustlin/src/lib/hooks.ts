import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { Card } from './calculations'

export function useCards() {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from('cards').select('*')
      if (data) setCards(data)
    }
    fetchCards()
  }, [])

  return { cards }
}
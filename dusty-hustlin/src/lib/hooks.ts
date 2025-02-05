import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { Card } from './calculations'

export function useCards() {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setCards(data)
      if (error) console.error('Error fetching cards:', error)
    }

    fetchCards()
  }, [])

  return { cards }
}
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabase'
import { Card } from '../lib/calculations'

export default function CardManager() {
  const [cards, setCards] = useState<Card[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm<Card>()

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const { data, error } = await supabase.from('cards').select('*')
    if (data) setCards(data)
    if (error) console.error('Error fetching cards:', error)
  }

  const onSubmit = async (cardData: Card) => {
    const { error } = await supabase.from('cards').insert(cardData)
    if (!error) {
      await fetchCards()
      setModalIsOpen(false)
      reset()
    }
  }

  const deleteCard = async (cardId: string) => {
    const { error } = await supabase.from('cards').delete().eq('id', cardId)
    if (!error) fetchCards()
  }

  return (
    <div className="p-6">
      <button
        onClick={() => setModalIsOpen(true)}
        className="mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Add New Card
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Credit Card</h2>
          <button 
            onClick={() => setModalIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Card Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('annual_fee', { required: true, valueAsNumber: true })}
            placeholder="Annual Fee"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('welcome_bonus_points', { required: true, valueAsNumber: true })}
            placeholder="Welcome Bonus Points"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            {...register('reward_rate', { required: true, valueAsNumber: true })}
            placeholder="Reward Rate (%)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('min_spend', { required: true, valueAsNumber: true })}
            placeholder="Minimum Spend Requirement"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Save Card
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Annual Fee:</span> ${card.annual_fee}</p>
              <p><span className="font-medium">Welcome Bonus:</span> {card.welcome_bonus_points} pts</p>
              <p><span className="font-medium">Reward Rate:</span> {card.reward_rate}%</p>
              <p><span className="font-medium">Min Spend:</span> ${card.min_spend}</p>
            </div>
            <button
              onClick={() => deleteCard(card.id)}
              className="mt-3 text-red-600 hover:text-red-800 text-sm"
            >
              Remove Card
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
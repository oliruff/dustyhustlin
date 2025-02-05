import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Card = {
  id: string
  name: string
  annual_fee: number
  welcome_bonus_points: number
  reward_rate: number
  min_spend: number
}

export default function CardManager() {
  const [cards, setCards] = useState<Card[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm<Card>()

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setCards(data)
    if (error) console.error(error)
  }

  const onSubmit = async (cardData: Card) => {
    const { error } = await supabase.from('cards').insert(cardData)
    if (!error) {
      fetchCards()
      setModalIsOpen(false)
      reset()
    }
  }

  const deleteCard = async (id: string) => {
    const { error } = await supabase.from('cards').delete().eq('id', id)
    if (!error) fetchCards()
  }

  return (
    <div className="p-6">
      <button
        onClick={() => setModalIsOpen(true)}
        className="mb-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Add New Card
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Credit Card</h2>
          <button onClick={() => setModalIsOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
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
            {...register('annual_fee', { required: true })}
            placeholder="Annual Fee"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('welcome_bonus_points', { required: true })}
            placeholder="Welcome Bonus Points"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            {...register('reward_rate', { required: true })}
            placeholder="Reward Rate (%)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('min_spend', { required: true })}
            placeholder="Minimum Spend Requirement"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark"
          >
            Save Card
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
            <p>Annual Fee: ${card.annual_fee}</p>
            <p>Welcome Bonus: {card.welcome_bonus_points} points</p>
            <p>Reward Rate: {card.reward_rate}%</p>
            <p>Minimum Spend: ${card.min_spend}</p>
            <button
              onClick={() => deleteCard(card.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove Card
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
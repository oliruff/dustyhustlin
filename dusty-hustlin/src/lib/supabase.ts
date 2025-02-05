import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function for error handling
export const handleSupabaseError = (error: any) => {
  if (error) {
    console.error('Supabase error:', error)
    throw error
  }
}
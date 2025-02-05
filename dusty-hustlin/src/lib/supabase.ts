import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://maidlpxczvizwfypgjop.supabase.co
const supabaseKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haWRscHhjenZpendmeXBnam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3ODg4MDcsImV4cCI6MjA1NDM2NDgwN30.-V2UoD-n8qQNYYq8x8fP4k2EQixrMzrtZoztkw0RHXY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function for error handling
export const handleSupabaseError = (error: any) => {
  if (error) {
    console.error('Supabase error:', error)
    throw error
  }
}
import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from environment variables with safe access
const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || ''
  }
  return ''
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

// Validate Supabase configuration
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isSupabaseConfigValid = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  isValidUrl(supabaseUrl) &&
  supabaseUrl.includes('supabase.co')
)

if (!isSupabaseConfigValid) {
  console.warn('🔧 Supabase Configuration Issue:')
  console.warn('- URL:', supabaseUrl ? '✓ Present' : '❌ Missing')
  console.warn('- Key:', supabaseAnonKey ? '✓ Present' : '❌ Missing')
  console.warn('- Valid URL:', supabaseUrl ? isValidUrl(supabaseUrl) : '❌ Invalid')
  console.warn('- Supabase Domain:', supabaseUrl ? supabaseUrl.includes('supabase.co') : '❌ Not Supabase')
  console.warn('Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

// Create Supabase client only if configuration is valid
export const supabase = isSupabaseConfigValid ? createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'X-Client-Info': 'Uddisha-web'
      }
    }
  }
) : null

// Database types with proper TypeScript definitions
export interface FeedbackData {
  id?: string
  created_at?: string
  name: string
  email: string
  rating: number
  category?: string | null
  message: string
  improvements?: string | null
  user_agent?: string | null
  ip_address?: string | null
}

// MISSING INTERFACE - NOW ADDED
export interface HelpRequestData {
  id?: string
  created_at?: string
  name: string
  email: string
  rating: number
  category?: string | null
  message: string
  improvements?: string | null
  user_agent?: string | null
  ip_address?: string | null
}

// Newsletter subscription interface
export interface NewsletterSubscriptionData {
  id?: string
  email: string
  subscribed_at?: string
  user_agent?: string | null
  ip_address?: string | null
}

// 1:1 Counselling Request interface
export interface CounsellingRequestData {
  id?: string
  created_at?: string
  name: string
  phone: string
  email?: string | null
  city: string
  message?: string | null
  user_agent?: string | null
}

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return isSupabaseConfigValid
}

// Helper function to test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return false
    }
    
    // Test connection by trying to access the help_requests table
    const { error } = await supabase
      .from('help_requests')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

// PRODUCTION-READY feedback submission with comprehensive error handling
export const submitFeedback = async (feedbackData: FeedbackData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Check if Supabase is configured and client exists
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured')
    }

    // Validate required fields
    if (!feedbackData.name?.trim()) {
      throw new Error('Name is required')
    }
    if (!feedbackData.email?.trim()) {
      throw new Error('Email is required')
    }
    if (!feedbackData.message?.trim()) {
      throw new Error('Message is required')
    }
    if (!feedbackData.rating || feedbackData.rating < 1 || feedbackData.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(feedbackData.email.trim())) {
      throw new Error('Please enter a valid email address')
    }

    // Prepare data for insertion
    const dataToInsert = {
      name: feedbackData.name.trim(),
      email: feedbackData.email.trim().toLowerCase(),
      rating: feedbackData.rating,
      category: feedbackData.category?.trim() || null,
      message: feedbackData.message.trim(),
      improvements: feedbackData.improvements?.trim() || null,
      user_agent: feedbackData.user_agent || (typeof navigator !== 'undefined' ? navigator.userAgent : null),
      ip_address: null
    }

    // Try the custom function first (most reliable)
    try {
      const { data, error } = await supabase.rpc('insert_feedback', {
        p_name: dataToInsert.name,
        p_email: dataToInsert.email,
        p_rating: dataToInsert.rating,
        p_message: dataToInsert.message,
        p_category: dataToInsert.category,
        p_improvements: dataToInsert.improvements,
        p_user_agent: dataToInsert.user_agent
      })

      if (error) {
        throw error
      }

      return { success: true, data: { id: data, ...dataToInsert } }
    } catch (funcError: any) {
      // Fallback to direct insert
      try {
        const { data, error } = await supabase
          .from('feedback')
          .insert([dataToInsert])
          .select()
          .single()

        if (error) {
          throw error
        }

        return { success: true, data }
      } catch (insertError: any) {
        throw insertError
      }
    }

  } catch (error: any) {
    // Return detailed error information for debugging
    let errorMessage = 'Failed to submit feedback. '
    
    if (error.message.includes('not configured')) {
      errorMessage += 'Database connection not available. Please try again later.'
    } else if (error.message.includes('row-level security') || error.message.includes('permission')) {
      errorMessage += 'Permission issue detected. Please try again.'
    } else if (error.message.includes('duplicate')) {
      errorMessage += 'Duplicate submission detected. Please wait before submitting again.'
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage += 'Network connection issue. Please check your internet and try again.'
    } else if (error.message.includes('function') && error.message.includes('does not exist')) {
      errorMessage += 'Database function not available. Please try again later.'
    } else {
      errorMessage += error.message || 'Please try again or contact support.'
    }
    
    return { success: false, error: errorMessage }
  }
}

// PRODUCTION-READY help request submission
export const submitHelpRequest = async (helpData: HelpRequestData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Check if Supabase is configured and client exists
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured')
    }

    // Validate required fields
    if (!helpData.name?.trim()) {
      throw new Error('Name is required')
    }
    if (!helpData.email?.trim()) {
      throw new Error('Email is required')
    }
    if (!helpData.message?.trim()) {
      throw new Error('Message is required')
    }
    if (!helpData.rating || helpData.rating < 1 || helpData.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(helpData.email.trim())) {
      throw new Error('Please enter a valid email address')
    }

    // Prepare data for insertion
    const dataToInsert = {
      name: helpData.name.trim(),
      email: helpData.email.trim().toLowerCase(),
      rating: helpData.rating,
      category: helpData.category?.trim() || null,
      message: helpData.message.trim(),
      improvements: helpData.improvements?.trim() || null,
      user_agent: helpData.user_agent || (typeof navigator !== 'undefined' ? navigator.userAgent : null),
      ip_address: null
    }

    // Insert help request
    const { data, error } = await supabase
      .from('help_requests')
      .insert([dataToInsert])
      .select()
      .single()

    if (error) {
      throw error
    }

    return { success: true, data }

  } catch (error: any) {
    // Return detailed error information for debugging
    let errorMessage = 'Failed to submit help request. '
    
    if (error.message.includes('not configured')) {
      errorMessage += 'Database connection not available. Please try again later.'
    } else if (error.message.includes('row-level security') || error.message.includes('permission')) {
      errorMessage += 'Permission issue detected. Please try again.'
    } else if (error.message.includes('duplicate')) {
      errorMessage += 'Duplicate submission detected. Please wait before submitting again.'
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage += 'Network connection issue. Please check your internet and try again.'
    } else {
      errorMessage += error.message || 'Please try again or contact support.'
    }
    
    return { success: false, error: errorMessage }
  }
}

// PRODUCTION-READY newsletter subscription
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Check if Supabase is configured and client exists
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured')
    }

    // Validate email
    if (!email?.trim()) {
      throw new Error('Email is required')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid email address')
    }

    // Prepare data for insertion
    const dataToInsert = {
      email: email.trim().toLowerCase(),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ip_address: null
    }

    // Insert newsletter subscription (will handle duplicates with upsert)
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .upsert([dataToInsert], { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return { success: true, data }

  } catch (error: any) {
    // Return detailed error information for debugging
    let errorMessage = 'Failed to subscribe to newsletter. '
    
    if (error.message.includes('not configured')) {
      errorMessage += 'Database connection not available. Please try again later.'
    } else if (error.message.includes('duplicate')) {
      errorMessage += 'You are already subscribed to our newsletter!'
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorMessage += 'Network connection issue. Please check your internet and try again.'
    } else {
      errorMessage += error.message || 'Please try again or contact support.'
    }
    
    return { success: false, error: errorMessage }
  }
}

// PRODUCTION-READY counselling request submission
export const submitCounsellingRequest = async (counsellingData: CounsellingRequestData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase not configured')
    }

    if (!counsellingData.name?.trim()) throw new Error('Name is required')
    if (!counsellingData.phone?.trim()) throw new Error('Phone number is required')
    if (!counsellingData.city?.trim()) throw new Error('City is required')

    const dataToInsert = {
      name: counsellingData.name.trim(),
      phone: counsellingData.phone.trim(),
      email: counsellingData.email?.trim().toLowerCase() || null,
      city: counsellingData.city.trim(),
      message: counsellingData.message?.trim() || null,
      user_agent: counsellingData.user_agent || (typeof navigator !== 'undefined' ? navigator.userAgent : null)
    }

    // Use the RPC function which is SECURITY DEFINER (bypasses RLS issues)
    const { data, error } = await supabase.rpc('submit_counselling_request', {
      p_name: dataToInsert.name,
      p_phone: dataToInsert.phone,
      p_city: dataToInsert.city,
      p_email: dataToInsert.email,
      p_message: dataToInsert.message,
      p_user_agent: dataToInsert.user_agent
    })

    if (error) throw error

    return { success: true, data: { id: data, ...dataToInsert } }

  } catch (error: any) {
    let errorMessage = 'Failed to submit counselling request. '
    if (error.message.includes('not configured')) {
      errorMessage += 'Database connection not available.'
    } else {
      errorMessage += error.message || 'Please try again or contact support.'
    }
    return { success: false, error: errorMessage }
  }
}

// Debug function to test all functionalities
export const runSupabaseTests = async () => {
  console.log('🧪 Running Supabase Tests...')
  
  // Test 1: Configuration
  console.log('1. Configuration:', isSupabaseConfigured() ? '✅ Valid' : '❌ Invalid')
  
  // Test 2: Connection
  const connectionTest = await testSupabaseConnection()
  console.log('2. Connection:', connectionTest ? '✅ Connected' : '❌ Failed')
  
  // Test 3: Client exists
  console.log('3. Client:', supabase ? '✅ Created' : '❌ Null')
  
  return {
    configured: isSupabaseConfigured(),
    connected: connectionTest,
    client: !!supabase
  }
}

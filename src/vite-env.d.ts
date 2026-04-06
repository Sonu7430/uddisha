/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_GEMINI_API_KEY?: string
  readonly GOOGLE_API_KEY?: string
  readonly GOOGLE_GEMINI_API_KEY?: string
  readonly REACT_APP_GEMINI_API_KEY?: string
  readonly GEMINI_API_KEY?: string
  readonly NODE_ENV?: string
  readonly MODE?: string
  readonly BASE_URL?: string
  readonly PROD?: boolean
  readonly DEV?: boolean
  readonly SSR?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
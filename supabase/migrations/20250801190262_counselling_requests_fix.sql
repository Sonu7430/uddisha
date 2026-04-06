/*
  # Fix Counselling Requests RLS Policies

  1. New Tables
    - `counselling_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `name` (text, required)
      - `phone` (text, required)
      - `email` (text, optional)
      - `city` (text, required)
      - `message` (text, optional)
      - `user_agent` (text, optional)
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS on `counselling_requests` table
    - Add policies for:
      - Public (anon) to insert new requests
      - Authenticated users to view their own requests (by email)
      - Service role full access for management
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS counselling_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL CHECK (length(TRIM(BOTH FROM name)) > 0),
  phone text NOT NULL CHECK (length(TRIM(BOTH FROM phone)) > 0),
  email text CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  city text NOT NULL CHECK (length(TRIM(BOTH FROM city)) > 0),
  message text,
  user_agent text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled'))
);

-- Enable Row Level Security
ALTER TABLE counselling_requests ENABLE ROW LEVEL SECURITY;

-- 1. DROP existing policies if any (to avoid duplicates or conflicts)
DROP POLICY IF EXISTS "counselling_insert_policy" ON counselling_requests;
DROP POLICY IF EXISTS "counselling_select_own" ON counselling_requests;
DROP POLICY IF EXISTS "counselling_service_role_all" ON counselling_requests;

-- 2. Allow anonymous and authenticated users to INSERT counselling requests
CREATE POLICY "counselling_insert_policy"
  ON counselling_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. Allow authenticated users to SELECT their own requests (by email)
CREATE POLICY "counselling_select_own"
  ON counselling_requests
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

-- 4. Allow service role to have full access (for admin)
CREATE POLICY "counselling_service_role_all"
  ON counselling_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS counselling_created_at_idx ON counselling_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS counselling_email_idx ON counselling_requests (email);
CREATE INDEX IF NOT EXISTS counselling_status_idx ON counselling_requests (status);

-- Grant necessary permissions
GRANT INSERT ON counselling_requests TO anon, authenticated;
GRANT SELECT ON counselling_requests TO authenticated;
GRANT ALL ON counselling_requests TO service_role;

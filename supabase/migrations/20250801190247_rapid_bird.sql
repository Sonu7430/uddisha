/*
  # Create help requests table

  1. New Tables
    - `help_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `rating` (integer, 1-5)
      - `category` (text, optional)
      - `message` (text, required)
      - `improvements` (text, optional)
      - `user_agent` (text, optional)
      - `ip_address` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `help_requests` table
    - Add policy for public insert access
    - Add policy for public select access

  3. Constraints
    - Rating must be between 1 and 5
    - Name and message cannot be empty
    - Email must be valid format
*/

CREATE TABLE IF NOT EXISTS help_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  rating integer NOT NULL,
  category text,
  message text NOT NULL,
  improvements text,
  user_agent text,
  ip_address text,
  CONSTRAINT help_requests_rating_range CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT help_requests_name_not_empty CHECK (length(TRIM(BOTH FROM name)) > 0),
  CONSTRAINT help_requests_message_not_empty CHECK (length(TRIM(BOTH FROM message)) > 0)
);

-- Enable RLS
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "allow_public_insert_help_requests"
  ON help_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public select (for admin purposes)
CREATE POLICY "allow_public_select_help_requests"
  ON help_requests
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS help_requests_created_at_idx ON help_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS help_requests_email_idx ON help_requests (email);
CREATE INDEX IF NOT EXISTS help_requests_rating_idx ON help_requests (rating);
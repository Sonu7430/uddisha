/*
  # Create newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)
      - `user_agent` (text, optional)
      - `ip_address` (text, optional)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for public insert access
    - Add policy for public select access

  3. Constraints
    - Email must be unique
    - Email cannot be empty
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  user_agent text,
  ip_address text,
  CONSTRAINT newsletter_email_not_empty CHECK (length(TRIM(BOTH FROM email)) > 0)
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "allow_public_insert_newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public select
CREATE POLICY "allow_public_select_newsletter"
  ON newsletter_subscriptions
  FOR SELECT
  TO public
  USING (true);

-- Allow public update (for unsubscribe functionality)
CREATE POLICY "allow_public_update_newsletter"
  ON newsletter_subscriptions
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS newsletter_email_idx ON newsletter_subscriptions (email);
CREATE INDEX IF NOT EXISTS newsletter_active_idx ON newsletter_subscriptions (is_active);
CREATE INDEX IF NOT EXISTS newsletter_created_at_idx ON newsletter_subscriptions (created_at DESC);
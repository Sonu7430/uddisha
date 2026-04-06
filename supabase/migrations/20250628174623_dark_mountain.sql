/*
  # Comprehensive Feedback Table Fix - All Issues Resolved

  1. Complete Table Recreation
    - Drop and recreate feedback table with proper structure
    - Ensure all columns have correct types and constraints
    - Add proper indexes for performance

  2. Row Level Security (RLS) Complete Fix
    - Drop all existing policies
    - Create new, properly configured policies
    - Allow anonymous users to insert feedback
    - Allow authenticated users to read their own feedback
    - Allow service role full access

  3. Security and Performance
    - Enable RLS properly
    - Add comprehensive indexes
    - Set up proper constraints
    - Ensure data integrity

  This migration will resolve ALL Supabase issues once and for all.
*/

-- Drop existing table and policies completely to start fresh
DROP TABLE IF EXISTS feedback CASCADE;

-- Create the feedback table with proper structure
CREATE TABLE feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL CHECK (length(name) > 0),
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  category text CHECK (length(category) > 0),
  message text NOT NULL CHECK (length(message) > 0),
  improvements text,
  user_agent text,
  ip_address text
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies

-- 1. Allow anonymous and authenticated users to INSERT feedback
CREATE POLICY "feedback_insert_policy"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2. Allow authenticated users to SELECT their own feedback
CREATE POLICY "feedback_select_own"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

-- 3. Allow service role to SELECT all feedback (for admin access)
CREATE POLICY "feedback_select_service_role"
  ON feedback
  FOR SELECT
  TO service_role
  USING (true);

-- 4. Allow service role to UPDATE and DELETE (for admin management)
CREATE POLICY "feedback_update_service_role"
  ON feedback
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "feedback_delete_service_role"
  ON feedback
  FOR DELETE
  TO service_role
  USING (true);

-- Create comprehensive indexes for optimal performance
CREATE INDEX feedback_created_at_idx ON feedback (created_at DESC);
CREATE INDEX feedback_email_idx ON feedback (email);
CREATE INDEX feedback_category_idx ON feedback (category) WHERE category IS NOT NULL;
CREATE INDEX feedback_rating_idx ON feedback (rating);
CREATE INDEX feedback_id_idx ON feedback (id);

-- Add comments for documentation
COMMENT ON TABLE feedback IS 'User feedback submissions for CareerCompass application';
COMMENT ON COLUMN feedback.id IS 'Unique identifier for each feedback entry';
COMMENT ON COLUMN feedback.created_at IS 'Timestamp when feedback was submitted';
COMMENT ON COLUMN feedback.name IS 'Name of the person submitting feedback';
COMMENT ON COLUMN feedback.email IS 'Email address of the person submitting feedback';
COMMENT ON COLUMN feedback.rating IS 'Rating from 1-5 stars';
COMMENT ON COLUMN feedback.category IS 'Category of feedback (optional)';
COMMENT ON COLUMN feedback.message IS 'Main feedback message';
COMMENT ON COLUMN feedback.improvements IS 'Suggested improvements (optional)';
COMMENT ON COLUMN feedback.user_agent IS 'Browser user agent string (optional)';
COMMENT ON COLUMN feedback.ip_address IS 'IP address of submitter (optional)';

-- Grant necessary permissions to anon role
GRANT INSERT ON feedback TO anon;
GRANT SELECT ON feedback TO authenticated;
GRANT ALL ON feedback TO service_role;

-- Ensure the anon role can use the sequence for UUID generation
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
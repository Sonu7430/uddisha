/*
  # AI Career Matching System Database Schema
  
  1. Assessment Cache Table
    - Stores AI analysis results with answer hashing for quick lookup
    - 30-day expiration for automatic cleanup
    - Indexed for fast cache retrieval
  
  2. Analysis Logs Table
    - Tracks all API requests for monitoring
    - Records response times and token usage
    - Helps identify performance issues
  
  3. AI Feedback Table
    - Collects user feedback on AI accuracy
    - Helps improve prompt engineering
    - Tracks user satisfaction
*/

-- Create assessment_cache table
CREATE TABLE IF NOT EXISTS assessment_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_hash text NOT NULL UNIQUE,
  raw_answers jsonb NOT NULL,
  ai_analysis jsonb NOT NULL,
  career_matches jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz DEFAULT (now() + interval '30 days') NOT NULL
);

-- Create analysis_logs table
CREATE TABLE IF NOT EXISTS analysis_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessment_cache(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now() NOT NULL,
  api_status text NOT NULL CHECK (api_status IN ('success', 'failure', 'cached', 'fallback')),
  response_time_ms integer,
  tokens_used integer,
  error_message text,
  model_used text
);

-- Create ai_feedback table
CREATE TABLE IF NOT EXISTS ai_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessment_cache(id) ON DELETE SET NULL,
  user_rating integer CHECK (user_rating >= 1 AND user_rating <= 5),
  feedback_type text CHECK (feedback_type IN ('accurate', 'needs-refinement', 'poor')),
  comments text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE assessment_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessment_cache
CREATE POLICY "assessment_cache_insert_anon"
  ON assessment_cache
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "assessment_cache_select_all"
  ON assessment_cache
  FOR SELECT
  TO anon, authenticated, service_role
  USING (true);

CREATE POLICY "assessment_cache_service_role_all"
  ON assessment_cache
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for analysis_logs
CREATE POLICY "analysis_logs_insert_anon"
  ON analysis_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "analysis_logs_select_service_role"
  ON analysis_logs
  FOR SELECT
  TO service_role
  USING (true);

-- RLS Policies for ai_feedback
CREATE POLICY "ai_feedback_insert_all"
  ON ai_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "ai_feedback_select_service_role"
  ON ai_feedback
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS assessment_cache_answer_hash_idx ON assessment_cache (answer_hash);
CREATE INDEX IF NOT EXISTS assessment_cache_expires_at_idx ON assessment_cache (expires_at);
CREATE INDEX IF NOT EXISTS assessment_cache_created_at_idx ON assessment_cache (created_at DESC);
CREATE INDEX IF NOT EXISTS analysis_logs_timestamp_idx ON analysis_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS analysis_logs_api_status_idx ON analysis_logs (api_status);
CREATE INDEX IF NOT EXISTS ai_feedback_created_at_idx ON ai_feedback (created_at DESC);

-- Grant permissions
GRANT INSERT, SELECT ON assessment_cache TO anon, authenticated;
GRANT INSERT ON analysis_logs TO anon, authenticated;
GRANT INSERT ON ai_feedback TO anon, authenticated;
GRANT ALL ON assessment_cache, analysis_logs, ai_feedback TO service_role;

-- Function to automatically delete expired cache entries
CREATE OR REPLACE FUNCTION delete_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM assessment_cache WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments for documentation
COMMENT ON TABLE assessment_cache IS 'Cached AI career analysis results with 30-day expiration';
COMMENT ON TABLE analysis_logs IS 'API request logs for monitoring and analytics';
COMMENT ON TABLE ai_feedback IS 'User feedback on AI analysis accuracy';
COMMENT ON COLUMN assessment_cache.answer_hash IS 'SHA-256 hash of user answers for cache lookup';
COMMENT ON COLUMN assessment_cache.expires_at IS 'Automatic expiration timestamp (30 days from creation)';

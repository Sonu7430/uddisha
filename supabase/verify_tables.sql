-- Quick verification query to check if tables exist
-- Run this in Supabase SQL Editor to verify migration worked

SELECT 
  'assessment_cache' as table_name,
  COUNT(*) as row_count
FROM assessment_cache
UNION ALL
SELECT 
  'analysis_logs' as table_name,
  COUNT(*) as row_count
FROM analysis_logs
UNION ALL
SELECT 
  'ai_feedback' as table_name,
  COUNT(*) as row_count
FROM ai_feedback
UNION ALL
SELECT 
  'feedback' as table_name,
  COUNT(*) as row_count
FROM feedback
UNION ALL
SELECT 
  'help_requests' as table_name,
  COUNT(*) as row_count
FROM help_requests
UNION ALL
SELECT 
  'newsletter_subscriptions' as table_name,
  COUNT(*) as row_count
FROM newsletter_subscriptions
UNION ALL
SELECT 
  'counselling_requests' as table_name,
  COUNT(*) as row_count
FROM counselling_requests;

-- If you get an error "relation does not exist", the migration hasn't been run yet
-- Go back and run the full migration from: 20250627000000_ai_career_system.sql

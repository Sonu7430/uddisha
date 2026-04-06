-- Create a function to insert feedback that bypasses any potential RLS issues
CREATE OR REPLACE FUNCTION insert_feedback(
  p_name text,
  p_email text,
  p_rating integer,
  p_message text,
  p_category text DEFAULT NULL,
  p_improvements text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  feedback_id uuid;
BEGIN
  INSERT INTO feedback (
    name,
    email,
    rating,
    category,
    message,
    improvements,
    user_agent,
    ip_address
  ) VALUES (
    p_name,
    p_email,
    p_rating,
    p_category,
    p_message,
    p_improvements,
    p_user_agent,
    NULL
  ) RETURNING id INTO feedback_id;
  
  RETURN feedback_id;
END;
$$;

-- Grant execute permission to all roles
GRANT EXECUTE ON FUNCTION insert_feedback TO anon;
GRANT EXECUTE ON FUNCTION insert_feedback TO authenticated;
GRANT EXECUTE ON FUNCTION insert_feedback TO service_role;
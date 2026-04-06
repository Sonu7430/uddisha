-- Create a function to submit counselling requests that bypasses RLS (SECURITY DEFINER)
-- This is much more robust for anonymous form submissions
CREATE OR REPLACE FUNCTION submit_counselling_request(
  p_name text,
  p_phone text,
  p_city text,
  p_email text DEFAULT NULL,
  p_message text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER -- This is the key! It runs with the permissions of the creator (bypassing RLS)
AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO counselling_requests (
    name,
    phone,
    email,
    city,
    message,
    user_agent,
    status
  ) VALUES (
    p_name,
    p_phone,
    p_email,
    p_city,
    p_message,
    p_user_agent,
    'pending'
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Grant execute permission to everyone so the frontend can call it
GRANT EXECUTE ON FUNCTION submit_counselling_request TO anon;
GRANT EXECUTE ON FUNCTION submit_counselling_request TO authenticated;
GRANT EXECUTE ON FUNCTION submit_counselling_request TO service_role;

CREATE OR REPLACE FUNCTION check_user_credit()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_credit integer;
BEGIN
  -- Get user's current credit
  SELECT credit INTO user_credit
  FROM public.profiles
  WHERE user_id = NEW.user_id;

  -- If credit is null or not enough
  IF user_credit IS NULL THEN
    RAISE EXCEPTION 'User profile not found or credit is null.';
  ELSIF user_credit <= 0 THEN
    RAISE EXCEPTION 'Insufficient credit to create a chapter.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_credit_check
  BEFORE INSERT ON public.chapters
  FOR EACH ROW
  EXECUTE FUNCTION check_user_credit();
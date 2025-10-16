-- Créer une fonction pour promouvoir automatiquement le premier utilisateur en admin
CREATE OR REPLACE FUNCTION public.make_first_user_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Vérifier s'il n'y a pas encore d'admin
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    -- Insérer le rôle admin pour ce premier utilisateur
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

-- Créer un trigger qui s'exécute après l'insertion d'un profil
CREATE TRIGGER on_profile_created_make_first_admin
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.make_first_user_admin();
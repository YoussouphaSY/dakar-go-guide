-- Add video_url column to cultural_sites table for virtual tour videos
ALTER TABLE public.cultural_sites 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Add comment
COMMENT ON COLUMN public.cultural_sites.video_url IS 'URL de la vidéo de visite virtuelle du site';

-- Update some sites with video URLs (examples with YouTube 360° videos or virtual tours)
UPDATE public.cultural_sites 
SET video_url = 'https://www.youtube.com/embed/K9y4X0E0Fvs'
WHERE name = 'Île de Gorée';

UPDATE public.cultural_sites 
SET video_url = 'https://www.youtube.com/embed/msuTmvHK-rE'
WHERE name = 'Monument de la Renaissance Africaine';
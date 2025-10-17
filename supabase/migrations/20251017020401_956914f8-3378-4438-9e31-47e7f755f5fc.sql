-- Create venues table (official competition venues)
CREATE TABLE IF NOT EXISTS public.venues (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(11, 7) NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sports_events table (official JOJ 2026 events)
CREATE TABLE IF NOT EXISTS public.sports_events (
  id INTEGER PRIMARY KEY,
  sport_name TEXT NOT NULL,
  venue_id INTEGER REFERENCES public.venues(id) ON DELETE SET NULL,
  discipline_detail TEXT NOT NULL,
  gender_type TEXT NOT NULL CHECK (gender_type IN ('Masculine', 'Féminine', 'Mixte/Ouverte')),
  event_date TIMESTAMP WITH TIME ZONE,
  event_time TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cultural_sites table for virtual tours
CREATE TABLE IF NOT EXISTS public.cultural_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Monument', 'Musée', 'Site Historique', 'Plage', 'Marché', 'Parc')),
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(11, 7) NOT NULL,
  image_url TEXT,
  virtual_tour_url TEXT,
  historical_info TEXT,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_sites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for venues (public read, admin write)
CREATE POLICY "Everyone can view venues"
  ON public.venues FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage venues"
  ON public.venues FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for sports_events (public read, admin write)
CREATE POLICY "Everyone can view sports events"
  ON public.sports_events FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage sports events"
  ON public.sports_events FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for cultural_sites (public read, admin write)
CREATE POLICY "Everyone can view cultural sites"
  ON public.cultural_sites FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage cultural sites"
  ON public.cultural_sites FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert venues data
INSERT INTO public.venues (id, name, city, latitude, longitude, note) VALUES
(1, 'Tour de l''Œuf', 'Dakar', 14.6733, -17.4555, 'Coordonnées fournies en DD approximatif'),
(2, 'Stade Iba Mar Diop', 'Dakar', 14.67941, -17.44685, 'Coordonnées fournies en DD et DMS'),
(3, 'Corniche Ouest', 'Dakar', 14.67802, -17.45838, 'Coordonnées fournies en DD'),
(4, 'Centre des sports équestres', 'Diamniadio', 14.75, -17.33, 'Coordonnées corrigées, fournies en DD approximatif'),
(5, 'Dakar Arena', 'Diamniadio', 14.7341, -17.2124, 'Converti de DMS'),
(6, 'Stade Abdoulaye Wade', 'Diamniadio', 14.73249, -17.20141, 'Coordonnées fournies en DD et DMS'),
(7, 'Centre des expositions de Dakar', 'Diamniadio', 14.71, -17.46, 'Coordonnées fournies en DD approximatif'),
(8, 'Plage de Saly Ouest', 'Saly', 14.4314, -17.006, 'Coordonnées fournies en DD approximatif'),
(9, 'Village Olympique de la Jeunesse', 'Diamniadio', 14.7203, -17.1825, 'Converti de DMS')
ON CONFLICT (id) DO NOTHING;

-- Insert cultural sites (famous Senegalese landmarks)
INSERT INTO public.cultural_sites (name, description, category, latitude, longitude, city, historical_info) VALUES
('Île de Gorée', 'Site classé au patrimoine mondial de l''UNESCO, symbole de la traite négrière', 'Site Historique', 14.6667, -17.4000, 'Dakar', 'L''île de Gorée est un lieu de mémoire de la traite négrière en Afrique, reconnue pour sa Maison des Esclaves.'),
('Monument de la Renaissance Africaine', 'Statue monumentale de 52 mètres dominant Dakar', 'Monument', 14.7167, -17.4833, 'Dakar', 'Inauguré en 2010, ce monument symbolise la renaissance de l''Afrique après des siècles de colonisation.'),
('Mosquée de la Divinité', 'Grande mosquée de Dakar, architecture islamique moderne', 'Monument', 14.6928, -17.4467, 'Dakar', 'Centre spirituel important de la communauté musulmane sénégalaise.'),
('Lac Rose (Lac Retba)', 'Lac salé célèbre pour sa couleur rose unique', 'Site Historique', 14.8407, -17.2233, 'Rufisque', 'Ancienne étape finale du rallye Paris-Dakar, le lac doit sa couleur à des micro-algues.'),
('Marché Sandaga', 'Plus grand marché de Dakar, cœur commercial de la ville', 'Marché', 14.6761, -17.4611, 'Dakar', 'Marché traditionnel offrant artisanat, tissus, épices et produits locaux.'),
('Plage de N''Gor', 'Plage populaire avec vue sur l''île de N''Gor', 'Plage', 14.7503, -17.5150, 'Dakar', 'Destination prisée des surfeurs et lieu de détente des Dakarois.'),
('Musée Théodore Monod', 'Musée d''art africain et collections ethnographiques', 'Musée', 14.6667, -17.4333, 'Dakar', 'Anciennement IFAN, ce musée présente l''histoire et la culture de l''Afrique de l''Ouest.')
ON CONFLICT DO NOTHING;
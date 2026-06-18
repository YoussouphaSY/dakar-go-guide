/*
  Catalogue officiel des sports — JOJ Dakar 2026 (31 oct → 13 nov 2026).
  Sources : olympics.com (programme) + calendrier officiel COJOJ
  (au-senegal.com/IMG/pdf/calendrier_joj_dakar_2026.pdf).

  25 sports de COMPÉTITION (151 épreuves) + 10 sports de MOBILISATION.
  `image` : à fournir (placeholder tant que vide). Fichier attendu : `/media/sports/<slug>.jpg`.
*/

export type SportCategory = "competition" | "mobilisation";
export type City = "Dakar" | "Diamniadio" | "Saly";

export interface Sport {
  slug: string;
  name: string;
  category: SportCategory;
  events?: number;        // nb d'épreuves (compétition)
  venue?: string;         // site principal
  city?: City;
  dates?: string;         // plage lisible (ex. "8–10 nov")
  image?: string;
}

export const COMPETITION_SPORTS: Sport[] = [
  { slug: "athletisme", name: "Athlétisme", category: "competition", events: 36, venue: "Complexe Iba Mar Diop", city: "Dakar", dates: "8–10 nov" },
  { slug: "natation", name: "Natation", category: "competition", events: 28, venue: "Complexe Tour de l'Œuf", city: "Dakar", dates: "1er–6 nov" },
  { slug: "taekwondo", name: "Taekwondo", category: "competition", events: 11, venue: "Complexe Iba Mar Diop", city: "Dakar", dates: "8–12 nov" },
  { slug: "boxe", name: "Boxe", category: "competition", events: 10, venue: "Dakar Expo Center", city: "Diamniadio", dates: "7–12 nov" },
  { slug: "judo", name: "Judo", category: "competition", events: 8, venue: "Dakar Expo Center", city: "Diamniadio", dates: "1er–3 nov" },
  { slug: "lutte-de-plage", name: "Lutte de plage", category: "competition", events: 8, venue: "Saly Plage Ouest", city: "Saly", dates: "7–8 nov" },
  { slug: "escrime", name: "Escrime", category: "competition", events: 6, venue: "Dakar Expo Center", city: "Diamniadio", dates: "8–13 nov" },
  { slug: "gymnastique-artistique", name: "Gymnastique artistique", category: "competition", events: 5, venue: "Dakar Expo Center", city: "Diamniadio", dates: "5–11 nov" },
  { slug: "cyclisme-sur-route", name: "Cyclisme sur route", category: "competition", events: 4, venue: "Corniche Ouest", city: "Dakar", dates: "8 & 10 nov" },
  { slug: "wushu", name: "Wushu (Taolu)", category: "competition", events: 4, venue: "Dakar Expo Center", city: "Diamniadio", dates: "1er–3 nov" },
  { slug: "aviron-de-mer", name: "Aviron de mer", category: "competition", events: 3, venue: "Saly Plage Ouest", city: "Saly", dates: "31 oct–3 nov" },
  { slug: "tennis-de-table", name: "Tennis de table", category: "competition", events: 3, venue: "Dakar Expo Center", city: "Diamniadio", dates: "31 oct–5 nov" },
  { slug: "tir-a-l-arc", name: "Tir à l'arc", category: "competition", events: 3, venue: "Stade Abdoulaye Wade", city: "Diamniadio", dates: "6–10 nov" },
  { slug: "badminton", name: "Badminton", category: "competition", events: 2, venue: "Dakar Arena", city: "Diamniadio", dates: "1er–5 nov" },
  { slug: "basket-3x3", name: "Basket-ball 3×3", category: "competition", events: 2, venue: "Complexe Tour de l'Œuf", city: "Dakar", dates: "6–9 nov" },
  { slug: "beach-volley", name: "Beach-volley", category: "competition", events: 2, venue: "Saly Plage Ouest", city: "Saly", dates: "2–4 nov" },
  { slug: "breaking", name: "Breaking", category: "competition", events: 2, venue: "Complexe Tour de l'Œuf", city: "Dakar", dates: "12 & 13 nov" },
  { slug: "futsal", name: "Futsal", category: "competition", events: 2, venue: "Iba Mar Diop / Dakar Arena", city: "Dakar", dates: "1–12 nov" },
  { slug: "handball-de-plage", name: "Handball de plage", category: "competition", events: 2, venue: "Saly Beach West", city: "Saly", dates: "9–13 nov" },
  { slug: "rugby-a-sept", name: "Rugby à sept", category: "competition", events: 2, venue: "Complexe Iba Mar Diop", city: "Dakar", dates: "1er–3 nov" },
  { slug: "skateboard", name: "Skateboard (street)", category: "competition", events: 2, venue: "Complexe Tour de l'Œuf", city: "Dakar", dates: "4 & 5 nov" },
  { slug: "triathlon", name: "Triathlon", category: "competition", events: 2, venue: "Saly Plage Ouest", city: "Saly", dates: "5 & 6 nov" },
  { slug: "planche-a-voile", name: "Planche à voile", category: "competition", events: 2, venue: "Saly Plage Ouest", city: "Saly", dates: "8–12 nov" },
  { slug: "baseball5", name: "Baseball5", category: "competition", events: 1, venue: "Complexe Tour de l'Œuf", city: "Dakar", dates: "30 oct–3 nov" },
  { slug: "equitation", name: "Équitation", category: "competition", events: 1, venue: "Complexe équestre", city: "Diamniadio", dates: "3–6 nov" },
];

export const MOBILISATION_SPORTS: Sport[] = [
  { slug: "canoe-kayak", name: "Canoë-kayak", category: "mobilisation" },
  { slug: "escalade", name: "Escalade", category: "mobilisation" },
  { slug: "golf", name: "Golf", category: "mobilisation" },
  { slug: "halterophilie", name: "Haltérophilie", category: "mobilisation" },
  { slug: "hockey-sur-gazon", name: "Hockey sur gazon", category: "mobilisation" },
  { slug: "karate", name: "Karaté", category: "mobilisation" },
  { slug: "pentathlon-moderne", name: "Pentathlon moderne", category: "mobilisation" },
  { slug: "surf", name: "Surf", category: "mobilisation" },
  { slug: "tennis", name: "Tennis", category: "mobilisation" },
  { slug: "tir", name: "Tir", category: "mobilisation" },
];

export const ALL_SPORTS: Sport[] = [...COMPETITION_SPORTS, ...MOBILISATION_SPORTS];

/* ── Jours des Jeux (31 oct → 13 nov) ── */
export interface GameDay { key: string; date: string; dow: string; dayNum: string; mon: string; }
export const GAME_DAYS: GameDay[] = [
  { key: "10-31", date: "2026-10-31", dow: "Sam", dayNum: "31", mon: "oct" },
  { key: "11-01", date: "2026-11-01", dow: "Dim", dayNum: "1", mon: "nov" },
  { key: "11-02", date: "2026-11-02", dow: "Lun", dayNum: "2", mon: "nov" },
  { key: "11-03", date: "2026-11-03", dow: "Mar", dayNum: "3", mon: "nov" },
  { key: "11-04", date: "2026-11-04", dow: "Mer", dayNum: "4", mon: "nov" },
  { key: "11-05", date: "2026-11-05", dow: "Jeu", dayNum: "5", mon: "nov" },
  { key: "11-06", date: "2026-11-06", dow: "Ven", dayNum: "6", mon: "nov" },
  { key: "11-07", date: "2026-11-07", dow: "Sam", dayNum: "7", mon: "nov" },
  { key: "11-08", date: "2026-11-08", dow: "Dim", dayNum: "8", mon: "nov" },
  { key: "11-09", date: "2026-11-09", dow: "Lun", dayNum: "9", mon: "nov" },
  { key: "11-10", date: "2026-11-10", dow: "Mar", dayNum: "10", mon: "nov" },
  { key: "11-11", date: "2026-11-11", dow: "Mer", dayNum: "11", mon: "nov" },
  { key: "11-12", date: "2026-11-12", dow: "Jeu", dayNum: "12", mon: "nov" },
  { key: "11-13", date: "2026-11-13", dow: "Ven", dayNum: "13", mon: "nov" },
];

/* ── Séances datées (épreuves + activités extra-sportives) ──
   `kind` : "sport" (compétition) · "ceremony" · "festival" (extra-sportif).
   Dates conformes au calendrier officiel COJOJ. */
export type SessionKind = "sport" | "ceremony" | "festival";
export interface Session {
  id: string;
  sportSlug?: string;     // lié à un sport (kind=sport)
  kind: SessionKind;
  title: string;
  day: string;            // clé GAME_DAYS
  time: string;           // "HH:MM"
  venue: string;
  city: City;
  phase?: string;         // "Finale", "Qualifications", "Demi-finale"…
}

export const SESSIONS: Session[] = [
  // Extra-sportif
  { id: "ouverture", kind: "ceremony", title: "Cérémonie d'ouverture", day: "10-31", time: "19:00", venue: "Stade Abdoulaye Wade", city: "Diamniadio" },
  { id: "fanzone-corniche", kind: "festival", title: "Fan Zone — Corniche Ouest", day: "11-01", time: "16:00", venue: "Corniche Ouest", city: "Dakar" },
  { id: "nuit-teranga", kind: "festival", title: "Nuit de la Teranga", day: "11-02", time: "20:00", venue: "Place de la Nation", city: "Dakar" },
  { id: "marche-saveurs", kind: "festival", title: "Marché des saveurs", day: "11-05", time: "11:00", venue: "Place de la Nation", city: "Dakar" },
  { id: "nuit-goree", kind: "festival", title: "Nuit culturelle de Gorée", day: "11-07", time: "18:00", venue: "Île de Gorée", city: "Dakar" },
  { id: "mapping-renaissance", kind: "festival", title: "Mapping — Monument de la Renaissance", day: "11-09", time: "20:30", venue: "Monument de la Renaissance", city: "Dakar" },
  { id: "cloture", kind: "ceremony", title: "Cérémonie de clôture", day: "11-13", time: "19:30", venue: "CICAD", city: "Diamniadio" },

  // Sport — sélection de séances clés (qualifications / finales) par discipline
  { id: "aviron-q", sportSlug: "aviron-de-mer", kind: "sport", title: "Aviron de mer", phase: "Séries", day: "10-31", time: "10:00", venue: "Saly Plage Ouest", city: "Saly" },
  { id: "tt-q", sportSlug: "tennis-de-table", kind: "sport", title: "Tennis de table", phase: "Tours préliminaires", day: "10-31", time: "11:00", venue: "Dakar Expo Center", city: "Diamniadio" },
  { id: "baseball5-q", sportSlug: "baseball5", kind: "sport", title: "Baseball5", phase: "Poules", day: "10-31", time: "14:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },

  { id: "natation-f1", sportSlug: "natation", kind: "sport", title: "Natation — 100 m nage libre", phase: "Finale", day: "11-01", time: "18:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },
  { id: "judo-f1", sportSlug: "judo", kind: "sport", title: "Judo −60 kg", phase: "Finale", day: "11-01", time: "15:00", venue: "Dakar Expo Center", city: "Diamniadio" },
  { id: "rugby-q", sportSlug: "rugby-a-sept", kind: "sport", title: "Rugby à 7", phase: "Phase de poules", day: "11-01", time: "16:00", venue: "Complexe Iba Mar Diop", city: "Dakar" },

  { id: "rugby-f", sportSlug: "rugby-a-sept", kind: "sport", title: "Rugby à 7", phase: "Finale", day: "11-03", time: "18:30", venue: "Complexe Iba Mar Diop", city: "Dakar" },
  { id: "wushu-f", sportSlug: "wushu", kind: "sport", title: "Wushu Taolu", phase: "Finale", day: "11-03", time: "11:00", venue: "Dakar Expo Center", city: "Diamniadio" },

  { id: "skate-f", sportSlug: "skateboard", kind: "sport", title: "Skateboard street", phase: "Finale", day: "11-04", time: "16:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },
  { id: "beachvb-f", sportSlug: "beach-volley", kind: "sport", title: "Beach-volley", phase: "Finale", day: "11-04", time: "17:00", venue: "Saly Plage Ouest", city: "Saly" },

  { id: "triathlon-f", sportSlug: "triathlon", kind: "sport", title: "Triathlon", phase: "Finale", day: "11-05", time: "08:00", venue: "Saly Plage Ouest", city: "Saly" },
  { id: "equ-f", sportSlug: "equitation", kind: "sport", title: "Équitation — saut d'obstacles", phase: "Finale", day: "11-05", time: "15:00", venue: "Complexe équestre", city: "Diamniadio" },

  { id: "natation-relais", sportSlug: "natation", kind: "sport", title: "Natation — relais 4×100 m", phase: "Finale", day: "11-06", time: "18:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },
  { id: "basket-q", sportSlug: "basket-3x3", kind: "sport", title: "Basket-ball 3×3", phase: "Poules", day: "11-06", time: "17:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },

  { id: "lutte-f", sportSlug: "lutte-de-plage", kind: "sport", title: "Lutte de plage", phase: "Finale", day: "11-07", time: "16:00", venue: "Saly Plage Ouest", city: "Saly" },
  { id: "boxe-q", sportSlug: "boxe", kind: "sport", title: "Boxe", phase: "Quarts de finale", day: "11-07", time: "17:00", venue: "Dakar Expo Center", city: "Diamniadio" },

  { id: "athle-200", sportSlug: "athletisme", kind: "sport", title: "Athlétisme — 200 m hommes", phase: "Finale", day: "11-08", time: "18:00", venue: "Complexe Iba Mar Diop", city: "Dakar" },
  { id: "escrime-f", sportSlug: "escrime", kind: "sport", title: "Escrime — fleuret femmes", phase: "Finale", day: "11-08", time: "18:30", venue: "Dakar Expo Center", city: "Diamniadio" },
  { id: "tir-arc-f", sportSlug: "tir-a-l-arc", kind: "sport", title: "Tir à l'arc", phase: "Finale", day: "11-08", time: "10:00", venue: "Stade Abdoulaye Wade", city: "Diamniadio" },
  { id: "cyclisme-f", sportSlug: "cyclisme-sur-route", kind: "sport", title: "Cyclisme sur route", phase: "Course en ligne", day: "11-08", time: "08:00", venue: "Corniche Ouest", city: "Dakar" },
  { id: "gym-f", sportSlug: "gymnastique-artistique", kind: "sport", title: "Gymnastique — finales par agrès", phase: "Finale", day: "11-08", time: "17:00", venue: "Dakar Expo Center", city: "Diamniadio" },

  { id: "basket-f", sportSlug: "basket-3x3", kind: "sport", title: "Basket-ball 3×3", phase: "Finale", day: "11-09", time: "19:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },
  { id: "handball-q", sportSlug: "handball-de-plage", kind: "sport", title: "Handball de plage", phase: "Poules", day: "11-09", time: "16:00", venue: "Saly Beach West", city: "Saly" },

  { id: "athle-relais", sportSlug: "athletisme", kind: "sport", title: "Athlétisme — relais 4×100 m", phase: "Finale", day: "11-10", time: "18:00", venue: "Complexe Iba Mar Diop", city: "Dakar" },
  { id: "taekwondo-f1", sportSlug: "taekwondo", kind: "sport", title: "Taekwondo −68 kg", phase: "Finale", day: "11-10", time: "15:00", venue: "Complexe Iba Mar Diop", city: "Dakar" },

  { id: "boxe-f", sportSlug: "boxe", kind: "sport", title: "Boxe", phase: "Finales", day: "11-11", time: "18:00", venue: "Dakar Expo Center", city: "Diamniadio" },

  { id: "voile-f", sportSlug: "planche-a-voile", kind: "sport", title: "Planche à voile", phase: "Medal race", day: "11-12", time: "12:00", venue: "Saly Plage Ouest", city: "Saly" },
  { id: "futsal-f", sportSlug: "futsal", kind: "sport", title: "Futsal", phase: "Finale", day: "11-12", time: "19:00", venue: "Dakar Arena", city: "Diamniadio" },
  { id: "escrime-f2", sportSlug: "escrime", kind: "sport", title: "Escrime — épée hommes", phase: "Finale", day: "11-12", time: "18:30", venue: "Dakar Expo Center", city: "Diamniadio" },

  { id: "breaking-f", sportSlug: "breaking", kind: "sport", title: "Breaking", phase: "Finale", day: "11-13", time: "17:00", venue: "Complexe Tour de l'Œuf", city: "Dakar" },
  { id: "handball-f", sportSlug: "handball-de-plage", kind: "sport", title: "Handball de plage", phase: "Finale", day: "11-13", time: "16:00", venue: "Saly Beach West", city: "Saly" },
];

export const CITIES: City[] = ["Dakar", "Diamniadio", "Saly"];

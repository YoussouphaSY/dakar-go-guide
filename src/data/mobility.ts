/*
  Données Mobilité — JOJ Dakar 2026.
  Reprises de la maquette Claude (Mobilité.dc.html) : POI, modes multimodaux.
  Positions left/top en % sur la carte stylisée (mêmes repères que la maquette).
*/

export type PoiType = "venue" | "transport" | "food" | "poi";

/* Catégorie de filtre (accueil mobile) — un seul type affiché à la fois. */
export type MapFilter = "competition" | "activite" | "festivite" | "tourisme";

export interface Poi {
  id: string;
  name: string;
  type: PoiType;
  filter?: MapFilter;  // catégorie de filtre carte
  lat: number;    // coordonnées GPS réelles
  lng: number;
  dist: string;
  time: string;   // temps en taxi
  desc: string;
  city?: string;
  image?: string;   // aperçu (placeholder si vide)
  tags?: string[];  // détails : sports accueillis, lignes, spécialités…
  schedule?: string; // horaires (ex. "Tous les jours · 16:00–00:00")
}

export const POIS: Poi[] = [
  /* ── Compétitions (sites JOJ) ── */
  { id: "arene", name: "Dakar Arena", type: "venue", filter: "competition", lat: 14.7390, lng: -17.1900, dist: "14 km", time: "22 min", city: "Diamniadio",
    desc: "Salle multisport de 15 000 places — basket 3×3 et futsal. Pôle olympique de Diamniadio.",
    tags: ["Basket 3×3", "Futsal"], schedule: "Badminton & Futsal · 1er–12 nov" },
  { id: "expo", name: "Dakar Expo Center", type: "venue", filter: "competition", lat: 14.7330, lng: -17.1840, dist: "13 km", time: "21 min", city: "Diamniadio",
    desc: "Boxe, judo, escrime, gymnastique et wushu, au Centre des Expositions de Diamniadio.",
    tags: ["Boxe", "Judo", "Escrime", "Gymnastique", "Wushu"], schedule: "1er–13 nov · selon discipline" },
  { id: "wade", name: "Stade Abdoulaye Wade", type: "venue", filter: "competition", lat: 14.7570, lng: -17.0760, dist: "16 km", time: "24 min", city: "Diamniadio",
    desc: "Le grand stade national : cérémonie d'ouverture et tir à l'arc.",
    tags: ["Cérémonie d'ouverture", "Tir à l'arc"], schedule: "Ouverture 31 oct · Tir à l'arc 6–10 nov" },
  { id: "iba", name: "Complexe Iba Mar Diop", type: "venue", filter: "competition", lat: 14.6890, lng: -17.4560, dist: "3 km", time: "10 min", city: "Dakar",
    desc: "Athlétisme, taekwondo et rugby à 7, au cœur de Dakar.",
    tags: ["Athlétisme", "Taekwondo", "Rugby à 7"], schedule: "Rugby 1–3 · Athlé 8–10 · Taekwondo 8–12 nov" },
  { id: "oeuf", name: "Complexe Tour de l'Œuf", type: "venue", filter: "competition", lat: 14.7050, lng: -17.4730, dist: "5 km", time: "13 min", city: "Dakar",
    desc: "Natation, baseball5, skateboard, basket 3×3 et breaking.",
    tags: ["Natation", "Baseball5", "Skateboard", "Breaking"], schedule: "Natation 1–6 · Breaking 12–13 nov" },
  { id: "corniche", name: "Corniche Ouest", type: "venue", filter: "competition", lat: 14.6920, lng: -17.4760, dist: "4 km", time: "11 min", city: "Dakar",
    desc: "Cyclisme sur route en bord d'océan.", tags: ["Cyclisme"], schedule: "Cyclisme · 8 & 10 nov" },
  { id: "saly", name: "Saly Beach West", type: "venue", filter: "competition", lat: 14.4490, lng: -17.0080, dist: "80 km", time: "1 h 10", city: "Saly",
    desc: "Sports de plage : beach-volley, lutte, handball, voile, triathlon, aviron.",
    tags: ["Beach-volley", "Lutte", "Voile", "Triathlon"], schedule: "2–13 nov · selon discipline" },
  { id: "equestre", name: "Centre équestre", type: "venue", filter: "competition", lat: 14.7280, lng: -17.1950, dist: "13 km", time: "21 min", city: "Diamniadio",
    desc: "Saut d'obstacles — épreuve d'équitation.", tags: ["Équitation"], schedule: "Équitation · 3–6 nov" },

  /* ── Festivités pendant les JOJ ── */
  { id: "fanzone", name: "Fan Zone Corniche", type: "poi", filter: "festivite", lat: 14.6905, lng: -17.4710, dist: "4 km", time: "11 min", city: "Dakar",
    desc: "Écrans géants, concerts gratuits et animations face à l'océan, tous les soirs des Jeux.",
    tags: ["Concerts", "Écrans géants", "Gratuit"], schedule: "Tous les soirs · 16:00–00:00" },
  { id: "teranga-nuit", name: "Nuit de la Teranga", type: "poi", filter: "festivite", lat: 14.6730, lng: -17.4400, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Concerts d'artistes sénégalais et invités africains, place de la Nation.",
    tags: ["Mbalax", "Concert"], schedule: "2 nov · 20:00" },
  { id: "marche-saveurs", name: "Marché des saveurs", type: "food", filter: "festivite", lat: 14.6740, lng: -17.4380, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Gastronomie sénégalaise et street-food : thiéboudienne, yassa, dibi.",
    tags: ["Street-food", "Cuisine locale"], schedule: "5 nov · dès 11:00" },
  { id: "mapping", name: "Mapping Renaissance", type: "poi", filter: "festivite", lat: 14.7237, lng: -17.4900, dist: "4 km", time: "12 min", city: "Dakar",
    desc: "Spectacle de projection monumentale sur la statue de la Renaissance.",
    tags: ["Spectacle", "Lumière"], schedule: "9 nov · 20:30" },

  /* ── Activités à faire à Dakar ── */
  { id: "ile-ngor", name: "Île de Ngor", type: "poi", filter: "activite", lat: 14.7530, lng: -17.5130, dist: "12 km", time: "20 min", city: "Dakar",
    desc: "Baignade, surf et pirogue vers l'île de Ngor, spot prisé de la pointe des Almadies.",
    tags: ["Plage", "Surf", "Pirogue"], schedule: "Tous les jours" },
  { id: "marche-sandaga", name: "Marché Sandaga", type: "poi", filter: "activite", lat: 14.6770, lng: -17.4400, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Le grand marché de Dakar : tissus, artisanat et ambiance authentique.",
    tags: ["Shopping", "Artisanat"], schedule: "Lun–Sam · 9:00–19:00" },
  { id: "lac-rose", name: "Lac Rose", type: "poi", filter: "activite", lat: 14.8390, lng: -17.2350, dist: "35 km", time: "45 min", city: "Dakar",
    desc: "Le célèbre lac aux eaux roses (Retba), récolte de sel et quad sur les dunes.",
    tags: ["Nature", "Quad", "Sel"], schedule: "Tous les jours" },

  /* ── Restos / sites touristiques ── */
  { id: "teranga", name: "Resto Teranga", type: "food", filter: "tourisme", lat: 14.6840, lng: -17.4520, dist: "600 m", time: "3 min", city: "Dakar",
    desc: "Cuisine sénégalaise — thiéboudienne et yassa, à deux pas du centre-ville.",
    tags: ["Thiéboudienne", "Yassa"], schedule: "Tous les jours · 12:00–23:00" },
  { id: "renaissance", name: "Mon. de la Renaissance", type: "poi", filter: "tourisme", lat: 14.7237, lng: -17.4900, dist: "4 km", time: "12 min", city: "Dakar",
    desc: "Le Monument de la Renaissance africaine, point de vue emblématique sur Dakar.",
    tags: ["Monument", "Point de vue"], schedule: "Tous les jours · 9:00–18:00" },
  { id: "goree", name: "Île de Gorée", type: "poi", filter: "tourisme", lat: 14.6670, lng: -17.3980, dist: "Ferry · 20 min", time: "ferry", city: "Dakar",
    desc: "Patrimoine mondial UNESCO, mémoire de la traite, à 20 min en chaloupe.",
    tags: ["UNESCO", "Histoire"], schedule: "Chaloupe dès 7:00" },
  { id: "musee-mcn", name: "Musée des Civilisations noires", type: "poi", filter: "tourisme", lat: 14.6720, lng: -17.4350, dist: "2,5 km", time: "9 min", city: "Dakar",
    desc: "Vaste musée dédié aux civilisations et à l'art africains.",
    tags: ["Musée", "Art", "Culture"], schedule: "Mar–Dim · 10:00–19:00" },
];

/* Centre de la carte (Dakar / presqu'île). */
export const MAP_CENTER: [number, number] = [14.71, -17.35];
export const MAP_ZOOM = 11;

export interface TransportMode {
  id: "walk" | "transit" | "taxi";
  label: string;
  sub: string;
  dur: string;
  cost: string;
}

export const MODES: TransportMode[] = [
  { id: "walk", label: "Marche", sub: "3,8 km · itinéraire piéton", dur: "52 min", cost: "—" },
  { id: "transit", label: "Transport", sub: "BRT ligne 1 + 6 min à pied", dur: "28 min", cost: "500 FCFA" },
  { id: "taxi", label: "Taxi-VTC", sub: "14 km · via autoroute", dur: "22 min", cost: "≈ 3 500 FCFA" },
];

export const POI_CATEGORIES: { id: PoiType; name: string; dot: string }[] = [
  { id: "venue", name: "Sites JOJ", dot: "#0E0F0C" },
  { id: "transport", name: "Transports", dot: "#6E6E68" },
  { id: "food", name: "Restos", dot: "#C77A1E" },
  { id: "poi", name: "À voir", dot: "#00853F" },
];

export const POI_TYPE_LABEL: Record<PoiType, string> = {
  venue: "Site JOJ",
  transport: "Transport",
  food: "Restauration",
  poi: "À découvrir",
};

/* Filtres de la carte d'accueil (un seul actif à la fois). */
export const MAP_FILTERS: { id: MapFilter; label: string; short: string; color: string }[] = [
  { id: "competition", label: "Compétitions", short: "Compét.", color: "#E8580A" },
  { id: "activite", label: "À faire à Dakar", short: "Activités", color: "#16B5C4" },
  { id: "festivite", label: "Festivités JOJ", short: "Festivités", color: "#FFCD00" },
  { id: "tourisme", label: "Restos & sites", short: "Tourisme", color: "#00853F" },
];

export const poisByFilter = (f: MapFilter) => POIS.filter((p) => p.filter === f);

/* Services d'un site de compétition (fiche site). */
export const SITE_SERVICES = [
  { id: "parking", label: "Parkings", detail: "P1 · P2 · dépose taxi-VTC", status: "Disponible", tone: "ok" as const },
  { id: "food", label: "Restauration", detail: "6 stands · cuisine locale & snacks", status: "Ouvert", tone: "ok" as const },
  { id: "secours", label: "Premiers secours", detail: "Poste central · tribune Est", status: "24/7", tone: "alert" as const },
  { id: "pmr", label: "Accès PMR", detail: "Entrée A · ascenseurs tribunes", status: "Adapté", tone: "ok" as const },
];

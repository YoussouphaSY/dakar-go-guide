/*
  Données Mobilité — JOJ Dakar 2026.
  Reprises de la maquette Claude (Mobilité.dc.html) : POI, modes multimodaux.
  Positions left/top en % sur la carte stylisée (mêmes repères que la maquette).
*/

export type PoiType = "venue" | "transport" | "food" | "poi";

export interface Poi {
  id: string;
  name: string;
  type: PoiType;
  lat: number;    // coordonnées GPS réelles
  lng: number;
  dist: string;
  time: string;   // temps en taxi
  desc: string;
  city?: string;
  image?: string;   // aperçu (placeholder si vide)
  tags?: string[];  // détails : sports accueillis, lignes, spécialités…
}

export const POIS: Poi[] = [
  { id: "arene", name: "Dakar Arena", type: "venue", lat: 14.7390, lng: -17.1900, dist: "14 km", time: "22 min", city: "Diamniadio",
    desc: "Salle multisport de 15 000 places — basket 3×3 et futsal. Pôle olympique de Diamniadio.",
    tags: ["Basket 3×3", "Futsal", "15 000 places"] },
  { id: "expo", name: "Dakar Expo Center", type: "venue", lat: 14.7330, lng: -17.1840, dist: "13 km", time: "21 min", city: "Diamniadio",
    desc: "Boxe, judo, escrime, gymnastique et wushu, au Centre des Expositions de Diamniadio.",
    tags: ["Boxe", "Judo", "Escrime", "Gymnastique", "Wushu"] },
  { id: "wade", name: "Stade Abdoulaye Wade", type: "venue", lat: 14.7570, lng: -17.0760, dist: "16 km", time: "24 min", city: "Diamniadio",
    desc: "Le grand stade national : cérémonie d'ouverture et tir à l'arc.",
    tags: ["Cérémonie d'ouverture", "Tir à l'arc", "50 000 places"] },
  { id: "iba", name: "Complexe Iba Mar Diop", type: "venue", lat: 14.6890, lng: -17.4560, dist: "3 km", time: "10 min", city: "Dakar",
    desc: "Athlétisme, taekwondo et rugby à 7, au cœur de Dakar.",
    tags: ["Athlétisme", "Taekwondo", "Rugby à 7"] },
  { id: "oeuf", name: "Complexe Tour de l'Œuf", type: "venue", lat: 14.7050, lng: -17.4730, dist: "5 km", time: "13 min", city: "Dakar",
    desc: "Natation, baseball5, skateboard, basket 3×3 et breaking.",
    tags: ["Natation", "Baseball5", "Skateboard", "Breaking"] },
  { id: "brt", name: "Gare BRT Petersen", type: "transport", lat: 14.6790, lng: -17.4430, dist: "1,2 km", time: "5 min", city: "Dakar",
    desc: "Hub du Bus Rapid Transit, ligne 1 directe vers le pôle olympique.",
    tags: ["BRT ligne 1", "Vers Diamniadio", "Toutes les 10 min"] },
  { id: "ter", name: "Gare TER Dakar", type: "transport", lat: 14.6710, lng: -17.4380, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Train express régional vers Diamniadio en 25 minutes.",
    tags: ["TER", "Diamniadio 25 min", "Climatisé"] },
  { id: "teranga", name: "Resto Teranga", type: "food", lat: 14.6840, lng: -17.4520, dist: "600 m", time: "3 min", city: "Dakar",
    desc: "Cuisine sénégalaise — thiéboudienne et yassa, à deux pas du centre-ville.",
    tags: ["Thiéboudienne", "Yassa", "Cuisine locale"] },
  { id: "renaissance", name: "Mon. de la Renaissance", type: "poi", lat: 14.7237, lng: -17.4900, dist: "4 km", time: "12 min", city: "Dakar",
    desc: "Le Monument de la Renaissance africaine, point de vue emblématique sur Dakar.",
    tags: ["Point de vue", "Monument", "Photo"] },
  { id: "goree", name: "Île de Gorée", type: "poi", lat: 14.6670, lng: -17.3980, dist: "Ferry · 20 min", time: "ferry", city: "Dakar",
    desc: "Patrimoine mondial UNESCO, mémoire de la traite, à 20 min en chaloupe.",
    tags: ["UNESCO", "Histoire", "Chaloupe"] },
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

/* Services d'un site de compétition (fiche site). */
export const SITE_SERVICES = [
  { id: "parking", label: "Parkings", detail: "P1 · P2 · dépose taxi-VTC", status: "Disponible", tone: "ok" as const },
  { id: "food", label: "Restauration", detail: "6 stands · cuisine locale & snacks", status: "Ouvert", tone: "ok" as const },
  { id: "secours", label: "Premiers secours", detail: "Poste central · tribune Est", status: "24/7", tone: "alert" as const },
  { id: "pmr", label: "Accès PMR", detail: "Entrée A · ascenseurs tribunes", status: "Adapté", tone: "ok" as const },
];

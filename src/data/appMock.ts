/*
  appMock.ts — données de démonstration de l'interface APP (mobile),
  reprises fidèlement du prototype Claude (Dakar-Go-26 Prototype-2).

  Ces données pilotent les écrans : Programme (séances par jour), détail
  épreuve (liste de départ / match), résultats, tableau des médailles,
  suggestions AYO. Les images sont des placeholders (à fournir).
*/

export type EventFormat = "startlist" | "match" | "fest";

export interface AthleteRow {
  lane: number;
  name: string;
  code: string;
  star?: boolean;
}

export interface Team {
  name: string;
  code: string;
}

export interface ProgEvent {
  id: string;
  time: string;
  sport: string;
  title: string;
  venue: string;
  live?: boolean;
}

export interface EventDetail {
  phase: string;
  format: EventFormat;
  about: string;
  athletes?: AthleteRow[];
  teams?: Team[];
}

/* — Jours du programme (démo mobile) — */
export interface ProgDay {
  key: string;
  dow: string;
  dayNum: string;
}

export const PROG_DAYS: ProgDay[] = [
  { key: "11-06", dow: "Ven", dayNum: "6" },
  { key: "11-07", dow: "Sam", dayNum: "7" },
  { key: "11-08", dow: "Dim", dayNum: "8" },
  { key: "11-09", dow: "Lun", dayNum: "9" },
  { key: "11-10", dow: "Mar", dayNum: "10" },
];

export const PROG_EVENTS: Record<string, ProgEvent[]> = {
  "11-08": [
    { id: "e-tir", time: "10:00", sport: "Tir à l'arc", title: "Finale · Tir à l'arc", venue: "Stade A. Wade" },
    { id: "e-gym", time: "17:00", sport: "Gymnastique", title: "Finale · Sol & agrès", venue: "Centre des Expositions" },
    { id: "e-200", time: "18:00", sport: "Athlétisme", title: "Finale 200 m — hommes", venue: "Iba Mar Diop", live: true },
    { id: "e-fleuret", time: "18:30", sport: "Escrime", title: "Finale fleuret — femmes", venue: "Centre des Expositions" },
  ],
  "11-06": [
    { id: "e-relais", time: "18:00", sport: "Natation", title: "Finale relais 4×100 m", venue: "Tour de l'Œuf" },
    { id: "e-boxe", time: "17:00", sport: "Boxe", title: "Quarts de finale", venue: "Centre des Expositions" },
  ],
  "11-07": [
    { id: "e-lutte", time: "16:00", sport: "Lutte", title: "Lutte de plage", venue: "Saly Plage Ouest" },
    { id: "e-goree", time: "18:00", sport: "Festivité", title: "Nuit culturelle de Gorée", venue: "Île de Gorée" },
  ],
  "11-09": [
    { id: "e-basket", time: "19:00", sport: "Basket 3×3", title: "Finale · Basket 3×3", venue: "Tour de l'Œuf" },
    { id: "e-mapping", time: "20:30", sport: "Festivité", title: "Mapping Renaissance", venue: "Mon. Renaissance" },
  ],
  "11-10": [
    { id: "e-relais2", time: "18:00", sport: "Athlétisme", title: "Finale relais 4×100", venue: "Iba Mar Diop" },
    { id: "e-taek", time: "15:00", sport: "Taekwondo", title: "Finale −68 kg", venue: "Iba Mar Diop" },
  ],
};

export const EVENT_DETAILS: Record<string, EventDetail> = {
  "e-200": {
    phase: "Finale", format: "startlist",
    about: "Huit sprinteurs se disputent l'or sur le demi-tour de piste. Le Sénégalais A. Diallo, couloir 5, vise le record des Jeux.",
    athletes: [
      { lane: 3, name: "K. Mensah", code: "GHA" }, { lane: 4, name: "F. Okoye", code: "NGA" },
      { lane: 5, name: "A. Diallo", code: "SEN", star: true }, { lane: 6, name: "J. Baptiste", code: "FRA" },
      { lane: 7, name: "S. Kamara", code: "CIV" }, { lane: 8, name: "T. Bekele", code: "ETH" },
    ],
  },
  "e-fleuret": {
    phase: "Finale", format: "match",
    about: "La finale du fleuret féminin oppose la tenante du titre à la révélation des Jeux.",
    teams: [{ name: "N. Sarr", code: "SEN" }, { name: "L. Bianchi", code: "ITA" }],
  },
  "e-tir": {
    phase: "Finale", format: "match",
    about: "Duel au sommet pour l'or à l'arc, sur la distance olympique de 70 m.",
    teams: [{ name: "M. Traoré", code: "MLI" }, { name: "H. Kim", code: "KOR" }],
  },
  "e-gym": {
    phase: "Finale", format: "startlist",
    about: "Finale du concours général : sol, saut, barres et poutre s'enchaînent.",
    athletes: [
      { lane: 1, name: "R. Costa", code: "BRA" }, { lane: 2, name: "A. Ndour", code: "SEN", star: true },
      { lane: 3, name: "Y. Tanaka", code: "JPN" }, { lane: 4, name: "E. Moreau", code: "FRA" },
    ],
  },
  "e-relais": {
    phase: "Finale", format: "startlist",
    about: "Relais 4×100 m nage libre : les nations s'élancent pour le podium.",
    athletes: [
      { lane: 3, name: "Nigéria", code: "NGA" }, { lane: 4, name: "Sénégal", code: "SEN", star: true },
      { lane: 5, name: "France", code: "FRA" }, { lane: 6, name: "Afrique du Sud", code: "RSA" },
    ],
  },
  "e-boxe": {
    phase: "Quart de finale", format: "match",
    about: "Quart de finale des −60 kg. Le vainqueur file en demi-finale.",
    teams: [{ name: "I. Camara", code: "SEN" }, { name: "D. Smith", code: "GBR" }],
  },
  "e-lutte": {
    phase: "Finale", format: "match",
    about: "La lutte, discipline reine au Sénégal, couronne son champion sur le sable de Saly.",
    teams: [{ name: "M. Faye", code: "SEN" }, { name: "O. Diop", code: "SEN" }],
  },
  "e-basket": {
    phase: "Finale", format: "match",
    about: "Finale du 3×3 : un demi-terrain, 21 points ou 10 minutes. Spectacle garanti.",
    teams: [{ name: "Sénégal", code: "SEN" }, { name: "Serbie", code: "SRB" }],
  },
  "e-relais2": {
    phase: "Finale", format: "startlist",
    about: "Relais 4×100 m sur piste : les passages de témoin font la différence.",
    athletes: [
      { lane: 4, name: "Sénégal", code: "SEN", star: true }, { lane: 5, name: "Nigéria", code: "NGA" },
      { lane: 6, name: "Jamaïque", code: "JAM" }, { lane: 7, name: "France", code: "FRA" },
    ],
  },
  "e-taek": {
    phase: "Finale", format: "match",
    about: "Finale des −68 kg : deux rounds, vitesse et précision pour l'or.",
    teams: [{ name: "Y. Sy", code: "SEN" }, { name: "A. Park", code: "KOR" }],
  },
  "e-goree": {
    phase: "Festivité", format: "fest",
    about: "Soirée mémoire et musique sur l'île de Gorée : percussions, danse et projection.",
  },
  "e-mapping": {
    phase: "Festivité", format: "fest",
    about: "Spectacle de mapping monumental projeté sur la statue de la Renaissance africaine.",
  },
};

/* — Résultats récents & médailles — */
export type Medal = "or" | "argent" | "bronze";

export interface RecentResult {
  sport: string;
  event: string;
  who: string;
  medal: Medal;
  score: string;
}

export const RECENT_RESULTS: RecentResult[] = [
  { sport: "Natation", event: "Finale 100 m nage libre — F", who: "A. Diallo · SEN", medal: "or", score: "53,71 s" },
  { sport: "Judo", event: "Finale −60 kg", who: "Y. Cissé · SEN", medal: "argent", score: "Waza-ari" },
  { sport: "Rugby à 7", event: "Finale — F", who: "Sénégal", medal: "or", score: "24–12" },
];

export interface MedalRow {
  rank: number;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
}

export const MEDAL_TABLE: MedalRow[] = [
  { rank: 1, country: "Sénégal", gold: 8, silver: 5, bronze: 6 },
  { rank: 2, country: "Nigéria", gold: 6, silver: 7, bronze: 4 },
  { rank: 3, country: "France", gold: 5, silver: 4, bronze: 8 },
  { rank: 4, country: "Kenya", gold: 3, silver: 6, bronze: 2 },
];

/* — Carte accueil : les POI/filtres vivent dans data/mobility.ts (GPS réels). — */

/* — Diapo actualités (accueil) : résultats, faits, records, actus JOJ — */
export type NewsKind = "resultat" | "athlete" | "record" | "actu";

export interface NewsItem {
  id: string;
  kind: NewsKind;
  tag: string;      // étiquette courte (RÉSULTAT, RECORD…)
  title: string;
  sub: string;      // ligne secondaire (qui / quand / détail)
}

export const NEWS: NewsItem[] = [
  { id: "n-or", kind: "resultat", tag: "Résultat", title: "A. Diallo décroche l'or du 100 m nage libre", sub: "Natation · 53,71 s · nouveau record des Jeux" },
  { id: "n-record", kind: "record", tag: "Record", title: "Record du 200 m battu en séries", sub: "Athlétisme · 20,42 s · K. Mensah (GHA)" },
  { id: "n-athlete", kind: "athlete", tag: "Fait marquant", title: "N. Sarr, 16 ans, en finale du fleuret", sub: "Escrime · la benjamine de l'équipe sénégalaise" },
  { id: "n-actu", kind: "actu", tag: "Actu JOJ", title: "La flamme illumine la Corniche ce soir", sub: "Cérémonie · concert gratuit dès 19:00" },
  { id: "n-medal", kind: "resultat", tag: "Médailles", title: "Le Sénégal en tête du tableau", sub: "8 or · 5 argent · 6 bronze" },
];

/* — Bannière live / prochains matchs (accueil) — */
export interface LiveBanner {
  id: string;
  state: "live" | "next";
  sport: string;
  title: string;
  score?: string;
  when?: string;
}

export const LIVE_BANNER: LiveBanner[] = [
  { id: "b-live", state: "live", sport: "Basket 3×3", title: "Sénégal — Serbie", score: "14 — 11" },
  { id: "b-next1", state: "next", sport: "Athlétisme", title: "Finale 200 m — hommes", when: "18:00" },
  { id: "b-next2", state: "next", sport: "Escrime", title: "Finale fleuret — femmes", when: "18:30" },
];

/* — Découvrir Dakar (carrousel accueil) — cat = clé de traduction, filter = filtre carte ciblé — */
export const DISCOVER: {
  id: string;
  cat: "patrimoine" | "nature" | "culture" | "panorama";
  name: string;
  img?: string;
  filter: import("@/data/mobility").MapFilter;
}[] = [
  /* goree.jpg / musee.png des ressources sont en réalité des photos de la Renaissance → placeholders */
  { id: "goree", cat: "patrimoine", name: "Île de Gorée", filter: "tourisme" },
  { id: "lacrose", cat: "nature", name: "Lac Rose", filter: "activite" },
  { id: "musee", cat: "culture", name: "Musée des Civilisations", filter: "tourisme" },
  { id: "renaissance", cat: "panorama", name: "Mon. Renaissance", img: "/assets/venues/renaissance.jpg", filter: "tourisme" },
];

/* — Mobilité : trajets, réseaux et services vivent dans data/mobility.ts — */

/* — Profil — */
export const LANGS = [
  { id: "FR", full: "Français" }, { id: "EN", full: "English" }, { id: "AR", full: "العربية" },
  { id: "WO", full: "Wolof" }, { id: "ES", full: "Español" },
] as const;

export type LangId = (typeof LANGS)[number]["id"];

export const INTERESTS = [
  { id: "nat", name: "Natation" }, { id: "ath", name: "Athlétisme" }, { id: "basket", name: "Basket 3×3" },
  { id: "judo", name: "Judo" }, { id: "lutte", name: "Lutte" },
];

export const SETTINGS = [
  { id: "notif", label: "Notifications" },
  { id: "offline", label: "Mode hors-ligne" },
  { id: "help", label: "Aide & assistance" },
];

/* — AYO : suggestions & réponses — */
export const SUGGESTIONS = [
  { q: "Que faire ce soir ?", a: "Ce soir : finale du 200 m à 18:00 (Iba Mar Diop) et la Fan Zone de la Corniche dès 16:00. Je peux ajouter l'un à votre agenda ?" },
  { q: "Où manger près de moi ?", a: "Le resto Teranga est à 600 m : thiéboudienne, yassa et dibi, ouvert jusqu'à 23:00. Voulez-vous l'itinéraire ?" },
  { q: "Comment aller à l'Arène ?", a: "L'Arène olympique est à 22 min en taxi-VTC (~3 500 FCFA) ou 28 min en BRT. Partez à 17:20 pour la finale." },
  { q: "Acheter un billet", a: "Pour la finale du 200 m, il reste des places en Catégorie 2 (15 000 FCFA). Je peux ouvrir la billetterie." },
];

/* Venues de filtrage (Programme) */
export const PROG_VENUES = [
  "Tous", "Iba Mar Diop", "Centre des Expositions", "Tour de l'Œuf", "Stade A. Wade", "Saly Plage Ouest",
];

/* Helpers */
export function dayLabel(key: string): string {
  const d = PROG_DAYS.find((x) => x.key === key);
  return d ? `${d.dow} ${d.dayNum} nov` : "";
}

export function findEvent(id: string): (ProgEvent & { day: string }) | null {
  for (const day in PROG_EVENTS) {
    const e = PROG_EVENTS[day].find((x) => x.id === id);
    if (e) return { ...e, day };
  }
  return null;
}

/*
  Calendrier JOJ Dakar 2026 : 31 oct → 13 nov 2026.
  Chaque jour a une clé "MM-DD". `available` = jour proposant des séances
  (présent dans PROG_EVENTS) → sélectionnable dans le mini-calendrier.
*/
export interface JojDay {
  key: string;     // "MM-DD"
  date: number;    // numéro du jour (1..31)
  month: number;   // 10 (oct) ou 11 (nov)
  weekday: number; // 0=Lun … 6=Dim (grille FR)
  available: boolean;
}

export const JOJ_START = { month: 10, day: 31 };
export const JOJ_END = { month: 11, day: 13 };

export function jojDays(): JojDay[] {
  const days: JojDay[] = [];
  const cursor = new Date(2026, 9, 31); // 31 oct 2026 (mois 0-indexé)
  const end = new Date(2026, 10, 13);   // 13 nov 2026
  while (cursor <= end) {
    const month = cursor.getMonth() + 1;
    const date = cursor.getDate();
    const key = `${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    const weekday = (cursor.getDay() + 6) % 7; // 0=Lun
    days.push({ key, date, month, weekday, available: !!PROG_EVENTS[key] });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/* Sites JOJ (pour le sélecteur de lieu du Programme). */
export interface ProgVenueInfo {
  name: string;
  city: string;
  sports: string;
}

export const PROG_VENUE_INFO: ProgVenueInfo[] = [
  { name: "Tous", city: "Tous les sites", sports: "Toutes les épreuves" },
  { name: "Iba Mar Diop", city: "Dakar", sports: "Athlétisme · Taekwondo · Rugby à 7" },
  { name: "Centre des Expositions", city: "Diamniadio", sports: "Escrime · Gymnastique · Boxe · Judo" },
  { name: "Tour de l'Œuf", city: "Dakar", sports: "Natation · Basket 3×3 · Breaking" },
  { name: "Stade A. Wade", city: "Diamniadio", sports: "Cérémonies · Tir à l'arc" },
  { name: "Saly Plage Ouest", city: "Saly", sports: "Beach-volley · Lutte · Voile" },
];

/* QR de démonstration (motif déterministe) */
export function qrCells(): { x: number; y: number }[] {
  const cells: { x: number; y: number }[] = [];
  for (let x = 0; x < 25; x++)
    for (let y = 0; y < 25; y++) {
      const finder = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      if (finder) continue;
      if ((x * 5 + y * 11 + x * y) % 3 === 0) cells.push({ x, y });
    }
  return cells;
}

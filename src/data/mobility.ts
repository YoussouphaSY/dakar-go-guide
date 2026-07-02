/*
  Données Mobilité & carte — JOJ Dakar 2026.
  POI géolocalisés (GPS réels), photos (public/assets/venues), descriptions
  traduites (EN/ES/AR — le wolof retombe sur le français), réseaux de
  transport et calcul de trajet par destination.
*/

import type { LangId } from "@/data/appMock";

export type PoiType = "venue" | "transport" | "food" | "poi";

/* Catégorie de filtre (accueil mobile) — un seul type affiché à la fois. */
export type MapFilter = "competition" | "activite" | "festivite" | "tourisme";

/* Traductions d'une description (fr = champ `desc`). */
export interface PoiI18n {
  en?: string;
  es?: string;
  ar?: string;
  wo?: string;
}

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
  i18n?: PoiI18n;
  city?: string;
  image?: string;   // chemin public (aperçu fiche)
  tags?: string[];  // détails : sports accueillis, lignes, spécialités…
  schedule?: string; // horaires (ex. "Tous les jours · 16:00–00:00")
}

export const POIS: Poi[] = [
  /* ── Compétitions (sites JOJ) ── */
  { id: "arene", name: "Dakar Arena", type: "venue", filter: "competition", lat: 14.7390, lng: -17.1900, dist: "14 km", time: "22 min", city: "Diamniadio",
    desc: "Salle multisport de 15 000 places : basket 3×3 et futsal. Pôle olympique de Diamniadio.",
    i18n: {
      en: "15,000-seat multisport arena: 3×3 basketball and futsal. Diamniadio Olympic hub.",
      es: "Pabellón multideporte de 15 000 plazas: baloncesto 3×3 y futsal. Polo olímpico de Diamniadio.",
      ar: "صالة متعددة الرياضات تتسع لـ15000 متفرج: كرة السلة 3×3 وكرة الصالات. القطب الأولمبي بديامنياديو.",
    },
    tags: ["Basket 3×3", "Futsal"], schedule: "Badminton & Futsal · 1er–12 nov" },
  { id: "expo", name: "Dakar Expo Center", type: "venue", filter: "competition", lat: 14.7330, lng: -17.1840, dist: "13 km", time: "21 min", city: "Diamniadio",
    desc: "Boxe, judo, escrime, gymnastique et wushu, au Centre des Expositions de Diamniadio.",
    i18n: {
      en: "Boxing, judo, fencing, gymnastics and wushu at the Diamniadio Exhibition Centre.",
      es: "Boxeo, judo, esgrima, gimnasia y wushu en el Centro de Exposiciones de Diamniadio.",
      ar: "الملاكمة والجودو والمبارزة والجمباز والووشو في مركز المعارض بديامنياديو.",
    },
    image: "/assets/venues/expo.jpg",
    tags: ["Boxe", "Judo", "Escrime", "Gymnastique", "Wushu"], schedule: "1er–13 nov · selon discipline" },
  { id: "wade", name: "Stade Abdoulaye Wade", type: "venue", filter: "competition", lat: 14.7570, lng: -17.0760, dist: "16 km", time: "24 min", city: "Diamniadio",
    desc: "Le grand stade national : cérémonie d'ouverture et tir à l'arc.",
    i18n: {
      en: "The national stadium: opening ceremony and archery.",
      es: "El gran estadio nacional: ceremonia de apertura y tiro con arco.",
      ar: "الملعب الوطني الكبير: حفل الافتتاح ورماية القوس.",
    },
    image: "/assets/venues/wade.jpg",
    tags: ["Cérémonie d'ouverture", "Tir à l'arc"], schedule: "Ouverture 31 oct · Tir à l'arc 6–10 nov" },
  { id: "iba", name: "Complexe Iba Mar Diop", type: "venue", filter: "competition", lat: 14.6890, lng: -17.4560, dist: "3 km", time: "10 min", city: "Dakar",
    desc: "Athlétisme, taekwondo et rugby à 7, au cœur de Dakar.",
    i18n: {
      en: "Athletics, taekwondo and rugby sevens, in the heart of Dakar.",
      es: "Atletismo, taekwondo y rugby 7, en pleno centro de Dakar.",
      ar: "ألعاب القوى والتايكوندو والرغبي السباعي في قلب داكار.",
    },
    image: "/assets/venues/iba.jpg",
    tags: ["Athlétisme", "Taekwondo", "Rugby à 7"], schedule: "Rugby 1–3 · Athlé 8–10 · Taekwondo 8–12 nov" },
  { id: "oeuf", name: "Complexe Tour de l'Œuf", type: "venue", filter: "competition", lat: 14.7050, lng: -17.4730, dist: "5 km", time: "13 min", city: "Dakar",
    desc: "Natation, baseball5, skateboard, basket 3×3 et breaking.",
    i18n: {
      en: "Swimming, baseball5, skateboarding, 3×3 basketball and breaking.",
      es: "Natación, baseball5, skate, baloncesto 3×3 y breaking.",
      ar: "السباحة والبيسبول5 والتزلج وكرة السلة 3×3 والبريك دانس.",
    },
    image: "/assets/venues/oeuf.jpg",
    tags: ["Natation", "Baseball5", "Skateboard", "Breaking"], schedule: "Natation 1–6 · Breaking 12–13 nov" },
  { id: "corniche", name: "Corniche Ouest", type: "venue", filter: "competition", lat: 14.6920, lng: -17.4760, dist: "4 km", time: "11 min", city: "Dakar",
    desc: "Cyclisme sur route en bord d'océan.",
    i18n: {
      en: "Road cycling along the ocean.",
      es: "Ciclismo en ruta junto al océano.",
      ar: "سباق الدراجات على الطريق بمحاذاة المحيط.",
    },
    image: "/assets/venues/corniche.jpg",
    tags: ["Cyclisme"], schedule: "Cyclisme · 8 & 10 nov" },
  { id: "saly", name: "Saly Beach West", type: "venue", filter: "competition", lat: 14.4490, lng: -17.0080, dist: "80 km", time: "1 h 10", city: "Saly",
    desc: "Sports de plage : beach-volley, lutte, handball, voile, triathlon, aviron.",
    i18n: {
      en: "Beach sports: beach volleyball, wrestling, handball, sailing, triathlon, rowing.",
      es: "Deportes de playa: vóley playa, lucha, balonmano, vela, triatlón, remo.",
      ar: "رياضات شاطئية: الكرة الطائرة الشاطئية والمصارعة وكرة اليد والإبحار والترياتلون والتجديف.",
    },
    image: "/assets/venues/saly.jpg",
    tags: ["Beach-volley", "Lutte", "Voile", "Triathlon"], schedule: "2–13 nov · selon discipline" },
  { id: "equestre", name: "Centre équestre", type: "venue", filter: "competition", lat: 14.7280, lng: -17.1950, dist: "13 km", time: "21 min", city: "Diamniadio",
    desc: "Saut d'obstacles : l'épreuve d'équitation.",
    i18n: {
      en: "Show jumping: the equestrian event.",
      es: "Salto de obstáculos: la prueba ecuestre.",
      ar: "قفز الحواجز: منافسة الفروسية.",
    },
    image: "/assets/venues/equestre.jpg",
    tags: ["Équitation"], schedule: "Équitation · 3–6 nov" },

  /* ── Festivités pendant les JOJ ── */
  { id: "fanzone", name: "Fan Zone Corniche", type: "poi", filter: "festivite", lat: 14.6905, lng: -17.4710, dist: "4 km", time: "11 min", city: "Dakar",
    desc: "Écrans géants, concerts gratuits et animations face à l'océan, tous les soirs des Jeux.",
    i18n: {
      en: "Giant screens, free concerts and entertainment by the ocean, every evening of the Games.",
      es: "Pantallas gigantes, conciertos gratis y animación frente al océano, todas las noches.",
      ar: "شاشات عملاقة وحفلات مجانية وأنشطة أمام المحيط كل مساء أثناء الألعاب.",
    },
    image: "/media/slides/fanzone.jpg",
    tags: ["Concerts", "Écrans géants", "Gratuit"], schedule: "Tous les soirs · 16:00–00:00" },
  { id: "teranga-nuit", name: "Nuit de la Teranga", type: "poi", filter: "festivite", lat: 14.6730, lng: -17.4400, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Concerts d'artistes sénégalais et invités africains, place de la Nation.",
    i18n: {
      en: "Concerts by Senegalese artists and African guests, Place de la Nation.",
      es: "Conciertos de artistas senegaleses e invitados africanos, plaza de la Nación.",
      ar: "حفلات لفنانين سنغاليين وضيوف أفارقة في ساحة الأمة.",
    },
    tags: ["Mbalax", "Concert"], schedule: "2 nov · 20:00" },
  { id: "marche-saveurs", name: "Marché des saveurs", type: "food", filter: "festivite", lat: 14.6740, lng: -17.4380, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Gastronomie sénégalaise et street-food : thiéboudienne, yassa, dibi.",
    i18n: {
      en: "Senegalese gastronomy and street food: thieboudienne, yassa, dibi.",
      es: "Gastronomía senegalesa y street food: thieboudienne, yassa, dibi.",
      ar: "المطبخ السنغالي وأطعمة الشارع: تشيبوجين وياسا وديبي.",
    },
    tags: ["Street-food", "Cuisine locale"], schedule: "5 nov · dès 11:00" },
  { id: "mapping", name: "Mapping Renaissance", type: "poi", filter: "festivite", lat: 14.7237, lng: -17.4900, dist: "4 km", time: "12 min", city: "Dakar",
    desc: "Spectacle de projection monumentale sur la statue de la Renaissance.",
    i18n: {
      en: "Monumental projection show on the African Renaissance statue.",
      es: "Espectáculo de proyección monumental sobre la estatua del Renacimiento.",
      ar: "عرض إسقاط ضوئي ضخم على تمثال النهضة الأفريقية.",
    },
    image: "/assets/venues/renaissance.jpg",
    tags: ["Spectacle", "Lumière"], schedule: "9 nov · 20:30" },

  /* ── Activités à faire à Dakar ── */
  { id: "ile-ngor", name: "Île de Ngor", type: "poi", filter: "activite", lat: 14.7530, lng: -17.5130, dist: "12 km", time: "20 min", city: "Dakar",
    desc: "Baignade, surf et pirogue vers l'île de Ngor, spot prisé de la pointe des Almadies.",
    i18n: {
      en: "Swimming, surfing and pirogue rides to Ngor island, a favourite spot at the Almadies point.",
      es: "Baño, surf y piragua hacia la isla de Ngor, rincón preferido de las Almadías.",
      ar: "سباحة وركوب أمواج وقوارب إلى جزيرة نغور، أشهر مواقع رأس ألمادي.",
    },
    tags: ["Plage", "Surf", "Pirogue"], schedule: "Tous les jours" },
  { id: "marche-sandaga", name: "Marché Sandaga", type: "poi", filter: "activite", lat: 14.6770, lng: -17.4400, dist: "2 km", time: "8 min", city: "Dakar",
    desc: "Le grand marché de Dakar : tissus, artisanat et ambiance authentique.",
    i18n: {
      en: "Dakar's great market: fabrics, crafts and an authentic atmosphere.",
      es: "El gran mercado de Dakar: telas, artesanía y ambiente auténtico.",
      ar: "سوق داكار الكبير: أقمشة وحرف يدوية وأجواء أصيلة.",
    },
    tags: ["Shopping", "Artisanat"], schedule: "Lun–Sam · 9:00–19:00" },
  { id: "lac-rose", name: "Lac Rose", type: "poi", filter: "activite", lat: 14.8390, lng: -17.2350, dist: "35 km", time: "45 min", city: "Dakar",
    desc: "Le célèbre lac aux eaux roses (Retba), récolte de sel et quad sur les dunes.",
    i18n: {
      en: "The famous pink lake (Retba): salt harvesting and quad rides on the dunes.",
      es: "El famoso lago rosa (Retba): cosecha de sal y quads en las dunas.",
      ar: "البحيرة الوردية الشهيرة (ريتبا): جني الملح وركوب الدراجات الرباعية على الكثبان.",
    },
    tags: ["Nature", "Quad", "Sel"], schedule: "Tous les jours" },

  /* ── Restos / sites touristiques ── */
  { id: "teranga", name: "Resto Teranga", type: "food", filter: "tourisme", lat: 14.6840, lng: -17.4520, dist: "600 m", time: "3 min", city: "Dakar",
    desc: "Cuisine sénégalaise : thiéboudienne et yassa, à deux pas du centre-ville.",
    i18n: {
      en: "Senegalese cuisine: thieboudienne and yassa, right by the city centre.",
      es: "Cocina senegalesa: thieboudienne y yassa, a dos pasos del centro.",
      ar: "مطبخ سنغالي: تشيبوجين وياسا على بعد خطوات من وسط المدينة.",
    },
    tags: ["Thiéboudienne", "Yassa"], schedule: "Tous les jours · 12:00–23:00" },
  { id: "renaissance", name: "Mon. de la Renaissance", type: "poi", filter: "tourisme", lat: 14.7237, lng: -17.4900, dist: "4 km", time: "12 min", city: "Dakar",
    desc: "Le Monument de la Renaissance africaine, point de vue emblématique sur Dakar.",
    i18n: {
      en: "The African Renaissance Monument, an iconic viewpoint over Dakar.",
      es: "El Monumento al Renacimiento Africano, mirador emblemático de Dakar.",
      ar: "نصب النهضة الأفريقية، إطلالة رمزية على داكار.",
    },
    image: "/assets/venues/renaissance.jpg",
    tags: ["Monument", "Point de vue"], schedule: "Tous les jours · 9:00–18:00" },
  { id: "goree", name: "Île de Gorée", type: "poi", filter: "tourisme", lat: 14.6670, lng: -17.3980, dist: "Ferry · 20 min", time: "ferry", city: "Dakar",
    desc: "Patrimoine mondial UNESCO, mémoire de la traite, à 20 min en chaloupe.",
    i18n: {
      en: "UNESCO World Heritage, memory of the slave trade, 20 min away by ferry.",
      es: "Patrimonio mundial UNESCO, memoria de la trata, a 20 min en barco.",
      ar: "تراث عالمي لليونسكو وذاكرة تجارة الرقيق، على بعد 20 دقيقة بالعبّارة.",
    },
    /* pas de photo : goree.jpg du dossier media est en réalité le Monument de la Renaissance */
    tags: ["UNESCO", "Histoire"], schedule: "Chaloupe dès 7:00" },
  { id: "musee-mcn", name: "Musée des Civilisations noires", type: "poi", filter: "tourisme", lat: 14.6720, lng: -17.4350, dist: "2,5 km", time: "9 min", city: "Dakar",
    desc: "Vaste musée dédié aux civilisations et à l'art africains.",
    i18n: {
      en: "A vast museum devoted to African civilisations and art.",
      es: "Amplio museo dedicado a las civilizaciones y al arte africanos.",
      ar: "متحف واسع مكرّس للحضارات والفنون الأفريقية.",
    },
    tags: ["Musée", "Art", "Culture"], schedule: "Mar–Dim · 10:00–19:00" },
];

/* Description dans la langue active (wolof → français en attendant relecture). */
export function poiDesc(p: Poi, lang: LangId): string {
  if (lang === "EN") return p.i18n?.en ?? p.desc;
  if (lang === "ES") return p.i18n?.es ?? p.desc;
  if (lang === "AR") return p.i18n?.ar ?? p.desc;
  if (lang === "WO") return p.i18n?.wo ?? p.desc;
  return p.desc;
}

/* Centre de la carte (Dakar / presqu'île). */
export const MAP_CENTER: [number, number] = [14.71, -17.35];
export const MAP_ZOOM = 11;

/* Position démo de l'utilisateur : Plateau, Dakar. */
export const USER_POS: [number, number] = [14.6765, -17.4340];

export interface TransportMode {
  id: "walk" | "transit" | "taxi";
  label: string;
  sub: string;
  dur: string;
  cost: string;
}

export const MODES: TransportMode[] = [
  { id: "walk", label: "Marche", sub: "3,8 km · itinéraire piéton", dur: "52 min", cost: "Gratuit" },
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
  { id: "festivite", label: "Festivités JOJ", short: "Festivités", color: "#C77A1E" },
  { id: "tourisme", label: "Restos & sites", short: "Tourisme", color: "#00853F" },
];

export const poisByFilter = (f: MapFilter) => POIS.filter((p) => p.filter === f);

/* Sites de compétition (destinations de l'écran Mobilité). */
export const VENUES = POIS.filter((p) => p.type === "venue");

/* ── Calcul de trajet par destination (heuristique de démo) ── */

export interface RouteOption {
  id: "walk" | "bus" | "taxi";
  mins: number | null;   // null = indisponible
  cost: string;
  shuttle?: boolean;     // navette JOJ longue distance (Saly)
}

/* "14 km" / "600 m" / "2,5 km" → km ; null si non kilométrique (ferry). */
export function kmOf(p: Poi): number | null {
  const km = p.dist.match(/([\d.,]+)\s*km/);
  if (km) return parseFloat(km[1].replace(",", "."));
  const m = p.dist.match(/(\d+)\s*m\b/);
  if (m) return parseInt(m[1], 10) / 1000;
  return null;
}

const fcfa = (n: number) => `≈ ${n.toLocaleString("fr-FR")} FCFA`;

export function routesFor(p: Poi): RouteOption[] {
  const km = kmOf(p) ?? 3;
  const walk: RouteOption = km <= 6
    ? { id: "walk", mins: Math.round(km * 13), cost: "" }
    : { id: "walk", mins: null, cost: "" };
  const bus: RouteOption = km > 30
    ? { id: "bus", mins: Math.round(20 + km * 0.9), cost: "", shuttle: true }
    : { id: "bus", mins: Math.round(12 + km * 2.1), cost: "500 FCFA" };
  const taxiMatch = p.time.match(/^(\d+)\s*min$/);
  const taxi: RouteOption = {
    id: "taxi",
    mins: taxiMatch ? parseInt(taxiMatch[1], 10) : Math.round(8 + km * 0.85),
    cost: fcfa(Math.max(1500, Math.round((km * 230) / 500) * 500)),
  };
  return [walk, bus, taxi];
}

/* "HH:MM" de départ pour arriver `early` min avant `start`. */
export function departureFor(start: string, travelMins: number, early = 15): string {
  const [h, m] = start.split(":").map(Number);
  const total = (((h * 60 + m - travelMins - early) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ── Réseaux de transport (fiches « Se déplacer à Dakar ») ── */

export interface TransitLine {
  id: "brt" | "ter" | "ddd" | "taxi" | "ferry";
  color: string;
}

export const TRANSIT_LINES: TransitLine[] = [
  { id: "brt", color: "#16B5C4" },
  { id: "ter", color: "#E8580A" },
  { id: "ddd", color: "#00853F" },
  { id: "taxi", color: "#C77A1E" },
  { id: "ferry", color: "#0E0F0C" },
];

/* Prochains passages (démo « temps réel »). */
export const NEXT_DEPARTURES = [
  { line: "BRT 1", mins: 4, color: "#16B5C4" },
  { line: "BRT 1", mins: 14, color: "#16B5C4" },
  { line: "TER", mins: 9, color: "#E8580A" },
];

/* Services d'un site de compétition (fiche site). */
export const SITE_SERVICES = [
  { id: "parking", label: "Parkings", detail: "P1 · P2 · dépose taxi-VTC", status: "Disponible", tone: "ok" as const },
  { id: "food", label: "Restauration", detail: "6 stands · cuisine locale & snacks", status: "Ouvert", tone: "ok" as const },
  { id: "secours", label: "Premiers secours", detail: "Poste central · tribune Est", status: "24/7", tone: "alert" as const },
  { id: "pmr", label: "Accès PMR", detail: "Entrée A · ascenseurs tribunes", status: "Adapté", tone: "ok" as const },
];

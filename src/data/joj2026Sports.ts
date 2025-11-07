// Programme complet des Jeux Olympiques de la Jeunesse 2026 à Dakar

export interface Sport {
  id: number;
  name: string;
  category: "competition" | "mobilisation";
  emoji: string;
  image?: string;
  color: string;
  gradient: string;
  venue: string;
  description: string;
  videoUrl?: string;
  events: SportEvent[];
}

export interface SportEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  phase: string;
  gender: "H" | "F" | "Mixte";
}

export const joj2026Sports: Sport[] = [
  {
    id: 1,
    name: "Athlétisme",
    category: "competition",
    emoji: "🏃",
    image: "/assets/sports/athletisme.jpg",
    color: "#FF6B6B",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    venue: "Stade Léopold Sédar Senghor, Dakar",
    description: "Courses, sauts, lancers - L'essence des Jeux Olympiques",
    videoUrl: "https://www.youtube.com/embed/dyBvs9mTzRY",
    events: [
      { id: 101, title: "100m Hommes - Finale", date: "2026-11-08", time: "18:00", phase: "Finale", gender: "H" },
      { id: 102, title: "100m Femmes - Finale", date: "2026-11-08", time: "18:30", phase: "Finale", gender: "F" },
      { id: 103, title: "Relais 4x100m Mixte", date: "2026-11-10", time: "19:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 2,
    name: "Aviron de mer",
    category: "competition",
    emoji: "🚣",
    image: "/assets/sports/aviron.jpg",
    color: "#4ECDC4",
    gradient: "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
    venue: "Plage de Saly",
    description: "Sport nautique traditionnel en pleine expansion",
    videoUrl: "https://www.youtube.com/embed/lBFdX37Ne6k",
    events: [
      { id: 201, title: "Solo Hommes", date: "2026-11-06", time: "09:00", phase: "Finale", gender: "H" },
      { id: 202, title: "Solo Femmes", date: "2026-11-06", time: "10:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 3,
    name: "Badminton",
    category: "competition",
    emoji: "🏸",
    image: "/assets/sports/badminton.jpeg",
    color: "#A8E6CF",
    gradient: "linear-gradient(135deg, #A8E6CF 0%, #88D8B0 100%)",
    venue: "Arena Dakar",
    description: "Rapidité, agilité et précision au filet",
    videoUrl: "https://www.youtube.com/embed/7qXNg1x0gYA",
    events: [
      { id: 301, title: "Simple Hommes - Finale", date: "2026-11-12", time: "16:00", phase: "Finale", gender: "H" },
      { id: 302, title: "Simple Femmes - Finale", date: "2026-11-12", time: "17:00", phase: "Finale", gender: "F" },
      { id: 303, title: "Double Mixte - Finale", date: "2026-11-13", time: "15:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 4,
    name: "Baseball5",
    category: "competition",
    emoji: "⚾",
    image: "/assets/sports/baseball5.jpg",
    color: "#FFD93D",
    gradient: "linear-gradient(135deg, #FFD93D 0%, #F9B208 100%)",
    venue: "Terrain urbain Diamniadio",
    description: "Version urbaine et dynamique du baseball",
    videoUrl: "https://www.youtube.com/embed/Q5wJpOCj_o0",
    events: [
      { id: 401, title: "Phase de groupes - Match 1", date: "2026-11-05", time: "14:00", phase: "Groupes", gender: "Mixte" },
      { id: 402, title: "Finale Mixte", date: "2026-11-14", time: "17:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 5,
    name: "Basket-ball 3x3",
    category: "competition",
    emoji: "🏀",
    image: "/assets/sports/basketball.jpg",
    color: "#FF8B94",
    gradient: "linear-gradient(135deg, #FF8B94 0%, #FF6B6B 100%)",
    venue: "Place du Souvenir, Dakar",
    description: "Basketball urbain intensif et spectaculaire",
    videoUrl: "https://www.youtube.com/embed/UYWgaOlqE7I",
    events: [
      { id: 501, title: "Tournoi Hommes - Demi-finale", date: "2026-11-10", time: "15:00", phase: "Demi-finale", gender: "H" },
      { id: 502, title: "Tournoi Femmes - Finale", date: "2026-11-11", time: "18:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 6,
    name: "Beach-volley",
    category: "competition",
    emoji: "🏐",
    image: "/assets/sports/beach-volley.jpg",
    color: "#FFA07A",
    gradient: "linear-gradient(135deg, #FFA07A 0%, #FF7F50 100%)",
    venue: "Plage de Saly",
    description: "Volley sur sable sous le soleil africain",
    videoUrl: "https://www.youtube.com/embed/i9y8WeiqHNw",
    events: [
      { id: 601, title: "Tournoi Hommes - Finale", date: "2026-11-13", time: "17:00", phase: "Finale", gender: "H" },
      { id: 602, title: "Tournoi Femmes - Finale", date: "2026-11-13", time: "18:30", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 7,
    name: "Breaking",
    category: "competition",
    emoji: "🕺",
    image: "/assets/sports/breaking.jpg",
    color: "#C77DFF",
    gradient: "linear-gradient(135deg, #C77DFF 0%, #9D4EDD 100%)",
    venue: "Scène urbaine Dakar",
    description: "Danse urbaine spectaculaire - Nouvelle discipline olympique!",
    videoUrl: "https://www.youtube.com/embed/uZA1DuB8NIE",
    events: [
      { id: 701, title: "Battle B-Boys - Finale", date: "2026-11-09", time: "20:00", phase: "Finale", gender: "H" },
      { id: 702, title: "Battle B-Girls - Finale", date: "2026-11-09", time: "21:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 8,
    name: "Boxe",
    category: "competition",
    emoji: "🥊",
    image: "/assets/sports/boxe.jpg",
    color: "#E63946",
    gradient: "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
    venue: "Arena Nationale, Diamniadio",
    description: "Noble art de la boxe olympique",
    videoUrl: "https://www.youtube.com/embed/6KeG_i8CWE8",
    events: [
      { id: 801, title: "Poids plume H - Finale", date: "2026-11-14", time: "19:00", phase: "Finale", gender: "H" },
      { id: 802, title: "Poids léger F - Finale", date: "2026-11-14", time: "20:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 9,
    name: "Cyclisme sur route",
    category: "competition",
    emoji: "🚴",
    image: "/assets/sports/cyclisme.jpg",
    color: "#06FFA5",
    gradient: "linear-gradient(135deg, #06FFA5 0%, #00CC88 100%)",
    venue: "Circuit Dakar-Saly",
    description: "Course sur route panoramique le long de la côte",
    videoUrl: "https://www.youtube.com/embed/MdNb-_5_xqI",
    events: [
      { id: 901, title: "Course en ligne Hommes", date: "2026-11-07", time: "08:00", phase: "Finale", gender: "H" },
      { id: 902, title: "Course en ligne Femmes", date: "2026-11-07", time: "13:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 10,
    name: "Rugby à sept",
    category: "competition",
    emoji: "🏉",
    image: "/assets/sports/rugby.jpg",
    color: "#2D6A4F",
    gradient: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
    venue: "Stade Demba Diop, Dakar",
    description: "Rugby rapide et intense à 7 joueurs",
    videoUrl: "https://www.youtube.com/embed/Kv0IYZBFQ2w",
    events: [
      { id: 1001, title: "Tournoi Hommes - Demi-finales", date: "2026-11-12", time: "15:00", phase: "Demi-finale", gender: "H" },
      { id: 1002, title: "Tournoi Femmes - Finale", date: "2026-11-13", time: "17:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 11,
    name: "Skateboard",
    category: "competition",
    emoji: "🛹",
    image: "/assets/sports/skateboard.jpg",
    color: "#F72585",
    gradient: "linear-gradient(135deg, #F72585 0%, #B5179E 100%)",
    venue: "Skatepark urbain Diamniadio",
    description: "Street et park - Culture urbaine au rendez-vous",
    videoUrl: "https://www.youtube.com/embed/RTBLoCBZDfg",
    events: [
      { id: 1101, title: "Street Hommes - Finale", date: "2026-11-08", time: "16:00", phase: "Finale", gender: "H" },
      { id: 1102, title: "Park Femmes - Finale", date: "2026-11-09", time: "15:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 12,
    name: "Natation",
    category: "competition",
    emoji: "🏊",
    image: "/assets/sports/natation.jpg",
    color: "#4CC9F0",
    gradient: "linear-gradient(135deg, #4CC9F0 0%, #3A8FB7 100%)",
    venue: "Centre Aquatique Olympique, Diamniadio",
    description: "Nage libre, dos, brasse, papillon et relais",
    videoUrl: "https://www.youtube.com/embed/RHIxPM-wVvE",
    events: [
      { id: 1201, title: "50m nage libre H - Finale", date: "2026-11-06", time: "18:00", phase: "Finale", gender: "H" },
      { id: 1202, title: "100m papillon F - Finale", date: "2026-11-07", time: "18:30", phase: "Finale", gender: "F" },
      { id: 1203, title: "Relais 4x100m Mixte", date: "2026-11-08", time: "19:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 13,
    name: "Taekwondo",
    category: "competition",
    emoji: "🥋",
    image: "/assets/sports/taekwondo.jpg",
    color: "#F94144",
    gradient: "linear-gradient(135deg, #F94144 0%, #D62828 100%)",
    venue: "Dojang National, Dakar",
    description: "Art martial coréen spectaculaire",
    videoUrl: "https://www.youtube.com/embed/tMB-m6dI4vM",
    events: [
      { id: 1301, title: "-55kg Hommes - Finale", date: "2026-11-11", time: "16:00", phase: "Finale", gender: "H" },
      { id: 1302, title: "-49kg Femmes - Finale", date: "2026-11-11", time: "17:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 14,
    name: "Tennis de table",
    category: "competition",
    emoji: "🏓",
    image: "/assets/sports/tennis-table.jpg",
    color: "#F77F00",
    gradient: "linear-gradient(135deg, #F77F00 0%, #D62828 100%)",
    venue: "Palais des Sports, Dakar",
    description: "Ping-pong de haut niveau et réflexes fulgurants",
    videoUrl: "https://www.youtube.com/embed/eU_5FkTgfRc",
    events: [
      { id: 1401, title: "Simple Hommes - Finale", date: "2026-11-13", time: "15:00", phase: "Finale", gender: "H" },
      { id: 1402, title: "Simple Femmes - Finale", date: "2026-11-13", time: "16:30", phase: "Finale", gender: "F" },
      { id: 1403, title: "Double Mixte - Finale", date: "2026-11-14", time: "14:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 15,
    name: "Tir à l'arc",
    category: "competition",
    emoji: "🏹",
    image: "/assets/sports/tir-arc.jpg",
    color: "#8338EC",
    gradient: "linear-gradient(135deg, #8338EC 0%, #5A189A 100%)",
    venue: "Champ de tir, Diamniadio",
    description: "Précision et concentration extrême",
    videoUrl: "https://www.youtube.com/embed/hfT7cHqLZ-w",
    events: [
      { id: 1501, title: "Individuel Hommes - Finale", date: "2026-11-10", time: "14:00", phase: "Finale", gender: "H" },
      { id: 1502, title: "Individuel Femmes - Finale", date: "2026-11-10", time: "16:00", phase: "Finale", gender: "F" },
      { id: 1503, title: "Équipe Mixte - Finale", date: "2026-11-11", time: "15:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 16,
    name: "Triathlon",
    category: "competition",
    emoji: "🏊‍♂️🚴‍♀️🏃",
    image: "/assets/sports/triathlon.jpg",
    color: "#FF006E",
    gradient: "linear-gradient(135deg, #FF006E 0%, #8338EC 100%)",
    venue: "Parcours Dakar (natation, vélo, course)",
    description: "Triple défi : nage, vélo, course à pied",
    videoUrl: "https://www.youtube.com/embed/4aFHZXlj364",
    events: [
      { id: 1601, title: "Triathlon Hommes", date: "2026-11-15", time: "07:00", phase: "Finale", gender: "H" },
      { id: 1602, title: "Triathlon Femmes", date: "2026-11-15", time: "10:00", phase: "Finale", gender: "F" },
      { id: 1603, title: "Relais Mixte", date: "2026-11-16", time: "08:00", phase: "Finale", gender: "Mixte" },
    ]
  },
  {
    id: 17,
    name: "Planche à voile",
    category: "competition",
    emoji: "🏄",
    image: "/assets/sports/planche-voile.jpg",
    color: "#06D6A0",
    gradient: "linear-gradient(135deg, #06D6A0 0%, #1B9AAA 100%)",
    venue: "Plage de Ngor, Dakar",
    description: "Surf et voile combinés sur l'océan Atlantique",
    videoUrl: "https://www.youtube.com/embed/lq6Qv_2xmR8",
    events: [
      { id: 1701, title: "Course Hommes", date: "2026-11-12", time: "10:00", phase: "Finale", gender: "H" },
      { id: 1702, title: "Course Femmes", date: "2026-11-12", time: "13:00", phase: "Finale", gender: "F" },
    ]
  },
  {
    id: 18,
    name: "Wushu",
    category: "competition",
    emoji: "🐉",
    image: "/assets/sports/wushu.jpg",
    color: "#D00000",
    gradient: "linear-gradient(135deg, #D00000 0%, #9D0208 100%)",
    venue: "Salle d'arts martiaux, Dakar",
    description: "Arts martiaux chinois traditionnels - Nouvelle discipline!",
    videoUrl: "https://www.youtube.com/embed/fW8BHTVvP9c",
    events: [
      { id: 1801, title: "Taolu Hommes", date: "2026-11-14", time: "10:00", phase: "Finale", gender: "H" },
      { id: 1802, title: "Taolu Femmes", date: "2026-11-14", time: "13:00", phase: "Finale", gender: "F" },
    ]
  },
  // Programme de mobilisation (10 sports)
  {
    id: 19,
    name: "Canoë-kayak",
    category: "mobilisation",
    emoji: "🛶",
    color: "#118AB2",
    gradient: "linear-gradient(135deg, #118AB2 0%, #073B4C 100%)",
    venue: "Lac de Guiers",
    description: "Activité interactive de découverte du canoë-kayak",
    events: []
  },
  {
    id: 20,
    name: "Escalade",
    category: "mobilisation",
    emoji: "🧗",
    color: "#EF476F",
    gradient: "linear-gradient(135deg, #EF476F 0%, #C1121F 100%)",
    venue: "Mur d'escalade urbain, Dakar",
    description: "Initiation et ateliers d'escalade pour tous",
    events: []
  },
  {
    id: 21,
    name: "Golf",
    category: "mobilisation",
    emoji: "⛳",
    color: "#06D6A0",
    gradient: "linear-gradient(135deg, #06D6A0 0%, #1B9AAA 100%)",
    venue: "Golf Club de Dakar",
    description: "Découverte du golf avec des professionnels",
    events: []
  },
  {
    id: 22,
    name: "Haltérophilie",
    category: "mobilisation",
    emoji: "🏋️",
    color: "#FF9E00",
    gradient: "linear-gradient(135deg, #FF9E00 0%, #FF6D00 100%)",
    venue: "Centre de force athlétique",
    description: "Initiation à l'haltérophilie et démonstrations",
    events: []
  },
  {
    id: 23,
    name: "Hockey sur gazon",
    category: "mobilisation",
    emoji: "🏑",
    color: "#2EC4B6",
    gradient: "linear-gradient(135deg, #2EC4B6 0%, #1A936F 100%)",
    venue: "Terrain synthétique, Diamniadio",
    description: "Matchs amicaux et ateliers techniques",
    events: []
  },
  {
    id: 24,
    name: "Karaté",
    category: "mobilisation",
    emoji: "🥋",
    color: "#E71D36",
    gradient: "linear-gradient(135deg, #E71D36 0%, #C1121F 100%)",
    venue: "Dojo communautaire",
    description: "Démonstrations de kata et initiations",
    events: []
  },
  {
    id: 25,
    name: "Pentathlon moderne",
    category: "mobilisation",
    emoji: "⚔️",
    color: "#9B5DE5",
    gradient: "linear-gradient(135deg, #9B5DE5 0%, #6A4C93 100%)",
    venue: "Complexe multisports",
    description: "Découverte des 5 disciplines du pentathlon",
    events: []
  },
  {
    id: 26,
    name: "Surf",
    category: "mobilisation",
    emoji: "🏄‍♂️",
    image: "/assets/sports/surf.jpg",
    color: "#00BBF9",
    gradient: "linear-gradient(135deg, #00BBF9 0%, #0077B6 100%)",
    venue: "Plage de Yoff",
    description: "Cours de surf et sensibilisation océanique",
    events: []
  },
  {
    id: 27,
    name: "Tennis",
    category: "mobilisation",
    emoji: "🎾",
    color: "#FFBE0B",
    gradient: "linear-gradient(135deg, #FFBE0B 0%, #FB8500 100%)",
    venue: "Courts de tennis municipaux",
    description: "Initiations et mini-tournois",
    events: []
  },
  {
    id: 28,
    name: "Tir",
    category: "mobilisation",
    emoji: "🎯",
    color: "#8D99AE",
    gradient: "linear-gradient(135deg, #8D99AE 0%, #2B2D42 100%)",
    venue: "Stand de tir sportif",
    description: "Découverte du tir de précision",
    events: []
  },
];

export const getCompetitionSports = () => joj2026Sports.filter(s => s.category === "competition");
export const getMobilisationSports = () => joj2026Sports.filter(s => s.category === "mobilisation");
export const getSportById = (id: number) => joj2026Sports.find(s => s.id === id);

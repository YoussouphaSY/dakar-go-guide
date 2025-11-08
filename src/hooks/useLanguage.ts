/**
 * Hook : useLanguage
 * 
 * Description :
 * Gestion centralisée du multilingue dans l'application
 * 
 * Fonctionnalités :
 * - Stockage persistant de la langue sélectionnée (localStorage via Zustand)
 * - Support de 3 langues : Français (fr), Anglais (en), Wolof (wo)
 * - Traductions pour toutes les interfaces clés
 * - Fonction t() pour accéder facilement aux traductions
 * 
 * Langues supportées :
 * - fr : Français (par défaut)
 * - en : English
 * - wo : Wolof (langue locale sénégalaise)
 * 
 * Utilisation :
 * const { language, setLanguage, t } = useLanguage();
 * <h1>{t.museum.title}</h1>
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type des langues supportées
type Language = 'fr' | 'en' | 'wo';

// Interface du store Zustand
interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * Store Zustand avec persistance dans localStorage
 * La langue sélectionnée est sauvegardée et restaurée automatiquement
 */
const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr', // Langue par défaut : français
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage', // Clé dans localStorage
    }
  )
);

/**
 * Dictionnaire de traductions
 * Structure : { langue: { section: { clé: "valeur" } } }
 * 
 * Sections :
 * - common : Textes communs (boutons, actions)
 * - museum : Interface du musée 3D
 * - oeuvre : Détails des œuvres d'art
 */
const translations = {
  // FRANÇAIS
  fr: {
    common: {
      back: "Retour",
      close: "Fermer",
      save: "Enregistrer",
      cancel: "Annuler",
      search: "Rechercher",
      filter: "Filtrer",
    },
    home: {
      title: "Bienvenue à Dakar",
      subtitle: "Votre guide intelligent pour les JOJ 2026 et la découverte de Dakar",
      yog2026: "Jeux Olympiques de la Jeunesse 2026",
      programButton: "Programme des Jeux",
      discoverButton: "Découvrir Dakar",
      featuresTitle: "Jeux Olympiques de la Jeunesse",
      featuresSubtitle: "Suivez tous les événements sportifs en direct",
      programCard: "Programme",
      programDesc: "Calendrier complet des compétitions avec filtres par sport et lieu",
      resultsCard: "Résultats Live",
      resultsDesc: "Scores en temps réel, classements et tableau des médailles",
      assistantCard: "Assistant IA",
      assistantDesc: "Questions en français, wolof, anglais ou pulaar",
      profileCard: "Mon Profil",
      profileDesc: "Personnalisez vos préférences et notifications",
      tourismTitle: "Découvrez Dakar",
      tourismSubtitle: "Explorez la ville pendant votre séjour",
      restaurants: "Restaurants",
      restaurantsDesc: "Découvrez la gastronomie sénégalaise authentique",
      attractions: "Attractions",
      attractionsDesc: "Monuments, musées et sites historiques incontournables",
      transport: "Transport",
      transportDesc: "Infos trafic et moyens de transport en temps réel",
      viewMapButton: "Voir la Carte Interactive",
      ctaTitle: "Vivez Dakar 2026 pleinement",
      ctaSubtitle: "Assistant intelligent, résultats live, guide touristique - Tout en un seul endroit",
      talkToAssistant: "Parler à l'Assistant",
      createProfile: "Créer mon Profil",
    },
    events: {
      title: "Programme JOJ 2026",
      subtitle: "25 sports en compétition + 10 activités de mobilisation",
      events: "épreuves",
      venues: "Dakar, Diamniadio, Saly",
      searchPlaceholder: "Rechercher un sport...",
      filterByVenue: "Filtrer par lieu",
      allVenues: "Tous les lieux",
      competition: "Compétition",
      mobilisation: "Mobilisation",
      viewCalendar: "Voir le calendrier",
      learnMore: "En savoir plus",
      noResults: "Aucun sport trouvé avec ces critères",
    },
    discover: {
      title: "Découvrir Dakar",
      subtitle: "Explorez les meilleurs endroits de la ville pendant votre séjour",
      restaurants: "Restaurants",
      attractions: "Attractions",
      transport: "Transport",
      searchPlaceholder: "Rechercher un lieu...",
      goThere: "Y aller",
      trafficTitle: "Trafic en Temps Réel",
      fluid: "Fluide",
      moderate: "Modéré",
      dense: "Dense",
      downtown: "Centre-ville",
      plateau: "Plateau",
    },
    museum: {
      title: "Musée des Civilisations Noires - Visite 3D",
      loading: "Chargement du musée...",
      controls: "Contrôles",
      move: "Se déplacer: Cliquer-glisser",
      zoom: "Zoom: Molette",
      rotate: "Rotation: Cliquer droit-glisser",
      artworks: "Œuvres",
      map: "Plan",
    },
    oeuvre: {
      details: "Détails de l'œuvre",
      description: "Description",
      history: "Histoire",
      artist: "Artiste",
      period: "Période",
      room: "Salle",
      dimensions: "Dimensions",
      material: "Matériau",
      playAudio: "Écouter le guide audio",
      pauseAudio: "Mettre en pause",
      addToFavorites: "Ajouté aux favoris",
      removeFromFavorites: "Retiré des favoris",
    },
  },
  // ANGLAIS
  en: {
    common: {
      back: "Back",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      search: "Search",
      filter: "Filter",
    },
    home: {
      title: "Welcome to Dakar",
      subtitle: "Your smart guide for YOG 2026 and discovering Dakar",
      yog2026: "Youth Olympic Games 2026",
      programButton: "Games Program",
      discoverButton: "Discover Dakar",
      featuresTitle: "Youth Olympic Games",
      featuresSubtitle: "Follow all sports events live",
      programCard: "Program",
      programDesc: "Complete competition schedule with filters by sport and venue",
      resultsCard: "Live Results",
      resultsDesc: "Real-time scores, rankings and medal table",
      assistantCard: "AI Assistant",
      assistantDesc: "Questions in French, Wolof, English or Pulaar",
      profileCard: "My Profile",
      profileDesc: "Customize your preferences and notifications",
      tourismTitle: "Discover Dakar",
      tourismSubtitle: "Explore the city during your stay",
      restaurants: "Restaurants",
      restaurantsDesc: "Discover authentic Senegalese cuisine",
      attractions: "Attractions",
      attractionsDesc: "Monuments, museums and unmissable historical sites",
      transport: "Transport",
      transportDesc: "Traffic info and real-time transportation options",
      viewMapButton: "View Interactive Map",
      ctaTitle: "Experience Dakar 2026 Fully",
      ctaSubtitle: "Smart assistant, live results, tourist guide - All in one place",
      talkToAssistant: "Talk to Assistant",
      createProfile: "Create My Profile",
    },
    events: {
      title: "YOG 2026 Program",
      subtitle: "25 competition sports + 10 mobilisation activities",
      events: "events",
      venues: "Dakar, Diamniadio, Saly",
      searchPlaceholder: "Search for a sport...",
      filterByVenue: "Filter by venue",
      allVenues: "All venues",
      competition: "Competition",
      mobilisation: "Mobilisation",
      viewCalendar: "View calendar",
      learnMore: "Learn more",
      noResults: "No sports found with these criteria",
    },
    discover: {
      title: "Discover Dakar",
      subtitle: "Explore the best places in the city during your stay",
      restaurants: "Restaurants",
      attractions: "Attractions",
      transport: "Transport",
      searchPlaceholder: "Search for a place...",
      goThere: "Get directions",
      trafficTitle: "Real-Time Traffic",
      fluid: "Fluid",
      moderate: "Moderate",
      dense: "Heavy",
      downtown: "Downtown",
      plateau: "Plateau",
    },
    museum: {
      title: "Museum of Black Civilizations - 3D Tour",
      loading: "Loading museum...",
      controls: "Controls",
      move: "Move: Click-drag",
      zoom: "Zoom: Mouse wheel",
      rotate: "Rotate: Right-click-drag",
      artworks: "Artworks",
      map: "Map",
    },
    oeuvre: {
      details: "Artwork Details",
      description: "Description",
      history: "History",
      artist: "Artist",
      period: "Period",
      room: "Room",
      dimensions: "Dimensions",
      material: "Material",
      playAudio: "Play audio guide",
      pauseAudio: "Pause",
      addToFavorites: "Added to favorites",
      removeFromFavorites: "Removed from favorites",
    },
  },
  // WOLOF (langue locale sénégalaise)
  wo: {
    common: {
      back: "Dellu",
      close: "Téye",
      save: "Yokk",
      cancel: "Bàyyi",
      search: "Seet",
      filter: "Tëriit",
    },
    home: {
      title: "Dalal ak Dakar",
      subtitle: "Sa guide bu xam-xam ci JOJ 2026 ak xéetukaay Dakar",
      yog2026: "Jeux Olympiques ci Ndaw-ndaw 2026",
      programButton: "Programme yi",
      discoverButton: "Xéetu Dakar",
      featuresTitle: "Jeux Olympiques ci Ndaw-ndaw",
      featuresSubtitle: "Xool ay liggéey sport ci waxtu yi",
      programCard: "Programme",
      programDesc: "Kalendriye bu mat ak filtre ci sport ak bërëb",
      resultsCard: "Résultats Live",
      resultsDesc: "Scores ci waxtu, classement ak tableau médailles",
      assistantCard: "Assistant IA",
      assistantDesc: "Laaj ci wolof, français, anglais wala pulaar",
      profileCard: "Sama Profil",
      profileDesc: "Soppi sa préférences ak notifications",
      tourismTitle: "Xéetu Dakar",
      tourismSubtitle: "Xool dëkk bi ci sa séjour",
      restaurants: "Restaurants",
      restaurantsDesc: "Xéetu cuisine sénégalaise bu dëgg",
      attractions: "Attractions",
      attractionsDesc: "Monuments, musées ak sites historiques",
      transport: "Transport",
      transportDesc: "Info circulation ak transport ci waxtu yi",
      viewMapButton: "Xool Carte Interactive",
      ctaTitle: "Daññu Dakar 2026 ci yoon wi",
      ctaSubtitle: "Assistant bu xam-xam, résultats live, guide touristique",
      talkToAssistant: "Wax ak Assistant",
      createProfile: "Defar sama Profil",
    },
    events: {
      title: "Programme JOJ 2026",
      subtitle: "25 sport compétition + 10 mobilisation",
      events: "compétition",
      venues: "Dakar, Diamniadio, Saly",
      searchPlaceholder: "Seet ab sport...",
      filterByVenue: "Tëriit ci bërëb",
      allVenues: "Lépp bërëb",
      competition: "Compétition",
      mobilisation: "Mobilisation",
      viewCalendar: "Xool calendrier",
      learnMore: "Jàng ci",
      noResults: "Amul sport ci critères yi",
    },
    discover: {
      title: "Xéetu Dakar",
      subtitle: "Xool bërëb yu baax ci dëkk bi ci sa séjour",
      restaurants: "Restaurants",
      attractions: "Attractions",
      transport: "Transport",
      searchPlaceholder: "Seet ab bërëb...",
      goThere: "Dem fii",
      trafficTitle: "Circulation ci Waxtu yi",
      fluid: "Bu baax",
      moderate: "Modéré",
      dense: "Bu yees",
      downtown: "Centre-ville",
      plateau: "Plateau",
    },
    museum: {
      title: "Musée Civilisations Ñuul - Xool 3D",
      loading: "Dafa la defar musée...",
      controls: "Contrôles",
      move: "Déplacer: Bësal-téral",
      zoom: "Zoom: Molette",
      rotate: "Wëriñ: Bësal njariñ-téral",
      artworks: "Liggéey",
      map: "Plan",
    },
    oeuvre: {
      details: "Détail Liggéey",
      description: "Taalif",
      history: "Tarix",
      artist: "Artiste",
      period: "Période",
      room: "Néeg",
      dimensions: "Tànn",
      material: "Njàkk",
      playAudio: "Dégluwaat guide audio",
      pauseAudio: "Taxaw",
      addToFavorites: "Yokk ci favoris",
      removeFromFavorites: "Jëlle ci favoris",
    },
  },
};

/**
 * Hook principal exporté
 * 
 * Retourne :
 * - language : Langue actuellement sélectionnée
 * - setLanguage : Fonction pour changer la langue
 * - t : Objet de traductions pour la langue active
 * 
 * Exemple d'utilisation :
 * const { language, setLanguage, t } = useLanguage();
 * console.log(t.common.back); // "Retour" si language === 'fr'
 */
export const useLanguage = () => {
  const { language, setLanguage } = useLanguageStore();
  return {
    language,        // Langue active ('fr' | 'en' | 'wo')
    setLanguage,     // Fonction pour changer la langue
    t: translations[language], // Traductions de la langue active
  };
};

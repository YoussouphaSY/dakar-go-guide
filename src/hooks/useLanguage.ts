import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'fr' | 'en' | 'wo';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) => set({ language }),
    }),
    { name: 'language-storage' }
  )
);

const translations = {
  fr: {
    common: {
      back: "Retour", close: "Fermer", save: "Enregistrer", cancel: "Annuler", search: "Rechercher", filter: "Filtrer",
    },
    nav: {
      home: "Accueil", events: "Événements", results: "Résultats", discover: "Découvrir",
      virtualTour: "Visite Virtuelle", records: "Records", assistant: "AYO Chat",
      login: "Connexion", logout: "Déconnexion", profile: "Profil", language: "Langue",
      loggedOut: "Déconnecté", loggedOutDesc: "À bientôt aux JOJ Dakar 2026!",
    },
    home: {
      title: "Bienvenue à Dakar", subtitle: "Votre guide intelligent pour les JOJ 2026 et la découverte de Dakar",
      yog2026: "Jeux Olympiques de la Jeunesse 2026", programButton: "Programme des Jeux", discoverButton: "Découvrir Dakar",
      featuresTitle: "Jeux Olympiques de la Jeunesse", featuresSubtitle: "Suivez tous les événements sportifs en direct",
      programCard: "Programme", programDesc: "Calendrier complet des compétitions avec filtres par sport et lieu",
      resultsCard: "Résultats Live", resultsDesc: "Scores en temps réel, classements et tableau des médailles",
      assistantCard: "Assistant IA", assistantDesc: "Questions en français, wolof, anglais ou pulaar",
      profileCard: "Mon Profil", profileDesc: "Personnalisez vos préférences et notifications",
      tourismTitle: "Découvrez Dakar", tourismSubtitle: "Explorez la ville pendant votre séjour",
      restaurants: "Restaurants", restaurantsDesc: "Découvrez la gastronomie sénégalaise authentique",
      attractions: "Attractions", attractionsDesc: "Monuments, musées et sites historiques incontournables",
      transport: "Transport", transportDesc: "Infos trafic et moyens de transport en temps réel",
      viewMapButton: "Voir la Carte Interactive",
      ctaTitle: "Vivez Dakar 2026 pleinement", ctaSubtitle: "Assistant intelligent, résultats live, guide touristique - Tout en un seul endroit",
      talkToAssistant: "Parler à l'Assistant", createProfile: "Créer mon Profil",
    },
    events: {
      title: "Programme JOJ 2026", subtitle: "25 sports en compétition + 10 activités de mobilisation",
      events: "épreuves", venues: "Dakar, Diamniadio, Saly", searchPlaceholder: "Rechercher un sport...",
      filterByVenue: "Filtrer par lieu", allVenues: "Tous les lieux",
      competition: "Compétition", mobilisation: "Mobilisation",
      viewCalendar: "Voir le calendrier", learnMore: "En savoir plus", noResults: "Aucun sport trouvé avec ces critères",
    },
    discover: {
      title: "Découvrir Dakar", subtitle: "Explorez les meilleurs endroits de la ville pendant votre séjour",
      restaurants: "Restaurants", attractions: "Attractions", transport: "Transport",
      searchPlaceholder: "Rechercher un lieu...", goThere: "Y aller",
      trafficTitle: "Trafic en Temps Réel", fluid: "Fluide", moderate: "Modéré", dense: "Dense",
      downtown: "Centre-ville", plateau: "Plateau",
    },
    museum: {
      title: "Musée des Civilisations Noires - Visite 3D", loading: "Chargement du musée...",
      controls: "Contrôles", move: "Se déplacer: Cliquer-glisser", zoom: "Zoom: Molette",
      rotate: "Rotation: Cliquer droit-glisser", artworks: "Œuvres", map: "Plan",
    },
    oeuvre: {
      details: "Détails de l'œuvre", description: "Description", history: "Histoire", artist: "Artiste",
      period: "Période", room: "Salle", dimensions: "Dimensions", material: "Matériau",
      playAudio: "Écouter le guide audio", pauseAudio: "Mettre en pause",
      addToFavorites: "Ajouté aux favoris", removeFromFavorites: "Retiré des favoris",
    },
    records: {
      title: "Records Olympiques", subtitle: "Les performances légendaires qui ont marqué l'histoire",
      youth: "Records Jeunesse", youthShort: "Jeunesse",
      athletics: "Athlétisme", athleticsShort: "Athlé",
      swimming: "Natation", swimmingShort: "Natation",
      holder: "Détenteur", didYouKnow: "Le saviez-vous ?",
      factSpeed: "Vitesse maximale", factSpeedDesc: "Usain Bolt a atteint 44.72 km/h lors de son record du 100m – plus rapide qu'une voiture en ville !",
      factSwim: "Nage la plus rapide", factSwimDesc: "Le record du 50m nage libre équivaut à nager à environ 8.5 km/h – une vitesse incroyable dans l'eau !",
      factYoungest: "Plus jeune champion", factYoungestDesc: "Le plus jeune médaillé d'or olympique avait seulement 13 ans – l'âge de beaucoup de participants aux JOJ 2026 !",
      factAfrica: "Records africains", factAfricaDesc: "L'Afrique détient plusieurs records mondiaux en athlétisme, notamment en course de fond – une fierté pour le continent !",
    },
    results: {
      title: "Résultats des Épreuves", subtitle: "Suivez tous les résultats sportifs des JOJ Dakar 2026",
      searchPlaceholder: "Rechercher un sport ou épreuve...", allStatuses: "Tous les statuts",
      allSports: "Tous les sports", finished: "Terminé", live: "En direct", scheduled: "Programmé",
      totalEvents: "Épreuves totales", sports: "Sports", liveNow: "En direct", completed: "Terminés",
      loading: "Chargement des résultats...", noResults: "Aucun résultat trouvé", events: "épreuves",
    },
    assistant: {
      subtitle: "Expert en culture sénégalaise et JOJ 2026",
      placeholder: "Posez votre question...",
      autoOn: "Lecture auto activée", autoOff: "Lecture auto désactivée",
      goree: "Histoire de Gorée", goreeDesc: "Découvrez le patrimoine UNESCO",
      program: "Programme JOJ 2026", programDesc: "Tous les sports olympiques",
      culture: "Culture Sénégalaise", cultureDesc: "Teranga et traditions",
    },
  },
  en: {
    common: {
      back: "Back", close: "Close", save: "Save", cancel: "Cancel", search: "Search", filter: "Filter",
    },
    nav: {
      home: "Home", events: "Events", results: "Results", discover: "Discover",
      virtualTour: "Virtual Tour", records: "Records", assistant: "AYO Chat",
      login: "Login", logout: "Logout", profile: "Profile", language: "Language",
      loggedOut: "Logged out", loggedOutDesc: "See you at YOG Dakar 2026!",
    },
    home: {
      title: "Welcome to Dakar", subtitle: "Your smart guide for YOG 2026 and discovering Dakar",
      yog2026: "Youth Olympic Games 2026", programButton: "Games Program", discoverButton: "Discover Dakar",
      featuresTitle: "Youth Olympic Games", featuresSubtitle: "Follow all sports events live",
      programCard: "Program", programDesc: "Complete competition schedule with filters by sport and venue",
      resultsCard: "Live Results", resultsDesc: "Real-time scores, rankings and medal table",
      assistantCard: "AI Assistant", assistantDesc: "Questions in French, Wolof, English or Pulaar",
      profileCard: "My Profile", profileDesc: "Customize your preferences and notifications",
      tourismTitle: "Discover Dakar", tourismSubtitle: "Explore the city during your stay",
      restaurants: "Restaurants", restaurantsDesc: "Discover authentic Senegalese cuisine",
      attractions: "Attractions", attractionsDesc: "Monuments, museums and unmissable historical sites",
      transport: "Transport", transportDesc: "Traffic info and real-time transportation options",
      viewMapButton: "View Interactive Map",
      ctaTitle: "Experience Dakar 2026 Fully", ctaSubtitle: "Smart assistant, live results, tourist guide - All in one place",
      talkToAssistant: "Talk to Assistant", createProfile: "Create My Profile",
    },
    events: {
      title: "YOG 2026 Program", subtitle: "25 competition sports + 10 mobilisation activities",
      events: "events", venues: "Dakar, Diamniadio, Saly", searchPlaceholder: "Search for a sport...",
      filterByVenue: "Filter by venue", allVenues: "All venues",
      competition: "Competition", mobilisation: "Mobilisation",
      viewCalendar: "View calendar", learnMore: "Learn more", noResults: "No sports found with these criteria",
    },
    discover: {
      title: "Discover Dakar", subtitle: "Explore the best places in the city during your stay",
      restaurants: "Restaurants", attractions: "Attractions", transport: "Transport",
      searchPlaceholder: "Search for a place...", goThere: "Get directions",
      trafficTitle: "Real-Time Traffic", fluid: "Fluid", moderate: "Moderate", dense: "Heavy",
      downtown: "Downtown", plateau: "Plateau",
    },
    museum: {
      title: "Museum of Black Civilizations - 3D Tour", loading: "Loading museum...",
      controls: "Controls", move: "Move: Click-drag", zoom: "Zoom: Mouse wheel",
      rotate: "Rotate: Right-click-drag", artworks: "Artworks", map: "Map",
    },
    oeuvre: {
      details: "Artwork Details", description: "Description", history: "History", artist: "Artist",
      period: "Period", room: "Room", dimensions: "Dimensions", material: "Material",
      playAudio: "Play audio guide", pauseAudio: "Pause",
      addToFavorites: "Added to favorites", removeFromFavorites: "Removed from favorites",
    },
    records: {
      title: "Olympic Records", subtitle: "Legendary performances that made history",
      youth: "Youth Records", youthShort: "Youth",
      athletics: "Athletics", athleticsShort: "Athletics",
      swimming: "Swimming", swimmingShort: "Swimming",
      holder: "Holder", didYouKnow: "Did you know?",
      factSpeed: "Top speed", factSpeedDesc: "Usain Bolt reached 44.72 km/h during his 100m record – faster than a car in the city!",
      factSwim: "Fastest swim", factSwimDesc: "The 50m freestyle record is like swimming at about 8.5 km/h – an incredible speed in water!",
      factYoungest: "Youngest champion", factYoungestDesc: "The youngest Olympic gold medalist was only 13 – the age of many YOG 2026 participants!",
      factAfrica: "African records", factAfricaDesc: "Africa holds several world records in athletics, especially in distance running – a pride for the continent!",
    },
    results: {
      title: "Event Results", subtitle: "Follow all sports results of the Dakar 2026 YOG",
      searchPlaceholder: "Search for a sport or event...", allStatuses: "All statuses",
      allSports: "All sports", finished: "Finished", live: "Live", scheduled: "Scheduled",
      totalEvents: "Total events", sports: "Sports", liveNow: "Live now", completed: "Completed",
      loading: "Loading results...", noResults: "No results found", events: "events",
    },
    assistant: {
      subtitle: "Expert in Senegalese culture and YOG 2026",
      placeholder: "Ask your question...",
      autoOn: "Auto speech on", autoOff: "Auto speech off",
      goree: "History of Gorée", goreeDesc: "Discover the UNESCO heritage",
      program: "YOG 2026 Program", programDesc: "All Olympic sports",
      culture: "Senegalese Culture", cultureDesc: "Teranga and traditions",
    },
  },
  wo: {
    common: {
      back: "Dellu", close: "Téye", save: "Yokk", cancel: "Bàyyi", search: "Seet", filter: "Tëriit",
    },
    nav: {
      home: "Kër", events: "Événements", results: "Résultats", discover: "Xéetu",
      virtualTour: "Visite 3D", records: "Records", assistant: "AYO Chat",
      login: "Dugg", logout: "Génn", profile: "Profil", language: "Làkk",
      loggedOut: "Génn nga", loggedOutDesc: "Ba beneen yoon ci JOJ Dakar 2026!",
    },
    home: {
      title: "Dalal ak Dakar", subtitle: "Sa guide bu xam-xam ci JOJ 2026 ak xéetukaay Dakar",
      yog2026: "Jeux Olympiques ci Ndaw-ndaw 2026", programButton: "Programme yi", discoverButton: "Xéetu Dakar",
      featuresTitle: "Jeux Olympiques ci Ndaw-ndaw", featuresSubtitle: "Xool ay liggéey sport ci waxtu yi",
      programCard: "Programme", programDesc: "Kalendriye bu mat ak filtre ci sport ak bërëb",
      resultsCard: "Résultats Live", resultsDesc: "Scores ci waxtu, classement ak tableau médailles",
      assistantCard: "Assistant IA", assistantDesc: "Laaj ci wolof, français, anglais wala pulaar",
      profileCard: "Sama Profil", profileDesc: "Soppi sa préférences ak notifications",
      tourismTitle: "Xéetu Dakar", tourismSubtitle: "Xool dëkk bi ci sa séjour",
      restaurants: "Restaurants", restaurantsDesc: "Xéetu cuisine sénégalaise bu dëgg",
      attractions: "Attractions", attractionsDesc: "Monuments, musées ak sites historiques",
      transport: "Transport", transportDesc: "Info circulation ak transport ci waxtu yi",
      viewMapButton: "Xool Carte Interactive",
      ctaTitle: "Daññu Dakar 2026 ci yoon wi", ctaSubtitle: "Assistant bu xam-xam, résultats live, guide touristique",
      talkToAssistant: "Wax ak Assistant", createProfile: "Defar sama Profil",
    },
    events: {
      title: "Programme JOJ 2026", subtitle: "25 sport compétition + 10 mobilisation",
      events: "compétition", venues: "Dakar, Diamniadio, Saly", searchPlaceholder: "Seet ab sport...",
      filterByVenue: "Tëriit ci bërëb", allVenues: "Lépp bërëb",
      competition: "Compétition", mobilisation: "Mobilisation",
      viewCalendar: "Xool calendrier", learnMore: "Jàng ci", noResults: "Amul sport ci critères yi",
    },
    discover: {
      title: "Xéetu Dakar", subtitle: "Xool bërëb yu baax ci dëkk bi ci sa séjour",
      restaurants: "Restaurants", attractions: "Attractions", transport: "Transport",
      searchPlaceholder: "Seet ab bërëb...", goThere: "Dem fii",
      trafficTitle: "Circulation ci Waxtu yi", fluid: "Bu baax", moderate: "Modéré", dense: "Bu yees",
      downtown: "Centre-ville", plateau: "Plateau",
    },
    museum: {
      title: "Musée Civilisations Ñuul - Xool 3D", loading: "Dafa la defar musée...",
      controls: "Contrôles", move: "Déplacer: Bësal-téral", zoom: "Zoom: Molette",
      rotate: "Wëriñ: Bësal njariñ-téral", artworks: "Liggéey", map: "Plan",
    },
    oeuvre: {
      details: "Détail Liggéey", description: "Taalif", history: "Tarix", artist: "Artiste",
      period: "Période", room: "Néeg", dimensions: "Tànn", material: "Njàkk",
      playAudio: "Dégluwaat guide audio", pauseAudio: "Taxaw",
      addToFavorites: "Yokk ci favoris", removeFromFavorites: "Jëlle ci favoris",
    },
    records: {
      title: "Records Olympiques", subtitle: "Liggéey yu mag yi ci tariix sport",
      youth: "Records Ndaw-ndaw", youthShort: "Ndaw",
      athletics: "Athlétisme", athleticsShort: "Athlé",
      swimming: "Natation", swimmingShort: "Natation",
      holder: "Ku ko moom", didYouKnow: "Ndax xam nga?",
      factSpeed: "Gaaw bu gëna mag", factSpeedDesc: "Usain Bolt jëm 44.72 km/h ci record 100m bi – gaaw na ci voiture!",
      factSwim: "Natation bu gaaw", factSwimDesc: "Record 50m nage libre dafay togal nage ci 8.5 km/h – gaaw lool ci ndox!",
      factYoungest: "Champion bu ndaw", factYoungestDesc: "Champion olympique bu ndaw amoon na 13 ans – fukki at ak ñett lool!",
      factAfrica: "Records Afrique", factAfricaDesc: "Afrique am na ay records ci athlétisme, course de fond – fierté continent bi!",
    },
    results: {
      title: "Résultats Épreuves", subtitle: "Xool résultats sport JOJ Dakar 2026",
      searchPlaceholder: "Seet ab sport...", allStatuses: "Lépp statuts",
      allSports: "Lépp sports", finished: "Jeex na", live: "Direct", scheduled: "Programé",
      totalEvents: "Lépp épreuves", sports: "Sports", liveNow: "Direct léegi", completed: "Jeex nañu",
      loading: "Yéeg résultats...", noResults: "Amul résultat", events: "épreuves",
    },
    assistant: {
      subtitle: "Expert ci culture sénégalaise ak JOJ 2026",
      placeholder: "Laaj sa laaj...",
      autoOn: "Lecture auto", autoOff: "Manuel",
      goree: "Tariix Gorée", goreeDesc: "Xéetu patrimoine UNESCO",
      program: "Programme JOJ 2026", programDesc: "Lépp sport olympiques",
      culture: "Culture Sénégal", cultureDesc: "Teranga ak traditions",
    },
  },
};

export const useLanguage = () => {
  const { language, setLanguage } = useLanguageStore();
  return {
    language,
    setLanguage,
    t: translations[language],
  };
};

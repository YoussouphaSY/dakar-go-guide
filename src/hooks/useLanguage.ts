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

/**
 * Fichier : oeuvres.ts
 * 
 * Description :
 * Catalogue complet des œuvres d'art du Musée des Civilisations Noires
 * 
 * Contenu :
 * - 6 œuvres principales avec informations multilingues (FR, EN, WO)
 * - Métadonnées : titre, artiste, période, catégorie, salle
 * - Descriptions et histoires détaillées
 * - Ressources médias : images, audio, vidéo
 * - Coordonnées 3D pour positionnement dans le musée virtuel
 * 
 * Œuvres incluses :
 * 1. Masque Ceremonial Bamana (Mali, XIXe)
 * 2. Statuette Féminine Sénoufo (Côte d'Ivoire, XXe)
 * 3. Textile Kente Royal (Ghana, XXe)
 * 4. Buste Commémoratif Ifé (Nigeria, XIIe-XVe)
 * 5. Trône Bamiléké (Cameroun, XIXe)
 * 6. Masque Punu (Gabon, XXe)
 * 
 * Utilisation :
 * Importé dans les composants Museum3D et ArtworkDetailModal
 */

import type { Oeuvre } from '../types/schema';

/**
 * Tableau principal des œuvres du musée
 * Chaque œuvre contient :
 * - id : Identifiant unique
 * - title : Titre multilingue { fr, en, wo }
 * - artist : Nom de l'artiste/artisan
 * - period : Période historique
 * - category : Type d'œuvre (Sculpture, Textile, etc.)
 * - room : Salle du musée
 * - description : Description multilingue
 * - history : Histoire et contexte multilingue
 * - images : Tableau de chemins d'images
 * - audioUrl : Chemin du guide audio (optionnel)
 * - videoUrl : Chemin de la vidéo explicative (optionnel)
 * - qrCode : Code QR pour identification physique
 * - dimensions : Dimensions physiques
 * - material : Matériaux utilisés
 * - coordinates : Position 3D dans le musée virtuel { x, y }
 */
export const oeuvres: Oeuvre[] = [
  // ŒUVRE 1 : Masque Ceremonial Bamana
  // Origine : Mali, peuple Bamana
  // Utilisation : Rituels d'initiation
  {
    id: "oeuvre-1",
    title: {
      fr: "Masque Ceremonial Bamana",
      en: "Bamana Ceremonial Mask",
      wo: "Masque Bamana"
    },
    artist: "Artisan Bamana",
    period: "XIXe siècle",
    category: "Sculpture",
    room: "Salle 1 - Art Mandingue",
    description: {
      fr: "Masque cérémonial traditionnel du peuple Bamana, utilisé lors des rituels d'initiation. Sculpté dans du bois de fromager, ce masque représente l'esprit ancestral protecteur.",
      en: "Traditional ceremonial mask of the Bamana people, used during initiation rituals. Carved from ceiba wood, this mask represents the protective ancestral spirit.",
      wo: "Masque traditional ci Bamana, nga def ci ceremonii initiation. Nga saf ci garab ceiba, masque bi wax na esprit ancestral bu gëna yokk."
    },
    history: {
      fr: "Ce masque a été collecté au Mali en 1892. Il témoigne de la richesse des traditions Bamana et de leur système de croyances complexe lié aux masques rituels.",
      en: "This mask was collected in Mali in 1892. It testifies to the richness of Bamana traditions and their complex belief system related to ritual masks.",
      wo: "Masque bi, nga jàpp ko ci Mali ci 1892. Dafa wax tradition Bamana yi ak système croyance bu gëna yàgg."
    },
    images: ["/assets/oeuvres/muse2.jpg", "/assets/oeuvres/muse3.jpg"],
    audioUrl: "/assets/audio/masque-bamana.mp3",
    qrCode: "MCN-001",
    dimensions: "45 x 25 x 18 cm",
    material: "Bois de fromager, pigments naturels",
    coordinates: { x: -8, y: 2 }
  },
  // ŒUVRE 2 : Statuette Féminine Sénoufo
  // Origine : Côte d'Ivoire, peuple Sénoufo
  // Symbolisme : Fertilité et continuité
  {
    id: "oeuvre-2",
    title: {
      fr: "Statuette Féminine Sénoufo",
      en: "Senufo Female Statuette",
      wo: "Statuette Jigéen Sénoufo"
    },
    artist: "Artisan Sénoufo",
    period: "XXe siècle",
    category: "Sculpture",
    room: "Salle 1 - Art Mandingue",
    description: {
      fr: "Statuette représentant une figure féminine Sénoufo, symbole de fertilité et de continuité de la lignée. Les Sénoufo sont réputés pour leurs sculptures aux formes élégantes.",
      en: "Statuette representing a Senufo female figure, symbol of fertility and lineage continuity. The Senufo are renowned for their sculptures with elegant forms.",
      wo: "Statuette bu wax jigéen Sénoufo, symbole fertilité ak continuité lignage. Sénoufo yi dañu gëna ko xamne ci sculpture yi ak forme bu rafet."
    },
    history: {
      fr: "Sculpture collectée en Côte d'Ivoire dans les années 1950. Elle était utilisée dans les cérémonies du Poro, société secrète d'initiation masculine.",
      en: "Sculpture collected in Ivory Coast in the 1950s. It was used in Poro ceremonies, a secret male initiation society.",
      wo: "Sculpture bi nga jàpp ci Côte d'Ivoire ci années 1950. Dañu ko def ci ceremonii Poro, société secrète initiation góor."
    },
    images: ["/assets/oeuvres/statuette-senoufo-1.jpg"],
    audioUrl: "/assets/audio/statuette-senoufo.mp3",
    videoUrl: "/assets/videos/senoufo-context.mp4",
    qrCode: "MCN-002",
    dimensions: "62 x 15 x 12 cm",
    material: "Bois d'iroko",
    coordinates: { x: 8, y: 2 }
  },
  // ŒUVRE 3 : Textile Kente Royal
  // Origine : Ghana, peuple Ashanti
  // Usage : Porté par la royauté
  {
    id: "oeuvre-3",
    title: {
      fr: "Textile Kente Royal",
      en: "Royal Kente Cloth",
      wo: "Textile Kente Royal"
    },
    artist: "Tisserands Ashanti",
    period: "XXe siècle",
    category: "Textile",
    room: "Salle 2 - Art Royal",
    description: {
      fr: "Tissu Kente traditionnel aux motifs géométriques éclatants. Le Kente est le textile le plus célèbre d'Afrique de l'Ouest, symbole de prestige et d'identité culturelle.",
      en: "Traditional Kente cloth with vibrant geometric patterns. Kente is the most famous textile of West Africa, symbol of prestige and cultural identity.",
      wo: "Textile Kente traditional ak motif géométrique bu rafet. Kente mooy textile bu gëna bëgg ci Afrique Ouest, symbole prestige ak identité culturelle."
    },
    history: {
      fr: "Le Kente était traditionnellement porté par les rois Ashanti du Ghana. Chaque couleur et motif a une signification symbolique précise.",
      en: "Kente was traditionally worn by Ashanti kings of Ghana. Each color and pattern has a precise symbolic meaning.",
      wo: "Kente bi, roi Ashanti yi ci Ghana dañu ko tëral. Benn benn couleur ak motif am na signification symbolique."
    },
    images: ["/assets/oeuvres/muse7.jpg", "/assets/oeuvres/muse8.jpg", "/assets/oeuvres/muse9.jpg"],
    audioUrl: "/assets/audio/kente.mp3",
    qrCode: "MCN-003",
    dimensions: "200 x 120 cm",
    material: "Coton et soie",
    coordinates: { x: 0, y: -8 }
  },
  {
    id: "oeuvre-4",
    title: {
      fr: "Buste Commémoratif Ifé",
      en: "Ife Commemorative Bust",
      wo: "Buste Commemoratif Ifé"
    },
    artist: "Artisan Yoruba",
    period: "XIIe-XVe siècle",
    category: "Sculpture",
    room: "Salle 3 - Civilisations Anciennes",
    description: {
      fr: "Tête en bronze d'Ifé, chef-d'œuvre de l'art Yoruba. Ces sculptures témoignent d'une maîtrise technique exceptionnelle de la fonte à la cire perdue.",
      en: "Bronze head from Ife, masterpiece of Yoruba art. These sculptures demonstrate exceptional technical mastery of lost-wax casting.",
      wo: "Bopp bronze ci Ifé, chef-d'œuvre ci art Yoruba. Sculpture yi dañu wax maîtrise technique bu gëna yomb ci fonte cire perdue."
    },
    history: {
      fr: "Découvert à Ifé, Nigeria, considéré comme le berceau de la civilisation Yoruba. Ces têtes étaient probablement des portraits commémoratifs de rois (Oni).",
      en: "Discovered in Ife, Nigeria, considered the cradle of Yoruba civilization. These heads were probably commemorative portraits of kings (Oni).",
      wo: "Nga jëkkam ci Ifé, Nigeria, nga xam ne mooy berceau civilisation Yoruba. Bopp yi dañu ko def ngir jot roi yi (Oni)."
    },
    images: ["/assets/oeuvres/ife-1.jpg", "/assets/oeuvres/muse12.jpg"],
    audioUrl: "/assets/audio/ife.mp3",
    videoUrl: "/assets/videos/ife-technique.mp4",
    qrCode: "MCN-004",
    dimensions: "35 x 20 x 25 cm",
    material: "Bronze",
    coordinates: { x: -12, y: -5 }
  },
  {
    id: "oeuvre-5",
    title: {
      fr: "Trône Bamiléké",
      en: "Bamileke Throne",
      wo: "Trône Bamiléké"
    },
    artist: "Maître sculpteur Bamiléké",
    period: "XIXe siècle",
    category: "Mobilier",
    room: "Salle 2 - Art Royal",
    description: {
      fr: "Trône royal richement décoré de perles et de cauris. Les trônes Bamiléké sont parmi les plus spectaculaires d'Afrique, symboles du pouvoir des chefs traditionnels.",
      en: "Royal throne richly decorated with beads and cowries. Bamileke thrones are among the most spectacular in Africa, symbols of traditional chiefs' power.",
      wo: "Trône royal bu nga ñu dëkk ak perles ak cauris. Trône Bamiléké yi dañu gëna ko wakh ci Afrique, symbole pouvoir chef yi."
    },
    history: {
      fr: "Provenant de la région des Grassfields au Cameroun. Seuls les chefs (Fon) avaient le droit de s'asseoir sur ces trônes lors des cérémonies importantes.",
      en: "From the Grassfields region of Cameroon. Only chiefs (Fon) had the right to sit on these thrones during important ceremonies.",
      wo: "Nga jóge ci région Grassfields ci Cameroun. Chef yi (Fon) rek moom na droit teg ci trône yi ci ceremonii yu gëna gëna."
    },
    images: ["/assets/oeuvres/muse23.jpg", "/assets/oeuvres/muse28.jpg"],
    audioUrl: "/assets/audio/trone.mp3",
    qrCode: "MCN-005",
    dimensions: "85 x 55 x 60 cm",
    material: "Bois, perles, cauris, tissu",
    coordinates: { x: 12, y: -5 }
  },
  {
    id: "oeuvre-6",
    title: {
      fr: "Masque Punu du Gabon",
      en: "Punu Mask from Gabon",
      wo: "Masque Punu Gabon"
    },
    artist: "Artisan Punu",
    period: "XXe siècle",
    category: "Sculpture",
    room: "Salle 4 - Art d'Afrique Centrale",
    description: {
      fr: "Masque blanc caractéristique des Punu, représentant un idéal de beauté féminine. Ces masques sont portés lors de cérémonies funéraires et de danses rituelles.",
      en: "Characteristic white Punu mask, representing an ideal of feminine beauty. These masks are worn during funeral ceremonies and ritual dances.",
      wo: "Masque wekh bu caractéristique ci Punu, nga wax rafet jigéen. Masque yi dañu ko tëral ci ceremonii ku dee ak danses rituelles."
    },
    history: {
      fr: "Les masques blancs Punu sont parmi les plus reconnaissables d'Afrique. Le blanc symbolise la mort et le monde des esprits dans la culture Punu.",
      en: "Punu white masks are among the most recognizable in Africa. White symbolizes death and the spirit world in Punu culture.",
      wo: "Masque wekh Punu yi dañu ko xamne ci Afrique. Wekh bi wax dee ak monde esprit yi ci culture Punu."
    },
    images: ["/assets/oeuvres/musse1.jpg"],
    audioUrl: "/assets/audio/punu.mp3",
    qrCode: "MCN-006",
    dimensions: "32 x 22 x 15 cm",
    material: "Bois, kaolin",
    coordinates: { x: -8, y: -12 }
  }
];

/**
 * Catégories d'œuvres disponibles dans le musée
 * Utilisées pour le filtrage et l'organisation
 */
export const categories = [
  "Sculpture",
  "Textile",
  "Mobilier",
  "Céramique",
  "Bijoux",
  "Masques",
  "Instruments"
];

/**
 * Salles du musée
 * Organisation thématique des œuvres par région/période
 */
export const rooms = [
  "Salle 1 - Art Mandingue",
  "Salle 2 - Art Royal",
  "Salle 3 - Civilisations Anciennes",
  "Salle 4 - Art d'Afrique Centrale",
  "Salle 5 - Art Contemporain"
];

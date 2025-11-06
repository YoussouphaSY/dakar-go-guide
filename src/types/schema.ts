export interface Artwork {
  id: string;
  title: string;
  artist: string;
  period: string;
  room: string;
  category: string;
  imageUrl: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  dimensions?: string;
  material?: string;
  qrCode: string;
  position: { x: number; y: number };
}


export interface Room {
  id: string;
  name: string;
  description: string;
  artworkIds: string[];
  floor: number;
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  stops: TourStop[];
}

export interface TourStop {
  artworkId: string;
  narration: string;
  duration: number;
}

export interface Period {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
}

export interface Oeuvre {
  id: string;
  title: {
    fr: string;
    en: string;
    wo: string;
  };
  artist: string;
  period: string;
  category: string;
  room: string;
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  history: {
    fr: string;
    en: string;
    wo: string;
  };
  images: string[];
  audioUrl?: string;
  videoUrl?: string;
  qrCode: string;
  dimensions?: string;
  material?: string;
  coordinates?: { x: number; y: number; z?: number }; // Coordonnées 3D (z optionnel pour compatibilité)
}

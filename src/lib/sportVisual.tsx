import {
  Waves, Footprints, Swords, Target, Sparkles, Dumbbell,
  Shield, Volleyball, Music, Flame, type LucideIcon,
} from "lucide-react";

/*
  sportVisual — associe à chaque sport (ou festivité) une icône et une couleur
  d'accent, pour illustrer les cartes d'événement (à la place d'un bloc
  heure/date). Repli neutre si le sport n'est pas connu.
*/

interface SportVisual {
  Icon: LucideIcon;
  color: string;   // couleur d'accent (fond de pastille)
}

const MAP: Record<string, SportVisual> = {
  "Natation": { Icon: Waves, color: "#1E88E5" },
  "Athlétisme": { Icon: Footprints, color: "#E2571E" },
  "Basket 3×3": { Icon: Volleyball, color: "#F08C00" },
  "Boxe": { Icon: Shield, color: "#C8141C" },
  "Escrime": { Icon: Swords, color: "#6E56CF" },
  "Gymnastique": { Icon: Sparkles, color: "#D6336C" },
  "Judo": { Icon: Shield, color: "#1B7A43" },
  "Lutte": { Icon: Swords, color: "#8A5A2B" },
  "Rugby à 7": { Icon: Volleyball, color: "#0B7285" },
  "Taekwondo": { Icon: Shield, color: "#5C7CFA" },
  "Tir à l'arc": { Icon: Target, color: "#2B8A3E" },
  "Gym": { Icon: Dumbbell, color: "#D6336C" },
  "Festivité": { Icon: Music, color: "#C77A1E" },
};

const FALLBACK: SportVisual = { Icon: Flame, color: "#6E6E68" };

export function sportVisual(sport: string): SportVisual {
  return MAP[sport] ?? FALLBACK;
}

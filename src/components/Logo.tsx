import logoUrl from "@/assets/brand/logo-dakar2026.png";
import { cn } from "@/lib/utils";

/*
  Logo officiel DAKAR 2026 Youth Olympic Games.
  Le fichier est noir sur fond transparent. `tone="light"` l'inverse en blanc
  pour les fonds sombres (splash, hero). Les anneaux olympiques restent
  colorés sauf en `mono` (utile sur fonds très chargés).
*/

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
  alt?: string;
}

const Logo = ({ tone = "dark", className, alt = "Dakar 2026 — Jeux Olympiques de la Jeunesse" }: LogoProps) => (
  <img
    src={logoUrl}
    alt={alt}
    className={cn("object-contain select-none", tone === "light" && "invert", className)}
    draggable={false}
  />
);

export default Logo;

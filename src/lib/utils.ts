import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
  asset — résout un chemin d'image/média du dossier public en tenant compte
  du BASE_URL de Vite. En prod l'app est servie sous "/dakar-go-guide/", donc
  un chemin absolu "/assets/x.jpg" pointe hors de l'app (404 → image manquante).
  On préfixe par import.meta.env.BASE_URL. Passe un chemin relatif au dossier
  public, avec ou sans "/" initial : asset("/assets/x.jpg") ou asset("assets/x.jpg").
  Les URLs http(s) et data: sont renvoyées telles quelles.
*/
export function asset(path?: string): string | undefined {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}

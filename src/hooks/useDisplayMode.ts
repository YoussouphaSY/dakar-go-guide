import { useEffect, useState } from "react";

/*
  useDisplayMode — choisit l'interface à afficher.

  Règle produit (2026-07) : l'interface APP mobile est l'interface PAR DÉFAUT,
  partout (y compris dans un onglet navigateur). La version WEB desktop n'est
  affichée que sur demande explicite.

  Overrides (mémorisés en sessionStorage pour survivre à la navigation) :
    ?web=1     force le mode web
    ?app=1     force le mode app (revient au défaut)
*/

export type DisplayMode = "app" | "web";

const getOverride = (): DisplayMode | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (params.get("app") === "1") sessionStorage.setItem("dg-display-override", "app");
  if (params.get("web") === "1") sessionStorage.setItem("dg-display-override", "web");
  return (sessionStorage.getItem("dg-display-override") as DisplayMode | null) ?? null;
};

export const useDisplayMode = (): DisplayMode => {
  const [mode, setMode] = useState<DisplayMode>(() => getOverride() ?? "app");

  useEffect(() => {
    setMode(getOverride() ?? "app");
  }, []);

  return mode;
};

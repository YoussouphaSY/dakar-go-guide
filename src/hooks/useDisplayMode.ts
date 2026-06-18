import { useEffect, useState } from "react";

/*
  useDisplayMode — détecte si l'app tourne en PWA installée (standalone)
  ou dans un onglet navigateur classique (browser).

  Règle produit : standalone → interface APP mobile ; browser → interface WEB desktop.

  Overrides de test (sans installer la PWA) :
    ?app=1     force le mode app
    ?web=1     force le mode web
  Le choix est mémorisé en sessionStorage pour survivre à la navigation.
*/

export type DisplayMode = "app" | "web";

const STANDALONE_QUERY = "(display-mode: standalone)";

const detectStandalone = (): boolean => {
  if (typeof window === "undefined") return false;
  // iOS Safari expose navigator.standalone ; les autres via matchMedia.
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return window.matchMedia?.(STANDALONE_QUERY).matches || iosStandalone;
};

const getOverride = (): DisplayMode | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (params.get("app") === "1") sessionStorage.setItem("dg-display-override", "app");
  if (params.get("web") === "1") sessionStorage.setItem("dg-display-override", "web");
  return (sessionStorage.getItem("dg-display-override") as DisplayMode | null) ?? null;
};

export const useDisplayMode = (): DisplayMode => {
  const [mode, setMode] = useState<DisplayMode>(() => {
    const override = getOverride();
    if (override) return override;
    return detectStandalone() ? "app" : "web";
  });

  useEffect(() => {
    const override = getOverride();
    if (override) {
      setMode(override);
      return;
    }
    const mql = window.matchMedia(STANDALONE_QUERY);
    const update = () => setMode(detectStandalone() ? "app" : "web");
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return mode;
};

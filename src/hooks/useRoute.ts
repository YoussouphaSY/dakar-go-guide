import { useEffect, useState } from "react";

/*
  useRoute — récupère un VRAI itinéraire routier entre deux points via OSRM
  (service public gratuit, sans clé). Renvoie la géométrie (liste de points
  lat/lng) à tracer sur la carte, plus la distance/durée réelles.

  Repli : si l'appel échoue (hors-ligne, quota…), on renvoie la ligne droite
  entre les deux points pour ne jamais casser l'affichage.
*/

export type LatLng = [number, number];

interface RouteResult {
  line: LatLng[];        // géométrie du trajet (ou ligne droite en repli)
  distanceKm: number | null;
  durationMin: number | null;
  loading: boolean;
  real: boolean;         // true si vrai itinéraire OSRM, false si repli
}

const OSRM = "https://router.project-osrm.org/route/v1/driving";

export function useRoute(from: LatLng, to: LatLng): RouteResult {
  const [result, setResult] = useState<RouteResult>({
    line: [from, to],
    distanceKm: null,
    durationMin: null,
    loading: true,
    real: false,
  });

  const fromKey = from.join(",");
  const toKey = to.join(",");

  useEffect(() => {
    let cancelled = false;
    setResult((r) => ({ ...r, loading: true }));

    const url = `${OSRM}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (cancelled) return;
        const route = data?.routes?.[0];
        if (!route?.geometry?.coordinates) throw new Error("no route");
        // GeoJSON = [lng, lat] → on inverse en [lat, lng] pour Leaflet.
        const line: LatLng[] = route.geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]] as LatLng,
        );
        setResult({
          line,
          distanceKm: Math.round((route.distance / 1000) * 10) / 10,
          durationMin: Math.round(route.duration / 60),
          loading: false,
          real: true,
        });
      })
      .catch(() => {
        if (cancelled) return;
        // repli : ligne droite
        setResult({ line: [from, to], distanceKm: null, durationMin: null, loading: false, real: false });
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromKey, toKey]);

  return result;
}

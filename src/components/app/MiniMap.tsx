import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, Clock, MapPin, Navigation, Plus, ChevronRight } from "lucide-react";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { asset } from "@/lib/utils";
import {
  POIS, MAP_FILTERS, MAP_CENTER, MAP_ZOOM, USER_POS,
  poisByFilter, poiDesc, type Poi,
} from "@/data/mobility";
import { dropPin, userDot } from "./mapIcons";

/*
  MiniMap — vraie carte Leaflet de l'accueil (fond CARTO clair, GPS réels).
  Les sites JOJ restent TOUJOURS visibles (pins orange) ; le filtre actif
  ajoute sa couche par-dessus. Le tap sur un pin ouvre une fiche riche en
  bas de la carte : photo, horaires, distance, description traduite,
  « S'y rendre » (pré-remplit la Mobilité) et ajout à l'agenda.
*/

const VENUE_COLOR = MAP_FILTERS.find((f) => f.id === "competition")!.color;

const filterColor = (f: string) => MAP_FILTERS.find((x) => x.id === f)?.color ?? VENUE_COLOR;

/* Recadre sur les POI du filtre actif quand il change. */
const FitOnFilter = ({ pois }: { pois: Poi[] }) => {
  const map = useMap();
  useEffect(() => {
    if (pois.length === 0) return;
    const bounds = L.latLngBounds(pois.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: 12 });
  }, [pois, map]);
  return null;
};

/* Zoome doucement sur la sélection ; clic sur la carte = fermer la fiche. */
const MapBehaviour = ({ selected, onBlank }: { selected: Poi | null; onBlank: () => void }) => {
  const map = useMap();
  useEffect(() => {
    if (selected) map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 12.5), { duration: 0.5 });
  }, [selected, map]);
  useMapEvents({ click: onBlank });
  return null;
};

const MiniMap = () => {
  const nav = useNavigate();
  const { t, lang } = useT();
  const mapFilter = useApp((s) => s.mapFilter);
  const pushToast = useApp((s) => s.pushToast);
  const setMoDest = useApp((s) => s.setMoDest);
  const setVenueId = useApp((s) => s.setVenueId);
  const [openId, setOpenId] = useState<string | null>(null);

  const catPois = useMemo(() => poisByFilter(mapFilter), [mapFilter]);
  const venues = useMemo(() => POIS.filter((p) => p.type === "venue"), []);
  const active = POIS.find((p) => p.id === openId) ?? null;

  /* Fermer la fiche quand on change de filtre. */
  useEffect(() => setOpenId(null), [mapFilter]);

  const go = (p: Poi) => {
    if (p.type === "venue") setMoDest(p.id);
    nav("/mobilite");
  };

  return (
    <div className="absolute inset-0" dir="ltr">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        dragging
        className="absolute inset-0 h-full w-full z-0"
        style={{ background: "#E7F0F2" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <FitOnFilter pois={catPois} />
        <MapBehaviour selected={active} onBlank={() => setOpenId(null)} />

        {/* Sites JOJ : toujours visibles, en retrait quand un autre filtre est actif */}
        {mapFilter !== "competition" && venues.map((p) => (
          <Marker
            key={`v-${p.id}`}
            position={[p.lat, p.lng]}
            icon={dropPin(VENUE_COLOR, p.id === openId ? 36 : 24, { muted: p.id !== openId, selected: p.id === openId })}
            eventHandlers={{ click: () => setOpenId(p.id) }}
            zIndexOffset={p.id === openId ? 1000 : -100}
          />
        ))}

        {/* Couche du filtre actif */}
        {catPois.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={dropPin(filterColor(mapFilter), p.id === openId ? 40 : 32, { selected: p.id === openId })}
            eventHandlers={{ click: () => setOpenId(p.id) }}
            zIndexOffset={p.id === openId ? 1000 : 0}
          />
        ))}

        <Marker position={USER_POS} icon={userDot()} interactive={false} />
      </MapContainer>

      {/* crédit fond de carte */}
      <div className="absolute bottom-1 right-2 z-[500] text-[8px] text-muted-foreground/70 pointer-events-none">
        © OpenStreetMap · CARTO
      </div>

      {/* fiche riche du lieu sélectionné */}
      {active && (
        <div className="absolute left-2 right-2 bottom-2 z-[1000] anim-fade" dir={lang === "AR" ? "rtl" : "ltr"}>
          <div className="bg-background rounded-[18px] shadow-lg border border-border p-2.5">
            <div className="flex gap-2.5">
              {active.image ? (
                <img
                  src={asset(active.image)}
                  alt={active.name}
                  className="w-[76px] h-[76px] rounded-[13px] object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-[76px] h-[76px] rounded-[13px] bg-[repeating-linear-gradient(135deg,#E7E7E2_0_8px,#F1F1EC_8px_16px)] flex items-center justify-center font-mono text-[8px] text-muted-foreground flex-shrink-0">
                  photo
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-[14.5px] leading-[1.1] truncate">{active.name}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-[2px] rounded-[5px] text-white"
                        style={{ background: active.type === "venue" ? VENUE_COLOR : filterColor(active.filter ?? mapFilter) }}
                      >
                        {t(`poiType.${active.type}`)}
                      </span>
                      <span className="text-[10.5px] text-muted-foreground truncate">{active.city}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenId(null)}
                    aria-label={t("map.close")}
                    className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0"
                  >
                    <X className="w-3 h-3 text-muted-foreground" strokeWidth={2.6} />
                  </button>
                </div>
                <div className="flex items-center gap-2.5 mt-1.5">
                  {active.schedule && (
                    <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground min-w-0">
                      <Clock className="w-[11px] h-[11px] text-primary flex-shrink-0" strokeWidth={2} />
                      <span className="truncate">{active.schedule}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground flex-shrink-0">
                    <MapPin className="w-[11px] h-[11px] text-primary" strokeWidth={2} />
                    {active.dist}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setVenueId(active.id)}
              className="mt-2 w-full text-left group"
            >
              <p className="text-[11.5px] leading-[1.45] text-muted-foreground line-clamp-2">
                {poiDesc(active, lang)}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary mt-1">
                {t("map.more")}
                <ChevronRight className="w-3 h-3" strokeWidth={2.4} />
              </span>
            </button>

            {active.tags && active.tags.length > 0 && (
              <div className="flex gap-1 mt-1.5 overflow-hidden flex-wrap max-h-[20px]">
                {active.tags.map((tag) => (
                  <span key={tag} className="text-[9.5px] font-semibold bg-muted text-foreground/70 px-1.5 py-[2px] rounded-[5px] whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-1.5 mt-2.5">
              <button
                onClick={() => go(active)}
                className="flex-1 bg-primary text-primary-foreground text-[12px] font-semibold py-[8px] rounded-[10px] inline-flex items-center justify-center gap-1.5 active:scale-[0.98] transition-base"
              >
                <Navigation className="w-3.5 h-3.5" strokeWidth={2.2} />
                {t("map.go")}
              </button>
              <button
                onClick={() => { setOpenId(null); pushToast(t("toast.added")); }}
                className="bg-background border-[1.5px] border-border text-foreground text-[12px] font-semibold px-3 py-[8px] rounded-[10px] inline-flex items-center gap-1 active:scale-[0.98] transition-base"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.4} />
                {t("map.agenda")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniMap;

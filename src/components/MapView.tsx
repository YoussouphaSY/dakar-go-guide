import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { POIS, MAP_CENTER, MAP_ZOOM, type Poi, type PoiType } from "@/data/mobility";

/*
  MapView — vraie carte interactive Leaflet centrée sur Dakar.
  Pins orange en goutte (style map.jpg), accent turquoise sur l'itinéraire.
  Fond de carte clair (CARTO Positron) pour rester sobre.
*/

const PIN_COLOR: Record<PoiType, string> = {
  venue: "#E8580A",      // orange (sites JOJ)
  transport: "#16B5C4",  // turquoise (transports)
  food: "#F2A33C",       // ambre (restos)
  poi: "#00853F",        // vert (à voir)
};

const ICON_PATH: Record<PoiType, string> = {
  venue: '<path d="M6 21V8l6-4 6 4v13M6 13h12M10 21v-5h4v5"/>',
  transport: '<rect x="5" y="4" width="14" height="13" rx="2"/><path d="M5 11h14M8 21l1-4M16 21l-1-4"/>',
  food: '<path d="M5 3v8M9 3v8M7 11v10M15 3c-1.5 0-2 2-2 5s.5 4 2 4 2-1 2-4-.5-5-2-5ZM15 12v9"/>',
  poi: '<path d="M12 3l2.4 5.4 5.6.5-4.2 3.8 1.2 5.6L12 16l-5 2.3 1.2-5.6L4 8.9l5.6-.5z"/>',
};

const makeIcon = (type: PoiType, selected: boolean) => {
  const color = PIN_COLOR[type];
  const size = selected ? 46 : 38;
  return L.divIcon({
    className: "dg-pin",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;transform:translateY(-6px);${selected ? "filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));" : "filter:drop-shadow(0 3px 5px rgba(0,0,0,.25));"}">
        <div style="position:absolute;inset:0;background:${color};border:2.5px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg)"></div>
        <svg style="position:absolute;top:50%;left:50%;transform:translate(-50%,-58%);width:${size * 0.42}px;height:${size * 0.42}px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${ICON_PATH[type]}</svg>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

/* Recentre la carte quand le POI sélectionné change. */
const Recenter = ({ poi }: { poi: Poi }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([poi.lat, poi.lng], Math.max(map.getZoom(), 13), { duration: 0.6 });
  }, [poi, map]);
  return null;
};

interface MapViewProps {
  visibleTypes: Record<PoiType, boolean>;
  selectedId: string;
  onSelect: (id: string) => void;
}

const MapView = ({ visibleTypes, selectedId, onSelect }: MapViewProps) => {
  const selected = POIS.find((p) => p.id === selectedId) ?? POIS[0];
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      scrollWheelZoom
      className="absolute inset-0 h-full w-full z-0"
      style={{ background: "#E7F0F2" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Recenter poi={selected} />
      {POIS.filter((p) => visibleTypes[p.type]).map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={makeIcon(p.type, p.id === selectedId)}
          eventHandlers={{ click: () => onSelect(p.id) }}
          zIndexOffset={p.id === selectedId ? 1000 : 0}
        >
          <Tooltip direction="top" offset={[0, -38]} permanent className="dg-tooltip">
            {p.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown, PersonStanding, Bus, Car, Clock, Ban,
  BusFront, TrainFront, Ship, CarTaxiFront, Wallet, Info,
  ParkingSquare, Cross, Accessibility,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { useRoute } from "@/hooks/useRoute";
import {
  VENUES, USER_POS, routesFor, departureFor, kmOf,
  TRANSIT_LINES, NEXT_DEPARTURES, MAP_FILTERS, type RouteOption,
} from "@/data/mobility";
import { dropPin, userDot } from "@/components/app/mapIcons";
import DestPopover from "@/components/app/DestPopover";

/*
  MobiliteApp — écran Mobilité (mobile), version vivante :
  destination au choix parmi les sites JOJ (les temps/prix se recalculent),
  carte réelle du trajet, prochains passages BRT/TER, modes multimodaux,
  heure de départ conseillée, réseaux de transport de Dakar et conseils
  visiteurs. Interface traduite (FR/EN/ES/AR/WO).
*/

const VENUE_COLOR = MAP_FILTERS.find((f) => f.id === "competition")!.color;

/* prochaine épreuve (démo) : départ 18:00 */
const NEXT_EVENT_START = "18:00";

const MODE_ICON: Record<RouteOption["id"], typeof Bus> = {
  walk: PersonStanding,
  bus: Bus,
  taxi: Car,
};

const TRANSIT_ICON = {
  brt: BusFront,
  ter: TrainFront,
  ddd: Bus,
  taxi: CarTaxiFront,
  ferry: Ship,
} as const;

const SERVICES = [
  { id: "parking", icon: ParkingSquare },
  { id: "secours", icon: Cross },
  { id: "pmr", icon: Accessibility },
] as const;

const TIPS = [
  { id: "pay", icon: Wallet },
  { id: "taxi", icon: CarTaxiFront },
  { id: "shuttle", icon: BusFront },
] as const;

/* Recadre la carte sur toute la géométrie du trajet quand elle change. */
const FitLine = ({ line }: { line: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (line.length < 2) return;
    map.fitBounds(L.latLngBounds(line), { padding: [26, 26] });
  }, [line, map]);
  return null;
};

const fmtMins = (m: number) =>
  m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;

const MobiliteApp = () => {
  const { t } = useT();
  const moMode = useApp((s) => s.moMode);
  const setMoMode = useApp((s) => s.setMoMode);
  const moDest = useApp((s) => s.moDest);
  const setMoDest = useApp((s) => s.setMoDest);
  const [destOpen, setDestOpen] = useState(false);
  const [infosOpen, setInfosOpen] = useState(false);

  const dest = VENUES.find((v) => v.id === moDest) ?? VENUES[0];
  const routes = useMemo(() => routesFor(dest), [dest]);
  const selected = routes.find((r) => r.id === moMode && r.mins != null) ?? routes.find((r) => r.mins != null)!;
  const departAt = departureFor(NEXT_EVENT_START, selected.mins ?? 0);

  /* Vrai itinéraire routier (OSRM) entre la position et le lieu choisi. */
  const route = useRoute(USER_POS, [dest.lat, dest.lng]);
  const km = route.real && route.distanceKm != null ? route.distanceKm : kmOf(dest);

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <h2 className="font-display font-extrabold text-[30px] tracking-tight">{t("mo.title")}</h2>
      <p className="text-[14.5px] text-muted-foreground mt-1.5">{t("mo.subtitle")}</p>

      {/* from / to */}
      <div className="relative mt-[18px]">
        <div className="bg-background border border-border rounded-[20px] px-4 py-1.5 shadow-sm">
          <div className="flex items-center gap-3.5 py-3.5">
            <span className="w-[11px] h-[11px] rounded-full border-[3px] border-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-[11px] text-muted-foreground">{t("mo.from")}</div>
              <div className="font-semibold text-[14.5px]">{t("mo.myPos")}</div>
            </div>
          </div>
          <div className="h-px bg-border ml-6" />
          <button
            onClick={() => setDestOpen((o) => !o)}
            aria-expanded={destOpen}
            className="w-full text-left flex items-center gap-3.5 py-3.5"
          >
            <span className="w-[11px] h-[11px] bg-foreground flex-shrink-0" style={{ borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }} />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-muted-foreground">{t("mo.to")}</div>
              <div className="font-semibold text-[14.5px] truncate">{dest.name} · {dest.city}</div>
            </div>
            <ChevronDown className={cn("w-[18px] h-[18px] text-muted-foreground flex-shrink-0 transition-transform", destOpen && "rotate-180")} strokeWidth={2} />
          </button>
        </div>
        <DestPopover
          open={destOpen}
          onClose={() => setDestOpen(false)}
          activeId={dest.id}
          onSelect={setMoDest}
          className="left-0 right-0 w-auto top-[calc(100%+6px)]"
        />
      </div>

      {/* carte du trajet */}
      <div className="mt-3 relative z-0 h-[168px] rounded-[20px] overflow-hidden shadow-sm border border-border" dir="ltr">
        <MapContainer
          center={USER_POS}
          zoom={11}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={false}
          className="absolute inset-0 h-full w-full z-0"
          style={{ background: "#E7F0F2" }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <FitLine line={route.line} />
          {/* halo blanc + tracé coloré, façon itinéraire GPS */}
          <Polyline positions={route.line} pathOptions={{ color: "#ffffff", weight: 6, opacity: 0.9, lineCap: "round", lineJoin: "round" }} />
          <Polyline
            positions={route.line}
            pathOptions={{
              color: "#16B5C4",
              weight: 3.5,
              lineCap: "round",
              lineJoin: "round",
              dashArray: route.real ? undefined : "6 8",
            }}
          />
          <Marker position={USER_POS} icon={userDot()} interactive={false} />
          <Marker position={[dest.lat, dest.lng]} icon={dropPin(VENUE_COLOR, 34, { selected: true })} interactive={false} />
        </MapContainer>
        {km != null && (
          <div className="absolute top-2.5 left-2.5 bg-background rounded-full px-2.5 py-[5px] font-mono text-[10.5px] font-bold shadow-md z-[500] pointer-events-none">
            {String(km).replace(".", ",")} km
          </div>
        )}
      </div>

      {/* prochains passages (démo temps réel) */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto scr">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide flex-shrink-0">
          {t("mo.next")}
        </span>
        {NEXT_DEPARTURES.map((d, i) => (
          <span
            key={i}
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-2.5 py-[5px] text-[11.5px] font-semibold"
          >
            <span className="w-[6px] h-[6px] rounded-full anim-live" style={{ background: d.color }} />
            {d.line} · {d.mins} min
          </span>
        ))}
      </div>

      {/* modes */}
      <div className="mt-[14px] flex flex-col gap-2.5">
        {routes.map((r) => {
          const on = r.id === selected.id;
          const off = r.mins == null;
          const Icon = MODE_ICON[r.id];
          const name = r.id === "walk" ? t("mode.walk") : r.id === "taxi" ? t("mode.taxi") : r.shuttle ? t("mode.shuttle") : t("mode.bus");
          const detail = off ? t("mode.walk.na")
            : r.id === "walk" ? t("mode.walk.d")
            : r.id === "taxi" ? t("mode.taxi.d")
            : r.shuttle ? t("mode.shuttle.d") : t("mode.bus.d");
          const cost = r.id === "walk" || r.shuttle ? t("mo.free") : r.cost;
          return (
            <button
              key={r.id}
              disabled={off}
              onClick={() => setMoMode(r.id)}
              className={cn(
                "text-left border-[1.5px] rounded-[18px] p-4 flex items-center gap-[15px] transition-base",
                on ? "border-primary bg-primary/5" : "border-border bg-background",
                off && "opacity-50",
              )}
            >
              <div className={cn("w-[46px] h-[46px] rounded-[14px] flex items-center justify-center flex-shrink-0", on ? "bg-primary" : "bg-muted")}>
                <Icon className={cn("w-[22px] h-[22px]", on ? "text-primary-foreground" : "text-foreground")} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[15px]">{name}</div>
                <div className="text-[12.5px] text-muted-foreground mt-0.5">{detail}</div>
              </div>
              <div className="text-right flex-shrink-0">
                {r.mins != null ? (
                  <>
                    <div className="font-display font-extrabold text-[18px]">{fmtMins(r.mins)}</div>
                    <div className="text-xs text-muted-foreground">{cost}</div>
                  </>
                ) : (
                  <Ban className="w-[18px] h-[18px] text-muted-foreground/60 ml-auto" strokeWidth={2} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* departure reco (recalculée selon mode + destination) */}
      <div className="mt-[18px] flex items-center gap-3 bg-primary/10 rounded-[18px] px-4 py-[15px]">
        <Clock className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
        <div className="text-[13.5px] text-foreground">{t("mo.leave", { t: departAt })}</div>
      </div>

      {/* sur place */}
      <h3 className="font-display font-extrabold text-lg mt-[26px]">{t("mo.onSite")} · {dest.name}</h3>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="w-[19px] h-[19px]" strokeWidth={1.9} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{t(`svc.${s.id}.t` as Parameters<typeof t>[0])}</div>
                <div className="text-[12.5px] text-muted-foreground mt-px">{t(`svc.${s.id}.d` as Parameters<typeof t>[0])}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* infos utiles — section repliable (réseaux + conseils) */}
      <button
        onClick={() => setInfosOpen((o) => !o)}
        aria-expanded={infosOpen}
        className="mt-[26px] w-full flex items-center gap-3 bg-background border border-border rounded-[18px] px-4 py-[15px] active:scale-[0.99] transition-base"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-[19px] h-[19px] text-primary" strokeWidth={2} />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="font-display font-extrabold text-[16px] leading-tight">{t("mo.infos")}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5 truncate">{t("mo.infosSub")}</div>
        </div>
        <ChevronDown
          className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", infosOpen && "rotate-180")}
          strokeWidth={2}
        />
      </button>

      {infosOpen && (
        <div className="anim-fade">
          {/* réseaux de transport */}
          <h3 className="font-display font-extrabold text-[15px] mt-4 text-muted-foreground uppercase tracking-wide">{t("mo.network")}</h3>
          <div className="mt-3 flex flex-col gap-2.5">
            {TRANSIT_LINES.map((l) => {
              const Icon = TRANSIT_ICON[l.id];
              return (
                <div key={l.id} className="bg-background border border-border rounded-[18px] p-4 flex items-start gap-3.5 shadow-sm">
                  <div className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center flex-shrink-0" style={{ background: `${l.color}1A` }}>
                    <Icon className="w-[21px] h-[21px]" strokeWidth={2} style={{ color: l.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14.5px]">{t(`transit.${l.id}.n` as Parameters<typeof t>[0])}</div>
                    <div className="text-[12.5px] text-muted-foreground mt-0.5 leading-[1.45]">{t(`transit.${l.id}.d` as Parameters<typeof t>[0])}</div>
                    <div className="text-[11.5px] font-semibold mt-1.5" style={{ color: l.color }}>{t(`transit.${l.id}.f` as Parameters<typeof t>[0])}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* conseils visiteurs */}
          <h3 className="font-display font-extrabold text-[15px] mt-6 text-muted-foreground uppercase tracking-wide">{t("mo.tips")}</h3>
          <div className="mt-3 flex flex-col gap-2.5">
            {TIPS.map(({ id, icon: Icon }) => (
              <div key={id} className="flex items-start gap-3.5 bg-muted/50 rounded-[16px] px-3.5 py-3">
                <div className="w-9 h-9 rounded-[11px] bg-background border border-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-[17px] h-[17px]" strokeWidth={1.9} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[13.5px]">{t(`tip.${id}.t` as Parameters<typeof t>[0])}</div>
                  <div className="text-[12.5px] text-muted-foreground mt-0.5 leading-[1.45]">{t(`tip.${id}.b` as Parameters<typeof t>[0])}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default MobiliteApp;

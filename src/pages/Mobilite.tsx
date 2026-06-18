import { useState } from "react";
import {
  Navigation, PersonStanding, Bus, Car, MapPin,
  ParkingSquare, Utensils, Plus, Accessibility, X, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/pages/Home";
import MapView from "@/components/MapView";
import {
  POIS, MODES, POI_CATEGORIES, POI_TYPE_LABEL, SITE_SERVICES,
  type Poi, type PoiType, type TransportMode,
} from "@/data/mobility";

/*
  Mobilité (web) — reprend le design Claude (Mobilité.dc.html), adapté en layout web :
  carte (gauche) + panneau latéral (droite). POI · itinéraire multimodal · fiche site.
*/

type Panel = "info" | "route" | "site";

const typeTint: Record<PoiType, string> = {
  venue: "bg-foreground text-background",
  transport: "bg-muted text-foreground",
  food: "bg-[#FAF1E6] text-[#C77A1E]",
  poi: "bg-primary/10 text-primary",
};

const Mobilite = () => {
  const [selectedId, setSelectedId] = useState<string>("arene");
  const [panel, setPanel] = useState<Panel>("info");
  const [mode, setMode] = useState<TransportMode["id"]>("taxi");
  const [cats, setCats] = useState<Record<PoiType, boolean>>({ venue: true, transport: true, food: true, poi: true });

  const sel = POIS.find((p) => p.id === selectedId) ?? POIS[0];

  const selectPoi = (id: string) => { setSelectedId(id); setPanel("info"); };
  const toggleCat = (id: PoiType) => setCats((c) => ({ ...c, [id]: !c[id] }));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-8 py-10 lg:py-14">
        <SectionHeader
          kicker="02 — Mobilité"
          title="Mobilité & guidage"
          lead="Repérez les sites de compétition, comparez vos trajets (marche, BRT, taxi-VTC) et trouvez tout sur place : parkings, secours, accès PMR."
        />

        {/* Filtres catégories */}
        <div className="flex gap-2 flex-wrap mt-8">
          {POI_CATEGORIES.map((c) => {
            const on = cats[c.id];
            return (
              <button key={c.id} onClick={() => toggleCat(c.id)} className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-base",
                on ? "bg-card border-border text-foreground" : "bg-muted border-transparent text-muted-foreground",
              )}>
                <span className="h-2 w-2 rounded-full" style={{ background: on ? c.dot : "#C4C4BD" }} />
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Carte + panneau */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-5 mt-6">
          {/* Carte interactive Leaflet */}
          <div className="relative rounded-[22px] overflow-hidden border border-border min-h-[420px] lg:min-h-[560px] isolate">
            <MapView visibleTypes={cats} selectedId={selectedId} onSelect={selectPoi} />
          </div>

          {/* Panneau latéral */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {panel === "site" ? (
              <SitePanel poi={sel} onClose={() => setPanel("info")} onRoute={() => setPanel("route")} />
            ) : panel === "route" ? (
              <RoutePanel poi={sel} mode={mode} setMode={setMode} onBack={() => setPanel("info")} />
            ) : (
              <InfoPanel poi={sel} onRoute={() => setPanel("route")} onSite={() => setPanel("site")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PoiIcon = ({ type }: { type: PoiType }) => {
  const cls = "h-3.5 w-3.5 text-white";
  if (type === "venue") return <Building2 className={cls} strokeWidth={2.1} />;
  if (type === "transport") return <Bus className={cls} strokeWidth={2.1} />;
  if (type === "food") return <Utensils className={cls} strokeWidth={2.1} />;
  return <Navigation className={cls} strokeWidth={2.1} />;
};

/* ── Panneau : aperçu POI (image + titre + détails) ── */
const InfoPanel = ({ poi, onRoute, onSite }: { poi: Poi; onRoute: () => void; onSite: () => void }) => (
  <div className="rounded-[22px] border border-border bg-card overflow-hidden">
    {/* Image d'aperçu + titre en overlay */}
    <div className="relative h-40 bg-muted">
      {poi.image ? (
        <img src={poi.image} alt={poi.name} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground">photo · {poi.name}</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
      <span className={cn("absolute top-3 left-3 h-9 w-9 rounded-xl flex items-center justify-center shadow", typeTint[poi.type])}>
        <PoiIcon type={poi.type} />
      </span>
      <div className="absolute left-4 bottom-3 right-4 text-white">
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/80">{POI_TYPE_LABEL[poi.type]}{poi.city ? ` · ${poi.city}` : ""}</div>
        <h2 className="font-display font-extrabold text-xl leading-tight mt-0.5">{poi.name}</h2>
      </div>
    </div>

    <div className="p-5">
      {/* Distance / temps */}
      <div className="flex gap-5 text-[13px]">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {poi.dist}</span>
        <span className="inline-flex items-center gap-1.5"><Car className="h-4 w-4 text-primary" /> {poi.time}</span>
      </div>

      <p className="text-[13.5px] leading-relaxed text-muted-foreground mt-3">{poi.desc}</p>

      {/* Détails / tags */}
      {poi.tags && poi.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {poi.tags.map((t) => (
            <span key={t} className="text-[12px] font-medium bg-muted text-foreground/80 rounded-full px-2.5 py-1">{t}</span>
          ))}
        </div>
      )}

      <div className="flex gap-2.5 mt-5">
        <button onClick={onRoute} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl hover:bg-primary/90 transition-base">
          <Navigation className="h-4 w-4" strokeWidth={2.1} /> Itinéraire
        </button>
        {poi.type === "venue" && (
          <button onClick={onSite} className="bg-card border-[1.5px] border-border font-semibold text-sm px-4 py-3 rounded-xl hover:bg-muted transition-base">
            Fiche site
          </button>
        )}
      </div>
    </div>
  </div>
);

/* ── Panneau : itinéraire multimodal ── */
const RoutePanel = ({ poi, mode, setMode, onBack }: {
  poi: Poi; mode: TransportMode["id"]; setMode: (m: TransportMode["id"]) => void; onBack: () => void;
}) => (
  <div className="rounded-[22px] border border-border bg-card p-6">
    <button onClick={onBack} className="text-[13px] font-semibold text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5">
      ← Retour
    </button>
    {/* Départ → arrivée */}
    <div className="flex gap-3">
      <div className="flex flex-col items-center py-1">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="flex-1 w-0.5 bg-border my-1" />
        <span className="h-2.5 w-2.5 rounded-sm bg-foreground" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="border border-border rounded-xl px-3 py-2.5">
          <div className="text-[11px] text-muted-foreground">Départ</div>
          <div className="font-semibold text-sm">Ma position</div>
        </div>
        <div className="border border-border rounded-xl px-3 py-2.5">
          <div className="text-[11px] text-muted-foreground">Arrivée</div>
          <div className="font-semibold text-sm">{poi.name}</div>
        </div>
      </div>
    </div>
    {/* Modes */}
    <div className="flex flex-col gap-2.5 mt-4">
      {MODES.map((m) => {
        const on = m.id === mode;
        const Icon = m.id === "walk" ? PersonStanding : m.id === "transit" ? Bus : Car;
        return (
          <button key={m.id} onClick={() => setMode(m.id)} className={cn(
            "text-left rounded-xl border-[1.5px] p-3.5 flex items-center gap-3 transition-base",
            on ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
          )}>
            <span className={cn("h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0", on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14.5px]">{m.label}</div>
              <div className="text-[12px] text-muted-foreground">{m.sub}</div>
            </div>
            <div className="text-right">
              <div className="font-display font-extrabold text-base">{m.dur}</div>
              <div className="text-[11px] text-muted-foreground">{m.cost}</div>
            </div>
          </button>
        );
      })}
    </div>
    <button className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3.5 rounded-xl hover:bg-primary/90 transition-base">
      <Navigation className="h-4 w-4" strokeWidth={2.1} /> Démarrer le guidage
    </button>
  </div>
);

/* ── Panneau : fiche site (services) ── */
const SitePanel = ({ poi, onClose, onRoute }: { poi: Poi; onClose: () => void; onRoute: () => void }) => (
  <div className="rounded-[22px] border border-border bg-card overflow-hidden">
    <div className="relative h-36 bg-muted flex items-center justify-center font-mono text-[10px] text-muted-foreground">
      photo · {poi.name}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
      <button onClick={onClose} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 flex items-center justify-center">
        <X className="h-4 w-4" />
      </button>
      <div className="absolute left-4 bottom-3 text-white">
        <div className="font-mono text-[9px] uppercase tracking-wider text-white/80">Site de compétition</div>
        <div className="font-display font-extrabold text-lg leading-tight">{poi.name}</div>
      </div>
    </div>
    <div className="p-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[{ n: "15 000", l: "places" }, { n: "4", l: "disciplines" }, { n: poi.time, l: "de vous" }].map((s) => (
          <div key={s.l} className="bg-muted/60 border border-border rounded-xl p-3 text-center">
            <div className="font-display font-extrabold text-base">{s.n}</div>
            <div className="text-[11px] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
      {/* Services */}
      <div className="font-display font-bold text-base mt-5">Services sur place</div>
      <div className="flex flex-col gap-2 mt-3">
        {SITE_SERVICES.map((srv) => {
          const Icon = srv.id === "parking" ? ParkingSquare : srv.id === "food" ? Utensils : srv.id === "secours" ? Plus : Accessibility;
          return (
            <div key={srv.id} className="flex items-center gap-3 border border-border rounded-xl p-3">
              <span className={cn("h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                srv.tone === "alert" ? "bg-live/10 text-live" : "bg-muted text-foreground")}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px]">{srv.label}</div>
                <div className="text-[12px] text-muted-foreground">{srv.detail}</div>
              </div>
              <span className={cn("text-[12px] font-semibold", srv.tone === "alert" ? "text-live" : "text-primary")}>{srv.status}</span>
            </div>
          );
        })}
      </div>
      <button onClick={onRoute} className="w-full mt-5 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3.5 rounded-xl hover:bg-primary/90 transition-base">
        <Navigation className="h-4 w-4" strokeWidth={2.1} /> S'y rendre
      </button>
    </div>
  </div>
);

export default Mobilite;

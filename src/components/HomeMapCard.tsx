import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Navigation, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import MapView from "@/components/MapView";
import { MAP_FILTERS, poisByFilter, type MapFilter, type Poi } from "@/data/mobility";

/*
  HomeMapCard — carte d'accueil mobile (format hero) avec cartographie filtrable.
  Un seul filtre actif à la fois (Compétitions par défaut).
  Clic sur un point → bottom-sheet détails (heure, sports) + S'y rendre / Ajouter à l'agenda.
*/

const AGENDA_KEY = "dakargo-agenda";

const HomeMapCard = () => {
  const [filter, setFilter] = useState<MapFilter>("competition");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [agenda, setAgenda] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(AGENDA_KEY) || "[]"); } catch { return []; }
  });

  const pois = useMemo(() => poisByFilter(filter), [filter]);
  const selected = pois.find((p) => p.id === selectedId) ?? null;
  const active = MAP_FILTERS.find((f) => f.id === filter)!;

  const changeFilter = (f: MapFilter) => { setFilter(f); setSelectedId(null); };

  const toggleAgenda = (id: string) => setAgenda((prev) => {
    const has = prev.includes(id);
    const next = has ? prev.filter((x) => x !== id) : [...prev, id];
    localStorage.setItem(AGENDA_KEY, JSON.stringify(next));
    toast(has ? "Retiré de mon agenda" : "Ajouté à mon agenda");
    return next;
  });

  return (
    <section className="mt-4">
      {/* Filtres (un seul actif) — au-dessus de la carte */}
      <div className="flex gap-2 mb-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MAP_FILTERS.map((f) => {
          const on = f.id === filter;
          return (
            <button key={f.id} onClick={() => changeFilter(f.id)} className={cn(
              "flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[12.5px] font-semibold transition-base",
              on ? "bg-foreground text-background border-foreground" : "bg-card border-border text-foreground/80",
            )}>
              <span className="h-2 w-2 rounded-full" style={{ background: on ? f.color : "#C4C4BD" }} />
              {f.short}
            </button>
          );
        })}
      </div>

      {/* Carte */}
      <div className="relative rounded-[20px] overflow-hidden h-[230px] border border-border isolate">
        <MapView
          pois={pois}
          selectedId={selectedId}
          onSelect={setSelectedId}
          pinColor={active.color}
          fit
          tooltips={false}
        />
        {/* Titre overlay */}
        <div className="absolute top-3 left-3 z-[1000] pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow font-mono text-[10px] font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full" style={{ background: active.color }} />
            {active.label} · {pois.length}
          </span>
        </div>
      </div>

      {/* Bottom-sheet détails */}
      {selected && (
        <PoiSheet
          poi={selected}
          inAgenda={agenda.includes(selected.id)}
          onClose={() => setSelectedId(null)}
          onToggleAgenda={() => toggleAgenda(selected.id)}
        />
      )}
    </section>
  );
};

const PoiSheet = ({ poi, inAgenda, onClose, onToggleAgenda }: {
  poi: Poi; inAgenda: boolean; onClose: () => void; onToggleAgenda: () => void;
}) => (
  <div className="fixed inset-0 z-[1200] flex flex-col justify-end" onClick={onClose}>
    <div className="absolute inset-0 bg-foreground/40" />
    <div
      className="relative bg-background rounded-t-3xl overflow-hidden animate-[sheetUp_.25s_ease] max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Image d'aperçu */}
      <div className="relative h-36 bg-muted">
        {poi.image ? (
          <img src={poi.image} alt={poi.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground">photo · {poi.name}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 to-transparent" />
        <button onClick={onClose} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 flex items-center justify-center">
          <X className="h-4 w-4" />
        </button>
        <div className="absolute left-4 bottom-3 right-4 text-white">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/80">{poi.city}</div>
          <h3 className="font-display font-extrabold text-xl leading-tight">{poi.name}</h3>
        </div>
      </div>

      <div className="p-5 pb-7">
        {/* Heure / distance */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
          {poi.schedule && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {poi.schedule}</span>}
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {poi.dist}</span>
        </div>

        <p className="text-[13.5px] leading-relaxed text-muted-foreground mt-3">{poi.desc}</p>

        {/* Détails / sports */}
        {poi.tags && poi.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {poi.tags.map((t) => (
              <span key={t} className="text-[12px] font-medium bg-muted text-foreground/80 rounded-full px-2.5 py-1">{t}</span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 mt-5">
          <Link
            to="/mobilite"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-xl"
          >
            <Navigation className="h-4 w-4" strokeWidth={2.1} /> S'y rendre
          </Link>
          <button
            onClick={onToggleAgenda}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-3 rounded-xl border-[1.5px] transition-base",
              inAgenda ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border",
            )}
          >
            {inAgenda ? <Check className="h-4 w-4" strokeWidth={2.4} /> : <Plus className="h-4 w-4" strokeWidth={2.2} />}
            {inAgenda ? "Ajouté" : "Agenda"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HomeMapCard;

import { useState, useMemo } from "react";
import {
  SlidersHorizontal, MapPin, Plus, Check, AlertTriangle, ArrowRight,
  Trash2, Clock, ListChecks, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import {
  SESSIONS, GAME_DAYS, COMPETITION_SPORTS, MOBILISATION_SPORTS,
  type Session,
} from "@/data/sports";

/*
  ProgrammeApp — Planner MOBILE (interface app), fidèle maquette Claude "Planner".
  Onglets segmentés : Programme · Agenda · Alertes.
  Agenda partagé avec le web via localStorage "dakargo-agenda".
*/

const AGENDA_KEY = "dakargo-agenda";
type Tab = "programme" | "agenda" | "alertes";

const t2m = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const endOf = (s: Session) => t2m(s.time) + 90;
const dayShort = (k: string) => { const d = GAME_DAYS.find((g) => g.key === k); return d ? `${d.dow} ${d.dayNum}` : k; };
const dayLong = (k: string) => { const d = GAME_DAYS.find((g) => g.key === k); return d ? `${d.dow} ${d.dayNum} ${d.mon}` : k; };

const kindMeta = (s: Session) => {
  if (s.kind === "ceremony") return { txt: "CÉRÉMONIE", cls: "bg-accent text-accent-foreground" };
  if (s.kind === "festival") return { txt: "FÊTE", cls: "bg-accent text-accent-foreground" };
  return { txt: (s.phase || "ÉPREUVE").toUpperCase(), cls: "bg-muted text-muted-foreground" };
};

const ProgrammeApp = () => {
  const { lang } = useI18n();
  const [tab, setTab] = useState<Tab>("programme");
  const [agenda, setAgenda] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(AGENDA_KEY) || "[]"); } catch { return []; }
  });

  const toggle = (id: string) => setAgenda((prev) => {
    const has = prev.includes(id);
    const next = has ? prev.filter((x) => x !== id) : [...prev, id];
    localStorage.setItem(AGENDA_KEY, JSON.stringify(next));
    toast(has ? "Retiré de mon agenda" : "Ajouté à mon agenda");
    return next;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Titre + langue */}
      <div className="flex items-center justify-between px-5 pt-4 flex-shrink-0">
        <h1 className="font-display font-extrabold text-[26px]" style={{ fontStretch: "86%" }}>Planner</h1>
        <span className="flex items-center gap-1.5 border border-border rounded-full px-2.5 py-1.5 text-xs font-semibold">
          {lang.toUpperCase()} <ChevronDown className="h-2 w-2 text-muted-foreground" />
        </span>
      </div>

      {/* Segmenté */}
      <div className="mx-5 mt-3.5 bg-muted rounded-xl p-1 flex gap-1 flex-shrink-0">
        {([
          { id: "programme", label: "Programme" },
          { id: "agenda", label: "Agenda", count: agenda.length },
          { id: "alertes", label: "Alertes" },
        ] as const).map(({ id, label, count }) => (
          <button key={id} onClick={() => setTab(id)} className={cn(
            "relative flex-1 rounded-lg py-2.5 text-[13px] font-semibold transition-base",
            tab === id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground",
          )}>
            {label}
            {count != null && count > 0 && (
              <span className="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold inline-flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {tab === "programme" && <ProgrammePane agenda={agenda} onToggle={toggle} />}
        {tab === "agenda" && <AgendaPane agenda={agenda} onToggle={toggle} goProgramme={() => setTab("programme")} />}
        {tab === "alertes" && <AlertesPane agenda={agenda} />}
      </div>
    </div>
  );
};

/* ═══ PROGRAMME ═══ */
const ProgrammePane = ({ agenda, onToggle }: { agenda: string[]; onToggle: (id: string) => void }) => {
  const [day, setDay] = useState("11-08");
  const [sport, setSport] = useState("Tous");
  const [showFilters, setShowFilters] = useState(false);

  const quickSports = ["Tous", "Athlétisme", "Natation", "Festivités"];
  const allSports = ["Tous", ...COMPETITION_SPORTS.map((s) => s.name), ...MOBILISATION_SPORTS.map((s) => s.name), "Festivités"];

  const matchSport = (s: Session) => {
    if (sport === "Tous") return true;
    if (sport === "Festivités") return s.kind !== "sport";
    const slug = [...COMPETITION_SPORTS, ...MOBILISATION_SPORTS].find((x) => x.name === sport)?.slug;
    return s.sportSlug === slug;
  };
  const list = SESSIONS.filter((s) => s.day === day && matchSport(s)).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex flex-col min-h-0">
      {/* Sélecteur de dates */}
      <div className="flex gap-2 px-5 pt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-shrink-0">
        {GAME_DAYS.map((g) => {
          const on = g.key === day;
          return (
            <button key={g.key} onClick={() => setDay(g.key)} className={cn(
              "flex-shrink-0 rounded-[14px] border-[1.5px] px-3.5 py-2 text-center min-w-[54px] transition-base",
              on ? "bg-foreground text-background border-foreground" : "bg-card border-border",
            )}>
              <div className="font-mono text-[9px] tracking-wide opacity-80">{g.dow}</div>
              <div className="font-display font-extrabold text-lg leading-tight">{g.dayNum}</div>
            </button>
          );
        })}
      </div>

      {/* Filtres rapides */}
      <div className="flex items-center gap-2 px-5 pt-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-shrink-0">
        <button onClick={() => setShowFilters(true)} className="flex-shrink-0 inline-flex items-center gap-1.5 border-[1.5px] border-border bg-card rounded-[11px] px-3 py-2 text-[13px] font-semibold">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filtres
          {sport !== "Tous" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
        </button>
        {quickSports.map((s) => (
          <button key={s} onClick={() => setSport(s)} className={cn(
            "flex-shrink-0 rounded-full border px-3 py-2 text-[12.5px] transition-base",
            sport === s ? "bg-foreground text-background border-foreground font-semibold" : "bg-card border-border text-foreground/80",
          )}>{s}</button>
        ))}
      </div>

      {/* Liste */}
      <div className="px-5 py-4 flex flex-col gap-2.5">
        <div className="font-mono text-[10.5px] text-muted-foreground">{list.length} séance{list.length > 1 ? "s" : ""} · {dayLong(day)}</div>
        {list.length > 0 ? list.map((s) => (
          <SessionRow key={s.id} s={s} inAgenda={agenda.includes(s.id)} onToggle={() => onToggle(s.id)} />
        )) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="font-semibold text-foreground/80">Aucune épreuve</div>
            <div className="text-[13px] mt-1">Ajustez la date ou le filtre sport.</div>
          </div>
        )}
      </div>

      {/* Sheet filtres */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setShowFilters(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="relative bg-background rounded-t-3xl p-5 pb-8 max-h-[70vh] overflow-y-auto animate-[sheetUp_.25s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded bg-border mx-auto mb-4" />
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-lg">Filtrer par sport</h3>
              <button onClick={() => setSport("Tous")} className="text-[13px] font-semibold text-primary">Réinitialiser</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {allSports.map((s) => (
                <button key={s} onClick={() => { setSport(s); setShowFilters(false); }} className={cn(
                  "rounded-full border-[1.5px] px-3.5 py-2 text-[13px] transition-base",
                  sport === s ? "bg-foreground text-background border-foreground font-semibold" : "border-border text-foreground/80",
                )}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SessionRow = ({ s, inAgenda, onToggle }: { s: Session; inAgenda: boolean; onToggle: () => void }) => {
  const meta = kindMeta(s);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm">
      <div className="flex-shrink-0 w-[48px] text-center border-r border-border pr-3">
        <div className="font-display font-extrabold text-base leading-none">{s.time}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={cn("font-mono text-[8.5px] font-bold tracking-wider px-1.5 py-0.5 rounded", meta.cls)}>{meta.txt}</span>
        </div>
        <div className="font-display font-bold text-[15px] mt-1 leading-tight truncate">{s.title}</div>
        <div className="flex items-center gap-1 text-[11.5px] text-muted-foreground mt-0.5">
          <MapPin className="h-3 w-3 flex-shrink-0" /> <span className="truncate">{s.venue} · {s.city}</span>
        </div>
      </div>
      <button onClick={onToggle} className={cn(
        "flex-shrink-0 h-9 w-9 rounded-xl inline-flex items-center justify-center transition-base",
        inAgenda ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
      )}>
        {inAgenda ? <Check className="h-[18px] w-[18px]" strokeWidth={2.6} /> : <Plus className="h-[18px] w-[18px]" strokeWidth={2.2} />}
      </button>
    </div>
  );
};

/* ═══ AGENDA ═══ */
const AgendaPane = ({ agenda, onToggle, goProgramme }: { agenda: string[]; onToggle: (id: string) => void; goProgramme: () => void }) => {
  const mine = useMemo(() => SESSIONS.filter((s) => agenda.includes(s.id)).sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time)), [agenda]);
  const conflicts = useMemo(() => {
    const set = new Set<string>();
    const byDay = new Map<string, Session[]>();
    mine.forEach((s) => { (byDay.get(s.day) ?? byDay.set(s.day, []).get(s.day)!).push(s); });
    byDay.forEach((l) => { for (let i = 0; i < l.length; i++) for (let j = i + 1; j < l.length; j++) if (t2m(l[i].time) < endOf(l[j]) && t2m(l[j].time) < endOf(l[i])) { set.add(l[i].id); set.add(l[j].id); } });
    return set;
  }, [mine]);
  const grouped = useMemo(() => { const m = new Map<string, Session[]>(); mine.forEach((s) => { (m.get(s.day) ?? m.set(s.day, []).get(s.day)!).push(s); }); return Array.from(m.entries()); }, [mine]);

  if (mine.length === 0) return (
    <div className="text-center px-8 py-16">
      <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto">
        <ListChecks className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="font-display font-bold text-lg mt-4">Journée libre</div>
      <div className="text-sm text-muted-foreground mt-1">Ajoutez des épreuves depuis le programme.</div>
      <button onClick={goProgramme} className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl">
        Voir le programme <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </div>
  );

  return (
    <div className="px-5 py-4 flex flex-col gap-6">
      {conflicts.size > 0 && (
        <div className="flex items-start gap-2.5 bg-live/10 border border-live/30 rounded-2xl p-3.5">
          <AlertTriangle className="h-[18px] w-[18px] text-live flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-[13px]">Conflit d'horaires détecté</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">{conflicts.size} épreuves se chevauchent.</div>
          </div>
        </div>
      )}
      {grouped.map(([d, list]) => (
        <div key={d}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <h2 className="font-display font-extrabold text-base">{dayLong(d)}</h2>
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground">{list.length}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {list.map((s) => <AgendaCard key={s.id} s={s} conflict={conflicts.has(s.id)} onRemove={() => onToggle(s.id)} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

const AgendaCard = ({ s, conflict, onRemove }: { s: Session; conflict: boolean; onRemove: () => void }) => {
  const dep = (() => { const m = t2m(s.time) - 40; const h = Math.floor(((m % 1440) + 1440) % 1440 / 60); const mm = ((m % 60) + 60) % 60; return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; })();
  return (
    <div className={cn("rounded-2xl border bg-card p-3.5", conflict ? "border-live/40" : "border-border")}>
      <div className="flex items-center gap-2">
        <span className="font-display font-extrabold text-[15px]">{s.time}</span>
        {conflict && <span className="font-mono text-[8px] font-bold bg-live text-live-foreground px-1.5 py-0.5 rounded">CONFLIT</span>}
        <span className="font-mono text-[9px] uppercase text-muted-foreground ml-auto truncate">{s.phase ?? s.kind}</span>
      </div>
      <div className="font-display font-bold text-[15px] mt-1.5 leading-tight">{s.title}</div>
      <div className="flex items-center gap-1 text-[11.5px] text-muted-foreground mt-1">
        <MapPin className="h-3 w-3" /> {s.venue} · {s.city}
      </div>
      <div className="flex items-center gap-2.5 mt-2.5 bg-primary/5 rounded-xl px-3 py-2.5">
        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <ArrowRight className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.1} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold">Départ conseillé {dep}</div>
          <div className="text-[10.5px] text-muted-foreground">trajet + marge</div>
        </div>
        <button onClick={onRemove} className="text-muted-foreground hover:text-live p-1 flex-shrink-0">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

/* ═══ ALERTES ═══ */
const AlertesPane = ({ agenda }: { agenda: string[] }) => {
  const [r, setR] = useState({ h1: true, m30: true, recap: false });
  const mine = SESSIONS.filter((s) => agenda.includes(s.id)).sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time));
  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={cn("relative w-[46px] h-[28px] rounded-full transition-base flex-shrink-0", on ? "bg-primary" : "bg-muted")}>
      <span className={cn("absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all", on ? "left-[21px]" : "left-[3px]")} />
    </button>
  );
  return (
    <div className="px-5 py-4 flex flex-col gap-6">
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Rappels automatiques</div>
        <div className="mt-3 border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {[
            { key: "h1" as const, icon: Clock, title: "1 h avant", sub: "Le temps de se préparer" },
            { key: "m30" as const, icon: Clock, title: "30 min avant", sub: "Dernier rappel + départ conseillé" },
            { key: "recap" as const, icon: ListChecks, title: "Récap quotidien", sub: "Chaque matin à 7:30" },
          ].map(({ key, icon: Icon, title, sub }) => (
            <div key={key} className="flex items-center gap-3 p-3.5">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </div>
              <div className="flex-1"><div className="font-semibold text-[14px]">{title}</div><div className="text-[12px] text-muted-foreground">{sub}</div></div>
              <Toggle on={r[key]} onClick={() => setR((p) => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">Prochains rappels</div>
        {mine.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2.5">
            {mine.map((s) => (
              <div key={s.id} className="flex items-center gap-3 border border-border rounded-xl p-3 bg-card">
                <div className="text-center min-w-[46px]">
                  <div className="font-display font-extrabold text-primary text-[15px] leading-none">{s.time}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-0.5">{dayShort(s.day)}</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex-1 min-w-0"><div className="font-semibold text-[13.5px] truncate">{s.title}</div><div className="text-[11px] text-muted-foreground">{s.venue}</div></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground mt-3 py-8 text-center border border-dashed border-border rounded-xl">
            Aucun rappel — ajoutez des épreuves à votre agenda.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammeApp;

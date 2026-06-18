import { useState, useMemo } from "react";
import {
  Search, MapPin, CalendarDays, Plus, Check, ChevronDown, X,
  Clock, AlertTriangle, ArrowRight, Trash2, Bell, ListChecks,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/pages/Home";
import {
  COMPETITION_SPORTS, MOBILISATION_SPORTS, SESSIONS, GAME_DAYS, CITIES,
  type Session, type City,
} from "@/data/sports";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/*
  Programme (web) — reprend le design du Planner mobile Claude :
  3 onglets segmentés Programme / Agenda / Alertes, adaptés en layout web large.
  - Programme : recherche + filtres (lieu / date calendrier / sport déroulant) + séances + ajout agenda
  - Agenda    : récap du jour, détection de conflits d'horaires, reco de départ, timeline
  - Alertes   : réglages rappels (1h / 30 min / récap) + prochains rappels
  Agenda persistant en localStorage (clé partagée avec le mobile).
*/

const AGENDA_KEY = "dakargo-agenda";
type Tab = "programme" | "agenda" | "alertes";

const kindBadge: Record<Session["kind"], { label: string; cls: string }> = {
  sport: { label: "ÉPREUVE", cls: "bg-muted text-muted-foreground" },
  ceremony: { label: "CÉRÉMONIE", cls: "bg-accent text-accent-foreground" },
  festival: { label: "FÊTE", cls: "bg-accent text-accent-foreground" },
};

const dayLabel = (key: string) => {
  const d = GAME_DAYS.find((g) => g.key === key);
  return d ? `${d.dow} ${d.dayNum} ${d.mon}` : key;
};
const t2m = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const endOf = (s: Session) => t2m(s.time) + 90; // durée approx. 90 min

const Programme = () => {
  const [tab, setTab] = useState<Tab>("programme");
  const [agenda, setAgenda] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(AGENDA_KEY) || "[]"); } catch { return []; }
  });

  const toggleAgenda = (id: string) => {
    setAgenda((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(AGENDA_KEY, JSON.stringify(next));
      toast(has ? "Retiré de mon agenda" : "Ajouté à mon agenda");
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-8 py-10 lg:py-14">
        <SectionHeader
          kicker="01 — Programme"
          title="Programme"
          lead="25 sports, 151 épreuves et les temps forts du 31 octobre au 13 novembre. Composez votre agenda, on gère les conflits et l'heure de départ."
        />

        {/* Onglets segmentés (comme le Planner mobile) */}
        <div className="inline-flex mt-8 bg-muted rounded-xl p-1 gap-1">
          {([
            { id: "programme", label: "Programme", icon: CalendarDays },
            { id: "agenda", label: "Mon agenda", icon: ListChecks, count: agenda.length },
            { id: "alertes", label: "Alertes", icon: Bell },
          ] as const).map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-base",
                tab === id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {count != null && count > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-7">
          {tab === "programme" && <ProgrammeTab agenda={agenda} onToggle={toggleAgenda} />}
          {tab === "agenda" && <AgendaTab agenda={agenda} onToggle={toggleAgenda} goProgramme={() => setTab("programme")} />}
          {tab === "alertes" && <AlertesTab agenda={agenda} />}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════ ONGLET PROGRAMME ═══════════════ */
const chip = (active: boolean) => cn(
  "rounded-xl border px-4 py-3 text-sm font-medium transition-base whitespace-nowrap",
  active ? "bg-foreground text-background border-foreground" : "bg-card border-border text-foreground/80 hover:bg-muted",
);

const ProgrammeTab = ({ agenda, onToggle }: { agenda: string[]; onToggle: (id: string) => void }) => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<City | "all">("all");
  const [day, setDay] = useState<string | "all">("all");
  const [sport, setSport] = useState("all");
  const sportsForSelect = [...COMPETITION_SPORTS, ...MOBILISATION_SPORTS];

  const sessions = useMemo(() =>
    SESSIONS
      .filter((s) =>
        (city === "all" || s.city === city) &&
        (day === "all" || s.day === day) &&
        (sport === "all" || s.sportSlug === sport) &&
        (query === "" || s.title.toLowerCase().includes(query.toLowerCase()) || s.venue.toLowerCase().includes(query.toLowerCase())))
      .sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time)),
  [city, day, sport, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Session[]>();
    sessions.forEach((s) => { if (!map.has(s.day)) map.set(s.day, []); map.get(s.day)!.push(s); });
    return Array.from(map.entries());
  }, [sessions]);

  const activeFilters = (city !== "all" ? 1 : 0) + (day !== "all" ? 1 : 0) + (sport !== "all" ? 1 : 0);
  const reset = () => { setCity("all"); setDay("all"); setSport("all"); setQuery(""); };

  return (
    <>
      {/* Filtres */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2.5 border border-border rounded-xl bg-card px-4 py-3">
          <Search className="h-[18px] w-[18px] text-muted-foreground flex-shrink-0" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une épreuve, un lieu…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCity("all")} className={chip(city === "all")}>Tous les lieux</button>
          {CITIES.map((c) => <button key={c} onClick={() => setCity(c)} className={chip(city === c)}>{c}</button>)}
        </div>
        <Popover>
          <PopoverTrigger className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-base",
            day !== "all" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card hover:bg-muted",
          )}>
            <CalendarDays className="h-4 w-4" />
            {day === "all" ? "Date" : dayLabel(day)}
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 p-2">
            <div className="grid grid-cols-4 gap-1.5">
              <button onClick={() => setDay("all")} className={cn(
                "col-span-4 rounded-lg py-2 text-[13px] font-medium transition-base",
                day === "all" ? "bg-foreground text-background" : "hover:bg-muted",
              )}>Toutes les dates</button>
              {GAME_DAYS.map((g) => (
                <button key={g.key} onClick={() => setDay(g.key)} className={cn(
                  "rounded-lg py-2 text-center transition-base",
                  day === g.key ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}>
                  <div className="font-mono text-[8.5px] uppercase opacity-70">{g.dow}</div>
                  <div className="font-display font-bold text-sm leading-none mt-0.5">{g.dayNum}</div>
                  <div className="font-mono text-[8px] uppercase opacity-60">{g.mon}</div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Select value={sport} onValueChange={setSport}>
          <SelectTrigger className="w-full lg:w-[200px] rounded-xl border-border bg-card h-[46px]">
            <SelectValue placeholder="Tous les sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les sports</SelectItem>
            {sportsForSelect.map((s) => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <span className="text-sm text-muted-foreground">{sessions.length} séance{sessions.length > 1 ? "s" : ""}</span>
        {activeFilters > 0 && (
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
            <X className="h-3.5 w-3.5" /> Réinitialiser
          </button>
        )}
      </div>

      {grouped.length > 0 ? (
        <div className="mt-6 flex flex-col gap-8">
          {grouped.map(([d, list]) => (
            <div key={d}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-display font-extrabold text-lg">{dayLabel(d)}</h2>
                <span className="font-mono text-[11px] text-muted-foreground">{list.length} séance{list.length > 1 ? "s" : ""}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {list.map((s) => <SessionRow key={s.id} session={s} inAgenda={agenda.includes(s.id)} onToggle={() => onToggle(s.id)} />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Aucune séance trouvée" sub="Ajustez la recherche ou les filtres." />
      )}
    </>
  );
};

const SessionRow = ({ session: s, inAgenda, onToggle }: { session: Session; inAgenda: boolean; onToggle: () => void }) => {
  const badge = kindBadge[s.kind];
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex-shrink-0 w-[52px] text-center border-r border-border pr-4">
        <div className="font-display font-extrabold text-lg leading-none">{s.time}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded", badge.cls)}>{badge.label}</span>
          {s.phase && <span className="font-mono text-[9.5px] uppercase tracking-wide text-muted-foreground">{s.phase}</span>}
        </div>
        <div className="font-display font-bold text-[15.5px] mt-1.5 leading-tight truncate">{s.title}</div>
        <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" /> <span className="truncate">{s.venue} · {s.city}</span>
        </div>
      </div>
      <button onClick={onToggle} aria-label={inAgenda ? "Retirer" : "Ajouter à mon agenda"}
        className={cn("flex-shrink-0 h-10 w-10 rounded-xl inline-flex items-center justify-center transition-base",
          inAgenda ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20")}>
        {inAgenda ? <Check className="h-5 w-5" strokeWidth={2.6} /> : <Plus className="h-5 w-5" strokeWidth={2.2} />}
      </button>
    </div>
  );
};

/* ═══════════════ ONGLET AGENDA ═══════════════ */
const AgendaTab = ({ agenda, onToggle, goProgramme }: { agenda: string[]; onToggle: (id: string) => void; goProgramme: () => void }) => {
  const mine = useMemo(() =>
    SESSIONS.filter((s) => agenda.includes(s.id)).sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time)),
  [agenda]);

  // Détection de conflits (chevauchement horaire le même jour)
  const conflictIds = useMemo(() => {
    const set = new Set<string>();
    const byDay = new Map<string, Session[]>();
    mine.forEach((s) => { if (!byDay.has(s.day)) byDay.set(s.day, []); byDay.get(s.day)!.push(s); });
    byDay.forEach((list) => {
      for (let i = 0; i < list.length; i++)
        for (let j = i + 1; j < list.length; j++)
          if (t2m(list[i].time) < endOf(list[j]) && t2m(list[j].time) < endOf(list[i])) {
            set.add(list[i].id); set.add(list[j].id);
          }
    });
    return set;
  }, [mine]);

  const grouped = useMemo(() => {
    const map = new Map<string, Session[]>();
    mine.forEach((s) => { if (!map.has(s.day)) map.set(s.day, []); map.get(s.day)!.push(s); });
    return Array.from(map.entries());
  }, [mine]);

  if (mine.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-border rounded-[18px]">
        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto">
          <CalendarDays className="h-7 w-7 text-muted-foreground" />
        </div>
        <div className="font-display font-bold text-lg mt-4">Votre agenda est vide</div>
        <div className="text-sm text-muted-foreground mt-1">Ajoutez des épreuves depuis le programme.</div>
        <button onClick={goProgramme} className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-base">
          Voir le programme <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {conflictIds.size > 0 && (
        <div className="flex items-start gap-3 bg-live/10 border border-live/30 rounded-2xl p-4">
          <AlertTriangle className="h-5 w-5 text-live flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Conflit d'horaires détecté</div>
            <div className="text-[13px] text-muted-foreground mt-0.5">
              {conflictIds.size} séances se chevauchent. Repérez les badges « conflit » ci-dessous pour ajuster.
            </div>
          </div>
        </div>
      )}
      {grouped.map(([d, list]) => (
        <div key={d}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-display font-extrabold text-lg">{dayLabel(d)}</h2>
            <span className="font-mono text-[11px] text-muted-foreground">{list.length} épreuve{list.length > 1 ? "s" : ""}</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {list.map((s) => (
              <AgendaCard key={s.id} session={s} conflict={conflictIds.has(s.id)} onRemove={() => onToggle(s.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AgendaCard = ({ session: s, conflict, onRemove }: { session: Session; conflict: boolean; onRemove: () => void }) => {
  // Reco de départ : heure - 40 min (trajet + marge, simplifié)
  const dep = (() => { const m = t2m(s.time) - 40; const h = Math.floor(((m % 1440) + 1440) % 1440 / 60); const mm = (((m % 60) + 60) % 60); return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; })();
  return (
    <div className={cn("rounded-2xl border bg-card p-4", conflict ? "border-live/40" : "border-border")}>
      <div className="flex items-center gap-2">
        <span className="font-display font-extrabold text-base">{s.time}</span>
        {conflict && <span className="font-mono text-[8.5px] font-bold tracking-wider bg-live text-live-foreground px-1.5 py-0.5 rounded">CONFLIT</span>}
        <span className="font-mono text-[9.5px] uppercase text-muted-foreground ml-auto">{s.phase ?? s.kind}</span>
      </div>
      <div className="font-display font-bold text-base mt-2 leading-tight">{s.title}</div>
      <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground mt-1">
        <MapPin className="h-3.5 w-3.5" /> {s.venue} · {s.city}
      </div>
      <div className="flex items-center gap-3 mt-3 bg-primary/5 rounded-xl px-3 py-2.5">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <ArrowRight className="h-4 w-4 text-primary-foreground" strokeWidth={2.1} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-semibold">Départ conseillé {dep}</div>
          <div className="text-[11px] text-muted-foreground">trajet estimé + marge de sécurité</div>
        </div>
        <button onClick={onRemove} aria-label="Retirer" className="text-muted-foreground hover:text-live transition-base flex-shrink-0 p-1">
          <Trash2 className="h-[17px] w-[17px]" />
        </button>
      </div>
    </div>
  );
};

/* ═══════════════ ONGLET ALERTES ═══════════════ */
const AlertesTab = ({ agenda }: { agenda: string[] }) => {
  const [reminders, setReminders] = useState({ h1: true, m30: true, recap: false });
  const mine = SESSIONS.filter((s) => agenda.includes(s.id)).sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time));

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={cn("relative w-[46px] h-[28px] rounded-full transition-base flex-shrink-0", on ? "bg-primary" : "bg-muted")}>
      <span className={cn("absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all", on ? "left-[21px]" : "left-[3px]")} />
    </button>
  );

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Rappels automatiques</div>
        <div className="mt-3 border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {[
            { key: "h1" as const, icon: Clock, title: "1 h avant", sub: "Le temps de se préparer" },
            { key: "m30" as const, icon: Clock, title: "30 min avant", sub: "Dernier rappel + départ conseillé" },
            { key: "recap" as const, icon: ListChecks, title: "Récap quotidien", sub: "Chaque matin à 7:30" },
          ].map(({ key, icon: Icon, title, sub }) => (
            <div key={key} className="flex items-center gap-3 p-4">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[14.5px]">{title}</div>
                <div className="text-[12.5px] text-muted-foreground">{sub}</div>
              </div>
              <Toggle on={reminders[key]} onClick={() => setReminders((r) => ({ ...r, [key]: !r[key] }))} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Prochains rappels</div>
        {mine.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2.5">
            {mine.map((s) => (
              <div key={s.id} className="flex items-center gap-3.5 border border-border rounded-xl p-3.5 bg-card">
                <div className="text-center min-w-[52px]">
                  <div className="font-display font-extrabold text-primary text-base leading-none">{s.time}</div>
                  <div className="font-mono text-[9px] text-muted-foreground mt-0.5">{dayLabel(s.day)}</div>
                </div>
                <div className="w-px h-9 bg-border" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] truncate">{s.title}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{s.venue}</div>
                </div>
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

const EmptyState = ({ title, sub }: { title: string; sub: string }) => (
  <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-[18px]">
    <div className="font-semibold text-base text-foreground/80">{title}</div>
    <div className="text-[13.5px] mt-1">{sub}</div>
  </div>
);

export default Programme;

import { Search, CalendarDays, MapPin, Plus, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import AnchoredPopover from "@/components/app/AnchoredPopover";
import { PROG_EVENTS, dayLabel, jojDays, PROG_VENUE_INFO } from "@/data/appMock";

/*
  ProgrammeApp — écran Programme (mobile). Recherche + filtres date/lieu en
  petits pop-ups ancrés (calendrier JOJ / liste des lieux) qui se ferment au
  clic ailleurs. Liste des séances du jour + ajout à l'agenda. Touch d'une
  séance → détail (EventSheet global).
*/

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

const ProgrammeApp = () => {
  const progDay = useApp((s) => s.progDay);
  const progVenue = useApp((s) => s.progVenue);
  const progSheet = useApp((s) => s.progSheet);
  const setProgDay = useApp((s) => s.setProgDay);
  const setProgVenue = useApp((s) => s.setProgVenue);
  const setProgSheet = useApp((s) => s.setProgSheet);
  const setEventId = useApp((s) => s.setEventId);
  const agenda = useApp((s) => s.agenda);
  const toggleAgenda = useApp((s) => s.toggleAgenda);

  const events = (PROG_EVENTS[progDay] || []).filter(
    (e) => progVenue === "Tous" || e.venue === progVenue,
  );

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <h2 className="font-display font-extrabold text-[30px] tracking-tight">Programme</h2>
      <p className="text-[14.5px] text-muted-foreground mt-1.5">Touchez une épreuve pour voir les détails.</p>

      {/* search + filter buttons (pop-ups ancrés) */}
      <div className="flex items-center gap-2.5 mt-[18px]">
        <div className="flex-1 flex items-center gap-2.5 bg-muted rounded-[14px] px-[15px] py-[13px]">
          <Search className="w-[17px] h-[17px] text-muted-foreground" strokeWidth={2} />
          <span className="text-sm text-muted-foreground">Rechercher…</span>
        </div>

        {/* filtre date */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setProgSheet(progSheet === "date" ? null : "date")}
            aria-label="Filtrer par date"
            className={cn(
              "w-[50px] h-[50px] rounded-[14px] border flex items-center justify-center transition-base",
              progSheet === "date" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background",
            )}
          >
            <CalendarDays className="w-[21px] h-[21px]" strokeWidth={1.8} />
          </button>
          <AnchoredPopover
            open={progSheet === "date"}
            onClose={() => setProgSheet(null)}
            className="right-0 top-[56px] w-[268px] p-3.5"
          >
            <div className="font-display font-extrabold text-[15px] tracking-tight">Choisir une date</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">31 oct → 13 nov 2026</div>
            <div className="grid grid-cols-7 gap-1 mt-2.5 text-center">
              {WEEKDAYS.map((w, i) => (
                <div key={i} className="font-mono text-[9px] text-muted-foreground py-0.5">{w}</div>
              ))}
              {Array.from({ length: jojDays()[0]?.weekday ?? 0 }).map((_, i) => (
                <div key={`lead-${i}`} />
              ))}
              {jojDays().map((d) => {
                const on = d.key === progDay;
                return (
                  <button
                    key={d.key}
                    disabled={!d.available}
                    onClick={() => setProgDay(d.key)}
                    className={cn(
                      "aspect-square rounded-[9px] flex items-center justify-center text-[12.5px] font-semibold transition-base",
                      on && "bg-primary text-primary-foreground",
                      !on && d.available && "bg-muted hover:bg-primary/10",
                      !d.available && "text-muted-foreground/40 cursor-default",
                    )}
                  >
                    {d.date}
                  </button>
                );
              })}
            </div>
          </AnchoredPopover>
        </div>

        {/* filtre lieu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setProgSheet(progSheet === "lieu" ? null : "lieu")}
            aria-label="Filtrer par lieu"
            className={cn(
              "w-[50px] h-[50px] rounded-[14px] border flex items-center justify-center transition-base",
              progSheet === "lieu" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background",
            )}
          >
            <MapPin className="w-[21px] h-[21px]" strokeWidth={1.8} />
          </button>
          <AnchoredPopover
            open={progSheet === "lieu"}
            onClose={() => setProgSheet(null)}
            className="right-0 top-[56px] w-[250px] p-2"
          >
            <div className="font-display font-extrabold text-[14px] tracking-tight px-2 pt-1.5 pb-1">Lieu</div>
            <div className="max-h-[280px] overflow-y-auto scr">
              {PROG_VENUE_INFO.map((v) => {
                const on = v.name === progVenue;
                return (
                  <button
                    key={v.name}
                    onClick={() => setProgVenue(v.name)}
                    className={cn(
                      "w-full text-left rounded-[10px] px-2.5 py-2 flex items-center gap-2 transition-base",
                      on ? "bg-primary/10" : "hover:bg-muted",
                    )}
                  >
                    <MapPin className={cn("w-4 h-4 flex-shrink-0", on ? "text-primary" : "text-muted-foreground")} strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-[13px] font-semibold truncate", on && "text-primary")}>
                        {v.name === "Tous" ? "Tous les lieux" : v.name}
                      </div>
                      <div className="text-[10.5px] text-muted-foreground truncate">{v.city}</div>
                    </div>
                    {on && <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.6} />}
                  </button>
                );
              })}
            </div>
          </AnchoredPopover>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3.5 text-[13px] text-muted-foreground">
        <span className="font-semibold text-foreground">{dayLabel(progDay)}</span>
        <span className="opacity-45">·</span>
        <span>{progVenue === "Tous" ? "Tous les lieux" : progVenue}</span>
      </div>

      {/* events */}
      <div className="mt-4 flex flex-col gap-1">
        {events.map((e) => {
          const inA = agenda.includes(e.id);
          return (
            <div key={e.id}>
              <div className="flex items-center gap-3.5 py-1.5">
                <div
                  onClick={() => setEventId(e.id)}
                  className="cursor-pointer flex-1 flex items-center gap-3.5 min-w-0"
                >
                  <div className="text-center flex-shrink-0 w-[46px]">
                    <div className={cn("font-display font-extrabold text-[18px] leading-none", e.live ? "text-destructive" : "text-foreground")}>
                      {e.time}
                    </div>
                    {e.live && (
                      <div className="inline-flex items-center gap-[3px] mt-1.5 text-[9px] font-bold text-destructive">
                        <span className="w-[5px] h-[5px] rounded-full bg-destructive anim-live" />
                        LIVE
                      </div>
                    )}
                  </div>
                  <div className="w-px self-stretch bg-border flex-shrink-0 min-h-[46px]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">{e.sport}</div>
                    <div className="font-display font-bold text-[16.5px] leading-[1.2] mt-0.5">{e.title}</div>
                    <div className="text-[12.5px] text-muted-foreground mt-[3px]">{e.venue}</div>
                  </div>
                  <ChevronRight className="w-[18px] h-[18px] text-border flex-shrink-0" strokeWidth={2} />
                </div>
                <button
                  onClick={() => toggleAgenda(e.id)}
                  aria-label="Ajouter à l'agenda"
                  className={cn(
                    "w-[42px] h-[42px] rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 transition-base",
                    inA ? "bg-primary" : "bg-primary/10",
                  )}
                >
                  {inA ? (
                    <Check className="w-[19px] h-[19px] text-primary-foreground" strokeWidth={2.6} />
                  ) : (
                    <Plus className="w-[19px] h-[19px] text-primary" strokeWidth={2.2} />
                  )}
                </button>
              </div>
              <div className="h-px bg-border/60" />
            </div>
          );
        })}
        {events.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-10">
            Aucune séance pour ce filtre.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammeApp;

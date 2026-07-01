import { Search, CalendarDays, MapPin, Plus, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import CalendarSheet from "@/components/app/CalendarSheet";
import VenueSheet from "@/components/app/VenueSheet";
import { PROG_EVENTS, dayLabel } from "@/data/appMock";

/*
  ProgrammeApp — écran Programme (mobile), fidèle au prototype (Prototype-2).
  Recherche + filtres date/lieu (sheets), liste des séances du jour avec
  ajout à l'agenda. Touch d'une séance → détail (EventSheet global).
*/

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

      {/* search + filter buttons */}
      <div className="flex items-center gap-2.5 mt-[18px]">
        <div className="flex-1 flex items-center gap-2.5 bg-muted rounded-[14px] px-[15px] py-[13px]">
          <Search className="w-[17px] h-[17px] text-muted-foreground" strokeWidth={2} />
          <span className="text-sm text-muted-foreground">Rechercher…</span>
        </div>
        <button
          onClick={() => setProgSheet("date")}
          aria-label="Filtrer par date"
          className="w-[50px] h-[50px] flex-shrink-0 rounded-[14px] border border-border bg-background flex items-center justify-center"
        >
          <CalendarDays className="w-[21px] h-[21px]" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => setProgSheet("lieu")}
          aria-label="Filtrer par lieu"
          className="w-[50px] h-[50px] flex-shrink-0 rounded-[14px] border border-border bg-background flex items-center justify-center"
        >
          <MapPin className="w-[21px] h-[21px]" strokeWidth={1.8} />
        </button>
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

      {/* filter sheets */}
      <CalendarSheet
        open={progSheet === "date"}
        onClose={() => setProgSheet(null)}
        active={progDay}
        onSelect={setProgDay}
      />
      <VenueSheet
        open={progSheet === "lieu"}
        onClose={() => setProgSheet(null)}
        active={progVenue}
        onSelect={setProgVenue}
      />
    </div>
  );
};

export default ProgrammeApp;

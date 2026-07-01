import BottomSheet from "./BottomSheet";
import { jojDays, JOJ_END } from "@/data/appMock";
import { cn } from "@/lib/utils";

/*
  CalendarSheet — mini-calendrier des JOJ (31 oct → 13 nov 2026). Seuls les
  jours proposant des séances sont sélectionnables. Style grille compacte.
*/

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

interface CalendarSheetProps {
  open: boolean;
  onClose: () => void;
  active: string;
  onSelect: (key: string) => void;
}

const CalendarSheet = ({ open, onClose, active, onSelect }: CalendarSheetProps) => {
  const days = jojDays();
  // Décalage de la 1re case selon le jour de semaine du 31 oct.
  const lead = days.length ? days[0].weekday : 0;

  return (
    <BottomSheet open={open} onClose={onClose} className="p-[22px]">
      <div className="font-display font-extrabold text-xl tracking-tight">Choisir une date</div>
      <div className="text-[13px] text-muted-foreground mt-1">31 oct → 13 nov 2026</div>

      <div className="grid grid-cols-7 gap-1.5 mt-4 text-center">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="font-mono text-[10px] text-muted-foreground py-1">{w}</div>
        ))}
        {Array.from({ length: lead }).map((_, i) => (
          <div key={`lead-${i}`} />
        ))}
        {days.map((d) => {
          const on = d.key === active;
          const monthTag = d.date === 1 || d.key === days[0].key; // marque le début de mois
          return (
            <button
              key={d.key}
              disabled={!d.available}
              onClick={() => d.available && onSelect(d.key)}
              className={cn(
                "aspect-square rounded-[12px] flex flex-col items-center justify-center text-[15px] font-semibold transition-base relative",
                on && "bg-primary text-primary-foreground",
                !on && d.available && "bg-muted text-foreground hover:bg-primary/10",
                !d.available && "text-muted-foreground/40 cursor-default",
              )}
            >
              {d.date}
              {monthTag && (
                <span className={cn("font-mono text-[7px] leading-none mt-0.5", on ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {d.month === 10 ? "OCT" : "NOV"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 text-[11.5px] text-muted-foreground">
        <span className="w-3 h-3 rounded-[4px] bg-muted inline-block" />
        Séances disponibles
        <span className="w-3 h-3 rounded-[4px] bg-primary inline-block ml-3" />
        Sélectionné
      </div>
    </BottomSheet>
  );
};

export default CalendarSheet;

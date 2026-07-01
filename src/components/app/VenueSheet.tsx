import { MapPin, Check } from "lucide-react";
import BottomSheet from "./BottomSheet";
import { PROG_VENUE_INFO } from "@/data/appMock";
import { cn } from "@/lib/utils";

/*
  VenueSheet — sélecteur de site (Programme). Chaque site montre sa ville et
  les sports accueillis, avec une pastille de localisation. Remplace la simple
  liste d'options par un affichage plus lisible.
*/

interface VenueSheetProps {
  open: boolean;
  onClose: () => void;
  active: string;
  onSelect: (name: string) => void;
}

const VenueSheet = ({ open, onClose, active, onSelect }: VenueSheetProps) => (
  <BottomSheet open={open} onClose={onClose} className="p-[22px]" scrollable>
    <div className="font-display font-extrabold text-xl tracking-tight">Choisir un lieu</div>
    <div className="mt-4 flex flex-col gap-2">
      {PROG_VENUE_INFO.map((v) => {
        const on = v.name === active;
        return (
          <button
            key={v.name}
            onClick={() => onSelect(v.name)}
            className={cn(
              "text-left border-[1.5px] rounded-[16px] px-3.5 py-3 flex items-center gap-3 transition-base",
              on ? "border-primary bg-primary/5" : "border-border bg-background",
            )}
          >
            <span className={cn("w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0", on ? "bg-primary" : "bg-muted")}>
              <MapPin className={cn("w-[18px] h-[18px]", on ? "text-primary-foreground" : "text-foreground")} strokeWidth={2} />
            </span>
            <div className="flex-1 min-w-0">
              <div className={cn("font-semibold text-[15px] flex items-center gap-1.5", on && "text-primary")}>
                {v.name === "Tous" ? "Tous les lieux" : v.name}
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5 truncate">{v.city} · {v.sports}</div>
            </div>
            {on && <Check className="w-[18px] h-[18px] text-primary flex-shrink-0" strokeWidth={2.6} />}
          </button>
        );
      })}
    </div>
  </BottomSheet>
);

export default VenueSheet;

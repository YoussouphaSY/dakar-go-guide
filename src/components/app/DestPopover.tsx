import { Check, MapPin } from "lucide-react";
import AnchoredPopover from "./AnchoredPopover";
import { useT } from "@/lib/useT";
import { VENUES } from "@/data/mobility";
import { cn } from "@/lib/utils";

/*
  DestPopover — choix de la destination (site JOJ) en pop-up ANCRÉ sous la
  carte Départ/Arrivée (même UX que le sélecteur de langue / le filtre lieu
  du Programme). À placer dans un conteneur `relative`.
*/

interface DestPopoverProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

const DestPopover = ({ open, onClose, activeId, onSelect, className }: DestPopoverProps) => {
  const { t } = useT();

  return (
    <AnchoredPopover open={open} onClose={onClose} className={cn("w-[300px] p-2", className)}>
      <div className="font-display font-extrabold text-[14px] tracking-tight px-2 pt-1.5 pb-1">
        {t("mo.chooseDest")}
      </div>
      <div className="max-h-[300px] overflow-y-auto scr">
        {VENUES.map((v) => {
          const on = v.id === activeId;
          return (
            <button
              key={v.id}
              onClick={() => { onSelect(v.id); onClose(); }}
              className={cn(
                "w-full text-left rounded-[11px] px-2.5 py-2 flex items-center gap-2.5 transition-base",
                on ? "bg-primary/10" : "hover:bg-muted",
              )}
            >
              <MapPin className={cn("w-[17px] h-[17px] flex-shrink-0", on ? "text-primary" : "text-muted-foreground")} strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <div className={cn("text-[13.5px] font-semibold truncate", on && "text-primary")}>{v.name}</div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {v.city} · {(v.tags ?? []).slice(0, 3).join(" · ")}
                </div>
              </div>
              {on && <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.6} />}
            </button>
          );
        })}
      </div>
    </AnchoredPopover>
  );
};

export default DestPopover;

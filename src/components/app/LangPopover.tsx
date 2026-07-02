import { Check } from "lucide-react";
import AnchoredPopover from "./AnchoredPopover";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { LANGS, type LangId } from "@/data/appMock";
import { cn } from "@/lib/utils";

/*
  LangPopover — choix de la langue en petit pop-up ANCRÉ sous le badge
  (même présentation que le filtre lieu du Programme : liste compacte,
  option active en vert avec une coche). À placer dans un conteneur
  `relative`. Positionné via `className` (ex. right-0 top-[...]).
*/

interface LangPopoverProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const LangPopover = ({ open, onClose, className }: LangPopoverProps) => {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const { t } = useT();

  return (
    <AnchoredPopover open={open} onClose={onClose} className={cn("w-[220px] p-2", className)}>
      <div className="font-display font-extrabold text-[14px] tracking-tight px-2 pt-1.5 pb-1">
        {t("lang.choose")}
      </div>
      <div className="max-h-[280px] overflow-y-auto scr">
        {LANGS.map((l) => {
          const on = l.id === lang;
          return (
            <button
              key={l.id}
              onClick={() => { setLang(l.id as LangId); onClose(); }}
              className={cn(
                "w-full text-left rounded-[10px] px-2.5 py-2 flex items-center gap-2.5 transition-base",
                on ? "bg-primary/10" : "hover:bg-muted",
              )}
            >
              <span className={cn("font-mono text-[11px] font-bold w-7 flex-shrink-0", on ? "text-primary" : "text-muted-foreground")}>
                {l.id}
              </span>
              <span className={cn("flex-1 text-[13.5px] font-semibold truncate", on && "text-primary")}>
                {l.full}
              </span>
              {on && <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.6} />}
            </button>
          );
        })}
      </div>
    </AnchoredPopover>
  );
};

export default LangPopover;

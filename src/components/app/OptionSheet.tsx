import { Check } from "lucide-react";
import BottomSheet from "./BottomSheet";
import { cn } from "@/lib/utils";

/*
  OptionSheet — feuille de sélection (langue, date, lieu). Liste d'options,
  l'option active porte une coche verte. Style prototype.
*/

export interface Option {
  value: string;
  label: string;
}

interface OptionSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  options: Option[];
  active: string;
  onSelect: (value: string) => void;
}

const OptionSheet = ({ open, onClose, title, options, active, onSelect }: OptionSheetProps) => (
  <BottomSheet open={open} onClose={onClose} className="p-[22px]">
    <div className="font-display font-extrabold text-xl tracking-tight">{title}</div>
    <div className="mt-4 flex flex-col gap-2">
      {options.map((o) => {
        const on = o.value === active;
        return (
          <button
            key={o.value}
            onClick={() => onSelect(o.value)}
            className={cn(
              "text-left border-[1.5px] rounded-[14px] px-4 py-[15px] flex items-center gap-3 transition-base",
              on ? "border-primary bg-primary/5" : "border-border bg-background",
            )}
          >
            <span className={cn("flex-1 font-semibold text-[15px]", on && "text-primary")}>
              {o.label}
            </span>
            {on && <Check className="w-[18px] h-[18px] text-primary" strokeWidth={2.6} />}
          </button>
        );
      })}
    </div>
  </BottomSheet>
);

export default OptionSheet;

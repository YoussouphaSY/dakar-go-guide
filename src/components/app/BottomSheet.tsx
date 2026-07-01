import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  BottomSheet — feuille modale ancrée en bas (style prototype).
  Fond assombri cliquable pour fermer + panneau blanc qui remonte.
*/

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Contenu qui défile (max-height + scroll interne). */
  scrollable?: boolean;
  className?: string;
}

const BottomSheet = ({ open, onClose, children, scrollable, className }: BottomSheetProps) => {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div
        className={cn(
          "relative bg-background rounded-t-[30px] anim-sheet shadow-lg",
          scrollable && "max-h-[90%] overflow-y-auto scr",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;

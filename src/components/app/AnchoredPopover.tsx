import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
  AnchoredPopover — petit pop-up qui s'affiche SUR l'écran, ancré près de son
  déclencheur (pas une feuille venant du bas). Se ferme au clic ailleurs ou
  sur Échap. À placer dans un conteneur `relative` ; positionné en absolute.
*/

interface AnchoredPopoverProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Positionnement absolu dans le conteneur relatif parent. */
  className?: string;
}

const AnchoredPopover = ({ open, onClose, children, className }: AnchoredPopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    // délai pour ne pas capter le clic d'ouverture
    const id = setTimeout(() => {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("touchstart", onDown);
      document.addEventListener("keydown", onKey);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-40 bg-background rounded-2xl border border-border shadow-lg anim-fade",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AnchoredPopover;

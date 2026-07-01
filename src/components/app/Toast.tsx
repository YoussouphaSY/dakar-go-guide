import { Check } from "lucide-react";
import { useApp } from "@/store/appStore";

/* Toast — confirmation flottante (ajout agenda, etc.), style prototype. */
const Toast = () => {
  const toast = useApp((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="absolute bottom-24 left-1/2 z-40 anim-toast whitespace-nowrap bg-foreground text-background text-[13px] font-medium px-[18px] py-3 rounded-[13px] flex items-center gap-2.5 shadow-lg">
      <span className="w-[18px] h-[18px] rounded-full bg-primary inline-flex items-center justify-center">
        <Check className="w-[11px] h-[11px] text-primary-foreground" strokeWidth={3.2} />
      </span>
      {toast}
    </div>
  );
};

export default Toast;

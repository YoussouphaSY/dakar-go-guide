import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";

/*
  AyoFab — bouton flottant d'accès à l'assistant AYO (visible sur tous les
  écrans app sauf AYO lui-même). Pastille dorée « accent ».
*/
const AyoFab = () => {
  const nav = useNavigate();
  const loc = useLocation();
  if (loc.pathname === "/ayo") return null;

  return (
    <button
      onClick={() => nav("/ayo")}
      aria-label="Ouvrir AYO"
      className="absolute right-[18px] bottom-24 z-[8] w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_10px_26px_rgba(0,133,63,0.42)] active:scale-95 transition-base"
    >
      <span className="absolute -top-0.5 -right-0.5 w-[15px] h-[15px] rounded-full bg-accent border-2 border-background" />
      <MessageCircle className="w-[26px] h-[26px] text-primary-foreground" strokeWidth={2} />
    </button>
  );
};

export default AyoFab;

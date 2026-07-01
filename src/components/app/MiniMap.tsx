import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Clock, MapPin, Navigation } from "lucide-react";
import { useApp } from "@/store/appStore";
import { HOME_PLACES, type HomeFilter } from "@/data/appMock";

/*
  MiniMap — carte stylisée (SVG) + pins en goutte, reprise du prototype.
  Filtre mono-sélection : n'affiche que les POI du type actif.
  Le clic sur un pin ouvre une info-bulle ANCRÉE juste au-dessus du point
  (et non une feuille en bas), avec actions « S'y rendre » / « Agenda ».
*/

const CAT_COLOR: Record<HomeFilter, string> = {
  comp: "#E2571E",
  faire: "#00853F",
  fest: "#C77A1E",
  resto: "#6E6E68",
};

interface MiniMapProps {
  /** Position de l'utilisateur (%) : left, top. */
  user?: { left: number; top: number };
}

const MiniMap = ({ user = { left: 18, top: 84 } }: MiniMapProps) => {
  const nav = useNavigate();
  const mapFilter = useApp((s) => s.mapFilter);
  const pushToast = useApp((s) => s.pushToast);
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = HOME_PLACES.filter((p) => p.cat === mapFilter);
  const pinColor = CAT_COLOR[mapFilter];
  const active = shown.find((p) => p.id === openId) ?? null;

  return (
    <div className="absolute inset-0 bg-[#EEEFEA]" onClick={() => setOpenId(null)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" className="absolute inset-0 block">
        <rect width="100" height="100" fill="#EFF0EB" />
        <rect x="6" y="52" width="24" height="20" rx="4" fill="#E5EADF" />
        <rect x="44" y="8" width="24" height="16" rx="4" fill="#E5EADF" />
        <g stroke="#E1E1DA" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path d="M0,40 L100,32" strokeWidth="6" />
          <path d="M42,0 L48,100" strokeWidth="5" />
          <path d="M0,70 L100,62" strokeWidth="4" />
          <path d="M6,100 L84,22" strokeWidth="9" />
        </g>
      </svg>

      {shown.map((p) => {
        const on = p.id === openId;
        const size = on ? 36 : 30;
        return (
          <div
            key={p.id}
            onClick={(e) => { e.stopPropagation(); setOpenId(on ? null : p.id); }}
            className="absolute cursor-pointer"
            style={{ left: `${p.left}%`, top: `${p.top}%`, transform: "translate(-50%,-100%)", zIndex: on ? 8 : 4 }}
          >
            <div
              className="flex items-center justify-center border-[2.5px] border-white shadow-[0_4px_12px_rgba(14,15,12,0.28)]"
              style={{ width: size, height: size, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: pinColor }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-white" style={{ transform: "rotate(45deg)" }} />
            </div>
          </div>
        );
      })}

      {/* user location */}
      <div className="absolute" style={{ left: `${user.left}%`, top: `${user.top}%`, transform: "translate(-50%,-50%)" }}>
        <span className="block w-[14px] h-[14px] rounded-full bg-primary border-[3px] border-white shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
      </div>

      {/* bulle compacte ancrée au-dessus du point */}
      {active && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-[20] anim-fade"
          style={{
            left: `${active.left}%`,
            top: `calc(${active.top}% - 42px)`,
            transform: "translate(-50%,-100%)",
            width: 190,
            maxWidth: "74%",
          }}
        >
          <div className="bg-background rounded-[14px] shadow-lg border border-border px-3 py-2.5">
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-[13.5px] leading-[1.1] truncate">{active.name}</div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                    <Clock className="w-[11px] h-[11px] text-primary" strokeWidth={2} />{active.hours}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                    <MapPin className="w-[11px] h-[11px] text-primary" strokeWidth={2} />{active.dist}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpenId(null)}
                aria-label="Fermer"
                className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0"
              >
                <X className="w-3 h-3 text-muted-foreground" strokeWidth={2.6} />
              </button>
            </div>
            <div className="flex gap-1.5 mt-2.5">
              <button
                onClick={() => nav("/mobilite")}
                className="flex-1 bg-primary text-primary-foreground text-[11.5px] font-semibold py-[7px] rounded-[9px] inline-flex items-center justify-center gap-1 active:scale-[0.98] transition-base"
              >
                <Navigation className="w-3 h-3" strokeWidth={2.2} />
                S'y rendre
              </button>
              <button
                onClick={() => { setOpenId(null); pushToast("Ajouté à mon agenda"); }}
                className="bg-background border-[1.5px] border-border text-foreground text-[11.5px] font-semibold px-2.5 py-[7px] rounded-[9px] active:scale-[0.98] transition-base"
              >
                Agenda
              </button>
            </div>
          </div>
          {/* flèche vers le point */}
          <div
            className="mx-auto w-2.5 h-2.5 bg-background border-b border-r border-border"
            style={{ transform: "rotate(45deg) translateY(-5px)", marginTop: -5 }}
          />
        </div>
      )}
    </div>
  );
};

export { CAT_COLOR };
export default MiniMap;

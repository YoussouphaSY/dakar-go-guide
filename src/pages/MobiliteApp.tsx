import {
  ChevronRight, PersonStanding, Bus, Car, Clock,
  ParkingSquare, Cross, Accessibility,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { MODES, PRACTICAL } from "@/data/appMock";

/*
  MobiliteApp — écran Mobilité (mobile), fidèle au prototype (Prototype-2).
  Départ/arrivée, modes (à pied / BRT / taxi), reco de départ, infos sur place.
*/

const MODE_ICON: Record<string, typeof Bus> = {
  walk: PersonStanding,
  bus: Bus,
  taxi: Car,
};

const PRACTICAL_ICON: Record<string, typeof ParkingSquare> = {
  park: ParkingSquare,
  aid: Cross,
  pmr: Accessibility,
};

const MobiliteApp = () => {
  const moMode = useApp((s) => s.moMode);
  const setMoMode = useApp((s) => s.setMoMode);

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <h2 className="font-display font-extrabold text-[30px] tracking-tight">Mobilité</h2>
      <p className="text-[14.5px] text-muted-foreground mt-1.5">Le meilleur trajet vers votre prochaine épreuve.</p>

      {/* from / to */}
      <div className="mt-[18px] bg-background border border-border rounded-[20px] px-4 py-1.5 shadow-sm">
        <div className="flex items-center gap-3.5 py-3.5">
          <span className="w-[11px] h-[11px] rounded-full border-[3px] border-primary flex-shrink-0" />
          <div className="flex-1">
            <div className="text-[11px] text-muted-foreground">Départ</div>
            <div className="font-semibold text-[14.5px]">Ma position · Plateau</div>
          </div>
        </div>
        <div className="h-px bg-border ml-6" />
        <div className="flex items-center gap-3.5 py-3.5">
          <span className="w-[11px] h-[11px] bg-foreground flex-shrink-0" style={{ borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }} />
          <div className="flex-1">
            <div className="text-[11px] text-muted-foreground">Arrivée</div>
            <div className="font-semibold text-[14.5px]">Arène olympique · Diamniadio</div>
          </div>
          <ChevronRight className="w-[18px] h-[18px] text-border" strokeWidth={2} />
        </div>
      </div>

      {/* modes */}
      <div className="mt-[18px] flex flex-col gap-2.5">
        {MODES.map((m) => {
          const on = m.id === moMode;
          const Icon = MODE_ICON[m.id];
          return (
            <button
              key={m.id}
              onClick={() => setMoMode(m.id)}
              className={cn(
                "text-left border-[1.5px] rounded-[18px] p-4 flex items-center gap-[15px] transition-base",
                on ? "border-primary bg-primary/5" : "border-border bg-background",
              )}
            >
              <div className={cn("w-[46px] h-[46px] rounded-[14px] flex items-center justify-center flex-shrink-0", on ? "bg-primary" : "bg-muted")}>
                <Icon className={cn("w-[22px] h-[22px]", on ? "text-primary-foreground" : "text-foreground")} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[15px]">{m.name}</div>
                <div className="text-[12.5px] text-muted-foreground mt-0.5">{m.detail}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-extrabold text-[18px]">{m.time}</div>
                <div className="text-xs text-muted-foreground">{m.price}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* departure reco */}
      <div className="mt-[18px] flex items-center gap-3 bg-primary/10 rounded-[18px] px-4 py-[15px]">
        <Clock className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
        <div className="text-[13.5px] text-foreground">
          <span className="font-semibold">Partez à 17:20</span> pour arriver 15 min avant le début.
        </div>
      </div>

      {/* pratique */}
      <h3 className="font-display font-extrabold text-lg mt-[26px]">Sur place</h3>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {PRACTICAL.map((p) => {
          const Icon = PRACTICAL_ICON[p.id];
          return (
            <div key={p.id} className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="w-[19px] h-[19px]" strokeWidth={1.9} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{p.title}</div>
                <div className="text-[12.5px] text-muted-foreground mt-px">{p.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobiliteApp;

import { AlertTriangle, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  AgendaApp — écran Agenda (mobile), fidèle au prototype (Prototype-2).
  Bannière de conflit + séances du jour (badges conflit + reco départ).
  Les alertes/rappels ont été déplacées dans Profil › Notifications.
*/

const AGENDA_ITEMS = [
  { range: "18:00–19:30", sport: "Athlétisme", title: "Finale 200 m — hommes", venue: "Iba Mar Diop", depart: "17:20", trip: "25 min", conflict: true },
  { range: "18:30–20:00", sport: "Escrime", title: "Finale fleuret — femmes", venue: "Centre des Expositions", depart: "17:35", trip: "30 min", conflict: true },
];

const AgendaApp = () => {
  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <h2 className="font-display font-extrabold text-[30px] tracking-tight">Mon agenda</h2>
      <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide mt-3.5">Dimanche 8 nov</div>

      {/* conflict banner */}
      <div className="mt-3.5 flex gap-3 items-start bg-destructive/5 border border-destructive/20 rounded-2xl p-3.5">
        <AlertTriangle className="w-[19px] h-[19px] text-destructive flex-shrink-0 mt-px" strokeWidth={2} />
        <div>
          <div className="font-semibold text-[13.5px]">Deux épreuves se chevauchent</div>
          <div className="text-[12.5px] text-destructive/80 mt-0.5 leading-[1.4]">
            200 m et Fleuret démarrent à ~30 min d'écart.
          </div>
        </div>
      </div>

      {/* items */}
      <div className="mt-[18px] flex flex-col gap-3.5">
        {AGENDA_ITEMS.map((a) => (
          <div key={a.title} className={cn("bg-background border rounded-[22px] p-[18px] shadow-sm", a.conflict ? "border-destructive/20" : "border-border")}>
            <div className="flex items-center gap-2.5">
              <span className="font-display font-extrabold text-base">{a.range}</span>
              {a.conflict && (
                <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-[3px] rounded-full">Conflit</span>
              )}
              <span className="text-xs text-muted-foreground ml-auto">{a.sport}</span>
            </div>
            <div className="font-display font-bold text-[17px] mt-2 leading-[1.15]">{a.title}</div>
            <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground mt-1.5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
              {a.venue}
            </div>
            <div className="mt-3 flex items-center gap-2.5 bg-primary/10 rounded-[14px] px-3 py-[11px]">
              <ArrowRight className="w-[18px] h-[18px] text-primary flex-shrink-0" strokeWidth={2} />
              <div className="text-[13px] text-foreground">
                <span className="font-semibold">Départ conseillé {a.depart}</span> · {a.trip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaApp;

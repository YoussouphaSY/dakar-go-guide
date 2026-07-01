import { X, Clock, MapPin, Check, Plus } from "lucide-react";
import BottomSheet from "./BottomSheet";
import { useApp } from "@/store/appStore";
import {
  findEvent, EVENT_DETAILS, dayLabel,
  type EventDetail, type ProgEvent,
} from "@/data/appMock";
import { cn } from "@/lib/utils";

/*
  EventSheet — détail d'une épreuve. Selon le format : match (VS),
  liste de départ (couloirs) ou festivité. Bouton d'ajout à l'agenda.
*/
const EventSheet = () => {
  const eventId = useApp((s) => s.eventId);
  const setEventId = useApp((s) => s.setEventId);
  const agenda = useApp((s) => s.agenda);
  const toggleAgenda = useApp((s) => s.toggleAgenda);
  const pushToast = useApp((s) => s.pushToast);

  const close = () => setEventId(null);
  const base = eventId ? findEvent(eventId) : null;
  if (!eventId || !base) return <BottomSheet open={false} onClose={close}>{null}</BottomSheet>;

  const ev: ProgEvent & { day: string } = base;
  const det: EventDetail = EVENT_DETAILS[eventId] ?? {
    phase: ev.live ? "En cours" : "À venir", format: "fest", about: "Détails à venir.",
  };
  const inA = agenda.includes(eventId);

  return (
    <BottomSheet open onClose={close} scrollable>
      <div className="relative h-[150px] bg-[repeating-linear-gradient(135deg,#E7E7E2_0_12px,#F1F1EC_12px_24px)] rounded-t-[30px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground">
          photo · {ev.sport}
        </div>
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-3.5 right-3.5 w-[34px] h-[34px] rounded-full bg-background/90 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-foreground" strokeWidth={2.4} />
        </button>
        <div className="absolute top-3.5 left-3.5 flex gap-[7px]">
          <span className="bg-background/90 text-[11px] font-semibold text-foreground/80 px-2.5 py-[5px] rounded-full">
            {det.phase}
          </span>
          {ev.live && (
            <span className="inline-flex items-center gap-[5px] bg-destructive text-destructive-foreground text-[11px] font-bold px-2.5 py-[5px] rounded-full">
              <span className="w-[5px] h-[5px] rounded-full bg-current anim-live" />
              EN DIRECT
            </span>
          )}
        </div>
      </div>

      <div className="px-[22px] pt-5 pb-7">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{ev.sport}</div>
        <h3 className="font-display font-extrabold text-2xl tracking-tight leading-[1.08] mt-1">{ev.title}</h3>
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center gap-[7px] text-[13.5px] text-foreground/80">
            <Clock className="w-[15px] h-[15px] text-primary" strokeWidth={2} />
            {dayLabel(ev.day)} · {ev.time}
          </div>
          <div className="flex items-center gap-[7px] text-[13.5px] text-foreground/80">
            <MapPin className="w-[15px] h-[15px] text-primary" strokeWidth={2} />
            {ev.venue}
          </div>
        </div>

        {det.format === "match" && det.teams && (
          <div className="mt-5 flex items-stretch gap-2.5">
            <TeamCard name={det.teams[0].name} code={det.teams[0].code} />
            <div className="flex items-center">
              <span className="font-display font-extrabold text-base text-muted-foreground">VS</span>
            </div>
            <TeamCard name={det.teams[1].name} code={det.teams[1].code} />
          </div>
        )}

        {det.format === "startlist" && det.athletes && (
          <>
            <div className="font-mono text-[10.5px] text-muted-foreground uppercase tracking-wide mt-5">
              Liste de départ
            </div>
            <div className="mt-2.5 flex flex-col gap-2">
              {det.athletes.map((a) => (
                <div
                  key={a.lane}
                  className={cn(
                    "flex items-center gap-3.5 border-[1.5px] rounded-[13px] px-3.5 py-[11px]",
                    a.star ? "border-primary bg-primary/5" : "border-border bg-background",
                  )}
                >
                  <span className="font-display font-extrabold text-[15px] text-muted-foreground w-5 text-center flex-shrink-0">
                    {a.lane}
                  </span>
                  <div className="w-[30px] h-5 rounded bg-[repeating-linear-gradient(135deg,#E7E7E2_0_4px,#F4F3EE_4px_8px)] border border-border flex-shrink-0" />
                  <span className="flex-1 font-semibold text-[14.5px]">{a.name}</span>
                  {a.star && <span className="w-[7px] h-[7px] rounded-full bg-accent" />}
                  <span className="font-mono text-[11px] text-muted-foreground flex-shrink-0">{a.code}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="text-sm leading-[1.55] text-muted-foreground mt-[18px]">{det.about}</p>

        <div className="flex gap-2.5 mt-5">
          <button
            onClick={() => toggleAgenda(eventId)}
            className={cn(
              "flex-1 border-[1.5px] font-semibold text-[15px] py-[15px] rounded-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-base",
              inA ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground",
            )}
          >
            {inA ? <Check className="w-[17px] h-[17px]" strokeWidth={2.4} /> : <Plus className="w-[17px] h-[17px]" strokeWidth={2.2} />}
            {inA ? "Dans mon agenda" : "Ajouter à mon agenda"}
          </button>
          <button
            onClick={() => pushToast("Billetterie bientôt disponible")}
            className="bg-primary text-primary-foreground font-semibold text-[15px] px-5 py-[15px] rounded-[15px] active:scale-[0.98] transition-base"
          >
            Billets
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

const TeamCard = ({ name, code }: { name: string; code: string }) => (
  <div className="flex-1 bg-muted/60 border border-border rounded-[16px] px-3 py-4 text-center">
    <div className="w-11 h-[30px] rounded-[5px] bg-[repeating-linear-gradient(135deg,#E7E7E2_0_4px,#F4F3EE_4px_8px)] border border-border mx-auto" />
    <div className="font-display font-extrabold text-base mt-2.5 leading-[1.1]">{name}</div>
    <div className="font-mono text-[11px] text-muted-foreground mt-[3px]">{code}</div>
  </div>
);

export default EventSheet;

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, MapPin, ArrowRight, Trash2, CalendarPlus, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { useT, dayLabelT } from "@/lib/useT";
import { findEvent } from "@/data/appMock";
import { downloadAgendaPdf } from "@/lib/agendaPdf";

/*
  AgendaApp — écran Agenda (mobile). Affiche les ÉPREUVES RÉELLEMENT AJOUTÉES
  (store `agenda`), groupées par jour, avec : suppression (icône corbeille),
  reco de départ (−40 min), détection de chevauchement, et un accès rapide au
  Programme en bas. Les alertes/rappels sont dans Profil › Notifications.
*/

/* "HH:MM" → minutes */
function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}
/* minutes → "HH:MM" */
function fromMin(min: number): string {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

interface AgendaEntry {
  id: string;
  day: string;
  time: string;
  sport: string;
  title: string;
  venue: string;
  live?: boolean;
  depart: string;   // reco départ = −40 min
  conflict: boolean;
}

const AgendaApp = () => {
  const nav = useNavigate();
  const { t, lang } = useT();
  const agenda = useApp((s) => s.agenda);
  const toggleAgenda = useApp((s) => s.toggleAgenda);
  const pushToast = useApp((s) => s.pushToast);

  /* Résout les IDs en épreuves + détecte les chevauchements (± 45 min). */
  const { groups, days } = useMemo(() => {
    const entries: AgendaEntry[] = agenda
      .map((id) => findEvent(id))
      .filter((e): e is NonNullable<ReturnType<typeof findEvent>> => !!e)
      .map((e) => ({
        id: e.id, day: e.day, time: e.time, sport: e.sport, title: e.title,
        venue: e.venue, live: e.live, depart: fromMin(toMin(e.time) - 40), conflict: false,
      }));

    // conflits : même jour, départ à < 45 min d'écart
    for (const a of entries) {
      for (const b of entries) {
        if (a === b || a.day !== b.day) continue;
        if (Math.abs(toMin(a.time) - toMin(b.time)) < 45) a.conflict = true;
      }
    }

    entries.sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time));
    const grouped: Record<string, AgendaEntry[]> = {};
    for (const e of entries) (grouped[e.day] ||= []).push(e);
    return { groups: grouped, days: Object.keys(grouped).sort() };
  }, [agenda]);

  const hasConflict = days.some((d) => groups[d].some((e) => e.conflict));
  const empty = agenda.length === 0;

  const downloadPdf = () => {
    const entries = days.flatMap((d) =>
      groups[d].map((e) => ({
        day: e.day, time: e.time, sport: e.sport, title: e.title,
        venue: e.venue, depart: e.depart, conflict: e.conflict,
      })),
    );
    downloadAgendaPdf(entries, lang);
    pushToast(t("ag.downloaded"));
  };

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5 pt-2">
      <div className="flex justify-between items-center pt-1.5 pb-3 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-extrabold text-[30px] tracking-tight">{t("ag.title")}</h2>
          <p className="text-[14.5px] text-muted-foreground mt-1.5">
            {empty ? t("ag.none") : t("ag.count", { n: agenda.length })}
          </p>
        </div>
        {!empty && (
          <button
            onClick={downloadPdf}
            aria-label={t("ag.download")}
            className="mt-1 w-11 h-11 flex-shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center active:scale-95 transition-base"
          >
            <Download className="w-[21px] h-[21px]" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* conflict banner */}
      {hasConflict && (
        <div className="mt-3.5 flex gap-3 items-start bg-destructive/5 border border-destructive/20 rounded-2xl p-3.5">
          <AlertTriangle className="w-[19px] h-[19px] text-destructive flex-shrink-0 mt-px" strokeWidth={2} />
          <div>
            <div className="font-semibold text-[13.5px]">{t("ag.conflictTitle")}</div>
            <div className="text-[12.5px] text-destructive/80 mt-0.5 leading-[1.4]">
              {t("ag.conflictBody")}
            </div>
          </div>
        </div>
      )}

      {/* empty state */}
      {empty ? (
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <CalendarPlus className="w-7 h-7 text-muted-foreground" strokeWidth={1.8} />
          </div>
          <div className="font-display font-bold text-[17px] mt-4">{t("ag.emptyTitle")}</div>
          <div className="text-[13px] text-muted-foreground mt-1.5 max-w-[240px] leading-[1.5]">
            {t("ag.emptyBody")}
          </div>
          <button
            onClick={() => nav("/programme")}
            className="mt-5 bg-primary text-primary-foreground font-semibold text-[14px] px-5 py-3 rounded-[14px] inline-flex items-center gap-2 active:scale-[0.98] transition-base"
          >
            {t("ag.seeProg")}
            <ArrowRight className="w-[16px] h-[16px]" strokeWidth={2.3} />
          </button>
        </div>
      ) : (
        <>
          {days.map((day) => (
            <div key={day} className="mt-6">
              <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide">{dayLabelT(day, lang)}</div>
              <div className="mt-3 flex flex-col gap-3.5">
                {groups[day].map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      "bg-background border rounded-[22px] p-[18px] shadow-sm",
                      a.conflict ? "border-destructive/20" : "border-border",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-extrabold text-base">{a.time}</span>
                      {a.live && (
                        <span className="inline-flex items-center gap-[5px] bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-[3px] rounded-full">
                          <span className="w-[5px] h-[5px] rounded-full bg-destructive anim-live" />LIVE
                        </span>
                      )}
                      {a.conflict && (
                        <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-[3px] rounded-full">{t("ag.conflict")}</span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{a.sport}</span>
                      <button
                        onClick={() => toggleAgenda(a.id)}
                        aria-label={t("ag.removeAria")}
                        className="w-8 h-8 -mr-1 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 transition-base"
                      >
                        <Trash2 className="w-[17px] h-[17px]" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="font-display font-bold text-[17px] mt-1.5 leading-[1.15]">{a.title}</div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground mt-1.5">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                      {a.venue}
                    </div>
                    <div className="mt-3 flex items-center gap-2.5 bg-primary/10 rounded-[14px] px-3 py-[11px]">
                      <ArrowRight className="w-[18px] h-[18px] text-primary flex-shrink-0" strokeWidth={2} />
                      <div className="text-[13px] text-foreground">
                        <span className="font-semibold">{t("ag.depart", { t: a.depart })}</span> · {t("ag.before")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* accès rapide au programme */}
          <button
            onClick={() => nav("/programme")}
            className="mt-7 w-full bg-background border border-border rounded-[16px] py-3.5 flex items-center justify-center gap-2 font-semibold text-[14.5px] active:scale-[0.99] transition-base"
          >
            {t("ag.seeProg")}
            <ArrowRight className="w-[17px] h-[17px] text-primary" strokeWidth={2.3} />
          </button>
        </>
      )}
    </div>
  );
};

export default AgendaApp;

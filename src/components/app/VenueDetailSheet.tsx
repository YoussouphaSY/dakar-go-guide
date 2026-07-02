import { useNavigate } from "react-router-dom";
import {
  X, MapPin, Users, Navigation, CalendarDays,
  ParkingSquare, Utensils, Cross, Accessibility, BusFront,
} from "lucide-react";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";
import { asset } from "@/lib/utils";
import { POIS, MAP_FILTERS, poiDesc, type VenueDetail } from "@/data/mobility";
import type { TrKey } from "@/lib/translations";

/*
  VenueDetailSheet — grande fiche d'un lieu (plein écran, dans le cadre app).
  Mise en avant des sites JOJ : grande photo, capacité, sports accueillis avec
  dates, services sur place, accès, description complète, « S'y rendre ».
  Pilotée par le store (`venueId`).
*/

const VENUE_COLOR = MAP_FILTERS.find((f) => f.id === "competition")!.color;

const SERVICE_META: Record<
  NonNullable<VenueDetail["services"]>[number],
  { icon: typeof ParkingSquare; key: TrKey }
> = {
  parking: { icon: ParkingSquare, key: "svc.parking" },
  food: { icon: Utensils, key: "svc.food" },
  secours: { icon: Cross, key: "svc.secours" },
  pmr: { icon: Accessibility, key: "svc.pmr" },
  shuttle: { icon: BusFront, key: "svc.shuttle" },
};

const VenueDetailSheet = () => {
  const nav = useNavigate();
  const { t, lang } = useT();
  const venueId = useApp((s) => s.venueId);
  const setVenueId = useApp((s) => s.setVenueId);
  const setMoDest = useApp((s) => s.setMoDest);
  const pushToast = useApp((s) => s.pushToast);

  if (!venueId) return null;
  const p = POIS.find((x) => x.id === venueId);
  if (!p) return null;

  const v = p.venue;
  const isVenue = p.type === "venue";
  const accent = isVenue ? VENUE_COLOR : (MAP_FILTERS.find((f) => f.id === (p.filter ?? "tourisme"))?.color ?? VENUE_COLOR);
  const close = () => setVenueId(null);

  const go = () => {
    if (isVenue) setMoDest(p.id);
    close();
    nav("/mobilite");
  };

  return (
    <div className="absolute inset-0 z-50 bg-background flex flex-col anim-sheet" dir={lang === "AR" ? "rtl" : "ltr"}>
      {/* photo d'en-tête */}
      <div className="relative h-[230px] flex-shrink-0 bg-muted">
        {p.image ? (
          <img src={asset(p.image)} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#E7E7E2_0_12px,#F1F1EC_12px_24px)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
        <button
          onClick={close}
          aria-label={t("map.close")}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center shadow-md"
        >
          <X className="w-4 h-4 text-foreground" strokeWidth={2.4} />
        </button>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-[3px] rounded-[6px] mb-2"
            style={{ background: accent }}
          >
            {t(`poiType.${p.type}`)}
          </span>
          <h2 className="font-display font-extrabold text-[25px] leading-[1.05] tracking-tight drop-shadow-sm">{p.name}</h2>
          <div className="flex items-center gap-1.5 text-[13px] text-white/85 mt-1.5">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
            {p.city} · {p.dist}
          </div>
        </div>
      </div>

      {/* contenu défilant */}
      <div className="scr flex-1 overflow-y-auto px-5 py-5">
        {/* capacité */}
        {v?.capacity && (
          <div className="flex items-center gap-3 bg-muted rounded-[14px] px-4 py-3">
            <Users className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
            <div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{t("venue.capacity")}</div>
              <div className="font-semibold text-[15px]">{v.capacity}</div>
            </div>
          </div>
        )}

        {/* à propos */}
        <h3 className="font-display font-extrabold text-[16px] mt-6">{t("venue.about")}</h3>
        <p className="text-[13.5px] leading-[1.55] text-muted-foreground mt-2">{poiDesc(p, lang)}</p>

        {/* sports accueillis + dates */}
        {v?.sports && v.sports.length > 0 && (
          <>
            <h3 className="font-display font-extrabold text-[16px] mt-6">{t("venue.sports")}</h3>
            <div className="mt-3 flex flex-col gap-2">
              {v.sports.map((s) => (
                <div key={s.name} className="flex items-center gap-3 border border-border rounded-[13px] px-3.5 py-2.5">
                  <span className="w-[9px] h-[9px] rounded-full flex-shrink-0" style={{ background: accent }} />
                  <span className="flex-1 font-semibold text-[14px]">{s.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
                    {s.dates}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* services */}
        {v?.services && v.services.length > 0 && (
          <>
            <h3 className="font-display font-extrabold text-[16px] mt-6">{t("venue.services")}</h3>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {v.services.map((sid) => {
                const meta = SERVICE_META[sid];
                const Icon = meta.icon;
                return (
                  <div key={sid} className="flex items-center gap-2.5 bg-muted rounded-[12px] px-3 py-2.5">
                    <Icon className="w-[18px] h-[18px] text-foreground flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] font-medium">{t(meta.key)}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* accès */}
        {v?.access && (
          <>
            <h3 className="font-display font-extrabold text-[16px] mt-6">{t("venue.access")}</h3>
            <div className="mt-2.5 flex items-start gap-2.5 bg-primary/5 border border-primary/15 rounded-[14px] px-4 py-3">
              <Navigation className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-px" strokeWidth={2} />
              <p className="text-[13px] leading-[1.5] text-foreground">{v.access}</p>
            </div>
          </>
        )}

        <div className="h-2" />
      </div>

      {/* barre d'action */}
      <div className="flex-shrink-0 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-border bg-background flex gap-2.5">
        <button
          onClick={go}
          className="flex-1 bg-primary text-primary-foreground font-semibold text-[15px] py-[14px] rounded-[14px] inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-base"
        >
          <Navigation className="w-[17px] h-[17px]" strokeWidth={2.2} />
          {t("map.go")}
        </button>
        <button
          onClick={() => pushToast(t("toast.added"))}
          className="bg-background border-[1.5px] border-border text-foreground font-semibold text-[15px] px-5 py-[14px] rounded-[14px] active:scale-[0.98] transition-base"
        >
          {t("map.agenda")}
        </button>
      </div>
    </div>
  );
};

export default VenueDetailSheet;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, BellOff, ChevronDown, MapPin, Plus, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import {
  HOME_FILTERS, DISCOVER, NEWS, type HomeFilter, type NewsKind,
} from "@/data/appMock";
import MiniMap, { CAT_COLOR } from "@/components/app/MiniMap";

/*
  HomeApp — accueil de l'interface app (mobile), révision Prototype-2 :
  header, diapo actualités (résultats/records/actus), bannière live &
  prochains matchs, carte à pins filtrable (pop-up ancré au-dessus du point),
  en direct & à venir, découvrir Dakar, encart eSIM SONATEL.
  (La rangée d'accès rapides Programme/Carte/Billets/AYO a été retirée.)
*/

const NEWS_ACCENT: Record<NewsKind, string> = {
  resultat: "#00853F",
  record: "#C77A1E",
  athlete: "#E2571E",
  actu: "#0E0F0C",
};

const HomeApp = () => {
  const nav = useNavigate();
  const lang = useApp((s) => s.lang);
  const mapFilter = useApp((s) => s.mapFilter);
  const setMapFilter = useApp((s) => s.setMapFilter);
  const setLangOpen = useApp((s) => s.setLangOpen);
  const pushToast = useApp((s) => s.pushToast);
  const notifOn = useApp((s) => s.notifOn);
  const toggleNotif = useApp((s) => s.toggleNotif);

  const shownCount = HOME_FILTERS.find((f) => f.id === mapFilter)?.name ?? "";

  /* diapo actus : défilement auto */
  const [slide, setSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % NEWS.length), 4200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    trackRef.current?.scrollTo({ left: slide * trackRef.current.clientWidth, behavior: "smooth" });
  }, [slide]);

  return (
    <div className="scr flex-1 overflow-y-auto px-[22px] pb-5">
      {/* status bar */}
      <div className="flex justify-between items-center pt-3.5 pb-1.5 text-[13px] font-semibold">
        <span>9:41</span>
        <span className="font-mono text-[11px]">▂▄▆ ⵛ ⏻</span>
      </div>

      {/* header */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 border-[1.4px] border-dashed border-border rounded-[11px] flex items-center justify-center font-mono text-[7px] text-muted-foreground">
            LOGO
          </div>
          <div>
            <div className="font-display font-bold text-[18px] tracking-tight leading-none">Dakar 2026</div>
            <div className="text-xs text-muted-foreground mt-0.5">Bonjour 👋</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLangOpen(true)}
            className="flex items-center gap-1.5 border border-border bg-background rounded-full px-2.5 py-[7px] text-xs font-semibold"
          >
            {lang}
            <ChevronDown className="w-2.5 h-2.5 text-muted-foreground" />
          </button>
          <button
            onClick={toggleNotif}
            aria-label={notifOn ? "Désactiver les notifications" : "Activer les notifications"}
            aria-pressed={notifOn}
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center relative transition-base",
              notifOn ? "border-border bg-background" : "border-border bg-muted text-muted-foreground",
            )}
          >
            {notifOn ? (
              <>
                <Bell className="w-[19px] h-[19px]" strokeWidth={1.8} />
                <span className="absolute top-2 right-[9px] w-[7px] h-[7px] rounded-full bg-destructive border-[1.5px] border-background" />
              </>
            ) : (
              <BellOff className="w-[19px] h-[19px]" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* diapo actualités */}
      <div ref={trackRef} className="scr flex overflow-x-auto snap-x snap-mandatory rounded-[22px]">
        {NEWS.map((n) => (
          <div key={n.id} className="min-w-full snap-center">
            <div className="relative h-[168px] rounded-[22px] overflow-hidden bg-foreground text-background">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_14px,transparent_14px_28px)]" />
              <div className="relative h-full p-5 flex flex-col justify-end">
                <span
                  className="self-start text-[10px] font-bold uppercase tracking-wide px-2.5 py-[5px] rounded-full text-background"
                  style={{ background: NEWS_ACCENT[n.kind] }}
                >
                  {n.tag}
                </span>
                <div className="font-display font-extrabold text-[19px] leading-[1.12] tracking-tight mt-2.5 max-w-[280px]">
                  {n.title}
                </div>
                <div className="text-[12.5px] text-muted-foreground mt-1.5">{n.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* map filter chips */}
      <div className="scr flex gap-2 mt-4 overflow-x-auto pb-0.5">
        {HOME_FILTERS.map((f) => {
          const on = f.id === mapFilter;
          return (
            <button
              key={f.id}
              onClick={() => setMapFilter(f.id as HomeFilter)}
              className={cn(
                "flex-shrink-0 inline-flex items-center gap-[7px] rounded-full px-3.5 py-[9px] text-[13px] font-semibold whitespace-nowrap border transition-base",
                on ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border",
              )}
            >
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: CAT_COLOR[f.id as HomeFilter] }} />
              {f.name}
            </button>
          );
        })}
      </div>

      {/* mini map (pop-up ancré au-dessus du point) */}
      <div className="mt-3.5 relative h-[248px] rounded-[24px] overflow-hidden shadow-md bg-[#EEEFEA]">
        <MiniMap />
        <div className="absolute top-3 left-3 bg-background rounded-full px-3 py-[7px] font-mono text-[11px] font-bold tracking-wide flex items-center gap-[7px] shadow-md z-[6]">
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: CAT_COLOR[mapFilter] }} />
          {shownCount.toUpperCase()}
        </div>
      </div>

      {/* en direct & à venir */}
      <SectionHeader title="En direct & à venir" action="Tout voir" onAction={() => nav("/programme")} />
      <LiveCard
        day="04" month="NOV" time="16:40" live sport="Natation"
        title="Demi-finale 100 m nage libre" venue="Arène · Diamniadio"
        onAdd={() => pushToast("Ajouté à mon agenda")}
      />
      <LiveCard
        day="05" month="NOV" time="09:00" sport="Athlétisme"
        title="Séries 200 m — hommes" venue="Stade L. S. Senghor" added
        onAdd={() => pushToast("Ajouté à mon agenda")}
      />

      {/* découvrir Dakar — carrousel défilant en boucle */}
      <SectionHeader title="Découvrir Dakar" action="Explorer" onAction={() => setMapFilter("faire")} />
      <div className="mt-3.5 overflow-hidden">
        <div className="flex gap-3 w-max animate-[marquee_26s_linear_infinite] hover:[animation-play-state:paused] pb-1">
          {[...DISCOVER, ...DISCOVER].map((d, i) => (
            <button
              key={`${d.id}-${i}`}
              onClick={() => setMapFilter("faire")}
              className="flex-shrink-0 w-[150px] text-left"
            >
              <div className="h-[120px] rounded-2xl overflow-hidden bg-[repeating-linear-gradient(135deg,#E7E7E2_0_11px,#F1F1EC_11px_22px)] relative">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-muted-foreground">
                  photo · {d.name}
                </div>
              </div>
              <div className="font-mono text-[9.5px] text-muted-foreground uppercase tracking-wide mt-2.5">{d.cat}</div>
              <div className="font-display font-bold text-[15px] mt-0.5 leading-[1.15]">{d.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-2" />
    </div>
  );
};

const SectionHeader = ({ title, action, onAction }: { title: string; action: string; onAction: () => void }) => (
  <div className="flex items-center justify-between mt-7">
    <h3 className="font-display font-extrabold text-[19px] tracking-tight">{title}</h3>
    <button onClick={onAction} className="text-[13px] font-semibold text-primary">{action}</button>
  </div>
);

const LiveCard = ({
  day, month, time, live, sport, title, venue, added, onAdd,
}: {
  day: string; month: string; time: string; live?: boolean;
  sport: string; title: string; venue: string; added?: boolean; onAdd: () => void;
}) => (
  <div className="mt-3.5 bg-background border border-border rounded-[20px] p-3.5 shadow-sm flex items-center gap-3.5">
    <div className="text-center flex-shrink-0 w-[42px]">
      <div className="font-display font-extrabold text-[21px] leading-none">{day}</div>
      <div className="font-mono text-[9px] text-muted-foreground tracking-wide">{month}</div>
      <div className="text-[11px] font-semibold mt-[3px]">{time}</div>
    </div>
    <div className="w-px self-stretch bg-border flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-[7px]">
        {live ? (
          <span className="inline-flex items-center gap-[5px] bg-destructive/10 text-destructive text-[9.5px] font-bold tracking-wide px-[7px] py-[3px] rounded-[5px]">
            <span className="w-[5px] h-[5px] rounded-full bg-destructive anim-live" />
            LIVE
          </span>
        ) : (
          <span className="bg-muted text-muted-foreground text-[9.5px] font-bold tracking-wide px-[7px] py-[3px] rounded-[5px]">À VENIR</span>
        )}
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wide">{sport}</span>
      </div>
      <div className="font-display font-bold text-base leading-[1.2] mt-1.5">{title}</div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
        <MapPin className="w-3 h-3" strokeWidth={2} />
        {venue}
      </div>
    </div>
    <button
      onClick={onAdd}
      aria-label="Ajouter à l'agenda"
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 transition-base",
        added ? "bg-primary" : "bg-primary/10",
      )}
    >
      {added ? (
        <Check className="w-[18px] h-[18px] text-primary-foreground" strokeWidth={2.6} />
      ) : (
        <Plus className="w-[18px] h-[18px] text-primary" strokeWidth={2.4} />
      )}
    </button>
  </div>
);

export default HomeApp;

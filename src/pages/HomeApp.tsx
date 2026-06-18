import { useNavigate } from "react-router-dom";
import {
  CalendarDays, MapPin, Ticket, MessageCircle, Star, Bell, ChevronDown,
  Plus, Check, Play, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import Logo from "@/components/Logo";
import HomeMapCard from "@/components/HomeMapCard";

/*
  HomeApp — Accueil de l'interface APP mobile (PWA standalone).
  Reproduction fidèle de la maquette Claude "Écrans · 05".
*/

const HERO_VIDEO = "/media/hero-dakar2026.mp4";
const OPENING = new Date("2026-10-31T19:00:00");
const daysToGo = Math.max(0, Math.ceil((OPENING.getTime() - Date.now()) / 86_400_000));

const QUICK = [
  { label: "Programme", icon: CalendarDays, to: "/programme" },
  { label: "Carte", icon: MapPin, to: "/carte" },
  { label: "Billets", icon: Ticket, to: "/profil" },
  { label: "AYO", ayo: true, to: "/ayo" },
];

const UPCOMING = [
  { id: "natation", day: "04", time: "16:40", live: true, sport: "Natation", title: "Demi-finale 100 m nage libre", place: "Arène · Diamniadio" },
  { id: "athle", day: "05", time: "09:00", live: false, sport: "Athlétisme", title: "Séries 200 m — hommes", place: "Stade L. S. Senghor" },
];

const DISCOVER = [
  { cat: "Patrimoine", name: "Île de Gorée" },
  { cat: "Nature", name: "Lac Rose" },
  { cat: "Culture", name: "Musée des Civilisations" },
];

const HomeApp = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* App bar */}
      <div className="flex items-center justify-between px-[18px] pt-1.5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <Logo className="h-[26px] w-auto" />
          <div className="leading-none">
            <div className="font-display font-extrabold text-base leading-none">Dakar 2026</div>
            <div className="text-[10.5px] text-muted-foreground mt-0.5">Bonjour</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 border border-border rounded-full px-2.5 py-1.5 text-xs font-semibold">
            {lang.toUpperCase()} <ChevronDown className="h-2 w-2 text-muted-foreground" />
          </span>
          <button className="relative h-[38px] w-[38px] rounded-full border border-border flex items-center justify-center">
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
            <span className="absolute top-[7px] right-2 h-[7px] w-[7px] rounded-full bg-live border-[1.5px] border-background" />
          </button>
        </div>
      </div>

      {/* Scroll content */}
      <div className="flex-1 overflow-y-auto px-[18px] pb-4">
        {/* Hero vidéo */}
        <section className="relative rounded-[20px] overflow-hidden h-[194px] flex items-end">
          <video className="absolute inset-0 w-full h-full object-cover" src={HERO_VIDEO} autoPlay loop muted playsInline />
          <span className="absolute top-3.5 left-3.5 bg-white/[0.14] backdrop-blur-sm text-white font-mono text-[10px] font-semibold tracking-[0.08em] px-2.5 py-[5px] rounded-full">
            J–{daysToGo}
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[72%] h-12 w-12 rounded-full border-[1.5px] border-white/40 bg-white/[0.08] flex items-center justify-center">
            <Play className="h-[17px] w-[17px] text-white fill-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent to-[65%]" />
          <div className="relative p-4 text-white">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">Cérémonie d'ouverture</div>
            <div className="font-display font-extrabold text-[23px] leading-tight mt-1" style={{ fontStretch: "86%" }}>
              Bienvenue à Dakar 2026
            </div>
          </div>
        </section>

        {/* Accès rapides */}
        <section className="flex justify-between mt-[18px]">
          {QUICK.map((q) => (
            <button key={q.label} onClick={() => navigate(q.to)} className="flex flex-col items-center gap-[7px] flex-1">
              {q.ayo ? (
                <span className="relative h-[54px] w-[54px] rounded-2xl bg-foreground flex items-center justify-center">
                  <MessageCircle className="h-[22px] w-[22px] text-background" strokeWidth={1.9} />
                  <span className="absolute -top-0.5 -right-0.5 h-[15px] w-[15px] rounded-full bg-accent border-2 border-background flex items-center justify-center">
                    <Star className="h-2 w-2 text-foreground fill-foreground" />
                  </span>
                </span>
              ) : (
                <span className="h-[54px] w-[54px] rounded-2xl bg-muted flex items-center justify-center">
                  <q.icon className="h-[22px] w-[22px] text-foreground" strokeWidth={1.8} />
                </span>
              )}
              <span className={cn("text-[11.5px]", q.ayo ? "font-semibold text-foreground" : "font-medium text-foreground/80")}>
                {q.label}
              </span>
            </button>
          ))}
        </section>

        {/* Carte filtrable (compétitions / activités / festivités / tourisme) */}
        <HomeMapCard />

        {/* En direct & à venir */}
        <SectionHead title="En direct & à venir" action="Tout voir" onAction={() => navigate("/programme")} />
        <div className="mt-3 flex flex-col gap-2.5">
          {UPCOMING.map((e, i) => (
            <EventRow key={e.id} {...e} onClick={() => navigate("/programme")} first={i === 0} />
          ))}
        </div>

        {/* Découvrir Dakar — carrousel */}
        <SectionHead title="Découvrir Dakar" action="Explorer" onAction={() => navigate("/carte")} />
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 -mx-[18px] px-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DISCOVER.map((d) => (
            <div key={d.name} className="flex-shrink-0 w-[168px] border border-border rounded-2xl overflow-hidden">
              <div className="h-[104px] bg-muted flex items-center justify-center font-mono text-[9px] text-muted-foreground">
                photo · {d.name}
              </div>
              <div className="p-[11px]">
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{d.cat}</div>
                <div className="font-display font-bold text-[14.5px] mt-0.5">{d.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* eSIM SONATEL */}
        <section className="mt-5">
          <div className="relative overflow-hidden rounded-[18px] bg-foreground text-background p-[18px] flex items-center gap-3.5">
            <div className="flex-1">
              <div className="flex items-center gap-[7px]">
                <span className="h-[7px] w-[7px] rounded-full bg-success" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground">SONATEL · Partenaire</span>
              </div>
              <div className="font-display font-extrabold text-[19px] mt-[7px] leading-tight" style={{ fontStretch: "88%" }}>
                Restez connecté dès l'aéroport
              </div>
              <div className="text-xs text-muted-foreground mt-[5px]">eSIM data · activation en 2 min</div>
              <button onClick={() => navigate("/profil")} className="mt-[13px] inline-flex items-center gap-[7px] bg-primary text-primary-foreground font-semibold text-[13px] px-4 py-2.5 rounded-[11px]">
                Voir les forfaits <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
            </div>
            <div className="h-[62px] w-[62px] rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <SimIcon />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHead = ({ title, action, onAction }: { title: string; action: string; onAction: () => void }) => (
  <div className="flex items-center justify-between mt-6">
    <h3 className="font-display font-extrabold text-lg">{title}</h3>
    <button onClick={onAction} className="text-[12.5px] font-semibold text-primary">{action}</button>
  </div>
);

const EventRow = ({
  day, time, live, sport, title, place, onClick, first,
}: {
  day: string; time: string; live: boolean; sport: string; title: string; place: string; onClick: () => void; first: boolean;
}) => (
  <button onClick={onClick} className={cn(
    "flex items-center gap-[13px] rounded-2xl border border-border bg-card p-[13px] text-left",
    first && "shadow-sm",
  )}>
    <div className="flex-shrink-0 w-[52px] text-center border-r border-border pr-[13px]">
      <div className={cn("font-display font-extrabold text-[23px] leading-none", !live && "text-muted-foreground")}>{day}</div>
      <div className="font-mono text-[9.5px] uppercase text-muted-foreground">Nov</div>
      <div className={cn("text-[11.5px] font-semibold mt-[3px]", live ? "text-foreground" : "text-muted-foreground")}>{time}</div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-[7px]">
        <span className={cn(
          "inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-[0.08em] px-1.5 py-0.5 rounded-[5px]",
          live ? "bg-live text-live-foreground" : "bg-muted text-muted-foreground",
        )}>
          {live && <span className="h-[5px] w-[5px] rounded-full bg-current animate-pulse" />}
          {live ? "LIVE" : "À VENIR"}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.04em] text-muted-foreground">{sport}</span>
      </div>
      <div className="font-display font-bold text-[15.5px] mt-[5px] leading-tight truncate">{title}</div>
      <div className="flex items-center gap-[5px] text-[11.5px] text-muted-foreground mt-1">
        <MapPin className="h-3 w-3" /> {place}
      </div>
    </div>
    <span className={cn(
      "flex-shrink-0 h-[38px] w-[38px] rounded-[11px] flex items-center justify-center",
      live ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground",
    )}>
      {live ? <Plus className="h-[19px] w-[19px]" strokeWidth={2.2} /> : <Check className="h-[19px] w-[19px]" strokeWidth={2.6} />}
    </span>
  </button>
);

/* Icône SIM (fidèle à la maquette) */
const SimIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-muted-foreground">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 4v16M4 9h5M4 15h5" />
  </svg>
);

export default HomeApp;

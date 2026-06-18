import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, ChevronRight, MapPin, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import Logo from "@/components/Logo";

/*
  HomeApp — Accueil mobile, refonte "Simple & clean" (maquette Claude Refonte Mobile).
  Diaporama photo auto en haut + En direct & à venir + encart eSIM discret.
*/

const SLIDES = [
  { label: "Compétition", img: "/media/slides/athletisme.jpg", title: "Finale 200 m — ce soir 18:00", cta: "Voir le programme", to: "/programme" },
  { label: "Festivité", img: "/media/slides/fanzone.jpg", title: "Fan Zone Corniche · concerts gratuits", cta: "Ajouter à mon agenda", to: "/programme" },
  { label: "À faire à Dakar", img: "/media/slides/goree.jpg", title: "Île de Gorée, mémoire & patrimoine", cta: "Découvrir Dakar", to: "/carte" },
  { label: "Compétition", img: "/media/slides/natation.jpg", title: "Finale 100 m nage libre · demain", cta: "Voir le programme", to: "/programme" },
];

const HomeApp = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const [slide, setSlide] = useState(0);

  // Défilement auto du diaporama
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-[22px]">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2.5">
            <Logo className="h-[26px] w-auto" />
            <span className="font-display font-extrabold text-lg">Dakar 2026</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 border border-border rounded-full px-2.5 py-1.5 text-xs font-semibold">
              {lang.toUpperCase()} <ChevronDown className="h-2 w-2 text-muted-foreground" />
            </span>
            <button className="relative h-10 w-10 rounded-full border border-border flex items-center justify-center">
              <Bell className="h-[19px] w-[19px]" strokeWidth={1.8} />
              <span className="absolute top-2 right-[9px] h-[7px] w-[7px] rounded-full bg-live border-[1.5px] border-background" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[22px] pb-5">
        {/* Greeting */}
        <h1 className="font-display font-extrabold text-[30px] leading-tight mt-1.5" style={{ fontStretch: "86%" }}>
          Bienvenue à Dakar
        </h1>
        <p className="text-[14.5px] text-muted-foreground mt-1.5">Explorez les Jeux et la ville, d'un seul geste.</p>

        {/* Diaporama photo */}
        <div className="mt-6 relative rounded-3xl overflow-hidden shadow-md">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {SLIDES.map((s, i) => (
              <div key={i} className="flex-[0_0_100%] relative h-[248px]">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent to-[64%]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block bg-white/[0.18] backdrop-blur-sm text-[11px] font-semibold px-2.5 py-1.5 rounded-full">{s.label}</span>
                  <div className="font-display font-extrabold text-[22px] leading-tight mt-2.5 max-w-[280px]" style={{ fontStretch: "90%" }}>{s.title}</div>
                  <button onClick={() => navigate(s.to)} className="mt-3.5 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-xl">
                    {s.cta} <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="absolute top-3.5 right-3.5 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className="h-1.5 rounded-full transition-all"
                style={{ width: i === slide ? 16 : 6, background: i === slide ? "#fff" : "rgba(255,255,255,.5)" }} />
            ))}
          </div>
        </div>

        {/* En direct & à venir */}
        <div className="flex items-center justify-between mt-7">
          <h2 className="font-display font-extrabold text-[19px]">En direct & à venir</h2>
          <button onClick={() => navigate("/programme")} className="text-[13px] font-semibold text-primary">Tout voir</button>
        </div>

        {/* Carte live */}
        <div className="mt-3.5 bg-card border border-border rounded-[22px] p-[18px] shadow-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-live/10 text-live text-[11px] font-bold tracking-wide px-2.5 py-[5px] rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse" /> EN DIRECT
            </span>
            <span className="text-[12px] text-muted-foreground">Natation</span>
          </div>
          <div className="font-display font-extrabold text-[22px] leading-tight mt-3" style={{ fontStretch: "90%" }}>Demi-finale 100 m nage libre</div>
          <div className="flex items-center gap-1.5 text-[13.5px] text-muted-foreground mt-2.5">
            <MapPin className="h-[15px] w-[15px]" /> Arène olympique · Diamniadio
          </div>
        </div>

        {/* Carte à venir */}
        <div className="mt-3 bg-card border border-border rounded-[22px] p-[18px] shadow-sm flex items-center gap-4">
          <div className="text-center flex-shrink-0">
            <div className="font-display font-extrabold text-2xl leading-none">18:30</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Aujourd'hui</div>
          </div>
          <div className="w-px self-stretch bg-border" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-muted-foreground">Athlétisme</div>
            <div className="font-display font-bold text-[17px] mt-0.5 leading-tight">Finale 200 m — hommes</div>
          </div>
          <button onClick={() => navigate("/programme")} className="h-[42px] w-[42px] rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Plus className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </button>
        </div>

        {/* eSIM discret */}
        <button onClick={() => navigate("/profil")} className="mt-5 w-full flex items-center gap-3.5 px-4 py-[15px] border border-border rounded-[20px] text-left">
          <div className="h-[42px] w-[42px] rounded-[13px] bg-muted flex items-center justify-center flex-shrink-0">
            <SimIcon />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[14px]">Restez connecté · eSIM</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">SONATEL · dès l'aéroport</div>
          </div>
          <ChevronRight className="h-[19px] w-[19px] text-muted-foreground/60" />
        </button>
      </div>
    </div>
  );
};

const SimIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-foreground">
    <rect x="5" y="3" width="14" height="18" rx="2.5" />
    <path d="M9 3v6M5 9h4" />
  </svg>
);

export default HomeApp;

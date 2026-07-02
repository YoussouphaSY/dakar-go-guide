import { Link } from "react-router-dom";
import { ArrowRight, Wifi } from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import Logo from "@/components/Logo";

/*
  Home — Landing officielle Dakar-Go-26 (base "Web").
  Vrai site web : hero vidéo, marquee live, 3 axes, programme preview
  (données réelles, filtrable), découvrir Dakar (bento), mobilité split, eSIM, footer.
  La section "L'appli dans la poche" est retirée ; le bouton "Télécharger l'app" reste.
*/

const HERO_VIDEO = "/media/hero-dakar2026.mp4";

const FIGURES = [
  { n: "2 700", l: "athlètes" },
  { n: "35", l: "disciplines" },
  { n: "+2 M", l: "spectateurs" },
  { n: "6 000", l: "volontaires" },
  { n: "15 j", l: "de compétition", accent: true },
];


const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-background text-foreground">
      <LandingNav />
      <Hero />
      <Marquee />
      <SectionPortals />
      <EsimBanner variant="data" />
      <Footer />
    </div>
  );
};

/* ───────────────────────── NAV ───────────────────────── */
export const LandingNav = () => {
  const { lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 bg-foreground/[0.86] backdrop-blur-xl border-b border-white/10">
      <div className="relative max-w-[1240px] mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between text-background">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo tone="light" className="h-7 w-auto" />
        </Link>
        {/* Liens centrés */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/80 absolute left-1/2 -translate-x-1/2">
          <Link to="/programme" className="font-medium hover:text-white transition-colors">Programme</Link>
          <Link to="/mobilite" className="font-medium hover:text-white transition-colors">Mobilité</Link>
          <Link to="/decouverte" className="font-medium hover:text-white transition-colors">Découverte</Link>
        </nav>
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[13px]">
            {LANGUAGES.slice(0, 3).map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  "rounded-full px-2.5 py-1 font-semibold transition-colors",
                  lang === l.code ? "bg-white/10 text-white border border-white/15" : "text-white/50 hover:text-white",
                )}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#" className="bg-primary text-primary-foreground font-semibold text-sm px-4 lg:px-[18px] py-2.5 rounded-xl hover:bg-primary/90 transition-base">
            Télécharger l'app
          </a>
        </div>
      </div>
    </header>
  );
};

/* ───────────────────────── HERO ───────────────────────── */
const Hero = () => (
  <section className="relative bg-foreground text-background overflow-hidden">
    <div className="max-w-[1240px] mx-auto px-5 lg:px-8 pt-10 lg:pt-16">
      <div className="relative rounded-3xl overflow-hidden min-h-[440px] lg:min-h-[560px] flex items-end bg-foreground">
        <video className="absolute inset-0 w-full h-full object-cover" src={asset(HERO_VIDEO)} autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/45 to-transparent" />
        <div className="relative z-[2] p-7 lg:p-13 max-w-3xl" style={{ padding: "clamp(28px,4vw,52px)" }}>
          <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#9CE6BC]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
            1res JOJ d'Afrique · Nov. 2026
          </div>
          <h1 className="font-display font-black leading-[0.9] tracking-tight mt-4 lg:mt-5" style={{ fontStretch: "82%", fontSize: "clamp(52px,6.6vw,96px)" }}>
            Vivez les Jeux,<br />découvrez le <span className="text-[#9CE6BC]">Sénégal</span>.
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-white/70 max-w-xl mt-5">
            La plateforme officielle pour suivre les épreuves, planifier vos journées et vous déplacer dans Dakar en toute confiance.
          </p>
          <div className="flex flex-wrap gap-3.5 mt-7">
            <a href="#programme" className="bg-primary text-primary-foreground font-semibold px-6 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-primary/90 transition-base">
              Explorer le programme <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <a href="#programme" className="bg-white/[0.07] border-[1.5px] border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-base">
              Acheter des billets
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* Chiffres-clés */}
    <div className="max-w-[1240px] mx-auto px-5 lg:px-8 py-10 lg:py-14">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {FIGURES.map((f) => (
          <div key={f.l} className={cn("border-t pt-4", f.accent ? "border-primary border-t-2" : "border-white/15")}>
            <div className={cn("font-display font-extrabold text-3xl lg:text-[38px]", f.accent && "text-[#9CE6BC]")}>{f.n}</div>
            <div className="text-[13px] text-muted-foreground mt-1">{f.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────── MARQUEE ───────────────────────── */
const Marquee = () => {
  const items = ["Natation · finale 100 m", "Escrime · finale fleuret", "Athlétisme · finale 200 m", "Fan Zone Corniche · 16:00"];
  const Block = () => (
    <span className="inline-flex items-center gap-8 pr-8">
      <span className="inline-flex items-center gap-2 text-white">
        <span className="h-[7px] w-[7px] rounded-full bg-live animate-pulse" /> EN DIRECT
      </span>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-8">
          <span>{it}</span><span className="opacity-40">/</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="bg-foreground border-y border-white/10 overflow-hidden py-3 text-muted-foreground font-mono text-xs tracking-wide">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        <Block /><Block />
      </div>
    </div>
  );
};

/* ───────────────────────── 3 PORTAILS (cartes horizontales) ─────────────────────────
   La landing renvoie vers 3 pages détaillées : Programme · Mobilité · Découverte.
   Cartes horizontales cliquables. `img` à fournir (placeholder sinon).
*/
const PORTALS = [
  {
    to: "/programme", n: "01", title: "Programme", img: "/media/sections/programme.png",
    desc: "Les 25 sports et 151 épreuves des Jeux. Recherchez, filtrez par lieu et date, et composez votre agenda personnel.",
    cta: "Voir le programme",
  },
  {
    to: "/mobilite", n: "02", title: "Mobilité", img: "/media/sections/mobilite.jpg",
    desc: "Carte des sites, itinéraires multimodaux et guidage pas à pas jusqu'aux tribunes, sans stress.",
    cta: "Préparer mes trajets",
  },
  {
    to: "/decouverte", n: "03", title: "Découverte", img: "/media/sections/decouverte.jpg",
    desc: "Gorée, Lac Rose, musées : vivez le Sénégal et sa teranga entre deux épreuves.",
    cta: "Explorer Dakar",
  },
];

const SectionPortals = () => (
  <section className="max-w-[1240px] mx-auto px-5 lg:px-8" style={{ paddingTop: "clamp(56px,8vw,84px)" }}>
    <div className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Votre séjour, en trois temps</div>
      <h2 className="font-display font-extrabold leading-none tracking-tight mt-2.5" style={{ fontStretch: "85%", fontSize: "clamp(32px,4vw,46px)" }}>
        Suivez, déplacez-vous, découvrez
      </h2>
    </div>
    <div className="flex flex-col gap-4 mt-9">
      {PORTALS.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          className="group relative grid grid-cols-1 sm:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] rounded-[22px] overflow-hidden border border-border bg-card hover:border-foreground/15 hover:shadow-md transition-base"
        >
          {/* Image (gauche) */}
          <div className="relative h-44 sm:h-auto sm:min-h-[200px] bg-muted overflow-hidden">
            {p.img ? (
              <img src={asset(p.img)} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground">photo · {p.title}</div>
            )}
            <span className="absolute top-4 left-4 font-display font-black text-3xl text-white/90 drop-shadow sm:text-foreground/15 sm:drop-shadow-none">{p.n}</span>
          </div>
          {/* Texte (droite) */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Section {p.n}</div>
            <h3 className="font-display font-extrabold text-2xl lg:text-3xl mt-1.5" style={{ fontStretch: "86%" }}>{p.title}</h3>
            <p className="text-[14.5px] leading-relaxed text-muted-foreground mt-2.5 max-w-xl">{p.desc}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-4 group-hover:gap-3 transition-all">
              {p.cta} <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

/* En-tête de grande section (réutilisé par les pages). */
export const SectionHeader = ({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) => (
  <div className="max-w-2xl">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{kicker}</div>
    <h1 className="font-display font-extrabold leading-none tracking-tight mt-2.5" style={{ fontStretch: "85%", fontSize: "clamp(32px,4vw,46px)" }}>
      {title}
    </h1>
    {lead && <p className="text-[15.5px] leading-relaxed text-muted-foreground mt-3.5">{lead}</p>}
  </div>
);

/* ───────────────────────── BANDEAU eSIM (discret, récurrent) ─────────────────────────
   Présence Orange/SONATEL "qui passe crème" : fin, sobre, jamais l'élément principal.
*/
const EsimBanner = ({ variant }: { variant: "data" | "connect" }) => {
  const copy = variant === "data"
    ? { title: "Suivez le live en data, partout", sub: "eSIM SONATEL · dès l'aéroport, sans wifi" }
    : { title: "Guidez-vous même hors wifi", sub: "eSIM SONATEL · activation en 2 min" };
  return (
    <div className="max-w-[1240px] mx-auto px-5 lg:px-8" style={{ paddingTop: "clamp(40px,5vw,56px)" }}>
      <a href="#" className="group flex items-center gap-4 rounded-2xl border border-border bg-muted/40 px-5 py-4 hover:bg-muted/70 transition-base">
        <span className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
          <Wifi className="h-[18px] w-[18px] text-background" strokeWidth={2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{copy.title}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider bg-accent/20 text-foreground/70 px-1.5 py-0.5 rounded">SONATEL</span>
          </div>
          <div className="text-[12.5px] text-muted-foreground mt-0.5">{copy.sub}</div>
        </div>
        <span className="text-[13px] font-semibold text-primary inline-flex items-center gap-1.5 flex-shrink-0 group-hover:gap-2.5 transition-all">
          Voir les forfaits <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
      </a>
    </div>
  );
};


/* ───────────────────────── FOOTER ───────────────────────── */
export const Footer = () => (
  <footer className="max-w-[1240px] mx-auto px-5 lg:px-8 pt-18 pb-14" style={{ paddingTop: "clamp(56px,8vw,72px)" }}>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-border pb-10">
      <div className="col-span-2 lg:col-span-1">
        <Logo className="h-7 w-auto" />
        <p className="text-[13.5px] text-muted-foreground leading-relaxed mt-4 max-w-xs">
          La plateforme officielle d'accueil et d'orientation des Jeux Olympiques de la Jeunesse Dakar 2026.
        </p>
        <div className="flex items-center gap-2 mt-4.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          SONATEL <span className="opacity-40">×</span> COJOJ
        </div>
      </div>
      <FooterCol title="Découvrir" links={["Programme", "Découvrir Dakar", "Mobilité", "Résultats"]} />
      <FooterCol title="Services" links={["Billetterie", "eSIM SONATEL", "Assistant AYO", "Volontariat"]} />
      <div>
        <div className="font-semibold text-[13.5px] mb-3.5">Langue</div>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((l, i) => (
            <span key={l.code} className={cn(
              "text-xs rounded-full px-2.5 py-1",
              i === 0 ? "bg-foreground text-background" : "bg-muted border border-border",
            )}>{l.code.toUpperCase()}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center pt-6 flex-wrap gap-3.5">
      <div className="font-mono text-xs text-muted-foreground">© 2026 COJOJ — Jeux Olympiques de la Jeunesse Dakar 2026</div>
      <div className="flex gap-1.5">
        <span className="w-[22px] h-2 rounded-sm bg-primary" />
        <span className="w-[22px] h-2 rounded-sm bg-accent" />
        <span className="w-[22px] h-2 rounded-sm bg-live" />
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <div className="font-semibold text-[13.5px] mb-3.5">{title}</div>
    <div className="flex flex-col gap-2.5 text-[13.5px] text-muted-foreground">
      {links.map((l) => <a key={l} href="#" className="hover:text-foreground transition-colors">{l}</a>)}
    </div>
  </div>
);

export default Home;

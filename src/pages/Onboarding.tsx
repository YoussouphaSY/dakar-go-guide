import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";
import Logo from "@/components/Logo";

/*
  Onboarding — Lot 1 (fidèle maquettes Claude "Écrans").
  Flow : Splash (auto 2.2s) → Langue (1/3) → Nationalité (2/3) → Intérêts (3/3) → /.
  Mobile : plein écran. Desktop : carte centrée sur fond sombre (le flow reste "app").
*/

type Step = "splash" | "lang" | "country" | "sports";

const COUNTRIES = ["Sénégal", "France", "Maroc", "Nigéria", "États-Unis", "Espagne", "Brésil", "Japon"];
const SPORTS = [
  "Athlétisme", "Natation", "Basket 3×3", "Football", "Judo", "Taekwondo",
  "Escrime", "Lutte", "Cyclisme", "Escalade", "Breaking", "Tennis", "Beach volley",
];

const StepDots = ({ active }: { active: 1 | 2 | 3 }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className={cn(
          "h-1 rounded-full transition-all",
          i === active ? "w-6 bg-primary" : i < active ? "w-3.5 bg-primary" : "w-3.5 bg-border",
        )}
      />
    ))}
  </div>
);

const Onboarding = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useI18n();
  const [step, setStep] = useState<Step>("splash");
  const [country, setCountry] = useState("Sénégal");
  const [sports, setSports] = useState<string[]>(["Athlétisme", "Natation", "Football"]);

  // Splash auto-advance
  useEffect(() => {
    if (step !== "splash") return;
    const t = setTimeout(() => setStep("lang"), 2200);
    return () => clearTimeout(t);
  }, [step]);

  const toggleSport = (s: string) =>
    setSports((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const finish = () => navigate("/");

  return (
    <div className="flex-1 flex items-stretch justify-center bg-foreground lg:py-10 lg:px-4">
      {/* "Téléphone" : plein écran mobile, carte centrée desktop */}
      <div className="relative w-full lg:max-w-[420px] bg-background lg:rounded-[36px] overflow-hidden flex flex-col lg:shadow-2xl">
        {step === "splash" ? <SplashView /> : null}

        {step === "lang" && (
          <StepFrame
            active={1}
            title="Choisissez votre langue"
            subtitle="Vous pourrez la changer à tout moment."
            cta="Continuer"
            onCta={() => setStep("country")}
          >
            <div className="flex flex-col gap-2.5">
              {LANGUAGES.map((l) => {
                const selected = l.code === lang;
                return (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code as Lang)}
                    className={cn(
                      "flex items-center gap-3.5 p-4 rounded-2xl border-[1.5px] text-left transition-base",
                      selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "h-9 w-9 rounded-[10px] flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0",
                        selected ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {l.code === "ar" ? "عر" : l.code.toUpperCase()}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-[15px]">{l.native}</span>
                      <span className="block text-xs text-muted-foreground">{l.label}</span>
                    </span>
                    <RadioCheck selected={selected} />
                  </button>
                );
              })}
            </div>
          </StepFrame>
        )}

        {step === "country" && (
          <StepFrame
            active={2}
            title="D'où venez-vous ?"
            subtitle="Pour adapter devises, infos visa et contenus."
            cta="Continuer"
            onCta={() => setStep("sports")}
            header={
              <div className="mt-4 flex items-center gap-2.5 border-[1.5px] border-border rounded-xl px-3.5 py-3">
                <Search className="h-[18px] w-[18px] text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Rechercher un pays…</span>
              </div>
            }
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Suggestions
            </div>
            <div className="flex flex-col gap-2">
              {COUNTRIES.map((c) => {
                const selected = c === country;
                return (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={cn(
                      "flex items-center gap-3.5 px-3.5 py-3 rounded-xl border-[1.5px] text-left transition-base",
                      selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                    )}
                  >
                    <span className="h-[30px] w-[30px] rounded-full bg-muted border border-border flex-shrink-0" />
                    <span className="flex-1 font-semibold text-[15px]">{c}</span>
                    <RadioCheck selected={selected} />
                  </button>
                );
              })}
            </div>
          </StepFrame>
        )}

        {step === "sports" && (
          <StepFrame
            active={3}
            title="Vos sports préférés"
            subtitle="On mettra ces épreuves en avant pour vous."
            cta="Découvrir mon accueil"
            onCta={finish}
          >
            <div className="flex flex-wrap gap-2.5">
              {SPORTS.map((s) => {
                const selected = sports.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSport(s)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-base border",
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-foreground/80 border-transparent hover:bg-muted/70",
                    )}
                  >
                    {selected && <Check className="h-3.5 w-3.5" strokeWidth={2.6} />}
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-3 bg-muted/60 border border-border rounded-2xl p-4">
              <span className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-background" strokeWidth={1.8} />
              </span>
              <p className="text-[13px] text-foreground/70 leading-snug">
                AYO affinera vos recommandations au fil de vos visites.
              </p>
            </div>
          </StepFrame>
        )}
      </div>
    </div>
  );
};

/* — Splash — */
const SplashView = () => (
  <div className="flex-1 flex flex-col bg-foreground text-background min-h-[100dvh] lg:min-h-[760px]">
    <div className="flex-1 flex flex-col items-center justify-center gap-7 px-8">
      <Logo tone="light" className="h-16 w-auto" />
      <div className="text-center">
        <div className="font-display font-black text-4xl tracking-tight" style={{ fontStretch: "82%" }}>
          Dakar 2026
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
          Jeux Olympiques de la Jeunesse
        </div>
      </div>
    </div>
    <div className="px-11 pb-10">
      <div className="h-1 rounded bg-muted/20 overflow-hidden">
        <div className="h-full w-2/3 bg-primary rounded animate-pulse" />
      </div>
      <div className="flex justify-center items-center gap-2 mt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>SONATEL</span>
        <span className="opacity-40">×</span>
        <span>COJOJ</span>
      </div>
    </div>
  </div>
);

/* — Cadre commun des étapes — */
const StepFrame = ({
  active, title, subtitle, cta, onCta, header, children,
}: {
  active: 1 | 2 | 3;
  title: string;
  subtitle: string;
  cta: string;
  onCta: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex-1 flex flex-col min-h-[100dvh] lg:min-h-[760px]">
    <div className="px-6 pt-6">
      <StepDots active={active} />
      <div className="font-mono text-[11px] text-muted-foreground mt-4">Étape {active} / 3</div>
      <h1 className="font-display font-extrabold text-3xl leading-tight mt-2" style={{ fontStretch: "86%" }}>
        {title}
      </h1>
      <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      {header}
    </div>
    <div className="flex-1 overflow-y-auto px-6 pt-5 pb-4">{children}</div>
    <div className="px-6 pt-4 pb-7 border-t border-border">
      <button
        onClick={onCta}
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] py-4 rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-base"
      >
        {cta}
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </div>
  </div>
);

/* — Pastille de sélection (radio/check) — */
const RadioCheck = ({ selected }: { selected: boolean }) =>
  selected ? (
    <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
      <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
    </span>
  ) : (
    <span className="h-[22px] w-[22px] rounded-full border-[1.5px] border-border flex-shrink-0" />
  );

export default Onboarding;

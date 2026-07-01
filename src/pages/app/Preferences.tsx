import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { LANGS, INTERESTS, type LangId } from "@/data/appMock";

/*
  Preferences — dernière étape du flow d'ouverture : langue + centres
  d'intérêt (mêmes données que le Profil, via le store). « Terminer » → accueil.
*/

const COUNTRIES = ["Sénégal", "France", "Maroc", "Nigéria", "États-Unis", "Espagne"];

interface PreferencesProps {
  onDone: () => void;
}

const Preferences = ({ onDone }: PreferencesProps) => {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const interests = useApp((s) => s.interests);
  const toggleInterest = useApp((s) => s.toggleInterest);

  return (
    <div className="flex-1 flex flex-col bg-background px-[26px] pb-8 overflow-y-auto scr">
      <div className="pt-8">
        <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wide">Dernière étape</div>
        <h1 className="font-display font-extrabold text-[30px] tracking-tight mt-2">Vos préférences</h1>
        <p className="text-[14.5px] text-muted-foreground mt-1.5">On personnalise l'app pour vous.</p>
      </div>

      {/* langue */}
      <h3 className="font-display font-extrabold text-base mt-7">Langue</h3>
      <div className="flex gap-2 mt-3 flex-wrap">
        {LANGS.map((l) => {
          const on = l.id === lang;
          return (
            <button
              key={l.id}
              onClick={() => setLang(l.id as LangId)}
              className={cn(
                "border-[1.5px] rounded-full px-4 py-[9px] text-[13px] font-semibold transition-base",
                on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground",
              )}
            >
              {l.full}
            </button>
          );
        })}
      </div>

      {/* nationalité */}
      <h3 className="font-display font-extrabold text-base mt-7">Nationalité</h3>
      <div className="flex gap-2 mt-3 flex-wrap">
        {COUNTRIES.map((c) => (
          <button
            key={c}
            className="border-[1.5px] border-border bg-background text-muted-foreground rounded-full px-4 py-[9px] text-[13px] font-medium hover:border-primary hover:text-primary transition-base"
          >
            {c}
          </button>
        ))}
      </div>

      {/* centres d'intérêt */}
      <h3 className="font-display font-extrabold text-base mt-7">Centres d'intérêt</h3>
      <div className="flex gap-2 mt-3 flex-wrap">
        {INTERESTS.map((i) => {
          const on = interests[i.id];
          return (
            <button
              key={i.id}
              onClick={() => toggleInterest(i.id)}
              className={cn(
                "border-[1.5px] rounded-full px-[15px] py-[9px] text-[13px] font-medium transition-base",
                on ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground",
              )}
            >
              {i.name}
            </button>
          );
        })}
      </div>

      <button
        onClick={onDone}
        className="mt-8 bg-primary text-primary-foreground font-semibold text-[15px] py-[15px] rounded-[15px] inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-base"
      >
        Terminer
        <ArrowRight className="w-[17px] h-[17px]" strokeWidth={2.3} />
      </button>
    </div>
  );
};

export default Preferences;

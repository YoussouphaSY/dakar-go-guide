import { useEffect } from "react";

/*
  Splash — écran de démarrage (interface app). Affiché ~2 s à chaque
  ouverture, puis on route vers la connexion (si non connecté) ou l'accueil.
*/

interface SplashProps {
  onDone: () => void;
}

const Splash = ({ onDone }: SplashProps) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_16px,transparent_16px_32px)]" />
      <div className="relative flex flex-col items-center anim-fade">
        <div className="w-[92px] h-[92px] rounded-[26px] border-2 border-background/25 flex items-center justify-center">
          <span className="font-display font-extrabold text-4xl tracking-tight text-background">26</span>
        </div>
        <div className="font-display font-extrabold text-[26px] tracking-tight mt-5">Dakar-Go</div>
        <div className="text-[13px] text-muted-foreground mt-1">JOJ Dakar 2026 · votre guide</div>
      </div>
      <div className="absolute bottom-14 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-background/40"
            style={{ animation: `livep 1.2s infinite`, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;

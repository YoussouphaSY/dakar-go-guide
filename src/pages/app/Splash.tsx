import { useEffect } from "react";

/*
  Splash — écran de démarrage (interface app). Affiché ~2 s à chaque
  ouverture, met en avant le visuel officiel « Road to Dakar 2026 » avec
  la mascotte AYO, puis route vers la connexion / l'accueil.
*/

interface SplashProps {
  onDone: () => void;
}

const Splash = ({ onDone }: SplashProps) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#E31B23" }}>
      {/* motif diagonal léger */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_16px,transparent_16px_32px)]" />

      {/* visuel officiel AYO */}
      <div className="relative w-full px-6 anim-fade">
        <img
          src="/assets/brand/ayo-road-to.jpg"
          alt="Road to Dakar 2026 avec AYO"
          className="w-full rounded-[22px] shadow-2xl"
        />
      </div>

      <div className="relative text-center mt-7 anim-fade">
        <div className="font-display font-extrabold text-[24px] tracking-tight text-white">Dakar-Go</div>
        <div className="text-[13px] text-white/80 mt-1">JOJ Dakar 2026 · votre guide</div>
      </div>

      <div className="absolute bottom-14 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-white/50"
            style={{ animation: `livep 1.2s infinite`, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;

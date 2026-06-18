import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Map, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  BottomNav — barre de navigation basse, 5 onglets (fidèle maquette Claude "nav A").
  Accueil (maison) · Programme (calendrier) · Carte (carte pliée) · AYO (étoile) · Profil.
  Onglet actif : vert + indicateur en haut.
*/

const TABS = [
  { to: "/", label: "Accueil", icon: Home, end: true },
  { to: "/programme", label: "Programme", icon: CalendarDays },
  { to: "/carte", label: "Carte", icon: Map },
  { to: "/ayo", label: "AYO", icon: Star },
  { to: "/profil", label: "Profil", icon: User },
];

const BottomNav = () => {
  return (
    <nav className="flex-shrink-0 bg-background border-t border-border pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-1.5 flex justify-around items-start">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "relative flex-1 flex flex-col items-center gap-1 py-1.5 transition-base",
              isActive ? "text-primary" : "text-muted-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -top-2 h-[3px] w-5 rounded-full bg-primary" />
              )}
              <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
              <span className={cn("text-[10.5px]", isActive ? "font-bold" : "font-medium")}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;

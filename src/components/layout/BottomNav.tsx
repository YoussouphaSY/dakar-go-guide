import { NavLink } from "react-router-dom";
import { Home, CalendarDays, CalendarCheck, Navigation, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";

/*
  BottomNav — barre basse fidèle au prototype (Prototype-2) :
  Accueil · Programme · Agenda (badge) · Mobilité · Carte.
  L'onglet actif est vert, icône « remplie ». Profil s'ouvre via l'avatar,
  AYO via le bouton flottant.
*/

const TABS = [
  { to: "/", label: "Accueil", icon: Home, end: true },
  { to: "/programme", label: "Programme", icon: CalendarDays },
  { to: "/agenda", label: "Agenda", icon: CalendarCheck, badge: true },
  { to: "/mobilite", label: "Mobilité", icon: Navigation },
  { to: "/profil", label: "Profil", icon: User },
];

const BottomNav = () => {
  const agendaCount = useApp((s) => s.agenda.length);

  return (
    <nav className="flex-shrink-0 bg-background border-t border-border pt-2 pb-[max(1.4rem,env(safe-area-inset-bottom))] px-2.5 flex justify-around items-start">
      {TABS.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "relative flex flex-col items-center gap-1 px-1.5 py-0.5 transition-base",
              isActive ? "text-primary" : "text-muted-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              <span className="relative flex">
                <Icon
                  className="h-[23px] w-[23px]"
                  strokeWidth={1.8}
                  fill={isActive ? "currentColor" : "none"}
                />
                {badge && agendaCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-[1.5px] border-background">
                    {agendaCount}
                  </span>
                )}
              </span>
              <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>
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

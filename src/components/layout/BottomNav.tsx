import { NavLink } from "react-router-dom";
import { Home, CalendarDays, CalendarCheck, Navigation, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/store/appStore";
import { useT } from "@/lib/useT";

/*
  BottomNav — barre basse fidèle au prototype (Prototype-2) :
  Accueil · Programme · Agenda (badge) · Mobilité · Profil.
  Libellés traduits selon la langue choisie.
*/

const TABS = [
  { to: "/", key: "nav.home", icon: Home, end: true },
  { to: "/programme", key: "nav.programme", icon: CalendarDays },
  { to: "/agenda", key: "nav.agenda", icon: CalendarCheck, badge: true },
  { to: "/mobilite", key: "nav.mobilite", icon: Navigation },
  { to: "/profil", key: "nav.profil", icon: User },
];

const BottomNav = () => {
  const agendaCount = useApp((s) => s.agenda.length);
  const { t } = useT();

  return (
    <nav className="flex-shrink-0 bg-background border-t border-border pt-2 pb-[max(1.4rem,env(safe-area-inset-bottom))] px-2.5 flex justify-around items-start">
      {TABS.map(({ to, key, icon: Icon, end, badge }) => (
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
                {t(key as Parameters<typeof t>[0])}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;

import { NavLink, Link } from "react-router-dom";
import { Home, CalendarDays, MapPin, Sparkles, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/*
  TopNav — barre de navigation horizontale (desktop uniquement, lg+).
  Logo à gauche · liens centraux · sélecteur de langue à droite.
  Esprit olympics.com : sobre, noir & blanc, accent vert sur l'onglet actif.
*/

const LINKS = [
  { to: "/", label: "Accueil", icon: Home, end: true },
  { to: "/programme", label: "Programme", icon: CalendarDays },
  { to: "/carte", label: "Carte", icon: MapPin },
  { to: "/ayo", label: "AYO", icon: Sparkles },
  { to: "/profil", label: "Profil", icon: User },
];

const TopNav = () => {
  const { lang, setLang } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <header className="hidden lg:block sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <Logo className="h-8 w-auto" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground hidden xl:block">
            SONATEL × COJOJ
          </span>
        </Link>

        {/* Liens */}
        <nav className="flex items-center gap-1">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-base",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                )
              }
            >
              <Icon className="h-4 w-4" strokeWidth={1.9} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Langue */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 border border-border rounded-full pl-3.5 pr-2.5 py-1.5 text-sm font-semibold hover:bg-muted transition-base">
            {current?.code.toUpperCase()}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LANGUAGES.map((l) => (
              <DropdownMenuItem
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(lang === l.code && "bg-muted font-semibold")}
              >
                <span className="font-mono text-xs w-7 text-muted-foreground">{l.code.toUpperCase()}</span>
                {l.native}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNav;

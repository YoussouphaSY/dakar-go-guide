import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Trophy, MessageCircle, User, Menu, TrendingUp, MapPin, LogOut, Shield, Compass, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useLanguage } from "@/hooks/useLanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import dakarLogo from "@/assets/dakar2026-logo.png";
// import dakarLogo from "@/assets/dakar2026-logo.jpg";
import { NotificationBell } from "@/components/NotificationBell";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const languages = [
    { code: 'fr' as const, label: '🇫🇷 Français', name: 'Français' },
    { code: 'en' as const, label: '🇬🇧 English', name: 'English' },
    { code: 'wo' as const, label: '🇸🇳 Wolof', name: 'Wolof' },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnecté",
      description: "À bientôt aux JOJ Dakar 2026!",
    });
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Accueil", icon: null },
    { path: "/events", label: "Événements", icon: Calendar },
    { path: "/results", label: "Résultats", icon: Trophy },
    { path: "/discover", label: "Découvrir", icon: MapPin },
    { path: "/virtual-tour", label: "Visite Virtuelle", icon: Compass },
    { path: "/records", label: "Records", icon: TrendingUp },
    { path: "/assistant", label: "AYO Chat", icon: MessageCircle },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            } ${mobile ? "w-full text-lg" : ""}`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-card shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <img src={dakarLogo} alt="Dakar 2026" className="h-16 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLinks />
          
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {languages.find(l => l.code === language)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-accent" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user ? (
            <>
              <NotificationBell />
              {isAdmin && (
                <Link to="/admin">
                  <Button
                    variant={location.pathname === "/admin" ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button
                  variant={location.pathname === "/profile" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <NavLinks mobile />
              
              {/* Mobile Language Selector */}
              <div className="w-full border-t pt-4">
                <p className="text-sm font-semibold mb-2 px-4">Langue / Language</p>
                <div className="flex flex-col gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "ghost"}
                      onClick={() => setLanguage(lang.code)}
                      className="w-full justify-start text-lg"
                    >
                      {lang.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="w-full">
                      <Button
                        variant={location.pathname === "/admin" ? "default" : "ghost"}
                        className="w-full flex items-center gap-2 text-lg"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin</span>
                      </Button>
                    </Link>
                  )}
                  <Link to="/profile" className="w-full">
                    <Button
                      variant={location.pathname === "/profile" ? "default" : "ghost"}
                      className="w-full flex items-center gap-2 text-lg"
                    >
                      <User className="h-4 w-4" />
                      <span>Profil</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button variant="default" className="w-full flex items-center gap-2 text-lg">
                    <User className="h-4 w-4" />
                    <span>Connexion</span>
                  </Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

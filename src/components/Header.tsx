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
import { NotificationBell } from "@/components/NotificationBell";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const languages = [
    { code: 'fr' as const, label: '🇫🇷 Français', name: 'Français' },
    { code: 'en' as const, label: '🇬🇧 English', name: 'English' },
    { code: 'wo' as const, label: '🇸🇳 Wolof', name: 'Wolof' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      title: t.nav.loggedOut,
      description: t.nav.loggedOutDesc,
    });
    navigate("/");
  };

  const navItems = [
    { path: "/", label: t.nav.home, icon: null },
    { path: "/events", label: t.nav.events, icon: Calendar },
    { path: "/results", label: t.nav.results, icon: Trophy },
    { path: "/discover", label: t.nav.discover, icon: MapPin },
    { path: "/virtual-tour", label: t.nav.virtualTour, icon: Compass },
    { path: "/records", label: t.nav.records, icon: TrendingUp },
    { path: "/assistant", label: t.nav.assistant, icon: MessageCircle },
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
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
    <header className={`sticky top-0 z-50 w-full border-b-2 border-border transition-all duration-300 ${scrolled ? "bg-primary shadow-lg" : "bg-card shadow-md"
      }`}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className={`flex items-center justify-center transition-all duration-300 ${scrolled ? "bg-white rounded-full p-1.5 shadow-sm" : ""
            }`}>
            <img
              src={dakarLogo}
              alt="Dakar 2026"
              className={`object-contain transition-all duration-300 ${scrolled ? "h-12 w-12" : "h-16 w-auto"
                }`}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${scrolled
                    ? isActive
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={scrolled ? "ghost" : "outline"} size="sm" className={scrolled ? "text-white hover:bg-white/10" : ""}>
                <Globe className="h-4 w-4 mr-1" />
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
                    className={`flex items-center gap-2 ${scrolled ? "text-white hover:bg-white/10" : ""}`}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button
                  variant={location.pathname === "/profile" ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 ${scrolled ? "text-white hover:bg-white/10" : ""}`}
                >
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className={`flex items-center gap-2 ${scrolled ? "text-white hover:bg-white/10" : ""}`}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant={scrolled ? "secondary" : "default"} size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{t.nav.login}</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className={scrolled ? "text-white" : ""}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <NavLinks mobile />

              {/* Mobile Language Selector */}
              <div className="w-full border-t pt-4">
                <p className="text-sm font-semibold mb-2 px-4">{t.nav.language}</p>
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
                      <span>{t.nav.profile}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t.nav.logout}</span>
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button variant="default" className="w-full flex items-center gap-2 text-lg">
                    <User className="h-4 w-4" />
                    <span>{t.nav.login}</span>
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

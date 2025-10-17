import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Trophy, MessageCircle, User, Menu, TrendingUp, MapPin, LogOut, Shield, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import dakarLogo from "@/assets/dakar2026-logo.jpg";
import { NotificationBell } from "@/components/NotificationBell";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
    { path: "/assistant", label: "Assistant IA", icon: MessageCircle },
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <img src={dakarLogo} alt="Dakar 2026" className="h-12 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLinks />
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

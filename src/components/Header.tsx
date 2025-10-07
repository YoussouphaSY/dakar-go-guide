import { Link, useLocation } from "react-router-dom";
import { Calendar, Trophy, MessageCircle, User, Menu, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Accueil", icon: null },
    { path: "/events", label: "Événements", icon: Calendar },
    { path: "/results", label: "Résultats", icon: Trophy },
    { path: "/records", label: "Records", icon: TrendingUp },
    { path: "/assistant", label: "Assistant IA", icon: MessageCircle },
    { path: "/profile", label: "Profil", icon: User },
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
            <div className="h-8 w-8 rounded-full bg-gradient-hero" />
            <span className="text-xl font-bold">DakarGo2026</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLinks />
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

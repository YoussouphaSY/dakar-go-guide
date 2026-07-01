import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import TopNav from "@/components/layout/TopNav";

/*
  AppShell — coquille de la plateforme, 2 variantes :
  - "web"  : vrai site web → TopNav horizontal (desktop), contenu pleine largeur.
  - "app"  : PWA mobile → contenu en colonne largeur téléphone (centré si grand
             écran de test), BottomNav toujours visible, pas de TopNav.
*/

interface AppShellProps {
  children: ReactNode;
  bottomNav?: ReactNode;
  /** "web" (défaut) ou "app". */
  variant?: "web" | "app";
  /** Affiche le TopNav desktop (variante web, écrans principaux). */
  withTopNav?: boolean;
  /** Couche transverse app (sheets, AYO flottant, toast), positionnée sur le cadre. */
  overlays?: ReactNode;
  className?: string;
}

const AppShell = ({ children, bottomNav, variant = "web", withTopNav = true, overlays, className }: AppShellProps) => {
  if (variant === "app") {
    // Interface app : cadre largeur mobile, plein écran en PWA, centré si testé sur desktop.
    return (
      <div className="min-h-[100dvh] w-full bg-muted/30 flex justify-center">
        <div className="relative w-full max-w-[440px] min-h-[100dvh] bg-background flex flex-col overflow-hidden">
          <main className={cn("flex-1 flex flex-col min-h-0 overflow-hidden", className)}>
            {children}
          </main>
          {bottomNav}
          {overlays}
        </div>
      </div>
    );
  }

  // Interface web
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {withTopNav && <TopNav />}
      <main className={cn("flex-1 flex flex-col min-h-0", className)}>
        {children}
      </main>
      {bottomNav && <div className="lg:hidden">{bottomNav}</div>}
    </div>
  );
};

export default AppShell;

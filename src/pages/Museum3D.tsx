import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import MuseumScene from "@/scenes/MuseumScene";
import { HUD } from "@/components/HUD";
import { MiniMap } from "@/components/MiniMap";
import { ArtworkDetailModal } from "@/components/ArtworkDetailModal";
import { oeuvres } from "@/data/oeuvres";
import { Loader2, Smartphone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Museum3D = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 2, 10]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [forceMobile, setForceMobile] = useState(false);

  // Transformation des œuvres pour la scène 3D
  // coordinates { x, y, z } -> position [x, y, z]
  const artworksForScene = oeuvres.map((oeuvre) => ({
    id: oeuvre.id,
    title: oeuvre.title[language],
    imageUrl: oeuvre.images[0],
    position: [
      (oeuvre.coordinates?.x || 0) as number,  // Position horizontale (gauche-droite)
      (oeuvre.coordinates?.y || 1.5) as number, // Position verticale (hauteur)
      (oeuvre.coordinates?.z || 0) as number,   // Position profondeur (avant-arrière)
    ] as [number, number, number],
  }));

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const total = oeuvres.length;
    
    oeuvres.forEach((oeuvre) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadingProgress(Math.round((loaded / total) * 100));
        if (loaded === total) {
          setTimeout(() => setImagesLoaded(true), 500);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadingProgress(Math.round((loaded / total) * 100));
        if (loaded === total) {
          setTimeout(() => setImagesLoaded(true), 500);
        }
      };
      img.src = oeuvre.images[0];
    });
  }, []);

  const handleArtworkClick = (id: string) => {
    setSelectedArtwork(id);
  };

  const selectedOeuvre = oeuvres.find((o) => o.id === selectedArtwork);

  // Mobile warning
  if ((isMobile || forceMobile) && !imagesLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="fixed inset-0 pt-16 flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-6 w-6 text-primary" />
                <CardTitle>Visite 3D</CardTitle>
              </div>
              <CardDescription>
                L'expérience 3D fonctionne mieux sur ordinateur avec souris et clavier
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pour une meilleure expérience de navigation 3D, nous recommandons d'utiliser un ordinateur de bureau ou portable.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => setForceMobile(false)} className="w-full">
                  Continuer quand même
                </Button>
                <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                  Retour
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {!imagesLoaded && (
        <div className="fixed inset-0 pt-16 bg-background z-50 flex flex-col items-center justify-center gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">
              {language === "fr" ? "Chargement du musée..." : 
               language === "en" ? "Loading museum..." : 
               "Dañuy charger musée bi..."}
            </p>
            <p className="text-muted-foreground">
              {language === "fr" ? "Préparation des œuvres d'art" : 
               language === "en" ? "Preparing artworks" : 
               "Dañuy teg oeuvre yi"}
            </p>
            <div className="mt-4 w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{loadingProgress}%</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pt-16">
        <MuseumScene artworks={artworksForScene} onArtworkClick={handleArtworkClick} />
      </div>

      <HUD
        artworkCount={oeuvres.length}
        currentRoom={language === "fr" ? "Salle principale" : language === "en" ? "Main Hall" : "Salle bi"}
        onShowMap={() => setShowMap(true)}
        onShowHelp={() => setShowHelp(true)}
      />

      {showMap && (
        <MiniMap
          artworks={oeuvres}
          playerPosition={playerPosition}
          onClose={() => setShowMap(false)}
        />
      )}

      <ArtworkDetailModal
        artwork={selectedOeuvre || null}
        open={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
};

export default Museum3D;

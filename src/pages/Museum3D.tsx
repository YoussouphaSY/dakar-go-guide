import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import MuseumScene from "@/scenes/MuseumScene";
import { HUD } from "@/components/HUD";
import { MiniMap } from "@/components/MiniMap";
import { ArtworkDetailModal } from "@/components/ArtworkDetailModal";
import { oeuvres } from "@/data/oeuvres";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Museum3D = () => {
  const { language } = useLanguage();
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 2, 10]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const artworksForScene = oeuvres.map((oeuvre) => ({
    id: oeuvre.id,
    title: oeuvre.title[language],
    imageUrl: oeuvre.images[0],
    position: [
      (oeuvre.coordinates?.x || 0) as number,
      2 as number,
      (oeuvre.coordinates?.y || 0) as number,
    ] as [number, number, number],
  }));

  // Preload images
  useState(() => {
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
  });

  const handleArtworkClick = (id: string) => {
    setSelectedArtwork(id);
  };

  const selectedOeuvre = oeuvres.find((o) => o.id === selectedArtwork);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {!imagesLoaded && (
        <div className="fixed inset-0 pt-16 bg-background z-50 flex flex-col items-center justify-center gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">Chargement du musée...</p>
            <p className="text-muted-foreground">Préparation des œuvres d'art</p>
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
        currentRoom="Salle principale"
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

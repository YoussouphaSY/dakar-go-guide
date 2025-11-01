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

  const artworksForScene = oeuvres.map((oeuvre) => ({
    id: oeuvre.id,
    imageUrl: oeuvre.images[0],
    position: [
      (oeuvre.coordinates?.x || 0) as number,
      2 as number,
      (oeuvre.coordinates?.y || 0) as number,
    ] as [number, number, number],
  }));

  const handleArtworkClick = (id: string) => {
    setSelectedArtwork(id);
  };

  const selectedOeuvre = oeuvres.find((o) => o.id === selectedArtwork);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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

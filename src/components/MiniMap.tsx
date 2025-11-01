import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MiniMapProps {
  artworks: Array<{ id: string; coordinates?: { x: number; y: number } }>;
  playerPosition: [number, number, number];
  onClose: () => void;
}

export function MiniMap({ artworks, playerPosition, onClose }: MiniMapProps) {
  const scale = 10;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="relative w-full max-w-md p-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h3 className="font-display font-bold text-xl mb-4">Plan du Musée</h3>

        <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
          {/* Museum floor plan */}
          <svg className="w-full h-full" viewBox="0 0 300 300">
            {/* Main hall */}
            <rect
              x="50"
              y="50"
              width="200"
              height="200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* Rooms */}
            <line x1="150" y1="50" x2="150" y2="250" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="150" x2="250" y2="150" stroke="currentColor" strokeWidth="1" />

            {/* Artworks */}
            {artworks.map((artwork) => {
              if (!artwork.coordinates) return null;
              const x = centerX + artwork.coordinates.x * scale;
              const y = centerY + artwork.coordinates.y * scale;
              return (
                <circle
                  key={artwork.id}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(var(--primary))"
                  opacity="0.7"
                />
              );
            })}

            {/* Player position */}
            <circle
              cx={centerX + playerPosition[0] * scale}
              cy={centerY + playerPosition[2] * scale}
              r="6"
              fill="hsl(var(--accent))"
            />
          </svg>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Œuvres</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span>Votre position</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

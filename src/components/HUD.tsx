import { Info, Map, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

interface HUDProps {
  artworkCount: number;
  currentRoom?: string;
  onShowMap: () => void;
  onShowHelp: () => void;
}

export function HUD({ artworkCount, currentRoom, onShowMap, onShowHelp }: HUDProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top Info Bar */}
      <div className="absolute top-20 left-4 right-4 pointer-events-auto">
        <Card className="p-4 bg-background/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg">{t.museum.title}</h2>
              {currentRoom && (
                <p className="text-sm text-muted-foreground">{currentRoom}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {artworkCount} {t.museum.artworks}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <Card className="p-3 bg-background/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={onShowHelp}>
                <Info className="h-4 w-4 mr-2" />
                {t.museum.controls}
              </Button>
              <div className="text-xs text-muted-foreground hidden md:block">
                <p>{t.museum.move}</p>
                <p>{t.museum.zoom}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onShowMap}>
              <Map className="h-4 w-4 mr-2" />
              {t.museum.map}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

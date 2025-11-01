import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Play, Pause, Calendar, MapPin, Ruler, Package } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import type { Oeuvre } from "@/types/schema";

interface ArtworkDetailModalProps {
  artwork: Oeuvre | null;
  open: boolean;
  onClose: () => void;
}

export function ArtworkDetailModal({ artwork, open, onClose }: ArtworkDetailModalProps) {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!artwork) return null;

  const favorite = isFavorite(artwork.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title[language],
        text: artwork.description[language],
      });
    } else {
      toast.success("Fonctionnalité de partage non disponible");
    }
  };

  const handleToggleAudio = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? t.oeuvre.pauseAudio : t.oeuvre.playAudio);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">
            {artwork.title[language]}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted">
              <img
                src={artwork.images[currentImageIndex]}
                alt={artwork.title[language]}
                className="w-full h-full object-cover"
              />
            </div>
            {artwork.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 rounded overflow-hidden shrink-0 transition-all ${
                      currentImageIndex === index
                        ? "ring-2 ring-primary scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${artwork.title[language]} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge className="mb-2">{artwork.category}</Badge>
                <p className="text-lg text-muted-foreground">{artwork.artist}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    toggleFavorite(artwork.id);
                    toast.success(
                      favorite ? t.oeuvre.removeFromFavorites : t.oeuvre.addToFavorites
                    );
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorite ? "fill-primary text-primary" : ""
                    }`}
                  />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.oeuvre.period}</p>
                  <p className="font-medium text-sm">{artwork.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.oeuvre.room}</p>
                  <p className="font-medium text-sm">{artwork.room}</p>
                </div>
              </div>
              {artwork.dimensions && (
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.oeuvre.dimensions}</p>
                    <p className="font-medium text-sm">{artwork.dimensions}</p>
                  </div>
                </div>
              )}
              {artwork.material && (
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t.oeuvre.material}</p>
                    <p className="font-medium text-sm">{artwork.material}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Guide */}
            {artwork.audioUrl && (
              <Button onClick={handleToggleAudio} className="w-full" size="sm">
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    {t.oeuvre.pauseAudio}
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    {t.oeuvre.playAudio}
                  </>
                )}
              </Button>
            )}

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-display font-bold text-lg mb-2">
                {t.oeuvre.description}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {artwork.description[language]}
              </p>
            </div>

            <Separator />

            {/* History */}
            <div>
              <h3 className="font-display font-bold text-lg mb-2">
                {t.oeuvre.history}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {artwork.history[language]}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Info, Navigation, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "sonner";

interface CulturalSite {
  id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  virtual_tour_url: string | null;
  historical_info: string;
  city: string;
}

const VirtualTour = () => {
  const [sites, setSites] = useState<CulturalSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCulturalSites();
  }, []);

  const loadCulturalSites = async () => {
    try {
      const { data, error } = await supabase
        .from("cultural_sites")
        .select("*")
        .order("name");

      if (error) throw error;
      setSites(data || []);
    } catch (error) {
      console.error("Error loading cultural sites:", error);
      toast.error("Erreur lors du chargement des sites");
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (site: CulturalSite) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`;
    window.open(url, "_blank");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Monument: "bg-accent text-accent-foreground",
      Musée: "bg-primary text-primary-foreground",
      "Site Historique": "bg-secondary text-secondary-foreground",
      Plage: "bg-blue-500 text-white",
      Marché: "bg-orange-500 text-white",
      Parc: "bg-green-600 text-white",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Visite Virtuelle 3D
          </h1>
          <p className="text-muted-foreground text-lg">
            Explorez les sites emblématiques du Sénégal comme si vous y étiez
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedSite(site)}
            >
              {site.image_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={site.image_url} 
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <Badge className={getCategoryColor(site.category)}>
                    {site.category}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  {site.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {site.description}
                </p>
                <Button size="sm" className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Visiter en 3D
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedSite && (
          <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedSite(null)}
          >
            <div className="w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 bg-background/10 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-white">{selectedSite.name}</h2>
                  <Badge className={getCategoryColor(selectedSite.category)}>
                    {selectedSite.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSite(null)}
                  className="text-white hover:bg-white/20"
                >
                  ✕ Fermer
                </Button>
              </div>
              
              <div className="flex-1 relative">
                {selectedSite.virtual_tour_url ? (
                  <iframe
                    src={selectedSite.virtual_tour_url}
                    className="w-full h-full"
                    title={`Visite virtuelle - ${selectedSite.name}`}
                    allowFullScreen
                  />
                ) : selectedSite.image_url ? (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <img 
                      src={selectedSite.image_url} 
                      alt={selectedSite.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-lg mb-2">Visite virtuelle bientôt disponible</p>
                    <p className="text-sm text-white/70 text-center max-w-md mb-6">
                      {selectedSite.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-background/10 backdrop-blur border-t border-white/10">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
                      <Info className="h-4 w-4" />
                      Histoire
                    </h3>
                    <p className="text-white/80 text-sm">
                      {selectedSite.historical_info}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => openInMaps(selectedSite)}
                      variant="secondary"
                      className="w-full"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Obtenir l'itinéraire
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {selectedSite.city} • {selectedSite.latitude.toFixed(4)}°N, {selectedSite.longitude.toFixed(4)}°W
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VirtualTour;

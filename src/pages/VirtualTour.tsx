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
            Découvrez le Sénégal
          </h1>
          <p className="text-muted-foreground text-lg">
            Explorez les sites emblématiques et l'histoire culturelle du Sénégal
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedSite(site)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{site.name}</CardTitle>
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
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {site.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openInMaps(site);
                    }}
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Itinéraire
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSite(site);
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedSite && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSite(null)}
          >
            <Card
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {selectedSite.name}
                    </CardTitle>
                    <Badge className={getCategoryColor(selectedSite.category)}>
                      {selectedSite.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSite(null)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Localisation
                    </h3>
                    <p className="text-muted-foreground">{selectedSite.city}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedSite.latitude.toFixed(4)}°N,{" "}
                      {selectedSite.longitude.toFixed(4)}°W
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {selectedSite.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Histoire
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedSite.historical_info}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => openInMaps(selectedSite)}
                      className="flex-1"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Voir sur la carte
                    </Button>
                    {selectedSite.virtual_tour_url && (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          window.open(selectedSite.virtual_tour_url!, "_blank")
                        }
                        className="flex-1"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Visite virtuelle
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default VirtualTour;

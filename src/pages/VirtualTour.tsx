import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MapPin, Info, Navigation, Image as ImageIcon, Box } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface CulturalSite {
  id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  virtual_tour_url: string | null;
  video_url: string | null;
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

  const getCategoryStyle = (category: string) => {
    const styles: Record<string, string> = {
      Monument: "bg-stone-900 text-white",
      Musée: "bg-stone-800 text-white",
      "Site Historique": "bg-stone-700 text-white",
      Plage: "bg-stone-600 text-white",
      Marché: "bg-stone-500 text-white",
      Parc: "bg-stone-400 text-stone-900",
    };
    return styles[category] || "bg-stone-100 text-stone-600 border border-stone-200";
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
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">Sénégal</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">Visite Virtuelle</h1>
              <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-3 mb-3" />
              <p className="text-stone-500 text-base">
                Explorez les sites emblématiques du Sénégal comme si vous y étiez
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="border-stone-300 text-stone-700 hover:bg-stone-100 gap-2 flex-shrink-0">
              <Link to="/museum-3d">
                <Box className="h-4 w-4" />
                Musée 3D
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site) => (
            <div
              key={site.id}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => setSelectedSite(site)}
            >
              <div className="h-48 overflow-hidden bg-stone-100 relative">
                {site.image_url ? (
                  <img
                    src={site.image_url}
                    alt={site.name}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-stone-300" />
                  </div>
                )}
                {/* Category badge overlay */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getCategoryStyle(site.category)}`}>
                    {site.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[15px] text-stone-900 leading-snug">{site.name}</h3>
                </div>
                <p className="flex items-center gap-1 text-xs text-stone-400 mb-3">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  {site.city}
                </p>
                <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-2">{site.description}</p>
                <button
                  className="w-full py-2.5 px-4 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={(e) => { e.stopPropagation(); setSelectedSite(site); }}
                >
                  <ImageIcon className="h-4 w-4" />
                  Visiter Virtuellement
                </button>
              </div>
            </div>
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
                  <Badge className={getCategoryStyle(selectedSite.category)}>
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
                {selectedSite.video_url ? (
                  <div className="w-full h-full bg-black">
                    <iframe
                      src={selectedSite.video_url}
                      className="w-full h-full"
                      title={`Vidéo - ${selectedSite.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : selectedSite.virtual_tour_url ? (
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

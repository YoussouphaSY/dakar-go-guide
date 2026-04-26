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
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  virtual_tour_url: string | null;
  video_url: string | null;
  historical_info: string;
  city: string;
}

const MOCK_SITES: CulturalSite[] = [
  {
    id: "mock-1",
    name: "Monument de la Renaissance Africaine",
    description: "Statue colossale de 49 mètres dominant Dakar, symbole de l'émergence de l'Afrique. Inaugurée en 2010, elle offre une vue panoramique spectaculaire sur l'océan Atlantique.",
    category: "Monument",
    latitude: 14.7254,
    longitude: -17.4929,
    image_url: "https://i.pinimg.com/1200x/a4/7d/8d/a47d8d5b310ee5d72491a0f575b0af3f.jpg",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "Inauguré en 2010 par le président Abdoulaye Wade, ce monument de 49 mètres est l'une des plus grandes statues d'Afrique. Il représente un homme, une femme et un enfant émergeant d'un volcan, symbole de la renaissance du continent africain.",
    city: "Dakar",
  },
  {
    id: "mock-2",
    name: "Île de Gorée",
    description: "Site classé au patrimoine mondial de l'UNESCO, cette île est un lieu de mémoire de la traite négrière et un symbole de réconciliation.",
    category: "Site Historique",
    latitude: 14.6694,
    longitude: -17.3986,
    image_url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "Gorée fut l'un des principaux points de départ de la traite négrière transatlantique du XVe au XIXe siècle. La Maison des Esclaves, construite vers 1776, est le symbole le plus connu de cette période sombre de l'histoire.",
    city: "Dakar",
  },
  {
    id: "mock-3",
    name: "Lac Rose (Retba)",
    description: "Lac aux eaux roses uniques en Afrique grâce à une forte concentration en sel et à des micro-algues. Point d'arrivée historique du Rallye Paris-Dakar.",
    category: "Site Naturel",
    latitude: 14.8333,
    longitude: -17.2333,
    image_url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "Le Lac Rose doit sa couleur caractéristique à la bactérie Dunaliella salina qui produit un pigment rouge-rose en réponse à la forte concentration de sel. Il est classé au patrimoine mondial de l'UNESCO depuis 2011.",
    city: "Dakar",
  },
  {
    id: "mock-4",
    name: "Musée des Civilisations Noires",
    description: "Musée dédié aux cultures et civilisations africaines, inauguré en 2018. Architecture inspirée des cases à impluvium du Cameroun.",
    category: "Musée",
    latitude: 14.6937,
    longitude: -17.4441,
    image_url: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "Inauguré en décembre 2018, le Musée des Civilisations Noires est un projet porté par le Sénégal et la Chine. Il présente l'art et les traditions des peuples d'Afrique subsaharienne et de la diaspora africaine.",
    city: "Dakar",
  },
  {
    id: "mock-5",
    name: "Grande Mosquée de Dakar",
    description: "Imposant édifice religieux au coeur de Dakar, construit en 1964. Ses deux minarets de 67 mètres dominent le paysage urbain.",
    category: "Site Historique",
    latitude: 14.6895,
    longitude: -17.4397,
    image_url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "Inaugurée en 1964 sous la présidence de Léopold Sédar Senghor, la Grande Mosquée de Dakar peut accueillir jusqu'à 7 000 fidèles. Elle a été construite avec l'aide du Maroc et son architecture allie styles africain et maghrébin.",
    city: "Dakar",
  },
  {
    id: "mock-6",
    name: "Plage de la Corniche",
    description: "Promenade en bord de mer avec des vues spectaculaires sur l'Atlantique. Lieu de détente prisé des Dakarois et des visiteurs.",
    category: "Plage",
    latitude: 14.6892,
    longitude: -17.4663,
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    virtual_tour_url: null,
    video_url: null,
    historical_info: "La Corniche de Dakar est un boulevard côtier qui longe l'Atlantique sur plusieurs kilomètres. C'est un lieu de promenade incontournable qui offre des vues magnifiques sur l'océan et les Îles de la Madeleine.",
    city: "Dakar",
  },
];

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
      setSites(data && data.length > 0 ? data : MOCK_SITES);
    } catch (error) {
      console.error("Error loading cultural sites:", error);
      toast.error("Erreur lors du chargement des sites");
      setSites(MOCK_SITES);
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (site: CulturalSite) => {
    if (site.latitude == null || site.longitude == null) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`;
    window.open(url, "_blank");
  };

  const getCategoryStyle = (category: string) => {
    const styles: Record<string, string> = {
      Monument: "bg-stone-900 text-white",
      Musée: "bg-stone-800 text-white",
      "Site Historique": "bg-stone-700 text-white",
      "Site Naturel": "bg-stone-600 text-white",
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
              <div className="flex items-center justify-between p-4 bg-black/40 backdrop-blur">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{selectedSite.name}</h2>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getCategoryStyle(selectedSite.category)}`}>
                    {selectedSite.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  ✕ Fermer
                </button>
              </div>

              <div className="flex-1 relative overflow-hidden">
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
                    <p className="text-sm text-white/70 text-center max-w-md">
                      {selectedSite.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-black/40 backdrop-blur border-t border-white/10">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
                      <Info className="h-4 w-4" />
                      Histoire
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {selectedSite.historical_info}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => openInMaps(selectedSite)}
                      disabled={selectedSite.latitude == null}
                      className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Navigation className="h-4 w-4" />
                      Obtenir l'itinéraire
                    </button>
                    <p className="text-white/60 text-xs text-center">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {selectedSite.city}
                      {selectedSite.latitude != null && selectedSite.longitude != null
                        ? ` · ${selectedSite.latitude.toFixed(4)}°N, ${Math.abs(selectedSite.longitude).toFixed(4)}°W`
                        : ""}
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

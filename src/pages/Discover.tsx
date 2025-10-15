import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Utensils, Bus, Camera, Search, Navigation, Star, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for places
const restaurants = [
  { id: 1, name: "Chez Loutcha", type: "Sénégalais", rating: 4.8, distance: "1.2 km", lat: 14.7167, lng: -17.4677, description: "Meilleur thiéboudienne de Dakar" },
  { id: 2, name: "Le Djembé", type: "Africain Fusion", rating: 4.6, distance: "0.8 km", lat: 14.7200, lng: -17.4650, description: "Cuisine moderne africaine" },
  { id: 3, name: "La Calebasse", type: "Traditionnel", rating: 4.7, distance: "2.1 km", lat: 14.7100, lng: -17.4700, description: "Ambiance authentique sénégalaise" },
  { id: 4, name: "Ocean View", type: "Fruits de mer", rating: 4.9, distance: "3.5 km", lat: 14.7250, lng: -17.4600, description: "Vue panoramique sur l'océan" },
];

const attractions = [
  { id: 1, name: "Monument de la Renaissance", type: "Monument", rating: 4.9, distance: "5.2 km", lat: 14.7156, lng: -17.4494, description: "Statue emblématique de 49m" },
  { id: 2, name: "Île de Gorée", type: "Site historique", rating: 5.0, distance: "4.8 km", lat: 14.6672, lng: -17.3981, description: "Patrimoine UNESCO" },
  { id: 3, name: "Marché Sandaga", type: "Shopping", rating: 4.5, distance: "1.5 km", lat: 14.6740, lng: -17.4464, description: "Marché traditionnel animé" },
  { id: 4, name: "Plage de Ngor", type: "Plage", rating: 4.7, distance: "8.3 km", lat: 14.7503, lng: -17.5145, description: "Plage populaire et surf" },
];

const transports = [
  { id: 1, name: "Station DDD Liberté", type: "Bus", rating: 4.2, distance: "0.5 km", lat: 14.7150, lng: -17.4680, description: "Lignes vers centre-ville" },
  { id: 2, name: "Gare Petersen", type: "Transport", rating: 4.3, distance: "1.8 km", lat: 14.7090, lng: -17.4620, description: "Hub de transport majeur" },
  { id: 3, name: "Station Taxi Plateau", type: "Taxi", rating: 4.0, distance: "2.2 km", lat: 14.6737, lng: -17.4300, description: "Taxis vers tous quartiers" },
];

// Component to handle map updates
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const Discover = () => {
  const [activeTab, setActiveTab] = useState("restaurants");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([14.7167, -17.4677]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "restaurants": return restaurants;
      case "attractions": return attractions;
      case "transport": return transports;
      default: return restaurants;
    }
  };

  const filteredData = getCurrentData().filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (selectedPlace) {
      setMapCenter([selectedPlace.lat, selectedPlace.lng]);
    }
  }, [selectedPlace]);

  const getIcon = () => {
    switch (activeTab) {
      case "restaurants": return <Utensils className="h-5 w-5" />;
      case "attractions": return <Camera className="h-5 w-5" />;
      case "transport": return <Bus className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getMarkerColor = () => {
    switch (activeTab) {
      case "restaurants": return "red";
      case "attractions": return "blue";
      case "transport": return "green";
      default: return "red";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Découvrir Dakar
          </h1>
          <p className="text-muted-foreground">
            Explorez les meilleurs endroits de la ville pendant votre séjour
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Restaurants
            </TabsTrigger>
            <TabsTrigger value="attractions" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Attractions
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              Transport
            </TabsTrigger>
          </TabsList>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un lieu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map Section - OpenStreetMap with Leaflet */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden h-[600px] relative">
                <MapContainer 
                  center={mapCenter} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapUpdater center={mapCenter} />
                  {filteredData.map((place) => (
                    <Marker 
                      key={place.id} 
                      position={[place.lat, place.lng]}
                      eventHandlers={{
                        click: () => setSelectedPlace(place)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{place.name}</h3>
                          <p className="text-sm text-muted-foreground">{place.type}</p>
                          <p className="text-xs mt-1">{place.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                {selectedPlace && (
                  <div className="absolute top-4 left-4 right-4 max-w-sm z-[1000]">
                    <Card className="shadow-2xl border-2" style={{ borderColor: 
                      activeTab === 'restaurants' ? '#EF4444' : 
                      activeTab === 'attractions' ? '#3B82F6' : '#10B981' 
                    }}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getIcon()}
                          {selectedPlace.name}
                        </CardTitle>
                        <Badge variant="secondary">{selectedPlace.type}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3">{selectedPlace.description}</p>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`, '_blank');
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          Y aller
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Card>
            </div>

            {/* Places List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredData.map((place) => (
                <Card 
                  key={place.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlace?.id === place.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedPlace(place);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getIcon()}
                          {place.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-2">
                          {place.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{place.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{place.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Navigation className="h-4 w-4" />
                        {place.distance}
                      </span>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank');
                      }}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Y aller
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Tabs>

        {/* Traffic Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Trafic en Temps Réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Fluide</p>
                  <p className="text-sm text-muted-foreground">Centre-ville</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold">Modéré</p>
                  <p className="text-sm text-muted-foreground">Plateau</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="font-semibold">Dense</p>
                  <p className="text-sm text-muted-foreground">VDN</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discover;

import { useState } from "react";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  // Mock data - à remplacer par des vraies données
  const events = [
    {
      id: 1,
      title: "Finale 100m Hommes",
      sport: "Athlétisme",
      date: "15 Mars 2026",
      time: "18:00",
      location: "Stade Léopold Sédar Senghor",
      category: "Finale",
    },
    {
      id: 2,
      title: "Basketball - Demi-finale",
      sport: "Basketball",
      date: "16 Mars 2026",
      time: "20:00",
      location: "Arena Dakar",
      category: "Demi-finale",
    },
    {
      id: 3,
      title: "Natation - Qualifications",
      sport: "Natation",
      date: "14 Mars 2026",
      time: "10:00",
      location: "Centre Aquatique",
      category: "Qualifications",
    },
    {
      id: 4,
      title: "Football - Match d'ouverture",
      sport: "Football",
      date: "13 Mars 2026",
      time: "16:00",
      location: "Stade Demba Diop",
      category: "Tour préliminaire",
    },
    {
      id: 5,
      title: "Gymnastique Artistique",
      sport: "Gymnastique",
      date: "17 Mars 2026",
      time: "14:00",
      location: "Palais des Sports",
      category: "Finale",
    },
    {
      id: 6,
      title: "Judo - Toutes catégories",
      sport: "Judo",
      date: "18 Mars 2026",
      time: "09:00",
      location: "Dojo National",
      category: "Éliminatoires",
    },
  ];

  const sports = ["all", ...Array.from(new Set(events.map(e => e.sport)))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === "all" || event.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Calendrier des Événements</h1>
          <p className="text-muted-foreground">
            Découvrez le programme complet des Jeux Olympiques de la Jeunesse 2026
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un événement, sport ou lieu..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Tous les sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les sports</SelectItem>
              {sports.slice(1).map(sport => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun événement trouvé avec ces critères
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

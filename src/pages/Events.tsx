import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin, Clock, Play, Trophy, Sparkles } from "lucide-react";
import { joj2026Sports, getCompetitionSports, getMobilisationSports } from "@/data/joj2026Sports";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("competition");
  
  const competitionSports = getCompetitionSports();
  const mobilisationSports = getMobilisationSports();

  const filteredSports = (activeTab === "competition" ? competitionSports : mobilisationSports).filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-10 w-10" />
            <h1 className="text-5xl font-bold">Programme JOJ 2026</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            25 sports en compétition + 10 activités de mobilisation
          </p>
          <p className="text-lg text-white/80 mt-2">
            151 épreuves • Dakar, Diamniadio, Saly
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un sport..."
            className="pl-12 h-14 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-12">
            <TabsTrigger value="competition" className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Compétition <Badge variant="secondary" className="ml-1">25</Badge>
            </TabsTrigger>
            <TabsTrigger value="mobilisation" className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Mobilisation <Badge variant="secondary" className="ml-1">10</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSports.map((sport) => (
                <Card 
                  key={sport.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-t-4 hover:-translate-y-1"
                  style={{ borderTopColor: sport.color }}
                  onClick={() => navigate(`/events/${sport.id}`)}
                >
                  {/* Sport Icon Header */}
                  <div 
                    className="h-32 flex items-center justify-center relative overflow-hidden"
                    style={{ background: sport.gradient }}
                  >
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {sport.emoji}
                    </div>
                    {sport.category === "competition" && sport.videoUrl && (
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{sport.name}</CardTitle>
                      <Badge 
                        variant={sport.category === "competition" ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {sport.category === "competition" ? "Compétition" : "Mobilisation"}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {sport.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{sport.venue}</span>
                    </div>
                    
                    {sport.category === "competition" && sport.events.length > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{sport.events.length} épreuves</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {sport.events.slice(0, 3).map(event => (
                            <Badge key={event.id} variant="outline" className="text-xs">
                              {event.gender}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full mt-4"
                      style={{ background: sport.gradient }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/${sport.id}`);
                      }}
                    >
                      {sport.category === "competition" ? "Voir le calendrier" : "En savoir plus"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSports.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-muted-foreground text-lg">
                  Aucun sport trouvé avec ces critères
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;

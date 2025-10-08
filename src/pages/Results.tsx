import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, TrendingUp, Clock, MapPin } from "lucide-react";

const Results = () => {
  const [activeTab, setActiveTab] = useState("live");

  // Mock data
  const liveResults = [
    {
      id: 1,
      sport: "Athlétisme",
      event: "100m Hommes - Finale",
      status: "En cours",
      participants: [
        { name: "Amadou Diallo", country: "SEN", time: "10.23", position: 1 },
        { name: "Kwame Mensah", country: "GHA", time: "10.45", position: 2 },
        { name: "Ibrahim Sow", country: "MLI", time: "10.52", position: 3 },
      ],
    },
    {
      id: 2,
      sport: "Natation",
      event: "50m Nage Libre - Demi-finale",
      status: "En cours",
      participants: [
        { name: "Fatou Kane", country: "SEN", time: "25.12", position: 1 },
        { name: "Aisha Koné", country: "CIV", time: "25.34", position: 2 },
        { name: "Mariam Traoré", country: "BFA", time: "25.67", position: 3 },
      ],
    },
  ];

  const finishedResults = [
    {
      id: 3,
      sport: "Basketball",
      event: "Match Groupe A",
      status: "Terminé",
      score: "Sénégal 78 - 65 Ghana",
      winner: "Sénégal",
    },
    {
      id: 4,
      sport: "Judo",
      event: "Catégorie -60kg",
      status: "Terminé",
      winner: "Ousmane Diop (SEN)",
      medal: "Or",
    },
  ];

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-secondary text-secondary-foreground";
      case 2:
        return "bg-muted-foreground/20";
      case 3:
        return "bg-accent/20";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Résultats en Temps Réel
          </h1>
          <p className="text-muted-foreground">
            Suivez les performances et résultats des compétitions en direct
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="live">En Direct</TabsTrigger>
            <TabsTrigger value="finished">Terminés</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {liveResults.map((result) => (
                <Card key={result.id} className="border-l-4 border-l-accent overflow-hidden hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="animate-pulse mb-2">
                          🔴 {result.status}
                        </Badge>
                        <CardTitle className="text-xl">{result.event}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{result.sport}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {result.participants.map((participant, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-4 rounded-lg transition-all ${getMedalColor(participant.position)} ${
                            participant.position === 1 ? 'ring-2 ring-secondary' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                              participant.position === 1 ? 'bg-secondary text-secondary-foreground' : 'bg-background'
                            }`}>
                              {participant.position}
                            </div>
                            <div>
                              <p className="font-semibold text-base">{participant.name}</p>
                              <p className="text-sm opacity-80 flex items-center gap-1">
                                <span className="text-lg">{participant.country === 'SEN' ? '🇸🇳' : participant.country === 'GHA' ? '🇬🇭' : '🇲🇱'}</span>
                                {participant.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-2xl">{participant.time}</span>
                            {participant.position <= 3 && (
                              <Medal className="h-6 w-6 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finished" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {finishedResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-all">
                  <CardHeader className="bg-gradient-to-r from-muted/50 to-background">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <Badge variant="outline" className="mb-2">{result.status}</Badge>
                        <CardTitle className="text-xl">{result.event}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{result.sport}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {result.score && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-lg font-semibold text-center">{result.score}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                        <Trophy className="h-6 w-6 text-success flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Vainqueur</p>
                          <p className="font-semibold text-lg">{result.winner}</p>
                        </div>
                        {result.medal && (
                          <Badge className="bg-secondary text-secondary-foreground ml-auto">
                            🏅 {result.medal}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Medal Count Section */}
        <Card className="mt-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tableau des Médailles
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                { country: "Sénégal", flag: "🇸🇳", gold: 12, silver: 8, bronze: 6, total: 26 },
                { country: "Ghana", flag: "🇬🇭", gold: 9, silver: 11, bronze: 7, total: 27 },
                { country: "Côte d'Ivoire", flag: "🇨🇮", gold: 8, silver: 9, bronze: 10, total: 27 },
                { country: "Mali", flag: "🇲🇱", gold: 7, silver: 6, bronze: 8, total: 21 },
              ].map((country, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                    idx === 0 ? 'bg-gradient-to-r from-secondary/20 to-secondary/10 ring-2 ring-secondary/30' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                      idx === 0 ? 'bg-secondary text-secondary-foreground' : 'bg-background'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <span className="font-semibold text-lg">{country.country}</span>
                      <p className="text-sm text-muted-foreground">Total: {country.total} médailles</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🥇</span>
                      <span className="font-bold text-secondary text-lg">{country.gold}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🥈</span>
                      <span className="font-bold text-lg">{country.silver}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">🥉</span>
                      <span className="font-bold text-accent text-lg">{country.bronze}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;

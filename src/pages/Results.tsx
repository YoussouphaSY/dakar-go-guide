import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, TrendingUp } from "lucide-react";

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
            <div className="space-y-6">
              {liveResults.map((result) => (
                <Card key={result.id} className="border-l-4 border-l-accent">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{result.event}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{result.sport}</p>
                      </div>
                      <Badge variant="secondary" className="animate-pulse">
                        🔴 {result.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.participants.map((participant, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-3 rounded-lg ${getMedalColor(participant.position)}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg w-6">{participant.position}</span>
                            <div>
                              <p className="font-semibold">{participant.name}</p>
                              <p className="text-sm opacity-80">{participant.country}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{participant.time}</span>
                            {participant.position <= 3 && (
                              <Medal className="h-5 w-5" />
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
            <div className="space-y-6">
              {finishedResults.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{result.event}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{result.sport}</p>
                      </div>
                      <Badge variant="outline">{result.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.score && (
                        <p className="text-lg font-semibold">{result.score}</p>
                      )}
                      <div className="flex items-center gap-2 text-success">
                        <Trophy className="h-5 w-5" />
                        <span className="font-semibold">Vainqueur: {result.winner}</span>
                        {result.medal && (
                          <Badge className="bg-secondary text-secondary-foreground">
                            {result.medal}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tableau des Médailles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { country: "Sénégal", gold: 12, silver: 8, bronze: 6 },
                { country: "Ghana", gold: 9, silver: 11, bronze: 7 },
                { country: "Côte d'Ivoire", gold: 8, silver: 9, bronze: 10 },
                { country: "Mali", gold: 7, silver: 6, bronze: 8 },
              ].map((country, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg w-6">{idx + 1}</span>
                    <span className="font-semibold">{country.country}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-secondary">{country.gold}</span>
                      <span className="text-xs">🥇</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold">{country.silver}</span>
                      <span className="text-xs">🥈</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-accent">{country.bronze}</span>
                      <span className="text-xs">🥉</span>
                    </span>
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

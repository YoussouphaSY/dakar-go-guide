import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Clock, ChevronRight, Medal, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("live");

  const liveMatches = [
    {
      id: 1,
      sport: "Basketball",
      time: "45:32",
      status: "EN DIRECT",
      home: { name: "Sénégal", flag: "🇸🇳", score: 42 },
      away: { name: "Ghana", flag: "🇬🇭", score: 38 },
    },
    {
      id: 2,
      sport: "Athlétisme",
      time: "Finale",
      status: "EN DIRECT",
      home: { name: "A. Diallo", flag: "🇸🇳", score: "10.23" },
      away: { name: "K. Mensah", flag: "🇬🇭", score: "10.45" },
    },
    {
      id: 3,
      sport: "Football",
      time: "67:15",
      status: "EN DIRECT",
      home: { name: "Côte d'Ivoire", flag: "🇨🇮", score: 2 },
      away: { name: "Mali", flag: "🇲🇱", score: 1 },
    },
  ];

  const finishedMatches = [
    {
      id: 4,
      sport: "Natation",
      time: "Terminé",
      status: "TERMINÉ",
      home: { name: "F. Kane", flag: "🇸🇳", score: "25.12" },
      away: { name: "A. Koné", flag: "🇨🇮", score: "25.34" },
    },
    {
      id: 5,
      sport: "Judo",
      time: "Terminé",
      status: "TERMINÉ",
      home: { name: "Sénégal", flag: "🇸🇳", score: "Victoire" },
      away: { name: "Ghana", flag: "🇬🇭", score: "Défaite" },
    },
  ];

  const upcomingMatches = [
    {
      id: 6,
      sport: "Football",
      time: "15:00",
      status: "PROCHAIN",
      home: { name: "Sénégal", flag: "🇸🇳" },
      away: { name: "Nigeria", flag: "🇳🇬" },
    },
    {
      id: 7,
      sport: "Basketball",
      time: "17:30",
      status: "PROCHAIN",
      home: { name: "Mali", flag: "🇲🇱" },
      away: { name: "Ghana", flag: "🇬🇭" },
    },
  ];

  const MatchCard = ({ match, isLive = false }: any) => (
    <Card 
      className={`group cursor-pointer transition-all hover:shadow-xl ${isLive ? 'border-l-4 border-l-accent' : ''}`}
      onClick={() => navigate(`/match/${match.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant={isLive ? "default" : "secondary"}
            className={isLive ? "bg-accent text-accent-foreground animate-pulse" : ""}
          >
            {isLive && "🔴 "}{match.status}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{match.sport}</span>
            {isLive && (
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-3 w-3" />
                {match.time}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{match.home.flag}</span>
              <span className="font-semibold text-lg">{match.home.name}</span>
            </div>
            {match.home.score !== undefined && (
              <span className="text-2xl font-bold">{match.home.score}</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{match.away.flag}</span>
              <span className="font-semibold text-lg">{match.away.name}</span>
            </div>
            {match.away.score !== undefined && (
              <span className="text-2xl font-bold">{match.away.score}</span>
            )}
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all pointer-events-none"
        >
          Voir détails
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Résultats</h1>
          <p className="text-muted-foreground">
            Suivez tous les résultats en temps réel
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="live" className="relative">
              En Direct
              {liveMatches.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              )}
            </TabsTrigger>
            <TabsTrigger value="finished">Terminés</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} isLive={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finished" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {finishedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Medal Standings */}
        <Card className="mt-12 overflow-hidden border-0 shadow-xl">
          <div className="bg-gradient-card p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Classement des Médailles
            </h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-3">
              {[
                { rank: 1, country: "Sénégal", flag: "🇸🇳", gold: 12, silver: 8, bronze: 6, total: 26 },
                { rank: 2, country: "Ghana", flag: "🇬🇭", gold: 9, silver: 11, bronze: 7, total: 27 },
                { rank: 3, country: "Côte d'Ivoire", flag: "🇨🇮", gold: 8, silver: 9, bronze: 10, total: 27 },
                { rank: 4, country: "Mali", flag: "🇲🇱", gold: 7, silver: 6, bronze: 8, total: 21 },
              ].map((country) => (
                <div 
                  key={country.rank}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.01] ${
                    country.rank === 1 
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary/5 border-2 border-secondary/30' 
                      : 'bg-card hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                      country.rank === 1 ? 'bg-secondary text-secondary-foreground' : 'bg-muted'
                    }`}>
                      {country.rank}
                    </div>
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <span className="font-semibold text-lg">{country.country}</span>
                      <p className="text-sm text-muted-foreground">{country.total} médailles</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="text-center">
                      <Trophy className="h-6 w-6 mx-auto mb-1 text-secondary" />
                      <div className="font-bold text-lg">{country.gold}</div>
                    </div>
                    <div className="text-center">
                      <Award className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                      <div className="font-bold text-lg">{country.silver}</div>
                    </div>
                    <div className="text-center">
                      <Medal className="h-6 w-6 mx-auto mb-1 text-bronze" />
                      <div className="font-bold text-lg">{country.bronze}</div>
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

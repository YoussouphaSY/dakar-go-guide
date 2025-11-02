import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, Users, Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - à remplacer par de vraies données
  const match = {
    id: Number(id),
    sport: "Basketball",
    status: "EN DIRECT",
    time: "45:32",
    quarter: "3ème quart-temps",
    location: "Dakar Arena",
    home: {
      name: "Sénégal",
      flag: "🇸🇳",
      score: 42,
      stats: {
        fieldGoals: "18/35 (51%)",
        threePoints: "6/15 (40%)",
        freeThrows: "12/16 (75%)",
        rebounds: 28,
        assists: 14,
      },
      players: [
        { name: "Amadou Diallo", points: 18, rebounds: 7, assists: 3 },
        { name: "Moussa Sow", points: 12, rebounds: 4, assists: 6 },
        { name: "Ibrahima Fall", points: 8, rebounds: 9, assists: 2 },
      ],
    },
    away: {
      name: "Ghana",
      flag: "🇬🇭",
      score: 38,
      stats: {
        fieldGoals: "16/38 (42%)",
        threePoints: "4/18 (22%)",
        freeThrows: "10/12 (83%)",
        rebounds: 24,
        assists: 11,
      },
      players: [
        { name: "Kwame Mensah", points: 15, rebounds: 5, assists: 4 },
        { name: "Kofi Osei", points: 11, rebounds: 6, assists: 3 },
        { name: "David Agyeman", points: 9, rebounds: 8, assists: 2 },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/results")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux résultats
        </Button>

        {/* Match Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="bg-gradient-live p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default" className="bg-accent text-accent-foreground animate-pulse">
                  🔴 {match.status}
                </Badge>
                <div className="flex items-center gap-">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">{match.time}</span>
                  </div>
                  <span className="text-sm opacity-80">{match.quarter}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-cente">
                {/* Home Team */}
                <div className="text-center">
                  <div className="text-6xl mb-3">{match.home.flag}</div>
                  <h2 className="text-2xl font-bold mb-1">{match.home.name}</h2>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="text-6xl font-bold flex items-center justify-center gap-4">
                    <span>{match.home.score}</span>
                    <span className="text-3xl opacity-60">-</span>
                    <span>{match.away.score}</span>
                  </div>
                </div>

                {/* Away Team */}
                <div className="text-center">
                  <div className="text-6xl mb-3">{match.away.flag}</div>
                  <h2 className="text-2xl font-bold mb-1">{match.away.name}</h2>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{match.location}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Statistiques d'équipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center pb-3 border-b">
                    <div className="font-semibold">{match.home.name}</div>
                    <div className="text-sm text-muted-foreground">Statistique</div>
                    <div className="font-semibold">{match.away.name}</div>
                  </div>

                  {Object.entries(match.home.stats).map(([key, homeValue], idx) => {
                    const awayValue = match.away.stats[key as keyof typeof match.away.stats];
                    return (
                      <div key={key} className="grid grid-cols-3 gap-2 text-center">
                        <div className="font-mono">{homeValue}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="font-mono">{awayValue}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Players */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Meilleurs joueurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-2xl">{match.home.flag}</span>
                      {match.home.name}
                    </h4>
                    <div className="space-y-2">
                      {match.home.players.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="font-medium">{player.name}</span>
                          <div className="flex gap-4 text-sm">
                            <span><strong>{player.points}</strong> pts</span>
                            <span><strong>{player.rebounds}</strong> reb</span>
                            <span><strong>{player.assists}</strong> ast</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-2xl">{match.away.flag}</span>
                      {match.away.name}
                    </h4>
                    <div className="space-y-2">
                      {match.away.players.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="font-medium">{player.name}</span>
                          <div className="flex gap-4 text-sm">
                            <span><strong>{player.points}</strong> pts</span>
                            <span><strong>{player.rebounds}</strong> reb</span>
                            <span><strong>{player.assists}</strong> ast</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;

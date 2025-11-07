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
  const matchId = Number(id);

  // Mock data basé sur l'ID du match
  const getMatchData = (matchId: number) => {
    const matches: Record<number, any> = {
      1: {
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
      },
      2: {
        sport: "Athlétisme",
        status: "EN DIRECT",
        time: "Finale",
        quarter: "100m Hommes",
        location: "Stade Léopold Sédar Senghor",
        home: {
          name: "A. Diallo",
          flag: "🇸🇳",
          score: "10.23",
          stats: {},
          players: [],
        },
        away: {
          name: "K. Mensah",
          flag: "🇬🇭",
          score: "10.45",
          stats: {},
          players: [],
        },
      },
      3: {
        sport: "Football",
        status: "EN DIRECT",
        time: "67:15",
        quarter: "2ème mi-temps",
        location: "Stade Demba Diop",
        home: {
          name: "Côte d'Ivoire",
          flag: "🇨🇮",
          score: 2,
          stats: {
            possession: "58%",
            shots: "12",
            shotsOnTarget: "6",
            corners: "5",
            fouls: "8",
          },
          players: [
            { name: "Y. Koné", points: 1, rebounds: 0, assists: 2 },
            { name: "S. Traoré", points: 1, rebounds: 0, assists: 1 },
          ],
        },
        away: {
          name: "Mali",
          flag: "🇲🇱",
          score: 1,
          stats: {
            possession: "42%",
            shots: "8",
            shotsOnTarget: "4",
            corners: "3",
            fouls: "11",
          },
          players: [
            { name: "M. Diarra", points: 1, rebounds: 0, assists: 0 },
          ],
        },
      },
      4: {
        sport: "Natation",
        status: "TERMINÉ",
        time: "Terminé",
        quarter: "50m Nage Libre",
        location: "Centre Aquatique Olympique",
        home: {
          name: "F. Kane",
          flag: "🇸🇳",
          score: "25.12",
          stats: {},
          players: [],
        },
        away: {
          name: "A. Koné",
          flag: "🇨🇮",
          score: "25.34",
          stats: {},
          players: [],
        },
      },
      5: {
        sport: "Judo",
        status: "TERMINÉ",
        time: "Terminé",
        quarter: "-73kg Hommes",
        location: "Arena Dakar",
        home: {
          name: "Sénégal",
          flag: "🇸🇳",
          score: "Victoire",
          stats: {},
          players: [],
        },
        away: {
          name: "Ghana",
          flag: "🇬🇭",
          score: "Défaite",
          stats: {},
          players: [],
        },
      },
    };
    
    return matches[matchId] || matches[1];
  };

  const match = getMatchData(matchId);

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
            <div className="bg-success text-success-foreground p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <Badge variant="default" className="bg-accent text-accent-foreground animate-pulse">
                  🔴 {match.status}
                </Badge>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">{match.time}</span>
                  </div>
                  <span className="text-sm opacity-90">{match.quarter}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                {/* Home Team */}
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl mb-2 sm:mb-3">{match.home.flag}</div>
                  <h2 className="text-xl sm:text-2xl font-bold">{match.home.name}</h2>
                </div>

                {/* Score */}
                <div className="text-center order-first sm:order-none">
                  <div className="text-5xl sm:text-6xl font-bold flex items-center justify-center gap-3 sm:gap-4">
                    <span>{match.home.score}</span>
                    <span className="text-2xl sm:text-3xl opacity-70">-</span>
                    <span>{match.away.score}</span>
                  </div>
                </div>

                {/* Away Team */}
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl mb-2 sm:mb-3">{match.away.flag}</div>
                  <h2 className="text-xl sm:text-2xl font-bold">{match.away.name}</h2>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm sm:text-base">{match.location}</span>
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
                <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Statistiques d'équipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center pb-3 border-b">
                    <div className="font-semibold text-xs sm:text-base truncate">{match.home.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Statistique</div>
                    <div className="font-semibold text-xs sm:text-base truncate">{match.away.name}</div>
                  </div>

                  {Object.entries(match.home.stats).map(([key, homeValue]) => {
                    const awayValue = match.away.stats[key as keyof typeof match.away.stats];
                    return (
                      <div key={key} className="grid grid-cols-3 gap-2 text-center items-center">
                        <div className="font-mono text-xs sm:text-base">{String(homeValue)}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="font-mono text-xs sm:text-base">{String(awayValue)}</div>
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
                <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  Meilleurs joueurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-xl sm:text-2xl">{match.home.flag}</span>
                      {match.home.name}
                    </h4>
                    <div className="space-y-2">
                      {match.home.players.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 p-3 bg-muted rounded-lg"
                        >
                          <span className="font-medium text-sm sm:text-base">{player.name}</span>
                          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
                            <span><strong>{player.points}</strong> pts</span>
                            <span><strong>{player.rebounds}</strong> reb</span>
                            <span><strong>{player.assists}</strong> ast</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-xl sm:text-2xl">{match.away.flag}</span>
                      {match.away.name}
                    </h4>
                    <div className="space-y-2">
                      {match.away.players.map((player, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 p-3 bg-muted rounded-lg"
                        >
                          <span className="font-medium text-sm sm:text-base">{player.name}</span>
                          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
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

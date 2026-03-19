// import { useParams, useNavigate } from "react-router-dom";
// import Header from "@/components/Header";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MapPin, Clock, ArrowLeft, Trophy } from "lucide-react";
// import { useEffect, useState } from "react";

// const BASE_URL = process.env.NODE_ENV === "production"
//   ? "https://backend-dakar-go26.onrender.com"
//   : "http://localhost:5000";

// const MATCHES_URL = `${BASE_URL}/api/matches`;


// const MatchDetail = () => {
//   const { id } = useParams(); // Récupère l'ID du match depuis l'URL
//   const navigate = useNavigate();
//   const [match, setMatch] = useState(null);

//   // Fonction pour récupérer les détails du match
//   const fetchMatchDetail = async () => {
//     try {
//       const response = await fetch(`${MATCH_DETAIL_URL}/${id}`);
//       const data = await response.json();
//       setMatch(data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des détails du match :", error);
//     }
//   };

//   useEffect(() => {
//     fetchMatchDetail();
//   }, [id]);

//   if (!match) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container py-16 text-center">
//           <h1 className="text-4xl font-bold mb-4">Match introuvable</h1>
//           <p className="text-muted-foreground mb-4">
//             Le match que vous recherchez n'existe pas ou l'ID est incorrect.
//           </p>
//           <Button onClick={() => navigate('/results')}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Retour aux résultats
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const isScheduled = match.status === "SCHEDULED";

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="container py-12">
//         <Button 
//           variant="outline" 
//           className="mb-8"
//           onClick={() => navigate('/results')}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Retour aux résultats
//         </Button>

//         {/* Match Details */}
//         <Card className="shadow-lg">
//           <CardHeader className="bg-muted/10 p-6">
//             <CardTitle className="text-2xl font-bold text-center">
//               {match.homeTeam.name} vs {match.awayTeam.name}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6 p-6">
//             {/* Teams and Score */}
//             <div className="flex items-center justify-between">
//               <div className="text-center">
//                 <img
//                   src={match.homeTeam.crest || "/default-logo.png"}
//                   alt={`Logo de ${match.homeTeam.name}`}
//                   className="w-20 h-20 mx-auto"
//                 />
//                 <p className="font-semibold">{match.homeTeam.name}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-muted-foreground">{match.status}</p>
//                 <p className="text-5xl font-bold">
//                   {match.score.fullTime.home ?? "-"} - {match.score.fullTime.away ?? "-"}
//                 </p>
//               </div>
//               <div className="text-center">
//                 <img
//                   src={match.awayTeam.crest || "/default-logo.png"}
//                   alt={`Logo de ${match.awayTeam.name}`}
//                   className="w-20 h-20 mx-auto"
//                 />
//                 <p className="font-semibold">{match.awayTeam.name}</p>
//               </div>
//             </div>

//             {/* Match Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
//               <div className="flex items-center gap-2">
//                 <MapPin className="h-5 w-5 text-muted-foreground" />
//                 <p>{match.venue || "Lieu non spécifié"}</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock className="h-5 w-5 text-muted-foreground" />
//                 <p>
//                   {new Date(match.utcDate).toLocaleDateString("fr-FR", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}{" "}
//                   à {new Date(match.utcDate).toLocaleTimeString("fr-FR", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>
//               {match.referees && match.referees.length > 0 && (
//                 <div className="flex items-center gap-2">
//                   <Trophy className="h-5 w-5 text-muted-foreground" />
//                   <p>Arbitres : {match.referees.map((ref) => ref.name).join(", ")}</p>
//                 </div>
//               )}
//             </div>

//             {/* Statistics */}
//             {!isScheduled && (
//               <div>
//                 <h3 className="text-lg font-bold mb-4">Statistiques</h3>
//                 <div className="space-y-4">
//                   {/* Possession */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Possession</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">55%</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-primary"
//                           style={{ width: `55%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">45%</p>
//                     </div>
//                   </div>

//                   {/* Tirs */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Tirs</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">12</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-secondary"
//                           style={{ width: `60%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">8</p>
//                     </div>
//                   </div>

//                   {/* Tirs cadrés */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Tirs cadrés</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">7</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-secondary"
//                           style={{ width: `70%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">5</p>
//                     </div>
//                   </div>

//                   {/* Corners */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Corners</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">6</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-accent"
//                           style={{ width: `75%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">2</p>
//                     </div>
//                   </div>

//                   {/* Fautes */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Fautes</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">10</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-danger"
//                           style={{ width: `50%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">10</p>
//                     </div>
//                   </div>

//                   {/* Cartons jaunes */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Cartons jaunes</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">3</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-warning"
//                           style={{ width: `60%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">2</p>
//                     </div>
//                   </div>

//                   {/* Cartons rouges */}
//                   <div>
//                     <p className="text-sm text-muted-foreground">Cartons rouges</p>
//                     <div className="flex items-center gap-2">
//                       <p className="font-bold">1</p>
//                       <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
//                         <div
//                           className="h-full bg-danger"
//                           style={{ width: `33%` }}
//                         ></div>
//                       </div>
//                       <p className="font-bold">2</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isScheduled && (
//               <div className="text-center text-muted-foreground">
//                 <p>Les statistiques seront disponibles une fois le match commencé.</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default MatchDetail;

import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowLeft, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

// Définir l'URL de base selon l'environnement
const BASE_URL = import.meta.env.PROD
  ? "https://backend-dakar-go26.onrender.com"
  : "http://localhost:5000";

// URL pour récupérer les détails d'un match
const MATCH_DETAIL_URL = `${BASE_URL}/api/matches`;

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulation de données détaillées par ID/Sport
  const getMockMatchDetail = (matchId: string) => {
    const idNum = parseInt(matchId);

    // On détermine le sport approximativement selon la plage d'ID
    let sport = "Sport Olympique";
    if (idNum >= 1000 && idNum < 1010) sport = "Athlétisme";
    else if (idNum >= 1010 && idNum < 1020) sport = "Natation";
    else if (idNum >= 1020 && idNum < 1030) sport = "Football";
    else if (idNum >= 1030 && idNum < 1040) sport = "Basket-ball 3x3";
    else if (idNum >= 1040 && idNum < 1050) sport = "Breaking";

    let scoreProps: any = {};
    let statsData: any = {};
    let eventsData: any[] = [];
    let homeTeamName = idNum % 2 === 0 ? "Sénégal" : "France";
    let awayTeamName = idNum % 2 === 0 ? "Maroc" : "États-Unis";

    if (sport === "Football") {
      scoreProps = { fullTime: { home: 2, away: 1 } };
      statsData = { possession: { home: 55, away: 45 }, shots: { home: 12, away: 8 }, shotsOnTarget: { home: 7, away: 5 }, corners: { home: 6, away: 2 }, fouls: { home: 10, away: 12 } };
      eventsData = [{ time: "12'", type: "goal", player: "P. Sarr", team: "home" }, { time: "34'", type: "yellow-card", player: "M. Diallo", team: "away" }, { time: "78'", type: "goal", player: "L. Messi", team: "away" }];
    } else if (sport === "Basket-ball 3x3") {
      scoreProps = { fullTime: { home: 21, away: 18 } };
      statsData = { rebonds: { home: 15, away: 12 }, passes: { home: 8, away: 5 }, lancers_francs: { home: '4/5', away: '2/3' }, deux_points: { home: '5/10', away: '3/8' }, fautes: { home: 5, away: 6 } };
      eventsData = [{ time: "01:20", type: "score", player: "A. Gomis (2pts)", team: "home" }, { time: "05:40", type: "foul", player: "Team Foul", team: "away" }, { time: "09:55", type: "score", player: "J. Smith (Game Winner)", team: "home" }];
    } else if (sport === "Breaking") {
      scoreProps = { fullTime: { home: 3, away: 0 } };
      statsData = { musicality: { home: 8.5, away: 7.0 }, technique: { home: 9.0, away: 8.2 }, originality: { home: 8.8, away: 8.0 }, execution: { home: 9.2, away: 8.5 } };
      eventsData = [{ time: "Round 1", type: "round", player: "Victoire unanime", team: "home" }, { time: "Round 2", type: "round", player: "Victoire 2-1", team: "home" }, { time: "Round 3", type: "round", player: "Victoire 3-0", team: "home" }];
    } else if (sport === "Athlétisme" || sport === "Natation") {
      homeTeamName = "A. Ndoye (SEN)";
      awayTeamName = "J. Doe (USA)";
      scoreProps = { fullTime: { home: "1er", away: "2e" } };
      statsData = { temps: { home: "9.85s", away: "9.92s" }, vitesse_max: { home: "42.5 km/h", away: "41.8 km/h" }, reaction: { home: "0.145s", away: "0.150s" } };
      eventsData = [{ time: "Départ", type: "start", player: "Bon départ", team: "home" }, { time: "Mi-course", type: "info", player: "Accélération", team: "away" }, { time: "Arrivée", type: "finish", player: "Record National !", team: "home" }];
    } else {
      scoreProps = { fullTime: { home: 2, away: 1 } };
      statsData = { points: { home: 20, away: 15 }, attaques: { home: 12, away: 10 }, defenses: { home: 8, away: 5 } };
      eventsData = [{ time: "Début", type: "info", player: "Début du match", team: "home" }, { time: "Fin", type: "info", player: "Victoire de l'équipe", team: "home" }];
    }

    return {
      id: idNum,
      sport_name: sport,
      status: idNum % 3 === 0 ? "FINISHED" : idNum % 3 === 1 ? "IN_PLAY" : "SCHEDULED",
      utcDate: new Date().toISOString(),
      venue: sport === "Natation" ? "Piscine Olympique de Dakar" : "Dakar Arena",
      homeTeam: {
        name: homeTeamName,
        crest: "/assets/ayo-mascot-official.jpg"
      },
      awayTeam: {
        name: awayTeamName,
        crest: "/assets/dakar2026-logo.png"
      },
      score: scoreProps,
      stats: statsData,
      events: eventsData,
      referees: [{ name: "B. Gassama" }, { name: "Mustapha" }]
    };
  };

  useEffect(() => {
    const fetchMatchDetail = async () => {
      setLoading(true);
      // Simulation pour les IDs de test (1001, 1002, etc.)
      if (id && id.startsWith("100")) {
        setTimeout(() => {
          setMatch(getMockMatchDetail(id));
          setLoading(false);
        }, 500); // Petit délai pour simuler le réseau
        return;
      }

      try {
        const response = await fetch(`${MATCH_DETAIL_URL}/${id}`);
        if (!response.ok) throw new Error(`Erreur API: ${response.statusText}`);
        const data = await response.json();
        setMatch(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du match :", error);
        setMatch(null);
      } finally {
        setLoading(true); // Devrait être false, mais match null géré
        setLoading(false);
      }
    };

    fetchMatchDetail();
  }, [id]);

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Match introuvable</h1>
          <p className="text-muted-foreground mb-4">
            Le match que vous recherchez n'existe pas ou l'ID est incorrect.
          </p>
          <Button onClick={() => navigate("/results")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux résultats
          </Button>
        </div>
      </div>
    );
  }

  const isScheduled = match.status === "SCHEDULED";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-12">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/results")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux résultats
        </Button>

        {/* Match Details */}
        <Card className="shadow-lg">
          <CardHeader className="bg-muted/10 p-6">
            <CardTitle className="text-2xl font-bold text-center">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Teams and Score */}
            <div className="flex items-center justify-between">
              <div className="text-center">
                <img
                  src={match.homeTeam.crest || "/default-logo.png"}
                  alt={`Logo de ${match.homeTeam.name}`}
                  className="w-20 h-20 mx-auto"
                />
                <p className="font-semibold">{match.homeTeam.name}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{match.status}</p>
                <p className="text-5xl font-bold">
                  {match.score.fullTime.home ?? "-"} - {match.score.fullTime.away ?? "-"}
                </p>
              </div>
              <div className="text-center">
                <img
                  src={match.awayTeam.crest || "/default-logo.png"}
                  alt={`Logo de ${match.awayTeam.name}`}
                  className="w-20 h-20 mx-auto"
                />
                <p className="font-semibold">{match.awayTeam.name}</p>
              </div>
            </div>

            {/* Match Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p>{match.venue || "Lieu non spécifié"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p>
                  {new Date(match.utcDate).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  à {new Date(match.utcDate).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {match.referees && match.referees.length > 0 && (
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-muted-foreground" />
                  <p>Arbitres : {match.referees.map((ref) => ref.name).join(", ")}</p>
                </div>
              )}
            </div>

            {!isScheduled && (
              <div>
                <h3 className="text-lg font-bold mb-4">Statistiques</h3>
                <div className="space-y-4">
                  {match.sport_name === "Football" && (
                    <>
                      {/* Possession */}
                      <div>
                        <p className="text-sm text-muted-foreground">Possession</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{match.stats?.possession.home || 50}%</p>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${match.stats?.possession.home || 50}%` }}
                            ></div>
                          </div>
                          <p className="font-bold">{match.stats?.possession.away || 50}%</p>
                        </div>
                      </div>

                      {/* Tirs */}
                      <div>
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Tirs</span>
                          <span>Total: {(match.stats?.shots.home || 0) + (match.stats?.shots.away || 0)}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{match.stats?.shots.home || 0}</p>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-secondary"
                              style={{ width: `${((match.stats?.shots.home || 1) / ((match.stats?.shots.home || 0) + (match.stats?.shots.away || 1))) * 100}%` }}
                            ></div>
                          </div>
                          <p className="font-bold">{match.stats?.shots.away || 0}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {match.sport_name === "Basket-ball 3x3" && (
                    <>
                      {/* Rebonds */}
                      <div>
                        <p className="text-sm text-muted-foreground flex justify-between">
                          <span>Rebonds</span>
                          <span>Total: {(match.stats?.rebonds.home || 0) + (match.stats?.rebonds.away || 0)}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{match.stats?.rebonds.home || 0}</p>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500"
                              style={{ width: `${((match.stats?.rebonds.home || 1) / ((match.stats?.rebonds.home || 0) + (match.stats?.rebonds.away || 1))) * 100}%` }}
                            ></div>
                          </div>
                          <p className="font-bold">{match.stats?.rebonds.away || 0}</p>
                        </div>
                      </div>

                      {/* 2 points (équivalent aux 3 points du 5x5) */}
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="font-bold text-center w-1/3">{match.stats?.deux_points?.home}</span>
                        <span className="text-sm text-muted-foreground text-center w-1/3">Tirs à 2 pts</span>
                        <span className="font-bold text-center w-1/3">{match.stats?.deux_points?.away}</span>
                      </div>
                    </>
                  )}

                  {match.sport_name === "Breaking" && (
                    <>
                      {['musicality', 'technique', 'originality', 'execution'].map((statKey) => {
                        const labels: Record<string, string> = { musicality: "Musicalité", technique: "Technique", originality: "Originalité", execution: "Exécution" };
                        return (
                          <div key={statKey}>
                            <p className="text-sm text-muted-foreground">{labels[statKey]}</p>
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-bold text-primary w-8 text-right">{match.stats?.[statKey]?.home}</span>
                              <div className="flex-1 flex gap-1 h-2">
                                <div className="h-full bg-primary rounded-l-full" style={{ width: `${match.stats?.[statKey]?.home * 10}%` }}></div>
                                <div className="h-full bg-secondary rounded-r-full" style={{ width: `${match.stats?.[statKey]?.away * 10}%` }}></div>
                              </div>
                              <span className="font-bold text-secondary w-8">{match.stats?.[statKey]?.away}</span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}

                  {(match.sport_name === "Athlétisme" || match.sport_name === "Natation") && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      {Object.keys(match.stats || {}).map((key) => {
                        const labels: Record<string, string> = { temps: "Temps", vitesse_max: "Vitesse Max", reaction: "Temps de réaction" };
                        return (
                          <div key={key} className="flex justify-between py-2 border-b last:border-0 border-border/50">
                            <span className="font-semibold">{match.stats[key].home}</span>
                            <span className="text-sm text-muted-foreground">{labels[key] || key}</span>
                            <span className="font-semibold text-right">{match.stats[key].away}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!["Football", "Basket-ball 3x3", "Breaking", "Athlétisme", "Natation"].includes(match.sport_name) && (
                    <div className="text-center py-4 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Statistiques détaillées génériques</p>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                        <div>
                          <p className="font-bold text-lg">{match.stats?.points?.home || match.stats?.attaques?.home}</p>
                          <p className="text-xs text-muted-foreground">Atouts (H)</p>
                        </div>
                        <div className="flex items-center justify-center font-bold text-muted-foreground">
                          VS
                        </div>
                        <div>
                          <p className="font-bold text-lg">{match.stats?.points?.away || match.stats?.attaques?.away}</p>
                          <p className="text-xs text-muted-foreground">Atouts (A)</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Événements du match (Timeline) */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">{match.sport_name === "Breaking" ? "Déroulement des rounds" : "Faits marquants"}</h3>
                  <div className="space-y-4">
                    {match.events?.map((event: any, index: number) => {
                      // Obtenir le bon libellé selon le type
                      let displayType = "Point";
                      if (event.type === 'goal') displayType = "⚽ But !";
                      else if (event.type === 'yellow-card') displayType = "🟨 Carton Jaune";
                      else if (event.type === 'score') displayType = "🏀 Panier";
                      else if (event.type === 'round') displayType = "💿 Round";
                      else if (event.type === 'start') displayType = "🏁 Départ";
                      else if (event.type === 'finish') displayType = "🏆 Arrivée";
                      else if (event.type === 'info') displayType = "ℹ️ Info";

                      return (
                        <div key={index} className={`flex items-center gap-3 ${event.team === 'away' ? 'flex-row-reverse text-right' : ''}`}>
                          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-xs font-bold shrink-0">
                            {event.time}
                          </div>
                          <div className="flex-1 bg-muted/20 p-2 rounded-lg">
                            <p className="text-sm font-semibold text-primary">{displayType}</p>
                            <p className="text-sm font-medium">{event.player}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isScheduled && (
              <div className="text-center text-muted-foreground">
                <p>Les statistiques seront disponibles une fois le match commencé.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchDetail;

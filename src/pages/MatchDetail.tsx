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
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-dakar-go26.onrender.com"
    : "http://localhost:5000";

// URL pour récupérer les détails d'un match
const MATCH_DETAIL_URL = `${BASE_URL}/api/matches`;

const MatchDetail = () => {
  const { id } = useParams(); // Récupère l'ID du match depuis l'URL
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);

  // Fonction pour récupérer les détails du match
  const fetchMatchDetail = async () => {
    try {
      const response = await fetch(`${MATCH_DETAIL_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.statusText}`);
      }
      const data = await response.json();
      setMatch(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du match :", error);
      setMatch(null);
    }
  };

  useEffect(() => {
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
                  {/* Possession */}
                  <div>
                    <p className="text-sm text-muted-foreground">Possession</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">55%</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `55%` }}
                        ></div>
                      </div>
                      <p className="font-bold">45%</p>
                    </div>
                  </div>

                  {/* Tirs */}
                  <div>
                    <p className="text-sm text-muted-foreground">Tirs</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">12</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `60%` }}
                        ></div>
                      </div>
                      <p className="font-bold">8</p>
                    </div>
                  </div>

                  {/* Tirs cadrés */}
                  <div>
                    <p className="text-sm text-muted-foreground">Tirs cadrés</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">7</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `70%` }}
                        ></div>
                      </div>
                      <p className="font-bold">5</p>
                    </div>
                  </div>

                  {/* Corners */}
                  <div>
                    <p className="text-sm text-muted-foreground">Corners</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">6</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `75%` }}
                        ></div>
                      </div>
                      <p className="font-bold">2</p>
                    </div>
                  </div>

                  {/* Fautes */}
                  <div>
                    <p className="text-sm text-muted-foreground">Fautes</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">10</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-danger"
                          style={{ width: `50%` }}
                        ></div>
                      </div>
                      <p className="font-bold">10</p>
                    </div>
                  </div>

                  {/* Cartons jaunes */}
                  <div>
                    <p className="text-sm text-muted-foreground">Cartons jaunes</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">3</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-warning"
                          style={{ width: `60%` }}
                        ></div>
                      </div>
                      <p className="font-bold">2</p>
                    </div>
                  </div>

                  {/* Cartons rouges */}
                  <div>
                    <p className="text-sm text-muted-foreground">Cartons rouges</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">1</p>
                      <div className="flex-1 h-4 bg-muted/30 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-danger"
                          style={{ width: `33%` }}
                        ></div>
                      </div>
                      <p className="font-bold">2</p>
                    </div>
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

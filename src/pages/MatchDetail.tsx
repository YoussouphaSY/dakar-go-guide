 
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
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
        <div className="bg-white rounded-xl border border-stone-200 shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 bg-stone-50/60">
            <p className="text-center text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">{match.sport_name}</p>
            <h2 className="text-xl font-bold text-center text-stone-900">
              {match.homeTeam.name} <span className="text-stone-300 font-light mx-1">vs</span> {match.awayTeam.name}
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Teams and Score */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-center flex-1">
                <img
                  src={match.homeTeam.crest || "/default-logo.png"}
                  alt={`Logo de ${match.homeTeam.name}`}
                  className="w-16 h-16 mx-auto rounded-lg object-contain"
                />
                <p className="font-semibold text-sm text-stone-800 mt-2">{match.homeTeam.name}</p>
              </div>
              <div className="text-center px-4">
                <p className="text-xs font-medium text-stone-400 mb-1 uppercase tracking-wide">{match.status}</p>
                <p className="text-5xl font-bold text-stone-900 tabular-nums">
                  {match.score.fullTime.home ?? "–"} <span className="text-stone-300 font-light">–</span> {match.score.fullTime.away ?? "–"}
                </p>
              </div>
              <div className="text-center flex-1">
                <img
                  src={match.awayTeam.crest || "/default-logo.png"}
                  alt={`Logo de ${match.awayTeam.name}`}
                  className="w-16 h-16 mx-auto rounded-lg object-contain"
                />
                <p className="font-semibold text-sm text-stone-800 mt-2">{match.awayTeam.name}</p>
              </div>
            </div>

            {/* Match Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <MapPin className="h-4 w-4 text-stone-400 flex-shrink-0" />
                <span>{match.venue || "Lieu non spécifié"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <Clock className="h-4 w-4 text-stone-400 flex-shrink-0" />
                <span>
                  {new Date(match.utcDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  {" "}à {new Date(match.utcDate).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {match.referees && match.referees.length > 0 && (
                <div className="flex items-center gap-2.5 text-sm text-stone-600">
                  <Trophy className="h-4 w-4 text-stone-400 flex-shrink-0" />
                  <span>Arbitres : {match.referees.map((ref) => ref.name).join(", ")}</span>
                </div>
              )}
            </div>

            {!isScheduled && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="pt-2 border-t border-stone-100">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-widest mb-4">Statistiques</h3>
                  <div className="space-y-3">
                    {match.sport_name === "Football" && (
                      <>
                        <div>
                          <div className="flex justify-between text-xs text-stone-500 mb-1.5">
                            <span className="font-semibold text-stone-700">{match.stats?.possession.home || 50}%</span>
                            <span>Possession</span>
                            <span className="font-semibold text-stone-700">{match.stats?.possession.away || 50}%</span>
                          </div>
                          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full bg-stone-800 rounded-full" style={{ width: `${match.stats?.possession.home || 50}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-stone-500 mb-1.5">
                            <span className="font-semibold text-stone-700">{match.stats?.shots.home || 0}</span>
                            <span>Tirs — Total: {(match.stats?.shots.home || 0) + (match.stats?.shots.away || 0)}</span>
                            <span className="font-semibold text-stone-700">{match.stats?.shots.away || 0}</span>
                          </div>
                          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-stone-800 rounded-full"
                              style={{ width: `${((match.stats?.shots.home || 1) / ((match.stats?.shots.home || 0) + (match.stats?.shots.away || 1))) * 100}%` }}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {match.sport_name === "Basket-ball 3x3" && (
                      <>
                        <div>
                          <div className="flex justify-between text-xs text-stone-500 mb-1.5">
                            <span className="font-semibold text-stone-700">{match.stats?.rebonds.home || 0}</span>
                            <span>Rebonds — Total: {(match.stats?.rebonds.home || 0) + (match.stats?.rebonds.away || 0)}</span>
                            <span className="font-semibold text-stone-700">{match.stats?.rebonds.away || 0}</span>
                          </div>
                          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-stone-800 rounded-full"
                              style={{ width: `${((match.stats?.rebonds.home || 1) / ((match.stats?.rebonds.home || 0) + (match.stats?.rebonds.away || 1))) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-2.5 border-b border-stone-100 last:border-0">
                          <span className="font-semibold text-stone-800 w-1/3 text-center">{match.stats?.deux_points?.home}</span>
                          <span className="text-xs text-stone-500 w-1/3 text-center">Tirs à 2 pts</span>
                          <span className="font-semibold text-stone-800 w-1/3 text-center">{match.stats?.deux_points?.away}</span>
                        </div>
                      </>
                    )}

                    {match.sport_name === "Breaking" && (
                      <>
                        {['musicality', 'technique', 'originality', 'execution'].map((statKey) => {
                          const labels: Record<string, string> = { musicality: "Musicalité", technique: "Technique", originality: "Originalité", execution: "Exécution" };
                          return (
                            <div key={statKey}>
                              <div className="flex justify-between text-xs text-stone-500 mb-1.5">
                                <span className="font-semibold text-stone-700 w-8">{match.stats?.[statKey]?.home}</span>
                                <span>{labels[statKey]}</span>
                                <span className="font-semibold text-stone-700 w-8 text-right">{match.stats?.[statKey]?.away}</span>
                              </div>
                              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-stone-800 rounded-l-full" style={{ width: `${(match.stats?.[statKey]?.home / 10) * 100}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {(match.sport_name === "Athlétisme" || match.sport_name === "Natation") && (
                      <div className="bg-stone-50 rounded-lg border border-stone-100 overflow-hidden">
                        {Object.keys(match.stats || {}).map((key) => {
                          const labels: Record<string, string> = { temps: "Temps", vitesse_max: "Vitesse Max", reaction: "Temps de réaction" };
                          return (
                            <div key={key} className="flex justify-between items-center px-4 py-2.5 border-b border-stone-100 last:border-0">
                              <span className="font-semibold text-sm text-stone-800">{match.stats[key].home}</span>
                              <span className="text-xs text-stone-400 font-medium">{labels[key] || key}</span>
                              <span className="font-semibold text-sm text-stone-800 text-right">{match.stats[key].away}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {!["Football", "Basket-ball 3x3", "Breaking", "Athlétisme", "Natation"].includes(match.sport_name) && (
                      <div className="bg-stone-50 rounded-lg border border-stone-100 p-5">
                        <p className="text-xs text-stone-400 text-center mb-4 uppercase tracking-wide font-medium">Statistiques générales</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-stone-900 tabular-nums">{match.stats?.points?.home || match.stats?.attaques?.home}</p>
                            <p className="text-xs text-stone-400 mt-1">Domicile</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <span className="text-sm font-semibold text-stone-300">VS</span>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-stone-900 tabular-nums">{match.stats?.points?.away || match.stats?.attaques?.away}</p>
                            <p className="text-xs text-stone-400 mt-1">Extérieur</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2 border-t border-stone-100">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-widest mb-4">
                    {match.sport_name === "Breaking" ? "Déroulement des rounds" : "Faits marquants"}
                  </h3>
                  <div className="space-y-3">
                    {match.events?.map((event: any, index: number) => {
                      const typeMap: Record<string, string> = {
                        'goal': 'But', 'yellow-card': 'Carton jaune', 'score': 'Panier',
                        'round': 'Round', 'start': 'Départ', 'finish': 'Arrivée', 'info': 'Info',
                      };
                      const displayType = typeMap[event.type] || 'Point';
                      const isHome = event.team !== 'away';
                      return (
                        <div key={index} className={`flex items-center gap-3 ${!isHome ? 'flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[11px] font-bold text-stone-600 flex-shrink-0 tabular-nums">
                            {event.time}
                          </div>
                          <div className={`flex-1 bg-stone-50 border border-stone-100 px-3 py-2 rounded-lg ${!isHome ? 'text-right' : ''}`}>
                            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide">{displayType}</p>
                            <p className="text-sm font-medium text-stone-800">{event.player}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isScheduled && (
              <div className="text-center py-6 bg-stone-50 rounded-lg border border-stone-100">
                <p className="text-sm text-stone-400">Les statistiques seront disponibles une fois le match commencé.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;

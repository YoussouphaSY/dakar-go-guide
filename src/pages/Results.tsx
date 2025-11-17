import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";

const MATCHES_URL = "http://localhost:5000/api/matches"; // URL du backend

const Results = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [matchesByCompetition, setMatchesByCompetition] = useState({});
  const [visibleMatches, setVisibleMatches] = useState({});
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTeam, setSearchTeam] = useState("");

  // Fonction pour récupérer les matchs depuis le backend
  const fetchMatches = async () => {
    try {
      const response = await fetch(MATCHES_URL);
      const data = await response.json();
      setMatches(data.matches);

      // Organiser les matchs par compétition
      const groupedMatches = data.matches.reduce((acc, match) => {
        const competition = match.competition.name;
        if (!acc[competition]) acc[competition] = [];
        acc[competition].push(match);
        return acc;
      }, {});
      setMatchesByCompetition(groupedMatches);

      // Initialiser les matchs visibles (10 premiers par compétition)
      const initialVisible = Object.keys(groupedMatches).reduce((acc, competition) => {
        acc[competition] = 10;
        return acc;
      }, {});
      setVisibleMatches(initialVisible);
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs :", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Fonction pour charger plus de matchs pour une compétition
  const loadMoreMatches = (competition) => {
    setVisibleMatches((prev) => ({
      ...prev,
      [competition]: prev[competition] + 10,
    }));
  };

  // Fonction pour filtrer les matchs
  const filteredMatchesByCompetition = Object.keys(matchesByCompetition).reduce((acc, competition) => {
    const filteredMatches = matchesByCompetition[competition].filter((match) => {
      const matchDate = new Date(match.utcDate).toISOString().split("T")[0]; // Convertir en YYYY-MM-DD
      const homeTeam = match.homeTeam.name.toLowerCase();
      const awayTeam = match.awayTeam.name.toLowerCase();

      // Appliquer les filtres
      const dateMatch = !filterDate || matchDate === filterDate; // Comparer les dates normalisées
      const statusMatch = !filterStatus || match.status.toLowerCase() === filterStatus.toLowerCase();
      const teamMatch =
        !searchTeam ||
        homeTeam.includes(searchTeam.toLowerCase()) ||
        awayTeam.includes(searchTeam.toLowerCase());

      return dateMatch && statusMatch && teamMatch;
    });
    acc[competition] = filteredMatches;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-4">Résultats</h1>
        <p className="text-muted-foreground mb-6">Suivez tous les résultats en temps réel</p>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Filtre par date */}
          <div>
            <label htmlFor="filter-date" className="block text-sm font-medium text-muted-foreground mb-2">
              Filtrer par date :
            </label>
            <input
              type="date"
              id="filter-date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Filtre par statut */}
          <div>
            <label htmlFor="filter-status" className="block text-sm font-medium text-muted-foreground mb-2">
              Filtrer par statut :
            </label>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Tous</option>
              <option value="FINISHED">Terminé</option>
              <option value="IN_PLAY">En direct</option>
              <option value="SCHEDULED">Programmé</option>
            </select>
          </div>

          {/* Barre de recherche */}
          <div>
            <label htmlFor="search-team" className="block text-sm font-medium text-muted-foreground mb-2">
              Rechercher une équipe :
            </label>
            <input
              type="text"
              id="search-team"
              value={searchTeam}
              onChange={(e) => setSearchTeam(e.target.value)}
              placeholder="Nom de l'équipe"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        {/* Affichage des matchs par compétition */}
        {Object.keys(filteredMatchesByCompetition).map((competition) => (
          <div key={competition} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{competition}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMatchesByCompetition[competition]
                .slice(0, visibleMatches[competition])
                .map((match) => (
                  <Card
                    key={match.id}
                    className="group cursor-pointer transition-all hover:shadow-xl"
                    onClick={() => navigate(`/match/${match.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{match.status}</Badge>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(match.utcDate).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Home Team */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3">
                            <img
                              src={match.homeTeam.crest}
                              alt={`Logo de ${match.homeTeam.name}`}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="font-semibold text-lg">{match.homeTeam.name}</span>
                          </div>
                          {match.score.fullTime.home !== null && (
                            <span className="text-2xl font-bold">{match.score.fullTime.home}</span>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3">
                            <img
                              src={match.awayTeam.crest}
                              alt={`Logo de ${match.awayTeam.name}`}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="font-semibold text-lg">{match.awayTeam.name}</span>
                          </div>
                          {match.score.fullTime.away !== null && (
                            <span className="text-2xl font-bold">{match.score.fullTime.away}</span>
                          )}
                        </div>
                      </div>

                      <Button variant="ghost" className="w-full mt-3">
                        Voir détails
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Bouton "Voir plus..." */}
            {filteredMatchesByCompetition[competition].length > visibleMatches[competition] && (
              <div className="mt-4 text-center">
                <Button onClick={() => loadMoreMatches(competition)}>Voir plus...</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
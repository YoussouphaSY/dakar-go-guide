/**
 * Page : Events (Programme JOJ 2026)
 * Route : /events
 * 
 * Description :
 * Affiche le programme complet des Jeux Olympiques de la Jeunesse 2026
 * 
 * Fonctionnalités :
 * - Liste de 35 sports (25 compétition + 10 mobilisation)
 * - Système de recherche en temps réel
 * - Filtrage par lieu (Dakar, Diamniadio, Saly)
 * - Onglets pour séparer compétition et mobilisation
 * - Navigation vers les détails de chaque sport
 * - Images africaines pour chaque sport
 * 
 * États gérés :
 * - searchTerm : Terme de recherche
 * - activeTab : Onglet actif (competition/mobilisation)
 * - venueFilter : Filtre de lieu
 * 
 * Données :
 * Importées depuis src/data/joj2026Sports.ts
 */

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, Clock, Play, Trophy, Sparkles, Filter } from "lucide-react";
import { joj2026Sports, getCompetitionSports, getMobilisationSports } from "@/data/joj2026Sports";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

const Events = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Onglet actif (competition ou mobilisation)
  const [activeTab, setActiveTab] = useState("competition");
  
  // Filtre de lieu
  const [venueFilter, setVenueFilter] = useState<string>("all");
  
  // Récupération des sports par catégorie
  const competitionSports = getCompetitionSports();
  const mobilisationSports = getMobilisationSports();
  /**
   * Filtrage des sports en fonction des critères de recherche et de lieu
   * Mémorisé avec useMemo pour optimiser les performances
   */
  const filteredSports = useMemo(() => {
    // Sélection des sports selon l'onglet actif
    const currentSports = activeTab === "competition" ? competitionSports : mobilisationSports;
    
    // Filtrage combiné : recherche + lieu
    return currentSports.filter(sport => {
      // Recherche dans le nom et la description
      const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           sport.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtre de lieu
      const matchesVenue = venueFilter === "all" || 
                          sport.venue.toLowerCase().includes(venueFilter.toLowerCase());
      
      return matchesSearch && matchesVenue;
    });
  }, [activeTab, searchTerm, venueFilter, competitionSports, mobilisationSports]);
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container">
          {/* <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-10 w-10" />
            <h1 className="font-bold text-4xl text-slate-900">Programme JOJ 2026</h1>
          </div> */}
          <div className="mb-8">
            <h1 className="text-4xl text-slate-900 font-bold mb-2">{t.events.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.events.subtitle}
          </p>
          <p className="text-lg mt-2 text-muted-foreground">
            151 {t.events.events} • {t.events.venues}
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder={t.events.searchPlaceholder} className="pl-12 h-14 text-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          
          <Select value={venueFilter} onValueChange={setVenueFilter}>
            <SelectTrigger className="w-full md:w-[280px] h-14">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <SelectValue placeholder={t.events.filterByVenue} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.events.allVenues}</SelectItem>
              <SelectItem value="dakar">🏙️ Dakar</SelectItem>
              <SelectItem value="diamniadio">🏟️ Diamniadio</SelectItem>
              <SelectItem value="saly">🏖️ Saly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-12">
            <TabsTrigger value="competition" className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              {t.events.competition} <Badge variant="secondary" className="ml-1">25</Badge>
            </TabsTrigger>
            <TabsTrigger value="mobilisation" className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t.events.mobilisation} <Badge variant="secondary" className="ml-1">10</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSports.map(sport => (
                <div
                  key={sport.id}
                  className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                  onClick={() => navigate(`/events/${sport.id}`)}
                >
                  {/* Sport Image Header */}
                  <div className="h-44 relative overflow-hidden bg-stone-100">
                    {sport.image ? (
                      <img src={sport.image} alt={sport.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="h-full flex items-center justify-center" style={{ background: sport.gradient }}>
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          {sport.emoji}
                        </div>
                      </div>
                    )}
                    {sport.category === "competition" && sport.videoUrl && (
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 shadow">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {/* Venue badge overlay */}
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/65 backdrop-blur-sm rounded-full text-white text-[11px] font-medium leading-none">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        {sport.venue.split(',')[0].trim()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-80" style={{ backgroundColor: sport.color }} />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-[15px] text-stone-900 leading-snug">{sport.name}</h3>
                      <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                        sport.category === "competition"
                          ? "bg-stone-900 text-white"
                          : "bg-stone-100 text-stone-600 border border-stone-200"
                      }`}>
                        {sport.category === "competition" ? t.events.competition : t.events.mobilisation}
                      </span>
                    </div>

                    <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-2">{sport.description}</p>

                    {sport.category === "competition" && sport.events.length > 0 && (
                      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-stone-100 text-xs text-stone-500">
                        <Calendar className="h-3.5 w-3.5 text-stone-400 flex-shrink-0" />
                        <span>{sport.events.length} {t.events.events}</span>
                        <div className="flex gap-1 ml-auto">
                          {sport.events.slice(0, 3).map(event => (
                            <span key={event.id} className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[11px] font-medium">
                              {event.gender}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      className="w-full py-2.5 px-4 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors duration-200"
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/events/${sport.id}`);
                      }}
                    >
                      {sport.category === "competition" ? t.events.viewCalendar : t.events.learnMore}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredSports.length === 0 && <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-muted-foreground text-lg">
                  {t.events.noResults}
                </p>
              </div>}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default Events;
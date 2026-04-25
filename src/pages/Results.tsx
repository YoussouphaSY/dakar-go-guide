import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, MapPin, Clock, Search, Filter, Medal, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { joj2026Sports } from "@/data/joj2026Sports";

interface SportsEvent {
  id: number;
  sport_name: string;
  discipline_detail: string;
  gender_type: string;
  event_date: string | null;
  event_time: string | null;
  status: string | null;
  venue_id: number | null;
}

interface Venue {
  id: number;
  name: string;
  city: string;
}

const MOCK_EVENTS = [
  // Athlétisme (5)
  { id: 1001, sport_name: "Athlétisme", discipline_detail: "100m Hommes - Finale", gender_type: "H", event_date: "2026-11-08", event_time: "18:00", status: "terminé", venue_id: 1 },
  { id: 1002, sport_name: "Athlétisme", discipline_detail: "Saut en hauteur F - Éliminatoires", gender_type: "F", event_date: "2026-11-09", event_time: "10:00", status: "programmé", venue_id: 1 },
  { id: 1003, sport_name: "Athlétisme", discipline_detail: "400m Haies H - Séries", gender_type: "H", event_date: "2026-11-10", event_time: "14:30", status: "terminé", venue_id: 1 },
  { id: 1004, sport_name: "Athlétisme", discipline_detail: "Lancer du javelot F - Finale", gender_type: "F", event_date: "2026-11-12", event_time: "16:00", status: "programmé", venue_id: 1 },
  { id: 1005, sport_name: "Athlétisme", discipline_detail: "Relais 4x100m Mixte", gender_type: "Mixte", event_date: "2026-11-15", event_time: "19:00", status: "programmé", venue_id: 1 },

  // Natation (5)
  { id: 1011, sport_name: "Natation", discipline_detail: "50m nage libre H - Finale", gender_type: "H", event_date: "2026-11-06", event_time: "18:00", status: "terminé", venue_id: 2 },
  { id: 1012, sport_name: "Natation", discipline_detail: "100m Papillon F - Séries", gender_type: "F", event_date: "2026-11-07", event_time: "09:00", status: "terminé", venue_id: 2 },
  { id: 1013, sport_name: "Natation", discipline_detail: "200m Brasse H - Demi-finale", gender_type: "H", event_date: "2026-03-19", event_time: "17:45", status: "en cours", venue_id: 2 },
  { id: 1014, sport_name: "Natation", discipline_detail: "400m Quatre nages F - Finale", gender_type: "F", event_date: "2026-03-19", event_time: "20:00", status: "programmé", venue_id: 2 },
  { id: 1015, sport_name: "Natation", discipline_detail: "Relais 4x100m nage libre H", gender_type: "H", event_date: "2026-11-11", event_time: "18:30", status: "programmé", venue_id: 2 },

  // Football (5)
  { id: 1021, sport_name: "Football", discipline_detail: "Groupe A - Sénégal vs France", gender_type: "Mixte", event_date: "2026-03-19", event_time: "14:00", status: "en cours", venue_id: 4 },
  { id: 1022, sport_name: "Football", discipline_detail: "Groupe B - Brésil vs Argentine", gender_type: "Mixte", event_date: "2026-03-19", event_time: "16:30", status: "en cours", venue_id: 4 },
  { id: 1023, sport_name: "Football", discipline_detail: "Groupe C - Nigeria vs Japon", gender_type: "Mixte", event_date: "2026-11-05", event_time: "13:00", status: "terminé", venue_id: 4 },
  { id: 1024, sport_name: "Football", discipline_detail: "Quart de finale 1", gender_type: "Mixte", event_date: "2026-11-18", event_time: "15:00", status: "programmé", venue_id: 4 },
  { id: 1025, sport_name: "Football", discipline_detail: "Finale Or", gender_type: "Mixte", event_date: "2026-11-22", event_time: "20:00", status: "programmé", venue_id: 4 },

  // Basket-ball 3x3 (5)
  { id: 1031, sport_name: "Basket-ball 3x3", discipline_detail: "Tournoi Femmes - Finale", gender_type: "F", event_date: "2026-03-19", event_time: "18:00", status: "en cours", venue_id: 3 },
  { id: 1032, sport_name: "Basket-ball 3x3", discipline_detail: "Qualifications H - Sénégal vs USA", gender_type: "H", event_date: "2026-11-06", event_time: "11:00", status: "terminé", venue_id: 3 },
  { id: 1033, sport_name: "Basket-ball 3x3", discipline_detail: "Quarts de finale F", gender_type: "F", event_date: "2026-03-19", event_time: "15:00", status: "terminé", venue_id: 3 },
  { id: 1034, sport_name: "Basket-ball 3x3", discipline_detail: "Demi-finale H", gender_type: "H", event_date: "2026-11-14", event_time: "17:00", status: "programmé", venue_id: 3 },
  { id: 1035, sport_name: "Basket-ball 3x3", discipline_detail: "Match pour le Bronze H", gender_type: "H", event_date: "2026-11-15", event_time: "14:00", status: "programmé", venue_id: 3 },

  // Breaking (5)
  { id: 1041, sport_name: "Breaking", discipline_detail: "Battle B-Boys - Finale", gender_type: "H", event_date: "2026-11-09", event_time: "20:00", status: "programmé", venue_id: 1 },
  { id: 1042, sport_name: "Breaking", discipline_detail: "Qualifications B-Girls", gender_type: "F", event_date: "2026-11-08", event_time: "14:00", status: "terminé", venue_id: 1 },
  { id: 1043, sport_name: "Breaking", discipline_detail: "Round Robin H - Groupe A", gender_type: "H", event_date: "2026-03-19", event_time: "16:00", status: "en cours", venue_id: 1 },
  { id: 1044, sport_name: "Breaking", discipline_detail: "Demi-finale B-Girls", gender_type: "F", event_date: "2026-11-09", event_time: "18:00", status: "programmé", venue_id: 1 },
  { id: 1045, sport_name: "Breaking", discipline_detail: "Battle d'Exhibition Mixte", gender_type: "Mixte", event_date: "2026-11-10", event_time: "21:00", status: "programmé", venue_id: 1 }
];

const Results = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [events, setEvents] = useState<SportsEvent[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSport, setFilterSport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, venuesRes] = await Promise.all([
        supabase.from("sports_events").select("*").order("event_date", { ascending: true }),
        supabase.from("venues").select("*"),
      ]);

      // Merge with MOCK_EVENTS to ensure the page is never empty
      const dbEvents = eventsRes.data || [];
      const combinedEvents = [...MOCK_EVENTS, ...dbEvents];
      setEvents(combinedEvents);

      if (venuesRes.data) setVenues(venuesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEvents(MOCK_EVENTS); // Fallback to mocks on error
    } finally {
      setLoading(false);
    }
  };

  const getVenueName = (venueId: number | null) => {
    if (!venueId) return "";
    return venues.find(v => v.id === venueId)?.name || "";
  };

  const getStatusBadge = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "terminé":
      case "finished":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200">
            {t.results.finished}
          </span>
        );
      case "en cours":
      case "in_play":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-red-600 bg-red-50 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            {t.results.live}
          </span>
        );
      case "programmé":
      case "scheduled":
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide text-stone-500 bg-stone-50 border border-stone-200">
            {t.results.scheduled}
          </span>
        );
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "H": return "♂";
      case "F": return "♀";
      default: return "⚥";
    }
  };

  const uniqueSports = [...new Set(events.map(e => e.sport_name))].sort();

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm ||
      event.sport_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.discipline_detail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || event.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSport = !filterSport || event.sport_name === filterSport;
    return matchesSearch && matchesStatus && matchesSport;
  });

  const eventsBySport = filteredEvents.reduce((acc, event) => {
    if (!acc[event.sport_name]) acc[event.sport_name] = [];
    acc[event.sport_name].push(event);
    return acc;
  }, {} as Record<string, SportsEvent[]>);

  const getSportIcon = (sportName: string) => {
    const sport = joj2026Sports.find(s => s.name.toLowerCase() === sportName.toLowerCase());
    return sport?.image;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 px-4">
        {/* Hero */}
        <div className="rounded-2xl p-6 sm:p-8 bg-primary text-white mb-8">
          <div className="flex items-center gap-4">
            <Trophy className="h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{t.results.title}</h1>
              <p className="text-lg opacity-90">{t.results.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.results.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm"
          >
            <option value="">{t.results.allStatuses}</option>
            <option value="terminé">{t.results.finished}</option>
            <option value="en cours">{t.results.live}</option>
            <option value="programmé">{t.results.scheduled}</option>
          </select>
          <select
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
            className="border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm"
          >
            <option value="">{t.results.allSports}</option>
            {uniqueSports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <p className="text-2xl font-bold text-stone-900 tabular-nums">{events.length}</p>
            <p className="text-xs text-stone-500 mt-1 font-medium">{t.results.totalEvents}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <p className="text-2xl font-bold text-stone-900 tabular-nums">{uniqueSports.length}</p>
            <p className="text-xs text-stone-500 mt-1 font-medium">{t.results.sports}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-red-600 tabular-nums">
                {events.filter(e => e.status?.toLowerCase() === "en cours").length}
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            </div>
            <p className="text-xs text-stone-500 mt-1 font-medium">{t.results.liveNow}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <p className="text-2xl font-bold text-emerald-700 tabular-nums">
              {events.filter(e => e.status?.toLowerCase() === "terminé").length}
            </p>
            <p className="text-xs text-stone-500 mt-1 font-medium">{t.results.completed}</p>
          </div>
        </div>

        {/* Events by sport */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">{t.results.loading}</div>
        ) : Object.keys(eventsBySport).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">{t.results.noResults}</div>
        ) : (
          Object.entries(eventsBySport).map(([sport, sportEvents]) => (
            <div key={sport} className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Medal className="h-5 w-5 text-stone-700" />
                <span className="text-stone-900">{sport}</span>
                <span className="ml-1 px-2 py-0.5 rounded text-xs font-medium text-stone-500 bg-white border border-stone-200">
                  {sportEvents.length} {t.results.events}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sportEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group bg-white rounded-xl border border-stone-200 p-4 cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 hover:border-stone-300"
                    onClick={() => navigate(`/match/${event.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      {getStatusBadge(event.status)}
                      <span className="text-sm font-semibold text-stone-400">{getGenderIcon(event.gender_type)}</span>
                    </div>
                    <h3 className="font-semibold text-[13px] text-stone-800 mb-3 leading-snug">{event.discipline_detail}</h3>
                    <div className="space-y-1.5 text-xs text-stone-500">
                      {event.event_date && (
                        <p className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-stone-400 flex-shrink-0" />
                          {new Date(event.event_date).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                      {event.event_time && (
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-stone-400 flex-shrink-0" />
                          {event.event_time}
                        </p>
                      )}
                      {event.venue_id && (
                        <p className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-stone-400 flex-shrink-0" />
                          {getVenueName(event.venue_id)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Results;

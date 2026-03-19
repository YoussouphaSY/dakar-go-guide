import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      if (eventsRes.data) setEvents(eventsRes.data);
      if (venuesRes.data) setVenues(venuesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        return <Badge className="bg-primary text-white">{t.results.finished}</Badge>;
      case "en cours":
      case "in_play":
        return <Badge className="bg-destructive text-white animate-pulse">{t.results.live}</Badge>;
      case "programmé":
      case "scheduled":
      default:
        return <Badge variant="outline">{t.results.scheduled}</Badge>;
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
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{events.length}</p>
              <p className="text-xs text-muted-foreground">{t.results.totalEvents}</p>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{uniqueSports.length}</p>
              <p className="text-xs text-muted-foreground">{t.results.sports}</p>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">
                {events.filter(e => e.status?.toLowerCase() === "en cours").length}
              </p>
              <p className="text-xs text-muted-foreground">{t.results.liveNow}</p>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-secondary">
                {events.filter(e => e.status?.toLowerCase() === "terminé").length}
              </p>
              <p className="text-xs text-muted-foreground">{t.results.completed}</p>
            </CardContent>
          </Card>
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
                <Medal className="h-5 w-5 text-primary" />
                {sport}
                <Badge variant="outline" className="ml-2">{sportEvents.length} {t.results.events}</Badge>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sportEvents.map((event) => (
                  <Card key={event.id} className="border border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        {getStatusBadge(event.status)}
                        <span className="text-lg font-bold">{getGenderIcon(event.gender_type)}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-3">{event.discipline_detail}</h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        {event.event_date && (
                          <p className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(event.event_date).toLocaleDateString(
                              t === (undefined as any) ? 'fr-FR' : 'fr-FR'
                            )}
                          </p>
                        )}
                        {event.event_time && (
                          <p className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {event.event_time}
                          </p>
                        )}
                        {event.venue_id && (
                          <p className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {getVenueName(event.venue_id)}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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

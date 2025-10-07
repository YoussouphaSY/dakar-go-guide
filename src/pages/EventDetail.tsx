import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowLeft, Users, Star, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - à remplacer par de vraies données basées sur l'ID
  const event = {
    id: Number(id),
    title: "Finale 100m Hommes",
    sport: "Athlétisme",
    date: "15 Mars 2026",
    time: "18:00",
    location: "Stade Léopold Sédar Senghor",
    category: "Finale",
    description: "La finale tant attendue du 100 mètres hommes réunira les meilleurs sprinters de la jeunesse africaine. Après des qualifications intenses, les 8 finalistes s'affronteront pour décrocher la médaille d'or.",
    participants: [
      { name: "Amadou Diallo", country: "Sénégal", personalBest: "10.23" },
      { name: "Kwame Mensah", country: "Ghana", personalBest: "10.31" },
      { name: "Ibrahim Sow", country: "Mali", personalBest: "10.38" },
      { name: "Youssef Ibrahim", country: "Égypte", personalBest: "10.42" },
      { name: "Jean-Pierre Koffi", country: "Côte d'Ivoire", personalBest: "10.45" },
      { name: "Mohamed Hassan", country: "Maroc", personalBest: "10.48" },
      { name: "David Osei", country: "Ghana", personalBest: "10.51" },
      { name: "Ousmane Ba", country: "Sénégal", personalBest: "10.54" },
    ],
    venue: {
      name: "Stade Léopold Sédar Senghor",
      address: "Avenue Léopold Sédar Senghor, Dakar",
      capacity: "60,000 places",
      facilities: ["Parking disponible", "Restauration sur place", "Accessible PMR"],
    },
    schedule: {
      opening: "16:00",
      warmup: "17:00",
      event: "18:00",
      estimated_end: "18:30",
    },
  };

  const handleAddToCalendar = () => {
    toast({
      title: "Ajouté au calendrier",
      description: `${event.title} a été ajouté à votre agenda`,
    });
  };

  const handleSetReminder = () => {
    toast({
      title: "Rappel activé",
      description: "Vous recevrez une notification 1h avant l'événement",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="text-base">{event.sport}</Badge>
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                <CardTitle className="text-3xl mb-4">{event.title}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span className="text-lg">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{event.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleAddToCalendar} className="flex-1">
                    <Star className="h-4 w-4 mr-2" />
                    Ajouter à mon agenda
                  </Button>
                  <Button onClick={handleSetReminder} variant="secondary" className="flex-1">
                    <Bell className="h-4 w-4 mr-2" />
                    Définir un rappel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.participants.map((participant, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Meilleur temps</p>
                        <p className="font-bold text-primary">{participant.personalBest}s</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Programme de la journée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-semibold">Ouverture des portes</p>
                      <p className="text-sm text-muted-foreground">{event.schedule.opening}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-semibold">Échauffement</p>
                      <p className="text-sm text-muted-foreground">{event.schedule.warmup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-2 border-primary">
                    <Clock className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-primary">Début de l'épreuve</p>
                      <p className="text-sm text-primary/80">{event.schedule.event}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-semibold">Fin estimée</p>
                      <p className="text-sm text-muted-foreground">{event.schedule.estimated_end}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lieu de l'événement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">{event.venue.name}</h4>
                  <p className="text-sm text-muted-foreground">{event.venue.address}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Capacité</p>
                  <p className="text-sm text-muted-foreground">{event.venue.capacity}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Facilités</p>
                  <ul className="space-y-1">
                    {event.venue.facilities.map((facility, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Voir sur la carte
                </Button>
              </CardContent>
            </Card>

            {/* Transport Info */}
            <Card>
              <CardHeader>
                <CardTitle>Comment s'y rendre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">🚌 Bus</p>
                  <p className="text-sm text-muted-foreground">Lignes 7, 12, 23</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">🚕 Taxi</p>
                  <p className="text-sm text-muted-foreground">Station à 200m</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">🚗 Parking</p>
                  <p className="text-sm text-muted-foreground">500 places disponibles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

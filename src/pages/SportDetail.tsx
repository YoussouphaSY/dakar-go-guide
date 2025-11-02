import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowLeft, Video, Trophy, Users } from "lucide-react";
import { getSportById } from "@/data/joj2026Sports";

const SportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sport = getSportById(Number(id));

  if (!sport) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Sport non trouvé</h1>
          <Button onClick={() => navigate('/events')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au programme
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Video */}
      <div 
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ background: sport.gradient }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <div className="text-9xl mb-4 animate-fade-in">{sport.emoji}</div>
          <h1 className="text-6xl font-bold text-white animate-fade-in">{sport.name}</h1>
          <Badge className="text-lg px-6 py-2 bg-white/20 backdrop-blur-sm border-white/30">
            {sport.category === "competition" ? "Sport de Compétition" : "Activité de Mobilisation"}
          </Badge>
        </div>
      </div>

      <div className="container py-12">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/events')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au programme
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  À propos de ce sport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{sport.description}</p>
              </CardContent>
            </Card>

            {/* Video Section */}
            {sport.videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-6 w-6" />
                    Découvrez le sport en vidéo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={sport.videoUrl}
                      title={`Vidéo ${sport.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Events Schedule */}
            {sport.category === "competition" && sport.events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Calendrier des épreuves
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sport.events.map((event) => (
                    <Card key={event.id} className="border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: sport.color }}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(event.date).toLocaleDateString('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{event.phase}</Badge>
                            <Badge 
                              style={{ 
                                backgroundColor: event.gender === 'H' ? '#3B82F6' : 
                                               event.gender === 'F' ? '#EC4899' : '#8B5CF6',
                                color: 'white'
                              }}
                            >
                              {event.gender === 'H' ? 'Hommes' : event.gender === 'F' ? 'Femmes' : 'Mixte'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Venue Card */}
            <Card className="border-t-4" style={{ borderTopColor: sport.color }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lieu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">{sport.venue}</p>
                <Button 
                  className="w-full"
                  style={{ background: sport.gradient }}
                  onClick={() => {
                    window.open(`https://www.google.com/maps/search/${encodeURIComponent(sport.venue + ' Dakar')}`, '_blank');
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Voir sur la carte
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {sport.category === "competition" && sport.events.length > 0 && (
              <Card style={{ background: `linear-gradient(135deg, ${sport.color}15 0%, ${sport.color}05 100%)` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: sport.color }}>
                      {sport.events.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Épreuves au total</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: sport.color }}>
                      {sport.events.filter(e => e.gender === 'Mixte').length > 0 ? 'Oui' : 'Oui'}
                    </p>
                    <p className="text-sm text-muted-foreground">Épreuves mixtes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: sport.color }}>
                      🏅
                    </p>
                    <p className="text-sm text-muted-foreground">Médailles à gagner</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="bg-gradient-hero">
              <CardContent className="pt-6 text-center space-y-4">
                <Trophy className="h-12 w-12 mx-auto" />
                <h3 className="text-xl font-bold">Ne manquez rien!</h3>
                <p className="">
                  Activez les notifications pour être alerté des compétitions
                </p>
                <Button 
                  className="w-full bg-white text-primary"
                  onClick={() => navigate('/profile')}
                >
                  Activer les notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportDetail;

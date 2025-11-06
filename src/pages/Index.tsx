/**
 * Page : Index (Accueil)
 * Route : /
 * 
 * Description :
 * Page d'accueil principale de l'application JOJ Dakar 2026
 * 
 * Sections :
 * 1. Hero Section - Vidéo de présentation avec titre et CTA
 * 2. Features Section - Cartes de navigation vers les fonctionnalités JOJ
 *    - Programme des événements
 *    - Résultats en direct
 *    - Assistant IA multilingue
 *    - Profil utilisateur
 * 3. Tourism Section - Guide touristique de Dakar
 *    - Restaurants
 *    - Attractions
 *    - Transport
 * 4. CTA Section - Appel à l'action final
 * 
 * Composants utilisés :
 * - Header : Navigation principale
 * - Card : Cartes d'information
 * - Button : Boutons d'action
 */

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Trophy, MessageCircle, User, MapPin, Utensils, Camera, Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-dakar-tourism.jpg";
import heroVideo from "@/assets/1YTG Dakar 2026 _ Svelata la mascotte Ayo ad un anno dai Giochi Olimpici Giovanili.mp4";
import restaurantImg from "@/assets/saly-princess-senegal_0122_1107.jpg";
import transportImg from "@/assets/transport-dakar.jpg";

const Index = () => {
  // Hook de navigation React Router
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}   // ton import de vidéo
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

        <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl mx-auto">
          <div className="inline-block px-6 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 mb-4">
            <span className="text-white font-semibold">✨ Jeux Olympiques de la Jeunesse 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white animate-fade-in tracking-tight">
            Bienvenue à Dakar
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-light">
            Votre guide intelligent pour les JOJ 2026 et la découverte de Dakar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
              onClick={() => navigate('/events')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Programme des Jeux
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate('/discover')}
              className="text-lg px-10 py-6 bg-secondary hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Découvrir Dakar
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Olympic */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Jeux Olympiques de la Jeunesse</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suivez tous les événements sportifs en direct
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-t-4 border-t-primary" onClick={() => navigate('/events')}>
              <CardHeader>
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <CardTitle>Programme</CardTitle>
                <CardDescription>
                  Calendrier complet des compétitions avec filtres par sport et lieu
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-t-4 border-t-accent" onClick={() => navigate('/results')}>
              <CardHeader>
                <div className="w-14 h-14 bg-[hsl(var(--accent))] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <CardTitle>Résultats Live</CardTitle>
                <CardDescription>
                  Scores en temps réel, classements et tableau des médailles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-t-4 border-t-secondary" onClick={() => navigate('/assistant')}>
              <CardHeader>
                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle>Assistant IA</CardTitle>
                <CardDescription>
                  Questions en français, wolof, anglais ou pulaar
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-t-4 border-t-muted-foreground" onClick={() => navigate('/profile')}>
              <CardHeader>
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="h-7 w-7" />
                </div>
                <CardTitle>Mon Profil</CardTitle>
                <CardDescription>
                  Personnalisez vos préférences et notifications
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Découvrez Dakar</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez la ville pendant votre séjour
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer group" onClick={() => navigate('/discover')}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={restaurantImg} 
                  alt="Restaurants de Dakar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-3">
                  <Utensils className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Restaurants</CardTitle>
                <CardDescription>
                  Découvrez la gastronomie sénégalaise authentique
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer group" onClick={() => navigate('/discover')}>
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Camera className="h-24 w-24 text-blue-500" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
                  <Camera className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Attractions</CardTitle>
                <CardDescription>
                  Monuments, musées et sites historiques incontournables
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer group" onClick={() => navigate('/discover')}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={transportImg} 
                  alt="Transport à Dakar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                  <Bus className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Transport</CardTitle>
                <CardDescription>
                  Infos trafic et moyens de transport en temps réel
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => navigate('/discover')}
              className="bg-primary hover:bg-primary/90"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Voir la Carte Interactive
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Vivez Dakar 2026 pleinement
          </h2>
          <p className="text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
            Assistant intelligent, résultats live, guide touristique - Tout en un seul endroit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/assistant')}
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Parler à l'Assistant
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="text-lg px-10 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <User className="mr-2 h-5 w-5" />
              Créer mon Profil
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

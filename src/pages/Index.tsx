import { Link } from "react-router-dom";
import { Calendar, Trophy, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-dakar.jpg";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Calendrier Complet",
      description: "Consultez le programme de toutes les compétitions avec des filtres personnalisés",
      link: "/events",
    },
    {
      icon: Trophy,
      title: "Résultats en Temps Réel",
      description: "Suivez les scores et résultats instantanément avec notifications",
      link: "/results",
    },
    {
      icon: MessageCircle,
      title: "Assistant IA",
      description: "Posez vos questions sur les événements, horaires et transports",
      link: "/assistant",
    },
    {
      icon: Sparkles,
      title: "Recommandations",
      description: "Découvrez des activités culturelles personnalisées selon vos préférences",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})`, opacity: 0.3 }}
        />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Jeux Olympiques de la Jeunesse
              <span className="block mt-2">Dakar 2026</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Votre assistant complet pour vivre l'expérience olympique à Dakar.
              Découvrez les événements, suivez les résultats et planifiez votre séjour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/events">Explorer les Événements</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/assistant">Parler à l'Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une application complète pour ne rien manquer des Jeux Olympiques de la Jeunesse
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à vivre l'expérience olympique ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Créez votre profil pour recevoir des recommandations personnalisées et ne manquer aucun moment important
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/profile">Configurer mon Profil</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

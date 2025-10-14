import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Heart, Settings } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notifications: true,
    emailNotifications: false,
  });

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setFormData({
          name: profile.full_name || "",
          email: profile.email || user.email || "",
          notifications: profile.notifications_enabled ?? true,
          emailNotifications: profile.email_notifications_enabled ?? false,
        });
        setFavorites(profile.favorite_sports || []);
      } else {
        setFormData({
          ...formData,
          email: user.email || "",
        });
      }
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const [favorites, setFavorites] = useState<string[]>(["Athlétisme", "Basketball"]);

  const sports = [
    "Athlétisme",
    "Basketball",
    "Football",
    "Natation",
    "Gymnastique",
    "Judo",
    "Tennis",
    "Volleyball",
  ];

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.name,
        notifications_enabled: formData.notifications,
        email_notifications_enabled: formData.emailNotifications,
        favorite_sports: favorites,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le profil",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profil sauvegardé",
        description: "Vos préférences ont été mises à jour avec succès",
      });
    }
  };

  const toggleFavorite = (sport: string) => {
    setFavorites((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Mon Profil
          </h1>
          <p className="text-muted-foreground">
            Personnalisez votre expérience et vos préférences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Informations Personnelles
              </CardTitle>
              <CardDescription>
                Gérez vos informations de base
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Sauvegarder
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des alertes pour les événements favoris
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifications Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des résumés quotidiens par email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, emailNotifications: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Favorite Sports */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Sports Favoris
              </CardTitle>
              <CardDescription>
                Sélectionnez vos sports préférés pour recevoir des recommandations personnalisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sports.map((sport) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Checkbox
                      id={sport}
                      checked={favorites.includes(sport)}
                      onCheckedChange={() => toggleFavorite(sport)}
                    />
                    <label
                      htmlFor={sport}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {sport}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Mes favoris actuels :</h4>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((sport) => (
                    <span
                      key={sport}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

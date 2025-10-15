import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Bell, Users, Trophy, Plus, Trash2, Edit, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string | null;
  sport: string | null;
  location: string | null;
  event_date: string;
  event_time: string | null;
  status: string | null;
  category: string | null;
}

interface Profile {
  user_id: string;
  email: string | null;
  full_name: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    type: "info",
    eventId: null as string | null,
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roles) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions admin",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadData();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    const [eventsData, usersData] = await Promise.all([
      supabase.from("events").select("*").order("event_date", { ascending: true }),
      supabase.from("profiles").select("user_id, email, full_name"),
    ]);

    if (eventsData.data) setEvents(eventsData.data);
    if (usersData.data) setUsers(usersData.data);
  };

  const handleSaveEvent = async (event: Partial<Event>) => {
    try {
      if (editingEvent?.id) {
        const { error } = await supabase
          .from("events")
          .update(event)
          .eq("id", editingEvent.id);

        if (error) throw error;
        toast({ title: "Événement mis à jour" });
      } else {
        // Ensure required fields are present for insert
        if (!event.title || !event.event_date) {
          toast({
            title: "Erreur",
            description: "Le titre et la date sont requis",
            variant: "destructive",
          });
          return;
        }
        const { error } = await supabase.from("events").insert([event as any]);
        if (error) throw error;
        toast({ title: "Événement créé" });
      }

      await loadData();
      setEditingEvent(null);
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'événement",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Événement supprimé" });
      await loadData();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'événement",
        variant: "destructive",
      });
    }
  };

  const handleSendNotification = async () => {
    try {
      const notifications = users.map((user) => ({
        user_id: user.user_id,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
        event_id: notificationData.eventId,
      }));

      const { error } = await supabase.from("notifications").insert(notifications);
      if (error) throw error;

      toast({
        title: "Notifications envoyées",
        description: `${users.length} utilisateurs notifiés`,
      });

      setNotificationData({
        title: "",
        message: "",
        type: "info",
        eventId: null,
      });
    } catch (error) {
      console.error("Error sending notifications:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer les notifications",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Administration JOJ 2026</h1>
          <p className="text-muted-foreground">
            Gérez les événements, utilisateurs et notifications
          </p>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="events">
              <Calendar className="mr-2 h-4 w-4" />
              Événements
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent ? "Modifier l'événement" : "Créer un événement"}
                  </DialogTitle>
                </DialogHeader>
                <EventForm
                  event={editingEvent}
                  onSave={handleSaveEvent}
                  onCancel={() => setEditingEvent(null)}
                />
              </DialogContent>
            </Dialog>

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                          {event.sport} • {new Date(event.event_date).toLocaleDateString("fr-FR")}
                          {event.event_time && ` • ${event.event_time}`}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{event.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs ({users.length})</CardTitle>
                <CardDescription>Liste des utilisateurs inscrits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.user_id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{user.full_name || "Utilisateur"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Envoyer une notification</CardTitle>
                <CardDescription>
                  Notifier tous les utilisateurs ({users.length} destinataires)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Titre</Label>
                  <Input
                    value={notificationData.title}
                    onChange={(e) =>
                      setNotificationData({ ...notificationData, title: e.target.value })
                    }
                    placeholder="Ex: Nouveau match ajouté"
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea
                    value={notificationData.message}
                    onChange={(e) =>
                      setNotificationData({ ...notificationData, message: e.target.value })
                    }
                    placeholder="Détails de la notification..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={notificationData.type}
                    onValueChange={(value) =>
                      setNotificationData({ ...notificationData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Succès</SelectItem>
                      <SelectItem value="warning">Avertissement</SelectItem>
                      <SelectItem value="error">Erreur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Événement lié (optionnel)</Label>
                  <Select
                    value={notificationData.eventId || ""}
                    onValueChange={(value) =>
                      setNotificationData({ ...notificationData, eventId: value || null })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Aucun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Aucun</SelectItem>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleSendNotification}
                  disabled={!notificationData.title || !notificationData.message}
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer à tous les utilisateurs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const EventForm = ({
  event,
  onSave,
  onCancel,
}: {
  event: Event | null;
  onSave: (event: Partial<Event>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<Event>>(
    event || {
      title: "",
      description: "",
      sport: "",
      location: "",
      event_date: "",
      event_time: "",
      status: "upcoming",
      category: "competition",
    }
  );

  return (
    <div className="space-y-4">
      <div>
        <Label>Titre</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sport</Label>
          <Input
            value={formData.sport || ""}
            onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
          />
        </div>
        <div>
          <Label>Lieu</Label>
          <Input
            value={formData.location || ""}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.event_date}
            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
          />
        </div>
        <div>
          <Label>Heure</Label>
          <Input
            type="time"
            value={formData.event_time || ""}
            onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Statut</Label>
          <Select
            value={formData.status || "upcoming"}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">À venir</SelectItem>
              <SelectItem value="live">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Catégorie</Label>
          <Select
            value={formData.category || "competition"}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="competition">Compétition</SelectItem>
              <SelectItem value="mobilisation">Mobilisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)}>
          <Trophy className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default Admin;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { User, Bell, Heart, Settings, Check, LogOut } from "lucide-react";
import { toast } from "sonner";

const SPORTS = [
  "Athlétisme", "Natation", "Badminton", "Baseball5", "Basketball 3x3",
  "Beach-volley", "Breaking", "Boxe", "Cyclisme", "Rugby à sept",
  "Skateboard", "Taekwondo", "Tennis de table", "Tir à l'arc",
  "Triathlon", "Planche à voile", "Wushu", "Aviron de mer",
  "Escrime", "Futsal", "Gymnastique", "Handball", "Judo",
  "Lutte", "Saut d'obstacles",
];

/* Simple native toggle switch */
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-primary" : "bg-stone-200"}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notifications: true,
    emailNotifications: false,
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }

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
        setFormData(p => ({ ...p, email: user.email || "" }));
      }
      setLoading(false);
    };
    loadProfile();
  }, [navigate]);

  const toggleFavorite = (sport: string) => {
    setFavorites(prev =>
      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
    );
  };

  const handleSave = async () => {
    setSaving(true);
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

    setSaving(false);
    if (error) {
      toast.error("Impossible de sauvegarder le profil");
    } else {
      toast.success("Profil mis à jour avec succès");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center text-stone-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 px-4 max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">Mon compte</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">Mon Profil</h1>
          <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-3 mb-3" />
          <p className="text-stone-500 text-base">Personnalisez votre expérience JOJ Dakar 2026</p>
        </div>

        <div className="space-y-4">

          {/* ── Informations personnelles ── */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-stone-100">
              <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                <Settings className="h-3.5 w-3.5 text-stone-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Informations personnelles</p>
                <p className="text-xs text-stone-400">Gérez vos informations de base</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Nom complet</label>
                <input
                  type="text"
                  placeholder="ex. Amadou Diallo"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-stone-200 px-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Adresse e-mail</label>
                <input
                  type="email"
                  placeholder="ex. amadou@example.com"
                  value={formData.email}
                  disabled
                  className="w-full h-10 rounded-lg border border-stone-200 px-3 text-sm text-stone-400 bg-stone-50 cursor-not-allowed"
                />
                <p className="text-[11px] text-stone-400 mt-1">L'email est géré par votre compte de connexion</p>
              </div>
            </div>
          </div>

          {/* ── Notifications ── */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-stone-100">
              <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                <Bell className="h-3.5 w-3.5 text-stone-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Notifications</p>
                <p className="text-xs text-stone-400">Alertes résultats et rappels d'épreuves</p>
              </div>
            </div>
            <div className="divide-y divide-stone-100">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-stone-800">Notifications push</p>
                  <p className="text-xs text-stone-400 mt-0.5">Alertes en temps réel pour vos sports favoris</p>
                </div>
                <Toggle
                  checked={formData.notifications}
                  onChange={() => setFormData(p => ({ ...p, notifications: !p.notifications }))}
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-stone-800">Résumés par e-mail</p>
                  <p className="text-xs text-stone-400 mt-0.5">Récapitulatif quotidien des résultats</p>
                </div>
                <Toggle
                  checked={formData.emailNotifications}
                  onChange={() => setFormData(p => ({ ...p, emailNotifications: !p.emailNotifications }))}
                />
              </div>
            </div>
          </div>

          {/* ── Sports favoris ── */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-3.5 w-3.5 text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Sports favoris</p>
                  <p className="text-xs text-stone-400">Personnalisez vos recommandations</p>
                </div>
              </div>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                  {favorites.length}
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {SPORTS.map(sport => (
                  <button
                    key={sport}
                    onClick={() => toggleFavorite(sport)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-150 ${
                      favorites.includes(sport)
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {favorites.includes(sport) && <Check size={10} />}
                    {sport}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Save button ── */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check size={15} />
            )}
            {saving ? "Sauvegarde…" : "Sauvegarder les modifications"}
          </button>

          {/* ── Logout ── */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-stone-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <LogOut className="h-3.5 w-3.5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">Se déconnecter</p>
                <p className="text-xs text-stone-400">Quitter votre session JOJ Dakar 2026</p>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;

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

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Trophy, MessageCircle, User, MapPin, Utensils, Camera, Bus, QrCode, Check, Smartphone, CreditCard, Download, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/hooks/useLanguage";
import heroVideo from "@/assets/1YTG Dakar 2026 _ Svelata la mascotte Ayo ad un anno dai Giochi Olimpici Giovanili.mp4";
import restaurantImg from "@/assets/saly-princess-senegal_0122_1107.jpg";
import transportImg from "@/assets/transport-dakar.png";
import attractionImg from "@/assets/musee.png";
import heroDakarImg from "@/assets/program.jpg";
import ayoMascotImg from "@/assets/ayo-mascot-official.png";
import dakar2026LogoImg from "@/assets/hero-dakar.png";
import esimImg from "@/assets/esim.png";

const ESIM_PLANS = [
  { id: "sport",    name: "Pass Sport",    sub: "Spécial Dakar 2026", features: ["10 Go 5G", "Illimités locaux"], price: "2 500" },
  { id: "champion", name: "Pass Champion", sub: "Spécial Dakar 2026", features: ["50 Go 5G", "Illimités locaux"], price: "7 500" },
  { id: "elite",    name: "Pass Elite",    sub: "Spécial Dakar 2026", features: ["Illimité 5G", "Illimités locaux"], price: "15 000" },
] as const;

const EsimQR = () => {
  const S = 21;
  const grid = Array.from({ length: S * S }, (_, i) => {
    const r = Math.floor(i / S), c = i % S;
    if (r <= 6 && c <= 6) return Math.min(r, 6 - r, c, 6 - c) !== 1;
    if (r <= 6 && c >= 14) return Math.min(r, 6 - r, c - 14, 20 - c) !== 1;
    if (r >= 14 && c <= 6) return Math.min(r - 14, 20 - r, c, 6 - c) !== 1;
    if (r === 7 && (c <= 7 || c >= 13)) return false;
    if (c === 7 && (r <= 7 || r >= 13)) return false;
    if (c === 13 && r <= 7) return false;
    if (r === 13 && c <= 7) return false;
    if (r === 6) return c % 2 === 0;
    if (c === 6) return r % 2 === 0;
    return ((r * 73 + c * 37 + r * c * 11) % 100) > 45;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${S}, 1fr)`, width: 180, height: 180, backgroundColor: "white", borderRadius: 12, padding: 14, gap: "1px" }} className="mx-auto">
      {grid.map((on, i) => <div key={i} style={{ backgroundColor: on ? "#0f0f0f" : "transparent" }} />)}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  type EsimStep = "closed" | "plans" | "payment" | "dcb-form" | "confirm" | "qrcode";
  const [esimStep, setEsimStep] = useState<EsimStep>("closed");
  const [selectedPlan, setSelectedPlan] = useState<typeof ESIM_PLANS[number] | null>(null);
  const [dcbForm, setDcbForm] = useState({ name: "", phone: "", idNumber: "" });

  useEffect(() => {
    if (esimStep === "confirm") {
      const t = setTimeout(() => setEsimStep("qrcode"), 2600);
      return () => clearTimeout(t);
    }
  }, [esimStep]);

  const resetEsim = () => {
    setEsimStep("closed");
    setSelectedPlan(null);
    setDcbForm({ name: "", phone: "", idNumber: "" });
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={heroVideo} // ton import de vidéo
        autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

        <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl mx-auto">
          <div className="inline-block px-6 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 mb-4">
            <span className="text-white font-semibold">✨ {t.home.yog2026}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white animate-fade-in tracking-tight">
            {t.home.title}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-light">
            {t.home.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-xl" onClick={() => navigate('/events')}>
              <Calendar className="mr-2 h-5 w-5" />
              {t.home.programButton}
            </Button>
            <Button size="lg" onClick={() => navigate('/discover')} className="text-lg px-10 py-6 bg-secondary hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl text-slate-50">
              <MapPin className="mr-2 h-5 w-5" />
              {t.home.discoverButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Olympic */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">{t.home.featuresTitle}</h2>
            <div className="w-8 h-0.5 bg-[#FFE72E] mx-auto mb-4 rounded-full" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.featuresSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Programme */}
            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/events')}
            >
              <div className="h-36 overflow-hidden bg-stone-100">
                <img src={heroDakarImg} alt="Programme JOJ 2026" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Calendar className="h-3.5 w-3.5 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[14px] text-stone-900">{t.home.programCard}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.programDesc}</p>
              </div>
            </div>

            {/* Résultats */}
            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/results')}
            >
              <div className="h-36 overflow-hidden bg-stone-100">
                <img src={dakar2026LogoImg} alt="Résultats JOJ 2026" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Trophy className="h-3.5 w-3.5 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[14px] text-stone-900">{t.home.resultsCard}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.resultsDesc}</p>
              </div>
            </div>

            {/* Assistant IA */}
            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/assistant')}
            >
              <div className="h-36 overflow-hidden bg-stone-100">
                <img src={ayoMascotImg} alt="AYO Assistant IA" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <MessageCircle className="h-3.5 w-3.5 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[14px] text-stone-900">{t.home.assistantCard}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{t.home.assistantDesc}</p>
              </div>
            </div>

            {/* eSIM JOJ */}
            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => setEsimStep("plans")}
            >
              <div className="h-36 overflow-hidden bg-stone-100 relative">
                <img src={esimImg} alt="eSIM JOJ 2026" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-[#FFE72E]/90 rounded text-[10px] font-bold text-stone-900">5G</div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Smartphone className="h-3.5 w-3.5 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[14px] text-stone-900">eSIM JOJ</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">Connexion 5G instantanée pour Dakar 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">{t.home.tourismTitle}</h2>
            <div className="w-8 h-0.5 bg-[#FFE72E] mx-auto mb-4 rounded-full" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.tourismSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/discover')}
            >
              <div className="h-48 overflow-hidden">
                <img src={restaurantImg} alt="Restaurants de Dakar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Utensils className="h-4 w-4 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-stone-900">{t.home.restaurants}</h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">{t.home.restaurantsDesc}</p>
              </div>
            </div>

            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/discover')}
            >
              <div className="h-48 overflow-hidden">
                <img src={attractionImg} alt="Attractions de Dakar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Camera className="h-4 w-4 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-stone-900">{t.home.attractions}</h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">{t.home.attractionsDesc}</p>
              </div>
            </div>

            <div
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
              onClick={() => navigate('/discover')}
            >
              <div className="h-48 overflow-hidden">
                <img src={transportImg} alt="Transport à Dakar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-200 transition-colors duration-200">
                    <Bus className="h-4 w-4 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-stone-900">{t.home.transport}</h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">{t.home.transportDesc}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/discover')} className="bg-primary hover:bg-primary/90">
              <MapPin className="mr-2 h-5 w-5" />
              {t.home.viewMapButton}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[rgba(232,228,220,1)]">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 leading-tight">
            {t.home.ctaTitle}
          </h2>
          <p className="text-base text-stone-500 leading-relaxed mb-8">
            {t.home.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/assistant')} className="text-sm px-8 py-5 bg-primary hover:bg-primary/90 transition-colors duration-200 font-bold">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t.home.talkToAssistant}
            </Button>
            <Button size="lg" onClick={() => navigate('/profile')} className="text-sm px-8 py-5 bg-primary hover:bg-primary/90 transition-colors duration-200 font-bold">
              <User className="mr-2 h-4 w-4" />
              {t.home.createProfile}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold text-xs text-white">JOJ Dakar 2026</p>
                <p className="text-white/50 text-[11px]">Jeux Olympiques de la Jeunesse</p>
              </div>
              <span className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FFE72E]" />
                <p className="text-white/50 text-[11px]">Dakar, Sénégal</p>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-1 text-[11px] text-white/40 font-semibold uppercase tracking-wider">Compétitions</div>
              <Link to="/events" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Programme</Link>
              <Link to="/results" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Résultats</Link>
              <Link to="/records" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Records</Link>
              <span className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1 text-[11px] text-white/40 font-semibold uppercase tracking-wider">Explorer</div>
              <Link to="/discover" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Dakar</Link>
              <Link to="/virtual-tour" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Visite Virtuelle</Link>
              <Link to="/museum-3d" className="text-white/70 hover:text-white text-xs transition-colors duration-150">Musée 3D</Link>
              <Link to="/assistant" className="text-white/70 hover:text-white text-xs transition-colors duration-150">AYO Chat</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* eSIM Modal */}
      <Dialog open={esimStep !== "closed"} onOpenChange={(open) => !open && resetEsim()}>
        <DialogContent className={esimStep === "plans" ? "sm:max-w-2xl p-0 overflow-hidden" : "sm:max-w-sm p-0 overflow-hidden"}>

          {/* Step 1 — Choose plan */}
          {esimStep === "plans" && (
            <div className="p-8">
              <button onClick={resetEsim} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-stone-900 tracking-tight uppercase">Votre eSIM JOJ</h2>
                <p className="text-stone-500 text-sm mt-2">Choisissez votre forfait et activez votre connexion en quelques secondes.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {ESIM_PLANS.map((plan) => (
                  <div key={plan.id} className="group bg-white rounded-2xl border border-stone-200 p-6 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:border-stone-300 transition-all duration-200">
                    <p className="font-bold text-lg text-stone-900">{plan.name}</p>
                    <p className="text-xs text-stone-400 mb-4">{plan.sub}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-stone-700">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-emerald-600" />
                          </span>
                          <span className="font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-3xl font-black text-stone-900 mb-4 tabular-nums">
                      {plan.price} <span className="text-sm font-semibold text-stone-400">FCFA</span>
                    </p>
                    <button
                      className="w-full py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-colors duration-200"
                      onClick={() => { setSelectedPlan(plan); setEsimStep("payment"); }}
                    >
                      Générer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Payment method */}
          {esimStep === "payment" && selectedPlan && (
            <div className="p-6">
              <button onClick={resetEsim} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-stone-900">Finaliser l'achat</h2>
                <p className="text-stone-500 text-sm mt-1">
                  {selectedPlan.name} — <span className="font-bold text-[#E8580A]">{selectedPlan.price} FCFA</span>
                </p>
              </div>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200 text-left"
                  onClick={() => setEsimStep("confirm")}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Payer via Max it</p>
                    <p className="text-white/80 text-xs">Ouvrir l'application Orange</p>
                  </div>
                </button>
                <button
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#E8580A] hover:bg-orange-600 text-white transition-colors duration-200 text-left"
                  onClick={() => setEsimStep("dcb-form")}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Facturation Opérateur (DCB)</p>
                    <p className="text-white/80 text-xs">Prélever sur mon crédit téléphonique</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2b — DCB form */}
          {esimStep === "dcb-form" && selectedPlan && (
            <div className="p-6">
              <button onClick={resetEsim} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
              <button onClick={() => setEsimStep("payment")} className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 mb-5 transition-colors">
                ← Retour
              </button>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-stone-900">Facturation Opérateur</h2>
                <p className="text-stone-500 text-sm mt-0.5">
                  {selectedPlan.name} — <span className="font-semibold text-stone-700">{selectedPlan.price} FCFA</span>
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    placeholder="ex. Amadou Diallo"
                    value={dcbForm.name}
                    onChange={(e) => setDcbForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-stone-200 px-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Numéro de téléphone</label>
                  <input
                    type="tel"
                    placeholder="ex. +221 77 000 00 00"
                    value={dcbForm.phone}
                    onChange={(e) => setDcbForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-stone-200 px-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">Numéro CNI / Passeport</label>
                  <input
                    type="text"
                    placeholder="ex. 1234567890"
                    value={dcbForm.idNumber}
                    onChange={(e) => setDcbForm((p) => ({ ...p, idNumber: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-stone-200 px-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 bg-white"
                  />
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!dcbForm.name.trim() || !dcbForm.phone.trim() || !dcbForm.idNumber.trim()}
                onClick={() => setEsimStep("confirm")}
              >
                Valider et Générer
              </button>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {esimStep === "confirm" && selectedPlan && (
            <div className="p-8 text-center">
              <button onClick={resetEsim} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-2">Paiement Validé !</h2>
              <p className="text-stone-500 text-sm mb-6">
                Votre transaction pour <span className="font-bold text-stone-800">{selectedPlan.name}</span> a été effectuée
              </p>
              <div className="bg-stone-900 rounded-xl p-4 flex items-start gap-3 text-left">
                <div className="w-9 h-9 bg-[#E8580A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[11px] font-bold text-white uppercase tracking-wide">Orange Money / SN</p>
                    <p className="text-[10px] text-stone-400">Maintenant</p>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Confirmation: Vous avez payé {selectedPlan.price} FCFA pour {selectedPlan.name}.
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-4 animate-pulse">Génération de votre eSIM…</p>
            </div>
          )}

          {/* Step 4 — QR code */}
          {esimStep === "qrcode" && (
            <div className="bg-[#0f1523] p-8 text-center rounded-xl">
              <button onClick={resetEsim} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="w-14 h-14 bg-[#E8580A] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <QrCode className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Prêt à Activer !</h2>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Scannez ce QR Code avec votre appareil<br />photo pour activer votre eSIM JOJ.
              </p>
              <div className="mb-6">
                <EsimQR />
              </div>
              <button
                className="w-full py-3.5 rounded-full bg-white text-stone-900 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors duration-200"
                onClick={resetEsim}
              >
                <Download className="h-4 w-4" />
                Télécharger la configuration
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>;
};
export default Index;
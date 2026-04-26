import { useState, useEffect } from "react";
import {
  MapPin, Clock, ChevronRight, ChevronLeft, Check, Loader2,
  Navigation, Bus, Train, Car, Zap, ArrowRight, X,
} from "lucide-react";

/* ── Static data ── */
const FROM_LOCATIONS = [
  "Plateau / Centre-ville",
  "Almadies / Ngor",
  "Yoff",
  "Ouakam / Mamelles",
  "Parcelles Assainies",
  "Point E / Fann",
  "Mermoz / Sacré-Cœur",
  "Diamniadio",
  "Aéroport AIBD",
];

const JOJ_VENUES = [
  { label: "Dakar Arena", zone: "Diamniadio", lat: 14.7219, lng: -17.0119 },
  { label: "Stade LSS (Léopold Sédar Senghor)", zone: "Dakar", lat: 14.7167, lng: -17.4658 },
  { label: "Complexe Sportif Diamniadio", zone: "Diamniadio", lat: 14.7103, lng: -17.0243 },
  { label: "Stade Me Abdoulaye Wade", zone: "Diamniadio", lat: 14.7135, lng: -17.0085 },
  { label: "Centre Omnisports de Dakar", zone: "Dakar", lat: 14.6996, lng: -17.4477 },
  { label: "Piscine Olympique de Dakar", zone: "Dakar", lat: 14.7051, lng: -17.4524 },
  { label: "CICES (Esplanade des JOJ)", zone: "Dakar", lat: 14.7262, lng: -17.3896 },
  { label: "Plage de Yoff (Voile)", zone: "Yoff", lat: 14.7479, lng: -17.4982 },
];

interface Route {
  id: string;
  label: string;
  tagline: string;
  duration: string;
  price: string;
  icon: "bus" | "train" | "car" | "zap";
  steps: { icon: "bus" | "train" | "car" | "walk"; label: string }[];
  isYango?: boolean;
}

const buildRoutes = (from: string, venue: typeof JOJ_VENUES[0]): Route[] => {
  const toDiamniadio = venue.zone === "Diamniadio";
  const fromDiamniadio = from === "Diamniadio";

  return [
    {
      id: "brt",
      label: "BRT Dakar Express",
      tagline: "Rapide · Climatisé · Direct",
      duration: toDiamniadio ? (fromDiamniadio ? "12 min" : "38 min") : "22 min",
      price: toDiamniadio ? "500 FCFA" : "300 FCFA",
      icon: "bus",
      steps: [
        { icon: "walk", label: `Marche jusqu'à l'arrêt BRT (~ 5 min)` },
        { icon: "bus", label: `BRT ligne A → ${toDiamniadio ? "Diamniadio Hub" : "Plateau"}` },
        { icon: "walk", label: `Navette JOJ → ${venue.label} (incluse)` },
      ],
    },
    {
      id: "ter",
      label: "TER (Train Express Régional)",
      tagline: toDiamniadio ? "Moins cher · Confort assis · 37 km" : "Centre-ville · Arrêt gare",
      duration: toDiamniadio ? "45 min" : "30 min",
      price: toDiamniadio ? "1 500 FCFA" : "800 FCFA",
      icon: "train",
      steps: [
        { icon: "bus", label: "Bus ou taxi jusqu'à la Gare de Dakar" },
        { icon: "train", label: `TER → ${toDiamniadio ? "Gare Diamniadio" : "Gare Plateau"}` },
        { icon: "walk", label: `Navette JOJ → ${venue.label}` },
      ],
    },
    {
      id: "yango",
      label: "Yango (VTC)",
      tagline: "Porte-à-porte · Sans stress",
      duration: toDiamniadio ? "55 min" : "25 min",
      price: toDiamniadio ? "6 000–9 000 FCFA" : "2 500–4 500 FCFA",
      icon: "car",
      isYango: true,
      steps: [
        { icon: "car", label: "Prise en charge à votre adresse" },
        { icon: "car", label: `Trajet direct vers ${venue.label}` },
      ],
    },
  ];
};

const RELAY_POINTS = (venue: typeof JOJ_VENUES[0]) => [
  { name: `Arrêt BRT · ${venue.label}`, distance: "150 m", status: "active" as const, info: "Ligne A — départ toutes les 8 min" },
  { name: `Gare TER ${venue.zone}`, distance: "600 m", status: "active" as const, info: "Prochain train dans 14 min" },
  { name: `Navette JOJ — Zone ${venue.zone}`, distance: "80 m", status: "busy" as const, info: "Temps d'attente estimé : 6 min" },
  { name: "Station Orange Money", distance: "200 m", status: "active" as const, info: "Recharge wave · Transfert · Paiement" },
];

/* ── Orange Money mock flow ── */
const OrangeMoneyModal = ({ amount, onClose }: { amount: string; onClose: () => void }) => {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [phone, setPhone] = useState("");

  const confirm = () => {
    if (phone.length < 9) return;
    setStep("loading");
    setTimeout(() => setStep("success"), 2200);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full sm:max-w-xs bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">Orange Money</p>
              <p className="text-[10px] text-stone-400">Paiement sécurisé</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
            <X size={14} className="text-stone-500" />
          </button>
        </div>

        <div className="p-5">
          {step === "form" && (
            <>
              <p className="text-center text-2xl font-black text-stone-900 mb-1">{amount}</p>
              <p className="text-center text-xs text-stone-400 mb-5">Montant à payer</p>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">Numéro Orange Money</label>
              <div className="flex gap-2 mb-5">
                <div className="px-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm text-stone-500 flex-shrink-0">+221</div>
                <input
                  type="tel"
                  placeholder="77 XXX XX XX"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                  className="flex-1 px-3 py-2.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <button
                onClick={confirm}
                disabled={phone.length < 9}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Confirmer le paiement
              </button>
            </>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center py-8 gap-4">
              <Loader2 size={32} className="text-orange-500 animate-spin" />
              <div className="text-center">
                <p className="font-semibold text-stone-900 text-sm">Traitement en cours…</p>
                <p className="text-xs text-stone-400 mt-1">Vous allez recevoir un SMS de confirmation</p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center py-6 gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check size={26} className="text-emerald-600" />
              </div>
              <div className="text-center">
                <p className="font-bold text-stone-900 text-base">Paiement confirmé !</p>
                <p className="text-xs text-stone-500 mt-1">Votre billet est prêt. Un SMS a été envoyé au +221 {phone}.</p>
              </div>
              <div className="w-full bg-stone-50 rounded-xl p-3 border border-stone-100 text-center">
                <p className="text-[10px] text-stone-400 uppercase font-semibold tracking-wide mb-1">Référence</p>
                <p className="text-sm font-bold text-stone-900 tabular-nums">OM-JOJ-{Math.floor(Math.random() * 900000) + 100000}</p>
              </div>
              <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors">
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ════════════════ MAIN COMPONENT ════════════════ */
const TransportPlanner = () => {
  const [step, setStep] = useState<"select" | "routes" | "relay">("select");
  const [fromIdx, setFromIdx] = useState(0);
  const [venueIdx, setVenueIdx] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showOrangeMoney, setShowOrangeMoney] = useState(false);
  const [omAmount, setOmAmount] = useState("");

  const venue = JOJ_VENUES[venueIdx];

  const handleSearch = () => {
    setRoutes(buildRoutes(FROM_LOCATIONS[fromIdx], venue));
    setStep("routes");
  };

  const handleChooseRoute = (route: Route) => {
    setSelectedRoute(route);
    if (route.isYango) {
      window.open("https://yango.com/en_sn/", "_blank");
    } else {
      setStep("relay");
    }
  };

  const handlePayOrangeMoney = (price: string) => {
    setOmAmount(price);
    setShowOrangeMoney(true);
  };

  const modeIcon = (icon: Route["icon"] | "walk") => {
    if (icon === "bus") return <Bus size={13} />;
    if (icon === "train") return <Train size={13} />;
    if (icon === "car") return <Car size={13} />;
    if (icon === "walk") return <MapPin size={13} />;
    return <Bus size={13} />;
  };

  const statusStyle = (s: "active" | "busy" | "closed") => {
    if (s === "active") return "bg-emerald-100 text-emerald-700";
    if (s === "busy") return "bg-amber-100 text-amber-700";
    return "bg-stone-100 text-stone-400";
  };
  const statusLabel = (s: "active" | "busy" | "closed") => {
    if (s === "active") return "En service";
    if (s === "busy") return "Chargé";
    return "Hors service";
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-stone-400">
        <button onClick={() => setStep("select")} className={`font-semibold ${step === "select" ? "text-stone-900" : "hover:text-stone-600 transition-colors"}`}>
          Trajet
        </button>
        {step !== "select" && (
          <>
            <ChevronRight size={12} />
            <button onClick={() => setStep("routes")} className={`font-semibold ${step === "routes" ? "text-stone-900" : "hover:text-stone-600 transition-colors"}`}>
              Options
            </button>
          </>
        )}
        {step === "relay" && (
          <>
            <ChevronRight size={12} />
            <span className="font-semibold text-stone-900">Points de relais</span>
          </>
        )}
      </div>

      {/* ── STEP 1 : Select ── */}
      {step === "select" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                Depuis
              </label>
              <select
                value={fromIdx}
                onChange={e => setFromIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-200 appearance-none"
              >
                {FROM_LOCATIONS.map((loc, i) => (
                  <option key={loc} value={i}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <div className="w-7 h-7 rounded-full border border-stone-200 bg-white flex items-center justify-center">
                <ArrowRight size={13} className="text-stone-400" />
              </div>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                Destination JOJ
              </label>
              <select
                value={venueIdx}
                onChange={e => setVenueIdx(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-200 appearance-none"
              >
                {JOJ_VENUES.map((v, i) => (
                  <option key={v.label} value={i}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected venue info */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-stone-900">{venue.label}</p>
              <p className="text-xs text-stone-500">Zone {venue.zone} · JOJ Dakar 2026</p>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation size={15} />
            Trouver mon trajet
          </button>
        </div>
      )}

      {/* ── STEP 2 : Routes ── */}
      {step === "routes" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-bold text-stone-900">
                {FROM_LOCATIONS[fromIdx]} <span className="text-stone-400 font-normal">→</span> {venue.label}
              </p>
              <p className="text-xs text-stone-400">{routes.length} options disponibles</p>
            </div>
            <button onClick={() => setStep("select")} className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors">
              <ChevronLeft size={13} /> Modifier
            </button>
          </div>

          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                    {modeIcon(route.icon)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{route.label}</p>
                    <p className="text-[11px] text-stone-400">{route.tagline}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-stone-900">{route.duration}</p>
                  <p className="text-[11px] text-primary font-semibold">{route.price}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-1.5 mb-4">
                {route.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-500">
                      {modeIcon(s.icon)}
                    </span>
                    {s.label}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleChooseRoute(route)}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${route.isYango ? "bg-yellow-400 text-stone-900 hover:bg-yellow-300" : "bg-stone-900 text-white hover:bg-stone-700"}`}
              >
                {route.isYango ? <Car size={14} /> : <Bus size={14} />}
                {route.isYango ? "Ouvrir Yango" : "Choisir ce trajet"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── STEP 3 : Relay points ── */}
      {step === "relay" && selectedRoute && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-stone-900">Points de relais</p>
              <p className="text-xs text-stone-400">Autour de {venue.label}</p>
            </div>
            <button onClick={() => setStep("routes")} className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors">
              <ChevronLeft size={13} /> Retour
            </button>
          </div>

          {/* Selected route recap */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
              {modeIcon(selectedRoute.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">{selectedRoute.label}</p>
              <p className="text-[10px] text-stone-500">{selectedRoute.duration} · {selectedRoute.price}</p>
            </div>
            <button
              onClick={() => handlePayOrangeMoney(selectedRoute.price)}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-[11px] font-bold whitespace-nowrap flex items-center gap-1 hover:bg-orange-600 transition-colors"
            >
              <Zap size={11} /> Payer
            </button>
          </div>

          {/* Relay list */}
          <div className="space-y-2">
            {RELAY_POINTS(venue).map((pt, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-stone-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 leading-tight">{pt.name}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{pt.info}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle(pt.status)}`}>
                    {statusLabel(pt.status)}
                  </span>
                  <span className="text-[10px] text-stone-400">{pt.distance}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Orange Money CTA */}
          <button
            onClick={() => handlePayOrangeMoney(selectedRoute.price)}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Zap size={15} />
            Payer via Orange Money · {selectedRoute.price}
          </button>
        </div>
      )}

      {/* Orange Money modal */}
      {showOrangeMoney && (
        <OrangeMoneyModal amount={omAmount} onClose={() => setShowOrangeMoney(false)} />
      )}
    </div>
  );
};

export default TransportPlanner;

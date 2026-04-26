import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { Search, Calendar, MapPin, Trophy, Sparkles, ArrowLeft, Clock, Play } from "lucide-react";
import { getCompetitionSports, getMobilisationSports } from "@/data/joj2026Sports";
import type { Sport } from "@/data/joj2026Sports";
import { useLanguage } from "@/hooks/useLanguage";

/* ── Sport detail overlay ── */
const SportDetail = ({ sport, onClose }: { sport: Sport; onClose: () => void }) => {
  const genderLabel = (g: string) => {
    if (g === "H") return "Hommes";
    if (g === "F") return "Femmes";
    return "Mixte";
  };
  const genderColor = (g: string) => {
    if (g === "H") return "bg-blue-50 text-blue-700 border-blue-200";
    if (g === "F") return "bg-pink-50 text-pink-700 border-pink-200";
    return "bg-stone-100 text-stone-600 border-stone-200";
  };

  return (
    <div className="flex flex-col" style={{ maxHeight: "90vh" }}>
      {/* Image header */}
      <div className="relative h-52 flex-shrink-0 bg-stone-200">
        {sport.image ? (
          <img src={sport.image} alt={sport.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: sport.gradient }}>
            {sport.emoji}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowLeft size={16} className="text-stone-700" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: sport.color }} />
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/65 backdrop-blur-sm rounded-full text-white text-[11px] font-medium">
            <MapPin size={10} /> {sport.venue.split(",")[0].trim()}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-stone-900 leading-tight">
              {sport.name} <span className="text-lg">{sport.emoji}</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
              <MapPin size={11} /> {sport.venue}
            </p>
          </div>
          <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-semibold ${
            sport.category === "competition"
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 border border-stone-200"
          }`}>
            {sport.category === "competition" ? "Compétition" : "Mobilisation"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-600 leading-relaxed">{sport.description}</p>

        {/* Events schedule */}
        {sport.events.length > 0 && (
          <div>
            <p className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <Calendar size={14} className="text-stone-400" /> Programme ({sport.events.length} épreuves)
            </p>
            <div className="space-y-2">
              {sport.events.map(event => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-center flex-shrink-0 w-14">
                    <p className="text-[10px] text-stone-400 leading-tight">
                      {new Date(event.date).toLocaleDateString("fr-FR", { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-xs font-bold text-stone-900 flex items-center justify-center gap-0.5 mt-0.5">
                      <Clock size={9} className="text-stone-400" /> {event.time}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{event.title}</p>
                    <p className="text-[11px] text-stone-400">{event.phase}</p>
                  </div>
                  <span className={`flex-shrink-0 px-1.5 py-0.5 rounded border text-[10px] font-bold ${genderColor(event.gender)}`}>
                    {genderLabel(event.gender)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video embed */}
        {sport.videoUrl && (
          <div>
            <p className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-1.5">
              <Play size={14} className="text-stone-400" /> Vidéo
            </p>
            <div className="rounded-xl overflow-hidden border border-stone-200">
              <iframe
                src={sport.videoUrl}
                className="w-full"
                style={{ height: 180 }}
                title={sport.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-stone-100 flex-shrink-0">
        <button
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sport.venue)}`, "_blank")}
          className="w-full py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors"
        >
          <MapPin size={14} /> Itinéraire vers {sport.venue.split(",")[0].trim()}
        </button>
      </div>
    </div>
  );
};

/* ════════════════ MAIN COMPONENT ════════════════ */
const Events = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"competition" | "mobilisation">("competition");
  const [venueFilter, setVenueFilter] = useState("all");
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const competitionSports = getCompetitionSports();
  const mobilisationSports = getMobilisationSports();

  const filteredSports = useMemo(() => {
    const base = activeTab === "competition" ? competitionSports : mobilisationSports;
    return base.filter(sport => {
      const matchesSearch =
        sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVenue =
        venueFilter === "all" || sport.venue.toLowerCase().includes(venueFilter.toLowerCase());
      return matchesSearch && matchesVenue;
    });
  }, [activeTab, searchTerm, venueFilter, competitionSports, mobilisationSports]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 px-4">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">JOJ Dakar 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">{t.events.title}</h1>
          <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-3 mb-3" />
          <p className="text-stone-500 text-base">{t.events.subtitle}</p>
        </div>

        {/* Tabs + filters row */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("competition")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${activeTab === "competition" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            >
              <Trophy size={14} /> {t.events.competition}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeTab === "competition" ? "bg-white/20" : "bg-stone-100 text-stone-500"}`}>25</span>
            </button>
            <button
              onClick={() => setActiveTab("mobilisation")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${activeTab === "mobilisation" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            >
              <Sparkles size={14} /> {t.events.mobilisation}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeTab === "mobilisation" ? "bg-white/20" : "bg-stone-100 text-stone-500"}`}>10</span>
            </button>
          </div>

          {/* Venue filter + Search */}
          <div className="flex items-center gap-2">
            <select
              value={venueFilter}
              onChange={e => setVenueFilter(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-stone-200 bg-white text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-200 appearance-none cursor-pointer"
            >
              <option value="all">{t.events.allVenues}</option>
              <option value="dakar">Dakar</option>
              <option value="diamniadio">Diamniadio</option>
              <option value="saly">Saly</option>
            </select>
            <div className="relative w-40">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder={t.events.searchPlaceholder}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-8 pr-3 rounded-lg border border-stone-200 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
              />
            </div>
          </div>
        </div>

        {/* Sport cards grid */}
        {filteredSports.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-5xl mb-3">🔍</div>
            <p>{t.events.noResults}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSports.map(sport => (
              <div
                key={sport.id}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                onClick={() => setSelectedSport(sport)}
              >
                {/* Image */}
                <div className="h-32 relative overflow-hidden bg-stone-100">
                  {sport.image ? (
                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-4xl" style={{ background: sport.gradient }}>
                      {sport.emoji}
                    </div>
                  )}
                  {/* Venue pill */}
                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/65 backdrop-blur-sm rounded-full text-white text-[10px] font-medium leading-none">
                      <MapPin size={9} /> {sport.venue.split(",")[0].trim()}
                    </span>
                  </div>
                  {/* Color bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-80" style={{ backgroundColor: sport.color }} />
                </div>

                {/* Card body */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-1.5 mb-1">
                    <h3 className="font-semibold text-sm text-stone-900 leading-snug">{sport.name}</h3>
                    <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      sport.category === "competition"
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
                    }`}>
                      {sport.category === "competition" ? "Compét." : "Mobil."}
                    </span>
                  </div>
                  {sport.events.length > 0 && (
                    <p className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Calendar size={10} /> {sport.events.length} épreuve{sport.events.length > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inline detail overlay */}
      {selectedSport && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setSelectedSport(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <SportDetail sport={selectedSport} onClose={() => setSelectedSport(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { MapPin, Trophy } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import recordsFile from "@/data/joj_records_avec_images.json";

const { records } = recordsFile as { records: any[] };

const EDITIONS = ["Toutes", "Dakar 2026", "Buenos Aires 2018", "Nanjing 2014", "Singapour 2010"];

const badgeStyle = (badge: string): string => {
  switch (badge) {
    case "Or":         return "bg-[#FFE72E] text-stone-900";
    case "Argent":     return "bg-stone-200 text-stone-700";
    case "Record":     return "bg-primary text-white";
    case "Dakar 2026": return "bg-primary text-white";
    case "Africain":   return "bg-primary/15 text-primary";
    case "Historique": return "bg-stone-800 text-white";
    case "Nouveau":    return "bg-stone-800 text-white";
    default:           return "bg-stone-900 text-white";
  }
};

const sportEmoji = (sport: string): string => {
  if (sport.includes("Natation"))        return "🏊";
  if (sport.includes("Athlétisme"))      return "🏃";
  if (sport.includes("Judo"))            return "🥋";
  if (sport.includes("Basketball"))      return "🏀";
  if (sport.includes("Volleyball"))      return "🏐";
  if (sport.includes("Tennis de Table")) return "🏓";
  if (sport.includes("Plongeon"))        return "🤿";
  if (sport.includes("Breaking"))        return "💿";
  if (sport.includes("Skateboard"))      return "🛹";
  if (sport.includes("Marche"))          return "🚶";
  return "🏅";
};

const Records = () => {
  useLanguage();
  const [edition, setEdition] = useState("Toutes");

  const filtered = edition === "Toutes"
    ? records
    : records.filter((r: any) => r.edition === edition);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-10 px-4">
        {/* Page header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">JOJ Dakar 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">Records & Performances</h1>
          <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-3 mb-3" />
          <p className="text-stone-500 text-base">Champions et performances marquants des Jeux Olympiques de la Jeunesse</p>
        </motion.div>

        {/* Edition filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {EDITIONS.map(ed => (
            <button
              key={ed}
              onClick={() => setEdition(ed)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                edition === ed
                  ? "bg-stone-900 text-white"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              {ed}
            </button>
          ))}
        </div>

        {/* Records grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((record: any, idx: number) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] transition-all duration-200 overflow-hidden"
            >
              {/* Athlete / event photo */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={record.image.url}
                  alt={record.image.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      const span = document.createElement("span");
                      span.style.fontSize = "3rem";
                      span.textContent = sportEmoji(record.sport);
                      parent.appendChild(span);
                    }
                  }}
                />
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${badgeStyle(record.badge)}`}>
                    {record.badge}
                  </span>
                </div>
                {/* Country code */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                    {record.country_code}
                  </span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-4 space-y-2.5">
                <div>
                  <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wide">
                    {record.sport} · {record.gender}
                  </p>
                  <p className="text-xl font-black text-stone-900 tabular-nums leading-tight mt-0.5">
                    {record.record_value}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
                  <p className="font-semibold text-sm text-stone-900 truncate">{record.holder}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{record.country}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Trophy size={10} className="text-stone-400" /> {record.edition}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} /> {record.city} · {record.year}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed border-l-2 border-stone-200 pl-2.5 italic">
                  {record.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Records;

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Search, Heart, ArrowLeft, MapPin, Clock, Phone, Star, Navigation,
  Utensils, Landmark, Tag, ChevronLeft, ChevronRight,
} from "lucide-react";
import restaurantsRaw from "@/data/restaurants.json";
import attractionsFile from "@/data/attractions_senegal.json";

const restaurants = (restaurantsRaw as any[]).filter((r: any) => r.actif !== false);
const attractions = (attractionsFile as any).attractions as any[];

const ITEMS_PER_PAGE = 4;

/* ── Helpers ── */
const priceLabel = (range: string, avg: number) => {
  if (range === "low") return `${Math.max(0, avg - 500).toLocaleString()} – ${(avg + 1500).toLocaleString()} FCFA`;
  if (range === "mid") return `${(avg - 2000).toLocaleString()} – ${(avg + 5000).toLocaleString()} FCFA`;
  return `${(avg - 5000).toLocaleString()} – ${(avg + 8000).toLocaleString()} FCFA`;
};

const matchScore = (rating: number, id: string) =>
  Math.min(99, Math.round(rating * 20) + (id.charCodeAt(id.length - 1) % 5) - 2);

/* Seeded-random stats so values are consistent per item but vary across items */
const placeStats = (id: string, rating: number, priceHint: number) => {
  const seed = id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const distRaw = (seed % 83) / 10 + 0.4; // 0.4 → 8.7 km
  const distStr = distRaw < 1 ? `${Math.round(distRaw * 1000)} m` : `${distRaw.toFixed(1)} km`;
  const priceStr = priceHint === 0 ? "Gratuit" : `${priceHint.toLocaleString()} FCFA`;
  const ratingStr = `Noté ${rating}/5`;
  return { distStr, priceStr, ratingStr };
};

/* Unsplash fallback images by attraction category */
const ATT_IMAGES: Record<string, string> = {
  monument:          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
  musée:             "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
  site_historique:   "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
  site_naturel:      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
  parc_naturel:      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
  plage:             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  marché:            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
  site_religieux:    "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800",
  réserve_animalière:"https://images.unsplash.com/photo-1547321942-fb3c8c3c21e5?w=800",
  parc_animalier:    "https://images.unsplash.com/photo-1519811726651-3ee7b2af8e04?w=800",
};

const attImage = (a: any): string => {
  const url = a.images?.[0] ?? "";
  if (url && !url.includes("wikipedia") && !url.includes("wikimedia")) return url;
  return ATT_IMAGES[a.category] ?? "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800";
};

/* ── Stat badges — project theme colours ── */
const StatBadges = ({ id, rating, price }: { id: string; rating: number; price: number }) => {
  const { distStr, priceStr, ratingStr } = placeStats(id, rating, price);
  return (
    <div className="flex flex-wrap gap-1">
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-600">
        <MapPin size={9} /> {distStr}
      </span>
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
        <Tag size={9} /> {priceStr}
      </span>
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-600">
        <Star size={9} className="fill-stone-500" /> {ratingStr}
      </span>
    </div>
  );
};

/* ── Pagination bar ── */
const Pagination = ({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) => {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        className="w-8 h-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      ><ChevronLeft size={15} /></button>
      <span className="text-sm text-stone-500 font-medium tabular-nums">{page + 1} / {total}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === total - 1}
        className="w-8 h-8 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      ><ChevronRight size={15} /></button>
    </div>
  );
};

/* ════════════════════ MAIN COMPONENT ════════════════════ */
const Discover = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"restaurants" | "attractions">("restaurants");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<{ type: string; data: any } | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);

  /* Reset page on tab / search change */
  useEffect(() => { setPage(0); }, [activeTab, searchQuery]);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine_type.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAttractions = attractions.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentList = activeTab === "restaurants" ? filteredRestaurants : filteredAttractions;
  const totalPages = Math.ceil(currentList.length / ITEMS_PER_PAGE);
  const pageSlice = currentList.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  /* ── RESTAURANT CARD ── */
  const RestaurantCard = ({ r }: { r: any }) => {
    const score = matchScore(r.rating, r.id);
    const cuisine = r.cuisine_type.slice(0, 2).map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(" · ");
    const dish = r.menu[0];
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200" onClick={() => setSelected({ type: "restaurant", data: r })}>
        <div className="relative h-40 overflow-hidden bg-stone-100">
          <img src={r.image} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-bold text-white bg-primary">{score}% match</span>
          <button onClick={(e) => toggleFav(r.id, e)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
            <Heart size={12} className={favorites.has(r.id) ? "fill-red-500 text-red-500" : "text-stone-400"} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 py-2">
            <p className="text-white font-bold text-sm leading-tight truncate">{r.name}</p>
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-[11px] flex items-center gap-0.5"><MapPin size={9} />{r.zone}</p>
              <p className="text-yellow-400 text-[11px] font-bold flex items-center gap-0.5"><Star size={9} className="fill-yellow-400" />{r.rating}</p>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-stone-500">{cuisine}</p>
            <p className="text-[11px] font-medium text-stone-700">{priceLabel(r.price_range, r.avg_price)}</p>
          </div>
          <div className="bg-stone-50 rounded-lg px-2.5 py-1.5 border border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide flex items-center gap-1"><Utensils size={9} /> Plat Recommandé</p>
            <p className="text-[11px] font-semibold text-stone-800 truncate">{dish.name}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {[...r.dietary, ...r.tags.slice(0, 2)].slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase border border-stone-200 text-stone-500">{tag.replace(/_/g, " ")}</span>
            ))}
          </div>
          <div>
            <p className="text-[10px] text-stone-400 font-medium mb-1">Pourquoi recommandé</p>
            <StatBadges id={r.id} rating={r.rating} price={r.avg_price} />
          </div>
        </div>
      </div>
    );
  };

  /* ── ATTRACTION CARD ── */
  const AttractionCard = ({ a }: { a: any }) => {
    const score = matchScore(a.rating, a.id);
    const img = attImage(a);
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200" onClick={() => setSelected({ type: "attraction", data: a })}>
        <div className="relative h-40 overflow-hidden bg-stone-200">
          <img src={img} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-bold text-white bg-primary">{score}% match</span>
          <button onClick={(e) => toggleFav(a.id, e)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
            <Heart size={12} className={favorites.has(a.id) ? "fill-red-500 text-red-500" : "text-stone-400"} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 py-2">
            <p className="text-white font-bold text-sm leading-tight truncate">{a.name}</p>
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-[11px] flex items-center gap-0.5"><MapPin size={9} />{a.location.city}</p>
              <p className="text-yellow-400 text-[11px] font-bold flex items-center gap-0.5"><Star size={9} className="fill-yellow-400" />{a.rating}</p>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-stone-500 capitalize">{a.category.replace(/_/g, " ")}</p>
            <p className="text-[11px] font-medium text-stone-700">{a.entry_fee.adult === 0 ? "Gratuit" : `${a.entry_fee.adult.toLocaleString()} FCFA`}</p>
          </div>
          <p className="text-[11px] text-stone-600 line-clamp-2">{a.description}</p>
          <div className="flex flex-wrap gap-1">
            {a.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase border border-stone-200 text-stone-500">{tag}</span>
            ))}
          </div>
          <div>
            <p className="text-[10px] text-stone-400 font-medium mb-1">Pourquoi recommandé</p>
            <StatBadges id={a.id} rating={a.rating} price={a.entry_fee.adult} />
          </div>
        </div>
      </div>
    );
  };

  /* ── RESTAURANT DETAIL ── */
  const RestaurantDetail = ({ r }: { r: any }) => {
    const score = matchScore(r.rating, r.id);
    const { distStr, priceStr, ratingStr } = placeStats(r.id, r.rating, r.avg_price);
    const cuisine = r.cuisine_type.slice(0, 2).map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(" · ");
    const dish = r.menu[0];
    return (
      <div className="flex flex-col" style={{ maxHeight: "90vh" }}>
        <div className="relative h-52 flex-shrink-0">
          <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
          <button onClick={() => setSelected(null)} className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"><ArrowLeft size={16} /></button>
          <button onClick={(e) => toggleFav(r.id, e)} className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
            <Heart size={15} className={favorites.has(r.id) ? "fill-red-500 text-red-500" : "text-stone-400"} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-stone-900 leading-tight">{r.name}</h2>
            <div className="flex-shrink-0 border border-stone-200 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] text-stone-400 font-semibold uppercase">NOTE</p>
              <p className="flex items-center gap-1 font-bold text-stone-900 text-sm"><Star size={11} className="fill-yellow-400 text-yellow-400" />{r.rating}</p>
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-stone-500"><span>{cuisine}</span><span>·</span><MapPin size={12} /><span>{r.zone}</span></p>
          <div className="flex flex-wrap gap-1.5">
            {[...r.dietary, ...r.tags.slice(0, 4)].slice(0, 6).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-primary/40 text-primary bg-primary/5 uppercase">{tag.replace(/_/g, " ")}</span>
            ))}
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-stone-800">Pourquoi recommandé</p>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-primary">SCORE {score}/100</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600"><MapPin size={10} /> {distStr}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"><Tag size={10} /> {priceStr}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600"><Star size={10} className="fill-stone-500" /> {ratingStr}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{r.description.slice(0, 130)}…</p>
          </div>
          <div>
            <p className="text-sm font-bold text-stone-800 mb-2">Plat recommandé</p>
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex items-center gap-3">
              <div className="w-11 h-11 bg-stone-200 rounded-xl flex items-center justify-center flex-shrink-0"><Utensils size={18} className="text-stone-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 text-sm truncate">{dish.name}</p>
                <p className="text-[11px] text-stone-400">Spécialité · demandé 3× aujourd'hui</p>
              </div>
              <p className="font-bold text-primary text-sm whitespace-nowrap">{dish.price.toLocaleString()} FCFA</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-stone-800">Menu</p>
              <span className="text-xs text-stone-400">{r.menu.length} plats</span>
            </div>
            {r.menu.map((item: any) => (
              <div key={item.name} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                <p className="text-sm text-stone-700">{item.name}</p>
                <p className="text-sm font-semibold text-stone-900 ml-4 whitespace-nowrap">{item.price.toLocaleString()} FCFA</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold text-stone-800 mb-3">Infos pratiques</p>
            <div className="space-y-2">
              {[
                { icon: <MapPin size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />, main: `${r.zone}, Dakar`, sub: "à 10 min à pied" },
                { icon: <Clock size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />, main: r.opening_hours, sub: "Ouvert maintenant", subGreen: true },
                { icon: <Phone size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />, main: r.phone, sub: "Réserver par téléphone" },
              ].map(({ icon, main, sub, subGreen }, i) => (
                <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                  {icon}
                  <div>
                    <p className="text-sm text-stone-800">{main}</p>
                    <p className={`text-xs ${subGreen ? "text-emerald-600 font-semibold" : "text-stone-400"}`}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-stone-100 flex gap-3 flex-shrink-0">
          <button onClick={() => window.open(`tel:${r.phone}`, "_self")} className="w-11 h-11 border border-stone-200 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors">
            <Phone size={16} />
          </button>
          <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`, "_blank")} className="flex-1 py-3 rounded-xl font-semibold text-sm text-white bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors">
            <Navigation size={15} /> Itinéraire · {placeStats(r.id, r.rating, r.avg_price).distStr}
          </button>
        </div>
      </div>
    );
  };

  /* ── ATTRACTION DETAIL ── */
  const AttractionDetail = ({ a }: { a: any }) => {
    const score = matchScore(a.rating, a.id);
    const { distStr, priceStr, ratingStr } = placeStats(a.id, a.rating, a.entry_fee.adult);
    const img = attImage(a);
    return (
      <div className="flex flex-col" style={{ maxHeight: "90vh" }}>
        <div className="relative h-52 flex-shrink-0 bg-stone-200">
          <img src={img} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
          <button onClick={() => setSelected(null)} className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"><ArrowLeft size={16} /></button>
          <button onClick={(e) => toggleFav(a.id, e)} className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
            <Heart size={15} className={favorites.has(a.id) ? "fill-red-500 text-red-500" : "text-stone-400"} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-stone-900 leading-tight">{a.name}</h2>
            <div className="flex-shrink-0 border border-stone-200 rounded-xl px-3 py-2 text-center">
              <p className="text-[10px] text-stone-400 font-semibold uppercase">NOTE</p>
              <p className="flex items-center gap-1 font-bold text-stone-900 text-sm"><Star size={11} className="fill-yellow-400 text-yellow-400" />{a.rating}</p>
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-stone-500 capitalize">{a.category.replace(/_/g, " ")}<span>·</span><MapPin size={12} />{a.location.city}</p>
          <div className="flex flex-wrap gap-1.5">
            {a.tags.slice(0, 5).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] font-semibold border border-primary/40 text-primary bg-primary/5 uppercase">{tag}</span>
            ))}
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-stone-800">Pourquoi le visiter</p>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-primary">SCORE {score}/100</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600"><MapPin size={10} /> {distStr}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"><Tag size={10} /> {priceStr}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600"><Star size={10} className="fill-stone-500" /> {ratingStr}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{a.description.slice(0, 160)}…</p>
          </div>
          <div>
            <p className="text-sm font-bold text-stone-800 mb-3">Infos pratiques</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                <MapPin size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-stone-800">{a.location.address}</p>
              </div>
              <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                <Clock size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-stone-800">{a.opening_hours.open} – {a.opening_hours.close}</p>
                  <p className="text-xs text-stone-400">{a.opening_hours.days.slice(0, 3).join(", ")}{a.opening_hours.days.length > 3 ? "…" : ""}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                <Tag size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-stone-800">{a.entry_fee.adult === 0 ? "Entrée gratuite" : `Adulte : ${a.entry_fee.adult.toLocaleString()} ${a.entry_fee.currency}`}</p>
                  {a.entry_fee.note && <p className="text-xs text-stone-400">{a.entry_fee.note}</p>}
                </div>
              </div>
              {a.contact?.phone && (
                <div className="flex items-start gap-3 bg-stone-50 rounded-xl p-3">
                  <Phone size={15} className="text-stone-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">{a.contact.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-stone-100 flex gap-3 flex-shrink-0">
          {a.contact?.phone && (
            <button onClick={() => window.open(`tel:${a.contact.phone}`, "_self")} className="w-11 h-11 border border-stone-200 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors">
              <Phone size={16} />
            </button>
          )}
          <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${a.location.coordinates.lat},${a.location.coordinates.lng}`, "_blank")} className="flex-1 py-3 rounded-xl font-semibold text-sm text-white bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors">
            <Navigation size={15} /> Voir sur la carte
          </button>
        </div>
      </div>
    );
  };

  /* ════════ RENDER ════════ */
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">

        {/* Page header */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">Sénégal</p>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">{t.discover.title}</h1>
          <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-2 mb-2" />
          <p className="text-stone-500 text-sm">{t.discover.subtitle}</p>
        </div>

        {/* Tabs + Search on same row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("restaurants")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${activeTab === "restaurants" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            ><Utensils size={14} /> Restaurants</button>
            <button
              onClick={() => setActiveTab("attractions")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${activeTab === "attractions" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            ><Landmark size={14} /> Attractions</button>
          </div>

          {/* Compact search */}
          <div className="relative w-48 flex-shrink-0">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-stone-200 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
            />
          </div>
        </div>

        {/* 2-column grid — 4 items only */}
        {pageSlice.length === 0
          ? <p className="text-center text-stone-400 py-16">Aucun résultat trouvé.</p>
          : (
            <div className="grid grid-cols-2 gap-4">
              {pageSlice.map((item: any) =>
                activeTab === "restaurants"
                  ? <RestaurantCard key={item.id} r={item} />
                  : <AttractionCard key={item.id} a={item} />
              )}
            </div>
          )
        }

        {/* Pagination */}
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </div>

      {/* Detail overlay */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {selected.type === "restaurant"
              ? <RestaurantDetail r={selected.data} />
              : <AttractionDetail a={selected.data} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Medal, Trophy, Clock, Zap, Star, PersonStanding, Waves, Footprints, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Records = () => {
  const { t } = useLanguage();

  const athleticsRecords = [
    { event: "100m Hommes", holder: "Usain Bolt", country: "Jamaïque", record: "9.58s", year: 2009, location: "Berlin" },
    { event: "100m Femmes", holder: "Florence Griffith-Joyner", country: "USA", record: "10.49s", year: 1988, location: "Indianapolis" },
    { event: "Saut en longueur", holder: "Mike Powell", country: "USA", record: "8.95m", year: 1991, location: "Tokyo" },
    { event: "Saut en hauteur", holder: "Stefka Kostadinova", country: "Bulgarie", record: "2.09m", year: 1987, location: "Rome" },
    { event: "Marathon", holder: "Eliud Kipchoge", country: "Kenya", record: "2:01:09", year: 2022, location: "Berlin" },
    { event: "400m Haies", holder: "Karsten Warholm", country: "Norvège", record: "45.94s", year: 2021, location: "Tokyo" },
  ];

  const swimmingRecords = [
    { event: "50m Nage Libre H", holder: "César Cielo", country: "Brésil", record: "20.91s", year: 2009, location: "São Paulo" },
    { event: "50m Nage Libre F", holder: "Sarah Sjöström", country: "Suède", record: "23.61s", year: 2017, location: "Budapest" },
    { event: "100m Papillon H", holder: "Caeleb Dressel", country: "USA", record: "49.45s", year: 2019, location: "Gwangju" },
    { event: "200m Dos F", holder: "Kaylee McKeown", country: "Australie", record: "2:03.14", year: 2021, location: "Tokyo" },
    { event: "400m 4 Nages H", holder: "Leon Marchand", country: "France", record: "4:02.50", year: 2024, location: "Paris" },
  ];

  const youthRecords = [
    { event: "100m - U18", holder: "Amadou Diallo", country: "Sénégal", record: "10.23s", year: 2024, location: "Dakar", category: "Nouveau" },
    { event: "Basketball 3x3", holder: "Équipe Ghana", country: "Ghana", record: "12 victoires", year: 2024, location: "Accra", category: "Série" },
    { event: "4x100m Relais", holder: "Équipe Sénégal", country: "Sénégal", record: "3:42.15", year: 2025, location: "Dakar", category: "National" },
    { event: "Skateboard Street", holder: "Fatou Cissé", country: "Sénégal", record: "285.5 pts", year: 2025, location: "Dakar", category: "Nouveau" },
    { event: "Breaking Battle", holder: "B-Boy Thierno", country: "Sénégal", record: "Champion", year: 2025, location: "Dakar", category: "Nouveau" },
  ];

  const RecordCard = ({ record, index }: { record: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <div className="bg-white rounded-xl border border-stone-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] transition-all duration-200 p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-400 tabular-nums">#{index + 1}</span>
            {record.category && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-900 text-white">
                {record.category}
              </span>
            )}
          </div>
          <Trophy className="h-4 w-4 text-stone-300 flex-shrink-0" />
        </div>

        <h3 className="font-semibold text-[15px] text-stone-900 mb-4 leading-snug">{record.event}</h3>

        <div className="bg-stone-50 rounded-lg border border-stone-100 p-4 mb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-stone-400 mb-0.5 flex items-center gap-1">
                <Star className="h-3 w-3" /> {t.records.holder}
              </p>
              <p className="font-semibold text-stone-900 text-sm">{record.holder}</p>
              <p className="text-xs text-stone-500 mt-0.5">{record.country}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] text-stone-400 mb-0.5 flex items-center justify-end gap-1">
                <Zap className="h-3 w-3" /> Record
              </p>
              <p className="font-black text-2xl text-stone-900 tabular-nums leading-none">{record.record}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {record.year}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {record.location}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-10 px-4">
        {/* Compact header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">JOJ Dakar 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-1">{t.records.title}</h1>
          <div className="w-8 h-0.5 bg-[#FFE72E] rounded-full mt-3 mb-3" />
          <p className="text-stone-500 text-base">{t.records.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="youth" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-11 bg-stone-100 p-1 rounded-xl mb-8">
            <TabsTrigger
              value="youth"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <Footprints className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.youth}</span>
              <span className="sm:hidden">{t.records.youthShort}</span>
            </TabsTrigger>
            <TabsTrigger
              value="athletics"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <PersonStanding className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.athletics}</span>
              <span className="sm:hidden">{t.records.athleticsShort}</span>
            </TabsTrigger>
            <TabsTrigger
              value="swimming"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <Waves className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.swimming}</span>
              <span className="sm:hidden">{t.records.swimmingShort}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youth">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {youthRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="athletics">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {athleticsRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swimming">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {swimmingRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fun Facts */}
        <div className="mt-10 bg-white rounded-xl border border-stone-200 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-[15px] text-stone-900 flex items-center gap-2 mb-6">
            <Zap className="h-4 w-4 text-stone-400" />
            {t.records.didYouKnow}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
              <p className="font-semibold text-sm text-stone-800 flex items-center gap-2 mb-1.5">
                <PersonStanding className="h-4 w-4 text-stone-400 flex-shrink-0" /> {t.records.factSpeed}
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">{t.records.factSpeedDesc}</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
              <p className="font-semibold text-sm text-stone-800 flex items-center gap-2 mb-1.5">
                <Waves className="h-4 w-4 text-stone-400 flex-shrink-0" /> {t.records.factSwim}
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">{t.records.factSwimDesc}</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
              <p className="font-semibold text-sm text-stone-800 flex items-center gap-2 mb-1.5">
                <Medal className="h-4 w-4 text-stone-400 flex-shrink-0" /> {t.records.factYoungest}
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">{t.records.factYoungestDesc}</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
              <p className="font-semibold text-sm text-stone-800 flex items-center gap-2 mb-1.5">
                <Trophy className="h-4 w-4 text-stone-400 flex-shrink-0" /> {t.records.factAfrica}
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">{t.records.factAfricaDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;

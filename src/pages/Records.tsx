import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Medal, Trophy, Award, Clock, Zap, Star, PersonStanding, Waves, Footprints } from "lucide-react";
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
      transition={{ delay: index * 0.08 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-secondary" />
              <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
              {record.category && (
                <Badge className="bg-primary text-primary-foreground text-xs">{record.category}</Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{record.event}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="p-4 bg-primary rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
                  <Star className="h-3 w-3" /> {t.records.holder}
                </p>
                <p className="font-bold text-primary-foreground">{record.holder}</p>
                <p className="text-sm text-primary-foreground/80">{record.country}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-primary-foreground/70 flex items-center justify-end gap-1">
                  <Zap className="h-3 w-3" /> Record
                </p>
                <p className="font-black text-2xl text-primary-foreground">{record.record}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {record.year}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" /> {record.location}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 px-4">
        {/* Hero */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-2xl p-8 bg-primary text-white">
            <div className="flex items-center gap-4">
              <Medal className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0" />
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold mb-2">{t.records.title}</h1>
                <p className="text-lg opacity-90">{t.records.subtitle}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="youth" className="w-full">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 h-12">
            <TabsTrigger value="youth" className="text-sm font-semibold flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Footprints className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.youth}</span>
              <span className="sm:hidden">{t.records.youthShort}</span>
            </TabsTrigger>
            <TabsTrigger value="athletics" className="text-sm font-semibold flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white">
              <PersonStanding className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.athletics}</span>
              <span className="sm:hidden">{t.records.athleticsShort}</span>
            </TabsTrigger>
            <TabsTrigger value="swimming" className="text-sm font-semibold flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Waves className="h-4 w-4" />
              <span className="hidden sm:inline">{t.records.swimming}</span>
              <span className="sm:hidden">{t.records.swimmingShort}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youth" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {youthRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="athletics" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {athleticsRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swimming" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {swimmingRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fun Facts */}
        <Card className="mt-10 border border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-secondary" />
              {t.records.didYouKnow}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-xl">
                <p className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                  <PersonStanding className="h-5 w-5" /> {t.records.factSpeed}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{t.records.factSpeedDesc}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                  <Waves className="h-5 w-5" /> {t.records.factSwim}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{t.records.factSwimDesc}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                  <Medal className="h-5 w-5" /> {t.records.factYoungest}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{t.records.factYoungestDesc}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                  <Trophy className="h-5 w-5" /> {t.records.factAfrica}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{t.records.factAfricaDesc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Records;

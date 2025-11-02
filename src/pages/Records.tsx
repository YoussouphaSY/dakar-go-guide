import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Medal, Trophy, Award, Clock, Zap, Star, TrendingUp } from "lucide-react";

const Records = () => {
  const athleticsRecords = [
    {
      event: "100m Hommes",
      holder: "Usain Bolt",
      country: "Jamaïque",
      record: "9.58s",
      year: 2009,
      location: "Berlin",
      medal: "gold",
    },
    {
      event: "100m Femmes",
      holder: "Florence Griffith-Joyner",
      country: "USA",
      record: "10.49s",
      year: 1988,
      location: "Indianapolis",
      medal: "gold",
    },
    {
      event: "Saut en longueur Hommes",
      holder: "Mike Powell",
      country: "USA",
      record: "8.95m",
      year: 1991,
      location: "Tokyo",
      medal: "gold",
    },
    {
      event: "Saut en hauteur Femmes",
      holder: "Stefka Kostadinova",
      country: "Bulgarie",
      record: "2.09m",
      year: 1987,
      location: "Rome",
      medal: "gold",
    },
    {
      event: "Marathon Hommes",
      holder: "Eliud Kipchoge",
      country: "Kenya",
      record: "2:01:09",
      year: 2022,
      location: "Berlin",
      medal: "gold",
    },
    {
      event: "400m Haies Hommes",
      holder: "Karsten Warholm",
      country: "Norvège",
      record: "45.94s",
      year: 2021,
      location: "Tokyo",
      medal: "gold",
    },
  ];

  const swimmingRecords = [
    {
      event: "50m Nage Libre Hommes",
      holder: "César Cielo",
      country: "Brésil",
      record: "20.91s",
      year: 2009,
      location: "São Paulo",
      medal: "gold",
    },
    {
      event: "50m Nage Libre Femmes",
      holder: "Sarah Sjöström",
      country: "Suède",
      record: "23.61s",
      year: 2017,
      location: "Budapest",
      medal: "gold",
    },
    {
      event: "100m Papillon Hommes",
      holder: "Caeleb Dressel",
      country: "USA",
      record: "49.45s",
      year: 2019,
      location: "Gwangju",
      medal: "gold",
    },
    {
      event: "200m Dos Femmes",
      holder: "Kaylee McKeown",
      country: "Australie",
      record: "2:03.14",
      year: 2021,
      location: "Tokyo",
      medal: "gold",
    },
    {
      event: "400m 4 Nages Hommes",
      holder: "Leon Marchand",
      country: "France",
      record: "4:02.50",
      year: 2024,
      location: "Paris",
      medal: "gold",
    },
  ];

  const youthRecords = [
    {
      event: "100m - Moins de 18 ans",
      holder: "Amadou Diallo",
      country: "Sénégal",
      record: "10.23s",
      year: 2024,
      location: "Dakar",
      category: "Nouveau",
      medal: "gold",
    },
    {
      event: "Basketball 3x3",
      holder: "Équipe Ghana",
      country: "Ghana",
      record: "Victoires: 12",
      year: 2024,
      location: "Accra",
      category: "Série",
      medal: "gold",
    },
    {
      event: "Natation 4x100m Relais",
      holder: "Équipe Sénégal",
      country: "Sénégal",
      record: "3:42.15",
      year: 2025,
      location: "Dakar",
      category: "National",
      medal: "gold",
    },
    {
      event: "Skateboard Street",
      holder: "Fatou Cissé",
      country: "Sénégal",
      record: "285.5 pts",
      year: 2025,
      location: "Dakar",
      category: "Nouveau",
      medal: "gold",
    },
    {
      event: "Breaking Battle",
      holder: "B-Boy Thierno",
      country: "Sénégal",
      record: "Champion",
      year: 2025,
      location: "Dakar",
      category: "Nouveau",
      medal: "gold",
    },
  ];

  const RecordCard = ({ record, index }: { record: any; index: number }) => {
    const MedalIcon = record.medal === "gold" ? Trophy : record.medal === "silver" ? Award : Medal;
    const medalColor = record.medal === "gold" ? "text-secondary" : 
                      record.medal === "silver" ? "text-gray-400" : 
                      "text-bronze";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.03, y: -5 }}
      >
        <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-card opacity-5" />
          
          <CardHeader className="relative">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <MedalIcon className={`h-10 w-10 ${medalColor}`} />
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                      #{index + 1}
                    </Badge>
                    {record.category && (
                      <Badge variant="default" className="bg-secondary text-secondary-foreground">
                        {record.category}
                      </Badge>
                    )}
                  </div>
                </div>
              <CardTitle className="text-xl font-bold">{record.event}</CardTitle>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="h-10 w-10 text-secondary" />
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 relative">
          {/* Record Display */}
          <div className="p-5 bg-gradient-trophy rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/80 mb-1 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Détenteur
                </p>
                <p className="font-bold text-xl text-primary-foreground">{record.holder}</p>
                <p className="text-sm text-primary-foreground/90 font-medium">{record.country}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary-foreground/80 mb-1 flex items-center justify-end gap-1">
                  <Zap className="h-3 w-3" />
                  Record
                </p>
                <motion.p 
                  className="font-black text-3xl text-primary-foreground"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {record.record}
                </motion.p>
              </div>
            </div>
          </div>
          
          {/* Info Section */}
          <div className="flex items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span className="font-medium">{record.year}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4 text-accent" />
              <span className="font-medium">{record.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header />
      
      <div className="container py-8">
        {/* Hero Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-hero text-primary-foreground shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Medal className="h-16 w-16" />
                </motion.div>
                <div>
                  <h1 className="text-5xl text-slate-900 font-bold mb-2">Records Olympiques</h1>
                  <p className="text-xl opacity-90 text-muted-foreground font-medium">
                    Les performances légendaires qui ont marqué l'histoire du sport
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <Tabs defaultValue="youth" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14 bg-muted">
            <TabsTrigger value="youth" className="text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🏃 Records Jeunesse
            </TabsTrigger>
            <TabsTrigger value="athletics" className="text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              ⚡ Athlétisme
            </TabsTrigger>
            <TabsTrigger value="swimming" className="text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🏊 Natation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youth" className="mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <Card className="bg-primary text-white border-none shadow-lg">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-14 w-14" />
                    <div>
                      <h3 className="text-3xl font-black mb-1">Records des Jeux de la Jeunesse</h3>
                      <p className="opacity-90 text-lg font-medium">
                        Les meilleures performances des jeunes athlètes pour Dakar 2026
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youthRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="athletics" className="mt-8 ">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  !text-slate-900">
              {athleticsRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swimming" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  !text-slate-900">
              {swimmingRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mt-12 border-2 border-accent/20 shadow-xl">
            <CardHeader className="bg-gradient-card">
              <CardTitle className="text-3xl font-black text-primary-foreground flex items-center gap-3">
                <Zap className="h-8 font-bold text-slate-900 w-8" />
                <p className=" text-slate-900"> Le saviez-vous ?</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="p-6 bg-primary/5 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-bold text-xl mb-3 text-primary flex items-center gap-2">
                    🏃‍♂️ Vitesse maximale
                  </p>
                  <p className="text-base text-foreground leading-relaxed">
                    Usain Bolt a atteint une vitesse de pointe de 44.72 km/h lors de son record du 100m - plus rapide qu'une voiture en ville !
                  </p>
                </motion.div>
                <motion.div 
                  className="p-6 bg-secondary/5 rounded-xl border-2 border-secondary/20 hover:border-secondary/40 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-bold text-xl mb-3 text-secondary flex items-center gap-2">
                    🏊‍♀️ Nage la plus rapide
                  </p>
                  <p className="text-base text-foreground leading-relaxed">
                    Le record du 50m nage libre équivaut à nager à environ 8.5 km/h - une vitesse incroyable dans l'eau !
                  </p>
                </motion.div>
                <motion.div 
                  className="p-6 bg-accent/5 rounded-xl border-2 border-accent/20 hover:border-accent/40 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-bold text-xl mb-3 text-accent flex items-center gap-2">
                    🥇 Plus jeune champion
                  </p>
                  <p className="text-base text-foreground leading-relaxed">
                    Le plus jeune médaillé d'or olympique avait seulement 13 ans - l'âge de beaucoup de participants aux JOJ 2026 !
                  </p>
                </motion.div>
                <motion.div 
                  className="p-6 bg-primary/5 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-bold text-xl mb-3 text-primary flex items-center gap-2">
                    📊 Records africains
                  </p>
                  <p className="text-base text-foreground leading-relaxed">
                    L'Afrique détient plusieurs records mondiaux en athlétisme, notamment en course de fond - une fierté pour le continent !
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Records;

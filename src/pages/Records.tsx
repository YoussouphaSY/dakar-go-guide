import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, TrendingUp, Clock } from "lucide-react";

const Records = () => {
  const athleticsRecords = [
    {
      event: "100m Hommes",
      holder: "Usain Bolt",
      country: "Jamaïque",
      record: "9.58s",
      year: 2009,
      location: "Berlin",
    },
    {
      event: "100m Femmes",
      holder: "Florence Griffith-Joyner",
      country: "USA",
      record: "10.49s",
      year: 1988,
      location: "Indianapolis",
    },
    {
      event: "Saut en longueur Hommes",
      holder: "Mike Powell",
      country: "USA",
      record: "8.95m",
      year: 1991,
      location: "Tokyo",
    },
    {
      event: "Saut en hauteur Femmes",
      holder: "Stefka Kostadinova",
      country: "Bulgarie",
      record: "2.09m",
      year: 1987,
      location: "Rome",
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
    },
    {
      event: "50m Nage Libre Femmes",
      holder: "Sarah Sjöström",
      country: "Suède",
      record: "23.61s",
      year: 2017,
      location: "Budapest",
    },
    {
      event: "100m Papillon Hommes",
      holder: "Caeleb Dressel",
      country: "USA",
      record: "49.45s",
      year: 2019,
      location: "Gwangju",
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
    },
    {
      event: "Basketball 3x3",
      holder: "Équipe Ghana",
      country: "Ghana",
      record: "Victoires: 12",
      year: 2024,
      location: "Accra",
      category: "Série",
    },
    {
      event: "Natation 4x100m Relais",
      holder: "Équipe Sénégal",
      country: "Sénégal",
      record: "3:42.15",
      year: 2025,
      location: "Dakar",
      category: "National",
    },
  ];

  const RecordCard = ({ record, index }: { record: any; index: number }) => (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-2xl text-primary">#{index + 1}</span>
              {record.category && (
                <Badge variant="secondary">{record.category}</Badge>
              )}
            </div>
            <CardTitle className="text-lg">{record.event}</CardTitle>
          </div>
          <Trophy className="h-8 w-8 text-secondary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-4 bg-gradient-card rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Détenteur</p>
              <p className="font-bold text-lg">{record.holder}</p>
              <p className="text-sm text-muted-foreground">{record.country}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Record</p>
              <p className="font-bold text-2xl text-primary">{record.record}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{record.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>{record.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Records Olympiques
          </h1>
          <p className="text-muted-foreground">
            Découvrez les records mondiaux et olympiques des différentes disciplines
          </p>
        </div>

        <Tabs defaultValue="youth" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="youth">Records Jeunesse</TabsTrigger>
            <TabsTrigger value="athletics">Athlétisme</TabsTrigger>
            <TabsTrigger value="swimming">Natation</TabsTrigger>
          </TabsList>

          <TabsContent value="youth" className="mt-6">
            <div className="mb-4">
              <Card className="bg-gradient-hero text-primary-foreground">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-12 w-12" />
                    <div>
                      <h3 className="text-2xl font-bold">Records des Jeux de la Jeunesse</h3>
                      <p className="opacity-90">
                        Les meilleures performances des jeunes athlètes africains
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youthRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="athletics" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {athleticsRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swimming" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {swimmingRecords.map((record, idx) => (
                <RecordCard key={idx} record={record} index={idx} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fun Facts Section */}
        <Card className="mt-8 bg-muted">
          <CardHeader>
            <CardTitle>Le saviez-vous ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold mb-2">🏃‍♂️ Vitesse maximale</p>
                <p className="text-sm text-muted-foreground">
                  Usain Bolt a atteint une vitesse de pointe de 44.72 km/h lors de son record du 100m
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold mb-2">🏊‍♀️ Nage la plus rapide</p>
                <p className="text-sm text-muted-foreground">
                  Le record du 50m nage libre équivaut à nager à environ 8.5 km/h
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold mb-2">🥇 Plus jeune champion</p>
                <p className="text-sm text-muted-foreground">
                  Le plus jeune médaillé d'or olympique avait seulement 13 ans
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold mb-2">📊 Records africains</p>
                <p className="text-sm text-muted-foreground">
                  L'Afrique détient plusieurs records mondiaux en athlétisme, notamment en course de fond
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Records;

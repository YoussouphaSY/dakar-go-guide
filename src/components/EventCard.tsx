import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  category?: string;
}

const EventCard = ({ title, sport, date, time, location, category }: EventCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-300 cursor-pointer bg-gradient-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {category && (
            <Badge variant="secondary" className="ml-2">
              {category}
            </Badge>
          )}
        </div>
        <Badge className="w-fit mt-2">{sport}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;

import { supabase } from "@/integrations/supabase/client";

export const importSportsEvents = async () => {
  const eventsData = [
    { id: 10401, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m nage libre", gender_type: "Masculine" },
    { id: 10402, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m nage libre", gender_type: "Masculine" },
    { id: 10403, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m nage libre", gender_type: "Masculine" },
    { id: 10404, sport_name: "Natation", venue_id: 1, discipline_detail: "400 m nage libre", gender_type: "Masculine" },
    { id: 10405, sport_name: "Natation", venue_id: 1, discipline_detail: "800 m nage libre", gender_type: "Masculine" },
    { id: 10406, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m dos", gender_type: "Masculine" },
    { id: 10407, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m dos", gender_type: "Masculine" },
    { id: 10408, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m dos", gender_type: "Masculine" },
    { id: 10409, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m brasse", gender_type: "Masculine" },
    { id: 10410, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m brasse", gender_type: "Masculine" },
    { id: 10411, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m brasse", gender_type: "Masculine" },
    { id: 10412, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m papillon", gender_type: "Masculine" },
    { id: 10413, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m papillon", gender_type: "Masculine" },
    { id: 10414, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m papillon", gender_type: "Masculine" },
    { id: 10415, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m quatre nages", gender_type: "Masculine" },
    { id: 10416, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m nage libre", gender_type: "Féminine" },
    { id: 10417, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m nage libre", gender_type: "Féminine" },
    { id: 10418, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m nage libre", gender_type: "Féminine" },
    { id: 10419, sport_name: "Natation", venue_id: 1, discipline_detail: "400 m nage libre", gender_type: "Féminine" },
    { id: 10420, sport_name: "Natation", venue_id: 1, discipline_detail: "800 m nage libre", gender_type: "Féminine" },
    { id: 10421, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m dos", gender_type: "Féminine" },
    { id: 10422, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m dos", gender_type: "Féminine" },
    { id: 10423, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m dos", gender_type: "Féminine" },
    { id: 10424, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m brasse", gender_type: "Féminine" },
    { id: 10425, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m brasse", gender_type: "Féminine" },
    { id: 10426, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m brasse", gender_type: "Féminine" },
    { id: 10427, sport_name: "Natation", venue_id: 1, discipline_detail: "50 m papillon", gender_type: "Féminine" },
    { id: 10428, sport_name: "Natation", venue_id: 1, discipline_detail: "100 m papillon", gender_type: "Féminine" },
    { id: 10429, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m papillon", gender_type: "Féminine" },
    { id: 10430, sport_name: "Natation", venue_id: 1, discipline_detail: "200 m quatre nages", gender_type: "Féminine" },
    { id: 60101, sport_name: "TIR A L'ARC", venue_id: 6, discipline_detail: "Epreuve individuelle", gender_type: "Masculine" },
    { id: 60102, sport_name: "TIR A L'ARC", venue_id: 6, discipline_detail: "Epreuve individuelle", gender_type: "Féminine" },
    { id: 60103, sport_name: "TIR A L'ARC", venue_id: 6, discipline_detail: "Epreuve par équipes mixtes", gender_type: "Mixte/Ouverte" },
    // Add more events here - truncated for brevity
  ];

  try {
    const { error } = await supabase
      .from("sports_events")
      .upsert(eventsData, { onConflict: "id" });

    if (error) throw error;
    return { success: true, count: eventsData.length };
  } catch (error) {
    console.error("Error importing sports events:", error);
    return { success: false, error };
  }
};

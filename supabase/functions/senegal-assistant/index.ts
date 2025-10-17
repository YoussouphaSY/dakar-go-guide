import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es un assistant IA expert sur le Sénégal et les Jeux Olympiques de la Jeunesse Dakar 2026. 

RÔLE ET MISSION:
- Tu représentes la culture sénégalaise avec fierté et authenticité
- Tu es passionné par l'histoire, la culture, les traditions et le patrimoine du Sénégal
- Tu connais parfaitement le programme des JOJ Dakar 2026
- Tu parles français couramment avec des expressions locales quand c'est approprié

CONNAISSANCES CLÉS SUR LE SÉNÉGAL:

Histoire:
- Indépendance en 1960 avec Léopold Sédar Senghor comme premier président
- Gorée: symbole mondial de la traite négrière, classée UNESCO
- Riche histoire précoloniale avec les royaumes wolof et mandingue
- Dakar fondée en 1857, capitale depuis 1902

Culture et Traditions:
- Teranga: l'hospitalité sénégalaise légendaire
- Griots: gardiens de la tradition orale et de la mémoire collective
- Musique: mbalax popularisé par Youssou N'Dour et Baaba Maal
- Danse: sabar et autres danses traditionnelles
- Cuisine: thiéboudienne (plat national), yassa, mafé, pastels

Patrimoine et Sites:
- Île de Gorée et la Maison des Esclaves
- Monument de la Renaissance Africaine (52m de haut)
- Lac Rose (Lac Retba) - étape finale du rallye Paris-Dakar
- Mosquées historiques et architecture coloniale
- Marchés traditionnels: Sandaga, Kermel
- Parc National du Niokolo-Koba

Sports au Sénégal:
- Lutte sénégalaise: sport national et fierté culturelle
- Football: Lions de la Téranga, champions d'Afrique 2021
- Basket: tradition forte avec des joueurs NBA
- Culture sportive en plein essor

JOJ DAKAR 2026:
- Premier événement olympique en Afrique continentale
- 28 sports au programme
- Lieux principaux: Dakar Arena, Stade Iba Mar Diop, Tour de l'Œuf, Plage de Saly
- Message: Excellence, jeunesse africaine, innovation
- 4-22 novembre 2026

STYLE DE COMMUNICATION:
- Chaleureux et accueillant (teranga)
- Pédagogique mais pas condescendant
- Utilise des anecdotes et histoires culturelles
- Mélange modernité et traditions
- Montre la fierté nationale sans être arrogant
- Encourage la découverte du Sénégal

LANGUES:
Tu réponds principalement en français, mais tu peux mentionner:
- Wolof: langue la plus parlée
- Quelques expressions wolof courantes: "Nanga def?" (Comment ça va?), "Jërëjëf" (Merci)
- Autres langues nationales: pulaar, sérère, mandingue

Sois enthousiaste, culturellement riche, et fais découvrir le Sénégal authentique!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte. Veuillez réessayer dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits épuisés. Veuillez contacter l'administrateur." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erreur de communication avec l'IA");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in senegal-assistant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

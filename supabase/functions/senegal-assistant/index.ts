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
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langInstructions: Record<string, string> = {
      fr: "Tu réponds en français. Tu peux glisser quelques mots en wolof quand c'est naturel, mais reste principalement en français.",
      en: "You respond in English. You may use some Wolof words when natural, but stay mainly in English.",
      wo: "Danga wax ci wolof bu dëgg. Jëfandikool wolof authentique du Sénégal.",
    };

    const systemPrompt = `Tu es AYO, l'assistant officiel des Jeux Olympiques de la Jeunesse Dakar 2026.

PERSONNALITÉ:
- Tu es chaleureux, enthousiaste mais posé. Tu parles comme un ami cultivé, pas comme une encyclopédie.
- Tu fais des phrases courtes et naturelles. Tu ne fais JAMAIS de listes à puces sauf si on te le demande.
- Tu racontes des histoires, tu donnes des anecdotes. Tu es conversationnel.
- ${langInstructions[language] || langInstructions.fr}

STYLE D'ÉCRITURE:
- Phrases courtes et percutantes. Pas de pavés.
- Utilise des paragraphes courts (2-3 phrases max par paragraphe).
- Sois direct: va droit au but avant de développer.
- Utilise le markdown avec parcimonie: **gras** pour les noms propres importants, pas plus.
- NE FAIS PAS de listes à puces ou numérotées sauf demande explicite.
- Parle comme un humain passionné, pas comme un robot.

CONNAISSANCES:
- JOJ Dakar 2026: 4-22 novembre 2026, 28 sports, premier événement olympique en Afrique continentale
- Lieux: Dakar Arena, Stade Iba Mar Diop, Tour de l'Œuf, Plage de Saly
- Culture sénégalaise: teranga, griots, mbalax, thiéboudienne, lutte sénégalaise
- Patrimoine: Gorée, Monument de la Renaissance Africaine, Lac Rose, mosquées historiques
- Sport: Lions de la Téranga (foot), champions d'Afrique 2021, tradition basket NBA

EXPRESSIONS WOLOF COURANTES:
Nanga def? (ça va?), Jërëjëf (merci), Dalal ak djam (bienvenue), Teranga (hospitalité)

Sois naturel et passionné. Fais découvrir le Sénégal comme si tu parlais à un ami.`;

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
          JSON.stringify({ error: "Limite de requêtes atteinte. Réessayez dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits épuisés." }),
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

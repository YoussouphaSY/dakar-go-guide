/**
 * Edge Function : senegal-assistant
 * 
 * Description :
 * Fonction serverless qui alimente l'assistant IA multilingue des JOJ Dakar 2026
 * 
 * Fonctionnalités :
 * - Traite les messages utilisateurs en 3 langues (FR, EN, WO)
 * - Utilise Lovable AI avec Gemini 2.5 Flash pour générer des réponses intelligentes
 * - Maintient un contexte conversationnel avec l'historique des messages
 * - Adapte le prompt système selon la langue sélectionnée
 * - Support CORS pour les appels depuis le frontend
 * - Streaming des réponses en temps réel
 * 
 * Variables d'environnement requises :
 * - LOVABLE_API_KEY : Clé API Lovable AI (configurée automatiquement)
 * 
 * Endpoint : POST /functions/v1/senegal-assistant
 * 
 * Body attendu :
 * {
 *   "messages": Array,            // Historique des messages [{ role, content }]
 *   "language": "fr|en|wo"        // Langue sélectionnée
 * }
 * 
 * Réponse :
 * Stream (Server-Sent Events) - Réponse générée chunk par chunk
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Configuration CORS pour permettre les requêtes cross-origin depuis le frontend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Autorise toutes les origines (à restreindre en production)
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Handler principal de la fonction
 * Traite toutes les requêtes HTTP entrantes
 */
serve(async (req) => {
  // Gestion des requêtes OPTIONS (preflight CORS)
  // Les navigateurs envoient une requête OPTIONS avant les requêtes POST pour vérifier les permissions CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extraction des données de la requête POST
    const { messages, language } = await req.json();

    // Récupération de la clé API Lovable AI depuis les variables d'environnement
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // Vérification de la présence de la clé API
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    /**
     * Instructions spécifiques à chaque langue
     * Définit comment l'IA doit répondre selon la langue sélectionnée
     */
    const languageInstructions = {
      fr: "Tu réponds UNIQUEMENT en français. N'utilise aucune expression dans une autre langue (pas de wolof, pas d'anglais). Reste strictement en français.",
      en: "You respond ONLY in English. Do not use expressions from any other language (no Wolof, no French). Stay strictly in English.",
      wo: "Danga wax REKK ci wolof bu dëgg. Bul jëfandikoo benn xarala ci yeneen làkk (fransé wala anglais). Wolof rekk."
    };

    /**
     * Prompt système : Instructions complètes pour l'IA
     * 
     * Sections :
     * - Rôle et mission de l'assistant
     * - Connaissances sur le Sénégal (histoire, culture, patrimoine)
     * - Informations sur les JOJ 2026
     * - Style de communication souhaité
     * - Expressions wolof courantes
     * 
     * Le prompt est adapté dynamiquement selon la langue sélectionnée
     */
    const systemPrompt = `Tu es un assistant IA expert sur le Sénégal et les Jeux Olympiques de la Jeunesse Dakar 2026.

RÔLE ET MISSION:
- Tu représentes la culture sénégalaise avec fierté et authenticité
- Tu es passionné par l'histoire, la culture, les traditions et le patrimoine du Sénégal
- Tu connais parfaitement le programme des JOJ Dakar 2026
- ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.fr}

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

LANGUES ET EXPRESSIONS WOLOF:
Le wolof est la langue la plus parlée au Sénégal. Expressions courantes:
- "Nanga def?" (Comment ça va?)
- "Jërëjëf" (Merci)
- "Mangi fi" (Je suis là)
- "Dalal ak djam" (Paix et bienvenue)
- "Teranga" (Hospitalité)
- "Yalla" (Dieu)
- "Dañu ko bokk" (Nous sommes ensemble)
- "Jamm rekk" (Paix seulement)

Si l'utilisateur parle en wolof, réponds en wolof authentique avec des explications culturelles riches!

Sois enthousiaste, culturellement riche, et fais découvrir le Sénégal authentique!`;

    /**
     * Appel à l'API Lovable AI
     * 
     * Modèle utilisé : google/gemini-2.5-flash
     * - Performant pour les conversations multilingues
     * - Balance entre qualité et rapidité
     * - Support du streaming pour réponses en temps réel
     * 
     * Messages envoyés :
     * 1. Message système (systemPrompt) : Instructions pour l'IA
     * 2. Messages de l'historique : Contexte de la conversation
     */
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Modèle IA utilisé
        messages: [
          { role: "system", content: systemPrompt }, // Instructions système
          ...messages, // Historique de la conversation
        ],
        stream: true, // Active le streaming des réponses
      }),
    });

    /**
     * Gestion des erreurs de l'API
     * - 429: Limite de requêtes atteinte
     * - 402: Crédits épuisés
     * - Autres: Erreurs génériques
     */
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

    /**
     * Retourne le stream de réponse au client
     * Les données arrivent chunk par chunk via Server-Sent Events
     */
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    // Gestion des erreurs globales
    console.error("Error in senegal-assistant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

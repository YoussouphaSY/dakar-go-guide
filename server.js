import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 5000;

// Middleware pour gérer les requêtes CORS
app.use(cors());

// Middleware pour limiter les requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
});
app.use(limiter);

// Clé API pour football-data.org (utilisez une variable d'environnement)
const API_TOKEN = process.env.FOOTBALL_API_TOKEN || "f75a691df8f24e799f258040f0ab1e8a";
// const API_TOKEN = process.env.FOOTBALL_API_TOKEN || "83e6cd4034c9461aae16a98f10941f46";

// Logger pour les requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route pour récupérer les matchs
app.get("/api/matches", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/FL1/matches", {
      headers: { "X-Auth-Token": API_TOKEN },
    });
    const data = await response.json();
    console.log("Données des matchs :", data.matches);
    res.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});

// Route pour récupérer les détails d'un match
app.get("/api/matches/:id", async (req, res) => {
  const matchId = req.params.id; // Récupère l'ID du match depuis l'URL
  try {
    const response = await fetch(`https://api.football-data.org/v4/matches/${matchId}`, {
      headers: { "X-Auth-Token": API_TOKEN },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erreur API: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data); // Retourne les données du match
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du match :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});

// Route pour récupérer les compétitions
app.get("/api/competitions", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions", {
      headers: { "X-Auth-Token": API_TOKEN },
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: `Erreur API: ${response.statusText}` });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des compétitions :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
# 🏅 Application JOJ Dakar 2026 - Documentation Complète

## 📋 Table des matières
- [Vue d'ensemble](#vue-densemble)
- [Architecture du projet](#architecture-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Structure des dossiers](#structure-des-dossiers)
- [Backend (Lovable Cloud / Supabase)](#backend-lovable-cloud--supabase)
- [Frontend (React + Vite)](#frontend-react--vite)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Installation et développement](#installation-et-développement)
- [Déploiement](#déploiement)
- [Guide de modification](#guide-de-modification)

---

## 🎯 Vue d'ensemble

Application web complète pour les **Jeux Olympiques de la Jeunesse Dakar 2026**. Elle combine :
- 📅 Suivi en temps réel des événements sportifs
- 🤖 Assistant IA multilingue (Français, Wolof, Pulaar, Anglais)
- 🗺️ Guide touristique interactif de Dakar
- 🏛️ Visite virtuelle 3D du Musée des Civilisations Noires
- 👤 Gestion des profils utilisateurs
- 🔔 Système de notifications

---

## 🏗️ Architecture du projet

```
Application Full-Stack
│
├── Frontend (React + TypeScript + Vite)
│   ├── Interface utilisateur moderne avec Tailwind CSS
│   ├── Composants UI réutilisables (shadcn/ui)
│   ├── Gestion d'état avec Zustand
│   └── Navigation React Router
│
└── Backend (Lovable Cloud / Supabase)
    ├── Base de données PostgreSQL
    ├── Authentification utilisateurs
    ├── Edge Functions (serverless)
    ├── Stockage de fichiers
    └── Real-time subscriptions
```

---

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI accessibles
- **React Router** - Navigation
- **TanStack Query** - Gestion des requêtes API
- **Zustand** - Gestion d'état légère
- **React Three Fiber** - Rendu 3D (musée)
- **Leaflet** - Cartes interactives
- **Framer Motion** - Animations

### Backend
- **Lovable Cloud** - Backend managé
- **Supabase** - Plateforme backend (PostgreSQL, Auth, Storage)
- **Edge Functions** - Fonctions serverless (Deno)
- **PostgreSQL** - Base de données relationnelle
- **Row Level Security (RLS)** - Sécurité des données

### IA & APIs
- **OpenAI API** - Assistant IA multilingue
- **Web Speech API** - Reconnaissance et synthèse vocale

---

## 📁 Structure des dossiers

```
joj-dakar-2026/
│
├── src/
│   ├── assets/              # Images, vidéos, ressources statiques
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants UI de base (shadcn)
│   │   ├── Header.tsx      # En-tête de navigation
│   │   ├── ChatbotButton.tsx # Bouton assistant IA flottant
│   │   └── ...
│   ├── pages/              # Pages de l'application (routes)
│   │   ├── Index.tsx       # Page d'accueil
│   │   ├── Events.tsx      # Programme des JOJ
│   │   ├── Results.tsx     # Résultats en direct
│   │   ├── Assistant.tsx   # Assistant IA
│   │   ├── Discover.tsx    # Carte touristique
│   │   ├── Museum3D.tsx    # Musée 3D
│   │   └── ...
│   ├── hooks/              # Hooks React personnalisés
│   │   ├── useLanguage.ts  # Gestion multilingue
│   │   ├── useFavorites.ts # Gestion favoris
│   │   └── ...
│   ├── data/               # Données statiques
│   │   ├── joj2026Sports.ts # Données sports JOJ
│   │   ├── oeuvres.ts      # Œuvres du musée
│   │   └── ...
│   ├── integrations/       # Intégrations externes
│   │   └── supabase/       # Client Supabase (auto-généré)
│   ├── lib/                # Utilitaires
│   ├── scenes/             # Scènes 3D (Three.js)
│   ├── types/              # Types TypeScript
│   ├── App.tsx             # Composant racine
│   └── main.tsx            # Point d'entrée
│
├── supabase/
│   ├── functions/          # Edge Functions (backend serverless)
│   │   └── senegal-assistant/  # Fonction IA assistant
│   ├── migrations/         # Migrations base de données
│   └── config.toml         # Configuration Supabase
│
├── public/                 # Fichiers statiques publics
├── index.html              # HTML principal
├── vite.config.ts          # Configuration Vite
├── tailwind.config.ts      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
└── package.json            # Dépendances npm
```

---

## 🗄️ Backend (Lovable Cloud / Supabase)

### Base de données

Le projet utilise **PostgreSQL** avec les tables suivantes :

#### **profiles**
Stocke les informations des profils utilisateurs
```sql
- id (uuid, primary key)
- user_id (uuid, référence auth.users)
- full_name (text)
- favorite_sports (text[]) - Sports favoris
- notification_preferences (jsonb) - Préférences notifications
- created_at (timestamp)
- updated_at (timestamp)
```

#### **events**
Événements sportifs dynamiques
```sql
- id (bigint, primary key)
- title (text)
- sport (text)
- date (date)
- time (text)
- location (text)
- category (text)
- description (text)
- created_at (timestamp)
```

#### **notifications**
Système de notifications en temps réel
```sql
- id (uuid, primary key)
- user_id (uuid) - Destinataire
- title (text)
- message (text)
- type (text) - Type de notification
- read (boolean) - Lu/non lu
- created_at (timestamp)
```

#### **user_roles**
Gestion des rôles et permissions
```sql
- id (uuid, primary key)
- user_id (uuid)
- role (text) - 'admin', 'moderator', 'user'
- created_at (timestamp)
```

### Sécurité (Row Level Security)

**Chaque table est protégée par des politiques RLS :**
- Les utilisateurs ne peuvent voir que leurs propres données
- Les admins ont des permissions étendues
- Toutes les opérations sont vérifiées côté serveur

### Edge Functions

#### **senegal-assistant**
Fonction serverless pour l'assistant IA multilingue

**Localisation :** `supabase/functions/senegal-assistant/index.ts`

**Fonctionnalités :**
- Traitement des messages en français, wolof, pulaar, anglais
- Intégration OpenAI GPT-4o-mini
- Système de contexte conversationnel
- Gestion CORS pour appels frontend

**Comment ça marche :**
1. Reçoit le message utilisateur + langue + historique
2. Construit le prompt système adapté à la langue
3. Appelle l'API OpenAI
4. Retourne la réponse générée

**Variables d'environnement requises :**
- `OPENAI_API_KEY` - Clé API OpenAI

---

## 💻 Frontend (React + Vite)

### Pages principales

#### **Index.tsx** - Page d'accueil
- Hero section avec vidéo
- Cartes de navigation vers les fonctionnalités
- Sections JOJ et tourisme

#### **Events.tsx** - Programme JOJ
- Liste des 25 sports en compétition + 10 mobilisation
- Filtres par sport, lieu, catégorie
- Recherche en temps réel
- Navigation vers détails sport

#### **Results.tsx** - Résultats live
- Tableau des médailles
- Matchs en cours et terminés
- Détails match par match

#### **Assistant.tsx** - Assistant IA
- Chat multilingue (FR, WO, EN, Pulaar)
- Reconnaissance vocale
- Synthèse vocale
- Historique conversation

#### **Discover.tsx** - Guide touristique
- Carte interactive Leaflet
- Marqueurs restaurants, attractions, transport
- Filtres par catégorie
- Informations détaillées

#### **Museum3D.tsx** - Musée virtuel 3D
- Rendu 3D avec Three.js / React Three Fiber
- Navigation dans l'espace 3D
- Œuvres d'art interactives
- Minimap de navigation

### Composants clés

#### **Header.tsx**
En-tête de navigation principal
- Logo et titre
- Menu de navigation
- Sélecteur de langue
- Authentification

#### **ChatbotButton.tsx**
Bouton flottant d'accès rapide à l'assistant
- Image mascotte AYO
- Position fixe bottom-right
- Navigation vers /assistant

#### **EventCard.tsx**
Carte d'affichage d'un événement sportif
- Icône sport
- Date, heure, lieu
- Catégorie
- Click vers détails

### Hooks personnalisés

#### **useLanguage.ts**
Gestion du multilingue
- Stockage langue sélectionnée (Zustand + localStorage)
- Traductions FR, EN, WO
- Fonction `t()` pour accès traductions

#### **useFavorites.ts**
Gestion des favoris utilisateur
- Stockage localStorage
- Ajout/suppression favoris
- Liste favoris

### Données statiques

#### **joj2026Sports.ts**
Définit tous les sports des JOJ 2026
- 25 sports compétition
- 10 sports mobilisation
- Informations : nom, emoji, image, couleur, lieu, événements

#### **oeuvres.ts**
Catalogue des œuvres du musée
- Informations œuvre : titre, artiste, description
- Coordonnées 3D pour positionnement
- Images et audio guides

---

## 🎨 Système de design

### Tailwind CSS + Design Tokens

**Fichiers de configuration :**
- `src/index.css` - Variables CSS personnalisées (tokens)
- `tailwind.config.ts` - Configuration Tailwind étendue

**Tokens principaux :**
```css
--primary: Couleur principale
--secondary: Couleur secondaire
--accent: Couleur d'accent
--background: Fond principal
--foreground: Texte principal
--muted: Couleur atténuée
--border: Couleurs bordures
```

**Utilisation :**
```tsx
<div className="bg-primary text-primary-foreground">
  Toujours utiliser les tokens sémantiques
</div>
```

**⚠️ Ne jamais utiliser :**
- Couleurs directes : `text-white`, `bg-black`, etc.
- Tout doit passer par les tokens du design system

---

## 🚀 Fonctionnalités principales

### 1. Programme des Jeux
- **Calendrier complet** des 35 sports (25 compétition + 10 mobilisation)
- **Filtres avancés** par sport, lieu, date
- **Détails des épreuves** avec horaires et lieux
- **Images africaines** pour chaque sport

### 2. Résultats Live
- **Tableau des médailles** en temps réel
- **Scores des matchs** en cours et terminés
- **Détails match** avec statistiques

### 3. Assistant IA Multilingue
- **4 langues** : Français, Wolof, Pulaar, Anglais
- **Reconnaissance vocale** pour questions orales
- **Synthèse vocale** pour réponses audio
- **Contexte intelligent** sur JOJ et Dakar
- **Intégration OpenAI** GPT-4o-mini

### 4. Guide touristique
- **Carte interactive** de Dakar
- **Catégories** : Restaurants, Attractions, Transport
- **Informations détaillées** pour chaque lieu
- **Itinéraires** et contacts

### 5. Musée 3D
- **Visite virtuelle** du Musée des Civilisations Noires
- **Navigation 3D** immersive
- **Œuvres interactives** avec descriptions
- **Audio guides** pour chaque œuvre
- **Système de favoris**

### 6. Profils utilisateurs
- **Authentification** email/mot de passe
- **Sports favoris**
- **Préférences notifications**
- **Historique activité**

### 7. Notifications
- **Alertes temps réel** pour événements
- **Système de cloche** avec compteur
- **Notifications personnalisées** selon préférences

---

## 💾 Installation et développement

### Prérequis
- **Node.js** (v18+)
- **npm** ou **yarn**
- Compte **Lovable** (pour déploiement)

### Installation locale

```bash
# 1. Cloner le dépôt
git clone <votre-url-git>
cd joj-dakar-2026

# 2. Installer les dépendances
npm install

# 3. Variables d'environnement
# Le fichier .env est auto-généré par Lovable Cloud
# Il contient :
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_PUBLISHABLE_KEY
# - VITE_SUPABASE_PROJECT_ID

# 4. Démarrer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev          # Mode développement avec hot-reload
npm run build        # Build production
npm run preview      # Prévisualiser le build
npm run lint         # Linter ESLint
```

---

## 🌐 Déploiement

### Déploiement via Lovable

**Frontend :**
1. Cliquer sur le bouton **"Publish"** (en haut à droite)
2. Cliquer sur **"Update"** pour mettre à jour
3. Le site est déployé sur `*.lovable.app`

**Backend (Edge Functions) :**
- Les Edge Functions se déploient **automatiquement**
- Aucune action manuelle requise

### Domaine personnalisé
- Aller dans **Project > Settings > Domains**
- Connecter votre domaine personnalisé
- Suivre les instructions DNS

---

## 🔧 Guide de modification

### Ajouter un nouveau sport

**Fichier :** `src/data/joj2026Sports.ts`

```typescript
{
  id: 29,
  name: "Nouveau Sport",
  category: "competition", // ou "mobilisation"
  emoji: "🏆",
  image: "/src/assets/sports/nouveau-sport.jpg",
  color: "#FF6B6B",
  gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
  venue: "Lieu du sport",
  description: "Description du sport",
  videoUrl: "https://youtube.com/embed/xxx", // optionnel
  events: [
    {
      id: 2901,
      title: "Épreuve 1",
      date: "2026-11-10",
      time: "14:00",
      phase: "Finale",
      gender: "H" // ou "F" ou "Mixte"
    }
  ]
}
```

### Ajouter une nouvelle langue

**Fichier :** `src/hooks/useLanguage.ts`

1. Ajouter le code langue au type :
```typescript
type Language = 'fr' | 'en' | 'wo' | 'ar'; // Ajouter 'ar' par exemple
```

2. Ajouter les traductions :
```typescript
const translations = {
  fr: { /* traductions françaises */ },
  en: { /* traductions anglaises */ },
  wo: { /* traductions wolof */ },
  ar: { /* nouvelles traductions arabes */ }
}
```

### Modifier l'assistant IA

**Fichier :** `supabase/functions/senegal-assistant/index.ts`

**Modifier le prompt système :**
```typescript
const systemPrompt = `
  Votre nouveau prompt système personnalisé...
`;
```

**Changer le modèle IA :**
```typescript
model: 'gpt-4o-mini', // ou 'gpt-4', 'gpt-3.5-turbo', etc.
```

### Ajouter une page

1. **Créer le fichier de page :**
```tsx
// src/pages/NouvellePage.tsx
import Header from "@/components/Header";

const NouvellePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1>Nouvelle Page</h1>
      </div>
    </div>
  );
};

export default NouvellePage;
```

2. **Ajouter la route :**
```tsx
// src/App.tsx
import NouvellePage from "@/pages/NouvellePage";

<Route path="/nouvelle-page" element={<NouvellePage />} />
```

3. **Ajouter au menu :**
```tsx
// src/components/Header.tsx
<NavigationMenuLink href="/nouvelle-page">
  Nouvelle Page
</NavigationMenuLink>
```

### Modifier les couleurs du thème

**Fichier :** `src/index.css`

```css
:root {
  --primary: 210 100% 50%; /* HSL format */
  --secondary: 280 80% 60%;
  /* Modifier les valeurs HSL selon vos besoins */
}
```

### Ajouter une table Supabase

**Via Lovable Cloud UI :**
1. Ouvrir l'interface Backend (Project > Backend)
2. Créer une nouvelle table
3. Définir les colonnes et types
4. Configurer les politiques RLS

**Ou via migration SQL :**
Les migrations sont automatiquement créées dans `supabase/migrations/`

---

## 🔐 Variables d'environnement

Le fichier `.env` est **auto-généré** par Lovable Cloud :

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJxxx...
VITE_SUPABASE_PROJECT_ID=xxx
```

**⚠️ Ne jamais modifier manuellement le fichier `.env`**

---

## 🐛 Débogage

### Console du navigateur
- Ouvrir les DevTools (F12)
- Onglet **Console** pour les logs
- Onglet **Network** pour les requêtes API

### Logs Edge Functions
- Via Lovable : Project > Backend > Functions > Logs
- Les `console.log()` dans les Edge Functions apparaissent ici

### Base de données
- Via Lovable : Project > Backend > Database
- Voir les tables et données en temps réel

---

## 📚 Ressources

- **Documentation Lovable** : https://docs.lovable.dev
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation React** : https://react.dev
- **Documentation Tailwind** : https://tailwindcss.com
- **shadcn/ui** : https://ui.shadcn.com

---

## 📞 Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier les logs dans les DevTools
3. Consulter les docs officielles ci-dessus
4. Contacter le support Lovable

---

## 🎉 Conclusion

Cette application est prête pour les JOJ Dakar 2026 ! Tous les composants sont commentés et documentés pour faciliter les modifications. N'hésitez pas à explorer le code et à l'adapter à vos besoins.

**Bon développement ! 🚀**

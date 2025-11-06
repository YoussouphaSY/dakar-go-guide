# Bienvenue sur votre projet Jeux Olympiques Jeunesse Dakar 2026

## Information du projet


## Comment puis-je éditer ce code ?

Il existe plusieurs façons d'éditer votre application.

**Utiliser Lovable**

Visitez simplement le [Projet Lovable](https://lovable.dev/projects/e58991ca-7e10-4572-965d-cb1fb64999fe) et commencez à donner des instructions.

Les modifications effectuées via Lovable seront automatiquement committées dans ce dépôt.

**Utiliser votre IDE préféré**

Si vous souhaitez travailler localement avec votre propre IDE, vous pouvez cloner ce dépôt et pousser les modifications. Les modifications poussées seront également reflétées dans Lovable.

La seule exigence est d'avoir Node.js et npm installés - [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Suivez ces étapes :


# Étape 3: Installer les dépendances nécessaires.
npm i

# Étape 4: Démarrer le serveur de développement avec rechargement automatique et aperçu instantané.
npm run dev
ou 
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p
npm run dev
```

**Éditer un fichier directement dans GitHub**

- Naviguez vers le(s) fichier(s) désiré(s).
- Cliquez sur le bouton "Edit" (icône crayon) en haut à droite de la vue du fichier.
- Effectuez vos modifications et committez les changements.

**Utiliser GitHub Codespaces**

- Naviguez vers la page principale de votre dépôt.
- Cliquez sur le bouton "Code" (bouton vert) près du coin supérieur droit.
- Sélectionnez l'onglet "Codespaces".
- Cliquez sur "New codespace" pour lancer un nouvel environnement Codespace.
- Éditez les fichiers directement dans le Codespace et committez et poussez vos modifications une fois terminé.

## Quelles technologies sont utilisées pour ce projet ?

Ce projet est construit avec :

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (backend)
- Leaflet (cartes interactives)

## Fonctionnalités principales

### Pour les utilisateurs
- **Programme des Jeux** : Calendrier complet des événements avec filtres
- **Résultats en direct** : Scores et classements en temps réel
- **Découvrir Dakar** : Carte interactive avec restaurants, attractions et transport
- **Assistant IA multilingue** : Support en français, wolof, pulaar et anglais
- **Notifications** : Alertes pour les événements importants
- **Profil personnalisé** : Préférences et sports favoris

### Pour les administrateurs
- **Gestion des événements** : Créer, modifier et supprimer des événements dynamiquement
- **Gestion des utilisateurs** : Vue d'ensemble des utilisateurs inscrits
- **Système de notifications** : Envoyer des notifications ciblées à tous les utilisateurs
- **Contrôle des rôles** : Système de permissions sécurisé

## Comment puis-je déployer ce projet ?

Ouvrez simplement [Lovable](https://lovable.dev/projects/e58991ca-7e10-4572-965d-cb1fb64999fe) et cliquez sur Share -> Publish.

## Puis-je connecter un domaine personnalisé à mon projet Lovable ?

Oui, vous le pouvez !

Pour connecter un domaine, naviguez vers Project > Settings > Domains et cliquez sur Connect Domain.

En savoir plus ici : [Configuration d'un domaine personnalisé](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Structure de la base de données

Le projet utilise Supabase avec les tables suivantes :

- **profiles** : Profils utilisateurs avec préférences
- **events** : Événements sportifs dynamiques
- **notifications** : Système de notifications en temps réel
- **user_roles** : Gestion des rôles (admin, moderator, user)

## Sécurité

- Authentification Supabase avec Row Level Security (RLS)
- Politiques de sécurité strictes sur toutes les tables
- Vérification des rôles côté serveur avec fonctions SECURITY DEFINER
- Notifications en temps réel sécurisées par utilisateur

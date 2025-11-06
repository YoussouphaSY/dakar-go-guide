# Bienvenue sur votre projet Jeux Olympiques Jeunesse Dakar 2026

## Information du projet

**URL**: https://lovable.dev/projects/e58991ca-7e10-4572-965d-cb1fb64999fe

## Comment puis-je éditer ce code ?

Il existe plusieurs façons d'éditer votre application.

**Utiliser Lovable**

Visitez simplement le [Projet Lovable](https://lovable.dev/projects/e58991ca-7e10-4572-965d-cb1fb64999fe) et commencez à donner des instructions.

Les modifications effectuées via Lovable seront automatiquement committées dans ce dépôt.

**Utiliser votre IDE préféré**

Si vous souhaitez travailler localement avec votre propre IDE, vous pouvez cloner ce dépôt et pousser les modifications. Les modifications poussées seront également reflétées dans Lovable.

La seule exigence est d'avoir Node.js et npm installés - [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Suivez ces étapes :

```sh
# Étape 1: Cloner le dépôt en utilisant l'URL Git du projet.
git clone <VOTRE_URL_GIT>

# Étape 2: Naviguer vers le répertoire du projet.
cd <NOM_DE_VOTRE_PROJET>

# Étape 3: Installer les dépendances nécessaires.
npm i

# Étape 4: Démarrer le serveur de développement avec rechargement automatique et aperçu instantané.
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

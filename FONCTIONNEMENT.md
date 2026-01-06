# Comment fonctionne NomadCompass

## Vue d'ensemble

NomadCompass est une plateforme qui aide les utilisateurs à trouver le meilleur pays pour s'expatrier en fonction de leur profil personnel.

## Fonctionnalités principales

### 1. Authentification (NextAuth + Google OAuth)

- Connexion via Google OAuth
- Session persistante avec base de données
- Protection des routes sensibles (dashboard, favoris, admin)

### 2. Questionnaire personnalisé

L'utilisateur remplit un questionnaire en 4 étapes :
- **Profil** : âge, situation familiale, profession
- **Budget** : budget mensuel, épargne, revenus
- **Climat** : températures préférées, saison, précipitations
- **Priorités** : notation de 8 critères (coût de vie, sécurité, santé, climat, culture, internet, transport, fiscalité)

Les réponses sont sauvegardées en base de données (Prisma + PostgreSQL).

### 3. Scraping automatique des données pays

**Sources de données** :
- **Numbeo.com** : indices de coût de vie, sécurité, santé, pollution, climat
- **Climate-Data.org** : température moyenne, précipitations, type de climat

**Comment ça marche** :
1. Script Playwright lance un navigateur headless
2. Scrape les données pour chaque pays
3. Parse et valide les données
4. Stocke dans la base de données (table `CountryData`)

**Commande** : `npm run scrape:countries`

**Données récupérées** :
- Coût de la vie (index)
- Sécurité (index)
- Santé (index)
- Pollution (index)
- Température moyenne
- Précipitations
- Type de climat
- Vitesse internet
- Transport

### 4. Recommandations IA avec Claude

**Processus** :
1. L'utilisateur termine le questionnaire
2. Le système récupère toutes les données pays disponibles
3. Appel à l'API Claude (Anthropic) avec :
   - Le profil utilisateur complet
   - Les données de tous les pays
   - Instructions pour calculer des scores pondérés

**Claude analyse et génère** :
- Score global de compatibilité (0-100)
- 5 scores détaillés (budget, climat, sécurité, santé, lifestyle)
- Points forts spécifiques au profil
- Points d'attention
- Résumé personnalisé

**Modèle utilisé** : Claude Sonnet 4 (équilibre performance/coût)

**Coût estimé** : ~$0.03 par analyse

### 5. Dashboard de résultats

Affiche les recommandations générées par Claude :
- Top 3 pays avec graphique radar de comparaison
- Liste complète des recommandations triées par score
- Détails de chaque score avec barres de progression
- Résumé personnalisé généré par l'IA

**Composants visuels** :
- ApexCharts pour les graphiques (radar chart, bar chart)
- Cards responsive avec scores détaillés
- Animations et transitions fluides

### 6. Pages détails pays

Chaque pays a sa page dédiée (`/countries/[id]`) :

**Sections** :
- **Header** : Drapeau, nom, code, continent, bouton favori
- **Coût de vie** : Index global, loyer moyen, salaire moyen
- **Climat** : Température moyenne, type de climat, précipitations
- **Qualité de vie** : 4 indicateurs (sécurité, santé, pollution, internet) avec graphique

### 7. Système de favoris

- Ajouter/retirer des pays en favoris
- Page dédiée `/favorites` avec grille responsive
- Synchronisé avec la base de données
- Contrainte unique : un utilisateur ne peut ajouter un pays qu'une seule fois

### 8. Panel d'administration

**Accès** : Route `/admin` (réservée aux utilisateurs avec `role: "admin"`)

**Fonctionnalités** :
- Dashboard avec statistiques (users, pays, favoris, questionnaires)
- Gestion des pays (liste, suppression)
- Re-scraping manuel des données
- Liste des derniers utilisateurs

**Sécurité** :
- Middleware Next.js vérifie l'authentification + rôle admin
- Protection à 3 niveaux (middleware, server components, API routes)

**Comment devenir admin** :
```sql
UPDATE users SET role = 'admin' WHERE email = 'votre@email.com';
```

## Stack technique

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **ApexCharts** (graphiques)
- **Lucide React** (icônes)

### Backend
- **Next.js API Routes**
- **Prisma** (ORM PostgreSQL)
- **NextAuth.js v5** (authentification)
- **Claude API** (IA recommandations)
- **Playwright** (scraping)

## Architecture base de données

### Modèles principaux

**User** : Utilisateurs du site
- id, name, email, image, role
- Relations : comptes OAuth, sessions, questionnaires, favoris

**UserResponse** : Réponses au questionnaire
- age, situation, profession, budget, climat, priorités (JSON)
- Lien vers l'utilisateur

**Country** : Liste des pays
- id, name, code, flag, continent
- Relations : données (CountryData), favoris

**CountryData** : Données scrapées pour chaque pays
- costOfLivingIndex, safetyIndex, healthcareIndex, etc.
- Lien vers le pays

**Favorite** : Favoris utilisateur
- userId, countryId
- Contrainte unique : (userId, countryId)

## Flux utilisateur complet

1. **Connexion** via Google OAuth
2. **Questionnaire** : Remplir les 4 étapes
3. **Génération** : Claude analyse le profil + données pays
4. **Dashboard** : Visualiser les recommandations
5. **Exploration** : Consulter les détails des pays
6. **Favoris** : Sauvegarder les pays intéressants
7. **Comparaison** : Comparer plusieurs pays (graphiques)

## Commandes utiles

```bash
# Développement
npm run dev

# Base de données
npm run prisma:migrate    # Appliquer migrations
npm run prisma:seed       # Peupler pays initiaux
npm run prisma:studio     # Interface graphique DB

# Scraping
npm run scrape:countries  # Mettre à jour données pays

# Tests
npm test                  # Tests unitaires
npm run test:e2e          # Tests E2E

# Production
npm run build
npm run start
```

## Variables d'environnement requises

```env
# Base de données (Neon PostgreSQL)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Claude API
ANTHROPIC_API_KEY="sk-ant-api03-..."
```

## Points techniques importants

### Performance
- Server Components par défaut (Next.js 15)
- Lazy loading des graphiques ApexCharts
- Images optimisées (AVIF, WebP)
- Bundle optimization avec tree-shaking

### SEO
- Metadata complète (Open Graph, Twitter Cards)
- Sitemap dynamique (`/sitemap.xml`)
- Robots.txt configuré
- URLs propres et descriptives

### Sécurité
- Validation Zod sur toutes les entrées
- Protection CSRF via NextAuth
- Middleware de protection routes admin
- Pas de secrets exposés côté client

### Accessibilité
- Focus visible pour navigation clavier
- Support `prefers-reduced-motion`
- Contraste WCAG AA
- ARIA labels sur éléments interactifs

## Déploiement

**Plateforme recommandée** : Vercel

1. Connecter le repo GitHub
2. Configurer les variables d'environnement
3. Déploiement automatique sur push

**Base de données production** : Neon PostgreSQL (gratuit)

## Limitations actuelles

- **Scraping** : Rate limiting (délais entre requêtes)
- **Claude API** : Coût ~$0.03 par analyse
- **Données** : Dépendent de la disponibilité de Numbeo/Climate-Data
- **Langues** : Uniquement français pour le moment

## Évolutions possibles

- Multi-langue (i18n)
- Comparaison avancée de pays
- Export PDF des recommandations
- Historique des analyses
- Notifications de mise à jour des données
- Carte interactive avec pays recommandés

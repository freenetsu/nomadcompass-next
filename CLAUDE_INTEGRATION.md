# Intégration de l'API Claude pour les Recommandations

## État actuel

✅ Tâche 06 : Intégration Claude API - TERMINÉE

## Vue d'ensemble

L'intégration Claude utilise **Claude Sonnet 4** pour analyser le profil utilisateur (questionnaire) et les données pays disponibles, puis génère des recommandations personnalisées avec des scores de compatibilité.

## Architecture

### 1. Types TypeScript

**Fichier** : `src/types/recommendations.ts`

#### `CountryRecommendation`
Représente une recommandation de pays avec scores détaillés :
```typescript
{
  countryId: string,
  countryName: string,
  countryCode: string,
  flag: string,
  overallScore: number,        // Score global 0-100
  matchPercentage: number,      // Pourcentage de match 0-100
  strengths: string[],          // Points forts
  weaknesses: string[],         // Points faibles
  summary: string,              // Résumé personnalisé
  scores: {
    budget: number,             // Adéquation budget
    climate: number,            // Adéquation climat
    safety: number,             // Sécurité
    healthcare: number,         // Santé
    lifestyle: number           // Qualité de vie
  },
  data: { ... }                 // Données brutes du pays
}
```

#### `RecommendationsResponse`
Réponse complète avec métadonnées :
```typescript
{
  recommendations: CountryRecommendation[],
  userProfile: {
    questionnaire: QuestionnaireFormData,
    analyzedAt: string
  },
  analysis: {
    topPriorities: Array<{ name: string, score: number }>,
    budgetCategory: "economique" | "moyen" | "eleve",
    climatePreference: string
  }
}
```

### 2. Service Claude

**Fichier** : `src/lib/claude.ts`

#### Configuration
- **Modèle** : `claude-sonnet-4-20250514` (dernière version Sonnet 4)
- **Max tokens** : 4096 (pour réponses détaillées)
- **Température** : 0.7 (équilibre créativité/cohérence)

#### Fonctions principales

**`createAnalysisPrompt(input)`**
Génère un prompt structuré avec :
- Profil utilisateur complet (âge, budget, priorités, etc.)
- Données détaillées de chaque pays
- Instructions précises pour le calcul des scores
- Format JSON attendu

**`analyzeUserProfile(questionnaire, countries)`**
- Appelle l'API Claude avec le prompt
- Parse la réponse JSON
- Valide la structure de la réponse
- Retourne les recommandations triées par score

**`generateRecommendations(questionnaire, countries)`**
- Génère les recommandations via `analyzeUserProfile`
- Calcule les métadonnées (top priorités, catégorie budget)
- Retourne la réponse complète avec analyse

### 3. API Route

**Fichier** : `src/app/api/recommendations/route.ts`

#### Endpoint : `GET /api/recommendations`

**Workflow** :
1. Vérifie l'authentification (NextAuth)
2. Récupère le dernier questionnaire de l'utilisateur
3. Récupère tous les pays avec leurs données
4. Prépare les données pour Claude
5. Génère les recommandations
6. Retourne la réponse JSON

**Réponses** :
- `200` : Recommandations générées avec succès
- `401` : Non authentifié
- `404` : Pas de questionnaire ou pas de données pays
- `500` : Erreur API Claude ou erreur serveur

## Prompt Engineering

### Structure du Prompt

Le prompt est conçu pour maximiser la qualité des recommandations :

1. **Contexte** : "Tu es un expert en expatriation pour les Français"
2. **Profil utilisateur** : Données structurées du questionnaire
3. **Données pays** : Statistiques formatées pour chaque pays
4. **Instructions** : Calcul des scores avec pondération
5. **Format** : Schéma JSON exact attendu

### Pondération des Scores

Claude calcule les scores en fonction des priorités utilisateur (1-5) :

- **Budget Score** :
  - Compare `costOfLivingIndex` avec `budgetMensuel`
  - Plus le coût est bas par rapport au budget, plus le score est élevé

- **Climate Score** :
  - Compare `averageTemp` avec `temperaturePreferee`
  - Prend en compte les précipitations et la saison préférée

- **Safety Score** :
  - Directement basé sur `safetyIndex` du pays
  - Pondéré par la priorité "sécurité" de l'utilisateur

- **Healthcare Score** :
  - Basé sur `healthcareIndex`
  - Pondéré par la priorité "santé"

- **Lifestyle Score** :
  - Combine culture, environnement, transport
  - Utilise `pollutionIndex`, `transportIndex`
  - Pondéré par les priorités correspondantes

### Format de Réponse

Claude retourne un JSON pur (sans markdown) :
```json
{
  "recommendations": [
    {
      "countryId": "...",
      "countryName": "Portugal",
      "overallScore": 85,
      "matchPercentage": 87,
      "strengths": [
        "Budget très adapté avec un coût de vie 30% inférieur à la France",
        "Climat méditerranéen doux toute l'année",
        "Excellente qualité de vie pour les retraités"
      ],
      "weaknesses": [
        "Salaires moyens plus bas qu'en France",
        "Barrière de la langue (portugais)"
      ],
      "summary": "Le Portugal est une excellente destination pour votre profil...",
      "scores": {
        "budget": 90,
        "climate": 85,
        "safety": 80,
        "healthcare": 75,
        "lifestyle": 88
      }
    }
  ]
}
```

## Configuration

### Variables d'environnement

Ajouter dans `.env` :
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxx
```

### Obtenir une API Key

1. Créer un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Aller dans "API Keys"
3. Créer une nouvelle clé
4. Copier la clé dans `.env`

### Coûts estimés

**Claude Sonnet 4** (prix approximatifs) :
- Input : ~$3 / million de tokens
- Output : ~$15 / million de tokens

**Estimation par analyse** :
- Prompt : ~2000 tokens (profil + 5 pays)
- Réponse : ~1500 tokens (5 recommandations détaillées)
- Coût : **~$0.03 par analyse**

Pour 1000 utilisateurs : ~$30

## Gestion des Erreurs

### Erreur : API Key manquante
```typescript
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not defined");
}
```

### Erreur : Réponse invalide
```typescript
try {
  parsedResponse = JSON.parse(responseText);
} catch (parseError) {
  console.error("Failed to parse Claude response:", responseText);
  throw new Error("Invalid JSON response from Claude");
}
```

### Erreur : Format incorrect
```typescript
if (!parsedResponse.recommendations || !Array.isArray(...)) {
  throw new Error("Invalid response format from Claude");
}
```

## Utilisation Frontend

### Appel API

```typescript
const response = await fetch("/api/recommendations");
const data = await response.json();

if (response.ok) {
  const { recommendations, analysis } = data;

  // Afficher les recommandations
  recommendations.forEach(country => {
    console.log(`${country.countryName}: ${country.overallScore}/100`);
    console.log(`Match: ${country.matchPercentage}%`);
    console.log(`Points forts: ${country.strengths.join(", ")}`);
  });

  // Afficher l'analyse
  console.log(`Budget: ${analysis.budgetCategory}`);
  console.log(`Top priorités:`, analysis.topPriorities);
}
```

### Gestion du Cache

Les recommandations peuvent être mises en cache côté client :
```typescript
// Stocker les recommandations
localStorage.setItem("recommendations", JSON.stringify(data));

// Récupérer si < 24h
const cached = localStorage.getItem("recommendations");
if (cached) {
  const { analyzedAt } = JSON.parse(cached).userProfile;
  const age = Date.now() - new Date(analyzedAt).getTime();
  if (age < 24 * 60 * 60 * 1000) {
    // Utiliser le cache
  }
}
```

## Optimisations

### Rate Limiting
L'API Claude a des limites de requêtes. Considérer :
- Cache côté serveur (Redis)
- Limitation par utilisateur (max 3 analyses/jour)

### Batch Processing
Pour plusieurs utilisateurs :
```typescript
const results = await Promise.all(
  users.map(user => generateRecommendations(user.questionnaire, countries))
);
```

## Tests

### Test manuel avec curl

```bash
curl -X GET http://localhost:3000/api/recommendations \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### Test avec Prisma Studio

1. Créer un questionnaire manuellement
2. Appeler l'API
3. Vérifier la réponse JSON

## Prochaines étapes

### Tâche 07 : Dashboard avec résultats
- Afficher les recommandations dans une UI élégante
- Graphiques de comparaison avec ApexCharts
- Filtres et tri des résultats

### Améliorations futures
1. **Cache intelligent** : Sauvegarder les recommandations en DB
2. **Historique** : Suivre l'évolution des recommandations
3. **Explications détaillées** : Graphiques pour chaque score
4. **Comparaison** : Comparer 2-3 pays côte à côte

## Dépendances

- `@anthropic-ai/sdk` : SDK officiel Anthropic
- `next` : API Routes
- `@prisma/client` : Récupération des données
- `next-auth` : Authentification

## Notes d'implémentation

- Les scores sont **personnalisés** selon le profil utilisateur
- Les strengths/weaknesses sont **contextuels** (pas génériques)
- Le summary est **adapté** à la situation familiale et profession
- Les recommandations sont **triées** par score décroissant
- Tous les pays sont analysés (pas de pré-filtrage)
